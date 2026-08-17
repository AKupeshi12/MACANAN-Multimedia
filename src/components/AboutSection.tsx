import React from 'react';
import { Award, Compass, HeartHandshake, Sparkles } from 'lucide-react';
import founderPortrait from '../assets/images/macanan_founder_portrait_1786960641533.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#16171b] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Studio Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#121317] border border-white/15 p-2 shadow-2xl">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <img
                  src={founderPortrait}
                  alt="Macanan Founder & Creative Director Portrait"
                  className="w-full h-full object-cover filter contrast-105 brightness-95"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-transparent" />
                
                {/* Floating Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#121317]/85 backdrop-blur-md border border-white/10">
                  <span className="font-label-caps text-[10px] text-neutral-400 tracking-widest block">
                    FOUNDER & CREATIVE DIRECTOR
                  </span>
                  <h4 className="font-display text-lg font-bold text-white tracking-tight">
                    MACANAN
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Lead Cinematographer & Optical Director
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio & Numbers */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/40" />
              <span className="font-label-caps text-xs text-neutral-400 tracking-[0.25em]">
                ABOUT THE STUDIO
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight">
              Vision From Mzuzu. <br />
              <span className="text-neutral-400 font-normal">Aesthetic for the World.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              MACANAN MULTIMEDIA was established with a singular conviction: that world-class visual storytelling should be grounded in authentic cultural depth and executed with unyielding technical discipline.
            </p>

            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Headquartered in Mzuzu, Malawi, we have documented prominent weddings, high-level corporate campaigns, and cinematic documentaries throughout Malawi, Eastern and Southern Africa. Our work has been commissioned by scholars, corporate leaders, and discerning couples who demand timeless, museum-grade visual preservation.
            </p>

            {/* Quote */}
            <div className="p-5 rounded-xl bg-[#121317] border-l-2 border-white border-y border-r border-white/10 my-4">
              <p className="font-display text-sm sm:text-base italic text-neutral-200">
                “Light is not merely illuminated space; it is the currency of human memory. We build frames that our clients’ grandchildren will gaze upon with reverent awe.”
              </p>
            </div>

            {/* Studio Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">350+</div>
                <div className="text-[11px] font-caps text-neutral-400 tracking-wider">Unions & Shoots</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">4K DCI</div>
                <div className="text-[11px] font-caps text-neutral-400 tracking-wider">ProRes Master</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                <div className="text-[11px] font-caps text-neutral-400 tracking-wider">Precision Focus</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
