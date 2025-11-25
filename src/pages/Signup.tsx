import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import Card from '../components/Card'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { signup, googleLogin } = useAuth()
  const nav = useNavigate()
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

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

  async function handleGoogleSuccess(credentialResponse: any) {
    try {
      await googleLogin(credentialResponse.credential)
      nav('/')
    } catch (err) {
      console.error('Google signup failed:', err)
      alert('Google signup failed')
    }
  }

  function handleGoogleError() {
    console.error('Google signup failed')
    alert('Google signup failed')
  }

  return (
    <div className="app-container">
      <h2 className="page-title">Sign Up</h2>
      <Card>
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} type="text" required />
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          <div style={{marginTop:12}}>
            <Button type="submit">Create Account</Button>
          </div>
        </form>

        {googleClientId && (
          <>
            <div style={{ 
              margin: '24px 0', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              color: 'var(--muted)'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
              <span style={{ fontSize: '14px' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="signup_with"
              />
            </div>
          </>
        )}

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600' }}>Log in</Link>
        </div>
      </Card>
    </div>
  )
}
