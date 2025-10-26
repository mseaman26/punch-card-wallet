// src/pages/Businesses.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Business {
  _id: string;
  name: string;
  email: string;
  description?: string;
  location?: string;
}

const Businesses: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const { favorites, addFavorite, removeFavorite } = useAuth();

  // Fetch all businesses from backend
  const fetchBusinesses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/api/business", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBusinesses(res.data);
    } catch (err) {
      console.error("Error fetching businesses:", err);
    }
  };

  // Handle add/remove favorite with backend update
  const toggleFavorite = async (businessId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (favorites.includes(businessId)) {
        // Remove favorite (optional: backend endpoint if needed)
        removeFavorite(businessId);
      } else {
        // Add favorite via API
        await axios.post(
          `http://localhost:3001/api/client/favorites/${businessId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        addFavorite(businessId);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Browse Businesses</h2>
      {businesses.length === 0 ? (
        <p>No businesses found.</p>
      ) : (
        <ul>
          {businesses.map((b) => (
            <li
              key={b._id}
              className="border p-2 mb-2 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-sm">{b.email}</p>
                {b.description && <p className="text-sm">{b.description}</p>}
              </div>
              <button
                onClick={() => toggleFavorite(b._id)}
                className={`${
                  favorites.includes(b._id)
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white font-bold py-1 px-3 rounded`}
              >
                {favorites.includes(b._id) ? "Remove" : "Add"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Businesses;
