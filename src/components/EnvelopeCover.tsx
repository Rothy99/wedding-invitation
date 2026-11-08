import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Clock, Sparkles } from 'lucide-react';
import { toKhmerDigits, weddingData } from '../config/weddingConfig';
import { backgroundConfig } from '../config/backgroundConfig';
import { firstScreenConfig, getFirstScreenMedia } from '../config/firstScreenConfig';
import { weddingAudio } from '../utils/audioManager';
import { KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';
import { RoyalMonogramSeal } from './RoyalMonogramSeal';

interface EnvelopeCoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

const COUNTDOWN_SECONDS = 
  firstScreenConfig.duration?.countdownSeconds ?? 
  firstScreenConfig.animation?.autoOpenCountdownSeconds ?? 
  10;

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({ onOpen, isOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [guestName, setGuestName] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  const media = getFirstScreenMedia();
  const { groom, bride } = weddingData.couple;

  // Immediately request video music playback on first screen if configured
  useEffect(() => {
    if (firstScreenConfig.audio.playMusic) {
      weddingAudio.play();
    }
  }, []);

  // When background is not video, attach left door video to audioManager
  useEffect(() => {
    if (media.type === 'video' && leftVideoRef.current && backgroundConfig.type !== 'video') {
      weddingAudio.attachVideo(leftVideoRef.current);
    }
  }, [media.type]);

  // Frame-level synchronization between left and right door videos
  useEffect(() => {
    if (media.type !== 'video') return;
    const v1 = leftVideoRef.current;
    const v2 = rightVideoRef.current;
    if (!v1 || !v2) return;

    const sync = () => {
      if (Math.abs(v1.currentTime - v2.currentTime) > 0.08) {
        v2.currentTime = v1.currentTime;
      }
    };
    v1.addEventListener('timeupdate', sync);
    return () => {
      v1.removeEventListener('timeupdate', sync);
    };
  }, [media.type]);

  // Extract guest name from URL parameters (?to=..., ?guest=..., ?name=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const name = params.get('to') || params.get('name') || params.get('guest') || '';
      if (name) {
        setGuestName(decodeURIComponent(name).trim());
      }
    } catch (e) {
      console.warn('Could not parse guest name from URL', e);
    }
  }, []);

  // Unmount completely after transition finishes (3700ms) to ensure full slow-motion completes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsDismissed(true);
      }, 3700);
      return () => clearTimeout(timer);
    } else {
      setIsDismissed(false);
    }
  }, [isOpen]);

  const handleOpenInvitation = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);
    setIsPressed(true);

    // Synchronously trigger wedding audio in direct user interaction context
    weddingAudio.play();

    // Clear auto countdown timer if user clicked manually or timer expired
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Wave 1: Immediate golden and rose petal confetti
    confetti({
      particleCount: 55,
      spread: 80,
      origin: { y: 0.62 },
      colors: ['#D4AF37', '#FFF7D6', '#8E1B32', '#F5DE96', '#E4BF62', '#FFE58F'],
      disableForReducedMotion: true,
      zIndex: 9999,
    });

    // Wave 2: Soft shower of golden stardust from both sides
    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 50,
        origin: { x: 0.08, y: 0.55 },
        colors: ['#D4AF37', '#F5DE96', '#FFFDF5'],
        zIndex: 9999,
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 50,
        origin: { x: 0.92, y: 0.55 },
        colors: ['#D4AF37', '#F5DE96', '#FFFDF5'],
        zIndex: 9999,
      });
    }, 650);

    // Notify parent to reveal ceremony
    onOpen();

    setTimeout(() => {
      setIsAnimating(false);
    }, 3400);
  };

  // Automatic countdown (configurable 10s) to open home invitation with sound
  useEffect(() => {
    if (isOpen) return;

    if (!firstScreenConfig.duration?.autoOpenEnabled) return;

    setCountdown(COUNTDOWN_SECONDS);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => {
            weddingAudio.play();
            handleOpenInvitation();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isOpen]);

  if (isDismissed) {
    return null;
  }

  const isClosed = !isOpen && !isAnimating;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0D0A08] overflow-hidden transition-opacity duration-[3400ms] ${
        isOpen
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.35, 1)',
        willChange: 'opacity',
      }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.18),transparent_70%)]" />

      {/* Main First Page Card with Royal Double Door Unveiling Mechanism */}
      <div 
        onClick={handleOpenInvitation}
        className="relative w-full max-w-[420px] h-[100dvh] sm:h-[90vh] sm:max-h-[860px] sm:rounded-[36px] overflow-hidden shadow-2xl sm:border sm:border-gold-400/50 select-none bg-stone-900 flex flex-col justify-between cursor-pointer"
        style={{
          boxShadow: '0 30px 80px -10px rgba(0,0,0,0.95), 0 0 40px rgba(212,175,55,0.35)',
        }}
        title="ចុចទីណាលើអេក្រង់ក៏បាន ដើម្បីបើក & ស្តាប់បទភ្លេង"
      >
        {/* ========================================================= */}
        {/* LEFT ROYAL DOOR WING (Glides left in cinematic slow motion) */}
        {/* ========================================================= */}
        <div 
          className={`absolute inset-y-0 left-0 w-[50.2%] overflow-hidden z-20 pointer-events-none transition-transform ${
            isOpen ? '-translate-x-[102%]' : 'translate-x-0'
          }`}
          style={{
            transitionDuration: `${firstScreenConfig.animation.doorOpenDurationMs}ms`,
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.35, 1)',
            willChange: 'transform',
          }}
        >
          <div className="absolute top-0 left-0 w-[200%] h-full">
            {media.type === 'video' ? (
              <video
                ref={leftVideoRef}
                src={media.url}
                poster={media.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ objectPosition: media.objectPosition || 'center 25%' }}
              />
            ) : (
              <img
                src={media.url}
                alt={media.alt || ''}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ objectPosition: media.objectPosition || 'center 25%' }}
              />
            )}
            {/* Ambient Top & Bottom Vignettes */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 via-black/45 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none" />
          </div>

          {/* Right edge of left door: gold rim light */}
          <div className="absolute top-0 bottom-0 right-0 w-[1.5px] bg-gradient-to-b from-transparent via-gold-400 to-transparent shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
        </div>

        {/* ========================================================= */}
        {/* RIGHT ROYAL DOOR WING (Glides right in cinematic slow motion) */}
        {/* ========================================================= */}
        <div 
          className={`absolute inset-y-0 right-0 w-[50.2%] overflow-hidden z-20 pointer-events-none transition-transform ${
            isOpen ? 'translate-x-[102%]' : 'translate-x-0'
          }`}
          style={{
            transitionDuration: `${firstScreenConfig.animation.doorOpenDurationMs}ms`,
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.35, 1)',
            willChange: 'transform',
          }}
        >
          <div className="absolute top-0 right-0 w-[200%] h-full">
            {media.type === 'video' ? (
              <video
                ref={rightVideoRef}
                src={media.url}
                poster={media.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ objectPosition: media.objectPosition || 'center 25%' }}
              />
            ) : (
              <img
                src={media.url}
                alt={media.alt || ''}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ objectPosition: media.objectPosition || 'center 25%' }}
              />
            )}
            {/* Ambient Top & Bottom Vignettes */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 via-black/45 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none" />
          </div>

          {/* Left edge of right door: gold rim light */}
          <div className="absolute top-0 bottom-0 left-0 w-[1.5px] bg-gradient-to-b from-transparent via-gold-400 to-transparent shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
        </div>

        {/* ========================================================= */}
        {/* RADIANT GOLDEN LIGHT BEAM (Bursts through center seam upon opening) */}
        {/* ========================================================= */}
        {firstScreenConfig.animation.showLightBeam && (
          <div 
            className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 sm:w-16 bg-gradient-to-r from-transparent via-gold-200/50 via-white/80 to-transparent pointer-events-none z-25 transition-all ${
              isOpen ? 'opacity-0 scale-x-[6]' : 'opacity-80 scale-x-100'
            }`}
            style={{
              transitionDuration: `${firstScreenConfig.animation.doorOpenDurationMs}ms`,
              transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.35, 1)',
            }}
          />
        )}

        {/* Central Royal Monogram Wax Seal Medal on Door Seam */}
        {firstScreenConfig.animation.showMonogramSeal && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <RoyalMonogramSeal
              monogram={firstScreenConfig.branding.sealMonogram}
              size="md"
              isOpen={isOpen}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* TOP HEADER BRANDING (Floats upward smoothly upon opening) */}
        {/* ========================================================= */}
        <div 
          className={`relative z-30 pt-7 sm:pt-8 px-6 text-center flex flex-col items-center pointer-events-none transition-all duration-1000 ease-out ${
            isOpen ? '-translate-y-12 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <div className="flex items-center justify-center mb-1.5">
            <KbachPhkaChan size={26} />
          </div>

          <span className="text-[10px] sm:text-xs font-kantumruy font-medium tracking-[0.22em] text-gold-300 uppercase drop-shadow">
            {firstScreenConfig.branding.badgeText}
          </span>

          <h1 
            className="font-moul text-xl sm:text-2xl text-white mt-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95),0_0_20px_rgba(212,175,55,0.4)] tracking-normal leading-[1.7]"
            style={{ letterSpacing: '0' }}
          >
            {weddingData.event.titleKhmer}
          </h1>

          <p 
            className="font-moul text-sm sm:text-base text-gold-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] tracking-normal mt-0.5 leading-relaxed"
            style={{ letterSpacing: '0' }}
          >
            {groom.nameKhmer} 🤍 {bride.nameKhmer}
          </p>

          {/* Date Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/45 border border-gold-400/40 text-gold-200 text-[10px] sm:text-[11px] font-kantumruy backdrop-blur-sm mt-2 shadow-md">
            <span>{firstScreenConfig.branding.dateTextKhmer}</span>
            <span className="text-gold-400/60">•</span>
            <span>{firstScreenConfig.branding.locationTextKhmer}</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* GUEST NAME OVERLAY (Dissolves gently upon opening) */}
        {/* ========================================================= */}
        {guestName && (
          <div 
            className={`absolute left-1/2 -translate-x-1/2 w-[72%] max-w-[280px] z-30 pointer-events-none flex items-center justify-center transition-all duration-600 ease-out ${
              isOpen ? 'scale-90 opacity-0 -translate-y-4' : 'scale-100 opacity-100 translate-y-0'
            }`}
            style={{ bottom: '22%' }}
          >
            <div className="relative overflow-hidden w-full py-2 px-3 rounded-xl bg-[#FFFDF9]/95 text-stone-900 border border-gold-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-center backdrop-blur-sm">
              <KhmerCardBackground patternOpacity={0.14} watermarkOpacity={0} />
              <div className="relative z-10">
                <span className="text-[10px] text-stone-500 font-kantumruy block">សូមគោរពអញ្ជើញ</span>
                <span className="font-moul text-xs sm:text-sm text-burgundy-950 line-clamp-1 drop-shadow-sm font-bold mt-0.5">
                  {guestName}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* INTERACTIVE CONTROLS (Floating Action Button & Countdown) */}
        {/* ========================================================= */}
        <div 
          className={`relative inset-x-0 z-30 flex flex-col items-center px-6 pb-7 sm:pb-8 mt-auto transition-all duration-900 ease-out ${
            isOpen ? 'translate-y-12 opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'
          }`}
        >
          {/* Main Pill Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenInvitation();
            }}
            disabled={!isClosed}
            aria-label="បើកលិខិតអញ្ជើញ"
            className={`relative w-full max-w-[250px] py-3.5 px-6 rounded-full bg-[#755A49]/95 hover:bg-[#8A6A56] active:scale-95 text-[#FFFBF2] font-kantumruy font-semibold text-sm sm:text-base border border-[#C5A880]/80 shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] ${
              isPressed ? 'scale-95 ring-2 ring-gold-400' : 'animate-pulse-glow'
            } overflow-hidden`}
          >
            {/* Golden Progress Bar running inside the button */}
            <div 
              className="absolute left-0 bottom-0 top-0 bg-gold-400/30 transition-all duration-700 ease-linear pointer-events-none"
              style={{ width: isPressed ? '100%' : `${((COUNTDOWN_SECONDS - countdown) / COUNTDOWN_SECONDS) * 100}%` }}
            />

            <span className="relative z-10 tracking-wide drop-shadow font-medium">បើកលិខិតអញ្ជើញ 🎵</span>
            <Heart className="relative z-10 w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform duration-300 flex-shrink-0" />
          </button>

          {/* Gentle Hint */}
          <span className="text-[10px] sm:text-[11px] text-gold-300/80 font-kantumruy mt-1.5 drop-shadow pointer-events-none">
            ប៉ះលើអេក្រង់ដើម្បីស្តាប់ភ្លេង ឬរង់ចាំបើកស្វ័យប្រវត្តិ
          </span>

          {/* 5-Second Automatic Countdown Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-gold-400/40 text-gold-200 text-[11px] font-kantumruy mt-1.5 backdrop-blur-sm shadow-md pointer-events-none">
            <Clock className="w-3 h-3 text-gold-300 animate-pulse flex-shrink-0" />
            <span>បើកស្វ័យប្រវត្តិក្នង <strong className="text-gold-300 font-moul text-xs">{toKhmerDigits(countdown)}</strong> វិនាទី</span>
            <Sparkles className="w-2.5 h-2.5 text-gold-400 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnvelopeCover;
