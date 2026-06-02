import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

export function Confetti() {
  const pieces: ConfettiPiece[] = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.2,
    duration: 2 + Math.random() * 1,
    size: 4 + Math.random() * 8,
    color: ['#A8D8A8', '#B8D4F0', '#D4B8F0', '#F0D4B8', '#FFD700'][
      Math.floor(Math.random() * 5)
    ],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-full"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
          }}
          initial={{ opacity: 1, y: 0, rotate: 0 }}
          animate={{
            opacity: 0,
            y: window.innerHeight + 20,
            rotate: 720,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}
