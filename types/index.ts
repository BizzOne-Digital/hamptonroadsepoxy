export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface LeadDTO {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export interface BookingDTO {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  address: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
}

export interface GalleryItemDTO {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  publicId: string;
  createdAt: string;
}

export interface ServiceImageDTO {
  url: string;
  publicId: string;
}

export interface ServiceDTO {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  features: string[];
  order: number;
  image?: ServiceImageDTO;
}

export interface TestimonialDTO {
  _id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  isDemo: boolean;
}

export interface SiteSettingDTO {
  phone: string;
  email: string;
  address: string;
  businessName: string;
  ownerName: string;
  facebookUrl?: string;
  instagramUrl?: string;
}
