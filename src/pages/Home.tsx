import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Home() {
  return (
    <div className="app-container">
      <Card>
        <h2 className="page-title">Welcome to GolfScoreApp</h2>
        <p className="muted">A lightweight PopStroke/Tiger Woods mini-golf inspired score tracker.</p>
        <div style={{marginTop:12}}>
          <Link to="/scorecard"><Button>Open Scorecard</Button></Link>
        </div>
      </Card>
      <div className="footer muted">Built for quick round tracking — edit and improve as you like.</div>
    </div>
  )
}
