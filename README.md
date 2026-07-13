# Anuj Singh — Portfolio

A fast, dual-theme personal portfolio built with Vite, React 18, Tailwind CSS,
and Framer Motion.

## Stack

- **Build tool:** Vite (no CRA / react-scripts)
- **Framework:** React 18
- **Styling:** Tailwind CSS, dual light/dark theme
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Routing:** React Router DOM v6 (with a GitHub Pages–safe basename setup)

## Run it locally

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. Requires **Node 20+**.

## Project structure

```
public/
  certs/            9 certificate images (.jpg) + originals (.pdf)
  screenshots/      Tech-Restart Learning Companion screenshots + full PDF
  videos/intro.mp4  Hero intro video
  images/profile.jpg
  anuj-singh-resume.pdf
  404.html          GitHub Pages SPA redirect (see "Deploying" below)
src/
  components/       One file per section/UI piece
  data/             profile.js, skills.js, projects.js, certificates.js, journey.js
                     — edit these to update site content, nothing else needed
  context/ThemeContext.jsx
  utils/recruiterBot.js   Local knowledge engine behind the chat widget
```

To change any text, link, project, or certificate, edit the matching file in
`src/data/` — components read from there, so content never has to be edited
in two places.

## Certificates & screenshots

Every certificate card links straight to the **original PDF** in
`public/certs/`, so what opens is always the authentic document, not a
re-render. The thumbnail `.jpg` next to each PDF is only a cropped preview
for the grid.

The **Tech-Restart Learning Companion** project card shows a screenshot
gallery (click any thumbnail to open the lightbox) instead of a live demo
link, plus a "Full PDF" button that opens
`public/screenshots/tech-restart-learning-companion-screenshots.pdf`.

## Intro video behavior

The hero video autoplays muted **once**, on a visitor's very first page
load (tracked via `localStorage`, key `as-intro-seen`). After that — or as
soon as it's paused — it only plays via the custom play/pause and mute
controls. Clear that `localStorage` key (or open in a private window) to
see the first-visit behavior again.

## The "AI Recruiter Chat" widget

The floating chat button is powered by a small **local, keyword-matching
knowledge engine** (`src/utils/recruiterBot.js`) that reads from the same
`src/data/*.js` files as the rest of the site — so it can never say
something the page doesn't back up, and it needs **zero API keys**.

Want it backed by a real LLM (e.g. the Gemini API) instead? Replace the body
of `getBotReply` in `src/utils/recruiterBot.js` with a `fetch` call to your
provider, reading the key from an env var:

```bash
# .env.local (never commit this file)
VITE_GEMINI_API_KEY=your_key_here
```

```js
const key = import.meta.env.VITE_GEMINI_API_KEY;
// fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-...`, { ... })
```

## Deploying to GitHub Pages

This is the part most portfolio sites get wrong — a project page lives at
`username.github.io/repo-name/`, a **subpath**, not the domain root, and
that trips up client-side routers unless it's handled explicitly. This repo
already handles it in three places:

1. **`vite.config.js`** reads `VITE_BASE_PATH` and uses it as the build's
   `base`. Build with your repo name:

   ```bash
   VITE_BASE_PATH=/your-repo-name/ npm run build
   ```

   If you're deploying to a **user/org page** (`username.github.io`) or a
   **custom domain**, skip the env var — the default base is `/`.

2. **`src/main.jsx`** sets the router's `basename` from
   `import.meta.env.BASE_URL`, which Vite derives from that same `base` —
   so the two never fall out of sync.

3. **`public/404.html`** + the redirect-decoder `<script>` in `index.html`
   implement the standard `spa-github-pages` trick, so refreshing or deep
   linking to `username.github.io/repo-name/projects` doesn't 404 or show a
   blank white screen — GitHub serves `404.html`, which bounces the visitor
   back through `index.html` with the real path restored.

### Steps

```bash
# 1. Create a GitHub repo and push this project to it
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Anujsingh77/<your-repo-name>.git
git push -u origin main

# 2. Build with the correct base path
VITE_BASE_PATH=/<your-repo-name>/ npm run build

# 3. Deploy the dist/ folder to the gh-pages branch
npx gh-pages -d dist

# 4. In the GitHub repo settings → Pages, set the source to the
#    gh-pages branch (root), if it isn't picked up automatically.
```

Your site will be live at `https://Anujsingh77.github.io/<your-repo-name>/`.

### Deploying to Vercel / Netlify instead

Both platforms serve from the domain root, so no `VITE_BASE_PATH` or 404
trick is needed — just point them at this repo with build command
`npm run build` and output directory `dist`.

## Updating your GitHub / LinkedIn / project links later

All personal and project links live in `src/data/profile.js` and
`src/data/projects.js` — search for the field and edit the string, no other
file needs to change.
