import { Program, Leader, EventItem, PageItem, GalleryItem, SiteSettings } from '../types';

export const defaultSettings: SiteSettings = {
  // Identity
  siteName: "ARAAIN BANNU",
  siteTagline: "Unity, Empowerment, Development",
  siteSubName: "Bannu Regional Organisation",
  siteSubTagline: "Uniting the Arain Community — Strength, Unity, Progress",
  logoData: "",

  // Hero
  heroBadge: "Global Community Movement",
  heroTitle: "ARAAIN BANNU",
  heroSub: "Empowering Our Next Generation, Proud Of Our Heritage",
  heroTagline: "Uniting the Arain Community Worldwide — Strength, Unity, Progress",
  heroImage: "",

  // About
  aboutTitle: "ARAAIN BANNU",
  aboutSubtitle: "Dedicated to the socio-economic advancement of the Arain community worldwide.",
  aboutP1: "The ARAAIN BANNU represents thousands of families across Pakistan and the diaspora, driven by a shared commitment to education, welfare, and sustainable development.",
  aboutP2: "Through strategic initiatives, scholarship programs, community centers, and youth engagement, we build bridges between tradition and modern opportunity.",
  aboutP3: "Our regional chapter in Bannu works actively at the grassroots level, providing relief, career mentorship, and community cohesion for families across Southern Khyber Pakhtunkhwa.",
  statMembers: "500+",
  statPrograms: "8",
  statCities: "30+",
  chairmanName: "Dr. Aitzaz Chaudhary",
  chairmanQuote: "Our unity is our greatest strength. When we empower our youth and support our families, we build a foundation that endures for generations.",

  // Sections
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

  // Contact
  contactAddress: "ARAAIN BANNU Office, Main City, Bannu, Khyber Pakhtunkhwa, Pakistan",
  contactHours: "Monday – Saturday: 09:00 AM – 05:00 PM (PKT)",
  contactPhone: "+92 300 1234567",
  contactEmail: "info@arainbannu.org",

  // Social
  socialFacebook: "https://facebook.com",
  socialTwitter: "https://x.com",
  socialWhatsapp: "https://wa.me/923001234567",
  socialInstagram: "https://instagram.com",

  // Footer
  footerDesc: "ARAAIN BANNU is committed to empowering the Arain community across Bannu, Khyber Pakhtunkhwa, and globally through education, economic empowerment, and humanitarian welfare.",
  footerCopy: "© 2025 ARAAIN BANNU. All rights reserved.",

  // Donation Accounts
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
};

export const defaultPrograms: Program[] = [
  { id: 1, icon_name: "heart", color: "#AD7A28", title: "Community Welfare", desc: "Financial aid, healthcare support, and emergency relief for needy families.", sort_order: 0 },
  { id: 2, icon_name: "briefcase", color: "#16232F", title: "Jobs & Careers", desc: "Employment board, professional mentorship, career counseling, and networking.", sort_order: 1 },
  { id: 3, icon_name: "graduation-cap", color: "#AD7A28", title: "Education Institutes", desc: "Scholarships for deserving students, school drives, and free digital literacy.", sort_order: 2 },
  { id: 4, icon_name: "trophy", color: "#16232F", title: "Arain Heroes", desc: "Recognising high achievers, scholars, civil servants, and community champions.", sort_order: 3 },
  { id: 5, icon_name: "shield", color: "#AD7A28", title: "Flood Relief", desc: "Emergency rescue, dry ration kits, and rehabilitation in disaster-struck zones.", sort_order: 4 },
  { id: 6, icon_name: "users", color: "#16232F", title: "Marriage Bureau", desc: "A trusted, respectful matrimonial matching service for Arain families globally.", sort_order: 5 },
  { id: 7, icon_name: "building", color: "#AD7A28", title: "Community Centers", desc: "Establishing physical spaces for community gatherings, youth activities, and study halls.", sort_order: 6 },
  { id: 8, icon_name: "award", color: "#16232F", title: "Women's Desk", desc: "Skills development, entrepreneurship grants, and legal aid for women.", sort_order: 7 },
];

export const defaultLeaders: Leader[] = [
  { id: 1, initials: "SM", name: "Saba Mumtaz Bano", role: "Chairperson (Global)", email: "saba@arainworldcouncil.org", featured: 0, sort_order: 0 },
  { id: 2, initials: "AC", name: "Dr. Aitzaz Chaudhary", role: "Global Chairman", email: "chairman@arainworldcouncil.org", featured: 1, sort_order: 1 },
  { id: 3, initials: "AS", name: "Asim Chaudhary", role: "President (Global)", email: "asim@arainworldcouncil.org", featured: 0, sort_order: 2 },
  { id: 4, initials: "TM", name: "Tahir Meer Arain", role: "Regional President (Bannu)", email: "tahir@arainbannu.org", featured: 1, sort_order: 3 },
  { id: 5, initials: "MK", name: "Muhammad Khalid Arain", role: "General Secretary (Bannu)", email: "khalid@arainbannu.org", featured: 0, sort_order: 4 },
];

export const defaultEvents: EventItem[] = [
  { id: 1, day: "02", month: "Jan", tag: "Business", title: "Strategically Build Your Business", time_str: "15:00 – 19:00", place: "Bannu, KPK, Pakistan", sort_order: 0 },
  { id: 2, day: "19", month: "Apr", tag: "Community", title: "ARAAIN BANNU Annual Gathering 2025", time_str: "09:30 – 13:00", place: "Bannu Sports Complex", sort_order: 1 },
  { id: 3, day: "10", month: "Dec", tag: "Youth", title: "Youth Leadership Summit 2025", time_str: "10:00 – 16:00", place: "Bannu Press Club", sort_order: 2 },
];

export const defaultPages: PageItem[] = [
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
  },
  {
    id: 6,
    slug: "department",
    label: "Department",
    title: "Functional Departments & Wings",
    body: "ARAAIN BANNU operates through several specialized departments, each led by experienced professionals:\n\n• Education & Scholarships Wing\n• Healthcare & Emergency Welfare Cell\n• Youth Empowerment & IT Mentorship Desk\n• Matrimonial & Family Reconciliation Committee\n• Public Relations & Overseas Diaspora Liaison",
    published: 1,
    sort_order: 5,
  },
];

export const defaultGallery: GalleryItem[] = [
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
];
