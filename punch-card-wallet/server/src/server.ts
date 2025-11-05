import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import businessRoutes from "./routes/businessRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import "./config/connection.js";

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

// API Routes
app.use("/api/business", businessRoutes);
app.use("/api/client", clientRoutes);

// Serve frontend static files
// Use path relative to the root, works on Render
const clientDistPath = path.resolve("client/dist");
app.use(express.static(clientDistPath));

// Catch-all route to serve React's index.html
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});