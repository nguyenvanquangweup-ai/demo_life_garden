export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type Goal = 'lose' | 'maintain' | 'gain';
export type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';
export type TaskId = 'water' | 'breakfast' | 'lunch' | 'dinner' | 'vegetables' | 'steps' | 'cardio' | 'strength' | 'yoga' | 'sports' | 'sleep' | 'earlybed' | 'bedtime' | 'meditate' | 'breathe' | 'journal' | 'socialize' | 'gratitude' | 'hobby' | 'learning';
export type PlantType = 'blueFlower' | 'meadowGrass' | 'enduranceTree' | 'sunflower' | 'glowingMushroom';
export type GardenStage = 0 | 1 | 2 | 3 | 4 | 5;
export type AchievementId = 'first_bloom' | 'green_thumb' | 'garden_master' | 'century_club' | 'weight_warrior';

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface UserProfile {
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  goalWeight: number;
  workoutsPerWeek: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  createdAt: string;
  weightHistory: WeightEntry[];
}

export interface HealthMetrics {
  bmi: number;
  bmiCategory: BMICategory;
  bmr: number;
  tdee: number;
  dailyCalorieTarget: number;
}

export interface TaskDefinition {
  id: TaskId;
  label: string;
  description: string;
  xpReward: number;
  plantType: PlantType;
}

export interface TaskCompletion {
  taskId: TaskId;
  completedAt: string | null;
}

export interface DailyState {
  date: string;
  tasks: TaskCompletion[];
  totalXPEarnedToday: number;
}

export interface Achievement {
  id: AchievementId;
  label: string;
  description: string;
  unlockedAt: string | null;
}

export interface GardenState {
  totalXP: number;
  level: number;
  streak: number;
  lastCompletionDate: string | null;
  achievements: Achievement[];
  taskHistory: DailyState[];
}

export interface PersistedData {
  schemaVersion: number;
  userProfile: UserProfile | null;
  healthMetrics: HealthMetrics | null;
  gardenState: GardenState;
  dailyState: DailyState;
}
