/* ============================================================================
   motion.js — Motion (framer-motion) driving every reveal on the page.

   This site has no build step and no React, so it uses Motion's vanilla
   entry point rather than `motion/react`. Same engine, same easings, same
   spring solver — just `animate` / `inView` / `scroll` / `hover` / `press`
   instead of <motion.div>. Loaded as an ES module from a CDN.

   Two rules this file has to keep:
     1. Never run alongside the CSS failsafe in index.html. It claims the
        page with .motion-ready the moment it loads; the failsafe stands
        down when it sees that class.
     2. Never be required for the page to be readable. If this import
        throws, the failsafe reveals everything 1.5s after load.
   ========================================================================= */

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* One easing for entrances, matching --ease in the stylesheet so Motion and
   the CSS transitions elsewhere on the page move identically. */
const EASE = [0.22, 1, 0.36, 1];

let M;
try {
  M = await import("https://cdn.jsdelivr.net/npm/motion@12/+esm");
} catch (err) {
  // CDN blocked or offline. Say nothing, change nothing — the failsafe in
  // index.html reveals the page in plain CSS a moment from now.
  console.warn("Motion unavailable; falling back to CSS reveals.", err);
}

if (M) {
  const { animate, inView, scroll, stagger, hover, press } = M;

  /* Claim the page before doing anything, so the failsafe stands down. */
  document.documentElement.classList.add("motion-ready");

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Elements start hidden in CSS ([data-rise]). Whoever reveals one is also
     responsible for marking it .is-in, so the two systems agree on state. */
  const settle = el => el.classList.add("is-in");

  /* On a slow connection the failsafe can fire before this module arrives.
     If it already revealed the page, animating from opacity 0 now would
     flash the content back out. Take the interactive parts only. */
  const LATE = document.documentElement.classList.contains("motion-off");

  if (REDUCED || LATE) {
    /* Everything is simply present. No entrances, no parallax, no breathing.
       The progress bar stays — it is information, not decoration, and it
       doesn't move on its own. Button springs stay for the late case but
       not for reduced motion. */
    $$("[data-rise]").forEach(settle);
    progressBar();
    if (LATE && !REDUCED) { parallax(); buttonSprings(); }
  } else {
    heroEntrance();
    sectionReveals();
    parallax();
    progressBar();
    buttonSprings();
  }

  /* ─── HERO ──────────────────────────────────────────────────────────── */
  /* The hero is above the fold, so it plays on load rather than on scroll.
     The words stagger up the left; the portrait springs in beside them a
     beat earlier, because it is the thing the eye lands on first. */

  function heroEntrance() {
    const copy = $$(".hero__copy [data-rise]");
    const portrait = $(".hero .portrait");

    if (portrait) {
      settle(portrait);
      animate(
        portrait,
        { opacity: [0, 1], scale: [0.94, 1], y: [24, 0] },
        { type: "spring", stiffness: 110, damping: 18, mass: 0.9 }
      );

      /* The arch outline and the halo settle in behind it. */
      const arch = $(".portrait__arch");
      const halo = $(".portrait__halo");

      if (arch) {
        animate(arch,
          { opacity: [0, 0.5], scale: [1.06, 1] },
          { duration: 0.9, delay: 0.25, ease: EASE });
      }

      if (halo) {
        /* A slow breath. Barely visible on any single frame, but it keeps
           the largest area of color on the page from reading as dead. */
        animate(halo,
          { scale: [1, 1.07, 1], opacity: [0.9, 1, 0.9] },
          { duration: 9, repeat: Infinity, ease: "easeInOut" });
      }
    }

    if (copy.length) {
      copy.forEach(settle);
      animate(
        copy,
        { opacity: [0, 1], y: [22, 0] },
        { duration: 0.75, delay: stagger(0.08, { startDelay: 0.12 }), ease: EASE }
      );
    }

    /* The scroll cue arrives last, once there is something to scroll to. */
    const down = $(".hero__down");
    if (down) {
      animate(down, { opacity: [0, 1] }, { duration: 0.6, delay: 0.9, ease: EASE });
    }
  }

  /* ─── SECTION REVEALS ───────────────────────────────────────────────── */
  /* Replaces the hand-rolled IntersectionObserver. inView fires once per
     element and then stops watching it, which is what `viewport={{once:true}}`
     does in the React API. */

  function sectionReveals() {
    const rest = $$("[data-rise]").filter(n => !n.closest(".hero"));

    rest.forEach(el => {
      /* inView repeats by default, and a second run would fade the element
         back from zero when you scroll up. Stop watching after the first. */
      const stop = inView(el, () => {
        settle(el);
        animate(el, { opacity: [0, 1], y: [18, 0] },
          { duration: 0.7, ease: EASE });
        stop();
      }, { margin: "0px 0px -40px 0px", amount: 0.1 });
    });
  }

  /* ─── SCROLL-LINKED DEPTH ───────────────────────────────────────────── */
  /* Scroll-linked, not scroll-triggered: these are tied to scroll position
     so they track the finger exactly. The ranges are deliberately small —
     the goal is depth, not a rollercoaster. */

  function parallax() {
    const hero = $(".hero");
    if (!hero) return;

    const range = { target: hero, offset: ["start start", "end start"] };

    /* These write the independent `translate` property, never `transform`.
       Motion's entrance animations own `transform` on these same elements,
       and the two properties compose instead of overwriting each other. */

    const portrait = $(".hero .portrait");
    if (portrait) {
      scroll((p) => {
        portrait.style.translate = `0 ${p * 70}px`;
        /* Opacity is shared with the entrance, so only touch it once the
           hero has actually started moving. */
        if (p > 0) portrait.style.opacity = String(1 - p * 0.55);
      }, range);
    }

    const copy = $(".hero__copy");
    if (copy) {
      scroll((p) => {
        copy.style.translate = `0 ${p * 34}px`;
        if (p > 0) copy.style.opacity = String(1 - p * 0.7);
      }, range);
    }

    /* The corner ferns move slower than the page, which is the whole trick
       behind parallax. Their base rotation lives in `rotate:`/`scale:` in
       the stylesheet, so `translate` here leaves it intact. */
    $$(".hero__frond").forEach((frond, i) => {
      scroll((p) => { frond.style.translate = `0 ${p * (i ? -40 : -26)}px`; }, range);
    });
  }

  /* ─── READING PROGRESS ──────────────────────────────────────────────── */

  function progressBar() {
    const bar = $("#navProgress");
    if (!bar) return;
    scroll((p) => { bar.style.transform = `scaleX(${p})`; });
  }

  /* ─── BUTTON FEEL ───────────────────────────────────────────────────── */
  /* Springs, not tweens — a button that is being pressed should feel
     physical. Tiny values: this should register as responsiveness, not as
     an animation someone chose to add. */

  function buttonSprings() {
    const spring = { type: "spring", stiffness: 400, damping: 22 };

    $$(".btn").forEach(btn => {
      hover(btn, () => {
        animate(btn, { scale: 1.035 }, spring);
        return () => animate(btn, { scale: 1 }, spring);
      });

      press(btn, () => {
        animate(btn, { scale: 0.975 }, spring);
        return () => animate(btn, { scale: 1.0 }, spring);
      });
    });
  }
}
