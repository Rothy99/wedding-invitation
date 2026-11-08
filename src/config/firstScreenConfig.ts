import { backgroundConfig } from './backgroundConfig';

/**
 * =====================================================================
 * FIRST SCREEN / ENVELOPE COVER CONFIGURATION
 * (ការកំណត់ផ្ទាំងអេក្រង់ដំបូង / ផ្ទាំងស្រោមសំបុត្របើកទ្វារ)
 * =====================================================================
 * 
 * This config controls the first screen (the opening royal doors):
 * - 'match_background': automatically follows the background video/image!
 * - 'video': always use video for the first screen doors
 * - 'image': always use a static image for the first screen doors
 * 
 * (បងអាចកំណត់ផ្ទាំងទ្វារបើកដំបូងឱ្យដើរតាម video background របស់ទំព័រដើមដោយស្វ័យប្រវត្តិ
 * ឬកំណត់រូបភាព ឬវីដេអូដោយឡែកតាមចិត្តចង់បាន)
 */

export interface FirstScreenConfig {
  /**
   * Media type for the first screen:
   * - 'match_background': Follows backgroundConfig.type (if background is video, first screen uses video; if image, uses image)
   * - 'video': Always use video
   * - 'image': Always use static image
   */
  type: 'match_background' | 'video' | 'image';

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

  video: {
    url: '/wedding_video.mp4',
    poster: '/wedding_video_poster.jpg',
    objectPosition: 'center 25%',
  },

  image: {
    url: '/couple_angkor.jpg',
    alt: 'សិរីសួស្តី អាពាហ៍ពិពាហ៍ សុទ្ធា & សុខវត្ដី',
    objectPosition: 'center 25%',
  },

  animation: {
    doorOpenDurationMs: 3400,
    autoOpenCountdownSeconds: 5,
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
} {
  if (firstScreenConfig.type === 'match_background') {
    if (backgroundConfig.type === 'video') {
      return {
        type: 'video',
        url: firstScreenConfig.video.url || backgroundConfig.video.url,
        poster: firstScreenConfig.video.poster || backgroundConfig.video.poster,
        objectPosition: firstScreenConfig.video.objectPosition,
      };
    } else {
      return {
        type: 'image',
        url: firstScreenConfig.image.url || backgroundConfig.image.url,
        alt: firstScreenConfig.image.alt || backgroundConfig.image.alt,
        objectPosition: firstScreenConfig.image.objectPosition,
      };
    }
  }

  if (firstScreenConfig.type === 'video') {
    return {
      type: 'video',
      url: firstScreenConfig.video.url,
      poster: firstScreenConfig.video.poster,
      objectPosition: firstScreenConfig.video.objectPosition,
    };
  }

  return {
    type: 'image',
    url: firstScreenConfig.image.url,
    alt: firstScreenConfig.image.alt,
    objectPosition: firstScreenConfig.image.objectPosition,
  };
}
