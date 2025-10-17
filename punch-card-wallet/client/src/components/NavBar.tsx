import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutBusiness } from "../utils/BusinessAuth";
import { logoutClient } from "../utils/ClientAuth";

const NavBar: React.FC = () => {
  const { userType, setUserType } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (userType === "business") logoutBusiness();
    if (userType === "client") logoutClient();
    setUserType(null); // Reset context
    navigate("/"); // Redirect to home
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex gap-4">
      <Link to="/">Home</Link>

      {userType === "client" && (
        <>
          <Link to="/wallet">Wallet</Link>
          <Link to="/rewards">Rewards</Link>
          <Link to="/profile">Profile</Link>
        </>
      )}

      {userType === "business" && (
        <>
          <Link to="/business">Dashboard</Link>
          <Link to="/profile">Profile</Link>
        </>
      )}

      {userType && (
        <button
          onClick={handleLogout}
          className="ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default NavBar;