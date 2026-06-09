import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { storage } from "../lib/storage";
import { DailyChallenge, Mission, Player, ProgressItem } from "../types";

export function useAcademy() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(storage.getSoundEnabled());

  useEffect(() => {
    const bootstrap = async () => {
      const missionData = await api.getMissions();
      setMissions(missionData.missions);
      const dailyData = await api.getDailyChallenge();
      setDailyChallenge(dailyData.challenge);

      const playerId = storage.getPlayerId();
      if (playerId) {
        try {
          const playerData = await api.getPlayer(playerId);
          setPlayer(playerData.player);
          setProgress(playerData.progress);
        } catch {
          storage.setPlayerId(null);
        }
      }
      setLoading(false);
    };

    void bootstrap();
  }, []);

  const registerGuest = async (nickname: string) => {
    const result = await api.createPlayer(nickname);
    setPlayer(result.player);
    storage.setPlayerId(result.player.id);
  };

  const syncProgress = async (payload: {
    missionId: string;
    score: number;
    completed: boolean;
    xpEarned: number;
    coinsEarned: number;
  }) => {
    if (!player) return;
    const result = await api.updateProgress(player.id, payload);
    setPlayer(result.player);
    setProgress(result.progress);
  };

  const updateSound = (enabled: boolean) => {
    setSoundEnabled(enabled);
    storage.setSoundEnabled(enabled);
  };

  return {
    player,
    progress,
    missions,
    dailyChallenge,
    loading,
    soundEnabled,
    registerGuest,
    syncProgress,
    updateSound
  };
}
