# Personal Portfolio

A hand-written portfolio site. No framework, no build step, no dependencies.
Open `index.html` in a browser and it works.

## Editing your content

**You only ever need to touch one file: [`js/data.js`](js/data.js).**

Everything on the page — your name, headline, mission, projects, résumé
timeline, skills, interests, contact details — is generated from the object in
that file. Change the text, save, refresh the browser.

```
js/data.js       ← your content. Edit this.
index.html       ← page skeleton and mount points.
css/style.css    ← all the design. Colours live at the top under "TOKENS".
js/render.js     ← turns data.js into HTML. Rarely needs changing.
js/effects.js    ← cursor, particles, scroll animation, theme switching.
js/palette.js    ← the ⌘K command palette.
js/main.js       ← boot + fallbacks.
```

## Running it locally

Easiest — just double-click `index.html`. Everything works from `file://`
because the content is a plain JS file, not a fetched JSON request.

For a proper local server (recommended, since the clipboard API needs it):

```bash
npx serve .
```

Then open http://localhost:3000.

## Things built into the site

| Feature | Where to find it |
|---|---|
| Command palette | Press <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd>, or `/` |
| Light + dark mode | Sun icon in the nav (remembers your choice) |
| Four accent palettes | Circle icon in the nav — citrus, ember, ice, bloom |
| Custom trailing cursor | Desktop only, disabled on touch |
| Particle constellation | Hero background, reacts to your mouse, pauses off-screen |
| Text scramble | Rotating hero word, and the nav monogram on hover |
| Scroll reveals | Every section, with staggered delays |
| Card spotlight + tilt | Hover any project card |
| Project filters | Chips above the work grid, generated from project `type` |
| Section rail | Right edge on desktop — click to jump |
| Konami code | ↑↑↓↓←→←→BA |
| Console message | Open devtools |
| Print stylesheet | <kbd>⌘P</kbd> gives a clean résumé print |

Respects `prefers-reduced-motion` — all animation is disabled for visitors who
ask for it, and the particle canvas never starts.

## Customising the look

Open `css/style.css`. The first ~70 lines are design tokens:

- `--font-serif` / `--font-sans` / `--font-mono` — swap the typefaces
  (update the Google Fonts `<link>` in `index.html` too)
- `[data-theme="dark"]` / `[data-theme="light"]` — background and text colours
- `[data-accent="…"]` — the four accent palettes. Add a fifth by copying a line
  and adding its name to the `ACCENTS` array in `js/effects.js`.

## Deploying

See [DEPLOY.md](DEPLOY.md).
