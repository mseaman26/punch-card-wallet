// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getToken } from "../utils/token";

interface Business {
  _id: string;
  name: string;
  category?: string;
  location?: string;
  description?: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  favoriteBusinesses?: Business[];
}

const Profile: React.FC = () => {
  const { setFavorites } = useAuth();
  const [favoriteBusinesses, setFavoriteBusinesses] = useState<Business[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch client profile info
  const fetchProfile = async () => {
    const token = getToken();
    if (!token) {
      console.warn("No token found – user may not be logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:3001/api/client/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  // Fetch favorite businesses
  const fetchFavorites = async () => {
    const token = getToken();
    if (!token) {
      console.warn("No token found – user may not be logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:3001/api/client/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched favorites:", res.data);
      setFavoriteBusinesses(res.data);
      setFavorites(res.data.map((b: Business) => b._id));
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  // Remove a favorite
  const removeFavorite = async (businessId: string) => {
    const token = getToken();
    if (!token) return console.error("No token available");

    try {
      await axios.delete(`http://localhost:3001/api/client/favorites/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavoriteBusinesses((prev) => prev.filter((b) => b._id !== businessId));
      setFavorites((prev: string[]) => prev.filter((id) => id !== businessId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchFavorites();
  }, []);

  if (loading) return <p className="p-6 text-center text-gray-600">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg mb-10">
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.avatarUrl || "https://via.placeholder.com/120?text=Avatar"}
            alt="User Avatar"
            className="w-28 h-28 rounded-full mb-4 border-4 border-green-500 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800">{user?.name || "Client Name"}</h2>
          <p className="text-gray-600 mb-2">{user?.email || "email@example.com"}</p>
          <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
        <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">My Favorite Businesses</h3>

        {((favoriteBusinesses.length === 0) && (user?.favoriteBusinesses?.length === 0)) ? (
          <p className="text-gray-600 text-center">You haven’t added any favorites yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {(favoriteBusinesses.length > 0 ? favoriteBusinesses : user?.favoriteBusinesses ?? []).map((b) => (
              <li key={b._id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{b.name}</p>
                  {b.description && <p className="text-sm text-gray-600">{b.description}</p>}
                  {b.location && <p className="text-sm text-gray-500">{b.location}</p>}
                </div>
                <button
                  onClick={() => removeFavorite(b._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-semibold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;