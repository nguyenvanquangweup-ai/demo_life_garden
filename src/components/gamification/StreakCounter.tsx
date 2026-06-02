import { motion } from 'framer-motion';

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.span
        animate={{
          color: streak >= 7 ? ['#FF6B6B', '#FF8E72'] : '#999',
        }}
        transition={{
          duration: streak >= 7 ? 1 : 0,
          repeat: streak >= 7 ? Infinity : 0,
          repeatType: 'reverse',
        }}
        className="text-2xl"
      >
        🔥
      </motion.span>
      <div>
        <div className="text-xs text-gray-600 font-medium">Chuỗi Liên Tiếp</div>
        <div className="text-lg font-bold text-gray-800">{streak} ngày</div>
      </div>
    </div>
  );
}
