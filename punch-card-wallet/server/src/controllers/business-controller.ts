// server/src/controllers/business-controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Business from "../models/Business.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Register a business
export const registerBusiness = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log("Business registration attempt:", { name, email });

    const existing = await Business.findOne({ email });
    if (existing) {
      console.log("Business registration failed: email already exists");
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newBusiness = await Business.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newBusiness._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Business registered successfully:", newBusiness._id);

    res.status(201).json({ token, business: { id: newBusiness._id, name, email } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login a business
export const loginBusiness = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Business login attempt:", { email });

    const business = await Business.findOne({ email });
    if (!business) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, business.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: business._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Business logged in successfully:", business._id);

    res.json({ token, business: { id: business._id, name: business.name, email: business.email } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update business profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, description, location } = req.body;

    if (!req.businessId) return res.status(401).json({ message: "Unauthorized" });

    const updated = await Business.findByIdAndUpdate(
      req.businessId,
      { name, description, location },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "Business not found" });

    res.json(updated);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all businesses
export const getAllBusinesses = async (_req: Request, res: Response) => {
  try {
    const businesses = await Business.find().select("-password");
    res.json(businesses);
  } catch (err) {
    console.error("Get all businesses error:", err);
    res.status(500).json({ message: "Server error" });
  }
};