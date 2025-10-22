import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Client, { IClient } from "../models/Client.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Register a client
export const registerClient = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // prevent duplicate clients
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Client already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = await Client.create({ name, email, password: hashedPassword });

    // generate JWT
    const token = jwt.sign({ id: newClient._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Client registered successfully", token, client: newClient });
  } catch (error) {
    res.status(500).json({ message: "Error registering client", error });
  }
};

// Login a client
export const loginClient = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, client.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: client._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, client });
  } catch (error) {
    res.status(500).json({ message: "Error logging in client", error });
  }
};

// Get all clients (admin or dev use)
export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find().select("-password");
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};

// Update client profile
export const updateClientProfile = async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId; // from JWT
    const { name, email } = req.body;

    if (!clientId) return res.status(401).json({ message: "Unauthorized" });

    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedClient) return res.status(404).json({ message: "Client not found" });

    res.json({ message: "Profile updated successfully", client: updatedClient });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// Add a business to favorites
export const addFavoriteBusiness = async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    const { businessId } = req.params;

    if (!clientId) return res.status(401).json({ message: "Unauthorized" });

    const client = await Client.findById<IClient>(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });

    if (!client.favoriteBusinesses) client.favoriteBusinesses = [];

    const businessObjectId = new mongoose.Types.ObjectId(businessId);

    if (!client.favoriteBusinesses.some((id) => id.equals(businessObjectId))) {
      client.favoriteBusinesses.push(businessObjectId);
      await client.save();
    }

    res.json({ message: "Business added to favorites", favoriteBusinesses: client.favoriteBusinesses });
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite", error });
  }
};

// Get a client's favorite businesses
export const getFavoriteBusinesses = async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    if (!clientId) return res.status(401).json({ message: "Unauthorized" });

    const client = await Client.findById(clientId).populate("favoriteBusinesses");
    if (!client) return res.status(404).json({ message: "Client not found" });

    res.json(client.favoriteBusinesses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error });
  }
};
