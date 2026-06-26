'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  active: boolean;
  duration?: number;
}

export function ConfettiEffect({ active, duration = 5000 }: ConfettiEffectProps) {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!active) return;

    const colors = ['#FF0000', '#00CC00', '#FFD700', '#FFFFFF', '#FF6600'];

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...opts,
        origin: { y: 0.6 },
        colors,
        particleCount: Math.floor(200 * particleRatio),
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    const interval = setInterval(() => {
      confetti({
        angle: Math.random() * 60 + 60,
        spread: 55,
        particleCount: 50,
        colors,
        origin: { x: 0, y: 0.65 },
      });
      confetti({
        angle: Math.random() * 60 + 60,
        spread: 55,
        particleCount: 50,
        colors,
        origin: { x: 1, y: 0.65 },
      });
    }, 500);

    timerRef.current = setTimeout(() => {
      clearInterval(interval);
    }, duration);

    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, duration]);

  return null;
}
