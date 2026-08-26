import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";
import { gallerySchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Fetch gallery error:", error);
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = gallerySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    const { imageUrl, publicId } = body as { imageUrl?: string; publicId?: string };
    if (!imageUrl || !publicId) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    await connectDB();
    const item = await Gallery.create({ ...parsed.data, imageUrl, publicId });
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Create gallery item error:", error);
    return NextResponse.json({ error: "Failed to save gallery item" }, { status: 500 });
  }
}
