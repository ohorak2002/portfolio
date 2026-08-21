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
css/style.css     ← all the design. Colors are the first 80 lines.
js/botanical.js   ← the hand-drawn plant SVGs.
js/render.js      ← turns data.js into HTML. Rarely needs changing.
js/scroll.js      ← reveal-on-scroll, sticky nav, photo galleries, copy email.
```

## Sections on the page

Seven sections, with five in the top nav:

1. **Home** — the large arched portrait, name, tagline
2. **Nested** — the featured project, deliberately the biggest block on the page
3. **About me** — who you are, quick facts, four principles
4. **Work experience** — education, certifications, honors, coursework and skills, five roles
5. **My goals** — short and long term
6. **Beyond the classroom** — activities, reading, interests
7. **Contact me** — email, phone, links

Nested sits immediately after the hero because it's the work you most want
people to see. To move it below About, swap the two `<section>` blocks in
`index.html` and reorder the nav links above them.

## Nested

Its own top-level block in `data.js`.

**Screenshots.** `shots` is a list of real captures from the running app. One
image shows as a still; several crossfade slowly (4.2s each) with the palette
name in the corner. They only animate while the section is on screen, and not
at all under `prefers-reduced-motion`.

```js
shots: [
  { src: "assets/nested-clay.jpg", label: "Clay & Linen" },
  ...
]
```

To refresh them: run Nested, open devtools, and paste this into the console to
downscale the canvas and save it.

```js
const c = document.querySelector('canvas'), w = 1200;
const off = document.createElement('canvas');
off.width = w; off.height = Math.round(c.height * w / c.width);
off.getContext('2d').drawImage(c, 0, 0, off.width, off.height);
const a = document.createElement('a');
a.href = off.toDataURL('image/jpeg', 0.8); a.download = 'nested-new.jpg'; a.click();
```

Check the file size afterwards. A suspiciously small file (under ~40KB) means
the camera was pointed at a blank wall when you captured.

**Links.** `links: { live: "", repo: "" }` — while both are empty the section
shows a "links coming soon" note. Fill either one and real buttons appear.

## Adding a certification

`experience.certifications.items` in `data.js`. Each entry leads with a picture
of the certificate, and clicking that picture opens the readable version:

```js
{
  name: "AI Literacy for All",
  issuer: "Digital Education Council",
  co: "University of Georgia",        // second organization, or leave it out
  issued: "August 2026",
  expires: "",                        // "" prints "No expiry"
  credentialId: "renmpdnu0c",
  verify: "https://…/certificates/renmpdnu0c",
  thumb: "assets/cert-name-thumb.jpg",   // the small one in the card
  full:  "assets/cert-name.jpg",         // opens when clicked
  blurb: "Why you took it, in one or two sentences.",
  tags: ["AI literacy"]
}
```

**Making the two images.** Save the certificate as a picture, then make a wide
version about 1400px across for `full` and a small one about 560px across for
`thumb`. Keep `thumb` under roughly 40KB — it loads with the page, `full` only
loads if someone clicks.

**Always fill in `verify`.** A certificate nobody can check is worth less than
no certificate at all. The card prints the credential ID right next to the
link so a recruiter can confirm it in one click.

Add a second entry and the cards stack down the page; nothing else changes.

## Photos for jobs, activities and interests

Any entry in `experience.jobs`, `beyond.activities` or `beyond.interests` can
take an optional `photo` field — drop a file in `assets/` and point to it:

```js
{ role: "Swim Instructor", org: "Atlanta Swim Academy", ..., photo: "assets/coaching.jpg" }
```

Leave it out and that entry keeps its hand-drawn icon, so you can add photos
to some entries and not others without anything looking unfinished.

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

**Color.** One light palette — paper white, mist, and two weights of sage.
There is no dark mode. `--leaf` is the soft sage used for illustrations,
icons and focus rings, where 3:1 is enough. `--leaf-ink` and `--forest` are
the same sage pushed just dark enough to read as text and to carry white
button text; anything lighter drops under 4.5:1. Every text and graphic pair
on the page has been measured against WCAG AA.

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

## Customizing the look

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
