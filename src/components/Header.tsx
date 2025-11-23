import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <nav>
        <Link to="/">Home</Link> {' | '}
        <Link to="/scorecard">Scorecard</Link>
      </nav>
    </header>
  )
}
