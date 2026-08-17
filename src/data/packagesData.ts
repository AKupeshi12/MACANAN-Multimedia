import { ServicePackage, ServiceAddOn, TimeSlot } from '../types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'pkg-grad',
    title: 'GRADUATION EDITORIAL',
    category: 'PORTRAITS',
    subtitle: 'Celebrate your academic milestone with timeless, high-fashion portraiture.',
    priceMWK: 150000,
    priceUSD: 90,
    duration: '90 Minutes',
    idealFor: 'Graduates (Mzuni, Catholic University, UNIMA, LUANAR & private scholars)',
    deliverables: [
      '25 Master Retouched High-Res Digital Portraits',
      '2 Wardrobe Changes (Gown & Formal / Cultural)',
      'Dual Setting: High-End Studio & Architectural Campus',
      'Ultra-Fast 48-Hour Turnaround Delivery',
      'Private High-Speed Password-Protected Gallery'
    ],
    features: [
      'Pro Studio Strobes & Softbox Lighting',
      'Magazine-Grade Skin & Tone Retouching',
      'Print-Ready 300DPI Files + Web Versions',
      'Pose Direction from Creative Lead'
    ],
    popular: true,
  },
  {
    id: 'pkg-headshot',
    title: 'EXECUTIVE & CORPORATE HEADSHOTS',
    category: 'PORTRAITS',
    subtitle: 'Command respect and elevate your brand with refined leadership portraits.',
    priceMWK: 120000,
    priceUSD: 75,
    duration: '60 Minutes',
    idealFor: 'Executives, Consultants, NGO Directors, Doctors, Lawyers & Entrepreneurs',
    deliverables: [
      '10 Master-Retouched Editorial Headshots',
      'Choice of Obsidian Dark, Slate Grey, or Environmental Glass',
      'LinkedIn, Annual Report, & Press Release Crops Included',
      'Commercial Usage & Full Royalty-Free License'
    ],
    features: [
      'Immediate Tethered Laptop Preview on Set',
      'Advanced Blemish & Symmetry Polish',
      'Same-Day Proof Selection Sheet'
    ],
  },
  {
    id: 'pkg-wedding',
    title: 'THE CROWN WEDDING MASTERPIECE',
    category: 'WEDDINGS',
    subtitle: 'Comprehensive photo & cinema coverage of your unforgettable union.',
    priceMWK: 850000,
    priceUSD: 520,
    duration: 'Full Day (Up to 12 Hours)',
    idealFor: 'Couples desiring bespoke, timeless wedding legacy coverage',
    deliverables: [
      '2 Senior Photographers + 2 Cinema DP Videographers',
      '4K Drone Aerial Cinematic Perspectives',
      '5-7 Minute Cinematic 4K Highlight Film (Color-Graded)',
      'Full Ceremony & Reception Extended Documentary Cut',
      '500+ Curated, Color-Graded High-Resolution Images',
      'Luxury Linen-Bound Keepsake Box & Engraved USB Drive'
    ],
    features: [
      'Pre-Wedding Consult & Timeline Curation',
      'Sony FX3 10-Bit 4:2:2 Cinema Audio & Visual Rig',
      '48-Hour "Next-Day" 15-Photo Teaser for Social Media',
      'Worldwide / Nationwide Travel Available'
    ],
    popular: true,
  },
  {
    id: 'pkg-couple',
    title: 'COUPLE & ENGAGEMENT SESSION',
    category: 'PORTRAITS',
    subtitle: 'Quiet luxury, candid romantic intimacy, and cinematic golden hour hues.',
    priceMWK: 180000,
    priceUSD: 110,
    duration: '2 Hours',
    idealFor: 'Engagements, Anniversaries, Honeymooners, and Editorial Couples',
    deliverables: [
      '35 Master Retouched Film-Toned Editorial Photos',
      '60-Second 4K Vertical Cinema Reel for Instagram/TikTok',
      'On-Location (Lake Malawi, Mzuzu Botanic, or Modernist Suites)',
      '2 Wardrobe Transitions'
    ],
    features: [
      'Golden Hour Sunlight & Drone Aerial Composition',
      'Artistic Film Emulation (Kodak Portra / CineStill Color Profiles)',
      'Print Release Certificate'
    ],
  },
  {
    id: 'pkg-drone',
    title: 'DRONE CINEMA & AERIAL SURVEY',
    category: 'DRONE',
    subtitle: 'High-elevation 4K perspectives for estates, resorts, architecture, and landscapes.',
    priceMWK: 220000,
    priceUSD: 135,
    duration: '2 Hours On-Site Flight Time',
    idealFor: 'Architects, Real Estate Developers, Tourism Resorts, and Event Organizers',
    deliverables: [
      '4K 60fps Apple ProRes / D-Log Aerial Footage Master',
      '25 Ultra High-Resolution 20MP DNG Aerial Stills',
      'Fully Color Graded Rec.709 & Clean Log Exports',
      'Licensed & Insured Drone Pilot Flight Protocols'
    ],
    features: [
      'High Wind Stability & Dynamic Orbit Maneuvers',
      'Night-time Long Exposure Aerial Capability',
      'Delivery via Cloud within 24 Hours'
    ],
  },
  {
    id: 'pkg-commercial',
    title: 'COMMERCIAL BRAND & NGO DOCUMENTARY',
    category: 'COMMERCIAL',
    subtitle: 'Impactful visual storytelling engineered to captivate partners, donors, and customers.',
    priceMWK: 750000,
    priceUSD: 460,
    duration: 'Full Day Production (Up to 8 Hours)',
    idealFor: 'Corporations, NGOs, Hospitality Brands, and Creative Innovators',
    deliverables: [
      '2-3 Minute 4K Brand Film with Licensed Music Score',
      '3 Tailored Vertical (9:16) Cutdowns for Digital Ad Campaigns',
      'Wireless Lavalier Cinema Audio & Professional Lighting Kit',
      'Full Commercial Advertising Broadcast Release'
    ],
    features: [
      'Pre-Production Scripting & Storyboard Consultation',
      'Dual-Angle 4K Interview Rig (Sony Cinema Line)',
      'Multi-Platform Aspect Ratio Delivery (16:9, 9:16, 1:1)'
    ],
    popular: true,
  }
];

export const SERVICE_ADD_ONS: ServiceAddOn[] = [
  {
    id: 'addon-drone',
    name: '4K Drone Aerial Add-On',
    priceMWK: 60000,
    priceUSD: 40,
    description: 'Sweeping drone video & still shots added to any shoot package.'
  },
  {
    id: 'addon-rush',
    name: '24-Hour Express Turnaround',
    priceMWK: 45000,
    priceUSD: 30,
    description: 'Front-of-the-queue priority editing with delivery in under 24 hours.'
  },
  {
    id: 'addon-reel',
    name: '60-Sec Cinematic Vertical Video Reel',
    priceMWK: 50000,
    priceUSD: 35,
    description: 'Behind-the-scenes & cinematic social cut graded for Instagram / TikTok.'
  },
  {
    id: 'addon-album',
    name: 'Fine-Art Hardcover Photobook (A4 30-Page)',
    priceMWK: 95000,
    priceUSD: 60,
    description: 'Archival quality matte photobook with debossed linen cover.'
  },
  {
    id: 'addon-extra-look',
    name: 'Extra Wardrobe / Location Extension',
    priceMWK: 35000,
    priceUSD: 25,
    description: 'Adds +45 minutes and 10 extra retouched images.'
  }
];

export const AVAILABLE_TIME_SLOTS: TimeSlot[] = [
  {
    id: 'slot-1',
    time: '06:30 - 08:00',
    label: 'Morning Golden Hour (Natural Dawn Glow)',
    isPopular: true,
    type: 'golden_hour'
  },
  {
    id: 'slot-2',
    time: '09:30 - 11:30',
    label: 'Mid-Morning Studio Precision',
    type: 'studio'
  },
  {
    id: 'slot-3',
    time: '13:00 - 15:00',
    label: 'Afternoon Editorial & Executive',
    type: 'midday'
  },
  {
    id: 'slot-4',
    time: '16:00 - 17:45',
    label: 'Sunset Twilight Golden Glow',
    isPopular: true,
    type: 'sunset'
  }
];

export const STUDIO_LOCATIONS = [
  'MACANAN Studio (Mzuzu City Center)',
  'Mzuzu University Campus & Botanic Arboretums',
  'Grand Pavilion Suite & Modernist Interiors',
  'Nkhata Bay & Lake Malawi Escarpment (Scenic)',
  'Client On-Site / Office / Private Estate',
  'Lilongwe / Blantyre Travel Session (On Request)'
];
