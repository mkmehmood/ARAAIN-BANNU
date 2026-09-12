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
  heroImage: "",

  // About
  aboutTitle: "آرائیں بنوں",
  aboutSubtitle: "دنیا بھر میں آرائیں برادری کی سماجی و معاشی ترقی کے لیے کوشاں۔",
  aboutP1: "آرائیں بنوں پاکستان اور بیرون ملک بسنے والے ہزاروں خاندانوں کی نمائندگی کرتی ہے، جو تعلیم، فلاح اور پائیدار ترقی کے مشترکہ عزم سے جڑے ہوئے ہیں۔",
  aboutP2: "اسٹریٹجک منصوبوں، تعلیمی وظائف، کمیونٹی سینٹرز اور نوجوانوں کی رہنمائی کے ذریعے ہم روایات اور جدید مواقع کے درمیان مضبوط پل تعمیر کر رہے ہیں۔",
  aboutP3: "بنوں میں ہماری علاقائی شاخ نچلی سطح پر فعال ہے، جو جنوبی خیبر پختونخوا کے خاندانوں کے لیے امداد، کیریئر رہنمائی اور باہمی اتحاد فراہم کرتی ہے۔",
  statMembers: "500+",
  statPrograms: "8",
  statCities: "30+",
  chairmanName: "ڈاکٹر اعزاز چوہدری",
  chairmanQuote: "ہمارا اتحاد ہی ہماری سب سے بڑی طاقت ہے۔ جب ہم اپنے نوجوانوں کو بااختیار بناتے ہیں اور خاندانوں کو سہارا دیتے ہیں تو نسلوں کے لیے مضبوط بنیاد بنتی ہے۔",

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
  contactAddress: "دفتر آرائیں بنوں، مین سٹی، بنوں، خیبر پختونخوا، پاکستان",
  contactHours: "پیر تا ہفتہ: صبح 09:00 تا شام 05:00",
  contactPhone: "+92 300 1234567",
  contactEmail: "info@arainbannu.org",

  // Social
  socialFacebook: "https://facebook.com",
  socialTwitter: "https://x.com",
  socialWhatsapp: "https://wa.me/923001234567",
  socialInstagram: "https://instagram.com",

  // Footer
  footerDesc: "آرائیں بنوں تعلیم، معاشی خود مختاری اور انسانی فلاح کے ذریعے بنوں، خیبر پختونخوا اور دنیا بھر میں برادری کو بااختیار بنانے کے لیے کوشاں ہے۔",
  footerCopy: "© 2025 آرائیں بنوں۔ تمام حقوق محفوظ ہیں۔",

  // Donation Accounts
  bankName: "میزان بینک لمیٹڈ",
  bankTitle: "آرائیں بنوں ویلفیئر فنڈ",
  bankAccount: "01020304050607",
  bankIBAN: "PK36MEZN0001020304050607",
  bankBranch: "بنوں برانچ (کوڈ 0123)",
  epTitle: "طاہر میر (فنانس سیکرٹری)",
  epNumber: "0300-1234567",
  jcTitle: "آرائیں بنوں ویلفیئر",
  jcNumber: "0321-7654321",
  intBank: "Meezan Bank Limited, Bannu",
  intSwift: "MEZNPKKAXXX",
  intIBAN: "PK36MEZN0001020304050607",
};

export const defaultPrograms: Program[] = [
  { id: 1, icon_name: "heart", color: "#AD7A28", title: "فلاحی بہبود", desc: "مستحق خاندانوں کے لیے مالی معاونت، صحت کی سہولیات اور ہنگامی امداد۔", sort_order: 0 },
  { id: 2, icon_name: "briefcase", color: "#16232F", title: "روزگار اور کیریئر", desc: "ملازمتوں کی فراہمی، پیشہ ورانہ رہنمائی اور نوجوانوں کے لیے کیریئر کونسلنگ۔", sort_order: 1 },
  { id: 3, icon_name: "graduation-cap", color: "#AD7A28", title: "تعلیمی ادارے", desc: "ہونہار اور مستحق طلبہ کے لیے تعلیمی وظائف، مفت ڈیجیٹل خواندگی اور کتب کی فراہمی۔", sort_order: 2 },
  { id: 4, icon_name: "trophy", color: "#16232F", title: "برادری کے ہیروز", desc: "نمایاں کارکردگی دکھانے والے اسکالرز، طلبہ، سول سرونٹس اور سماجی رہنماؤں کی حوصلہ افزائی۔", sort_order: 3 },
  { id: 5, icon_name: "shield", color: "#AD7A28", title: "سیلاب اور ہنگامی امداد", desc: "قدرتی آفات اور ہنگامی حالات میں ریسکیو، راشن کٹس اور بحالی کے کام۔", sort_order: 4 },
  { id: 6, icon_name: "users", color: "#16232F", title: "رشتہ ناطہ سروس", desc: "آرائیں خاندانوں کے لیے مکمل رازداری کے ساتھ ایک بااعتماد اور باوقار رشتہ داری سروس۔", sort_order: 5 },
  { id: 7, icon_name: "building", color: "#AD7A28", title: "کمیونٹی سینٹرز", desc: "برادری کے باہمی میل جول، تقریبات اور تعلیمی سیمینارز کے لیے مراکز کا قیام۔", sort_order: 6 },
  { id: 8, icon_name: "award", color: "#16232F", title: "خواتین ڈیسک", desc: "خواتین کی خود مختاری، ہنر مندی کی تربیت، گھریلو صنعت کے لیے گرانٹس اور رہنمائی۔", sort_order: 7 },
];

export const defaultLeaders: Leader[] = [
  { id: 1, initials: "ص م", name: "صبا ممتاز بانو", role: "چیئرپرسن (عالمی)", email: "saba@arainworldcouncil.org", featured: 0, sort_order: 0 },
  { id: 2, initials: "ا چ", name: "ڈاکٹر اعزاز چوہدری", role: "گلوبل چیئرمین", email: "chairman@arainworldcouncil.org", featured: 1, sort_order: 1 },
  { id: 3, initials: "ع چ", name: "عاصم چوہدری", role: "صدر (عالمی)", email: "asim@arainworldcouncil.org", featured: 0, sort_order: 2 },
  { id: 4, initials: "ط م", name: "طاہر میر آرائیں", role: "علاقائی صدر (بنوں)", email: "tahir@arainbannu.org", featured: 1, sort_order: 3 },
  { id: 5, initials: "خ آ", name: "محمد خالد آرائیں", role: "جنرل سیکرٹری (بنوں)", email: "khalid@arainbannu.org", featured: 0, sort_order: 4 },
];

export const defaultEvents: EventItem[] = [
  { id: 1, day: "02", month: "جنوری", tag: "کاروبار", title: "اپنے کاروبار کو مضبوط بنیادوں پر استوار کریں", time_str: "دوپہر 15:00 تا شام 19:00", place: "بنوں، خیبر پختونخوا، پاکستان", sort_order: 0 },
  { id: 2, day: "19", month: "اپریل", tag: "کمیونٹی", title: "آرائیں بنوں سالانہ اجتماع 2025", time_str: "صبح 09:30 تا دوپہر 13:00", place: "بنوں اسپورٹس کمپلیکس", sort_order: 1 },
  { id: 3, day: "10", month: "دسمبر", tag: "نوجوان", title: "یوتھ لیڈرشپ سمٹ 2025", time_str: "صبح 10:00 تا شام 16:00", place: "بنوں پریس کلب", sort_order: 2 },
];

export const defaultPages: PageItem[] = [
  {
    id: 1,
    slug: "blog",
    label: "ہمارا بلاگ",
    title: "آرائیں بنوں بلاگ اور تازہ ترین خبریں",
    body: "آرائیں بنوں کے باضابطہ بلاگ میں خوش آمدید۔ یہاں آپ کو برادری کی تازہ ترین خبروں، فلاحی سرگرمیوں اور اعلانات سے باخبر رکھا جاتا ہے۔ ہم باقاعدگی سے طلبہ کے تعلیمی وظائف، فری میڈیکل کیمپس کے نظام الاوقات، کیریئر سیمینارز اور بنوں ڈویژن میں کونسل کی فلاحی کامیابیوں کی تفصیلات شائع کرتے ہیں۔",
    published: 1,
    sort_order: 0,
  },
  {
    id: 2,
    slug: "history",
    label: "ہماری تاریخ",
    title: "آرائیں برادری اور تنظیم کی تاریخ",
    body: "آرائیں بنوں کی بنیاد دنیا بھر میں آرائیں برادری کے افراد کو باہمی اتحاد، اخوت اور ترقی کے ایک مشترکہ پلیٹ فارم پر لانے کے لیے رکھی گئی۔ وادی سندھ کی تاریخ میں آرائیں برادری زراعت، تعلیم، قانون، طب اور قومی تعمیر میں ہمیشہ ہراول دستے کا کردار ادا کرتی رہی ہے۔ آج آرائیں بنوں اسی شاندار ورثے کو برقرار رکھتے ہوئے ہر خاندان کی فلاح کے لیے کوشاں ہے۔",
    published: 1,
    sort_order: 1,
  },
  {
    id: 3,
    slug: "documentation",
    label: "باضابطہ دستاویزات",
    title: "تنظیم کے ضوابط اور دستوری دستاویزات",
    body: "آرائیں بنوں کے باضابطہ قواعد و ضوابط اور تنظیمی پالیسیاں تمام اراکین اور برادری کے لیے دستیاب ہیں:\n\n1۔ آرائیں بنوں کا باضابطہ آئین\n2۔ مجلس عاملہ کے اراکین کے لیے ضابطہ اخلاق\n3۔ مالی شفافیت اور آڈٹ کے قواعد\n4۔ اراکین کے حقوق اور ووٹنگ کا طریقہ کار\n5۔ فلاحی فنڈ کی تقسیم کے معیارات",
    published: 1,
    sort_order: 2,
  },
  {
    id: 4,
    slug: "environmental",
    label: "ماحولیاتی اقدامات",
    title: "سرسبز بنوں اور ماحولیاتی مہمات",
    body: "آرائیں بنوں جنوبی خیبر پختونخوا میں ماحولیاتی پائیداری اور شجرکاری کے لیے پرعزم ہے۔ اپنی زرعی روایات سے تحریک لیتے ہوئے ہم مندرجہ ذیل سرگرمیوں کی قیادت کرتے ہیں:\n\n• اسکولوں اور عوامی مقامات پر سالانہ شجرکاری مہم\n• پسماندہ یونین کونسلوں میں صاف پانی کے فلٹریشن پلانٹس کا قیام\n• پلاسٹک کے استعمال میں کمی اور صفائی کے شعور کے لیے سیمینارز",
    published: 1,
    sort_order: 3,
  },
  {
    id: 5,
    slug: "gallery_page",
    label: "بنوں گیلری",
    title: "بنوں کمیونٹی کی تصویری گیلری",
    body: "بنوں اور ملحقہ اضلاع میں آرائیں بنوں کے فلاحی اجتماعات، فری میڈیکل کیمپس، عید گفٹ تقسیم اور ہونہار طلبہ کی تقاریب اعزاز کی تصویری تاریخ ملاحظہ فرمائیں۔",
    published: 1,
    sort_order: 4,
  },
  {
    id: 6,
    slug: "department",
    label: "شعبہ جات",
    title: "فعال شعبہ جات اور تنظیمی ونگز",
    body: "آرائیں بنوں متعدد خصوصی شعبہ جات کے ذریعے کام کرتی ہے جن کی قیادت باصلاحیت اور تجربہ کار افراد کے سپرد ہے:\n\n• شعبہ تعلیم اور اسکالرشپس ونگ\n• شعبہ صحت اور ہنگامی فلاحی بہبود سیل\n• نوجوانوں کی خود مختاری اور آئی ٹی رہنمائی ڈیسک\n• رشتہ ناطہ اور عائلی مصالحتی کمیٹی\n• تعلقات عامہ اور اوورسیز رابطہ ونگ",
    published: 1,
    sort_order: 5,
  },
];

export const defaultGallery: GalleryItem[] = [
  {
    id: 1,
    data_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80",
    caption: "آرائیں بنوں سالانہ جنرل اسمبلی",
    sort_order: 0,
  },
  {
    id: 2,
    data_url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    caption: "یوتھ لیڈرشپ سمٹ اور آئی ٹی رہنمائی",
    sort_order: 1,
  },
  {
    id: 3,
    data_url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80",
    caption: "بنوں دیہی علاقے میں فری میڈیکل اور آئی کیمپ",
    sort_order: 2,
  },
  {
    id: 4,
    data_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    caption: "رمضان راشن پیکجز کی تقسیم مہم",
    sort_order: 3,
  },
  {
    id: 5,
    data_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    caption: "میرٹ اسکالرشپ ایوارڈز تقریب",
    sort_order: 4,
  },
  {
    id: 6,
    data_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    caption: "مجلس عاملہ کا تزویراتی اجلاس",
    sort_order: 5,
  },
];
