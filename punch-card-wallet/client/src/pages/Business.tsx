// src/pages/Business.tsx
import React, { useState } from "react";
import {
  registerBusiness,
  loginBusiness,
  saveBusinessToken,
} from "../utils/BusinessAuth";

const Business: React.FC = () => {
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
        ? await registerBusiness(formData)
        : await loginBusiness(formData.email, formData.password);

      saveBusinessToken(result.token);
      console.log("Business authenticated:", result);

      window.location.href = "/business-dashboard";
    } catch (err) {
      alert("Authentication failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        {isRegistering ? "Register Your Business" : "Business Login"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-80">
        {isRegistering && (
          <input
            type="text"
            name="name"
            placeholder="Business Name"
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      <button
        className="mt-4 text-blue-500 hover:underline"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
      </button>
    </div>
  );
};

export default Business;