import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>GolfScoreApp</h1>
      <p>Track your rounds and scores.</p>
      <Link to="/scorecard">Open Scorecard</Link>
    </div>
  )
}
