import { memo } from 'react';
import { motion } from 'framer-motion';
import { PlantType } from '@/types';

interface PlantElementProps {
  type: PlantType;
  x: number;
  stage: 0 | 1 | 2 | 3;
  isJustCompleted: boolean;
}

export const PlantElement = memo(function PlantElement({
  type,
  x,
  stage,
  isJustCompleted,
}: PlantElementProps) {
  const getPlant = () => {
    switch (type) {
      case 'blueFlower':
        return <BlueFlower x={x} stage={stage} isJustCompleted={isJustCompleted} />;
      case 'meadowGrass':
        return <MeadowGrass x={x} stage={stage} isJustCompleted={isJustCompleted} />;
      case 'enduranceTree':
        return <EnduranceTree x={x} stage={stage} isJustCompleted={isJustCompleted} />;
      case 'sunflower':
        return <Sunflower x={x} stage={stage} isJustCompleted={isJustCompleted} />;
      case 'glowingMushroom':
        return <GlowingMushroom x={x} stage={stage} isJustCompleted={isJustCompleted} />;
      default:
        return null;
    }
  };

  return getPlant();
});

function BlueFlower({
  x,
  stage,
  isJustCompleted,
}: {
  x: number;
  stage: 0 | 1 | 2 | 3;
  isJustCompleted: boolean;
}) {
  const scaleY = [0, 0.5, 0.8, 1][stage];

  return (
    <motion.g
      x={x}
      animate={{ scale: isJustCompleted ? [1, 1.3, 1] : 1 }}
      transition={{ duration: 0.4 }}
    >
      <g
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center bottom',
        } as any}
      >
        {/* Stem */}
        <motion.path
          d={`M ${x} 400 Q ${x - 5} 380 ${x} 350`}
          stroke="#4a7c59"
          strokeWidth="2"
          fill="none"
          animate={{ pathLength: scaleY }}
          initial={{ pathLength: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Leaves */}
        <motion.ellipse
          cx={x - 12}
          cy="375"
          rx="8"
          ry="12"
          fill="#5a9c6a"
          initial={{ scale: 0 }}
          animate={{ scale: scaleY }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <motion.ellipse
          cx={x + 12}
          cy="375"
          rx="8"
          ry="12"
          fill="#5a9c6a"
          initial={{ scale: 0 }}
          animate={{ scale: scaleY }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* Petals */}
        {[0, 72, 144, 216, 288].map((angle, idx) => (
          <motion.ellipse
            key={idx}
            cx={x}
            cy="340"
            rx="10"
            ry="14"
            fill="#5BABD4"
            initial={{ scale: 0 }}
            animate={{ scale: scaleY }}
            transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
            } as any}
            transform={`rotate(${angle} ${x} 340)`}
          />
        ))}

        {/* Center */}
        <motion.circle
          cx={x}
          cy="340"
          r="5"
          fill="#ffd700"
          initial={{ scale: 0 }}
          animate={{ scale: scaleY }}
          transition={{ duration: 0.5 }}
        />
      </g>
    </motion.g>
  );
}

function MeadowGrass({
  x,
  stage,
  isJustCompleted,
}: {
  x: number;
  stage: 0 | 1 | 2 | 3;
  isJustCompleted: boolean;
}) {
  const scaleY = [0, 0.5, 0.8, 1][stage];
  const bladeCount = 7;

  return (
    <motion.g
      animate={{ scale: isJustCompleted ? [1, 1.3, 1] : 1 }}
      transition={{ duration: 0.4 }}
    >
      {Array.from({ length: bladeCount }).map((_, idx) => {
        const offsetX = (idx - bladeCount / 2) * 6;
        return (
          <motion.path
            key={idx}
            d={`M ${x + offsetX} 400 Q ${x + offsetX + 3} 370 ${x + offsetX + 2} 340`}
            stroke="#7CB342"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY,
              rotate: isJustCompleted ? [0, -3, 3, -3, 0] : -2 + (idx % 2),
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: idx * 0.1,
              },
              scaleY: { duration: 0.5 },
            }}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center bottom',
            } as any}
          />
        );
      })}
    </motion.g>
  );
}

function EnduranceTree({
  x,
  stage,
  isJustCompleted,
}: {
  x: number;
  stage: 0 | 1 | 2 | 3;
  isJustCompleted: boolean;
}) {
  const trunkScale = [0, 0.4, 0.7, 1][stage];
  const foliageScale = [0, 0, 0.6, 1][stage];

  return (
    <motion.g
      animate={{ scale: isJustCompleted ? [1, 1.3, 1] : 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Trunk */}
      <motion.rect
        x={x - 8}
        y={350}
        width="16"
        height="50"
        fill="#8b6f47"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: trunkScale }}
        transition={{ duration: 0.6 }}
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center bottom',
        } as any}
      />

      {/* Foliage layers */}
      {[
        { cy: 320, r: 35 },
        { cy: 290, r: 30 },
        { cy: 260, r: 25 },
      ].map((layer, idx) => (
        <motion.circle
          key={idx}
          cx={x}
          cy={layer.cy}
          r={layer.r}
          fill="#4a7c59"
          initial={{ scale: 0 }}
          animate={{ scale: foliageScale }}
          transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
        />
      ))}

      {/* Fruits at stage 3 */}
      {stage === 3 && (
        <>
          <motion.circle
            cx={x - 15}
            cy="310"
            r="4"
            fill="#ff6b6b"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          />
          <motion.circle
            cx={x + 15}
            cy="310"
            r="4"
            fill="#ff6b6b"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          />
        </>
      )}
    </motion.g>
  );
}

function Sunflower({
  x,
  stage,
  isJustCompleted,
}: {
  x: number;
  stage: 0 | 1 | 2 | 3;
  isJustCompleted: boolean;
}) {
  const scaleY = [0, 0.5, 0.8, 1][stage];

  return (
    <motion.g
      animate={{ scale: isJustCompleted ? [1, 1.3, 1] : 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Stem */}
      <motion.path
        d={`M ${x} 400 L ${x} ${350 - scaleY * 50}`}
        stroke="#4a7c59"
        strokeWidth="3"
        fill="none"
        animate={{ pathLength: scaleY }}
        initial={{ pathLength: 0 }}
      />

      {/* Petals */}
      {Array.from({ length: 12 }).map((_, idx) => {
        const angle = (idx * 360) / 12;
        return (
          <motion.ellipse
            key={idx}
            cx={x}
            cy={350 - scaleY * 50}
            rx="8"
            ry="16"
            fill="#F4C430"
            initial={{ scale: 0 }}
            animate={{ scale: scaleY }}
            transition={{ duration: 0.4, delay: 0.1 + idx * 0.03 }}
            transform={`rotate(${angle} ${x} ${350 - scaleY * 50})`}
          />
        );
      })}

      {/* Center */}
      <motion.circle
        cx={x}
        cy={350 - scaleY * 50}
        r="8"
        fill="#8b5a00"
        initial={{ scale: 0 }}
        animate={{ scale: scaleY }}
        transition={{ duration: 0.5 }}
      />

      {/* Head nod animation */}
      {stage > 0 && (
        <motion.g
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            transformBox: 'fill-box',
            transformOrigin: `${x}px ${350 - scaleY * 50}px`,
          } as any}
        >
          {/* Petals animated separately */}
        </motion.g>
      )}
    </motion.g>
  );
}

function GlowingMushroom({
  x,
  stage,
  isJustCompleted,
}: {
  x: number;
  stage: 0 | 1 | 2 | 3;
  isJustCompleted: boolean;
}) {
  const scaleY = [0, 0.5, 0.8, 1][stage];

  return (
    <motion.g
      animate={{ scale: isJustCompleted ? [1, 1.3, 1] : 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glow effect */}
      {stage > 0 && (
        <motion.circle
          cx={x}
          cy={360}
          r="20"
          fill="#C084FC"
          opacity="0"
          filter="url(#glow)"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Stem */}
      <motion.rect
        x={x - 6}
        y={370}
        width="12"
        height="30"
        fill="#D4A574"
        rx="6"
        initial={{ scaleY: 0 }}
        animate={{ scaleY }}
        transition={{ duration: 0.6 }}
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center bottom',
        } as any}
      />

      {/* Cap */}
      <motion.ellipse
        cx={x}
        cy={360}
        rx="18"
        ry="14"
        fill="#C084FC"
        initial={{ scale: 0 }}
        animate={{ scale: scaleY }}
        transition={{ duration: 0.6 }}
      />

      {/* Dots on cap */}
      {[
        { cx: -8, cy: -5 },
        { cx: 0, cy: -8 },
        { cx: 8, cy: -5 },
      ].map((pos, idx) => (
        <motion.circle
          key={idx}
          cx={x + pos.cx}
          cy={360 + pos.cy}
          r="3"
          fill="#E8B4FF"
          initial={{ scale: 0 }}
          animate={{ scale: scaleY }}
          transition={{ duration: 0.5, delay: 0.15 + idx * 0.05 }}
        />
      ))}
    </motion.g>
  );
}
