import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Quote, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, isUrdu, tSetting } = useLanguage();
  const { settings } = useData();

  return (
    <section id="about" className="py-20 sm:py-24 bg-[#F8F4E8] border-b border-[#AD7A28]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#AD7A28]/15 text-[#8A5F19] text-xs font-bold uppercase tracking-wider mb-3">
            {t('aboutTag', 'Who We Are')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16232F] tracking-tight">
            {tSetting('aboutTitle', settings)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {tSetting('aboutSubtitle', settings)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p className="p-4 rounded-xl bg-white shadow-sm border border-[#16232F]/10">
              {tSetting('aboutP1', settings)}
            </p>
            <p className="p-4 rounded-xl bg-white shadow-sm border border-[#16232F]/10">
              {tSetting('aboutP2', settings)}
            </p>
            <p className="p-4 rounded-xl bg-white shadow-sm border border-[#16232F]/10">
              {tSetting('aboutP3', settings)}
            </p>

            {/* Core Values Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-600/20 text-[#16232F] font-semibold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#AD7A28] shrink-0" />
                <span>{t('valueTransparent')}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-600/20 text-[#16232F] font-semibold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#AD7A28] shrink-0" />
                <span>{t('valueScholarships')}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-600/20 text-[#16232F] font-semibold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#AD7A28] shrink-0" />
                <span>{t('valueBrotherhood')}</span>
              </div>
            </div>
          </div>

          {/* Chairman Quote & Leadership Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#16232F] to-[#1F3345] text-white shadow-xl border border-white/10">
              <div className="absolute top-4 right-4 text-[#AD7A28] opacity-30">
                <Quote className="w-16 h-16" />
              </div>

              <div className="relative z-10">
                <div className="inline-block px-2.5 py-1 rounded-full bg-[#AD7A28]/20 border border-[#AD7A28]/40 text-amber-300 text-xs font-semibold mb-4">
                  {t('chairmanTitle', 'Leadership Message')}
                </div>

                <blockquote className="text-base sm:text-lg font-medium text-slate-200 italic leading-relaxed mb-6">
                  "{tSetting('chairmanQuote', settings)}"
                </blockquote>

                <div className="pt-4 border-t border-white/15 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#AD7A28] to-amber-300 flex items-center justify-center text-[#16232F] font-black text-lg shadow-sm">
                    {isUrdu ? 'چ چی' : 'AC'}
                  </div>
                  <div>
                    <div className="font-bold text-white text-base">
                      {tSetting('chairmanName', settings)}
                    </div>
                    <div className="text-xs text-amber-300/80 font-medium">
                      {t('chairmanRole', 'Global Chairman')} · {tSetting('siteName', settings)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
