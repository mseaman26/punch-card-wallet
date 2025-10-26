import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import {
  registerClient,
  loginClient,
  getClients,
  updateClientProfile,
  addFavoriteBusiness,
  getFavoriteBusinesses,
  removeFavoriteBusiness,
} from "../controllers/client-controller.js";

const router = Router();

router.post("/register", registerClient);
router.post("/login", loginClient);
router.get("/", verifyToken,getClients); // optional for dev/admin
router.put("/profile", verifyToken, updateClientProfile);
router.post("/favorites/:businessId", verifyToken, addFavoriteBusiness);
router.get("/favorites", verifyToken, getFavoriteBusinesses);
router.delete("/favorites/:businessId", verifyToken, removeFavoriteBusiness);


export default router;