import api from './api'

export default {
  list: async () => {
    const res = await api.get('/scorecards')
    return res.data
  },
  create: async (payload: any) => {
    const res = await api.post('/scorecards', payload)
    return res.data
  }
}
