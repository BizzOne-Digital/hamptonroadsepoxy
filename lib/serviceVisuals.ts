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
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380202/hampton-roads-epoxy/services/b1ccohglqokbzwegqhmr.jpg",
    gallery: [
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380202/hampton-roads-epoxy/services/b1ccohglqokbzwegqhmr.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380203/hampton-roads-epoxy/services/g3wev3ihhz7u3zd9yktz.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380204/hampton-roads-epoxy/services/gpeigxpxpx6tm76dxyfx.jpg",
    ],
    idealFor: ["Luxury garages", "Showrooms & retail floors", "Basements & living spaces", "Restaurants & lobbies"],
  },
  "quartz-epoxy-flooring": {
    heroImage:
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380205/hampton-roads-epoxy/services/nkiz16nqf4ad1zoqf5cb.jpg",
    gallery: [
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380204/hampton-roads-epoxy/services/e0ws3zmh2vog9guokync.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380205/hampton-roads-epoxy/services/nkiz16nqf4ad1zoqf5cb.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380206/hampton-roads-epoxy/services/zw6gaxx3cx7jzk9xry5p.jpg",
    ],
    idealFor: ["Garages & driveways", "Pool decks & patios", "Commercial entryways", "Basements"],
  },
  "epoxy-flooring": {
    heroImage:
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380208/hampton-roads-epoxy/services/crlgljwpktxd5p1l8q75.jpg",
    gallery: [
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380207/hampton-roads-epoxy/services/qvlcnb1okzfdeo4wi5t0.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380207/hampton-roads-epoxy/services/iuwswhosauzi9irkmzfi.jpg",
      "https://res.cloudinary.com/difmil8wj/image/upload/v1788380208/hampton-roads-epoxy/services/crlgljwpktxd5p1l8q75.jpg",
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
