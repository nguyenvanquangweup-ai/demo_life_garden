import { motion, AnimatePresence } from 'framer-motion';
import { GardenStage, TaskCompletion } from '@/types';

interface SingleTreeProps {
  stage: GardenStage;
  tasks: TaskCompletion[];
  completionPercent: number;
}

export function SingleTree({ stage, completionPercent }: SingleTreeProps) {
  // Tree growth levels based on completion
  const getTreeLevel = (percent: number) => {
    if (percent >= 100) return 5;
    if (percent >= 80) return 4;
    if (percent >= 60) return 3;
    if (percent >= 40) return 2;
    if (percent >= 20) return 1;
    return 0;
  };

  const treeLevel = getTreeLevel(completionPercent);

  // Flower petals
  const flowers = Array.from({ length: Math.max(0, (treeLevel - 2) * 2) }).map((_, i) => ({
    id: i,
    x: 150 + (Math.random() - 0.5) * 80,
    y: 120 + (Math.random() - 0.5) * 60,
  }));

  // Fruits
  const fruits = Array.from({ length: Math.max(0, (treeLevel - 3) * 3) }).map((_, i) => ({
    id: i,
    x: 150 + (Math.random() - 0.5) * 100,
    y: 200 + (Math.random() - 0.5) * 80,
  }));

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg
        viewBox="0 0 400 600"
        className="w-full max-w-md h-auto drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky gradient background */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity={stage >= 3 ? 1 : 0.3} />
            <stop offset="100%" stopColor="#E0F6FF" stopOpacity={1} />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="trunkGradient">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="100%" stopColor="#654321" />
          </radialGradient>

          <radialGradient id="leafGradient">
            <stop offset="0%" stopColor="#7CB342" />
            <stop offset="100%" stopColor="#558B2F" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="400" height="600" fill="url(#skyGradient)" />

        {/* Ground */}
        <ellipse cx="200" cy="550" rx="120" ry="30" fill="#A8D8A8" opacity="0.6" />

        {/* TRUNK - Level 0+ */}
        <motion.g
          initial={{ scaleY: 0 }}
          animate={{ scaleY: completionPercent > 0 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: '200px 500px' }}
        >
          <rect
            x="170"
            y="320"
            width="60"
            height="180"
            fill="url(#trunkGradient)"
            rx="8"
            filter="url(#glow)"
          />
          {/* Trunk shadow for 3D */}
          <rect
            x="170"
            y="320"
            width="15"
            height="180"
            fill="rgba(0,0,0,0.2)"
            rx="8"
          />
        </motion.g>

        {/* FOLIAGE - Bottom Layer - Level 1+ */}
        <AnimatePresence>
          {treeLevel >= 1 && (
            <motion.g
              key="foliage-1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Large base leaves */}
              <ellipse
                cx="120"
                cy="280"
                rx="70"
                ry="80"
                fill="url(#leafGradient)"
                opacity="0.9"
                filter="url(#glow)"
              />
              <ellipse
                cx="280"
                cy="280"
                rx="70"
                ry="80"
                fill="url(#leafGradient)"
                opacity="0.9"
                filter="url(#glow)"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* FOLIAGE - Middle Layer - Level 2+ */}
        <AnimatePresence>
          {treeLevel >= 2 && (
            <motion.g
              key="foliage-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ellipse
                cx="200"
                cy="200"
                rx="90"
                ry="100"
                fill="#7CB342"
                opacity="0.95"
                filter="url(#glow)"
              />
              <ellipse
                cx="150"
                cy="180"
                rx="60"
                ry="70"
                fill="url(#leafGradient)"
                opacity="0.85"
              />
              <ellipse
                cx="250"
                cy="180"
                rx="60"
                ry="70"
                fill="url(#leafGradient)"
                opacity="0.85"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* FOLIAGE - Top Layer - Level 3+ */}
        <AnimatePresence>
          {treeLevel >= 3 && (
            <motion.g
              key="foliage-3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <circle cx="200" cy="120" r="80" fill="#8BC34A" opacity="0.9" filter="url(#glow)" />
              <ellipse
                cx="140"
                cy="100"
                rx="50"
                ry="60"
                fill="#7CB342"
                opacity="0.8"
              />
              <ellipse
                cx="260"
                cy="100"
                rx="50"
                ry="60"
                fill="#7CB342"
                opacity="0.8"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* FLOWERS - Level 3+ */}
        <AnimatePresence>
          {treeLevel >= 3 &&
            flowers.map((flower, idx) => (
              <motion.g
                key={`flower-${idx}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
              >
                {/* Petals */}
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <motion.ellipse
                    key={angle}
                    cx={flower.x}
                    cy={flower.y}
                    rx="8"
                    ry="14"
                    fill="#FF69B4"
                    opacity="0.8"
                    transform={`rotate(${angle} ${flower.x} ${flower.y})`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  />
                ))}
                {/* Flower center */}
                <circle cx={flower.x} cy={flower.y} r="5" fill="#FFD700" />
              </motion.g>
            ))}
        </AnimatePresence>

        {/* FRUITS - Level 4+ */}
        <AnimatePresence>
          {treeLevel >= 4 &&
            fruits.slice(0, Math.min(fruits.length, 6)).map((fruit, idx) => (
              <motion.g key={`fruit-${idx}`}>
                <motion.circle
                  cx={fruit.x}
                  cy={fruit.y}
                  r="12"
                  fill="#FF6B6B"
                  opacity="0.85"
                  filter="url(#glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.85 }}
                  transition={{ duration: 0.5, delay: 1.2 + idx * 0.15 }}
                  whileHover={{ scale: 1.1 }}
                />
                {/* Fruit shine */}
                <ellipse
                  cx={fruit.x - 3}
                  cy={fruit.y - 3}
                  rx="4"
                  ry="5"
                  fill="white"
                  opacity="0.4"
                />
              </motion.g>
            ))}
        </AnimatePresence>

        {/* SPARKLES - Level 5 */}
        <AnimatePresence>
          {treeLevel >= 5 &&
            Array.from({ length: 12 }).map((_, idx) => (
              <motion.circle
                key={`sparkle-${idx}`}
                cx={100 + Math.random() * 200}
                cy={80 + Math.random() * 200}
                r="2"
                fill="#FFD700"
                opacity="0.6"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: idx * 0.1,
                }}
              />
            ))}
        </AnimatePresence>
      </svg>

      {/* Progress info below tree */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-2xl font-bold text-gray-800 mb-2">
          {completionPercent.toFixed(0)}%
        </div>
        <div className="text-sm text-gray-600">
          {treeLevel === 0 && '🌱 Hạt giống...'}
          {treeLevel === 1 && '🌿 Cây bé mọc lá...'}
          {treeLevel === 2 && '🌱 Cây lớn dần...'}
          {treeLevel === 3 && '🌸 Cây nở hoa rồi!'}
          {treeLevel === 4 && '🌺 Cây nở hoa đẹp!'}
          {treeLevel === 5 && '🎉 Cây hoàn hảo!'}
        </div>
      </motion.div>
    </div>
  );
}
