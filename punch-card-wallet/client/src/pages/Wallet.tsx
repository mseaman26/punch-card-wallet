import React from "react";

const Wallet: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Wallet 💰</h1>
      <p className="text-gray-700">View your balance, transactions, and top up your account here.</p>
    </div>
  );
};

export default Wallet;