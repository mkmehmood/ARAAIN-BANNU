export type Language = 'en' | 'ur';

export interface Program {
  id?: number | string;
  icon_name: string;
  color: string;
  title: string;
  desc: string;
  sort_order?: number;
}

export interface Leader {
  id?: number | string;
  initials: string;
  name: string;
  role: string;
  email?: string;
  featured?: boolean | number;
  photo_data?: string;
  sort_order?: number;
}

export interface EventItem {
  id?: number | string;
  day: string;
  month: string;
  tag: string;
  title: string;
  time_str: string;
  place: string;
  sort_order?: number;
}

export interface PageItem {
  id?: number | string;
  slug: string;
  label: string;
  title: string;
  body: string;
  published?: boolean | number;
  sort_order?: number;
}

export interface GalleryItem {
  id?: number | string;
  data_url: string;
  caption?: string;
  sort_order?: number;
}

export interface SiteSettings {
  // Identity
  siteName: string;
  siteTagline: string;
  siteSubName: string;
  siteSubTagline: string;
  logoData?: string;

  // Hero
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  heroTagline: string;
  heroImage?: string;

  // About
  aboutTitle: string;
  aboutSubtitle: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  statMembers: string;
  statPrograms: string;
  statCities: string;
  chairmanName: string;
  chairmanQuote: string;

  // Sections
  programsTitle: string;
  programsDesc: string;
  leadershipTitle: string;
  membershipTitle: string;
  membershipDesc: string;
  donateTitle: string;
  donateDesc: string;
  eventsTitle: string;
  galleryTitle: string;
  galleryDesc: string;

  // Contact
  contactAddress: string;
  contactHours: string;
  contactPhone: string;
  contactEmail: string;

  // Social
  socialFacebook: string;
  socialTwitter: string;
  socialWhatsapp: string;
  socialInstagram: string;

  // Footer
  footerDesc: string;
  footerCopy: string;

  // Donation Accounts
  bankName: string;
  bankTitle: string;
  bankAccount: string;
  bankIBAN: string;
  bankBranch: string;
  epTitle: string;
  epNumber: string;
  jcTitle: string;
  jcNumber: string;
  intBank: string;
  intSwift: string;
  intIBAN: string;

  [key: string]: any;
}

export interface Registration {
  _id?: string;
  fullName: string;
  fatherName: string;
  gender: string;
  membershipType: string;
  cnic: string;
  dob: string;
  email: string;
  whatsapp: string;
  residentialStatus: string;
  affiliated?: string;
  education?: string;
  work?: string;
  reason?: string;
  street?: string;
  city: string;
  state?: string;
  country: string;
  photoData?: string;
  status?: 'new' | 'approved' | 'rejected' | string;
  cardId?: string;
  submittedAt?: any;

  // Processed Bi-directional Translations
  fullNameEn?: string;
  fullNameUr?: string;
  fatherNameEn?: string;
  fatherNameUr?: string;
  streetEn?: string;
  streetUr?: string;
  cityEn?: string;
  cityUr?: string;
  stateEn?: string;
  stateUr?: string;
  countryEn?: string;
  countryUr?: string;
  workEn?: string;
  workUr?: string;
  membershipTypeEn?: string;
  membershipTypeUr?: string;
  genderEn?: string;
  genderUr?: string;
  educationEn?: string;
  educationUr?: string;
  residentialStatusEn?: string;
  residentialStatusUr?: string;
}

export interface Donation {
  _id?: string;
  donorName: string;
  phone: string;
  email?: string;
  amount: string | number;
  method: string;
  txId?: string;
  note?: string;
  photoData?: string;
  status?: 'unverified' | 'verified' | 'rejected' | string;
  submittedAt?: any;
}

export interface ContactMessage {
  id?: string | number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'unread' | 'read';
  createdAt?: any;
}
