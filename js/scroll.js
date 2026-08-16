/* ============================================================================
   scroll.js — the small amount of motion this site actually needs.
   Rise-in on scroll · sticky nav · active section · theme · copy email.
   That's the whole file. Nothing follows your cursor, nothing spins.
   ========================================================================= */

(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ─── THEME ────────────────────────────────────────────────────────── */

  const root = document.documentElement;
  const saved = localStorage.getItem("pf-theme");
  root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const themeBtn = $("#themeToggle");
  function syncThemeLabel() {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    themeBtn.setAttribute("aria-label", `Switch to ${next} mode`);
  }
  syncThemeLabel();

  themeBtn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("pf-theme", root.dataset.theme);
    syncThemeLabel();
  });

  /* ─── RISE-IN ──────────────────────────────────────────────────────── */
  /* Every animated element uses the same observer, the same distance and the
     same easing. Consistency is what makes motion feel calm instead of busy. */

  const rise = $$("[data-rise]");

  if (REDUCED || !("IntersectionObserver" in window)) {
    rise.forEach(n => n.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        obs.unobserve(e.target);          // animate once, then leave it alone
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    rise.forEach(n => io.observe(n));

    // The hero is above the fold — stagger it in on load rather than on scroll.
    const heroBits = $$(".hero [data-rise]");
    addEventListener("load", () => {
      heroBits.forEach((n, i) => {
        n.style.setProperty("--d", `${i * 90}ms`);
        n.classList.add("is-in");
      });
    });

    /* Safety net: if something above failed, reveal whatever is already on
       screen after a moment. Scoped to the viewport so the rest of the page
       keeps its scroll animation. */
    setTimeout(() => {
      $$("[data-rise]:not(.is-in)").forEach(n => {
        const r = n.getBoundingClientRect();
        if (r.top < innerHeight - 60 && r.bottom > 0) n.classList.add("is-in");
      });
    }, 2200);
  }

  /* ─── STICKY NAV + ACTIVE SECTION ──────────────────────────────────── */

  const nav = $("#nav");
  const links = $$(".nav__links a");
  const sections = links
    .map(a => $(a.getAttribute("href")))
    .filter(Boolean);

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle("is-stuck", scrollY > 30);

      // Whichever section covers the 40%-down line is the current one.
      const line = scrollY + innerHeight * 0.4;
      let active = null;
      for (const s of sections) if (s.offsetTop <= line) active = s;

      links.forEach(a =>
        a.classList.toggle("is-here", active && a.getAttribute("href") === `#${active.id}`));

      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ─── COPY EMAIL ───────────────────────────────────────────────────── */

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-up");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-up"), 2200);
  }

  $("#copyMail").addEventListener("click", async () => {
    const addr = window.PORTFOLIO.meta.email;
    try {
      await navigator.clipboard.writeText(addr);
      toast("Email copied");
    } catch {
      // clipboard API needs https or localhost — fall back to the old way
      const ta = document.createElement("textarea");
      ta.value = addr;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      toast("Email copied");
    }
  });

})();
