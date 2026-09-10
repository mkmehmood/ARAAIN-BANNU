import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Clock, MapPin, Tag } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { t, tSetting, getEvents } = useLanguage();
  const { settings, events } = useData();

  const localizedEvents = getEvents(events);

  return (
    <section id="events" className="py-20 sm:py-24 bg-white border-b border-[#16232F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#AD7A28]/15 text-[#8A5F19] text-xs font-bold uppercase tracking-wider mb-3">
            {t('navEvents', 'Events Calendar')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16232F] tracking-tight">
            {tSetting('eventsTitle', settings)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            {t('eventsDesc', 'Stay connected with upcoming gatherings, business workshops, and annual assemblies.')}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {localizedEvents.map((ev, idx) => (
            <div
              key={ev.id || idx}
              className="rounded-2xl bg-[#FBF9F4] border border-[#16232F]/10 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  {/* Date badge */}
                  <div className="w-14 h-16 rounded-xl bg-[#16232F] text-white flex flex-col items-center justify-center shadow-sm">
                    <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                      {ev.month}
                    </span>
                    <span className="text-xl font-extrabold leading-none mt-0.5">
                      {ev.day}
                    </span>
                  </div>

                  {/* Category tag */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#AD7A28]/15 text-[#8A5F19] text-xs font-bold">
                    <Tag className="w-3 h-3" />
                    <span>{ev.tag}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#16232F] mb-3 leading-snug">
                  {ev.title}
                </h3>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#16232F]/10 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#AD7A28] shrink-0" />
                  <span>{ev.time_str}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#AD7A28] shrink-0" />
                  <span>{ev.place}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
