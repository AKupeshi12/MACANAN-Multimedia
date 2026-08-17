export type PortfolioCategory = 
  | 'ALL' 
  | 'WEDDINGS' 
  | 'COUPLE SHOOTS' 
  | 'EVENTS' 
  | 'DRONE' 
  | 'PORTRAITS' 
  | 'COMMERCIAL';

export interface CameraMetadata {
  camera: string;
  lens: string;
  settings: string;
  resolution: string;
  location: string;
  year: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'ALL'>;
  imageUrl: string;
  aspectRatio: 'portrait' | 'landscape' | 'square' | 'cinematic';
  description: string;
  client?: string;
  metadata: CameraMetadata;
  colorGradeLogUrl?: string; // For before/after log vs film grade comparison
  featured?: boolean;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  priceMWK: number;
  priceUSD: number;
  description: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  category: 'WEDDINGS' | 'PORTRAITS' | 'EVENTS' | 'COMMERCIAL' | 'DRONE';
  subtitle: string;
  priceMWK: number;
  priceUSD: number;
  duration: string;
  deliverables: string[];
  features: string[];
  popular?: boolean;
  idealFor: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  label: string; // e.g. "Morning Golden Hour (06:30 - 08:30)", "Studio Session (10:00 - 12:00)", "Sunset Twilight (16:30 - 18:00)"
  isPopular?: boolean;
  type: 'golden_hour' | 'studio' | 'midday' | 'sunset';
}

export interface BookingSubmission {
  id: string;
  packageId: string;
  packageName: string;
  date: string;
  timeSlot: string;
  location: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientWhatsapp: string;
  addOns: string[];
  specialNotes?: string;
  currency: 'MWK' | 'USD';
  totalPrice: number;
  createdAt: string;
}

export interface CreativeBriefSubmission {
  id: string;
  projectTitle: string;
  organizationName: string;
  clientName: string;
  email: string;
  phone: string;
  projectType: 'Brand Film' | 'Documentary / NGO' | 'Music Video' | 'Event Highlight' | 'Commercial Product' | 'Aerial Survey';
  budgetTierMWK: string;
  targetDeadline: string;
  videoDuration: string;
  aspectRatios: string[];
  projectGoals: string;
  visualStyleNotes: string;
  locationScope: string;
  createdAt: string;
}
