/* ============================================================================
   data-nested-archive.js - PARKED, NOT LOADED BY THE SITE.

   The Nested headline section exactly as it stood when CardAhead took over as
   the featured project on 22 September 2026: the blurb, the hiatus note, the
   six palettes, the cart totalling 573 dollars and the four-step walkthrough
   - every figure read out of the running app rather than invented.

   Nothing here renders; index.html does not load this file. It exists so the
   writing survives the swap without sitting in the middle of data.js.

   To make Nested the headline again:
     1. copy the object below into js/data.js as  featured: { ... }
     2. its walkthrough already points at the nested-*.gif files in assets/
     3. put these two lines back into index.html - the live tour needs them:
          <div id="nestedTour"></div>        (inside .feature__art)
          <script src="js/nestedTour.js"></script>
     4. in js/nestedTour.js, read window.PORTFOLIO.featured instead of .nested
   ========================================================================= */

window.PORTFOLIO_NESTED_ARCHIVE = {
  nested: {
    kicker: "Featured project",
    name: "Nested",
    tagline: "You don't have to picture it.",
    blurb:
      "Nested builds a room from six questions. Tell it the shape of your space " +
      "and what you like, and it lays the whole thing out for you — walls, floor, " +
      "furniture, lighting — then hands you the controls. Drag anything you want to " +
      "move, swap the palette, or drop in a photo of a room you like and it pulls " +
      "the colors out. No account, no upload, nothing leaves your machine.",

    /* Nested is paused. Set hiatus to null to clear the banner and the chip
       and the project reads as active again. Wording is Oren's own account of
       why — check it still reads the way he'd say it. */
    hiatus: {
      chip: "On hiatus",
      title: "Paused until 3D catches up",
      body:
        "Nested is on a break. The whole experience leans on good 3D models — " +
        "the furniture and every object you place in the room — and rendering " +
        "those at a quality I'm happy with is the wall I've hit. Making each " +
        "asset look right by hand is slow, and the tools that generate 3D from " +
        "a prompt aren't there yet. So rather than ship rooms full of models " +
        "that look off, I'm waiting for the AI that builds 3D assets to get " +
        "meaningfully better — and picking Nested back up the moment it does.",
      resume:
        "Realistically that means a new model built for 3D — the way image " +
        "generators leapt in a couple of years, but for furniture and objects " +
        "you can actually drop into a room. The day prompt-to-3D clears a " +
        "usable bar for quality, Nested comes off pause and I start again."
    },

    // Screenshots pulled straight from the running app. Add or remove freely;
    // one image shows as a still, several crossfade slowly.
    shots: [
      { src: "assets/nested-clay.jpg",       label: "Clay & Linen" },
      { src: "assets/nested-terracotta.jpg", label: "Terracotta" },
      { src: "assets/nested-midnight.jpg",   label: "Midnight" }
    ],

    /* Both of these are switched off — the section runs straight from the
       buttons into the walkthrough below. Put entries back in either list
       and they reappear, no code changes needed. */
    features: [],

    learned: "",


    /* Drop a rendered demo in assets/ and name it here, and it REPLACES the
       live tour below. Leave both "" to keep the tour.
         video: "assets/nested-demo.mp4"   ← best quality, plays silently on loop
         gif:   "assets/nested-shop.gif"   ← simpler, bigger file
       If you set both, the video wins and the gif is the fallback poster. */
    video: "assets/nested-demo.mp4",
    gif: "",

    /* The live demo that plays in the Nested section. Same storyboard as the
       Remotion film in ../nested-video. Every figure below was read out of
       the running app — items, stores, prices and the $573 total. */
    tour: {
      actMs: 6500,

      shots: [
        { src: "assets/nested-clay.jpg",       label: "Clay & Linen" },
        { src: "assets/nested-terracotta.jpg", label: "Terracotta" },
        { src: "assets/nested-midnight.jpg",   label: "Midnight" }
      ],

      palettes: [
        { name: "Clay & Linen", swatch: ["#C9B49C", "#EDE4D6", "#8A7A66"] },
        { name: "Terracotta",   swatch: ["#C4714B", "#E8C6AE", "#7A4230"] },
        { name: "Midnight",     swatch: ["#2B3140", "#4A5570", "#171B24"] },
        { name: "Forest Floor", swatch: ["#5A6E4E", "#93A882", "#33402C"] },
        { name: "Pine & Slate", swatch: ["#4A6357", "#8FA69A", "#2C3B34"] },
        { name: "Sand & Sea",   swatch: ["#C7B79B", "#7FA3AC", "#4C6670"] }
      ],

      items: [
        { name: "Upholstered Platform Bed, Queen", price: 549, store: "Wayfair",
          save: { amount: 370, store: "Walmart", price: 179 } },
        { name: "Two-Drawer Nightstand", price: 119, store: "Target" },
        { name: "Arc Floor Lamp", price: 299, store: "West Elm",
          save: { amount: 260, store: "IKEA", price: 39 } },
        { name: "Artificial Monstera, 4 ft", price: 88, store: "Wayfair",
          save: { amount: 66, store: "Walmart", price: 22 } }
      ],

      cart: [
        { name: "Platform Bed Frame, Queen", price: 179 },
        { name: "Two-Drawer Nightstand",     price: 119 },
        { name: "Area Rug, 8x10",            price: 89 },
        { name: "Floor Lamp, Standing",      price: 39 },
        { name: "Artificial Monstera, 4 ft", price: 88 },
        { name: "Gallery Frame Set of 6",    price: 59 }
      ],
      cartTotal: 573,
      savingsNote: "Swapping every piece for its cheapest equivalent would save about $66.",

      compare: {
        from: { store: "Wayfair", name: "Upholstered Platform Bed, Queen", price: 549 },
        to:   { store: "Walmart", name: "Platform Bed Frame, Queen (Value)", price: 179 }
      },

      stores: ["IKEA", "Wayfair", "West Elm", "Target", "Home Depot", "Walmart", "Amazon"]
    },


    /* The four-step walkthrough — one GIF per topic, all rendered by
       Remotion from ../nested-video. The framing: an interior designer is
       expensive and shopping in person is slow, so Nested lets you try every
       version of a room for nothing, then buy once. */
    walkthrough: {
      kicker: "How it works",
      title: "Try the room before you pay for it",
      intro:
        "Hiring an interior designer is expensive, and working it out yourself " +
        "means driving to shops and guessing. Nested lets you experiment for " +
        "free — see the exact room in 3D with the exact prices, and only spend " +
        "money once you already know what you want.",
      steps: [
        {
          n: "01",
          category: "Getting started",
          title: "Answer six questions",
          body:
            "Where you live, the colors you would not get tired of, how the room " +
            "should feel, the light, the walls, the size. Check off what already came " +
            "with the place and Nested won't recommend things you own. That's the " +
            "whole setup — it builds and arranges the room from your answers.",
          video: "assets/nested-1-start.mp4",
          gif: "assets/nested-1-start.gif",
          alt: "The six-question intake being filled in: address, palette, feel, light, and exact room dimensions."
        },
        {
          n: "02",
          category: "Your real space",
          title: "Trace your actual room",
          body:
            "Real rooms are rarely a clean rectangle. Upload a floorplan and it " +
            "shows through behind a half-meter grid — paint over it and the shape " +
            "becomes your room, alcoves and cut corners included. The floor area " +
            "updates as you go, or start from an L-shaped preset.",
          video: "assets/nested-2-floorplan.mp4",
          gif: "assets/nested-2-floorplan.gif",
          alt: "A floorplan showing behind a half-meter grid while an L-shaped room is painted over it, with the floor area counting up."
        },
        {
          n: "03",
          category: "Shop & experiment",
          title: "Try every version, free",
          body:
            "Browse the catalog by category, drop pieces into the room and watch " +
            "the running total move. Swap anything for a cheaper equivalent and see " +
            "what it saves. Rearranging costs nothing, so you can be indecisive on " +
            "purpose until the room is actually right.",
          video: "assets/nested-3-experiment.mp4",
          gif: "assets/nested-3-experiment.gif",
          alt: "Pieces being added to a room from the catalog while the estimated total climbs and cheaper swaps are shown."
        },
        {
          n: "04",
          category: "Copy a real room",
          title: "Bring a photo you liked",
          body:
            "Saw a room at an open house, in a listing, or on a screenshot? Drop the " +
            "photo in. Nested pulls the palette out of it and finds real pieces that " +
            "match, each with a store and a price — so the room you liked becomes a " +
            "shopping list you can actually act on.",
          /* No `video` here on purpose. nested-4-photo.mp4 decodes to a flat
             dark-green frame with magenta blocks — the container is intact,
             so the damage is in the recording itself and re-encoding will
             not help; the clip has to be captured again. The GIF is a
             separate, clean capture (864x486, 65 frames, 10fps), and
             walkMedia() falls back to it whenever `video` is absent.
             Restore the line below once a good MP4 exists. */
          gif: "assets/nested-4-photo.gif",
          alt: "A reference photo being scanned, its colors extracted, and matching furniture listed with prices."
        }
      ]
    },

    tags: ["Three.js", "React", "WebGL", "Vite"],
    links: { live: "https://room-maker-phi.vercel.app", repo: "https://github.com/ohorak2002/room-maker" },
    status: "In active development"
  },
};
