import React, { useEffect, useRef, useState } from 'react';
import { Flower2 } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  wobble: number;
  wobbleSpeed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'romduol_petal' | 'jasmine' | 'gold_sparkle';
}

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particlesCount = Math.min(16, Math.max(7, Math.floor(width / 36)));
    const particles: Particle[] = [];

    const types: Particle['type'][] = ['romduol_petal', 'jasmine', 'gold_sparkle'];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 6 + 6,
        speedY: Math.random() * 0.9 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.015,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.5 + 0.4,
        type: types[i % types.length],
      });
    }

    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 90);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const render = () => {
      // During active kinetic touch scroll, skip heavy canvas clear/draw to preserve 120fps/60fps frame rate
      if (!isScrolling) {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
          p.wobble += p.wobbleSpeed;
          p.y += p.speedY;
          p.x += Math.sin(p.wobble) * 0.9 + p.speedX;
          p.rotation += p.rotationSpeed;

          if (p.y > height + 25) {
            p.y = -25;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;

          if (p.type === 'romduol_petal') {
            // Khmer Romduol Golden Petal
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.5, p.size * 0.8, p.size * 0.8, 0, p.size * 1.2);
            ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.8, -p.size * 0.9, -p.size * 0.5, 0, -p.size);
            ctx.fillStyle = 'rgba(238, 204, 118, 0.55)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(184, 139, 34, 0.4)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          } else if (p.type === 'jasmine') {
            // Soft Jasmine Petal (ផ្កាម្លិះ)
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 0.8);
            ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.2, p.size * 0.5, p.size * 0.6, 0, p.size);
            ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.6, -p.size * 0.7, -p.size * 0.2, 0, -p.size * 0.8);
            ctx.fillStyle = 'rgba(255, 252, 240, 0.7)';
            ctx.fill();
          } else {
            // Twinkling Golden Stardust Sparkle
            const twinkle = Math.abs(Math.sin(p.wobble * 2));
            const r = (p.size * 0.4) * (0.6 + 0.4 * twinkle);
            ctx.beginPath();
            ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.22)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.fillStyle = '#FFF1B0';
            ctx.fill();
          }

          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Pause animation when tab or phone screen is hidden to conserve mobile battery
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  return (
    <>
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30"
          style={{ contain: 'strict', willChange: 'transform' }}
          aria-hidden="true"
        />
      )}

      {/* Floating Toggle Button for Flower Effect */}
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? 'បិទផ្កាធ្លាក់' : 'បើកផ្កាធ្លាក់'}
        aria-label="Toggle falling petals"
        className={`fixed bottom-24 right-4 sm:bottom-24 sm:right-6 z-40 p-2.5 rounded-full border shadow-md transition-all duration-300 ${
          isEnabled
            ? 'bg-white/85 border-gold-400 text-gold-600 hover:bg-gold-50 shadow-gold-400/20'
            : 'bg-white/60 border-stone-300 text-stone-400 opacity-60'
        }`}
      >
        <Flower2 className={`w-4 h-4 ${isEnabled ? 'animate-spin-slow text-gold-500' : ''}`} />
      </button>
    </>
  );
};
