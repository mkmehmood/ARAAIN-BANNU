import React, { useState, useEffect, lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { PageItem } from './types';

// Public Components (eagerly bundled for fast first-paint)
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { LeadershipSection } from './components/LeadershipSection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Public Modals
import { MembershipModal } from './components/MembershipModal';
import { DonationModal } from './components/DonationModal';
import { PageModal } from './components/PageModal';

/**
 * TASK 2: CODE SEPARATION VIA DYNAMIC IMPORTS
 * 
 * AdminLoginModal and AdminDashboard are loaded on-demand via React.lazy().
 * They are NEVER bundled into the main JavaScript payload that ordinary
 * visitors download. Furthermore, they are rendered conditionally so the
 * network request for the admin chunk is never dispatched on normal visits.
 * 
 * SECURITY ARCHITECTURE NOTE:
 * Code separation and hidden UI entry points provide obscurity and optimize
 * bundle size, but they DO NOT constitute the security boundary.
 * The absolute security boundary is enforced server-side by Firebase Auth
 * and Firestore Security Rules (firestore.rules) gating all sensitive
 * documents behind request.auth.token.email.
 */
const AdminLoginModal = lazy(() =>
  import('./components/admin/AdminLoginModal').then((module) => ({
    default: module.AdminLoginModal,
  }))
);

const AdminDashboard = lazy(() =>
  import('./components/admin/AdminDashboard').then((module) => ({
    default: module.AdminDashboard,
  }))
);

const MainApp: React.FC = () => {
  // Modal & Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('is_admin_logged_in') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState(() => {
    return localStorage.getItem('admin_email') || '';
  });
  const [isInAdminMode, setIsInAdminMode] = useState(false);

  const openAdminPortal = () => {
    if (isAdminLoggedIn) {
      setIsInAdminMode(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  /**
   * TASK 3 — HIDDEN ADMIN ENTRY POINT MECHANISM 1:
   * Hidden URL trigger via URL Hash (#admin, #portal) or Query Parameter (?admin=1, ?portal=admin).
   * 
   * Cross-device advantage:
   * Works identically on mobile (Android/iOS) and desktop/laptop browsers.
   * Immediately scrubs the token from the browser address bar via history.replaceState
   * so it is not visible to observers or accidentally saved in shared bookmarks/history.
   * Compatible with GitHub Pages static hosting (hashes and query params do not cause 404s).
   */
  useEffect(() => {
    const checkUrlSecret = () => {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);

      const isSecretMatch =
        hash === '#admin' ||
        hash === '#portal' ||
        params.has('admin') ||
        params.get('portal') === 'admin';

      if (isSecretMatch) {
        // Scrub the secret from address bar without reloading
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search
          .replace(/[?&]admin(=[^&]*)?/i, '')
          .replace(/[?&]portal=admin/i, '')
          .replace(/^[?&]/, '');
        const cleanUrl = currentPath + (currentSearch ? `?${currentSearch}` : '');
        window.history.replaceState(null, '', cleanUrl || '/');

        openAdminPortal();
      }
    };

    checkUrlSecret();
    window.addEventListener('hashchange', checkUrlSecret);
    return () => window.removeEventListener('hashchange', checkUrlSecret);
  }, [isAdminLoggedIn]);

  /**
   * TASK 3 — HIDDEN ADMIN ENTRY POINT MECHANISM 2:
   * Secret Keyboard Shortcut for Desktop/Laptop users: Ctrl + Shift + A (or Cmd + Shift + A).
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openAdminPortal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const handleLoginSuccess = (email: string) => {
    setIsAdminLoggedIn(true);
    setAdminEmail(email);
    setIsInAdminMode(true);
    localStorage.setItem('is_admin_logged_in', 'true');
    localStorage.setItem('admin_email', email);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setIsInAdminMode(false);
    setAdminEmail('');
    localStorage.removeItem('is_admin_logged_in');
    localStorage.removeItem('admin_email');
  };

  const scrollToSection = (id: string) => {
    if (isInAdminMode) {
      setIsInAdminMode(false);
    }
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Only render and load AdminDashboard if authenticated admin is in admin mode
  if (isInAdminMode && isAdminLoggedIn) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#121D27] flex items-center justify-center text-amber-200">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading Administrator Workspace...</span>
            </div>
          </div>
        }
      >
        <AdminDashboard
          adminEmail={adminEmail}
          onExitAdmin={() => setIsInAdminMode(false)}
          onLogout={handleLogout}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#16232F] selection:bg-[#AD7A28] selection:text-white">
      {/* Top Navbar (Brand logo has 5-tap hidden entry for phone & desktop) */}
      <Navbar
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenDonation={() => setIsDonationOpen(true)}
        onNavigateSection={scrollToSection}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenAdmin={openAdminPortal}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenMembership={() => setIsMembershipOpen(true)}
          onOpenDonation={() => setIsDonationOpen(true)}
          onNavigateSection={scrollToSection}
        />
        <AboutSection />
        <ProgramsSection />
        <LeadershipSection />
        <EventsSection />
        <GallerySection />
        <CtaSection
          onOpenMembership={() => setIsMembershipOpen(true)}
          onOpenDonation={() => setIsDonationOpen(true)}
        />
        <ContactSection />
      </main>

      {/* Footer (Copyright notice has 3-tap stealth backup entry; zero visible admin UI) */}
      <Footer
        onOpenPage={(p) => setSelectedPage(p)}
        onNavigateSection={scrollToSection}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenDonation={() => setIsDonationOpen(true)}
        onOpenAdmin={openAdminPortal}
      />

      {/* Sidebar Drawer (Clean navigation & language switcher; zero admin or cloud status) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenDonation={() => setIsDonationOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Public Modals */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
      />

      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />

      <PageModal
        page={selectedPage}
        onClose={() => setSelectedPage(null)}
      />

      {/* 
        TASK 2: CONDITIONAL LAZY ADMIN LOGIN MODAL
        Only mounted when isAdminLoginOpen is true.
        The bundle chunk is never requested over the network until this state becomes true.
      */}
      {isAdminLoginOpen && (
        <Suspense fallback={null}>
          <AdminLoginModal
            isOpen={isAdminLoginOpen}
            onClose={() => setIsAdminLoginOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </Suspense>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <DataProvider>
        <MainApp />
      </DataProvider>
    </LanguageProvider>
  );
};

export default App;
