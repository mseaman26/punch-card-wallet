import mongoose, { Schema, model, Document } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  email: string;
  password: string;
  description?: string;
  location?: string;
}

const BusinessSchema = new Schema<IBusiness>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

const Business = mongoose.model<IBusiness>("Business", BusinessSchema);
export default Business;