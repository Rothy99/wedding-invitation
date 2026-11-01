import React, { useEffect, useState } from 'react';
import { weddingData, toKhmerDigits } from '../config/weddingConfig';
import { Calendar, Clock } from 'lucide-react';
import { KhmerCorner, KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(weddingData.event.targetIsoDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timerCards = [
    { labelKhmer: 'ថ្ងៃ', labelEn: 'Days', value: timeLeft.days },
    { labelKhmer: 'ម៉ោង', labelEn: 'Hours', value: timeLeft.hours },
    { labelKhmer: 'នាទី', labelEn: 'Minutes', value: timeLeft.minutes },
    { labelKhmer: 'វិនាទី', labelEn: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="relative my-6 sm:my-8 w-full max-w-3xl mx-auto">
      <div className="relative rounded-3xl bg-burgundy-gradient text-gold-100 p-4 sm:p-10 shadow-royal border border-gold-400/50 overflow-hidden text-center">
        
        {/* Traditional Khmer Diamond Lattice & Watermark Background */}
        <KhmerCardBackground patternOpacity={0.18} watermarkOpacity={0.10} watermarkSize="w-64 sm:w-80 h-64 sm:h-80" />

        {/* Corner Ornaments */}
        <KhmerCorner className="absolute khmer-corner-tl text-gold-400/70" size={36} />
        <KhmerCorner className="absolute khmer-corner-tr text-gold-400/70" size={36} />
        <KhmerCorner className="absolute khmer-corner-bl text-gold-400/70" size={36} />
        <KhmerCorner className="absolute khmer-corner-br text-gold-400/70" size={36} />

        {/* Date Headers with Kbach Phka Chan */}
        <div className="relative z-10 flex flex-col items-center">
          <KbachPhkaChan size={40} className="mb-2" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/15 border border-gold-400/40 text-gold-300 text-xs sm:text-sm mb-3">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>កាលបរិច្ឆេទនៃថ្ងៃមង្គល</span>
          </div>

          <h3 className="font-moul text-2xl sm:text-3xl text-gold-bright tracking-wide mb-1 leading-relaxed">
            {weddingData.event.solarDateKhmer}
          </h3>
          <p className="text-xs sm:text-sm text-gold-200/90 font-kantumruy leading-relaxed">
            {weddingData.event.lunarDateKhmer}
          </p>
          <p className="text-xs text-gold-300/60 font-mono mt-0.5 tracking-wider">
            {weddingData.event.dateEn}
          </p>
        </div>

        {/* Live Countdown Display */}
        <div className="relative z-10 my-8">
          <div className="flex items-center justify-center gap-2 text-gold-300/80 text-xs sm:text-sm mb-4">
            <Clock className="w-4 h-4 text-gold-400 animate-pulse" />
            <span>រាប់ថយក្រោយឆ្ពោះទៅកាន់ថ្ងៃពិសេស</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 max-w-lg mx-auto">
            {timerCards.map((card, idx) => (
              <div
                key={idx}
                className="relative rounded-xl sm:rounded-2xl bg-burgundy-950/85 border border-gold-400/50 p-2 sm:p-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:border-gold-300 group"
              >
                {/* Khmer Numeral */}
                <span className="font-moul text-xl sm:text-3xl md:text-4xl text-gold-bright drop-shadow leading-none">
                  {toKhmerDigits(card.value < 10 ? `0${card.value}` : card.value)}
                </span>
                
                {/* Western Numeral (compact) */}
                <span className="text-[10px] sm:text-xs text-gold-400/70 font-mono mt-0.5">
                  ({card.value < 10 ? `0${card.value}` : card.value})
                </span>

                {/* Labels */}
                <span className="text-xs sm:text-sm font-kantumruy text-gold-200 font-semibold mt-1">
                  {card.labelKhmer}
                </span>
                <span className="text-[9px] sm:text-[10px] text-gold-300/50 uppercase tracking-wider">
                  {card.labelEn}
                </span>

                {/* Subtle Glow Dot */}
                <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-gold-400/40 group-hover:bg-gold-300 animate-ping" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
export default CountdownTimer;
