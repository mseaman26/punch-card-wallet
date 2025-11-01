import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ----------------------
// 1. Define Schemas
// ----------------------
const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String, // for login
});

const businessSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  description: String,
  email: String,
  phone: String,
  password: String, // optional if businesses log in
});

// ----------------------
// 2. Define Models
// ----------------------
const Client = mongoose.model("Client", clientSchema);
const Business = mongoose.model("Business", businessSchema);

// ----------------------
// 3. Sample Data
// ----------------------
const clients = [
  { name: "Test Client", email: "client@test.com", phone: "555-0000", password: "client123" },
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

// ----------------------
// 4. Connect & Seed DB
// ----------------------
async function seedDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/punchcard");
    console.log("MongoDB connected!");

    // Clear existing data
    await Client.deleteMany({});
    await Business.deleteMany({});

    // Hash passwords
    const hashedClients = await Promise.all(
      clients.map(async (c) => ({ ...c, password: await bcrypt.hash(c.password, 10) }))
    );

    const hashedBusinesses = await Promise.all(
      businesses.map(async (b) => ({ ...b, password: await bcrypt.hash(b.password, 10) }))
    );

    // Insert sample data
    await Client.insertMany(hashedClients);
    await Business.insertMany(hashedBusinesses);

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

seedDatabase();