import { useGardenContext } from '@/context/GardenContext';
import { BMIGauge } from './BMIGauge';
import { GlassCard } from '@/components/ui/GlassCard';

export function HealthOverview() {
  const { userProfile, healthMetrics } = useGardenContext();

  if (!userProfile || !healthMetrics) {
    return <GlassCard className="p-6">Loading...</GlassCard>;
  }

  const weightProgress = userProfile.weight - userProfile.goalWeight;
  const progressPercent = Math.max(
    0,
    Math.min(100, ((Math.abs(weightProgress) / Math.abs(userProfile.weight - userProfile.goalWeight)) * 100) || 0)
  );

  return (
    <GlassCard className="p-6 flex flex-col h-full space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Tổng Quan Sức Khỏe</h2>
        <p className="text-xs text-gray-600">Hành trình sức khỏe của bạn</p>
      </div>

      <div className="flex justify-center">
        <BMIGauge bmi={healthMetrics.bmi} category={healthMetrics.bmiCategory} />
      </div>

      <div className="space-y-4">
        <div className="bg-white/20 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 font-medium">Calo Hàng Ngày</span>
            <span className="text-gray-800 font-bold">{healthMetrics.dailyCalorieTarget}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 font-medium">TDEE Hàng Ngày</span>
            <span className="text-gray-800 font-bold">{healthMetrics.tdee}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700 font-medium">Tiến Độ Cân Nặng</span>
            <span className="text-xs text-gray-600">
              {userProfile.weight.toFixed(1)}kg / {userProfile.goalWeight.toFixed(1)}kg
            </span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden border border-white/30">
            <div
              className="h-full bg-gradient-to-r from-mint to-sky-garden transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-600 text-center pt-4 border-t border-white/20">
        Mục tiêu: {userProfile.goal === 'lose' ? 'Giảm' : userProfile.goal === 'gain' ? 'Tăng' : 'Giữ'} cân nặng
      </div>
    </GlassCard>
  );
}
