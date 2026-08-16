/* ============================================================================
   data.js — THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Every word on the site comes from the object below.
   Change text here, save the file, refresh the browser.
   ========================================================================= */

window.PORTFOLIO = {

  /* ─── WHO YOU ARE ─────────────────────────────────────────────────── */
  meta: {
    name: "Oren Horak",
    initials: "OH",
    role: "Student & Builder",
    location: "Earth",
    email: "orenhorak@outlook.com",

    // Drop a square photo in assets/ and put the filename here,
    // e.g. "assets/profile.jpg". Leave "" to show your initials instead.
    photo: "",

    // Empty links are hidden automatically — no broken buttons.
    links: {
      github: "https://github.com/orenh",
      linkedin: "",
      resume: ""            // e.g. "assets/resume.pdf"
    }
  },

  /* ─── HERO ────────────────────────────────────────────────────────── */
  hero: {
    greeting: "Hello, I'm",
    // Wrap words in *asterisks* to tint them forest green.
    tagline: "I build small, careful things for the web — and I'm *still growing*.",
    // The line under your photo. Keep it to one sentence.
    blurb: "Student, self-taught developer, and a person who would rather be outside."
  },

  /* ─── ABOUT ME ────────────────────────────────────────────────────── */
  about: {
    kicker: "About me",
    title: "A little about who I am",
    paragraphs: [
      "I'm a student who learns by building. Most of what I know came from starting " +
      "something I wasn't qualified to finish, and then finishing it anyway.",

      "When I'm not at a keyboard I'm usually outside — walking, noticing plants, " +
      "or reading somewhere with decent light. I think the two go together more than " +
      "people expect. Both reward patience and paying attention."
    ],
    // Short, scannable facts. Add or remove freely.
    facts: [
      { label: "Currently", value: "Studying & building side projects" },
      { label: "Learning", value: "Systems programming, slowly and painfully" },
      { label: "Ask me about", value: "3D on the web, or good hiking trails" },
      { label: "Open to", value: "Internships & collaborations" }
    ]
  },

  /* ─── WHAT I BELIEVE ──────────────────────────────────────────────── */
  mission: {
    kicker: "What I believe",
    title: "How I try to work",
    statement:
      "Make software that respects the person using it — small tools, honestly built, " +
      "that do one thing without asking for your attention, your data, or your patience.",
    values: [
      { title: "Ship the ugly version", body: "A working thing beats a beautiful plan. Polish is the second pass." },
      { title: "Learn in public",       body: "Every project here is something I didn't know how to do when I started." },
      { title: "Respect people's time", body: "No dark patterns, no cookie walls, no spinner where a plain page would do." },
      { title: "Finish things",         body: "The last ten percent is where the actual learning lives." }
    ]
  },

  /* ─── WHAT I'M WORKING ON ─────────────────────────────────────────── */
  now: {
    kicker: "Right now",
    title: "What I'm working on",
    updated: "August 2026",
    items: [
      { title: "Room Maker",          state: "Building",  body: "A 3D room designer that runs in your browser. Drag furniture, move walls, no login." },
      { title: "This site",           state: "Shipped",   body: "Hand-written, no framework. Hosted free on GitHub Pages." },
      { title: "Systems programming", state: "Learning",  body: "Working through memory and data structures the slow, useful way." }
    ]
  },

  /* ─── THINGS I'VE MADE ────────────────────────────────────────────── */
  work: {
    kicker: "My work",
    title: "Things I've made",
    projects: [
      {
        title: "Room Maker",
        year: "2026",
        blurb:
          "A 3D room designer that runs entirely in the browser. Place walls, drop in " +
          "furniture, and walk a camera through the result. No account, no upload — " +
          "nothing ever leaves your machine.",
        learned: "How a render loop, a scene graph, and click-to-select actually fit together.",
        tags: ["Three.js", "JavaScript", "WebGL"],
        links: { live: "", repo: "" }
      },
      {
        title: "Personal Portfolio",
        year: "2026",
        blurb:
          "The site you're reading. No frameworks and no dependencies — every line of " +
          "HTML, CSS and JavaScript is hand-written, and all the content lives in one " +
          "small file I can edit in a minute.",
        learned: "That constraints make better work. No framework meant understanding every line.",
        tags: ["HTML", "CSS", "JavaScript"],
        links: { live: "", repo: "" }
      },
      {
        title: "Your next project",
        year: "2026",
        blurb:
          "Open js/data.js, copy the block above, and change the words. That's the whole " +
          "workflow. Delete this placeholder once you have a third real project to show.",
        learned: "Placeholder — replace me.",
        tags: ["Placeholder"],
        links: { live: "", repo: "" }
      }
    ]
  },

  /* ─── THE JOURNEY (résumé) ────────────────────────────────────────── */
  journey: {
    kicker: "The journey",
    title: "How I got here",
    // Newest first. kind: "school" | "work" | "award"
    timeline: [
      {
        kind: "school",
        period: "2025 — present",
        title: "Your Degree or Program",
        org: "Your School",
        body: "Replace with your actual program. Add one line about your focus or favourite coursework."
      },
      {
        kind: "work",
        period: "Summer 2026",
        title: "Your Role",
        org: "Company or Lab",
        body: "One sentence on what you owned. One on the outcome, if there was a measurable one."
      },
      {
        kind: "award",
        period: "2026",
        title: "Something you won or were chosen for",
        org: "Issuing organisation",
        body: "Keep it short. Nobody reads the long version."
      }
    ],
    // Simple grouped lists — honest, no invented percentages.
    skills: [
      { group: "Languages", items: ["JavaScript", "Python", "HTML & CSS", "C"] },
      { group: "Tools",     items: ["Git & GitHub", "Three.js", "Figma", "VS Code"] },
      { group: "Strengths", items: ["Writing clearly", "Asking better questions", "Finishing things"] }
    ]
  },

  /* ─── EXTRACURRICULARS ────────────────────────────────────────────── */
  extracurriculars: {
    kicker: "Outside the classroom",
    title: "Where else I show up",
    items: [
      { role: "Member",    org: "Your Club or Society",   period: "2025 — present", body: "What you do there, in one honest sentence." },
      { role: "Volunteer", org: "Where you volunteer",    period: "2024 — present", body: "What you help with, and roughly how often." },
      { role: "Player",    org: "A team or group sport",  period: "2023 — present", body: "Something you do that has nothing to do with a computer." }
    ]
  },

  /* ─── WHAT I'M READING ────────────────────────────────────────────── */
  reading: {
    kicker: "On the shelf",
    title: "What I'm reading",
    note: "Updated whenever I finish something.",
    // status: "Reading" | "Finished" | "Up next"
    books: [
      { title: "Replace with a book",   author: "Author Name", status: "Reading",  take: "One line on why you picked it up." },
      { title: "Another book",          author: "Author Name", status: "Finished", take: "The one idea that stuck with you." },
      { title: "The one on the pile",   author: "Author Name", status: "Up next",  take: "Why it's next." }
    ]
  },

  /* ─── INTERESTS ───────────────────────────────────────────────────── */
  interests: {
    kicker: "Off the clock",
    title: "Things I think about",
    // icon: leaf | fern | flower | tree | book | seed  (see js/botanical.js)
    items: [
      { icon: "leaf",   title: "Interface design", body: "Why some software feels calm and some feels like a slot machine. Usually it's spacing and restraint." },
      { icon: "fern",   title: "Plants",           body: "I can't walk past a fern without stopping. This is apparently a personality trait now." },
      { icon: "tree",   title: "Being outside",    body: "Long walks with no particular destination. The best debugging tool I own." },
      { icon: "book",   title: "Reading",          body: "Mostly non-fiction, always three books at once, never quite finishing all three." },
      { icon: "flower", title: "Typography",       body: "A typeface is an opinion about how something should sound in your head." },
      { icon: "seed",   title: "Starting things",  body: "The first hour of a new project is the best hour there is." }
    ]
  },

  /* ─── CONTACT ─────────────────────────────────────────────────────── */
  contact: {
    kicker: "Get in touch",
    headline: "Let's build something",
    body:
      "I'm open to internships, collaborations, and the kind of email that starts with " +
      "\"this is probably a bad idea, but…\". I answer everything.",
    cta: "Send me an email"
  }
};
