import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Home() {
  return (
    <div className="app-container">
      <Card>
        <h2 className="page-title">Welcome to GolfScoreApp</h2>
        <p className="muted">Track your rounds at Pecan Hollow Golf Course.</p>
        <div style={{marginTop:12}}>
          <Link to="/course-selector"><Button>Play a Round</Button></Link>
        </div>
        <div style={{marginTop:12}}>
          <Link to="/scorecard"><Button variant="secondary">View Scorecards</Button></Link>
        </div>
      </Card>
      <div className="footer muted">Built for quick round tracking — edit and improve as you like.</div>
    </div>
  )
}
