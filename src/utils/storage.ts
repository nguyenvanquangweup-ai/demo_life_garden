import {
  PersistedData,
  GardenState,
  DailyState,
  Achievement,
} from '@/types';

const STORAGE_KEY = 'life-garden-v1';
const SCHEMA_VERSION = 1;
const MAX_HISTORY_ENTRIES = 100;

export function getTodayStr(): string {
  return new Date().toLocaleDateString('sv-SE');
}

export function getDefaultGardenState(): GardenState {
  const achievements: Achievement[] = [
    {
      id: 'first_bloom',
      label: 'First Bloom',
      description: 'Complete your first task',
      unlockedAt: null,
    },
    {
      id: 'green_thumb',
      label: 'Green Thumb',
      description: 'Maintain a 7-day streak',
      unlockedAt: null,
    },
    {
      id: 'garden_master',
      label: 'Garden Master',
      description: 'Maintain a 30-day streak',
      unlockedAt: null,
    },
    {
      id: 'century_club',
      label: 'Century Club',
      description: 'Complete 100 tasks',
      unlockedAt: null,
    },
    {
      id: 'weight_warrior',
      label: 'Weight Warrior',
      description: 'Reach your weight goal',
      unlockedAt: null,
    },
  ];

  return {
    totalXP: 0,
    level: 1,
    streak: 0,
    lastCompletionDate: null,
    achievements,
    taskHistory: [],
  };
}

export function getDefaultDailyState(date: string): DailyState {
  return {
    date,
    tasks: [
      { taskId: 'water', completedAt: null },
      { taskId: 'breakfast', completedAt: null },
      { taskId: 'lunch', completedAt: null },
      { taskId: 'dinner', completedAt: null },
      { taskId: 'vegetables', completedAt: null },
      { taskId: 'steps', completedAt: null },
      { taskId: 'cardio', completedAt: null },
      { taskId: 'strength', completedAt: null },
      { taskId: 'yoga', completedAt: null },
      { taskId: 'sports', completedAt: null },
      { taskId: 'sleep', completedAt: null },
      { taskId: 'earlybed', completedAt: null },
      { taskId: 'bedtime', completedAt: null },
      { taskId: 'meditate', completedAt: null },
      { taskId: 'breathe', completedAt: null },
      { taskId: 'journal', completedAt: null },
      { taskId: 'socialize', completedAt: null },
      { taskId: 'gratitude', completedAt: null },
      { taskId: 'hobby', completedAt: null },
      { taskId: 'learning', completedAt: null },
    ],
    totalXPEarnedToday: 0,
  };
}

function getDefaultPersistedData(): PersistedData {
  const today = getTodayStr();
  return {
    schemaVersion: SCHEMA_VERSION,
    userProfile: null,
    healthMetrics: null,
    gardenState: getDefaultGardenState(),
    dailyState: getDefaultDailyState(today),
  };
}

export function loadData(): PersistedData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultPersistedData();
    }

    const data: PersistedData = JSON.parse(stored);

    // Handle schema migrations if needed
    if (data.schemaVersion !== SCHEMA_VERSION) {
      // TODO: Add migrations here if schema changes
    }

    // Migrate: Add missing tasks from old versions
    const today = getTodayStr();
    const defaultTasks = getDefaultDailyState(today).tasks;
    const currentTaskIds = new Set(data.dailyState.tasks.map(t => t.taskId));

    // Check if we're missing tasks
    if (data.dailyState.tasks.length < defaultTasks.length) {
      const missingTasks = defaultTasks.filter(
        task => !currentTaskIds.has(task.taskId)
      );
      data.dailyState.tasks.push(...missingTasks);
    }

    return data;
  } catch (err) {
    console.error('Error loading persisted data:', err);
    return getDefaultPersistedData();
  }
}

export function saveData(data: PersistedData): void {
  // Cap task history at MAX_HISTORY_ENTRIES
  const capped = {
    ...data,
    gardenState: {
      ...data.gardenState,
      taskHistory: data.gardenState.taskHistory.slice(-MAX_HISTORY_ENTRIES),
    },
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(capped));
  } catch (err) {
    if ((err as any).code === 'QuotaExceededError') {
      // Trim history more aggressively and retry
      const trimmed = {
        ...capped,
        gardenState: {
          ...capped.gardenState,
          taskHistory: capped.gardenState.taskHistory.slice(-10),
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      } catch (retryErr) {
        console.error('Failed to save data even after trimming:', retryErr);
      }
    } else {
      console.error('Error saving persisted data:', err);
    }
  }
}

export function resetData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting data:', err);
  }
}
