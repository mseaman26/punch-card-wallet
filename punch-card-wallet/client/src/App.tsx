// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusinessDashboard from "./pages/BusinessDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { useAuth } from "./context/AuthContext";
import BusinessAuth from "./pages/BusinessAuth";
import ClientAuth from "./pages/ClientAuth";
import PrivateRoute from "./components/PrivateRoute";
import Businesses from "./pages/Businesses";

const App: React.FC = () => {
  const { userType } = useAuth();

  return (
    <div>
      {/* Navbar only shows if user is logged in */}
      {userType && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/business-auth" element={<BusinessAuth />} />
        <Route path="/client-auth" element={<ClientAuth />} />

        <Route
          path="/businesses"
          element={
            <PrivateRoute allowedUserType="client">
               <Businesses />
            </PrivateRoute>
          }
        />


        {/* Protected Dashboards */}
        <Route
          path="/business"
          element={
            <PrivateRoute allowedUserType="business">
              <BusinessDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/client"
          element={
            <PrivateRoute allowedUserType="client">
              <ClientDashboard />
            </PrivateRoute>
          }
        />

        {/* Protected Pages accessible by any logged-in user */}
        <Route
          path="/wallet"
          element={
            <PrivateRoute allowedUserType={userType!}>
              <Wallet />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute allowedUserType={userType!}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;