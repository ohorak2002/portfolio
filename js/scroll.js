/* ============================================================================
   scroll.js — the page's own behaviour, minus the animation.
   Sticky nav · active section · slideshows · checklist · copy email.
   Reveals and hero motion live in js/motion.js.
   Nothing follows your cursor, nothing spins.
   ========================================================================= */

(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ─── RISE-IN ──────────────────────────────────────────────────────── */
  /* Lives in js/motion.js now — Motion's inView drives every reveal, and the
     failsafe in index.html covers the case where that module never loads. */

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

  /* ─── WALKTHROUGH CLIPS ─────────────────────────────────────────────── */
  /* Four silent loops. Only the ones on screen are allowed to run, so the
     page isn't decoding four videos at once, and none of them start until
     you've scrolled far enough to care. */

  (function walkClips() {
    const vids = $$(".walk__video");
    if (!vids.length) return;

    if (REDUCED) {                       // show a still frame and leave it
      vids.forEach(v => { v.autoplay = false; v.pause(); });
      return;
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const v = e.target;
        if (e.isIntersecting) {
          const p = v.play();
          if (p) p.catch(() => { /* autoplay refused — the poster stays up */ });
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });

    vids.forEach(v => io.observe(v));
  })();

  /* ─── GOAL CHECKLIST ────────────────────────────────────────────────── */
  /* Ticks live in this visitor's own browser and nowhere else. Wrapped
     because private-mode Safari throws on localStorage rather than
     returning null, and a thrown error here would kill everything below. */

  (function checklist() {
    const boxes = $$(".goal__input");
    if (!boxes.length) return;

    const KEY = "pf-goals";
    let done = [];
    try { done = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { done = []; }

    boxes.forEach(b => {
      if (done.includes(b.dataset.goal)) b.checked = true;
      b.addEventListener("change", () => {
        const on = boxes.filter(x => x.checked).map(x => x.dataset.goal);
        try { localStorage.setItem(KEY, JSON.stringify(on)); } catch (e) { /* nothing to do */ }
      });
    });
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
