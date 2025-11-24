import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import ClubService from '../services/clubService'

type Club = { id?: number; clubName: string; clubType?: string; carryDistance?: number }

export default function ClubDistances() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDistance, setNewDistance] = useState<number | ''>('')

  async function load() {
    setLoading(true)
    try {
      const data = await ClubService.list()
      setClubs(data)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function addClub() {
    if (!newName) return alert('Provide a club name')
    const payload = { clubName: newName, carryDistance: newDistance ? Number(newDistance) : null }
    const created = await ClubService.create(payload)
    setClubs(prev => [...prev, created])
    setNewName('')
    setNewDistance('')
  }

  async function removeClub(id?: number) {
    if (!id) return
    await ClubService.remove(id)
    setClubs(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="app-container">
      <h2 className="page-title">Club Distances</h2>
      <Card>
        {loading ? <div>Loading...</div> : (
          <ul>
            {clubs.map(c => (
              <li key={c.id} className="spaced">
                <div>{c.clubName} <span className="muted">{c.carryDistance ?? '-'} yd</span></div>
                <div>
                  <Button className="ghost" onClick={() => removeClub(c.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div style={{marginTop:12}}>
          <label>Club name</label>
          <input value={newName} onChange={e => setNewName(e.target.value)} />
          <label>Carry distance (yards)</label>
          <input value={newDistance as any} onChange={e => setNewDistance(e.target.value === '' ? '' : Number(e.target.value))} />
          <div style={{marginTop:12}}>
            <Button onClick={addClub}>Add Club</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
