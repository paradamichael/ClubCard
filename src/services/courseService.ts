import api from './api'

export default {
  list: async () => {
    const res = await api.get('/courses')
    return res.data
  },
  create: async (payload: any) => {
    const res = await api.post('/courses', payload)
    return res.data
  }
}
