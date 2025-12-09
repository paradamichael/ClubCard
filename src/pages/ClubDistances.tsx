import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import ClubService from '../services/clubService'
import { useAuth } from '../context/AuthContext'

type Club = { id?: number; clubName: string; clubType?: string; carryDistance?: number }

const CLUB_OPTIONS = [
  'Driver',
  '3 Wood',
  '5 Wood',
  '7 Wood',
  '3 Hybrid',
  '4 Hybrid',
  '5 Hybrid',
  '3 Iron',
  '4 Iron',
  '5 Iron',
  '6 Iron',
  '7 Iron',
  '8 Iron',
  '9 Iron',
  'Pitching Wedge',
  'Gap Wedge',
  'Sand Wedge',
  'Lob Wedge',
  'Putter'
]

export default function ClubDistances() {
  const { user } = useAuth()
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState('Driver')
  const [newDistance, setNewDistance] = useState<number | ''>('')

  async function load() {
    if (!user?.id) return
    setLoading(true)
    try {
      const data = await ClubService.list(user.id)
      setClubs(data)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [user?.id])

  async function addClub() {
    if (!newName) return alert('Provide a club name')
    if (!user?.id) {
      console.error('User ID missing:', user)
      return alert('User not found. Please log in again.')
    }
    const payload = { 
      clubName: newName, 
      carryDistance: newDistance ? Number(newDistance) : null,
      userId: Number(user.id)
    }
    console.log('Creating club with payload:', payload)
    try {
      const created = await ClubService.create(payload)
      console.log('Club created:', created)
      setClubs(prev => [...prev, created])
      setNewName('Driver')
      setNewDistance('')
    } catch (err) {
      console.error('Failed to add club:', err)
      alert('Failed to add club. Please try again.')
    }
  }

  async function removeClub(id?: number) {
    if (!id) return
    await ClubService.remove(id)
    setClubs(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="app-container">
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: '600' }}>Club Distances</h2>
        
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          boxShadow: 'var(--card-shadow)',
          marginBottom: '16px'
        }}>
          {loading ? (
            <div style={{ color: 'var(--muted)' }}>Loading...</div>
          ) : clubs.length === 0 ? (
            <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '20px' }}>
              No clubs added yet. Add your first club below!
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {clubs.map(c => (
                <li key={c.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'rgba(59, 130, 246, 0.05)',
                  marginBottom: '8px'
                }}>
                  <div>
                    <span style={{ fontWeight: '500' }}>{c.clubName}</span>
                    <span style={{ color: 'var(--muted)', marginLeft: '12px' }}>
                      {c.carryDistance ?? '-'} yards
                    </span>
                  </div>
                  <Button variant="ghost" onClick={() => removeClub(c.id)}>Delete</Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          boxShadow: 'var(--card-shadow)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Add New Club</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>
              Club name
            </label>
            <select 
              value={newName} 
              onChange={e => setNewName(e.target.value)}
              style={{ width: '100%' }}
            >
              {CLUB_OPTIONS.map(club => (
                <option key={club} value={club}>{club}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>
              Distance (yards)
            </label>
            <input 
              type="number"
              value={newDistance as any} 
              onChange={e => setNewDistance(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="250"
              style={{ 
                width: '100%',
                fontSize: '18px',
                textAlign: 'center',
                padding: '16px'
              }}
            />
          </div>

          <Button onClick={addClub} style={{ width: '100%', justifyContent: 'center' }}>
            Add Club
          </Button>
        </div>
      </div>
    </div>
  )
}
