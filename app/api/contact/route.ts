import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { contactSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sendMail, adminNotificationEmail, customerConfirmationEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const { success } = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    await connectDB();
    const lead = await Lead.create({ ...parsed.data, status: "new" });

    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await sendMail({
          to: adminEmail,
          subject: `New Website Lead: ${parsed.data.name}`,
          html: adminNotificationEmail({
            heading: "New Contact Form Lead",
            rows: [
              { label: "Name", value: parsed.data.name },
              { label: "Email", value: parsed.data.email },
              { label: "Phone", value: parsed.data.phone },
              { label: "Service", value: parsed.data.service },
              { label: "Message", value: parsed.data.message },
            ],
          }),
        });
      }
      await sendMail({
        to: parsed.data.email,
        subject: "We received your request — Hampton Roads Epoxy",
        html: customerConfirmationEmail({
          name: parsed.data.name,
          intro:
            "Thanks for reaching out about your epoxy flooring project. Your message has been received.",
        }),
      });
    } catch (emailError) {
      console.error("Contact email send failed:", emailError);
    }

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
