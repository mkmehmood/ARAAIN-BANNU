import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Sparkles, ArrowRight, X, Megaphone, CheckCircle2 } from 'lucide-react';
import { isUrduText, translateEnglishToUrdu, translateUrduToEnglish } from '../utils/urduTransliterator';

interface AnnouncementBarProps {
  onOpenMembership: () => void;
  onOpenDonation: () => void;
  onNavigateSection: (id: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onOpenMembership,
  onOpenDonation,
  onNavigateSection,
}) => {
  const { isUrdu, t } = useLanguage();
  const { settings } = useData();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!settings.announcementEnabled || isDismissed) {
    return null;
  }

  // Pure language isolation: Urdu only in Urdu mode, English only in English mode
  let badgeText = '';
  if (isUrdu) {
    if (settings.announcementBadgeUr && isUrduText(settings.announcementBadgeUr)) {
      badgeText = settings.announcementBadgeUr;
    } else if (settings.announcementBadge && isUrduText(settings.announcementBadge)) {
      badgeText = settings.announcementBadge;
    } else if (settings.announcementBadge) {
      badgeText = translateEnglishToUrdu(settings.announcementBadge);
    } else {
      badgeText = 'اہم اطلاع';
    }
  } else {
    if (settings.announcementBadge && !isUrduText(settings.announcementBadge)) {
      badgeText = settings.announcementBadge;
    } else if (settings.announcementBadgeUr && !isUrduText(settings.announcementBadgeUr)) {
      badgeText = settings.announcementBadgeUr;
    } else if (settings.announcementBadge || settings.announcementBadgeUr) {
      badgeText = translateUrduToEnglish(settings.announcementBadge || settings.announcementBadgeUr || '');
    } else {
      badgeText = 'Announcement';
    }
  }

  let messageText = '';
  if (isUrdu) {
    if (settings.announcementTextUr && isUrduText(settings.announcementTextUr)) {
      messageText = settings.announcementTextUr;
    } else if (settings.announcementText && isUrduText(settings.announcementText)) {
      messageText = settings.announcementText;
    } else if (settings.announcementText) {
      messageText = translateEnglishToUrdu(settings.announcementText);
    } else {
      messageText = 'آرائیں بنوں کی ممبرشپ مہم 2025 جاری ہے۔ اپنا کارڈ بنوائیں۔';
    }
  } else {
    if (settings.announcementText && !isUrduText(settings.announcementText)) {
      messageText = settings.announcementText;
    } else if (settings.announcementTextEn && !isUrduText(settings.announcementTextEn)) {
      messageText = settings.announcementTextEn;
    } else if (settings.announcementTextUr && !isUrduText(settings.announcementTextUr)) {
      messageText = settings.announcementTextUr;
    } else if (settings.announcementText || settings.announcementTextUr) {
      messageText = translateUrduToEnglish(settings.announcementText || settings.announcementTextUr || '');
    } else {
      messageText = 'Araain Bannu Membership Drive 2025 is live. Register now.';
    }
  }
  
  let linkText = '';
  if (isUrdu) {
    if (settings.announcementLinkText && isUrduText(settings.announcementLinkText)) {
      linkText = settings.announcementLinkText;
    } else {
      linkText = 'رکنیت حاصل کریں';
    }
  } else {
    if (settings.announcementLinkText && !isUrduText(settings.announcementLinkText)) {
      linkText = settings.announcementLinkText;
    } else {
      linkText = 'Join Us';
    }
  }
  const action = settings.announcementAction || 'membership';

  const handleActionClick = () => {
    if (action === 'membership') {
      onOpenMembership();
    } else if (action === 'donation') {
      onOpenDonation();
    } else if (action === 'events') {
      onNavigateSection('events');
    } else if (action === 'contact') {
      onNavigateSection('contact');
    } else {
      onOpenMembership();
    }
  };

  return (
    <div 
      id="public-announcement-bar"
      className="bg-gradient-to-r from-[#121D27] via-[#1E3040] to-[#121D27] text-white border-b border-[#AD7A28]/40 py-2 px-3 sm:px-6 relative z-50 shadow-sm transition-all animate-fadeIn"
      style={{
        borderBottomColor: settings.websiteThemeAccent ? `${settings.websiteThemeAccent}66` : undefined
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left rtl:sm:text-right">
        
        {/* Left / Center: Badge & Message */}
        <div className="flex items-center flex-wrap justify-center sm:justify-start gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#AD7A28] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wide shadow-xs shrink-0">
            <Megaphone className="w-3 h-3 animate-bounce" />
            <span>{badgeText}</span>
          </span>

          <p className="text-xs sm:text-[13px] text-slate-200 font-medium leading-tight truncate max-w-xl sm:max-w-2xl">
            {messageText}
          </p>
        </div>

        {/* Right: CTA & Dismiss Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleActionClick}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-[#AD7A28] border border-white/20 hover:border-[#AD7A28] text-[#F5CA7B] hover:text-white text-[11px] sm:text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>{linkText}</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss Announcement"
            title={isUrdu ? 'بند کریں' : 'Dismiss'}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
