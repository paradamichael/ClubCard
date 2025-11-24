import React, { useEffect, useState } from 'react'
import ScoreInput from '../components/ScoreInput'
import { useScores } from '../hooks/useScores'
import Card from '../components/Card'
import Button from '../components/Button'
import CourseService from '../services/courseService'
import ScorecardService from '../services/scorecardService'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Scorecard() {
  const { scores, addScore, clearScores } = useScores()
  const { user } = useAuth()
  const [courses, setCourses] = useState<any[]>([])
  const [selectedCourse, setSelectedCourse] = useState<number | ''>('')
  const [savedRounds, setSavedRounds] = useState<any[]>([])

  useEffect(() => {
    CourseService.list().then(setCourses).catch(() => setCourses([]))
    fetchSavedRounds()
  }, [])

  const fetchSavedRounds = async () => {
    try {
      const res = await api.get('/scorecards')
      // Fetch holes for each course to calculate par
      const roundsWithPar = await Promise.all(
        res.data.map(async (round: any) => {
          try {
            const holesRes = await api.get(`/courses/${round.course.id}/holes`)
            const totalPar = holesRes.data.reduce((sum: number, hole: any) => sum + hole.par, 0)
            return { ...round, totalPar }
          } catch {
            return { ...round, totalPar: 72 } // Default par if fetch fails
          }
        })
      )
      setSavedRounds(roundsWithPar)
    } catch (err) {
      console.error('Error fetching scorecards:', err)
    }
  }

  async function saveRound() {
    if (!selectedCourse) return alert('Select a course')
    const payload = { course: { id: selectedCourse }, scores: scores.map(s => s.strokes) }
    await ScorecardService.create(payload)
    alert('Round saved')
    clearScores()
    fetchSavedRounds()
  }

  const getTotalScore = (scores: number[]) => {
    return scores.reduce((sum, s) => sum + s, 0)
  }

  const getScoreToPar = (totalScore: number, par: number) => {
    const diff = totalScore - par
    if (diff === 0) return 'E'
    if (diff > 0) return `+${diff}`
    return `${diff}`
  }

  return (
    <div className="app-container">
      <div className="grid">
        <div>
          <h2 className="page-title">Your Rounds</h2>
          
          {savedRounds.length === 0 ? (
            <Card>
              <p className="muted">No rounds played yet. Click "Play a Round" on the home page to get started!</p>
            </Card>
          ) : (
            savedRounds.map((round) => (
              <Card key={round.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{round.course?.courseName || 'Unknown Course'}</h3>
                    <div className="muted" style={{ fontSize: '14px' }}>
                      {round.selectedTee} Tees • {new Date(round.playedOn).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text)' }}>
                      {getTotalScore(round.scores)}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--accent)', marginTop: '4px' }}>
                      {getScoreToPar(getTotalScore(round.scores), round.totalPar || 72)}
                    </div>
                    <div className="muted" style={{ fontSize: '12px', marginTop: '2px' }}>
                      Par {round.totalPar || 72}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '8px', fontSize: '12px' }}>
                  {round.scores.slice(0, 9).map((score: number, idx: number) => (
                    <div key={idx} style={{ textAlign: 'center', padding: '8px 4px', backgroundColor: 'var(--bg)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '2px' }}>{idx + 1}</div>
                      <div style={{ fontWeight: 'bold', color: 'var(--text)' }}>{score}</div>
                    </div>
                  ))}
                </div>
                {round.scores.length > 9 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '8px', fontSize: '12px', marginTop: '8px' }}>
                    {round.scores.slice(9).map((score: number, idx: number) => (
                      <div key={idx + 9} style={{ textAlign: 'center', padding: '8px 4px', backgroundColor: 'var(--bg)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '2px' }}>{idx + 10}</div>
                        <div style={{ fontWeight: 'bold', color: 'var(--text)' }}>{score}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))
          )}

          <h2 className="page-title" style={{ marginTop: '32px' }}>Manual Entry</h2>
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
            <h3 className="page-title">Summary</h3>
            <div className="muted">Total rounds: {savedRounds.length}</div>
            <div className="muted" style={{ marginTop: '8px' }}>Current entry: {scores.length} holes</div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
