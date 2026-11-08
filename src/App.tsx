import React, { useState, useEffect } from 'react';
import { EnvelopeCover } from './components/EnvelopeCover';
import { HeaderBlessing } from './components/HeaderBlessing';
import { CoupleSection } from './components/CoupleSection';
import { CountdownTimer } from './components/CountdownTimer';
import { ScheduleSection } from './components/ScheduleSection';
import { VenueMap } from './components/VenueMap';
import { GallerySection } from './components/GallerySection';
import { RsvpSection } from './components/RsvpSection';
import { WishesWall } from './components/WishesWall';
import { KhqrGiftModal } from './components/KhqrGiftModal';
import { FooterBlessing } from './components/FooterBlessing';
import { MusicPlayer } from './components/MusicPlayer';
import { FallingPetals } from './components/FallingPetals';
import { KbachVineRibbon } from './components/KhmerMotif';
import { ScrollReveal } from './components/ScrollReveal';
import { CycleSparkleOverlay } from './components/CycleSparkleOverlay';
import { HomeScreenBackground } from './components/HomeScreenBackground';
import { weddingAudio } from './utils/audioManager';
import { ChevronUp } from 'lucide-react';

export const App: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isCycleSparkleActive, setIsCycleSparkleActive] = useState(false);
  const [shouldAutoPlayMusic, setShouldAutoPlayMusic] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpeningDone, setIsOpeningDone] = useState(false);

  // Throttled high-efficiency scroll listener: only triggers setState on actual threshold crossings
  useEffect(() => {
    let prev = false;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 450;
          if (shouldShow !== prev) {
            prev = shouldShow;
            setShowScrollTop(shouldShow);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Free GPU memory after the 3.4s cinematic unveiling completes
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isEnvelopeOpen) {
      timer = setTimeout(() => {
        setIsOpeningDone(true);
      }, 3600);
    } else {
      setIsOpeningDone(false);
    }
    return () => clearTimeout(timer);
  }, [isEnvelopeOpen]);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setIsCycleSparkleActive(true);
    setShouldAutoPlayMusic(true);
    weddingAudio.play();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(false);
    setIsOpeningDone(false);
    setIsCycleSparkleActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-stone-800 font-kantumruy relative selection:bg-gold-500 selection:text-burgundy-950 overflow-x-hidden">
      {/* Configurable Full-Page Background (Image or Video with smart audio) */}
      <HomeScreenBackground isEnvelopeOpen={isEnvelopeOpen} />

      {/* Falling Lotus Petals & Gold Sparkles */}
      <FallingPetals />

      {/* Grand Cycle Sparkle Opening Effect (when opening home) */}
      <CycleSparkleOverlay isActive={isCycleSparkleActive} />

      {/* First Page / Cinematic Angkor Landing Cover */}
      <EnvelopeCover
        isOpen={isEnvelopeOpen}
        onOpen={handleOpenEnvelope}
      />

      {/* Floating Music Controller (Placed after EnvelopeCover with higher stacking) */}
      <MusicPlayer autoPlayTrigger={shouldAutoPlayMusic} />

      {/* Floating Scroll To Top Button (Appears when scrolled down) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="ឡើងទៅលើ"
        title="ឡើងទៅលើ (Scroll to Top)"
        className={`fixed bottom-6 left-4 sm:bottom-6 sm:left-6 z-40 p-3 rounded-full bg-white/95 border border-gold-400/80 text-burgundy-950 shadow-lg hover:bg-gold-50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-5 h-5 text-burgundy-900" />
      </button>

      {/* Main Wedding Invitation Ceremony View - Cinematic Entrance with GPU Release */}
      <main 
        className={`relative z-10 max-w-3xl mx-auto min-h-screen pb-12 px-3 sm:px-5 ${
          !isOpeningDone ? 'transition-all duration-[3400ms]' : ''
        } ${
          isEnvelopeOpen 
            ? 'opacity-100 scale-100 translate-y-0 blur-0 pointer-events-auto' 
            : 'opacity-0 scale-[0.93] translate-y-8 blur-[4px] pointer-events-none'
        }`}
        style={!isOpeningDone ? {
          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.35, 1)',
          willChange: 'transform, opacity, filter',
        } : undefined}
      >
        {/* Top Auspicious Header & Formal Blessing with Staggered Entrance */}
        <HeaderBlessing isRevealed={isEnvelopeOpen} />

        {/* Bride & Groom + Parents Introduction */}
        <ScrollReveal direction="up" delay={80}>
          <CoupleSection />
        </ScrollReveal>

        {/* Continuous Khmer Kbach Ribbon */}
        <KbachVineRibbon className="my-2" />

        {/* Live Countdown & Calendar Saver */}
        <ScrollReveal direction="up" delay={60}>
          <CountdownTimer />
        </ScrollReveal>

        {/* Traditional Ceremony Program / Schedule */}
        <ScrollReveal direction="up" delay={60}>
          <ScheduleSection />
        </ScrollReveal>

        {/* Continuous Khmer Kbach Ribbon */}
        <KbachVineRibbon className="my-2" />

        {/* Reception Venue & Google Maps Navigation */}
        <ScrollReveal direction="up" delay={60}>
          <VenueMap />
        </ScrollReveal>

        {/* Pre-wedding Photo Gallery & Lightbox */}
        <ScrollReveal direction="up" delay={60}>
          <GallerySection />
        </ScrollReveal>

        {/* Continuous Khmer Kbach Ribbon */}
        <KbachVineRibbon className="my-2" />

        {/* RSVP Attendance Confirmation */}
        <ScrollReveal direction="up" delay={60}>
          <RsvpSection />
        </ScrollReveal>

        {/* KHQR Gift / Banking Token */}
        <ScrollReveal direction="up" delay={60}>
          <KhqrGiftModal />
        </ScrollReveal>

        {/* Guest Blessings & Wishes Wall */}
        <ScrollReveal direction="up" delay={60}>
          <WishesWall />
        </ScrollReveal>

        {/* Closing Thank-You & Monogram */}
        <ScrollReveal direction="up" delay={60}>
          <FooterBlessing onReopenEnvelope={handleReopenEnvelope} />
        </ScrollReveal>

      </main>
    </div>
  );
};

export default App;
