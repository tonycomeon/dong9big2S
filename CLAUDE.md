# 말랑이 컬러 소트 (dong9big2s)

A private, non-commercial bead-sort puzzle game Tony made for his girlfriend. Installed on her phone as a home-screen web app (PWA) and must keep working offline.

## Live site and deploy
- Live: https://tonycomeon.github.io/dong9big2S/
- GitHub Pages deploys from the `main` branch, root folder. **Pushing to `main` is the deploy** — no build step. A push triggers the "pages build and deployment" workflow; it is live 1–2 minutes later.
- `.nojekyll` is present so Pages serves files as-is.

## Files
- `index.html` — the whole game (HTML + CSS + JS in one file). This is the source of truth; edit it directly.
- `sw.js` — service worker for offline play. The page is network-first (new deploys show on next open while online), other files are cache-first. Bump `VERSION` when changing cached assets like icons or the manifest.
- `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` — home-screen app metadata.

## Game rules (current)
- Each level is a generated pixel picture of an original round animal friend (no licensed characters — do not add Sanrio, Chiikawa, or other copyrighted characters).
- Some beads start in the wrong cells. Nothing is placed automatically — this is deliberate, Tony asked for ~10x more player input than the first version.
- Tap a wrong bead to pick up its whole group: every wrong bead of the same color touching it up/down/left/right (`groupAt`, stored as `held.cells`). Every empty cell of that color pulses.
- Tap a pulsing cell to drop the group: beads fill the tapped cell first, then the nearest empty cells of that color (`spotsFrom`). Extras that don't fit stay selected. Or tap a tray to store as many as fit (2 trays × 9 slots, a 3rd unlocks once per level).
- Tapping a tray bead selects all tray beads of that color; tapping an empty cell (with or without a selection) places as many matching tray beads as fit, nearest first.
- 100 levels. Difficulty = picture size (12×14 → 20×24) and scramble fraction (`startLevel`: `.45 + .45 * (n-1)/99`).
- Progress (`lv`, `maxLv`) is saved in localStorage key `mallang2`.
- "내 그림으로" turns a photo from the phone into an 18-wide, 8-color board.

## Conventions
- UI text is Korean. Keep the game a single self-contained file; the only external resource is the Jua font from Google Fonts (cached by the service worker, falls back to system fonts offline).
- Test at phone width (~390px) before pushing; the board must fit one screen with no scrolling.
