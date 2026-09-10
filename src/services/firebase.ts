import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { Registration, Donation, SiteSettings, Program, Leader, EventItem, PageItem, GalleryItem } from '../types';

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDQWTvTbXX6o1QvHy5E9HeD5k0DmySlsPg",
  authDomain: "tahir-meer.firebaseapp.com",
  projectId: "tahir-meer",
  storageBucket: "tahir-meer.firebasestorage.app",
  messagingSenderId: "275167373986",
  appId: "1:275167373986:web:0eef7d041ca22df4c3c5fb"
};

// Initialize Firebase App singleton
export const firebaseApp = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

// ── Settings Sub-Documents Mapping ──────────────────────────────
export const SETTINGS_GROUPS: Record<string, (keyof SiteSettings)[]> = {
  identity: ['siteName', 'siteTagline', 'siteSubName', 'siteSubTagline', 'logoData'],
  hero: ['heroBadge', 'heroTitle', 'heroSub', 'heroTagline', 'heroImage'],
  about: ['aboutTitle', 'aboutSubtitle', 'aboutP1', 'aboutP2', 'aboutP3', 'statMembers', 'statPrograms', 'statCities', 'chairmanName', 'chairmanQuote'],
  sections: ['programsTitle', 'programsDesc', 'leadershipTitle', 'membershipTitle', 'membershipDesc', 'donateTitle', 'donateDesc', 'eventsTitle', 'galleryTitle', 'galleryDesc'],
  contact: ['contactAddress', 'contactHours', 'contactPhone', 'contactEmail'],
  social: ['socialFacebook', 'socialTwitter', 'socialWhatsapp', 'socialInstagram'],
  footer: ['footerDesc', 'footerCopy'],
  donation: ['bankName', 'bankTitle', 'bankAccount', 'bankIBAN', 'bankBranch', 'epTitle', 'epNumber', 'jcTitle', 'jcNumber', 'intBank', 'intSwift', 'intIBAN'],
};

// ── Public Submissions ──────────────────────────────────────────

/**
 * Submits a new membership registration to Firestore
 */
export async function submitRegistration(data: Omit<Registration, '_id' | 'submittedAt'>): Promise<string> {
  try {
    const coll = collection(db, 'registrations');
    const docRef = await addDoc(coll, {
      ...data,
      status: 'new',
      submittedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error: any) {
    console.warn('[Firebase] Registration write error:', error.message);
    // Fallback: save locally in localStorage if offline
    const localId = 'offline_' + Date.now();
    const existing = JSON.parse(localStorage.getItem('local_registrations') || '[]');
    existing.unshift({
      ...data,
      _id: localId,
      status: 'new',
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('local_registrations', JSON.stringify(existing));
    return localId;
  }
}

/**
 * Submits a new donation transaction proof to Firestore
 */
export async function submitDonation(data: Omit<Donation, '_id' | 'submittedAt'>): Promise<string> {
  try {
    const coll = collection(db, 'donations');
    const docRef = await addDoc(coll, {
      ...data,
      status: 'unverified',
      submittedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error: any) {
    console.warn('[Firebase] Donation write error:', error.message);
    const localId = 'offline_' + Date.now();
    const existing = JSON.parse(localStorage.getItem('local_donations') || '[]');
    existing.unshift({
      ...data,
      _id: localId,
      status: 'unverified',
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('local_donations', JSON.stringify(existing));
    return localId;
  }
}

// ── Real-time Data Listeners ────────────────────────────────────

/**
 * Listen to live Registrations collection
 */
export function subscribeToRegistrations(callback: (items: Registration[]) => void): () => void {
  try {
    const q = query(collection(db, 'registrations'), orderBy('submittedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const items: Registration[] = snapshot.docs.map(d => ({
        ...d.data() as Registration,
        _id: d.id,
      }));
      callback(items);
    }, (error) => {
      console.warn('[Firebase] Registrations subscription error:', error.message);
      const fallback = JSON.parse(localStorage.getItem('local_registrations') || '[]');
      callback(fallback);
    });
  } catch (e) {
    return () => {};
  }
}

/**
 * Listen to live Donations collection
 */
export function subscribeToDonations(callback: (items: Donation[]) => void): () => void {
  try {
    const q = query(collection(db, 'donations'), orderBy('submittedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const items: Donation[] = snapshot.docs.map(d => ({
        ...d.data() as Donation,
        _id: d.id,
      }));
      callback(items);
    }, (error) => {
      console.warn('[Firebase] Donations subscription error:', error.message);
      const fallback = JSON.parse(localStorage.getItem('local_donations') || '[]');
      callback(fallback);
    });
  } catch (e) {
    return () => {};
  }
}

/**
 * Subscribe to all site configuration sub-docs and collections
 */
export function subscribeToSiteConfig(
  onSettings: (patch: Partial<SiteSettings>) => void,
  onPrograms?: (items: Program[]) => void,
  onLeaders?: (items: Leader[]) => void,
  onEvents?: (items: EventItem[]) => void,
  onPages?: (items: PageItem[]) => void,
  onGallery?: (items: GalleryItem[]) => void
): () => void {
  const unsubs: (() => void)[] = [];

  const subDocs = ['identity', 'hero', 'about', 'sections', 'contact', 'social', 'footer', 'donation', 'misc'];
  subDocs.forEach(name => {
    try {
      const unsub = onSnapshot(doc(db, 'siteConfig', name), snap => {
        if (snap.exists()) {
          onSettings(snap.data() as Partial<SiteSettings>);
        }
      }, err => {
        console.warn(`[Firebase] siteConfig/${name} error:`, err.message);
      });
      unsubs.push(unsub);
    } catch (e) {}
  });

  const listDocs: { name: string; handler?: (items: any[]) => void }[] = [
    { name: 'programs', handler: onPrograms },
    { name: 'leaders', handler: onLeaders },
    { name: 'events', handler: onEvents },
    { name: 'pages', handler: onPages },
    { name: 'gallery', handler: onGallery },
  ];

  listDocs.forEach(({ name, handler }) => {
    if (!handler) return;
    try {
      const unsub = onSnapshot(doc(db, 'siteConfig', name), snap => {
        if (snap.exists() && Array.isArray(snap.data().items)) {
          handler(snap.data().items);
        }
      }, err => {
        console.warn(`[Firebase] siteConfig/${name} error:`, err.message);
      });
      unsubs.push(unsub);
    } catch (e) {}
  });

  return () => unsubs.forEach(u => u());
}

// ── Admin Push Helpers ──────────────────────────────────────────

export async function pushSettingsToCloud(settings: Partial<SiteSettings>): Promise<void> {
  const byGroup: Record<string, Record<string, any>> = {};

  for (const [key, value] of Object.entries(settings)) {
    let group = 'misc';
    for (const [g, fields] of Object.entries(SETTINGS_GROUPS)) {
      if ((fields as string[]).includes(key)) {
        group = g;
        break;
      }
    }
    if (!byGroup[group]) byGroup[group] = {};
    byGroup[group][key] = value;
  }

  await Promise.all(
    Object.entries(byGroup).map(([group, fields]) =>
      setDoc(doc(db, 'siteConfig', group), fields, { merge: true })
    )
  );
}

export async function pushProgramsToCloud(items: Program[]): Promise<void> {
  await setDoc(doc(db, 'siteConfig', 'programs'), { items });
}

export async function pushLeadersToCloud(items: Leader[]): Promise<void> {
  await setDoc(doc(db, 'siteConfig', 'leaders'), { items });
}

export async function pushEventsToCloud(items: EventItem[]): Promise<void> {
  await setDoc(doc(db, 'siteConfig', 'events'), { items });
}

export async function pushPagesToCloud(items: PageItem[]): Promise<void> {
  await setDoc(doc(db, 'siteConfig', 'pages'), { items });
}

export async function pushGalleryToCloud(items: GalleryItem[]): Promise<void> {
  await setDoc(doc(db, 'siteConfig', 'gallery'), { items });
}

export async function updateRegistrationStatusInCloud(id: string, status: string): Promise<void> {
  await updateDoc(doc(db, 'registrations', id), { status });
}

export async function deleteRegistrationFromCloud(id: string): Promise<void> {
  await deleteDoc(doc(db, 'registrations', id));
}

export async function updateDonationStatusInCloud(id: string, status: string): Promise<void> {
  await updateDoc(doc(db, 'donations', id), { status });
}

export async function deleteDonationFromCloud(id: string): Promise<void> {
  await deleteDoc(doc(db, 'donations', id));
}

export async function assignCardIdInCloud(regId: string, orgName: string): Promise<string> {
  const prefix = orgName
    ? orgName.split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 4) || 'AB'
    : 'AB';
  const yy = String(new Date().getFullYear() % 100).padStart(2, '0');
  const randomSerial = String(Math.floor(100000 + Math.random() * 900000));
  const cardId = `${prefix}-${yy}-${randomSerial}`;

  try {
    await updateDoc(doc(db, 'registrations', regId), { cardId });
  } catch (err) {
    console.warn('[Firebase] Could not update cardId in cloud:', err);
  }
  return cardId;
}

// ── Client Image Compression ────────────────────────────────────

export async function compressImage(file: File, maxWidth = 900, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
