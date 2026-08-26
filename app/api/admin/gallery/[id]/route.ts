import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";
import { deleteImage } from "@/lib/cloudinary";
import { gallerySchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = gallerySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    await connectDB();
    const item = await Gallery.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }
    return NextResponse.json({ item });
  } catch (error) {
    console.error("Update gallery item error:", error);
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectDB();
    const item = await Gallery.findByIdAndDelete(id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    try {
      if (item.publicId) {
        await deleteImage(item.publicId);
      }
    } catch (cloudErr) {
      console.error("Cloudinary delete failed:", cloudErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete gallery item error:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
