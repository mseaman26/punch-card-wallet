import React from 'react'
import { Link } from 'react-router-dom'

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/wallet">Wallet</Link>
      <Link to="/rewards">Rewards</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  )
}

export default NavBar