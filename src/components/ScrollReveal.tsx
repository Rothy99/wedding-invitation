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
  const [isDone, setIsDone] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Generous 350px rootMargin pre-loads elements before entering viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
          // Release transition and GPU compositor layer completely after animation completes
          setTimeout(() => {
            setIsDone(true);
          }, 600);
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px 350px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0';

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-3';
      case 'down':
        return 'opacity-0 -translate-y-3';
      case 'left':
        return 'opacity-0 translate-x-3';
      case 'right':
        return 'opacity-0 -translate-x-3';
      default:
        return 'opacity-0 translate-y-3';
    }
  };

  return (
    <div
      ref={ref}
      style={!isDone ? {
        transitionDuration: '450ms',
        transitionDelay: `${Math.min(delay, 40)}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity',
      } : undefined}
      className={`${!isDone ? 'transition-[transform,opacity]' : ''} ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};
export default ScrollReveal;
