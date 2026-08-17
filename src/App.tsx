import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContinuousMotionReel } from './components/ContinuousMotionReel';
import { Philosophy } from './components/Philosophy';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ServicesSection } from './components/ServicesSection';
import { ClientResourceHub } from './components/ClientResourceHub';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { LightboxModal } from './components/LightboxModal';
import { PortfolioItem } from './types';

export function App() {
  const [currency, setCurrency] = useState<'MWK' | 'USD'>('MWK');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('portfolio');
  const [reelSelectedItem, setReelSelectedItem] = useState<PortfolioItem | null>(null);

  // Track active section for navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['portfolio', 'services', 'philosophy', 'resources', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sec of sections) {
        const elem = document.getElementById(sec);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (packageId?: string) => {
    setBookingPackageId(packageId);
    setBookingModalOpen(true);
  };

  const handleOpenRateCard = () => {
    const resourceElem = document.getElementById('resources');
    if (resourceElem) {
      resourceElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121317] text-[#e3e2e7] flex flex-col font-sans selection:bg-white selection:text-[#121317]">
      
      {/* Navigation Header */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onOpenBooking={handleOpenBooking}
        onOpenRateCardModal={handleOpenRateCard}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Continuous Motion Live Imagery Stream */}
        <ContinuousMotionReel
          onSelectItem={(item) => setReelSelectedItem(item)}
          onOpenBooking={handleOpenBooking}
        />

        {/* 3. Philosophy: The Art of Quiet Luxury */}
        <Philosophy />

        {/* 4. High-Fidelity "Instant-Load" Creative Showcase & Cinematic Carousel */}
        <PortfolioGallery onOpenBooking={handleOpenBooking} />

        {/* 5. Services & Offerings (Elevating Visual Narratives) */}
        <ServicesSection currency={currency} onOpenBooking={handleOpenBooking} />

        {/* 6. Automated Rate Card & Creative Brief Downloader (Client Resource Hub) */}
        <ClientResourceHub 
          currency={currency} 
          setCurrency={setCurrency} 
          onOpenBooking={handleOpenBooking} 
        />

        {/* 7. About Studio (Vision From Mzuzu) */}
        <AboutSection />

        {/* 8. Contact & Studio Inquiries */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer currency={currency} onOpenBooking={handleOpenBooking} />

      {/* 1-Click Social-to-Booking Pipeline Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackageId={bookingPackageId}
        currency={currency}
      />

      {/* Lightbox for Continuous Motion Reel item clicks */}
      {reelSelectedItem && (
        <LightboxModal
          item={reelSelectedItem}
          onClose={() => setReelSelectedItem(null)}
          onBookCategory={(cat) => {
            setReelSelectedItem(null);
            handleOpenBooking('pkg-wedding');
          }}
        />
      )}

    </div>
  );
}

export default App;

