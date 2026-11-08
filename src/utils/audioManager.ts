// Global Wedding Audio Controller for Reliable Autoplay Across Mobile & Desktop
import { backgroundConfig } from '../config/backgroundConfig';

type AudioSubscriber = (playing: boolean, isBlocked: boolean) => void;

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private videoEl: HTMLVideoElement | null = null;
  private isPlaying: boolean = false;
  private isBlocked: boolean = false;
  private listeners: Set<AudioSubscriber> = new Set();
  private shouldPlayOnUnlock: boolean = false;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      if (!this.isVideoAudioMode()) {
        this.initAudio();
      }
      this.setupGlobalInteractionListeners();
    }
  }

  /** Check if background video is active and should provide audio instead of mp3 */
  public isVideoAudioMode(): boolean {
    return backgroundConfig.type === 'video' && backgroundConfig.video.hasAudio;
  }

  /** Attach the background video element to synchronize volume and playback states */
  public attachVideo(video: HTMLVideoElement | null) {
    this.videoEl = video;
    if (this.isVideoAudioMode() && this.videoEl) {
      this.videoEl.addEventListener('play', () => {
        this.isPlaying = !this.videoEl?.muted && !this.videoEl?.paused;
        this.notify();
      });

      this.videoEl.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.videoEl.addEventListener('volumechange', () => {
        this.isPlaying = !this.videoEl?.muted && !this.videoEl?.paused;
        this.notify();
      });
    }
  }

  private initAudio() {
    if (this.audio || this.isVideoAudioMode()) return;
    try {
      this.audio = new Audio('/wedding_music.mp3');
      this.audio.loop = true;
      this.audio.preload = 'auto';
      // Required for mobile Safari & iOS WebKit
      (this.audio as any).playsInline = true;
      this.audio.volume = 0.9;
      this.audio.load();

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.isBlocked = false;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });
    } catch (e) {
      console.warn('Audio initialization warning:', e);
    }
  }

  private initAudioContext() {
    if (this.audioCtx) return;
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    } catch (e) {
      // AudioContext not supported or restricted
    }
  }

  private setupGlobalInteractionListeners() {
    const handleGesture = () => {
      this.initAudioContext();

      // Resume AudioContext if suspended
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }

      // If in video audio mode and playback was requested
      if (this.isVideoAudioMode() && this.shouldPlayOnUnlock && this.videoEl) {
        this.videoEl.muted = false;
        this.videoEl.volume = backgroundConfig.video.volume;
        this.videoEl
          .play()
          .then(() => {
            this.isPlaying = true;
            this.isBlocked = false;
            this.notify();
          })
          .catch(() => {});
        return;
      }

      // Normal MP3 mode
      if (!this.isVideoAudioMode()) {
        this.initAudio();
        if (this.shouldPlayOnUnlock && !this.isPlaying && this.audio) {
          this.audio
            .play()
            .then(() => {
              this.isPlaying = true;
              this.isBlocked = false;
              this.notify();
            })
            .catch((err) => {
              console.warn('Playback gesture retry error:', err);
            });
        }
      }
    };

    // Attach to all user gesture events across desktop and mobile devices
    const events = [
      'touchstart',
      'touchend',
      'pointerdown',
      'pointerup',
      'mousedown',
      'click',
      'keydown',
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { passive: true, capture: true });
    });
  }

  public play(): Promise<void> {
    this.shouldPlayOnUnlock = true;
    this.initAudioContext();

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }

    // Video Mode: Unmute and play the video audio, skip MP3 completely!
    if (this.isVideoAudioMode()) {
      if (this.videoEl) {
        this.videoEl.muted = false;
        this.videoEl.volume = backgroundConfig.video.volume;
        return this.videoEl
          .play()
          .then(() => {
            this.isPlaying = true;
            this.isBlocked = false;
            this.notify();
          })
          .catch((err) => {
            console.warn('Video audio autoplay waiting for user gesture:', err);
            this.isPlaying = false;
            this.isBlocked = true;
            this.notify();
          });
      }
      return Promise.resolve();
    }

    // Image Mode: Play normal wedding MP3 audio
    this.initAudio();
    if (!this.audio) return Promise.resolve();

    return this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.isBlocked = false;
        this.notify();
      })
      .catch((err) => {
        console.warn('Autoplay blocked by browser policy, waiting for user touch:', err);
        this.isPlaying = false;
        this.isBlocked = true;
        this.notify();
      });
  }

  public pause(): void {
    this.shouldPlayOnUnlock = false;
    this.isBlocked = false;

    // Video Mode: Mute video audio
    if (this.isVideoAudioMode()) {
      if (this.videoEl) {
        this.videoEl.muted = true;
      }
      this.isPlaying = false;
      this.notify();
      return;
    }

    // MP3 Mode: Pause audio
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): void {
    // Video Mode: Toggle mute / unmute
    if (this.isVideoAudioMode()) {
      if (this.videoEl) {
        if (this.videoEl.muted || this.videoEl.paused) {
          this.play();
        } else {
          this.pause();
        }
      }
      return;
    }

    // MP3 Mode: Toggle play / pause
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsBlocked(): boolean {
    return this.isBlocked;
  }

  public subscribe(cb: AudioSubscriber): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying, this.isBlocked);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.isBlocked));
  }
}

export const weddingAudio = new WeddingAudioManager();
