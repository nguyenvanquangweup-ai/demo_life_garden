import { GardenStage, TaskCompletion } from '@/types';

export function getCompletionPercent(tasks: TaskCompletion[]): number {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter((t) => t.completedAt !== null).length;
  return Math.round((completed / tasks.length) * 100);
}

export function getGardenStage(completionPercent: number): GardenStage {
  if (completionPercent >= 100) return 5;
  if (completionPercent >= 80) return 4;
  if (completionPercent >= 60) return 3;
  if (completionPercent >= 40) return 2;
  if (completionPercent >= 20) return 1;
  return 0;
}

export function getPlantStage(
  taskCompleted: boolean,
  streakDays: number
): 0 | 1 | 2 | 3 {
  if (!taskCompleted) return 0;
  if (streakDays >= 30) return 3;
  if (streakDays >= 10) return 2;
  return 1;
}

export function getVisibleCreatures(
  stage: GardenStage
): Array<'butterfly' | 'bird' | 'fish'> {
  const creatures: Array<'butterfly' | 'bird' | 'fish'> = [];
  if (stage >= 3) creatures.push('butterfly');
  if (stage >= 4) creatures.push('bird');
  if (stage >= 5) creatures.push('fish');
  return creatures;
}

export interface WeatherConfig {
  skyColor: string;
  sunVisible: boolean;
  sunIntensity: number;
  cloudsVisible: boolean;
  hasRain: boolean;
}

export function getWeatherConfig(stage: GardenStage): WeatherConfig {
  const configs: Record<GardenStage, WeatherConfig> = {
    0: {
      skyColor: '#7a8ba8',
      sunVisible: false,
      sunIntensity: 0,
      cloudsVisible: true,
      hasRain: false,
    },
    1: {
      skyColor: '#8a9ab8',
      sunVisible: false,
      sunIntensity: 0,
      cloudsVisible: true,
      hasRain: false,
    },
    2: {
      skyColor: '#9aabcc',
      sunVisible: false,
      sunIntensity: 0.3,
      cloudsVisible: true,
      hasRain: false,
    },
    3: {
      skyColor: '#a8c4e0',
      sunVisible: true,
      sunIntensity: 0.6,
      cloudsVisible: true,
      hasRain: false,
    },
    4: {
      skyColor: '#a8d4f0',
      sunVisible: true,
      sunIntensity: 0.85,
      cloudsVisible: false,
      hasRain: false,
    },
    5: {
      skyColor: '#ffd580',
      sunVisible: true,
      sunIntensity: 1,
      cloudsVisible: false,
      hasRain: false,
    },
  };
  return configs[stage];
}
