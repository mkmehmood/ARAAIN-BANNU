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
  // Always initialize fresh from defaults; no localStorage caching
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [programs, setPrograms] = useState<Program[]>(defaultPrograms);
  const [leaders, setLeaders] = useState<Leader[]>(defaultLeaders);
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);
  const [pages, setPages] = useState<PageItem[]>(defaultPages);
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery);

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: 1,
      name: "عثمان طارق",
      email: "usman@example.com",
      subject: "تعلیمی مہم میں رضاکارانہ شمولیت",
      message: "السلام علیکم، میں بنوں کے نوجوانوں کو آئی ٹی کی بنیادی تعلیم دینے کے لیے رضاکارانہ وقت دینا چاہتا ہوں۔ رابطہ فرمائیں۔",
      status: "unread",
      createdAt: new Date().toISOString()
    }
  ]);
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(true);

  // Proactively purge any leftover cache keys on mount so app is guaranteed 100% fresh
  useEffect(() => {
    try {
      const keysToPurge = [
        'site_settings',
        'site_programs',
        'site_leaders',
        'site_events',
        'site_pages',
        'site_gallery',
        'site_messages',
        'arain_bannu_cache'
      ];
      keysToPurge.forEach(k => {
        localStorage.removeItem(k);
        sessionStorage.removeItem(k);
      });
      if (typeof window !== 'undefined' && 'caches' in window) {
        window.caches.keys().then(names => {
          names.forEach(name => window.caches.delete(name));
        }).catch(() => {});
      }
    } catch {
      // ignore
    }
  }, []);

  // Subscribe to Cloud Config & Collections
  useEffect(() => {
    const unsubConfig = subscribeToSiteConfig(
      (patch) => {
        setSettings(prev => ({ ...prev, ...patch }));
      },
      (progItems) => {
        if (Array.isArray(progItems)) {
          setPrograms(progItems);
        }
      },
      (leaderItems) => {
        if (Array.isArray(leaderItems)) {
          setLeaders(leaderItems);
        }
      },
      (eventItems) => {
        if (Array.isArray(eventItems)) {
          setEvents(eventItems);
        }
      },
      (pageItems) => {
        if (Array.isArray(pageItems)) {
          setPages(pageItems);
        }
      },
      (galleryItems) => {
        if (Array.isArray(galleryItems)) {
          setGallery(galleryItems);
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
    setMessages(prev => [newMsg, ...prev]);
  };

  // Admin CMS & Data Operations
  const saveSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await pushSettingsToCloud(newSettings);
  };

  const savePrograms = async (items: Program[]) => {
    setPrograms(items);
    await pushProgramsToCloud(items);
  };

  const saveLeaders = async (items: Leader[]) => {
    setLeaders(items);
    await pushLeadersToCloud(items);
  };

  const saveEvents = async (items: EventItem[]) => {
    setEvents(items);
    await pushEventsToCloud(items);
  };

  const savePages = async (items: PageItem[]) => {
    setPages(items);
    await pushPagesToCloud(items);
  };

  const saveGallery = async (items: GalleryItem[]) => {
    setGallery(items);
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
