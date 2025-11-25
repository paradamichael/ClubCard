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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('golf:darkMode')
    return saved === 'true'
  })
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('golf:darkMode', String(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }

    // Sync with backend if user is logged in
    if (userId) {
      api.put(`/preferences/${userId}`, { darkMode: isDarkMode })
        .catch(err => console.error('Failed to save theme preference:', err))
    }
  }, [isDarkMode, userId])

  const loadUserPreferences = async (uid: string) => {
    try {
      setUserId(uid)
      const res = await api.get(`/preferences/${uid}`)
      setIsDarkMode(res.data.darkMode || false)
    } catch (err) {
      console.error('Failed to load user preferences:', err)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
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
