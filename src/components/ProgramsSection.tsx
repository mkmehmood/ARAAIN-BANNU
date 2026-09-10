import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Program } from '../types';
import { 
  Heart, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Shield, 
  Users, 
  Building, 
  Award,
  ArrowRight,
  X
} from 'lucide-react';

export const ProgramsSection: React.FC = () => {
  const { t, isUrdu, tSetting, getPrograms } = useLanguage();
  const { settings, programs } = useData();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const localizedPrograms = getPrograms(programs);

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'heart':
      case 'handshake':
        return <Heart className="w-5 h-5" />;
      case 'briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'graduation-cap':
      case 'book':
        return <GraduationCap className="w-5 h-5" />;
      case 'trophy':
        return <Trophy className="w-5 h-5" />;
      case 'shield':
        return <Shield className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      case 'building':
        return <Building className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <section id="programs" className="py-20 sm:py-24 bg-white border-b border-[#16232F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#AD7A28]/15 text-[#8A5F19] text-xs font-bold uppercase tracking-wider mb-3">
            {t('navPrograms', 'Programs & Initiatives')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16232F] tracking-tight">
            {tSetting('programsTitle', settings)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            {tSetting('programsDesc', settings)}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {localizedPrograms.map((prog, idx) => (
            <div
              key={prog.id || idx}
              className="group p-6 rounded-2xl bg-[#FBF9F4] border border-[#16232F]/10 hover:border-[#AD7A28]/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-sm transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: prog.color || '#AD7A28' }}
                >
                  {getIcon(prog.icon_name)}
                </div>

                <h3 className="text-lg font-bold text-[#16232F] mb-2.5 group-hover:text-[#AD7A28] transition-colors">
                  {prog.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {prog.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#16232F]/5 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#AD7A28] hover:text-[#8C601A] transition-colors cursor-pointer"
                >
                  <span>{t('btnLearnMore', 'Learn More')}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 rtl:left-4 rtl:right-auto p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm"
              style={{ backgroundColor: selectedProgram.color || '#AD7A28' }}
            >
              {getIcon(selectedProgram.icon_name)}
            </div>

            <h3 className="text-2xl font-bold text-[#16232F] mb-3">
              {selectedProgram.title}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {selectedProgram.desc}
            </p>

            <div className="p-4 rounded-xl bg-[#F8F4E8] border border-[#AD7A28]/20 text-xs sm:text-sm text-[#16232F] leading-relaxed mb-6">
              {isUrdu ? (
                <div>
                  <strong>کمیونٹی کا مقصد:</strong> یہ اقدام بنوں کی مجلس عاملہ کے زیر نگرانی چلایا جاتا ہے۔ اس شعبے کے تحت رضاکارانہ خدمات، تعاون یا براہ راست امداد کے لیے رابطہ فارم استعمال کریں۔
                </div>
              ) : (
                <div>
                  <strong>Community Objective:</strong> This initiative is overseen by the executive council in Bannu. To volunteer, contribute resources, or apply for direct assistance under this wing, please connect through our contact form.
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedProgram(null)}
              className="w-full py-2.5 rounded-xl bg-[#16232F] hover:bg-[#203244] text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              {t('closeModal', 'Close')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
