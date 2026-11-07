import React, { useState } from 'react';
import { weddingData } from '../config/weddingConfig';
import { KhmerCorner, KhmerDivider, KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';
import { MapPin, Navigation, Phone, ExternalLink, Copy, Check, Car, ShieldCheck } from 'lucide-react';

export const VenueMap: React.FC = () => {
  const { event, couple } = weddingData;
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${event.venueNameKhmer}, ${event.venueAddressKhmer}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section className="relative my-6 sm:my-8 w-full max-w-3xl mx-auto">
      <div className="relative rounded-3xl bg-white/88 backdrop-blur-md border border-gold-400/60 p-4 sm:p-10 shadow-royal overflow-hidden">
        
        {/* Khmer Traditional Diamond Lattice & Watermark Background */}
        <KhmerCardBackground patternOpacity={0.16} watermarkOpacity={0.08} watermarkSize="w-72 sm:w-96 h-72 sm:h-96" />

        {/* Corner Motifs */}
        <KhmerCorner className="absolute khmer-corner-tl text-gold-500 opacity-70" size={36} />
        <KhmerCorner className="absolute khmer-corner-tr text-gold-500 opacity-70" size={36} />
        <KhmerCorner className="absolute khmer-corner-bl text-gold-500 opacity-70" size={36} />
        <KhmerCorner className="absolute khmer-corner-br text-gold-500 opacity-70" size={36} />

        {/* Title */}
        <div className="text-center relative z-10 mb-6 flex flex-col items-center">
          <KbachPhkaChan size={38} className="mb-2" />
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">
            Wedding Venue & Location
          </span>
          <h2 className="font-moul text-2xl sm:text-3xl text-burgundy-900 mt-1">
            ទីតាំងប្រារព្ធពិធីមង្គលការ
          </h2>
          <KhmerDivider className="my-4" />
        </div>

        {/* Venue Info Cards */}
        <div className="relative z-10 text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-burgundy-50 border border-burgundy-200 text-burgundy-800 mb-3 shadow-sm">
            <MapPin className="w-7 h-7 text-burgundy-700 animate-bounce" />
          </div>

          <h3 className="font-moul text-xl sm:text-2xl text-burgundy-900 mb-1">
            {event.venueNameKhmer}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 font-light italic mb-2">
            {event.venueNameEn}
          </p>
          <p className="text-xs sm:text-sm text-stone-700 font-kantumruy leading-relaxed px-4 max-w-md mx-auto">
            {event.venueAddressKhmer}
          </p>
        </div>

        {/* Action Buttons: Google Maps, Copy Address, & Phone */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-burgundy-950 font-bold font-kantumruy text-xs sm:text-sm shadow-md hover:shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>បើក Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <button
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-cream-50 border border-gold-400/60 text-burgundy-900 font-medium font-kantumruy text-xs sm:text-sm hover:bg-gold-50 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gold-600" />}
            <span>{copiedAddress ? 'បានចម្លងអាសយដ្ឋាន!' : 'ចម្លងអាសយដ្ឋាន'}</span>
          </button>

          <a
            href={`tel:${couple.groom.phone}`}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-cream-50 border border-gold-400/60 text-burgundy-900 font-medium font-kantumruy text-xs sm:text-sm hover:bg-gold-50 transition-all shadow-sm"
          >
            <Phone className="w-4 h-4 text-burgundy-700" />
            <span>{couple.groom.phone}</span>
          </a>
        </div>

        {/* Helpful Guest Transportation Badge */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8 text-xs font-kantumruy text-stone-600">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF6ED] border border-gold-300/50">
            <Car className="w-4 h-4 text-gold-600 flex-shrink-0" />
            <span>មានចំណតរថយន្ត និងម៉ូតូធំទូលាយ</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF6ED] border border-gold-300/50">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>សន្តិសុខយាមកាមសុវត្ថិភាព ២៤ ម៉ោង</span>
          </div>
        </div>

        {/* Embedded Interactive Map with Mobile Tap-to-Interact Protection */}
        <div 
          onClick={() => setIsMapActive(true)}
          onMouseLeave={() => setIsMapActive(false)}
          className="relative z-10 rounded-2xl overflow-hidden border-2 border-gold-400/60 shadow-lg aspect-[16/9] sm:aspect-[21/9] group"
        >
          <iframe
            title="Wedding Venue Location Map"
            src={event.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={`w-full h-full ${!isMapActive ? 'pointer-events-none' : 'pointer-events-auto'}`}
          />
          {!isMapActive && (
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-auto cursor-pointer group-hover:bg-black/10 transition-colors">
              <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-burgundy-950 text-xs font-kantumruy font-medium shadow-md border border-gold-400/60 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-gold-600" />
                <span>ចុចដើម្បីបញ្ជាផែនទី (Tap to interact)</span>
              </span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
export default VenueMap;
