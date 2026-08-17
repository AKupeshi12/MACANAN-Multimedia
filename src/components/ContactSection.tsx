import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Wedding Photography & Film');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {}
  };

  const whatsappDirectUrl = `https://wa.me/265880000000?text=${encodeURIComponent(
    'Hello MACANAN Studio! I would like to inquire about your photography and cinematic film services in Mzuzu.'
  )}`;

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#121317] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Studio Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-white/40" />
                <span className="font-label-caps text-xs text-neutral-400 tracking-[0.25em]">
                  STUDIO INQUIRIES & BOOKING
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Let's Craft <br />
                <span className="text-neutral-400 font-normal">Your Visual Legacy.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                Whether planning an intimate wedding in Nkhata Bay, a grand celebration in Lilongwe, or an executive portrait in our Mzuzu studio, we invite you to connect.
              </p>
            </div>

            {/* Studio Details */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#16171b] border border-white/10">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white font-caps tracking-wider mb-1">Studio Headquarters</h4>
                  <p className="text-xs text-neutral-400">MACANAN Multimedia Studio, Mzuzu City Center, Malawi</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Available for nationwide & international travel</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#16171b] border border-white/10">
                <Phone className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white font-caps tracking-wider mb-1">Direct Line & WhatsApp</h4>
                  <p className="text-xs text-neutral-300 font-mono">+265 880 000 000 / +265 990 000 000</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Mon – Sat, 08:00 – 18:00 CAT</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#16171b] border border-white/10">
                <Mail className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white font-caps tracking-wider mb-1">Electronic Correspondence</h4>
                  <p className="text-xs text-neutral-300">hello@macanan.com • bookings@macanan.com</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Fast Connect */}
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#16171b] hover:bg-[#1f2026] text-white border border-white/20 rounded-xl text-xs font-caps font-bold tracking-wider transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Instant WhatsApp Studio Chat</span>
            </a>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-[#16171b] border border-white/15 shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      Send a Direct Studio Message
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Our creative production lead will reply within 4 business hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-caps text-neutral-400 block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alinane Gondwe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-caps text-neutral-400 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alinane@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-caps text-neutral-400 block mb-1">
                      Desired Production Category
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                    >
                      <option value="Wedding Photography & Film">Wedding Photography & Cinematic Film</option>
                      <option value="Graduation Editorial">Graduation Editorial Session</option>
                      <option value="Corporate / Executive Headshots">Corporate & Executive Headshots</option>
                      <option value="Commercial Brand Video">Commercial Brand Video / NGO Story</option>
                      <option value="Drone Aerial Survey">4K Drone Aerial Coverage</option>
                      <option value="Couple / Engagement Shoot">Couple & Engagement Shoot</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-caps text-neutral-400 block mb-1">
                      Tell Us About Your Vision & Timeline *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Share details regarding dates, event location, guest count, or visual mood requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#121317] border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-white text-[#121317] hover:bg-neutral-200 font-caps text-xs font-bold tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-send-contact-message"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND STUDIO INQUIRY</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-6 text-center py-12">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-emerald-400 tracking-widest block mb-1">
                      MESSAGE TRANSMITTED
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      Thank You, {name}!
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md mx-auto">
                      Your inquiry has been received at the Mzuzu studio. Our production manager will contact you promptly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-caps"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
