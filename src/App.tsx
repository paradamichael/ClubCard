import React from 'react'
import { useLocation } from 'react-router-dom'
import AppRoutes from './router'
import Header from './components/Header'

// Version: December 2025 - UI/UX improvements
export default function App() {
  const location = useLocation()
  const hideHeader = ['/', '/login', '/signup'].includes(location.pathname)

  return (
    <>
      {!hideHeader && <Header />}
      <main>
        <AppRoutes />
      </main>
    </>
  )
}
