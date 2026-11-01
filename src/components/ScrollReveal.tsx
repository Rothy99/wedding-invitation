import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Pre-render 220px before entering viewport for butter-smooth, zero pop-in mobile scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px 220px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0';

    // Pure hardware-accelerated translation without scale to avoid font re-rasterization on mobile
    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-4';
      case 'down':
        return 'opacity-0 -translate-y-4';
      case 'left':
        return 'opacity-0 translate-x-4';
      case 'right':
        return 'opacity-0 -translate-x-4';
      default:
        return 'opacity-0 translate-y-4';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '550ms',
        transitionDelay: `${Math.min(delay, 50)}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity',
        transform: isVisible ? 'translate3d(0,0,0)' : undefined,
      }}
      className={`transition-[transform,opacity] ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};
export default ScrollReveal;
