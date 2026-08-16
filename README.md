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

Seven sections, with five in the top nav:

1. **Home** — the large arched portrait, name, tagline
2. **Nested** — the featured project, deliberately the biggest block on the page
3. **About me** — who you are, quick facts, four principles
4. **Work experience** — education and honors, coursework and skills, five roles
5. **My goals** — short and long term
6. **Beyond the classroom** — activities, reading, interests
7. **Contact me** — email, phone, links

Nested sits immediately after the hero because it's the work you most want
people to see. To move it below About, swap the two `<section>` blocks in
`index.html` and reorder the nav links above them.

## Nested

Its own top-level block in `data.js`. Two things worth knowing:

- `screenshot: ""` — the section currently draws an isometric room in SVG as a
  stand-in. Put a real screenshot in `assets/`, name it here, and it replaces
  the drawing.
- `links: { live: "", repo: "" }` — while both are empty the section says
  "Links coming once it's deployed." Fill either one and proper buttons appear.

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
