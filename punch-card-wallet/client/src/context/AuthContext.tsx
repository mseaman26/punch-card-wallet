// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type UserType = "business" | "client" | null;

interface AuthContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  login: (type: UserType) => void;
  logout: () => void;
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>; // <- updated
  addFavorite: (businessId: string) => void;
  removeFavorite: (businessId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const login = (type: UserType) => setUserType(type);
  const logout = () => setUserType(null); // favorites remain intact

  const addFavorite = (businessId: string) => {
    if (!favorites.includes(businessId)) {
      setFavorites([...favorites, businessId]);
    }
  };

  const removeFavorite = (businessId: string) => {
    setFavorites(favorites.filter((id) => id !== businessId));
  };

  return (
    <AuthContext.Provider
      value={{ userType, setUserType, login, logout, favorites, setFavorites, addFavorite, removeFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};