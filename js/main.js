/* ============================================================================
   main.js — boot + safety nets. Runs last.
   ========================================================================= */

(function () {
  "use strict";

  const $$ = s => [...document.querySelectorAll(s)];

  /* Safety net 1: if the `load` event already fired (bfcache, warm cache), the
     hero reveal listener in effects.js would never run. Force it. */
  function revealHero() {
    $$(".hero [data-reveal]").forEach((n, i) => {
      n.style.setProperty("--d", `${i * 110}ms`);
      n.classList.add("is-in");
    });
  }
  if (document.readyState === "complete") revealHero();
  addEventListener("pageshow", e => { if (e.persisted) revealHero(); });

  /* Safety net 2: reveal anything that is *already on screen* but still
     hidden — that only happens if IntersectionObserver failed or never fired.
     Deliberately scoped to the viewport: blanket-revealing the whole page
     would throw away the scroll animations for everyone else. */
  function rescueVisible() {
    const pad = 80;
    $$("[data-reveal]:not(.is-in), .stagger:not(.is-in)").forEach(n => {
      const r = n.getBoundingClientRect();
      if (r.top < innerHeight - pad && r.bottom > 0) n.classList.add("is-in");
    });
    $$(".bar__fill").forEach(f => {
      const r = f.getBoundingClientRect();
      if (!f.style.width && r.top < innerHeight && r.bottom > 0) f.style.width = `${f.dataset.w}%`;
    });
    const stmt = document.querySelector(".mission__statement");
    if (stmt) {
      const r = stmt.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) stmt.classList.add("is-lit");
    }
  }
  setTimeout(rescueVisible, 2200);

  /* Safety net 3: no IntersectionObserver at all (very old browser) — show
     everything immediately rather than serving a blank page. */
  if (!("IntersectionObserver" in window)) {
    $$("[data-reveal], .stagger").forEach(n => n.classList.add("is-in"));
    $$(".bar__fill").forEach(f => { f.style.width = `${f.dataset.w}%`; });
    document.querySelector(".mission__statement")?.classList.add("is-lit");
  }

  document.body.classList.add("is-ready");
})();
