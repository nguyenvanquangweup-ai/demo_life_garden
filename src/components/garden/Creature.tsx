import { motion } from 'framer-motion';
import { memo } from 'react';

interface CreatureProps {
  type: 'butterfly' | 'bird' | 'fish';
}

export const Creature = memo(function Creature({ type }: CreatureProps) {
  switch (type) {
    case 'butterfly':
      return <Butterfly />;
    case 'bird':
      return <Bird />;
    case 'fish':
      return <Fish />;
    default:
      return null;
  }
});

function Butterfly() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.g
        animate={{
          x: [0, 80, 160, 200],
          y: [0, -30, 10, -20],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {/* Body */}
        <circle cx="100" cy="100" r="3" fill="#333" />

        {/* Wings */}
        <motion.ellipse
          cx="90"
          cy="95"
          rx="12"
          ry="8"
          fill="#FF69B4"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: [-1, 1, -1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.ellipse
          cx="110"
          cy="95"
          rx="12"
          ry="8"
          fill="#FF69B4"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: [1, -1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.g>
    </motion.g>
  );
}

function Bird() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.g
        animate={{
          x: [0, 100, 200, 250],
          y: [0, -20, 5, -15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {/* Body */}
        <ellipse cx="100" cy="80" rx="12" ry="10" fill="#FFB74D" />

        {/* Head */}
        <circle cx="108" cy="75" r="6" fill="#FFB74D" />

        {/* Eye */}
        <circle cx="110" cy="73" r="2" fill="#333" />

        {/* Wings (W-shape) */}
        <motion.path
          d="M 92 80 L 85 70 L 90 75 L 80 65 L 90 75 L 85 82 Z"
          fill="#FFA726"
          animate={{
            d: [
              'M 92 80 L 85 70 L 90 75 L 80 65 L 90 75 L 85 82 Z',
              'M 92 80 L 88 60 L 90 75 L 85 50 L 90 75 L 85 82 Z',
              'M 92 80 L 85 70 L 90 75 L 80 65 L 90 75 L 85 82 Z',
            ],
          }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
        <motion.path
          d="M 108 80 L 115 70 L 110 75 L 120 65 L 110 75 L 115 82 Z"
          fill="#FFA726"
          animate={{
            d: [
              'M 108 80 L 115 70 L 110 75 L 120 65 L 110 75 L 115 82 Z',
              'M 108 80 L 112 60 L 110 75 L 115 50 L 110 75 L 115 82 Z',
              'M 108 80 L 115 70 L 110 75 L 120 65 L 110 75 L 115 82 Z',
            ],
          }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />

        {/* Tail */}
        <path d="M 88 80 L 75 85 L 80 80" fill="#FF9800" />
      </motion.g>
    </motion.g>
  );
}

function Fish() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.g
        animate={{
          x: [0, 60, 120, 0],
          scaleX: [1, 1, -1, -1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {/* Body */}
        <ellipse cx="650" cy="420" rx="16" ry="10" fill="#4DD0E1" />

        {/* Tail */}
        <path
          d="M 634 420 L 620 410 L 620 430 Z"
          fill="#0097A7"
        />

        {/* Fin */}
        <ellipse
          cx="650"
          cy="410"
          rx="5"
          ry="8"
          fill="#0097A7"
          opacity="0.7"
        />

        {/* Eye */}
        <circle cx="660" cy="417" r="2" fill="#333" />
      </motion.g>
    </motion.g>
  );
}
