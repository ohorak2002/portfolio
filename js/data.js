/* ============================================================================
   data.js — THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Every word on the site comes from the object below.
   Change text here, save the file, refresh the browser.

   The page has six sections: Home · About · Projects · Résumé ·
   Beyond the Classroom · Contact.
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
    // Which part of the photo stays visible inside the circle.
    // First value is horizontal, second vertical. Lower % = show more of the top.
    photoPosition: "center 15%",

    links: {
      github: "https://github.com/ohorak2002",
      linkedin: "",                                  // add yours and it appears
      resume: "assets/Oren-Horak-Resume.docx"
    }
  },

  /* ─── 1. HOME ─────────────────────────────────────────────────────── */
  hero: {
    greeting: "Hello, I'm",
    // Wrap words in *asterisks* to tint them forest green.
    tagline: "I coach, I build, and I *keep showing up*.",
    blurb:
      "A Management Information Systems student at the University of Georgia. " +
      "Five years of coaching swimmers taught me more about software than I expected — " +
      "both are mostly about breaking something hard into steps a person can actually follow."
  },

  /* ─── 2. ABOUT ────────────────────────────────────────────────────── */
  about: {
    kicker: "01 — About",
    title: "About me",
    paragraphs: [
      "I'm studying Management Information Systems because it sits exactly where I like " +
      "to work: close enough to the technology to build things, close enough to people " +
      "to know why it matters.",

      "Outside class I've spent most of the last five years on a pool deck — coaching " +
      "kids from twelve months old to eighteen, including a season paired one-on-one " +
      "with an adaptive swimmer. It turns out that teaching someone to trust the water " +
      "is very good practice for explaining anything difficult to anyone."
    ],
    facts: [
      { label: "Studying",     value: "Management Information Systems, UGA — class of 2029" },
      { label: "GPA",          value: "4.0 · President's List 2025" },
      { label: "Currently",    value: "Learning Java and building side projects" },
      { label: "Ask me about", value: "Coaching, swimming, or drumming" },
      { label: "Open to",      value: "Internships and collaborations" }
    ],
    // Four short principles. Keep them to one line each.
    values: [
      { title: "Ship the ugly version", body: "A working thing beats a beautiful plan. Polish is the second pass." },
      { title: "Teach to understand",   body: "If I can't explain it to a nine-year-old, I don't know it yet." },
      { title: "Show up consistently",  body: "Five summers on the same pool deck. Most of it is just returning." },
      { title: "Finish things",         body: "The last ten percent is where the actual learning lives." }
    ]
  },

  /* ─── 3. PROJECTS ─────────────────────────────────────────────────── */
  projects: {
    kicker: "02 — Projects",
    title: "My projects",
    note: "Early days — everything here is something I didn't know how to do when I started.",

    // What you're building right now. Shown as a short row above the projects.
    now: [
      { title: "Room Maker",          state: "Building", body: "A 3D room designer that runs in the browser." },
      { title: "This site",           state: "Shipped",  body: "Hand-written, no framework, hosted on GitHub Pages." },
      { title: "Algorithmic Design",  state: "Learning", body: "Working through Java data structures for coursework." }
    ],

    items: [
      {
        title: "Room Maker",
        year: "2026",
        blurb:
          "A 3D room designer that runs entirely in the browser. Place walls, drop in " +
          "furniture, and move a camera through the result. No account and no upload — " +
          "nothing ever leaves your machine.",
        learned: "How a render loop, a scene graph, and click-to-select actually fit together.",
        tags: ["Three.js", "JavaScript", "WebGL"],
        links: { live: "", repo: "" }
      },
      {
        title: "This Portfolio",
        year: "2026",
        blurb:
          "The site you're reading. No frameworks and no dependencies — every line of " +
          "HTML, CSS and JavaScript is hand-written, and all the content lives in one " +
          "small file I can edit in a minute.",
        learned: "That constraints make better work. No framework meant understanding every line.",
        tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
        links: { live: "https://ohorak2002.github.io/", repo: "" }
      }
    ]
  },

  /* ─── 4. RÉSUMÉ ───────────────────────────────────────────────────── */
  resume: {
    kicker: "03 — Résumé",
    title: "Résumé",

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
    skills: ["Java", "CTRL", "GitHub / GitHub Pages", "HTML & CSS", "JavaScript"],

    // Newest first.
    experience: [
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

  /* ─── 5. BEYOND THE CLASSROOM ─────────────────────────────────────── */
  beyond: {
    kicker: "04 — Beyond",
    title: "Beyond the classroom",

    activities: [
      { role: "President",            org: "Jewish Student Union",                        period: "2022 — 2025" },
      { role: "Secretary",            org: "American Sign Language National Honor Society", period: "2024 — 2025" },
      { role: "Youth Mentor",         org: "Friendship Circle of Atlanta",                 period: "2023" },
      { role: "Varsity Swimmer",      org: "Lassiter Swim & Dive",                         period: "2022 — 2025" },
      { role: "Swim Member",          org: "Gamecock Club Swim",                           period: "2025 — 2026" },
      { role: "Lead Drummer",         org: "Three rock bands",                             period: "2020 — 2025" }
    ],

    // status: "Reading" | "Finished" | "Up next"
    reading: [
      { title: "Replace with a book", author: "Author Name", status: "Reading",  take: "One line on why you picked it up." },
      { title: "Another book",        author: "Author Name", status: "Finished", take: "The one idea that stuck with you." },
      { title: "The one on the pile", author: "Author Name", status: "Up next",  take: "Why it's next." }
    ],

    // icon: leaf | fern | flower | tree | book | seed | sprout
    interests: [
      { icon: "tree",   title: "The pool deck",   body: "Five summers of coaching. Still the best part of my year." },
      { icon: "flower", title: "Drumming",        body: "Lead drummer in three bands. Loud, and worth it." },
      { icon: "leaf",   title: "Interface design", body: "Why some software feels calm and some feels like a slot machine." },
      { icon: "seed",   title: "Sign language",   body: "Two years in the ASL Honor Society. A whole grammar in your hands." }
    ]
  },

  /* ─── 6. CONTACT ──────────────────────────────────────────────────── */
  contact: {
    kicker: "05 — Contact",
    headline: "Contact me",
    body:
      "I'm open to internships, collaborations, and the kind of email that starts with " +
      "\"this is probably a bad idea, but…\". I answer everything.",
    cta: "Send me an email"
  }
};
