/* ============================================================================
   data.js — THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Everything on the site is generated from the object below.
   Change text here, save, refresh. No build step, no framework.
   ========================================================================= */

window.PORTFOLIO = {

  /* --- IDENTITY ------------------------------------------------------- */
  meta: {
    name: "Oren Horak",
    initials: "OH",
    role: "Student · Builder · Perpetual Work-in-Progress",
    // Words that cycle in the hero with a scramble effect.
    // Keep them short — 1 to 3 words each.
    rotating: ["software", "interfaces", "small tools", "weird ideas", "things that ship"],
    location: "Earth",
    email: "orenhorak@outlook.com",
    // Set to "" to hide a link entirely.
    links: {
      github: "https://github.com/orenh",
      linkedin: "",
      x: "",
      resume: "assets/resume.pdf"
    },
    // Shown in the little pill under your name. Update it whenever.
    status: {
      label: "Currently building",
      value: "a 3D room designer",
      // "green" | "amber" | "blue"
      tone: "green"
    }
  },

  /* --- HERO ------------------------------------------------------------ */
  hero: {
    // The line above your name. Small, quiet.
    eyebrow: "Portfolio · 2026",
    // The big statement. Each string is its own line.
    // Wrap words in *asterisks* to make them accent-coloured and italic.
    headline: ["I build things", "*for the web*."],
    // One paragraph. Say something true, not something impressive.
    blurb:
      "I'm a student who learns by shipping. Most of what I know came from " +
      "starting something I wasn't qualified to finish and then finishing it anyway.",
    ctas: [
      { label: "See what I've made", href: "#work", primary: true },
      { label: "Read the résumé", href: "#resume", primary: false }
    ]
  },

  /* --- MISSION --------------------------------------------------------- */
  mission: {
    kicker: "Mission",
    // Words wrapped in *asterisks* get the accent-color highlight treatment.
    statement:
      "Make software that respects the person using it. " +
      "Small tools, *honestly built*, that do one thing without asking for " +
      "your attention, your data, or your patience.",
    principles: [
      {
        n: "01",
        title: "Ship the ugly version",
        body: "A working thing beats a beautiful plan. Polish is the second pass, never the first."
      },
      {
        n: "02",
        title: "Learn in public",
        body: "Every repo here is something I didn't know how to do when I started it."
      },
      {
        n: "03",
        title: "Respect the user's time",
        body: "No dark patterns, no cookie walls, no loading spinner where a plain page would do."
      },
      {
        n: "04",
        title: "Finish things",
        body: "The hardest 10% is the last 10%. That's where the actual learning lives."
      }
    ]
  },

  /* --- NOW (what I'm working on) --------------------------------------- */
  now: {
    kicker: "Now",
    title: "What I'm working on",
    // Keep this honest and current — it's the section people actually read.
    updated: "August 2026",
    items: [
      {
        title: "Room Maker",
        state: "building",          // building | learning | exploring | shipped
        progress: 65,               // 0–100, drives the little bar
        body: "A browser-based 3D room designer. Drag furniture, resize walls, no login screen.",
        tags: ["Three.js", "Vanilla JS"]
      },
      {
        title: "This site",
        state: "shipped",
        progress: 100,
        body: "Built from scratch, hand-written CSS, no framework. Hosted on GitHub Pages.",
        tags: ["HTML", "CSS", "Canvas"]
      },
      {
        title: "Systems programming",
        state: "learning",
        progress: 30,
        body: "Working through memory management and data structures the slow, painful, useful way.",
        tags: ["C", "Algorithms"]
      }
    ]
  },

  /* --- WORK / THINGS I'VE CREATED -------------------------------------- */
  work: {
    kicker: "Selected work",
    title: "Things I've created",
    // "featured: true" gives the card a double-width slot on desktop.
    projects: [
      {
        title: "Room Maker",
        year: "2026",
        featured: true,
        type: "tool",
        blurb:
          "A 3D room designer that runs entirely in the browser. Place walls, drop in furniture, " +
          "walk the camera through it. No account, no upload, nothing leaves your machine.",
        // What you actually learned. This is the part interviewers ask about.
        learned: "How a render loop, a scene graph, and raycast-based selection actually fit together.",
        tags: ["Three.js", "JavaScript", "WebGL"],
        links: { live: "", repo: "" },
        // Any 2-char emoji or symbol — used as the card's glyph if no image.
        glyph: "◳"
      },
      {
        title: "Personal Portfolio",
        year: "2026",
        featured: false,
        type: "site",
        blurb:
          "The site you're on. Zero dependencies, a hand-rolled command palette, " +
          "a particle field on canvas, and content that lives in one editable file.",
        learned: "That constraints make better work. No framework meant understanding every line.",
        tags: ["HTML", "CSS", "Canvas API"],
        links: { live: "", repo: "" },
        glyph: "◈"
      },
      {
        title: "Add your next project",
        year: "2026",
        featured: false,
        type: "experiment",
        blurb:
          "Open js/data.js, copy this block, change the words. That's the whole workflow. " +
          "Delete this placeholder once you've got a third real project.",
        learned: "Placeholder — replace me.",
        tags: ["Placeholder"],
        links: { live: "", repo: "" },
        glyph: "＋"
      }
    ]
  },

  /* --- RÉSUMÉ ---------------------------------------------------------- */
  resume: {
    kicker: "Résumé",
    title: "The paper trail",
    // Ordered newest → oldest. kind: "education" | "work" | "award" | "project"
    timeline: [
      {
        kind: "education",
        period: "2025 — present",
        title: "Your Degree / Program",
        org: "Your School",
        body: "Replace this with your actual program. Add a line about coursework or focus.",
        tags: ["Data Structures", "Linear Algebra"]
      },
      {
        kind: "work",
        period: "Summer 2026",
        title: "Your Role",
        org: "Company or Lab",
        body: "One sentence on what you owned. One on the measurable outcome, if there was one.",
        tags: ["Python", "Teamwork"]
      },
      {
        kind: "award",
        period: "2026",
        title: "Something you won or were picked for",
        org: "Issuing body",
        body: "Short. No one reads the long version.",
        tags: []
      }
    ],
    // Grouped skill bars. Level is 0–100 and is deliberately vague — it's a vibe, not a metric.
    skills: [
      {
        group: "Languages",
        items: [
          { name: "JavaScript", level: 80 },
          { name: "Python", level: 70 },
          { name: "HTML / CSS", level: 88 },
          { name: "C", level: 40 }
        ]
      },
      {
        group: "Tools",
        items: [
          { name: "Git / GitHub", level: 75 },
          { name: "Three.js", level: 55 },
          { name: "Figma", level: 45 }
        ]
      },
      {
        group: "Human",
        items: [
          { name: "Writing clearly", level: 85 },
          { name: "Asking better questions", level: 78 },
          { name: "Finishing things", level: 66 }
        ]
      }
    ]
  },

  /* --- INTERESTS (bento grid) ------------------------------------------ */
  interests: {
    kicker: "Off the clock",
    title: "Things I think about",
    // size: "lg" spans 2 columns, "tall" spans 2 rows, "sm" is 1×1.
    cards: [
      {
        size: "lg",
        glyph: "▦",
        title: "Interface design",
        body: "Why some software feels calm and some feels like a slot machine. Usually it's spacing and restraint."
      },
      { size: "sm", glyph: "♟", title: "Chess", body: "Badly, but with enthusiasm." },
      { size: "sm", glyph: "◐", title: "Typography", body: "A font is an opinion." },
      {
        size: "tall",
        glyph: "☾",
        title: "Reading",
        body: "Mostly non-fiction. Currently somewhere in the middle of three books at once, which is how it always goes."
      },
      { size: "sm", glyph: "⌘", title: "Keyboard shortcuts", body: "The mouse is a last resort." },
      { size: "sm", glyph: "♪", title: "Music while building", body: "Something without lyrics." }
    ]
  },

  /* --- CONTACT --------------------------------------------------------- */
  contact: {
    kicker: "Say hello",
    headline: "Got something to build?",
    body:
      "I'm open to internships, collaborations, and the kind of email that starts with " +
      "\"this is probably a bad idea, but…\". I answer everything.",
    cta: "Email me"
  },

  /* --- EASTER EGGS ------------------------------------------------------ */
  // Shown when someone types the Konami code (↑↑↓↓←→←→BA).
  konami: "You found it. Now go build something.",

  // Lines that print in the browser console for anyone who opens devtools.
  console: [
    "Looking under the hood? Good instinct.",
    "This site is ~1400 lines of hand-written HTML, CSS and JS. No framework.",
    "Press ⌘K / Ctrl+K for the command palette.",
    "Source: github.com/orenh"
  ]
};
