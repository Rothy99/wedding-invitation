import React, { useState } from 'react';
import { weddingData } from '../config/weddingConfig';
import { KhmerCorner, KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';
import { Gift, Copy, Check, QrCode, X, Sparkles } from 'lucide-react';

export const KhqrGiftModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<'usd' | 'khr' | null>(null);

  const { khqr } = weddingData;

  const handleCopy = (text: string, type: 'usd' | 'khr') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section className="relative my-6 sm:my-8 w-full max-w-3xl mx-auto">
      {/* Gift Card Banner */}
      <div className="relative rounded-3xl bg-burgundy-gradient text-gold-100 p-6 sm:p-10 shadow-royal border border-gold-400/50 overflow-hidden text-center">
        
        {/* Khmer Traditional Diamond Lattice & Watermark Background */}
        <KhmerCardBackground patternOpacity={0.18} watermarkOpacity={0.10} watermarkSize="w-64 sm:w-80 h-64 sm:h-80" />

        {/* Corner Motifs */}
        <KhmerCorner className="absolute khmer-corner-tl text-gold-400/70" size={36} />
        <KhmerCorner className="absolute khmer-corner-tr text-gold-400/70" size={36} />
        <KhmerCorner className="absolute khmer-corner-bl text-gold-400/70" size={36} />
        <KhmerCorner className="absolute khmer-corner-br text-gold-400/70" size={36} />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <KbachPhkaChan size={40} className="mb-2" />
          <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-400/40 text-gold-300 flex items-center justify-center mx-auto mb-3">
            <Gift className="w-7 h-7 text-gold-400 animate-bounce" />
          </div>

          <h3 className="font-moul text-xl sm:text-2xl text-gold-bright mb-2">
            ចំណងដៃសិរីមង្គល
          </h3>
          <p className="text-xs sm:text-sm text-gold-200/90 font-kantumruy mb-6 leading-relaxed">
            វត្តមានរបស់លោកអ្នក គឺជាកាដូដ៏មានតម្លៃបំផុតសម្រាប់យើងខ្ញុំ។ ប្រសិនបើលោកអ្នកមានបំណងចងដៃ ឬផ្ញើពរជ័យតាមរយៈ KHQR លោកអ្នកអាចស្កេនតាមរយៈ QR Code ខាងក្រោម។
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-burgundy-950 font-bold font-kantumruy text-xs sm:text-sm shadow-lg hover:shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <QrCode className="w-5 h-5" />
            <span>ស្កេន KHQR ចងដៃ (Scan KHQR)</span>
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl bg-white shadow-2xl border-2 border-gold-400/80 overflow-hidden text-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close KHQR modal"
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Red Bakong/KHQR Header Bar */}
            <div className="bg-[#E21A22] text-white pt-6 pb-4 px-6 relative">
              <span className="font-bold text-lg tracking-widest uppercase">KHQR</span>
              <p className="text-xs text-white/90 font-kantumruy mt-0.5">
                ចំណងដៃសិរីមង្គលអាពាហ៍ពិពាហ៍
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-6 bg-cream-50 flex flex-col items-center">
              <div className="p-3 bg-white rounded-2xl border border-gold-300 shadow-md mb-4 relative">
                <img
                  src={khqr.qrImage}
                  alt="KHQR Wedding Gift Code"
                  className="w-48 h-48 object-contain"
                />
                <div className="absolute inset-0 border-2 border-dashed border-gold-400/40 rounded-2xl pointer-events-none m-1" />
              </div>

              {/* Account Details */}
              <h4 className="font-bold text-sm text-burgundy-950 font-kantumruy uppercase tracking-wide">
                {khqr.accountName}
              </h4>
              <p className="text-xs text-stone-500 font-kantumruy mb-4">
                {khqr.bankName}
              </p>

              {/* Copy Account Numbers */}
              <div className="w-full space-y-2 text-left">
                {/* USD Account */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 shadow-sm text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 font-mono block">USD ACCOUNT</span>
                    <span className="font-mono font-bold text-stone-800">{khqr.accountNumberUsd}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(khqr.accountNumberUsd, 'usd')}
                    className="p-1.5 rounded-lg bg-gold-50 text-gold-700 hover:bg-gold-100 transition-colors flex items-center gap-1 cursor-pointer font-kantumruy"
                  >
                    {copiedType === 'usd' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'usd' ? 'បានចម្លង!' : 'ចម្លង'}</span>
                  </button>
                </div>

                {/* KHR Account */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 shadow-sm text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 font-mono block">KHR ACCOUNT</span>
                    <span className="font-mono font-bold text-stone-800">{khqr.accountNumberKhr}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(khqr.accountNumberKhr, 'khr')}
                    className="p-1.5 rounded-lg bg-gold-50 text-gold-700 hover:bg-gold-100 transition-colors flex items-center gap-1 cursor-pointer font-kantumruy"
                  >
                    {copiedType === 'khr' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'khr' ? 'បានចម្លង!' : 'ចម្លង'}</span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 font-kantumruy mt-4 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold-500" />
                <span>សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះក្តីស្រឡាញ់</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
