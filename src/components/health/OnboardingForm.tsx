import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityLevel, Gender, Goal, UserProfile } from '@/types';
import { calcHealthMetrics } from '@/utils/healthCalc';
import { GlassCard } from '@/components/ui/GlassCard';

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

interface FormData {
  weight: string;
  height: string;
  age: string;
  gender: Gender;
  goalWeight: string;
  activityLevel: ActivityLevel;
  workoutsPerWeek: string;
  goal: Goal;
}

interface OnboardingFormProps {
  onComplete: (profile: UserProfile) => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    goalWeight: '',
    activityLevel: 'moderate',
    workoutsPerWeek: '3',
    goal: 'lose',
  });

  const handleChange = (field: keyof FormData, value: string | Gender | ActivityLevel | Goal) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseFloat(formData.age);

      if (!formData.weight || weight < 20 || weight > 300) {
        newErrors.weight = 'Weight must be between 20–300 kg';
      }
      if (!formData.height || height < 100 || height > 250) {
        newErrors.height = 'Height must be between 100–250 cm';
      }
      if (!formData.age || age < 13 || age > 120) {
        newErrors.age = 'Age must be between 13–120';
      }
    }

    if (currentStep === 2) {
      const goalWeight = parseFloat(formData.goalWeight);
      const weight = parseFloat(formData.weight);

      if (!formData.goalWeight || goalWeight < 20 || goalWeight > 300) {
        newErrors.goalWeight = 'Goal weight must be between 20–300 kg';
      }
      if (weight && goalWeight && Math.abs(weight - goalWeight) < 0.5) {
        newErrors.goalWeight = 'Goal weight must differ from current weight';
      }
      if (!formData.workoutsPerWeek) {
        newErrors.workoutsPerWeek = 'Select workouts per week';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const goToPrevStep = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const handleSubmit = () => {
    try {
      console.log('Form data:', formData);

      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseFloat(formData.age);
      const goalWeight = parseFloat(formData.goalWeight);
      const workoutsPerWeek = parseFloat(formData.workoutsPerWeek);

      if (isNaN(weight) || isNaN(height) || isNaN(age) || isNaN(goalWeight) || isNaN(workoutsPerWeek)) {
        alert('⚠️ Vui lòng điền đầy đủ số liệu hợp lệ');
        console.error('Invalid numbers:', { weight, height, age, goalWeight, workoutsPerWeek });
        return;
      }

      const profile: UserProfile = {
        weight,
        height,
        age,
        gender: formData.gender,
        goalWeight,
        workoutsPerWeek,
        activityLevel: formData.activityLevel,
        goal: formData.goal,
        createdAt: new Date().toISOString(),
        weightHistory: [
          {
            date: new Date().toLocaleDateString('sv-SE'),
            weight,
          },
        ],
      };

      console.log('Profile created:', profile);
      onComplete(profile);
    } catch (error) {
      console.error('Submit error:', error);
      alert('❌ Có lỗi khi tạo vườn: ' + (error as Error).message);
    }
  };

  const metrics = calcHealthMetrics({
    weight: parseFloat(formData.weight) || 0,
    height: parseFloat(formData.height) || 0,
    age: parseFloat(formData.age) || 0,
    gender: formData.gender,
    goalWeight: parseFloat(formData.goalWeight) || 0,
    workoutsPerWeek: parseFloat(formData.workoutsPerWeek) || 0,
    activityLevel: formData.activityLevel,
    goal: formData.goal,
    createdAt: '',
    weightHistory: [],
  });

  return (
    <div className="min-h-screen garden-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-mint/20 to-sky-garden/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-lavender/20 to-peach/20 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-mint via-sky-garden to-lavender bg-clip-text text-transparent">
          🌿 Vườn Sống
        </h1>
        <p className="text-center text-gray-600 mb-8">Bắt đầu hành trình sức khỏe của bạn</p>

        <GlassCard className="p-8 max-h-[80vh] overflow-y-auto">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Chỉ Số Cơ Thể
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cân Nặng (kg)
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleChange('weight', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/10 text-gray-800 focus:outline-none focus:border-white/60"
                      placeholder="70"
                    />
                    {errors.weight && (
                      <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chiều Cao (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleChange('height', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/10 text-gray-800 focus:outline-none focus:border-white/60"
                      placeholder="170"
                    />
                    {errors.height && (
                      <p className="text-red-500 text-xs mt-1">{errors.height}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tuổi
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/10 text-gray-800 focus:outline-none focus:border-white/60"
                      placeholder="25"
                    />
                    {errors.age && (
                      <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giới Tính
                    </label>
                    <div className="flex gap-4">
                      {(['male', 'female'] as const).map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={() => handleChange('gender', g)}
                          />
                          <span className="text-gray-700">
                            {g === 'male' ? 'Nam' : 'Nữ'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    onClick={goToNextStep}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-mint to-sky-garden text-white font-medium hover:shadow-xl transition-smooth hover-lift"
                  >
                    Tiếp Theo →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Mục Tiêu Của Bạn
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cân Nặng Mục Tiêu (kg)
                    </label>
                    <input
                      type="number"
                      value={formData.goalWeight}
                      onChange={(e) => handleChange('goalWeight', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/10 text-gray-800 focus:outline-none focus:border-white/60"
                      placeholder="65"
                    />
                    {errors.goalWeight && (
                      <p className="text-red-500 text-xs mt-1">{errors.goalWeight}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mục Tiêu
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) =>
                        handleChange('goal', e.target.value as Goal)
                      }
                      className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/10 text-gray-800 focus:outline-none focus:border-white/60"
                    >
                      <option value="lose">Giảm Cân</option>
                      <option value="maintain">Giữ Cân</option>
                      <option value="gain">Tăng Cân</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Buổi Tập Mỗi Tuần
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="7"
                      value={formData.workoutsPerWeek}
                      onChange={(e) => handleChange('workoutsPerWeek', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/10 text-gray-800 focus:outline-none focus:border-white/60"
                    />
                    {errors.workoutsPerWeek && (
                      <p className="text-red-500 text-xs mt-1">{errors.workoutsPerWeek}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mức Độ Vận Động Hằng Ngày
                    </label>
                    <select
                      value={formData.activityLevel}
                      onChange={(e) =>
                        handleChange('activityLevel', e.target.value as ActivityLevel)
                      }
                      className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/10 text-gray-800 focus:outline-none focus:border-white/60"
                    >
                      <option value="sedentary">Ít vận động (hoặc không)</option>
                      <option value="light">Nhẹ (1–3 ngày/tuần)</option>
                      <option value="moderate">Vừa phải (3–5 ngày/tuần)</option>
                      <option value="active">Tích cực (6–7 ngày/tuần)</option>
                      <option value="very_active">Rất tích cực (công việc vật lý)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between gap-3 mt-8">
                  <button
                    onClick={goToPrevStep}
                    className="px-6 py-2 rounded-xl bg-white/20 text-gray-800 font-medium hover:bg-white/40 transition-smooth hover-scale border border-white/30"
                  >
                    ← Quay Lại
                  </button>
                  <button
                    onClick={goToNextStep}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-mint to-sky-garden text-white font-medium hover:shadow-lg transition"
                  >
                    Xem Lại
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Kế Hoạch Vườn Của Bạn
                </h2>

                <div className="space-y-4 text-gray-800">
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">BMI</span>
                      <span className="font-bold">
                        {metrics.bmi} ({metrics.bmiCategory})
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">TDEE Hàng Ngày</span>
                      <span className="font-bold">{metrics.tdee} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Mục Tiêu Hàng Ngày</span>
                      <span className="font-bold">
                        {metrics.dailyCalorieTarget} kcal
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Nhiệm Vụ Hàng Ngày</h3>
                    <ul className="space-y-1 text-sm">
                      <li>💧 Uống 2L nước</li>
                      <li>🚶 Đi bộ 8.000 bước</li>
                      <li>💪 Tập luyện / Cardio</li>
                      <li>🍽️ Đạt mục tiêu calo</li>
                      <li>😴 Ngủ 7+ giờ</li>
                    </ul>
                  </div>

                  <p className="text-xs text-gray-600 mt-4">
                    Hoàn thành các nhiệm vụ hàng ngày để phát triển vườn của bạn. Nhìn nó nở hoa khi bạn tiến bộ!
                  </p>
                </div>

                <div className="flex justify-between gap-3 mt-8">
                  <button
                    onClick={goToPrevStep}
                    className="px-6 py-2 rounded-xl bg-white/20 text-gray-800 font-medium hover:bg-white/40 transition-smooth hover-scale border border-white/30"
                  >
                    ← Quay Lại
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-lavender to-peach text-white font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-smooth cursor-pointer"
                  >
                    ✨ Tạo Vườn Của Tôi
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </div>
  );
}
