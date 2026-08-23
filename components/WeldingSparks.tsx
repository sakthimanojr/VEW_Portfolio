'use client';

import { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  trail: { x: number; y: number }[];
}

const SPARK_COLORS = [
  '#FF8C00',
  '#FFB300',
  '#FF6200',
  '#FFDD57',
  '#FF4500',
  '#FFA500',
  '#FFFFFF',
];

function createSpark(originX: number, originY: number): Spark {
  const angle = Math.random() * Math.PI * 2;
  const speed = 1.5 + Math.random() * 4;
  const maxLife = 60 + Math.random() * 80;
  return {
    x: originX,
    y: originY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - (1 + Math.random() * 2),
    life: maxLife,
    maxLife,
    size: 0.8 + Math.random() * 2,
    color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
    trail: [],
  };
}

export default function WeldingSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    const sparks: Spark[] = [];

    const origins = [
      { x: 0.38, y: 0.65 },
      { x: 0.55, y: 0.50 },
      { x: 0.72, y: 0.72 },
    ];
    let activeOriginIndex = 0;
    let frameCount = 0;
    let nextSwitch = 120 + Math.floor(Math.random() * 180);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      frameCount++;

      if (frameCount >= nextSwitch) {
        activeOriginIndex = (activeOriginIndex + 1) % origins.length;
        nextSwitch = frameCount + 120 + Math.floor(Math.random() * 180);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const origin = origins[activeOriginIndex];
      const ox = origin.x * canvas.width;
      const oy = origin.y * canvas.height;

      const burstCount = Math.random() < 0.3 ? Math.floor(Math.random() * 6) + 3 : 1;
      for (let i = 0; i < burstCount; i++) {
        sparks.push(createSpark(ox, oy));
      }

      const arcPulse = 0.6 + 0.4 * Math.sin(frameCount * 0.4);
      const arcGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 14 * arcPulse);
      arcGrad.addColorStop(0, `rgba(255, 200, 80, ${0.9 * arcPulse})`);
      arcGrad.addColorStop(0.3, `rgba(255, 120, 0, ${0.5 * arcPulse})`);
      arcGrad.addColorStop(1, 'rgba(255, 60, 0, 0)');
      ctx.beginPath();
      ctx.arc(ox, oy, 14 * arcPulse, 0, Math.PI * 2);
      ctx.fillStyle = arcGrad;
      ctx.fill();

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];

        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 8) s.trail.shift();

        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08;
        s.vx *= 0.99;
        s.life--;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        const progress = s.life / s.maxLife;
        const alpha = progress < 0.3 ? progress / 0.3 : progress;

        if (s.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(s.trail[0].x, s.trail[0].y);
          for (let t = 1; t < s.trail.length; t++) {
            ctx.lineTo(s.trail[t].x, s.trail[t].y);
          }
          ctx.strokeStyle = `rgba(255, 160, 30, ${alpha * 0.25})`;
          ctx.lineWidth = s.size * 0.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        const glowGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
        glowGrad.addColorStop(0, `rgba(255, 200, 80, ${alpha * 0.6})`);
        glowGrad.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * progress, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
