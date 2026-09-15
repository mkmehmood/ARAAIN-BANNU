import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { 
  Registration, 
  Donation, 
  ContactMessage, 
  Program, 
  Leader, 
  EventItem, 
  PageItem, 
  GalleryItem,
  ContactDetail,
  SiteSettings
} from '../../types';
import { compressImage } from '../../services/firebase';
import { MembershipCardModal } from './MembershipCardModal';
import { 
  resolveContactType, 
  ContactIconComponent, 
  getContactTypeTheme 
} from '../../utils/contactIcons';
import {
  translateNameToUrdu,
  translateNameToEnglish,
  translateNameToUrduAsync,
  translateNameToEnglishAsync,
  translateOccupationToUrdu,
  translateOccupationToEnglish,
  translateAddressToUrdu,
  translateAddressToEnglish,
  translateAddressToUrduAsync,
  translateAddressToEnglishAsync,
  translateUrduToEnglish,
  translateEnglishToUrdu,
  translateEnglishToUrduAsync,
  translateUrduToEnglishAsync,
  isUrduText,
} from '../../utils/urduTransliterator';
import {
  translateContactTitleToUrdu,
  translateContactTitleToEnglish,
  translateContactNoteToUrdu,
  translateContactNoteToEnglish,
} from '../../data/translations';
import { 
  ShieldCheck, 
  Users, 
  Heart, 
  Mail, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  CreditCard, 
  Trash2, 
  Plus, 
  Save, 
  Image as ImageIcon,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  FileText,
  Zap,
  Megaphone,
  Palette,
  Globe,
  Check,
  Sliders,
  Bell,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Building2
} from 'lucide-react';

interface AdminDashboardProps {
  onExitAdmin: () => void;
  onLogout: () => void;
  adminEmail: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onExitAdmin,
  onLogout,
  adminEmail,
}) => {
  const { t, isUrdu, lang, setLanguage, tSetting } = useLanguage();
  const {
    settings,
    programs,
    leaders,
    events,
    pages,
    gallery,
    registrations,
    donations,
    messages,
    isCloudConnected,
    saveSettings,
    savePrograms,
    saveLeaders,
    saveEvents,
    savePages,
    saveGallery,
    replaceDatabaseWithCms,
    updateRegistrationStatus,
    deleteRegistration,
    updateDonationStatus,
    deleteDonation,
    deleteContactMessage,
    updateContactMessageStatus,
  } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'donations' | 'messages' | 'cms' | 'customUpdate'>('overview');
  const [cmsTab, setCmsTab] = useState<'customUpdate' | 'identity' | 'hero' | 'about' | 'programs' | 'leaders' | 'events' | 'pages' | 'gallery' | 'bank' | 'contact'>('customUpdate');
  const [expandedLeaderId, setExpandedLeaderId] = useState<string | number | null>(null);

  // Search & Filter states
  const [memberSearch, setMemberSearch] = useState('');
  const [memberStatusFilter, setMemberStatusFilter] = useState('all');
  const [donationSearch, setDonationSearch] = useState('');
  const [donationStatusFilter, setDonationStatusFilter] = useState('all');

  // Modals inside Admin
  const [selectedRegForCard, setSelectedRegForCard] = useState<Registration | null>(null);
  const [viewingRegDetails, setViewingRegDetails] = useState<Registration | null>(null);
  const [viewingDonationProof, setViewingDonationProof] = useState<Donation | null>(null);

  // Local CMS edits
  const [tempSettings, setTempSettings] = useState(settings);
  const [tempPrograms, setTempPrograms] = useState<Program[]>(programs);
  const [tempLeaders, setTempLeaders] = useState<Leader[]>(leaders);
  const [tempEvents, setTempEvents] = useState<EventItem[]>(events);
  const [tempPages, setTempPages] = useState<PageItem[]>(pages);
  const [tempGallery, setTempGallery] = useState<GalleryItem[]>(gallery);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [newHeroImageUrl, setNewHeroImageUrl] = useState('');

  // Sync temp CMS data when external/cloud data arrives
  React.useEffect(() => {
    setTempSettings(settings);
  }, [settings]);
  React.useEffect(() => {
    setTempPrograms(programs);
  }, [programs]);
  React.useEffect(() => {
    setTempLeaders(leaders);
  }, [leaders]);
  React.useEffect(() => {
    setTempEvents(events);
  }, [events]);
  React.useEffect(() => {
    setTempPages(pages);
  }, [pages]);
  React.useEffect(() => {
    setTempGallery(gallery);
  }, [gallery]);

  // Stats
  const totalDonationAmount = donations.reduce((sum, d) => {
    const num = parseInt(String(d.amount || '').replace(/[^0-9]/g, '')) || 0;
    return sum + num;
  }, 0);

  // Export registrations as CSV
  const exportMembersCsv = () => {
    const headers = ['Full Name (En)', 'Full Name (Ur)', 'Father Name (En)', 'Father Name (Ur)', 'CNIC', 'Gender', 'Type', 'WhatsApp', 'Email', 'City (En)', 'City (Ur)', 'Status', 'Submitted At'];
    const rows = registrations.map(r => [
      `"${r.fullNameEn || r.fullName || ''}"`,
      `"${r.fullNameUr || r.fullName || ''}"`,
      `"${r.fatherNameEn || r.fatherName || ''}"`,
      `"${r.fatherNameUr || r.fatherName || ''}"`,
      `"${r.cnic || ''}"`,
      `"${r.genderEn || r.gender || ''}"`,
      `"${r.membershipTypeEn || r.membershipType || ''}"`,
      `"${r.whatsapp || ''}"`,
      `"${r.email || ''}"`,
      `"${r.cityEn || r.city || ''}"`,
      `"${r.cityUr || r.city || ''}"`,
      `"${r.status || ''}"`,
      `"${r.submittedAt || ''}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Arain_Bannu_Members_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export donations as CSV
  const exportDonationsCsv = () => {
    const headers = ['Donor Name', 'Amount (PKR)', 'Phone', 'Method', 'Transaction ID', 'Status', 'Note', 'Date'];
    const rows = donations.map(d => [
      `"${d.donorName || ''}"`,
      `"${d.amount || ''}"`,
      `"${d.phone || ''}"`,
      `"${d.method || ''}"`,
      `"${d.txId || ''}"`,
      `"${d.status || ''}"`,
      `"${d.note || ''}"`,
      `"${d.submittedAt || ''}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Arain_Bannu_Donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save changes handler for CMS
  const handleSaveCms = async () => {
    setSaveStatus(isUrdu ? 'ترجمہ اور محفوظ کیا جا رہا ہے...' : 'Translating with Azure & Saving to Firestore...');
    try {
      // Process leaders with Azure Translator: populate both English and Urdu fields seamlessly
      const processedLeaders: Leader[] = await Promise.all(
        tempLeaders.map(async (lead) => {
          const nameIsUr = isUrduText(lead.name);
          const roleIsUr = isUrduText(lead.role);
          const msgIsUr = isUrduText(lead.message || '');
          const bioIsUr = isUrduText(lead.bio || '');
          const locIsUr = isUrduText(lead.location || '');

          const finalName = nameIsUr ? await translateNameToEnglishAsync(lead.name) : lead.name;
          const finalNameUr = lead.nameUr || (nameIsUr ? lead.name : await translateNameToUrduAsync(lead.name));

          const finalRole = roleIsUr ? translateOccupationToEnglish(lead.role) : lead.role;
          const finalRoleUr = lead.roleUr || (roleIsUr ? lead.role : translateOccupationToUrdu(lead.role));

          const finalMsg = msgIsUr 
            ? await translateUrduToEnglishAsync(lead.message || '') 
            : (lead.message || '');
          const finalMsgUr = lead.messageUr || (msgIsUr 
            ? (lead.message || '') 
            : await translateEnglishToUrduAsync(lead.message || ''));

          const finalBio = bioIsUr 
            ? await translateUrduToEnglishAsync(lead.bio || '') 
            : (lead.bio || '');
          const finalBioUr = lead.bioUr || (bioIsUr 
            ? (lead.bio || '') 
            : await translateEnglishToUrduAsync(lead.bio || ''));

          const finalLoc = locIsUr 
            ? await translateAddressToEnglishAsync(lead.location || '') 
            : (lead.location || '');
          const finalLocUr = lead.locationUr || (locIsUr 
            ? (lead.location || '') 
            : await translateAddressToUrduAsync(lead.location || ''));

          return {
            ...lead,
            name: finalName,
            nameUr: finalNameUr,
            role: finalRole,
            roleUr: finalRoleUr,
            message: finalMsg,
            messageUr: finalMsgUr,
            bio: finalBio,
            bioUr: finalBioUr,
            location: finalLoc,
            locationUr: finalLocUr,
          };
        })
      );

      // Process contacts: populate both English and Urdu fields seamlessly
      const processedContacts: ContactDetail[] = (tempSettings.multipleContacts || []).map(contact => {
        const titleIsUr = isUrduText(contact.title);
        const noteIsUr = isUrduText(contact.note || '');

        const finalTitle = titleIsUr ? translateContactTitleToEnglish(contact.title) : contact.title;
        const finalTitleUr = contact.titleUr || (titleIsUr ? contact.title : translateContactTitleToUrdu(contact.title));

        const finalNote = noteIsUr ? translateContactNoteToEnglish(contact.note || '') : (contact.note || '');
        const finalNoteUr = contact.noteUr || (noteIsUr ? (contact.note || '') : translateContactNoteToUrdu(contact.note || ''));

        return {
          ...contact,
          title: finalTitle,
          titleUr: finalTitleUr,
          note: finalNote,
          noteUr: finalNoteUr,
        };
      });

      // Process announcement settings with Azure Translator
      const badgeIsUr = isUrduText(tempSettings.announcementBadge || '');
      const textIsUr = isUrduText(tempSettings.announcementText || '');

      let finalAnnBadgeEn = tempSettings.announcementBadge || '';
      let finalAnnBadgeUr = tempSettings.announcementBadgeUr || '';
      if (badgeIsUr) {
        finalAnnBadgeUr = tempSettings.announcementBadge || '';
        finalAnnBadgeEn = await translateUrduToEnglishAsync(tempSettings.announcementBadge || '');
      } else if (tempSettings.announcementBadge) {
        finalAnnBadgeEn = tempSettings.announcementBadge;
        if (!finalAnnBadgeUr || !isUrduText(finalAnnBadgeUr)) {
          finalAnnBadgeUr = await translateEnglishToUrduAsync(tempSettings.announcementBadge);
        }
      }

      let finalAnnTextEn = tempSettings.announcementText || '';
      let finalAnnTextUr = tempSettings.announcementTextUr || '';
      if (textIsUr) {
        finalAnnTextUr = tempSettings.announcementText || '';
        finalAnnTextEn = await translateUrduToEnglishAsync(tempSettings.announcementText || '');
      } else if (tempSettings.announcementText) {
        finalAnnTextEn = tempSettings.announcementText;
        if (!finalAnnTextUr || !isUrduText(finalAnnTextUr)) {
          finalAnnTextUr = await translateEnglishToUrduAsync(tempSettings.announcementText);
        }
      }

      const processedSettings: SiteSettings = {
        ...tempSettings,
        multipleContacts: processedContacts,
        announcementBadge: finalAnnBadgeEn,
        announcementBadgeUr: finalAnnBadgeUr,
        announcementText: finalAnnTextEn,
        announcementTextUr: finalAnnTextUr,
      };

      // Process gallery items with Azure Translator
      const processedGallery: GalleryItem[] = await Promise.all(
        tempGallery.map(async (item) => {
          const rawCaption = item.caption || '';
          let captionEn = item.caption || '';
          let captionUr = item.captionUr || '';

          if (isUrduText(rawCaption)) {
            captionUr = rawCaption;
            if (!captionEn || isUrduText(captionEn)) {
              captionEn = await translateUrduToEnglishAsync(rawCaption);
            }
          } else if (rawCaption) {
            captionEn = rawCaption;
            if (!captionUr || !isUrduText(captionUr)) {
              captionUr = await translateEnglishToUrduAsync(rawCaption);
            }
          }

          return {
            ...item,
            caption: captionEn,
            captionUr: captionUr,
          };
        })
      );

      // Completely replace Firestore database content with new pictures & text information,
      // deliberately keeping only the Photo Gallery community memories intact!
      await replaceDatabaseWithCms(
        processedSettings,
        tempPrograms,
        processedLeaders,
        tempEvents,
        tempPages
      );
      // Photo Gallery memories are kept and synchronized with any memory photo additions/updates
      await saveGallery(processedGallery);
      setSaveStatus(isUrdu ? 'ڈیٹا بیس ریپلیس اور محفوظ ہو گیا (میموریز محفوظ ہیں)!' : 'Database Replaced & Synced (Memories Kept Safe)!');
      setTimeout(() => setSaveStatus(null), 3500);
    } catch (err: any) {
      console.error(err);
      setSaveStatus('Error saving: ' + err.message);
    }
  };

  // Filtered members
  const filteredMembers = registrations.filter(r => {
    const q = memberSearch.toLowerCase();
    const matchesSearch = 
      (r.fullName?.toLowerCase() || '').includes(q) ||
      (r.fullNameEn?.toLowerCase() || '').includes(q) ||
      (r.fullNameUr || '').includes(memberSearch) ||
      (r.fatherName?.toLowerCase() || '').includes(q) ||
      (r.fatherNameEn?.toLowerCase() || '').includes(q) ||
      (r.fatherNameUr || '').includes(memberSearch) ||
      (r.cnic || '').includes(memberSearch) ||
      (r.whatsapp || '').includes(memberSearch) ||
      (r.city?.toLowerCase() || '').includes(q) ||
      (r.cityEn?.toLowerCase() || '').includes(q) ||
      (r.cityUr || '').includes(memberSearch);
    const matchesStatus = memberStatusFilter === 'all' || (r.status || 'new').toLowerCase() === memberStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filtered donations
  const filteredDonations = donations.filter(d => {
    const matchesSearch = 
      (d.donorName?.toLowerCase() || '').includes(donationSearch.toLowerCase()) ||
      (d.phone || '').includes(donationSearch) ||
      (d.txId || '').includes(donationSearch);
    const matchesStatus = donationStatusFilter === 'all' || (d.status || 'unverified').toLowerCase() === donationStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div 
      dir={isUrdu ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-slate-50 text-slate-800 ${isUrdu ? 'font-urdu' : 'font-sans'} flex flex-col`}
    >
      
      {/* Admin Top Header */}
      <header className="bg-[#16232F] text-white border-b border-[#AD7A28]/30 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-0 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#AD7A28] flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-sm shrink-0">
              {isUrdu ? 'آ ب' : 'AB'}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-base leading-tight flex items-center gap-1.5 truncate">
                <span className="truncate">{tSetting('siteName', settings)}</span>
                <span className="hidden xs:inline-block px-1.5 sm:px-2 py-0.5 rounded-full bg-[#AD7A28]/20 border border-[#AD7A28]/40 text-[#F5CA7B] text-[9px] sm:text-[10px] font-semibold uppercase shrink-0">
                  {isUrdu ? 'مرکزی ایڈمن' : 'Central Admin'}
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                <span className="hidden sm:inline">{isUrdu ? 'لاگ ان بطور: ' : 'Logged in as: '}</span>
                <span className="text-amber-200 font-mono">{adminEmail}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Live Firestore indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t('cloudSynced', 'Cloud Synced')}</span>
            </div>

            {/* Language Switcher in Admin */}
            <button
              onClick={() => setLanguage(lang === 'en' ? 'ur' : 'en')}
              className="px-2 sm:px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-200 hover:bg-amber-500/30 text-[11px] sm:text-xs font-bold transition-colors cursor-pointer"
              title="Switch Language"
            >
              {lang === 'en' ? 'اردو' : 'English'}
            </button>

            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              title={t('btnPublicSite', 'View Public Site')}
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t('btnPublicSite', 'View Public Site')}</span>
              <span className="sm:hidden text-[11px]">Site</span>
            </button>

            <button
              onClick={onLogout}
              className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
              title={isUrdu ? 'لاگ آؤٹ' : 'Sign Out'}
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>

        {/* Tab Navigation - Mobile Touch Friendly Horizontal Scroll */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 border-t border-white/10 py-1.5 scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('customUpdate');
              setCmsTab('customUpdate');
            }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
              activeTab === 'customUpdate' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md ring-1 ring-amber-300' : 'bg-[#AD7A28]/25 text-amber-300 hover:bg-[#AD7A28]/40'
            }`}
          >
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
            <span>{isUrdu ? '⚡ لائیو ویب سائٹ اپڈیٹ' : '⚡ Custom Website Update'}</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t('tabOverview', 'Overview')}</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
              activeTab === 'members' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t('tabRegistrations', 'Membership Applications')} ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
              activeTab === 'donations' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t('tabDonations', 'Donations')} ({donations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
              activeTab === 'messages' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t('tabMessages', 'Inquiries')} ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
              activeTab === 'cms' ? 'bg-[#AD7A28] text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t('tabCMS', 'Site Content CMS')}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ===================== TAB 1: OVERVIEW ===================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isUrdu ? 'کل اندراج / رجسٹریشنز' : 'Total Registrations'}
                  </div>
                  <div className="text-3xl font-extrabold text-[#16232F] mt-1">
                    {registrations.length}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    {registrations.filter(r => (r.status || 'new') === 'approved').length} {isUrdu ? 'منظور شدہ اراکین' : 'approved members'}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isUrdu ? 'موصول شدہ عطیات' : 'Donations Received'}
                  </div>
                  <div className="text-2xl font-extrabold text-[#AD7A28] mt-1 truncate max-w-[180px]">
                    {isUrdu ? `${totalDonationAmount.toLocaleString()} روپے` : `PKR ${totalDonationAmount.toLocaleString()}`}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {donations.length} {isUrdu ? 'کل ٹرانزیکشن ریکارڈز' : 'total transaction records'}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#AD7A28] flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isUrdu ? 'فلاحی پروگرامز' : 'Flagship Programs'}
                  </div>
                  <div className="text-3xl font-extrabold text-[#16232F] mt-1">
                    {programs.length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {isUrdu ? 'فعال فلاحی شعبہ جات' : 'Active welfare wings'}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isUrdu ? 'آئندہ تقریبات' : 'Upcoming Events'}
                  </div>
                  <div className="text-3xl font-extrabold text-[#16232F] mt-1">
                    {events.length}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {isUrdu ? 'عوامی کلینڈر اجتماعات' : 'Public calendar gatherings'}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Applications Preview */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#16232F]">
                    {isUrdu ? 'حالیہ رکنیت کی درخواستیں' : 'Recent Membership Applications'}
                  </h3>
                  <button
                    onClick={() => setActiveTab('members')}
                    className="text-xs font-semibold text-[#AD7A28] hover:underline"
                  >
                    {isUrdu ? `سب دیکھیں (${registrations.length})` : `View All (${registrations.length})`}
                  </button>
                </div>

                {registrations.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    {isUrdu ? 'ابھی تک کوئی درخواست موصول نہیں ہوئی۔' : 'No applications submitted yet.'}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {registrations.slice(0, 5).map((reg, idx) => (
                      <div
                        key={reg._id || idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          {reg.photoData ? (
                            <img
                              src={reg.photoData}
                              alt={reg.fullName}
                              className="w-10 h-10 rounded-full object-cover border border-[#AD7A28]/40"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">
                              {reg.fullName?.[0]?.toUpperCase() || 'M'}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-sm text-[#16232F]">
                              {isUrdu ? (reg.fullNameUr || reg.fullName) : (reg.fullNameEn || reg.fullName)}
                            </div>
                            <div className="text-xs text-slate-500">
                              {isUrdu ? (reg.membershipTypeUr || reg.membershipType) : (reg.membershipTypeEn || reg.membershipType)} · {isUrdu ? (reg.cityUr || reg.city || 'بنوں') : (reg.cityEn || reg.city || 'Bannu')}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            reg.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                            reg.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {reg.status === 'approved' ? (isUrdu ? 'منظور شدہ' : 'Approved') :
                             reg.status === 'rejected' ? (isUrdu ? 'مسترد' : 'Rejected') :
                             (isUrdu ? 'نئی' : 'New')}
                          </span>

                          <button
                            onClick={() => setSelectedRegForCard(reg)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-[#AD7A28] hover:bg-white transition-colors"
                            title={isUrdu ? 'شناختی کارڈ پرنٹ کریں' : 'Print Card'}
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Operation shortcuts */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-[#16232F] mb-4">
                    {isUrdu ? 'فوری انتظامی اقدامات' : 'Quick Operations'}
                  </h3>
                  <div className="space-y-2.5">
                    <button
                      onClick={exportMembersCsv}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#AD7A28]" />
                        <span>{isUrdu ? 'تمام اراکین کا ریکارڈ ڈاؤن لوڈ کریں (CSV)' : 'Export All Members (CSV)'}</span>
                      </span>
                      <span className="text-slate-400">Excel / Sheets</span>
                    </button>

                    <button
                      onClick={exportDonationsCsv}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#AD7A28]" />
                        <span>{isUrdu ? 'عطیات کا لیجر ڈاؤن لوڈ کریں (CSV)' : 'Export Donations Ledger (CSV)'}</span>
                      </span>
                      <span className="text-slate-400">Excel / Sheets</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('cms'); setCmsTab('identity'); }}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-[#AD7A28]" />
                        <span>{isUrdu ? 'ویب سائٹ عنوان اور لوگو تبدیل کریں' : 'Edit Site Title & Logo'}</span>
                      </span>
                      <span className="text-slate-400">{isUrdu ? 'برانڈنگ' : 'Branding'}</span>
                    </button>
                  </div>
                </div>

                {/* Cloud Status Card */}
                <div className="bg-gradient-to-br from-[#16232F] to-[#25394C] text-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-[#F5CA7B] text-xs font-bold uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>{isUrdu ? 'فائر بیس ڈیٹا بیس کی لائیو کیفیت' : 'Firebase Backend Status'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {isUrdu 
                      ? 'پروڈکشن فائر اسٹور ڈیٹا بیس کے ساتھ براہ راست منسلک ہے۔ تمام عوامی اندراجات، عطیات اور سی ایم ایس ترامیم فوری طور پر بغیر کسی تاخیر کے اپ ڈیٹ ہوتی ہیں۔'
                      : 'Connected directly to production Firestore database. All public registrations, donation confirmations, and CMS adjustments synchronize in real-time.'
                    }
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 bg-black/30 p-2.5 rounded-lg truncate">
                    Collection: siteConfig, registrations, donations
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================== TAB 2: MEMBERSHIP APPLICATIONS ===================== */}
        {activeTab === 'members' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              
              <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className={`w-4 h-4 text-slate-400 absolute ${isUrdu ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
                  <input
                    type="text"
                    placeholder={isUrdu ? 'نام، شناختی کارڈ، فون، شہر سے تلاش کریں...' : 'Search by name, CNIC, phone, city...'}
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className={`w-full ${isUrdu ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#AD7A28]`}
                  />
                </div>

                <select
                  value={memberStatusFilter}
                  onChange={(e) => setMemberStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#AD7A28]"
                >
                  <option value="all">{isUrdu ? 'تمام حالتیں' : 'All Statuses'}</option>
                  <option value="new">{isUrdu ? 'نئی درخواستیں' : 'New'}</option>
                  <option value="approved">{isUrdu ? 'منظور شدہ' : 'Approved'}</option>
                  <option value="rejected">{isUrdu ? 'مسترد' : 'Rejected'}</option>
                </select>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={exportMembersCsv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'سی ایس وی ڈاؤن لوڈ' : 'Export CSV'}</span>
                </button>
              </div>

            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className={`w-full ${isUrdu ? 'text-right' : 'text-left'} text-xs sm:text-sm`}>
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5">{isUrdu ? 'امیدوار' : 'Applicant'}</th>
                      <th className="px-4 py-3.5">{isUrdu ? 'شناختی کارڈ / جنس' : 'CNIC / Gender'}</th>
                      <th className="px-4 py-3.5">{isUrdu ? 'زمرہ رکنیت' : 'Category'}</th>
                      <th className="px-4 py-3.5">{isUrdu ? 'واٹس ایپ / شہر' : 'WhatsApp / City'}</th>
                      <th className="px-4 py-3.5">{isUrdu ? 'حیثیت' : 'Status'}</th>
                      <th className={`px-4 py-3.5 ${isUrdu ? 'text-left' : 'text-right'}`}>{isUrdu ? 'کارروائی' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                          {isUrdu ? 'کوئی درخواست نہیں ملی۔' : 'No matching member applications found.'}
                        </td>
                      </tr>
                    ) : (
                      filteredMembers.map((reg) => (
                        <tr key={reg._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              {reg.photoData ? (
                                <img
                                  src={reg.photoData}
                                  alt={reg.fullName}
                                  className="w-10 h-12 rounded-lg object-cover border border-[#AD7A28]/40 shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-12 rounded-lg bg-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0">
                                  {reg.fullName?.[0]?.toUpperCase() || 'M'}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-[#16232F]">
                                  {isUrdu ? (reg.fullNameUr || reg.fullName) : (reg.fullNameEn || reg.fullName)}
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap mt-0.5">
                                  <span>{isUrdu ? `ولدیت: ${reg.fatherNameUr || reg.fatherName}` : `S/O: ${reg.fatherNameEn || reg.fatherName}`}</span>
                                  {(reg.caste || reg.casteUr || reg.casteEn) && (
                                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-semibold">
                                      {isUrdu ? (reg.casteUr || reg.caste) : (reg.casteEn || reg.caste)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="font-mono text-xs font-semibold text-slate-700">
                              {reg.cnic || '—'}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {isUrdu ? (reg.genderUr || reg.gender) : (reg.genderEn || reg.gender)}
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                              {isUrdu ? (reg.membershipTypeUr || reg.membershipType) : (reg.membershipTypeEn || reg.membershipType)}
                            </span>
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="font-medium text-slate-700">
                              {reg.whatsapp}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {isUrdu 
                                ? `${reg.cityUr || reg.city || 'بنوں'}، ${reg.countryUr || reg.country || 'پاکستان'}`
                                : `${reg.cityEn || reg.city || 'Bannu'}, ${reg.countryEn || reg.country || 'Pakistan'}`
                              }
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <select
                              value={reg.status || 'new'}
                              onChange={(e) => reg._id && updateRegistrationStatus(reg._id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                                reg.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                reg.status === 'rejected' ? 'bg-red-50 text-red-800 border-red-300' :
                                'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setViewingRegDetails(reg)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                title="View Dossier"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => setSelectedRegForCard(reg)}
                                className="p-1.5 rounded-lg text-[#AD7A28] hover:text-[#8C601A] hover:bg-amber-50"
                                title="Print Membership ID Card"
                              >
                                <CreditCard className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => reg._id && confirm('Delete this application record?') && deleteRegistration(reg._id)}
                                className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 3: DONATIONS ===================== */}
        {activeTab === 'donations' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className={`w-4 h-4 text-slate-400 absolute ${isUrdu ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
                  <input
                    type="text"
                    placeholder={isUrdu ? 'ڈونر کا نام، فون، رسید نمبر سے تلاش کریں...' : 'Search by donor name, phone, TX ID...'}
                    value={donationSearch}
                    onChange={(e) => setDonationSearch(e.target.value)}
                    className={`w-full ${isUrdu ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#AD7A28]`}
                  />
                </div>

                <select
                  value={donationStatusFilter}
                  onChange={(e) => setDonationStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#AD7A28]"
                >
                  <option value="all">{isUrdu ? 'تمام کیفیات' : 'All Verification'}</option>
                  <option value="unverified">{isUrdu ? 'غیر تصدیق شدہ' : 'Unverified'}</option>
                  <option value="verified">{isUrdu ? 'تصدیق شدہ' : 'Verified'}</option>
                  <option value="rejected">{isUrdu ? 'مسترد شدہ' : 'Rejected'}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportDonationsCsv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'سی ایس وی ڈاؤن لوڈ' : 'Export CSV'}</span>
                </button>
              </div>
            </div>

            {/* Donations Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className={`w-full ${isUrdu ? 'text-right' : 'text-left'} text-xs sm:text-sm`}>
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="px-4 py-3.5">{isUrdu ? 'عطیہ دہندہ' : 'Donor Details'}</th>
                      <th className="px-4 py-3.5">{isUrdu ? 'رقم' : 'Amount (PKR)'}</th>
                      <th className="px-4 py-3.5">{isUrdu ? 'طریقہ و رسید کوڈ' : 'Method & Reference'}</th>
                      <th className="px-4 py-3.5">{isUrdu ? 'رسید کا اسکرین شاٹ' : 'Screenshot / Slip'}</th>
                      <th className="px-4 py-3.5">{isUrdu ? 'تصدیقی کیفیت' : 'Verification'}</th>
                      <th className={`px-4 py-3.5 ${isUrdu ? 'text-left' : 'text-right'}`}>{isUrdu ? 'کارروائی' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                          {isUrdu ? 'کوئی عطیہ ریکارڈ نہیں ملا۔' : 'No donation transactions recorded yet.'}
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.map((don) => (
                        <tr key={don._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="font-bold text-[#16232F]">
                              {don.donorName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {don.phone} {don.email && `· ${don.email}`}
                            </div>
                          </td>

                          <td className="px-4 py-3.5 font-bold text-[#AD7A28] text-sm sm:text-base font-mono">
                            PKR {parseInt(String(don.amount || '').replace(/[^0-9]/g, '') || '0').toLocaleString()}
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="text-xs font-semibold text-slate-800">
                              {don.method}
                            </div>
                            <div className="font-mono text-[11px] text-slate-500">
                              TX: {don.txId || 'N/A'}
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            {don.photoData ? (
                              <button
                                onClick={() => setViewingDonationProof(don)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                              >
                                <ImageIcon className="w-3.5 h-3.5 text-[#AD7A28]" />
                                <span>View Slip</span>
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs italic">No slip attached</span>
                            )}
                          </td>

                          <td className="px-4 py-3.5">
                            <select
                              value={don.status || 'unverified'}
                              onChange={(e) => don._id && updateDonationStatus(don._id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                                don.status === 'verified' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                don.status === 'rejected' ? 'bg-red-50 text-red-800 border-red-300' :
                                'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="unverified">Unverified</option>
                              <option value="verified">Verified</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="px-4 py-3.5 text-right">
                            <button
                              onClick={() => don._id && confirm('Delete this donation transaction?') && deleteDonation(don._id)}
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 4: INQUIRIES & MESSAGES ===================== */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#16232F] mb-4">
                Received Public Inquiries ({messages.length})
              </h3>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    No inquiries received yet.
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-base text-[#16232F]">{m.name}</span>
                          <span className="text-xs text-slate-500 ml-2">({m.email})</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(m.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="font-semibold text-sm text-[#AD7A28]">
                        Subject: {m.subject}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                        {m.message}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-200/80 mt-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || 'Inquiry')}`}
                            onClick={() => m.id && updateContactMessageStatus(String(m.id), 'replied')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16232F] text-white text-xs font-semibold hover:bg-[#25394C] transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply via Email</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => m.id && updateContactMessageStatus(String(m.id), m.status === 'read' ? 'unread' : 'read')}
                            className="px-2.5 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                          >
                            {m.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            m.status === 'replied' ? 'bg-purple-100 text-purple-700' :
                            m.status === 'read' ? 'bg-slate-200 text-slate-700' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {m.status === 'replied' ? 'Replied' : m.status === 'read' ? 'Read' : 'Unread'}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              if (m.id && confirm('Delete this message permanently?')) {
                                deleteContactMessage(String(m.id));
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: CMS CONTENT MANAGER & CUSTOM UPDATE ===================== */}
        {(activeTab === 'cms' || activeTab === 'customUpdate') && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Bar for CMS with Save button */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#16232F] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>{isUrdu ? 'ویب سائٹ مواد، اعلانات اور کسٹم اپڈیٹ' : 'Website Content, Live Updates & CMS'}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {isUrdu 
                    ? 'اعلانات، نوٹسز، ممبرشپ کارڈ ترتیبات، فلاحی پروگرامز، قیادت، گیلری اور بینک اکاؤنٹس کو اپ ڈیٹ کریں۔'
                    : 'Manage breaking announcements, notice ribbons, member card settings, programs, and live site contents.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {saveStatus && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 animate-pulse">
                    {saveStatus}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(isUrdu 
                      ? 'کیا آپ فائر اسٹور ڈیٹا بیس کو موجودہ CRM ڈیٹا سے مکمل ریپلیس کرنا چاہتے ہیں؟ پرانا حذف شدہ ڈیٹا نئے ڈیٹا سے بدل دیا جائے گا جبکہ تصویری گیلری میموریز مکمل محفوظ رہیں گی۔'
                      : 'Replace the Firestore database with the current CRM content? Deleted or changed items in Firestore will be overwritten with your new data. The Photo Gallery community memories will be safely kept.'
                    )) {
                      handleSaveCms();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-amber-400 border border-amber-500/30 text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                  title="Replace database keeping photo gallery memories"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>{isUrdu ? 'ڈیٹا بیس ریپلیس کریں (میموریز محفوظ)' : 'Replace Database (Keep Memories)'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveCms}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#AD7A28] hover:bg-[#96681E] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isUrdu ? 'محفوظ کریں اور کلاؤڈ پر بھیجیں' : 'Save & Push to Cloud'}</span>
                </button>
              </div>
            </div>

            {/* CMS Section Pills */}
            <div className="flex overflow-x-auto gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm scrollbar-none">
              {[
                { id: 'customUpdate', label: isUrdu ? '⚡ فوری لائیو اپڈیٹ' : '⚡ Live Website Update', isSpecial: true },
                { id: 'identity', label: isUrdu ? 'شناخت و مونوگرام' : 'Identity & Brand' },
                { id: 'hero', label: isUrdu ? 'ہیرو بینر و اعداد و شمار' : 'Hero & Stats' },
                { id: 'about', label: isUrdu ? 'ہمارے متعلق و مشن' : 'About & Quote' },
                { id: 'programs', label: isUrdu ? 'فلاحی پروگرامز' : 'Programs' },
                { id: 'leaders', label: isUrdu ? 'تنظیمی قیادت' : 'Leadership' },
                { id: 'events', label: isUrdu ? 'تقریبات و اعلانات' : 'Events' },
                { id: 'pages', label: isUrdu ? 'صفحات و آئین' : 'Dynamic Pages' },
                { id: 'gallery', label: isUrdu ? 'تصویری گیلری' : 'Gallery' },
                { id: 'bank', label: isUrdu ? 'بینک اکاؤنٹس' : 'Donation Accounts' },
                { id: 'contact', label: isUrdu ? 'رابطہ کی تفصیلات' : 'Contact Details' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setCmsTab(sub.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    cmsTab === sub.id 
                      ? (sub.isSpecial ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm' : 'bg-[#16232F] text-white shadow-sm') 
                      : (sub.isSpecial ? 'bg-amber-50 text-amber-900 border border-amber-300/60 hover:bg-amber-100' : 'text-slate-600 hover:bg-slate-100')
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* CMS Form Containers */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              
              {/* Custom Live Website Update CMS */}
              {cmsTab === 'customUpdate' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
                        <Zap className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-[#16232F]">
                          {isUrdu ? '⚡ فوری کسٹم ویب سائٹ اپڈیٹ و کنٹرول پینل' : '⚡ Live Website Custom Update & Control Center'}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {isUrdu 
                            ? 'ویب سائٹ کے اعلانات، نوٹس ربن، ممبرشپ کارڈ جنریٹر اور لائیو فیچرز کو فوری تبدیل کریں۔'
                            : 'Quickly publish announcements, notice ribbons, membership card settings, and real-time site updates.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Live Site Announcement Bar */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-amber-600" />
                        <span className="font-bold text-xs sm:text-sm text-slate-800">
                          {isUrdu ? 'ٹاپ اناؤنسمنٹ بار (سائٹ کی ہیڈر پٹی)' : 'Top Header Announcement Bar'}
                        </span>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempSettings.announcementEnabled ?? true}
                          onChange={(e) => setTempSettings({ ...tempSettings, announcementEnabled: e.target.checked })}
                          className="w-4 h-4 text-[#AD7A28] rounded focus:ring-[#AD7A28]"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          {isUrdu ? 'فعال ہے (Active)' : 'Enabled on Live Site'}
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isUrdu ? 'بیج کا عنوان' : 'Badge Label'}
                      </label>
                      <input
                        type="text"
                        value={isUrdu ? (tempSettings.announcementBadgeUr || tempSettings.announcementBadge || '') : (tempSettings.announcementBadge || tempSettings.announcementBadgeUr || '')}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTempSettings({
                            ...tempSettings,
                            announcementBadge: isUrdu ? (tempSettings.announcementBadge || val) : val,
                            announcementBadgeUr: isUrdu ? val : (tempSettings.announcementBadgeUr || val)
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-[#AD7A28] focus:border-[#AD7A28]"
                        placeholder={isUrdu ? 'مثلاً: اہم اعلان یا Official Announcement' : 'e.g. OFFICIAL ANNOUNCEMENT'}
                        dir={isUrdu ? 'rtl' : 'ltr'}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isUrdu ? 'اعلان کا متن' : 'Announcement Text'}
                      </label>
                      <textarea
                        rows={2}
                        value={isUrdu ? (tempSettings.announcementTextUr || tempSettings.announcementText || '') : (tempSettings.announcementText || tempSettings.announcementTextUr || '')}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTempSettings({
                            ...tempSettings,
                            announcementText: isUrdu ? (tempSettings.announcementText || val) : val,
                            announcementTextUr: isUrdu ? val : (tempSettings.announcementTextUr || val)
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-[#AD7A28] focus:border-[#AD7A28]"
                        placeholder={isUrdu ? 'سائٹ اناؤنسمنٹ لکھیے (اردو یا انگلش)...' : 'Enter announcement text in English or Urdu...'}
                        dir={isUrdu ? 'rtl' : 'ltr'}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isUrdu ? 'اعلان کا ایکشن لنک (اختیاری)' : 'Action Link URL (Optional)'}
                      </label>
                      <input
                        type="text"
                        value={tempSettings.announcementLink || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, announcementLink: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm font-mono"
                        placeholder="#register or https://..."
                      />
                    </div>
                  </div>

                  {/* Section 2: Hero Section Live Notice Ribbon */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-xs sm:text-sm text-slate-800">
                        {isUrdu ? 'ہیرو بینر لائیو نوٹس ربن' : 'Hero Section Live Notice Ribbon'}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isUrdu ? 'بریکنگ نوٹس ہیڈ لائن' : 'Breaking Notice Headline'}
                      </label>
                      <input
                        type="text"
                        value={tempSettings.customNoticeHeadline || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, customNoticeHeadline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                        placeholder="e.g. Free Eye Medical Camp on 25th September at DHQ Bannu"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        {isUrdu 
                          ? 'یہ نوٹس ہوم پیج کے بالکل شروع میں گولڈن ربن میں نظر آئے گا۔'
                          : 'This notice is shown prominently inside the gold notice ribbon in the Hero section.'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isUrdu ? 'ویب سائٹ کی آخری اپڈیٹ کی تاریخ / ٹیگ' : 'Last Website Update Badge Text'}
                      </label>
                      <input
                        type="text"
                        value={tempSettings.lastWebsiteUpdate || ''}
                        onChange={(e) => setTempSettings({ ...tempSettings, lastWebsiteUpdate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                        placeholder="e.g. September 2026 - Official Verification Live"
                      />
                    </div>
                  </div>

                  {/* Section 3: Membership Card Generator Customization Defaults */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#AD7A28]" />
                      <span className="font-bold text-xs sm:text-sm text-slate-800">
                        {isUrdu ? 'ممبرشپ کارڈ جنریٹر کی عالمی ترتیبات' : 'Membership Card Generator Global Defaults'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {isUrdu ? 'کارڈ پر ایسوسی ایشن کا انگریزی نام' : 'Card Association English Name'}
                        </label>
                        <input
                          type="text"
                          value={tempSettings.siteName}
                          onChange={(e) => setTempSettings({ ...tempSettings, siteName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {isUrdu ? 'کارڈ سب ٹائٹل / چیپٹر کا نام' : 'Card Subtitle / Chapter'}
                        </label>
                        <input
                          type="text"
                          value={tempSettings.siteSubName}
                          onChange={(e) => setTempSettings({ ...tempSettings, siteSubName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border text-sm"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      {isUrdu 
                        ? 'ممبرشپ کارڈ موڈل میں ایڈمن کسی بھی رکن کا کارڈ گولڈ، زمرد، نیوی یا کرمسن تھیم میں ڈاؤن لوڈ اور پرنٹ کر سکتے ہیں۔'
                        : 'Admins can dynamically customize themes (Gold, Emerald, Navy, Crimson) and signatories in real-time from the Member Card Generator.'}
                    </p>
                  </div>

                  {/* One-Click Save & Sync Button */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
                    {saveStatus ? (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                        {saveStatus}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">
                        {isUrdu ? 'تبدیلیاں محفوظ کرنے کے لیے بٹن دبائیں۔' : 'Press to immediately sync all updates to cloud.'}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleSaveCms}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isUrdu ? 'لائیو ویب سائٹ پر شائع کریں' : 'Publish Live Update Now'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Identity CMS */}
              {cmsTab === 'identity' && (
                <div className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    Branding & Organisation Seal
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Site Title</label>
                    <input
                      type="text"
                      value={tempSettings.siteName}
                      onChange={(e) => setTempSettings({ ...tempSettings, siteName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sub Title / Chapter Tag</label>
                    <input
                      type="text"
                      value={tempSettings.siteSubName}
                      onChange={(e) => setTempSettings({ ...tempSettings, siteSubName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Core Motto / Tagline</label>
                    <input
                      type="text"
                      value={tempSettings.siteTagline}
                      onChange={(e) => setTempSettings({ ...tempSettings, siteTagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      {isUrdu ? 'کسٹم لوگو / نشان' : 'Custom Logo Emblem'}
                    </label>
                    <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {tempSettings.logoData ? (
                        <div className="flex items-center gap-3">
                          <img src={tempSettings.logoData} alt="Logo" className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-sm" />
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(isUrdu ? 'کیا آپ کسٹم لوگو ڈیلیٹ کرنا چاہتے ہیں؟' : 'Delete custom logo emblem?')) {
                                setTempSettings({ ...tempSettings, logoData: '' });
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{isUrdu ? 'لوگو ڈیلیٹ کریں' : 'Delete Logo'}</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">
                          {isUrdu ? 'کوئی لوگو اپلوڈ نہیں ہے (ڈیفالٹ ایمبلم استعمال ہوگا)' : 'No custom logo uploaded (default emblem will be used)'}
                        </span>
                      )}
                      <div className="ml-auto">
                        <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5">
                          <span>{tempSettings.logoData ? (isUrdu ? 'لوگو تبدیل کریں' : 'Change Logo') : (isUrdu ? 'لوگو اپلوڈ کریں' : 'Upload Logo')}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const b64 = await compressImage(file, 400, 0.8);
                                setTempSettings({ ...tempSettings, logoData: b64 });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hero CMS */}
              {cmsTab === 'hero' && (
                <div className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    Hero Presentation & Stats Counters
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={tempSettings.heroBadge}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroBadge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Title</label>
                    <input
                      type="text"
                      value={tempSettings.heroTitle}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subtitle</label>
                    <input
                      type="text"
                      value={tempSettings.heroSub}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroSub: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Tagline</label>
                    <textarea
                      rows={3}
                      value={tempSettings.heroTagline}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroTagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Stat: Members</label>
                      <input
                        type="text"
                        value={tempSettings.statMembers}
                        onChange={(e) => setTempSettings({ ...tempSettings, statMembers: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Stat: Programs</label>
                      <input
                        type="text"
                        value={tempSettings.statPrograms}
                        onChange={(e) => setTempSettings({ ...tempSettings, statPrograms: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Stat: Cities</label>
                      <input
                        type="text"
                        value={tempSettings.statCities}
                        onChange={(e) => setTempSettings({ ...tempSettings, statCities: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                  </div>

                  {/* Hero Background Pictures Manager */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Hero Background Pictures (Single or Multi-Slideshow)
                        </h5>
                        <p className="text-[11px] text-slate-500">
                          Add single or multiple pictures for the public hero background with Animated.timing transitions.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <label className="text-xs text-slate-600 font-medium">Slide Timing:</label>
                        <select
                          value={tempSettings.heroSlideDuration || 5}
                          onChange={(e) => setTempSettings({ ...tempSettings, heroSlideDuration: Number(e.target.value) })}
                          className="px-2 py-1 rounded-lg border text-xs bg-white"
                        >
                          <option value={3}>3 Seconds</option>
                          <option value={5}>5 Seconds (Recommended)</option>
                          <option value={7}>7 Seconds</option>
                          <option value={10}>10 Seconds</option>
                        </select>
                      </div>
                    </div>

                    {/* Hero Pictures Header & Clear All */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-700">
                        {isUrdu ? 'موجودہ ہیرو تصاویر' : 'Current Hero Background Pictures'} ({(tempSettings.heroImages || (tempSettings.heroImage ? [tempSettings.heroImage] : [])).length})
                      </span>
                      {((tempSettings.heroImages && tempSettings.heroImages.length > 0) || tempSettings.heroImage) && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(isUrdu ? 'کیا آپ تمام ہیرو بیک گراؤنڈ تصاویر ڈیلیٹ کرنا چاہتے ہیں؟' : 'Delete all hero background pictures? The website will display the clean navy & gold banner.')) {
                              setTempSettings({ ...tempSettings, heroImages: [], heroImage: '' });
                            }
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isUrdu ? 'تمام تصاویر ڈیلیٹ کریں' : 'Delete All Hero Pictures'}</span>
                        </button>
                      )}
                    </div>

                    {/* Image List / Grid */}
                    {(tempSettings.heroImages || (tempSettings.heroImage ? [tempSettings.heroImage] : [])).length === 0 ? (
                      <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500 bg-slate-50">
                        {isUrdu 
                          ? 'کوئی ہیرو تصویر موجود نہیں ہے۔ ویب سائٹ نفیس نیوی اور سنہری تھیم ڈسپلے کرے گی۔' 
                          : 'No hero background pictures. The hero will render the clean navy & gold theme.'}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {(tempSettings.heroImages || (tempSettings.heroImage ? [tempSettings.heroImage] : [])).map((img, idx) => (
                          <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 shadow-sm">
                            <img src={img} alt={`Hero ${idx + 1}`} className="w-full h-full object-cover" />
                            <span className="text-[10px] text-white font-mono absolute top-1.5 left-2 bg-black/60 px-1.5 py-0.5 rounded shadow">
                              #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const currentList = [...(tempSettings.heroImages || (tempSettings.heroImage ? [tempSettings.heroImage] : []))];
                                currentList.splice(idx, 1);
                                setTempSettings({ ...tempSettings, heroImages: currentList, heroImage: currentList[0] || '' });
                              }}
                              className="absolute top-1.5 right-1.5 px-2 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold shadow flex items-center gap-1 cursor-pointer transition-colors"
                              title="Delete this picture"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{isUrdu ? 'ڈیلیٹ' : 'Delete'}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Image Controls: File upload or URL */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <input
                        type="url"
                        placeholder="Paste image URL (https://...)"
                        value={newHeroImageUrl}
                        onChange={(e) => setNewHeroImageUrl(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newHeroImageUrl.trim()) return;
                          const currentList = [...(tempSettings.heroImages || (tempSettings.heroImage ? [tempSettings.heroImage] : []))];
                          currentList.push(newHeroImageUrl.trim());
                          setTempSettings({ ...tempSettings, heroImages: currentList, heroImage: currentList[0] });
                          setNewHeroImageUrl('');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#AD7A28] hover:bg-[#8C601A] text-white text-xs font-bold cursor-pointer shrink-0"
                      >
                        + Add Image URL
                      </button>

                      <label className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer text-center shrink-0">
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const b64 = await compressImage(file, 1280, 0.82);
                              const currentList = [...(tempSettings.heroImages || (tempSettings.heroImage ? [tempSettings.heroImage] : []))];
                              currentList.push(b64);
                              setTempSettings({ ...tempSettings, heroImages: currentList, heroImage: currentList[0] });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* About CMS */}
              {cmsTab === 'about' && (
                <div className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    About Section & Chairman's Message
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Paragraph 1</label>
                    <textarea
                      rows={3}
                      value={tempSettings.aboutP1}
                      onChange={(e) => setTempSettings({ ...tempSettings, aboutP1: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Paragraph 2</label>
                    <textarea
                      rows={3}
                      value={tempSettings.aboutP2}
                      onChange={(e) => setTempSettings({ ...tempSettings, aboutP2: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Paragraph 3</label>
                    <textarea
                      rows={3}
                      value={tempSettings.aboutP3}
                      onChange={(e) => setTempSettings({ ...tempSettings, aboutP3: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Chairman Name</label>
                      <input
                        type="text"
                        value={tempSettings.chairmanName}
                        onChange={(e) => setTempSettings({ ...tempSettings, chairmanName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Chairman Quote</label>
                      <textarea
                        rows={2}
                        value={tempSettings.chairmanQuote}
                        onChange={(e) => setTempSettings({ ...tempSettings, chairmanQuote: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>
                  </div>

                  {/* Chairman Photo Management */}
                  <div className="pt-3 border-t border-slate-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Global Chairman Picture (عالمی چیئرمین کی تصویر)
                    </label>
                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="relative shrink-0">
                        {tempSettings.chairmanPhoto ? (
                          <img
                            src={tempSettings.chairmanPhoto}
                            alt="Global Chairman"
                            className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs border border-dashed border-slate-300">
                            No Photo
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Chairman photo URL (e.g. https://...)"
                          value={tempSettings.chairmanPhoto || ''}
                          onChange={(e) => setTempSettings({ ...tempSettings, chairmanPhoto: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl border text-xs bg-white"
                        />
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer">
                            <span>Upload Picture</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const b64 = await compressImage(file, 400, 0.85);
                                  setTempSettings({ ...tempSettings, chairmanPhoto: b64 });
                                }
                              }}
                            />
                          </label>
                          {tempSettings.chairmanPhoto && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(isUrdu ? 'کیا آپ چیئرمین کی تصویر ڈیلیٹ کرنا چاہتے ہیں؟' : 'Delete Chairman picture?')) {
                                  setTempSettings({ ...tempSettings, chairmanPhoto: '' });
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer inline-flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{isUrdu ? 'تصویر ڈیلیٹ کریں' : 'Delete Picture'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Programs CMS */}
              {cmsTab === 'programs' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                    <h4 className="text-sm font-bold text-[#16232F]">
                      {isUrdu ? 'فلاحی پروگرامز و انیشیٹوز' : 'Initiatives & Programs'} ({tempPrograms.length})
                    </h4>
                    <div className="flex items-center gap-2">
                      {tempPrograms.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(isUrdu ? 'کیا آپ تمام فلاحی پروگرامز ڈیلیٹ کرنا چاہتے ہیں؟' : 'Delete all programs?')) {
                              setTempPrograms([]);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isUrdu ? 'تمام پروگرامز ڈیلیٹ کریں' : 'Clear All'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setTempPrograms([...tempPrograms, {
                          id: Date.now(),
                          title: 'New Welfare Initiative',
                          desc: 'Description of the new program initiative in Bannu.',
                          icon_name: 'award',
                          color: '#AD7A28',
                          sort_order: tempPrograms.length + 1
                        }])}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isUrdu ? 'نیا پروگرام شامل کریں' : 'Add Program'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tempPrograms.map((p, idx) => (
                      <div key={p.id || idx} className="p-4 rounded-xl border bg-slate-50 space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => {
                              const updated = [...tempPrograms];
                              updated[idx].title = e.target.value;
                              setTempPrograms(updated);
                            }}
                            className="font-bold text-sm bg-white px-2 py-1 rounded border flex-1 mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(isUrdu ? 'کیا آپ اس پروگرام کو ڈیلیٹ کرنا چاہتے ہیں؟' : `Delete program "${p.title}"?`)) {
                                setTempPrograms(tempPrograms.filter((_, i) => i !== idx));
                              }
                            }}
                            className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                            title="Delete Program"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={p.desc}
                          onChange={(e) => {
                            const updated = [...tempPrograms];
                            updated[idx].desc = e.target.value;
                            setTempPrograms(updated);
                          }}
                          className="w-full text-xs bg-white px-2 py-1 rounded border"
                        />
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={p.color || '#AD7A28'}
                            onChange={(e) => {
                              const updated = [...tempPrograms];
                              updated[idx].color = e.target.value;
                              setTempPrograms(updated);
                            }}
                            className="w-7 h-7 rounded cursor-pointer"
                          />
                          <span className="text-xs text-slate-500">Accent Color</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Leaders CMS */}
              {cmsTab === 'leaders' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#16232F]">
                        Leadership Directory ({tempLeaders.length})
                      </h4>
                      <p className="text-xs text-slate-500">
                        Manage leader profiles, customized viewer messages, biographies, and contact channels shown in the interactive popups.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newId = Date.now();
                        setTempLeaders([...tempLeaders, {
                          id: newId,
                          name: 'Leader Name',
                          nameUr: 'رہنما کا نام',
                          role: 'Council Member',
                          roleUr: 'رکن کونسل',
                          email: 'leader@arainbannu.org',
                          phone: '+92 331 0000000',
                          location: 'Bannu, Khyber Pakhtunkhwa',
                          locationUr: 'بنوں، خیبر پختونخوا',
                          message: 'We are committed to empowering our community through education, health, and social welfare.',
                          messageUr: 'ہم تعلیم، صحت اور سماجی فلاح و بہبود کے ذریعے اپنی برادری کی ترقی کے لیے پرعزم ہیں۔',
                          bio: 'Dedicated community leader actively participating in welfare initiatives and educational programs.',
                          bioUr: 'مخلص سماجی رہنما جو فلاحی منصوبوں اور تعلیمی پروگراموں میں فعال کردار ادا کر رہے ہیں۔',
                          responsibilities: ['Community Welfare', 'Social Coordination'],
                          featured: 0,
                          initials: 'AB'
                        }]);
                        setExpandedLeaderId(newId);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Leader</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {tempLeaders.map((lead, idx) => {
                      const isExpanded = expandedLeaderId === lead.id;
                      const photoSrc = lead.photo_data || lead.image;

                      return (
                        <div key={lead.id || idx} className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs">
                          {/* Card Header Bar */}
                          <div className="p-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-11 h-11 rounded-xl bg-[#AD7A28]/15 border border-[#AD7A28]/30 flex items-center justify-center overflow-hidden shrink-0">
                                {photoSrc ? (
                                  <img src={photoSrc} alt={lead.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xs font-bold text-[#AD7A28]">{lead.initials || 'AB'}</span>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-[#16232F] truncate">
                                    {isUrdu ? (lead.nameUr || lead.name) : (lead.name || lead.nameUr)}
                                  </span>
                                  {Boolean(lead.featured) && (
                                    <span className="px-2 py-0.5 rounded-md bg-[#AD7A28]/15 text-[#8A5F19] text-[10px] font-bold">
                                      Featured
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-slate-500 truncate">
                                  {isUrdu ? (lead.roleUr || lead.role) : (lead.role || lead.roleUr)}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setExpandedLeaderId(isExpanded ? null : (lead.id || idx))}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                              >
                                {isExpanded ? (
                                  <>
                                    <span>Collapse</span>
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  </>
                                ) : (
                                  <>
                                    <span>Edit Details & Message</span>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Remove ${lead.name} from leadership directory?`)) {
                                    setTempLeaders(tempLeaders.filter((_, i) => i !== idx));
                                  }
                                }}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                title="Delete Leader"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Quick Summary Inputs */}
                          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                {isUrdu ? 'مکمل نام' : 'Full Name'}
                              </label>
                              <input
                                type="text"
                                value={isUrdu ? (lead.nameUr || lead.name || '') : (lead.name || lead.nameUr || '')}
                                onChange={(e) => {
                                  const updated = [...tempLeaders];
                                  const val = e.target.value;
                                  if (isUrdu) {
                                    updated[idx].nameUr = val;
                                    if (!updated[idx].name || isUrduText(updated[idx].name)) {
                                      updated[idx].name = val;
                                    }
                                  } else {
                                    updated[idx].name = val;
                                    if (!updated[idx].nameUr || !isUrduText(updated[idx].nameUr)) {
                                      updated[idx].nameUr = val;
                                    }
                                  }
                                  setTempLeaders(updated);
                                }}
                                className="w-full text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-[#AD7A28] focus:border-[#AD7A28]"
                                placeholder={isUrdu ? 'مثال: حاجی محمد طاہر یا Haji Muhammad Tahir' : 'e.g. Haji Muhammad Tahir'}
                                dir={isUrdu ? 'rtl' : 'ltr'}
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                {isUrdu ? 'عہدہ / منصب' : 'Designation / Role'}
                              </label>
                              <input
                                type="text"
                                value={isUrdu ? (lead.roleUr || lead.role || '') : (lead.role || lead.roleUr || '')}
                                onChange={(e) => {
                                  const updated = [...tempLeaders];
                                  const val = e.target.value;
                                  if (isUrdu) {
                                    updated[idx].roleUr = val;
                                    if (!updated[idx].role || isUrduText(updated[idx].role)) {
                                      updated[idx].role = val;
                                    }
                                  } else {
                                    updated[idx].role = val;
                                    if (!updated[idx].roleUr || !isUrduText(updated[idx].roleUr)) {
                                      updated[idx].roleUr = val;
                                    }
                                  }
                                  setTempLeaders(updated);
                                }}
                                className="w-full text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-[#AD7A28] focus:border-[#AD7A28]"
                                placeholder={isUrdu ? 'مثال: چیئرمین / صدر یا Chairman' : 'e.g. Chairman / President'}
                                dir={isUrdu ? 'rtl' : 'ltr'}
                              />
                            </div>
                          </div>

                          {/* Expanded Full Details Section */}
                          {isExpanded && (
                            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-4">
                              
                              {/* Customized Message For Viewers */}
                              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                                  <MessageSquare className="w-4 h-4 text-amber-600" />
                                  <span>{isUrdu ? 'زائرین کے لیے خصوصی پیغام (کلک کرنے پر کھلنے والے ماڈل میں ظاہر ہوگا)' : 'Customized Message for Viewers (Displays in Click-to-Open Modal)'}</span>
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    {isUrdu ? 'پیغام کا متن' : 'Viewer Message'}
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={isUrdu ? (lead.messageUr || lead.message || '') : (lead.message || lead.messageUr || '')}
                                    onChange={(e) => {
                                      const updated = [...tempLeaders];
                                      const val = e.target.value;
                                      if (isUrdu) {
                                        updated[idx].messageUr = val;
                                        if (!updated[idx].message || isUrduText(updated[idx].message)) {
                                          updated[idx].message = val;
                                        }
                                      } else {
                                        updated[idx].message = val;
                                        if (!updated[idx].messageUr || !isUrduText(updated[idx].messageUr)) {
                                          updated[idx].messageUr = val;
                                        }
                                      }
                                      setTempLeaders(updated);
                                    }}
                                    className="w-full text-xs bg-white px-2.5 py-1.5 rounded-lg border border-amber-300 focus:ring-[#AD7A28] focus:border-[#AD7A28]"
                                    placeholder={isUrdu ? 'زائرین اور برادری کے لیے خصوصی و پرخلوص پیغام (اردو یا انگلش)...' : 'A direct, inspiring message from this leader to website visitors and community members...'}
                                    dir={isUrdu ? 'rtl' : 'ltr'}
                                  />
                                </div>
                              </div>

                              {/* Detailed Bio & Profile */}
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                  {isUrdu ? 'تفصیلی سوانح حیات / تعارف' : 'Detailed Biography'}
                                </label>
                                <textarea
                                  rows={3}
                                  value={isUrdu ? (lead.bioUr || lead.bio || '') : (lead.bio || lead.bioUr || '')}
                                  onChange={(e) => {
                                    const updated = [...tempLeaders];
                                    const val = e.target.value;
                                    if (isUrdu) {
                                      updated[idx].bioUr = val;
                                      if (!updated[idx].bio || isUrduText(updated[idx].bio)) {
                                        updated[idx].bio = val;
                                      }
                                    } else {
                                      updated[idx].bio = val;
                                      if (!updated[idx].bioUr || !isUrduText(updated[idx].bioUr)) {
                                        updated[idx].bioUr = val;
                                      }
                                    }
                                    setTempLeaders(updated);
                                  }}
                                  className="w-full text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-[#AD7A28] focus:border-[#AD7A28]"
                                  placeholder={isUrdu ? 'تعلیمی پس منظر، خدمات اور جدوجہد (اردو یا انگلش)...' : 'Educational background, career, community milestones and welfare leadership...'}
                                  dir={isUrdu ? 'rtl' : 'ltr'}
                                />
                              </div>

                              {/* Contact & Location */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    {isUrdu ? 'ای میل ایڈریس' : 'Email Address'}
                                  </label>
                                  <input
                                    type="email"
                                    value={lead.email || ''}
                                    onChange={(e) => {
                                      const updated = [...tempLeaders];
                                      updated[idx].email = e.target.value;
                                      setTempLeaders(updated);
                                    }}
                                    className="w-full text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    placeholder="leader@arainbannu.org"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    {isUrdu ? 'فون / واٹس ایپ' : 'Phone / WhatsApp'}
                                  </label>
                                  <input
                                    type="text"
                                    value={lead.phone || ''}
                                    onChange={(e) => {
                                      const updated = [...tempLeaders];
                                      updated[idx].phone = e.target.value;
                                      setTempLeaders(updated);
                                    }}
                                    className="w-full text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono"
                                    placeholder="+92 331 9051410"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    {isUrdu ? 'مقام / شہر' : 'Location'}
                                  </label>
                                  <input
                                    type="text"
                                    value={isUrdu ? (lead.locationUr || lead.location || '') : (lead.location || lead.locationUr || '')}
                                    onChange={(e) => {
                                      const updated = [...tempLeaders];
                                      const val = e.target.value;
                                      if (isUrdu) {
                                        updated[idx].locationUr = val;
                                        if (!updated[idx].location || isUrduText(updated[idx].location)) {
                                          updated[idx].location = val;
                                        }
                                      } else {
                                        updated[idx].location = val;
                                        if (!updated[idx].locationUr || !isUrduText(updated[idx].locationUr)) {
                                          updated[idx].locationUr = val;
                                        }
                                      }
                                      setTempLeaders(updated);
                                    }}
                                    className="w-full text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-[#AD7A28] focus:border-[#AD7A28]"
                                    placeholder={isUrdu ? 'مثال: بنوں، خیبر پختونخوا یا Bannu, KP' : 'e.g. Bannu, KP'}
                                    dir={isUrdu ? 'rtl' : 'ltr'}
                                  />
                                </div>
                              </div>

                              {/* Responsibilities */}
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                  Key Responsibilities / Focus Areas (comma-separated)
                                </label>
                                <input
                                  type="text"
                                  value={Array.isArray(lead.responsibilities) ? lead.responsibilities.join(', ') : (lead.responsibilities || '')}
                                  onChange={(e) => {
                                    const updated = [...tempLeaders];
                                    const list = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                    updated[idx].responsibilities = list;
                                    setTempLeaders(updated);
                                  }}
                                  className="w-full text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-300"
                                  placeholder="e.g. Strategic Planning, Health Dispensary Oversight, Educational Scholarships"
                                />
                              </div>

                              {/* Photo & Featured Controls */}
                              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(lead.featured)}
                                    onChange={(e) => {
                                      const updated = [...tempLeaders];
                                      updated[idx].featured = e.target.checked ? 1 : 0;
                                      setTempLeaders(updated);
                                    }}
                                    className="rounded text-[#AD7A28] focus:ring-[#AD7A28]"
                                  />
                                  <span className="font-semibold">Featured Badge (Highlight in council view)</span>
                                </label>

                                <div className="flex flex-wrap items-center gap-3">
                                  {(lead.photo_data || lead.image) ? (
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={lead.photo_data || lead.image}
                                        alt={lead.name}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (confirm(isUrdu ? 'کیا آپ اس رہنما کی تصویر ڈیلیٹ کرنا چاہتے ہیں؟' : `Delete portrait photo of "${lead.name}"?`)) {
                                            const updated = [...tempLeaders];
                                            updated[idx].photo_data = '';
                                            updated[idx].image = '';
                                            setTempLeaders(updated);
                                          }
                                        }}
                                        className="px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 inline-flex items-center gap-1 cursor-pointer transition-colors"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>{isUrdu ? 'تصویر ڈیلیٹ کریں' : 'Delete Photo'}</span>
                                      </button>
                                    </div>
                                  ) : null}

                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-slate-500">
                                      {(lead.photo_data || lead.image) ? (isUrdu ? 'تصویر تبدیل کریں:' : 'Change Portrait:') : (isUrdu ? 'تصویر اپلوڈ کریں:' : 'Upload Portrait:')}
                                    </span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const b64 = await compressImage(file, 400, 0.82);
                                          const updated = [...tempLeaders];
                                          updated[idx].photo_data = b64;
                                          setTempLeaders(updated);
                                        }
                                      }}
                                      className="text-xs"
                                    />
                                  </div>
                                </div>
                              </div>

                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Events CMS */}
              {cmsTab === 'events' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                    <h4 className="text-sm font-bold text-[#16232F]">
                      {isUrdu ? 'تقریبات و اجتماعات کا شیڈول' : 'Events Schedule'} ({tempEvents.length})
                    </h4>
                    <div className="flex items-center gap-2">
                      {tempEvents.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(isUrdu ? 'کیا آپ تمام شیڈول شدہ تقریبات ڈیلیٹ کرنا چاہتے ہیں؟' : 'Delete all scheduled events?')) {
                              setTempEvents([]);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isUrdu ? 'تمام تقریبات ڈیلیٹ کریں' : 'Clear All'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setTempEvents([...tempEvents, {
                          id: Date.now(),
                          title: 'Annual Assembly & Gathering',
                          month: 'DEC',
                          day: '25',
                          time_str: '2:00 PM - 6:00 PM',
                          place: 'Community Center, Bannu',
                          tag: 'General'
                        }])}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isUrdu ? 'نیا ایونٹ شامل کریں' : 'Add Event'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tempEvents.map((ev, idx) => (
                      <div key={ev.id || idx} className="p-4 rounded-xl border bg-slate-50 space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={ev.title}
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].title = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="font-bold text-sm bg-white px-2 py-1 rounded border flex-1 mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(isUrdu ? 'کیا آپ اس ایونٹ کو ڈیلیٹ کرنا چاہتے ہیں؟' : `Delete event "${ev.title}"?`)) {
                                setTempEvents(tempEvents.filter((_, i) => i !== idx));
                              }
                            }}
                            className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={ev.month}
                            placeholder="Month (e.g. DEC)"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].month = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border font-mono"
                          />
                          <input
                            type="text"
                            value={ev.day}
                            placeholder="Day (e.g. 25)"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].day = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border font-mono"
                          />
                          <input
                            type="text"
                            value={ev.tag}
                            placeholder="Tag (e.g. Youth)"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].tag = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={ev.time_str}
                            placeholder="Time"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].time_str = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border"
                          />
                          <input
                            type="text"
                            value={ev.place}
                            placeholder="Venue location"
                            onChange={(e) => {
                              const updated = [...tempEvents];
                              updated[idx].place = e.target.value;
                              setTempEvents(updated);
                            }}
                            className="text-xs bg-white px-2 py-1 rounded border"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages CMS */}
              {cmsTab === 'pages' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    Dynamic Information Pages
                  </h4>

                  {tempPages.map((page, idx) => (
                    <div key={page.slug || idx} className="p-4 rounded-xl border bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#16232F]">{page.label}</span>
                        <input
                          type="text"
                          value={page.title}
                          onChange={(e) => {
                            const updated = [...tempPages];
                            updated[idx].title = e.target.value;
                            setTempPages(updated);
                          }}
                          className="text-xs bg-white px-2 py-1 rounded border max-w-sm"
                        />
                      </div>
                      <textarea
                        rows={4}
                        value={page.body}
                        onChange={(e) => {
                          const updated = [...tempPages];
                          updated[idx].body = e.target.value;
                          setTempPages(updated);
                        }}
                        className="w-full text-xs bg-white p-2 rounded border leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Gallery CMS */}
              {cmsTab === 'gallery' && (
                <div className="space-y-4">
                  {/* Community Memories Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/80 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0 mt-0.5">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            {isUrdu ? 'کمیونٹی میموریز و یادگار تصویری آرکائیو' : 'Community Memories Vault & Photo Archive'}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                            {isUrdu ? 'میموریز محفوظ فنکشن' : 'Memories Protected'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {isUrdu
                            ? 'یہ تصویری گیلری ارائیں بنوں کی تاریخ، یادگار لمحات، اور کمیونٹی تقاریب کی یادیں (Memories) محفوظ رکھنے کے لیے وقف ہے۔ جب آپ ویب سائٹ مواد یا ڈیٹا بیس ریپلیس کرتے ہیں، تو یہ میموریز بالکل محفوظ رکھی جاتی ہیں۔'
                            : 'This photo gallery serves as the community memory vault preserving historical moments and gatherings. When replacing or updating website text and pictures, these memory archives remain protected.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                    <h4 className="text-sm font-bold text-[#16232F]">
                      {isUrdu ? 'محفوظ یادگار تصاویر' : 'Preserved Memory Photos'} ({tempGallery.length})
                    </h4>
                    <div className="flex items-center gap-2">
                      {tempGallery.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(isUrdu ? 'کیا آپ تمام یادگار تصاویر ڈیلیٹ کرنا چاہتے ہیں؟' : 'Delete all memory photos from gallery?')) {
                              setTempGallery([]);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isUrdu ? 'تمام گیلری صاف کریں' : 'Clear Gallery'}</span>
                        </button>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          id="new-gallery-photo-input"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const b64 = await compressImage(file, 800, 0.8);
                              setTempGallery([...tempGallery, {
                                id: Date.now(),
                                data_url: b64,
                                caption: 'ARAAIN BANNU Community Memory',
                                sort_order: tempGallery.length + 1
                              }]);
                            }
                          }}
                        />
                        <label
                          htmlFor="new-gallery-photo-input"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isUrdu ? 'یادگار تصویر اپلوڈ کریں' : 'Upload Memory Photo'}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {tempGallery.length === 0 ? (
                    <div className="p-8 rounded-2xl border border-dashed border-slate-300 text-center text-xs text-slate-500 bg-slate-50">
                      {isUrdu 
                        ? 'کوئی یادگار تصویر موجود نہیں ہے۔ اوپر دیے گئے بٹن سے نئی تصاویر اپلوڈ کریں۔' 
                        : 'No memory photos in the gallery. Use the button above to upload authentic community pictures.'}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {tempGallery.map((item, idx) => (
                        <div key={item.id || idx} className="relative rounded-xl overflow-hidden border bg-slate-100 shadow-sm flex flex-col">
                          <img src={item.data_url} alt="Gallery" className="w-full h-32 object-cover" />
                          <div className="p-2 bg-white flex-1 flex flex-col justify-between gap-1">
                            <input
                              type="text"
                              value={item.caption || ''}
                              placeholder={isUrdu ? 'کیپشن یا تقریب کا نام...' : 'Caption or event name...'}
                              onChange={(e) => {
                                const updated = [...tempGallery];
                                updated[idx].caption = e.target.value;
                                setTempGallery(updated);
                              }}
                              className="w-full text-[11px] p-1 border rounded"
                            />
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                              <span>Memory #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(isUrdu ? 'کیا آپ اس یادگار تصویر کو ڈیلیٹ کرنا چاہتے ہیں؟' : 'Delete this memory photo from gallery?')) {
                                    setTempGallery(tempGallery.filter((_, i) => i !== idx));
                                  }
                                }}
                                className="text-red-600 hover:text-red-700 font-semibold cursor-pointer inline-flex items-center gap-0.5"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>{isUrdu ? 'ڈیلیٹ' : 'Delete'}</span>
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(isUrdu ? 'کیا آپ اس یادگار تصویر کو ڈیلیٹ کرنا چاہتے ہیں؟' : 'Delete this memory photo from gallery?')) {
                                setTempGallery(tempGallery.filter((_, i) => i !== idx));
                              }
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs shadow-md transition-colors cursor-pointer"
                            title="Delete this memory photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Bank & Accounts CMS */}
              {cmsTab === 'bank' && (
                <div className="space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-[#16232F] border-b pb-2">
                    Official Donation Receiving Accounts
                  </h4>

                  <div className="p-4 rounded-xl bg-slate-50 border space-y-3">
                    <div className="font-bold text-xs text-[#AD7A28]">Meezan Bank Details</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Name</label>
                        <input
                          type="text"
                          value={tempSettings.bankName}
                          onChange={(e) => setTempSettings({ ...tempSettings, bankName: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Account Title</label>
                        <input
                          type="text"
                          value={tempSettings.bankTitle}
                          onChange={(e) => setTempSettings({ ...tempSettings, bankTitle: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Account #</label>
                        <input
                          type="text"
                          value={tempSettings.bankAccount}
                          onChange={(e) => setTempSettings({ ...tempSettings, bankAccount: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">IBAN</label>
                        <input
                          type="text"
                          value={tempSettings.bankIBAN}
                          onChange={(e) => setTempSettings({ ...tempSettings, bankIBAN: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border space-y-3">
                    <div className="font-bold text-xs text-emerald-800">Easypaisa & JazzCash</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Easypaisa Number</label>
                        <input
                          type="text"
                          value={tempSettings.epNumber}
                          onChange={(e) => setTempSettings({ ...tempSettings, epNumber: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Easypaisa Title</label>
                        <input
                          type="text"
                          value={tempSettings.epTitle}
                          onChange={(e) => setTempSettings({ ...tempSettings, epTitle: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">JazzCash Number</label>
                        <input
                          type="text"
                          value={tempSettings.jcNumber}
                          onChange={(e) => setTempSettings({ ...tempSettings, jcNumber: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">JazzCash Title</label>
                        <input
                          type="text"
                          value={tempSettings.jcTitle}
                          onChange={(e) => setTempSettings({ ...tempSettings, jcTitle: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact CMS */}
              {cmsTab === 'contact' && (
                <div className="space-y-6 max-w-4xl">
                  
                  {/* Header */}
                  <div className="border-b pb-3">
                    <h4 className="text-base font-bold text-[#16232F] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#AD7A28]" />
                      <span>Multiple Contact Channels & Office Details</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure multiple telephone numbers, WhatsApp helplines, branch addresses, email desks, and working hours with automated icon selection and bilingual support.
                    </p>
                  </div>

                  {/* Section 1: Multiple Contacts Manager with Automated Icons */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span className="font-bold text-sm text-[#16232F]">
                            Multiple Contacts Directory ({(tempSettings.multipleContacts || []).length})
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Automated icon recognition determines whether each entry is a phone, WhatsApp, email, office location, or hours based on value and type.
                        </p>
                      </div>

                      {/* Quick Add Presets Bar */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const current = tempSettings.multipleContacts || [];
                            setTempSettings({
                              ...tempSettings,
                              multipleContacts: [
                                ...current,
                                {
                                  id: `contact_${Date.now()}`,
                                  title: 'Helpline Number',
                                  titleUr: 'ہیلپ لائن نمبر',
                                  value: '+92 331 9051410',
                                  type: 'phone',
                                  note: 'Available 9 AM - 5 PM',
                                  noteUr: 'صبح 9 تا شام 5 بجے تک',
                                  isPrimary: current.length === 0
                                }
                              ]
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                        >
                          + Phone
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const current = tempSettings.multipleContacts || [];
                            setTempSettings({
                              ...tempSettings,
                              multipleContacts: [
                                ...current,
                                {
                                  id: `contact_${Date.now()}`,
                                  title: 'Official WhatsApp',
                                  titleUr: 'سرکاری واٹس ایپ رابطہ',
                                  value: '+92 331 9051410',
                                  type: 'whatsapp',
                                  note: 'Instant messaging & inquiries',
                                  noteUr: 'فوری پیغامات و معلومات',
                                  isPrimary: false
                                }
                              ]
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          + WhatsApp
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const current = tempSettings.multipleContacts || [];
                            setTempSettings({
                              ...tempSettings,
                              multipleContacts: [
                                ...current,
                                {
                                  id: `contact_${Date.now()}`,
                                  title: 'Inquiry Desk',
                                  titleUr: 'معلومات و رابطہ ای میل',
                                  value: 'info@arainbannu.org',
                                  type: 'email',
                                  note: 'Official correspondence',
                                  noteUr: 'سرکاری خط و کتابت',
                                  isPrimary: false
                                }
                              ]
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-300 text-blue-800 hover:bg-blue-100 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          + Email
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const current = tempSettings.multipleContacts || [];
                            setTempSettings({
                              ...tempSettings,
                              multipleContacts: [
                                ...current,
                                {
                                  id: `contact_${Date.now()}`,
                                  title: 'Central Secretariat',
                                  titleUr: 'مرکزی سیکرٹریٹ و دفتر',
                                  value: 'Arain House, Near DHQ Hospital Road, Bannu, KP',
                                  type: 'address',
                                  note: 'Main community secretariat',
                                  noteUr: 'مرکزی کمیونٹی سیکرٹریٹ',
                                  isPrimary: false
                                }
                              ]
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-300 text-purple-800 hover:bg-purple-100 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          + Location
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const current = tempSettings.multipleContacts || [];
                            setTempSettings({
                              ...tempSettings,
                              multipleContacts: [
                                ...current,
                                {
                                  id: `contact_${Date.now()}`,
                                  title: 'Secretariat Hours',
                                  titleUr: 'فتری اوقات کار',
                                  value: 'Monday to Saturday: 9:00 AM - 5:00 PM',
                                  type: 'hours',
                                  note: 'Sunday Closed / Emergency on call',
                                  noteUr: 'اتوار تعطیل / ایمرجنسی آن کال',
                                  isPrimary: false
                                }
                              ]
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          + Hours
                        </button>
                      </div>
                    </div>

                    {/* Contact items list */}
                    {(!tempSettings.multipleContacts || tempSettings.multipleContacts.length === 0) ? (
                      <div className="py-8 text-center bg-white rounded-xl border border-dashed border-slate-300 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                          <Phone className="w-5 h-5" />
                        </div>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                          No multiple contacts created yet. Click any preset button above or import from your single basic contact details below.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setTempSettings({
                              ...tempSettings,
                              multipleContacts: [
                                {
                                  id: 'c_phone_1',
                                  title: 'Helpline & Inquiries',
                                  titleUr: 'مرکزی رابطہ و معلومات',
                                  value: tempSettings.contactPhone || '+92 331 9051410',
                                  type: 'phone',
                                  note: 'Direct call assistance',
                                  noteUr: 'براہ راست رابطہ',
                                  isPrimary: true
                                },
                                {
                                  id: 'c_whatsapp_1',
                                  title: 'WhatsApp Official',
                                  titleUr: 'سرکاری واٹس ایپ',
                                  value: tempSettings.contactPhone || '+92 331 9051410',
                                  type: 'whatsapp',
                                  note: 'Fast chat support',
                                  noteUr: 'فوری میسج سروس',
                                  isPrimary: false
                                },
                                {
                                  id: 'c_email_1',
                                  title: 'Official Email',
                                  titleUr: 'سرکاری ای میل',
                                  value: tempSettings.contactEmail || 'contact@arainbannu.org',
                                  type: 'email',
                                  note: 'Membership & verified queries',
                                  noteUr: 'ممبرشپ اور عمومی سوالات',
                                  isPrimary: false
                                },
                                {
                                  id: 'c_address_1',
                                  title: 'Office Address',
                                  titleUr: 'مرکزی دفتر و پتہ',
                                  value: tempSettings.contactAddress || 'Near DHQ Hospital Road, Bannu, KP',
                                  type: 'address',
                                  note: 'Visitors welcome during office hours',
                                  noteUr: 'دفتری اوقات میں زائرین خوش آمدید',
                                  isPrimary: false
                                }
                              ]
                            });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16232F] text-white text-xs font-semibold hover:bg-[#25394C] transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Populate Default Multiple Contacts</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {tempSettings.multipleContacts.map((contact, idx) => {
                          const detectedType = resolveContactType(contact);
                          const theme = getContactTypeTheme(detectedType);

                          return (
                            <div
                              key={contact.id || idx}
                              className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3"
                            >
                              {/* Contact Row Header */}
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                                <div className="flex items-center gap-2.5">
                                  {/* Real-time automated icon badge */}
                                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${theme.iconBg} ${theme.badgeBg} ${theme.iconColor}`}>
                                    <ContactIconComponent type={detectedType} className="w-4 h-4" />
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-xs sm:text-sm text-[#16232F]">
                                        {(isUrdu ? (contact.titleUr || contact.title) : (contact.title || contact.titleUr)) || (isUrdu ? 'رابطہ چینل' : 'Contact Channel')}
                                      </span>
                                      {contact.isPrimary && (
                                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                          Primary
                                        </span>
                                      )}
                                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                                        Auto-detected: {detectedType}
                                      </span>
                                    </div>
                                    <div className="text-[11px] text-slate-500 font-mono truncate max-w-xs">
                                      {contact.value || 'No value entered'}
                                    </div>
                                  </div>
                                </div>

                                {/* Row Controls */}
                                <div className="flex items-center gap-1">
                                  {/* Move Up */}
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => {
                                      if (idx === 0) return;
                                      const list = [...(tempSettings.multipleContacts || [])];
                                      const temp = list[idx - 1];
                                      list[idx - 1] = list[idx];
                                      list[idx] = temp;
                                      setTempSettings({ ...tempSettings, multipleContacts: list });
                                    }}
                                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                                    title="Move Up"
                                  >
                                    <ArrowUp className="w-4 h-4" />
                                  </button>

                                  {/* Move Down */}
                                  <button
                                    type="button"
                                    disabled={idx === (tempSettings.multipleContacts || []).length - 1}
                                    onClick={() => {
                                      const list = [...(tempSettings.multipleContacts || [])];
                                      if (idx >= list.length - 1) return;
                                      const temp = list[idx + 1];
                                      list[idx + 1] = list[idx];
                                      list[idx] = temp;
                                      setTempSettings({ ...tempSettings, multipleContacts: list });
                                    }}
                                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                                    title="Move Down"
                                  >
                                    <ArrowDown className="w-4 h-4" />
                                  </button>

                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const list = (tempSettings.multipleContacts || []).filter((_, i) => i !== idx);
                                      setTempSettings({ ...tempSettings, multipleContacts: list });
                                    }}
                                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                    title="Delete Contact"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Form Inputs Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    {isUrdu ? 'رابطہ کا عنوان' : 'Channel Title'}
                                  </label>
                                  <input
                                    type="text"
                                    value={isUrdu ? (contact.titleUr || contact.title || '') : (contact.title || contact.titleUr || '')}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      const list = [...(tempSettings.multipleContacts || [])];
                                      if (isUrdu) {
                                        list[idx] = { ...list[idx], titleUr: val, title: (!list[idx].title || isUrduText(list[idx].title)) ? val : list[idx].title };
                                      } else {
                                        list[idx] = { ...list[idx], title: val, titleUr: (!list[idx].titleUr || !isUrduText(list[idx].titleUr)) ? val : list[idx].titleUr };
                                      }
                                      setTempSettings({ ...tempSettings, multipleContacts: list });
                                    }}
                                    className="w-full text-xs bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-[#AD7A28] focus:border-[#AD7A28]"
                                    placeholder={isUrdu ? 'مثال: سیکرٹریٹ ہیلپ لائن یا Secretariat Helpline' : 'e.g. Secretariat Helpline'}
                                    dir={isUrdu ? 'rtl' : 'ltr'}
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    {isUrdu ? 'چینل کی قسم و خودکار آئیکون' : 'Channel Type & Automated Icon'}
                                  </label>
                                  <select
                                    value={contact.type || ''}
                                    onChange={(e) => {
                                      const list = [...(tempSettings.multipleContacts || [])];
                                      list[idx] = { ...list[idx], type: e.target.value as any };
                                      setTempSettings({ ...tempSettings, multipleContacts: list });
                                    }}
                                    className="w-full text-xs bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold"
                                  >
                                    <option value="">{isUrdu ? 'خودکار تشخیص (Automated Icons)' : 'Auto-Detect (Automated Icons)'}</option>
                                    <option value="phone">📞 Phone / Telephone</option>
                                    <option value="whatsapp">💬 WhatsApp Helpline</option>
                                    <option value="email">✉️ Official Email</option>
                                    <option value="address">📍 Physical Address / Secretariat</option>
                                    <option value="hours">🕒 Office Hours / Availability</option>
                                    <option value="link">🌐 Web Portal / Custom Link</option>
                                  </select>
                                </div>

                                <div className="flex items-center pt-4">
                                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(contact.isPrimary)}
                                      onChange={(e) => {
                                        const list = [...(tempSettings.multipleContacts || [])];
                                        list[idx] = { ...list[idx], isPrimary: e.target.checked };
                                        setTempSettings({ ...tempSettings, multipleContacts: list });
                                      }}
                                      className="rounded text-[#AD7A28] focus:ring-[#AD7A28]"
                                    />
                                    <span className="font-semibold">{isUrdu ? 'مرکزی چینل قرار دیں' : 'Mark as Primary Channel'}</span>
                                  </label>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    {isUrdu ? 'رابطہ کی تفصیل (فون، ای میل، پتہ، لنک)' : 'Contact Value (Phone, Email, Address, or URL)'}
                                  </label>
                                  <input
                                    type="text"
                                    value={contact.value}
                                    onChange={(e) => {
                                      const list = [...(tempSettings.multipleContacts || [])];
                                      list[idx] = { ...list[idx], value: e.target.value };
                                      setTempSettings({ ...tempSettings, multipleContacts: list });
                                    }}
                                    className="w-full text-xs bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono"
                                    placeholder="e.g. +92 331 9051410 or info@arainbannu.org or Bannu, KP"
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    {isUrdu ? 'اوقات کار / اضافی نوٹ' : 'Timing / Availability Note'}
                                  </label>
                                  <input
                                    type="text"
                                    value={isUrdu ? (contact.noteUr || contact.note || '') : (contact.note || contact.noteUr || '')}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      const list = [...(tempSettings.multipleContacts || [])];
                                      if (isUrdu) {
                                        list[idx] = { ...list[idx], noteUr: val, note: (!list[idx].note || isUrduText(list[idx].note)) ? val : list[idx].note };
                                      } else {
                                        list[idx] = { ...list[idx], note: val, noteUr: (!list[idx].noteUr || !isUrduText(list[idx].noteUr)) ? val : list[idx].noteUr };
                                      }
                                      setTempSettings({ ...tempSettings, multipleContacts: list });
                                    }}
                                    className="w-full text-xs bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-[#AD7A28] focus:border-[#AD7A28]"
                                    placeholder={isUrdu ? 'مثال: پیر تا ہفتہ: صبح 9 تا شام 5 بجے یا Mon - Sat: 9 AM - 5 PM' : 'e.g. Mon - Sat: 9 AM - 5 PM'}
                                    dir={isUrdu ? 'rtl' : 'ltr'}
                                  />
                                </div>

                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Section 2: General & Social Fallbacks */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                    <h5 className="font-bold text-sm text-[#16232F] border-b pb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span>General Secretariat Contact & Social Links (Fallback)</span>
                    </h5>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Main Secretariat Address</label>
                      <input
                        type="text"
                        value={tempSettings.contactAddress}
                        onChange={(e) => setTempSettings({ ...tempSettings, contactAddress: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Standard Office Hours</label>
                      <input
                        type="text"
                        value={tempSettings.contactHours}
                        onChange={(e) => setTempSettings({ ...tempSettings, contactHours: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                        <input
                          type="text"
                          value={tempSettings.contactPhone}
                          onChange={(e) => setTempSettings({ ...tempSettings, contactPhone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                        <input
                          type="email"
                          value={tempSettings.contactEmail}
                          onChange={(e) => setTempSettings({ ...tempSettings, contactEmail: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook Page / Community URL</label>
                        <input
                          type="text"
                          value={tempSettings.socialFacebook || ''}
                          onChange={(e) => setTempSettings({ ...tempSettings, socialFacebook: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Group / Community Link</label>
                        <input
                          type="text"
                          value={tempSettings.socialWhatsapp || ''}
                          onChange={(e) => setTempSettings({ ...tempSettings, socialWhatsapp: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border text-sm"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* Membership Card Studio Modal */}
      {selectedRegForCard && (
        <MembershipCardModal
          registration={selectedRegForCard}
          onClose={() => setSelectedRegForCard(null)}
        />
      )}

      {/* Full Member Dossier Viewer */}
      {viewingRegDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#16232F]">
                Application Dossier
              </h3>
              <button onClick={() => setViewingRegDetails(null)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {viewingRegDetails.photoData ? (
                <img src={viewingRegDetails.photoData} alt="Applicant" className="w-16 h-20 rounded-lg object-cover border" />
              ) : (
                <div className="w-16 h-20 rounded-lg bg-slate-200 flex items-center justify-center font-bold text-slate-400">
                  Photo
                </div>
              )}
              <div>
                <h4 className="font-bold text-base text-[#16232F]">
                  {isUrdu ? (viewingRegDetails.fullNameUr || viewingRegDetails.fullName) : (viewingRegDetails.fullNameEn || viewingRegDetails.fullName)}
                </h4>
                <p className="text-xs text-slate-500">
                  {isUrdu ? 'نام انگریزی میں:' : 'Urdu Name:'} <span className="font-medium text-slate-700">{isUrdu ? (viewingRegDetails.fullNameEn || viewingRegDetails.fullName) : (viewingRegDetails.fullNameUr || viewingRegDetails.fullName)}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {isUrdu ? 'ولدیت:' : 'Father:'} <span className="font-medium text-slate-700">{isUrdu ? (viewingRegDetails.fatherNameUr || viewingRegDetails.fatherName) : (viewingRegDetails.fatherNameEn || viewingRegDetails.fatherName)}</span>
                </p>
                <p className="text-xs text-slate-500">CNIC: <span className="font-mono">{viewingRegDetails.cnic || '—'}</span></p>
                <p className="text-xs text-[#AD7A28] font-semibold">
                  {isUrdu ? (viewingRegDetails.membershipTypeUr || viewingRegDetails.membershipType) : (viewingRegDetails.membershipTypeEn || viewingRegDetails.membershipType)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl">
              <div><strong>{isUrdu ? "قومیت / قبیلہ:" : "Caste:"}</strong> <span className="font-semibold text-[#AD7A28]">{isUrdu ? (viewingRegDetails.casteUr || viewingRegDetails.caste || "آرائیں") : (viewingRegDetails.casteEn || viewingRegDetails.caste || "Araain")}</span></div>
              <div><strong>WhatsApp:</strong> <span className="font-mono">{viewingRegDetails.whatsapp}</span></div>
              <div><strong>Email:</strong> {viewingRegDetails.email || '—'}</div>
              <div><strong>{isUrdu ? 'جنس:' : 'Gender:'}</strong> {isUrdu ? (viewingRegDetails.genderUr || viewingRegDetails.gender) : (viewingRegDetails.genderEn || viewingRegDetails.gender)}</div>
              <div><strong>{isUrdu ? 'تعلیم:' : 'Education:'}</strong> {isUrdu ? (viewingRegDetails.educationUr || viewingRegDetails.education) : (viewingRegDetails.educationEn || viewingRegDetails.education)}</div>
              <div><strong>{isUrdu ? 'پیشہ / کام:' : 'Work:'}</strong> {isUrdu ? (viewingRegDetails.workUr || viewingRegDetails.work) : (viewingRegDetails.workEn || viewingRegDetails.work)}</div>
              <div><strong>{isUrdu ? 'رہائش:' : 'Residential:'}</strong> {isUrdu ? (viewingRegDetails.residentialStatusUr || viewingRegDetails.residentialStatus) : (viewingRegDetails.residentialStatusEn || viewingRegDetails.residentialStatus)}</div>
              <div><strong>{isUrdu ? 'شہر / ملک:' : 'City / Country:'}</strong> {isUrdu ? `${viewingRegDetails.cityUr || viewingRegDetails.city}، ${viewingRegDetails.countryUr || viewingRegDetails.country}` : `${viewingRegDetails.cityEn || viewingRegDetails.city}, ${viewingRegDetails.countryEn || viewingRegDetails.country}`}</div>
              <div className="col-span-2"><strong>{isUrdu ? 'پتہ:' : 'Address:'}</strong> {isUrdu ? (viewingRegDetails.streetUr || viewingRegDetails.street || '—') : (viewingRegDetails.streetEn || viewingRegDetails.street || '—')}</div>
              <div className="col-span-2"><strong>{isUrdu ? 'منسلک تنظیم:' : 'Affiliated Org:'}</strong> {viewingRegDetails.affiliated || (isUrdu ? 'کوئی نہیں' : 'None')}</div>
              <div className="col-span-2"><strong>{isUrdu ? 'شمولیت کا مقصد:' : 'Reason for joining:'}</strong> {viewingRegDetails.reason || (isUrdu ? 'کمیونٹی فلاح و بہبود' : 'Community Welfare')}</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  const r = viewingRegDetails;
                  setViewingRegDetails(null);
                  setSelectedRegForCard(r);
                }}
                className="px-4 py-2 rounded-xl bg-[#AD7A28] text-white text-xs font-semibold cursor-pointer"
              >
                Generate ID Card
              </button>
              <button
                onClick={() => setViewingRegDetails(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Donation Proof Slip Viewer */}
      {viewingDonationProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-[#16232F]">
                  Donation Slip — {viewingDonationProof.donorName}
                </h3>
                <span className="text-xs text-[#AD7A28] font-bold">
                  Amount: PKR {viewingDonationProof.amount}
                </span>
              </div>
              <button onClick={() => setViewingDonationProof(null)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {viewingDonationProof.photoData && (
              <div className="max-h-[60vh] overflow-y-auto flex items-center justify-center bg-slate-100 rounded-xl p-2">
                <img
                  src={viewingDonationProof.photoData}
                  alt="Proof Slip"
                  className="max-h-[55vh] object-contain rounded-lg"
                />
              </div>
            )}

            <div className="text-xs text-slate-600">
              <div>Method: <strong>{viewingDonationProof.method}</strong></div>
              <div>Transaction ID: <strong>{viewingDonationProof.txId || 'N/A'}</strong></div>
              {viewingDonationProof.note && <div>Note: {viewingDonationProof.note}</div>}
            </div>

            <button
              onClick={() => setViewingDonationProof(null)}
              className="w-full py-2 rounded-xl bg-[#16232F] text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Official Membership ID Card Modal */}
      {selectedRegForCard && (
        <MembershipCardModal
          registration={selectedRegForCard}
          onClose={() => setSelectedRegForCard(null)}
        />
      )}

    </div>
  );
};
