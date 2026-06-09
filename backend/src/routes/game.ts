import { Router } from "express";
import { missions } from "../data/missions.js";
import { getDailyChallenge, evaluateMission } from "../services/gameEngine.js";

export const gameRouter = Router();

const detectSamples = [
  {
    id: "detect-1",
    type: "text",
    content: "ฉันไปตลาดเมื่อเช้าและแม่ค้าจำฉันได้เพราะฉันซื้อผลไม้ร้านนี้ทุกอาทิตย์",
    answer: "human",
    explanation: "ข้อความมีรายละเอียดชีวิตประจำวันเฉพาะเจาะจงและเป็นธรรมชาติ"
  },
  {
    id: "detect-2",
    type: "text",
    content: "เมืองแห่งวันพรุ่งนี้เปล่งประกายด้วยอัลกอริทึมที่กลมกลืนและประสิทธิภาพไร้ขีดจำกัด",
    answer: "ai",
    explanation: "ข้อความฟังลื่นมากแต่กว้างและเป็นนามธรรมเกินไป"
  }
];

gameRouter.get("/missions", (_req, res) => {
  res.json({ missions });
});

gameRouter.get("/daily-challenge", (_req, res) => {
  res.json({ challenge: getDailyChallenge() });
});

gameRouter.get("/detect-samples", (_req, res) => {
  res.json({ samples: detectSamples });
});

gameRouter.post("/evaluate", (req, res) => {
  const { missionId, answer } = req.body as { missionId?: string; answer?: string };
  if (!missionId || !answer) {
    return res.status(400).json({ message: "missionId and answer are required" });
  }

  try {
    const result = evaluateMission(missionId, answer);
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error instanceof Error ? error.message : "Unknown error" });
  }
});
