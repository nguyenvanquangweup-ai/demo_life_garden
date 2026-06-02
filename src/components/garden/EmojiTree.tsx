import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface EmojiTreeProps {
  completionPercent: number;
}

export function EmojiTree({ completionPercent }: EmojiTreeProps) {
  const [prevPercent, setPrevPercent] = useState(0);
  const [hasLeveledUp, setHasLeveledUp] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const getTreeLevel = (percent: number) => {
    if (percent >= 100) return 5;
    if (percent >= 80) return 4;
    if (percent >= 60) return 3;
    if (percent >= 40) return 2;
    if (percent >= 20) return 1;
    return 0;
  };

  const level = getTreeLevel(completionPercent);
  const prevLevel = getTreeLevel(prevPercent);

  // Detect level up or any progress
  useEffect(() => {
    if (completionPercent > prevPercent) {
      // Task completed!
      if (level > prevLevel) {
        // Level up!
        setHasLeveledUp(true);
        setTimeout(() => setHasLeveledUp(false), 1000);
        // Create particles
        setParticles(
          Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            x: 45 + Math.random() * 10,
            y: 40 + Math.random() * 10,
          }))
        );
      }
    }
    setPrevPercent(completionPercent);
  }, [completionPercent]);

  const stages = [
    { emoji: '🌱', label: 'Hạt giống', description: 'Bắt đầu hành trình...' },
    { emoji: '🌿', label: 'Cây bé', description: 'Cây đang mọc lá...' },
    { emoji: '🌳', label: 'Cây lớn', description: 'Cây phát triển mạnh...' },
    { emoji: '🌸', label: 'Nở hoa', description: 'Cây bắt đầu nở hoa...' },
    { emoji: '🌺', label: 'Cây đẹp', description: 'Cây nở hoa rực rỡ...' },
    { emoji: '🌳', label: 'Hoàn hảo', description: 'Cây toàn vẹn, nở hoa & kết trái! 🍎' },
  ];

  const current = stages[level];

  // Floating particles for animation
  const floatingParticles = Array.from({ length: Math.min(level * 3, 12) }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.1,
    size: 4 + Math.random() * 6,
  }));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating particles */}
      {floatingParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: ['#FFD700', '#FF69B4', '#FF6B6B', '#A8D8A8'][p.id % 4],
            opacity: 0.6,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Level up burst particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={`burst-${p.id}`}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: 'linear-gradient(135deg, #FFD700, #FF69B4)',
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              scale: 0,
              opacity: 0,
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
            }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main tree emoji - Animate on progress */}
      <motion.div
        className="text-9xl mb-6"
        key={level}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          animate={{
            scale: hasLeveledUp ? [1, 1.15, 1] : [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
            filter: hasLeveledUp
              ? ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
              : 'brightness(1)',
          }}
          transition={{
            duration: hasLeveledUp ? 0.6 : 3,
            repeat: hasLeveledUp ? 1 : Infinity,
          }}
        >
          {current.emoji}
        </motion.div>
      </motion.div>

      {/* Tree info */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3
          className="text-3xl font-bold bg-gradient-to-r from-mint via-sky-garden to-lavender bg-clip-text text-transparent mb-2"
          key={`label-${level}`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          {current.label}
        </motion.h3>

        <motion.p
          className="text-gray-600 text-lg mb-4"
          key={`desc-${level}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {current.description}
        </motion.p>

        {/* Progress bar - Smooth animation */}
        <div className="w-64 h-4 bg-white/30 rounded-full overflow-hidden border-2 border-white/50 backdrop-blur">
          <motion.div
            className="h-full bg-gradient-to-r from-mint to-sky-garden"
            initial={{ width: `${prevPercent}%` }}
            animate={{ width: `${completionPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <motion.p
          className="text-sm text-gray-600 mt-2 font-bold"
          key={`percent-${Math.round(completionPercent)}`}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          {Math.round(completionPercent)}% hoàn thành
        </motion.p>
      </motion.div>

      {/* Growth stages indicator */}
      <motion.div
        className="mt-8 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`stage-${i}`}
            className={`w-3 h-3 rounded-full transition-all ${
              i <= level
                ? 'bg-gradient-to-r from-mint to-sky-garden shadow-lg'
                : 'bg-white/30'
            }`}
            animate={
              i <= level
                ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 0px rgba(168,216,168,0)',
                      '0 0 12px rgba(168,216,168,0.8)',
                      '0 0 0px rgba(168,216,168,0)',
                    ],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            initial={i === level ? { scale: 0 } : {}}
            whileInView={i === level ? { scale: [0, 1.3, 1] } : {}}
            transition={i === level ? { duration: 0.5 } : {}}
          />
        ))}
      </motion.div>

      {/* Level up text */}
      <AnimatePresence>
        {hasLeveledUp && (
          <motion.div
            className="absolute top-20 text-4xl font-bold text-yellow-500 pointer-events-none"
            initial={{ scale: 0, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✨ LEVEL UP! ✨
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
