import mongoose, { Schema, models, model } from "mongoose";

export interface IBooking extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  address: string;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  preferredDate: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String, default: "" },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default models.Booking || model<IBooking>("Booking", BookingSchema);
