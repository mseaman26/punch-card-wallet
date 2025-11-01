// src/utils/BusinessAuth.ts
import { saveToken, getToken as getStoredToken, removeToken } from "./token";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

interface AuthResponse {
  token: string;
  business?: any; // Replace with Business interface later
}

// Register a business
export const registerBusiness = async (formData: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/business/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) throw new Error("Registration failed");
  return response.json();
};

// Login a business
export const loginBusiness = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/business/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
};

// Token utilities
export const saveBusinessToken = (token: string) => saveToken(token);
export const getBusinessToken = () => getStoredToken();
export const logoutBusiness = () => removeToken();
