/* ============================================================================
   render.js — turns window.PORTFOLIO into the page.
   You shouldn't need to edit this. Edit js/data.js instead.
   ========================================================================= */

(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const B = window.BOTANICAL;
  const $  = (s, r = document) => r.querySelector(s);

  function el(tag, props = {}, kids = []) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v === null || v === undefined || v === "") continue;
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k === "text") n.textContent = v;
      else n.setAttribute(k, v);
    }
    (Array.isArray(kids) ? kids : [kids]).forEach(c => c && n.appendChild(c));
    return n;
  }

  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // *word* → tinted span
  const tint = s => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

  // Fill a section's <header>: kicker, title, optional note
  function head(sel, { kicker, title, note }) {
    const h = $(`${sel} .head`);
    $(".kicker", h).textContent = kicker;
    $(".head__title", h).textContent = title;
    const n = $(".head__note", h);
    if (n) { if (note) n.textContent = note; else n.remove(); }
  }

  /* ─── META ─────────────────────────────────────────────────────────── */
  document.title = `${D.meta.name} — Portfolio`;
  $("#year").textContent = new Date().getFullYear();
  $("#footerName").textContent = D.meta.name;
  $(".nav__name").textContent = D.meta.name;
  $("#navLeaf").innerHTML = B.icons.sprout;

  /* ─── HERO ─────────────────────────────────────────────────────────── */
  $(".hero__frond--l").innerHTML = B.frond;
  $(".hero__frond--r").innerHTML = B.frond;

  const portrait = $("#portrait");
  if (D.meta.photo) {
    portrait.appendChild(el("img", { src: D.meta.photo, alt: `Portrait of ${D.meta.name}` }));
  } else {
    portrait.textContent = D.meta.initials;   // graceful placeholder until a photo exists
  }

  $(".hero__greeting").textContent = D.hero.greeting;
  $(".hero__name").textContent = D.meta.name;
  $(".hero__role").textContent = D.meta.role;
  $(".hero__tagline").innerHTML = tint(D.hero.tagline);
  $(".hero__blurb").textContent = D.hero.blurb;

  /* ─── DIVIDERS ─────────────────────────────────────────────────────── */
  document.querySelectorAll(".divider").forEach(d => { d.innerHTML = B.divider; });

  /* ─── ABOUT ────────────────────────────────────────────────────────── */
  head("#about", D.about);
  const prose = $(".about__prose");
  D.about.paragraphs.forEach(p => prose.appendChild(el("p", { text: p })));

  const facts = $(".facts");
  D.about.facts.forEach(f => {
    facts.appendChild(el("li", {}, [
      el("dl", {}, [
        el("dt", { text: f.label }),
        el("dd", { text: f.value })
      ])
    ]));
  });

  /* ─── MISSION ──────────────────────────────────────────────────────── */
  head("#mission", D.mission);
  $(".statement").textContent = D.mission.statement;

  const VALUE_ICONS = ["sprout", "leaf", "fern", "tree"];
  const values = $(".values");
  D.mission.values.forEach((v, i) => {
    values.appendChild(el("li", { "data-rise": "", style: `--d:${i * 80}ms` }, [
      el("span", { class: "values__icon", html: B.get(VALUE_ICONS[i % VALUE_ICONS.length]) }),
      el("h3", { text: v.title }),
      el("p", { text: v.body })
    ]));
  });

  /* ─── NOW ──────────────────────────────────────────────────────────── */
  head("#now", { ...D.now, note: `Last updated ${D.now.updated}` });

  const now = $(".now");
  D.now.items.forEach((it, i) => {
    now.appendChild(el("li", { "data-rise": "", style: `--d:${i * 80}ms` }, [
      el("div", { class: "now__top" }, [
        el("span", { class: "now__icon", html: B.icons.sprout }),
        el("h3", { text: it.title })
      ]),
      el("span", { class: "now__state", text: it.state }),
      el("p", { text: it.body })
    ]));
  });

  /* ─── WORK ─────────────────────────────────────────────────────────── */
  head("#work", D.work);

  const work = $(".work");
  D.work.projects.forEach((p, i) => {
    const links = el("div", { class: "work__links" });
    if (p.links && p.links.live) links.appendChild(el("a", { href: p.links.live, target: "_blank", rel: "noopener", text: "Visit site →" }));
    if (p.links && p.links.repo) links.appendChild(el("a", { href: p.links.repo, target: "_blank", rel: "noopener", text: "View code →" }));

    work.appendChild(el("li", { class: "work__item", "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("span", { class: "work__num", text: String(i + 1).padStart(2, "0") }),
      el("div", {}, [
        el("p", { class: "work__year", text: p.year }),
        el("h3", { class: "work__title", text: p.title }),
        el("p", { class: "work__blurb", text: p.blurb }),
        p.learned ? el("div", { class: "work__learned" }, [
          el("span", { class: "work__learned-icon", html: B.icons.seed }),
          el("p", { html: `<b>What I learned:</b> ${esc(p.learned)}` })
        ]) : null,
        el("div", { class: "work__foot" }, [
          el("div", { class: "tags" }, (p.tags || []).map(t => el("span", { class: "tag", text: t }))),
          links.children.length ? links : null
        ])
      ])
    ]));
  });

  /* ─── JOURNEY ──────────────────────────────────────────────────────── */
  head("#journey", D.journey);

  const KIND_ICON = { school: "book", work: "tree", award: "flower" };
  const path = $(".path");
  D.journey.timeline.forEach((t, i) => {
    path.appendChild(el("li", { "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("span", { class: "path__icon", html: B.get(KIND_ICON[t.kind] || "leaf") }),
      el("p", { class: "path__period", text: t.period }),
      el("h3", { text: t.title }),
      el("p", { class: "path__org", text: t.org }),
      el("p", { text: t.body })
    ]));
  });

  const skills = $(".skills");
  D.journey.skills.forEach((g, i) => {
    skills.appendChild(el("div", { "data-rise": "", style: `--d:${i * 80}ms` }, [
      el("h3", { text: g.group }),
      el("div", { class: "tags" }, g.items.map(s => el("span", { class: "tag", text: s })))
    ]));
  });

  /* ─── EXTRACURRICULARS ─────────────────────────────────────────────── */
  head("#extras", D.extracurriculars);

  const EXTRA_ICONS = ["fern", "flower", "tree", "leaf", "seed", "sprout"];
  const extras = $(".extras");
  D.extracurriculars.items.forEach((x, i) => {
    extras.appendChild(el("li", { "data-rise": "", style: `--d:${i * 80}ms` }, [
      el("span", { class: "extras__icon", html: B.get(EXTRA_ICONS[i % EXTRA_ICONS.length]) }),
      el("h3", { text: x.role }),
      el("p", { class: "extras__org", text: x.org }),
      el("p", { class: "extras__period", text: x.period }),
      el("p", { text: x.body })
    ]));
  });

  /* ─── READING ──────────────────────────────────────────────────────── */
  head("#reading", { ...D.reading, note: D.reading.note });

  const shelf = $(".shelf");
  D.reading.books.forEach((b, i) => {
    shelf.appendChild(el("li", { class: "book", "data-rise": "", style: `--d:${i * 80}ms` }, [
      el("span", { class: "book__spine", "aria-hidden": "true" }),
      el("div", {}, [
        el("span", { class: "book__status", text: b.status }),
        el("h3", { text: b.title }),
        el("p", { class: "book__author", text: b.author }),
        b.take ? el("p", { class: "book__take", text: b.take }) : null
      ])
    ]));
  });

  /* ─── INTERESTS ────────────────────────────────────────────────────── */
  head("#interests", D.interests);

  const interests = $(".interests");
  D.interests.items.forEach((it, i) => {
    interests.appendChild(el("li", { "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("span", { class: "interests__icon", html: B.get(it.icon) }),
      el("h3", { text: it.title }),
      el("p", { text: it.body })
    ]));
  });

  /* ─── CONTACT ──────────────────────────────────────────────────────── */
  $("#contact .kicker").textContent = D.contact.kicker;
  $(".contact__headline").textContent = D.contact.headline;
  $(".contact__body").textContent = D.contact.body;
  $(".horizon").innerHTML = B.horizon;

  const mailBtn = $("#mailBtn");
  mailBtn.href = `mailto:${D.meta.email}`;
  mailBtn.textContent = D.contact.cta;
  $("#copyMail code").textContent = D.meta.email;

  const LABELS = { github: "GitHub", linkedin: "LinkedIn", resume: "Download résumé" };
  const clinks = $(".contact__links");
  Object.entries(D.meta.links).forEach(([k, v]) => {
    if (!v) return;
    clinks.appendChild(el("li", {}, [
      el("a", {
        href: v,
        target: k === "resume" ? "_self" : "_blank",
        rel: "noopener",
        text: LABELS[k] || k
      })
    ]));
  });

  document.dispatchEvent(new CustomEvent("portfolio:rendered"));
})();
