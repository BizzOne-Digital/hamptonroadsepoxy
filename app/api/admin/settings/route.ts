import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SiteSetting from "@/models/SiteSetting";
import { siteSettingSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSetting.findOne().lean();
    if (!settings) {
      const created = await SiteSetting.create({});
      settings = created.toObject();
    }
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Fetch settings error:", error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = siteSettingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    await connectDB();
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(parsed.data);
    } else {
      settings.set(parsed.data);
      await settings.save();
    }
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
