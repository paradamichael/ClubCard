import api from './api'

export default {
  list: async () => {
    const res = await api.get('/clubs')
    return res.data
  },
  create: async (payload: any) => {
    const res = await api.post('/clubs', payload)
    return res.data
  },
  remove: async (id: number) => {
    await api.delete(`/clubs/${id}`)
  }
}
