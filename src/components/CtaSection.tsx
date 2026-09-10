import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { UserCheck, Heart, ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  onOpenMembership: () => void;
  onOpenDonation: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onOpenMembership,
  onOpenDonation,
}) => {
  const { t, tSetting } = useLanguage();
  const { settings } = useData();

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-[#16232F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Membership Card */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#16232F] to-[#1E3040] text-white shadow-xl flex flex-col justify-between relative overflow-hidden border border-white/10">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
                {tSetting('membershipTitle', settings)}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                {tSetting('membershipDesc', settings)}
              </p>
            </div>

            <div className="relative z-10">
              <button
                onClick={onOpenMembership}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>{t('btnBecomeMember', 'Apply for Membership')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Donation Card */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#2A1E0E] to-[#3B2912] text-white shadow-xl flex flex-col justify-between relative overflow-hidden border border-[#AD7A28]/30">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#AD7A28]/30 border border-[#AD7A28]/50 text-amber-300 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
                {tSetting('donateTitle', settings)}
              </h3>
              <p className="text-amber-100/80 text-sm sm:text-base leading-relaxed mb-8">
                {tSetting('donateDesc', settings)}
              </p>
            </div>

            <div className="relative z-10">
              <button
                onClick={onOpenDonation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#AD7A28] hover:bg-[#C89238] text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-950/40 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>{t('navDonate', 'Make a Contribution')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
