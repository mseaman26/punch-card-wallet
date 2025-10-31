// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface Business {
  _id: string;
  name: string;
  category?: string;
  location?: string;
  description?: string;
}

const Profile: React.FC = () => {
  const { setFavorites } = useAuth();
  const [favoriteBusinesses, setFavoriteBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/api/client/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavoriteBusinesses(res.data);
      setFavorites(res.data.map((b: Business) => b._id));
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (businessId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/client/favorites/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavoriteBusinesses((prev) => prev.filter((b) => b._id !== businessId));
      setFavorites((prev) => prev.filter((id) => id !== businessId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [setFavorites]);

  if (loading) return <p>Loading favorites...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      {favoriteBusinesses.length === 0 ? (
        <p>You have no favorite businesses yet.</p>
      ) : (
        <ul>
          {favoriteBusinesses.map((b) => (
            <li
              key={b._id}
              className="border p-2 mb-2 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{b.name}</p>
                {b.description && <p className="text-sm">{b.description}</p>}
                {b.location && <p className="text-sm">{b.location}</p>}
              </div>
              <button
                onClick={() => removeFavorite(b._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;