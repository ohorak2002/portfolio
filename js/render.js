/* ============================================================================
   render.js — turns window.PORTFOLIO into DOM.
   You shouldn't need to touch this; edit js/data.js instead.
   ========================================================================= */

(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Small helper: build an element from tag + props + children */
  function el(tag, props = {}, kids = []) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v === null || v === undefined || v === "") continue;
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k === "text") n.textContent = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2).toLowerCase(), v);
      else n.setAttribute(k, v);
    }
    (Array.isArray(kids) ? kids : [kids]).forEach(c => c && n.appendChild(c));
    return n;
  }

  /* Escape user text before it ever touches innerHTML */
  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* *word* → <span class="hl">word</span> */
  const markup = s => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

  /* ───────────────────────── HEAD / META ───────────────────────── */
  document.title = `${D.meta.name} — Portfolio`;
  $("#year").textContent = new Date().getFullYear();
  $("#footerName").textContent = D.meta.name;
  $(".nav__initials").textContent = D.meta.initials;

  /* ───────────────────────── HERO ───────────────────────── */
  $(".hero__eyebrow").textContent = D.hero.eyebrow;

  // Each headline line gets its own overflow-hidden mask so it can slide up.
  $(".hero__headline").innerHTML = D.hero.headline
    .map(l => `<span class="line"><span>${markup(l)}</span></span>`).join("");

  $(".hero__blurb").textContent = D.hero.blurb;
  $(".hero__status-label").textContent = D.meta.status.label;
  $(".hero__status-value").textContent = D.meta.status.value;
  $(".hero__status .dot").dataset.tone = D.meta.status.tone || "green";

  const ctas = $(".hero__ctas");
  D.hero.ctas.forEach(c => {
    ctas.appendChild(el("a", {
      class: `btn ${c.primary ? "btn--primary" : "btn--ghost"}`,
      href: c.href, text: c.label, "data-magnetic": ""
    }));
  });

  /* ───────────────────────── MARQUEE ───────────────────────── */
  // Pull every tag used anywhere in the data, dedupe, and scroll them.
  const allTags = [...new Set([
    ...D.now.items.flatMap(i => i.tags || []),
    ...D.work.projects.flatMap(p => p.tags || []),
    ...D.resume.skills.flatMap(g => g.items.map(i => i.name))
  ])].filter(t => t !== "Placeholder");

  const runOnce = () => el("div", {
    class: "marquee__item",
    html: allTags.map(t => `<span>${esc(t)}</span>`).join('<span style="color:var(--accent);font-size:7px">◆</span>')
  });
  const track = $("#marqueeTrack");
  track.appendChild(runOnce());
  track.appendChild(runOnce()); // duplicate so the -50% loop is seamless

  /* ───────────────────────── MISSION ───────────────────────── */
  $(".section--mission .kicker").textContent = D.mission.kicker;

  // Split into words so each can fade in individually on scroll.
  // The *highlight* markers have to be resolved per-word, not on the whole
  // string — otherwise a multi-word highlight gets torn in half by the split.
  (function buildStatement() {
    let inHl = false;
    $(".mission__statement").innerHTML = D.mission.statement
      .trim().split(/\s+/)
      .map(raw => {
        let word = raw;
        if (word.startsWith("*")) { inHl = true; word = word.slice(1); }
        const lit = inHl;
        // Closing marker may sit before trailing punctuation: `built*,`
        if (/\*[.,!?;:—]*$/.test(word)) inHl = false;
        word = word.replace(/\*/g, "");
        return `<span class="w${lit ? " hl" : ""}">${esc(word)}</span>`;
      })
      .join(" ");
  })();

  const principles = $("#principles");
  D.mission.principles.forEach((p, i) => {
    principles.appendChild(el("li", { class: "principle stagger", style: `--d:${i * 70}ms` }, [
      el("span", { class: "principle__n", text: p.n }),
      el("h3", { class: "principle__title", text: p.title }),
      el("p", { class: "principle__body", text: p.body })
    ]));
  });

  /* ───────────────────────── NOW ───────────────────────── */
  $(".section--now .kicker").textContent = D.now.kicker;
  $(".section--now .section__title").textContent = D.now.title;
  $(".section--now .section__meta").textContent = `Updated ${D.now.updated}`;

  const nowGrid = $("#nowGrid");
  D.now.items.forEach((it, i) => {
    nowGrid.appendChild(el("article", { class: "now-card stagger", style: `--d:${i * 90}ms` }, [
      el("div", { class: "now-card__top" }, [
        el("h3", { class: "now-card__title", text: it.title }),
        el("span", { class: "state", "data-state": it.state, text: it.state })
      ]),
      el("p", { class: "now-card__body", text: it.body }),
      el("div", { class: "bar" }, [
        el("span", { class: "bar__fill", "data-w": it.progress })
      ]),
      el("div", { class: "tags" }, (it.tags || []).map(t => el("span", { class: "tag", text: t })))
    ]));
  });

  /* ───────────────────────── WORK ───────────────────────── */
  $(".section--work .kicker").textContent = D.work.kicker;
  $(".section--work .section__title").textContent = D.work.title;

  const workGrid = $("#workGrid");
  D.work.projects.forEach((p, i) => {
    const links = el("div", { class: "project__links" });
    if (p.links && p.links.live) links.appendChild(el("a", { class: "plink", href: p.links.live, target: "_blank", rel: "noopener", text: "Live ↗" }));
    if (p.links && p.links.repo) links.appendChild(el("a", { class: "plink", href: p.links.repo, target: "_blank", rel: "noopener", text: "Code ↗" }));

    workGrid.appendChild(el("article", {
      class: `project stagger${p.featured ? " is-featured" : ""}`,
      style: `--d:${i * 90}ms`,
      "data-type": p.type || "other",
      "data-title": p.title
    }, [
      el("div", { class: "project__head" }, [
        el("span", { class: "project__glyph", text: p.glyph || "◆" }),
        el("span", { class: "project__year", text: p.year })
      ]),
      el("h3", { class: "project__title", text: p.title }),
      el("p", { class: "project__blurb", text: p.blurb }),
      p.learned ? el("p", { class: "project__learned", html: `<b>What I learned:</b> ${esc(p.learned)}` }) : null,
      el("div", { class: "project__foot" }, [
        el("div", { class: "tags" }, (p.tags || []).map(t => el("span", { class: "tag", text: t }))),
        links
      ])
    ]));
  });

  // Filter chips, built from the distinct project types present.
  const types = ["all", ...new Set(D.work.projects.map(p => p.type || "other"))];
  const filters = $("#workFilters");
  types.forEach((t, i) => {
    filters.appendChild(el("button", {
      class: `filter${i === 0 ? " is-on" : ""}`,
      "data-type": t, text: t,
      onclick(e) {
        $$(".filter").forEach(f => f.classList.remove("is-on"));
        e.currentTarget.classList.add("is-on");
        $$(".project").forEach(card =>
          card.classList.toggle("is-hidden", t !== "all" && card.dataset.type !== t));
      }
    }));
  });

  /* ───────────────────────── RÉSUMÉ ───────────────────────── */
  $(".section--resume .kicker").textContent = D.resume.kicker;
  $(".section--resume .section__title").textContent = D.resume.title;

  const dl = $("#resumeDownload");
  if (D.meta.links.resume) { dl.href = D.meta.links.resume; dl.setAttribute("download", ""); }
  else dl.remove();

  const timeline = $("#timeline");
  timeline.appendChild(el("span", { class: "timeline__progress" }));
  D.resume.timeline.forEach((t, i) => {
    timeline.appendChild(el("li", { class: "tl-item stagger", style: `--d:${i * 80}ms` }, [
      el("div", { class: "tl-item__period" }, [
        el("span", { class: "tl-kind", text: t.kind }),
        el("span", { text: t.period })
      ]),
      el("h3", { class: "tl-item__title", text: t.title }),
      el("p", { class: "tl-item__org", text: t.org }),
      el("p", { class: "tl-item__body", text: t.body }),
      el("div", { class: "tags" }, (t.tags || []).map(x => el("span", { class: "tag", text: x })))
    ]));
  });

  const skills = $("#skills");
  D.resume.skills.forEach(g => {
    const grp = el("div", { class: "skill-group" }, [
      el("h3", { class: "skill-group__name", text: g.group })
    ]);
    g.items.forEach(s => {
      grp.appendChild(el("div", { class: "skill" }, [
        el("div", { class: "skill__row" }, [
          el("span", { text: s.name }),
          el("span", { class: "skill__pct", text: `${s.level}` })
        ]),
        el("div", { class: "bar" }, [el("span", { class: "bar__fill", "data-w": s.level })])
      ]));
    });
    skills.appendChild(grp);
  });

  /* ───────────────────────── INTERESTS ───────────────────────── */
  $(".section--interests .kicker").textContent = D.interests.kicker;
  $(".section--interests .section__title").textContent = D.interests.title;

  const bento = $("#bento");
  D.interests.cards.forEach((c, i) => {
    bento.appendChild(el("article", {
      class: "bento-card stagger", "data-size": c.size || "sm", style: `--d:${i * 70}ms`
    }, [
      el("span", { class: "bento-card__glyph", text: c.glyph || "◆" }),
      el("h3", { class: "bento-card__title", text: c.title }),
      el("p", { class: "bento-card__body", text: c.body })
    ]));
  });

  /* ───────────────────────── CONTACT ───────────────────────── */
  $(".section--contact .kicker").textContent = D.contact.kicker;
  $(".contact__headline").textContent = D.contact.headline;
  $(".contact__body").textContent = D.contact.body;

  const mail = $("#contactMail");
  mail.href = `mailto:${D.meta.email}`;
  $(".contact__mail-text").textContent = D.contact.cta;
  $("#copyMail code").textContent = D.meta.email;

  const socials = $("#socials");
  const LABELS = { github: "GitHub", linkedin: "LinkedIn", x: "X / Twitter", resume: "Résumé" };
  Object.entries(D.meta.links).forEach(([k, v]) => {
    if (!v) return;
    socials.appendChild(el("a", {
      class: "social", href: v,
      target: k === "resume" ? "_self" : "_blank", rel: "noopener",
      text: LABELS[k] || k
    }));
  });

  /* ───────────────────────── SECTION RAIL ───────────────────────── */
  const railList = $(".rail__list");
  $$("main section[id]").forEach(sec => {
    railList.appendChild(el("li", { "data-for": sec.id }, [
      el("span", { class: "rail__label", text: sec.id === "top" ? "Top" : sec.id }),
      el("span", { class: "rail__tick" })
    ]));
  });

  /* Signal that the DOM is ready for the effects layer */
  document.dispatchEvent(new CustomEvent("portfolio:rendered"));
})();
