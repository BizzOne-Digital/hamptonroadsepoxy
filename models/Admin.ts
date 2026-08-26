import mongoose, { Schema, models, model } from "mongoose";

export interface IAdmin extends mongoose.Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Admin || model<IAdmin>("Admin", AdminSchema);
