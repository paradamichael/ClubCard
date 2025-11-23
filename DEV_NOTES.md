# ClubCard — Developer Notes

Summary
-------
ClubCard is a small React + TypeScript progressive web app (PWA) for tracking golf scores. It was scaffolded with Vite and includes a simple UI inspired by PopStroke/Tiger Woods mini-golf apps.

What I created
--------------
- Vite + React + TypeScript project
- PWA support via `vite-plugin-pwa` and placeholder icons in `public/`
- Folder structure:
  - `src/pages/` — `Home.tsx`, `Scorecard.tsx`
  - `src/components/` — `Header.tsx`, `ScoreInput.tsx`, `Button.tsx`, `Card.tsx`
  - `src/hooks/` — `useLocalStorage.ts`, `useScores.ts`
  - `src/services/` — `scoreService.ts`
  - `src/router.tsx`, `src/main.tsx`, `src/App.tsx`, `src/index.css`

Run locally
-----------
Install deps (already done if you followed earlier steps):
```bash
cd /Users/mparada/Projects/GolfScoreApp
npm install
npm run dev
# Open http://localhost:5173 (Vite prints the port)
```

Notes about the service worker
-----------------------------
- During development the PWA service worker can cache pages. To avoid this while iterating, unregister the SW in DevTools (Application → Service Workers → Unregister) or disable registration in `src/main.tsx` for dev builds.

Helpful commands
---------------
- Open in VS Code:
```bash
code /Users/mparada/Projects/GolfScoreApp
```
- Stop dev server (if running):
```bash
# in the terminal where dev server is running: Ctrl+C
# or kill by port: lsof -tiTCP:5173 -sTCP:LISTEN -Pn | xargs kill
```

Repo & remote
--------------
- GitHub: https://github.com/paradamichael42-sys/ClubCard

Next suggested tasks
--------------------
- Replace placeholder PWA icons with production PNGs (in `public/`).
- Add Inter or a preferred web font for a closer PopStroke look.
- Add basic GitHub Actions CI (lint/build) and a simple unit test runner.
- Add data export/import (CSV) for rounds and scores.

If you'd like, I can make any of the next-step changes now.
