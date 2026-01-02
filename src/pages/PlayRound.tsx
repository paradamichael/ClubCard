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

// Mock holes data (Test Course - same as Hancock Golf Club)
const MOCK_HOLES: Hole[] = [
  { id: 1, holeNumber: 1, par: 4, championshipYardage: 345, tournamentYardage: 320, playersYardage: 295, gentlemenYardage: 280, forwardYardage: 265 },
  { id: 2, holeNumber: 2, par: 3, championshipYardage: 165, tournamentYardage: 150, playersYardage: 135, gentlemenYardage: 125, forwardYardage: 110 },
  { id: 3, holeNumber: 3, par: 4, championshipYardage: 380, tournamentYardage: 355, playersYardage: 330, gentlemenYardage: 310, forwardYardage: 290 },
  { id: 4, holeNumber: 4, par: 5, championshipYardage: 520, tournamentYardage: 495, playersYardage: 470, gentlemenYardage: 450, forwardYardage: 425 },
  { id: 5, holeNumber: 5, par: 4, championshipYardage: 405, tournamentYardage: 380, playersYardage: 355, gentlemenYardage: 335, forwardYardage: 310 },
  { id: 6, holeNumber: 6, par: 3, championshipYardage: 185, tournamentYardage: 170, playersYardage: 155, gentlemenYardage: 140, forwardYardage: 120 },
  { id: 7, holeNumber: 7, par: 4, championshipYardage: 365, tournamentYardage: 340, playersYardage: 315, gentlemenYardage: 295, forwardYardage: 275 },
  { id: 8, holeNumber: 8, par: 5, championshipYardage: 545, tournamentYardage: 520, playersYardage: 495, gentlemenYardage: 475, forwardYardage: 450 },
  { id: 9, holeNumber: 9, par: 4, championshipYardage: 390, tournamentYardage: 365, playersYardage: 340, gentlemenYardage: 320, forwardYardage: 300 },
  { id: 10, holeNumber: 10, par: 4, championshipYardage: 355, tournamentYardage: 330, playersYardage: 305, gentlemenYardage: 285, forwardYardage: 265 },
  { id: 11, holeNumber: 11, par: 3, championshipYardage: 175, tournamentYardage: 160, playersYardage: 145, gentlemenYardage: 130, forwardYardage: 115 },
  { id: 12, holeNumber: 12, par: 4, championshipYardage: 420, tournamentYardage: 395, playersYardage: 370, gentlemenYardage: 350, forwardYardage: 330 },
  { id: 13, holeNumber: 13, par: 5, championshipYardage: 560, tournamentYardage: 535, playersYardage: 510, gentlemenYardage: 490, forwardYardage: 465 },
  { id: 14, holeNumber: 14, par: 3, championshipYardage: 195, tournamentYardage: 180, playersYardage: 165, gentlemenYardage: 150, forwardYardage: 135 },
  { id: 15, holeNumber: 15, par: 4, championshipYardage: 375, tournamentYardage: 350, playersYardage: 325, gentlemenYardage: 305, forwardYardage: 285 },
  { id: 16, holeNumber: 16, par: 4, championshipYardage: 400, tournamentYardage: 375, playersYardage: 350, gentlemenYardage: 330, forwardYardage: 310 },
  { id: 17, holeNumber: 17, par: 5, championshipYardage: 575, tournamentYardage: 550, playersYardage: 525, gentlemenYardage: 505, forwardYardage: 480 },
  { id: 18, holeNumber: 18, par: 4, championshipYardage: 385, tournamentYardage: 360, playersYardage: 335, gentlemenYardage: 315, forwardYardage: 295 },
]

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
      if (import.meta.env.DEV) {
        // Use mock data in dev mode
        setCourseName('Test Course')
        setHoles(MOCK_HOLES)
        setScores(new Array(MOCK_HOLES.length).fill(0))
      } else {
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
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg)', 
      display: 'flex', 
      flexDirection: 'column',
      padding: '12px 20px'
    }}>
      {/* Header - Compact */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {courseName} • {teeName} Tees
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text)' }}>
          {getScoreDisplay()}
        </div>
      </div>

      {/* Hole Info Card - Centered */}
      <div style={{ 
        backgroundColor: 'var(--surface)', 
        borderRadius: 'var(--radius)',
        padding: '16px', 
        textAlign: 'center', 
        boxShadow: 'var(--card-shadow)',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hole</div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--text)', marginBottom: '12px' }}>
          {currentHole.holeNumber}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Par</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--accent)' }}>{currentHole.par}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Distance</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--accent)' }}>{getYardage()}<span style={{ fontSize: '14px' }}>y</span></div>
          </div>
        </div>
      </div>

      {/* Score Counter */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Strokes</div>
        <div style={{ fontSize: '64px', fontWeight: 'bold', color: 'var(--text)', marginBottom: '16px', lineHeight: 1 }}>
          {currentStrokes || '-'}
        </div>
        
        <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
          <button
            onClick={() => setCurrentStrokes(Math.max(0, currentStrokes - 1))}
            disabled={currentStrokes === 0}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentStrokes === 0 ? 'var(--border-color)' : '#ef4444',
              color: 'white',
              fontSize: '32px',
              cursor: currentStrokes === 0 ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
              opacity: currentStrokes === 0 ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (currentStrokes > 0) e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            −
          </button>
          <button
            onClick={() => setCurrentStrokes(currentStrokes + 1)}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#22c55e',
              color: 'white',
              fontSize: '32px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            +
          </button>
        </div>

        {/* Finish Button */}
        <button
          onClick={finishHole}
          style={{
            padding: '14px 20px',
            borderRadius: 'var(--radius)',
            border: 'none',
            backgroundColor: 'var(--accent)',
            color: 'white',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: 'var(--card-shadow)',
            transition: 'all 0.2s',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'var(--card-shadow)'
          }}
        >
          Finish Hole
        </button>
      </div>
    </div>
  )
}
