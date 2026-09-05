import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/getSiteSettings";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header phone={settings.phone} phoneHref={settings.phoneHref} />
      <main className="flex-1">{children}</main>
      <Footer
        phone={settings.phone}
        phoneHref={settings.phoneHref}
        email={settings.email}
        emailHref={settings.emailHref}
        address={settings.address}
      />
    </>
  );
}
