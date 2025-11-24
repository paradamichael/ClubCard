import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { signup } = useAuth()
  const nav = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await signup(email, password, name)
      nav('/')
    } catch (err) {
      console.error(err)
      alert('Signup failed')
    }
  }

  return (
    <div className="app-container">
      <h2 className="page-title">Signup</h2>
      <Card>
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} />
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <div style={{marginTop:12}}>
            <Button type="submit">Create account</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
