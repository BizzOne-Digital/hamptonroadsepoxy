import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";

export interface GalleryItemDTO {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

function toGalleryDTO(doc: Record<string, unknown>): GalleryItemDTO {
  return {
    _id: String(doc._id),
    title: doc.title as string,
    category: doc.category as string,
    imageUrl: doc.imageUrl as string,
    createdAt: new Date(doc.createdAt as string).toISOString(),
  };
}

export async function getAllGalleryItems(): Promise<GalleryItemDTO[]> {
  await connectDB();
  const items = await Gallery.find().sort({ createdAt: -1 }).lean();
  return items.map(toGalleryDTO);
}
