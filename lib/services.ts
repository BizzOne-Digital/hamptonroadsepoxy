import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import type { ServiceDTO } from "@/types";

// Fetches Service documents directly from MongoDB for use in Server
// Components, and returns them as plain, JSON-serializable objects
// (Mongoose Document instances / ObjectId / Date values can't be passed
// as props to Client Components).
function toServiceDTO(doc: Record<string, unknown>): ServiceDTO {
  return {
    _id: String(doc._id),
    title: doc.title as string,
    slug: doc.slug as string,
    shortDescription: doc.shortDescription as string,
    description: doc.description as string,
    features: (doc.features as string[]) ?? [],
    order: (doc.order as number) ?? 0,
    image: doc.image as ServiceDTO["image"],
  };
}

export async function getAllServices(): Promise<ServiceDTO[]> {
  await connectDB();
  const services = await Service.find().sort({ order: 1 }).lean();
  return services.map(toServiceDTO);
}

export async function getServiceBySlug(slug: string): Promise<ServiceDTO | null> {
  await connectDB();
  const service = await Service.findOne({ slug }).lean();
  return service ? toServiceDTO(service) : null;
}
