
export interface Quest {
  id: string;
  title: string;
  category: 'クエスト' | '日常' | '目標';
  experience: number;
  progress: number;
  completed: boolean;
  timeSpent: number;
  isRunning: boolean;
  startTime?: number;
  pausedTime?: number;
}

export interface CharacterStats {
  level: number;
  experience: number;
  experienceToNextLevel: number;
  focus: number;
  stamina: number;
  motivation: number;
}

export interface AppMode {
  type: '自分専用' | '家族共有';
}
