import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Business from "../models/Business.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if email exists
    const existing = await Business.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newBusiness = await Business.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newBusiness._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token, business: { id: newBusiness._id, name, email } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const business = await Business.findOne({ email });
    if (!business) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, business.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: business._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, business: { id: business._id, name: business.name, email: business.email } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;