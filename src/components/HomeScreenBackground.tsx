import React, { useEffect, useRef } from 'react';
import { backgroundConfig } from '../config/backgroundConfig';
import { weddingAudio } from '../utils/audioManager';

interface HomeScreenBackgroundProps {
  isEnvelopeOpen: boolean;
}

export const HomeScreenBackground: React.FC<HomeScreenBackgroundProps> = ({ isEnvelopeOpen }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Attach video to audioManager if in video mode
  useEffect(() => {
    if (backgroundConfig.type === 'video' && videoRef.current) {
      weddingAudio.attachVideo(videoRef.current);
    }
  }, []);

  // When envelope opens and video has audio, unmute and play video sound
  useEffect(() => {
    if (isEnvelopeOpen && backgroundConfig.type === 'video' && backgroundConfig.video.hasAudio) {
      weddingAudio.play();
    }
  }, [isEnvelopeOpen]);

  const { overlay } = backgroundConfig;

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      style={{ contain: 'strict' }}
      aria-hidden="true"
    >
      {/* 1. MEDIA LAYER (Image or Video) */}
      {backgroundConfig.type === 'video' ? (
        <video
          ref={videoRef}
          src={backgroundConfig.video.url}
          poster={backgroundConfig.video.poster || backgroundConfig.image.url}
          autoPlay
          playsInline
          loop={backgroundConfig.video.loop}
          muted={true} // Starts muted for reliable browser autoplay before user interaction
          className="w-full h-full object-cover object-[center_top]"
        />
      ) : (
        <img
          src={backgroundConfig.image.url}
          alt={backgroundConfig.image.alt}
          className="w-full h-full object-cover object-[center_top]"
          loading="eager"
        />
      )}

      {/* 2. SOFT AMBIENT ROYAL SILK TINT OVERLAY */}
      <div 
        className="absolute inset-0 bg-[#FAF5EB]"
        style={{
          opacity: overlay.tintOpacity,
          backdropFilter: overlay.blurPx > 0 ? `blur(${overlay.blurPx}px)` : undefined,
          WebkitBackdropFilter: overlay.blurPx > 0 ? `blur(${overlay.blurPx}px)` : undefined,
        }}
      />

      {/* 3. AUTHENTIC KHMER SILK BROCADE PATTERN */}
      {overlay.showSilkPattern && (
        <div className="absolute inset-0 bg-khmer-silk-pattern opacity-30" />
      )}

      {/* 4. SUBTLE DEPTH VIGNETTE */}
      {overlay.showVignette && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5EB]/35 via-transparent to-[#FAF5EB]/65" />
      )}
    </div>
  );
};

export default HomeScreenBackground;
