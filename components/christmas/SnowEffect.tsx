'use client';

import { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  opacity: number;
  phase: number;
}

export function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const snowflakes: Snowflake[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 1,
      speed: Math.random() * 1.5 + 0.5,
      drift: Math.random() * 0.8 - 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      snowflakes.forEach(sf => {
        sf.y += sf.speed;
        sf.x += sf.drift + Math.sin(frame * 0.01 + sf.phase) * 0.3;

        if (sf.y > canvas.height + 10) {
          sf.y = -10;
          sf.x = Math.random() * canvas.width;
        }
        if (sf.x > canvas.width + 10) sf.x = -10;
        if (sf.x < -10) sf.x = canvas.width + 10;

        ctx.beginPath();
        ctx.arc(sf.x, sf.y, sf.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${sf.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
