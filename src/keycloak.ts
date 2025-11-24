import Keycloak from 'keycloak-js'

const kc = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8081',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'clubcard',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'clubcard-frontend'
})

export default kc
