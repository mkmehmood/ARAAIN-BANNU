import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Shield, Sparkles, Calendar, ArrowRight, UserPlus, Heart, Award } from 'lucide-react';

interface HeroProps {
  onOpenMembership: () => void;
  onOpenDonation: () => void;
  onNavigateSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenMembership,
  onOpenDonation,
  onNavigateSection,
}) => {
  const { t, isUrdu, tSetting } = useLanguage();
  const { settings } = useData();

  return (
    <section 
      id="hero"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-16 bg-[#16232F] text-white overflow-hidden"
    >
      {/* Background Decorative Pattern & Gradients */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#AD7A28] blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-600 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#AD7A28_1px,transparent_1px)] [background-size:28px_28px] opacity-20"></div>
      </div>

      {/* Watermark Emblem */}
      {settings.heroImage ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <img 
            src={settings.heroImage} 
            alt="Watermark" 
            className="w-96 h-96 max-w-full object-contain filter grayscale"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <Shield className="w-[500px] h-[500px] text-white stroke-[0.5]" />
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AD7A28]/20 border border-[#AD7A28]/40 text-[#F5CA7B] text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{tSetting('heroBadge', settings)}</span>
        </div>

        {/* Main Title (Header) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-5 sm:mb-7 ltr:tracking-tight rtl:tracking-normal ltr:leading-[1.15] rtl:leading-[1.45] sm:rtl:leading-[1.55]">
          <span className="bg-gradient-to-r from-white via-slate-100 to-amber-100 bg-clip-text text-transparent inline-block pb-2">
            {tSetting('heroTitle', settings)}
          </span>
        </h1>

        {/* Subtitle (Sub-header) */}
        <p className="text-lg sm:text-2xl font-semibold text-amber-200/90 mb-5 sm:mb-6 max-w-3xl mx-auto ltr:tracking-wide rtl:tracking-normal ltr:leading-snug rtl:leading-[1.85]">
          {tSetting('heroSub', settings)}
        </p>

        {/* Detailed Tagline */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 mb-10 max-w-2xl mx-auto ltr:leading-relaxed rtl:leading-[2.0] font-normal ltr:tracking-normal rtl:tracking-normal">
          {tSetting('heroTagline', settings)}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14">
          
          <button
            id="hero-btn-membership"
            onClick={onOpenMembership}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#AD7A28] to-[#8C601A] hover:from-[#C89238] hover:to-[#9F6E20] text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-950/40 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t('btnBecomeMember', 'Become a Member')}</span>
          </button>

          <button
            id="hero-btn-donate"
            onClick={onOpenDonation}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-amber-300 fill-current" />
            <span>{t('navDonate', 'Donate & Support')}</span>
          </button>

          <button
            id="hero-btn-events"
            onClick={() => onNavigateSection('events')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-slate-300 hover:text-white font-medium text-sm sm:text-base hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{t('btnEvents', 'Upcoming Events')}</span>
          </button>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto pt-8 border-t border-white/10">
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#F5CA7B]">
              {tSetting('statMembers', settings)}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
              {t('statMembersLabel', 'Active Members')}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#F5CA7B]">
              {tSetting('statPrograms', settings)}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
              {t('statProgramsLabel', 'Flagship Programs')}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#F5CA7B]">
              {tSetting('statCities', settings)}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
              {t('statCitiesLabel', 'Connected Cities')}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
