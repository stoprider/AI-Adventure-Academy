import { db } from "../db/database.js";
import { determineLevelFromXp } from "./gameEngine.js";

export function createGuestPlayer(nickname: string) {
  const insert = db.prepare(
    "INSERT INTO players (nickname, level, xp, coins, achievements) VALUES (?, 1, 0, 0, '[]')"
  );
  const result = insert.run(nickname);
  return getPlayerById(Number(result.lastInsertRowid));
}

export function getPlayerById(id: number) {
  return db.prepare("SELECT * FROM players WHERE id = ?").get(id);
}

export function listPlayers() {
  return db.prepare("SELECT * FROM players ORDER BY created_at DESC").all();
}

export function updatePlayerProgress(playerId: number, missionId: string, score: number, completed: boolean, xp: number, coins: number) {
  const upsert = db.prepare(`
    INSERT INTO progress (player_id, mission_id, score, completed, updated_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(player_id, mission_id)
    DO UPDATE SET score = excluded.score, completed = excluded.completed, updated_at = CURRENT_TIMESTAMP
  `);

  upsert.run(playerId, missionId, score, completed ? 1 : 0);

  const player = getPlayerById(playerId) as { xp: number; coins: number; achievements: string };
  const newXp = player.xp + xp;
  const newCoins = player.coins + coins;
  const newLevel = determineLevelFromXp(newXp);
  const unlockedAchievements = resolveAchievements(playerId, player.achievements, missionId, score, completed);

  db.prepare("UPDATE players SET xp = ?, coins = ?, level = ?, achievements = ? WHERE id = ?").run(
    newXp,
    newCoins,
    newLevel,
    JSON.stringify(unlockedAchievements),
    playerId
  );

  return getPlayerById(playerId);
}

export function getPlayerProgress(playerId: number) {
  return db.prepare("SELECT * FROM progress WHERE player_id = ?").all(playerId);
}

function resolveAchievements(playerId: number, currentAchievements: string, missionId: string, score: number, completed: boolean) {
  const achievements = new Set<string>(safeParseAchievements(currentAchievements));

  if (completed) {
    achievements.add("Explorer Start");
  }

  if (completed && score >= 80 && ["lvl2-prompt-basics", "lvl3-space-cat", "lvl3-robot-student", "lvl4-chat-quest"].includes(missionId)) {
    achievements.add("Prompt Rookie");
  }

  if (completed && missionId === "lvl6-ethics-fakenews" && score >= 90) {
    achievements.add("Ethics Guardian");
  }

  const completedCount = db
    .prepare("SELECT COUNT(*) as count FROM progress WHERE player_id = ? AND completed = 1")
    .get(playerId) as { count: number };

  if (completedCount.count >= 7) {
    achievements.add("AI Master Explorer");
  }

  return Array.from(achievements);
}

function safeParseAchievements(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}
