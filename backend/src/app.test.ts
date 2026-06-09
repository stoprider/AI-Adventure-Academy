import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { once } from "node:events";

const tempDbPath = path.join(os.tmpdir(), `ai-adventure-academy-test-${Date.now()}.sqlite`);
process.env.DB_PATH = tempDbPath;
process.env.PORT = "0";

const { app } = await import("./app.js");

async function withServer(run: (baseUrl: string) => Promise<void>) {
  const server = app.listen(0);
  await once(server, "listening");
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Unable to resolve test server address");
  }

  const baseUrl = `http://127.0.0.1:${address.port}`;
  try {
    await run(baseUrl);
  } finally {
    server.close();
    await once(server, "close");
  }
}

test("health endpoint responds with ok status", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);
    const body = (await response.json()) as { status: string };

    assert.equal(response.status, 200);
    assert.equal(body.status, "ok");
  });
});

test("guest player flow creates a player and updates progress", async () => {
  await withServer(async (baseUrl) => {
    const createResponse = await fetch(`${baseUrl}/api/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname: "TestPilot" })
    });
    const createBody = (await createResponse.json()) as { player: { id: number; nickname: string } };

    assert.equal(createResponse.status, 201);
    assert.equal(createBody.player.nickname, "TestPilot");

    const progressResponse = await fetch(`${baseUrl}/api/players/${createBody.player.id}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        missionId: "lvl1-ai-basics",
        score: 92,
        completed: true,
        xpEarned: 20,
        coinsEarned: 10
      })
    });
    const progressBody = (await progressResponse.json()) as {
      player: { achievements: string; xp: number };
      progress: Array<{ mission_id: string; completed: number }>;
    };

    assert.equal(progressResponse.status, 200);
    assert.ok(progressBody.player.xp >= 20);
    assert.match(progressBody.player.achievements, /Explorer Start/);
    assert.equal(progressBody.progress[0]?.mission_id, "lvl1-ai-basics");
  });
});

test("admin stats endpoint returns leaderboard payload", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/admin/stats`);
    const body = (await response.json()) as {
      stats: { totalPlayers: number };
      leaderboard: Array<{ nickname: string; xp: number }>;
    };

    assert.equal(response.status, 200);
    assert.ok(body.stats.totalPlayers >= 1);
    assert.ok(Array.isArray(body.leaderboard));
  });
});

process.on("exit", () => {
  if (fs.existsSync(tempDbPath)) {
    try {
      fs.rmSync(tempDbPath, { force: true });
    } catch {
      // Windows may keep the SQLite file locked briefly after tests finish.
    }
  }
});
