import React, { useState } from 'react';
import { X, Camera, MapPin, Calendar, Sparkles, ZoomIn, ZoomOut, RotateCcw, Share2, Check, ArrowRight, Download } from 'lucide-react';
import { PortfolioItem } from '../types';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onBookCategory: (category: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onBookCategory,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'metadata' | 'story'>('metadata');

  if (!item) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.3, 1));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-4 md:p-6 animate-fade-in">
      
      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center gap-2 bg-[#1a1b1f]/90 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-caps text-neutral-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-white">{item.category}</span>
          <span className="text-neutral-500">•</span>
          <span>{item.metadata.year}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-[#1a1b1f]/90 border border-white/10 rounded-lg p-1 text-neutral-300">
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1b1f]/90 hover:bg-white/10 border border-white/10 text-xs font-caps text-white rounded-lg transition-colors"
            title="Share Project"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 bg-[#1a1b1f]/90 hover:bg-white/20 text-white rounded-lg border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Modal Container */}
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row items-center bg-[#16171b] border border-white/15 rounded-2xl overflow-hidden shadow-2xl mt-12 sm:mt-8">
        
        {/* Left / Center Image Stage */}
        <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-[75vh] bg-[#0d0e11] flex items-center justify-center overflow-hidden p-2 sm:p-4">
          <div 
            className="transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing max-h-full max-w-full flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[48vh] lg:max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl select-none"
            />
          </div>

          {/* Floating Category & Format Badge */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-caps text-neutral-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>High-Fidelity 4K Capture</span>
          </div>
        </div>

        {/* Right Details & Inquire Sidebar */}
        <div className="w-full lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between bg-[#16171b] overflow-y-auto max-h-[40vh] lg:max-h-[75vh] border-t lg:border-t-0 lg:border-l border-white/10">
          
          <div className="space-y-5">
            {/* Title & Client */}
            <div>
              <span className="font-label-caps text-[10px] text-neutral-400 tracking-[0.25em] block mb-1">
                {item.category} • {item.metadata.location}
              </span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                {item.title}
              </h3>
              {item.client && (
                <p className="text-xs text-neutral-400 mt-1">Client: {item.client}</p>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              {item.description}
            </p>

            {/* Camera & Technical EXIF Specs */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-white font-caps tracking-wider">
                <Camera className="w-4 h-4 text-neutral-400" />
                <span>Camera & Optical Pedigree</span>
              </div>

              <div className="grid grid-cols-1 gap-2 text-[11px] bg-[#121317] p-3 rounded-lg border border-white/5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Camera Body:</span>
                  <span className="font-semibold text-white text-right">{item.metadata.camera}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Optical Lens:</span>
                  <span className="font-semibold text-white text-right">{item.metadata.lens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Exposure:</span>
                  <span className="font-semibold text-white text-right">{item.metadata.settings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Resolution:</span>
                  <span className="font-semibold text-white text-right">{item.metadata.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Location:</span>
                  <span className="font-semibold text-white text-right">{item.metadata.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-6 mt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                onClose();
                onBookCategory(item.category);
              }}
              className="w-full py-3.5 bg-white text-[#121317] hover:bg-neutral-200 font-caps text-xs font-bold tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <span>INQUIRE ABOUT THIS STYLE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-neutral-500 font-caps tracking-wider">
              MZUZU STUDIO • NATIONWIDE & GLOBAL TRAVEL
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
