/* ============================================================================
   palette.js — the ⌘K / Ctrl+K command palette.
   Fuzzy-searches sections, projects, and actions. Fully keyboard driven.
   ========================================================================= */

(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const D = window.PORTFOLIO;

  const box     = $("#palette");
  const input   = $("#paletteInput");
  const results = $("#paletteResults");
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const go = id => $(`#${id}`).scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });

  /* ── The command index ── */
  const COMMANDS = [
    { group: "Navigate", icon: "◆", label: "Top",        sub: "Back to the hero",     run: () => go("top") },
    { group: "Navigate", icon: "✦", label: "Mission",    sub: "What I'm trying to do", run: () => go("mission") },
    { group: "Navigate", icon: "◐", label: "Now",        sub: "What I'm building",    run: () => go("now") },
    { group: "Navigate", icon: "▦", label: "Work",       sub: "Things I've created",  run: () => go("work") },
    { group: "Navigate", icon: "▤", label: "Résumé",     sub: "The paper trail",      run: () => go("resume") },
    { group: "Navigate", icon: "☾", label: "Interests",  sub: "Off the clock",        run: () => go("interests") },
    { group: "Navigate", icon: "✉", label: "Contact",    sub: "Say hello",            run: () => go("contact") },

    // Each project becomes a jump target, so typing its name finds it.
    ...D.work.projects.map(p => ({
      group: "Projects", icon: p.glyph || "◆", label: p.title,
      sub: (p.tags || []).join(" · "),
      run: () => {
        go("work");
        const card = $(`.project[data-title="${CSS.escape(p.title)}"]`);
        if (!card) return;
        setTimeout(() => {
          card.animate(
            [{ boxShadow: "0 0 0 0 var(--accent)" },
             { boxShadow: "0 0 0 4px var(--accent)" },
             { boxShadow: "0 0 0 0 var(--accent)" }],
            { duration: 1100, easing: "ease-out" }
          );
        }, 620);
      }
    })),

    { group: "Actions", icon: "✉", label: "Email me",       sub: D.meta.email,       run: () => location.href = `mailto:${D.meta.email}` },
    { group: "Actions", icon: "⧉", label: "Copy email",     sub: D.meta.email,       run: async () => { await navigator.clipboard.writeText(D.meta.email); window.pfToast("Email copied"); } },
    { group: "Actions", icon: "◑", label: "Toggle theme",   sub: "Light / dark",     run: () => window.pfTheme.setTheme(window.pfTheme.theme === "dark" ? "light" : "dark") },
    { group: "Actions", icon: "◈", label: "Change accent",  sub: "Cycle the palette", run: () => window.pfTheme.cycleAccent() },
    { group: "Actions", icon: "⎙", label: "Print this page", sub: "Résumé-friendly",  run: () => print() },

    ...Object.entries(D.meta.links)
      .filter(([, v]) => v)
      .map(([k, v]) => ({
        group: "Links", icon: "↗",
        label: { github: "GitHub", linkedin: "LinkedIn", x: "X / Twitter", resume: "Download résumé" }[k] || k,
        sub: v,
        run: () => window.open(v, k === "resume" ? "_self" : "_blank", "noopener")
      }))
  ];

  /* ── Fuzzy scoring: subsequence match, rewarding tight + early matches ── */
  function score(needle, hay) {
    if (!needle) return 1;
    needle = needle.toLowerCase(); hay = hay.toLowerCase();
    if (hay.startsWith(needle)) return 1000;
    if (hay.includes(needle)) return 500;
    let hi = 0, s = 0, streak = 0;
    for (const ch of needle) {
      const idx = hay.indexOf(ch, hi);
      if (idx === -1) return 0;
      streak = idx === hi ? streak + 1 : 0;
      s += 10 + streak * 5 - Math.min(idx - hi, 8);
      hi = idx + 1;
    }
    return s;
  }

  let filtered = [];
  let sel = 0;

  function draw() {
    const q = input.value.trim();

    filtered = COMMANDS
      .map(c => ({ c, s: Math.max(score(q, c.label), score(q, c.sub || "") * 0.5) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.c);

    if (sel >= filtered.length) sel = Math.max(0, filtered.length - 1);
    results.innerHTML = "";

    if (!filtered.length) {
      results.innerHTML = `<li class="palette__empty">Nothing matches “${q.replace(/</g, "&lt;")}”.</li>`;
      return;
    }

    let lastGroup = null;
    filtered.forEach((c, i) => {
      // Only show group headers when not actively searching — less noise.
      if (!q && c.group !== lastGroup) {
        lastGroup = c.group;
        const h = document.createElement("li");
        h.className = "palette__group";
        h.textContent = c.group;
        results.appendChild(h);
      }
      const li = document.createElement("li");
      li.className = `palette__item${i === sel ? " is-sel" : ""}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", i === sel);
      li.innerHTML =
        `<span class="palette__icon">${c.icon}</span>` +
        `<span class="palette__label">${c.label}</span>` +
        `<span class="palette__sub">${(c.sub || "").slice(0, 34)}</span>`;
      li.addEventListener("click", () => exec(i));
      li.addEventListener("mousemove", () => { if (sel !== i) { sel = i; paint(); } });
      results.appendChild(li);
    });
  }

  // Repaint selection without rebuilding the list (keeps mousemove smooth).
  function paint() {
    $$(".palette__item", results).forEach((n, i) => {
      n.classList.toggle("is-sel", i === sel);
      n.setAttribute("aria-selected", i === sel);
    });
    const cur = $(".palette__item.is-sel", results);
    if (cur) cur.scrollIntoView({ block: "nearest" });
  }

  function exec(i) {
    const cmd = filtered[i];
    if (!cmd) return;
    close();
    setTimeout(() => cmd.run(), 60);
  }

  let lastFocus = null;
  function open() {
    lastFocus = document.activeElement;
    box.hidden = false;
    input.value = "";
    sel = 0;
    draw();
    input.focus();
    document.body.style.overflow = "hidden";
  }
  function close() {
    box.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  /* ── Wiring ── */
  $("#openPalette").addEventListener("click", open);
  $$("[data-close-palette]").forEach(n => n.addEventListener("click", close));
  input.addEventListener("input", () => { sel = 0; draw(); });

  addEventListener("keydown", e => {
    const isOpen = !box.hidden;

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      isOpen ? close() : open();
      return;
    }
    // "/" opens it too, as long as you aren't already typing somewhere.
    if (!isOpen && e.key === "/" && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
      e.preventDefault(); open(); return;
    }
    if (!isOpen) return;

    if (e.key === "Escape")      { e.preventDefault(); close(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % filtered.length; paint(); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); sel = (sel - 1 + filtered.length) % filtered.length; paint(); }
    else if (e.key === "Enter")     { e.preventDefault(); exec(sel); }
  });

  // Show the right modifier key for the platform.
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) {
    const k = $("#openPalette kbd");
    if (k) k.textContent = "Ctrl";
  }
})();
