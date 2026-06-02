import { motion } from 'framer-motion';
import { getXPThresholdForLevel } from '@/hooks/useGamification';

interface XPBarProps {
  xp: number;
  level: number;
}

export function XPBar({ xp, level }: XPBarProps) {
  const currentThreshold = getXPThresholdForLevel(level);
  const nextThreshold = getXPThresholdForLevel(level + 1);
  const xpIntoLevel = xp - currentThreshold;
  const xpNeededForNext = nextThreshold - currentThreshold;
  const percentage = Math.min(100, (xpIntoLevel / xpNeededForNext) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium text-gray-700">
        <span>Cấp Độ {Math.min(level, 50)}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden border border-white/30">
        <motion.div
          className="h-full bg-gradient-to-r from-mint to-sky-garden"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}
