// src/pages/Client.tsx
import React, { useState } from "react";
import { registerClient, loginClient, saveClientToken } from "../utils/ClientAuth";

const Client: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = isRegistering
        ? await registerClient(formData) // now matches { name, email, password }
        : await loginClient(formData.email, formData.password);

      saveClientToken(result.token);
      console.log("Client authenticated:", result);

      window.location.href = "/client-dashboard";
    } catch (err) {
      alert("Authentication failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        {isRegistering ? "Create a Client Account" : "Client Login"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-80">
        {isRegistering && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      <button
        className="mt-4 text-green-500 hover:underline"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
      </button>
    </div>
  );
};

export default Client;