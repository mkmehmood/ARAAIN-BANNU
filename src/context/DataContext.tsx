import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  SiteSettings, 
  Program, 
  Leader, 
  EventItem, 
  PageItem, 
  GalleryItem, 
  Registration, 
  Donation, 
  ContactMessage 
} from '../types';
import { 
  defaultSettings, 
  defaultPrograms, 
  defaultLeaders, 
  defaultEvents, 
  defaultPages, 
  defaultGallery 
} from '../data/defaultData';
import { 
  subscribeToSiteConfig, 
  subscribeToRegistrations, 
  subscribeToDonations, 
  submitRegistration, 
  submitDonation,
  pushSettingsToCloud,
  pushProgramsToCloud,
  pushLeadersToCloud,
  pushEventsToCloud,
  pushPagesToCloud,
  pushGalleryToCloud,
  updateRegistrationStatusInCloud,
  deleteRegistrationFromCloud,
  updateDonationStatusInCloud,
  deleteDonationFromCloud,
  assignCardIdInCloud
} from '../services/firebase';

interface DataContextType {
  settings: SiteSettings;
  programs: Program[];
  leaders: Leader[];
  events: EventItem[];
  pages: PageItem[];
  gallery: GalleryItem[];
  registrations: Registration[];
  donations: Donation[];
  messages: ContactMessage[];
  isCloudConnected: boolean;
  
  // Public Actions
  registerMember: (data: Omit<Registration, '_id' | 'submittedAt'>) => Promise<string>;
  recordDonation: (data: Omit<Donation, '_id' | 'submittedAt'>) => Promise<string>;
  sendContactMessage: (data: Omit<ContactMessage, 'id' | 'createdAt'>) => Promise<void>;

  // Admin Actions
  saveSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  savePrograms: (items: Program[]) => Promise<void>;
  saveLeaders: (items: Leader[]) => Promise<void>;
  saveEvents: (items: EventItem[]) => Promise<void>;
  savePages: (items: PageItem[]) => Promise<void>;
  saveGallery: (items: GalleryItem[]) => Promise<void>;
  updateRegistrationStatus: (id: string, status: string) => Promise<void>;
  deleteRegistration: (id: string) => Promise<void>;
  updateDonationStatus: (id: string, status: string) => Promise<void>;
  deleteDonation: (id: string) => Promise<void>;
  getOrCreateMemberCardId: (registration: Registration) => Promise<string>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const cached = localStorage.getItem('site_settings');
    return cached ? { ...defaultSettings, ...JSON.parse(cached) } : defaultSettings;
  });

  const [programs, setPrograms] = useState<Program[]>(() => {
    const cached = localStorage.getItem('site_programs');
    return cached ? JSON.parse(cached) : defaultPrograms;
  });

  const [leaders, setLeaders] = useState<Leader[]>(() => {
    const cached = localStorage.getItem('site_leaders');
    return cached ? JSON.parse(cached) : defaultLeaders;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const cached = localStorage.getItem('site_events');
    return cached ? JSON.parse(cached) : defaultEvents;
  });

  const [pages, setPages] = useState<PageItem[]>(() => {
    const cached = localStorage.getItem('site_pages');
    return cached ? JSON.parse(cached) : defaultPages;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const cached = localStorage.getItem('site_gallery');
    return cached ? JSON.parse(cached) : defaultGallery;
  });

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const cached = localStorage.getItem('site_messages');
    return cached ? JSON.parse(cached) : [
      {
        id: 1,
        name: "Usman Tariq",
        email: "usman@example.com",
        subject: "Volunteering for Education Drive",
        message: "Assalam-o-Alaikum, I would like to volunteer my weekends for teaching IT skills to youth in Bannu. Please let me know how to coordinate.",
        status: "unread",
        createdAt: new Date().toISOString()
      }
    ];
  });
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(true);

  // Subscribe to Cloud Config & Collections
  useEffect(() => {
    const unsubConfig = subscribeToSiteConfig(
      (patch) => {
        setSettings(prev => {
          const updated = { ...prev, ...patch };
          localStorage.setItem('site_settings', JSON.stringify(updated));
          return updated;
        });
      },
      (progItems) => {
        if (Array.isArray(progItems)) {
          setPrograms(progItems);
          localStorage.setItem('site_programs', JSON.stringify(progItems));
        }
      },
      (leaderItems) => {
        if (Array.isArray(leaderItems)) {
          setLeaders(leaderItems);
          localStorage.setItem('site_leaders', JSON.stringify(leaderItems));
        }
      },
      (eventItems) => {
        if (Array.isArray(eventItems)) {
          setEvents(eventItems);
          localStorage.setItem('site_events', JSON.stringify(eventItems));
        }
      },
      (pageItems) => {
        if (Array.isArray(pageItems)) {
          setPages(pageItems);
          localStorage.setItem('site_pages', JSON.stringify(pageItems));
        }
      },
      (galleryItems) => {
        if (Array.isArray(galleryItems)) {
          setGallery(galleryItems);
          localStorage.setItem('site_gallery', JSON.stringify(galleryItems));
        }
      }
    );

    const unsubRegs = subscribeToRegistrations((items) => {
      setRegistrations(items);
      setIsCloudConnected(true);
    });

    const unsubDons = subscribeToDonations((items) => {
      setDonations(items);
      setIsCloudConnected(true);
    });

    return () => {
      unsubConfig();
      unsubRegs();
      unsubDons();
    };
  }, []);

  // Public submission wrappers
  const registerMember = async (data: Omit<Registration, '_id' | 'submittedAt'>) => {
    const id = await submitRegistration(data);
    return id;
  };

  const recordDonation = async (data: Omit<Donation, '_id' | 'submittedAt'>) => {
    const id = await submitDonation(data);
    return id;
  };

  const sendContactMessage = async (data: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...data,
      id: Date.now(),
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('site_messages', JSON.stringify(updated));
  };

  // Admin CMS & Data Operations
  const saveSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('site_settings', JSON.stringify(updated));
    await pushSettingsToCloud(newSettings);
  };

  const savePrograms = async (items: Program[]) => {
    setPrograms(items);
    localStorage.setItem('site_programs', JSON.stringify(items));
    await pushProgramsToCloud(items);
  };

  const saveLeaders = async (items: Leader[]) => {
    setLeaders(items);
    localStorage.setItem('site_leaders', JSON.stringify(items));
    await pushLeadersToCloud(items);
  };

  const saveEvents = async (items: EventItem[]) => {
    setEvents(items);
    localStorage.setItem('site_events', JSON.stringify(items));
    await pushEventsToCloud(items);
  };

  const savePages = async (items: PageItem[]) => {
    setPages(items);
    localStorage.setItem('site_pages', JSON.stringify(items));
    await pushPagesToCloud(items);
  };

  const saveGallery = async (items: GalleryItem[]) => {
    setGallery(items);
    localStorage.setItem('site_gallery', JSON.stringify(items));
    await pushGalleryToCloud(items);
  };

  const updateRegistrationStatus = async (id: string, status: string) => {
    setRegistrations(prev => prev.map(r => r._id === id ? { ...r, status } : r));
    await updateRegistrationStatusInCloud(id, status);
  };

  const deleteRegistration = async (id: string) => {
    setRegistrations(prev => prev.filter(r => r._id !== id));
    await deleteRegistrationFromCloud(id);
  };

  const updateDonationStatus = async (id: string, status: string) => {
    setDonations(prev => prev.map(d => d._id === id ? { ...d, status } : d));
    await updateDonationStatusInCloud(id, status);
  };

  const deleteDonation = async (id: string) => {
    setDonations(prev => prev.filter(d => d._id !== id));
    await deleteDonationFromCloud(id);
  };

  const getOrCreateMemberCardId = async (reg: Registration): Promise<string> => {
    if (reg.cardId) return reg.cardId;
    if (!reg._id) return 'AB-25-000000';
    const cardId = await assignCardIdInCloud(reg._id, settings.siteName);
    setRegistrations(prev => prev.map(r => r._id === reg._id ? { ...r, cardId } : r));
    return cardId;
  };

  return (
    <DataContext.Provider value={{
      settings,
      programs,
      leaders,
      events,
      pages,
      gallery,
      registrations,
      donations,
      messages,
      isCloudConnected,
      registerMember,
      recordDonation,
      sendContactMessage,
      saveSettings,
      savePrograms,
      saveLeaders,
      saveEvents,
      savePages,
      saveGallery,
      updateRegistrationStatus,
      deleteRegistration,
      updateDonationStatus,
      deleteDonation,
      getOrCreateMemberCardId,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
