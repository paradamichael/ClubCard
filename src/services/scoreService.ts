import { Score } from '../hooks/useScores'

const KEY = 'golf:scores'

export const scoreService = {
  getAll(): Score[] {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  },
  saveAll(scores: Score[]) {
    localStorage.setItem(KEY, JSON.stringify(scores))
  }
}
