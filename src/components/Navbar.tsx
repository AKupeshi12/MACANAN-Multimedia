import React, { useState } from 'react';
import { Download, Calendar, Menu, X, Globe, Sparkles } from 'lucide-react';
import { generateRateCardPDF } from '../utils/pdfGenerator';

interface NavbarProps {
  currency: 'MWK' | 'USD';
  setCurrency: (c: 'MWK' | 'USD') => void;
  onOpenBooking: (packageId?: string) => void;
  onOpenRateCardModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  setCurrency,
  onOpenBooking,
  onOpenRateCardModal,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'portfolio', label: 'PORTFOLIO', href: '#portfolio' },
    { id: 'services', label: 'SERVICES', href: '#services' },
    { id: 'philosophy', label: 'PHILOSOPHY', href: '#philosophy' },
    { id: 'resources', label: 'RATE CARD & BRIEFS', href: '#resources', badge: '2026' },
    { id: 'about', label: 'ABOUT', href: '#about' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#121317]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-3 focus:outline-none"
          id="nav-brand-logo"
        >
          <div className="flex flex-col">
            <span className="font-display-lg text-xl sm:text-2xl font-black tracking-[-0.03em] text-white group-hover:text-neutral-300 transition-colors">
              MACANAN
            </span>
            <span className="font-label-caps text-[9px] tracking-[0.25em] text-neutral-400 -mt-1">
              MULTIMEDIA • MZUZU
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`text-[12px] font-medium tracking-[0.15em] font-caps transition-colors duration-200 flex items-center gap-1.5 py-1 ${
                activeSection === link.id
                  ? 'text-white border-b-2 border-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {link.label}
              {link.badge && (
                <span className="text-[9px] px-1.5 py-0.2 bg-white/10 text-white border border-white/20 rounded font-bold">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions & Currency Selector */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Currency Toggle */}
          <div className="flex items-center bg-[#1a1b1f] border border-white/10 rounded-full p-0.5 text-xs">
            <button
              onClick={() => setCurrency('MWK')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                currency === 'MWK'
                  ? 'bg-white text-[#121317] font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Malawian Kwacha"
            >
              MK (MWK)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                currency === 'USD'
                  ? 'bg-white text-[#121317] font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="US Dollar"
            >
              $ (USD)
            </button>
          </div>

          {/* Quick PDF Rate Card Button */}
          <button
            onClick={() => generateRateCardPDF(currency)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wider font-caps text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-all"
            title="Download Official 2026 Studio Rate Card (PDF)"
            id="nav-btn-download-ratecard"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Rate Card</span>
          </button>

          {/* 1-Click Booking Action Button */}
          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider font-caps bg-white text-[#121317] hover:bg-neutral-200 rounded-lg shadow-lg hover:shadow-white/10 transition-all cursor-pointer"
            id="nav-btn-book-session"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Session</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 text-xs font-bold bg-white text-[#121317] rounded-md"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#121317] border-b border-white/10 px-4 pt-3 pb-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs text-neutral-400">Currency</span>
            <div className="flex bg-[#1a1b1f] border border-white/10 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setCurrency('MWK')}
                className={`px-3 py-1 rounded ${currency === 'MWK' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
              >
                MWK (MK)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded ${currency === 'USD' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-caps tracking-widest text-neutral-300 hover:text-white py-2 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/10 text-white rounded">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                generateRateCardPDF(currency);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-caps tracking-wider border border-white/20 text-white rounded-lg"
            >
              <Download className="w-4 h-4" /> Download 2026 Rate Card PDF
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-caps tracking-wider bg-white text-black font-bold rounded-lg"
            >
              <Calendar className="w-4 h-4" /> Launch 1-Click Booking
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
