import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, ShieldCheck, Sparkles, Film, Camera, Zap } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

const FLASH_WORDS = [
  'ETERNITY.',
  'TIMELESS LEGACIES.',
  'MONUMENTAL UNIONS.',
  'QUIET LUXURY.',
  'ARCHITECTURAL LIGHT.',
  '4K DCI CINEMA.',
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % FLASH_WORDS.length);
        setIsFlashing(false);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToPortfolio = () => {
    const portfolioElem = document.getElementById('portfolio');
    if (portfolioElem) {
      portfolioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#121317]">
      {/* Background Cinematic Image with Subtle Zoom / Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWX412VQgpcoFqfuTMaclqcuklN4y8I6rSqNC00eWsoc6XfhlgYuC3ipPTY_SBvAmMNUbbcH_Hm8JIHLTFtfrYPLkWki8Z_2ttGHmOW9Ele5PutE4PAlLHY-1kLBk_dCL9zy8WmgKyhm2lH760IPESw34msaCOrs-7nuubWYbOdhbkcBqfRsIVuSKI_q_jZ0T2IEnDalA4RR70zB93iCeY5VWp2LjrKt7xVcPdxHXIZzfAEKm7G-NO"
          alt="Macanan Cinematic Wedding Background"
          className="w-full h-full object-cover object-center opacity-35 scale-105 filter brightness-90 contrast-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-[#121317]/80 to-[#121317]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#121317]/40 to-[#121317]" />
      </div>

      {/* Grid Pattern Accent Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Studio Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-label-caps text-[11px] text-neutral-300 tracking-[0.2em]">
            MACANAN MULTIMEDIA • STUDIO & ON-LOCATION
          </span>
        </div>

        {/* Grand Headline with Flash Kinetic Box */}
        <h1 className="font-display-lg text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-[-0.04em] leading-[1.08] mb-8">
          <span className="block mb-2">CAPTURING</span>
          
          {/* Flash Word in Optical Kinetic Box */}
          <div className="inline-block relative px-4 sm:px-8 py-2 sm:py-3 mt-1 rounded-xl bg-white/[0.04] border border-white/20 backdrop-blur-xl shadow-2xl animate-flash-box group">
            {/* Precision Optical Frame Corner Crosshairs */}
            <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-white/70" />
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-white/70" />
            <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-white/70" />
            <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-white/70" />
            
            {/* Shutter Sensor Indicator */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#121317] border border-white/30 text-[9px] font-caps tracking-widest text-neutral-300 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
              <span>OPTICAL FOCUS</span>
            </div>

            <span 
              className={`block text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 transition-all duration-300 ${
                isFlashing 
                  ? 'opacity-0 scale-95 blur-sm brightness-150' 
                  : 'opacity-100 scale-100 blur-0 brightness-100'
              }`}
            >
              {FLASH_WORDS[wordIndex]}
            </span>
          </div>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed mb-10 text-balance">
          Professional Photography & Cinematic Videography based in Mzuzu, Malawi. We craft visual legacies through a lens of architectural minimalism and editorial grace.
        </p>

        {/* Interactive Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={scrollToPortfolio}
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#121317] hover:bg-neutral-200 font-caps text-xs font-bold tracking-[0.18em] rounded-lg transition-all shadow-xl hover:shadow-white/10 flex items-center justify-center gap-2 group cursor-pointer"
            id="hero-btn-explore"
          >
            <span>EXPLORE PORTFOLIO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-caps text-xs font-semibold tracking-[0.18em] rounded-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
            id="hero-btn-book"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>1-CLICK BOOKING</span>
          </button>
        </div>

        {/* Trust & Craft Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl pt-8 border-t border-white/10 text-left">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <Camera className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider font-caps">Editorial Photography</h4>
              <p className="text-[11px] text-neutral-400 leading-normal">High-fashion weddings, graduation & executive portraiture</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <Film className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider font-caps">Cinematic 4K Motion</h4>
              <p className="text-[11px] text-neutral-400 leading-normal">Sony FX3 cinema line & custom film color science</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <ShieldCheck className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider font-caps">Studio In Mzuzu</h4>
              <p className="text-[11px] text-neutral-400 leading-normal">Dedicated studio space & travel across Malawi and worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div 
        onClick={scrollToPortfolio}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer text-neutral-500 hover:text-white transition-colors"
      >
        <span className="text-[9px] font-label-caps tracking-[0.25em]">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};
