import React, { useState } from 'react';
import { weddingData } from '../config/weddingConfig';
import { KhmerCorner, KhmerDivider, KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery } = weddingData;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % gallery.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + gallery.length) % gallery.length);
    }
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || selectedPhotoIndex === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      // Swiped left -> Next photo
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % gallery.length);
    } else if (diff < -45) {
      // Swiped right -> Prev photo
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + gallery.length) % gallery.length);
    }
    setTouchStart(null);
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
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold flex items-center justify-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Memories & Moments</span>
          </span>
          <h2 className="font-moul text-2xl sm:text-3xl text-burgundy-900 mt-1">
            កម្រងរូបភាពអនុស្សាវរីយ៍
          </h2>
          <KhmerDivider className="my-4" />
        </div>

        {/* Photos Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {gallery.map((photo, index) => {
            return (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gold-400/50 shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-stone-900"
              >
                <img
                  src={photo.url}
                  alt={photo.captionKhmer}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Subtle Angkor Wat Badge on 1st Photo */}
                {index === 0 && (
                  <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-full bg-burgundy-950/95 border border-gold-400/60 text-gold-300 text-[10px] font-kantumruy flex items-center gap-1 shadow-md">
                    <Sparkles className="w-2.5 h-2.5 text-gold-400" />
                    <span>Angkor Wat</span>
                  </div>
                )}

                {/* Hover overlay with zoom icon & Khmer caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/85 via-burgundy-950/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-center">
                  <div className="w-8 h-8 rounded-full bg-gold-500/90 text-burgundy-950 flex items-center justify-center mx-auto mb-2 shadow-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <p className="text-gold-200 text-xs font-kantumruy font-medium line-clamp-1 drop-shadow">
                    {photo.captionKhmer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal with Mobile Touch Swipe Navigation */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn select-none"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Close photo preview"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={prevPhoto}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-all cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextPhoto}
            aria-label="Next photo"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-all cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo Frame Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full max-h-[85vh] flex flex-col items-center"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-400 shadow-2xl bg-stone-900">
              <img
                src={gallery[selectedPhotoIndex].url}
                alt={gallery[selectedPhotoIndex].captionKhmer}
                className="w-full max-h-[68vh] object-contain rounded-2xl"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center px-4">
              <p className="font-moul text-gold-300 text-base sm:text-lg">
                {gallery[selectedPhotoIndex].captionKhmer}
              </p>
              <p className="text-xs text-white/70 font-light italic mt-0.5">
                {gallery[selectedPhotoIndex].captionEn}
              </p>
              <span className="text-[11px] text-gold-400/90 font-mono mt-1.5 inline-block px-2.5 py-0.5 rounded-full bg-white/10 border border-gold-400/30">
                {selectedPhotoIndex + 1} / {gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default GallerySection;
