import Link from "next/link";
import { Users, CalendarCheck, Images, Quote, ArrowUpRight } from "lucide-react";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import Booking from "@/models/Booking";
import Gallery from "@/models/Gallery";
import Testimonial from "@/models/Testimonial";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    await connectDB();
    const [leadCount, bookingCount, galleryCount, testimonialCount, recentLeads, recentBookings] =
      await Promise.all([
        Lead.countDocuments(),
        Booking.countDocuments(),
        Gallery.countDocuments(),
        Testimonial.countDocuments(),
        Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
        Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);
    return {
      leadCount,
      bookingCount,
      galleryCount,
      testimonialCount,
      recentLeads,
      recentBookings,
    };
  } catch {
    return {
      leadCount: 0,
      bookingCount: 0,
      galleryCount: 0,
      testimonialCount: 0,
      recentLeads: [],
      recentBookings: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-3xl text-forest">Dashboard</h1>
        <p className="text-charcoal/60 mt-1">Overview of leads, bookings, and site content.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={stats.leadCount} icon={Users} />
        <StatCard label="Total Bookings" value={stats.bookingCount} icon={CalendarCheck} />
        <StatCard label="Gallery Images" value={stats.galleryCount} icon={Images} />
        <StatCard label="Testimonials" value={stats.testimonialCount} icon={Quote} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-cream p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl text-forest">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs font-semibold text-forest hover:text-gold flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          {stats.recentLeads.length === 0 ? (
            <p className="text-sm text-charcoal/50">No leads yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-cream">
              {stats.recentLeads.map((lead) => (
                <li key={String(lead._id)} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-forest truncate">{lead.name}</p>
                    <p className="text-xs text-charcoal/50 truncate">{lead.service}</p>
                  </div>
                  <StatusBadge status={lead.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-cream p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl text-forest">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-xs font-semibold text-forest hover:text-gold flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          {stats.recentBookings.length === 0 ? (
            <p className="text-sm text-charcoal/50">No bookings yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-cream">
              {stats.recentBookings.map((booking) => (
                <li key={String(booking._id)} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-forest truncate">{booking.name}</p>
                    <p className="text-xs text-charcoal/50 truncate">{booking.preferredDate}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
