import React from 'react'
import ScoreInput from '../components/ScoreInput'
import { useScores } from '../hooks/useScores'

export default function Scorecard() {
  const { scores, addScore, clearScores } = useScores()

  return (
    <div>
      <h2>Scorecard</h2>
      <ScoreInput onAdd={addScore} />
      <ul>
        {scores.map((s, i) => (
          <li key={i}>Hole {s.hole}: {s.strokes} strokes</li>
        ))}
      </ul>
      <button onClick={clearScores}>Clear</button>
    </div>
  )
}
