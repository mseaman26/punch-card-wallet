import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import businessRoutes from "./routes/businessRoutes";
import clientRoutes from "./routes/clientRoutes";
import "./config/connection";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simple logger middleware
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/business", businessRoutes);
app.use("/api/client", clientRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});