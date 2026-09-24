/* ============================================================================
   data.js — THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Every word on the site comes from the object below.
   Change text here, save the file, refresh the browser.

   Page order:  Home · CardWise · About me · Work Experience · My goals ·
                Beyond the classroom · Contact

   The headline project lives under `featured`. Nested held that slot until
   22 Sep 2026 and is now one of the smaller projects below it; its full old
   section is kept, unrendered, in js/data-nested-archive.js.
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
      linkedin: "https://www.linkedin.com/in/oren-horak-b3b971427",
      resume: "assets/Oren-Horak-Resume.docx"
    }
  },

  /* ─── 1 · HOME ────────────────────────────────────────────────────── */
  hero: {
    greeting: "Hello, I'm",
    // The emphasized line under your name. Wrap words in *asterisks* to tint
    // them forest green. Keep it to one sentence — it carries the whole hero.
    statement:
      "MIS student at the University of Georgia, and the person behind *CardWise*."
  },

  /* ─── 2 · CARDWISE — the headline project ─────────────────── */
  featured: {
    kicker: "Featured project",
    name: "CardWise",
    tagline: "The right card, before you pay.",
    blurb:
      "CardWise is an iPhone app that tells you which credit card to pay with, " +
      "a few minutes after you walk into a shop — while you can still do " +
      "something about it. You add your cards by picking them, not describing " +
      "them, and it works out what each one earns where you are. It only speaks " +
      "up when the gap between your best card and your next best one is actually " +
      "worth an interruption, and afterwards it tells you what that choice earned.",

    /* CardWise is the active project, so there is no pause note. Setting
       hiatus to an object with a `chip` is what put the "On hiatus" badge on
       Nested — see js/data-nested-archive.js for how that looked. */
    hiatus: null,

    /* The art slot runs the hero GIF. Stills would go here instead. */
    shots: [],

    /* Both switched off — the section runs from the buttons into the
       walkthrough. Put entries back in either list and they reappear. */
    features: [],
    learned: "",

    /* Every animation on this page was built from the screenshots CardWise's
       own CI takes: a job boots a simulator, opens each screen and photographs
       it, so what you see is the real app, not a mockup. They are animated WebP
       at 30fps (tools/make-cardwise-gifs.py). The field is still called `gif`
       because an <img> plays either format and render.js needs no change. */
    video: "",
    gif: "assets/cardwise-hero.webp",

    walkthrough: {
      kicker: "How it works",
      title: "It has to arrive early, or not at all",
      intro:
        "Apple doesn't let another app put anything into the Apple Pay card " +
        "picker, so there is no way to catch you at the till. The whole app " +
        "hangs on being early instead: your phone notices you've arrived " +
        "somewhere your cards treat differently, and says so while you're still " +
        "walking in. Everything below is the real app — the pictures come out " +
        "of the test suite, which photographs every screen on every change.",
      steps: [
        {
          n: "01",
          category: "Your wallet",
          title: "Pick the card. Don't describe it.",
          body:
            "Choose the bank, then the exact product — \"Gold\" names more than " +
            "one card, so the list shows the network, the annual fee and what " +
            "each is best at. The benefits arrive already ticked and in plain " +
            "English: 4x at restaurants, no foreign transaction fee. Untick " +
            "anything your card doesn't have. Nothing to type, no rate to look " +
            "up, and a card that isn't on the list can still be entered by hand.",
          gif: "assets/cardwise-1-wallet.webp",
          alt: "Adding a card: choosing the bank, confirming the benefits already ticked, and the card landing in the wallet."
        },
        {
          n: "02",
          category: "Where you are",
          title: "See which card wins nearby",
          body:
            "The map is the one screen you go and look at rather than being " +
            "told. Filter by restaurants, groceries, gas, hotels, and every " +
            "pin carries the card that wins there — a ring means a card beats " +
            "its own everyday rate. It never invents a reward: somewhere your " +
            "cards treat like anywhere else says so, instead of guessing.",
          gif: "assets/cardwise-2-map.webp",
          alt: "The nearby map with category filters, pins for each shop, and a place opening to show which card wins there."
        },
        {
          n: "03",
          category: "The interruption",
          title: "Only when it's worth it",
          body:
            "An app that speaks up every time is an app you turn off, so this " +
            "one scores the moment before it says anything. Quiet hours, a " +
            "daily ceiling, one reminder per shop, and a win too small to matter " +
            "stays silent — you pick how talkative it is. The reminder itself is " +
            "written end to end; a geofence waking a closed app is the one part " +
            "only a real iPhone can prove, and it hasn't been on one yet.",
          gif: "assets/cardwise-3-reminder.webp",
          alt: "Notification settings: the four intensity levels, quiet hours, and the screen explaining why a card was recommended."
        },
        {
          n: "04",
          category: "Was it worth it",
          title: "What it actually earned",
          body:
            "Most apps like this never answer the obvious question. After a " +
            "reminder, CardWise asks two optional questions and keeps a running " +
            "figure — and it's careful about what that figure means. Nothing was " +
            "discounted, so it's never called savings, and it counts only what " +
            "the recommended card earned over the next best card you already " +
            "held. It can come out negative, and it isn't rounded up when it does.",
          gif: "assets/cardwise-4-impact.webp",
          alt: "The impact screen showing rewards by category, how many reminders were used, and the benefit deadline timeline."
        }
      ]
    },

    tags: ["Swift", "SwiftUI", "Core Location", "Places API", "GitHub Actions"],
    links: { repo: "https://github.com/ohorak2002/CardWise" },
    /* Small text links under the buttons. These two pages are also the App
       Store privacy and support URLs, so keep them where they are. */
    legal: [
      { label: "Privacy policy", href: "cardwise/privacy/" },
      { label: "Support", href: "cardwise/support/" }
    ],
    status: "In active development"
  },

  // Smaller things, listed under CardWise.
  otherProjects: [
    {
      title: "Nested — a 3D room designer in the browser",
      year: "2026 · paused",
      blurb:
        "Six questions and it builds you a room in 3D — walls, floor, furniture, " +
        "light — then hands you the controls: drag anything, swap the palette, or " +
        "drop in a photo of a room you like and it pulls the colors out and finds " +
        "real pieces to match. It works, and it's still up. I've paused it because " +
        "the whole experience rests on good 3D models, and making each one look " +
        "right by hand is slow while prompt-to-3D isn't there yet. It comes off " +
        "pause the day that changes.",
      tags: ["Three.js", "React", "WebGL", "Vite"],
      links: { live: "https://room-maker-phi.vercel.app", repo: "https://github.com/ohorak2002/room-maker" }
    },
    {
      title: "This portfolio",
      year: "2026",
      blurb:
        "The site you're reading — built with Claude Code, which wrote the HTML, " +
        "CSS and JavaScript while I directed the design, the structure and every " +
        "word of the copy. It runs on no frameworks and no dependencies, and all " +
        "the content sits in one file I can edit in a minute. Learning to steer " +
        "an AI toward something I'd actually put my name on was the point.",
      tags: ["Claude Code", "HTML", "CSS", "JavaScript", "GitHub Pages"],
      links: { live: "https://ohorak2002.github.io/portfolio/", repo: "https://github.com/ohorak2002/portfolio" }
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
      { label: "GPA",          value: "4.0 · President's List 2025, South Carolina" },
      { label: "Building",     value: "CardWise, an iPhone app that picks the right card to pay with" },
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
    kicker: "Background",
    title: "Education & experience",

    /* Two schools, newest first. Each keeps its OWN gpa and honors, so
       nothing gets credited to the wrong place — the 4.0 and President's
       List were earned at South Carolina, not Georgia. */
    education: [
      {
        school: "University of Georgia",
        place: "Athens, GA",
        degree: "B.S. Management Information Systems",
        period: "Expected May 2029",
        current: true
      },
      {
        school: "University of South Carolina",
        place: "Columbia, SC",
        degree: "",                       // ← add what you studied there
        period: "2025 — 2026",            // ← check these dates
        gpa: "4.0 GPA · President's List 2025",
        honors: [
          "Molinaroli College of Engineering and Computing Merit Scholarship"
        ]
      }
    ],

    /* Certificates earned outside a degree. Each one needs a `verify` link —
       an unverifiable certificate is worth less than no certificate, and the
       card shows the credential ID next to the link so a recruiter can check
       it in one click.

       thumb = the small picture in the card (keep it under ~40KB)
       full  = the readable version that opens when the picture is clicked
       expires: "" means no expiry date. */
    certifications: {
      title: "Certifications",
      items: [
        {
          name: "AI Literacy for All",
          issuer: "Digital Education Council",
          co: "University of Georgia",
          issued: "August 2026",
          expires: "",
          credentialId: "renmpdnu0c",
          verify: "https://courses.digitaleducationcouncil.com/certificates/renmpdnu0c",
          thumb: "assets/cert-dec-ai-literacy-thumb.jpg",
          full: "assets/cert-dec-ai-literacy.jpg",

          /* ⚠ DRAFT — rewrite this in your own words. Say why you took it,
             not what the syllabus said. One or two sentences is plenty. */
          blurb:
            "A joint program between the Digital Education Council and UGA. " +
            "I took it because I'd already been building on top of these tools " +
            "for months and wanted the grounding to go with the practice.",

          tags: ["AI literacy", "Responsible AI"]
        },
        {
          name: "Excel Essential Training (Microsoft 365)",
          issuer: "LinkedIn Learning",
          co: "",                         // no second organisation
          issued: "August 2026",
          expires: "",                    // "" prints "No expiry"
          credentialId: "ae7e9519bfd3d4a9fab6cdd47c82587450f5e0456d57228dce2a130a6f419178",
          verify: "https://www.linkedin.com/learning/certificates/e7622e909be37b98ca791c3a4592259154d6b37a818d6cd51a33921bae6ac599",
          thumb: "assets/cert-excel-essential-thumb.jpg",
          full: "assets/cert-excel-essential.jpg",

          /* ⚠ DRAFT — rewrite this in your own words. Say why you took it,
             not what the syllabus said. One or two sentences is plenty. */
          blurb:
            "Excel is the tool every business team actually runs on, so I wanted " +
            "to be genuinely fluent in it — not just able to fake my way through a " +
            "spreadsheet. This covered the day-to-day work: formulas, tables and " +
            "cleaning real data into something useful.",

          tags: ["Microsoft Excel", "Spreadsheets"]
        }
      ]
    },

    /* Anthropic's Claude Academy badges. Same card shape as certifications —
       add another entry as each course is finished. thumb/full can be the
       same badge image; it just opens larger on click. */
    academy: {
      title: "Claude Academy",
      items: [
        {
          name: "Claude 101",
          issuer: "Anthropic",
          co: "Claude Academy",
          issued: "September 2026",
          expires: "",                    // "" prints "No expiry"
          credentialId: "0f286c78c647cc1ecb40420320c44750",
          verify: "https://academy.claude.com/verify/0f286c78c647cc1ecb40420320c44750",
          thumb: "assets/badge-claude-101.svg",
          full: "assets/badge-claude-101.svg",

          /* ⚠ DRAFT — rewrite this in your own words. Why you started Claude
             Academy, in a sentence or two. */
          blurb:
            "My first course on Anthropic's own learning platform — the grounding " +
            "in how Claude actually works, straight from the people who build it. " +
            "This is where the AI goal on my list starts; Claude Code is next.",

          tags: ["Claude", "Anthropic"]
        }
      ]
    },

    /* Everything won somewhere other than the two universities above.
       Grouped by where it came from so nothing reads as a college honor. */
    awards: {
      title: "Other awards & scholarships",
      groups: [
        {
          source: "Lassiter High School · class of 2025",
          items: [
            "Julia Helen Smith Foundation Scholarship ($10,000)",
            "Linda B. Kenney Scholarship",
            "Cobb Swim Coaches Association Scholarship",
            "National Honor Society, 2023 — 2025",
            "Scholar Athlete Academic Swimmer · Athletic & Academic Letters",
            "Principal's Award in two subjects"
          ]
        }
      ]
    },

    coursework: ["Algorithmic Design (Java)", "Computing in Product Innovation (CTRL)"],

    /* What I'm enrolled in right now. Titles, codes and credit hours come
       from the UGA Bulletin; the summaries are my own. icon: sheet | shield |
       curve | globe | wheat — or any of the botanical names. */
    courses: {
      term: "Fall 2026",
      items: [
        {
          code: "MIST 2090", icon: "sheet",
          title: "Introduction to Information Systems in Business",
          hours: "3 credits",
          short: "The core of the MIS degree — how technology actually changes the way a business runs.",
          more:
            "Covers leading technology-driven change inside an organization: how information " +
            "systems fit together, how to improve a business process rather than just automate " +
            "it, modeling a business and its data, running a project, and heavy spreadsheet " +
            "work. This is the one most directly connected to what I want to do."
        },
        {
          code: "RMIN 4000", icon: "shield",
          title: "Risk Management and Insurance",
          hours: "3 credits",
          short: "Finding the risk in something before it finds you, and deciding what to do about it.",
          more:
            "Identifying, measuring and treating risk for both companies and individuals. " +
            "Runs through how the insurance industry operates, the legal principles behind a " +
            "contract, property and liability exposure for cars and homes, and the life and " +
            "health side including retirement and employee benefits."
        },
        {
          code: "MATH 1113", icon: "curve",
          title: "Precalculus",
          hours: "3 credits",
          short: "The groundwork for calculus — functions, growth curves and trigonometry.",
          more:
            "Functions and their graphs, composition and inverses, exponential and logarithmic " +
            "behavior — which is where compound interest and growth and decay live — plus " +
            "trigonometry and straightforward optimization problems."
        },
        {
          code: "ECOL 1000", icon: "globe",
          title: "Ecological Basis of Environmental Issues",
          hours: "3 credits",
          short: "The science under the environmental arguments people actually have.",
          more:
            "Population dynamics, energy moving through an ecosystem, biodiversity and " +
            "conservation, and how forests, freshwater and fisheries get managed. It ends up " +
            "at climate change, pollution and water scarcity, and at the policy and ethics " +
            "questions that come with them."
        },
        {
          code: "AESC 2050", icon: "wheat",
          title: "Effects of Global Agriculture on World Culture",
          hours: "3 credits",
          short: "How the way the world grows food ends up shaping the world itself.",
          more:
            "Traces farming's effect on human societies: how geography and culture decide the " +
            "way people farm, what the green revolution set in motion, and the way food " +
            "production feeds into politics, economics, health and the environment."
        }
      ]
    },
    skills: ["Swift", "SwiftUI", "Java", "CTRL", "Git & GitHub Actions", "HTML & CSS", "JavaScript", "Three.js"],

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
        title: "Get CardWise onto a real phone",
        body:
          "Everything is green in the test suite, but a test can't prove that a " +
          "geofence wakes a closed app on a real iPhone. Until it runs on one in " +
          "a real shop, it isn't finished."
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
        title: "Get properly good with AI",
        body:
          "Not just using the tools — understanding where they're strong, where " +
          "they quietly get things wrong, and how to build something real on top " +
          "of them. CardWise is where I'm practicing."
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

    /* `more` is optional — write one and the entry grows a "Read more"
       button. Leave it off and the entry just sits there quietly. */
    activities: [
      { role: "President",       org: "Jewish Student Union",                          period: "2022 — 2025",
        more: "Coordinated meetings and planned recruitment events for a group of 45+ members learning about Jewish culture. Joined the JSUGo three-week summer enrichment trip to Israel." },
      { role: "Secretary",       org: "American Sign Language National Honor Society",  period: "2024 — 2025",
        more: "Arranged activities for Deaf and Hard of Hearing students across the county. As secretary I compiled the meeting minutes and made sure events actually ran on time." },
      { role: "Youth Mentor",    org: "Friendship Circle of Atlanta",                   period: "2023",
        more: "Friendship Circle builds friendship and inclusion through disability-awareness events. I directed over 100 runners in the Friendship 5K, which raised more than $64,000." },
      { role: "Varsity Swimmer", org: "Lassiter Swim & Dive",                           period: "2022 — 2025",
        more: "Lettered for varsity swim and met the county cut requirements in the 200 IM, 100 breaststroke and 100 freestyle. Won the team's “Most Dedicated Swimmer” award for the 2023–2024 season." },
      { role: "Swim Member",     org: "Gamecock Club Swim",                             period: "2025 — 2026" },
      { role: "Lead Drummer",    org: "Three rock bands",                               period: "2020 — 2025",
        more: "Rock, indie and pop at venues around Atlanta — the Coca-Cola Roxy, MadLife Studios, Atlantic Station and Marietta Square. Won the 2023 Georgia Regional Battle of the Bands." }
    ],

    /* status: "Reading" | "Finished" | "Up next"
       Give a book a `look` object and it grows a "Take a look" button that
       opens the panel below — the ladder, the takeaways and the links. */
    reading: [
      {
        title: "7L: The Seven Levels of Communication",
        author: "Michael J. Maher",
        status: "Reading",
        take: "",                        // ← one line on why you picked it up
        cover: "assets/book-7l.jpg",
        buy: "https://www.amazon.com/7L-Levels-Communication-Relationships-Referrals/dp/1942952473",

        look: {
          cta: "Take a look inside",
          facts: "192 pages · BenBella Books · 2016",
          blurb:
            "Maher's argument is that how you reach someone caps how much you " +
            "can move them. He ranks seven ways of making contact, from a " +
            "billboard up to sitting across a table, and the ranking is " +
            "inconvenient: the cheap methods that scale are the ones that " +
            "persuade nobody. It's written as a parable — a struggling agent " +
            "called Rick Masters is taught the system — rather than as a manual.",

          ladder: {
            title: "The seven levels, bottom to top",
            note:
              "The bottom three inform: they announce, confirm and remind, and " +
              "that is all they are good for. The top three persuade. Level four " +
              "is the hinge — cheap enough to do often, personal enough to land.",
            items: [
              { n: 7, name: "One-on-one",        zone: "influential", body: "One person, undivided attention. Nothing else changes a mind as reliably." },
              { n: 6, name: "Events & seminars", zone: "influential", body: "A room you convened. Many real conversations at once, still face to face." },
              { n: 5, name: "Phone calls",       zone: "influential", body: "A live voice. It interrupts, which is exactly why it works." },
              { n: 4, name: "Handwritten notes", zone: "hinge",       body: "Slow and physical. Rare enough now that people keep them on the fridge." },
              { n: 3, name: "Electronic",        zone: "informational", body: "Email and messages. Free to send, effortless to ignore." },
              { n: 2, name: "Direct mail",       zone: "informational", body: "Something you can hold, still addressed to nobody in particular." },
              { n: 1, name: "Advertising",       zone: "informational", body: "Broadcast to everyone, remembered by no one." }
            ]
          },

          points: [
            { title: "The channel is the message",
              body: "Before worrying about what to say, Maher asks where you're saying it. A brilliant email still loses to an ordinary phone call." },
            { title: "Give first, and keep count of nothing",
              body: "He frames it as leaving the \"Ego Era\" for the \"Generosity Generation\" — lead with what you can do for someone, and stop auditing whether it came back." },
            { title: "Referrals are the output, not the goal",
              body: "You don't chase referrals; you build the kind of relationships that produce them. The business follows the friendships, not the other way round." },
            { title: "Do the top of the ladder on purpose",
              body: "The influential levels take real time, so they only happen if you schedule them. Left to drift, everyone slides back down to email." }
          ],

          links: [
            { label: "Read a sample",  href: "https://books.google.com/books/about/7L_The_Seven_Levels_of_Communication.html?id=o1tlCQAAQBAJ", note: "Google Books preview" },
            { label: "Borrow it free", href: "https://archive.org/details/7lsevenlevelsofc0000mahe", note: "Internet Archive lending library — free account needed" },
            { label: "Buy it",         href: "https://www.amazon.com/7L-Levels-Communication-Relationships-Referrals/dp/1942952473", note: "Amazon" }
          ]
        }
      }
    ],

    /* icon: leaf | fern | flower | tree | book | seed | sprout
       Give any of these a `photos` list and the icon is replaced by a small
       slideshow that crossfades on its own, with dots to steer it. One photo
       is fine too — it just sits there as a still. */
    interests: [
      { icon: "tree",   title: "Swimming",         body: "The deliberate gap in my schedule. An hour where nothing is due.",
        more: "Swimming is the break I build the rest of my week around. It's the one place where there's no screen and nothing to answer — just the set in front of me — and that turns out to be the fastest way I know to unwind. Looking after the physical side keeps the mental side steady: I come out of the water clearer than I went in, and the work I go back to is better for it. Five summers of coaching came out of the same habit.",
        photos: [
          { src: "assets/swim/swim-1.jpg", caption: "Poolside after a session" },
          { src: "assets/swim/swim-2.jpg", caption: "The team after an evening meet" },
          { src: "assets/swim/swim-3.jpg", caption: "Summer squad, 2025" },
          { src: "assets/swim/swim-4.jpg", caption: "Chimney Lakes coaching staff, 2025" },
          { src: "assets/swim/swim-5.jpg", caption: "Between events" },
          { src: "assets/swim/swim-6.jpg", caption: "Off the blocks at a meet" }
        ] },
      { icon: "flower", title: "Drumming",         body: "Lead drummer in three bands. Loud, and worth it.",
        more: "Drumming is where the energy goes. It's the opposite of everything else I do — nothing subtle, nothing careful, just something loud I get to hit as hard as the song needs. An hour behind a kit and whatever I was stressed about has been played out of me, which is a better result than most things I've tried. Rock, indie and pop at venues around Atlanta: the Coca-Cola Roxy, MadLife Studios, Atlantic Station and Marietta Square, plus the 2023 Georgia Regional Battle of the Bands.",
        photos: [{ src: "assets/beyond-drums.jpg", caption: "Playing a set with the band" }] },
      { icon: "seed",   title: "Sign language",    body: "Four years of ASL. A whole grammar that lives in your hands.",
        more: "Fluent in American Sign Language after four years of classes, and awarded Outstanding Achievement in ASL at Lassiter. As secretary of the ASL National Honor Society I arranged activities for Deaf and Hard of Hearing students around the county.",
        photos: [{ src: "assets/beyond-asl.jpg", caption: "Outstanding Achievement in ASL, Lassiter High School" }] }
    ]
  },

  /* ─── 7 · CONTACT ─────────────────────────────────────────────────── */
  contact: {
    kicker: "Contact",
    headline: "Contact me",
    body:
      "I'm open to internships, collaborations, and any project worth building. " +
      "If you've got an idea you're still working out, send it anyway — I answer " +
      "everything.",
    cta: "Send me an email",
    linkedinCta: "Connect on LinkedIn"
  }
};
