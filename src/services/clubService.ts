import api from './api'

export default {
  list: async (userId?: string) => {
    const params = userId ? { userId } : {}
    const res = await api.get('/clubs', { params })
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
