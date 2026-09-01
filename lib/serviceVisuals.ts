// Static visual assets (images, "ideal for" tags) keyed by service slug.
// The Service data itself (title, descriptions, features, order) is stored in
// MongoDB and managed from the admin panel — these are presentation-only
// extras that the current Service schema does not persist.

export interface ServiceVisuals {
  heroImage: string;
  gallery: string[];
  idealFor: string[];
}

const DEFAULT_VISUALS: ServiceVisuals = {
  heroImage:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  ],
  idealFor: ["Garages & workshops", "Warehouses", "Basements", "Commercial storage areas"],
};

export const serviceVisuals: Record<string, ServiceVisuals> = {
  "metallic-epoxy-flooring": {
    heroImage:
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788228737/hampton-roads-epoxy/i8nbs5apdfjrkdcunckf.webp",
    gallery: [
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788228737/hampton-roads-epoxy/i8nbs5apdfjrkdcunckf.webp",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788305534/hampton-roads-epoxy/gallery/zrzdqk4cym7t6mfr6xfk.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788305534/hampton-roads-epoxy/gallery/th9vgbjocsbkoylvd1pf.jpg",
    ],
    idealFor: ["Luxury garages", "Showrooms & retail floors", "Basements & living spaces", "Restaurants & lobbies"],
  },
  "quartz-epoxy-flooring": {
    heroImage:
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788222211/hampton-roads-epoxy/gp2ljc9rkmlypira1shn.jpg",
    gallery: [
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788222211/hampton-roads-epoxy/gp2ljc9rkmlypira1shn.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788305534/hampton-roads-epoxy/gallery/khzguz6o42z4xhxfdpj2.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788305534/hampton-roads-epoxy/gallery/ydo3bd2ffuezu2hxkygm.jpg",
    ],
    idealFor: ["Garages & driveways", "Pool decks & patios", "Commercial entryways", "Basements"],
  },
  "epoxy-flooring": {
    heroImage:
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788221942/hampton-roads-epoxy/shhgwcvomm01ctak5erw.jpg",
    gallery: [
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788221942/hampton-roads-epoxy/shhgwcvomm01ctak5erw.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788305534/hampton-roads-epoxy/gallery/hjmjy2osnezly0ln2wc0.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788305534/hampton-roads-epoxy/gallery/xzdit274lwk53s6rifpp.jpg",
    ],
    idealFor: [
      "Patios",
      "Residential Homes",
      "Pool Decks",
      "Driveways",
      "Garages",
      "Basements",
      "Workshops",
      "Warehouses",
      "Commercial Spaces",
      "Retail Stores",
      "Restaurants & Kitchens",
      "Showrooms",
      "Offices",
      "Gyms & Fitness Centres",
      "Auto Shops & Dealerships",
      "Industrial Facilities",
      "Factories & Production Areas",
      "Storage Areas",
      "Walkways & Entryways",
      "Utility & Mechanical Rooms",
    ],
  },
};

export function getServiceVisuals(slug: string): ServiceVisuals {
  return serviceVisuals[slug] ?? DEFAULT_VISUALS;
}
