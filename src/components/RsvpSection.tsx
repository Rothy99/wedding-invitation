import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { weddingData } from '../config/weddingConfig';
import { KhmerCorner, KhmerDivider, KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';
import { CheckCircle2, Send, Users, HeartHandshake, MessageSquare } from 'lucide-react';

interface RsvpData {
  guestName: string;
  phone: string;
  attending: 'yes' | 'no';
  guestCount: number;
  message: string;
  submittedAt?: string;
}

export const RsvpSection: React.FC = () => {
  const [formData, setFormData] = useState<RsvpData>({
    guestName: '',
    phone: '',
    attending: 'yes',
    guestCount: 1,
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check if RSVP is already saved in local storage
  useEffect(() => {
    const saved = localStorage.getItem('khmer_wedding_rsvp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        setIsSubmitted(true);
      } catch (e) {
        console.warn('Failed to parse saved RSVP', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim()) return;

    const dataToSave = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem('khmer_wedding_rsvp', JSON.stringify(dataToSave));
    setIsSubmitted(true);

    // Celebratory confetti explosion
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#731A2D', '#F5DE96', '#22C55E'],
    });
  };

  // Pre-filled Telegram notification URL
  const getTelegramShareUrl = () => {
    const statusText = formData.attending === 'yes' ? 'នឹងចូលរួមដោយរីករាយ' : 'មិនអាចចូលរួមបាន';
    const text = encodeURIComponent(
      `សួស្តី! ខ្ញុំបាទ/នាងខ្ញុំ ${formData.guestName} សូមឆ្លើយតបវត្តមានមង្គលការ:\n` +
      `- ស្ថានភាព: ${statusText}\n` +
      `- ចំនួនភ្ញៀវ: ${formData.guestCount} នាក់\n` +
      (formData.phone ? `- លេខទូរស័ព្ទ: ${formData.phone}\n` : '') +
      (formData.message ? `- ពាក្យជូនពរ: "${formData.message}"` : '')
    );
    return `https://t.me/${weddingData.couple.groom.telegram}?text=${text}`;
  };

  return (
    <section className="relative my-6 sm:my-8 w-full max-w-3xl mx-auto">
      <div className="relative rounded-3xl bg-white/95 backdrop-blur-sm border border-gold-400/50 p-4 sm:p-10 shadow-royal overflow-hidden">
        
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
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>RSVP & Attendance</span>
          </span>
          <h2 className="font-moul text-2xl sm:text-3xl text-burgundy-900 mt-1">
            ការឆ្លើយតបវត្តមាន
          </h2>
          <KhmerDivider className="my-4" />
          <p className="text-xs sm:text-sm text-stone-600 font-kantumruy max-w-lg mx-auto">
            វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នក គឺជាកិត្តិយសដ៏ថ្លៃថ្លាបំផុតសម្រាប់គ្រួសាររបស់យើងខ្ញុំ
          </p>
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-xl mx-auto">
          {isSubmitted ? (
            /* Success State */
            <div className="rounded-2xl bg-cream-50 border border-gold-300 p-6 sm:p-8 text-center shadow-inner">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-moul text-xl text-burgundy-900 mb-2">
                សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ!
              </h3>
              <p className="text-sm text-stone-700 font-kantumruy mb-4 leading-relaxed">
                យើងខ្ញុំបានទទួលការឆ្លើយតបរបស់ <strong>{formData.guestName}</strong> រួចរាល់ហើយ។
                {formData.attending === 'yes' ? ' រីករាយណាស់ដែលបានទទួលស្វាគមន៍វត្តមានរបស់លោកអ្នក!' : ' សូមអរគុណសម្រាប់ពាក្យជូនពរ!'}
              </p>

              {/* Action Buttons: Telegram notification & Edit */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <a
                  href={getTelegramShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold font-kantumruy text-xs sm:text-sm shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>ផ្ញើការឆ្លើយតបតាម Telegram</span>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 font-kantumruy text-xs transition-colors cursor-pointer"
                >
                  កែប្រែព័ត៌មាន (Edit)
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Guest Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-stone-700 font-kantumruy mb-1.5">
                  គោត្តនាម និងនាម (Guest Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="ឧ. ឯកឧត្តម... / លោក... / កញ្ញា..."
                  className="w-full px-4 py-3 rounded-xl border border-gold-300/70 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 bg-cream-50/50 text-stone-800 placeholder-stone-400 text-sm font-kantumruy outline-none transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-stone-700 font-kantumruy mb-1.5">
                  លេខទូរស័ព្ទ (Phone Number)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="012 xxx xxx"
                  className="w-full px-4 py-3 rounded-xl border border-gold-300/70 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 bg-cream-50/50 text-stone-800 placeholder-stone-400 text-sm font-kantumruy outline-none transition-all"
                />
              </div>

              {/* Attendance Radio Options */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-stone-700 font-kantumruy mb-2">
                  វត្តមានរបស់អ្នក (Will you attend?) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.attending === 'yes'
                        ? 'border-burgundy-800 bg-burgundy-50 text-burgundy-950 font-bold'
                        : 'border-stone-200 bg-cream-50 text-stone-600 hover:border-gold-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={() => setFormData({ ...formData, attending: 'yes' })}
                      className="hidden"
                    />
                    <span className="text-xs sm:text-sm font-kantumruy">នឹងចូលរួមដោយរីករាយ</span>
                  </label>

                  <label
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.attending === 'no'
                        ? 'border-stone-600 bg-stone-100 text-stone-800 font-bold'
                        : 'border-stone-200 bg-cream-50 text-stone-600 hover:border-gold-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={() => setFormData({ ...formData, attending: 'no' })}
                      className="hidden"
                    />
                    <span className="text-xs sm:text-sm font-kantumruy">សោកស្តាយ មិនអាចចូលរួម</span>
                  </label>
                </div>
              </div>

              {/* Guest Count (if attending) */}
              {formData.attending === 'yes' && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-stone-700 font-kantumruy mb-1.5 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold-600" />
                    <span>ចំនួនភ្ញៀវចូលរួម (Number of Guests)</span>
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setFormData({ ...formData, guestCount: count })}
                        className={`flex-1 py-2.5 rounded-xl border text-sm font-kantumruy font-medium transition-all ${
                          formData.guestCount === count
                            ? 'bg-gold-500 border-gold-600 text-burgundy-950 font-bold shadow-sm'
                            : 'bg-cream-50 border-stone-200 text-stone-700 hover:border-gold-300'
                        }`}
                      >
                        {count} {count >= 4 ? '+ នាក់' : 'នាក់'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message / Wishes */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-stone-700 font-kantumruy mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-gold-600" />
                  <span>ពាក្យជូនពរ ឬកំណត់ចំណាំ (Wishes or Notes)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="សរសេរពាក្យជូនពរដល់គូស្វាមីភរិយាថ្មី..."
                  className="w-full px-4 py-3 rounded-xl border border-gold-300/70 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 bg-cream-50/50 text-stone-800 placeholder-stone-400 text-sm font-kantumruy outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gold-gradient text-burgundy-950 font-bold font-kantumruy text-sm sm:text-base shadow-lg hover:shadow-gold-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>បញ្ជាក់ការឆ្លើយតប (Submit RSVP)</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
