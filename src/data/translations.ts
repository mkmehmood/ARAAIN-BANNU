import { SiteSettings, Program, Leader, EventItem, PageItem, GalleryItem, Language } from '../types';
import { translateNameToUrdu, translateOccupationToUrdu } from '../utils/urduTransliterator';

export const EN: Record<string, string> = {
  // Brand & Identity
  siteName: "ARAAIN BANNU",
  siteTagline: "Unity, Empowerment, Development",
  siteSubName: "Bannu Regional Organisation",
  siteSubTagline: "Strengthening community bonds across Bannu & KPK",
  logoInitials: "AB",
  langToggleText: "Urdu",
  cloudOnline: "Firebase Connected",
  cloudSyncing: "Syncing...",
  cloudOffline: "Local Mode",
  
  // Navigation
  navHome: "Home",
  navAbout: "About Us",
  navPrograms: "Programs",
  navLeadership: "Leadership",
  navEvents: "Events",
  navGallery: "Gallery",
  navContact: "Contact",
  navAdmin: "Admin Portal",
  navApply: "Join Us",
  navDonate: "Donate",

  // Hero
  heroBadge: "Global Community Movement",
  heroTitle: "ARAAIN BANNU",
  heroSub: "Empowering Our Next Generation, Proud Of Our Heritage",
  heroTagline: "Uniting the Arain Community Worldwide — Strength, Unity, Progress. Join a legacy of community development, education, and welfare.",
  btnDiscover: "Discover Mission",
  btnEvents: "Upcoming Events",
  btnBecomeMember: "Become a Member",

  // About
  aboutTag: "Who We Are",
  aboutTitle: "A Global Vision Rooted in Service & Community",
  aboutSubtitle: "Dedicated to the socio-economic advancement of the Arain community worldwide.",
  aboutP1: "The ARAAIN BANNU represents thousands of families across Pakistan and the diaspora, driven by a shared commitment to education, welfare, and sustainable development.",
  aboutP2: "Through strategic initiatives, scholarship programs, community centers, and youth engagement, we build bridges between tradition and modern opportunity.",
  aboutP3: "Our regional chapter in Bannu works actively at the grassroots level, providing relief, career mentorship, and community cohesion for families across Southern Khyber Pakhtunkhwa.",
  statMembers: "500+",
  statMembersLabel: "Active Members",
  statPrograms: "8+",
  statProgramsLabel: "Flagship Programs",
  statCities: "30+",
  statCitiesLabel: "Connected Cities",
  chairmanTitle: "Leadership Message",
  chairmanName: "Dr. Aitzaz Chaudhary",
  chairmanRole: "Global Chairman",
  chairmanQuote: "Our unity is our greatest strength. When we empower our youth and support our families, we build a foundation that endures for generations.",
  valueTransparent: "Transparent Welfare",
  valueScholarships: "Merit Scholarships",
  valueBrotherhood: "Global Brotherhood",

  // Programs
  programsTitle: "Key Initiatives & Programs",
  programsDesc: "Targeted programs designed to uplift families, educate youth, and preserve community welfare.",
  btnLearnMore: "Learn More",

  // Leadership
  leadershipTitle: "Our Leadership Team",
  leadershipDesc: "Committed community servants providing strategic guidance and global connection.",
  featuredBadge: "Featured",

  // Events
  eventsTitle: "Upcoming Events & Programs",
  eventsDesc: "Stay connected with upcoming gatherings, business workshops, and annual assemblies.",
  eventLocation: "Location",
  eventTime: "Time",

  // Gallery
  galleryTitle: "Community Moments",
  galleryDesc: "A visual journey through our community events, gatherings, and welfare drives.",

  // Call to Action
  ctaTitle: "Be Part of Our Journey",
  ctaDesc: "Join as an active member or support our welfare initiatives with your generous contributions.",
  membershipCardTitle: "Official Membership",
  membershipCardDesc: "Register today to receive your official membership ID card, vote in community affairs, and access member-exclusive programs.",
  donateCardTitle: "Support Our Welfare",
  donateCardDesc: "Your donations directly fund education scholarships, healthcare camps, and emergency relief operations.",
  btnApplyMembership: "Apply for Membership",
  btnDonateNow: "Donate Now",

  // Membership Form
  memFormTitle: "Membership Registration",
  memFormSubtitle: "Complete this form to apply for official membership with ARAAIN BANNU.",
  memStep1: "Personal Details",
  memStep2: "Contact & Identity",
  memStep3: "Professional & Background",
  memStep4: "Address & Photo",

  fieldFullName: "Full Name",
  fieldFatherName: "Father / Guardian Name",
  fieldGender: "Gender",
  fieldMale: "Male",
  fieldFemale: "Female",
  fieldOther: "Other",
  fieldMembershipType: "Membership Type",
  optGeneralMember: "General Member",
  optLifeMember: "Life Member",
  optYouthMember: "Youth Member",
  optAssociateMember: "Associate Member",
  optSeniorMember: "Senior Member",
  fieldCnic: "National Identity Card / B-Form",
  fieldDob: "Date of Birth",
  fieldEmail: "Email Address",
  fieldWhatsapp: "WhatsApp Number",
  fieldResidentialStatus: "Residential Status",
  optResident: "Resident (Pakistan)",
  optOverseas: "Overseas Pakistani",
  optForeign: "Foreign National",
  fieldAffiliated: "Affiliated Community Organisation",
  fieldEducation: "Highest Education",
  optMetric: "Matriculation / O-Level",
  optIntermediate: "Intermediate / A-Level",
  optBachelors: "Bachelor's Degree",
  optMasters: "Master's Degree",
  optDoctorate: "Doctorate (PhD)",
  optOther: "Other / Vocational",
  fieldWork: "Occupation / Profession",
  fieldReason: "Reason for Joining",
  fieldStreet: "Street Address",
  fieldCity: "City / District",
  fieldState: "Province / State",
  fieldCountry: "Country",
  fieldPhoto: "Profile Photograph",
  photoHint: "Upload a clear passport-style photo (max 2MB).",
  agreeTerms: "I declare that all information provided is accurate and I agree to abide by the constitution and code of ethics of ARAAIN BANNU.",
  btnSubmitApplication: "Submit Application",
  btnSubmitting: "Submitting...",
  submissionSuccessTitle: "Registration Submitted Successfully!",
  submissionSuccessDesc: "Thank you for registering. Your application has been recorded in the central database. Our executive council will review your details.",
  appRefId: "Application Reference ID",
  closeModal: "Close",

  // Donation Form & Modal
  donModalTitle: "Make a Donation",
  donModalSubtitle: "Support education, welfare, and community initiatives.",
  tabBankTransfer: "Bank Transfer",
  tabMobileWallets: "Mobile Wallets",
  tabInternational: "International Transfer",
  tabConfirmPayment: "Confirm Payment",
  selectAmount: "Select or Enter Amount (PKR)",
  customAmount: "Custom Amount",
  bankDetailsHeading: "Official Bank Account Details",
  fieldBankName: "Bank Name",
  fieldAccountTitle: "Account Title",
  fieldAccountNumber: "Account Number",
  fieldIBAN: "IBAN",
  fieldBranchCode: "Branch Code",
  mobileWalletsHeading: "Easypaisa & JazzCash",
  fieldEasypaisa: "Easypaisa Account",
  fieldJazzcash: "JazzCash Account",
  intDetailsHeading: "International Wire Transfer",
  fieldSwift: "SWIFT Code",
  confirmFormHeading: "Submit Payment Proof",
  confirmFormDesc: "After transferring funds, please provide your transaction reference so our accounts team can verify and issue an official receipt.",
  fieldDonorName: "Donor Name",
  fieldDonorPhone: "Phone / WhatsApp",
  fieldPaymentMethod: "Payment Method",
  optMeezanBank: "Bank Transfer (Meezan Bank)",
  optEasypaisa: "Easypaisa",
  optJazzcash: "JazzCash",
  optInternationalTransfer: "International Wire / SWIFT",
  fieldTxId: "Transaction / Reference ID",
  fieldDonationNote: "Note / Purpose (Optional)",
  fieldProofPhoto: "Upload Payment Screenshot / Slip",
  btnSubmitDonation: "Submit Confirmation",
  donationSuccessTitle: "Donation Recorded!",
  donationSuccessDesc: "Your contribution details have been received. We will verify and send your official confirmation.",

  // Contact
  contactHeading: "Get In Touch",
  contactSubheading: "Have questions about our initiatives or wish to visit our regional center? We welcome your message.",
  contactAddressTitle: "Our Office",
  contactHoursTitle: "Office Hours",
  contactPhoneTitle: "Helpline & WhatsApp",
  contactEmailTitle: "Official Email",
  formName: "Your Full Name",
  formEmail: "Email Address",
  formPhone: "Phone Number",
  formSubject: "Subject",
  formMessage: "Your Message",
  btnSendMessage: "Send Message",
  msgSentSuccess: "Your message has been sent successfully. We will get back to you shortly.",

  // Footer
  footerAboutTitle: "About ARAAIN BANNU",
  footerQuickLinks: "Quick Navigation",
  footerCommunityPages: "Information & Policies",
  footerContactTitle: "Regional Center",
  allRightsReserved: "All rights reserved.",

  // Admin
  adminDashboard: "Admin Management System",
  adminLoginTitle: "Administrator Sign In",
  adminLoginSub: "Access the central council database and content manager.",
  adminEmail: "Admin Email",
  adminPassword: "Password",
  btnLogin: "Sign In to Admin",
  btnLogout: "Sign Out",
  tabOverview: "Overview",
  tabRegistrations: "Membership Records",
  tabDonations: "Donation Records",
  tabMessages: "Contact Messages",
  tabCMS: "Content Manager",
  totalMembers: "Total Members",
  pendingReview: "Pending Review",
  totalFunds: "Total Donations",
  unverifiedDonations: "Unverified",
  exportCSV: "Export CSV",
  searchPlaceholder: "Search by name, identity card, phone, or city...",
  generateCard: "Generate ID Card",
  statusApproved: "Approved",
  statusPending: "Pending",
  statusRejected: "Rejected",
  statusVerified: "Verified",
  statusUnverified: "Unverified",
  actions: "Actions",
  viewDetails: "View Details",
  printCard: "Print Card",
  saveChanges: "Save Changes",
  syncWithCloud: "Sync with Cloud",
  cloudSynced: "Synced with Firebase",

  // Additional Bilingual UI Keys
  welfareFundTitle: "ARAAIN BANNU Welfare Fund",
  tabTransferDetails: "1. Transfer Details",
  tabConfirmPaymentStep: "2. Confirm Payment & Receipt",
  trackingIdLabel: "Confirmation Tracking ID",
  beneficiaryBank: "Beneficiary Bank",
  swiftBic: "SWIFT / BIC",
  fundsSentSubmitProof: "I Have Sent Funds — Submit Proof",
  recordedAmount: "Recorded Amount",
  changeScreenshot: "Change Screenshot",
  uploadScreenshot: "Upload Screenshot",
  screenshotHelp: "Helps our accounts department verify and acknowledge immediately.",
  phEnterCustomAmt: "Or enter custom amount in PKR...",
  phDonorName: "e.g. Asad Chaudhary",
  phDonorPhone: "+92 300 0000000",
  phTxnRef: "e.g. TXN-98765432",
  phDonationNote: "e.g. Education scholarship fund, Bannu medical camp",
  meezanBankTab: "Meezan Bank",
  mobileWalletsTab: "Easypaisa / JazzCash",
  swiftWireTab: "SWIFT Wire",
  copyBtn: "Copy",
  copiedBtn: "Copied",
  titleLabel: "Title",
  errDonorName: "Please enter donor name.",
  errPhone: "Please enter phone / WhatsApp number.",
  errScreenshot: "Could not load screenshot. Please retry.",
  errSubmitDonation: "Failed to submit payment verification.",
  contactFormTitle: "Send Direct Inquiry",
  contactFormDesc: "Our communications team responds promptly to all community members.",
  phFullName: "e.g. Asad Chaudhary",
  phFatherName: "e.g. Haji Meer Muhammad",
  phEmail: "you@domain.com",
  phSubject: "e.g. Volunteering, Scholarships inquiry",
  phMessage: "Please write your detailed message...",
  sendingBtn: "Sending...",
  changePhoto: "Change Photo",
  uploadPhoto: "Upload Photograph",
  phWork: "e.g. Teacher, Engineer, Businessman",
  phAffiliated: "e.g. Arain Youth Bannu / None",
  phReason: "Tell us how you would like to contribute or participate in welfare initiatives...",
  phStreet: "Mohallah / Street / House #",
  errAcceptTerms: "Please accept the declaration terms before submitting.",
  communityCardTitle: "COMMUNITY MEMBERSHIP CARD",
  cardCertifiesText: "This card certifies official affiliation with ARAAIN BANNU, committed to welfare, education, and collective progress.",
  memberIdentification: "MEMBER IDENTIFICATION",
  scanToVerify: "Scan to Verify",
  scanVerifyDesc: "Scan using any phone camera to verify official membership records.",
  cardAuthorityText: "Issued under the authority of Executive Council Bannu.",
  generatingCardText: "Generating secure membership card & cryptographic QR code...",
  btnPublicSite: "View Public Site",
};

export const UR: Record<string, string> = {
  // Brand & Identity
  siteName: "آرائیں بنوں",
  siteTagline: "اتحاد، خود مختاری، ترقی",
  siteSubName: "بنوں علاقائی تنظیم",
  siteSubTagline: "بنوں اور خیبر پختونخوا میں برادری کے رشتوں کو مضبوط بنانا",
  logoInitials: "آ ب",
  langToggleText: "انگریزی",
  cloudOnline: "کلاؤڈ آن لائن",
  cloudSyncing: "ہم آہنگی جاری ہے...",
  cloudOffline: "آف لائن موڈ",

  // Navigation
  navHome: "صفحہ اول",
  navAbout: "ہمارے متعلق",
  navPrograms: "پروگرامز",
  navLeadership: "قیادت",
  navEvents: "تقریبات",
  navGallery: "تصاویر گیلری",
  navContact: "رابطہ",
  navAdmin: "ایڈمن پورٹل",
  navApply: "رکنیت لیں",
  navDonate: "عطیہ دیں",

  // Hero
  heroBadge: "عالمی برادری کی تحریک",
  heroTitle: "آرائیں بنوں",
  heroSub: "نئی نسل کو بااختیار بنانا، اپنے ورثے پر فخر",
  heroTagline: "دنیا بھر میں آرائیں برادری کا اتحاد — طاقت، یکجہتی، ترقی۔ برادری کی فلاح، تعلیم اور ترقی کے ایک عظیم مشن کا حصہ بنیں۔",
  btnDiscover: "ہمارا مشن",
  btnEvents: "آئندہ تقریبات",
  btnBecomeMember: "رکن بنیں",

  // About
  aboutTag: "ہمارا تعارف",
  aboutTitle: "خدمت اور کمیونٹی پر مبنی ایک روشن وژن",
  aboutSubtitle: "دنیا بھر میں آرائیں برادری کی سماجی و معاشی ترقی کے لیے کوشاں۔",
  aboutP1: "آرائیں بنوں پاکستان اور بیرون ملک بسنے والے ہزاروں خاندانوں کی نمائندگی کرتی ہے، جو تعلیم، فلاح اور پائیدار ترقی کے مشترکہ عزم سے جڑے ہوئے ہیں۔",
  aboutP2: "اسٹریٹجک منصوبوں، تعلیمی وظائف، کمیونٹی سینٹرز اور نوجوانوں کی رہنمائی کے ذریعے ہم روایات اور جدید مواقع کے درمیان مضبوط پل تعمیر کر رہے ہیں۔",
  aboutP3: "بنوں میں ہماری علاقائی شاخ نچلی سطح پر فعال ہے، جو جنوبی خیبر پختونخوا کے خاندانوں کے لیے امداد، کیریئر رہنمائی اور باہمی اتحاد فراہم کرتی ہے۔",
  statMembers: "+۵۰۰",
  statMembersLabel: "فعال اراکین",
  statPrograms: "+۸",
  statProgramsLabel: "بنیادی پروگرامز",
  statCities: "+۳۰",
  statCitiesLabel: "منسلک شہر",
  chairmanTitle: "پیغام چیئرمین",
  chairmanName: "ڈاکٹر اعزاز چوہدری",
  chairmanRole: "گلوبل چیئرمین",
  chairmanQuote: "ہمارا اتحاد ہی ہماری سب سے بڑی طاقت ہے۔ جب ہم اپنے نوجوانوں کو بااختیار بناتے ہیں اور خاندانوں کو سہارا دیتے ہیں تو نسلوں کے لیے مضبوط بنیاد بنتی ہے۔",
  valueTransparent: "شفاف فلاحی بہبود",
  valueScholarships: "تعلیمی وظائف اور اسکالرشپس",
  valueBrotherhood: "عالمی برادری کا اتحاد",

  // Programs
  programsTitle: "اہم منصوبے اور فلاحی پروگرامز",
  programsDesc: "خاندانوں کی مدد، نوجوانوں کی تعلیم اور برادری کی فلاح کے لیے جامع منصوبے۔",
  btnLearnMore: "مزید جانیے",

  // Leadership
  leadershipTitle: "ہماری قیادت",
  leadershipDesc: "مخلص اور پرعزم قائدین جو اسٹریٹجک رہنمائی اور عالمی ہم آہنگی فراہم کر رہے ہیں۔",
  featuredBadge: "نمایاں",

  // Events
  eventsTitle: "تقریبات اور اعلانات",
  eventsDesc: "آئندہ سیمینارز، بزنس ورکشاپس اور سالانہ اجتماعات سے باخبر رہیں۔",
  eventLocation: "مقام",
  eventTime: "وقت",

  // Gallery
  galleryTitle: "کمیونٹی کی یادگار جھلکیاں",
  galleryDesc: "ہمارے سیمینارز، فلاحی سرگرمیوں، یوتھ سمٹس اور علاقائی اجتماعات کی تصویری جھلکیاں۔",

  // Call to Action
  ctaTitle: "ہمارے اس عظیم سفر کا حصہ بنیں",
  ctaDesc: "ایک فعال رکن کے طور پر شامل ہوں یا اپنے عطیات کے ذریعے فلاحی کاموں میں ہاتھ بٹائیں۔",
  membershipCardTitle: "سرکاری رکنیت حاصل کریں",
  membershipCardDesc: "آج ہی اندراج کروائیں، اپنا باضابطہ ممبرشپ شناختی کارڈ حاصل کریں اور برادری کے خصوصی پروگرامز میں شرکت کریں۔",
  donateCardTitle: "فلاحی منصوبوں میں حصہ لیں",
  donateCardDesc: "آپ کے عطیات براہ راست غریب طلبہ کے وظائف، مفت میڈیکل کیمپس اور ہنگامی امدادی سرگرمیوں میں خرچ ہوتے ہیں۔",
  btnApplyMembership: "رکنیت کے لیے درخواست دیں",
  btnDonateNow: "عطیہ کی معلومات دیکھیں",

  // Membership Form
  memFormTitle: "رکنیت فارم",
  memFormSubtitle: "آرائیں بنوں کی باضابطہ رکنیت حاصل کرنے کے لیے درج ذیل معلومات فراہم فرمائیں۔",
  memStep1: "ذاتی معلومات",
  memStep2: "رابطہ اور شناخت",
  memStep3: "پیشہ ورانہ پس منظر",
  memStep4: "پتہ اور تصویر",

  fieldFullName: "پورا نام",
  fieldFatherName: "والد / سرپرست کا نام",
  fieldGender: "جنس",
  fieldMale: "مرد",
  fieldFemale: "خاتون",
  fieldOther: "دیگر",
  fieldMembershipType: "رکنیت کی قسم",
  optGeneralMember: "عام رکن",
  optLifeMember: "تایحیات رکن",
  optYouthMember: "نوجوان رکن (یوتھ)",
  optAssociateMember: "ایسوسی ایٹ رکن",
  optSeniorMember: "سینئر رکن",
  fieldCnic: "قومی شناختی کارڈ نمبر / بی فارم",
  fieldDob: "تاریخ پیدائش",
  fieldEmail: "ای میل ایڈریس",
  fieldWhatsapp: "واٹس ایپ نمبر",
  fieldResidentialStatus: "رہائشی حیثیت",
  optResident: "پاکستانی شہری (مقیم پاکستان)",
  optOverseas: "اوورسیز پاکستانی",
  optForeign: "غیر ملکی شہری",
  fieldAffiliated: "منسلک تنظیم (اگر کوئی ہو)",
  fieldEducation: "تعلیمی قابلیت",
  optMetric: "میٹرک / او لیول",
  optIntermediate: "انٹرمیڈیٹ / ایف اے / ایف ایس سی",
  optBachelors: "بیچلر ڈگری (گریجویشن)",
  optMasters: "ماسٹرز ڈگری",
  optDoctorate: "ڈاکٹریٹ (پی ایچ ڈی)",
  optOther: "دیگر / فنی تعلیم",
  fieldWork: "پیشہ / ملازمت / کاروبار",
  fieldReason: "شمولیت کا مقصد",
  fieldStreet: "گھر کا پتہ / گلی محلہ",
  fieldCity: "شہر / ضلع",
  fieldState: "صوبہ",
  fieldCountry: "ملک",
  fieldPhoto: "پاسپورٹ سائز تصویر",
  photoHint: "ایک واضح اور صاف تصویر اپ لوڈ فرمائیں (زیادہ سے زیادہ ۲ ایم بی)۔",
  agreeTerms: "میں تصدیق کرتا/کرتی ہوں کہ فراہم کردہ تمام معلومات درست ہیں اور میں آرائیں بنوں کے آئین اور قواعد وضوابط کی پابندی کروں گا۔",
  btnSubmitApplication: "درخواست جمع کروائیں",
  btnSubmitting: "جمع ہو رہی ہے...",
  submissionSuccessTitle: "درخواست کامیابی سے موصول ہو گئی!",
  submissionSuccessDesc: "رجسٹریشن کے لیے شکریہ۔ آپ کی درخواست کا اندراج سنٹرل ڈیٹا بیس میں ہو گیا ہے۔ منظوری کے بعد آپ کو باضابطہ کارڈ جاری کیا جائے گا۔",
  appRefId: "درخواست کا حوالہ نمبر",
  closeModal: "بند کریں",

  // Donation Form & Modal
  donModalTitle: "عطیہ / فنڈنگ جمع کروائیں",
  donModalSubtitle: "تعلیم، فلاحی کاموں اور کمیونٹی منصوبوں میں حصہ ڈالیں۔",
  tabBankTransfer: "بینک ٹرانسفر",
  tabMobileWallets: "موبائل والٹس (ایزی پیسہ / جاز کیش)",
  tabInternational: "بین الاقوامی ترسیل (سوئفٹ)",
  tabConfirmPayment: "ادائیگی کی تصدیق",
  selectAmount: "رقم منتخب یا درج کریں (پاکستانی روپے)",
  customAmount: "دیگر رقم",
  bankDetailsHeading: "سرکاری بینک اکاؤنٹ کی تفصیلات",
  fieldBankName: "بینک کا نام",
  fieldAccountTitle: "اکاؤنٹ کا عنوان",
  fieldAccountNumber: "اکاؤنٹ نمبر",
  fieldIBAN: "بین الاقوامی بینک اکاؤنٹ نمبر (آئی بی اے این)",
  fieldBranchCode: "برانچ کوڈ",
  mobileWalletsHeading: "ایزی پیسہ اور جاز کیش اکاؤنٹس",
  fieldEasypaisa: "ایزی پیسہ اکاؤنٹ",
  fieldJazzcash: "جاز کیش اکاؤنٹ",
  intDetailsHeading: "بین الاقوامی بینک ترسیل",
  fieldSwift: "سوئفٹ کوڈ",
  confirmFormHeading: "ادائیگی کا ثبوت جمع کروائیں",
  confirmFormDesc: "بینک یا موبائل اکاؤنٹ میں رقم بھیجنے کے بعد ٹرانزیکشن کی تفصیلات اور رسید کی تصویر یہاں اپ لوڈ فرمائیں۔",
  fieldDonorName: "عطیہ دہندہ کا نام",
  fieldDonorPhone: "فون / واٹس ایپ نمبر",
  fieldPaymentMethod: "ادائیگی کا طریقہ",
  optMeezanBank: "بینک ٹرانسفر (میزان بینک)",
  optEasypaisa: "ایزی پیسہ",
  optJazzcash: "جاز کیش",
  optInternationalTransfer: "بین الاقوامی ٹرانسفر",
  fieldTxId: "ٹرانزیکشن آئی ڈی / رسید نمبر",
  fieldDonationNote: "وضاحت یا نیت (اختیاری)",
  fieldProofPhoto: "رسید یا اسکرین شاٹ اپ لوڈ کریں",
  btnSubmitDonation: "تصدیق جمع کروائیں",
  donationSuccessTitle: "عطیہ کا اندراج ہو گیا!",
  donationSuccessDesc: "جزاک اللہ خیر! آپ کی تفصیلات کامیابی سے درج کر لی گئی ہیں۔ ہمارے فنانس ڈیپارٹمنٹ کی توثیق کے بعد آپ کو تصدیق موصول ہو جائے گی۔",

  // Contact
  contactHeading: "ہم سے رابطہ کریں",
  contactSubheading: "کیا آپ ہمارے منصوبوں میں شامل ہونا چاہتے ہیں یا دفتر تشریف لانا چاہتے ہیں؟ ہمیں ضرور آگاہ فرمائیں۔",
  contactAddressTitle: "مرکزی دفتر کا پتہ",
  contactHoursTitle: "اوقات کار",
  contactPhoneTitle: "ہیلپ لائن اور واٹس ایپ",
  contactEmailTitle: "سرکاری ای میل",
  formName: "آپ کا پورا نام",
  formEmail: "ای میل پتہ",
  formPhone: "فون نمبر",
  formSubject: "موضوع",
  formMessage: "آپ کا پیغام",
  btnSendMessage: "پیغام ارسال کریں",
  msgSentSuccess: "آپ کا پیغام کامیابی کے ساتھ موصول ہو چکا ہے۔ ہم جلد آپ سے رابطہ کریں گے۔",

  // Footer
  footerAboutTitle: "آرائیں بنوں کے بارے میں",
  footerQuickLinks: "فوری روابط",
  footerCommunityPages: "معلومات اور دستاویزات",
  footerContactTitle: "علاقائی مرکز",
  allRightsReserved: "تمام حقوق محفوظ ہیں۔",

  // Admin
  adminDashboard: "ایڈمن مینجمنٹ سسٹم",
  adminLoginTitle: "ایڈمنسٹریٹر لاگ ان",
  adminLoginSub: "سینٹرل کونسل ڈیٹا بیس اور مواد کے نظم کے لیے لاگ ان فرمائیں۔",
  adminEmail: "ایڈمن ای میل",
  adminPassword: "پاس ورڈ",
  btnLogin: "لاگ ان کریں",
  btnLogout: "لاگ آؤٹ",
  tabOverview: "جائزہ",
  tabRegistrations: "رکنیت کی درخواستیں",
  tabDonations: "عطیات کا ریکارڈ",
  tabMessages: "موصولہ پیغامات",
  tabCMS: "ویب سائٹ کا مواد",
  totalMembers: "کل اراکین",
  pendingReview: "زیر غور",
  totalFunds: "کل عطیات",
  unverifiedDonations: "غیر تصدیق شدہ",
  exportCSV: "سی ایس وی ڈاؤن لوڈ",
  searchPlaceholder: "نام، شناختی کارڈ، فون یا شہر سے تلاش کریں...",
  generateCard: "شناختی کارڈ بنائیں",
  statusApproved: "منظور شدہ",
  statusPending: "زیر غور",
  statusRejected: "مسترد",
  statusVerified: "تصدیق شدہ",
  statusUnverified: "غیر تصدیق شدہ",
  actions: "اعمال",
  viewDetails: "تفصیلات دیکھیں",
  printCard: "کارڈ پرنٹ کریں",
  saveChanges: "تبدیلیاں محفوظ کریں",
  syncWithCloud: "کلاؤڈ سے ہم آہنگ کریں",
  cloudSynced: "فائر بیس سے منسلک",

  // Additional Bilingual UI Keys
  welfareFundTitle: "آرائیں بنوں ویلفیئر فنڈ",
  tabTransferDetails: "1. منتقلی کی تفصیلات",
  tabConfirmPaymentStep: "2. ادائیگی اور رسید کی تصدیق",
  trackingIdLabel: "تصدیقی ٹریکنگ کوڈ",
  beneficiaryBank: "بینک کا نام",
  swiftBic: "سوئفٹ کوڈ",
  fundsSentSubmitProof: "میں نے رقم بھیج دی ہے — رسید ارسال کریں",
  recordedAmount: "درج شدہ رقم",
  changeScreenshot: "تصویر تبدیل کریں",
  uploadScreenshot: "رسید کی تصویر اپلوڈ کریں",
  screenshotHelp: "اس سے ہمارا شعبہ حسابات فوری تصدیق کر سکتا ہے۔",
  phEnterCustomAmt: "یا اپنی مرضی کی رقم درج کریں...",
  phDonorName: "مثلاً اسد چوہدری",
  phDonorPhone: "+92 300 0000000",
  phTxnRef: "مثلاً TXN-98765432",
  phDonationNote: "مثلاً تعلیمی اسکالرشپ یا طبی کیمپ فنڈ",
  meezanBankTab: "میزان بینک",
  mobileWalletsTab: "ایزی پیسہ / جاز کیش",
  swiftWireTab: "سوئفٹ وائر",
  copyBtn: "کاپی کریں",
  copiedBtn: "کاپی ہو گیا",
  titleLabel: "عنوان",
  errDonorName: "براہ کرم عطیہ دہندہ کا نام درج فرمائیں۔",
  errPhone: "براہ کرم فون یا واٹس ایپ نمبر درج فرمائیں۔",
  errScreenshot: "تصویر لوڈ نہ ہو سکی، براہ کرم دوبارہ کوشش کریں۔",
  errSubmitDonation: "ادائیگی کی تصدیق جمع کروانے میں ناکامی ہوئی۔",
  contactFormTitle: "براہ راست رابطہ فرمائیں",
  contactFormDesc: "ہماری رابطہ ٹیم تمام برادری ممبران کو فوری جواب دیتی ہے۔",
  phFullName: "مثلاً اسد چوہدری",
  phFatherName: "مثلاً حاجی میر محمد",
  phEmail: "you@domain.com",
  phSubject: "مثلاً رضاکارانہ خدمات یا تعلیمی وظائف",
  phMessage: "براہ کرم اپنا تفصیلی پیغام تحریر فرمائیں...",
  sendingBtn: "ارسال ہو رہا ہے...",
  changePhoto: "تصویر تبدیل کریں",
  uploadPhoto: "تصویر اپلوڈ کریں",
  phWork: "مثلاً استاد، انجینئر، تاجر",
  phAffiliated: "مثلاً آرائیں یوتھ بنوں یا کوئی نہیں",
  phReason: "ہمیں بتائیں کہ آپ فلاحی کاموں میں کس طرح حصہ لینا چاہتے ہیں...",
  phStreet: "محلہ / گلی / مکان نمبر",
  errAcceptTerms: "براہ کرم جمع کروانے سے پہلے شرائط کی توثیق فرمائیں۔",
  communityCardTitle: "برادری ممبرشپ شناختی کارڈ",
  cardCertifiesText: "یہ کارڈ آرائیں بنوں کے ساتھ باضابطہ وابستگی کی تصدیق کرتا ہے جو فلاح، تعلیم اور باہمی ترقی کے لیے کوشاں ہے۔",
  memberIdentification: "رکن کی باضابطہ شناخت",
  scanToVerify: "تصدیق کے لیے اسکین کریں",
  scanVerifyDesc: "سرکاری ممبرشپ ریکارڈ کی تصدیق کے لیے کیمرے سے اسکین کریں۔",
  cardAuthorityText: "یہ کارڈ ایگزیکٹو کونسل بنوں کے مجاز اختیار سے جاری کیا گیا ہے۔",
  generatingCardText: "محفوظ ممبرشپ کارڈ اور کیو آر کوڈ تیار کیا جا رہا ہے...",
  btnPublicSite: "ویب سائٹ دیکھیں",
};

// ── Complete Bilingual Settings Models ──────────────────────────

export const LOCALIZED_SETTINGS: Record<Language, SiteSettings> = {
  en: {
    siteName: "ARAAIN BANNU",
    siteTagline: "Unity, Empowerment, Development",
    siteSubName: "Bannu Regional Organisation",
    siteSubTagline: "Strengthening community bonds across Bannu & KPK",
    logoData: "",

    heroBadge: "Global Community Movement",
    heroTitle: "ARAAIN BANNU",
    heroSub: "Empowering Our Next Generation, Proud Of Our Heritage",
    heroTagline: "Uniting the Arain Community Worldwide — Strength, Unity, Progress. Join a legacy of community development, education, and welfare.",
    heroImage: "",

    aboutTitle: "ARAAIN BANNU",
    aboutSubtitle: "Dedicated to the socio-economic advancement of the Arain community worldwide.",
    aboutP1: "The ARAAIN BANNU represents thousands of families across Pakistan and the diaspora, driven by a shared commitment to education, welfare, and sustainable development.",
    aboutP2: "Through strategic initiatives, scholarship programs, community centers, and youth engagement, we build bridges between tradition and modern opportunity.",
    aboutP3: "Our regional chapter in Bannu works actively at the grassroots level, providing relief, career mentorship, and community cohesion for families across Southern Khyber Pakhtunkhwa.",
    statMembers: "500+",
    statPrograms: "8+",
    statCities: "30+",
    chairmanName: "Dr. Aitzaz Chaudhary",
    chairmanQuote: "Our unity is our greatest strength. When we empower our youth and support our families, we build a foundation that endures for generations.",

    programsTitle: "Key Initiatives & Programs",
    programsDesc: "Targeted programs designed to uplift families, educate youth, and preserve community welfare.",
    leadershipTitle: "Our Leadership Team",
    membershipTitle: "Membership Registration",
    membershipDesc: "Join ARAAIN BANNU to connect with our global network, participate in community initiatives, and make a difference.",
    donateTitle: "Support Our Mission",
    donateDesc: "Your generous contributions help fund scholarships, healthcare camps, flood relief, and community welfare programs.",
    eventsTitle: "Upcoming Events & Programs",
    galleryTitle: "Community Moments",
    galleryDesc: "A visual journey through our community events, gatherings, and welfare drives.",

    contactAddress: "ARAAIN BANNU Office, Main City, Bannu, Khyber Pakhtunkhwa, Pakistan",
    contactHours: "Monday – Saturday: 09:00 AM – 05:00 PM (PKT)",
    contactPhone: "+92 300 1234567",
    contactEmail: "info@arainbannu.org",

    socialFacebook: "https://facebook.com",
    socialTwitter: "https://x.com",
    socialWhatsapp: "https://wa.me/923001234567",
    socialInstagram: "https://instagram.com",

    footerDesc: "ARAAIN BANNU is committed to empowering the Arain community across Bannu, Khyber Pakhtunkhwa, and globally through education, economic empowerment, and humanitarian welfare.",
    footerCopy: "© 2025 ARAAIN BANNU. All rights reserved.",

    bankName: "Meezan Bank Limited",
    bankTitle: "ARAAIN BANNU Welfare Fund",
    bankAccount: "01020304050607",
    bankIBAN: "PK36MEZN0001020304050607",
    bankBranch: "Bannu Branch (Code 0123)",
    epTitle: "Tahir Meer (Finance Secretary)",
    epNumber: "0300-1234567",
    jcTitle: "ARAAIN BANNU Welfare",
    jcNumber: "0321-7654321",
    intBank: "Meezan Bank Limited, Bannu",
    intSwift: "MEZNPKKAXXX",
    intIBAN: "PK36MEZN0001020304050607",
  },
  ur: {
    siteName: "آرائیں بنوں",
    siteTagline: "اتحاد، خود مختاری، ترقی",
    siteSubName: "بنوں علاقائی تنظیم",
    siteSubTagline: "بنوں اور خیبر پختونخوا میں برادری کے رشتوں کو مضبوط بنانا",
    logoData: "",

    heroBadge: "عالمی برادری کی تحریک",
    heroTitle: "آرائیں بنوں",
    heroSub: "نئی نسل کو بااختیار بنانا، اپنے ورثے پر فخر",
    heroTagline: "دنیا بھر میں آرائیں برادری کا اتحاد — طاقت، یکجہتی، ترقی۔ برادری کی فلاح، تعلیم اور ترقی کے ایک عظیم مشن کا حصہ بنیں۔",
    heroImage: "",

    aboutTitle: "آرائیں بنوں",
    aboutSubtitle: "دنیا بھر میں آرائیں برادری کی سماجی و معاشی ترقی کے لیے کوشاں۔",
    aboutP1: "آرائیں بنوں پاکستان اور بیرون ملک بسنے والے ہزاروں خاندانوں کی نمائندگی کرتی ہے، جو تعلیم، فلاح اور پائیدار ترقی کے مشترکہ عزم سے جڑے ہوئے ہیں۔",
    aboutP2: "اسٹریٹجک منصوبوں، تعلیمی وظائف، کمیونٹی سینٹرز اور نوجوانوں کی رہنمائی کے ذریعے ہم روایات اور جدید مواقع کے درمیان مضبوط پل تعمیر کر رہے ہیں۔",
    aboutP3: "بنوں میں ہماری علاقائی شاخ نچلی سطح پر فعال ہے، جو جنوبی خیبر پختونخوا کے خاندانوں کے لیے امداد، کیریئر رہنمائی اور باہمی اتحاد فراہم کرتی ہے۔",
    statMembers: "+۵۰۰",
    statPrograms: "+۸",
    statCities: "+۳۰",
    chairmanName: "ڈاکٹر اعزاز چوہدری",
    chairmanQuote: "ہمارا اتحاد ہی ہماری سب سے بڑی طاقت ہے۔ جب ہم اپنے نوجوانوں کو بااختیار بناتے ہیں اور خاندانوں کو سہارا دیتے ہیں تو نسلوں کے لیے مضبوط بنیاد بنتی ہے۔",

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

    contactAddress: "دفتر آرائیں بنوں، مین سٹی، بنوں، خیبر پختونخوا، پاکستان",
    contactHours: "پیر تا ہفتہ: صبح نو بجے تا شام پانچ بجے",
    contactPhone: "۰۳۰۰۱۲۳۴۵۶۷",
    contactEmail: "info@arainbannu.org",

    socialFacebook: "https://facebook.com",
    socialTwitter: "https://x.com",
    socialWhatsapp: "https://wa.me/923001234567",
    socialInstagram: "https://instagram.com",

    footerDesc: "آرائیں بنوں تعلیم، معاشی خود مختاری اور انسانی فلاح کے ذریعے بنوں، خیبر پختونخوا اور دنیا بھر میں برادری کو بااختیار بنانے کے لیے کوشاں ہے۔",
    footerCopy: "© 2025 آرائیں بنوں۔ تمام حقوق محفوظ ہیں۔",

    bankName: "میزان بینک لمیٹڈ",
    bankTitle: "آرائیں بنوں ویلفیئر فنڈ",
    bankAccount: "01020304050607",
    bankIBAN: "PK36MEZN0001020304050607",
    bankBranch: "بنوں برانچ (کوڈ ۰۱۲۳)",
    epTitle: "طاہر میر (فنانس سیکرٹری)",
    epNumber: "0300-1234567",
    jcTitle: "آرائیں بنوں ویلفیئر",
    jcNumber: "0321-7654321",
    intBank: "میزان بینک لمیٹڈ، بنوں",
    intSwift: "MEZNPKKAXXX",
    intIBAN: "PK36MEZN0001020304050607",
  }
};

// ── Complete Bilingual Programs ─────────────────────────────────

export const LOCALIZED_PROGRAMS: Record<Language, Program[]> = {
  en: [
    { id: 1, icon_name: "heart", color: "#AD7A28", title: "Community Welfare", desc: "Financial aid, healthcare support, and emergency relief for needy families.", sort_order: 0 },
    { id: 2, icon_name: "briefcase", color: "#16232F", title: "Jobs & Careers", desc: "Employment board, professional mentorship, career counseling, and networking.", sort_order: 1 },
    { id: 3, icon_name: "graduation-cap", color: "#AD7A28", title: "Education Institutes", desc: "Scholarships for deserving students, school drives, and free digital literacy.", sort_order: 2 },
    { id: 4, icon_name: "trophy", color: "#16232F", title: "Arain Heroes", desc: "Recognising high achievers, scholars, civil servants, and community champions.", sort_order: 3 },
    { id: 5, icon_name: "shield", color: "#AD7A28", title: "Flood Relief", desc: "Emergency rescue, dry ration kits, and rehabilitation in disaster-struck zones.", sort_order: 4 },
    { id: 6, icon_name: "users", color: "#16232F", title: "Marriage Bureau", desc: "A trusted, respectful matrimonial matching service for Arain families globally.", sort_order: 5 },
    { id: 7, icon_name: "building", color: "#AD7A28", title: "Community Centers", desc: "Establishing physical spaces for community gatherings, youth activities, and study halls.", sort_order: 6 },
    { id: 8, icon_name: "award", color: "#16232F", title: "Women's Desk", desc: "Skills development, entrepreneurship grants, and legal aid for women.", sort_order: 7 },
  ],
  ur: [
    { id: 1, icon_name: "heart", color: "#AD7A28", title: "فلاحی بہبود", desc: "مستحق خاندانوں کے لیے مالی معاونت، صحت کی سہولیات اور ہنگامی امداد۔", sort_order: 0 },
    { id: 2, icon_name: "briefcase", color: "#16232F", title: "روزگار اور کیریئر", desc: "ملازمتوں کی فراہمی، پیشہ ورانہ رہنمائی اور نوجوانوں کے لیے کیریئر کونسلنگ۔", sort_order: 1 },
    { id: 3, icon_name: "graduation-cap", color: "#AD7A28", title: "تعلیمی ادارے", desc: "ہونہار اور مستحق طلبہ کے لیے تعلیمی وظائف، مفت ڈیجیٹل خواندگی اور کتب کی فراہمی۔", sort_order: 2 },
    { id: 4, icon_name: "trophy", color: "#16232F", title: "برادری کے ہیروز", desc: "نمایاں کارکردگی دکھانے والے اسکالرز، طلبہ، سول سرونٹس اور سماجی رہنماؤں کی حوصلہ افزائی۔", sort_order: 3 },
    { id: 5, icon_name: "shield", color: "#AD7A28", title: "سیلاب اور ہنگامی امداد", desc: "قدرتی آفات اور ہنگامی حالات میں ریسکیو، راشن کٹس اور بحالی کے کام۔", sort_order: 4 },
    { id: 6, icon_name: "users", color: "#16232F", title: "رشتہ ناطہ سروس", desc: "آرائیں خاندانوں کے لیے مکمل رازداری کے ساتھ ایک بااعتماد اور باوقار رشتہ داری سروس۔", sort_order: 5 },
    { id: 7, icon_name: "building", color: "#AD7A28", title: "کمیونٹی سینٹرز", desc: "برادری کے باہمی میل جول، تقریبات اور تعلیمی سیمینارز کے لیے مراکز کا قیام۔", sort_order: 6 },
    { id: 8, icon_name: "award", color: "#16232F", title: "خواتین ڈیسک", desc: "خواتین کی خود مختاری، ہنر مندی کی تربیت، گھریلو صنعت کے لیے گرانٹس اور رہنمائی۔", sort_order: 7 },
  ]
};

// ── Complete Bilingual Leaders ──────────────────────────────────

export const LOCALIZED_LEADERS: Record<Language, Leader[]> = {
  en: [
    { id: 1, initials: "SM", name: "Saba Mumtaz Bano", role: "Chairperson (Global)", email: "saba@arainworldcouncil.org", featured: 0, sort_order: 0 },
    { id: 2, initials: "AC", name: "Dr. Aitzaz Chaudhary", role: "Global Chairman", email: "chairman@arainworldcouncil.org", featured: 1, sort_order: 1 },
    { id: 3, initials: "AS", name: "Asim Chaudhary", role: "President (Global)", email: "asim@arainworldcouncil.org", featured: 0, sort_order: 2 },
    { id: 4, initials: "TM", name: "Tahir Meer Arain", role: "Regional President (Bannu)", email: "tahir@arainbannu.org", featured: 1, sort_order: 3 },
    { id: 5, initials: "MK", name: "Muhammad Khalid Arain", role: "General Secretary (Bannu)", email: "khalid@arainbannu.org", featured: 0, sort_order: 4 },
  ],
  ur: [
    { id: 1, initials: "ص م", name: "صبا ممتاز بانو", role: "چیئرپرسن (عالمی)", email: "saba@arainworldcouncil.org", featured: 0, sort_order: 0 },
    { id: 2, initials: "ا چ", name: "ڈاکٹر اعزاز چوہدری", role: "گلوبل چیئرمین", email: "chairman@arainworldcouncil.org", featured: 1, sort_order: 1 },
    { id: 3, initials: "ع چ", name: "عاصم چوہدری", role: "صدر (عالمی)", email: "asim@arainworldcouncil.org", featured: 0, sort_order: 2 },
    { id: 4, initials: "ط م", name: "طاہر میر آرائیں", role: "علاقائی صدر (بنوں)", email: "tahir@arainbannu.org", featured: 1, sort_order: 3 },
    { id: 5, initials: "خ آ", name: "محمد خالد آرائیں", role: "جنرل سیکرٹری (بنوں)", email: "khalid@arainbannu.org", featured: 0, sort_order: 4 },
  ]
};

// ── Complete Bilingual Events ───────────────────────────────────

export const LOCALIZED_EVENTS: Record<Language, EventItem[]> = {
  en: [
    { id: 1, day: "02", month: "Jan", tag: "Business", title: "Strategically Build Your Business", time_str: "15:00 – 19:00", place: "Bannu, KPK, Pakistan", sort_order: 0 },
    { id: 2, day: "19", month: "Apr", tag: "Community", title: "ARAAIN BANNU Annual Gathering 2025", time_str: "09:30 – 13:00", place: "Bannu Sports Complex", sort_order: 1 },
    { id: 3, day: "10", month: "Dec", tag: "Youth", title: "Youth Leadership Summit 2025", time_str: "10:00 – 16:00", place: "Bannu Press Club", sort_order: 2 },
  ],
  ur: [
    { id: 1, day: "۰۲", month: "جنوری", tag: "کاروبار", title: "اپنے کاروبار کو مضبوط بنیادوں پر استوار کریں", time_str: "دوپہر ۳:۰۰ تا شام ۷:۰۰", place: "بنوں، خیبر پختونخوا، پاکستان", sort_order: 0 },
    { id: 2, day: "۱۹", month: "اپریل", tag: "کمیونٹی", title: "آرائیں بنوں سالانہ اجتماع ۲۰۲۵", time_str: "صبح ۹:۳۰ تا دوپہر ۱:۰۰", place: "بنوں اسپورٹس کمپلیکس", sort_order: 1 },
    { id: 3, day: "۱۰", month: "دسمبر", tag: "نوجوان", title: "یوتھ لیڈرشپ سمٹ ۲۰۲۵", time_str: "صبح ۱۰:۰۰ تا شام ۴:۰۰", place: "بنوں پریس کلب", sort_order: 2 },
  ]
};

// ── Complete Bilingual Dynamic Pages ────────────────────────────

export const LOCALIZED_PAGES: Record<Language, PageItem[]> = {
  en: [
    {
      id: 1,
      slug: "blog",
      label: "Our Blog",
      title: "ARAAIN BANNU Blog & News",
      body: "Welcome to the ARAAIN BANNU Blog. Stay updated with the latest news, stories, and announcements from the ARAAIN BANNU community. We regularly post updates on student scholarship disbursements, medical camp schedules, career seminars, and local council achievements across the Bannu division.",
      published: 1,
      sort_order: 0,
    },
    {
      id: 2,
      slug: "history",
      label: "Our History",
      title: "History of the Arain Community & Council",
      body: "The ARAAIN BANNU was founded with a vision to unite Arains globally. From humble beginnings, ARAAIN BANNU has grown into a worldwide movement for community empowerment and development.\n\nThe Arain community has a storied history of agricultural enterprise, civil service, law, medicine, and nation-building in the Indus basin. Today, ARAAIN BANNU honors this noble ancestry by fostering mutual collaboration and uplifting every family.",
      published: 1,
      sort_order: 1,
    },
    {
      id: 3,
      slug: "documentation",
      label: "Documentation",
      title: "Official Documents & Bylaws",
      body: "Official documents, policies, and guidelines of the ARAAIN BANNU. All resources are available for members and the public.\n\n1. Constitution of ARAAIN BANNU\n2. Code of Ethics for Executive Council Members\n3. Financial Transparency and Audit Procedures\n4. Membership Rights and Voting Bylaws\n5. Welfare Fund Disbursement Criteria",
      published: 1,
      sort_order: 2,
    },
    {
      id: 4,
      slug: "environmental",
      label: "Environmental",
      title: "Environmental & Green Initiatives",
      body: "ARAAIN BANNU is deeply committed to environmental sustainability and climate resilience in Southern KPK. Drawing inspiration from our historical agrarian traditions, we lead:\n\n• Annual Tree Plantation Drives in schools and public spaces\n• Clean Drinking Water Filtration Plants in underserved union councils\n• Solid Waste Awareness and Plastic Reduction Seminars",
      published: 1,
      sort_order: 3,
    },
    {
      id: 5,
      slug: "gallery_page",
      label: "Town Gallery",
      title: "Bannu Community Gallery",
      body: "Explore photographic archives from ARAAIN BANNU community gatherings, medical camps, Eid gift distributions, and student award ceremonies across Bannu and neighboring districts.",
      published: 1,
      sort_order: 4,
    }
  ],
  ur: [
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
      body: "آرائیں بنوں کے باضابطہ قواعد و ضوابط اور تنظیمی پالیسیاں تمام اراکین اور برادری کے لیے دستیاب ہیں:\n\n۱۔ آرائیں بنوں کا باضابطہ آئین\n۲۔ مجلس عاملہ کے اراکین کے لیے ضابطہ اخلاق\n۳۔ مالی شفافیت اور آڈٹ کے قواعد\n۴۔ اراکین کے حقوق اور ووٹنگ کا طریقہ کار\n۵۔ فلاحی فنڈ کی تقسیم کے معیارات",
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
    }
  ]
};

// ── Smart Script Detection Helpers ──────────────────────────────

const URDU_REGEX = /[\u0600-\u06FF]/;
const ENGLISH_REGEX = /[a-zA-Z]/;

/**
 * Returns true if the string is primarily in Urdu/Arabic script
 */
export function isUrduScript(str?: string): boolean {
  if (!str) return false;
  return URDU_REGEX.test(str);
}

/**
 * Returns true if the string is primarily in Latin/English script
 */
export function isEnglishScript(str?: string): boolean {
  if (!str) return false;
  return ENGLISH_REGEX.test(str);
}

/**
 * Resolves a settings value strictly respecting the current language:
 * In 'ur' mode: returns pure Urdu (no English words)
 * In 'en' mode: returns pure English (no Urdu words)
 */
export function getLocalizedSetting(
  field: keyof SiteSettings,
  lang: Language,
  customSettings?: SiteSettings
): string {
  const customVal = customSettings ? (customSettings[field] as string) : '';
  const fallback = LOCALIZED_SETTINGS[lang][field] as string;

  if (lang === 'ur') {
    // In Urdu mode, only accept custom text if it's in Urdu script without english words
    if (customVal && isUrduScript(customVal) && !isEnglishScript(customVal)) {
      return customVal;
    }
    return fallback;
  } else {
    // In English mode, only accept custom text if it has no Urdu script
    if (customVal && !isUrduScript(customVal)) {
      return customVal;
    }
    return fallback;
  }
}

/**
 * Resolves programs array respecting the active language and reflecting Firestore data
 */
export function getLocalizedPrograms(lang: Language, customPrograms: Program[]): Program[] {
  const sourceList = customPrograms && customPrograms.length > 0 ? customPrograms : LOCALIZED_PROGRAMS[lang];
  return sourceList.map((item, idx) => {
    const catalogUr = LOCALIZED_PROGRAMS.ur.find(p => p.id === item.id);
    const catalogEn = LOCALIZED_PROGRAMS.en.find(p => p.id === item.id);

    if (lang === 'ur') {
      let title = item.title;
      let desc = item.desc;
      if (!isUrduScript(title)) {
        title = catalogUr ? catalogUr.title : translateNameToUrdu(item.title);
      }
      if (!isUrduScript(desc) && catalogUr) {
        desc = catalogUr.desc;
      }
      return {
        ...item,
        title,
        desc,
        id: item.id ?? idx + 1,
      };
    } else {
      let title = item.title;
      let desc = item.desc;
      if (isUrduScript(title) && catalogEn) {
        title = catalogEn.title;
      }
      if (isUrduScript(desc) && catalogEn) {
        desc = catalogEn.desc;
      }
      return {
        ...item,
        title,
        desc,
        id: item.id ?? idx + 1,
      };
    }
  });
}

/**
 * Resolves leaders array respecting the active language and reflecting Firestore data
 */
export function getLocalizedLeaders(lang: Language, customLeaders: Leader[]): Leader[] {
  const sourceList = customLeaders && customLeaders.length > 0 ? customLeaders : LOCALIZED_LEADERS[lang];
  return sourceList.map((item, idx) => {
    const catalogUr = LOCALIZED_LEADERS.ur.find(l => l.id === item.id);
    const catalogEn = LOCALIZED_LEADERS.en.find(l => l.id === item.id);

    if (lang === 'ur') {
      let name = item.name;
      let role = item.role;
      if (!isUrduScript(name)) {
        name = catalogUr ? catalogUr.name : translateNameToUrdu(item.name);
      }
      if (!isUrduScript(role)) {
        role = catalogUr ? catalogUr.role : translateOccupationToUrdu(item.role);
      }
      return {
        ...item,
        name,
        role,
        initials: catalogUr?.initials || item.initials || 'آ ب',
        id: item.id ?? idx + 1,
      };
    } else {
      let name = item.name;
      let role = item.role;
      if (isUrduScript(name) && catalogEn) {
        name = catalogEn.name;
      }
      if (isUrduScript(role) && catalogEn) {
        role = catalogEn.role;
      }
      return {
        ...item,
        name,
        role,
        initials: catalogEn?.initials || item.initials || 'AB',
        id: item.id ?? idx + 1,
      };
    }
  });
}

/**
 * Resolves events array respecting the active language and reflecting Firestore data
 */
export function getLocalizedEvents(lang: Language, customEvents: EventItem[]): EventItem[] {
  const sourceList = customEvents && customEvents.length > 0 ? customEvents : LOCALIZED_EVENTS[lang];
  return sourceList.map((item, idx) => {
    const catalogUr = LOCALIZED_EVENTS.ur.find(e => e.id === item.id);
    const catalogEn = LOCALIZED_EVENTS.en.find(e => e.id === item.id);

    if (lang === 'ur') {
      let title = item.title;
      let place = item.place;
      if (!isUrduScript(title)) {
        title = catalogUr ? catalogUr.title : translateNameToUrdu(item.title);
      }
      if (!isUrduScript(place)) {
        place = catalogUr ? catalogUr.place : translateNameToUrdu(item.place);
      }
      return {
        ...item,
        title,
        place,
        day: catalogUr?.day || item.day,
        month: catalogUr?.month || item.month,
        tag: catalogUr?.tag || item.tag,
        id: item.id ?? idx + 1,
      };
    } else {
      let title = item.title;
      let place = item.place;
      if (isUrduScript(title) && catalogEn) {
        title = catalogEn.title;
      }
      if (isUrduScript(place) && catalogEn) {
        place = catalogEn.place;
      }
      return {
        ...item,
        title,
        place,
        day: catalogEn?.day || item.day,
        month: catalogEn?.month || item.month,
        tag: catalogEn?.tag || item.tag,
        id: item.id ?? idx + 1,
      };
    }
  });
}

/**
 * Resolves dynamic pages array respecting the active language and reflecting Firestore data
 */
export function getLocalizedPages(lang: Language, customPages: PageItem[]): PageItem[] {
  const sourceList = customPages && customPages.length > 0 ? customPages : LOCALIZED_PAGES[lang];
  return sourceList.map((item, idx) => {
    const catalogUr = LOCALIZED_PAGES.ur.find(p => p.slug === item.slug || p.id === item.id);
    const catalogEn = LOCALIZED_PAGES.en.find(p => p.slug === item.slug || p.id === item.id);

    if (lang === 'ur') {
      let title = item.title;
      let body = item.body;
      let label = item.label;
      if (!isUrduScript(title)) {
        title = catalogUr ? catalogUr.title : item.title;
      }
      if (!isUrduScript(body)) {
        body = catalogUr ? catalogUr.body : item.body;
      }
      if (!isUrduScript(label)) {
        label = catalogUr ? catalogUr.label : item.label;
      }
      return {
        ...item,
        title,
        body,
        label,
        id: item.id ?? idx + 1,
      };
    } else {
      let title = item.title;
      let body = item.body;
      let label = item.label;
      if (isUrduScript(title) && catalogEn) {
        title = catalogEn.title;
      }
      if (isUrduScript(body) && catalogEn) {
        body = catalogEn.body;
      }
      if (isUrduScript(label) && catalogEn) {
        label = catalogEn.label;
      }
      return {
        ...item,
        title,
        body,
        label,
        id: item.id ?? idx + 1,
      };
    }
  });
}

/**
 * Gallery Items localized
 */
export const LOCALIZED_GALLERY: Record<Language, GalleryItem[]> = {
  en: [
    {
      id: 1,
      data_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80",
      caption: "ARAAIN BANNU Annual General Assembly",
      sort_order: 0,
    },
    {
      id: 2,
      data_url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
      caption: "Youth Leadership Summit & IT Orientation",
      sort_order: 1,
    },
    {
      id: 3,
      data_url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80",
      caption: "Free Medical & Eye Camp in Bannu Rural",
      sort_order: 2,
    },
    {
      id: 4,
      data_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      caption: "Ramadan Ration Distribution Drive",
      sort_order: 3,
    },
    {
      id: 5,
      data_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      caption: "Merit Scholarship Award Ceremony",
      sort_order: 4,
    },
    {
      id: 6,
      data_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
      caption: "Executive Council Strategy Session",
      sort_order: 5,
    },
  ],
  ur: [
    {
      id: 1,
      data_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80",
      caption: "آرائیں بنوں سالانہ جنرل کونسل اجلاس",
      sort_order: 0,
    },
    {
      id: 2,
      data_url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
      caption: "نوجوان قیادت سیمینار اور آئی ٹی تربیتی سیشن",
      sort_order: 1,
    },
    {
      id: 3,
      data_url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80",
      caption: "بنوں دیہی علاقوں میں مفت طبی اور آنکھوں کا معائنہ کیمپ",
      sort_order: 2,
    },
    {
      id: 4,
      data_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      caption: "رمضان المبارک راشن تقسیم مہم",
      sort_order: 3,
    },
    {
      id: 5,
      data_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      caption: "طلباء و طالبات کے لیے میرٹ اسکالرشپ تقریب تقسیم انعامات",
      sort_order: 4,
    },
    {
      id: 6,
      data_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
      caption: "ایگزیکٹو کونسل مشاورتی اور منصوبہ بندی اجلاس",
      sort_order: 5,
    },
  ],
};

/**
 * Resolves gallery array respecting the active language and reflecting Firestore data
 */
export function getLocalizedGallery(lang: Language, customGallery: GalleryItem[]): GalleryItem[] {
  const sourceList = customGallery && customGallery.length > 0 ? customGallery : LOCALIZED_GALLERY[lang];
  return sourceList.map((item, idx) => {
    const catalogUr = LOCALIZED_GALLERY.ur.find(g => g.id === item.id);
    const catalogEn = LOCALIZED_GALLERY.en.find(g => g.id === item.id);

    if (lang === 'ur') {
      let caption = item.caption;
      if (caption && !isUrduScript(caption)) {
        caption = catalogUr ? catalogUr.caption : translateNameToUrdu(caption);
      }
      return {
        ...item,
        caption: caption || catalogUr?.caption || '',
        id: item.id ?? idx + 1,
      };
    } else {
      let caption = item.caption;
      if (caption && isUrduScript(caption) && catalogEn) {
        caption = catalogEn.caption;
      }
      return {
        ...item,
        caption: caption || catalogEn?.caption || '',
        id: item.id ?? idx + 1,
      };
    }
  });
}
