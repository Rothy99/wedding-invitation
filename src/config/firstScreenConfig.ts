import { backgroundConfig } from './backgroundConfig';

/**
 * =====================================================================
 * FIRST SCREEN / ENVELOPE COVER CONFIGURATION
 * (ការកំណត់ផ្ទាំងអេក្រង់ដំបូង / ផ្ទាំងស្រោមសំបុត្របើកទ្វារ)
 * =====================================================================
 * 
 * This config controls the first screen (the opening royal doors):
 * - Duration: Countdown timer before automatic opening (set to 10 seconds).
 * - Media type: 'match_background' (follows video background), 'video', or 'image'.
 * - Audio: Ensures the video plays with its music / sound!
 */

export interface FirstScreenConfig {
  /**
   * Media type for the first screen:
   * - 'match_background': Follows backgroundConfig.type (if video, first screen uses video; if image, uses image)
   * - 'video': Always use video
   * - 'image': Always use static image
   */
  type: 'match_background' | 'video' | 'image';

  /**
   * Duration configuration
   * (ការកំណត់រយៈពេលនៃផ្ទាំងអេក្រង់ដំបូង)
   */
  duration: {
    /**
     * Countdown duration in seconds before automatically opening the invitation (default: 10s)
     * (រយៈពេលរាប់ថយក្រោយស្វ័យប្រវត្តិតាមវិនាទី មុនពេលបើកសំបុត្រ - កំណត់ ១០ វិនាទី)
     */
    countdownSeconds: number;
    /**
     * Duration in milliseconds for the door opening sliding animation (default: 3400ms)
     * (រយៈពេលរំកិលរបើកទ្វារសងខាងគិតជាមីលីវិនាទី)
     */
    doorOpenDurationMs: number;
    /**
     * Whether auto-open countdown is enabled
     * (បើក/បិទ ការរាប់ថយក្រោយស្វ័យប្រវត្តិ)
     */
    autoOpenEnabled: boolean;
  };

  /**
   * Audio & music playback options for first screen
   * (ការកំណត់សំឡេង និងតន្ត្រីសម្រាប់ផ្ទាំងដំបូង)
   */
  audio: {
    /**
     * Play music/audio when video plays on first screen
     * (ចាក់ភ្លេង/សំឡេងនៅពេលវីដេអូចាក់)
     */
    playMusic: boolean;
    /** Audio volume (0.0 to 1.0, default: 1.0) */
    volume: number;
    /** Attempt unmuted autoplay immediately on page load */
    autoPlayWithSound: boolean;
  };

  /**
   * Video settings for first screen
   */
  video: {
    /** Path to video in public folder or external URL */
    url: string;
    /** Fallback poster image */
    poster: string;
    /** CSS object-position (e.g. 'center 25%') */
    objectPosition: string;
    /** Whether this video has its own audio stream */
    hasAudio: boolean;
    /** Default volume level */
    volume: number;
  };

  /**
   * Static image settings for first screen
   */
  image: {
    /** Path to image in public folder or external URL */
    url: string;
    /** Image alternative description */
    alt: string;
    /** CSS object-position (e.g. 'center 25%') */
    objectPosition: string;
  };

  /**
   * Animation & door opening options
   */
  animation: {
    /** Door glide duration in milliseconds (default: 3400ms) */
    doorOpenDurationMs: number;
    /** Auto open countdown in seconds (0 to disable) */
    autoOpenCountdownSeconds: number;
    /** Show bursting golden light beam on opening */
    showLightBeam: boolean;
    /** Show central wax seal monogram */
    showMonogramSeal: boolean;
  };

  /**
   * Branding text customization
   */
  branding: {
    badgeText: string;
    sealMonogram: string;
    dateTextKhmer: string;
    locationTextKhmer: string;
    openButtonTextKhmer: string;
    openButtonSubtextKhmer: string;
  };
}

export const firstScreenConfig: FirstScreenConfig = {
  // 'match_background' follows the backgroundConfig video background automatically
  type: 'match_background',

  // Configurable countdown duration (changed to 10s as requested)
  duration: {
    countdownSeconds: 10,
    doorOpenDurationMs: 3400,
    autoOpenEnabled: true,
  },

  // Audio options ensuring the video plays with its music!
  audio: {
    playMusic: true,
    volume: 1.0,
    autoPlayWithSound: true,
  },

  video: {
    url: '/wedding_video.mp4',
    poster: '/wedding_video_poster.jpg',
    objectPosition: 'center 25%',
    hasAudio: true,
    volume: 1.0,
  },

  image: {
    url: '/couple_angkor.jpg',
    alt: 'សិរីសួស្តី អាពាហ៍ពិពាហ៍ សុទ្ធា & សុខវត្ដី',
    objectPosition: 'center 25%',
  },

  animation: {
    doorOpenDurationMs: 3400,
    autoOpenCountdownSeconds: 10, // synchronized to 10 seconds
    showLightBeam: true,
    showMonogramSeal: true,
  },

  branding: {
    badgeText: 'SAVE THE DATE',
    sealMonogram: 'ស • វ',
    dateTextKhmer: '១៨ · ធ្នូ · ២០២៦',
    locationTextKhmer: 'សាលចំការដូង',
    openButtonTextKhmer: 'បើកសំបុត្រអាពាហ៍ពិពាហ៍',
    openButtonSubtextKhmer: 'ចុចដើម្បីបើក & ស្តាប់ភ្លេងពិរោះៗ',
  },
};

/**
 * Resolved active media helper
 */
export function getFirstScreenMedia(): {
  type: 'video' | 'image';
  url: string;
  poster?: string;
  alt?: string;
  objectPosition: string;
  hasAudio: boolean;
} {
  if (firstScreenConfig.type === 'match_background') {
    if (backgroundConfig.type === 'video') {
      return {
        type: 'video',
        url: firstScreenConfig.video.url || backgroundConfig.video.url,
        poster: firstScreenConfig.video.poster || backgroundConfig.video.poster,
        objectPosition: firstScreenConfig.video.objectPosition,
        hasAudio: firstScreenConfig.video.hasAudio ?? backgroundConfig.video.hasAudio,
      };
    } else {
      return {
        type: 'image',
        url: firstScreenConfig.image.url || backgroundConfig.image.url,
        alt: firstScreenConfig.image.alt || backgroundConfig.image.alt,
        objectPosition: firstScreenConfig.image.objectPosition,
        hasAudio: false,
      };
    }
  }

  if (firstScreenConfig.type === 'video') {
    return {
      type: 'video',
      url: firstScreenConfig.video.url,
      poster: firstScreenConfig.video.poster,
      objectPosition: firstScreenConfig.video.objectPosition,
      hasAudio: firstScreenConfig.video.hasAudio,
    };
  }

  return {
    type: 'image',
    url: firstScreenConfig.image.url,
    alt: firstScreenConfig.image.alt,
    objectPosition: firstScreenConfig.image.objectPosition,
    hasAudio: false,
  };
}
