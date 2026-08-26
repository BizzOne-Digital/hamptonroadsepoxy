import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import { bookingSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sendMail, adminNotificationEmail, customerConfirmationEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const { success } = rateLimit(`booking:${ip}`, 5, 60_000);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    await connectDB();
    const booking = await Booking.create({ ...parsed.data, status: "pending" });

    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await sendMail({
          to: adminEmail,
          subject: `New Consultation Booking: ${parsed.data.name}`,
          html: adminNotificationEmail({
            heading: "New Consultation Booking",
            rows: [
              { label: "Name", value: parsed.data.name },
              { label: "Email", value: parsed.data.email },
              { label: "Phone", value: parsed.data.phone },
              { label: "Service", value: parsed.data.service },
              { label: "Preferred Date", value: parsed.data.preferredDate },
              { label: "Address", value: parsed.data.address },
              { label: "Notes", value: parsed.data.notes || "—" },
            ],
          }),
        });
      }
      await sendMail({
        to: parsed.data.email,
        subject: "Your consultation request — Hampton Roads Epoxy",
        html: customerConfirmationEmail({
          name: parsed.data.name,
          intro:
            "Thanks for booking a consultation with us. We've received your requested date and will confirm shortly.",
        }),
      });
    } catch (emailError) {
      console.error("Booking email send failed:", emailError);
    }

    return NextResponse.json({ success: true, id: booking.id }, { status: 201 });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
