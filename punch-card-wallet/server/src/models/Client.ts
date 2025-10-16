// src/models/Client.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  password: string;
}

const ClientSchema: Schema<IClient> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Client = mongoose.model<IClient>("Client", ClientSchema);
export default Client;