import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
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
        <Link to="/scorecard">Scorecard</Link>
      </nav>
    </header>
  )
}
