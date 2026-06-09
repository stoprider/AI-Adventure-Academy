export type MissionCategory =
  | "image"
  | "chat"
  | "detect"
  | "problem"
  | "ethics";

export interface Player {
  id: number;
  nickname: string;
  level: number;
  xp: number;
  coins: number;
  achievements: string;
  created_at: string;
}

export interface Mission {
  id: string;
  title: string;
  level: number;
  category: MissionCategory;
  prompt: string;
  description: string;
  objective: string;
  answer_key?: string[];
  explanation: string;
  xp_reward: number;
  coin_reward: number;
}
