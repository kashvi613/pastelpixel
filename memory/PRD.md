# Pixel Dev OS — Pixel-Art macOS Portfolio

## Original Problem Statement
Build a pixel-art portfolio website that looks like a macOS desktop. Pastel gradient background (pink to peach to lavender), top menu bar with name and live clock, floating clouds, sticky note with tagline, pixel-art girl character above the dock, desktop icons representing projects (each icon matches project type), draggable/stackable macOS-style windows, boot screen intro, custom pixel cursor, 8-bit window sounds, and a "Rejected Concepts" trash can easter egg. Font: Press Start 2P. Vibe: retro pixel OS, pastel, cute but professional.

## User Personas
- Recruiters/hiring managers exploring work samples playfully
- Creative directors judging craft and interaction design
- Fellow developers / pixel-art fans

## Architecture
- Frontend-only React SPA (no backend dependency); all content in `src/data/content.js`
- Pixel rendering: hand-authored string-grid sprites via `PixelSprite` (SVG, crispEdges) — icons, pixel girl, clouds, logo
- Sound: Web Audio API chiptune synth (`src/utils/audioSynth.js`) — boot chime, open/close/minimize/maximize, trash noise burst, speech blips; no audio files
- Window manager: React state in App.js (windows array + zOrder stack), custom pointer-event dragging, minimize-to-dock, maximize
- framer-motion for boot exit, window springs, clouds, dock, speech bubbles, trash explosion

## Implemented (2026-07)
- Boot screen: BIOS-style typed lines, progress bar, sound toggle, Enter/click to start, CRT collapse exit
- Desktop: pastel gradient, drifting pixel clouds, scanline + vignette overlays
- Menu bar: pixel heart logo, name, active window title, SND toggle, live 12h clock with blinking colons
- Sticky note with tagline (draggable), pixel girl with cycling speech bubbles above the dock
- 8 desktop icons + dock with unique pixel-art icons per project type (gamepad, synth, palette, monitor, face, gear, doc, envelope, trash)
- Windows: draggable, stackable, minimize/maximize/close with traffic-light buttons and 8-bit sounds
- Content windows: 4 projects, About, Tech Stack (animated bars), Resume (real .txt download), Contact (copy email + mailto)
- Trash easter egg: 6 rejected concepts, Restore buttons, Empty Trash with particle explosion
- Custom pixel cursor (arrow; pink variant on interactive elements), mobile fallbacks (tap-to-open)
- SEO: Seo component, llms.txt, all data-testids

## Backlog
- P0: Replace placeholder identity (name "Pixel Dev", projects, email) with real user content
- P1: Wallpaper picker (alternate pastel themes), menu-bar dropdown menus (File/Edit spoof)
- P1: Mobile polish — full-screen windows by default on small screens
- P2: Screensaver mode after idle, keyboard shortcuts (Ctrl+W close, arrows to move icons)
- P2: Girl walk/idle animation frames, more speech lines, achievements popup for finding easter eggs

## Next Tasks
1. Collect real name, tagline, project list, and links from user
2. Add per-project screenshot/thumbnail inside project windows
3. Sound theme variants
