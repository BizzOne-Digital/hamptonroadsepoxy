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
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
    ],
    idealFor: ["Luxury garages", "Showrooms & retail floors", "Basements & living spaces", "Restaurants & lobbies"],
  },
  "quartz-epoxy-flooring": {
    heroImage:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1604709177595-ee9c2580e9c8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1565193298357-c5b46d47f1e6?auto=format&fit=crop&w=900&q=80",
    ],
    idealFor: ["Garages & driveways", "Pool decks & patios", "Commercial entryways", "Basements"],
  },
  "epoxy-flooring": {
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
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
