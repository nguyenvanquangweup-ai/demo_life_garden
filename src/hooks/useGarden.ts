import { useEffect } from 'react';
import { GardenContextValue } from '@/context/GardenContext';
import { TaskId, UserProfile } from '@/types';
import { useTaskManager } from './useTaskManager';
import { useGamification } from './useGamification';
import { calcHealthMetrics } from '@/utils/healthCalc';
import { getGardenStage } from '@/utils/gardenLogic';
import { TASK_DEFINITIONS } from '@/utils/taskDefinitions';
import { loadData, saveData } from '@/utils/storage';

export function useGarden(): GardenContextValue {
  const taskManager = useTaskManager();
  const gamification = useGamification();

  const data = loadData();
  const userProfile = data.userProfile;
  const healthMetrics = data.healthMetrics;
  const gardenStage = getGardenStage(taskManager.completionPercent);

  // When all tasks are completed, update streak
  useEffect(() => {
    if (taskManager.isAllComplete) {
      gamification.checkAndUpdateStreak();
    }
  }, [taskManager.isAllComplete, gamification]);

  const completeTask = (taskId: TaskId) => {
    const xpEarned = taskManager.completeTask(taskId);
    if (xpEarned > 0) {
      gamification.addXP(xpEarned);
    }
  };

  const uncompleteTask = (taskId: TaskId) => {
    taskManager.uncompleteTask(taskId);
  };

  const setUserProfile = (profile: UserProfile) => {
    const data = loadData();
    data.userProfile = profile;
    data.healthMetrics = calcHealthMetrics(profile);
    saveData(data);
    // Reload page to reflect userProfile change
    setTimeout(() => window.location.reload(), 300);
  };

  return {
    userProfile,
    healthMetrics,
    setUserProfile,
    tasks: taskManager.tasks,
    taskDefs: TASK_DEFINITIONS,
    completeTask,
    uncompleteTask,
    completionPercent: taskManager.completionPercent,
    gardenStage,
    xp: gamification.xp,
    level: gamification.level,
    streak: gamification.streak,
    achievements: gamification.achievements,
    pendingAchievements: gamification.pendingAchievements,
    dismissAchievement: gamification.dismissPendingAchievement,
  };
}
