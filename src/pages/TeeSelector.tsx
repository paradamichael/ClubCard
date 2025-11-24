import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

interface TeeBox {
  id: number
  teeName: string
  teeColor: string
  rating: number
  slope: number
  totalYardage: number
}

export default function TeeSelector() {
  const { courseId } = useParams<{ courseId: string }>()
  const [tees, setTees] = useState<TeeBox[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (courseId) {
      api.get(`/courses/${courseId}/tees`)
        .then(res => setTees(res.data))
        .catch(err => {
          console.error('Error fetching tees:', err)
          setTees([])
        })
    }
  }, [courseId])

  const getTeeColorBg = (color: string) => {
    const colors: Record<string, string> = {
      Black: '#2c3e50',
      Blue: '#3498db',
      White: '#ecf0f1',
      Gold: '#f39c12',
      Red: '#e74c3c'
    }
    return colors[color] || '#95a5a6'
  }

  const getTeeTextColor = (color: string) => {
    return color === 'White' ? '#2c3e50' : 'white'
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', padding: '0' }}>
      <div style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Select Your Tees</h1>
      </div>
      
      <div style={{ padding: '20px' }}>
        {tees.map(tee => (
          <div
            key={tee.id}
            onClick={() => navigate(`/play-round/${courseId}/${tee.teeName}`)}
            style={{
              backgroundColor: getTeeColorBg(tee.teeColor),
              color: getTeeTextColor(tee.teeColor),
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
              {tee.teeName} Tees
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
              <div>
                <div style={{ opacity: 0.9, fontSize: '14px', marginBottom: '4px' }}>Yardage</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{tee.totalYardage}</div>
              </div>
              <div>
                <div style={{ opacity: 0.9, fontSize: '14px', marginBottom: '4px' }}>Rating</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{tee.rating}</div>
              </div>
              <div>
                <div style={{ opacity: 0.9, fontSize: '14px', marginBottom: '4px' }}>Slope</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{tee.slope}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
