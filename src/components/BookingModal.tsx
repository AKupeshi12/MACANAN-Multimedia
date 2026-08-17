import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, MapPin, Check, ArrowRight, ArrowLeft, 
  Sparkles, MessageSquare, Download, CheckCircle2, DollarSign,
  Plus, CheckSquare, Square
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICE_PACKAGES, SERVICE_ADD_ONS, AVAILABLE_TIME_SLOTS, STUDIO_LOCATIONS } from '../data/packagesData';
import { BookingSubmission } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  currency: 'MWK' | 'USD';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
  currency,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(initialPackageId || SERVICE_PACKAGES[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toISOString().split('T')[0];
  });
  const [selectedSlotId, setSelectedSlotId] = useState<string>(AVAILABLE_TIME_SLOTS[0].id);
  const [selectedLocation, setSelectedLocation] = useState<string>(STUDIO_LOCATIONS[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  // Client Contact Details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);

  // Sync initialPackageId if changed
  useEffect(() => {
    if (initialPackageId) {
      setSelectedPkgId(initialPackageId);
    }
  }, [initialPackageId]);

  if (!isOpen) return null;

  const currentPackage = SERVICE_PACKAGES.find((p) => p.id === selectedPkgId) || SERVICE_PACKAGES[0];
  const currentSlot = AVAILABLE_TIME_SLOTS.find((s) => s.id === selectedSlotId) || AVAILABLE_TIME_SLOTS[0];

  // Calculate dynamic total price
  const calculateTotal = () => {
    let base = currency === 'MWK' ? currentPackage.priceMWK : currentPackage.priceUSD;
    selectedAddOns.forEach((addonId) => {
      const addon = SERVICE_ADD_ONS.find((a) => a.id === addonId);
      if (addon) {
        base += currency === 'MWK' ? addon.priceMWK : addon.priceUSD;
      }
    });
    return base;
  };

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      // Validate inputs
      if (!clientName.trim() || (!clientPhone.trim() && !clientWhatsapp.trim())) {
        alert('Please provide your name and phone/WhatsApp number so we can confirm your booking.');
        return;
      }

      const total = calculateTotal();
      const submission: BookingSubmission = {
        id: `MCN-${Math.floor(100000 + Math.random() * 900000)}`,
        packageId: currentPackage.id,
        packageName: currentPackage.title,
        date: selectedDate,
        timeSlot: currentSlot.label,
        location: selectedLocation,
        clientName,
        clientEmail,
        clientPhone: clientPhone || clientWhatsapp,
        clientWhatsapp: clientWhatsapp || clientPhone,
        addOns: selectedAddOns.map((id) => SERVICE_ADD_ONS.find((a) => a.id === id)?.name || id),
        specialNotes,
        currency,
        totalPrice: total,
        createdAt: new Date().toISOString(),
      };

      setConfirmedBooking(submission);
      setStep(4);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#10b981', '#fbbf24'],
        });
      } catch (e) {
        // Safe fallback
      }
    } else {
      setStep((prev) => (prev + 1) as any);
    }
  };

  // Google Calendar Integration
  const generateGoogleCalendarLink = () => {
    if (!confirmedBooking) return '#';
    const dateFormatted = confirmedBooking.date.replace(/-/g, '');
    const title = encodeURIComponent(`MACANAN Session: ${confirmedBooking.packageName}`);
    const details = encodeURIComponent(
      `Booking Ref: ${confirmedBooking.id}\nPackage: ${confirmedBooking.packageName}\nLocation: ${confirmedBooking.location}\nTime: ${confirmedBooking.timeSlot}\nTotal: ${confirmedBooking.currency} ${confirmedBooking.totalPrice.toLocaleString()}\nStudio WhatsApp: +265 880 000 000`
    );
    const location = encodeURIComponent(confirmedBooking.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateFormatted}T090000Z/${dateFormatted}T110000Z&details=${details}&location=${location}`;
  };

  // WhatsApp 1-Click Message Generator
  const generateWhatsAppLink = () => {
    if (!confirmedBooking) return '#';
    const message = encodeURIComponent(
      `*MACANAN 1-CLICK BOOKING REQUEST*\n\n` +
      `*Ref:* ${confirmedBooking.id}\n` +
      `*Client:* ${confirmedBooking.clientName}\n` +
      `*Package:* ${confirmedBooking.packageName}\n` +
      `*Date:* ${confirmedBooking.date}\n` +
      `*Time Slot:* ${confirmedBooking.timeSlot}\n` +
      `*Location:* ${confirmedBooking.location}\n` +
      `*Add-ons:* ${confirmedBooking.addOns.length > 0 ? confirmedBooking.addOns.join(', ') : 'None'}\n` +
      `*Estimated Total:* ${confirmedBooking.currency} ${confirmedBooking.totalPrice.toLocaleString()}\n\n` +
      `Hello MACANAN Team! I have reserved this session via your website pipeline. Please confirm studio availability.`
    );
    return `https://wa.me/265880000000?text=${message}`;
  };

  // ICS Calendar file download
  const downloadIcsFile = () => {
    if (!confirmedBooking) return;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MACANAN MULTIMEDIA//MZUZU STUDIO//EN',
      'BEGIN:VEVENT',
      `UID:${confirmedBooking.id}@macanan.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${confirmedBooking.date.replace(/-/g, '')}T090000Z`,
      `DTEND:${confirmedBooking.date.replace(/-/g, '')}T110000Z`,
      `SUMMARY:MACANAN Session - ${confirmedBooking.packageName}`,
      `DESCRIPTION:Booking Ref: ${confirmedBooking.id}\\nLocation: ${confirmedBooking.location}\\nTotal: ${confirmedBooking.currency} ${confirmedBooking.totalPrice.toLocaleString()}`,
      `LOCATION:${confirmedBooking.location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MACANAN_SESSION_${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#16171b] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#121317] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight">
                1-Click Social-to-Booking Pipeline
              </h3>
              <p className="text-[11px] text-neutral-400 font-caps tracking-wider">
                MACANAN MULTIMEDIA • MZUZU STUDIO
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-[#141519] text-center text-xs font-caps">
          {[
            { num: 1, label: 'Package' },
            { num: 2, label: 'Date & Slot' },
            { num: 3, label: 'Details' },
            { num: 4, label: 'Confirmed' },
          ].map((s) => (
            <div
              key={s.num}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                step === s.num
                  ? 'border-white text-white font-bold bg-white/5'
                  : step > s.num
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-neutral-500'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                step === s.num ? 'bg-white text-black' : step > s.num ? 'bg-emerald-500 text-black' : 'bg-white/10 text-neutral-400'
              }`}>
                {step > s.num ? '✓' : s.num}
              </span>
              <span className="hidden sm:inline tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: PACKAGE SELECTOR */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display text-xl font-bold text-white">Select Your Session Package</h4>
                  <p className="text-xs text-neutral-400">Choose from our curated studio and on-location experiences.</p>
                </div>
                <div className="text-right text-xs font-caps text-neutral-400">
                  Showing in: <span className="text-white font-bold">{currency}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICE_PACKAGES.map((pkg) => {
                  const isSelected = selectedPkgId === pkg.id;
                  const priceStr = currency === 'MWK' 
                    ? `MK ${pkg.priceMWK.toLocaleString()}` 
                    : `$${pkg.priceUSD.toLocaleString()}`;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#1e2026] border-white ring-1 ring-white/50 shadow-xl'
                          : 'bg-[#121317] border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] font-caps text-neutral-400 tracking-wider">
                          {pkg.category} • {pkg.duration}
                        </span>
                        {pkg.popular && (
                          <span className="text-[9px] font-caps font-bold px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded">
                            Popular
                          </span>
                        )}
                      </div>

                      <h5 className="font-display text-base font-bold text-white mb-1">{pkg.title}</h5>
                      <p className="text-xs text-neutral-400 mb-4 line-clamp-2">{pkg.subtitle}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="font-display text-lg font-bold text-white">{priceStr}</div>
                        <div className={`text-xs font-caps px-3 py-1 rounded ${
                          isSelected ? 'bg-white text-black font-bold' : 'bg-white/10 text-neutral-300'
                        }`}>
                          {isSelected ? 'Selected' : 'Select'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SLOT & LOCATION */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-display text-xl font-bold text-white">Choose Date, Time & Setting</h4>
                <p className="text-xs text-neutral-400">Lock in your golden hour or dedicated studio slot.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Picker */}
                <div className="space-y-3">
                  <label className="text-xs font-caps text-neutral-300 tracking-wider block">
                    1. Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white"
                  />

                  {/* Quick Select Buttons */}
                  <div className="flex gap-2 text-xs font-caps">
                    {[
                      { label: 'This Weekend', days: 2 },
                      { label: 'Next Week', days: 7 },
                      { label: 'Next Month', days: 30 },
                    ].map((btn, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + btn.days);
                          setSelectedDate(d.toISOString().split('T')[0]);
                        }}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-neutral-300 text-[11px]"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* Location Selector */}
                  <div className="pt-4 space-y-2">
                    <label className="text-xs font-caps text-neutral-300 tracking-wider block">
                      3. Shoot Location / Ambience
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white"
                    >
                      {STUDIO_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc} className="bg-[#121317] text-white">
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-3">
                  <label className="text-xs font-caps text-neutral-300 tracking-wider block">
                    2. Select Daily Shooting Window
                  </label>
                  
                  <div className="space-y-2.5">
                    {AVAILABLE_TIME_SLOTS.map((slot) => {
                      const isSelected = selectedSlotId === slot.id;
                      return (
                        <div
                          key={slot.id}
                          onClick={() => setSelectedSlotId(slot.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-[#1e2026] border-white ring-1 ring-white/50 text-white'
                              : 'bg-[#121317] border-white/10 text-neutral-300 hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Clock className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-neutral-500'}`} />
                            <div>
                              <div className="text-xs font-bold font-caps">{slot.time}</div>
                              <div className="text-[11px] text-neutral-400">{slot.label}</div>
                            </div>
                          </div>

                          {slot.isPopular && (
                            <span className="text-[9px] px-2 py-0.5 bg-white/10 text-neutral-300 rounded font-caps">
                              Prime
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ADD-ONS & CONTACT INFORMATION */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-display text-xl font-bold text-white">Add-Ons & Client Details</h4>
                <p className="text-xs text-neutral-400">Complete your reservation details for immediate studio confirmation.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Contact Info */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="text-xs font-caps text-neutral-300 tracking-wider block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kondwani Phiri"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-caps text-neutral-300 tracking-wider block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="kondwani@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-caps text-neutral-300 tracking-wider block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+265 88 123 4567"
                        value={clientWhatsapp}
                        onChange={(e) => setClientWhatsapp(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-caps text-neutral-300 tracking-wider block mb-1">
                      Special Creative Requests or Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Graduation gown color, number of family members joining, specific mood/lighting preferences..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Right: Optional Add-ons & Live Total */}
                <div className="lg:col-span-5 space-y-4">
                  <label className="text-xs font-caps text-neutral-300 tracking-wider block">
                    Optional Production Enhancements
                  </label>

                  <div className="space-y-2">
                    {SERVICE_ADD_ONS.map((addon) => {
                      const isAdded = selectedAddOns.includes(addon.id);
                      const priceText = currency === 'MWK' 
                        ? `+MK ${addon.priceMWK.toLocaleString()}` 
                        : `+$${addon.priceUSD}`;

                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddOn(addon.id)}
                          className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between text-xs transition-colors ${
                            isAdded
                              ? 'bg-white/10 border-white text-white'
                              : 'bg-[#121317] border-white/10 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isAdded ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-neutral-600" />}
                            <span className="font-semibold">{addon.name}</span>
                          </div>
                          <span className="font-bold text-neutral-200">{priceText}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-[#121317] border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>Package:</span>
                      <span className="text-white font-semibold">{currentPackage.title}</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>Date & Time:</span>
                      <span className="text-white">{selectedDate} ({currentSlot.time})</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                      <span className="text-xs font-caps text-neutral-300">Estimated Total:</span>
                      <span className="font-display text-xl font-bold text-white">
                        {currency === 'MWK' 
                          ? `MK ${calculateTotal().toLocaleString()}` 
                          : `$${calculateTotal().toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION & 1-CLICK SOCIAL SYNC */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-8 py-4 text-center">
              
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="font-label-caps text-xs text-emerald-400 tracking-widest">
                  BOOKING PIPELINE INITIATED
                </span>
                <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  You're Ready, {confirmedBooking.clientName}!
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300">
                  Your session request for <span className="text-white font-bold">{confirmedBooking.packageName}</span> on <span className="text-white font-bold">{confirmedBooking.date}</span> at <span className="text-white font-bold">{confirmedBooking.timeSlot}</span> has been logged.
                </p>
                <div className="inline-block px-3 py-1 bg-white/10 rounded-md text-xs font-caps text-neutral-300">
                  Booking Ref: #{confirmedBooking.id}
                </div>
              </div>

              {/* 1-Click Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
                {/* 1. Direct WhatsApp Ping */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-caps text-xs font-bold tracking-wider rounded-xl transition-all shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>1-Click WhatsApp Sync</span>
                </a>

                {/* 2. Add to Google Calendar */}
                <a
                  href={generateGoogleCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-caps text-xs font-bold tracking-wider rounded-xl transition-all"
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Google Calendar</span>
                </a>

                {/* 3. Download .ICS Calendar File */}
                <button
                  onClick={downloadIcsFile}
                  className="flex items-center justify-center gap-2 p-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-caps text-xs font-bold tracking-wider rounded-xl transition-all"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download .ICS</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#121317] border border-white/10 max-w-xl mx-auto text-left text-xs text-neutral-400 space-y-1">
                <div className="font-bold text-white font-caps text-[11px] mb-1">What Happens Next:</div>
                <p>1. Our creative director in Mzuzu will verify slot lock and review your special requests.</p>
                <p>2. A 50% deposit link or bank transfer detail will be provided to finalize your date lock.</p>
                <p>3. You will receive our Prep Guide 48 hours prior to the session.</p>
              </div>

            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="px-6 py-4 bg-[#121317] border-t border-white/10 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-caps text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#121317] hover:bg-neutral-200 rounded-lg text-xs font-caps font-bold tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              <span>{step === 3 ? 'Confirm & Sync Booking' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white text-[#121317] hover:bg-neutral-200 rounded-lg text-xs font-caps font-bold tracking-wider transition-colors"
            >
              Done & Return to Studio
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
