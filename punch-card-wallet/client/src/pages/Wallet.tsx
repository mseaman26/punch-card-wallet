// src/pages/Wallet.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/token";

interface Business {
  _id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  avatar?: string;
}

// Sample favorites for demo purposes
const sampleFavorites: Business[] = [
  {
    _id: "sample-1",
    name: "Example Coffee Co.",
    category: "Cafe",
    location: "Detroit, MI",
    description: "Locally roasted coffee and fresh pastries in the heart of downtown Detroit.",
    avatar: "https://source.unsplash.com/120x120/?coffee,cafe",
  },
  {
    _id: "sample-2",
    name: "Example Detroit Wellness Center",
    category: "Health & Wellness",
    location: "Royal Oak, MI",
    description: "Offering holistic health services, yoga, and meditation workshops.",
    avatar: "https://source.unsplash.com/120x120/?yoga,wellness,meditation",
  },
  {
    _id: "sample-3",
    name: "Example Belt Fitness",
    category: "Gym",
    location: "Ferndale, MI",
    description: "Strength and conditioning programs focused on community and results.",
    avatar: "https://source.unsplash.com/120x120/?gym,fitness,weights",
  },
  {
    _id: "sample-4",
    name: "Example Flower Shop",
    category: "Florist",
    location: "Detroit, MI",
    description: "Artisan floral arrangements inspired by the beauty of Belle Isle.",
    avatar: "https://source.unsplash.com/120x120/?flowers,florist",
  },
  {
    _id: "sample-5",
    name: "Example Spa & Sauna",
    category: "Spa",
    location: "Birmingham, MI",
    description: "Luxury spa offering massages, saunas, and wellness treatments.",
    avatar: "https://source.unsplash.com/120x120/?spa,relaxation",
  },
  {
    _id: "sample-6",
    name: "Example Tattoo Studio",
    category: "Tattoo Studio",
    location: "Midtown Detroit, MI",
    description: "Custom tattoos with bold designs and a clean, creative space.",
    avatar: "https://source.unsplash.com/120x120/?tattoo,studio",
  },
];

const Wallet: React.FC = () => {
  const [favorites, setFavorites] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await axios.get("http://localhost:3001/api/client/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched favorites:", response.data);
      setFavorites(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading favorites...</p>
      </div>
    );

  const displayFavorites = favorites.length > 0 ? favorites : sampleFavorites;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
        Your Favorite Businesses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayFavorites.map((biz) => (
          <div
            key={biz._id}
            className="border rounded-xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col items-center text-center"
          >
            <img
              src={biz.avatar || "https://via.placeholder.com/120?text=Business"}
              alt={biz.name}
              className="w-28 h-28 mb-4 rounded-full object-cover border-2 border-gray-200"
            />
            <h3 className="text-xl font-semibold mb-1">{biz.name}</h3>
            <p className="text-gray-600 text-sm mb-2">
              {biz.category} | {biz.location}
            </p>
            <p className="text-gray-700 text-sm">{biz.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallet;