import { createContext, useContext } from 'react';
import type {
  HealthMetrics,
  TaskCompletion,
  TaskDefinition,
  TaskId,
  UserProfile,
  GardenStage,
  AchievementId,
} from '@/types';
import type { Achievement } from '@/types/index';

export interface GardenContextValue {
  userProfile: UserProfile | null;
  healthMetrics: HealthMetrics | null;
  setUserProfile: (profile: UserProfile) => void;
  tasks: TaskCompletion[];
  taskDefs: TaskDefinition[];
  completeTask: (id: TaskId) => void;
  uncompleteTask: (id: TaskId) => void;
  completionPercent: number;
  gardenStage: GardenStage;
  xp: number;
  level: number;
  streak: number;
  achievements: Achievement[];
  pendingAchievements: AchievementId[];
  dismissAchievement: () => void;
}

export const GardenContext = createContext<GardenContextValue | null>(null);

export function useGardenContext(): GardenContextValue {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error('useGardenContext phải được dùng trong GardenContext.Provider');
  }
  return context;
}
