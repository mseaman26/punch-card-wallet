import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/Client.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Register a client
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log("Client registration attempt:", { name, email });

    // Check if email exists
    const existing = await Client.findOne({ email });
    if (existing) {
      console.log("Client registration failed: email already exists");
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = await Client.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newClient._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Client registered successfully:", newClient._id);

    res.status(201).json({ token, client: { id: newClient._id, name, email } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login a client
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Client login attempt:", { email });

    const client = await Client.findOne({ email });
    if (!client) {
      console.log("Client login failed: invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, client.password);
    if (!validPassword) {
      console.log("Client login failed: invalid password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: client._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Client logged in successfully:", client._id);

    res.json({ token, client: { id: client._id, name: client.name, email: client.email } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;