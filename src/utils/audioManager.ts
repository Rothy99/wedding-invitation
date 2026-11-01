// Global Wedding Audio Controller for Reliable Autoplay Across Mobile & Desktop
type AudioSubscriber = (playing: boolean, isBlocked: boolean) => void;

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isBlocked: boolean = false;
  private listeners: Set<AudioSubscriber> = new Set();
  private shouldPlayOnUnlock: boolean = false;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
      this.setupGlobalInteractionListeners();
    }
  }

  private initAudio() {
    if (this.audio) return;
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
      this.initAudio();
      this.initAudioContext();

      // Resume AudioContext if suspended
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }

      // If playback was requested (e.g. by 5s automation or user open action)
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
    this.initAudio();
    this.initAudioContext();
    this.shouldPlayOnUnlock = true;

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }

    if (!this.audio) return Promise.resolve();

    return this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.isBlocked = false;
        this.notify();
      })
      .catch((err) => {
        // Browser Autoplay Policy blocked unmuted audio because user hasn't interacted with page yet
        console.warn('Autoplay blocked by browser policy, waiting for user touch:', err);
        this.isPlaying = false;
        this.isBlocked = true;
        this.notify();
      });
  }

  public pause(): void {
    this.shouldPlayOnUnlock = false;
    this.isBlocked = false;
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): void {
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
