// src/scripts/printData.ts
import mongoose from "mongoose";
import Client from "../models/Client.js";
import Business from "../models/Business.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/punchcard";

async function printData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    const clients = await Client.find({}, { name: 1, email: 1, phone: 1, password: 1 });
    const businesses = await Business.find({}, { name: 1, email: 1, phone: 1, category: 1 });

    console.log("\n=== Clients ===");
    console.table(
      clients.map((c) => ({
        name: c.name,
        email: c.email,
        password: c.password.substring(0, 20) + "...",
      }))
    );

    console.log("\n=== Businesses ===");
    console.table(
      businesses.map((b) => ({
        name: b.name,
        email: b.email,
      }))
    );
  } catch (err) {
    console.error("❌ Error fetching data:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔒 Connection closed");
  }
}

printData();

