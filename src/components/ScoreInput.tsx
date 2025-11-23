import React, { useState } from 'react'
import Button from './Button'

type Props = { onAdd: (score: { hole: number; strokes: number }) => void }

export default function ScoreInput({ onAdd }: Props) {
  const [hole, setHole] = useState(1)
  const [strokes, setStrokes] = useState(4)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ hole, strokes })
    setHole(hole + 1)
    setStrokes(4)
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: '1rem' }}>
      <div className="form-row">
        <label>
          Hole:
          <input type="number" value={hole} min={1} onChange={e => setHole(Number(e.target.value))} />
        </label>

        <label>
          Strokes:
          <input type="number" value={strokes} min={1} onChange={e => setStrokes(Number(e.target.value))} />
        </label>

        <Button type="submit">Add</Button>
      </div>
    </form>
  )
}
