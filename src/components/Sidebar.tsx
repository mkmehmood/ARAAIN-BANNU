import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { 
  X, 
  Globe, 
  Heart, 
  UserPlus, 
  Home, 
  Info, 
  Layers, 
  Users, 
  Calendar, 
  Image as ImageIcon, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMembership: () => void;
  onOpenDonation: () => void;
  onNavigateSection: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onOpenMembership,
  onOpenDonation,
  onNavigateSection,
}) => {
  const { lang, setLanguage, t, isUrdu, tSetting } = useLanguage();
  const { settings } = useData();

  if (!isOpen) return null;

  const navLinks = [
    { id: 'hero', label: t('navHome', 'Home'), icon: Home },
    { id: 'about', label: t('navAbout', 'About Us'), icon: Info },
    { id: 'programs', label: t('navPrograms', 'Programs'), icon: Layers },
    { id: 'leadership', label: t('navLeadership', 'Leadership'), icon: Users },
    { id: 'events', label: t('navEvents', 'Events'), icon: Calendar },
    { id: 'gallery', label: t('navGallery', 'Gallery'), icon: ImageIcon },
    { id: 'contact', label: t('navContact', 'Contact'), icon: Mail },
  ];

  const handleLink = (id: string) => {
    onClose();
    onNavigateSection(id);
  };

  const ArrowIcon = isUrdu ? ChevronLeft : ChevronRight;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Sidebar Panel (Slides in from Right in RTL or Left/Right) */}
      <div 
        className={`absolute inset-y-0 ${isUrdu ? 'left-0' : 'right-0'} max-w-sm sm:max-w-md w-full bg-[#121D27] text-white shadow-2xl flex flex-col border-l border-[#AD7A28]/25 z-10`}
      >
        {/* Sidebar Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#16232F]">
          <div className="flex items-center gap-3">
            {settings.logoData ? (
              <img 
                src={settings.logoData} 
                alt="Logo" 
                className="w-10 h-10 rounded-full object-cover border-2 border-[#AD7A28]" 
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#AD7A28] to-[#7D5515] flex items-center justify-center text-white font-bold text-sm">
                {isUrdu ? 'آ ب' : 'AB'}
              </div>
            )}
            <div className="flex flex-col justify-center min-w-0 text-start">
              <div className="font-bold text-sm sm:text-base text-white ltr:leading-tight rtl:leading-normal ltr:tracking-tight rtl:tracking-normal truncate">
                {tSetting('siteName', settings)}
              </div>
              <div className="text-[11px] text-amber-200/90 font-medium ltr:tracking-wide rtl:tracking-normal mt-0.5 sm:mt-1 ltr:leading-tight rtl:leading-relaxed truncate">
                {tSetting('siteSubName', settings)}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Sidebar Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">

          {/* ══════════════════════════════════════════════════════════
              SECTION 1: TRANSLATIONS / LANGUAGE SWITCHER (MOVED HERE)
             ══════════════════════════════════════════════════════════ */}
          <div className="bg-[#182634] rounded-2xl p-4 border border-white/10 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-200 uppercase tracking-wider">
                <Globe className="w-4 h-4 text-[#F5CA7B]" />
                <span>{isUrdu ? 'زبان کا انتخاب / ترجمہ' : 'Language / Translations'}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                {lang === 'ur' ? 'اردو فعال' : 'English Active'}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
              {isUrdu 
                ? 'پوری ویب سائٹ کا مواد فوری طور پر اردو یا انگریزی میں تبدیل کریں:' 
                : 'Switch entire website copy instantly between Urdu and English:'}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`py-2.5 px-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#AD7A28] text-white shadow-md ring-2 ring-[#F5CA7B]/50'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>English</span>
                {lang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>

              <button
                onClick={() => setLanguage('ur')}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer font-urdu ${
                  lang === 'ur'
                    ? 'bg-[#AD7A28] text-white shadow-md ring-2 ring-[#F5CA7B]/50'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>اردو (پاکستان)</span>
                {lang === 'ur' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            </div>
          </div>


          {/* ══════════════════════════════════════════════════════════
              SECTION 2: QUICK ACTIONS (DONATE & MEMBERSHIP)
             ══════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenDonation();
              }}
              className="py-2.5 px-3 rounded-xl bg-[#AD7A28] hover:bg-[#96681E] text-white text-xs font-bold shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-amber-200" />
              <span>{t('navDonate', 'Donate')}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenMembership();
              }}
              className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t('navApply', 'Membership')}</span>
            </button>
          </div>


          {/* ══════════════════════════════════════════════════════════
              SECTION 3: NAVIGATION LINKS
             ══════════════════════════════════════════════════════════ */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              {isUrdu ? 'ویب سائٹ کے اہم صفحات' : 'Navigation Links'}
            </div>
            <div className="space-y-1">
              {navLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLink(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-xs sm:text-sm font-medium cursor-pointer text-left rtl:text-right"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4 text-amber-400/80" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowIcon className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                );
              })}
            </div>
          </div>


          {/* ══════════════════════════════════════════════════════════
              SECTION 4: CONTACT & OFFICIAL INFORMATION
             ══════════════════════════════════════════════════════════ */}
          <div className="p-3.5 rounded-xl bg-black/25 border border-white/5 text-[11px] space-y-2 text-slate-400">
            <div className="font-semibold text-slate-300 text-xs mb-1">
              {isUrdu ? 'رابطہ کی تفصیلات' : 'Contact Information'}
            </div>

            <div className="space-y-1.5 text-[10px]">
              {settings.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono text-slate-300">{settings.contactEmail}</span>
                </div>
              )}
              {settings.contactPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono text-slate-300">{settings.contactPhone}</span>
                </div>
              )}
              {settings.contactAddress && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-slate-300">{settings.contactAddress}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 text-center text-[10px] text-slate-500 bg-[#0E1720]">
          © {new Date().getFullYear()} {tSetting('siteName', settings)} • Bannu KPK
        </div>

      </div>
    </div>
  );
};
