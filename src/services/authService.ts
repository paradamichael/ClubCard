import api from './api'

export default {
  async login(email: string, password: string) {
    const res = await api.post('/auth/login', { email, password })
    const user = res.data.user
    const token = 'authenticated'
    localStorage.setItem('golf:token', token)
    localStorage.setItem('golf:user', JSON.stringify(user))
    return { token, user }
  },

  async signup(email: string, password: string, name?: string) {
    const res = await api.post('/auth/signup', { email, password, name })
    const user = res.data.user
    const token = 'authenticated'
    localStorage.setItem('golf:token', token)
    localStorage.setItem('golf:user', JSON.stringify(user))
    return { token, user }
  },

  logout() {
    localStorage.removeItem('golf:token')
  }
}
