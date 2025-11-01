// src/seeds/seedData.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Client from "../models/Client.js";
import Business from "../models/Business.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/punchcard";

// Sample data
const clients = [
  {
    name: "Test Client",
    email: "client@test.com",
    phone: "555-0000",
    password: "client123",
  },
];

const businesses = [
  {
    name: "Example Coffee Co.",
    category: "Cafe",
    location: "Detroit, MI",
    description: "Locally roasted coffee and fresh pastries in the heart of downtown Detroit.",
    email: "coffee@example.com",
    phone: "555-1001",
    password: "coffee123",
  },
  {
    name: "Example Detroit Wellness Center",
    category: "Health & Wellness",
    location: "Royal Oak, MI",
    description: "Offering holistic health services, yoga, and meditation workshops.",
    email: "wellness@example.com",
    phone: "555-1002",
    password: "wellness123",
  },
  {
    name: "Example Belt Fitness",
    category: "Gym",
    location: "Ferndale, MI",
    description: "Strength and conditioning programs focused on community and results.",
    email: "beltfitness@example.com",
    phone: "555-1003",
    password: "belt123",
  },
  {
    name: "Example Flower Shop",
    category: "Florist",
    location: "Detroit, MI",
    description: "Artisan floral arrangements inspired by the beauty of Belle Isle.",
    email: "flowershop@example.com",
    phone: "555-1004",
    password: "flowers123",
  },
  {
    name: "Example Tattoo Studio",
    category: "Tattoo Studio",
    location: "Midtown Detroit, MI",
    description: "Custom tattoos with bold designs and a clean, creative space.",
    email: "tattoo@example.com",
    phone: "555-1005",
    password: "tattoo123",
  },
  {
    name: "Example Spa & Sauna",
    category: "Spa",
    location: "Birmingham, MI",
    description: "Luxury spa offering massages, saunas, and wellness treatments.",
    email: "spa@example.com",
    phone: "555-1006",
    password: "spa123",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    // Clear existing collections
    await Client.deleteMany({});
    await Business.deleteMany({});
    console.log("🧹 Cleared existing collections");

    // Hash passwords
    const hashedClients = await Promise.all(
      clients.map(async (c) => ({ ...c, password: await bcrypt.hash(c.password, 10) }))
    );

    const hashedBusinesses = await Promise.all(
      businesses.map(async (b) => ({ ...b, password: await bcrypt.hash(b.password, 10) }))
    );

    // Insert data
    await Client.insertMany(hashedClients);
    await Business.insertMany(hashedBusinesses);

    console.log("🌱 Database seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔒 Connection closed");
  }
}

seedDatabase();