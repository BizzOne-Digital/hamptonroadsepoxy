import mongoose, { Schema, models, model } from "mongoose";

export interface ITestimonial extends mongoose.Document {
  name: string;
  location: string;
  quote: string;
  rating: number;
  isDemo: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  quote: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  isDemo: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);
