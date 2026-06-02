import { useEffect, useState, useCallback } from 'react';
import { DailyState, TaskId } from '@/types';
import {
  loadData,
  saveData,
  getTodayStr,
  getDefaultDailyState,
} from '@/utils/storage';
import { getCompletionPercent } from '@/utils/gardenLogic';

export interface UseTaskManagerReturn {
  tasks: DailyState['tasks'];
  completionPercent: number;
  isAllComplete: boolean;
  completeTask: (taskId: TaskId) => number; // Returns XP earned
  uncompleteTask: (taskId: TaskId) => void;
}

export function useTaskManager(
  onNewDay?: (newDate: string) => void
): UseTaskManagerReturn {
  const [dailyState, setDailyState] = useState<DailyState | null>(null);

  // Initialize on mount and check for date rollover
  useEffect(() => {
    const today = getTodayStr();
    const data = loadData();

    // Check if we need to roll over to a new day
    if (data.dailyState.date !== today) {
      // Archive yesterday if it has data
      if (data.dailyState.tasks.some((t) => t.completedAt !== null)) {
        data.gardenState.taskHistory.push(data.dailyState);
      }

      // Create fresh daily state for today
      const newDaily = getDefaultDailyState(today);
      data.dailyState = newDaily;
      saveData(data);

      onNewDay?.(today);
    }

    setDailyState(data.dailyState);
  }, [onNewDay]);

  // Periodic date check (every 60 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const today = getTodayStr();
      const data = loadData();

      if (data.dailyState.date !== today) {
        // Rollover detected
        if (data.dailyState.tasks.some((t) => t.completedAt !== null)) {
          data.gardenState.taskHistory.push(data.dailyState);
        }

        const newDaily = getDefaultDailyState(today);
        data.dailyState = newDaily;
        saveData(data);

        setDailyState(newDaily);
        onNewDay?.(today);
      }
    }, 60_000);

    return () => clearInterval(interval);
  }, [onNewDay]);

  const completeTask = useCallback((taskId: TaskId): number => {
    const data = loadData();
    const taskIndex = data.dailyState.tasks.findIndex((t) => t.taskId === taskId);

    if (taskIndex !== -1 && !data.dailyState.tasks[taskIndex].completedAt) {
      const now = new Date().toISOString();
      data.dailyState.tasks[taskIndex].completedAt = now;
      data.dailyState.totalXPEarnedToday += 15; // Base XP reward

      saveData(data);
      setDailyState({ ...data.dailyState });

      return 15;
    }

    return 0;
  }, []);

  const uncompleteTask = useCallback((taskId: TaskId) => {
    const data = loadData();
    const taskIndex = data.dailyState.tasks.findIndex((t) => t.taskId === taskId);

    if (taskIndex !== -1 && data.dailyState.tasks[taskIndex].completedAt) {
      data.dailyState.tasks[taskIndex].completedAt = null;
      data.dailyState.totalXPEarnedToday = Math.max(
        0,
        data.dailyState.totalXPEarnedToday - 15
      );

      saveData(data);
      setDailyState({ ...data.dailyState });
    }
  }, []);

  if (!dailyState) {
    return {
      tasks: [],
      completionPercent: 0,
      isAllComplete: false,
      completeTask,
      uncompleteTask,
    };
  }

  const completionPercent = getCompletionPercent(dailyState.tasks);
  const isAllComplete = completionPercent === 100;

  return {
    tasks: dailyState.tasks,
    completionPercent,
    isAllComplete,
    completeTask,
    uncompleteTask,
  };
}
