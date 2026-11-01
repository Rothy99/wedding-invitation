import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { KhmerCorner, KhmerDivider, KbachPhkaChan, KhmerCardBackground } from './KhmerMotif';
import { Heart, Send, MessageCircleHeart } from 'lucide-react';

interface Wish {
  id: string;
  author: string;
  message: string;
  tag: string;
  likes: number;
  timeAgo: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: '1',
    author: 'លោកពូ សុខារ៉ា និងភរិយា',
    message: 'សូមប្រសិទ្ធពរជ័យ ឱ្យក្មួយទាំងពីរស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង កាន់ដៃគ្នាកសាងអនាគតដ៏រុងរឿង និងពោរពេញដោយសុភមង្គល!',
    tag: '💖 ស្រឡាញ់គ្នារហូត',
    likes: 24,
    timeAgo: '២ ម៉ោងមុន',
  },
  {
    id: '2',
    author: 'មិត្តភក្តិវិទ្យាល័យ (Class of 2018)',
    message: 'អបអរសាទរមិត្តសម្លាញ់! គូស្នេហ៍ដ៏ស័ក្តិសមបំផុត ជូនពរឱ្យមានសុខភាពល្អ រកទទួលទានមានបាន ឆាប់បានកូនប្រុសស្រីពេញផ្ទះ!',
    tag: '🎉 អបអរសាទរ',
    likes: 18,
    timeAgo: '៥ ម៉ោងមុន',
  },
  {
    id: '3',
    author: 'ចែ ស្រីម៉ៅ',
    message: 'ជយោហោតុ ភវន្តុ មង្គលា! ជូនពរឱ្យជីវិតអាពាហ៍ពិពាហ៍ត្រជាក់ត្រជុំដូចទឹកអង្គែអណ្តែត ជួបតែលាភសំណាង និងសិរីសួស្តីជានិច្ច!',
    tag: '🌸 សិរីសួស្តី',
    likes: 15,
    timeAgo: '១ ថ្ងៃមុន',
  },
];

const BLESSING_TAGS = [
  '💖 ស្រឡាញ់គ្នារហូត',
  '🌸 សិរីសួស្តី',
  '🥂 សុភមង្គល',
  '🎉 អបអរសាទរ',
  '💍 គូព្រេងពិត',
];

export const WishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState(BLESSING_TAGS[0]);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedWishes = localStorage.getItem('khmer_wedding_wishes');
    if (savedWishes) {
      try {
        setWishes(JSON.parse(savedWishes));
      } catch (e) {
        setWishes(INITIAL_WISHES);
      }
    } else {
      setWishes(INITIAL_WISHES);
    }
  }, []);

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      author: name.trim(),
      message: message.trim(),
      tag: selectedTag,
      likes: 1,
      timeAgo: 'ទើបតែផ្ញើ',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('khmer_wedding_wishes', JSON.stringify(updated));

    // Reset inputs
    setMessage('');

    // Confetti celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#8E1B32', '#F5DE96'],
    });
  };

  const handleToggleLike = (id: string) => {
    const isLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isLiked }));

    const updated = wishes.map((w) => {
      if (w.id === id) {
        return { ...w, likes: isLiked ? w.likes - 1 : w.likes + 1 };
      }
      return w;
    });

    setWishes(updated);
    localStorage.setItem('khmer_wedding_wishes', JSON.stringify(updated));
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
            <MessageCircleHeart className="w-3.5 h-3.5" />
            <span>Guestbook & Blessings</span>
          </span>
          <h2 className="font-moul text-2xl sm:text-3xl text-burgundy-900 mt-1">
            ពាក្យជូនពរសិរីមង្គល
          </h2>
          <KhmerDivider className="my-4" />
          <p className="text-xs sm:text-sm text-stone-600 font-kantumruy">
            សូមផ្ញើពាក្យជូនពរ និងក្តីស្រឡាញ់របស់អ្នកជូនដល់គូស្វាមីភរិយាថ្មី
          </p>
        </div>

        {/* Write a Wish Form */}
        <form onSubmit={handlePostWish} className="relative z-10 max-w-xl mx-auto mb-10 space-y-4">
          <div className="flex flex-wrap gap-2 justify-center mb-2">
            {BLESSING_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-full font-kantumruy transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-burgundy-900 text-gold-200 border border-gold-400 shadow-sm'
                    : 'bg-cream-50 text-stone-600 hover:bg-gold-50 border border-stone-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ឈ្មោះរបស់អ្នក (Your Name)"
              className="w-full px-4 py-2.5 rounded-xl border border-gold-300/70 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 bg-cream-50/50 text-stone-800 placeholder-stone-400 text-sm font-kantumruy outline-none"
            />
          </div>

          <div>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="សរសេរពាក្យជូនពរនៅទីនេះ..."
              className="w-full px-4 py-2.5 rounded-xl border border-gold-300/70 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 bg-cream-50/50 text-stone-800 placeholder-stone-400 text-sm font-kantumruy outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-5 rounded-xl bg-gold-gradient text-burgundy-950 font-bold font-kantumruy text-sm shadow-md hover:shadow-gold-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>ផ្ញើពាក្យជូនពរ (Send Blessing)</span>
          </button>
        </form>

        {/* Wishes List with Smooth Mobile Momentum Scrolling */}
        <div className="relative z-10 max-w-xl mx-auto space-y-4 max-h-[460px] overflow-y-auto pr-1 momentum-scroll">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-cream-50/80 border border-gold-200/80 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-burgundy-900 text-gold-300 flex items-center justify-center font-moul text-xs shadow-sm">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-burgundy-900 font-kantumruy">
                      {item.author}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-kantumruy">
                      {item.timeAgo}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-800 font-kantumruy font-medium border border-gold-300/40">
                  {item.tag}
                </span>
              </div>

              <p className="text-stone-700 text-xs sm:text-sm font-kantumruy leading-relaxed mb-3">
                "{item.message}"
              </p>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleToggleLike(item.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                    likedMap[item.id]
                      ? 'bg-rose-50 text-rose-600 font-semibold'
                      : 'text-stone-400 hover:text-rose-500'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${likedMap[item.id] ? 'fill-rose-500 text-rose-500' : ''}`}
                  />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
