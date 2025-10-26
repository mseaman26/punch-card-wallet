// src/components/Favorites.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface Business {
  _id: string;
  name: string;
  email: string;
  description?: string;
  location?: string;
}

const Favorites: React.FC = () => {
  const { favorites, addFavorite, removeFavorite } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch all favorite businesses from backend
  const fetchFavorites = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/client/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBusinesses(res.data);
      res.data.forEach((b: Business) => {
        if (!favorites.includes(b._id)) addFavorite(b._id);
      });
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add a business to favorites
  const handleAddFavorite = async (businessId: string) => {
    try {
      await axios.post(
        `http://localhost:3001/api/client/favorites/${businessId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addFavorite(businessId);
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  // Remove a business from favorites
  const handleRemoveFavorite = async (businessId: string) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/client/favorites/${businessId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      removeFavorite(businessId);
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  if (loading) return <p>Loading favorites...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Favorite Businesses</h2>
      {businesses.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {businesses.map((b) => (
            <li key={b._id} className="border p-2 mb-2 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-sm">{b.email}</p>
                {b.description && <p className="text-sm">{b.description}</p>}
              </div>
              {favorites.includes(b._id) ? (
                <button
                  onClick={() => handleRemoveFavorite(b._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={() => handleAddFavorite(b._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
                >
                  Add
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;