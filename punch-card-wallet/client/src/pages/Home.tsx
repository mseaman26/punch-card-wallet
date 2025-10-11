import React from "react";
import { Link } from "react-router-dom";

// Import the SVGs from your assets folder
import BusinessImg from "../assets/undraw_holding-flowers_jc03.svg";
import ClientImg from "../assets/undraw_credit-card-payments_y0vn.svg";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">
        Welcome to Punch Card Wallet
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Business Section */}
        <Link
          to="/business"
          className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center justify-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          <img src={BusinessImg} alt="Business" className="w-40 h-40 mb-6" />
          <h2 className="text-2xl font-bold mb-2">For Businesses</h2>
          <p className="text-gray-600 text-center">
            Manage your punches, rewards, and customer engagement.
          </p>
        </Link>

        {/* Client Section */}
        <Link
          to="/client"
          className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center justify-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          <img src={ClientImg} alt="Client" className="w-40 h-40 mb-6" />
          <h2 className="text-2xl font-bold mb-2">For Clients</h2>
          <p className="text-gray-600 text-center">
            Track your rewards, view punch history, and redeem offers.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;