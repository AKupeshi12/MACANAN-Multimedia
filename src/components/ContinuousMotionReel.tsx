import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { PortfolioItem } from '../types';
import { Play, Pause, Sparkles, ArrowUpRight, Camera, Eye } from 'lucide-react';

interface ContinuousMotionReelProps {
  onSelectItem: (item: PortfolioItem) => void;
  onOpenBooking: (packageId?: string) => void;
}

export const ContinuousMotionReel: React.FC<ContinuousMotionReelProps> = ({
  onSelectItem,
  onOpenBooking,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<'normal' | 'fast' | 'slow'>('normal');

  // Create infinite duplicate array for seamless looping
  const reelItemsFirst = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];
  const reelItemsSecond = [...PORTFOLIO_ITEMS.slice().reverse(), ...PORTFOLIO_ITEMS.slice().reverse()];

  const getAnimationDuration = (direction: 'left' | 'right') => {
    let base = direction === 'left' ? 42 : 36;
    if (speedMultiplier === 'fast') base = base * 0.55;
    if (speedMultiplier === 'slow') base = base * 1.6;
    return `${base}s`;
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0e0f13] border-t border-b border-white/10 relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-label-caps text-xs text-neutral-400 tracking-[0.25em]">
                CONTINUOUS MOTION REEL • 24FPS STREAM
              </span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-[-0.03em] flex items-center gap-3">
              <span>Living Cinematic Frames</span>
              <span className="text-xs px-2.5 py-1 rounded bg-white/10 text-neutral-300 font-caps font-normal tracking-widest hidden sm:inline-block">
                LIVE KINETIC FEED
              </span>
            </h2>
          </div>

          {/* Interactive Reel Controls */}
          <div className="flex items-center gap-3">
            {/* Speed Selector */}
            <div className="flex items-center bg-[#16171b] border border-white/10 p-1 rounded-lg text-xs font-caps text-neutral-400">
              <button
                onClick={() => setSpeedMultiplier('slow')}
                className={`px-2.5 py-1 rounded transition-colors ${speedMultiplier === 'slow' ? 'bg-white/20 text-white' : 'hover:text-white'}`}
              >
                0.5x
              </button>
              <button
                onClick={() => setSpeedMultiplier('normal')}
                className={`px-2.5 py-1 rounded transition-colors ${speedMultiplier === 'normal' ? 'bg-white/20 text-white' : 'hover:text-white'}`}
              >
                1.0x
              </button>
              <button
                onClick={() => setSpeedMultiplier('fast')}
                className={`px-2.5 py-1 rounded transition-colors ${speedMultiplier === 'fast' ? 'bg-white/20 text-white' : 'hover:text-white'}`}
              >
                1.5x
              </button>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#16171b] hover:bg-[#202229] border border-white/15 text-white rounded-lg text-xs font-caps transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isPaused ? 'Resume Motion' : 'Pause Reel'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Row 1: Leftward Infinite Marquee */}
      <div className="relative w-full overflow-hidden mb-6 py-2 group">
        <div 
          className="animate-continuous-left flex gap-6"
          style={{
            animationDuration: getAnimationDuration('left'),
            animationPlayState: isPaused ? 'paused' : undefined
          }}
        >
          {reelItemsFirst.map((item, idx) => (
            <div
              key={`reel-left-${item.id}-${idx}`}
              onClick={() => onSelectItem(item)}
              className="w-[280px] sm:w-[360px] md:w-[420px] shrink-0 group/card relative rounded-xl overflow-hidden bg-[#16171b] border border-white/10 hover:border-white/50 transition-all duration-300 cursor-pointer shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 filter contrast-105 brightness-95"
                  loading="lazy"
                />
                
                {/* Cinematic Letterbox Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-black/40 opacity-80 group-hover/card:opacity-95 transition-opacity" />
                
                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-caps text-neutral-300">
                  {item.category}
                </div>

                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 opacity-0 group-hover/card:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-display text-sm font-bold text-white tracking-tight leading-snug line-clamp-1 mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-caps">
                    <span>{item.metadata.location}</span>
                    <span className="text-white flex items-center gap-1 font-semibold">
                      INSPECT <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightward Infinite Marquee (Reverse Flow for Dynamic Counter-Motion) */}
      <div className="relative w-full overflow-hidden py-2 group">
        <div 
          className="animate-continuous-right flex gap-6"
          style={{
            animationDuration: getAnimationDuration('right'),
            animationPlayState: isPaused ? 'paused' : undefined
          }}
        >
          {reelItemsSecond.map((item, idx) => (
            <div
              key={`reel-right-${item.id}-${idx}`}
              onClick={() => onSelectItem(item)}
              className="w-[260px] sm:w-[320px] md:w-[380px] shrink-0 group/card relative rounded-xl overflow-hidden bg-[#16171b] border border-white/10 hover:border-white/50 transition-all duration-300 cursor-pointer shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 filter contrast-105 brightness-95"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-black/30 opacity-80 group-hover/card:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-caps text-neutral-300">
                  {item.metadata.camera.split(' ')[0]} {item.metadata.camera.split(' ')[1] || ''}
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-display text-xs sm:text-sm font-bold text-white tracking-tight leading-snug line-clamp-1 mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-caps">
                    <span>{item.metadata.settings}</span>
                    <span className="text-amber-300 flex items-center gap-1 font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Bottom Prompt */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex items-center justify-center">
        <p className="text-[11px] font-label-caps text-neutral-400 tracking-[0.2em] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-white/60" />
          HOVER ANY FRAME TO HALT STREAM • CLICK TO REVEAL OPTICAL METRICS & EXIF
        </p>
      </div>

    </section>
  );
};
