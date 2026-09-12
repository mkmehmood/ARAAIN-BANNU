import { DictionaryEntry } from './types';

/**
 * Community, Leadership, Welfare, and Governance Bilingual Dictionary
 * Covers all organizational titles, executive council roles, welfare programs,
 * committees, and community slogans.
 */
export const COMMUNITY_DICTIONARY_ENTRIES: DictionaryEntry[] = [
  // Site & Identity
  { en: 'ARAAIN BANNU', ur: 'آرائیں بنوں', domain: 'community', aliasesEn: ['Arain Bannu', 'Araen Bannu', 'Arain Council Bannu'] },
  { en: 'Bannu Regional Organisation', ur: 'بنوں علاقائی تنظیم', domain: 'community', aliasesEn: ['Bannu Regional Organization', 'Regional Organisation Bannu', 'Regional Chapter Bannu'] },
  { en: 'Unity, Empowerment, Development', ur: 'اتحاد، خود مختاری، ترقی', domain: 'community', aliasesEn: ['Unity, Empowerment, Progress'] },
  { en: 'Strength, Unity, Progress', ur: 'طاقت، یکجہتی، ترقی', domain: 'community' },
  { en: 'Global Community Movement', ur: 'عالمی برادری کی تحریک', domain: 'community' },
  { en: 'Empowering Our Next Generation, Proud Of Our Heritage', ur: 'نئی نسل کو بااختیار بنانا، اپنے ورثے پر فخر', domain: 'community' },
  { en: 'A Global Vision Rooted in Service & Community', ur: 'خدمت اور کمیونٹی پر مبنی ایک روشن وژن', domain: 'community' },
  { en: 'Dedicated to the socio-economic advancement of the Arain community worldwide.', ur: 'دنیا بھر میں آرائیں برادری کی سماجی و معاشی ترقی کے لیے کوشاں۔', domain: 'community' },
  
  // Executive Leadership Roles
  { en: 'Chief Executive', ur: 'چیف ایگزیکٹو', domain: 'governance', aliasesEn: ['CEO', 'Chief Executive Officer'] },
  { en: 'Chief Executive Officer', ur: 'چیف ایگزیکٹو آفیسر', domain: 'governance' },
  { en: 'Global Chairman', ur: 'گلوبل چیئرمین', domain: 'governance', aliasesEn: ['Central Chairman', 'Supreme Chairman'] },
  { en: 'Chairman', ur: 'چیئرمین', domain: 'governance', aliasesUr: ['صدر نشین'] },
  { en: 'Vice Chairman', ur: 'وائس چیئرمین', domain: 'governance', aliasesUr: ['نائب چیئرمین'] },
  { en: 'President', ur: 'صدر', domain: 'governance' },
  { en: 'Senior Vice President', ur: 'سینئر نائب صدر', domain: 'governance' },
  { en: 'Vice President', ur: 'نائب صدر', domain: 'governance' },
  { en: 'General Secretary', ur: 'جنرل سیکرٹری', domain: 'governance', aliasesEn: ['Secretary General'] },
  { en: 'Secretary General', ur: 'سیکرٹری جنرل', domain: 'governance' },
  { en: 'Finance Secretary', ur: 'فنانس سیکرٹری', domain: 'governance', aliasesEn: ['Treasurer', 'Secretary Finance'], aliasesUr: ['خازن', 'سیکرٹری مالیات'] },
  { en: 'Information Secretary', ur: 'سیکرٹری اطلاعات', domain: 'governance', aliasesEn: ['Media Secretary', 'Press Secretary'], aliasesUr: ['انفارمیشن سیکرٹری'] },
  { en: 'Joint Secretary', ur: 'جوائنٹ سیکرٹری', domain: 'governance', aliasesUr: ['نائب سیکرٹری'] },
  { en: 'Deputy General Secretary', ur: 'ڈپٹی جنرل سیکرٹری', domain: 'governance' },
  { en: 'Patron-in-Chief', ur: 'سرپرست اعلیٰ', domain: 'governance', aliasesEn: ['Chief Patron'] },
  { en: 'Patron', ur: 'سرپرست', domain: 'governance' },
  { en: 'Legal Advisor', ur: 'قانونی مشیر', domain: 'governance' },
  { en: 'Chief Coordinator', ur: 'چیف کوآرڈینیٹر', domain: 'governance' },
  { en: 'Executive Member', ur: 'رکن مجلس عاملہ', domain: 'governance', aliasesUr: ['ایگزیکٹو ممبر'] },
  { en: 'Council Member', ur: 'رکن کونسل', domain: 'governance' },
  { en: 'Founding Member', ur: 'بانی رکن', domain: 'governance' },
  { en: 'Life Member', ur: 'تایاحیات رکن', domain: 'governance' },
  { en: 'Honorary Member', ur: 'اعزازی رکن', domain: 'governance' },

  // Welfare & Programs
  { en: 'Welfare Fund', ur: 'فلاحی فنڈ', domain: 'welfare' },
  { en: 'Higher Education Scholarship', ur: 'اعلیٰ تعلیمی وظائف', domain: 'welfare', aliasesEn: ['Educational Scholarship'] },
  { en: 'Educational Scholarship', ur: 'تعلیمی وظیفہ', domain: 'welfare', aliasesUr: ['اسکالرشپ'] },
  { en: 'Healthcare & Medical Support', ur: 'طبی امداد اور صحت کے منصوبے', domain: 'welfare' },
  { en: 'Medical Assistance Camp', ur: 'مفت طبی کیمپ', domain: 'welfare', aliasesEn: ['Free Medical Camp'] },
  { en: 'Emergency Relief & Disaster Response', ur: 'ہنگامی امداد اور قدرتی آفات ریلیف', domain: 'welfare' },
  { en: 'Flood Relief Operations', ur: 'سیلاب متاثرین کی امداد', domain: 'welfare' },
  { en: 'Clean Drinking Water Projects', ur: 'صاف پینے کے پانی کا منصوبہ', domain: 'welfare' },
  { en: 'Water Filtration Plant', ur: 'واٹر فلٹریشن پلانٹ', domain: 'welfare' },
  { en: 'Ration Distribution Program', ur: 'راشن تقسیم پروگرام', domain: 'welfare', aliasesEn: ['Food Support'] },
  { en: 'Widow Support Stipend', ur: 'بیوہ کفالت وظیفہ', domain: 'welfare' },
  { en: 'Orphan Care Program', ur: 'یتیم بچوں کی کفالت', domain: 'welfare' },
  { en: 'Marriage Support Fund', ur: 'شادی و جہیز فنڈ', domain: 'welfare' },
  { en: 'Youth Skill Development & IT', ur: 'نوجوانوں کی فنی تربیت اور آئی ٹی', domain: 'welfare' },
  { en: 'Small Business Micro-Grants', ur: 'چھوٹے کاروبار کے لیے بلاسود مالی معاونت', domain: 'welfare' },
  { en: 'Rozgar Support Program', ur: 'روزگار معاونت پروگرام', domain: 'welfare' },
  { en: 'Community Center & Gathering Hall', ur: 'کمیونٹی سنٹر اور ہال', domain: 'welfare' },
  { en: 'Annual General Assembly', ur: 'سالانہ عمومی اجلاس', domain: 'community' },
  { en: 'Annual Convention', ur: 'سالانہ کنونشن', domain: 'community' },
  { en: 'Blood Donation Drive', ur: 'خون عطیہ کرنے کی مہم', domain: 'welfare' },
  { en: 'Legal Aid Cell', ur: 'مفت قانونی امداد', domain: 'welfare' },

  // Membership & Registration
  { en: 'Membership Registration', ur: 'ممبرشپ رجسٹریشن', domain: 'administrative', aliasesUr: ['رکنیت سازی'] },
  { en: 'Official Membership Card', ur: 'سرکاری ممبرشپ کارڈ', domain: 'administrative' },
  { en: 'Card ID', ur: 'کارڈ نمبر', domain: 'administrative' },
  { en: 'Issue Date', ur: 'تاریخ اجراء', domain: 'administrative' },
  { en: 'Expiry Date', ur: 'تاریخ تنسیخ', domain: 'administrative' },
  { en: 'Active Member', ur: 'باقاعدہ رکن', domain: 'administrative' },
  { en: 'Senior Citizen Member', ur: 'معمر رکن', domain: 'administrative' },
  { en: 'Student Member', ur: 'طالبعلم رکن', domain: 'administrative' },
  { en: 'Overseas Member', ur: 'سمندر پار رکن', domain: 'administrative' },
  { en: 'Executive Council', ur: 'مجلس عاملہ', domain: 'governance', aliasesUr: ['ایگزیکٹو کونسل'] },
  { en: 'General Body', ur: 'مجلس عمومی', domain: 'governance' },
  { en: 'Advisory Board', ur: 'مشاورتی بورڈ', domain: 'governance' },
  
  // Section Headers & UI Labels
  { en: 'Key Initiatives & Programs', ur: 'بنیادی فلاحی منصوبے اور پروگرامز', domain: 'community' },
  { en: 'Our Leadership Team', ur: 'ہماری قیادت', domain: 'community' },
  { en: 'Upcoming Events & Programs', ur: 'آئندہ تقریبات اور پروگرامز', domain: 'community' },
  { en: 'Community Moments', ur: 'برادری کی سرگرمیاں اور تصاویر', domain: 'community' },
  { en: 'Support Our Mission', ur: 'ہمارے مشن کا حصہ بنیں', domain: 'community' },
  { en: 'Be Part of Our Journey', ur: 'ہمارے سفر کا حصہ بنیں', domain: 'community' },
  { en: 'Official Affiliation', ur: 'باضابطہ وابستگی', domain: 'community' },
  { en: 'Bannu Chapter', ur: 'بنوں شاخ', domain: 'community' },
  { en: 'Central Secretariat', ur: 'مرکزی سیکرٹریٹ', domain: 'community' }
];
