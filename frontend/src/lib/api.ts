import { DailyChallenge, EvaluationResult, Mission, Player, ProgressItem } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...init
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json() as Promise<T>;
}

export const api = {
  getMissions: () => request<{ missions: Mission[] }>("/game/missions"),
  getDailyChallenge: () => request<{ challenge: DailyChallenge }>("/game/daily-challenge"),
  getDetectSamples: () => request<{ samples: Array<{ id: string; type: string; content: string; answer: string; explanation: string }> }>("/game/detect-samples"),
  evaluateMission: (missionId: string, answer: string) =>
    request<EvaluationResult>("/game/evaluate", {
      method: "POST",
      body: JSON.stringify({ missionId, answer })
    }),
  createPlayer: (nickname: string) =>
    request<{ player: Player }>("/players", {
      method: "POST",
      body: JSON.stringify({ nickname })
    }),
  getPlayer: (id: number) => request<{ player: Player; progress: ProgressItem[] }>(`/players/${id}`),
  updateProgress: (playerId: number, payload: { missionId: string; score: number; completed: boolean; xpEarned: number; coinsEarned: number }) =>
    request<{ player: Player; progress: ProgressItem[] }>(`/players/${playerId}/progress`, {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  getAdminStats: () => request<{ stats: Record<string, unknown>; players: Player[]; leaderboard: Player[] }>("/admin/stats")
};
