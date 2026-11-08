import React from 'react';
import { weddingData } from '../config/weddingConfig';
import { KhmerCorner, KhmerDivider, KbachPhkaChan } from './KhmerMotif';

export const CoupleSection: React.FC = () => {
  const { groom, bride } = weddingData.couple;

  return (
    <section id="couple-section" className="relative my-6 sm:my-8 w-full max-w-3xl mx-auto scroll-mt-6">
      {/* Grand Card Container with Authentic Pre-Wedding Portrait at Angkor Wat as Background */}
      <div 
        className="relative rounded-3xl overflow-hidden border-2 border-gold-400/80 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.7),0_0_35px_rgba(212,175,55,0.3)] bg-stone-900 select-none flex flex-col justify-between"
      >
        {/* Background Image: Authentic Pre-Wedding Portrait at Angkor Wat */}
        <img
          src="/couple_angkor.jpg"
          alt={`${groom.nameKhmer} និង ${bride.nameKhmer}`}
          className="absolute inset-0 w-full h-full object-cover object-[center_top] pointer-events-none"
        />

        {/* Ambient Top Vignette for Title Legibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 via-black/20 to-transparent z-10 pointer-events-none" />

        {/* Ambient Bottom Gradient for Parents Cards & Love Vow Legibility - Tuned for Clearer Glass */}
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/60 via-black/25 to-transparent z-10 pointer-events-none" />

        {/* Intricate Khmer Corner Ornaments in Gold */}
        <KhmerCorner className="absolute khmer-corner-tl text-gold-400 opacity-90 drop-shadow z-20 pointer-events-none" size={32} />
        <KhmerCorner className="absolute khmer-corner-tr text-gold-400 opacity-90 drop-shadow z-20 pointer-events-none" size={32} />
        <KhmerCorner className="absolute khmer-corner-bl text-gold-400 opacity-90 drop-shadow z-20 pointer-events-none" size={32} />
        <KhmerCorner className="absolute khmer-corner-br text-gold-400 opacity-90 drop-shadow z-20 pointer-events-none" size={32} />

        {/* Inner Fine Gold Border */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-gold-400/35 pointer-events-none z-20" />

        {/* Top Header - Luxurious Frosted Glass Container with Generous Clearance from Corner Ornaments */}
        <div className="relative z-20 pt-8 sm:pt-10 px-4 sm:px-6 text-center flex flex-col items-center">
          <div className="relative overflow-hidden inline-flex flex-col items-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl glass-luxury-pill border border-gold-400/40 border-t-white/40 shadow-[0_12px_35px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.4)] max-w-sm">
            {/* Top glass gloss sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <KbachPhkaChan size={28} className="mb-1 drop-shadow-[0_2px_10px_rgba(212,175,55,0.6)]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold-200 font-semibold mb-0.5 drop-shadow">
                The Wedding of Two Families
              </span>
              <h2 className="font-moul text-lg sm:text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                មាតាបិតា និងគូស្វាមីភរិយាថ្មី
              </h2>
              <KhmerDivider className="mt-1.5 text-gold-300 opacity-90" />
            </div>
          </div>
        </div>

        {/* HERO ZONE: Open view of the Couple smiling under the Golden Umbrella at Angkor Wat with balanced, consistent spacing */}
        <div className="relative z-20 py-4 sm:py-5 flex flex-col items-center justify-center text-center">
          <div className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-luxury-pill border border-gold-400/50 border-t-white/50 shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.45)]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
            <span className="relative z-10 font-moul text-base sm:text-lg text-gold-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {groom.nameKhmer} 🤍 {bride.nameKhmer}
            </span>
          </div>
        </div>

        {/* PARENTS BLESSINGS ZONE: Luxurious Frosted Glass Cards with High Contrast Legibility */}
        <div className="relative z-20 px-3.5 sm:px-6 pb-8 sm:pb-10 flex flex-col gap-4 sm:gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 text-center">
            
            {/* Groom's Side (ខាងកូនប្រុស) */}
            <div className="relative overflow-hidden flex flex-col items-center p-4.5 sm:p-6 rounded-2xl glass-luxury-card border border-gold-400/45 border-t-white/45 shadow-[0_16px_40px_rgba(0,0,0,0.55),inset_0_1.5px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-gold-300/80 hover:shadow-[0_20px_45px_rgba(0,0,0,0.65),0_0_20px_rgba(212,175,55,0.25)] group">
              {/* Diagonal glass light reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/[0.02] to-transparent pointer-events-none rounded-2xl" />

              <div className="relative z-10 flex flex-col items-center w-full">
                <span className="px-5 py-1.5 rounded-full bg-[#3B0712] border border-amber-400/90 text-[#FFF7E8] text-xs sm:text-sm font-bold mb-3 shadow-[0_4px_14px_rgba(59,7,18,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] tracking-wide">
                  មាតាបិតាខាងកូនប្រុស
                </span>
                <div className="space-y-1 text-white font-kantumruy font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <p className="text-base sm:text-lg leading-relaxed">{groom.fatherKhmer}</p>
                  <p className="text-base sm:text-lg leading-relaxed">{groom.motherKhmer}</p>
                </div>
                
                <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent my-3.5 shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                
                <span className="text-xs text-gold-300 font-bold tracking-wide drop-shadow">{groom.titleKhmer}</span>
                <h3 className="font-moul text-2xl sm:text-3xl text-gold-200 mt-1 leading-relaxed font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  {groom.nameKhmer}
                </h3>
                <p className="text-xs text-gold-300/80 tracking-widest font-semibold uppercase mt-0.5 drop-shadow">
                  {groom.nameEn}
                </p>
              </div>
            </div>

            {/* Bride's Side (ខាងកូនស្រី) */}
            <div className="relative overflow-hidden flex flex-col items-center p-4.5 sm:p-6 rounded-2xl glass-luxury-card border border-gold-400/45 border-t-white/45 shadow-[0_16px_40px_rgba(0,0,0,0.55),inset_0_1.5px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-gold-300/80 hover:shadow-[0_20px_45px_rgba(0,0,0,0.65),0_0_20px_rgba(212,175,55,0.25)] group">
              {/* Diagonal glass light reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/[0.02] to-transparent pointer-events-none rounded-2xl" />

              <div className="relative z-10 flex flex-col items-center w-full">
                <span className="px-5 py-1.5 rounded-full bg-[#3B0712] border border-amber-400/90 text-[#FFF7E8] text-xs sm:text-sm font-bold mb-3 shadow-[0_4px_14px_rgba(59,7,18,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] tracking-wide">
                  មាតាបិតាខាងកូនស្រី
                </span>
                <div className="space-y-1 text-white font-kantumruy font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <p className="text-base sm:text-lg leading-relaxed">{bride.fatherKhmer}</p>
                  <p className="text-base sm:text-lg leading-relaxed">{bride.motherKhmer}</p>
                </div>
                
                <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent my-3.5 shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                
                <span className="text-xs text-gold-300 font-bold tracking-wide drop-shadow">{bride.titleKhmer}</span>
                <h3 className="font-moul text-2xl sm:text-3xl text-gold-200 mt-1 leading-relaxed font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  {bride.nameKhmer}
                </h3>
                <p className="text-xs text-gold-300/80 tracking-widest font-semibold uppercase mt-0.5 drop-shadow">
                  {bride.nameEn}
                </p>
              </div>
            </div>

          </div>

          {/* Heartfelt Khmer Couple Love Vow */}
          <div className="relative overflow-hidden p-3.5 sm:p-4 rounded-2xl glass-luxury-card border border-gold-400/40 border-t-white/35 text-gold-100 text-center shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
            <p className="relative z-10 font-kantumruy text-xs sm:text-sm italic leading-relaxed text-gold-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              « ពីថ្ងៃដែលបានជួបគ្នា ដឹងច្បាស់ថាជាគូព្រេង ឆ្លងកាត់រាល់ឧបសគ្គ កាន់ដៃគ្នារហូតដល់ថ្ងៃមង្គល »
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
export default CoupleSection;
