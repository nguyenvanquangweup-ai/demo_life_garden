import { motion } from 'framer-motion';

interface QuickStatsProps {
  xp: number;
  level: number;
  streak: number;
  completionPercent: number;
}

export function QuickStats({ xp, level, streak, completionPercent }: QuickStatsProps) {
  const stats = [
    { label: 'Cấp Độ', value: level, icon: '⭐', color: 'from-yellow-200 to-yellow-300' },
    { label: 'Chuỗi', value: streak, icon: '🔥', color: 'from-orange-200 to-orange-300' },
    { label: 'XP', value: xp, icon: '✨', color: 'from-purple-200 to-purple-300' },
    { label: 'Tiến Độ', value: `${completionPercent}%`, icon: '🎯', color: 'from-pink-200 to-pink-300' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 text-center glass-effect`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-sm font-bold text-gray-800">{stat.value}</div>
          <div className="text-xs text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
