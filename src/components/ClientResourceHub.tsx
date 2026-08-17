import React, { useState } from 'react';
import { 
  Download, FileText, Send, Sparkles, Check, ArrowRight, 
  HelpCircle, Shield, Layers, Camera, Video, DollarSign, MessageSquare 
} from 'lucide-react';
import { generateRateCardPDF, generateProjectBriefPDF } from '../utils/pdfGenerator';
import { CreativeBriefSubmission } from '../types';
import { SERVICE_PACKAGES, SERVICE_ADD_ONS } from '../data/packagesData';
import confetti from 'canvas-confetti';

interface ClientResourceHubProps {
  currency: 'MWK' | 'USD';
  setCurrency: (c: 'MWK' | 'USD') => void;
  onOpenBooking: (packageId?: string) => void;
}

export const ClientResourceHub: React.FC<ClientResourceHubProps> = ({
  currency,
  setCurrency,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'ratecard' | 'brief'>('ratecard');

  // Creative Brief Form State
  const [projectTitle, setProjectTitle] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState<CreativeBriefSubmission['projectType']>('Brand Film');
  const [budgetTierMWK, setBudgetTierMWK] = useState('MK 500,000 - MK 1,000,000 ($300 - $600)');
  const [targetDeadline, setTargetDeadline] = useState('');
  const [videoDuration, setVideoDuration] = useState('60-90 Seconds');
  const [aspectRatios, setAspectRatios] = useState<string[]>(['16:9 Widescreen Cinema', '9:16 Vertical Reel (Instagram/TikTok)']);
  const [projectGoals, setProjectGoals] = useState('');
  const [visualStyleNotes, setVisualStyleNotes] = useState('');
  const [locationScope, setLocationScope] = useState('Mzuzu & Northern Region, Malawi');

  const [briefSubmitted, setBriefSubmitted] = useState<CreativeBriefSubmission | null>(null);

  const toggleAspectRatio = (ratio: string) => {
    setAspectRatios((prev) =>
      prev.includes(ratio) ? prev.filter((r) => r !== ratio) : [...prev, ratio]
    );
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !clientName.trim() || !phone.trim()) {
      alert('Please fill out the project title, contact name, and phone number.');
      return;
    }

    const brief: CreativeBriefSubmission = {
      id: `BRF-${Math.floor(1000 + Math.random() * 9000)}`,
      projectTitle,
      organizationName: organizationName || 'Private Client',
      clientName,
      email,
      phone,
      projectType,
      budgetTierMWK,
      targetDeadline: targetDeadline || 'Flexible / TBD',
      videoDuration,
      aspectRatios,
      projectGoals,
      visualStyleNotes,
      locationScope,
      createdAt: new Date().toISOString(),
    };

    setBriefSubmitted(brief);
    
    // Automatically trigger PDF download
    generateProjectBriefPDF(brief);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {}
  };

  const generateWhatsAppBriefLink = (brief: CreativeBriefSubmission) => {
    const text = encodeURIComponent(
      `*MACANAN CREATIVE VIDEO BRIEF*\n\n` +
      `*Ref:* ${brief.id}\n` +
      `*Project:* ${brief.projectTitle}\n` +
      `*Org / Client:* ${brief.organizationName} (${brief.clientName})\n` +
      `*Scope:* ${brief.projectType} • ${brief.videoDuration}\n` +
      `*Budget Range:* ${brief.budgetTierMWK}\n` +
      `*Target Deadline:* ${brief.targetDeadline}\n` +
      `*Deliverables:* ${brief.aspectRatios.join(', ')}\n` +
      `*Location:* ${brief.locationScope}\n\n` +
      `*Goals:* ${brief.projectGoals}\n\n` +
      `Hello MACANAN Team! I have generated and submitted this creative brief. Let's discuss production scheduling.`
    );
    return `https://wa.me/265880000000?text=${text}`;
  };

  return (
    <section id="resources" className="py-24 sm:py-32 bg-[#121317] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-white/40" />
            <span className="font-label-caps text-xs text-neutral-400 tracking-[0.25em]">
              CLIENT RESOURCE HUB & TRANSPARENT PRICING
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight mb-4">
            Automated Rate Card & Creative Brief System.
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base font-light">
            We value your time. Instantly access our published 2026 studio rate card or build a structured video production brief in minutes.
          </p>
        </div>

        {/* Tab Selection Switcher */}
        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('ratecard')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-caps tracking-wider transition-all cursor-pointer ${
              activeTab === 'ratecard'
                ? 'bg-white text-[#121317] font-bold shadow-lg'
                : 'bg-[#1a1b1f] text-neutral-400 hover:text-white border border-white/10'
            }`}
            id="tab-btn-ratecard"
          >
            <Download className="w-4 h-4" />
            <span>2026 Studio Rate Card (PDF)</span>
          </button>

          <button
            onClick={() => setActiveTab('brief')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-caps tracking-wider transition-all cursor-pointer ${
              activeTab === 'brief'
                ? 'bg-white text-[#121317] font-bold shadow-lg'
                : 'bg-[#1a1b1f] text-neutral-400 hover:text-white border border-white/10'
            }`}
            id="tab-btn-brief"
          >
            <FileText className="w-4 h-4" />
            <span>Submit Video Creative Brief</span>
          </button>
        </div>

        {/* TAB 1: RATE CARD DOWNLOAD & LIVE TABLE */}
        {activeTab === 'ratecard' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Top Action Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#16171b] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-md text-[11px] font-caps text-neutral-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  OFFICIAL 2026 DOCUMENT
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                  Studio Price List & Equipment Pedigree
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mt-1 font-light">
                  Includes full breakdown of photography tiers, cinema motion packages, drone flight rates, terms of service, and gear manifest.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                {/* Currency Switcher */}
                <div className="flex bg-[#121317] border border-white/15 rounded-lg p-1 text-xs">
                  <button
                    onClick={() => setCurrency('MWK')}
                    className={`px-3 py-1.5 rounded font-caps font-bold transition-all ${
                      currency === 'MWK' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    MWK (MK)
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1.5 rounded font-caps font-bold transition-all ${
                      currency === 'USD' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    USD ($)
                  </button>
                </div>

                {/* Instant PDF Download Button */}
                <button
                  onClick={() => generateRateCardPDF(currency)}
                  className="px-6 py-3 bg-white text-[#121317] hover:bg-neutral-200 font-caps text-xs font-bold tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                  id="btn-download-ratecard-full"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD PDF</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Rate Card Table */}
            <div className="bg-[#16171b] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 bg-[#121317] border-b border-white/10 flex items-center justify-between">
                <span className="font-caps text-xs font-bold text-white tracking-wider">
                  PUBLISHED PACKAGES & PRICING
                </span>
                <span className="text-[11px] text-neutral-400 font-caps">
                  Displaying in {currency === 'MWK' ? 'Malawian Kwacha (MK)' : 'United States Dollars ($)'}
                </span>
              </div>

              <div className="divide-y divide-white/5">
                {SERVICE_PACKAGES.map((pkg) => {
                  const priceFormatted = currency === 'MWK'
                    ? `MK ${pkg.priceMWK.toLocaleString()}`
                    : `$${pkg.priceUSD.toLocaleString()}`;

                  return (
                    <div key={pkg.id} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-caps px-2 py-0.5 bg-white/10 rounded text-neutral-300">
                            {pkg.category}
                          </span>
                          <span className="text-xs text-neutral-500 font-caps">{pkg.duration}</span>
                        </div>
                        <h4 className="font-display text-lg font-bold text-white">{pkg.title}</h4>
                        <p className="text-xs text-neutral-400 font-light">{pkg.subtitle}</p>
                      </div>

                      <div className="flex items-center justify-between lg:justify-end gap-6 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                        <div className="text-right">
                          <div className="font-display text-xl font-extrabold text-white">{priceFormatted}</div>
                          <span className="text-[10px] text-neutral-500 font-caps">Net Price</span>
                        </div>

                        <button
                          onClick={() => onOpenBooking(pkg.id)}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-caps font-semibold tracking-wider transition-colors"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Studio Gear & Terms of Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-[#16171b] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white font-caps tracking-wider">
                  <Camera className="w-4 h-4 text-neutral-400" />
                  <span>Official Gear Manifest</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-1.5 font-light">
                  <li>• Cinema Line: Sony FX3, FX6 (4K 120p, 10-Bit 4:2:2 S-Log3)</li>
                  <li>• Still Bodies: Sony Alpha 1 (50.1MP), Leica SL2-S, Hasselblad X2D</li>
                  <li>• Prime Glass: Sony G-Master (24mm, 35mm, 50mm f/1.2, 85mm, 70-200mm f/2.8)</li>
                  <li>• Aerial Rig: DJI Mavic 3 Cine with Apple ProRes & Hasselblad optics</li>
                  <li>• Cinema Lighting: Aputure 600d Pro, Nanlite Pavotube II RGBWW, C-Stands</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-[#16171b] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white font-caps tracking-wider">
                  <Shield className="w-4 h-4 text-neutral-400" />
                  <span>Production Protocol & Terms</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-1.5 font-light">
                  <li>• 50% non-refundable retainer reserves date and creative crew.</li>
                  <li>• Balance due upon final color-graded master review and delivery.</li>
                  <li>• Rush 24h/48h delivery available on priority bookings.</li>
                  <li>• Raw unedited footage/photos retained in studio archives for 24 months.</li>
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE VIDEO CREATIVE BRIEF BUILDER */}
        {activeTab === 'brief' && (
          <div className="bg-[#16171b] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl animate-fade-in">
            {!briefSubmitted ? (
              <form onSubmit={handleBriefSubmit} className="space-y-8">
                
                <div className="border-b border-white/10 pb-6">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Submit Video & Creative Project Brief
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light">
                    For corporate films, NGO documentaries, music videos, commercials, and high-impact campaigns. Fill out this brief to receive a formal production proposal and downloadable PDF spec.
                  </p>
                </div>

                {/* Section 1: Client & Project Info */}
                <div className="space-y-4">
                  <span className="text-xs font-caps font-bold text-white tracking-wider block">
                    1. Project Overview & Client Details
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-caps text-neutral-400 block mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2026 Lake Malawi Tourism Brand Film"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-caps text-neutral-400 block mb-1">
                        Organization / Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Highland Escapes / Private Foundation"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-caps text-neutral-400 block mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kondwani Chirwa"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-caps text-neutral-400 block mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+265 88 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Production Parameters */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <span className="text-xs font-caps font-bold text-white tracking-wider block">
                    2. Scope & Target Deliverables
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-caps text-neutral-400 block mb-1">
                        Project Type
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value as any)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                      >
                        <option value="Brand Film">Brand Film / Commercial</option>
                        <option value="Documentary / NGO">Documentary / NGO Story</option>
                        <option value="Music Video">Cinematic Music Video</option>
                        <option value="Event Highlight">Event & Gala Recap</option>
                        <option value="Commercial Product">Commercial Product</option>
                        <option value="Aerial Survey">Aerial & Real Estate Survey</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-caps text-neutral-400 block mb-1">
                        Target Duration
                      </label>
                      <select
                        value={videoDuration}
                        onChange={(e) => setVideoDuration(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                      >
                        <option value="30-60 Seconds (Ad Spot)">30-60 Seconds (Ad Spot)</option>
                        <option value="2-3 Minutes (Hero Film)">2-3 Minutes (Hero Film)</option>
                        <option value="5-10 Minutes (Mini-Doc)">5-10 Minutes (Mini-Doc)</option>
                        <option value="15+ Minutes (Full Feature)">15+ Minutes (Full Feature)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-caps text-neutral-400 block mb-1">
                        Estimated Budget Tier
                      </label>
                      <select
                        value={budgetTierMWK}
                        onChange={(e) => setBudgetTierMWK(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                      >
                        <option value="MK 350,000 - MK 650,000 ($200 - $400)">MK 350k - MK 650k ($200 - $400)</option>
                        <option value="MK 750,000 - MK 1,500,000 ($450 - $900)">MK 750k - MK 1.5M ($450 - $900)</option>
                        <option value="MK 1,800,000 - MK 3,500,000 ($1,100 - $2,100)">MK 1.8M - MK 3.5M ($1,100 - $2,100)</option>
                        <option value="MK 4,000,000+ ($2,500+ Enterprise)">MK 4.0M+ ($2,500+ Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  {/* Aspect Ratio Checkboxes */}
                  <div>
                    <label className="text-xs font-caps text-neutral-400 block mb-2">
                      Required Formats & Aspect Ratios
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        '16:9 Widescreen (YouTube, Cinema, TV)',
                        '9:16 Vertical Reel (Instagram, TikTok)',
                        '1:1 Square (Feed & Ads)',
                      ].map((ratio) => {
                        const isChecked = aspectRatios.includes(ratio);
                        return (
                          <div
                            key={ratio}
                            onClick={() => toggleAspectRatio(ratio)}
                            className={`p-3 rounded-lg border cursor-pointer text-xs flex items-center gap-2 transition-all ${
                              isChecked
                                ? 'bg-white/10 border-white text-white font-semibold'
                                : 'bg-[#121317] border-white/10 text-neutral-400'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] ${
                              isChecked ? 'bg-white text-black border-white' : 'border-neutral-500'
                            }`}>
                              {isChecked ? '✓' : ''}
                            </span>
                            <span>{ratio}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Section 3: Creative Narrative & Vision */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <span className="text-xs font-caps font-bold text-white tracking-wider block">
                    3. Creative Narrative & Visual Intent
                  </span>

                  <div>
                    <label className="text-xs font-caps text-neutral-400 block mb-1">
                      Project Objective / Key Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="What is the story or core message you want the audience to feel and act upon?"
                      value={projectGoals}
                      onChange={(e) => setProjectGoals(e.target.value)}
                      className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-caps text-neutral-400 block mb-1">
                      Visual References / Mood (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any cinematic references, music tempo, tone of voice, or specific locations in Malawi/abroad..."
                      value={visualStyleNotes}
                      onChange={(e) => setVisualStyleNotes(e.target.value)}
                      className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit & Generate Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#121317] hover:bg-neutral-200 font-caps text-xs font-bold tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-submit-brief"
                  >
                    <FileText className="w-4 h-4" />
                    <span>GENERATE & DOWNLOAD CREATIVE BRIEF (PDF)</span>
                  </button>
                </div>

              </form>
            ) : (
              /* Success & Transmit State */
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-8 h-8" />
                </div>

                <div className="max-w-lg mx-auto space-y-2">
                  <span className="font-label-caps text-xs text-emerald-400 tracking-widest">
                    BRIEF GENERATED & READY
                  </span>
                  <h4 className="font-display text-3xl font-extrabold text-white">
                    {briefSubmitted.projectTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light">
                    Your official project specification document has been prepared with reference <span className="font-bold text-white">#{briefSubmitted.id}</span>.
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto pt-2">
                  <a
                    href={generateWhatsAppBriefLink(briefSubmitted)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-caps text-xs font-bold tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>1-Click Transmit via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => generateProjectBriefPDF(briefSubmitted)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-caps text-xs font-bold tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Re-Download Brief PDF</span>
                  </button>
                </div>

                <button
                  onClick={() => setBriefSubmitted(null)}
                  className="text-xs text-neutral-400 hover:text-white font-caps tracking-wider underline pt-4"
                >
                  Create Another Brief
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
