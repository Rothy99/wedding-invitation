/**
 * =====================================================================
 * HOME SCREEN BACKGROUND CONFIGURATION (ការកំណត់ផ្ទៃខាងក្រោយទំព័រដើម)
 * =====================================================================
 * 
 * You can easily switch between an IMAGE or a VIDEO background for the home screen.
 * (បងអាចប្តូររវាង រូបភាព (Image) ឬ វីដេអូ (Video) សម្រាប់ផ្ទៃខាងក្រោយបានយ៉ាងងាយស្រួល)
 * 
 * Note: If 'video' is selected and 'hasAudio' is true, the MP3 wedding music
 * will automatically be DISABLED so that the video's music plays cleanly without conflict.
 * (ចំណាំ៖ ប្រសិនបើជ្រើសរើស 'video' ហើយ 'hasAudio' ស្មើ true នោះប្រព័ន្ធនឹងបិទភ្លេង MP3
 * ដោយស្វ័យប្រវត្តិ ដើម្បីកុំឱ្យជាន់សំឡេងគ្នាជាមួយវីដេអូ)
 */

export interface BackgroundConfig {
  /**
   * Background type: 'image' | 'video'
   * (ជ្រើសរើសប្រភេទផ្ទៃខាងក្រោយ៖ 'image' ឬ 'video')
   */
  type: 'image' | 'video';

  /**
   * Settings when type === 'image'
   * (ការកំណត់សម្រាប់រូបភាព)
   */
  image: {
    /** Path to image in public folder or external URL (e.g. '/couple_angkor.jpg') */
    url: string;
    /** Image alternative description */
    alt: string;
  };

  /**
   * Settings when type === 'video'
   * (ការកំណត់សម្រាប់វីដេអូ)
   */
  video: {
    /**
     * Path to MP4/WebM video in public folder or external URL
     * (ឧទាហរណ៍៖ ដាក់វីដេអូក្នុង folder public/wedding_video.mp4 រួចដាក់ '/wedding_video.mp4')
     */
    url: string;
    /**
     * Fallback poster image shown while video is loading
     * (រូបភាពបង្ហាញបណ្តោះអាសន្នពេលវីដេអូកំពុង load)
     */
    poster: string;
    /**
     * Set to true if the video has its own music/audio.
     * When true, wedding_music.mp3 will NOT play!
     * (ដាក់ true បើវីដេអូមានភ្លេងស្រាប់ -> វានឹងបិទភ្លេង MP3 ដោយស្វ័យប្រវត្តិ)
     */
    hasAudio: boolean;
    /** Loop video continuously (ចាក់សារឡើងវិញរហូត) */
    loop: boolean;
    /** Default volume from 0.0 (mute) to 1.0 (max) */
    volume: number;
    /** Playback rate (1.0 = normal speed) */
    playbackRate: number;
  };

  /**
   * Ambient Overlays & Silk Styling (ការកំណត់ស្រទាប់ពណ៌ពីលើដើម្បីឱ្យអក្សរច្បាស់)
   */
  overlay: {
    /** Tint opacity (0.0 to 1.0) - default 0.72 */
    tintOpacity: number;
    /** Backdrop blur in pixels (0 for sharp, 1-2 for soft depth) */
    blurPx: number;
    /** Show traditional Khmer silk brocade texture (បង្ហាញក្បាច់សូត្រខ្មែរ) */
    showSilkPattern: boolean;
    /** Show ambient top & bottom depth vignette */
    showVignette: boolean;
  };
}

export const backgroundConfig: BackgroundConfig = {
  // ===================================================================
  // 1. CHOOSE BACKGROUND TYPE (ជ្រើសរើសប្រភេទ Background)
  // Options: 'image' | 'video'
  // ===================================================================
  type: 'video',

  // ===================================================================
  // 2. IMAGE CONFIGURATION (បើជ្រើសរើស Image)
  // ===================================================================
  image: {
    url: '/couple_angkor.jpg',
    alt: 'Angkor Wat Pre-Wedding Background',
  },

  // ===================================================================
  // 3. VIDEO CONFIGURATION (បើជ្រើសរើស Video)
  // ===================================================================
  video: {
    // Web-optimized MP4 wedding video with built-in music
    url: '/wedding_video.mp4',
    poster: '/wedding_video_poster.jpg',
    // Video has its own music/audio -> MP3 music is automatically disabled!
    hasAudio: true,
    loop: true,
    volume: 0.9,
    playbackRate: 1.0,
  },

  // ===================================================================
  // 4. OVERLAY STYLING (កម្រិតពន្លឺ និងក្បាច់)
  // ===================================================================
  overlay: {
    tintOpacity: 0.60, // Elegant translucent tint allowing video to play gorgeously
    blurPx: 0, // Crisp cinematic video view
    showSilkPattern: true, // Authentic Khmer silk watermark
    showVignette: true, // Smooth top & bottom vignette
  },
};

export default backgroundConfig;
