interface LevelBadgeProps {
  level: number;
}

function getLevelColor(level: number): string {
  const colors = [
    'from-mint to-mint',
    'from-sky-garden to-sky-garden',
    'from-lavender to-lavender',
    'from-peach to-peach',
    'from-yellow-200 to-yellow-300',
  ];

  if (level <= 10) return colors[0];
  if (level <= 20) return colors[1];
  if (level <= 30) return colors[2];
  if (level <= 40) return colors[3];
  return colors[4];
}

export function LevelBadge({ level }: LevelBadgeProps) {
  const displayLevel = Math.min(level, 50);
  const colorClass = getLevelColor(displayLevel);

  return (
    <div className={`bg-gradient-to-r ${colorClass} rounded-full w-16 h-16 flex items-center justify-center shadow-lg`}>
      <div className="text-center">
        <div className="text-xs text-white/70 font-medium">LVL</div>
        <div className="text-2xl font-bold text-white">{displayLevel}</div>
      </div>
    </div>
  );
}
