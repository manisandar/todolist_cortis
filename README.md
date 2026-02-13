# Cortis Valentine Web App

A Vite + React web app with a romantic K-pop theme, dynamic member themes, mini games, quiz, to-do progress tracking, study timer, and albums gallery.

## Tech Stack
- React (JavaScript)
- Vite
- CSS (no Tailwind)
- localStorage (tasks + snake high score)

## Features
- Dynamic theme switcher for:
  - Cortis (group)
  - Martin
  - James
  - Juhoon
  - Seonghyeon
  - Keonho
- Theme colors update app-wide (background, buttons, cards, borders, accents)
- Photo slideshow below top nav (changes by selected theme)
- To-Do List:
  - add / complete / undo / delete
  - task progress bar with moving avatar
  - localStorage persistence
- Quiz:
  - question library in separate file
  - random 5 questions per round
  - true/false-style dreamy feedback per answer
- Albums page:
  - album-only cards from separate library file
- Study Timer:
  - start/pause/reset
  - rotating motivational quote library (separate file)
  - completion popup with image
- Snake Game:
  - keyboard + touch arrows
  - snake eats member avatar food and grows
  - local high score saved
- Background music support with toggle

## Run Locally
```bash
npm install
npm run dev
```

## Routes
- `/todo`
- `/quiz`
- `/albums`
- `/timer`
- `/snake`

## Editable Data Files
- Members/themes/photos: `src/data/members.js`
- Quiz library: `src/data/quizQuestions.js`
- Study quotes library: `src/data/studyQuotes.js`
- Album art library: `src/data/albumArtLibrary.js`

## Assets
### Member / Group Images
Use folders under `public/images/`:
- `public/images/group/`
- `public/images/martin/`
- `public/images/james/`
- `public/images/juhoon/`
- `public/images/seonghyeon/`
- `public/images/keonho/`

### Background Music
Put your song file here:
- `public/audio/bg-music.mp3`

Music is configured to load from `/audio/bg-music.mp3`.

## Notes
- Some browsers block autoplay until first user interaction. The app includes a fallback and a `Music: On/Off` toggle.
- If you change image/audio filenames, update paths in data/components accordingly.
