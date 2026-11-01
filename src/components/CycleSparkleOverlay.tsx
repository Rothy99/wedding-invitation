import React, { useEffect, useState } from 'react';

interface CycleSparkleOverlayProps {
  isActive: boolean;
}

export const CycleSparkleOverlay: React.FC<CycleSparkleOverlayProps> = ({ isActive }) => {
  const [stage, setStage] = useState<'idle' | 'blooming' | 'expanding' | 'done'>('idle');

  useEffect(() => {
    if (!isActive) {
      setStage('idle');
      return;
    }

    // Phase 1: Cycle Sparkle ignites and spins at the center
    setStage('blooming');

    // Phase 2: Expands gracefully across the opening screen
    const expandTimer = setTimeout(() => {
      setStage('expanding');
    }, 380);

    // Phase 3: Smooth complete
    const doneTimer = setTimeout(() => {
      setStage('done');
    }, 2300);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(doneTimer);
    };
  }, [isActive]);

  if (stage === 'idle' || stage === 'done') {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Central Warm Golden Aura */}
      <div 
        className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-radial from-gold-400/35 via-amber-300/15 to-transparent blur-2xl transition-all duration-1000 ${
          stage === 'expanding' ? 'scale-[3.2] opacity-0' : 'scale-100 opacity-100'
        }`} 
      />

      {/* Main Cycle Sparkle Ring: 12-Star Rotating Constellation */}
      <div
        className={`relative flex items-center justify-center transition-all ease-out ${
          stage === 'blooming'
            ? 'scale-100 opacity-100 duration-500'
            : 'scale-[3.8] opacity-0 duration-[1800ms]'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Outer Circular Orbit Ring with Golden Glow */}
        <div 
          className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-gold-400/60 shadow-[0_0_30px_rgba(212,175,55,0.7)] flex items-center justify-center animate-spin-slow"
          style={{ animationDuration: stage === 'expanding' ? '6s' : '10s' }}
        >
          {/* Inner Dashed Concentric Golden Orbit */}
          <div className="absolute inset-3 rounded-full border border-gold-300/40 border-dashed" />
          <div className="absolute inset-7 rounded-full border border-gold-200/25" />

          {/* Central Sacred 8-Pointed Star Core */}
          <div className="w-8 h-8 relative flex items-center justify-center animate-pulse">
            <div className="w-6 h-6 bg-gradient-to-tr from-gold-400 via-amber-200 to-gold-500 rotate-45 shadow-[0_0_16px_#FFD700] rounded-xs" />
            <div className="absolute w-6 h-6 bg-gradient-to-tr from-amber-200 via-gold-400 to-amber-300 shadow-[0_0_16px_#FFD700] rounded-xs" />
            <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#FFF]" />
          </div>

          {/* 12 Radiant Golden Stars & Sparkles along the 360-degree cycle */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const isMajor = i % 3 === 0;
            const isMedium = i % 3 === 1;
            return (
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotate(${deg}deg) translate(${isMajor ? '136px' : isMedium ? '134px' : '132px'}) rotate(-${deg}deg)`,
                }}
              >
                {isMajor ? (
                  // Royal 8-Pointed Golden Phka Chan Sparkle
                  <div className="relative flex items-center justify-center">
                    <div className="w-4.5 h-4.5 bg-gradient-to-tr from-gold-400 to-amber-200 rotate-45 shadow-[0_0_14px_#FFD700] rounded-xs" />
                    <div className="absolute w-4.5 h-4.5 bg-gradient-to-tr from-amber-200 to-gold-400 shadow-[0_0_14px_#FFD700] rounded-xs" />
                    <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#FFF]" />
                  </div>
                ) : isMedium ? (
                  // Golden Diamond Stardust Sparkle
                  <div className="relative flex items-center justify-center">
                    <div className="w-3.5 h-3.5 bg-gradient-to-br from-gold-300 to-amber-100 rotate-45 shadow-[0_0_10px_#FFE082]" />
                    <div className="absolute w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                ) : (
                  // Twinkling Stardust Point
                  <div className="w-2.5 h-2.5 bg-amber-100 rounded-full shadow-[0_0_8px_#FFF0B8]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CycleSparkleOverlay;
