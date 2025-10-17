import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

interface JwtPayload {
  id: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.body.businessId = decoded.id; // attach the ID to the request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};