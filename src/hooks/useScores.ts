import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type Score = { hole: number; strokes: number }

export function useScores() {
  const [scores, setScores] = useLocalStorage<Score[]>('golf:scores', [])

  const addScore = useCallback((s: Score) => {
    setScores(prev => [...prev, s])
  }, [setScores])

  const clearScores = useCallback(() => setScores([]), [setScores])

  return { scores, addScore, clearScores }
}
