// src/utils/ClientAuth.ts
import { saveToken, getToken as getStoredToken, removeToken } from "./token";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

interface AuthResponse {
  token: string;
  client?: any;
}

export const registerClient = async (formData: { name: string; email: string; password: string; }): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/client/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) throw new Error("Registration failed");
  return response.json();
};

export const loginClient = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE}/client/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
};

// token helpers (wrappers)
export const saveClientToken = (token: string) => saveToken(token);
export const getClientToken = () => getStoredToken();
export const logoutClient = () => removeToken();