import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { PageItem } from './types';

// Public Components
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

// Modals
import { MembershipModal } from './components/MembershipModal';
import { DonationModal } from './components/DonationModal';
import { PageModal } from './components/PageModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

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
    return localStorage.getItem('admin_email') || '3tahirmeer@gmail.com';
  });
  const [isInAdminMode, setIsInAdminMode] = useState(false);

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
    localStorage.removeItem('is_admin_logged_in');
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

  if (isInAdminMode && isAdminLoggedIn) {
    return (
      <AdminDashboard
        adminEmail={adminEmail}
        onExitAdmin={() => setIsInAdminMode(false)}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#16232F] selection:bg-[#AD7A28] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenDonation={() => setIsDonationOpen(true)}
        onNavigateSection={scrollToSection}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
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

      {/* Footer */}
      <Footer
        onOpenPage={(p) => setSelectedPage(p)}
        onNavigateSection={scrollToSection}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenDonation={() => setIsDonationOpen(true)}
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setIsInAdminMode(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {/* Sidebar Drawer (Contains Admin and Translations) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenDonation={() => setIsDonationOpen(true)}
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setIsInAdminMode(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
        onNavigateSection={scrollToSection}
        isAdminLoggedIn={isAdminLoggedIn}
        isInAdminMode={isInAdminMode}
        onToggleAdminMode={() => setIsInAdminMode(!isInAdminMode)}
        onLogout={handleLogout}
        adminEmail={adminEmail}
      />

      {/* Modals */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
      />

      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <PageModal
        page={selectedPage}
        onClose={() => setSelectedPage(null)}
      />
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
