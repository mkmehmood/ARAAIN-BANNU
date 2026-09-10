import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { 
  X, 
  Globe, 
  Shield, 
  ShieldCheck, 
  LogOut, 
  Heart, 
  UserPlus, 
  Home, 
  Info, 
  Layers, 
  Users, 
  Calendar, 
  Image as ImageIcon, 
  Mail, 
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMembership: () => void;
  onOpenDonation: () => void;
  onOpenAdmin: () => void;
  onNavigateSection: (id: string) => void;
  isAdminLoggedIn: boolean;
  isInAdminMode: boolean;
  onToggleAdminMode: () => void;
  onLogout?: () => void;
  adminEmail?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onOpenMembership,
  onOpenDonation,
  onOpenAdmin,
  onNavigateSection,
  isAdminLoggedIn,
  isInAdminMode,
  onToggleAdminMode,
  onLogout,
  adminEmail,
}) => {
  const { lang, setLanguage, t, isUrdu, tSetting } = useLanguage();
  const { settings, isCloudConnected } = useData();

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
            <div>
              <div className="font-bold text-sm sm:text-base leading-tight">
                {tSetting('siteName', settings)}
              </div>
              <div className="text-[11px] text-amber-200/80">
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
              SECTION 2: ADMINISTRATOR PORTAL (MOVED HERE)
             ══════════════════════════════════════════════════════════ */}
          <div className="bg-[#182634] rounded-2xl p-4 border border-amber-500/20 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>{isUrdu ? 'ایڈمنسٹریٹر پورٹل' : 'Administrator Portal'}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 font-semibold">
                {isAdminLoggedIn ? (isUrdu ? 'لاگ ان شدہ' : 'Authorized') : (isUrdu ? 'محفوظ' : 'Secured')}
              </span>
            </div>

            {isAdminLoggedIn ? (
              <div className="space-y-3">
                <div className="p-2.5 rounded-xl bg-black/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-emerald-300 text-[11px]">
                        {isUrdu ? 'ایڈمن لاگ ان ہے' : 'Admin Signed In'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {adminEmail || '3tahirmeer@gmail.com'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onToggleAdminMode();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#AD7A28] hover:bg-[#96681E] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <span>{isInAdminMode ? (isUrdu ? 'پبلک سائٹ دیکھیں' : 'Exit Admin') : (isUrdu ? 'ایڈمن ڈیش بورڈ کھولیں' : 'Open Admin Panel')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {onLogout && (
                    <button
                      onClick={() => {
                        onClose();
                        onLogout();
                      }}
                      className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-colors cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                  {isUrdu 
                    ? 'مجاز مرکزی ایڈمنسٹریٹر (3tahirmeer@gmail.com) کے لیے محفوظ پینل:' 
                    : 'Authorized central administrator sign-in to manage content, memberships, and cards:'}
                </p>

                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#AD7A28] to-[#96681E] hover:from-[#96681E] hover:to-[#7D5515] text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-200" />
                  <span>{isUrdu ? 'ایڈمن لاگ ان کریں' : 'Sign In as Administrator'}</span>
                </button>
              </div>
            )}
          </div>


          {/* ══════════════════════════════════════════════════════════
              SECTION 3: QUICK ACTIONS (DONATE & MEMBERSHIP)
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
              SECTION 4: NAVIGATION LINKS
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
              SECTION 5: LIVE CLOUD CONNECTION STATUS & CONTACT
             ══════════════════════════════════════════════════════════ */}
          <div className="p-3.5 rounded-xl bg-black/25 border border-white/5 text-[11px] space-y-2 text-slate-400">
            <div className="flex items-center justify-between">
              <span>{isUrdu ? 'ڈیٹا بیس کنکشن:' : 'Firestore Database:'}</span>
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isCloudConnected ? (isUrdu ? 'کلاؤڈ آن لائن' : 'Cloud Online') : 'Connecting...'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-1 text-[10px]">
              <div>
                <span className="text-slate-500">{isUrdu ? 'ای میل:' : 'Email:'} </span>
                <span className="font-mono text-slate-300">{settings.contactEmail || '3tahirmeer@gmail.com'}</span>
              </div>
              <div>
                <span className="text-slate-500">{isUrdu ? 'فون:' : 'Phone:'} </span>
                <span className="font-mono text-slate-300">{settings.contactPhone || '+92 300 0000000'}</span>
              </div>
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
