# Personal Portfolio

A calm, nature-inspired portfolio site. One page, one scroll, no framework,
no build step, no dependencies. Open `index.html` and it works.

## Editing your content

**You only ever need to touch one file: [`js/data.js`](js/data.js).**

Every word on the page comes from the object in that file — your name, the
hero, about, values, projects, timeline, extracurriculars, bookshelf,
interests and contact details. Change the text, save, refresh.

```
js/data.js        ← your content. This is the file you edit.
index.html        ← page skeleton and mount points.
css/style.css     ← all the design. Colours are the first 80 lines.
js/botanical.js   ← the hand-drawn plant SVGs.
js/render.js      ← turns data.js into HTML. Rarely needs changing.
js/scroll.js      ← reveal-on-scroll, sticky nav, theme toggle, copy email.
```

## Sections on the page

Six major sections, in this order:

1. **Home** — photo, name, tagline
2. **About me** — who you are, quick facts, four principles
3. **My projects** — what you're building now, then the projects themselves
4. **Résumé** — education and honors, coursework and skills, experience
5. **Beyond the classroom** — activities and leadership, reading, interests
6. **Contact me** — email, phone, links

Each section groups several blocks under one heading, so the page reads as six
stops rather than a dozen. To remove a section, delete its `<section>` from
`index.html` and its block from `data.js`.

## Adding your photo

Your photo is already in `assets/profile.jpg`. Two knobs in `data.js`:

```js
photo: "assets/profile.jpg",
photoPosition: "center 15%",
```

`photoPosition` controls which part of the photo stays visible inside the
circle. The second value is vertical — **lower percentages show more of the
top of the image**. If your face sits too low in the circle, drop it to
`center 8%`; too high, raise it to `center 25%`.

Set `photo: ""` and the site falls back to your initials in a ringed circle,
which looks intentional rather than broken.

## Running it locally

Double-click `index.html` — it works straight from the filesystem, because the
content is a plain JS file rather than a fetched JSON request.

For a local server (needed only for the copy-email button):

```bash
npx serve .
```

## Design notes

**Colour.** Two greens do two jobs. `--leaf` is the soft sage used for
illustrations and icons. `--leaf-ink` is the same green pushed darker so it
stays readable as text. Every text and graphic pair on the page has been
measured against WCAG AA in both light and dark mode.

**Motion.** There is exactly one animation: a slow, soft rise as elements
enter the viewport. Same distance, same easing, same duration everywhere —
that consistency is what makes it feel calm instead of busy. All of it is
disabled under `prefers-reduced-motion`.

**Clicks.** The page is built to be scrolled, not navigated. There are no
tabs, filters, accordions or modals — every piece of content is visible by
scrolling. The whole page has fewer than twenty interactive elements, and the
nav is a convenience rather than a requirement.

**Touch.** Every interactive element has at least a 44×44px hit area. Text
links use an invisible pseudo-element to grow the tappable box without pushing
their underline away from the text.

## Customising the look

`css/style.css` starts with the design tokens:

- `[data-theme="light"]` / `[data-theme="dark"]` — the two palettes
- `--font-serif` / `--font-sans` — Lora and Raleway (update the Google Fonts
  `<link>` in `index.html` if you change them)
- `--band`, `--gutter`, `--wrap` — the spacing rhythm

If you change a green, re-check its contrast. The two that matter are
`--leaf-ink` against `--paper`/`--tint` (needs 4.5:1) and `--forest-ink`
against `--forest` (the button label, also 4.5:1).

## Deploying

See [DEPLOY.md](DEPLOY.md).
