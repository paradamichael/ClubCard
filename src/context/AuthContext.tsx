import React, { createContext, useContext, useState, useEffect } from 'react'
import AuthService from '../services/authService'
import { useTheme } from './ThemeContext'

type User = { id?: string; email?: string; name?: string } | null

type AuthContextType = {
  user: User
  token: string | null
  login: (email?: string, password?: string) => Promise<void> | void
  signup: (email: string, password: string, name?: string) => Promise<void>
  googleLogin: (idToken: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const { loadUserPreferences } = useTheme()
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('golf:token'))
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem('golf:user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  // Keycloak is disabled - using simple backend auth
  
  // Load user preferences on mount if user is already logged in
  useEffect(() => {
    if (user?.id) {
      loadUserPreferences(user.id)
    }
  }, [])

  useEffect(() => {
    if (token) localStorage.setItem('golf:token', token)
    else localStorage.removeItem('golf:token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('golf:user', JSON.stringify(user))
    else localStorage.removeItem('golf:user')
  }, [user])

  async function login(email?: string, password?: string) {
    if (email && password) {
      const res = await AuthService.login(email, password)
      if (res.user) {
        setUser(res.user)
        setToken(res.token || 'simple-auth-token')
        // Load user preferences after login
        if (res.user.id) {
          await loadUserPreferences(res.user.id)
        }
      }
    }
  }

  async function signup(email: string, password: string, name?: string) {
    const res = await AuthService.signup(email, password, name)
    if (res.user) {
      setUser(res.user)
      setToken(res.token || 'simple-auth-token')
      // Load user preferences after signup
      if (res.user.id) {
        await loadUserPreferences(res.user.id)
      }
    }
  }

  async function googleLogin(idToken: string) {
    const res = await AuthService.googleLogin(idToken)
    if (res.user) {
      setUser(res.user)
      setToken(res.token || 'simple-auth-token')
      // Load user preferences after Google login
      if (res.user.id) {
        await loadUserPreferences(res.user.id)
      }
    }
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('golf:token')
    localStorage.removeItem('golf:user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProviderInner>
      {children}
    </AuthProviderInner>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default function withAuth(Component: any) {
  return function Wrapper(props: any) {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    )
  }
}
