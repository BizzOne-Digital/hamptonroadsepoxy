import mongoose, { Schema, models, model } from "mongoose";

export interface ILead extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["new", "contacted", "quoted", "won", "lost"],
    default: "new",
  },
  createdAt: { type: Date, default: Date.now },
});

export default models.Lead || model<ILead>("Lead", LeadSchema);
