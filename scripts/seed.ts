import { config } from "dotenv";
config({ path: ".env.local" });
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin";
import SiteSetting from "../models/SiteSetting";
import Service from "../models/Service";
import Testimonial from "../models/Testimonial";

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed the admin user");
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await Admin.create({ email: ADMIN_EMAIL.toLowerCase(), passwordHash });
    console.log(`Created admin user: ${ADMIN_EMAIL}`);
  } else {
    console.log("Admin user already exists, skipping.");
  }

  const existingSettings = await SiteSetting.findOne();
  if (!existingSettings) {
    await SiteSetting.create({
      phone: "757-718-0117",
      email: "hamptonroadsepoxy@gmail.com",
      address: "Hampton Roads",
      businessName: "Hampton Roads Epoxy",
      ownerName: "Orlando Navarrete",
      facebookUrl: "",
      instagramUrl: "",
    });
    console.log("Created default site settings.");
  } else {
    console.log("Site settings already exist, skipping.");
  }

  const defaultServices = [
    {
      title: "Metallic Epoxy Flooring",
      slug: "metallic-epoxy-flooring",
      shortDescription:
        "Show-stopping, dimensional metallic finishes that turn ordinary concrete into a work of art.",
      description:
        "Our metallic epoxy flooring system uses reflective mineral pigments suspended in a high-build epoxy resin to create swirling, three-dimensional patterns unlike any other flooring option. It's a favorite for showrooms, luxury garages, retail spaces, and any surface meant to make an impression. Every metallic floor is unique, hand-finished by our team, and built on a fully prepared substrate for long-term durability.",
      features: [
        "Unique, one-of-a-kind visual patterns",
        "High-gloss, dimensional finish",
        "Excellent durability for garages and commercial floors",
        "Resistant to stains, chemicals, and hot tires",
        "Custom color blending available",
      ],
      order: 1,
    },
    {
      title: "Quartz Epoxy Flooring",
      slug: "quartz-epoxy-flooring",
      shortDescription:
        "A durable, slip-resistant broadcast system built for high-traffic residential and commercial floors.",
      description:
        "Quartz epoxy flooring combines colored quartz granules with a resilient epoxy binder to create a textured, slip-resistant surface that stands up to heavy foot traffic, moisture, and daily wear. It's an excellent choice for garages, basements, patios, pool decks, and commercial entryways where durability and safety matter as much as appearance.",
      features: [
        "Slip-resistant textured surface",
        "Wide range of color blends",
        "Ideal for garages, patios, and pool decks",
        "Withstands heavy foot and vehicle traffic",
        "Low-maintenance, long-lasting finish",
      ],
      order: 2,
    },
    {
      title: "Epoxy Flooring",
      slug: "epoxy-flooring",
      shortDescription:
        "Our classic solid-color and flake epoxy systems — a dependable, budget-conscious upgrade for any concrete floor.",
      description:
        "Traditional epoxy flooring is the trusted foundation of our business — a durable, seamless coating system applied over properly prepped concrete. Available in solid colors or decorative flake blends, this system is engineered to resist stains, abrasion, and moisture while giving your garage, basement, warehouse, or commercial space a clean, finished look.",
      features: [
        "Seamless, easy-to-clean surface",
        "Solid color or decorative flake options",
        "Resists oil, chemicals, and abrasion",
        "Great for garages, warehouses, and basements",
        "Long-lasting protection for concrete surfaces",
      ],
      order: 3,
    },
  ];

  for (const service of defaultServices) {
    const existing = await Service.findOne({ slug: service.slug });
    if (!existing) {
      await Service.create(service);
      console.log(`Created service: ${service.title}`);
    } else {
      console.log(`Service already exists: ${service.title}, skipping.`);
    }
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany([
      {
        name: "DEMO — Sarah M.",
        location: "Virginia Beach, VA",
        quote:
          "[Demo placeholder testimonial] Our garage floor looks incredible — the metallic finish is even better than the photos we saw online. The crew was professional and cleaned up perfectly.",
        rating: 5,
        isDemo: true,
      },
      {
        name: "DEMO — James R.",
        location: "Chesapeake, VA",
        quote:
          "[Demo placeholder testimonial] Fast, clean installation and the quartz floor has held up perfectly in our shop for months now. Highly recommend Hampton Roads Epoxy.",
        rating: 5,
        isDemo: true,
      },
      {
        name: "DEMO — Linda K.",
        location: "Norfolk, VA",
        quote:
          "[Demo placeholder testimonial] The team was easy to work with from quote to completion. Our basement floor is now waterproof, durable, and looks fantastic.",
        rating: 5,
        isDemo: true,
      },
    ]);
    console.log("Created demo testimonials.");
  } else {
    console.log("Testimonials already exist, skipping.");
  }

  await mongoose.disconnect();
  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
