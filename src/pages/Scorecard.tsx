import React from 'react'
import ScoreInput from '../components/ScoreInput'
import { useScores } from '../hooks/useScores'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Scorecard() {
  const { scores, addScore, clearScores } = useScores()

  return (
    <div className="app-container">
      <div className="grid">
        <div>
          <h2 className="page-title">Scorecard</h2>
          <Card>
            <ScoreInput onAdd={addScore} />
            <ul className="score-list">
              {scores.map((s, i) => (
                <li key={i}><div>Hole {s.hole}</div><div className="muted">{s.strokes} strokes</div></li>
              ))}
            </ul>
            <div style={{marginTop:12}}>
              <Button variant="secondary" onClick={clearScores}>Clear Scores</Button>
            </div>
          </Card>
        </div>

        <aside>
          <Card>
            <h3 className="page-title">Round Summary</h3>
            <div className="muted">Holes played: {scores.length}</div>
            <div style={{marginTop:12}} className="spaced">
              <Button className="ghost">Export</Button>
              <Button className="ghost">Share</Button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
