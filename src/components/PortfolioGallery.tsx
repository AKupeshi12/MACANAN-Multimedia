import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { PortfolioCategory, PortfolioItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { 
  Eye, Camera, Zap, LayoutGrid, SlidersHorizontal, ArrowUpRight, 
  ChevronLeft, ChevronRight, Play, Pause, Maximize2, Sparkles, Film, Image as ImageIcon
} from 'lucide-react';

interface PortfolioGalleryProps {
  onOpenBooking: (packageId?: string) => void;
}

const SHOWCASE_FLASH_WORDS = [
  'Creative Showcase.',
  '4K Cinema Reels.',
  'High-Fashion Unions.',
  'Executive Portfolios.',
  'Drone Aerial Series.',
];

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('ALL');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'masonry' | 'grid'>('carousel');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [flashWordIndex, setFlashWordIndex] = useState(0);
  const [isWordFlashing, setIsWordFlashing] = useState(false);

  // Flash word interval
  useEffect(() => {
    const timer = setInterval(() => {
      setIsWordFlashing(true);
      setTimeout(() => {
        setFlashWordIndex((prev) => (prev + 1) % SHOWCASE_FLASH_WORDS.length);
        setIsWordFlashing(false);
      }, 300);
    }, 2900);
    return () => clearInterval(timer);
  }, []);

  const categories: PortfolioCategory[] = [
    'ALL',
    'WEDDINGS',
    'COUPLE SHOOTS',
    'EVENTS',
    'DRONE',
    'PORTRAITS',
    'COMMERCIAL',
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Reset carousel index when category changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeCategory]);

  // Auto-play timer for carousel
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== 'carousel' || filteredItems.length === 0) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % filteredItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, viewMode, filteredItems.length]);

  const handleNext = () => {
    if (filteredItems.length === 0) return;
    setCarouselIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (filteredItems.length === 0) return;
    setCarouselIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleBookCategory = (catName: string) => {
    let pkgId = 'pkg-wedding';
    if (catName === 'PORTRAITS' || catName === 'GRADUATION') pkgId = 'pkg-grad';
    if (catName === 'COUPLE SHOOTS') pkgId = 'pkg-couple';
    if (catName === 'DRONE') pkgId = 'pkg-drone';
    if (catName === 'COMMERCIAL' || catName === 'EVENTS') pkgId = 'pkg-commercial';
    onOpenBooking(pkgId);
  };

  const activeCarouselItem = filteredItems[carouselIndex] || filteredItems[0];

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-[#121317] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Flash Kinetic Box */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-white/40" />
              <span className="font-label-caps text-xs text-neutral-400 tracking-[0.25em]">
                SELECTED WORKS
              </span>
            </div>
            
            {/* Headline with Flash Motion Words in Optical Box */}
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] flex flex-wrap items-center gap-3">
              <span>Instant-Load</span>
              
              <span className="inline-flex items-center px-4 py-1.5 rounded-xl bg-[#1a1b1f] border border-white/20 backdrop-blur-md animate-flash-box shadow-xl">
                <span 
                  className={`text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 transition-all duration-300 ${
                    isWordFlashing 
                      ? 'opacity-0 scale-95 blur-sm brightness-150' 
                      : 'opacity-100 scale-100 blur-0 brightness-100'
                  }`}
                >
                  {SHOWCASE_FLASH_WORDS[flashWordIndex]}
                </span>
              </span>
            </h2>
          </div>

          {/* Network-adaptive optimization badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#1a1b1f] border border-white/10 text-xs text-neutral-300">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-caps tracking-wider">
              Ultra-Responsive WebP • Smooth 60FPS Transitions
            </span>
          </div>
        </div>

        {/* Category Filters and View Mode Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-caps tracking-widest rounded-md transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-[#121317] font-bold shadow-md'
                    : 'bg-[#1a1b1f] text-neutral-400 hover:text-white hover:bg-[#25272c] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Layout Mode Selector (Carousel vs Masonry vs Grid) */}
          <div className="flex items-center gap-1 bg-[#1a1b1f] border border-white/10 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-caps tracking-wider transition-colors cursor-pointer ${
                viewMode === 'carousel' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Cinematic Carousel</span>
            </button>
            
            <button
              onClick={() => setViewMode('masonry')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-caps tracking-wider transition-colors cursor-pointer ${
                viewMode === 'masonry' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Masonry</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-caps tracking-wider transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>2-Col Editorial</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: CINEMATIC INTERACTIVE CAROUSEL */}
        {viewMode === 'carousel' && activeCarouselItem && (
          <div className="space-y-6">
            
            {/* Primary Cinema Stage */}
            <div className="relative rounded-2xl overflow-hidden bg-[#16171b] border border-white/15 shadow-2xl group/stage">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.2/1] overflow-hidden">
                <img
                  key={activeCarouselItem.id}
                  src={activeCarouselItem.imageUrl}
                  alt={activeCarouselItem.title}
                  className="w-full h-full object-cover filter contrast-105 brightness-95 transform transition-transform duration-1000 ease-out group-hover/stage:scale-105"
                />
                
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-[#121317]/40 to-black/30" />

                {/* Top Corner HUD Metadata */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3">
                  <div className="px-3 py-1 bg-black/70 backdrop-blur-md rounded border border-white/15 text-xs font-caps font-semibold text-white">
                    {activeCarouselItem.category}
                  </div>
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 text-xs font-mono text-neutral-300 hidden sm:block">
                    SLIDE {String(carouselIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                  </div>
                </div>

                {/* Top Right Fullscreen / Lightbox Trigger */}
                <button
                  onClick={() => setSelectedItem(activeCarouselItem)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/15 transition-all hover:scale-110 cursor-pointer"
                  title="Inspect Full High-Resolution & EXIF"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Navigation Chevrons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-white hover:text-[#121317] text-white border border-white/20 backdrop-blur-md transition-all shadow-xl cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-white hover:text-[#121317] text-white border border-white/20 backdrop-blur-md transition-all shadow-xl cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Bottom Cinema Details Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="max-w-2xl space-y-2">
                    <span className="font-label-caps text-xs text-neutral-400 tracking-[0.2em] block">
                      {activeCarouselItem.metadata.location} • {activeCarouselItem.metadata.year}
                    </span>
                    <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {activeCarouselItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 font-light">
                      {activeCarouselItem.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedItem(activeCarouselItem)}
                      className="px-5 py-2.5 bg-white text-[#121317] hover:bg-neutral-200 text-xs font-caps font-bold tracking-wider rounded-lg transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Inspect EXIF</span>
                    </button>

                    <button
                      onClick={() => handleBookCategory(activeCarouselItem.category)}
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-caps font-semibold tracking-wider rounded-lg transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>Book This Category</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Carousel Control Bar & Thumbnail Filmstrip */}
            <div className="space-y-4">
              
              {/* Playback / Progress Controls */}
              <div className="flex items-center justify-between px-2 text-xs font-caps text-neutral-400">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#1a1b1f] hover:bg-[#25272c] text-white rounded border border-white/10 transition-colors cursor-pointer"
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{isAutoPlaying ? 'Auto Sliding' : 'Play Slideshow'}</span>
                  </button>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {activeCarouselItem.metadata.camera} • {activeCarouselItem.metadata.settings}
                  </span>
                </div>

                <div className="flex items-center gap-1 font-mono text-neutral-400">
                  {filteredItems.map((_, i) => (
                    <button
                      key={`dot-${i}`}
                      onClick={() => setCarouselIndex(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        carouselIndex === i ? 'w-6 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Jump to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Thumbnail Filmstrip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {filteredItems.map((item, idx) => (
                  <button
                    key={`thumb-${item.id}-${idx}`}
                    onClick={() => setCarouselIndex(idx)}
                    className={`relative w-24 sm:w-32 aspect-[16/10] shrink-0 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      carouselIndex === idx
                        ? 'border-white ring-2 ring-white/40 scale-105 shadow-xl'
                        : 'border-white/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    {carouselIndex === idx && (
                      <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: MASONRY GRID */}
        {viewMode === 'masonry' && (
          <div className="masonry-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="masonry-item group relative overflow-hidden rounded-xl bg-[#1a1b1f] border border-white/10 cursor-pointer transition-all duration-300 hover:border-white/40 shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95"
                    loading="lazy"
                  />
                  
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121317]/95 via-[#121317]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                  
                  {/* Category Pill on top right */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[10px] font-caps text-neutral-300">
                    {item.category}
                  </div>

                  {/* Bottom Text Content & Action */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="font-label-caps text-[10px] text-neutral-400 tracking-[0.2em] block mb-1">
                      {item.metadata.location} • {item.metadata.year}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white tracking-tight leading-snug mb-2">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <Camera className="w-3.5 h-3.5 text-neutral-300" />
                        {item.metadata.camera.split(' ')[0]} {item.metadata.camera.split(' ')[1] || ''}
                      </span>
                      <span className="flex items-center gap-1 text-white font-semibold text-[11px] font-caps">
                        Inspect EXIF <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: 2-COL EDITORIAL GRID */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative overflow-hidden rounded-xl bg-[#1a1b1f] border border-white/10 cursor-pointer hover:border-white/40 transition-all shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121317]/95 via-[#121317]/20 to-transparent" />
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-xs font-caps text-white">
                    {item.category}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="font-label-caps text-xs text-neutral-400 tracking-widest block mb-1">
                      {item.metadata.location}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-white/10">
                      <span>{item.metadata.camera} • {item.metadata.lens}</span>
                      <span className="flex items-center gap-1 text-white font-bold font-caps">
                        View Details <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <LightboxModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onBookCategory={handleBookCategory}
        />
      )}
    </section>
  );
};
