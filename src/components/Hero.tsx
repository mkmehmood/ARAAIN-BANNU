import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { 
  Shield, 
  Sparkles, 
  Calendar, 
  UserPlus, 
  Heart, 
  Megaphone, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play,
  Image as ImageIcon
} from 'lucide-react';

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

  // Resolve single or multiple pictures
  const heroImages = useMemo(() => {
    const list: string[] = [];
    if (Array.isArray(settings.heroImages) && settings.heroImages.length > 0) {
      list.push(...settings.heroImages.filter(Boolean));
    } else if (settings.heroImage) {
      list.push(settings.heroImage);
    }
    
    // Fallback dignified community images if none specified
    if (list.length === 0) {
      list.push(
        "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1920&q=80"
      );
    }
    return list;
  }, [settings.heroImages, settings.heroImage]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideDurationSec = Math.max(3, settings.heroSlideDuration || 5);
  const isMultiple = heroImages.length > 1;

  // Animated Timing Slideshow Interval
  useEffect(() => {
    if (!isMultiple || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, slideDurationSec * 1000);

    return () => clearInterval(timer);
  }, [heroImages.length, isMultiple, isPaused, slideDurationSec]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section 
      id="hero"
      className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center pt-24 pb-16 bg-[#16232F] text-white overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ═══ ANIMATED BACKGROUND PICTURES (Single or Multiple with Animated.timing) ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {heroImages.map((imgUrl, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={`${imgUrl}-${idx}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-1' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Hero background ${idx + 1}`}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Cinematic Multi-layer Scrim Overlays for Pristine Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#16232F]/90 via-[#16232F]/75 to-[#16232F]/95 z-2" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#16232F]/60 to-[#16232F] z-2" />
        
        {/* Subtle Brand Ambient Glows */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#AD7A28]/25 blur-3xl pointer-events-none z-2"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none z-2"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AD7A28]/20 border border-[#AD7A28]/40 text-[#F5CA7B] text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{tSetting('heroBadge', settings)}</span>
        </div>

        {/* Main Title (Header) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-5 sm:mb-7 ltr:tracking-tight rtl:tracking-normal ltr:leading-[1.15] rtl:leading-[1.45] sm:rtl:leading-[1.55] drop-shadow-sm">
          <span className="bg-gradient-to-r from-white via-slate-100 to-amber-100 bg-clip-text text-transparent inline-block pb-2">
            {tSetting('heroTitle', settings)}
          </span>
        </h1>

        {/* Subtitle (Sub-header) */}
        <p className="text-lg sm:text-2xl font-semibold text-amber-200/90 mb-5 sm:mb-6 max-w-3xl mx-auto ltr:tracking-wide rtl:tracking-normal ltr:leading-snug rtl:leading-[1.85] drop-shadow-sm">
          {tSetting('heroSub', settings)}
        </p>

        {/* Detailed Tagline */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-200 mb-10 max-w-2xl mx-auto ltr:leading-relaxed rtl:leading-[2.0] font-normal ltr:tracking-normal rtl:tracking-normal drop-shadow-sm">
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/25 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm"
          >
            <Heart className="w-4 h-4 text-amber-300 fill-current" />
            <span>{t('navDonate', 'Donate & Support')}</span>
          </button>

          <button
            id="hero-btn-events"
            onClick={() => onNavigateSection('events')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-slate-200 hover:text-white font-medium text-sm sm:text-base hover:bg-white/10 backdrop-blur-sm transition-colors cursor-pointer border border-white/10"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>{t('btnEvents', 'Upcoming Events')}</span>
          </button>
        </div>

        {/* Custom Website Live Notice Ribbon */}
        {settings.customNoticeHeadline && (
          <div className="mb-8 max-w-3xl mx-auto p-3 sm:p-3.5 rounded-2xl bg-white/10 border border-[#AD7A28]/40 backdrop-blur-md text-amber-100 flex items-center justify-between gap-3 text-xs sm:text-sm shadow-md animate-fadeIn">
            <div className="flex items-center gap-2.5 text-left rtl:text-right min-w-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#AD7A28] text-white text-[11px] font-bold shrink-0">
                <Megaphone className="w-3 h-3" />
                <span>{isUrdu ? 'اہم اپڈیٹ' : 'Live Notice'}</span>
              </span>
              <span className="font-medium text-slate-100 truncate">
                {settings.customNoticeHeadline}
              </span>
            </div>
            {settings.lastWebsiteUpdate && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-amber-300/80 font-mono shrink-0">
                <Clock className="w-3 h-3" />
                <span>{isUrdu ? 'اپڈیٹ شدہ' : 'Updated'}</span>
              </span>
            )}
          </div>
        )}

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

      {/* ═══ SLIDESHOW CONTROLS & ANIMATED TIMING INDICATORS ═══ */}
      {isMultiple && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-3 px-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-lg">
            {/* Prev Arrow */}
            <button
              onClick={prevSlide}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Previous Background Image"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Slide Dots & Animated.timing Progress */}
            <div className="flex items-center gap-1.5 px-1">
              {heroImages.map((_, dotIdx) => {
                const isCur = dotIdx === currentSlide;
                return (
                  <button
                    key={dotIdx}
                    onClick={() => goToSlide(dotIdx)}
                    className="relative p-1 focus:outline-none cursor-pointer"
                    title={`Slide ${dotIdx + 1}`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  >
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isCur ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Next Arrow */}
            <button
              onClick={nextSlide}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Next Background Image"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded-full text-amber-300/80 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer ml-1"
              title={isPaused ? "Resume Slideshow" : "Pause Slideshow"}
              aria-label={isPaused ? "Resume Slideshow" : "Pause Slideshow"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
