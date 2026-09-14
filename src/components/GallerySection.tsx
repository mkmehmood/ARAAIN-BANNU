import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Image as ImageIcon } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { t, isUrdu, tSetting, getGallery } = useLanguage();
  const { settings, gallery } = useData();
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string | number, boolean>>({});

  const rawGallery = getGallery(gallery);
  const displayGallery = rawGallery.filter((item, idx) => !failedImages[item.id ?? idx]);

  const handleImageError = (id: string | number) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number) => {
    setActiveItemIndex(index);
  };

  const closeLightbox = () => {
    setActiveItemIndex(null);
  };

  const nextItem = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((activeItemIndex + 1) % displayGallery.length);
  };

  const prevItem = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((activeItemIndex - 1 + displayGallery.length) % displayGallery.length);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#F8F4E8] border-b border-[#AD7A28]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#AD7A28]/15 text-[#8A5F19] text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{t('navGallery', 'Gallery')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#16232F] ltr:tracking-tight rtl:tracking-normal ltr:leading-tight rtl:leading-[1.45]">
            {tSetting('galleryTitle', settings)}
          </h2>
          <p className="mt-3 sm:mt-5 text-sm sm:text-lg text-slate-600 font-medium ltr:leading-relaxed rtl:leading-[1.85] rtl:tracking-normal">
            {tSetting('galleryDesc', settings)}
          </p>
        </div>

        {/* Gallery Grid or Real-Content State */}
        {displayGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayGallery.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => openLightbox(idx)}
                className="group relative h-60 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer border border-[#16232F]/10 transition-all duration-300 active:scale-[0.98]"
              >
                <img
                  src={item.data_url}
                  alt={item.caption || (isUrdu ? 'تصویر' : 'Gallery photo')}
                  onError={() => handleImageError(item.id ?? idx)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <p className="text-sm font-semibold drop-shadow-sm leading-snug">
                    {item.caption || (isUrdu ? `کمیونٹی تصویری یادگار #${idx + 1}` : `Community Milestone #${idx + 1}`)}
                  </p>
                </div>

                <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto p-2 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Elegant Authenticity Notice - No Unsolicited Stock Photos */
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-white/80 border border-[#AD7A28]/20 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#AD7A28]/10 text-[#AD7A28] mx-auto flex items-center justify-center mb-4 border border-[#AD7A28]/25 shadow-xs">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#16232F] mb-2">
              {isUrdu ? 'کمیونٹی تصویری گیلری' : 'Community Photo Gallery'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {isUrdu 
                ? 'کمیونٹی سرگرمیوں اور فلاحی تقریبات کی مستند تصاویر جلد یہاں شامل کی جائیں گی۔' 
                : 'Verified photos of our community events and welfare initiatives will appear here once added.'}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 text-xs font-semibold">
              <span>{isUrdu ? 'صرف اصل اور تصدیق شدہ تصاویر' : 'Authentic Pictures Only'}</span>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {activeItemIndex !== null && displayGallery[activeItemIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-4 backdrop-blur-md animate-fadeIn">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevItem}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextItem}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center p-2">
            <img
              src={displayGallery[activeItemIndex].data_url}
              alt={displayGallery[activeItemIndex].caption || 'Gallery photo'}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
            {displayGallery[activeItemIndex].caption && (
              <div className="mt-4 px-4 py-2 rounded-lg bg-black/75 text-white text-xs sm:text-base font-medium text-center max-w-lg">
                {displayGallery[activeItemIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
