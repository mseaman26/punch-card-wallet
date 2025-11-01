// routes/clientRoutes.ts
import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  registerClient,
  loginClient,
  getClients,
  updateClientProfile,
  addFavoriteBusiness,
  getFavoriteBusinesses,
  removeFavoriteBusiness,
} from "../controllers/client-controller.js";
import Client from "../models/Client.js";

const router = Router();

// Auth
router.post("/register", registerClient);
router.post("/login", loginClient);

// Get all clients (optional/admin)
router.get("/", verifyToken, getClients);

// Profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const clientId = req.clientId;
    if (!clientId) return res.status(401).json({ message: "Unauthorized" });

    const client = await Client.findById(clientId)
      .select("name email avatarUrl description location favoriteBusinesses")
      .populate("favoriteBusinesses");

    if (!client) return res.status(404).json({ message: "Client not found" });

    res.json(client);
  } catch (err) {
    console.error("Error fetching client profile:", err);
    res.status(500).json({ message: "Server error fetching profile" });
  }
});

// Update profile
router.put("/profile", verifyToken, updateClientProfile);

// Favorites
router.post("/favorites/:businessId", verifyToken, addFavoriteBusiness);
router.get("/favorites", verifyToken, getFavoriteBusinesses);
router.delete("/favorites/:businessId", verifyToken, removeFavoriteBusiness);

export default router;