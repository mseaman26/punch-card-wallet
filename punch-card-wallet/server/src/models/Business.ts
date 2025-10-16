import mongoose, { Schema, Document } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  email: string;
  password: string;
}

const BusinessSchema = new Schema<IBusiness>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Business = mongoose.model<IBusiness>("Business", BusinessSchema);
export default Business;