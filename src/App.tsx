import React from 'react'
import AppRoutes from './router'
import Header from './components/Header'

export default function App() {
  return (
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        <AppRoutes />
      </main>
    </>
  )
}
