/* ============================================================================
   data.js — THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Every word on the site comes from the object below.
   Change text here, save the file, refresh the browser.

   Page order:  Home · Nested · About me · Work Experience · My goals ·
                Beyond the classroom · Contact
   ========================================================================= */

window.PORTFOLIO = {

  /* ─── WHO YOU ARE ─────────────────────────────────────────────────── */
  meta: {
    name: "Oren Horak",
    initials: "OH",
    role: "Management Information Systems · University of Georgia",
    location: "Athens, GA",
    email: "orenhorak@outlook.com",
    phone: "+1 (678) 414-4991",     // set to "" to hide it everywhere

    photo: "assets/profile.jpg",
    // Which part of the photo stays visible inside the frame.
    // Second value is vertical: LOWER % shows more of the top of the image.
    photoPosition: "center 18%",

    links: {
      github: "https://github.com/ohorak2002",
      linkedin: "",                                  // add yours and it appears
      resume: "assets/Oren-Horak-Resume.docx"
    }
  },

  /* ─── 1 · HOME ────────────────────────────────────────────────────── */
  hero: {
    greeting: "Hello, I'm",
    // The emphasised line under your name. Wrap words in *asterisks* to tint
    // them forest green. Keep it to one sentence — it carries the whole hero.
    statement:
      "MIS student at the University of Georgia, and the person behind *Nested*."
  },

  /* ─── 2 · NESTED — the headline project ───────────────────────────── */
  nested: {
    kicker: "Featured project",
    name: "Nested",
    tagline: "You don't have to picture it.",
    blurb:
      "Nested builds a room from six questions. Tell it the shape of your space " +
      "and what you like, and it lays the whole thing out for you — walls, floor, " +
      "furniture, lighting — then hands you the controls. Drag anything you want to " +
      "move, swap the palette, or drop in a photo of a room you like and it pulls " +
      "the colours out. No account, no upload, nothing leaves your machine.",

    // Screenshots pulled straight from the running app. Add or remove freely;
    // one image shows as a still, several crossfade slowly.
    shots: [
      { src: "assets/nested-clay.jpg",       label: "Clay & Linen" },
      { src: "assets/nested-terracotta.jpg", label: "Terracotta" },
      { src: "assets/nested-midnight.jpg",   label: "Midnight" }
    ],

    features: [
      { icon: "sprout", title: "Six questions",    body: "Where you live, colours, feel, light, walls, size. Nested builds and arranges the room from your answers." },
      { icon: "tree",   title: "Move anything",    body: "Click a piece to pick it up, drag empty space to orbit. Auto-arrange cleans up when it gets crowded." },
      { icon: "flower", title: "Sixteen palettes", body: "Clay & Linen through to Midnight — or drop in a photo of a room you like and it matches the colours." },
      { icon: "seed",   title: "Runs on your machine", body: "No account and no upload. It's a browser tab, so it opens instantly and your floor plan stays yours." }
    ],

    learned:
      "How a render loop, a scene graph, and raycast-based selection fit together — " +
      "and that the hard part of 3D isn't the maths, it's making the controls obvious " +
      "to someone who has never opened the tool before.",


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
            "Where you live, the colours you would not get tired of, how the room " +
            "should feel, the light, the walls, the size. Tick what already came " +
            "with the place and Nested won't recommend things you own. That's the " +
            "whole setup — it builds and arranges the room from your answers.",
          gif: "assets/nested-1-start.gif",
          alt: "The six-question intake being filled in: address, palette, feel, light, and exact room dimensions."
        },
        {
          n: "02",
          category: "Your real space",
          title: "Trace your actual room",
          body:
            "Real rooms are rarely a clean rectangle. Upload a floorplan and it " +
            "shows through behind a half-metre grid — paint over it and the shape " +
            "becomes your room, alcoves and cut corners included. The floor area " +
            "updates as you go, or start from an L-shaped preset.",
          gif: "assets/nested-2-floorplan.gif",
          alt: "A floorplan showing behind a half-metre grid while an L-shaped room is painted over it, with the floor area counting up."
        },
        {
          n: "03",
          category: "Shop & experiment",
          title: "Try every version, free",
          body:
            "Browse the catalogue by category, drop pieces into the room and watch " +
            "the running total move. Swap anything for a cheaper equivalent and see " +
            "what it saves. Rearranging costs nothing, so you can be indecisive on " +
            "purpose until the room is actually right.",
          gif: "assets/nested-3-experiment.gif",
          alt: "Pieces being added to a room from the catalogue while the estimated total climbs and cheaper swaps are shown."
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
          gif: "assets/nested-4-photo.gif",
          alt: "A reference photo being scanned, its colours extracted, and matching furniture listed with prices."
        }
      ]
    },

    tags: ["Three.js", "React", "WebGL", "Vite"],
    links: { live: "https://room-maker-phi.vercel.app", repo: "https://github.com/ohorak2002/room-maker" },
    status: "In active development"
  },

  // Smaller things, listed under Nested.
  otherProjects: [
    {
      title: "This portfolio",
      year: "2026",
      blurb:
        "The site you're reading. No frameworks and no dependencies — every line " +
        "of HTML, CSS and JavaScript is hand-written, and all the content lives " +
        "in one small file I can edit in a minute.",
      tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      links: { live: "https://ohorak2002.github.io/", repo: "" }
    }
  ],

  /* ─── 3 · ABOUT ME ────────────────────────────────────────────────── */
  about: {
    kicker: "About",
    title: "About me",
    paragraphs: [
      "I'm studying Management Information Systems because it sits exactly where " +
      "I like to work: close enough to the technology to build things, close " +
      "enough to people to know why it matters.",

      "Outside class I've spent most of the last five years on a pool deck — " +
      "coaching kids from twelve months old to eighteen, including a season " +
      "paired one-on-one with an adaptive swimmer. It turns out that teaching " +
      "someone to trust the water is very good practice for explaining anything " +
      "difficult to anyone."
    ],
    facts: [
      { label: "Studying",     value: "Management Information Systems, UGA — class of 2029" },
      { label: "GPA",          value: "4.0 · President's List 2025" },
      { label: "Building",     value: "Nested, a browser-based 3D room designer" },
      { label: "Ask me about", value: "Coaching, swimming, or drumming" },
      { label: "Open to",      value: "Internships and collaborations" }
    ],
    values: [
      { title: "Ship the ugly version", body: "A working thing beats a beautiful plan. Polish is the second pass." },
      { title: "Teach to understand",   body: "If I can't explain it to a nine-year-old, I don't know it yet." },
      { title: "Show up consistently",  body: "Five summers on the same pool deck. Most of it is just returning." },
      { title: "Finish things",         body: "The last ten percent is where the actual learning lives." }
    ]
  },

  /* ─── 4 · WORK EXPERIENCE ─────────────────────────────────────────── */
  experience: {
    kicker: "Experience",
    title: "Work experience",

    education: {
      school: "University of Georgia",
      place: "Athens, GA",
      degree: "B.S. Management Information Systems",
      period: "Expected May 2029",
      gpa: "4.0 GPA · President's List 2025",
      honors: [
        "Julia Helen Smith Foundation Scholarship ($10,000)",
        "Molinaroli College of Engineering and Computing Merit Scholarship",
        "Cobb Swim Coaches Association Scholarship",
        "Linda B. Kenney Scholarship",
        "National Honor Society",
        "Scholar Athlete Academic Swimmer · Athletic & Academic Letters"
      ]
    },

    coursework: ["Algorithmic Design (Java)", "Computing in Product Innovation (CTRL)"],
    skills: ["Java", "CTRL", "GitHub / GitHub Pages", "HTML & CSS", "JavaScript", "Three.js"],

    // Newest first.
    jobs: [
      {
        role: "Swim Instructor",
        org: "Atlanta Swim Academy",
        place: "Atlanta, GA",
        period: "April — August 2025",
        points: [
          "Taught children from twelve months to twelve years across every ability level, using a structured curriculum to build water safety, confidence and technique.",
          "Earned the “Tri-Fecta” Award (Employee of the Month, June 2025) for perfect attendance, a featured Google review, and a parent commendation."
        ]
      },
      {
        role: "Swim Coach",
        org: "Chimney Lakers Neighborhood Swim Team",
        place: "Marietta, GA",
        period: "Summers 2022 — 2026",
        points: [
          "Coach swimmers aged 4 to 18, developing teamwork, sportsmanship and stroke technique.",
          "Coordinate weekly swim meets, including building heat sheets and lineups."
        ]
      },
      {
        role: "Special Needs Swim Coach",
        org: "Focus Adaptive Swim Team (FOCUS)",
        place: "Marietta, GA",
        period: "2023 — 2025",
        points: [
          "Paired one-on-one with an adaptive swimmer to build confidence, stamina and team skills.",
          "Improved my swimmer's times through to an end-of-season meet where they raced their progress."
        ]
      },
      {
        role: "Lifeguard",
        org: "Courtyard Pools & Swim Atlanta",
        place: "Atlanta, GA",
        period: "Summers 2022, 2023, 2024",
        points: [
          "Supervised multiple pools to keep every patron safe.",
          "Handled routine maintenance including chemical levels and facility cleaning."
        ]
      },
      {
        role: "Administrative Assistant",
        org: "Family Eyecare of Marietta",
        place: "Marietta, GA",
        period: "June 2022 — July 2023",
        points: [
          "Pre-tested patients for visual fields, topography and glaucoma screening.",
          "Managed phones and customer service, appointment booking, insurance and eligibility verification, and document scanning."
        ]
      }
    ]
  },

  /* ─── 5 · MY GOALS ────────────────────────────────────────────────── */
  /* ⚠ These are DRAFTS I wrote from your résumé. Rewrite them in your own
     words — this is the section people will read most closely, and it should
     sound like you, not like a template.                                     */
  goals: {
    kicker: "Goals",
    title: "My goals",
    note: "Where I'm pointed, short term and long.",
    items: [
      {
        horizon: "This year",
        title: "Get Nested to a real v1",
        body:
          "Not a demo — something a person could actually use to plan a room, " +
          "with saving, undo, and controls that don't need explaining."
      },
      {
        horizon: "This year",
        title: "Land a summer internship",
        body:
          "Somewhere I can see how software gets built by a team, and be the " +
          "least experienced person in the room for a few months."
      },
      {
        horizon: "By graduation",
        title: "Get genuinely fluent in code",
        body:
          "Java first, then enough of a second language to stop thinking about " +
          "syntax and start thinking about design."
      },
      {
        horizon: "By graduation",
        title: "Lead something on campus",
        body:
          "I ran the Jewish Student Union in high school and want to do that " +
          "again here — a group where I'm responsible for other people's time."
      },
      {
        horizon: "Long term",
        title: "Work where software meets people",
        body:
          "The MIS version of the pool deck: translating between what a system " +
          "can do and what a person actually needs from it."
      },
      {
        horizon: "Long term",
        title: "Never stop coaching",
        body:
          "Five summers in and it's still the best part of my year. Whatever " +
          "else I'm doing, I want to be teaching someone something."
      }
    ]
  },

  /* ─── 6 · BEYOND THE CLASSROOM ────────────────────────────────────── */
  beyond: {
    kicker: "Beyond",
    title: "Beyond the classroom",

    activities: [
      { role: "President",       org: "Jewish Student Union",                          period: "2022 — 2025" },
      { role: "Secretary",       org: "American Sign Language National Honor Society",  period: "2024 — 2025" },
      { role: "Youth Mentor",    org: "Friendship Circle of Atlanta",                   period: "2023" },
      { role: "Varsity Swimmer", org: "Lassiter Swim & Dive",                           period: "2022 — 2025" },
      { role: "Swim Member",     org: "Gamecock Club Swim",                             period: "2025 — 2026" },
      { role: "Lead Drummer",    org: "Three rock bands",                               period: "2020 — 2025" }
    ],

    // status: "Reading" | "Finished" | "Up next"
    reading: [
      { title: "Replace with a book", author: "Author Name", status: "Reading",  take: "One line on why you picked it up." },
      { title: "Another book",        author: "Author Name", status: "Finished", take: "The one idea that stuck with you." },
      { title: "The one on the pile", author: "Author Name", status: "Up next",  take: "Why it's next." }
    ],

    // icon: leaf | fern | flower | tree | book | seed | sprout
    interests: [
      { icon: "tree",   title: "The pool deck",    body: "Five summers of coaching. Still the best part of my year." },
      { icon: "flower", title: "Drumming",         body: "Lead drummer in three bands. Loud, and worth it." },
      { icon: "leaf",   title: "Interface design", body: "Why some software feels calm and some feels like a slot machine." },
      { icon: "seed",   title: "Sign language",    body: "Two years in the ASL Honor Society. A whole grammar in your hands." }
    ]
  },

  /* ─── 7 · CONTACT ─────────────────────────────────────────────────── */
  contact: {
    kicker: "Contact",
    headline: "Contact me",
    body:
      "I'm open to internships, collaborations, and the kind of email that starts " +
      "with \"this is probably a bad idea, but…\". I answer everything.",
    cta: "Send me an email"
  }
};
