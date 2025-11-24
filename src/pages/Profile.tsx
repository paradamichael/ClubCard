import React from 'react'
import Card from '../components/Card'

export default function Profile() {
  return (
    <div className="app-container">
      <h2 className="page-title">Profile</h2>
      <Card>
        <p className="muted">User information and preferences will appear here.</p>
      </Card>
    </div>
  )
}
