import React, { useState, useEffect } from 'react';
import { KhmerDivider, KhmerCorner, KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';
import { RoyalMonogramSeal } from './RoyalMonogramSeal';
import { weddingData } from '../config/weddingConfig';
import { UserCheck, ChevronDown, Calendar, MapPin } from 'lucide-react';

interface HeaderBlessingProps {
  isRevealed?: boolean;
}

export const HeaderBlessing: React.FC<HeaderBlessingProps> = ({ isRevealed = true }) => {
  const [guestName, setGuestName] = useState<string>('');
  const { event } = weddingData;

  // Read guest name if provided in URL parameter (?to=..., ?name=..., ?guest=...)
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

  return (
    <header className="relative pt-4 sm:pt-8 text-center w-full max-w-3xl mx-auto">
      {/* Radiant Angkor Sunrise Backdrop Flare */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-44 bg-[radial-gradient(circle,rgba(212,175,55,0.22)_0%,transparent_70%)] rounded-full pointer-events-none transition-opacity duration-1000 ${
          isRevealed ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Traditional Khmer Golden Pediment Motif (ក្បាច់ផ្តែរ/ក្បាច់រចនារាជវាំង) */}
      <div 
        className={`relative flex justify-center mb-1 transition-all duration-700 delay-150 ease-out ${
          isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
        }`}
      >
        <img
          src="/khmer_pediment_gold.png"
          alt="ក្បាច់រចនាខ្មែរ"
          className="w-56 sm:w-72 h-auto object-contain drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)] hover:scale-105 transition-transform duration-500 pointer-events-none"
        />
      </div>

      {/* Main Calligraphic Title in Moul Font */}
      <div 
        className={`relative mt-1 mb-3 transition-all duration-700 delay-300 ease-out ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <h1 
          className="font-moul text-3xl sm:text-4xl md:text-5xl text-burgundy-900 tracking-normal leading-[1.7] sm:leading-[1.8]"
          style={{
            textShadow: '0 2px 4px rgba(255, 255, 255, 0.9), 0 4px 14px rgba(92, 18, 33, 0.28)',
            letterSpacing: '0',
          }}
        >
          {event.titleKhmer}
        </h1>
        <p 
          className="font-moul text-lg sm:text-2xl text-gold-600 mt-1 tracking-normal drop-shadow-sm leading-relaxed"
          style={{ letterSpacing: '0' }}
        >
          លិខិតគោរពអញ្ជើញ
        </p>

        {/* Auspicious Date & Venue Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5 text-xs font-kantumruy">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-gold-400/50 text-stone-800 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-burgundy-800" />
            <span className="font-medium">{event.solarDateKhmer}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-gold-400/50 text-stone-800 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-burgundy-800" />
            <span className="font-medium">{event.venueNameKhmer}</span>
          </div>
        </div>
      </div>

      {/* Traditional Kbach Phka Chan & Filigree Divider */}
      <KhmerDivider className="my-5" />

      {/* Formal Respectful Guest Address Card (Royal Wedding Card Parchment) */}
      <div 
        className={`relative rounded-3xl bg-gradient-to-b from-[#FFFDF9]/92 via-[#FAF6ED]/88 to-[#F5EEDC]/90 backdrop-blur-md p-4 sm:p-8 border-2 border-gold-400/70 shadow-[0_15px_40px_-10px_rgba(74,7,19,0.22),0_4px_20px_rgba(212,175,55,0.25)] overflow-hidden transition-all duration-800 delay-350 ease-out ${
          isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
        }`}
      >
        {/* Authentic Khmer Silk Brocade & Watermark Background */}
        <KhmerCardBackground patternOpacity={0.16} watermarkOpacity={0.08} watermarkSize="w-64 sm:w-80 h-64 sm:h-80" />

        {/* Intricate Khmer Corner Motifs */}
        <KhmerCorner className="absolute khmer-corner-tl text-gold-500 opacity-80" size={34} />
        <KhmerCorner className="absolute khmer-corner-tr text-gold-500 opacity-80" size={34} />
        <KhmerCorner className="absolute khmer-corner-bl text-gold-500 opacity-80" size={34} />
        <KhmerCorner className="absolute khmer-corner-br text-gold-500 opacity-80" size={34} />

        {/* Double Fine Inner Borders */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-gold-400/35 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 rounded-xl border border-gold-400/20 border-dashed pointer-events-none" />

        {/* Royal Wax Seal Monogram Badge */}
        <div className="flex justify-center -mt-1 mb-3">
          <RoyalMonogramSeal size="sm" monogram="ស • វ" />
        </div>

        {/* Card Content */}
        <div className="relative z-10 space-y-2">
          {/* Personalized Guest Badge if provided */}
          {guestName && (
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-burgundy-900 text-gold-200 border border-gold-400/70 shadow-sm text-xs sm:text-sm font-kantumruy font-bold mb-2 animate-fadeIn">
              <UserCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>សូមគោរពអញ្ជើញ៖ {guestName}</span>
            </div>
          )}

          <p className="font-kantumruy text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            យើងខ្ញុំមានកិត្តិយសដ៏ខ្ពង់ខ្ពស់ សូមគោរពអញ្ជើញ
          </p>

          <p className="font-kantumruy text-base sm:text-lg md:text-xl text-burgundy-900 font-bold leading-relaxed tracking-wide py-0.5">
            {guestName ? (
              <span className="text-gold-gradient drop-shadow font-moul text-lg sm:text-xl">
                {guestName}
              </span>
            ) : (
              <span>ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា</span>
            )}
          </p>

          <p className="font-kantumruy text-xs sm:text-sm md:text-base text-stone-700 leading-loose max-w-lg mx-auto">
            អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍កូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ
          </p>

          {/* Auspicious Khmer Four Blessings */}
          <div className="pt-2 text-[11px] sm:text-xs text-gold-700 font-kantumruy font-medium tracking-wide">
            ✧ អាយុ វណ្ណៈ សុខៈ ពលៈ កុំបីឃ្លៀងឃ្លាតឡើយ ✧
          </div>
        </div>

        {/* Bottom Delicate Kbach Accent */}
        <div className="flex justify-center mt-3 pt-1">
          <KbachPhkaChan size={26} className="opacity-90" />
        </div>
      </div>

      {/* Auspicious Scroll Down Action Button */}
      <div 
        className={`flex flex-col items-center justify-center my-5 transition-all duration-700 delay-500 ease-out ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={() => {
            const coupleEl = document.getElementById('couple-section');
            if (coupleEl) {
              coupleEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollBy({ top: 480, behavior: 'smooth' });
            }
          }}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 hover:bg-gold-50/95 active:scale-95 border-2 border-gold-400/60 text-gold-900 text-xs sm:text-sm font-kantumruy font-bold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-gold-500"
          title="ចុចដើម្បីអូសចុះក្រោមដោយរលូន"
        >
          <span className="tracking-wide">អូសចុះក្រោមដើម្បីទស្សនា</span>
          <ChevronDown className="w-4 h-4 text-gold-600 animate-bounce group-hover:text-gold-700 flex-shrink-0" />
        </button>
      </div>
    </header>
  );
};
export default HeaderBlessing;
