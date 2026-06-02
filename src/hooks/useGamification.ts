import { useEffect, useState, useCallback } from 'react';
import { Achievement, AchievementId, DailyState, GardenState } from '@/types';
import { loadData, saveData, getTodayStr } from '@/utils/storage';

export interface UseGamificationReturn {
  xp: number;
  level: number;
  streak: number;
  achievements: Achievement[];
  pendingAchievements: AchievementId[];
  addXP: (amount: number) => void;
  checkAndUpdateStreak: () => void;
  dismissPendingAchievement: () => void;
}

function getXPThresholdForLevel(level: number): number {
  return level * level * 100;
}

function getLevelFromXP(totalXP: number): number {
  let level = 1;
  while (getXPThresholdForLevel(level + 1) <= totalXP) {
    level++;
  }
  return Math.min(level, 50);
}

function getTotalCompletedTasks(taskHistory: DailyState[]): number {
  return taskHistory.reduce((sum, day) => {
    return sum + day.tasks.filter((t) => t.completedAt !== null).length;
  }, 0);
}

function checkNewAchievements(
  gardenState: GardenState,
  userWeight?: number,
  userGoalWeight?: number
): AchievementId[] {
  const newUnlocked: AchievementId[] = [];

  // first_bloom: any task completed ever
  const firstBloom = gardenState.achievements.find((a) => a.id === 'first_bloom');
  if (
    firstBloom &&
    !firstBloom.unlockedAt &&
    getTotalCompletedTasks(gardenState.taskHistory) > 0
  ) {
    newUnlocked.push('first_bloom');
    firstBloom.unlockedAt = new Date().toISOString();
  }

  // green_thumb: streak >= 7
  const greenThumb = gardenState.achievements.find((a) => a.id === 'green_thumb');
  if (greenThumb && !greenThumb.unlockedAt && gardenState.streak >= 7) {
    newUnlocked.push('green_thumb');
    greenThumb.unlockedAt = new Date().toISOString();
  }

  // garden_master: streak >= 30
  const master = gardenState.achievements.find((a) => a.id === 'garden_master');
  if (master && !master.unlockedAt && gardenState.streak >= 30) {
    newUnlocked.push('garden_master');
    master.unlockedAt = new Date().toISOString();
  }

  // century_club: 100+ tasks completed
  const century = gardenState.achievements.find((a) => a.id === 'century_club');
  if (
    century &&
    !century.unlockedAt &&
    getTotalCompletedTasks(gardenState.taskHistory) >= 100
  ) {
    newUnlocked.push('century_club');
    century.unlockedAt = new Date().toISOString();
  }

  // weight_warrior: reached weight goal (5kg reduction from start)
  const warrior = gardenState.achievements.find((a) => a.id === 'weight_warrior');
  if (
    warrior &&
    !warrior.unlockedAt &&
    userWeight !== undefined &&
    userGoalWeight !== undefined
  ) {
    // Simplified: check if current is within 5kg of goal
    if (Math.abs(userWeight - userGoalWeight) < 5) {
      newUnlocked.push('weight_warrior');
      warrior.unlockedAt = new Date().toISOString();
    }
  }

  return newUnlocked;
}

export function useGamification(
  onStreakCheck?: () => void
): UseGamificationReturn {
  const [gardenState, setGardenState] = useState<GardenState | null>(null);
  const [pendingAchievements, setPendingAchievements] = useState<AchievementId[]>(
    []
  );

  // Initialize
  useEffect(() => {
    const data = loadData();
    setGardenState(data.gardenState);
  }, []);

  const addXP = useCallback((amount: number) => {
    const data = loadData();

    data.gardenState.totalXP += amount;
    data.gardenState.level = getLevelFromXP(data.gardenState.totalXP);

    // Check for achievements
    const newAchievements = checkNewAchievements(data.gardenState);
    if (newAchievements.length > 0) {
      setPendingAchievements((prev) => [...prev, ...newAchievements]);
    }

    saveData(data);
    setGardenState({ ...data.gardenState });
  }, []);

  const checkAndUpdateStreak = useCallback(() => {
    const today = getTodayStr();
    const data = loadData();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString('sv-SE');

    const last = data.gardenState.lastCompletionDate;

    if (last === today) {
      // Already counted today
      return;
    }

    if (last === yesterdayStr) {
      // Streak continues
      data.gardenState.streak += 1;
    } else {
      // Streak broken or first time
      data.gardenState.streak = 1;
    }

    data.gardenState.lastCompletionDate = today;

    // Check for streak achievements
    const newAchievements = checkNewAchievements(data.gardenState);
    if (newAchievements.length > 0) {
      setPendingAchievements((prev) => [...prev, ...newAchievements]);
    }

    saveData(data);
    setGardenState({ ...data.gardenState });
    onStreakCheck?.();
  }, [onStreakCheck]);

  const dismissPendingAchievement = useCallback(() => {
    setPendingAchievements((prev) => prev.slice(1));
  }, []);

  if (!gardenState) {
    return {
      xp: 0,
      level: 1,
      streak: 0,
      achievements: [],
      pendingAchievements: [],
      addXP,
      checkAndUpdateStreak,
      dismissPendingAchievement,
    };
  }

  return {
    xp: gardenState.totalXP,
    level: gardenState.level,
    streak: gardenState.streak,
    achievements: gardenState.achievements,
    pendingAchievements,
    addXP,
    checkAndUpdateStreak,
    dismissPendingAchievement,
  };
}

export { getXPThresholdForLevel };
