import { ActivityLevel, BMICategory, Goal, HealthMetrics, UserProfile } from '@/types';

export function calcBMR(profile: UserProfile): number {
  const { weight, height, age, gender } = profile;

  // Harris-Benedict formula (revised by Roza & Shizgal)
  if (gender === 'male') {
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    return 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
  }
}

function getActivityMultiplier(level: ActivityLevel): number {
  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return multipliers[level];
}

export function calcTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const multiplier = getActivityMultiplier(activityLevel);
  return Math.round(bmr * multiplier);
}

export function calcDailyCalorieTarget(tdee: number, goal: Goal): number {
  switch (goal) {
    case 'lose':
      return Math.round(tdee - 500);
    case 'gain':
      return Math.round(tdee + 300);
    case 'maintain':
    default:
      return tdee;
  }
}

export function calcBMI(weight: number, height: number): number {
  const heightM = height / 100;
  return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

export function calcHealthMetrics(profile: UserProfile): HealthMetrics {
  const bmr = calcBMR(profile);
  const tdee = calcTDEE(bmr, profile.activityLevel);
  const dailyCalorieTarget = calcDailyCalorieTarget(tdee, profile.goal);
  const bmi = calcBMI(profile.weight, profile.height);
  const bmiCategory = getBMICategory(bmi);

  return {
    bmi,
    bmiCategory,
    bmr: Math.round(bmr),
    tdee,
    dailyCalorieTarget,
  };
}
