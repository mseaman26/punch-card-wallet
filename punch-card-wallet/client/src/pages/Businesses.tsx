// src/pages/Businesses.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { getToken } from "../utils/token";


interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
}

const sampleBusinesses: Business[] = [
  {
    id: "1",
    name: "Example Coffee Co.",
    category: "Cafe",
    location: "Detroit, MI",
    description: "Locally roasted coffee and fresh pastries in the heart of downtown Detroit.",
  },
  {
    id: "2",
    name: "Example Detroit Wellness Center",
    category: "Health & Wellness",
    location: "Royal Oak, MI",
    description: "Offering holistic health services, yoga, and meditation workshops.",
  },
  {
    id: "3",
    name: "Example Belt Fitness",
    category: "Gym",
    location: "Ferndale, MI",
    description: "Strength and conditioning programs focused on community and results.",
  },
  {
    id: "4",
    name: "Example Flower Shop",
    category: "Florist",
    location: "Detroit, MI",
    description: "Artisan floral arrangements inspired by the beauty of Belle Isle.",
  },
  {
    id: "5",
    name: "Example Tattoo Studio",
    category: "Tattoo Studio",
    location: "Midtown Detroit, MI",
    description: "Custom tattoos with bold designs and a clean, creative space.",
  },
  {
    id: "6",
    name: "Example Spa & Sauna",
    category: "Spa",
    location: "Birmingham, MI",
    description: "Luxury spa offering massages, saunas, and wellness treatments.",
  },
];

const Businesses: React.FC = () => {
  const [search, setSearch] = useState("");
  const { favorites, addFavorite } = useAuth();

  const handleAddFavorite = async (businessId: string) => {
    try {
        const token = getToken();
        console.log("Token being sent:", token);

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

  const filtered = sampleBusinesses.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Detroit Businesses</h1>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, category, or location"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((b) => (
            <div key={b.id} className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{b.name}</h2>
              <p className="text-gray-600">{b.category} • {b.location}</p>
              <p className="text-gray-500 mt-2">{b.description}</p>
              <div className="flex gap-2 mt-4">
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">View Details</button>
                {favorites.includes(b.id) ? (
                  <button disabled className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">Favorited</button>
                ) : (
                  <button
                    onClick={() => handleAddFavorite(b.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Add to Favorites
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No businesses found.</p>
        )}
      </div>
    </div>
  );
};

export default Businesses;