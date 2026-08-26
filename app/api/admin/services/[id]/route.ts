import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { deleteImage } from "@/lib/cloudinary";
import { serviceSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = serviceSchema.partial().safeParse(body);
    // z.default() fires even on omitted keys under .partial(), which would
    // silently reset features/order to their defaults on a partial update
    // (e.g. saving only a new image). Strip keys the client didn't send.
    if (parsed.success) {
      for (const key of Object.keys(parsed.data) as (keyof typeof parsed.data)[]) {
        if (!(key in body)) delete parsed.data[key];
      }
    }
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    await connectDB();
    const existing = await Service.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const oldPublicId = existing.image?.publicId;
    const isReplacingImage =
      parsed.data.image !== undefined && oldPublicId && oldPublicId !== parsed.data.image?.publicId;

    const service = await Service.findByIdAndUpdate(id, parsed.data as Record<string, unknown>, { new: true });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (isReplacingImage && oldPublicId) {
      try {
        await deleteImage(oldPublicId);
      } catch (cloudErr) {
        console.error("Cloudinary delete failed:", cloudErr);
      }
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectDB();
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    try {
      if (service.image?.publicId) {
        await deleteImage(service.image.publicId);
      }
    } catch (cloudErr) {
      console.error("Cloudinary delete failed:", cloudErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
