import { initializeDatabase, db } from "./database.js";

initializeDatabase();

const achievementCount = db.prepare("SELECT COUNT(*) as count FROM achievements").get() as { count: number };
if (achievementCount.count === 0) {
  const insert = db.prepare("INSERT INTO achievements (title, description, reward) VALUES (?, ?, ?)");
  [
    ["Explorer Start", "ผ่านด่านแรกของเมืองอนาคต", 20],
    ["Prompt Rookie", "ได้คะแนนเกิน 80 ในภารกิจ prompt", 30],
    ["Ethics Guardian", "ตอบถูกทุกข้อในด่านจริยธรรม", 40],
    ["AI Master Explorer", "ผ่านครบทุกด่าน", 100]
  ].forEach((row) => insert.run(...row));
}

const playerCount = db.prepare("SELECT COUNT(*) as count FROM players").get() as { count: number };
if (playerCount.count === 0) {
  const playerInsert = db.prepare(
    "INSERT INTO players (nickname, level, xp, coins, achievements) VALUES (?, ?, ?, ?, ?)"
  );
  playerInsert.run("NovaKid", 3, 95, 70, JSON.stringify(["Explorer Start"]));
  playerInsert.run("ByteHero", 5, 210, 140, JSON.stringify(["Explorer Start", "Prompt Rookie"]));
  playerInsert.run("PixelPilot", 6, 280, 190, JSON.stringify(["Explorer Start", "Prompt Rookie", "Ethics Guardian"]));

  const progressInsert = db.prepare(
    "INSERT INTO progress (player_id, mission_id, score, completed) VALUES (?, ?, ?, ?)"
  );
  progressInsert.run(1, "lvl1-ai-basics", 90, 1);
  progressInsert.run(1, "lvl3-space-cat", 84, 1);
  progressInsert.run(2, "lvl5-exam-seating", 88, 1);
  progressInsert.run(3, "lvl6-ethics-fakenews", 93, 1);
}

console.log(`Seed complete: ${db.name}`);
