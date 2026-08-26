import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone is required").max(20),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(5, "Please tell us a bit more").max(2000),
});

export const bookingSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone is required").max(20),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please choose a preferred date"),
  address: z.string().min(3, "Address is required").max(300),
  notes: z.string().max(2000).optional().default(""),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const gallerySchema = z.object({
  title: z.string().min(1).max(150),
  category: z.string().min(1).max(100),
});

export const serviceImageSchema = z.object({
  url: z.string().min(1),
  publicId: z.string().min(1),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(150),
  slug: z.string().min(1).max(150),
  shortDescription: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  features: z.array(z.string().min(1)).default([]),
  order: z.number().int().default(0),
  image: serviceImageSchema.optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(1).max(150),
  location: z.string().min(1).max(150),
  quote: z.string().min(1).max(1000),
  rating: z.number().int().min(1).max(5),
  isDemo: z.boolean().optional().default(false),
});

export const siteSettingSchema = z.object({
  phone: z.string().min(7).max(20),
  email: z.string().email(),
  address: z.string().min(1).max(300),
  businessName: z.string().min(1).max(200),
  ownerName: z.string().min(1).max(200),
  facebookUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
});

export const leadStatusSchema = z.object({
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]),
});

export const bookingStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});
