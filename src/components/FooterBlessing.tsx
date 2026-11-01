import React from 'react';
import { weddingData } from '../config/weddingConfig';
import { KhmerDivider, KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';
import { Mail, ArrowUp, Heart } from 'lucide-react';

interface FooterBlessingProps {
  onReopenEnvelope: () => void;
}

export const FooterBlessing: React.FC<FooterBlessingProps> = ({ onReopenEnvelope }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { groom, bride } = weddingData.couple;

  return (
    <footer className="relative rounded-3xl p-6 sm:p-12 bg-burgundy-950 text-gold-100 overflow-hidden text-center my-6 sm:my-8 border-2 border-gold-400/50 shadow-royal w-full max-w-3xl mx-auto">
      {/* Traditional Khmer Diamond Lattice & Watermark Background */}
      <KhmerCardBackground patternOpacity={0.14} watermarkOpacity={0.08} watermarkSize="w-64 sm:w-80 h-64 sm:h-80" />

      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-gold-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        {/* Monogram Crest with Kbach Phka Chan */}
        <div className="flex flex-col items-center mb-4">
          <KbachPhkaChan size={40} className="mb-3" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#8E1B32] via-[#5C1221] to-[#3D0914] border-2 border-gold-400 mx-auto flex items-center justify-center shadow-xl text-gold-300">
            <span className="font-moul text-lg tracking-wider text-gold-200">ស • វ</span>
            <div className="absolute inset-0 rounded-full border border-gold-400/30 animate-pulse pointer-events-none" />
          </div>
        </div>

        <h3 className="font-moul text-xl sm:text-2xl text-gold-bright mb-2">
          សូមអរព្រះគុណ និងអរគុណ
        </h3>

        <p className="text-xs sm:text-sm text-gold-200/90 font-kantumruy leading-relaxed mb-6 max-w-lg mx-auto">
          យើងខ្ញុំជាសាមីខ្លួន និងមាតាបិតាទាំងសងខាង សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តម និងពរជ័យដ៏ពិសិដ្ឋរបស់ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា ដែលបានផ្តល់កិត្តិយសអញ្ជើញចូលរួមក្នុងពិធីមង្គលការរបស់យើងខ្ញុំ។
        </p>

        <KhmerDivider className="my-6" />

        {/* Action Controls: Re-open envelope & Back to top */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={onReopenEnvelope}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900/90 border border-gold-400/60 text-gold-300 hover:text-white hover:bg-burgundy-800 text-xs font-kantumruy font-medium transition-all cursor-pointer shadow-md active:scale-95"
          >
            <Mail className="w-4 h-4 text-gold-400" />
            <span>មើលសំបុត្រឡើងវិញ (View Envelope)</span>
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900/90 border border-gold-400/60 text-gold-300 hover:text-white hover:bg-burgundy-800 text-xs font-kantumruy font-medium transition-all cursor-pointer shadow-md active:scale-95"
          >
            <ArrowUp className="w-4 h-4 text-gold-400" />
            <span>ត្រឡប់ទៅលើ (Back to Top)</span>
          </button>
        </div>

        <div className="text-[11px] text-gold-300/70 font-kantumruy space-y-1">
          <p className="flex items-center justify-center gap-1.5 text-xs text-gold-300 font-medium">
            <span>{groom.nameKhmer}</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>{bride.nameKhmer}</span>
          </p>
          <p className="font-mono text-[10px] text-gold-400/60 tracking-wider">
            © 2026 {groom.nameEn.toUpperCase()} & {bride.nameEn.toUpperCase()} • PHNOM PENH, CAMBODIA
          </p>
        </div>
      </div>
    </footer>
  );
};
export default FooterBlessing;
