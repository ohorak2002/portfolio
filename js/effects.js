/* ============================================================================
   effects.js — everything that moves.
   Custom cursor · particle field · text scramble · scroll reveals ·
   magnetic buttons · card spotlight · scroll spy · theme + accent · easter eggs
   ========================================================================= */

(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE_POINTER = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ═══════════════════ 1. THEME + ACCENT (persisted) ═══════════════════ */

  const ACCENTS = ["citrus", "ember", "ice", "bloom"];
  const root = document.documentElement;

  const savedTheme  = localStorage.getItem("pf-theme");
  const savedAccent = localStorage.getItem("pf-accent");

  // If the visitor has never chosen, follow their OS preference.
  root.dataset.theme  = savedTheme  || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  root.dataset.accent = savedAccent || "citrus";

  function setTheme(t) {
    root.dataset.theme = t;
    localStorage.setItem("pf-theme", t);
    toast(t === "dark" ? "Dark mode" : "Light mode");
  }
  function cycleAccent() {
    const next = ACCENTS[(ACCENTS.indexOf(root.dataset.accent) + 1) % ACCENTS.length];
    root.dataset.accent = next;
    localStorage.setItem("pf-accent", next);
    toast(`Accent: ${next}`);
  }

  $("#themeToggle").addEventListener("click", () =>
    setTheme(root.dataset.theme === "dark" ? "light" : "dark"));
  $("#accentToggle").addEventListener("click", cycleAccent);

  window.pfTheme = { setTheme, cycleAccent, get theme() { return root.dataset.theme; } };

  /* ═══════════════════ 2. TOAST ═══════════════════ */

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-up");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-up"), 2000);
  }
  window.pfToast = toast;

  /* ═══════════════════ 3. CUSTOM CURSOR ═══════════════════ */

  if (FINE_POINTER && !REDUCED) {
    const cur = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    let mx = innerWidth / 2, my = innerHeight / 2;   // real mouse
    let rx = mx, ry = my;                            // lagging ring

    addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });

    (function loop() {
      // Ring eases toward the cursor — the lag is what makes it feel alive.
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

    const HOVERABLE = "a, button, .project, .bento-card, .now-card, input, [data-magnetic]";
    addEventListener("mouseover", e => {
      if (e.target.closest(HOVERABLE)) document.body.classList.add("cursor-hover");
    });
    addEventListener("mouseout", e => {
      if (e.target.closest(HOVERABLE)) document.body.classList.remove("cursor-hover");
    });
    addEventListener("mousedown", () => document.body.classList.add("cursor-down"));
    addEventListener("mouseup",   () => document.body.classList.remove("cursor-down"));
    cur.style.opacity = "1";
  }

  /* ═══════════════════ 4. HERO PARTICLE FIELD ═══════════════════ */
  /* A constellation of drifting points; lines are drawn between any two that
     are close enough, and the mouse acts as a gentle repeller.              */

  (function particles() {
    const cvs = $(".hero__canvas");
    if (!cvs || REDUCED) return;

    const ctx = cvs.getContext("2d", { alpha: true });
    let w, h, dpr, pts = [], raf, mouse = { x: -9999, y: -9999 };

    function accentRGB() {
      // Read the live accent colour so particles restyle when you cycle accents.
      const c = getComputedStyle(root).getPropertyValue("--accent").trim();
      const probe = document.createElement("div");
      probe.style.color = c;
      document.body.appendChild(probe);
      const rgb = getComputedStyle(probe).color.match(/\d+/g);
      probe.remove();
      return rgb ? rgb.slice(0, 3).join(",") : "217,242,74";
    }
    let RGB = accentRGB();
    new MutationObserver(() => { RGB = accentRGB(); })
      .observe(root, { attributes: true, attributeFilter: ["data-accent", "data-theme"] });

    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cvs.clientWidth; h = cvs.clientHeight;
      cvs.width = w * dpr; cvs.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area, capped so phones don't melt.
      const count = Math.min(Math.round((w * h) / 16000), 110);
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.5 + 0.6
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000 && d2 > 0.01) {
          const f = (16000 - d2) / 16000 * 0.8;
          const d = Math.sqrt(d2);
          p.x += (dx / d) * f; p.y += (dy / d) * f;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${RGB},.55)`;
        ctx.fill();
      }

      // Connect nearby points
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 15000) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${RGB},${(1 - d2 / 15000) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }

    addEventListener("mousemove", e => {
      const r = cvs.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    }, { passive: true });
    addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });

    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(size, 180); });

    // Stop burning CPU once the hero scrolls out of view.
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!raf) raf = requestAnimationFrame(frame); }
      else { cancelAnimationFrame(raf); raf = null; }
    }, { threshold: 0 }).observe(cvs);

    size();
  })();

  /* ═══════════════════ 5. TEXT SCRAMBLE ═══════════════════ */

  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#";

  function scramble(node, text, speed = 1) {
    if (REDUCED) { node.textContent = text; return Promise.resolve(); }
    const from = node.textContent;
    const len = Math.max(from.length, text.length);
    const queue = [];
    for (let i = 0; i < len; i++) {
      const start = Math.floor(Math.random() * 22 / speed);
      const end = start + Math.floor(Math.random() * 22 / speed) + 6;
      queue.push({ from: from[i] || "", to: text[i] || "", start, end, char: "" });
    }
    return new Promise(resolve => {
      let f = 0;
      (function tick() {
        let out = "", done = 0;
        for (const q of queue) {
          if (f >= q.end) { done++; out += q.to; }
          else if (f >= q.start) {
            if (!q.char || Math.random() < 0.3) q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
            out += `<span style="opacity:.55">${q.char}</span>`;
          } else out += q.from;
        }
        node.innerHTML = out;
        if (done === queue.length) resolve();
        else { f++; requestAnimationFrame(tick); }
      })();
    });
  }

  // Hero word rotator
  (function rotator() {
    const node = $("#rotatorWord");
    const words = window.PORTFOLIO.meta.rotating;
    if (!node || !words || !words.length) return;
    let i = 0;
    node.textContent = words[0];
    setInterval(() => {
      i = (i + 1) % words.length;
      scramble(node, words[i]);
    }, 2800);
  })();

  // Nav monogram scrambles on hover
  $$("[data-scramble-hover]").forEach(n => {
    const original = n.textContent;
    n.parentElement.addEventListener("mouseenter", () => scramble(n, original, 2.2));
  });

  /* ═══════════════════ 6. SCROLL REVEALS ═══════════════════ */

  const revealIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  $$("[data-reveal], .stagger").forEach(n => revealIO.observe(n));

  // Hero elements shouldn't wait for scroll — stagger them in on load.
  addEventListener("load", () => {
    $$(".hero [data-reveal]").forEach((n, i) => {
      n.style.setProperty("--d", `${i * 110}ms`);
      n.classList.add("is-in");
    });
  });

  // Mission statement: words light up as the block enters view.
  const stmt = $(".mission__statement");
  if (stmt) {
    new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting) return;
      const words = $$(".w", stmt);
      words.forEach((w, i) => setTimeout(() => { w.style.opacity = "1"; }, i * 34));
      obs.disconnect();
    }, { threshold: 0.35 }).observe(stmt);
  }

  // Progress bars fill when they scroll into view.
  const barIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const f = e.target;
      setTimeout(() => { f.style.width = `${f.dataset.w}%`; }, 180);
      obs.unobserve(f);
    });
  }, { threshold: 0.5 });
  $$(".bar__fill").forEach(f => barIO.observe(f));

  // Timeline dots light up individually.
  const tlIO = new IntersectionObserver(entries => {
    entries.forEach(e => e.target.classList.toggle("is-in", e.isIntersecting));
  }, { threshold: 0.4 });
  $$(".tl-item").forEach(i => tlIO.observe(i));

  /* ═══════════════════ 7. MAGNETIC ELEMENTS ═══════════════════ */
  /* Buttons drift toward the cursor when it's close. Subtle — 0.25 strength. */

  if (FINE_POINTER && !REDUCED) {
    $$("[data-magnetic]").forEach(node => {
      node.addEventListener("mousemove", e => {
        const r = node.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        node.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
      });
      node.addEventListener("mouseleave", () => { node.style.transform = ""; });
    });
  }

  /* ═══════════════════ 8. CARD SPOTLIGHT + TILT ═══════════════════ */

  if (FINE_POINTER && !REDUCED) {
    $$(".project").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        card.style.transform =
          `perspective(1100px) rotateX(${(0.5 - py) * 4}deg) rotateY(${(px - 0.5) * 5}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ═══════════════════ 9. SCROLL SPY + PROGRESS + NAV ═══════════════════ */

  const bar = $(".progress__bar");
  const nav = $("#nav");
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__links a");
  const railItems = $$(".rail__list li");
  const tlProgress = $(".timeline__progress");
  const timeline = $("#timeline");

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;

      bar.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      nav.classList.toggle("is-stuck", y > 40);

      // Active section = whichever one covers the 40%-down line.
      const line = y + innerHeight * 0.4;
      let active = sections[0];
      for (const s of sections) if (s.offsetTop <= line) active = s;

      navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${active.id}`));
      railItems.forEach(li => li.classList.toggle("is-active", li.dataset.for === active.id));

      // Timeline spine fills as you read it.
      if (timeline && tlProgress) {
        const r = timeline.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (innerHeight * 0.55 - r.top) / r.height));
        tlProgress.style.height = `${pct * 100}%`;
      }
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Rail ticks are clickable shortcuts.
  railItems.forEach(li => {
    li.style.cursor = "pointer";
    li.addEventListener("click", () =>
      $(`#${li.dataset.for}`).scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" }));
  });

  /* ═══════════════════ 10. COPY EMAIL ═══════════════════ */

  $("#copyMail").addEventListener("click", async () => {
    const addr = window.PORTFOLIO.meta.email;
    try {
      await navigator.clipboard.writeText(addr);
      toast("Email copied");
    } catch {
      // Clipboard API needs https or localhost — fall back to a selection.
      const ta = document.createElement("textarea");
      ta.value = addr; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); ta.remove();
      toast("Email copied");
    }
  });

  /* ═══════════════════ 11. EASTER EGGS ═══════════════════ */

  // Konami code
  const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let kIdx = 0;
  addEventListener("keydown", e => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kIdx = (key === KONAMI[kIdx]) ? kIdx + 1 : (key === KONAMI[0] ? 1 : 0);
    if (kIdx === KONAMI.length) {
      kIdx = 0;
      toast(window.PORTFOLIO.konami);
      document.body.animate(
        [{ filter: "hue-rotate(0deg)" }, { filter: "hue-rotate(360deg)" }],
        { duration: 1600, easing: "ease-in-out" }
      );
    }
  });

  // Title changes when you tab away
  const realTitle = document.title;
  document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "← come back" : realTitle;
  });

  // A note for anyone who opens devtools
  const style = "color:#d9f24a;font-family:monospace;font-size:12px";
  window.PORTFOLIO.console.forEach(l => console.log(`%c${l}`, style));

})();
