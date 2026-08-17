import React, { useState, useEffect } from 'react';
import { Sparkles, Aperture, Layers, Compass, Focus } from 'lucide-react';

const PHILOSOPHY_WORDS = [
  'Quiet Luxury.',
  'Precision Light.',
  'Archival Emotion.',
  'Pure Geometry.',
  'Timeless Depth.',
];

export const Philosophy: React.FC = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashing(true);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % PHILOSOPHY_WORDS.length);
        setFlashing(false);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-[#16171b] border-t border-b border-white/10 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-white/40" />
          <span className="font-label-caps text-xs text-neutral-400 tracking-[0.25em]">
            OUR PHILOSOPHY
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column with Flash Word Headline */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] leading-tight">
              <span className="block mb-2">The Art of</span>
              
              {/* Dynamic Flash Box */}
              <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 rounded-xl bg-[#121317] border border-white/20 backdrop-blur-md shadow-xl animate-flash-box relative">
                <Focus className="w-4 h-4 text-emerald-400 shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
                
                <span
                  className={`text-neutral-200 italic font-normal tracking-tight transition-all duration-300 ${
                    flashing
                      ? 'opacity-0 scale-95 blur-sm brightness-150'
                      : 'opacity-100 scale-100 blur-0 brightness-100'
                  }`}
                >
                  {PHILOSOPHY_WORDS[wordIdx]}
                </span>
                
                {/* Micro corner tabs */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/80" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/80" />
              </div>
            </h2>

            <div className="w-16 h-[2px] bg-white/20 my-6" />

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              We reject the transient trends of over-saturated, disposable imagery. At MACANAN, every frame is treated with the rigor of classical architecture and the emotional resonance of modern cinema.
            </p>

            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Based in Mzuzu, our studio marries technical optical excellence—shooting on full-frame cinema rigs, prime cine glass, and medium format sensors—with an intuitive understanding of human connection. Whether documenting monumental weddings or crafting executive narratives, we capture quiet power.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-[#121317] border border-white/10">
                <Aperture className="w-5 h-5 text-white mb-2" />
                <h4 className="text-xs font-bold text-white font-caps tracking-wider mb-1">Architectural Light</h4>
                <p className="text-[11px] text-neutral-400 leading-normal">Precision lighting sculpting organic form and spatial depth.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#121317] border border-white/10">
                <Layers className="w-5 h-5 text-white mb-2" />
                <h4 className="text-xs font-bold text-white font-caps tracking-wider mb-1">Film Color Science</h4>
                <p className="text-[11px] text-neutral-400 leading-normal">Custom calibrated LUTs emulating archival 35mm film stock.</p>
              </div>
            </div>
          </div>

          {/* Right Image Column with Precision Frame */}
          <div className="lg:col-span-6">
            <div className="relative p-3 bg-[#121317] border border-white/15 rounded-xl shadow-2xl group">
              
              {/* Corner crosshairs */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/60" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white/60" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white/60" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/60" />

              <div className="overflow-hidden rounded-lg relative aspect-[4/3]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKXsskpcNuFvO68scqRA09LRdqMv8SBc2WLP3nghipDthfzJ5Gf1OI2iUq0w6rKmDzOI7sAQHJA7NWTYeR5EbO_Q8Bg003w9zJEtC-Wsnmiz5QCnPH7KX5IntdH_AifZOJEesnW5Kd6KDkENuCLFjdQZDXC110wzPr_KlUTNOjvHarbH_A8szp03HYC-J5ngP3j-twCX0SlXGnso_ezr1t7WOCntwqXRVVwAdVH3zWaBKDgMrMlvZj"
                  alt="Macanan Optical Standard and Camera Lens"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121317]/90 via-transparent to-transparent" />
                
                {/* Bottom Frame Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-300 font-caps tracking-widest bg-[#121317]/80 backdrop-blur-md px-3 py-2 rounded border border-white/10">
                  <span className="flex items-center gap-1.5 font-semibold text-white">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    PURE OPTICAL PRECISION
                  </span>
                  <span className="text-neutral-400">MZUZU STUDIO LAB</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
