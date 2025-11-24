import React, { createContext, useContext, useState, useEffect } from 'react'
import AuthService from '../services/authService'
import kc from '../keycloak'

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

  // If Keycloak has a token, prefer that and populate user from token claims
  useEffect(() => {
    if (kc && (kc.token || kc.tokenParsed)) {
      const t = kc.token as string | undefined
      if (t) {
        setToken(t)
        localStorage.setItem('golf:token', t)
      }
      try {
        const parsed: any = kc.tokenParsed
        if (parsed) {
          setUser({ id: parsed.sub, email: parsed.email, name: parsed.name || parsed.preferred_username })
          localStorage.setItem('golf:user', JSON.stringify({ id: parsed.sub, email: parsed.email, name: parsed.name || parsed.preferred_username }))
        }
      } catch {}
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
    // If Keycloak is configured in the app, use it for interactive login
    if (kc) {
      kc.login()
      return
    }
    if (email && password) {
      const res = await AuthService.login(email, password)
      setToken(res.token)
    }
  }

  async function signup(email: string, password: string, name?: string) {
    // For Keycloak, user signup is typically handled via Keycloak's registration or admin flows
    if (kc) {
      // redirect to registration page
      kc.register()
      return
    }
    const res = await AuthService.signup(email, password, name)
    setToken(res.token)
  }

  function logout() {
    // prefer Keycloak logout so session is cleared at IdP
    if (kc) {
      try { kc.logout() } catch {}
    }
    setToken(null)
    setUser(null)
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
