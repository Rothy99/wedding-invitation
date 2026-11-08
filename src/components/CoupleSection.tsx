import React from 'react';
import { weddingData } from '../config/weddingConfig';
import { KhmerCorner, KbachPhkaChan } from './KhmerMotif';

export const CoupleSection: React.FC = () => {
  const { groom, bride } = weddingData.couple;

  return (
    <section id="couple-section" className="relative my-6 sm:my-8 w-full max-w-3xl mx-auto scroll-mt-6">
      {/* Grand Card Container with Authentic Pre-Wedding Portrait at Angkor Wat as Background */}
      <div 
        className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[700px] rounded-3xl overflow-hidden border-2 border-gold-400/80 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.7),0_0_35px_rgba(212,175,55,0.3)] bg-stone-900 select-none flex flex-col justify-between"
      >
        {/* Background Image: Authentic Pre-Wedding Portrait at Angkor Wat */}
        <img
          src="/couple_angkor.jpg"
          alt={`${groom.nameKhmer} និង ${bride.nameKhmer}`}
          className="absolute inset-0 w-full h-full object-cover object-[center_top] pointer-events-none"
        />

        {/* Ambient Top Vignette for Title Legibility without darkening the temple */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/75 via-black/35 to-transparent z-10 pointer-events-none" />

        {/* Ambient Bottom Gradient for Cards Legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] sm:h-[55%] bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10 pointer-events-none" />

        {/* Intricate Khmer Corner Ornaments in Gold */}
        <KhmerCorner className="absolute khmer-corner-tl text-gold-400 opacity-90 drop-shadow z-20 pointer-events-none" size={28} />
        <KhmerCorner className="absolute khmer-corner-tr text-gold-400 opacity-90 drop-shadow z-20 pointer-events-none" size={28} />
        <KhmerCorner className="absolute khmer-corner-bl text-gold-400 opacity-90 drop-shadow z-20 pointer-events-none" size={28} />
        <KhmerCorner className="absolute khmer-corner-br text-gold-400 opacity-90 drop-shadow z-20 pointer-events-none" size={28} />

        {/* Inner Fine Gold Border */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-gold-400/35 pointer-events-none z-20" />

        {/* Top Header - Slim Luxurious Badge with Ample Breathing Room */}
        <div className="relative z-20 pt-4 sm:pt-6 px-3 sm:px-6 text-center flex flex-col items-center">
          <div className="relative overflow-hidden inline-flex flex-col items-center px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl bg-black/45 backdrop-blur-md border border-gold-400/40 border-t-white/30 shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-gold-300">
                <KbachPhkaChan size={15} />
                <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-gold-200 font-semibold drop-shadow">
                  The Wedding of Two Families
                </span>
                <KbachPhkaChan size={15} />
              </div>
              <h2 className="font-moul text-base sm:text-xl md:text-2xl text-white mt-0.5 leading-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                មាតាបិតា និងគូស្វាមីភរិយាថ្មី
              </h2>
            </div>
          </div>
        </div>

        {/* HERO WINDOW: Clear, unobstructed view of the couple smiling under the golden umbrella at Angkor Wat */}
        <div className="relative z-10 flex-1 min-h-[140px] sm:min-h-[180px] md:min-h-[220px] pointer-events-none" />

        {/* PARENTS & COUPLE ZONE: Side-by-Side 2-Column Clean Frosted Cards */}
        <div className="relative z-20 px-2.5 sm:px-5 pb-3 sm:pb-5 flex flex-col gap-2 sm:gap-3">
          <div className="grid grid-cols-2 gap-2 sm:gap-3.5 text-center">
            
            {/* Groom's Side (ខាងកូនប្រុស - Left) */}
            <div className="relative overflow-hidden flex flex-col items-center justify-between p-2.5 sm:p-4 md:p-5 rounded-2xl bg-black/45 backdrop-blur-md border border-gold-400/40 border-t-white/35 shadow-[0_12px_30px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300">
              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Royal Maroon Pill Badge */}
                <span className="inline-block px-2.5 sm:px-4 py-1 rounded-full bg-[#3B0712] border border-amber-400/90 text-[#FFF7E8] text-[10px] sm:text-xs md:text-sm font-bold mb-2 shadow-[0_2px_8px_rgba(59,7,18,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)]">
                  មាតាបិតាខាងកូនប្រុស
                </span>

                {/* Parents' Names */}
                <div className="space-y-0.5 sm:space-y-1 text-white font-regular font-bold">
                  <p className="text-[11px] sm:text-sm md:text-base leading-snug text-stone-100">{groom.fatherKhmer}</p>
                  <p className="text-[11px] sm:text-sm md:text-base leading-snug text-stone-100">{groom.motherKhmer}</p>
                </div>
                
                {/* Delicate Gold Hairline Divider */}
                <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400/80 to-transparent my-1.5 sm:my-2.5" />
                
                {/* Title */}
                <span className="text-[10px] sm:text-xs text-gold-300 font-bold">{groom.titleKhmer}</span>

                {/* Groom Name */}
                <h3 className="font-moul text-base sm:text-xl md:text-2xl text-gold-200 mt-0.5 leading-snug font-bold">
                  {groom.nameKhmer}
                </h3>
                <p className="text-[8px] sm:text-[10px] md:text-xs text-gold-300/80 tracking-wider font-semibold uppercase mt-0.5">
                  {groom.nameEn}
                </p>
              </div>
            </div>

            {/* Bride's Side (ខាងកូនស្រី - Right) */}
            <div className="relative overflow-hidden flex flex-col items-center justify-between p-2.5 sm:p-4 md:p-5 rounded-2xl bg-black/45 backdrop-blur-md border border-gold-400/40 border-t-white/35 shadow-[0_12px_30px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300">
              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Royal Maroon Pill Badge */}
                <span className="inline-block px-2.5 sm:px-4 py-1 rounded-full bg-[#3B0712] border border-amber-400/90 text-[#FFF7E8] text-[10px] sm:text-xs md:text-sm font-bold mb-2 shadow-[0_2px_8px_rgba(59,7,18,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)]">
                  មាតាបិតាខាងកូនស្រី
                </span>

                {/* Parents' Names */}
                <div className="space-y-0.5 sm:space-y-1 text-white font-regular font-bold">
                  <p className="text-[11px] sm:text-sm md:text-base leading-snug text-stone-100">{bride.fatherKhmer}</p>
                  <p className="text-[11px] sm:text-sm md:text-base leading-snug text-stone-100">{bride.motherKhmer}</p>
                </div>
                
                {/* Delicate Gold Hairline Divider */}
                <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400/80 to-transparent my-1.5 sm:my-2.5" />
                
                {/* Title */}
                <span className="text-[10px] sm:text-xs text-gold-300 font-bold">{bride.titleKhmer}</span>

                {/* Bride Name */}
                <h3 className="font-moul text-base sm:text-xl md:text-2xl text-gold-200 mt-0.5 leading-snug font-bold">
                  {bride.nameKhmer}
                </h3>
                <p className="text-[8px] sm:text-[10px] md:text-xs text-gold-300/80 tracking-wider font-semibold uppercase mt-0.5">
                  {bride.nameEn}
                </p>
              </div>
            </div>

          </div>

          {/* Heartfelt Khmer Couple Love Vow */}
          <div className="relative overflow-hidden px-3 py-1.5 sm:py-2.5 rounded-xl bg-black/45 backdrop-blur-md border border-gold-400/30 text-center shadow-md">
            <p className="font-regular text-[10px] sm:text-xs md:text-sm italic leading-relaxed text-gold-200">
              « ពីថ្ងៃដែលបានជួបគ្នា ដឹងច្បាស់ថាជាគូព្រេង ឆ្លងកាត់រាល់ឧបសគ្គ កាន់ដៃគ្នារហូតដល់ថ្ងៃមង្គល »
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CoupleSection;
