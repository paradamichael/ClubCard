import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="app-container">
      <h2 className="page-title">Settings</h2>
      <Card>
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>Appearance</h3>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: '1px solid var(--border-color, #e0e0e0)'
        }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>Dark Mode</div>
            <div className="muted" style={{ fontSize: '14px' }}>
              Switch between light and dark themes
            </div>
          </div>
          <label style={{ 
            position: 'relative', 
            display: 'inline-block', 
            width: '60px', 
            height: '34px' 
          }}>
            <input 
              type="checkbox" 
              checked={isDarkMode}
              onChange={toggleDarkMode}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isDarkMode ? '#3498db' : '#ccc',
              transition: '0.4s',
              borderRadius: '34px'
            }}>
              <span style={{
                position: 'absolute',
                content: '',
                height: '26px',
                width: '26px',
                left: isDarkMode ? '30px' : '4px',
                bottom: '4px',
                backgroundColor: 'white',
                transition: '0.4s',
                borderRadius: '50%'
              }}></span>
            </span>
          </label>
        </div>

        <h3 style={{ marginTop: '24px', marginBottom: '16px', fontSize: '18px' }}>Account</h3>
        <Button 
          onClick={handleLogout}
          style={{ 
            width: '100%',
            backgroundColor: '#dc2626',
            marginTop: '8px'
          }}
        >
          Log Out
        </Button>

        <h3 style={{ marginTop: '24px', marginBottom: '16px', fontSize: '18px' }}>About</h3>
        <p className="muted">ClubCard - Your digital golf scorecard</p>
        <p className="muted" style={{ fontSize: '14px', marginTop: '8px' }}>Version 1.0.0</p>
      </Card>
    </div>
  )
}
