/* ============================================================================
   main.js — boot + safety nets. Runs last.
   ========================================================================= */

(function () {
  "use strict";

  const $$ = s => [...document.querySelectorAll(s)];

  /* Safety net: if the `load` event already fired (bfcache, very fast cache),
     the hero reveal listener in effects.js would never run. Force it. */
  function revealHero() {
    $$(".hero [data-reveal]").forEach((n, i) => {
      n.style.setProperty("--d", `${i * 110}ms`);
      n.classList.add("is-in");
    });
  }
  if (document.readyState === "complete") revealHero();
  addEventListener("pageshow", e => { if (e.persisted) revealHero(); });

  /* Hard fallback: if anything above threw and content is still invisible
     after 2.5s, show everything rather than leaving a blank page. */
  setTimeout(() => {
    $$("[data-reveal]:not(.is-in), .stagger:not(.is-in)").forEach(n => n.classList.add("is-in"));
    $$(".mission__statement .w").forEach(w => { w.style.opacity = "1"; });
    $$(".bar__fill").forEach(f => { if (!f.style.width) f.style.width = `${f.dataset.w}%`; });
  }, 2500);

  document.body.classList.add("is-ready");
})();
