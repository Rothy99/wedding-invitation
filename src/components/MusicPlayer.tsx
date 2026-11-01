import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingData } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioManager';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((playing, blocked) => {
      setIsPlaying(playing);
      setIsBlocked(blocked);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (autoPlayTrigger) {
      weddingAudio.play();
    }
  }, [autoPlayTrigger]);

  const handlePlay = () => {
    weddingAudio.play();
  };

  const togglePlay = () => {
    weddingAudio.toggle();
  };

  return (
    <>
      {/* Floating Bottom Music Controller */}
      <div className="fixed bottom-6 right-4 sm:bottom-6 sm:right-6 z-[60] flex items-center gap-2">
        {/* Music Pill & Sound Waves */}
        {isPlaying ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-burgundy-950/85 backdrop-blur-xl border border-gold-400/60 border-t-white/30 text-gold-200 text-xs shadow-[0_8px_25px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)] animate-fadeIn max-w-[200px] sm:max-w-xs">
            <Music className="w-3.5 h-3.5 text-gold-400 animate-bounce flex-shrink-0" />
            <span className="font-kantumruy font-medium text-[10px] sm:text-[11px] truncate max-w-[85px] sm:max-w-[150px]">
              {weddingData.music.title}
            </span>
            {/* Animated sound equalizer bars */}
            <div className="flex items-end gap-0.5 h-3.5 ml-1">
              <span className="w-0.5 bg-gold-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
              <span className="w-0.5 bg-gold-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-3.5" />
              <span className="w-0.5 bg-gold-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-1.5" />
              <span className="w-0.5 bg-gold-400 rounded-full animate-[pulse_1s_ease-in-out_infinite] h-3" />
            </div>
          </div>
        ) : (
          (autoPlayTrigger || isBlocked) && (
            <button
              onClick={handlePlay}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-500/90 hover:bg-gold-500 backdrop-blur-md text-burgundy-950 text-xs font-semibold shadow-lg border border-gold-300 animate-pulse transition-all cursor-pointer"
              title="ចុចដើម្បីបើកភ្លេង"
            >
              <Music className="w-3.5 h-3.5 text-burgundy-950" />
              <span className="font-kantumruy text-[11px]">ចុចស្តាប់បទចម្រៀង</span>
            </button>
          )
        )}

        {/* Floating Action Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'បិទភ្លេង' : 'បើកភ្លេង'}
          title={isPlaying ? 'បិទភ្លេង (Mute Music)' : 'បើកភ្លេង (Play Music)'}
          className={`relative p-3 rounded-full border shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ${
            isPlaying
              ? 'bg-burgundy-950/85 backdrop-blur-xl border-gold-400/80 border-t-white/40 text-gold-200 shadow-[0_8px_25px_rgba(0,0,0,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.35)] shadow-gold-500/20'
              : 'bg-white/85 backdrop-blur-xl border-gold-400/60 border-t-white/60 text-burgundy-900 shadow-md hover:border-gold-500'
          }`}
        >
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-gold-400 animate-ping opacity-30" />
          )}

          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-gold-400" />
          ) : (
            <VolumeX className="w-5 h-5 text-burgundy-900" />
          )}
        </button>
      </div>
    </>
  );
};
export default MusicPlayer;
