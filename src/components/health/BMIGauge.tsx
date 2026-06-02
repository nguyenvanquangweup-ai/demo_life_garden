import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { animate, useMotionValue, useTransform } from 'framer-motion';

interface BMIGaugeProps {
  bmi: number;
  category: string;
}

export function BMIGauge({ bmi, category }: BMIGaugeProps) {
  const bmiValue = useMotionValue(0);
  const needleRotation = useTransform(bmiValue, [10, 40], [0, 180]);

  useEffect(() => {
    animate(bmiValue, bmi, { duration: 1.5, ease: 'easeOut' });
  }, [bmi, bmiValue]);

  const getCategoryColor = (cat: string): string => {
    switch (cat) {
      case 'underweight':
        return '#5BABD4';
      case 'normal':
        return '#A8D8A8';
      case 'overweight':
        return '#F0D4B8';
      case 'obese':
        return '#FF6B6B';
      default:
        return '#999';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">BMI</h3>
      <div className="relative w-48 h-28 mb-4">
        <svg
          viewBox="0 0 200 100"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* Background semicircle */}
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="#E5E5E5"
            strokeWidth="8"
          />

          {/* Colored zones */}
          <path
            d="M 20 80 A 80 80 0 0 1 60 45"
            fill="none"
            stroke="#5BABD4"
            strokeWidth="8"
          />
          <path
            d="M 60 45 A 80 80 0 0 1 120 20"
            fill="none"
            stroke="#A8D8A8"
            strokeWidth="8"
          />
          <path
            d="M 120 20 A 80 80 0 0 1 160 45"
            fill="none"
            stroke="#F0D4B8"
            strokeWidth="8"
          />
          <path
            d="M 160 45 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="#FF6B6B"
            strokeWidth="8"
          />

          {/* Needle */}
          <motion.g
            style={{
              rotateZ: needleRotation,
              transformBox: 'fill-box',
              transformOrigin: 'center bottom',
            } as any}
          >
            <line
              x1="100"
              y1="80"
              x2="100"
              y2="20"
              stroke={getCategoryColor(category)}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle
              cx="100"
              cy="80"
              r="6"
              fill={getCategoryColor(category)}
            />
          </motion.g>
        </svg>
      </div>

      <div className="text-center">
        <motion.div
          className="text-3xl font-bold text-gray-800"
          key={Math.round(bmi * 10)}
        >
          {bmi.toFixed(1)}
        </motion.div>
        <div className="text-xs text-gray-600 capitalize">{category}</div>
      </div>
    </div>
  );
}
