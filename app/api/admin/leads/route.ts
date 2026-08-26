import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Fetch leads error:", error);
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }
}
