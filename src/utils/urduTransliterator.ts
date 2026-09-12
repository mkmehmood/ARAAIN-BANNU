/**
 * Bi-directional Urdu <-> English Translation and Transliteration Engine
 * Specifically tuned for Pakistani names, Islamic names, professions, addresses,
 * geographic locations, CMS content (programs, leaders, events, pages, gallery),
 * and official standard ID card generation.
 *
 * Rules:
 * - Digits (0-9) remain in standard English digits format (e.g., 11101-1234567-1).
 * - Emails, phone numbers, and URLs remain in clean English format.
 * - Admin enters data in Urdu -> Translates accurately into English in English mode.
 * - Public/user inputs in English -> Translates accurately into Urdu in Urdu mode.
 * - The official ID Card is generated strictly in English format.
 */

import {
  translateUrduToEnglishWithLibrary,
  translateEnglishToUrduWithLibrary,
  searchBilingualDictionary,
  lookupDictionaryTerm,
  ALL_DICTIONARY_ENTRIES,
} from '../lib/dictionary';

// ── English to Urdu Names Dictionary ────────────────────────────────
export const NAMES_DICT: Record<string, string> = {
  // Islamic & Companions
  muhammad: 'محمد',
  mohammad: 'محمد',
  mohammed: 'محمد',
  mohd: 'محمد',
  ahmad: 'احمد',
  ahmed: 'احمد',
  ali: 'علی',
  hassan: 'حسن',
  hasan: 'حسن',
  hussain: 'حسین',
  husain: 'حسین',
  umar: 'عمر',
  omer: 'عمر',
  usman: 'عثمان',
  uthman: 'عثمان',
  osman: 'عثمان',
  abubakar: 'ابوبکر',
  abubakr: 'ابوبکر',
  abu: 'ابو',
  bakar: 'بکر',
  bakr: 'بکر',
  farooq: 'فاروق',
  farouk: 'فاروق',
  bilal: 'بلال',
  hamza: 'حمزہ',
  talha: 'طلحہ',
  zubair: 'زبیر',
  saad: 'سعد',
  salman: 'سلمان',
  tariq: 'طارق',
  tareq: 'طارق',
  khalid: 'خالد',
  tahir: 'طاہر',
  meer: 'میر',
  mir: 'میر',
  khan: 'خان',
  shah: 'شاہ',
  syed: 'سید',
  sayed: 'سید',
  malik: 'ملک',
  chaudhry: 'چوہدری',
  chaudhary: 'چوہدری',
  choudhary: 'چوہدری',
  ch: 'چوہدری',
  arain: 'ارائیں',
  araain: 'ارائیں',
  mian: 'میاں',
  mehr: 'مہر',
  haji: 'حاجی',
  sardar: 'سردار',
  sheikh: 'شیخ',
  shaikh: 'شیخ',
  raja: 'راجہ',
  rana: 'رانا',
  butt: 'بٹ',
  dar: 'ڈار',
  bhatti: 'بھٹی',
  abbasi: 'عباسی',
  qureshi: 'قریشی',
  siddiqui: 'صدیقی',
  ansari: 'انصاری',

  // Names with Abdul
  abdul: 'عبد ال',
  abdullah: 'عبداللہ',
  abdulla: 'عبداللہ',
  rehman: 'رحمٰن',
  rahman: 'رحمٰن',
  raheem: 'رحیم',
  rahim: 'رحیم',
  kareem: 'کریم',
  karim: 'کریم',
  qadir: 'قادر',
  wahab: 'وہاب',
  samad: 'صمد',
  rauf: 'رؤف',
  ghafoor: 'غفور',
  ghani: 'غنی',
  sattar: 'ستار',
  jabbar: 'جبار',
  majeed: 'مجید',
  hameed: 'حمید',
  hakeem: 'حکیم',
  rashid: 'راشد',
  aziz: 'عزیز',
  hadi: 'ہادی',
  latif: 'لطیف',

  // Common First & Middle Names
  imran: 'عمران',
  irfan: 'عرفان',
  kamran: 'کامران',
  rizwan: 'رضوان',
  adnan: 'عدنان',
  rehan: 'ریحان',
  zeeshan: 'ذیشان',
  faisal: 'فیصل',
  babar: 'بابر',
  junaid: 'جنید',
  umair: 'عمیر',
  amir: 'عامر',
  aamir: 'عامر',
  asim: 'عاصم',
  asif: 'آصف',
  kashif: 'کاشف',
  saqib: 'ثاقب',
  atif: 'عاطف',
  waqas: 'وقاص',
  waqar: 'وقار',
  yasir: 'یاسر',
  nasir: 'ناصر',
  zahid: 'زاہد',
  shahid: 'شاہد',
  sajid: 'ساجد',
  majid: 'ماجد',
  abid: 'عابد',
  amjad: 'امجد',
  arshad: 'ارشد',
  akhtar: 'اختر',
  anwar: 'انور',
  aslam: 'اسلم',
  akram: 'اکرم',
  azhar: 'اظہر',
  iftikhar: 'افتخار',
  mushtaq: 'مشتاق',
  mumtaz: 'ممتاز',
  liaquat: 'لیاقت',
  liaqat: 'لیاقت',
  shaukat: 'شوکت',
  naeem: 'نعیم',
  nadeem: 'ندیم',
  waseem: 'وسیم',
  wasim: 'وسیم',
  faheem: 'فہیم',
  salim: 'سلیم',
  saleem: 'سلیم',
  javed: 'جاوید',
  jawad: 'جواد',
  pervez: 'پرویز',
  parvez: 'پرویز',
  naveed: 'نوید',
  iqbal: 'اقبال',
  afzal: 'افضل',
  ajmal: 'اجمل',
  akbar: 'اکبر',
  alam: 'عالم',
  altaf: 'الطاف',
  aman: 'امان',
  amin: 'امین',
  arif: 'عارف',
  ashraf: 'اشرف',
  ayub: 'ایوب',
  bashir: 'بشیر',
  dawood: 'داؤد',
  dilawar: 'دلاور',
  ehsan: 'احسان',
  farhan: 'فرحان',
  fawad: 'فواد',
  ghulam: 'غلام',
  habib: 'حبیب',
  hafeez: 'حفیظ',
  haroon: 'ہارون',
  hashim: 'ہاشم',
  idrees: 'ادریس',
  ilyas: 'الیاس',
  inam: 'انعام',
  irshad: 'ارشاد',
  ismail: 'اسماعیل',
  jahangir: 'جہانگیر',
  jamal: 'جمال',
  jamil: 'جمیل',
  khurram: 'خرم',
  luqman: 'لقمان',
  mansoor: 'منصور',
  maqsood: 'مقصود',
  mehboob: 'محبوب',
  mehmood: 'محمود',
  mahmood: 'محمود',
  mirza: 'مرزا',
  mohsin: 'محسن',
  mubashir: 'مبشر',
  mudassar: 'مدثر',
  munir: 'منیر',
  mustafa: 'مصطفیٰ',
  murtaza: 'مرتضیٰ',
  noman: 'نعمان',
  nouman: 'نعمان',
  qaiser: 'قیصر',
  raees: 'رئیس',
  rafiq: 'رفیق',
  saeed: 'سعید',
  sami: 'سمیع',
  shafiq: 'شفیق',
  shahzad: 'شہزاد',
  shehzad: 'شہزاد',
  shoaib: 'شعیب',
  sohail: 'سہیل',
  suhail: 'سہیل',
  sultan: 'سلطان',
  tabish: 'تابش',
  tanveer: 'تنویر',
  waheed: 'وحید',
  yousuf: 'یوسف',
  yousaf: 'یوسف',
  zafar: 'ظفر',
  zia: 'ضیاء',

  // Female Names
  fatima: 'فاطمہ',
  ayesha: 'عائشہ',
  aisha: 'عائشہ',
  maryam: 'مریم',
  mariam: 'مریم',
  zainab: 'زینب',
  khadija: 'خدیجہ',
  amna: 'آمنہ',
  amina: 'آمنہ',
  noor: 'نور',
  sadaf: 'صدف',
  sana: 'ثناء',
  hira: 'حرا',
  samina: 'ثمینہ',
  rubina: 'روبینہ',
  shaheen: 'شاہین',
  shabnam: 'شبنم',
  parveen: 'پروین',
  farzana: 'فرزانہ',
  nasreen: 'نسرین',
  begum: 'بیگم',
  bibi: 'بی بی',
};

// ── Reverse Names Dictionary (Urdu -> English) ──────────────────────
export const NAMES_URDU_TO_ENG: Record<string, string> = {
  'محمد': 'Muhammad',
  'محمّد': 'Muhammad',
  'احمد': 'Ahmad',
  'أحمد': 'Ahmad',
  'علی': 'Ali',
  'حسن': 'Hassan',
  'حسین': 'Hussain',
  'عمر': 'Umar',
  'عثمان': 'Usman',
  'ابوبکر': 'Abu Bakar',
  'ابو': 'Abu',
  'بکر': 'Bakar',
  'فاروق': 'Farooq',
  'بلال': 'Bilal',
  'حمزہ': 'Hamza',
  'طلحہ': 'Talha',
  'زبیر': 'Zubair',
  'سعد': 'Saad',
  'سلمان': 'Salman',
  'طارق': 'Tariq',
  'خالد': 'Khalid',
  'طاہر': 'Tahir',
  'میر': 'Meer',
  'خان': 'Khan',
  'شاہ': 'Shah',
  'سید': 'Syed',
  'ملک': 'Malik',
  'چوہدری': 'Chaudhry',
  'ارائیں': 'Araain',
  'میاں': 'Mian',
  'مہر': 'Mehr',
  'حاجی': 'Haji',
  'سردار': 'Sardar',
  'شیخ': 'Sheikh',
  'راجہ': 'Raja',
  'رانا': 'Rana',
  'بٹ': 'Butt',
  'ڈار': 'Dar',
  'بھٹی': 'Bhatti',
  'عباسی': 'Abbasi',
  'قریشی': 'Qureshi',
  'صدیقی': 'Siddiqui',
  'انصاری': 'Ansari',
  'عبداللہ': 'Abdullah',
  'عبد ال': 'Abdul',
  'عبد': 'Abdul',
  'رحمٰن': 'Rehman',
  'رحیم': 'Raheem',
  'کریم': 'Kareem',
  'قادر': 'Qadir',
  'وہاب': 'Wahab',
  'صمد': 'Samad',
  'رؤف': 'Rauf',
  'غفور': 'Ghafoor',
  'غنی': 'Ghani',
  'ستار': 'Sattar',
  'جبار': 'Jabbar',
  'مجید': 'Majeed',
  'حمید': 'Hameed',
  'حکیم': 'Hakeem',
  'راشد': 'Rashid',
  'عزیز': 'Aziz',
  'ہادی': 'Hadi',
  'لطیف': 'Latif',
  'عمران': 'Imran',
  'عرفان': 'Irfan',
  'کامران': 'Kamran',
  'رضوان': 'Rizwan',
  'عدنان': 'Adnan',
  'ریحان': 'Rehan',
  'ذیشان': 'Zeeshan',
  'فیصل': 'Faisal',
  'بابر': 'Babar',
  'جنید': 'Junaid',
  'عمیر': 'Umair',
  'عامر': 'Amir',
  'عاصم': 'Asim',
  'آصف': 'Asif',
  'کاشف': 'Kashif',
  'ثاقب': 'Saqib',
  'عاطف': 'Atif',
  'وقاص': 'Waqas',
  'وقار': 'Waqar',
  'یاسر': 'Yasir',
  'ناصر': 'Nasir',
  'زاہد': 'Zahid',
  'شاہد': 'Shahid',
  'ساجد': 'Sajid',
  'ماجد': 'Majid',
  'عابد': 'Abid',
  'امجد': 'Amjad',
  'ارشد': 'Arshad',
  'اختر': 'Akhtar',
  'انور': 'Anwar',
  'اسلم': 'Aslam',
  'اکرم': 'Akram',
  'اظہر': 'Azhar',
  'افتخار': 'Iftikhar',
  'مشتاق': 'Mushtaq',
  'ممتاز': 'Mumtaz',
  'لیاقت': 'Liaquat',
  'شوکت': 'Shaukat',
  'نعیم': 'Naeem',
  'ندیم': 'Nadeem',
  'وسیم': 'Waseem',
  'فہیم': 'Faheem',
  'سلیم': 'Saleem',
  'جاوید': 'Javed',
  'جواد': 'Jawad',
  'پرویز': 'Pervez',
  'نوید': 'Naveed',
  'اقبال': 'Iqbal',
  'افضل': 'Afzal',
  'اجمل': 'Ajmal',
  'اکبر': 'Akbar',
  'عالم': 'Alam',
  'الطاف': 'Altaf',
  'امان': 'Aman',
  'امین': 'Amin',
  'عارف': 'Arif',
  'اشرف': 'Ashraf',
  'ایوب': 'Ayub',
  'بشیر': 'Bashir',
  'داؤد': 'Dawood',
  'دلاور': 'Dilawar',
  'احسان': 'Ehsan',
  'فرحان': 'Farhan',
  'فواد': 'Fawad',
  'غلام': 'Ghulam',
  'حبیب': 'Habib',
  'حفیظ': 'Hafeez',
  'ہارون': 'Haroon',
  'ہاشم': 'Hashim',
  'ادریس': 'Idrees',
  'الیاس': 'Ilyas',
  'انعام': 'Inam',
  'ارشاد': 'Irshad',
  'اسماعیل': 'Ismail',
  'جہانگیر': 'Jahangir',
  'جمال': 'Jamal',
  'جمیل': 'Jamil',
  'خرم': 'Khurram',
  'لقمان': 'Luqman',
  'منصور': 'Mansoor',
  'مقصود': 'Maqsood',
  'محبوب': 'Mehboob',
  'محمود': 'Mehmood',
  'مرزا': 'Mirza',
  'محسن': 'Mohsin',
  'مبشر': 'Mubashir',
  'مدثر': 'Mudassar',
  'منیر': 'Munir',
  'مصطفیٰ': 'Mustafa',
  'مصطفی': 'Mustafa',
  'مرتضیٰ': 'Murtaza',
  'مرتضی': 'Murtaza',
  'نعمان': 'Noman',
  'قیصر': 'Qaiser',
  'رئیس': 'Raees',
  'رفیق': 'Rafiq',
  'سعید': 'Saeed',
  'سمیع': 'Sami',
  'شفیق': 'Shafiq',
  'شہزاد': 'Shahzad',
  'شعیب': 'Shoaib',
  'سہیل': 'Sohail',
  'سلطان': 'Sultan',
  'تابش': 'Tabish',
  'تنویر': 'Tanveer',
  'وحید': 'Waheed',
  'یوسف': 'Yousuf',
  'ظفر': 'Zafar',
  'ضیاء': 'Zia',
  'ضیا': 'Zia',
  'فاطمہ': 'Fatima',
  'عائشہ': 'Ayesha',
  'مریم': 'Maryam',
  'زینب': 'Zainab',
  'خدیجہ': 'Khadija',
  'آمنہ': 'Amna',
  'نور': 'Noor',
  'صدف': 'Sadaf',
  'ثناء': 'Sana',
  'ثنا': 'Sana',
  'حرا': 'Hira',
  'ثمینہ': 'Samina',
  'روبینہ': 'Rubina',
  'شاہین': 'Shaheen',
  'شبنم': 'Shabnam',
  'پروین': 'Parveen',
  'فرزانہ': 'Farzana',
  'نسرین': 'Nasreen',
  'بیگم': 'Begum',
  'بی بی': 'Bibi',
};

// ── English to Urdu Locations & Addresses ───────────────────────────
export const ADDRESS_DICT: Record<string, string> = {
  bannu: 'بنوں',
  banoo: 'بنوں',
  peshawar: 'پشاور',
  kohat: 'کوہاٹ',
  lakki: 'لکی',
  marwat: 'مروت',
  karak: 'کرک',
  dera: 'ڈیرہ',
  ismail: 'اسماعیل',
  tank: 'ٹانک',
  waziristan: 'وزیرستان',
  mardan: 'مردان',
  swat: 'سوات',
  abbottabad: 'ایبٹ آباد',
  lahore: 'لاہور',
  karachi: 'کراچی',
  islamabad: 'اسلام آباد',
  rawalpindi: 'راولپنڈی',
  faisalabad: 'فیصل آباد',
  multan: 'ملتان',
  gujranwala: 'گوجرانوالہ',
  sialkot: 'سیالکوٹ',
  sargodha: 'سرگودھا',
  quetta: 'کوئٹہ',
  pakistan: 'پاکستان',
  kpk: 'خیبر پختونخوا',
  khyber: 'خیبر',
  pakhtunkhwa: 'پختونخوا',
  punjab: 'پنجاب',
  sindh: 'سندھ',
  balochistan: 'بلوچستان',
  qasaban: 'قصاباں',
  mandan: 'منڈان',
  haved: 'حوید',
  hawed: 'حوید',
  domel: 'ڈومیل',
  miryan: 'مریئن',
  ghoriwala: 'غوریوالہ',
  kakki: 'ککی',
  bharat: 'بھرت',
  kotka: 'کوٹکہ',
  bazar: 'بازار',
  bazaar: 'بازار',
  chowk: 'چوک',
  mohallah: 'محلہ',
  mohalla: 'محلہ',
  street: 'گلی',
  st: 'گلی',
  road: 'روڈ',
  rd: 'روڈ',
  lane: 'گلی',
  sector: 'سیکٹر',
  block: 'بلاک',
  phase: 'فیز',
  house: 'مکان نمبر',
  h: 'مکان',
  flat: 'فلیٹ',
  shop: 'دکان',
  building: 'عمارت',
  near: 'نزد',
  opposite: 'سامنے',
  opp: 'سامنے',
  behind: 'پیچھے',
  main: 'مین',
  cantt: 'کینٹ',
  city: 'شہر',
  tehsil: 'تحصیل',
  district: 'ضلع',
  distt: 'ضلع',
  village: 'گاؤں',
  colony: 'کالونی',
  town: 'ٹاؤن',
  plaza: 'پلازہ',
  market: 'مارکیٹ',
  hospital: 'ہسپتال',
  school: 'اسکول',
  college: 'کالج',
  university: 'یونیورسٹی',
  mosque: 'مسجد',
  masjid: 'مسجد',
  central: 'مرکزی',
  office: 'دفتر',
  hall: 'ہال',
};

// ── Reverse Locations (Urdu -> English) ─────────────────────────────
export const ADDRESS_URDU_TO_ENG: Record<string, string> = {
  'بنوں': 'Bannu',
  'بنوں سٹی': 'Bannu City',
  'پشاور': 'Peshawar',
  'کوہاٹ': 'Kohat',
  'لکی مروت': 'Lakki Marwat',
  'لکی': 'Lakki',
  'مروت': 'Marwat',
  'کرک': 'Karak',
  'ڈیرہ اسماعیل خان': 'Dera Ismail Khan',
  'ڈیرہ': 'Dera',
  'ٹانک': 'Tank',
  'وزیرستان': 'Waziristan',
  'مردان': 'Mardan',
  'سوات': 'Swat',
  'ایبٹ آباد': 'Abbottabad',
  'لاہور': 'Lahore',
  'کراچی': 'Karachi',
  'اسلام آباد': 'Islamabad',
  'راولپنڈی': 'Rawalpindi',
  'فیصل آباد': 'Faisalabad',
  'ملتان': 'Multan',
  'گوجرانوالہ': 'Gujranwala',
  'سیالکوٹ': 'Sialkot',
  'سرگودھا': 'Sargodha',
  'کوئٹہ': 'Quetta',
  'پاکستان': 'Pakistan',
  'خیبر پختونخوا': 'KPK',
  'خیبر': 'Khyber',
  'پختونخوا': 'Pakhtunkhwa',
  'کے پی کے': 'KPK',
  'پنجاب': 'Punjab',
  'سندھ': 'Sindh',
  'بلوچستان': 'Balochistan',
  'قصاباں': 'Qasaban',
  'محلہ قصاباں': 'Mohallah Qasaban',
  'محلہ': 'Mohallah',
  'منڈان': 'Mandan',
  'حوید': 'Haved',
  'ڈومیل': 'Domel',
  'مریئن': 'Miryan',
  'غوریوالہ': 'Ghoriwala',
  'ککی': 'Kakki',
  'بھرت': 'Bharat',
  'کوٹکہ': 'Kotka',
  'بازار': 'Bazaar',
  'چوک': 'Chowk',
  'گلی': 'Street',
  'روڈ': 'Road',
  'سیکٹر': 'Sector',
  'بلاک': 'Block',
  'فیز': 'Phase',
  'مکان نمبر': 'House No.',
  'مکان': 'House',
  'فلیٹ': 'Flat',
  'دکان': 'Shop',
  'عمارت': 'Building',
  'نزد': 'Near',
  'سامنے': 'Opposite',
  'پیچھے': 'Behind',
  'مین': 'Main',
  'کینٹ': 'Cantt',
  'شہر': 'City',
  'تحصیل': 'Tehsil',
  'ضلع': 'District',
  'گاؤں': 'Village',
  'کالونی': 'Colony',
  'ٹاؤن': 'Town',
  'پلازہ': 'Plaza',
  'مارکیٹ': 'Market',
  'ڈاکخانہ': 'Post Office',
  'ریلوے': 'Railway',
  'اسٹیشن': 'Station',
  'ہسپتال': 'Hospital',
  'اسکول': 'School',
  'کالج': 'College',
  'یونیورسٹی': 'University',
  'مسجد': 'Mosque',
  'مرکزی دفتر': 'Central Office',
  'مرکزی': 'Central',
  'دفتر': 'Office',
  'ہال': 'Hall',
  'پریس کلب': 'Press Club',
};

// ── Professions (English <-> Urdu) ──────────────────────────────────
export const OCCUPATIONS_DICT: Record<string, string> = {
  // Executive & Leadership
  'chief executive': 'چیف ایگزیکٹو',
  'chief executive officer': 'چیف ایگزیکٹو آفیسر',
  'ceo': 'چیف ایگزیکٹو آفیسر',
  'chief operating officer': 'چیف آپریٹنگ آفیسر',
  'coo': 'چیف آپریٹنگ آفیسر',
  'chief financial officer': 'چیف فنانشل آفیسر',
  'cfo': 'چیف فنانشل آفیسر',
  'chief technology officer': 'چیف ٹیکنالوجی آفیسر',
  'cto': 'چیف ٹیکنالوجی آفیسر',
  'chief organizer': 'چیف آرگنائزر',
  'chief coordinator': 'چیف کوآرڈینیٹر',
  'chief advisor': 'چیف ایڈوائزر',
  'chief patron': 'چیف پیٹرن',
  'chief editor': 'چیف ایڈیٹر',
  'chief justice': 'چیف جسٹس',
  'executive director': 'ایگزیکٹو ڈائریکٹر',
  'executive officer': 'ایگزیکٹو آفیسر',
  'executive member': 'ایگزیکٹو ممبر',
  'executive council': 'ایگزیکٹو کونسل',
  'executive committee': 'ایگزیکٹو کمیٹی',
  'executive body': 'ایگزیکٹو باڈی',
  'executive': 'ایگزیکٹو',
  'chief': 'چیف',
  'senior vice president': 'سینئر نائب صدر',
  'vice president': 'نائب صدر',
  'president': 'صدر',
  'general secretary': 'جنرل سیکرٹری',
  'additional general secretary': 'ایڈیشنل جنرل سیکرٹری',
  'joint secretary': 'جوائنٹ سیکرٹری',
  'assistant secretary': 'اسسٹنٹ سیکرٹری',
  'finance secretary': 'فنانس سیکرٹری',
  'information secretary': 'اطلاعات سیکرٹری',
  'press secretary': 'پریس سیکرٹری',
  'patron-in-chief': 'سرپرست اعلیٰ',
  'patron in chief': 'سرپرست اعلیٰ',
  'patron': 'سرپرست',
  'chairman': 'چیئرمین',
  'vice chairman': 'وائس چیئرمین',
  'chairperson': 'چیئرپرسن',
  'managing director': 'منیجنگ ڈائریکٹر',
  'director general': 'ڈائریکٹر جنرل',
  'deputy director': 'ڈپٹی ڈائریکٹر',
  'assistant director': 'اسسٹنٹ ڈائریکٹر',
  'project director': 'پروجیکٹ ڈائریکٹر',
  'general manager': 'جنرل منیجر',
  'branch manager': 'برانچ منیجر',
  'project manager': 'پروجیکٹ منیجر',
  'operations manager': 'آپریشنز منیجر',
  'coordinator': 'کوآرڈینیٹر',
  'organizer': 'آرگنائزر',
  'convener': 'کنوینر',
  'incharge': 'انچارج',
  'supervisor': 'نگران',
  'administrator': 'ایڈمنسٹریٹر',
  'commissioner': 'کمشنر',
  'deputy commissioner': 'ڈپٹی کمشنر',
  'assistant commissioner': 'اسسٹنٹ کمشنر',

  // Education & Academia
  teacher: 'استاد / مدرس',
  professor: 'پروفیسر',
  'assistant professor': 'اسسٹنٹ پروفیسر',
  'associate professor': 'ایسوسی ایٹ پروفیسر',
  lecturer: 'لیکچرر',
  principal: 'پرنسپل',
  headmaster: 'ہیڈ ماسٹر',
  headmistress: 'ہیڈ مسٹریس',
  scholar: 'عالمِ دین / محقق',
  student: 'طالب علم',

  // Healthcare & Medicine
  doctor: 'ڈاکٹر / معالج',
  physician: 'طبیب / معالج',
  surgeon: 'سرجن',
  'medical officer': 'میڈیکل آفیسر',
  dentist: 'دندان ساز / ڈینٹسٹ',
  pharmacist: 'فارماسسٹ',
  nurse: 'نرس',

  // Tech & Engineering
  engineer: 'انجینئر',
  'software engineer': 'سافٹ ویئر انجینئر',
  'software developer': 'سافٹ ویئر ڈویلپر',
  developer: 'سافٹ ویئر ڈویلپر',
  programmer: 'پروگرامر',
  'civil engineer': 'سول انجینئر',
  'electrical engineer': 'الیکٹریکل انجینئر',
  'mechanical engineer': 'مکینیکل انجینئر',
  'system administrator': 'سسٹم ایڈمنسٹریٹر',
  'network engineer': 'نیٹ ورک انجینئر',
  'web developer': 'ویب ڈویلپر',
  'graphic designer': 'گرافک ڈیزائنر',
  'data analyst': 'ڈیٹا اینالسٹ',
  'it specialist': 'آئی ٹی ماہر',
  freelancer: 'فری لانسر',

  // Legal & Justice
  lawyer: 'وکیل',
  advocate: 'ایڈووکیٹ / وکیل',
  'advocate high court': 'ایڈووکیٹ ہائی کورٹ',
  'advocate supreme court': 'ایڈووکیٹ سپریم کورٹ',
  'legal advisor': 'قانونی مشیر',
  judge: 'جج',
  magistrate: 'مجسٹریٹ',

  // Business & Finance
  businessman: 'تاجر / کاروباری',
  business: 'کاروبار',
  trader: 'تاجر',
  banker: 'بینکر',
  accountant: 'اکاؤنٹنٹ',
  auditor: 'آڈیٹر',
  treasurer: 'خزانچی',
  cashier: 'کیشیئر',
  manager: 'منیجر',
  director: 'ڈائریکٹر',
  officer: 'افسر',
  clerk: 'کلرک',
  'social worker': 'سماجی کارکن',
  worker: 'کارکن',
  laborer: 'محنت کش / مزدور',
  'self employed': 'ذاتی کاروبار',

  // Civil & Public Service
  govt: 'سرکاری ملازم',
  government: 'سرکاری ملازم',
  'govt servant': 'سرکاری ملازم',
  'govt employee': 'سرکاری ملازم',
  'private job': 'نجی ملازمت',
  'private employee': 'نجی ملازم',
  retired: 'ریٹائرڈ',
  police: 'پولیس افسر',
  'police officer': 'پولیس افسر',

  // Trades & Artisans
  driver: 'ڈرائیور',
  farmer: 'کسان / کاشتکار',
  agriculturist: 'کاشتکار',
  electrician: 'الیکٹریشن',
  plumber: 'پلمبر',
  carpenter: 'بڑھئی / کارپینٹر',
  tailor: 'درزی',
  shopkeeper: 'دکاندار',
  mechanic: 'میکینک',
  journalist: 'صحافی',
  writer: 'مصنف / ادیب',
};

export const OCCUPATIONS_URDU_TO_ENG: Record<string, string> = {
  // Executive & Leadership
  'چیف ایگزیکٹو': 'Chief Executive',
  'چیف ایگزیکٹو آفیسر': 'Chief Executive Officer',
  'سی ای او': 'Chief Executive Officer (CEO)',
  'چیف ایگزیکٹو ڈائریکٹر': 'Chief Executive Director',
  'چیف آپریٹنگ آفیسر': 'Chief Operating Officer',
  'چیف فنانشل آفیسر': 'Chief Financial Officer',
  'چیف ٹیکنالوجی آفیسر': 'Chief Technology Officer',
  'ایگزیکٹو ڈائریکٹر': 'Executive Director',
  'ایگزیکٹو آفیسر': 'Executive Officer',
  'ایگزیکٹو ممبر': 'Executive Member',
  'ایگزیکٹو رکن': 'Executive Member',
  'ایگزیکٹو کونسل': 'Executive Council',
  'ایگزیکٹو کمیٹی': 'Executive Committee',
  'ایگزیکٹو باڈی': 'Executive Body',
  'ایگزیکٹو': 'Executive',
  'چیف': 'Chief',
  'چیف آرگنائزر': 'Chief Organizer',
  'چیف ایڈوائزر': 'Chief Advisor',
  'چیف کوآرڈینیٹر': 'Chief Coordinator',
  'چیف پیٹرن': 'Chief Patron',
  'چیف ایڈیٹر': 'Chief Editor',
  'چیف جسٹس': 'Chief Justice',
  'سینئر نائب صدر': 'Senior Vice President',
  'نائب صدر': 'Vice President',
  'صدر': 'President',
  'صدر انجمن': 'President of Association',
  'صدر انجمنِ ارائیں': 'President Araain Bannu',
  'جنرل سیکرٹری': 'General Secretary',
  'ایڈیشنل جنرل سیکرٹری': 'Additional General Secretary',
  'ڈپٹی جنرل سیکرٹری': 'Deputy General Secretary',
  'جوائنٹ سیکرٹری': 'Joint Secretary',
  'اسسٹنٹ سیکرٹری': 'Assistant Secretary',
  'سیکرٹری': 'Secretary',
  'فنانس سیکرٹری': 'Finance Secretary',
  'سیکرٹری مالیات': 'Finance Secretary',
  'سیکرٹری اطلاعات': 'Information Secretary',
  'اطلاعات سیکرٹری': 'Information Secretary',
  'پریس سیکرٹری': 'Press Secretary',
  'سیکرٹری نشر و اشاعت': 'Publications & Media Secretary',
  'سرپرستِ اعلیٰ': 'Patron-in-Chief',
  'سرپرست اعلیٰ': 'Patron-in-Chief',
  'سرپرست': 'Patron',
  'چیئرمین': 'Chairman',
  'وائس چیئرمین': 'Vice Chairman',
  'چیئرپرسن': 'Chairperson',
  'ڈائریکٹر': 'Director',
  'منیجنگ ڈائریکٹر': 'Managing Director',
  'ڈائریکٹر جنرل': 'Director General',
  'ڈپٹی ڈائریکٹر': 'Deputy Director',
  'اسسٹنٹ ڈائریکٹر': 'Assistant Director',
  'پروجیکٹ ڈائریکٹر': 'Project Director',
  'منیجر': 'Manager',
  'جنرل منیجر': 'General Manager',
  'سینئر منیجر': 'Senior Manager',
  'اسسٹنٹ منیجر': 'Assistant Manager',
  'پروجیکٹ منیجر': 'Project Manager',
  'برانچ منیجر': 'Branch Manager',
  'آپریشنز منیجر': 'Operations Manager',
  'کوآرڈینیٹر': 'Coordinator',
  'آرگنائزر': 'Organizer',
  'کنوینر': 'Convener',
  'انچارج': 'Incharge',
  'نگران': 'Supervisor',
  'سپروائزر': 'Supervisor',
  'ایڈمنسٹریٹر': 'Administrator',
  'کمشنر': 'Commissioner',
  'ڈپٹی کمشنر': 'Deputy Commissioner',
  'اسسٹنٹ کمشنر': 'Assistant Commissioner',
  'سماجی رہنما': 'Community Leader',
  'رکنِ شوریٰ': 'Shura Advisory Member',
  'رکن شوریٰ': 'Shura Advisory Member',

  // Education & Academia
  'استاد / مدرس': 'Teacher / Educationist',
  'استاد': 'Teacher',
  'مدرس': 'Teacher',
  'معلم': 'Teacher',
  'پروفیسر': 'Professor',
  'اسسٹنٹ پروفیسر': 'Assistant Professor',
  'ایسوسی ایٹ پروفیسر': 'Associate Professor',
  'لیکچرر': 'Lecturer',
  'پرنسپل': 'Principal',
  'ہیڈ ماسٹر': 'Headmaster',
  'ہیڈ مسٹریس': 'Headmistress',
  'طالب علم': 'Student',
  'عالمِ دین / محقق': 'Islamic Scholar',
  'عالم دین': 'Islamic Scholar',
  'عالم': 'Scholar',

  // Healthcare & Medicine
  'ڈاکٹر / معالج': 'Doctor / Physician',
  'ڈاکٹر': 'Doctor',
  'معالج': 'Physician',
  'طبیب': 'Physician',
  'سرجن': 'Surgeon',
  'میڈیکل آفیسر': 'Medical Officer',
  'ڈینٹسٹ': 'Dentist',
  'دندان ساز': 'Dentist',
  'فارماسسٹ': 'Pharmacist',
  'نرس': 'Nurse',

  // Tech & Engineering
  'انجینئر': 'Engineer',
  'سافٹ ویئر انجینئر': 'Software Engineer',
  'سافٹ ویئر ڈویلپر': 'Software Developer',
  'پروگرامر': 'Programmer',
  'سول انجینئر': 'Civil Engineer',
  'الیکٹریکل انجینئر': 'Electrical Engineer',
  'مکینیکل انجینئر': 'Mechanical Engineer',
  'سسٹم ایڈمنسٹریٹر': 'System Administrator',
  'نیٹ ورک انجینئر': 'Network Engineer',
  'ویب ڈویلپر': 'Web Developer',
  'گرافک ڈیزائنر': 'Graphic Designer',
  'ڈیٹا اینالسٹ': 'Data Analyst',
  'آئی ٹی ماہر': 'IT Specialist',
  'فری لانسر': 'Freelancer',

  // Legal & Justice
  'وکیل': 'Lawyer',
  'ایڈووکیٹ / وکیل': 'Advocate / Legal Advisor',
  'ایڈووکیٹ': 'Advocate',
  'ایڈووکیٹ ہائی کورٹ': 'Advocate High Court',
  'ایڈووکیٹ سپریم کورٹ': 'Advocate Supreme Court',
  'قانونی مشیر': 'Legal Advisor',
  'جج': 'Judge',
  'مجسٹریٹ': 'Magistrate',

  // Business & Finance
  'تاجر / کاروباری': 'Businessman / Trader',
  'تاجر': 'Businessman',
  'کاروباری': 'Businessman',
  'کاروبار': 'Business Owner',
  'بینکر': 'Banker',
  'اکاؤنٹنٹ': 'Accountant',
  'آڈیٹر': 'Auditor',
  'خزانچی': 'Treasurer',
  'کیشیئر': 'Cashier',
  'افسر': 'Officer',
  'آفیسر': 'Officer',
  'کلرک': 'Clerk',
  'سماجی کارکن': 'Social Worker',
  'کارکن': 'Community Worker',
  'محنت کش / مزدور': 'Laborer',
  'مزدور': 'Laborer',
  'ذاتی کاروبار': 'Self Employed',
  'ذاتی کام': 'Self Employed',
  'کمیونٹی ممبر': 'Community Member',

  // Civil & Public Service
  'ریٹائرڈ': 'Retired',
  'سرکاری ملازم': 'Government Servant',
  'نجی ملازم': 'Private Employee',
  'پولیس افسر': 'Police Officer',

  // Trades & Artisans
  'ڈرائیور': 'Driver',
  'کسان / کاشتکار': 'Farmer / Agriculturist',
  'کسان': 'Farmer',
  'کاشتکار': 'Agriculturist',
  'الیکٹریشن': 'Electrician',
  'پلمبر': 'Plumber',
  'بڑھئی / کارپینٹر': 'Carpenter',
  'بڑھئی': 'Carpenter',
  'درزی': 'Tailor',
  'دکاندار': 'Shopkeeper',
  'میکینک': 'Mechanic',
  'صحافی': 'Journalist',
  'مصنف / ادیب': 'Writer / Author',
  'مصنف': 'Writer',
};

// ── Leadership Roles (Urdu <-> English) ─────────────────────────────
export const LEADERSHIP_ROLES_URDU_TO_ENG: Record<string, string> = {
  // Executive Leadership
  'چیف ایگزیکٹو': 'Chief Executive',
  'چیف ایگزیکٹو آفیسر': 'Chief Executive Officer',
  'سی ای او': 'Chief Executive Officer',
  'چیف ایگزیکٹو ڈائریکٹر': 'Chief Executive Director',
  'چیف آپریٹنگ آفیسر': 'Chief Operating Officer',
  'چیف فنانشل آفیسر': 'Chief Financial Officer',
  'چیف ٹیکنالوجی آفیسر': 'Chief Technology Officer',
  'ایگزیکٹو ڈائریکٹر': 'Executive Director',
  'ایگزیکٹو آفیسر': 'Executive Officer',
  'ایگزیکٹو ممبر': 'Executive Member',
  'ایگزیکٹو رکن': 'Executive Member',
  'ایگزیکٹو کونسل': 'Executive Council',
  'ایگزیکٹو کمیٹی': 'Executive Committee',
  'ایگزیکٹو باڈی': 'Executive Body',
  'ایگزیکٹو': 'Executive',
  'چیف': 'Chief',
  'چیف آرگنائزر': 'Chief Organizer',
  'چیف ایڈوائزر': 'Chief Advisor',
  'چیف کوآرڈینیٹر': 'Chief Coordinator',
  'چیف پیٹرن': 'Chief Patron',
  'چیف ایڈیٹر': 'Chief Editor',
  'چیف جسٹس': 'Chief Justice',
  'چیف سیکرٹری': 'Chief Secretary',
  'چیف منسٹر': 'Chief Minister',

  // Governance & Association
  'صدر': 'President',
  'صدر انجمن': 'President of Association',
  'صدر انجمنِ ارائیں': 'President Araain Bannu',
  'نائب صدر': 'Vice President',
  'سینئر نائب صدر': 'Senior Vice President',
  'جنرل سیکرٹری': 'General Secretary',
  'سیکرٹری جنرل': 'Secretary General',
  'ایڈیشنل جنرل سیکرٹری': 'Additional General Secretary',
  'ڈپٹی جنرل سیکرٹری': 'Deputy General Secretary',
  'جوائنٹ سیکرٹری': 'Joint Secretary',
  'اسسٹنٹ سیکرٹری': 'Assistant Secretary',
  'سیکرٹری': 'Secretary',
  'فنانس سیکرٹری': 'Finance Secretary',
  'سیکرٹری مالیات': 'Finance Secretary',
  'سیکرٹری اطلاعات': 'Information Secretary',
  'اطلاعات سیکرٹری': 'Information Secretary',
  'پریس سیکرٹری': 'Press Secretary',
  'سیکرٹری نشر و اشاعت': 'Publications & Media Secretary',
  'سیکرٹری تعلیم': 'Education Secretary',
  'سیکرٹری صحت': 'Health Secretary',
  'سیکرٹری فلاح و بہبود': 'Welfare Secretary',
  'سیکرٹری امورِ خواتین': "Women's Wing Secretary",
  'سیکرٹری امورِ نوجوانان': 'Youth Affairs Secretary',
  'سیکرٹری لیگل': 'Legal Secretary',
  'سرپرستِ اعلیٰ': 'Patron-in-Chief',
  'سرپرست اعلیٰ': 'Patron-in-Chief',
  'سرپرست': 'Patron',
  'چیئرمین': 'Chairman',
  'وائس چیئرمین': 'Vice Chairman',
  'چیئرپرسن': 'Chairperson',
  'ڈائریکٹر': 'Director',
  'منیجنگ ڈائریکٹر': 'Managing Director',
  'ڈائریکٹر جنرل': 'Director General',
  'ڈپٹی ڈائریکٹر': 'Deputy Director',
  'اسسٹنٹ ڈائریکٹر': 'Assistant Director',
  'پروجیکٹ ڈائریکٹر': 'Project Director',
  'منیجر': 'Manager',
  'جنرل منیجر': 'General Manager',
  'سینئر منیجر': 'Senior Manager',
  'اسسٹنٹ منیجر': 'Assistant Manager',
  'پروجیکٹ منیجر': 'Project Manager',
  'برانچ منیجر': 'Branch Manager',
  'آپریشنز منیجر': 'Operations Manager',
  'کوآرڈینیٹر': 'Coordinator',
  'آرگنائزر': 'Organizer',
  'کنوینر': 'Convener',
  'انچارج': 'Incharge',
  'نگران': 'Supervisor',
  'سپروائزر': 'Supervisor',
  'ایڈمنسٹریٹر': 'Administrator',
  'آفیسر': 'Officer',
  'افسر': 'Officer',
  'کمشنر': 'Commissioner',
  'ڈپٹی کمشنر': 'Deputy Commissioner',
  'اسسٹنٹ کمشنر': 'Assistant Commissioner',
  'قانونی مشیر': 'Legal Advisor',
  'مشیر': 'Advisor',
  'آڈیٹر': 'Auditor',
  'خزانچی': 'Treasurer',
  'کیشیئر': 'Cashier',
  'رکنِ شوریٰ': 'Shura Advisory Member',
  'رکن شوریٰ': 'Shura Advisory Member',
  'سماجی رہنما': 'Community Leader',
};

export const LEADERSHIP_ROLES_ENG_TO_URDU: Record<string, string> = {
  'chief executive': 'چیف ایگزیکٹو',
  'chief executive officer': 'چیف ایگزیکٹو آفیسر',
  'ceo': 'چیف ایگزیکٹو آفیسر',
  'chief executive director': 'چیف ایگزیکٹو ڈائریکٹر',
  'chief operating officer': 'چیف آپریٹنگ آفیسر',
  'chief financial officer': 'چیف فنانشل آفیسر',
  'chief technology officer': 'چیف ٹیکنالوجی آفیسر',
  'executive director': 'ایگزیکٹو ڈائریکٹر',
  'executive officer': 'ایگزیکٹو آفیسر',
  'executive member': 'ایگزیکٹو ممبر',
  'executive council': 'ایگزیکٹو کونسل',
  'executive committee': 'ایگزیکٹو کمیٹی',
  'executive body': 'ایگزیکٹو باڈی',
  'executive': 'ایگزیکٹو',
  'chief': 'چیف',
  'chief organizer': 'چیف آرگنائزر',
  'chief advisor': 'چیف ایڈوائزر',
  'chief coordinator': 'چیف کوآرڈینیٹر',
  'chief patron': 'چیف پیٹرن',
  'chief editor': 'چیف ایڈیٹر',
  'chief justice': 'چیف جسٹس',
  'senior vice president': 'سینئر نائب صدر',
  'vice president': 'نائب صدر',
  'president': 'صدر',
  'president of association': 'صدر انجمن',
  'general secretary': 'جنرل سیکرٹری',
  'additional general secretary': 'ایڈیشنل جنرل سیکرٹری',
  'deputy general secretary': 'ڈپٹی جنرل سیکرٹری',
  'joint secretary': 'جوائنٹ سیکرٹری',
  'assistant secretary': 'اسسٹنٹ سیکرٹری',
  'secretary': 'سیکرٹری',
  'finance secretary': 'فنانس سیکرٹری',
  'information secretary': 'اطلاعات سیکرٹری',
  'press secretary': 'پریس سیکرٹری',
  'publications & media secretary': 'سیکرٹری نشر و اشاعت',
  'publications secretary': 'سیکرٹری نشر و اشاعت',
  'education secretary': 'سیکرٹری تعلیم',
  'health secretary': 'سیکرٹری صحت',
  'welfare secretary': 'سیکرٹری فلاح و بہبود',
  "women's wing secretary": 'سیکرٹری امورِ خواتین',
  'youth affairs secretary': 'سیکرٹری امورِ نوجوانان',
  'legal secretary': 'سیکرٹری لیگل',
  'patron-in-chief': 'سرپرست اعلیٰ',
  'patron in chief': 'سرپرست اعلیٰ',
  'patron': 'سرپرست',
  'chairman': 'چیئرمین',
  'vice chairman': 'وائس چیئرمین',
  'chairperson': 'چیئرپرسن',
  'managing director': 'منیجنگ ڈائریکٹر',
  'director general': 'ڈائریکٹر جنرل',
  'deputy director': 'ڈپٹی ڈائریکٹر',
  'assistant director': 'اسسٹنٹ ڈائریکٹر',
  'project director': 'پروجیکٹ ڈائریکٹر',
  'director': 'ڈائریکٹر',
  'general manager': 'جنرل منیجر',
  'senior manager': 'سینئر منیجر',
  'assistant manager': 'اسسٹنٹ منیجر',
  'project manager': 'پروجیکٹ منیجر',
  'branch manager': 'برانچ منیجر',
  'operations manager': 'آپریشنز منیجر',
  'manager': 'منیجر',
  'coordinator': 'کوآرڈینیٹر',
  'organizer': 'آرگنائزر',
  'convener': 'کنوینر',
  'incharge': 'انچارج',
  'supervisor': 'نگران',
  'administrator': 'ایڈمنسٹریٹر',
  'commissioner': 'کمشنر',
  'deputy commissioner': 'ڈپٹی کمشنر',
  'assistant commissioner': 'اسسٹنٹ کمشنر',
  'legal advisor': 'قانونی مشیر',
  'advisor': 'مشیر',
  'auditor': 'آڈیٹر',
  'treasurer': 'خزانچی',
  'cashier': 'کیشیئر',
  'shura advisory member': 'رکنِ شوریٰ',
  'community leader': 'سماجی رہنما',
  'officer': 'آفیسر',
};

// ── Compound Title Morphological Analyzers ──────────────────────────

const TITLE_PREFIXES_URDU_TO_ENG: Record<string, string> = {
  'چیف': 'Chief',
  'ڈپٹی': 'Deputy',
  'اسسٹنٹ': 'Assistant',
  'ایڈیشنل': 'Additional',
  'جوائنٹ': 'Joint',
  'سینئر': 'Senior',
  'جونیئر': 'Junior',
  'نائب': 'Vice',
  'وائس': 'Vice',
  'کو': 'Co-',
  'ہیڈ': 'Head',
  'پرنسپل': 'Principal',
  'ایگزیکٹو': 'Executive',
  'جنرل': 'General',
  'منیجنگ': 'Managing',
  'ایسوسی ایٹ': 'Associate',
  'پراجیکٹ': 'Project',
  'پروجیکٹ': 'Project',
  'آپریشنز': 'Operations',
  'ریجنل': 'Regional',
  'علاقائی': 'Regional',
  'نیشنل': 'National',
  'قومی': 'National',
  'سینٹرل': 'Central',
  'مرکزی': 'Central',
  'لوکل': 'Local',
  'مقامی': 'Local',
  'فنانس': 'Finance',
  'مالیات': 'Finance',
  'قانونی': 'Legal',
  'طبی': 'Medical',
  'تعلیمی': 'Education',
  'پریس': 'Press',
  'میڈیا': 'Media',
  'اطلاعات': 'Information',
  'نشر و اشاعت': 'Publications & Media',
  'امورِ نوجوانان': 'Youth Affairs',
  'امور نوجوانان': 'Youth Affairs',
  'امورِ خواتین': "Women's Wing",
  'امور خواتین': "Women's Wing",
  'فلاح و بہبود': 'Welfare & Relief',
  'فلاحی': 'Welfare',
};

const TITLE_NOUNS_URDU_TO_ENG: Record<string, string> = {
  'ایگزیکٹو': 'Executive',
  'آفیسر': 'Officer',
  'افسر': 'Officer',
  'ڈائریکٹر': 'Director',
  'منیجر': 'Manager',
  'سیکرٹری': 'Secretary',
  'صدر': 'President',
  'چیئرمین': 'Chairman',
  'چیئرپرسن': 'Chairperson',
  'کوآرڈینیٹر': 'Coordinator',
  'آرگنائزر': 'Organizer',
  'ایڈوائزر': 'Advisor',
  'مشیر': 'Advisor',
  'پیٹرن': 'Patron',
  'سرپرست': 'Patron',
  'سرپرست اعلیٰ': 'Patron-in-Chief',
  'سرپرستِ اعلیٰ': 'Patron-in-Chief',
  'کونسلر': 'Counselor',
  'کنوینر': 'Convener',
  'انچارج': 'Incharge',
  'نگران': 'Supervisor',
  'سپروائزر': 'Supervisor',
  'ایڈمنسٹریٹر': 'Administrator',
  'آڈیٹر': 'Auditor',
  'اکاؤنٹنٹ': 'Accountant',
  'خزانچی': 'Treasurer',
  'کیشیئر': 'Cashier',
  'انجینئر': 'Engineer',
  'ڈاکٹر': 'Doctor',
  'پروفیسر': 'Professor',
  'لیکچرر': 'Lecturer',
  'استاد': 'Teacher',
  'مدرس': 'Teacher',
  'وکیل': 'Lawyer',
  'ایڈووکیٹ': 'Advocate',
  'جج': 'Judge',
  'جسٹس': 'Justice',
  'ممبر': 'Member',
  'رکن': 'Member',
  'اراکین': 'Members',
  'باڈی': 'Body',
  'کمیٹی': 'Committee',
  'کونسل': 'Council',
  'شوریٰ': 'Shura Advisory',
  'کمشنر': 'Commissioner',
  'ناظم': 'Nazim',
  'قائد': 'Leader',
  'رہنما': 'Leader',
  'سربراہ': 'Head',
};

const QUALIFIERS_URDU_TO_ENG: Record<string, string> = {
  'بنوں': 'Bannu',
  'خیبر پختونخوا': 'KPK',
  'کے پی کے': 'KPK',
  'پشاور': 'Peshawar',
  'پاکستان': 'Pakistan',
  'عالمی': 'Global',
  'مرکزی': 'Central',
  'علاقائی': 'Regional',
  'پنجاب': 'Punjab',
  'سندھ': 'Sindh',
  'اسلام آباد': 'Islamabad',
};

const TITLE_PREFIXES_ENG_TO_URDU: Record<string, string> = {
  chief: 'چیف',
  deputy: 'ڈپٹی',
  assistant: 'اسسٹنٹ',
  additional: 'ایڈیشنل',
  joint: 'جوائنٹ',
  senior: 'سینئر',
  junior: 'جونیئر',
  vice: 'نائب',
  'co-': 'کو',
  co: 'کو',
  head: 'ہیڈ',
  principal: 'پرنسپل',
  executive: 'ایگزیکٹو',
  general: 'جنرل',
  managing: 'منیجنگ',
  associate: 'ایسوسی ایٹ',
  project: 'پروجیکٹ',
  operations: 'آپریشنز',
  regional: 'علاقائی',
  national: 'قومی',
  central: 'مرکزی',
  local: 'مقامی',
  finance: 'فنانس',
  legal: 'قانونی',
  medical: 'میڈیکل',
  press: 'پریس',
  media: 'میڈیا',
  information: 'اطلاعات',
};

const TITLE_NOUNS_ENG_TO_URDU: Record<string, string> = {
  executive: 'ایگزیکٹو',
  officer: 'آفیسر',
  director: 'ڈائریکٹر',
  manager: 'منیجر',
  secretary: 'سیکرٹری',
  president: 'صدر',
  chairman: 'چیئرمین',
  chairperson: 'چیئرپرسن',
  coordinator: 'کوآرڈینیٹر',
  organizer: 'آرگنائزر',
  advisor: 'ایڈوائزر',
  patron: 'سرپرست',
  counselor: 'کونسلر',
  convener: 'کنوینر',
  incharge: 'انچارج',
  supervisor: 'نگران',
  administrator: 'ایڈمنسٹریٹر',
  auditor: 'آڈیٹر',
  accountant: 'اکاؤنٹنٹ',
  treasurer: 'خزانچی',
  cashier: 'کیشیئر',
  engineer: 'انجینئر',
  doctor: 'ڈاکٹر',
  professor: 'پروفیسر',
  lecturer: 'لیکچرر',
  teacher: 'استاد',
  lawyer: 'وکیل',
  advocate: 'ایڈووکیٹ',
  judge: 'جج',
  justice: 'جسٹس',
  member: 'رکن',
  body: 'باڈی',
  committee: 'کمیٹی',
  council: 'کونسل',
  commissioner: 'کمشنر',
  leader: 'رہنما',
};

const QUALIFIERS_ENG_TO_URDU: Record<string, string> = {
  bannu: 'بنوں',
  kpk: 'خیبر پختونخوا',
  pakistan: 'پاکستان',
  global: 'عالمی',
  central: 'مرکزی',
  regional: 'علاقائی',
  punjab: 'پنجاب',
  sindh: 'سندھ',
  islamabad: 'اسلام آباد',
};

/**
 * Accurately analyzes compound titles and roles from Urdu to English
 * (e.g. "چیف ایگزیکٹو", "ڈپٹی چیف کوآرڈینیٹر", "سینئر نائب صدر (بنوں)")
 */
export function translateCompoundTitleToEnglish(text: string): string | null {
  if (!text || typeof text !== 'string') return null;
  let trimmed = text.trim();

  // Extract qualifier in parentheses e.g. "چیف ایگزیکٹو (بنوں)"
  let qualifier = '';
  const parenMatch = trimmed.match(/^(.+?)\s*[\(（]([^\)）]+)[\)）]\s*$/);
  if (parenMatch) {
    trimmed = parenMatch[1].trim();
    const qContent = parenMatch[2].trim();
    qualifier = QUALIFIERS_URDU_TO_ENG[qContent] || qContent;
  }

  // Check direct leadership and occupation maps first
  if (LEADERSHIP_ROLES_URDU_TO_ENG[trimmed]) {
    const base = LEADERSHIP_ROLES_URDU_TO_ENG[trimmed];
    return qualifier ? `${base} (${qualifier})` : base;
  }
  if (OCCUPATIONS_URDU_TO_ENG[trimmed]) {
    const base = OCCUPATIONS_URDU_TO_ENG[trimmed];
    return qualifier ? `${base} (${qualifier})` : base;
  }

  // Morphological prefix + noun combination
  const words = trimmed.split(/\s+/);
  if (words.length >= 2) {
    const parts: string[] = [];
    let allMatched = true;
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (TITLE_PREFIXES_URDU_TO_ENG[w]) {
        parts.push(TITLE_PREFIXES_URDU_TO_ENG[w]);
      } else if (TITLE_NOUNS_URDU_TO_ENG[w]) {
        parts.push(TITLE_NOUNS_URDU_TO_ENG[w]);
      } else {
        allMatched = false;
        break;
      }
    }
    if (allMatched && parts.length > 0) {
      const translatedBase = parts.join(' ');
      return qualifier ? `${translatedBase} (${qualifier})` : translatedBase;
    }
  }

  return null;
}

/**
 * Accurately translates compound titles and roles from English to Urdu
 * (e.g. "Chief Executive", "Senior Vice President", "Executive Director (Bannu)")
 */
export function translateCompoundTitleToUrdu(text: string): string | null {
  if (!text || typeof text !== 'string') return null;
  let trimmed = text.trim();

  // Extract qualifier in parentheses e.g. "Chief Executive (Bannu)"
  let qualifier = '';
  const parenMatch = trimmed.match(/^(.+?)\s*[\(（]([^\)）]+)[\)）]\s*$/);
  if (parenMatch) {
    trimmed = parenMatch[1].trim();
    const qContent = parenMatch[2].trim().toLowerCase();
    qualifier = QUALIFIERS_ENG_TO_URDU[qContent] || parenMatch[2].trim();
  }

  const key = trimmed.toLowerCase();
  if (LEADERSHIP_ROLES_ENG_TO_URDU[key]) {
    const base = LEADERSHIP_ROLES_ENG_TO_URDU[key];
    return qualifier ? `${base} (${qualifier})` : base;
  }
  if (OCCUPATIONS_DICT[key]) {
    const base = OCCUPATIONS_DICT[key];
    return qualifier ? `${base} (${qualifier})` : base;
  }

  const words = key.split(/\s+/);
  if (words.length >= 2) {
    const parts: string[] = [];
    let allMatched = true;
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (TITLE_PREFIXES_ENG_TO_URDU[w]) {
        parts.push(TITLE_PREFIXES_ENG_TO_URDU[w]);
      } else if (TITLE_NOUNS_ENG_TO_URDU[w]) {
        parts.push(TITLE_NOUNS_ENG_TO_URDU[w]);
      } else {
        allMatched = false;
        break;
      }
    }
    if (allMatched && parts.length > 0) {
      const translatedBase = parts.join(' ');
      return qualifier ? `${translatedBase} (${qualifier})` : translatedBase;
    }
  }

  return null;
}

// ── Membership Types (Urdu <-> English) ─────────────────────────────
export const MEMBERSHIP_TYPES_DICT: Record<string, string> = {
  'general member': 'عام رکن',
  'active member': 'باقاعدہ رکن',
  'life member': 'تاحیات رکن',
  'student member': 'طالب علم رکن',
  'senior citizen / patron': 'سرپرست رکن',
  'senior member': 'سینئر رکن',
  patron: 'سرپرست',
  'youth wing': 'یوتھ ونگ',
  executive: 'ایگزیکٹو رکن',
  volunteer: 'رضاکار رکن',
};

export const MEMBERSHIP_TYPES_URDU_TO_ENG: Record<string, string> = {
  'عام رکن': 'General Member',
  'باقاعدہ رکن': 'Active Member',
  'تاحیات رکن': 'Life Member',
  'طالب علم رکن': 'Student Member',
  'سرپرست رکن': 'Patron Member',
  'سینئر رکن': 'Senior Member',
  'سرپرست': 'Patron',
  'یوتھ ونگ': 'Youth Wing',
  'ایگزیکٹو رکن': 'Executive Member',
  'رضاکار رکن': 'Volunteer Member',
};

// ── Residential Status (Urdu <-> English) ───────────────────────────
export const RESIDENTIAL_STATUS_DICT: Record<string, string> = {
  'resident (pakistan)': 'مستقل رہائشی (پاکستان)',
  resident: 'مستقل رہائشی',
  'overseas pakistani': 'اوورسیز پاکستانی',
  overseas: 'اوورسیز',
  'temporary resident': 'عارضی رہائشی',
};

export const RESIDENTIAL_STATUS_URDU_TO_ENG: Record<string, string> = {
  'مستقل رہائشی (پاکستان)': 'Resident (Pakistan)',
  'مستقل رہائشی': 'Resident (Pakistan)',
  'اوورسیز پاکستانی': 'Overseas Pakistani',
  'اوورسیز': 'Overseas Pakistani',
  'عارضی رہائشی': 'Temporary Resident',
};

// ── Education Levels (Urdu <-> English) ─────────────────────────────
export const EDUCATION_DICT: Record<string, string> = {
  matric: 'میٹرک',
  matriculation: 'میٹرک',
  'intermediate / f.a / f.sc': 'انٹرمیڈیٹ (ایف اے / ایف ایس سی)',
  intermediate: 'انٹرمیڈیٹ',
  fa: 'ایف اے',
  fsc: 'ایف ایس سی',
  "bachelor's degree": 'گریجویشن / بی اے / بی ایس سی',
  bachelor: 'گریجویشن',
  ba: 'بی اے',
  bsc: 'بی ایس سی',
  bs: 'بی ایس',
  "master's degree": 'ماسٹرز / ایم اے / ایم ایس سی',
  master: 'ماسٹرز',
  ma: 'ایم اے',
  msc: 'ایم ایس سی',
  ms: 'ایم ایس',
  'm.phil / ms': 'ایم فل / ایم ایس',
  mphil: 'ایم فل',
  'ph.d': 'پی ایچ ڈی / ڈاکٹر آف فلاسفی',
  phd: 'پی ایچ ڈی',
  'dars-e-nizami / islamic studies': 'درسِ نظامی / اسلامی علوم',
  'dars-e-nizami': 'درسِ نظامی',
  'technical / diploma': 'ٹیکنیکل ڈپلومہ',
  diploma: 'ڈپلومہ',
};

export const EDUCATION_URDU_TO_ENG: Record<string, string> = {
  'میٹرک': 'Matriculation',
  'انٹرمیڈیٹ (ایف اے / ایف ایس سی)': 'Intermediate (F.A / F.Sc)',
  'انٹرمیڈیٹ': 'Intermediate',
  'ایف اے': 'F.A',
  'ایف ایس سی': 'F.Sc',
  'گریجویشن / بی اے / بی ایس سی': "Bachelor's Degree (B.A / B.Sc / B.S)",
  'گریجویشن': "Bachelor's Degree",
  'بی اے': 'B.A',
  'بی ایس سی': 'B.Sc',
  'بی ایس': 'B.S',
  'ماسٹرز / ایم اے / ایم ایس سی': "Master's Degree (M.A / M.Sc)",
  'ماسٹرز': "Master's Degree",
  'ایم اے': 'M.A',
  'ایم ایس سی': 'M.Sc',
  'ایم ایس': 'M.S',
  'ایم فل / ایم ایس': 'M.Phil / M.S',
  'ایم فل': 'M.Phil',
  'پی ایچ ڈی / ڈاکٹر آف فلاسفی': 'Ph.D',
  'پی ایچ ڈی': 'Ph.D',
  'درسِ نظامی / اسلامی علوم': 'Dars-e-Nizami (Islamic Studies)',
  'درسِ نظامی': 'Dars-e-Nizami',
  'درس نظامی': 'Dars-e-Nizami',
  'ٹیکنیکل ڈپلومہ': 'Technical Diploma',
  'ڈپلومہ': 'Diploma',
};

// ── Months (Urdu <-> English) ───────────────────────────────────────
export const MONTHS_URDU_TO_ENG: Record<string, string> = {
  'جنوری': 'January',
  'فروری': 'February',
  'مارچ': 'March',
  'اپریل': 'April',
  'مئی': 'May',
  'جون': 'June',
  'جولائی': 'July',
  'اگست': 'August',
  'ستمبر': 'September',
  'اکتوبر': 'October',
  'نومبر': 'November',
  'دسمبر': 'December',
};

export const MONTHS_ENG_TO_URDU: Record<string, string> = {
  january: 'جنوری',
  jan: 'جنوری',
  february: 'فروری',
  feb: 'فروری',
  march: 'مارچ',
  mar: 'مارچ',
  april: 'اپریل',
  apr: 'اپریل',
  may: 'مئی',
  june: 'جون',
  jun: 'جون',
  july: 'جولائی',
  jul: 'جولائی',
  august: 'اگست',
  aug: 'اگست',
  september: 'ستمبر',
  sep: 'ستمبر',
  sept: 'ستمبر',
  october: 'اکتوبر',
  oct: 'اکتوبر',
  november: 'نومبر',
  nov: 'نومبر',
  december: 'دسمبر',
  dec: 'دسمبر',
};

// ── General Vocabulary (English -> Urdu) ────────────────────────────
export const GENERAL_VOCAB_ENG_TO_URDU: Record<string, string> = {
  welcome: 'خوش آمدید',
  community: 'برادری',
  communities: 'برادریاں',
  organization: 'تنظیم',
  association: 'تنظیم',
  empowering: 'بااختیار بنانا',
  empower: 'بااختیار بنانا',
  empowered: 'بااختیار',
  next: 'آئندہ',
  generation: 'نسل',
  generations: 'نسلیں',
  proud: 'فخر',
  pride: 'فخر',
  heritage: 'ورثہ',
  uniting: 'متحد کرنا',
  unite: 'متحد',
  united: 'متحد',
  unity: 'اتحاد',
  worldwide: 'دنیا بھر میں',
  global: 'عالمی',
  movement: 'تحریک',
  strength: 'طاقت',
  progress: 'ترقی',
  join: 'شامل ہوں',
  legacy: 'ورثہ و تاریخ',
  development: 'ترقی',
  welfare: 'فلاح و بہبود',
  dedicated: 'وقف',
  dedication: 'لگن',
  advancement: 'ترقی و بہبود',
  socioeconomic: 'سماجی و معاشی',
  socio: 'سماجی',
  economic: 'معاشی',
  social: 'سماجی',
  represents: 'نمائندگی کرتی ہے',
  represent: 'نمائندگی',
  thousands: 'ہزاروں',
  families: 'خاندان',
  family: 'خاندان',
  across: 'بھر میں',
  diaspora: 'اوورسیز برادری',
  driven: 'متحرک',
  shared: 'مشترکہ',
  commitment: 'عزم',
  education: 'تعلیم',
  educational: 'تعلیمی',
  sustainable: 'پائیدار',
  strategic: 'حکمت عملی',
  initiatives: 'منصوبے',
  initiative: 'منصوبہ',
  scholarships: 'تعلیمی وظائف',
  scholarship: 'تعلیمی وظیفہ',
  centers: 'مراکز',
  center: 'مرکز',
  mentorship: 'رہنمائی',
  mentor: 'رہنما',
  bridges: 'پل',
  bridge: 'پل',
  traditions: 'روایات',
  tradition: 'روایت',
  modern: 'جدید',
  opportunities: 'مواقع',
  opportunity: 'موقع',
  regional: 'علاقائی',
  chapter: 'شاخ',
  grassroots: 'نچلی سطح',
  pillar: 'ستون',
  support: 'تعاون و امداد',
  counseling: 'رہنمائی',
  cohesion: 'یکجہتی',
  southern: 'جنوبی',
  greatest: 'عظیم ترین',
  invest: 'سرمایہ کاری',
  youth: 'نوجوان',
  stand: 'ساتھ کھڑے ہونا',
  foundation: 'بنیاد',
  endures: 'قائم رہتی ہے',
  active: 'فعال',
  members: 'اراکین',
  member: 'رکن',
  membership: 'رکنیت',
  cities: 'شہر',
  city: 'شہر',
  programs: 'پروگرامز',
  program: 'پروگرام',
  core: 'بنیادی',
  events: 'تقریبات',
  event: 'تقریب',
  upcoming: 'آئندہ',
  leadership: 'قیادت',
  leader: 'رہنما',
  leaders: 'رہنما',
  gallery: 'تصویری گیلری',
  photos: 'تصاویر',
  photo: 'تصویر',
  contact: 'رابطہ',
  office: 'مرکزی دفتر',
  hours: 'اوقات کار',
  working: 'کام کے',
  monday: 'پیر',
  tuesday: 'منگل',
  wednesday: 'بدھ',
  thursday: 'جمعرات',
  friday: 'جمعہ',
  saturday: 'ہفتہ',
  sunday: 'اتوار',
  morning: 'صبح',
  evening: 'شام',
  afternoon: 'دوپہر',
  night: 'رات',
  all: 'تمام',
  rights: 'حقوق',
  reserved: 'محفوظ',
  copyright: 'حقوق اشاعت',
  president: 'صدر',
  vice: 'نائب',
  secretary: 'سیکرٹری',
  treasurer: 'خزانچی',
  chairman: 'چیئرمین',
  patron: 'سرپرست اعلیٰ',
  chief: 'چیف',
  general: 'جنرل',
  senior: 'سینئر',
  medical: 'طبی',
  health: 'صحت',
  camp: 'کیمپ',
  camps: 'کیمپس',
  blood: 'خون',
  donation: 'عطیہ',
  donations: 'عطیات',
  donate: 'عطیہ دیں',
  relief: 'امدادی',
  emergency: 'ہنگامی',
  fund: 'فنڈ',
  funds: 'فنڈز',
  aid: 'امداد',
  free: 'مفت',
  clean: 'صاف',
  water: 'پانی',
  ration: 'راشن',
  food: 'خوراک',
  school: 'اسکول',
  college: 'کالج',
  university: 'یونیورسٹی',
  degree: 'ڈگری',
  matric: 'میٹرک',
  intermediate: 'انٹرمیڈیٹ',
  bachelors: 'بیچلرز',
  masters: 'ماسٹرز',
  doctorate: 'ڈاکٹریٹ',
  doctor: 'ڈاکٹر',
  engineer: 'انجینئر',
  teacher: 'استاد',
  businessman: 'تاجر',
  business: 'کاروبار',
  advocate: 'وکیل',
  lawyer: 'وکیل',
  student: 'طالب علم',
  resident: 'مستقل رہائشی',
  overseas: 'اوورسیز',
  pakistan: 'پاکستان',
  bannu: 'بنوں',
  peshawar: 'پشاور',
  kohat: 'کوہاٹ',
  lahore: 'لاہور',
  islamabad: 'اسلام آباد',
  karachi: 'کراچی',
  khyber: 'خیبر',
  pakhtunkhwa: 'پختونخوا',
  district: 'ضلع',
  province: 'صوبہ',
  country: 'ملک',
  male: 'مرد',
  female: 'خاتون',
  phone: 'فون',
  mobile: 'موبائل',
  address: 'پتہ',
  street: 'گلی',
  house: 'مکان',
  area: 'علاقہ',
  card: 'شناختی کارڈ',
  registration: 'اندراج',
  apply: 'درخواست دیں',
  submit: 'جمع کرائیں',
  verified: 'تصدیق شدہ',
  verify: 'تصدیق کریں',
  status: 'حیثیت',
  approved: 'منظور شدہ',
  pending: 'زیر غور',
  rejected: 'مسترد',
  new: 'نیا',
  name: 'نام',
  father: 'والد کا نام',
  cnic: 'شناختی کارڈ نمبر',
  dob: 'تاریخ پیدائش',
  gender: 'جنس',
  profession: 'پیشہ',
  occupation: 'پیشہ',
  about: 'ہمارا تعارف',
  services: 'خدمات',
  news: 'خبریں',
  blog: 'بلاگ',
  history: 'تاریخ',
  department: 'شعبہ جات',
  departments: 'شعبہ جات',
  environmental: 'ماحولیات',
  documentation: 'دستاویزات',
  bylaws: 'قواعد و ضوابط',
  aims: 'مقاصد',
  vision: 'نظریہ',
  mission: 'مشن',
  values: 'اقدار',
  executive: 'ایگزیکٹو',
  officer: 'آفیسر',
  director: 'ڈائریکٹر',
  manager: 'منیجر',
  coordinator: 'کوآرڈینیٹر',
  organizer: 'آرگنائزر',
  advisor: 'ایڈوائزر',
  consultant: 'مشیر',
  commissioner: 'کمشنر',
  assistant: 'اسسٹنٹ',
  deputy: 'ڈپٹی',
  additional: 'ایڈیشنل',
  joint: 'جوائنٹ',
  junior: 'جونیئر',
  head: 'ہیڈ',
  principal: 'پرنسپل',
  professor: 'پروفیسر',
  lecturer: 'لیکچرر',
  software: 'سافٹ ویئر',
  developer: 'ڈویلپر',
  system: 'سسٹم',
  network: 'نیٹ ورک',
  computer: 'کمپیوٹر',
  committee: 'کمیٹی',
  council: 'کونسل',
  board: 'بورڈ',
  body: 'باڈی',
  wing: 'ونگ',
  cell: 'سیل',
  desk: 'ڈیسک',
  unit: 'یونٹ',
};

// ── General Vocabulary (Urdu -> English) ────────────────────────────
export const GENERAL_VOCAB_URDU_TO_ENG: Record<string, string> = {
  'خوش آمدید': 'Welcome',
  'برادری': 'Community',
  'برادریاں': 'Communities',
  'تنظیم': 'Organization',
  'بااختیار': 'Empowered',
  'نسل': 'Generation',
  'نسلوں': 'Generations',
  'ورثہ': 'Heritage',
  'متحد': 'United',
  'اتحاد': 'Unity',
  'ترقی': 'Progress',
  'فلاح': 'Welfare',
  'بہبود': 'Well-being',
  'تعلیم': 'Education',
  'تعلیمی': 'Educational',
  'صحت': 'Health',
  'طبی': 'Medical',
  'خاندان': 'Family',
  'خاندانوں': 'Families',
  'وظائف': 'Scholarships',
  'وظیفہ': 'Scholarship',
  'مستحق': 'Deserving',
  'امداد': 'Assistance',
  'چیف': 'Chief',
  'ایگزیکٹو': 'Executive',
  'صدر': 'President',
  'نائب': 'Vice',
  'سیکرٹری': 'Secretary',
  'خزانچی': 'Treasurer',
  'چیئرمین': 'Chairman',
  'چیئرپرسن': 'Chairperson',
  'سرپرست': 'Patron',
  'سرپرست اعلیٰ': 'Patron-in-Chief',
  'سرپرستِ اعلیٰ': 'Patron-in-Chief',
  'ڈائریکٹر': 'Director',
  'منیجر': 'Manager',
  'کوآرڈینیٹر': 'Coordinator',
  'آرگنائزر': 'Organizer',
  'ایڈوائزر': 'Advisor',
  'مشیر': 'Advisor',
  'آفیسر': 'Officer',
  'افسر': 'Officer',
  'کمشنر': 'Commissioner',
  'اسسٹنٹ': 'Assistant',
  'ڈپٹی': 'Deputy',
  'ایڈیشنل': 'Additional',
  'جوائنٹ': 'Joint',
  'سینئر': 'Senior',
  'جونیئر': 'Junior',
  'ہیڈ': 'Head',
  'پرنسپل': 'Principal',
  'پروفیسر': 'Professor',
  'لیکچرر': 'Lecturer',
  'کمیٹی': 'Committee',
  'کونسل': 'Council',
  'بورڈ': 'Board',
  'باڈی': 'Body',
  'ونگ': 'Wing',
  'سیل': 'Cell',
  'ڈیسک': 'Desk',
  'یونٹ': 'Unit',
  'سافٹ ویئر': 'Software',
  'ڈویلپر': 'Developer',
  'کمپیوٹر': 'Computer',
  'سسٹم': 'System',
  'نیٹ ورک': 'Network',
  'رکن': 'Member',
  'اراکین': 'Members',
  'رکنیت': 'Membership',
  'پروگرام': 'Program',
  'پروگرامز': 'Programs',
  'تقریب': 'Event',
  'تقریبات': 'Events',
  'گیلری': 'Gallery',
  'تصاویر': 'Photographs',
  'تصویر': 'Photo',
  'عطیہ': 'Donation',
  'عطیات': 'Donations',
  'راشن': 'Food Ration',
  'پانی': 'Water',
  'دفتر': 'Office',
  'پتہ': 'Address',
  'گلی': 'Street',
  'محلہ': 'Mohallah',
  'شہر': 'City',
  'ضلع': 'District',
  'صوبہ': 'Province',
  'ملک': 'Country',
  'مرد': 'Male',
  'خاتون': 'Female',
  'طالب علم': 'Student',
  'استاد': 'Teacher',
  'وکیل': 'Advocate',
  'تاجر': 'Businessman',
  'کاروبار': 'Business',
  'ڈاکٹر': 'Doctor',
  'انجینئر': 'Engineer',
  'بینک': 'Bank',
  'شاخ': 'Branch',
  'پیر': 'Monday',
  'منگل': 'Tuesday',
  'بدھ': 'Wednesday',
  'جمعرات': 'Thursday',
  'جمعہ': 'Friday',
  'ہفتہ': 'Saturday',
  'اتوار': 'Sunday',
  'صبح': 'Morning',
  'شام': 'Evening',
  'دوپہر': 'Afternoon',
  'رات': 'Night',
  'حکمت عملی': 'Strategy',
  'پائیدار': 'Sustainable',
  'منصوبہ': 'Project',
  'منصوبے': 'Projects',
  'مشن': 'Mission',
  'نظریہ': 'Vision',
  'تاریخ': 'History',
  'بلاگ': 'Blog',
  'خبریں': 'News',
  'دستاویزات': 'Documentation',
  'ماحولیات': 'Environmental',
  'شعبہ جات': 'Departments',
  'بنیاد': 'Foundation',
  'طاقت': 'Strength',
  'عالمی': 'Global',
  'تحریک': 'Movement',
  'محفوظ': 'Reserved',
  'حقوق': 'Rights',
  'تمام': 'All',
  'بنوں': 'Bannu',
  'پشاور': 'Peshawar',
  'کوہاٹ': 'Kohat',
  'لاہور': 'Lahore',
  'اسلام آباد': 'Islamabad',
  'کراچی': 'Karachi',
  'خیبر پختونخوا': 'Khyber Pakhtunkhwa',
  'پاکستان': 'Pakistan',
  'آرائیں': 'Arain',
  'ارائیں': 'Arain',
};

// ── Common CMS Phrases (Urdu -> English) ────────────────────────────
export const COMMON_PHRASES_URDU_TO_ENG: [RegExp, string][] = [
  // Executive and Leadership Compound Roles
  [/چیف ایگزیکٹو آفیسر/gi, 'Chief Executive Officer'],
  [/چیف ایگزیکٹو ڈائریکٹر/gi, 'Chief Executive Director'],
  [/چیف ایگزیکٹو/gi, 'Chief Executive'],
  [/ایگزیکٹو ڈائریکٹر/gi, 'Executive Director'],
  [/ایگزیکٹو آفیسر/gi, 'Executive Officer'],
  [/ایگزیکٹو ممبر/gi, 'Executive Member'],
  [/ایگزیکٹو رکن/gi, 'Executive Member'],
  [/ایگزیکٹو کونسل/gi, 'Executive Council'],
  [/ایگزیکٹو کمیٹی/gi, 'Executive Committee'],
  [/ایگزیکٹو باڈی/gi, 'Executive Body'],
  [/چیف آرگنائزر/gi, 'Chief Organizer'],
  [/چیف ایڈوائزر/gi, 'Chief Advisor'],
  [/چیف کوآرڈینیٹر/gi, 'Chief Coordinator'],
  [/چیف پیٹرن/gi, 'Chief Patron'],
  [/چیف جسٹس/gi, 'Chief Justice'],
  [/سینئر نائب صدر/gi, 'Senior Vice President'],
  [/نائب صدر/gi, 'Vice President'],
  [/جنرل سیکرٹری/gi, 'General Secretary'],
  [/سیکرٹری جنرل/gi, 'Secretary General'],
  [/ایڈیشنل جنرل سیکرٹری/gi, 'Additional General Secretary'],
  [/جوائنٹ سیکرٹری/gi, 'Joint Secretary'],
  [/فنانس سیکرٹری/gi, 'Finance Secretary'],
  [/سیکرٹری مالیات/gi, 'Finance Secretary'],
  [/سیکرٹری اطلاعات/gi, 'Information Secretary'],
  [/اطلاعات سیکرٹری/gi, 'Information Secretary'],
  [/پریس سیکرٹری/gi, 'Press Secretary'],
  [/سیکرٹری نشر و اشاعت/gi, 'Publications & Media Secretary'],
  [/سرپرستِ اعلیٰ/gi, 'Patron-in-Chief'],
  [/سرپرست اعلیٰ/gi, 'Patron-in-Chief'],
  [/ڈپٹی کمشنر/gi, 'Deputy Commissioner'],
  [/اسسٹنٹ کمشنر/gi, 'Assistant Commissioner'],
  [/ڈائریکٹر جنرل/gi, 'Director General'],
  [/منیجنگ ڈائریکٹر/gi, 'Managing Director'],
  [/سافٹ ویئر انجینئر/gi, 'Software Engineer'],
  [/سافٹ ویئر ڈویلپر/gi, 'Software Developer'],
  [/اسسٹنٹ پروفیسر/gi, 'Assistant Professor'],
  [/ایسوسی ایٹ پروفیسر/gi, 'Associate Professor'],
  // Full site statements
  [/آرائیں بنوں/gi, 'ARAAIN BANNU'],
  [/ارائیں بنوں/gi, 'ARAAIN BANNU'],
  [/بنوں علاقائی تنظیم/gi, 'Bannu Regional Organization'],
  [/بنوں رےگیونال ورگانیساٹیون/gi, 'Bannu Regional Organization'],
  [/بنوں اور خیبر پختونخوا میں برادری کے رشتوں کو مضبوط بنانا/gi, 'Strengthening community bonds across Bannu and KP'],
  [/عالمی برادری کی تحریک/gi, 'Global Community Movement'],
  [/نئی نسل کو بااختیار بنانا، اپنے ورثے پر فخر/gi, 'Empowering Our Next Generation, Proud Of Our Heritage'],
  [/دنیا بھر میں آرائیں برادری کا اتحاد — طاقت، یکجہتی، ترقی۔ برادری کی فلاح، تعلیم اور ترقی کے ایک عظیم مشن کا حصہ بنیں۔/gi, 'Uniting the Arain Community Worldwide — Strength, Unity, Progress. Join a legacy of community development, education, and welfare.'],
  [/دنیا بھر میں آرائیں برادری کی سماجی و معاشی ترقی کے لیے کوشاں۔/gi, 'Dedicated to the socio-economic advancement of the Arain community worldwide.'],
  [/آرائیں بنوں پاکستان اور بیرون ملک بسنے والے ہزاروں خاندانوں کی نمائندگی کرتی ہے، جو تعلیم، فلاح اور پائیدار ترقی کے مشترکہ عزم سے جڑے ہوئے ہیں۔/gi, 'The ARAAIN BANNU represents thousands of families across Pakistan and the diaspora, driven by a shared commitment to education, welfare, and sustainable development.'],
  [/اسٹریٹجک منصوبوں، تعلیمی وظائف، کمیونٹی سینٹرز اور نوجوانوں کی رہنمائی کے ذریعے ہم روایات اور جدید مواقع کے درمیان مضبوط پل تعمیر کر رہے ہیں۔/gi, 'Through strategic initiatives, educational scholarships, community centers, and youth mentorship, we build bridges between our rich traditions and modern opportunities.'],
  [/بنوں میں ہماری علاقائی شاخ نچلی سطح پر فعال ہے، جو جنوبی خیبر پختونخوا کے خاندانوں کے لیے امداد، کیریئر رہنمائی اور باہمی اتحاد فراہم کرتی ہے۔/gi, 'Our regional chapter in Bannu serves as a grassroots pillar, providing localized support, career counseling, and community cohesion for families across Southern KPK.'],
  [/ہمارا اتحاد ہی ہماری سب سے بڑی طاقت ہے۔ جب ہم اپنے نوجوانوں کو بااختیار بناتے ہیں اور خاندانوں کو سہارا دیتے ہیں تو نسلوں کے لیے مضبوط بنیاد بنتی ہے۔/gi, 'Our unity is our greatest strength. When we invest in our youth and stand by our families, we build a foundation that endures for generations.'],
  [/اہم منصوبے اور فلاحی پروگرامز/gi, 'Core Programs & Initiatives'],
  [/خاندانوں کی مدد، نوجوانوں کی تعلیم اور برادری کی فلاح کے لیے جامع منصوبے۔/gi, 'Comprehensive programs uplifting families, youth, and our broader community.'],
  [/ہماری قیادت/gi, 'Our Leadership'],
  [/تقریبات اور اعلانات/gi, 'Upcoming Events & Announcements'],
  [/کمیونٹی کی یادگار جھلکیاں/gi, 'Community Photo Gallery'],
  [/ہمارے سیمینارز، فلاحی سرگرمیوں، یوتھ سمٹس اور علاقائی اجتماعات کی تصویری جھلکیاں۔/gi, 'Visual highlights from seminars, welfare drives, youth summits, and gatherings.'],
  [/رکنیت کا باضابطہ اندراج/gi, 'Official Membership Registration'],
  [/آرائیں بنوں کا حصہ بنیں اور برادری کی فلاح و بہبود کے منصوبوں میں اپنا کردار ادا کریں۔/gi, 'Join ARAAIN BANNU and contribute toward community empowerment and welfare.'],
  [/فلاحی منصوبوں کے لیے عطیات/gi, 'Donate to Community Welfare'],
  [/آپ کے عطیات مستحق طلبہ کے وظائف، مفت طبی کیمپس اور ہنگامی امداد میں خرچ ہوتے ہیں۔/gi, 'Your contributions empower student scholarships, medical camps, and family aid.'],
  [/مرکزی دفتر آرائیں بنوں، مین سٹی، بنوں، خیبر پختونخوا، پاکستان/gi, 'Central Secretariat ARAAIN BANNU, Main City, Bannu, KPK, Pakistan'],
  [/پیر تا ہفتہ: صبح 09:00 تا شام 05:00 \(پاکستان معیاری وقت\)/gi, 'Monday – Saturday: 09:00 AM – 05:00 PM (PKT)'],
  [/آرائیں بنوں تعلیم، معاشی خود مختاری اور انسانی فلاح کے ذریعے بنوں، خیبر پختونخوا اور دنیا بھر میں برادری کو بااختیار بنانے کے لیے کوشاں ہے۔/gi, 'ARAAIN BANNU is committed to empowering the community across Bannu, Khyber Pakhtunkhwa, and worldwide through education, economic independence, and human welfare.'],
  [/© 2025 آرائیں بنوں۔ تمام حقوق محفوظ ہیں۔/gi, '© 2025 ARAAIN BANNU. All Rights Reserved.'],
  [/تمام حقوق محفوظ ہیں۔/gi, 'All Rights Reserved.'],

  // Corrupted strings cleanup -> English
  [/وےلcومے ٹو ارائیں بنوں/gi, 'Welcome to ARAAIN BANNU'],
  [/ےمپووےرینگ ور نےxٹ گےنےراٹیون, پروڈ وف ور ہےریٹاگے/gi, 'Empowering Our Next Generation, Proud Of Our Heritage'],
  [/ونیٹینگ تھے ارائیں cوممونیٹی وورلڈویڈے — سٹرےنگتھ, ونیٹی, پروگرےسس/gi, 'Uniting the Arain Community Worldwide — Strength, Unity, Progress'],
  [/ڈےڈیcاٹےڈ ٹو تھے سوcیوےcونومیc اڈوانcےمےنٹ وف تھے ارائیں cوممونیٹی وورلڈویڈے/gi, 'Dedicated to the socio-economic advancement of the Arain community worldwide'],
  [/تھے ارائیں بنوں رےپرےسےنٹس تھوسانڈس وف فامیلیےس اcروسس پاکستان انڈ تھے ڈیاسپورا/gi, 'The ARAAIN BANNU represents thousands of families across Pakistan and the diaspora'],
  [/ڈریوےن بی اے شارےڈ cوممیٹمےنٹ ٹو ےڈوcاٹیون, وےلفارے, انڈ سوسٹائینابلے ڈےوےلوپ/gi, 'driven by a shared commitment to education, welfare, and sustainable development'],
  [/ور لےاڈےرشیپ/gi, 'Our Leadership'],
  [/وپcومینگ ےوےنتس/gi, 'Upcoming Events'],
  [/فوٹو گاللےری/gi, 'Photo Gallery'],
  [/مےمبےرشیپ رےگیسٹراٹیون/gi, 'Membership Registration'],
  [/سوپپورٹ ور میسسیون/gi, 'Support Our Mission'],
  [/مونڈے – ساٹورڈے/gi, 'Monday – Saturday'],
  [/الل ریغٹس رےسےروےڈ/gi, 'All Rights Reserved'],

  // Standard phrases
  [/انجمنِ ارائیں بنوں \(خیبر پختونخوا\)/gi, 'Araain Bannu Welfare Association KPK'],
  [/انجمنِ ارائیں بنوں/gi, 'Araain Bannu Welfare Association'],
  [/انجمن ارائیں بنوں/gi, 'Araain Bannu Welfare Association'],
  [/انجمنِ ارائیں/gi, 'Araain Association'],
  [/انجمن ارائیں/gi, 'Araain Association'],
  [/خیبر پختونخوا/gi, 'Khyber Pakhtunkhwa'],
  [/کے پی کے/gi, 'KPK'],
  [/فلاح و بہبود/gi, 'Welfare & Social Development'],
  [/تعلیمی وظائف/gi, 'Educational Scholarships'],
  [/اعلیٰ تعلیم/gi, 'Higher Education'],
  [/مفت کتب/gi, 'Free Textbooks & Stationery'],
  [/طلبہ و طالبات/gi, 'Deserving Students'],
  [/طلبہ/gi, 'Students'],
  [/طبی کیمپ/gi, 'Free Medical & Health Camps'],
  [/مفت ادویات/gi, 'Free Medicines & Clinical Checkups'],
  [/راشن پروگرام/gi, 'Monthly Ration & Food Package'],
  [/راشن کی فراہمی/gi, 'Distribution of Food Ration'],
  [/مستحق خاندانوں/gi, 'Deserving Families'],
  [/شادی فنڈ/gi, 'Marriage Assistance Fund'],
  [/یتیم کفالت/gi, 'Orphan Care & Sponsorship'],
  [/ہنگامی امداد/gi, 'Emergency Relief Fund'],
  [/صاف پانی کی فراہمی/gi, 'Clean Drinking Water Filtration'],
  [/صاف پانی/gi, 'Clean Water Initiative'],
  [/سالانہ جنرل اجلاس/gi, 'Annual General Assembly'],
  [/سالانہ اجلاس/gi, 'Annual General Assembly'],
  [/تقریب تقسیم انعامات/gi, 'Annual Awards & Merit Ceremony'],
  [/خون کا عطیہ/gi, 'Blood Donation Camp'],
  [/سیمینار و ورکشاپ/gi, 'Skill Seminar & Workshop'],
  [/سیمینار/gi, 'Seminar'],
  [/ورکشاپ/gi, 'Workshop'],
  [/خدمتِ خلق/gi, 'Public Service'],
  [/خدمت خلق/gi, 'Public Service'],
  [/برادری کی ترقی/gi, 'Community Advancement'],
  [/ہمدردی اور اتحاد/gi, 'Compassion and Unity'],
  [/مرکزی دفتر/gi, 'Central Secretariat'],
  [/پریس کلب/gi, 'Press Club'],
  [/میرے ارائیں/gi, 'Araain Community'],
  [/ارائیں برادری/gi, 'Araain Community'],
  [/ممبرشپ رجسٹریشن/gi, 'Membership Registration'],
  [/آن لائن رجسٹریشن/gi, 'Online Registration'],
  [/سرکاری شناختی کارڈ/gi, 'Official Identity Card'],
  [/مجاز ممبر/gi, 'Authorized Verified Member'],
  [/رابطہ کریں/gi, 'Contact Us'],
  [/عطیات/gi, 'Donations & Zakat'],
  [/صدقات و زکوٰۃ/gi, 'Zakat, Sadqa & Donations'],
  [/فوری رابطہ/gi, 'Quick Contact'],
  [/ہمارا تعارف/gi, 'About Us'],
  [/رکن بنیں/gi, 'Become a Member'],
  [/عطیہ دیں/gi, 'Donate Now'],
  [/آئندہ تقریبات/gi, 'Upcoming Events'],
  [/فعال اراکین/gi, 'Active Members'],
  [/بنیادی پروگرامز/gi, 'Core Programs'],
  [/منسلک شہر/gi, 'Affiliated Cities'],
];

// ── Common CMS Phrases (English -> Urdu) ────────────────────────────
export const COMMON_PHRASES_ENG_TO_URDU: [RegExp, string][] = [
  // Executive and Leadership Compound Roles
  [/Chief Executive Officer/gi, 'چیف ایگزیکٹو آفیسر'],
  [/Chief Executive Director/gi, 'چیف ایگزیکٹو ڈائریکٹر'],
  [/Chief Executive/gi, 'چیف ایگزیکٹو'],
  [/Executive Director/gi, 'ایگزیکٹو ڈائریکٹر'],
  [/Executive Officer/gi, 'ایگزیکٹو آفیسر'],
  [/Executive Member/gi, 'ایگزیکٹو ممبر'],
  [/Executive Council/gi, 'ایگزیکٹو کونسل'],
  [/Executive Committee/gi, 'ایگزیکٹو کمیٹی'],
  [/Chief Organizer/gi, 'چیف آرگنائزر'],
  [/Chief Advisor/gi, 'چیف ایڈوائزر'],
  [/Chief Coordinator/gi, 'چیف کوآرڈینیٹر'],
  [/Chief Patron/gi, 'چیف پیٹرن'],
  [/Senior Vice President/gi, 'سینئر نائب صدر'],
  [/Vice President/gi, 'نائب صدر'],
  [/General Secretary/gi, 'جنرل سیکرٹری'],
  [/Secretary General/gi, 'سیکرٹری جنرل'],
  [/Joint Secretary/gi, 'جوائنٹ سیکرٹری'],
  [/Finance Secretary/gi, 'فنانس سیکرٹری'],
  [/Information Secretary/gi, 'اطلاعات سیکرٹری'],
  [/Publications & Media Secretary/gi, 'سیکرٹری نشر و اشاعت'],
  [/Patron-in-Chief/gi, 'سرپرست اعلیٰ'],
  [/Deputy Commissioner/gi, 'ڈپٹی کمشنر'],
  [/Assistant Commissioner/gi, 'اسسٹنٹ کمشنر'],
  [/Director General/gi, 'ڈائریکٹر جنرل'],
  [/Managing Director/gi, 'منیجنگ ڈائریکٹر'],
  [/Software Engineer/gi, 'سافٹ ویئر انجینئر'],
  [/Software Developer/gi, 'سافٹ ویئر ڈویلپر'],
  [/Assistant Professor/gi, 'اسسٹنٹ پروفیسر'],
  [/Associate Professor/gi, 'ایسوسی ایٹ پروفیسر'],
  // Full site statements
  [/ARAAIN BANNU/gi, 'آرائیں بنوں'],
  [/Arain Bannu/gi, 'آرائیں بنوں'],
  [/Bannu Regional Organization/gi, 'بنوں علاقائی تنظیم'],
  [/Strengthening community bonds across Bannu and KP/gi, 'بنوں اور خیبر پختونخوا میں برادری کے رشتوں کو مضبوط بنانا'],
  [/Global Community Movement/gi, 'عالمی برادری کی تحریک'],
  [/Welcome to ARAAIN BANNU/gi, 'آرائیں بنوں میں خوش آمدید'],
  [/Empowering Our Next Generation, Proud Of Our Heritage/gi, 'نئی نسل کو بااختیار بنانا، اپنے ورثے پر فخر'],
  [/Uniting the Arain Community Worldwide — Strength, Unity, Progress\. Join a legacy of community development, education, and welfare\./gi, 'دنیا بھر میں آرائیں برادری کا اتحاد — طاقت، یکجہتی، ترقی۔ برادری کی فلاح، تعلیم اور ترقی کے ایک عظیم مشن کا حصہ بنیں۔'],
  [/Uniting the Arain Community Worldwide — Strength, Unity, Progress/gi, 'دنیا بھر میں آرائیں برادری کا اتحاد — طاقت، یکجہتی، ترقی'],
  [/Dedicated to the socio-economic advancement of the Arain community worldwide\./gi, 'دنیا بھر میں آرائیں برادری کی سماجی و معاشی ترقی کے لیے کوشاں۔'],
  [/Dedicated to the socio-economic advancement of the Arain community worldwide/gi, 'دنیا بھر میں آرائیں برادری کی سماجی و معاشی ترقی کے لیے کوشاں۔'],
  [/The ARAAIN BANNU represents thousands of families across Pakistan and the diaspora, driven by a shared commitment to education, welfare, and sustainable development\./gi, 'آرائیں بنوں پاکستان اور بیرون ملک بسنے والے ہزاروں خاندانوں کی نمائندگی کرتی ہے، جو تعلیم، فلاح اور پائیدار ترقی کے مشترکہ عزم سے جڑے ہوئے ہیں۔'],
  [/Through strategic initiatives, educational scholarships, community centers, and youth mentorship, we build bridges between our rich traditions and modern opportunities\./gi, 'اسٹریٹجک منصوبوں، تعلیمی وظائف، کمیونٹی سینٹرز اور نوجوانوں کی رہنمائی کے ذریعے ہم روایات اور جدید مواقع کے درمیان مضبوط پل تعمیر کر رہے ہیں۔'],
  [/Our regional chapter in Bannu serves as a grassroots pillar, providing localized support, career counseling, and community cohesion for families across Southern KPK\./gi, 'بنوں میں ہماری علاقائی شاخ نچلی سطح پر فعال ہے، جو جنوبی خیبر پختونخوا کے خاندانوں کے لیے امداد، کیریئر رہنمائی اور باہمی اتحاد فراہم کرتی ہے۔'],
  [/Our unity is our greatest strength\. When we invest in our youth and stand by our families, we build a foundation that endures for generations\./gi, 'ہمارا اتحاد ہی ہماری سب سے بڑی طاقت ہے۔ جب ہم اپنے نوجوانوں کو بااختیار بناتے ہیں اور خاندانوں کو سہارا دیتے ہیں تو نسلوں کے لیے مضبوط بنیاد بنتی ہے۔'],
  [/Core Programs & Initiatives/gi, 'اہم منصوبے اور فلاحی پروگرامز'],
  [/Core Programs & Welfare/gi, 'اہم منصوبے اور فلاحی پروگرامز'],
  [/Comprehensive programs uplifting families, youth, and our broader community\./gi, 'خاندانوں کی مدد، نوجوانوں کی تعلیم اور برادری کی فلاح کے لیے جامع منصوبے۔'],
  [/Our Leadership/gi, 'ہماری قیادت'],
  [/Upcoming Events & Announcements/gi, 'تقریبات اور اعلانات'],
  [/Upcoming Events/gi, 'آئندہ تقریبات'],
  [/Community Photo Gallery/gi, 'کمیونٹی کی یادگار جھلکیاں'],
  [/Visual highlights from seminars, welfare drives, youth summits, and gatherings\./gi, 'ہمارے سیمینارز، فلاحی سرگرمیوں، یوتھ سمٹس اور علاقائی اجتماعات کی تصویری جھلکیاں۔'],
  [/Official Membership Registration/gi, 'رکنیت کا باضابطہ اندراج'],
  [/Join ARAAIN BANNU and contribute toward community empowerment and welfare\./gi, 'آرائیں بنوں کا حصہ بنیں اور برادری کی فلاح و بہبود کے منصوبوں میں اپنا کردار ادا کریں۔'],
  [/Donate to Community Welfare/gi, 'فلاحی منصوبوں کے لیے عطیات'],
  [/Your contributions empower student scholarships, medical camps, and family aid\./gi, 'آپ کے عطیات مستحق طلبہ کے وظائف، مفت طبی کیمپس اور ہنگامی امداد میں خرچ ہوتے ہیں۔'],
  [/Central Secretariat ARAAIN BANNU, Main City, Bannu, KPK, Pakistan/gi, 'مرکزی دفتر آرائیں بنوں، مین سٹی، بنوں، خیبر پختونخوا، پاکستان'],
  [/Monday – Saturday: 09:00 AM – 05:00 PM \(PKT\)/gi, 'پیر تا ہفتہ: صبح 09:00 تا شام 05:00 (پاکستان معیاری وقت)'],
  [/Monday – Saturday/gi, 'پیر تا ہفتہ'],
  [/Monday - Saturday/gi, 'پیر تا ہفتہ'],
  [/ARAAIN BANNU is committed to empowering the community across Bannu, Khyber Pakhtunkhwa, and worldwide through education, economic independence, and human welfare\./gi, 'آرائیں بنوں تعلیم، معاشی خود مختاری اور انسانی فلاح کے ذریعے بنوں، خیبر پختونخوا اور دنیا بھر میں برادری کو بااختیار بنانے کے لیے کوشاں ہے۔'],
  [/© 2025 ARAAIN BANNU\. All Rights Reserved\./gi, '© 2025 آرائیں بنوں۔ تمام حقوق محفوظ ہیں۔'],
  [/All Rights Reserved\./gi, 'تمام حقوق محفوظ ہیں۔'],
  [/All Rights Reserved/gi, 'تمام حقوق محفوظ ہیں۔'],

  // Standard phrases
  [/Araain Bannu Welfare Association KPK/gi, 'انجمنِ ارائیں بنوں (خیبر پختونخوا)'],
  [/Araain Bannu Welfare Association/gi, 'انجمنِ ارائیں بنوں'],
  [/Araain Association/gi, 'انجمنِ ارائیں'],
  [/Khyber Pakhtunkhwa/gi, 'خیبر پختونخوا'],
  [/Educational Scholarships/gi, 'تعلیمی وظائف'],
  [/Free Medical Camps/gi, 'مفت طبی کیمپ'],
  [/Food & Ration Drive/gi, 'راشن پروگرام برائے مستحقین'],
  [/Marriage Assistance/gi, 'شادی فنڈ برائے مستحق بچیاں'],
  [/Clean Water/gi, 'صاف پینے کا پانی'],
  [/Orphan Care/gi, 'یتیم و نادار کفالت'],
  [/Annual General Assembly/gi, 'سالانہ جنرل اجلاس'],
  [/Blood Donation Drive/gi, 'خون کا عطیہ کیمپ'],
  [/Youth Leadership/gi, 'نوجوانوں کی فلاح و قیادت'],
  [/Contact Us/gi, 'ہم سے رابطہ کریں'],
  [/Donate Now/gi, 'عطیہ دیں'],
  [/Join Us/gi, 'رکن بنیں'],
  [/Become a Member/gi, 'رکن بنیں'],
  [/Active Members/gi, 'فعال اراکین'],
  [/Core Programs/gi, 'بنیادی پروگرامز'],
  [/Affiliated Cities/gi, 'منسلک شہر'],
  [/About Us/gi, 'ہمارا تعارف'],
];

// ── Corrupted Text Detection & Cleaning ─────────────────────────────

/**
 * Returns true if a string contains corrupted phonetically transliterated Urdu
 * e.g., "cوممونیٹی", "وےلcومے", "نےxٹ", "ےمپووےرینگ", Latin characters mixed inside Urdu script.
 */
export function isCorruptedTransliteration(text?: string): boolean {
  if (!text || typeof text !== 'string') return false;

  // 1. Any Latin character adjacent to Urdu/Arabic characters, e.g. cوممونیٹی or نےxٹ
  if (/[\u0600-\u06FF][a-zA-Z]|[a-zA-Z][\u0600-\u06FF]/.test(text)) return true;

  // 2. Known corrupted phonetic markers from old engine
  const corruptedTokens = [
    'cوممونیٹی', 'وےلcومے', 'نےxٹ', 'ورگانیساٹیون', 'ےمپووےرینگ', 'ہےریٹاگے',
    'ونیٹینگ', 'تھے ارائیں', 'وورلڈویڈے', 'سٹرےنگتھ', 'ونیٹی', 'پروگرےسس',
    'ڈےڈیcاٹےڈ', 'سوcیوےcونومیc', 'اڈوانcےمےنٹ', 'تھوسانڈس', 'فامیلیےس',
    'اcروسس', 'ڈیاسپورا', 'ڈریوےن', 'cوممیٹمےنٹ', 'ےڈوcاٹیون', 'سوسٹائینابلے',
    'ڈےوےلوپ', 'وےلفارے', 'سوپپورٹ ور میسسیون', 'ور لےاڈےرشیپ', 'وپcومینگ',
    'فوٹو گاللےری', 'مےمبےرشیپ رےگیسٹراٹیون', 'مونڈے – ساٹورڈے', 'الل ریغٹس',
    'پروڈ وف ور', 'رےگیونال ورگانیساٹیون', 'پریسیدےنت', 'سےcرےتاری', 'ترےاسورےر'
  ];

  return corruptedTokens.some(tok => text.includes(tok));
}

/**
 * Replaces known corrupted phonetic Urdu phrases with genuine Urdu
 */
export function cleanCorruptedUrdu(text?: string): string {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text;

  const replacements: [RegExp, string][] = [
    [/بنوں رےگیونال ورگانیساٹیون/gi, 'بنوں علاقائی تنظیم'],
    [/وےلcومے ٹو ارائیں بنوں/gi, 'آرائیں بنوں میں خوش آمدید'],
    [/ےمپووےرینگ ور نےxٹ گےنےراٹیون, پروڈ وف ور ہےریٹاگے/gi, 'نئی نسل کو بااختیار بنانا، اپنے ورثے پر فخر'],
    [/ونیٹینگ تھے ارائیں cوممونیٹی وورلڈویڈے — سٹرےنگتھ, ونیٹی, پروگرےسس/gi, 'دنیا بھر میں آرائیں برادری کا اتحاد — طاقت، یکجہتی، ترقی'],
    [/ڈےڈیcاٹےڈ ٹو تھے سوcیوےcونومیc اڈوانcےمےنٹ وف تھے ارائیں cوممونیٹی وورلڈویڈے\.?/gi, 'دنیا بھر میں آرائیں برادری کی سماجی و معاشی ترقی کے لیے کوشاں۔'],
    [/تھے ارائیں بنوں رےپرےسےنٹس تھوسانڈس وف فامیلیےس اcروسس پاکستان انڈ تھے ڈیاسپورا, ڈریوےن بی اے شارےڈ cوممیٹمےنٹ ٹو ےڈوcاٹیون, وےلفارے, انڈ سوسٹائینابلے ڈےوےلوپ/gi, 'آرائیں بنوں پاکستان اور بیرون ملک بسنے والے ہزاروں خاندانوں کی نمائندگی کرتی ہے، جو تعلیم، فلاح اور پائیدار ترقی کے مشترکہ عزم سے جڑے ہوئے ہیں۔'],
    [/ور لےاڈےرشیپ/gi, 'ہماری قیادت'],
    [/وپcومینگ ےوےنتس/gi, 'آئندہ تقریبات'],
    [/فوٹو گاللےری/gi, 'کمیونٹی کی یادگار جھلکیاں'],
    [/مےمبےرشیپ رےگیسٹراٹیون/gi, 'رکنیت کا باضابطہ اندراج'],
    [/سوپپورٹ ور میسسیون/gi, 'فلاحی منصوبوں کے لیے عطیات'],
    [/مونڈے – ساٹورڈے/gi, 'پیر تا ہفتہ'],
    [/الل ریغٹس رےسےروےڈ/gi, 'تمام حقوق محفوظ ہیں۔'],
    [/cوممونیٹی/gi, 'برادری'],
    [/وےلcومے/gi, 'خوش آمدید'],
    [/نےxٹ/gi, 'آئندہ'],
    [/ےمپووےرینگ/gi, 'بااختیار بنانا'],
    [/ہےریٹاگے/gi, 'ورثہ'],
    [/ونیٹینگ/gi, 'متحد کرنا'],
    [/تھے/gi, ''],
    [/وورلڈویڈے/gi, 'دنیا بھر میں'],
    [/سٹرےنگتھ/gi, 'طاقت'],
    [/ونیٹی/gi, 'اتحاد'],
    [/پروگرےسس/gi, 'ترقی'],
    [/ڈےڈیcاٹےڈ/gi, 'وقف'],
    [/سوcیوےcونومیc/gi, 'سماجی و معاشی'],
    [/اڈوانcےمےنٹ/gi, 'ترقی و بہبود'],
    [/تھوسانڈس/gi, 'ہزاروں'],
    [/فامیلیےس/gi, 'خاندان'],
    [/اcروسس/gi, 'بھر میں'],
    [/انڈ/gi, 'اور'],
    [/cوممیٹمےنٹ/gi, 'عزم'],
    [/ےڈوcاٹیون/gi, 'تعلیم'],
    [/وےلفارے/gi, 'فلاح'],
    [/سوسٹائینابلے/gi, 'پائیدار'],
    [/ڈےوےلوپ/gi, 'ترقی'],
  ];

  for (const [pattern, rep] of replacements) {
    cleaned = cleaned.replace(pattern, rep);
  }

  // Strip any orphan Latin characters inside Urdu text
  cleaned = cleaned.replace(/[\u0600-\u06FF]\s*[a-zA-Z]+\s*[\u0600-\u06FF]/g, (match) => {
    return match.replace(/[a-zA-Z]/g, '');
  });

  return cleaned.trim();
}

// ── Language Detectors ──────────────────────────────────────────────

export function isUrduText(text?: string): boolean {
  if (!text || typeof text !== 'string') return false;
  const urduMatches = text.match(/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g);
  return (urduMatches ? urduMatches.length : 0) > (text.length * 0.25);
}

export function isEnglishText(text?: string): boolean {
  if (!text || typeof text !== 'string') return false;
  const engMatches = text.match(/[A-Za-z]/g);
  return (engMatches ? engMatches.length : 0) > (text.length * 0.4);
}

// ── Phonetic Transliteration: English -> Urdu ───────────────────────

export function phoneticWordToUrdu(word: string): string {
  const clean = word.toLowerCase().trim();
  if (!clean) return '';

  // 1. First check if it is a recognized vocabulary word
  if (GENERAL_VOCAB_ENG_TO_URDU[clean]) return GENERAL_VOCAB_ENG_TO_URDU[clean];
  if (NAMES_DICT[clean]) return NAMES_DICT[clean];
  if (ADDRESS_DICT[clean]) return ADDRESS_DICT[clean];
  if (OCCUPATIONS_DICT[clean]) return OCCUPATIONS_DICT[clean];
  if (MONTHS_ENG_TO_URDU[clean]) return MONTHS_ENG_TO_URDU[clean];

  // Single letters
  if (clean === 'a') return 'اے';
  if (clean === 'b') return 'بی';
  if (clean === 'c') return 'سی';
  if (clean === 'd') return 'ڈی';
  if (clean === 'e') return 'ای';
  if (clean === 'f') return 'ایف';
  if (clean === 'g') return 'جی';
  if (clean === 'h') return 'ایچ';
  if (clean === 'i') return 'آئی';
  if (clean === 'j') return 'جے';
  if (clean === 'k') return 'کے';
  if (clean === 'l') return 'ایل';
  if (clean === 'm') return 'ایم';
  if (clean === 'n') return 'این';
  if (clean === 'o') return 'او';
  if (clean === 'p') return 'پی';
  if (clean === 'q') return 'کیو';
  if (clean === 'r') return 'آر';
  if (clean === 's') return 'ایس';
  if (clean === 't') return 'ٹی';
  if (clean === 'u') return 'یو';
  if (clean === 'v') return 'وی';
  if (clean === 'w') return 'ڈبلیو';
  if (clean === 'x') return 'ایکس';
  if (clean === 'y') return 'وائی';
  if (clean === 'z') return 'زیڈ';

  return clean
    .replace(/^al-?/g, 'ال')
    .replace(/tion/g, 'شن')
    .replace(/sion/g, 'شن')
    .replace(/ing$/g, 'نگ')
    .replace(/ed$/g, 'ڈ')
    .replace(/kh/g, 'خ')
    .replace(/gh/g, 'غ')
    .replace(/sh/g, 'ش')
    .replace(/ch/g, 'چ')
    .replace(/th/g, 'تھ')
    .replace(/ph/g, 'ف')
    .replace(/bh/g, 'بھ')
    .replace(/dh/g, 'دھ')
    .replace(/jh/g, 'جھ')
    .replace(/rh/g, 'ڑھ')
    .replace(/ck/g, 'ک')
    .replace(/ee/g, 'ی')
    .replace(/oo/g, 'و')
    .replace(/ou/g, 'و')
    .replace(/ai/g, 'ائی')
    .replace(/ay/g, 'ے')
    .replace(/aa/g, 'ا')
    .replace(/c(?=[eiy])/g, 'س')
    .replace(/c/g, 'ک')
    .replace(/x/g, 'کس')
    .replace(/q/g, 'ق')
    .replace(/k/g, 'ک')
    .replace(/g/g, 'گ')
    .replace(/j/g, 'ج')
    .replace(/z/g, 'ز')
    .replace(/s/g, 'س')
    .replace(/t/g, 'ٹ')
    .replace(/d/g, 'ڈ')
    .replace(/r/g, 'ر')
    .replace(/l/g, 'ل')
    .replace(/m/g, 'م')
    .replace(/n/g, 'ن')
    .replace(/b/g, 'ب')
    .replace(/p/g, 'پ')
    .replace(/f/g, 'ف')
    .replace(/v/g, 'و')
    .replace(/w/g, 'و')
    .replace(/y/g, 'ی')
    .replace(/h/g, 'ہ')
    .replace(/a/g, 'ا')
    .replace(/e/g, 'ے')
    .replace(/i/g, 'ی')
    .replace(/o/g, 'و')
    .replace(/u/g, 'و');
}

// ── Phonetic Transliteration: Urdu -> English ───────────────────────

export function urduWordToEnglish(urduWord: string): string {
  const clean = urduWord.trim();
  if (!clean) return '';

  // Direct word check in dictionaries first
  if (NAMES_URDU_TO_ENG[clean]) return NAMES_URDU_TO_ENG[clean];
  if (LEADERSHIP_ROLES_URDU_TO_ENG[clean]) return LEADERSHIP_ROLES_URDU_TO_ENG[clean];
  if (OCCUPATIONS_URDU_TO_ENG[clean]) return OCCUPATIONS_URDU_TO_ENG[clean];
  if (TITLE_PREFIXES_URDU_TO_ENG[clean]) return TITLE_PREFIXES_URDU_TO_ENG[clean];
  if (TITLE_NOUNS_URDU_TO_ENG[clean]) return TITLE_NOUNS_URDU_TO_ENG[clean];
  if (QUALIFIERS_URDU_TO_ENG[clean]) return QUALIFIERS_URDU_TO_ENG[clean];
  if (GENERAL_VOCAB_URDU_TO_ENG[clean]) return GENERAL_VOCAB_URDU_TO_ENG[clean];
  if (ADDRESS_URDU_TO_ENG[clean]) return ADDRESS_URDU_TO_ENG[clean];
  if (MONTHS_URDU_TO_ENG[clean]) return MONTHS_URDU_TO_ENG[clean];

  // Specific common loanword safeguards
  if (clean === 'چیف') return 'Chief';
  if (clean === 'ایگزیکٹو') return 'Executive';
  if (clean === 'ڈائریکٹر') return 'Director';
  if (clean === 'آفیسر' || clean === 'افسر') return 'Officer';
  if (clean === 'منیجر') return 'Manager';
  if (clean === 'کوآرڈینیٹر') return 'Coordinator';
  if (clean === 'آرگنائزر') return 'Organizer';
  if (clean === 'ایڈوائزر' || clean === 'مشیر') return 'Advisor';
  if (clean === 'صدر') return 'President';
  if (clean === 'نائب') return 'Vice';
  if (clean === 'سیکرٹری') return 'Secretary';
  if (clean === 'خزانچی') return 'Treasurer';
  if (clean === 'چیئرمین') return 'Chairman';
  if (clean === 'سینئر') return 'Senior';
  if (clean === 'جونیئر') return 'Junior';
  if (clean === 'اسسٹنٹ') return 'Assistant';
  if (clean === 'ڈپٹی') return 'Deputy';
  if (clean === 'انجینئر') return 'Engineer';
  if (clean === 'ڈاکٹر') return 'Doctor';
  if (clean === 'پروفیسر') return 'Professor';
  if (clean === 'لیکچرر') return 'Lecturer';
  if (clean === 'سافٹ ویئر') return 'Software';
  if (clean === 'ڈویلپر') return 'Developer';

  // Character-level phonetic conversion
  let eng = clean
    .replace(/الله/g, 'Allah')
    .replace(/محمد/g, 'Muhammad')
    .replace(/احمد/g, 'Ahmad')
    .replace(/علی/g, 'Ali')
    .replace(/حسن/g, 'Hassan')
    .replace(/حسین/g, 'Hussain')
    .replace(/خان/g, 'Khan')
    .replace(/شاہ/g, 'Shah')
    .replace(/میر/g, 'Meer')
    .replace(/طاہر/g, 'Tahir')
    .replace(/اقبال/g, 'Iqbal')
    .replace(/بنوں/g, 'Bannu')
    .replace(/قصاباں/g, 'Qasaban')
    .replace(/روڈ/g, 'Road')
    .replace(/گلی/g, 'Street')
    .replace(/محلہ/g, 'Mohallah')
    .replace(/کھ/g, 'kh')
    .replace(/گھ/g, 'gh')
    .replace(/چھ/g, 'chh')
    .replace(/جھ/g, 'jh')
    .replace(/تھ/g, 'th')
    .replace(/ٹھ/g, 'th')
    .replace(/دھ/g, 'dh')
    .replace(/ڈھ/g, 'dh')
    .replace(/بھ/g, 'bh')
    .replace(/پھ/g, 'ph')
    .replace(/ڑھ/g, 'rh')
    .replace(/آ/g, 'Aa')
    .replace(/ا/g, 'a')
    .replace(/ب/g, 'b')
    .replace(/پ/g, 'p')
    .replace(/ت/g, 't')
    .replace(/ٹ/g, 't')
    .replace(/ث/g, 's')
    .replace(/ج/g, 'j')
    .replace(/چ/g, 'ch')
    .replace(/ح/g, 'h')
    .replace(/خ/g, 'kh')
    .replace(/د/g, 'd')
    .replace(/ڈ/g, 'd')
    .replace(/ذ/g, 'z')
    .replace(/ر/g, 'r')
    .replace(/ڑ/g, 'r')
    .replace(/ز/g, 'z')
    .replace(/ژ/g, 'zh')
    .replace(/س/g, 's')
    .replace(/ش/g, 'sh')
    .replace(/ص/g, 's')
    .replace(/ض/g, 'z')
    .replace(/ط/g, 't')
    .replace(/ظ/g, 'z')
    .replace(/ع/g, 'a')
    .replace(/غ/g, 'gh')
    .replace(/ف/g, 'f')
    .replace(/ق/g, 'q')
    .replace(/ک/g, 'k')
    .replace(/گ/g, 'g')
    .replace(/ل/g, 'l')
    .replace(/م/g, 'm')
    .replace(/ن/g, 'n')
    .replace(/ں/g, 'n')
    .replace(/و/g, 'o')
    .replace(/ہ/g, 'h')
    .replace(/ھ/g, 'h')
    .replace(/ء/g, '')
    .replace(/ی/g, 'i')
    .replace(/ے/g, 'e');

  // Format: clean consecutive vowels & capitalize
  eng = eng.replace(/aa+/g, 'a').replace(/ii+/g, 'ee').replace(/oo+/g, 'oo');
  if (eng.length > 0) {
    eng = eng.charAt(0).toUpperCase() + eng.slice(1);
  }
  return eng;
}

// ── Translation: Names ──────────────────────────────────────────────

export function translateNameToUrdu(name: string): string {
  if (!name || typeof name !== 'string') return '';
  const trimmed = name.trim();
  if (isUrduText(trimmed)) return trimmed;

  const tokens = trimmed.split(/[\s,]+/);
  const urduTokens = tokens.map(tok => {
    const cleanTok = tok.toLowerCase().replace(/[^a-z]/g, '');
    if (!cleanTok) return tok;
    if (NAMES_DICT[cleanTok]) return NAMES_DICT[cleanTok];
    if (ADDRESS_DICT[cleanTok]) return ADDRESS_DICT[cleanTok];
    return phoneticWordToUrdu(cleanTok);
  });

  return urduTokens.filter(Boolean).join(' ');
}

export function translateNameToEnglish(name: string): string {
  if (!name || typeof name !== 'string') return '';
  const trimmed = name.trim();
  if (!isUrduText(trimmed)) return trimmed; // Already English

  const tokens = trimmed.split(/[\s,]+/);
  const engTokens = tokens.map(tok => {
    if (NAMES_URDU_TO_ENG[tok]) return NAMES_URDU_TO_ENG[tok];
    if (ADDRESS_URDU_TO_ENG[tok]) return ADDRESS_URDU_TO_ENG[tok];
    return urduWordToEnglish(tok);
  });

  return engTokens.filter(Boolean).join(' ');
}

// ── Translation: Address ────────────────────────────────────────────

export function translateAddressToUrdu(address: string): string {
  if (!address || typeof address !== 'string') return '';
  const trimmed = address.trim();
  if (isUrduText(trimmed)) return trimmed;

  const parts = trimmed.split(/,\s*/);
  const translatedParts = parts.map(part => {
    const tokens = part.split(/\s+/);
    const urduTokens = tokens.map(tok => {
      if (/\d/.test(tok)) return tok; // preserve digits
      const cleanTok = tok.toLowerCase().replace(/[^a-z]/g, '');
      if (!cleanTok) return tok;
      if (ADDRESS_DICT[cleanTok]) return ADDRESS_DICT[cleanTok];
      if (NAMES_DICT[cleanTok]) return NAMES_DICT[cleanTok];
      return phoneticWordToUrdu(cleanTok);
    });
    return urduTokens.filter(Boolean).join(' ');
  });

  return translatedParts.filter(Boolean).join('، ');
}

export function translateAddressToEnglish(address: string): string {
  if (!address || typeof address !== 'string') return '';
  const trimmed = address.trim();
  if (!isUrduText(trimmed)) return trimmed; // Already English

  const parts = trimmed.split(/[\s،,]+/);
  const engParts = parts.map(tok => {
    if (/\d/.test(tok)) return tok; // preserve digits
    if (ADDRESS_URDU_TO_ENG[tok]) return ADDRESS_URDU_TO_ENG[tok];
    if (NAMES_URDU_TO_ENG[tok]) return NAMES_URDU_TO_ENG[tok];
    return urduWordToEnglish(tok);
  });

  return engParts.filter(Boolean).join(' ');
}

// ── Translation: Occupation ─────────────────────────────────────────

export function translateOccupationToUrdu(work: string): string {
  if (!work || typeof work !== 'string') return 'کمیونٹی ممبر';
  const trimmed = work.trim();
  if (isUrduText(trimmed)) return trimmed;

  // Try compound title analyzer first
  const compound = translateCompoundTitleToUrdu(trimmed);
  if (compound) return compound;

  const key = trimmed.toLowerCase();
  if (OCCUPATIONS_DICT[key]) return OCCUPATIONS_DICT[key];
  if (LEADERSHIP_ROLES_ENG_TO_URDU[key]) return LEADERSHIP_ROLES_ENG_TO_URDU[key];

  for (const [eng, urd] of Object.entries(LEADERSHIP_ROLES_ENG_TO_URDU)) {
    if (key.includes(eng.toLowerCase())) return urd;
  }

  for (const [eng, urd] of Object.entries(OCCUPATIONS_DICT)) {
    if (key.includes(eng)) return urd;
  }

  // Use general English to Urdu translation
  const translated = translateEnglishToUrdu(trimmed);
  return translated || trimmed;
}

export function translateOccupationToEnglish(work: string): string {
  if (!work || typeof work !== 'string') return 'Community Member';
  const trimmed = work.trim();
  if (!isUrduText(trimmed)) return trimmed; // Already English

  // Try compound title analyzer first
  const compound = translateCompoundTitleToEnglish(trimmed);
  if (compound) return compound;

  if (OCCUPATIONS_URDU_TO_ENG[trimmed]) return OCCUPATIONS_URDU_TO_ENG[trimmed];
  if (LEADERSHIP_ROLES_URDU_TO_ENG[trimmed]) return LEADERSHIP_ROLES_URDU_TO_ENG[trimmed];

  for (const [urd, eng] of Object.entries(LEADERSHIP_ROLES_URDU_TO_ENG)) {
    if (trimmed.includes(urd)) return eng;
  }

  for (const [urd, eng] of Object.entries(OCCUPATIONS_URDU_TO_ENG)) {
    if (trimmed.includes(urd)) return eng;
  }

  // Fallback to general Urdu-to-English translation, NEVER to name transliteration
  const translated = translateUrduToEnglish(trimmed);
  return translated || trimmed;
}

// ── Translation: City, State, Country ───────────────────────────────

export function translateCityToUrdu(city: string): string {
  if (!city || typeof city !== 'string') return 'بنوں';
  const trimmed = city.trim();
  if (isUrduText(trimmed)) return trimmed;
  const clean = trimmed.toLowerCase().replace(/[^a-z]/g, '');
  return ADDRESS_DICT[clean] || translateNameToUrdu(trimmed);
}

export function translateCityToEnglish(city: string): string {
  if (!city || typeof city !== 'string') return 'Bannu';
  const trimmed = city.trim();
  if (!isUrduText(trimmed)) return trimmed;
  return ADDRESS_URDU_TO_ENG[trimmed] || translateNameToEnglish(trimmed);
}

export function translateStateToUrdu(state: string): string {
  if (!state || typeof state !== 'string') return 'خیبر پختونخوا';
  const trimmed = state.trim();
  if (isUrduText(trimmed)) return trimmed;
  const clean = trimmed.toLowerCase();
  if (clean.includes('khyber') || clean.includes('kpk')) return 'خیبر پختونخوا';
  if (clean.includes('punjab')) return 'پنجاب';
  if (clean.includes('sindh')) return 'سندھ';
  if (clean.includes('balochistan')) return 'بلوچستان';
  if (clean.includes('islamabad')) return 'اسلام آباد';
  return translateNameToUrdu(trimmed);
}

export function translateStateToEnglish(state: string): string {
  if (!state || typeof state !== 'string') return 'KPK';
  const trimmed = state.trim();
  if (!isUrduText(trimmed)) return trimmed;
  return ADDRESS_URDU_TO_ENG[trimmed] || 'KPK';
}

export function translateCountryToUrdu(country: string): string {
  if (!country || typeof country !== 'string') return 'پاکستان';
  const trimmed = country.trim();
  if (isUrduText(trimmed)) return trimmed;
  const clean = country.toLowerCase();
  if (clean.includes('pakistan')) return 'پاکستان';
  if (clean.includes('saudi')) return 'سعودی عرب';
  if (clean.includes('uae') || clean.includes('emirates') || clean.includes('dubai')) return 'متحدہ عرب امارات';
  if (clean.includes('uk') || clean.includes('united kingdom') || clean.includes('britain')) return 'برطانیہ';
  if (clean.includes('usa') || clean.includes('united states') || clean.includes('america')) return 'امریکہ';
  if (clean.includes('canada')) return 'کینیڈا';
  if (clean.includes('qatar')) return 'قطر';
  if (clean.includes('kuwait')) return 'کویت';
  if (clean.includes('oman')) return 'عمان';
  return translateNameToUrdu(trimmed);
}

export function translateCountryToEnglish(country: string): string {
  if (!country || typeof country !== 'string') return 'Pakistan';
  const trimmed = country.trim();
  if (!isUrduText(trimmed)) return trimmed;
  if (trimmed.includes('پاکستان')) return 'Pakistan';
  if (trimmed.includes('سعودی')) return 'Saudi Arabia';
  if (trimmed.includes('امارات') || trimmed.includes('دبئی')) return 'UAE';
  if (trimmed.includes('برطانیہ')) return 'United Kingdom';
  if (trimmed.includes('امریکہ')) return 'USA';
  if (trimmed.includes('کینیڈا')) return 'Canada';
  return 'Pakistan';
}

// ── Translation: Gender ─────────────────────────────────────────────

export function translateGenderToUrdu(gender: string): string {
  if (!gender) return 'مرد';
  const clean = gender.toLowerCase().trim();
  if (clean === 'male' || clean === 'm' || clean === 'مرد') return 'مرد';
  if (clean === 'female' || clean === 'f' || clean === 'خاتون' || clean === 'عورت') return 'خاتون';
  return 'دیگر';
}

export function translateGenderToEnglish(gender: string): string {
  if (!gender) return 'Male';
  const clean = gender.trim();
  if (clean === 'مرد' || clean.toLowerCase() === 'male') return 'Male';
  if (clean === 'خاتون' || clean === 'عورت' || clean.toLowerCase() === 'female') return 'Female';
  return 'Other';
}

// ── Translation: Membership Type ────────────────────────────────────

export function translateMembershipTypeToUrdu(type: string): string {
  if (!type) return 'باقاعدہ رکن';
  const clean = type.toLowerCase().trim();
  if (MEMBERSHIP_TYPES_DICT[clean]) return MEMBERSHIP_TYPES_DICT[clean];
  for (const [k, v] of Object.entries(MEMBERSHIP_TYPES_DICT)) {
    if (clean.includes(k)) return v;
  }
  return isUrduText(type) ? type : 'باقاعدہ رکن';
}

export function translateMembershipTypeToEnglish(type: string): string {
  if (!type) return 'Active Member';
  const clean = type.trim();
  if (MEMBERSHIP_TYPES_URDU_TO_ENG[clean]) return MEMBERSHIP_TYPES_URDU_TO_ENG[clean];
  for (const [urd, eng] of Object.entries(MEMBERSHIP_TYPES_URDU_TO_ENG)) {
    if (clean.includes(urd)) return eng;
  }
  return isUrduText(type) ? 'Active Member' : type;
}

// ── Translation: Residential Status ─────────────────────────────────

export function translateResidentialStatusToUrdu(status: string): string {
  if (!status) return 'مستقل رہائشی (پاکستان)';
  const clean = status.toLowerCase().trim();
  if (RESIDENTIAL_STATUS_DICT[clean]) return RESIDENTIAL_STATUS_DICT[clean];
  return isUrduText(status) ? status : 'مستقل رہائشی (پاکستان)';
}

export function translateResidentialStatusToEnglish(status: string): string {
  if (!status) return 'Resident (Pakistan)';
  const clean = status.trim();
  if (RESIDENTIAL_STATUS_URDU_TO_ENG[clean]) return RESIDENTIAL_STATUS_URDU_TO_ENG[clean];
  for (const [urd, eng] of Object.entries(RESIDENTIAL_STATUS_URDU_TO_ENG)) {
    if (clean.includes(urd)) return eng;
  }
  return isUrduText(status) ? 'Resident (Pakistan)' : status;
}

// ── Translation: Education ──────────────────────────────────────────

export function translateEducationToUrdu(education: string): string {
  if (!education) return 'گریجویشن';
  const clean = education.toLowerCase().trim();
  if (EDUCATION_DICT[clean]) return EDUCATION_DICT[clean];
  return isUrduText(education) ? education : translateNameToUrdu(education);
}

export function translateEducationToEnglish(education: string): string {
  if (!education) return "Bachelor's Degree";
  const clean = education.trim();
  if (EDUCATION_URDU_TO_ENG[clean]) return EDUCATION_URDU_TO_ENG[clean];
  for (const [urd, eng] of Object.entries(EDUCATION_URDU_TO_ENG)) {
    if (clean.includes(urd)) return eng;
  }
  return isUrduText(education) ? "Bachelor's Degree" : education;
}

// ── Translation: Month ──────────────────────────────────────────────

export function translateMonthToEnglish(month: string): string {
  if (!month) return 'January';
  const clean = month.trim();
  if (MONTHS_URDU_TO_ENG[clean]) return MONTHS_URDU_TO_ENG[clean];
  return month;
}

export function translateMonthToUrdu(month: string): string {
  if (!month) return 'جنوری';
  const clean = month.toLowerCase().trim();
  if (MONTHS_ENG_TO_URDU[clean]) return MONTHS_ENG_TO_URDU[clean];
  return isUrduText(month) ? month : 'جنوری';
}

// ── General Text Translation: Urdu -> English ───────────────────────

export function translateUrduToEnglish(text?: string): string {
  if (!text || typeof text !== 'string') return '';
  let trimmed = text.trim();
  if (!trimmed) return '';

  // Clean any corrupted transliterations first
  if (isCorruptedTransliteration(trimmed)) {
    trimmed = cleanCorruptedUrdu(trimmed);
  }

  if (!isUrduText(trimmed)) return trimmed; // Already English

  // Check direct compound title resolution first
  const compoundMatch = translateCompoundTitleToEnglish(trimmed);
  if (compoundMatch) return compoundMatch;

  // Leverage the comprehensive bilingual dictionary library
  const libResult = translateUrduToEnglishWithLibrary(trimmed);
  if (libResult && !isUrduText(libResult)) {
    return libResult;
  }

  let translated = libResult || trimmed;

  // 1. Replace multi-word common phrases
  for (const [regex, eng] of COMMON_PHRASES_URDU_TO_ENG) {
    translated = translated.replace(regex, eng);
  }

  // 2. Direct dictionary multi-word checks (Leadership & Occupations)
  for (const [urd, eng] of Object.entries(LEADERSHIP_ROLES_URDU_TO_ENG)) {
    if (translated.includes(urd)) {
      translated = translated.split(urd).join(eng);
    }
  }
  for (const [urd, eng] of Object.entries(OCCUPATIONS_URDU_TO_ENG)) {
    if (translated.includes(urd)) {
      translated = translated.split(urd).join(eng);
    }
  }

  // 3. Replace known punctuation
  translated = translated
    .replace(/،/g, ',')
    .replace(/۔/g, '.')
    .replace(/؟/g, '?')
    .replace(/٪/g, '%');

  // 4. Tokenize remaining words and transliterate any remaining Urdu tokens
  const tokens = translated.split(/(\s+|[,.:;!?"'()\[\]]+)/);
  const converted = tokens.map(tok => {
    if (!isUrduText(tok)) return tok; // Punctuation, English word, or digits
    const cleanTok = tok.trim();
    if (LEADERSHIP_ROLES_URDU_TO_ENG[cleanTok]) return LEADERSHIP_ROLES_URDU_TO_ENG[cleanTok];
    if (OCCUPATIONS_URDU_TO_ENG[cleanTok]) return OCCUPATIONS_URDU_TO_ENG[cleanTok];
    if (TITLE_PREFIXES_URDU_TO_ENG[cleanTok]) return TITLE_PREFIXES_URDU_TO_ENG[cleanTok];
    if (TITLE_NOUNS_URDU_TO_ENG[cleanTok]) return TITLE_NOUNS_URDU_TO_ENG[cleanTok];
    if (GENERAL_VOCAB_URDU_TO_ENG[cleanTok]) return GENERAL_VOCAB_URDU_TO_ENG[cleanTok];
    if (NAMES_URDU_TO_ENG[cleanTok]) return NAMES_URDU_TO_ENG[cleanTok];
    if (ADDRESS_URDU_TO_ENG[cleanTok]) return ADDRESS_URDU_TO_ENG[cleanTok];
    if (MONTHS_URDU_TO_ENG[cleanTok]) return MONTHS_URDU_TO_ENG[cleanTok];
    return urduWordToEnglish(cleanTok);
  });

  return converted.join('').trim();
}

// ── General Text Translation: English -> Urdu ───────────────────────

export function translateEnglishToUrdu(text?: string): string {
  if (!text || typeof text !== 'string') return '';
  let trimmed = text.trim();
  if (!trimmed) return '';

  // Clean any corrupted transliterations
  if (isCorruptedTransliteration(trimmed)) {
    return cleanCorruptedUrdu(trimmed);
  }

  if (isUrduText(trimmed)) return trimmed; // Already Urdu

  // Check direct compound title resolution first
  const compoundMatch = translateCompoundTitleToUrdu(trimmed);
  if (compoundMatch) return compoundMatch;

  // Leverage the comprehensive bilingual dictionary library
  const libResult = translateEnglishToUrduWithLibrary(trimmed);
  if (libResult && isUrduText(libResult)) {
    return libResult;
  }

  let translated = libResult || trimmed;

  // 1. Replace multi-word phrases
  for (const [regex, urd] of COMMON_PHRASES_ENG_TO_URDU) {
    translated = translated.replace(regex, urd);
  }

  // 2. Direct dictionary multi-word checks (Leadership & Occupations)
  const lowerText = translated.toLowerCase();
  for (const [eng, urd] of Object.entries(LEADERSHIP_ROLES_ENG_TO_URDU)) {
    const reg = new RegExp(`\\b${eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    if (reg.test(translated)) {
      translated = translated.replace(reg, urd);
    }
  }

  // 3. Tokenize and replace known terms
  const tokens = translated.split(/(\s+|[,.:;!?"'()\[\]]+)/);
  const converted = tokens.map(tok => {
    if (/\d/.test(tok) || /[@:/]/.test(tok)) return tok; // Numbers, emails, URLs stay English
    const cleanTok = tok.toLowerCase().replace(/[^a-z]/g, '');
    if (!cleanTok) return tok;
    if (LEADERSHIP_ROLES_ENG_TO_URDU[cleanTok]) return LEADERSHIP_ROLES_ENG_TO_URDU[cleanTok];
    if (GENERAL_VOCAB_ENG_TO_URDU[cleanTok]) return GENERAL_VOCAB_ENG_TO_URDU[cleanTok];
    if (NAMES_DICT[cleanTok]) return NAMES_DICT[cleanTok];
    if (ADDRESS_DICT[cleanTok]) return ADDRESS_DICT[cleanTok];
    if (OCCUPATIONS_DICT[cleanTok]) return OCCUPATIONS_DICT[cleanTok];
    if (MONTHS_ENG_TO_URDU[cleanTok]) return MONTHS_ENG_TO_URDU[cleanTok];
    return phoneticWordToUrdu(cleanTok);
  });

  return converted.join('').trim();
}

// ── Registration Bi-directional Processing Helper ───────────────────

export function processRegistrationTranslations(reg: any): any {
  if (!reg) return reg;

  const isNameUrdu = isUrduText(reg.fullName);
  const isFatherUrdu = isUrduText(reg.fatherName);
  const isStreetUrdu = isUrduText(reg.street);
  const isCityUrdu = isUrduText(reg.city);
  const isWorkUrdu = isUrduText(reg.work);

  const fullNameEn = isNameUrdu ? translateNameToEnglish(reg.fullName) : reg.fullName;
  const fullNameUr = isNameUrdu ? reg.fullName : translateNameToUrdu(reg.fullName);

  const fatherNameEn = isFatherUrdu ? translateNameToEnglish(reg.fatherName) : reg.fatherName;
  const fatherNameUr = isFatherUrdu ? reg.fatherName : translateNameToUrdu(reg.fatherName);

  const streetEn = isStreetUrdu ? translateAddressToEnglish(reg.street) : (reg.street || '');
  const streetUr = isStreetUrdu ? (reg.street || '') : translateAddressToUrdu(reg.street);

  const cityEn = isCityUrdu ? translateCityToEnglish(reg.city) : reg.city;
  const cityUr = isCityUrdu ? reg.city : translateCityToUrdu(reg.city);

  const stateEn = translateStateToEnglish(reg.state || 'KPK');
  const stateUr = translateStateToUrdu(reg.state || 'خیبر پختونخوا');

  const countryEn = translateCountryToEnglish(reg.country || 'Pakistan');
  const countryUr = translateCountryToUrdu(reg.country || 'پاکستان');

  const workEn = isWorkUrdu ? translateOccupationToEnglish(reg.work) : (reg.work || 'Community Member');
  const workUr = isWorkUrdu ? (reg.work || 'کمیونٹی ممبر') : translateOccupationToUrdu(reg.work);

  const membershipTypeEn = translateMembershipTypeToEnglish(reg.membershipType || 'Active Member');
  const membershipTypeUr = translateMembershipTypeToUrdu(reg.membershipType || 'باقاعدہ رکن');

  const genderEn = translateGenderToEnglish(reg.gender || 'Male');
  const genderUr = translateGenderToUrdu(reg.gender || 'مرد');

  const educationEn = translateEducationToEnglish(reg.education || "Bachelor's Degree");
  const educationUr = translateEducationToUrdu(reg.education || 'گریجویشن');

  const residentialStatusEn = translateResidentialStatusToEnglish(reg.residentialStatus || 'Resident (Pakistan)');
  const residentialStatusUr = translateResidentialStatusToUrdu(reg.residentialStatus || 'مستقل رہائشی (پاکستان)');

  const cardId = reg.cardId || `AB-26-${String(Math.floor(100000 + Math.random() * 900000))}`;

  return {
    ...reg,
    cardId,
    fullNameEn,
    fullNameUr,
    fatherNameEn,
    fatherNameUr,
    streetEn,
    streetUr,
    cityEn,
    cityUr,
    stateEn,
    stateUr,
    countryEn,
    countryUr,
    workEn,
    workUr,
    membershipTypeEn,
    membershipTypeUr,
    genderEn,
    genderUr,
    educationEn,
    educationUr,
    residentialStatusEn,
    residentialStatusUr,
  };
}

// Re-export master dictionary libraries and lookup utilities
export {
  translateUrduToEnglishWithLibrary,
  translateEnglishToUrduWithLibrary,
  searchBilingualDictionary,
  lookupDictionaryTerm,
  ALL_DICTIONARY_ENTRIES,
};

