/**
 * Comprehensive English to Urdu Transliterator and Dictionary
 * Designed for Pakistani names, Islamic names, professions, addresses, locations,
 * and registration fields for the Araain Bannu ID Card.
 *
 * Rules:
 * - Digits (0-9) remain in standard English digits format (e.g., 11101-1234567-1).
 * - Emails and URLs remain in clean English format.
 * - Names, titles, addresses, cities, and professions are translated/transliterated to Urdu.
 */

// Common Pakistani & Islamic Names Dictionary
const NAMES_DICT: Record<string, string> = {
  // Islamic & Prophets / Companions
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

// Common Address & Location Terms Dictionary
const ADDRESS_DICT: Record<string, string> = {
  // Bannu Localities & KPK
  bannu: 'بنوں',
  banoo: 'بنوں',
  peshawar: 'پشاور',
  kohat: 'کوہاٹ',
  lakki: 'لکی',
  marwat: 'مروت',
  karak: 'کرک',
  dera: 'ڈیرہ',
  ismail: 'اسماعیل',
  khan: 'خان',
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

  // Bannu Specific Areas
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
  deh: 'دیہہ',
  colony: 'کالونی',
  town: 'ٹاؤن',
  plaza: 'پلازہ',
  market: 'مارکیٹ',
  post: 'ڈاک',
  office: 'خانہ',
  po: 'ڈاکخانہ',
  railway: 'ریلوے',
  station: 'اسٹیشن',
  hospital: 'ہسپتال',
  school: 'اسکول',
  college: 'کالج',
  university: 'یونیورسٹی',
  mosque: 'مسجد',
  masjid: 'مسجد',
};

// Common Professions Dictionary
const OCCUPATIONS_DICT: Record<string, string> = {
  teacher: 'استاد / مدرس',
  professor: 'پروفیسر',
  lecturer: 'لیکچرر',
  doctor: 'ڈاکٹر / معالج',
  physician: 'طبیب / معالج',
  engineer: 'انجینئر',
  lawyer: 'وکیل',
  advocate: 'ایڈووکیٹ / وکیل',
  businessman: 'تاجر / کاروباری',
  business: 'کاروبار',
  trader: 'تاجر',
  student: 'طالب علم',
  banker: 'بینکر',
  accountant: 'اکاؤنٹنٹ',
  manager: 'منیجر',
  director: 'ڈائریکٹر',
  officer: 'افسر',
  clerk: 'کلرک',
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
  scholar: 'عالمِ دین / محقق',
  retired: 'ریٹائرڈ',
  govt: 'سرکاری ملازم',
  government: 'سرکاری ملازم',
  'govt servant': 'سرکاری ملازم',
  'govt employee': 'سرکاری ملازم',
  'private job': 'نجی ملازمت',
  'private employee': 'نجی ملازم',
  freelancer: 'فری لانسر',
  developer: 'سافٹ ویئر ڈویلپر',
  programmer: 'پروگرامر',
  'social worker': 'سماجی کارکن',
  worker: 'کارکن',
  laborer: 'محنت کش / مزدور',
  none: 'ذاتی کام',
  'self employed': 'ذاتی کاروبار',
};

// Membership Types Dictionary
const MEMBERSHIP_TYPES_DICT: Record<string, string> = {
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

// Residential Status
const RESIDENTIAL_STATUS_DICT: Record<string, string> = {
  'resident (pakistan)': 'مستقل رہائشی (پاکستان)',
  resident: 'مستقل رہائشی',
  'overseas pakistani': 'اوورسیز پاکستانی',
  overseas: 'اوورسیز',
  'temporary resident': 'عارضی رہائشی',
};

// Education Levels
const EDUCATION_DICT: Record<string, string> = {
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

/**
 * Checks if string is already primarily in Urdu / Arabic script
 */
export function isUrduText(text: string): boolean {
  if (!text) return false;
  // Arabic / Urdu unicode range
  const urduMatches = text.match(/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g);
  return (urduMatches ? urduMatches.length : 0) > (text.length * 0.3);
}

/**
 * Phonetic transliteration rules for English words to Urdu script
 * Used when a specific word isn't directly in the dictionary.
 */
function phoneticWordToUrdu(word: string): string {
  const clean = word.toLowerCase().trim();
  if (!clean) return '';

  // Single-letter or very short abbreviations
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

  // Phonetic replacement map
  let str = clean
    .replace(/^al-?/g, 'ال')
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
    .replace(/ee/g, 'ی')
    .replace(/oo/g, 'و')
    .replace(/ou/g, 'و')
    .replace(/ai/g, 'ائی')
    .replace(/ay/g, 'ے')
    .replace(/aa/g, 'ا')
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

  return str;
}

/**
 * Translates a Person's Name to Urdu.
 * If already Urdu, returns as-is.
 * E.g., "Muhammad Tahir Meer" -> "محمد طاہر میر"
 */
export function translateNameToUrdu(name: string): string {
  if (!name || typeof name !== 'string') return '';
  const trimmed = name.trim();
  if (isUrduText(trimmed)) return trimmed;

  // Split into tokens preserving hyphens
  const tokens = trimmed.split(/[\s,]+/);
  const urduTokens = tokens.map(tok => {
    const cleanTok = tok.toLowerCase().replace(/[^a-z]/g, '');
    if (!cleanTok) return tok;

    // Check names dictionary
    if (NAMES_DICT[cleanTok]) {
      return NAMES_DICT[cleanTok];
    }
    // Check address / title dictionary
    if (ADDRESS_DICT[cleanTok]) {
      return ADDRESS_DICT[cleanTok];
    }
    // Phonetic fallback
    return phoneticWordToUrdu(cleanTok);
  });

  return urduTokens.filter(Boolean).join(' ');
}

/**
 * Translates an Address to Urdu while preserving numeric digits (0-9).
 * E.g., "Mohallah Qasaban, Bannu City" -> "محلہ قصاباں، بنوں سٹی"
 * "House 14, Street 5, Mandan Road, Bannu" -> "مکان نمبر 14، گلی 5، منڈان روڈ، بنوں"
 */
export function translateAddressToUrdu(address: string): string {
  if (!address || typeof address !== 'string') return '';
  const trimmed = address.trim();
  if (isUrduText(trimmed)) return trimmed;

  // Split by comma or space boundaries while keeping structure
  const parts = trimmed.split(/,\s*/);
  const translatedParts = parts.map(part => {
    const tokens = part.split(/\s+/);
    const urduTokens = tokens.map(tok => {
      // If token is a number or contains digits (e.g. 14, 5-A, #12), keep standard English digits
      if (/\d/.test(tok)) {
        return tok;
      }
      const cleanTok = tok.toLowerCase().replace(/[^a-z]/g, '');
      if (!cleanTok) return tok;

      if (ADDRESS_DICT[cleanTok]) {
        return ADDRESS_DICT[cleanTok];
      }
      if (NAMES_DICT[cleanTok]) {
        return NAMES_DICT[cleanTok];
      }
      return phoneticWordToUrdu(cleanTok);
    });
    return urduTokens.filter(Boolean).join(' ');
  });

  return translatedParts.filter(Boolean).join('، ');
}

/**
 * Translates Occupation / Work to Urdu.
 */
export function translateOccupationToUrdu(work: string): string {
  if (!work || typeof work !== 'string') return 'کمیونٹی ممبر';
  const trimmed = work.trim();
  if (isUrduText(trimmed)) return trimmed;

  const key = trimmed.toLowerCase();
  if (OCCUPATIONS_DICT[key]) {
    return OCCUPATIONS_DICT[key];
  }

  // Try substring lookup
  for (const [eng, urd] of Object.entries(OCCUPATIONS_DICT)) {
    if (key.includes(eng)) {
      return urd;
    }
  }

  return translateNameToUrdu(trimmed);
}

/**
 * Translates City to Urdu.
 */
export function translateCityToUrdu(city: string): string {
  if (!city || typeof city !== 'string') return 'بنوں';
  const trimmed = city.trim();
  if (isUrduText(trimmed)) return trimmed;

  const clean = trimmed.toLowerCase().replace(/[^a-z]/g, '');
  if (ADDRESS_DICT[clean]) {
    return ADDRESS_DICT[clean];
  }
  return translateNameToUrdu(trimmed);
}

/**
 * Translates Province / State to Urdu.
 */
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

/**
 * Translates Country to Urdu.
 */
export function translateCountryToUrdu(country: string): string {
  if (!country || typeof country !== 'string') return 'پاکستان';
  const trimmed = country.trim();
  if (isUrduText(trimmed)) return trimmed;

  const clean = trimmed.toLowerCase();
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

/**
 * Translates Gender to Urdu.
 */
export function translateGenderToUrdu(gender: string): string {
  if (!gender) return 'مرد';
  const clean = gender.toLowerCase().trim();
  if (clean === 'male' || clean === 'm' || clean === 'مرد') return 'مرد';
  if (clean === 'female' || clean === 'f' || clean === 'عورت' || clean === 'خاتون') return 'خاتون';
  return 'دیگر';
}

/**
 * Translates Membership Type to Urdu.
 */
export function translateMembershipTypeToUrdu(type: string): string {
  if (!type) return 'باقاعدہ رکن';
  const clean = type.toLowerCase().trim();
  if (MEMBERSHIP_TYPES_DICT[clean]) {
    return MEMBERSHIP_TYPES_DICT[clean];
  }
  for (const [k, v] of Object.entries(MEMBERSHIP_TYPES_DICT)) {
    if (clean.includes(k)) return v;
  }
  return isUrduText(type) ? type : 'باقاعدہ رکن';
}

/**
 * Translates Residential Status to Urdu.
 */
export function translateResidentialStatusToUrdu(status: string): string {
  if (!status) return 'مستقل رہائشی (پاکستان)';
  const clean = status.toLowerCase().trim();
  if (RESIDENTIAL_STATUS_DICT[clean]) {
    return RESIDENTIAL_STATUS_DICT[clean];
  }
  return isUrduText(status) ? status : 'مستقل رہائشی (پاکستان)';
}

/**
 * Translates Education to Urdu.
 */
export function translateEducationToUrdu(education: string): string {
  if (!education) return 'گریجویشن';
  const clean = education.toLowerCase().trim();
  if (EDUCATION_DICT[clean]) {
    return EDUCATION_DICT[clean];
  }
  return isUrduText(education) ? education : translateNameToUrdu(education);
}
