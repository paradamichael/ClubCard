import React, { useEffect, useState } from 'react'
import ScoreInput from '../components/ScoreInput'
import { useScores } from '../hooks/useScores'
import Card from '../components/Card'
import Button from '../components/Button'
import CourseService from '../services/courseService'
import ScorecardService from '../services/scorecardService'

export default function Scorecard() {
  const { scores, addScore, clearScores } = useScores()
  const [courses, setCourses] = useState<any[]>([])
  const [selectedCourse, setSelectedCourse] = useState<number | ''>('')

  useEffect(() => {
    CourseService.list().then(setCourses).catch(() => setCourses([]))
  }, [])

  async function saveRound() {
    if (!selectedCourse) return alert('Select a course')
    const payload = { course: { id: selectedCourse }, scores: scores.map(s => s.strokes) }
    await ScorecardService.create(payload)
    alert('Round saved')
    clearScores()
  }

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
              <select value={selectedCourse as any} onChange={e => setSelectedCourse(e.target.value === '' ? '' : Number(e.target.value))}>
                <option value="">Select course</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.courseName}</option>)}
              </select>
            </div>
            <div style={{marginTop:12}}>
              <Button variant="secondary" onClick={clearScores}>Clear Scores</Button>
              <Button onClick={saveRound} style={{marginLeft:8}}>Save Round</Button>
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
