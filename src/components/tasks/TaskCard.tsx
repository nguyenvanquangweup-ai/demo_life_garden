import { motion, AnimatePresence } from 'framer-motion';
import { TaskDefinition, TaskCompletion } from '@/types';

interface TaskCardProps {
  definition: TaskDefinition;
  completion: TaskCompletion;
  onToggle: () => void;
}

export function TaskCard({ definition, completion, onToggle }: TaskCardProps) {
  const isCompleted = completion.completedAt !== null;

  const plantEmojis: Record<string, string> = {
    blueFlower: '💧',
    meadowGrass: '🚶',
    enduranceTree: '💪',
    sunflower: '🍽️',
    glowingMushroom: '😴',
  };

  return (
    <motion.button
      onClick={onToggle}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
        isCompleted
          ? 'bg-gradient-to-r from-green-100/60 to-emerald-100/40 border-emerald-400/60 shadow-lg'
          : 'bg-white/10 border-white/30 hover:border-white/50 hover-scale'
      }`}
      animate={{
        scale: isCompleted ? [1, 1.05, 0.98, 1] : 1,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-1">{plantEmojis[definition.plantType]}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800">{definition.label}</h3>
          <p className="text-xs text-gray-600">{definition.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-600">+{definition.xpReward}XP</span>
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
              isCompleted
                ? 'bg-green-400 border-green-600'
                : 'bg-white/20 border-white/40'
            }`}
          >
            <AnimatePresence>
              {isCompleted && (
                <motion.svg
                  key="checkmark"
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ pathLength: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCompleted && (
          <motion.div
            key="xp-popup"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-bold text-green-600 mt-1"
          >
            +{definition.xpReward} XP
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
