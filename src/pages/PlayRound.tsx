import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

interface Hole {
  id: number
  holeNumber: number
  par: number
  championshipYardage: number
  tournamentYardage: number
  playersYardage: number
  gentlemenYardage: number
  forwardYardage: number
}

export default function PlayRound() {
  const { courseId, teeName } = useParams<{ courseId: string; teeName: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [holes, setHoles] = useState<Hole[]>([])
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [currentStrokes, setCurrentStrokes] = useState(0)
  const [courseName, setCourseName] = useState('')

  useEffect(() => {
    if (courseId) {
      // Get course info
      api.get('/courses').then(res => {
        const course = res.data.find((c: any) => c.id === Number(courseId))
        if (course) setCourseName(course.courseName)
      }).catch(err => console.error('Error fetching course:', err))
      
      // Get holes
      api.get(`/courses/${courseId}/holes`).then(res => {
        const sortedHoles = res.data.sort((a: Hole, b: Hole) => a.holeNumber - b.holeNumber)
        setHoles(sortedHoles)
        setScores(new Array(sortedHoles.length).fill(0))
      }).catch(err => console.error('Error fetching holes:', err))
    }
  }, [courseId])

  const currentHole = holes[currentHoleIndex]
  
  const getYardage = () => {
    if (!currentHole) return 0
    switch (teeName) {
      case 'Championship': return currentHole.championshipYardage
      case 'Tournament': return currentHole.tournamentYardage
      case 'Players': return currentHole.playersYardage
      case 'Gentlemen': return currentHole.gentlemenYardage
      case 'Forward': return currentHole.forwardYardage
      default: return currentHole.playersYardage
    }
  }

  const getTotalScore = () => {
    return scores.reduce((sum, score, idx) => {
      if (score > 0 && holes[idx]) {
        return sum + (score - holes[idx].par)
      }
      return sum
    }, 0)
  }

  const getScoreDisplay = () => {
    const total = getTotalScore()
    if (total === 0) return 'E'
    if (total > 0) return `+${total}`
    return total.toString()
  }

  const finishHole = () => {
    if (currentStrokes === 0) {
      alert('Please enter a score for this hole')
      return
    }

    const newScores = [...scores]
    newScores[currentHoleIndex] = currentStrokes
    setScores(newScores)
    setCurrentStrokes(0)

    if (currentHoleIndex < holes.length - 1) {
      setCurrentHoleIndex(currentHoleIndex + 1)
    } else {
      saveRound(newScores)
    }
  }

  const saveRound = async (finalScores: number[]) => {
    try {
      await api.post('/scorecards', {
        user: { id: user?.id },
        course: { id: Number(courseId) },
        selectedTee: teeName,
        playedOn: new Date().toISOString().split('T')[0],
        scores: finalScores
      })
      alert('Round completed and saved!')
      navigate('/scorecard')
    } catch (error) {
      console.error('Error saving round:', error)
      alert('Error saving round')
    }
  }

  if (!currentHole) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>{courseName}</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{teeName} Tees</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>{getScoreDisplay()}</div>
      </div>

      {/* Hole Info */}
      <div style={{ backgroundColor: 'var(--surface)', padding: '24px', textAlign: 'center', boxShadow: 'var(--card-shadow)' }}>
        <div style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '8px' }}>Hole</div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--text)' }}>{currentHole.holeNumber}</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', maxWidth: '300px', margin: '20px auto 0' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Par</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50' }}>{currentHole.par}</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Distance</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50' }}>{getYardage()} yds</div>
          </div>
        </div>
      </div>

      {/* Score Counter */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '16px' }}>Strokes</div>
        <div style={{ fontSize: '80px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '32px' }}>
          {currentStrokes || '-'}
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            onClick={() => setCurrentStrokes(Math.max(0, currentStrokes - 1))}
            disabled={currentStrokes === 0}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentStrokes === 0 ? '#bdc3c7' : '#e74c3c',
              color: 'white',
              fontSize: '48px',
              cursor: currentStrokes === 0 ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            −
          </button>
          <button
            onClick={() => setCurrentStrokes(currentStrokes + 1)}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#27ae60',
              color: 'white',
              fontSize: '48px',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Finish Button */}
      <div style={{ padding: '20px', backgroundColor: 'white', boxShadow: '0 -2px 4px rgba(0,0,0,0.1)' }}>
        <button
          onClick={finishHole}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#3498db',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {currentHoleIndex < holes.length - 1 ? 'Finish Hole' : 'Finish Round'}
        </button>
      </div>
    </div>
  )
}
