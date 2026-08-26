import mongoose, { Schema, models, model } from "mongoose";

export interface IGallery extends mongoose.Document {
  title: string;
  category: string;
  imageUrl: string;
  publicId: string;
  createdAt: Date;
}

const GallerySchema = new Schema<IGallery>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Gallery || model<IGallery>("Gallery", GallerySchema);
