// server/src/routes/businessRoutes.ts
import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import {
  registerBusiness,
  loginBusiness,
  updateProfile,
  getAllBusinesses
} from "../controllers/business-controller.js";

const router = Router();

// Routes
router.post("/register", registerBusiness);
router.post("/login", loginBusiness);
router.put("/profile", verifyToken, updateProfile);
router.get("/", getAllBusinesses);

export default router;