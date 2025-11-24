import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="app-header">
      <div className="brand">
        <div className="logo">C</div>
        <div>
          <h1>ClubCard</h1>
          <div className="muted">Track your rounds — your digital scorecard</div>
        </div>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/club-distances">Club Distances</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/scorecard">Scorecard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
        {user ? (
          <button className="link-like" onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  )
}
