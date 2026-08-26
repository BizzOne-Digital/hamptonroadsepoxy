import mongoose, { Schema, models, model } from "mongoose";

export interface IServiceImage {
  url: string;
  publicId: string;
}

export interface IService extends mongoose.Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  features: string[];
  order: number;
  image?: IServiceImage;
}

const ServiceImageSchema = new Schema<IServiceImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], default: [] },
  order: { type: Number, default: 0 },
  image: { type: ServiceImageSchema, required: false },
});

export default models.Service || model<IService>("Service", ServiceSchema);
