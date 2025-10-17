// src/models/Client.ts
import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  password: string;
  description?: string;
  location?: string;
    favoriteBusinesses: Types.ObjectId[];
}

const ClientSchema: Schema<IClient> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    favoriteBusinesses: [{ type: Schema.Types.ObjectId, ref: "Business", default: [] }],
});

const Client = mongoose.model<IClient>("Client", ClientSchema);
export default Client;