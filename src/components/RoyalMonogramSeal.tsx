import React from 'react';

interface RoyalMonogramSealProps {
  /** Monogram text to display, e.g. "ស • វ" */
  monogram?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Extra class names */
  className?: string;
  /** Whether the seal is opening / dissolving (for EnvelopeCover) */
  isOpen?: boolean;
  /** Whether to show outer subtle pulsing aura */
  pulse?: boolean;
}

export const RoyalMonogramSeal: React.FC<RoyalMonogramSealProps> = ({
  monogram = 'ស • វ',
  size = 'md',
  className = '',
  isOpen = false,
  pulse = true,
}) => {
  // Size dimensions and typography scaling
  const sizeConfig = {
    sm: {
      box: 'w-11 h-11',
      fontSize: 'text-xs',
      innerPadding: 'p-1',
      dotSize: 'text-[8px]',
      gap: 'gap-1',
    },
    md: {
      box: 'w-14 h-14 sm:w-15 sm:h-15',
      fontSize: 'text-sm sm:text-base',
      innerPadding: 'p-1.5',
      dotSize: 'text-[9px]',
      gap: 'gap-1.5',
    },
    lg: {
      box: 'w-16 h-16 sm:w-18 sm:h-18',
      fontSize: 'text-base sm:text-lg',
      innerPadding: 'p-2',
      dotSize: 'text-[10px]',
      gap: 'gap-2',
    },
    xl: {
      box: 'w-20 h-20 sm:w-22 sm:h-22',
      fontSize: 'text-xl sm:text-2xl',
      innerPadding: 'p-2.5',
      dotSize: 'text-xs',
      gap: 'gap-2.5',
    },
  }[size];

  // Parse monogram: split by dot/bullet/space if formatted like "ស • វ" or "ស.វ"
  const parts = monogram.split(/[•·. ]+/).filter(Boolean);
  const letter1 = parts[0] || 'ស';
  const letter2 = parts[1] || 'វ';

  return (
    <div
      className={`relative select-none flex-shrink-0 flex items-center justify-center transition-all duration-900 ${
        isOpen ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
      } ${className}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Outer Golden Aura Glow */}
      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-gold-500/30 via-gold-300/40 to-gold-500/30 blur-sm pointer-events-none" />

      {/* Main Circular Seal Medal */}
      <div
        className={`relative ${sizeConfig.box} rounded-full flex items-center justify-center overflow-hidden border-2 border-gold-300/95 shadow-[0_8px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(212,175,55,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4),inset_0_-1.5px_2px_rgba(0,0,0,0.6)]`}
        style={{
          background: 'radial-gradient(circle at 34% 30%, #85172E 0%, #520917 55%, #2A030A 100%)',
        }}
      >
        {/* Subtle Diagonal Specular Reflection (Glass/Lacquer 3D dome sheen) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/[0.04] to-transparent pointer-events-none rounded-full" />

        {/* Inner Delicate Engraved Concentric Gold Ring */}
        <div className="absolute inset-1 sm:inset-1.5 rounded-full border border-gold-400/50 pointer-events-none" />

        {/* Four Delicate Cardinal Gold Notch Accents (12, 3, 6, 9 o'clock) */}
        <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-gold-300 rounded-full opacity-70 pointer-events-none" />
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-gold-300 rounded-full opacity-70 pointer-events-none" />
        <span className="absolute left-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-gold-300 rounded-full opacity-70 pointer-events-none" />
        <span className="absolute right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-gold-300 rounded-full opacity-70 pointer-events-none" />

        {/* Monogram Typography (Centered with breathing room to prevent edge clipping) */}
        <div className={`relative z-10 flex items-center justify-center ${sizeConfig.gap} px-2 leading-none`}>
          <span
            className={`font-moul ${sizeConfig.fontSize} text-[#FFF6DF] font-bold tracking-normal inline-block text-center`}
            style={{
              textShadow: '0 1px 1px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8), 0 0 10px rgba(212,175,55,0.4)',
              transform: 'translateY(1px)',
            }}
          >
            {letter1}
          </span>

          {/* Golden Center Circular Bullet */}
          <span
            className={`${sizeConfig.dotSize} text-gold-300 flex-shrink-0 select-none text-center`}
            style={{
              textShadow: '0 0 6px rgba(212,175,55,0.9)',
              transform: 'translateY(-0.5px)',
            }}
          >
            •
          </span>

          <span
            className={`font-moul ${sizeConfig.fontSize} text-[#FFF6DF] font-bold tracking-normal inline-block text-center`}
            style={{
              textShadow: '0 1px 1px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8), 0 0 10px rgba(212,175,55,0.4)',
              transform: 'translateY(1px)',
            }}
          >
            {letter2}
          </span>
        </div>

        {/* Pulse Ring */}
        {pulse && (
          <div className="absolute inset-0 rounded-full border border-gold-400/30 animate-pulse pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default RoyalMonogramSeal;
