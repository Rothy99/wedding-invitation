import { backgroundConfig, type BackgroundConfig } from './backgroundConfig';
import { firstScreenConfig, type FirstScreenConfig } from './firstScreenConfig';
export { backgroundConfig, firstScreenConfig };
export type { BackgroundConfig, FirstScreenConfig };

export interface ScheduleItem {
  time: string;
  timeKhmer: string;
  titleKhmer: string;
  titleEn: string;
  descriptionKhmer: string;
  iconName: string;
}

export interface GalleryPhoto {
  url: string;
  captionKhmer: string;
  captionEn: string;
}

export interface WeddingConfig {
  couple: {
    groom: {
      nameKhmer: string;
      nameEn: string;
      titleKhmer: string;
      fatherKhmer: string;
      motherKhmer: string;
      phone: string;
      telegram: string;
      avatar: string;
    };
    bride: {
      nameKhmer: string;
      nameEn: string;
      titleKhmer: string;
      fatherKhmer: string;
      motherKhmer: string;
      phone: string;
      telegram: string;
      avatar: string;
    };
  };
  event: {
    titleKhmer: string;
    blessingQuoteKhmer: string;
    solarDateKhmer: string;
    lunarDateKhmer: string;
    dateEn: string;
    targetIsoDate: string; // Used for live countdown timer
    venueNameKhmer: string;
    venueNameEn: string;
    venueAddressKhmer: string;
    venueAddressEn: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
  };
  schedules: {
    morning: ScheduleItem[];
    evening: ScheduleItem[];
  };
  gallery: GalleryPhoto[];
  khqr: {
    accountName: string;
    accountNumberUsd: string;
    accountNumberKhr: string;
    bankName: string;
    qrImage: string;
  };
  music: {
    title: string;
    artist: string;
    url: string;
  };
  background: BackgroundConfig;
  features?: {
    showRsvp?: boolean;
    showKhqr?: boolean;
    showWishes?: boolean;
  };
}

export const weddingData: WeddingConfig = {
  background: backgroundConfig,
  features: {
    showRsvp: false, // Set to false to hide ការឆ្លើយតបវត្តមាន section per user request
    showKhqr: true,
    showWishes: true,
  },
  couple: {
    groom: {
      nameKhmer: "សុទ្ធា",
      nameEn: "Sutha",
      titleKhmer: "កូនប្រុសច្បង",
      fatherKhmer: "លោកឪពុក សុខ ហេង",
      motherKhmer: "អ្នកម្តាយ ម៉ៅ ចិន្តា",
      phone: "012 888 999",
      telegram: "sutha_wedding",
      avatar: "/couple_angkor.jpg?v=2",
    },
    bride: {
      nameKhmer: "សុខវត្ដី",
      nameEn: "Sokhvathey",
      titleKhmer: "កូនស្រីពៅ",
      fatherKhmer: "លោកឪពុក គឹម វណ្ណា",
      motherKhmer: "អ្នកម្តាយ អ៊ុក សុភាព",
      phone: "098 777 666",
      telegram: "sokhvathey_wedding",
      avatar: "/couple_angkor.jpg?v=2",
    },
  },
  event: {
    titleKhmer: "សិរីសួស្តីអាពាហ៍ពិពាហ៍",
    blessingQuoteKhmer: "ស្នេហានិរន្តរ៍ ចំណងនិស្ស័យ",
    solarDateKhmer: "ថ្ងៃសុក្រ ទី១៨ ខែធ្នូ ឆ្នាំ២០២៦",
    lunarDateKhmer: "ត្រូវនឹងថ្ងៃ ៩ កើត ខែមិគសិរ ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០",
    dateEn: "Friday, December 18, 2026",
    targetIsoDate: "2026-12-18T07:00:00+07:00",
    venueNameKhmer: "សាលចំការដូង",
    venueNameEn: "Chamkar Doung Wedding Hall",
    venueAddressKhmer: "ផ្លូវ២១៧ សង្កាត់ដង្កោ ខណ្ឌដង្កោ រាជធានីភ្នំពេញ",
    venueAddressEn: "St. 217, Dangkao, Phnom Penh",
    googleMapsUrl: "https://maps.google.com/?q=Chamkar+Doung+Phnom+Penh",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.5!2d104.88!3d11.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDMwJzQ4LjAiTiAxMDTCsDUyJzQ4LjAiRQ!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh",
  },
  schedules: {
    morning: [
      {
        time: "06:30 AM",
        timeKhmer: "០៦:៣០ ព្រឹក",
        titleKhmer: "ជួបជុំភ្ញៀវកិត្តិយស ពិសាអាហារពេលព្រឹក",
        titleEn: "Guest Gathering & Breakfast",
        descriptionKhmer: "ជួបជុំបងប្អូន ញាតិមិត្តជិតឆ្ងាយ និងភ្ញៀវកិត្តិយសដើម្បីរៀបចំក្បួនជំនូន",
        iconName: "coffee",
      },
      {
        time: "07:00 AM",
        timeKhmer: "០៧:០០ ព្រឹក",
        titleKhmer: "ពិធីហែជំនូនចូលគេហដ្ឋាន",
        titleEn: "Groom's Procession & Fruit Trays",
        descriptionKhmer: "ក្បួនហែជំនូនផ្លែឈើ និងគ្រឿងបណ្ណាការពីខាងកូនប្រុសឆ្ពោះទៅគេហដ្ឋានកូនស្រី",
        iconName: "gift",
      },
      {
        time: "08:15 AM",
        timeKhmer: "០៨:១៥ ព្រឹក",
        titleKhmer: "ពិធីពិសាស្លាកំណត់ត្រា និងសែនដូនតា",
        titleEn: "Ancestor Offering & Betel Nut Ritual",
        descriptionKhmer: "ពិធីសំពះដូនតា សុំពរជ័យពីបុព្វការីជន និងចែកស្លាកំណត់ត្រាមង្គល",
        iconName: "flame",
      },
      {
        time: "09:00 AM",
        timeKhmer: "០៩:០០ ព្រឹក",
        titleKhmer: "ពិធីកាត់សក់បង្កក់សិរី",
        titleEn: "Hair Cutting Ceremony",
        descriptionKhmer: "ពិធីកាត់សក់ សិតសក់ និងស្រោចទឹកអប់ផ្កាម្លិះ ដើម្បីជម្រះឧបទ្រពចង្រៃ និងទទួលពរជ័យ",
        iconName: "scissors",
      },
      {
        time: "10:30 AM",
        timeKhmer: "១០:៣០ ព្រឹក",
        titleKhmer: "ពិធីបង្វិលពពិល និងសំពះផ្ទឹម ចងដៃសិរីសួស្តី",
        titleEn: "Knot-Tying & Candle Passing Ceremony",
        descriptionKhmer: "ពិធីបង្វិលពពិល៧ជុំ សំពះផ្ទឹម និងចងខ្សែអំបោះក្រហមជូនពរជ័យសិរីសួស្តី",
        iconName: "heart",
      },
    ],
    evening: [
      {
        time: "05:00 PM",
        timeKhmer: "០៥:០០ ល្ងាច",
        titleKhmer: "ទទួលភ្ញៀវកិត្តិយស និងថតរូបអនុស្សាវរីយ៍",
        titleEn: "Reception & Photo Session",
        descriptionKhmer: "កូនកំលោះ កូនក្រមុំ និងមាតាបិតាទាំងសងខាង ទទួលស្វាគមន៍ភ្ញៀវកិត្តិយស",
        iconName: "camera",
      },
      {
        time: "06:30 PM",
        timeKhmer: "០៦:៣០ ល្ងាច",
        titleKhmer: "ពិធីកាត់នំមង្គលការ និងថ្លែងអំណរគុណ",
        titleEn: "Cake Cutting & Appreciation Speech",
        descriptionKhmer: "ពិធីកាត់នំមង្គលការ បង្ហាញសេចក្តីស្រឡាញ់ និងការថ្លែងអំណរគុណដល់ភ្ញៀវកិត្តិយស",
        iconName: "cake",
      },
      {
        time: "07:00 PM",
        timeKhmer: "០៧:០០ យប់",
        titleKhmer: "ពិធីពិសាភោជនាហារ និងរាំកម្សាន្ត",
        titleEn: "Wedding Banquet & Celebration Party",
        descriptionKhmer: "ពិសាភោជនាហារដ៏ឈ្ងុយឆ្ងាញ់ និងរាំកម្សាន្តតាមចង្វាក់ភ្លេងខ្មែរប្រពៃណី",
        iconName: "music",
      },
    ],
  },
  gallery: [
    {
      url: "/couple_angkor.jpg?v=2",
      captionKhmer: "ស្នេហានិរន្តរ៍ ចំណងនិស្ស័យ",
      captionEn: "Eternal Love & Destined Bond",
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
      captionKhmer: "ពេលវេលាដ៏មានតម្លៃបំផុត",
      captionEn: "The Most Precious Moments",
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
      captionKhmer: "ក្ដីសុខ និងស្នាមញញឹមនៃគ្រួសារថ្មី",
      captionEn: "Happiness & Bright Beginnings",
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
      captionKhmer: "ដំណើរជីវិតរួមគ្នាដោយក្តីស្រឡាញ់",
      captionEn: "Walking Together Forever",
    },
    {
      url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=80",
      captionKhmer: "សច្ចាប្រណិធាននៃក្តីស្រឡាញ់",
      captionEn: "Vows of Lifelong Devotion",
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
      captionKhmer: "ពរជ័យ និងសិរីមង្គលអាពាហ៍ពិពាហ៍",
      captionEn: "Blessings and Joy",
    },
  ],
  khqr: {
    accountName: "SOK SOVANN & KIM SREYNY",
    accountNumberUsd: "001 234 567",
    accountNumberKhr: "001 234 568",
    bankName: "ABA Bank (KHQR)",
    qrImage: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fpay.ababank.com%2Fwedding-sovann-sreyny",
  },
  music: {
    title: "ភ្ជាប់និស្ស័យ (Phjoap Nissai)",
    artist: "Khmer Wedding Love Song",
    url: "/wedding_music.mp3",
  },
};

// Helper function to convert Arabic digits to Khmer digits
export function toKhmerDigits(num: number | string): string {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return num
    .toString()
    .split('')
    .map(ch => {
      const parsed = parseInt(ch, 10);
      return !isNaN(parsed) ? khmerDigits[parsed] : ch;
    })
    .join('');
}
