import React, { useState } from 'react';
import { weddingData } from '../config/weddingConfig';
import { KhmerCorner, KhmerDivider, KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';
import { 
  Coffee, 
  Gift, 
  Flame, 
  Scissors, 
  Heart, 
  Camera, 
  Cake, 
  Music, 
  Sun, 
  Moon,
  Clock
} from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');

  const getIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-gold-500";
    switch (iconName) {
      case 'coffee': return <Coffee className={iconClass} />;
      case 'gift': return <Gift className={iconClass} />;
      case 'flame': return <Flame className={iconClass} />;
      case 'scissors': return <Scissors className={iconClass} />;
      case 'heart': return <Heart className={iconClass} />;
      case 'camera': return <Camera className={iconClass} />;
      case 'cake': return <Cake className={iconClass} />;
      case 'music': return <Music className={iconClass} />;
      default: return <Clock className={iconClass} />;
    }
  };

  const currentSchedule = activeTab === 'morning' ? weddingData.schedules.morning : weddingData.schedules.evening;

  return (
    <section className="relative my-6 sm:my-8 w-full max-w-3xl mx-auto">
      <div className="relative rounded-3xl bg-white/88 backdrop-blur-md border border-gold-400/60 p-4 sm:p-10 shadow-royal overflow-hidden">
        {/* Authentic Khmer Silk Brocade & Watermark Background */}
        <KhmerCardBackground patternOpacity={0.18} watermarkOpacity={0.10} watermarkSize="w-72 sm:w-96 h-72 sm:h-96" />
        
        {/* Corner Motifs */}
        <KhmerCorner className="absolute khmer-corner-tl text-gold-500 opacity-70" size={36} />
        <KhmerCorner className="absolute khmer-corner-tr text-gold-500 opacity-70" size={36} />
        <KhmerCorner className="absolute khmer-corner-bl text-gold-500 opacity-70" size={36} />
        <KhmerCorner className="absolute khmer-corner-br text-gold-500 opacity-70" size={36} />

        {/* Section Title */}
        <div className="text-center relative z-10 mb-6 flex flex-col items-center">
          <KbachPhkaChan size={38} className="mb-2" />
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">
            Wedding Program
          </span>
          <h2 className="font-moul text-2xl sm:text-3xl text-burgundy-900 mt-1">
            កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
          </h2>
          <KhmerDivider className="my-4" />
        </div>

        {/* Tab Switcher: Morning vs Evening (Luxury Royal Pill Dock matching screenshot) */}
        <div className="p-1 sm:p-1.5 rounded-full bg-stone-900/10 backdrop-blur-md border border-gold-400/40 shadow-inner flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 mb-8 relative z-10 w-full max-w-lg mx-auto">
          <button
            onClick={() => setActiveTab('morning')}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-kantumruy text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'morning'
                ? 'bg-gradient-to-r from-burgundy-950 via-burgundy-900 to-burgundy-950 text-gold-200 shadow-[0_4px_14px_rgba(92,18,33,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-gold-400/80'
                : 'bg-white/85 text-stone-700 hover:bg-white hover:text-burgundy-900 border border-stone-200/80 hover:border-gold-300/80 shadow-sm'
            }`}
          >
            <Sun className={`w-4 h-4 ${activeTab === 'morning' ? 'text-gold-400' : 'text-amber-500'}`} />
            <span>កម្មវិធីពេលព្រឹក (ពិធីប្រពៃណី)</span>
          </button>

          <button
            onClick={() => setActiveTab('evening')}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-kantumruy text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'evening'
                ? 'bg-gradient-to-r from-burgundy-950 via-burgundy-900 to-burgundy-950 text-gold-200 shadow-[0_4px_14px_rgba(92,18,33,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)] border border-gold-400/80'
                : 'bg-white/85 text-stone-700 hover:bg-white hover:text-burgundy-900 border border-stone-200/80 hover:border-gold-300/80 shadow-sm'
            }`}
          >
            <Moon className={`w-4 h-4 ${activeTab === 'evening' ? 'text-gold-400' : 'text-indigo-500'}`} />
            <span>កម្មវិធីពេលល្ងាច (ពិសាភោជនាហារ)</span>
          </button>
        </div>

        {/* Timeline List */}
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-5 sm:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gold-400 via-burgundy-500 to-gold-400 opacity-40" />

          <div className="space-y-5 sm:space-y-6">
            {currentSchedule.map((item, index) => (
              <div 
                key={index} 
                className="relative flex items-start gap-3 sm:gap-6 group"
              >
                {/* Timeline Icon Node */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-cream-50 border-2 border-gold-400 shadow-md flex items-center justify-center group-hover:scale-105 group-hover:border-burgundy-700 transition-all duration-300">
                  {getIcon(item.iconName)}
                </div>

                {/* Content Box */}
                <div className="flex-1 bg-cream-50/70 rounded-2xl p-4 sm:p-5 border border-gold-300/40 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-burgundy-900 text-gold-200 text-xs font-semibold font-kantumruy">
                      {item.timeKhmer}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      {item.time}
                    </span>
                  </div>

                  <h3 className="font-moul text-base sm:text-lg text-burgundy-900">
                    {item.titleKhmer}
                  </h3>
                  <p className="text-xs text-stone-500 font-light italic mb-1.5">
                    {item.titleEn}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 font-kantumruy leading-relaxed">
                    {item.descriptionKhmer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
