import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGardenContext } from '@/context/GardenContext';
import { GlassCard } from '@/components/ui/GlassCard';

const achievementLabels: Record<string, { label: string; emoji: string }> = {
  first_bloom: { label: 'Bông Hoa Đầu Tiên', emoji: '🌸' },
  green_thumb: { label: 'Bàn Tay Xanh', emoji: '👍' },
  garden_master: { label: 'Chủ Nhân Vườn', emoji: '🌳' },
  century_club: { label: 'Câu Lạc Bộ 100', emoji: '💯' },
  weight_warrior: { label: 'Chiến Binh Cân Nặng', emoji: '⚔️' },
};

export function AchievementToast() {
  const { pendingAchievements, dismissAchievement } = useGardenContext();
  const currentAchievement = pendingAchievements[0];

  useEffect(() => {
    if (!currentAchievement) return;

    const timer = setTimeout(() => {
      dismissAchievement();
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentAchievement, dismissAchievement]);

  const achData = currentAchievement ? achievementLabels[currentAchievement] : null;

  return (
    <AnimatePresence>
      {currentAchievement && achData && (
        <motion.div
          key={currentAchievement}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <GlassCard className="p-4 border-2 border-yellow-300/50 bg-gradient-to-r from-yellow-100/20 to-orange-100/20">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{achData.emoji}</span>
              <div>
                <h3 className="font-bold text-gray-800">{achData.label}</h3>
                <p className="text-xs text-gray-600">Đạt Thành Tích!</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
