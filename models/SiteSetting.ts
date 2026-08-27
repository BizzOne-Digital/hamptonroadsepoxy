import mongoose, { Schema, models, model } from "mongoose";

export interface ISiteSetting extends mongoose.Document {
  phone: string;
  email: string;
  address: string;
  businessName: string;
  ownerName: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

const SiteSettingSchema = new Schema<ISiteSetting>({
  phone: { type: String, required: true, default: "757-718-0117" },
  email: { type: String, required: true, default: "orlandospain@gmail.com" },
  address: { type: String, required: true, default: "Hampton Roads" },
  businessName: { type: String, required: true, default: "Hampton Roads Epoxy" },
  ownerName: { type: String, required: true, default: "Orlando Navarrete" },
  facebookUrl: { type: String, default: "" },
  instagramUrl: { type: String, default: "" },
});

export default models.SiteSetting || model<ISiteSetting>("SiteSetting", SiteSettingSchema);
