import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const isUnauthPage = ['/', '/home', '/login', '/signup'].includes(location.pathname)

  return (
    <header className="app-header">
      <nav className="nav">
        {user ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/club-distances">Distances</Link>
            <Link to="/scorecard">Scorecards</Link>
            <Link to="/settings">Settings</Link>
          </>
        ) : isUnauthPage ? (
          <Link to="/login">Login</Link>
        ) : null}
      </nav>
    </header>
  )
}
