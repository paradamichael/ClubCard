import api from './api'

export default {
  async login(email: string, password: string) {
    const res = await api.post('/auth/login', { email, password })
    const token = res.data.token
    localStorage.setItem('golf:token', token)
    return { token }
  },

  async signup(email: string, password: string, name?: string) {
    const res = await api.post('/auth/signup', { email, password, name })
    const token = res.data.token
    localStorage.setItem('golf:token', token)
    return { token }
  },

  logout() {
    localStorage.removeItem('golf:token')
  }
}
