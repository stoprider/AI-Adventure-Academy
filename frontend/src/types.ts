export interface Player {
  id: number;
  nickname: string;
  level: number;
  xp: number;
  coins: number;
  achievements: string;
  created_at: string;
}

export interface ProgressItem {
  id: number;
  player_id: number;
  mission_id: string;
  score: number;
  completed: number;
  updated_at: string;
}

export interface Mission {
  id: string;
  title: string;
  level: number;
  category: "image" | "chat" | "detect" | "problem" | "ethics";
  prompt: string;
  description: string;
  objective: string;
  explanation: string;
  xp_reward: number;
  coin_reward: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  level: number;
  category: "image" | "chat" | "detect" | "problem" | "ethics";
  prompt: string;
  description: string;
  objective: string;
  explanation: string;
  xp_reward: number;
  coin_reward: number;
}

export interface ToastMessage {
  id: number;
  title: string;
  description: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  tip: string;
}

export interface CelebrationState {
  missionTitle: string;
  score: number;
  xpEarned: number;
  coinsEarned: number;
}

export interface EvaluationResult {
  score: number;
  matchedKeywords: string[];
  feedback: string;
  completed: boolean;
  xpEarned: number;
  coinsEarned: number;
  explanation: string;
}
