import React, { useEffect, useState, createContext, useContext } from 'react'
import kc from '../keycloak'

type KeycloakContextType = {
  initialized: boolean
  login: () => void
  logout: () => void
  token: string | null
}

const KeycloakContext = createContext<KeycloakContextType>({} as KeycloakContextType)

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const [token, setToken] = useState<string | null>(localStorage.getItem('golf:token'))

  useEffect(() => {
    kc.init({ onLoad: 'check-sso', pkceMethod: 'S256' }).then(async (auth) => {
      if (auth) {
        const t = kc.token
        if (t) {
          localStorage.setItem('golf:token', t)
          setToken(t)
        }
      }
      setInitialized(true)
      // Token refresh loop
      setInterval(async () => {
        try {
          const refreshed = await kc.updateToken(30)
          if (refreshed) {
            localStorage.setItem('golf:token', kc.token as string)
            setToken(kc.token as string)
          }
        } catch {}
      }, 60_000)
    })
  }, [])

  function login() { kc.login() }
  function logout() { kc.logout(); localStorage.removeItem('golf:token'); setToken(null) }

  return (
    <KeycloakContext.Provider value={{ initialized, login, logout, token }}>
      {children}
    </KeycloakContext.Provider>
  )
}

export function useKeycloak() {
  return useContext(KeycloakContext)
}
