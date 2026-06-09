import { db } from "../db/database.js";
import { missions } from "../data/missions.js";

export function getDashboardStats() {
  const totalPlayers = db.prepare("SELECT COUNT(*) as count FROM players").get() as { count: number };
  const averageScore = db.prepare("SELECT ROUND(AVG(score), 1) as avg FROM progress").get() as { avg: number | null };
  const mostCleared = db.prepare(`
    SELECT mission_id, COUNT(*) as count
    FROM progress
    WHERE completed = 1
    GROUP BY mission_id
    ORDER BY count DESC
    LIMIT 1
  `).get() as { mission_id?: string; count?: number } | undefined;
  const mostStuck = db.prepare(`
    SELECT mission_id, COUNT(*) as count
    FROM progress
    WHERE completed = 0
    GROUP BY mission_id
    ORDER BY count DESC
    LIMIT 1
  `).get() as { mission_id?: string; count?: number } | undefined;

  const missionLookup = new Map(missions.map((mission) => [mission.id, mission.title]));

  return {
    totalPlayers: totalPlayers.count,
    averageScore: averageScore.avg ?? 0,
    mostClearedMission: mostCleared?.mission_id
      ? { id: mostCleared.mission_id, title: missionLookup.get(mostCleared.mission_id), count: mostCleared.count ?? 0 }
      : null,
    mostStuckMission: mostStuck?.mission_id
      ? { id: mostStuck.mission_id, title: missionLookup.get(mostStuck.mission_id), count: mostStuck.count ?? 0 }
      : null
  };
}

export function getExportRows() {
  return db.prepare(`
    SELECT p.nickname, p.level, p.xp, p.coins, pr.mission_id, pr.score, pr.completed, pr.updated_at
    FROM players p
    LEFT JOIN progress pr ON p.id = pr.player_id
    ORDER BY p.nickname ASC
  `).all();
}
