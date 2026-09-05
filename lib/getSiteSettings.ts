import { connectDB } from "@/lib/db";
import SiteSetting from "@/models/SiteSetting";
import { siteConfig } from "@/lib/siteConfig";

export interface SiteSettingsDTO {
  businessName: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
}

// Fetches the single SiteSetting document directly from MongoDB for use in
// Server Components, falling back to the static siteConfig values for any
// field that is missing or empty so the public site never renders blank.
// Callers should mark their page/segment `export const dynamic = "force-dynamic"`
// (matching the pattern used by lib/services.ts's getAllServices()) so an
// admin edit is reflected immediately instead of being served from a cache.
export async function getSiteSettings(): Promise<SiteSettingsDTO> {
  try {
    await connectDB();
    const doc = await SiteSetting.findOne().lean<{
      phone?: string;
      email?: string;
      address?: string;
      businessName?: string;
      facebookUrl?: string;
      instagramUrl?: string;
    }>();

    const phone = doc?.phone || siteConfig.phone;
    const email = doc?.email || siteConfig.email;
    const address = doc?.address || siteConfig.serviceArea;
    const businessName = doc?.businessName || siteConfig.businessName;
    const facebookUrl = doc?.facebookUrl || "";
    const instagramUrl = doc?.instagramUrl || "";

    const digits = phone.replace(/\D/g, "");
    const phoneHref = digits ? `tel:+1${digits}` : siteConfig.phoneHref;
    const emailHref = email ? `mailto:${email}` : siteConfig.emailHref;

    return {
      businessName,
      phone,
      phoneHref,
      email,
      emailHref,
      address,
      facebookUrl,
      instagramUrl,
    };
  } catch (error) {
    console.error("getSiteSettings error, falling back to static siteConfig:", error);
    return {
      businessName: siteConfig.businessName,
      phone: siteConfig.phone,
      phoneHref: siteConfig.phoneHref,
      email: siteConfig.email,
      emailHref: siteConfig.emailHref,
      address: siteConfig.serviceArea,
      facebookUrl: "",
      instagramUrl: "",
    };
  }
}
