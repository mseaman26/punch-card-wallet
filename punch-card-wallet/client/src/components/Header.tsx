import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-2xl font-bold text-blue-600">Punch Card Wallet</h1>
      <nav className="flex gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
      </nav>
    </header>
  );
}
