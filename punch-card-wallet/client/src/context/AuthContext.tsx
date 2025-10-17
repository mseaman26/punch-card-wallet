// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, } from "react";
import type { ReactNode } from "react";

type UserType = "business" | "client" | null;

interface AuthContextType {
  userType: UserType;
  login: (type: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);

  // Use login/logout instead of exposing setUserType
  const login = (type: UserType) => setUserType(type);
  const logout = () => setUserType(null);

  return (
    <AuthContext.Provider value={{ userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};