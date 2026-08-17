import React from 'react';
import { ArrowUp, Download, Calendar, Instagram, Facebook, Video, MessageSquare } from 'lucide-react';
import { generateRateCardPDF } from '../utils/pdfGenerator';

interface FooterProps {
  currency: 'MWK' | 'USD';
  onOpenBooking: (packageId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currency, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0d0e11] border-t border-white/10 pt-20 pb-12 relative text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Massive Brand Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-12 mb-12 gap-8">
          <div>
            <span className="font-display-lg text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] text-white block">
              MACANAN
            </span>
            <p className="font-label-caps text-xs tracking-[0.25em] text-neutral-400 mt-1">
              MULTIMEDIA • SELECTED WORKS & STUDIO • MZUZU, MALAWI
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => generateRateCardPDF(currency)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#16171b] hover:bg-[#1f2026] text-xs font-caps text-neutral-300 hover:text-white border border-white/15 rounded-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>2026 Rate Card</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#121317] hover:bg-neutral-200 text-xs font-caps font-bold tracking-wider rounded-lg transition-all shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Session</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 bg-[#16171b] hover:bg-[#1f2026] text-neutral-300 hover:text-white border border-white/15 rounded-lg transition-colors"
              title="Return to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Footer Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-xs">
          
          {/* Col 1: Portfolio Works */}
          <div className="space-y-3">
            <h5 className="font-caps text-white font-bold tracking-widest text-[11px]">PORTFOLIO</h5>
            <ul className="space-y-2 font-light">
              <li><a href="#portfolio" className="hover:text-white transition-colors">Weddings & Matrimony</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Graduation Editorials</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Corporate Headshots</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">4K Drone Aerial Cinema</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Commercial & NGO Films</a></li>
            </ul>
          </div>

          {/* Col 2: Studio */}
          <div className="space-y-3">
            <h5 className="font-caps text-white font-bold tracking-widest text-[11px]">STUDIO</h5>
            <ul className="space-y-2 font-light">
              <li><a href="#about" className="hover:text-white transition-colors">Vision From Mzuzu</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">The Art of Quiet Luxury</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Package Pricing & Inclusions</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Equipment Pedigree</a></li>
            </ul>
          </div>

          {/* Col 3: Client Resources */}
          <div className="space-y-3">
            <h5 className="font-caps text-white font-bold tracking-widest text-[11px]">CLIENT RESOURCES</h5>
            <ul className="space-y-2 font-light">
              <li>
                <button onClick={() => generateRateCardPDF(currency)} className="hover:text-white transition-colors text-left">
                  Download 2026 Rate Card (.pdf)
                </button>
              </li>
              <li><a href="#resources" className="hover:text-white transition-colors">Submit Video Project Brief</a></li>
              <li>
                <button onClick={() => onOpenBooking()} className="hover:text-white transition-colors text-left">
                  1-Click Calendar Sync
                </button>
              </li>
              <li><a href="#contact" className="hover:text-white transition-colors">Direct Studio Line</a></li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="space-y-3">
            <h5 className="font-caps text-white font-bold tracking-widest text-[11px]">CHANNELS</h5>
            <ul className="space-y-2 font-light">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <Facebook className="w-3.5 h-3.5" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <Video className="w-3.5 h-3.5" /> Vimeo Cinema
                </a>
              </li>
              <li>
                <a href="https://wa.me/265880000000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Studio
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Location Tag */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-caps tracking-wider gap-4">
          <div>
            © 2026 MACANAN MULTIMEDIA. ALL RIGHTS RESERVED.
          </div>
          <div>
            MZUZU, MALAWI • ARCHITECTURAL MINIMALISM • EDITORIAL GRACE
          </div>
        </div>

      </div>
    </footer>
  );
};
