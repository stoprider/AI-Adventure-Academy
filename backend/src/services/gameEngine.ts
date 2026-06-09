import { missions } from "../data/missions.js";

export function calculatePromptScore(input: string, keywords: string[] = []) {
  const normalized = input.toLowerCase();
  const matchedKeywords = keywords.filter((keyword) => normalized.includes(keyword.toLowerCase()));
  const coverage = keywords.length === 0 ? 0 : matchedKeywords.length / keywords.length;
  const lengthBonus = Math.min(input.trim().split(/\s+/).filter(Boolean).length / 12, 1);
  const score = Math.round((coverage * 0.7 + lengthBonus * 0.3) * 100);

  return {
    score,
    matchedKeywords,
    feedback:
      score >= 85
        ? "ยอดเยี่ยมมาก Prompt นี้ชัดเจนและมีรายละเอียดดี"
        : score >= 60
          ? "ดีแล้ว ลองเพิ่มรายละเอียดเรื่องฉาก อารมณ์ หรือสไตล์อีกนิด"
          : "ยังสั้นไป ลองเพิ่มคำสำคัญให้ AI เข้าใจภาพหรือคำตอบมากขึ้น"
  };
}

export function evaluateMission(missionId: string, answer: string) {
  const mission = missions.find((item) => item.id === missionId);
  if (!mission) {
    throw new Error("Mission not found");
  }

  const result = calculatePromptScore(answer, mission.answer_key);
  const completed = result.score >= 60;

  return {
    ...result,
    completed,
    xpEarned: completed ? mission.xp_reward : Math.round(mission.xp_reward * 0.4),
    coinsEarned: completed ? mission.coin_reward : Math.round(mission.coin_reward * 0.4),
    explanation: mission.explanation
  };
}

export function determineLevelFromXp(xp: number) {
  const thresholds = [0, 50, 100, 160, 230, 310, 400];
  let level = 1;
  thresholds.forEach((threshold, index) => {
    if (xp >= threshold) {
      level = index + 1;
    }
  });
  return Math.min(level, 7);
}

export function getDailyChallenge() {
  const today = new Date().toISOString().slice(0, 10);
  const index = today.split("-").reduce((sum, part) => sum + Number(part), 0) % missions.length;
  return missions[index];
}
