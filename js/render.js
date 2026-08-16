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

  const tint = s => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

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

  /* ─── 1 · HOME ─────────────────────────────────────────────────────── */
  $(".hero__frond--l").innerHTML = B.frond;
  $(".hero__frond--r").innerHTML = B.frond;

  const portrait = $("#portrait");
  if (D.meta.photo) {
    const img = el("img", { src: D.meta.photo, alt: `Portrait of ${D.meta.name}`, loading: "eager" });
    if (D.meta.photoPosition) img.style.objectPosition = D.meta.photoPosition;
    portrait.appendChild(img);
  } else {
    portrait.textContent = D.meta.initials;
  }

  $(".hero__greeting").textContent = D.hero.greeting;
  $(".hero__name").textContent = D.meta.name;
  $(".hero__role").textContent = D.meta.role;
  $(".hero__tagline").innerHTML = tint(D.hero.tagline);
  $(".hero__blurb").textContent = D.hero.blurb;

  document.querySelectorAll(".divider").forEach(d => { d.innerHTML = B.divider; });

  /* ─── 2 · ABOUT ────────────────────────────────────────────────────── */
  head("#about", D.about);

  const prose = $(".about__prose");
  D.about.paragraphs.forEach(p => prose.appendChild(el("p", { text: p })));

  const facts = $(".facts");
  D.about.facts.forEach(f => {
    facts.appendChild(el("li", {}, [
      el("dl", {}, [el("dt", { text: f.label }), el("dd", { text: f.value })])
    ]));
  });

  const VALUE_ICONS = ["sprout", "book", "tree", "seed"];
  const values = $(".values");
  D.about.values.forEach((v, i) => {
    values.appendChild(el("li", { "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("span", { class: "values__icon", html: B.get(VALUE_ICONS[i % VALUE_ICONS.length]) }),
      el("h3", { text: v.title }),
      el("p", { text: v.body })
    ]));
  });

  /* ─── 3 · PROJECTS ─────────────────────────────────────────────────── */
  head("#projects", D.projects);

  const now = $(".now");
  (D.projects.now || []).forEach((it, i) => {
    now.appendChild(el("li", { "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("span", { class: "now__state", text: it.state }),
      el("h3", { text: it.title }),
      el("p", { text: it.body })
    ]));
  });

  const work = $(".work");
  D.projects.items.forEach((p, i) => {
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

  /* ─── 4 · RÉSUMÉ ───────────────────────────────────────────────────── */
  head("#resume", D.resume);

  const dl = $("#resumeDownload");
  if (D.meta.links.resume) dl.href = D.meta.links.resume;
  else dl.remove();

  const E = D.resume.education;
  $(".edu").append(
    el("div", { class: "edu__head" }, [
      el("div", {}, [
        el("h4", { class: "edu__school", text: E.school }),
        el("p", { class: "edu__degree", text: E.degree })
      ]),
      el("div", { class: "edu__meta" }, [
        el("p", { text: E.period }),
        el("p", { text: E.place })
      ])
    ]),
    el("p", { class: "edu__gpa", text: E.gpa }),
    el("ul", { class: "honors" }, (E.honors || []).map(h =>
      el("li", {}, [
        el("span", { class: "honors__icon", html: B.icons.flower }),
        el("span", { text: h })
      ])
    ))
  );

  const kit = $(".kit");
  kit.append(
    el("div", { class: "kit__group" }, [
      el("h4", { text: "Coursework" }),
      el("div", { class: "tags" }, D.resume.coursework.map(c => el("span", { class: "tag", text: c })))
    ]),
    el("div", { class: "kit__group" }, [
      el("h4", { text: "Skills" }),
      el("div", { class: "tags" }, D.resume.skills.map(s => el("span", { class: "tag", text: s })))
    ])
  );

  const path = $(".path");
  D.resume.experience.forEach((x, i) => {
    path.appendChild(el("li", { "data-rise": "", style: `--d:${i * 60}ms` }, [
      el("span", { class: "path__icon", html: B.icons.leaf }),
      el("p", { class: "path__period", text: `${x.period} · ${x.place}` }),
      el("h4", { class: "path__role", text: x.role }),
      el("p", { class: "path__org", text: x.org }),
      el("ul", { class: "path__points" }, (x.points || []).map(pt => el("li", { text: pt })))
    ]));
  });

  /* ─── 5 · BEYOND ───────────────────────────────────────────────────── */
  head("#beyond", D.beyond);

  const acts = $(".acts");
  D.beyond.activities.forEach(a => {
    acts.appendChild(el("li", {}, [
      el("span", { class: "acts__icon", html: B.icons.fern }),
      el("div", {}, [
        el("h4", { text: a.role }),
        el("p", { class: "acts__org", text: a.org })
      ]),
      el("span", { class: "acts__period", text: a.period })
    ]));
  });

  const shelf = $(".shelf");
  D.beyond.reading.forEach((b, i) => {
    shelf.appendChild(el("li", { class: "book", "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("span", { class: "book__spine", "aria-hidden": "true" }),
      el("div", {}, [
        el("span", { class: "book__status", text: b.status }),
        el("h4", { text: b.title }),
        el("p", { class: "book__author", text: b.author }),
        b.take ? el("p", { class: "book__take", text: b.take }) : null
      ])
    ]));
  });

  const interests = $(".interests");
  D.beyond.interests.forEach((it, i) => {
    interests.appendChild(el("li", { "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("span", { class: "interests__icon", html: B.get(it.icon) }),
      el("h4", { text: it.title }),
      el("p", { text: it.body })
    ]));
  });

  /* ─── 6 · CONTACT ──────────────────────────────────────────────────── */
  $("#contact .kicker").textContent = D.contact.kicker;
  $(".contact__headline").textContent = D.contact.headline;
  $(".contact__body").textContent = D.contact.body;
  $(".horizon").innerHTML = B.horizon;

  const mailBtn = $("#mailBtn");
  mailBtn.href = `mailto:${D.meta.email}`;
  mailBtn.textContent = D.contact.cta;

  const phoneBtn = $("#phoneBtn");
  if (D.meta.phone) {
    phoneBtn.href = `tel:${D.meta.phone.replace(/[^\d+]/g, "")}`;
    phoneBtn.textContent = D.meta.phone;
  } else {
    phoneBtn.remove();
  }

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
        download: k === "resume" ? "" : null,
        text: LABELS[k] || k
      })
    ]));
  });

  document.dispatchEvent(new CustomEvent("portfolio:rendered"));
})();
