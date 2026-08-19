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

  /* ─── NESTED SCREENSHOT CROSSFADE ──────────────────────────────────── */
  /* Three renders of the same room in different palettes, fading between
     each other. It only runs while the section is on screen, and not at all
     if the visitor asked for reduced motion. */

  (function shots() {
    const imgs = $$(".shots__img");
    const label = $(".shots__label");
    if (imgs.length < 2 || REDUCED) return;

    const labels = imgs.map(i => (i.alt.split("the ")[1] || "").replace(" palette", ""));
    let i = 0, timer = null;

    const step = () => {
      imgs[i].classList.remove("is-on");
      i = (i + 1) % imgs.length;
      imgs[i].classList.add("is-on");
      if (label) label.textContent = labels[i];
    };

    const start = () => { if (!timer) timer = setInterval(step, 4200); };
    const stop  = () => { clearInterval(timer); timer = null; };

    new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(),
      { threshold: 0.25 }).observe($(".feature__art"));
  })();

  /* ─── PHOTO GALLERIES ───────────────────────────────────────────────── */
  /* Photos crossfade on their own, and the dots and arrows let a visitor
     take over. Any manual choice stops the autoplay for good — once someone
     is steering, the slideshow moving under them is just annoying. */

  $$(".gallery").forEach(box => {
    const imgs = $$(".gallery__img", box);
    const dots = $$(".gallery__dot", box);
    const caption = $(".gallery__caption", box);
    if (imgs.length < 2) return;

    let i = 0, timer = null, manual = false;

    const show = n => {
      imgs[i].classList.remove("is-on");
      if (dots[i]) { dots[i].classList.remove("is-on"); dots[i].setAttribute("aria-selected", "false"); }
      i = (n + imgs.length) % imgs.length;
      imgs[i].classList.add("is-on");
      if (dots[i]) { dots[i].classList.add("is-on"); dots[i].setAttribute("aria-selected", "true"); }
      if (caption) caption.textContent = imgs[i].alt;
    };

    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => { if (!timer && !manual && !REDUCED) timer = setInterval(() => show(i + 1), 4200); };
    const take = n => { manual = true; stop(); show(n); };

    dots.forEach((d, n) => d.addEventListener("click", () => take(n)));
    const prev = $(".gallery__arrow--prev", box);
    const next = $(".gallery__arrow--next", box);
    if (prev) prev.addEventListener("click", () => take(i - 1));
    if (next) next.addEventListener("click", () => take(i + 1));

    box.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft")  { take(i - 1); e.preventDefault(); }
      if (e.key === "ArrowRight") { take(i + 1); e.preventDefault(); }
    });

    new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(),
      { threshold: 0.25 }).observe(box);
  });

  /* ─── READ MORE ─────────────────────────────────────────────────────── */
  /* Native <details>, so it still opens with JS off. This only keeps the
     label honest once it's open. */

  $$(".more").forEach(d => {
    const label = $(".more__label", d);
    if (label) d.addEventListener("toggle", () => {
      label.textContent = d.open ? "Show less" : "Read more";
    });
  });

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
