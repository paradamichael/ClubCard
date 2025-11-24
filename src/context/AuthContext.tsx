import React, { createContext, useContext, useState, useEffect } from 'react'
import AuthService from '../services/authService'

type User = { id?: string; email?: string; name?: string } | null

type AuthContextType = {
  user: User
  token: string | null
  login: (email?: string, password?: string) => Promise<void> | void
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
      }
    }
  }

  async function signup(email: string, password: string, name?: string) {
    const res = await AuthService.signup(email, password, name)
    if (res.user) {
      setUser(res.user)
      setToken(res.token || 'simple-auth-token')
    }
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('golf:token')
    localStorage.removeItem('golf:user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
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
