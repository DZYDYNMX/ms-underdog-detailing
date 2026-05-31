import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import type { SectionType } from './components/BottomNav';
import { HomeSection } from './components/HomeSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { ServiceDetailSheet } from './components/ServiceDetailSheet';
import { LegalSheet } from './components/LegalSheet';

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  
  const [selectedPackage, setSelectedPackage] = useState<'full' | 'interior' | 'express' | undefined>(undefined);
  const [legalSheetType, setLegalSheetType] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    // Handle legal sheet custom event
    const handleOpenLegal = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === 'privacy' || customEvent.detail === 'terms') {
        setLegalSheetType(customEvent.detail);
      }
    };
    window.addEventListener('open-legal-sheet', handleOpenLegal);

    // Handle QR code routing
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get('pkg');
    if (pkg === 'express' || pkg === 'full' || pkg === 'interior') {
      setSelectedPackage(pkg as 'full' | 'interior' | 'express');
      setActiveSection('contact');
      // Clean up URL without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    return () => window.removeEventListener('open-legal-sheet', handleOpenLegal);
  }, []);

  // Drawer detail booking click — maps service ID to calculator package
  const handleDetailBooking = (serviceId: string) => {
    setSelectedServiceId(null); // Close sheet
    
    // Map serviceId to calculator package keys
    const pkgMap: Record<string, 'full' | 'interior' | 'express'> = {
      'full-detail': 'full',
      'interior-detail': 'interior',
      'upholstery-clean': 'interior',
      'express-detail': 'express'
    };
    setSelectedPackage(pkgMap[serviceId] || 'full');
    setActiveSection('contact');
  };

  const handleHomeNavigation = (section: 'services' | 'contact') => {
    if (section === 'services') {
      setActiveSection('services');
    } else {
      setActiveSection('contact');
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection onNavigate={handleHomeNavigation} />;
      case 'services':
        return <ServicesSection onSelectService={(id) => setSelectedServiceId(id)} />;
      case 'reviews':
        return <ReviewsSection />;
      case 'gallery':
        return <GallerySection />;
      case 'contact':
        return (
          <ContactSection
            initialPackage={selectedPackage}
          />
        );
      default:
        return <HomeSection onNavigate={handleHomeNavigation} />;
    }
  };

  return (
    <>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Section Content Wrapper with Animating Transitions */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.16, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dynamic Detail Bottom Sheets overlay */}
      <AnimatePresence>
        {selectedServiceId && (
          <ServiceDetailSheet
            serviceId={selectedServiceId}
            onClose={() => setSelectedServiceId(null)}
            onBook={handleDetailBooking}
          />
        )}
        {legalSheetType && (
          <LegalSheet
            type={legalSheetType}
            onClose={() => setLegalSheetType(null)}
          />
        )}
      </AnimatePresence>

      <BottomNav activeSection={activeSection} setActiveSection={setActiveSection} />
    </>
  );
}

export default App;
