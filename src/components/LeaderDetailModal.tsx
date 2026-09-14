import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Leader } from '../types';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Quote, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

interface LeaderDetailModalProps {
  leader: Leader | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderDetailModal: React.FC<LeaderDetailModalProps> = ({
  leader,
  isOpen,
  onClose
}) => {
  const { isUrdu, t, getLeaders } = useLanguage();

  // Handle ESC key dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !leader) return null;

  // Bilingual resolution with getLeaders
  const resolved = getLeaders([leader])[0] || leader;
  const displayName = resolved.name;
  const displayRole = resolved.role;
  const displayMessage = resolved.message;
  const displayBio = resolved.bio;
  const displayLocation = resolved.location;
  const responsibilities = resolved.responsibilities || [];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#AD7A28]/20 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-[#16232F] via-[#1E3142] to-[#16232F] text-white p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 rtl:left-5 rtl:right-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Leader Avatar */}
            <div className="relative shrink-0">
              {leader.photo_data && !leader.photo_data.includes('unsplash.com') ? (
                <img
                  src={leader.photo_data}
                  alt={displayName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#AD7A28] shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#0F1922] to-[#25394C] text-[#F5CA7B] font-black text-3xl flex items-center justify-center border-4 border-[#AD7A28] shadow-lg">
                  {leader.initials || (isUrdu ? 'آ ب' : 'AB')}
                </div>
              )}

              {Boolean(leader.featured) && (
                <div className="absolute -bottom-1.5 -right-1.5 rtl:-left-1.5 rtl:-right-auto p-1.5 rounded-full bg-[#AD7A28] text-white shadow-md" title="Featured Council Leader">
                  <Star className="w-4 h-4 fill-current" />
                </div>
              )}
            </div>

            {/* Title & Designations */}
            <div className="text-center sm:text-left rtl:sm:text-right flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                {Boolean(leader.featured) && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#AD7A28]/25 text-amber-300 text-xs font-bold border border-[#AD7A28]/40">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isUrdu ? 'کونسل کے نمایاں رہنما' : 'Featured Executive'}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-xs text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#AD7A28]" />
                  <span>{displayLocation}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
                {displayName}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-[#F5CA7B]">
                {displayRole}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Customized Message to Viewers (Core Highlight) */}
          <div className="relative rounded-2xl bg-[#FBF8F0] border-2 border-[#AD7A28]/30 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-[#8A5F19]">
              <div className="w-8 h-8 rounded-lg bg-[#AD7A28]/20 flex items-center justify-center text-[#8A5F19]">
                <Quote className="w-4 h-4 rtl:rotate-180" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider">
                {isUrdu ? 'پیغام برائے برادری و قارئین' : 'Special Message to Viewers & Community'}
              </h4>
            </div>
            
            <p className="text-sm sm:text-base text-slate-800 italic leading-relaxed rtl:leading-[1.9] font-medium">
              "{displayMessage}"
            </p>

            <div className="mt-3 pt-3 border-t border-[#AD7A28]/15 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-[#8A5F19]">— {displayName}</span>
              <span className="text-[11px] text-slate-400">{isUrdu ? 'باضابطہ تنظیمی پیغام' : 'Official Message'}</span>
            </div>
          </div>

          {/* Background / Bio */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
              {isUrdu ? 'تعارف اور پس منظر' : 'Profile Overview'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed rtl:leading-[1.85]">
              {displayBio}
            </p>
          </div>

          {/* Key Portfolios & Responsibilities */}
          {responsibilities && responsibilities.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5">
                {isUrdu ? 'کلیدی ذمہ داریاں اور دائرہ کار' : 'Key Portfolios & Responsibilities'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#AD7A28]" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Communication Channels */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              {leader.email && (
                <a
                  href={`mailto:${leader.email}?subject=${encodeURIComponent(isUrdu ? 'رابطہ برائے آرائیں بنوں' : 'Inquiry to Council Leadership')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16232F] hover:bg-[#25394C] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <Mail className="w-4 h-4 text-[#F5CA7B]" />
                  <span>{isUrdu ? 'ای میل بھیجیں' : 'Send Email'}</span>
                </a>
              )}

              {leader.phone && (
                <a
                  href={`tel:${leader.phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#AD7A28] hover:bg-[#8A5F19] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>{leader.phone}</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {isUrdu ? 'بند کریں' : 'Close'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
