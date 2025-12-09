import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
  loadUserPreferences: (userId: string) => Promise<void>
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  loadUserPreferences: async () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode] = useState(true) // Always dark mode
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    // Always enable dark mode
    document.documentElement.classList.add('dark-mode')

    // Sync with backend if user is logged in
    if (userId) {
      api.put(`/preferences/${userId}`, { darkMode: true })
        .catch(err => console.error('Failed to save theme preference:', err))
    }
  }, [userId])

  const loadUserPreferences = async (uid: string) => {
    try {
      setUserId(uid)
      // Dark mode is always on, no need to load preference
    } catch (err) {
      console.error('Failed to load user preferences:', err)
    }
  }

  const toggleDarkMode = () => {
    // Dark mode is always on, no toggle
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, loadUserPreferences }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
