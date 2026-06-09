const PLAYER_KEY = "ai-adventure-academy-player-id";
const SOUND_KEY = "ai-adventure-academy-sound-enabled";

export const storage = {
  getPlayerId: () => {
    const value = localStorage.getItem(PLAYER_KEY);
    return value ? Number(value) : null;
  },
  setPlayerId: (playerId: number | null) => {
    if (playerId === null) {
      localStorage.removeItem(PLAYER_KEY);
      return;
    }
    localStorage.setItem(PLAYER_KEY, String(playerId));
  },
  getSoundEnabled: () => localStorage.getItem(SOUND_KEY) !== "false",
  setSoundEnabled: (enabled: boolean) => localStorage.setItem(SOUND_KEY, String(enabled))
};
