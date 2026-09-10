import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageItem } from '../types';
import { X, BookOpen } from 'lucide-react';

interface PageModalProps {
  page: PageItem | null;
  onClose: () => void;
}

export const PageModal: React.FC<PageModalProps> = ({ page, onClose }) => {
  const { t, getPages } = useLanguage();

  if (!page) return null;

  const localizedPage = getPages([page])[0] || page;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[#16232F] text-white p-6 sm:p-7 flex items-center justify-between border-b border-[#AD7A28]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#AD7A28]/20 border border-[#AD7A28]/40 text-[#F5CA7B] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#AD7A28] font-bold uppercase tracking-wider">
                {localizedPage.label}
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                {localizedPage.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
            {localizedPage.body}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#16232F] hover:bg-[#203244] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            {t('closeModal', 'Close')}
          </button>
        </div>

      </div>
    </div>
  );
};
