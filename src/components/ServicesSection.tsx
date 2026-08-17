import React from 'react';
import { Camera, Film, Compass, UserCheck, ArrowRight, CheckCircle2, Sparkles, Clock, Layers } from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/packagesData';

interface ServicesSectionProps {
  currency: 'MWK' | 'USD';
  onOpenBooking: (packageId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currency,
  onOpenBooking,
}) => {
  return (
    <section id="services" className="py-24 sm:py-32 bg-[#16171b] border-t border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-white/40" />
            <span className="font-label-caps text-xs text-neutral-400 tracking-[0.25em]">
              SERVICES & OFFERINGS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight mb-4">
            Elevating visual narratives through uncompromising aesthetic precision.
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base font-light">
            Every session is engineered with commercial studio lighting, cinema prime optics, and master-level color science.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICE_PACKAGES.map((pkg, idx) => {
            const formattedPrice = currency === 'MWK'
              ? `MK ${pkg.priceMWK.toLocaleString()}`
              : `$${pkg.priceUSD.toLocaleString()}`;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#121317] border transition-all duration-300 ${
                  pkg.popular
                    ? 'border-white/40 shadow-2xl shadow-white/5 ring-1 ring-white/20'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                {/* Popular Pill */}
                {pkg.popular && (
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-white text-[#121317] rounded-full text-[10px] font-caps font-bold tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    SIGNATURE CHOICE
                  </div>
                )}

                <div>
                  {/* Category & Index */}
                  <div className="flex items-center justify-between text-neutral-500 text-xs font-caps tracking-widest mb-3">
                    <span>0{idx + 1}. {pkg.category}</span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Clock className="w-3 h-3" /> {pkg.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    {pkg.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                    {pkg.subtitle}
                  </p>

                  {/* Price Tag */}
                  <div className="mb-6 p-4 rounded-xl bg-[#1a1b1f] border border-white/5">
                    <span className="text-[10px] font-label-caps text-neutral-400 tracking-wider block">
                      INVESTMENT ({currency})
                    </span>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                      {formattedPrice}
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Ideal for: {pkg.idealFor}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[10px] font-label-caps text-neutral-400 tracking-widest block">
                      DELIVERABLES & INCLUSIONS
                    </span>
                    {pkg.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  onClick={() => onOpenBooking(pkg.id)}
                  className={`w-full py-3.5 px-4 rounded-xl font-caps text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.popular
                      ? 'bg-white text-[#121317] hover:bg-neutral-200 shadow-lg'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                  }`}
                >
                  <span>BOOK THIS PACKAGE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
