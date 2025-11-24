import React from 'react'
import Card from '../components/Card'

export default function Settings() {
  return (
    <div className="app-container">
      <h2 className="page-title">Settings</h2>
      <Card>
        <p className="muted">App settings, PWA settings, and preferences.</p>
      </Card>
    </div>
  )
}
