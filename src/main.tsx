import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { KeycloakProvider } from './context/KeycloakProvider'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// registers the service worker (vite-plugin-pwa)
registerSW({})

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <KeycloakProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </KeycloakProvider>
    </BrowserRouter>
  </React.StrictMode>
)
