import { Router } from "express";
import { createGuestPlayer, getPlayerById, getPlayerProgress, updatePlayerProgress } from "../services/playerService.js";

export const playerRouter = Router();

playerRouter.post("/", (req, res) => {
  const { nickname } = req.body as { nickname?: string };
  if (!nickname?.trim()) {
    return res.status(400).json({ message: "nickname is required" });
  }

  const player = createGuestPlayer(nickname.trim());
  return res.status(201).json({ player });
});

playerRouter.get("/:id", (req, res) => {
  const player = getPlayerById(Number(req.params.id));
  if (!player) {
    return res.status(404).json({ message: "Player not found" });
  }

  return res.json({ player, progress: getPlayerProgress(Number(req.params.id)) });
});

playerRouter.post("/:id/progress", (req, res) => {
  const playerId = Number(req.params.id);
  const { missionId, score, completed, xpEarned, coinsEarned } = req.body as {
    missionId?: string;
    score?: number;
    completed?: boolean;
    xpEarned?: number;
    coinsEarned?: number;
  };

  if (!missionId || score === undefined || completed === undefined || xpEarned === undefined || coinsEarned === undefined) {
    return res.status(400).json({ message: "mission progress payload is incomplete" });
  }

  const player = getPlayerById(playerId);
  if (!player) {
    return res.status(404).json({ message: "Player not found" });
  }

  const updatedPlayer = updatePlayerProgress(playerId, missionId, score, completed, xpEarned, coinsEarned);
  return res.json({ player: updatedPlayer, progress: getPlayerProgress(playerId) });
});
