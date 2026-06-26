'use client';

import { motion } from 'framer-motion';

const COLORS = ['#FF0000', '#00CC00', '#FFD700', '#0066FF', '#FF6600', '#FF00FF', '#00FFFF'];
const LIGHT_COUNT = 20;

export function ChristmasLights() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 pointer-events-none">
      {/* Wire */}
      <div className="relative h-12 overflow-visible">
        <svg
          className="absolute top-0 left-0 w-full"
          height="50"
          viewBox={`0 0 ${LIGHT_COUNT * 60} 50`}
          preserveAspectRatio="none"
        >
          <path
            d={`M 0 10 ${Array.from({ length: LIGHT_COUNT }, (_, i) => {
              const x = (i + 1) * 60;
              const prevX = i * 60;
              return `Q ${prevX + 30} 30 ${x} 10`;
            }).join(' ')}`}
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
        </svg>

        {Array.from({ length: LIGHT_COUNT }, (_, i) => {
          const color = COLORS[i % COLORS.length];
          const delay = Math.random() * 2;
          const duration = 1 + Math.random() * 1.5;
          const leftPercent = (i / (LIGHT_COUNT - 1)) * 100;

          return (
            <div
              key={i}
              className="absolute"
              style={{ left: `${leftPercent}%`, top: '16px', transform: 'translateX(-50%)' }}
            >
              {/* Connector */}
              <div className="w-0.5 h-2 bg-gray-600 mx-auto" />
              {/* Bulb */}
              <motion.div
                animate={{
                  opacity: [1, 0.2, 1, 0.8, 1],
                  scale: [1, 0.95, 1],
                  boxShadow: [
                    `0 0 8px 3px ${color}`,
                    `0 0 2px 1px ${color}`,
                    `0 0 12px 5px ${color}`,
                    `0 0 6px 2px ${color}`,
                    `0 0 8px 3px ${color}`,
                  ],
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-4 h-5 rounded-b-full rounded-t-sm mx-auto cursor-none"
                style={{ backgroundColor: color }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
