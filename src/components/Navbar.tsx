import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { 
  Heart, 
  UserPlus, 
  Menu, 
  SlidersHorizontal,
  Globe 
} from 'lucide-react';

interface NavbarProps {
  onOpenMembership: () => void;
  onOpenDonation: () => void;
  onNavigateSection: (id: string) => void;
  onOpenSidebar: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMembership,
  onOpenDonation,
  onNavigateSection,
  onOpenSidebar,
  onOpenAdmin,
}) => {
  const { lang, t, isUrdu, tSetting } = useLanguage();
  const { settings } = useData();
  const [isScrolled, setIsScrolled] = useState(false);

  // Hidden multi-tap trigger on Brand Logo:
  // 5 rapid taps/clicks within 2.5s unlocks the admin sign-in modal.
  // Works identically on Android touch and Desktop mouse clicks.
  const logoTapCountRef = useRef(0);
  const logoTapTimerRef = useRef<number | null>(null);

  const handleBrandClick = () => {
    handleLinkClick('hero');

    if (onOpenAdmin) {
      logoTapCountRef.current += 1;
      if (logoTapTimerRef.current) {
        window.clearTimeout(logoTapTimerRef.current);
      }
      if (logoTapCountRef.current >= 5) {
        logoTapCountRef.current = 0;
        onOpenAdmin();
        return;
      }
      logoTapTimerRef.current = window.setTimeout(() => {
        logoTapCountRef.current = 0;
      }, 2500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t('navHome', 'Home') },
    { id: 'about', label: t('navAbout', 'About Us') },
    { id: 'programs', label: t('navPrograms', 'Programs') },
    { id: 'leadership', label: t('navLeadership', 'Leadership') },
    { id: 'events', label: t('navEvents', 'Events') },
    { id: 'gallery', label: t('navGallery', 'Gallery') },
    { id: 'contact', label: t('navContact', 'Contact') },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#16232F]/95 backdrop-blur-md shadow-md py-3 border-b border-[#AD7A28]/20 text-white' 
          : 'bg-[#16232F] py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name (5 rapid taps/clicks triggers admin modal) */}
          <button 
            id="nav-brand-logo"
            onClick={handleBrandClick}
            className="flex items-center gap-3 group text-left rtl:text-right cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
            aria-label="Araain Bannu Home"
          >
            {settings.logoData ? (
              <img 
                src={settings.logoData} 
                alt="Logo" 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#AD7A28] shadow-sm" 
              />
            ) : (
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#AD7A28] to-[#7D5515] flex items-center justify-center text-white font-black text-sm tracking-wider shadow-sm border border-[#AD7A28]/40">
                {isUrdu ? 'آ ب' : 'AB'}
              </div>
            )}
            <div className="flex flex-col justify-center min-w-0 text-start">
              <div className="text-base sm:text-lg font-bold ltr:tracking-tight rtl:tracking-normal text-white ltr:leading-tight rtl:leading-normal flex items-center gap-1.5 rtl:gap-2">
                <span className="truncate">{tSetting('siteName', settings)}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#AD7A28] shrink-0"></span>
              </div>
              <div className="text-[11px] sm:text-xs text-amber-200/90 font-medium ltr:tracking-wide rtl:tracking-normal mt-0.5 sm:mt-1 ltr:leading-tight rtl:leading-relaxed truncate">
                {tSetting('siteSubName', settings)}
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className="px-3 py-2 rounded-lg text-[13px] xl:text-[14px] font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Controls & Sidebar Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Donate CTA */}
            <button
              id="btn-nav-donate"
              onClick={onOpenDonation}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#AD7A28] hover:bg-[#96681E] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-amber-200" />
              <span>{t('navDonate', 'Donate')}</span>
            </button>

            {/* Quick Apply CTA */}
            <button
              id="btn-nav-membership"
              onClick={onOpenMembership}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t('navApply', 'Join Us')}</span>
            </button>

            {/* ═══════════════════════════════════════════════════════════════════
                SIDEBAR BUTTON (CLEAN MENU & LANGUAGE SWITCHER)
               ═══════════════════════════════════════════════════════════════════ */}
            <button
              id="btn-open-sidebar"
              onClick={onOpenSidebar}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-[#AD7A28]/40 hover:border-[#AD7A28] text-amber-200 hover:text-white transition-all duration-200 shadow-sm cursor-pointer group"
              title={isUrdu ? 'مینو اور زبان کی ترتیبات' : 'Menu & Language Settings'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold tracking-wide hidden sm:inline">
                {isUrdu ? 'سائیڈ بار' : 'Menu'}
              </span>
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300/80" />
            </button>

            {/* Mobile Sidebar / Hamburger Trigger */}
            <button
              id="btn-mobile-sidebar-toggle"
              onClick={onOpenSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Toggle Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
