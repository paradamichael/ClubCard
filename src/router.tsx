import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Scorecard from './pages/Scorecard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scorecard" element={<Scorecard />} />
    </Routes>
  )
}
