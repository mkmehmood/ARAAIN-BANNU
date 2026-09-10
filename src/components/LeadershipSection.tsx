import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Mail, Star } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  const { t, isUrdu, tSetting, getLeaders } = useLanguage();
  const { settings, leaders } = useData();

  const localizedLeaders = getLeaders(leaders);

  return (
    <section id="leadership" className="py-20 sm:py-24 bg-[#F8F4E8] border-b border-[#AD7A28]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#AD7A28]/15 text-[#8A5F19] text-xs font-bold uppercase tracking-wider mb-3">
            {t('navLeadership', 'Our Leadership')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16232F] tracking-tight">
            {tSetting('leadershipTitle', settings)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            {t('leadershipDesc', 'Committed community servants providing strategic guidance and global connection.')}
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {localizedLeaders.map((leader, idx) => (
            <div
              key={leader.id || idx}
              className={`relative rounded-2xl bg-white p-6 sm:p-7 shadow-sm border transition-all duration-200 hover:shadow-md ${
                leader.featured ? 'border-[#AD7A28]/50 ring-1 ring-[#AD7A28]/30' : 'border-[#16232F]/10'
              }`}
            >
              {Boolean(leader.featured) && (
                <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#AD7A28]/15 text-[#8A5F19] text-[11px] font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{t('featuredBadge', 'Featured')}</span>
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                {leader.photo_data ? (
                  <img
                    src={leader.photo_data}
                    alt={leader.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#AD7A28]/40 shadow-inner"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#16232F] to-[#25394C] text-[#F5CA7B] font-black text-xl flex items-center justify-center border-2 border-[#AD7A28]/40 shadow-sm">
                    {leader.initials || (isUrdu ? 'آ ب' : 'AB')}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-[#16232F] leading-snug">
                    {leader.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#AD7A28]">
                    {leader.role}
                  </p>
                </div>
              </div>

              {leader.email && (
                <div className="pt-3 border-t border-[#16232F]/5">
                  <a
                    href={`mailto:${leader.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#AD7A28] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{leader.email}</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
