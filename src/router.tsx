import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Scorecard from './pages/Scorecard'
import ClubDistances from './pages/ClubDistances'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/club-distances"
        element={
          <ProtectedRoute>
            <ClubDistances />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/scorecard"
        element={
          <ProtectedRoute>
            <Scorecard />
          </ProtectedRoute>
        }
      />

      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
