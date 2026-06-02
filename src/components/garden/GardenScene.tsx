import { motion, AnimatePresence } from 'framer-motion';
import { GardenStage, TaskCompletion, TaskId } from '@/types';
import { getWeatherConfig, getVisibleCreatures } from '@/utils/gardenLogic';
import { TASK_DEFINITIONS } from '@/utils/taskDefinitions';
import { PlantElement } from './PlantElement';
import { Creature } from './Creature';

interface GardenSceneProps {
  stage: GardenStage;
  tasks: TaskCompletion[];
  justCompletedTaskId: TaskId | null;
}

export function GardenScene({
  stage,
  tasks,
  justCompletedTaskId,
}: GardenSceneProps) {
  const weather = getWeatherConfig(stage);
  const visibleCreatures = getVisibleCreatures(stage);

  const progressPercent = tasks.length > 0
    ? (tasks.filter((t) => t.completedAt).length / tasks.length) * 100
    : 0;

  const plantPositions: Record<string, number> = {
    blueFlower: 120,
    meadowGrass: 240,
    enduranceTree: 380,
    sunflower: 520,
    glowingMushroom: 660,
  };

  return (
    <div className="w-full flex flex-col items-center justify-center flex-1">
      <svg
        viewBox="0 0 800 500"
        className="w-full max-h-96"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Life Garden visualization"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky background */}
        <motion.rect
          width="800"
          height="500"
          fill={weather.skyColor}
          animate={{ fill: weather.skyColor }}
          transition={{ duration: 1 }}
        />

        {/* Sun */}
        {weather.sunVisible && (
          <g>
            <motion.circle
              cx="680"
              cy="80"
              r="40"
              fill="#FFD700"
              opacity={weather.sunIntensity}
              animate={{ opacity: weather.sunIntensity }}
              transition={{ duration: 1 }}
            />
            {stage === 5 && (
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: '680px 80px',
                }}
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line
                    key={angle}
                    x1="680"
                    y1="40"
                    x2="680"
                    y2="20"
                    stroke="#FFD700"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform={`rotate(${angle} 680 80)`}
                  />
                ))}
              </motion.g>
            )}
          </g>
        )}

        {/* Clouds */}
        <motion.g
          animate={{ x: stage >= 4 ? 200 : 0, opacity: stage >= 4 ? 0 : 0.7 }}
          transition={{ duration: 1 }}
        >
          <ellipse cx="150" cy="100" rx="50" ry="25" fill="white" />
          <ellipse cx="200" cy="90" rx="45" ry="20" fill="white" />
          <ellipse cx="100" cy="95" rx="40" ry="18" fill="white" />
        </motion.g>

        {/* Hills */}
        <path
          d="M 0 350 Q 150 280 300 320 T 600 280 T 800 350 L 800 400 L 0 400 Z"
          fill="rgba(139, 111, 71, 0.3)"
          opacity="0.6"
        />

        {/* Garden bed soil */}
        <path
          d="M 0 380 Q 100 360 200 370 T 400 360 T 600 370 T 800 380 L 800 500 L 0 500 Z"
          fill="#8B6914"
          opacity="0.8"
        />
        <path
          d="M 0 380 Q 100 360 200 370 T 400 360 T 600 370 T 800 380"
          fill="none"
          stroke="#6B4F10"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Plants */}
        <g>
          {TASK_DEFINITIONS.map((def) => {
            const taskCompletion = tasks.find((t) => t.taskId === def.id);
            const isCompleted = taskCompletion?.completedAt !== null;
            const isJustCompleted = justCompletedTaskId === def.id;

            // Determine plant stage based on completion
            let plantStage: 0 | 1 | 2 | 3 = 0;
            if (isCompleted) {
              plantStage = 1;
              if (progressPercent >= 50) plantStage = 2;
              if (progressPercent >= 80) plantStage = 3;
            }

            return (
              <PlantElement
                key={def.id}
                type={def.plantType}
                x={plantPositions[def.plantType]}
                stage={plantStage}
                isJustCompleted={isJustCompleted}
              />
            );
          })}
        </g>

        {/* Pond (stage 4+) */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.ellipse
              key="pond"
              cx={650}
              cy={420}
              rx={80}
              ry={30}
              fill="#87CEEB"
              opacity="0.6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* Foreground grass */}
        <g opacity="0.6">
          {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((x) => (
            <polygon
              key={x}
              points={`${x},450 ${x + 8},410 ${x + 16},450`}
              fill="#7CB342"
            />
          ))}
        </g>

        {/* Creatures */}
        <g>
          {visibleCreatures.includes('butterfly') && (
            <Creature type="butterfly" />
          )}
          {visibleCreatures.includes('bird') && (
            <Creature type="bird" />
          )}
          {visibleCreatures.includes('fish') && stage >= 4 && (
            <Creature type="fish" />
          )}
        </g>
      </svg>

      {/* Progress label */}
      <div className="mt-4 text-sm text-gray-700 font-medium text-center">
        Giai Đoạn {stage}/5 • {Math.round(progressPercent)}% Hoàn Thành
      </div>
    </div>
  );
}
