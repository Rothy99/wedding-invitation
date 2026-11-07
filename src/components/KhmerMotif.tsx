import React from 'react';

// ==========================================
// ១. ក្បាច់ផ្កាច័ន្ទ (Kbach Phka Chan - Sacred Khmer 8-Pointed Star Flower)
// Iconic Khmer ornamental motif found on Angkorian reliefs & royal silk brocade
// ==========================================
export const KbachPhkaChan: React.FC<{ 
  size?: number; 
  className?: string; 
}> = ({ 
  size = 36, 
  className = "" 
}) => {
  return (
    <img
      src="/khmer_crest_gold.png"
      alt="ក្បាច់ផ្កាច័ន្ទមាសរាជវាំង"
      className={`inline-block object-contain drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)] pointer-events-none select-none transition-transform duration-300 hover:scale-105 ${className}`}
      style={{
        height: `${size}px`,
        width: 'auto',
        aspectRatio: '339 / 89',
      }}
      aria-hidden="true"
    />
  );
};

// ==========================================
// ២. ក្បាច់ហោជាង / ក្បាច់ផ្តែរអង្គរ (Khmer Pediment & Lintel Arch)
// Sacred architectural crown adorning wedding pavilions and royal temples
// ==========================================
export const KhmerHaoCheangArch: React.FC<{ 
  size?: number; 
  className?: string; 
}> = ({ 
  size = 280, 
  className = "" 
}) => {
  return (
    <svg
      width={size}
      height={size * 0.32}
      viewBox="0 0 320 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mx-auto drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="archGoldMain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7E550B" />
          <stop offset="20%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#FFF8D6" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#7E550B" />
        </linearGradient>
        <linearGradient id="spireGold" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#9B6E14" />
          <stop offset="50%" stopColor="#F5DF88" />
          <stop offset="100%" stopColor="#FFFBE6" />
        </linearGradient>
      </defs>

      {/* Central Spire (កំពូលត្រីសូល៍មង្គល) */}
      <path
        d="M160 2 C155 18 148 28 142 42 C152 42 158 36 160 30 C162 36 168 42 178 42 C172 28 165 18 160 2 Z"
        fill="url(#spireGold)"
        stroke="#7E550B"
        strokeWidth="1.5"
      />
      <circle cx="160" cy="18" r="3" fill="#5C1221" />

      {/* Main Arch Frame - Left Flame Wing (ស្លាបកន្ទុយហង្សឆ្វេង) */}
      <path
        d="M160 42 C135 42 110 48 85 64 C65 76 45 88 15 90 C32 84 42 70 56 66 C80 60 110 52 145 46 Z"
        fill="url(#archGoldMain)"
        stroke="#8C6514"
        strokeWidth="1.2"
      />
      {/* Left Kbach Phni curls */}
      <path
        d="M120 48 C105 36 90 36 75 48 C85 48 95 53 100 58"
        stroke="#FFF2BF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M65 68 C50 60 38 64 26 76 C36 74 44 76 48 82"
        stroke="#FFF2BF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Main Arch Frame - Right Flame Wing (ស្លាបកន្ទុយហង្សស្តាំ) */}
      <path
        d="M160 42 C185 42 210 48 235 64 C255 76 275 88 305 90 C288 84 278 70 264 66 C240 60 210 52 175 46 Z"
        fill="url(#archGoldMain)"
        stroke="#8C6514"
        strokeWidth="1.2"
      />
      {/* Right Kbach Phni curls */}
      <path
        d="M200 48 C215 36 230 36 245 48 C235 48 225 53 220 58"
        stroke="#FFF2BF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M255 68 C270 60 282 64 294 76 C284 74 276 76 272 82"
        stroke="#FFF2BF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Center Lotus Medallion */}
      <circle cx="160" cy="46" r="9" fill="#5C1221" stroke="#D4AF37" strokeWidth="2" />
      <circle cx="160" cy="46" r="4.5" fill="#FFEAA8" />
    </svg>
  );
};

// ==========================================
// ៣. ក្បាច់កែងភ្ញីទេសប្រណិត (Luxury Khmer Royal Golden Corner Filigree - Kbach Phni Tes)
// Authentic ornate golden corner motif wrapping invitations and certificates
// ==========================================
export const KbachCornerLuxury: React.FC<{ 
  size?: number; 
  className?: string; 
}> = ({ 
  size = 40, 
  className = "" 
}) => {
  const displaySize = size;
  // Clean up old SVG color classes if present and boost opacity to full royal radiance
  const cleanedClass = className
    .replace(/text-gold-\S+/g, '')
    .replace(/opacity-(60|70|80)/g, 'opacity-95')
    .trim();

  return (
    <img
      src="/khmer_corner_gold.png"
      alt=""
      aria-hidden="true"
      width={displaySize}
      height={displaySize}
      style={{ width: `${displaySize}px`, height: `${displaySize}px` }}
      className={`pointer-events-none select-none object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] ${cleanedClass}`}
    />
  );
};

// ==========================================
// ៤. របាំងខណ្ឌក្បាច់ខ្មែរ (Royal Khmer Floral Spearhead Divider)
// ==========================================
export const KhmerDivider: React.FC<{ className?: string; maxWidth?: string }> = ({ 
  className = "my-6",
  maxWidth = "max-w-[320px] sm:max-w-[380px]"
}) => {
  return (
    <div className={`flex items-center justify-center w-full mx-auto select-none pointer-events-none ${className}`}>
      <img
        src="/khmer_divider_gold.png"
        alt="Royal Khmer Floral Divider"
        className={`w-full ${maxWidth} h-auto object-contain filter drop-shadow-[0_1px_4px_rgba(212,175,55,0.4)]`}
      />
    </div>
  );
};

// ==========================================
// ៥. ក្បាច់ភ្ញីវល្លិ៍បន្ទាត់ (Khmer Continuous Vine Border Ribbon)
// ==========================================
export const KbachVineRibbon: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`w-full overflow-hidden flex justify-center opacity-85 py-1 ${className}`}>
      <svg width="100%" height="18" viewBox="0 0 600 18" fill="none" preserveAspectRatio="repeat-x" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="kbachRepeat" width="60" height="18" patternUnits="userSpaceOnUse">
            {/* Center diamond/flower */}
            <circle cx="30" cy="9" r="3" fill="#D4AF37" />
            {/* Left and right scrolling vine waves */}
            <path d="M0 9 C15 3 20 15 30 9 C40 3 45 15 60 9" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 7 C24 5 26 8 28 8" stroke="#8C6514" strokeWidth="1" strokeLinecap="round" />
            <path d="M40 11 C36 13 34 10 32 10" stroke="#8C6514" strokeWidth="1" strokeLinecap="round" />
            <circle cx="0" cy="9" r="1.5" fill="#8C6514" />
          </pattern>
        </defs>
        <rect width="100%" height="18" fill="url(#kbachRepeat)" />
      </svg>
    </div>
  );
};

// ==========================================
// ៦. ផ្ការំដួល (Romduol Flower)
// ==========================================
export const RomduolFlower: React.FC<{ 
  className?: string; 
  size?: number; 
}> = ({ 
  className = "", 
  size = 48, 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="romduolCenterGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF3D1" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6514" />
        </radialGradient>
        <linearGradient id="romduolPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="40%" stopColor="#F5E3AB" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>

      {/* 3 Outer Thick Petals of Romduol */}
      <path
        d="M50 8 C36 24 32 38 42 50 C46 44 54 44 58 50 C68 38 64 24 50 8 Z"
        fill="url(#romduolPetalGrad)"
        stroke="#A5791E"
        strokeWidth="1.4"
      />
      <path
        d="M16 68 C30 64 42 56 46 44 C42 42 42 34 40 30 C26 32 16 44 16 68 Z"
        fill="url(#romduolPetalGrad)"
        stroke="#A5791E"
        strokeWidth="1.4"
      />
      <path
        d="M84 68 C84 44 74 32 60 30 C58 34 58 42 54 44 C58 56 70 64 84 68 Z"
        fill="url(#romduolPetalGrad)"
        stroke="#A5791E"
        strokeWidth="1.4"
      />

      {/* 3 Inner Petals */}
      <path
        d="M50 30 C43 38 44 48 50 54 C56 48 57 38 50 30 Z"
        fill="url(#romduolCenterGrad)"
        stroke="#8C6514"
        strokeWidth="1.2"
      />
      <path
        d="M34 56 C42 56 48 50 48 44 C42 42 36 46 34 56 Z"
        fill="url(#romduolCenterGrad)"
        stroke="#8C6514"
        strokeWidth="1.2"
      />
      <path
        d="M66 56 C64 46 58 42 52 44 C52 50 58 56 66 56 Z"
        fill="url(#romduolCenterGrad)"
        stroke="#8C6514"
        strokeWidth="1.2"
      />

      <circle cx="50" cy="48" r="4.5" fill="#5C1221" />
      <circle cx="50" cy="48" r="2.5" fill="#FFE8A3" />
    </svg>
  );
};

// ==========================================
// ៧. ត្រាសិរីមង្គលរាជវង្ស (Royal Golden Wax Seal with Kbach Halo)
// ==========================================
export const KhmerWaxSeal: React.FC<{ 
  size?: number; 
  text?: string; 
  onClick?: () => void;
  className?: string;
}> = ({ 
  size = 96, 
  text = "មង្គល", 
  onClick,
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="ត្រាសិរីមង្គល"
      className={`relative rounded-full wax-seal flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Outer Radiating Kbach Phka Petal Halo */}
      <div className="absolute -inset-2.5 rounded-full border-2 border-gold-400/50 border-dashed animate-spin-slow pointer-events-none" />
      <div className="absolute inset-1 rounded-full border-2 border-amber-200/60" />
      <div className="absolute inset-2.5 rounded-full border border-amber-100/50" />

      {/* Inner Kbach Phka Chan & Auspicious Text */}
      <div className="flex flex-col items-center justify-center text-center select-none z-10">
        <KbachPhkaChan size={size * 0.45} />
        <span className="font-moul text-burgundy-900 tracking-wider text-[11px] sm:text-xs font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] mt-0.5">
          {text}
        </span>
      </div>
    </button>
  );
};

// Backwards compatibility aliases
export const KhmerCorner = KbachCornerLuxury;
export const KhmerCrownArch = KhmerHaoCheangArch;

// ==========================================
// ៨. ផ្ទៃក្បាច់បុរាណខ្មែរ (Traditional Khmer Motif Background & Watermark)
// ==========================================
export const KhmerCardBackground: React.FC<{ 
  patternOpacity?: number; 
  watermarkOpacity?: number; 
  watermarkSize?: string;
  className?: string;
}> = ({
  patternOpacity = 0.16,
  watermarkOpacity = 0.08,
  watermarkSize = "w-64 sm:w-80 h-64 sm:h-80",
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden rounded-3xl z-0 ${className}`}>
      {/* Repeating Traditional Khmer Diamond Brocade Pattern matching sample */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/khmer_seamless_diamond_pattern.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '110px 110px',
          backgroundPosition: 'center',
          opacity: patternOpacity,
        }}
      />
      {/* Large Centerpiece Watermark Medallion */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${watermarkSize} flex items-center justify-center`}
        style={{ opacity: watermarkOpacity }}
      >
        <img 
          src="/khmer_motif_45.png" 
          alt="" 
          className="w-full h-full object-contain" 
        />
      </div>
    </div>
  );
};

