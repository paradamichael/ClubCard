import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, googleLogin } = useAuth()
  const nav = useNavigate()
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await login(email, password)
      nav('/home')
    } catch (err) {
      console.error(err)
      alert('Login failed')
    }
  }

  async function handleGoogleSuccess(credentialResponse: any) {
    try {
      await googleLogin(credentialResponse.credential)
      nav('/home')
    } catch (err) {
      console.error('Google login failed:', err)
      alert('Google login failed')
    }
  }

  function handleGoogleError() {
    console.error('Google login failed')
    alert('Google login failed')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: 'var(--bg)'
    }}>
      {/* Logo */}
      <div style={{
        marginBottom: '48px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 20px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '36px',
          fontWeight: '700',
          boxShadow: '0 8px 24px rgba(6, 182, 212, 0.3)'
        }}>
          C
        </div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>ClubCard</h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>Welcome Back</p>
      </div>

      {/* Login Form */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--surface)',
        borderRadius: 'var(--radius)',
        padding: '32px',
        boxShadow: 'var(--card-shadow)'
      }}>
        <form onSubmit={onSubmit} style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>E-mail Address</label>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" 
              required 
              placeholder="Enter your email"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password"
              style={{ width: '100%' }}
            />
          </div>
          <Button type="submit" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>LOG IN</Button>
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
              <span style={{ fontSize: '12px', textTransform: 'uppercase' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                size="large"
                text="signin_with"
                width="100%"
              />
            </div>
          </>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--muted)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: '600' }}>Sign up</Link>
        </div>
      </div>
    </div>
  )
}
