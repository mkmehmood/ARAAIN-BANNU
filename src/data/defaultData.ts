import { Program, Leader, EventItem, PageItem, GalleryItem, SiteSettings } from '../types';

export const defaultSettings: SiteSettings = {
  // Identity (Default to Urdu)
  siteName: "آرائیں بنوں",
  siteTagline: "اتحاد، خود مختاری، ترقی",
  siteSubName: "بنوں علاقائی تنظیم",
  siteSubTagline: "بنوں اور خیبر پختونخوا میں برادری کے رشتوں کو مضبوط بنانا",
  logoData: "",

  // Hero
  heroBadge: "عالمی برادری کی تحریک",
  heroTitle: "آرائیں بنوں",
  heroSub: "نئی نسل کو بااختیار بنانا، اپنے ورثے پر فخر",
  heroTagline: "دنیا بھر میں آرائیں برادری کا اتحاد — طاقت، یکجہتی، ترقی۔ برادری کی فلاح، تعلیم اور ترقی کے ایک عظیم مشن کا حصہ بنیں۔",
  heroImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80",
  heroImages: [
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1920&q=80"
  ],
  heroSlideDuration: 5,

  // About
  aboutTitle: "آرائیں بنوں",
  aboutSubtitle: "دنیا بھر میں آرائیں برادری کی سماجی و معاشی ترقی کے لیے کوشاں۔",
  aboutP1: "آرائیں بنوں پاکستان اور بیرون ملک بسنے والے ہزاروں خاندانوں کی نمائندگی کرتی ہے، جو تعلیم، فلاح اور پائیدار ترقی کے مشترکہ عزم سے جڑے ہوئے ہیں۔",
  aboutP2: "اسٹریٹجک منصوبوں، تعلیمی وظائف، کمیونٹی سینٹرز اور نوجوانوں کی رہنمائی کے ذریعے ہم روایات اور جدید مواقع کے درمیان مضبوط پل تعمیر کر رہے ہیں۔",
  aboutP3: "بنوں میں ہماری علاقائی شاخ نچلی سطح پر فعال ہے، جو جنوبی خیبر پختونخوا کے خاندانوں کے لیے امداد، کیریئر رہنمائی اور باہمی اتحاد فراہم کرتی ہے۔",
  statMembers: "50",
  statPrograms: "8",
  statCities: "30+",
  chairmanName: "MAULANA MUHAMMAD TAHIR KHAN ",
  chairmanQuote: "Our unity is our greatest strength. When we empower our youth and support our families, we build a foundation that endures for generations.",
  chairmanPhoto: "",

  // Sections
  programsTitle: "اہم منصوبے اور فلاحی پروگرامز",
  programsDesc: "خاندانوں کی مدد، نوجوانوں کی تعلیم اور برادری کی فلاح کے لیے جامع منصوبے۔",
  leadershipTitle: "ہماری قیادت",
  membershipTitle: "رکنیت کا باضابطہ اندراج",
  membershipDesc: "آرائیں بنوں کا حصہ بنیں اور برادری کی فلاح و بہبود کے منصوبوں میں اپنا کردار ادا کریں۔",
  donateTitle: "فلاحی منصوبوں کے لیے عطیات",
  donateDesc: "آپ کے عطیات مستحق طلبہ کے وظائف، مفت طبی کیمپس اور ہنگامی امداد میں خرچ ہوتے ہیں۔",
  eventsTitle: "تقریبات اور اعلانات",
  galleryTitle: "کمیونٹی کی یادگار جھلکیاں",
  galleryDesc: "ہمارے سیمینارز، فلاحی سرگرمیوں، یوتھ سمٹس اور علاقائی اجتماعات کی تصویری جھلکیاں۔",

  // Contact
  contactAddress: "ARAAIN BANNU Office, Main City, Bannu, Khyber Pakhtunkhwa, Pakistan",
  contactHours: "Monday – Saturday: 09:00 AM – 05:00 PM (PKT)",
  contactPhone: "03369948409",
  contactEmail: "3tahirmeer@gmail.com",
  multipleContacts: [],

  // Social
  socialFacebook: "",
  socialTwitter: "",
  socialWhatsapp: "https://wa.me/923369948409",
  socialInstagram: "",

  // Footer
  footerDesc: "آرائیں بنوں تعلیم، معاشی خود مختاری اور انسانی فلاح کے ذریعے بنوں، خیبر پختونخوا اور دنیا بھر میں برادری کو بااختیار بنانے کے لیے کوشاں ہے۔",
  footerCopy: "© 2025 آرائیں بنوں۔ تمام حقوق محفوظ ہیں۔",

  // Donation Accounts
  bankName: "Meezan Bank Limited",
  bankTitle: "ARAAIN BANNU Welfare Fund",
  bankAccount: "",
  bankIBAN: "",
  bankBranch: "Bannu Branch",
  epTitle: "Tahir Meer (Finance Secretary)",
  epNumber: "03369948409",
  jcTitle: "ARAAIN BANNU Welfare",
  jcNumber: "03369948409",
  intBank: "Meezan Bank Limited, Bannu",
  intSwift: "",
  intIBAN: "",

  // Custom Website Update & Announcement
  announcementEnabled: false,
  announcementBadge: "اہم اطلاع",
  announcementText: "آرائیں بنوں کی ممبرشپ مہم شروع ہے۔ اپنا باضابطہ ڈیجیٹل رکنیت کارڈ حاصل کریں۔",
  announcementTextEn: "Official Membership Drive is active. Register online to receive your verified digital ID card.",
  announcementLinkText: "رکنیت حاصل کریں",
  announcementAction: "membership",
  websiteThemeAccent: "#AD7A28",
  lastWebsiteUpdate: "2026-09-12T12:00:00.000Z",
  customNoticeHeadline: "بنوں اور جنوبی اضلاع کے لیے خصوصی تعلیمی و فلاحی پیکج کا باقاعدہ آغاز کر دیا گیا ہے۔",
};

export const defaultPrograms: Program[] = [];

export const defaultLeaders: Leader[] = [];

export const defaultEvents: EventItem[] = [];

export const defaultPages: PageItem[] = [];

export const defaultGallery: GalleryItem[] = [];
