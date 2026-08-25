/* ============================================================================
   render.js — turns window.PORTFOLIO into the page.
   You shouldn't need to edit this. Edit js/data.js instead.
   ========================================================================= */

(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const B = window.BOTANICAL;
  const $ = (s, r = document) => r.querySelector(s);

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

  /* The universal pause glyph — two bars. Used in the hiatus chip and badge
     so the "on pause" meaning reads instantly, before anyone reads a word. */
  const PAUSE_SVG =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<rect x="7" y="5.5" width="3.6" height="13" rx="1.3"/>' +
    '<rect x="13.4" y="5.5" width="3.6" height="13" rx="1.3"/></svg>';

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

  // A "Read more" disclosure. Returns null when there is nothing extra to
  // say, so entries without detail simply don't grow a button.
  function readMore(text) {
    if (!text) return null;
    return el("details", { class: "more" }, [
      el("summary", { class: "more__btn" }, el("span", { class: "more__label", text: "Read more" })),
      el("p", { class: "more__body", text })
    ]);
  }

  /* A walkthrough step's picture. A silent looping video where one exists —
     the same clip at 30fps instead of the GIF's 10, and a third of the
     weight — and the GIF as the fallback when it doesn't. Playback is left
     to scroll.js, which only runs the clips that are actually on screen. */
  function walkMedia(st) {
    if (!st.video) return el("img", { src: st.gif, alt: st.alt, loading: "lazy", decoding: "async" });
    const v = el("video", {
      class: "walk__video", src: st.video, poster: st.poster || null,
      preload: "metadata", "aria-label": st.alt
    });
    v.loop = true;
    v.muted = true;          // boolean properties, not attributes — el() skips ""
    v.playsInline = true;
    v.controls = false;
    return v;
  }

  /* "Take a look inside" — a disclosure holding a short write-up of a book,
     the seven-level ladder, the takeaways, and where to read or buy it.
     Built on <details>, so it still opens with JavaScript switched off. */
  function bookLook(k) {
    const body = [];

    if (k.blurb) body.push(el("p", { class: "look__blurb", text: k.blurb }));

    if (k.ladder && (k.ladder.items || []).length) {
      const L = k.ladder;
      body.push(el("div", { class: "look__block" }, [
        L.title ? el("h5", { class: "look__h", text: L.title }) : null,
        el("ol", { class: "ladder" }, L.items.map(x => el("li", { class: `ladder__rung ladder__rung--${x.zone}` }, [
          el("span", { class: "ladder__n", text: String(x.n) }),
          el("div", {}, [
            el("span", { class: "ladder__name", text: x.name }),
            el("span", { class: "ladder__body", text: x.body })
          ])
        ]))),
        L.note ? el("p", { class: "look__note", text: L.note }) : null
      ]));
    }

    if ((k.points || []).length) {
      body.push(el("div", { class: "look__block" }, [
        el("h5", { class: "look__h", text: "What I'm taking from it" }),
        el("ul", { class: "look__points" }, k.points.map(p => el("li", {}, [
          el("strong", { text: p.title }),
          el("span", { text: p.body })
        ])))
      ]));
    }

    if ((k.links || []).length) {
      body.push(el("div", { class: "look__block" }, [
        el("h5", { class: "look__h", text: "Start reading" }),
        el("div", { class: "look__links" }, k.links.map((l, i) => el("a", {
          class: `btn btn--sm ${i === 0 ? "btn--solid" : "btn--quiet"}`,
          href: l.href, target: "_blank", rel: "noopener",
          title: l.note || null, text: l.label
        }))),
        el("p", { class: "look__note", text: k.links.map(l => l.note).filter(Boolean).join(" · ") })
      ]));
    }

    return el("details", { class: "look" }, [
      el("summary", { class: "look__btn" }, [
        el("span", { class: "look__btnLabel", text: k.cta || "Take a look inside" })
      ]),
      el("div", { class: "look__body" }, body)
    ]);
  }

  /* A crossfading photo gallery with dots and arrows.
     The compact variant sits inside a card: the dots move on top of the
     photo and the caption line is dropped, so it stays small. The captions
     still ride along as alt text for anyone using a screen reader. */
  function gallery(g, variant) {
    const photos = g.photos || [];
    const compact = variant === "gallery--compact";
    const many = photos.length > 1;

    const stage = el("div", { class: "gallery__stage" },
      photos.map((p, i) => el("img", {
        class: `gallery__img${i === 0 ? " is-on" : ""}`,
        src: p.src, alt: p.caption || g.title,
        loading: i === 0 ? "eager" : "lazy", decoding: "async"
      })));

    if (many) {
      stage.appendChild(el("button", { class: "gallery__arrow gallery__arrow--prev", type: "button", "aria-label": "Previous photo", html: "&#8249;" }));
      stage.appendChild(el("button", { class: "gallery__arrow gallery__arrow--next", type: "button", "aria-label": "Next photo", html: "&#8250;" }));
    }

    const dots = many
      ? el("div", { class: "gallery__dots", role: "tablist", "aria-label": `${g.title || "Photo"} gallery` },
          photos.map((p, i) => el("button", {
            class: `gallery__dot${i === 0 ? " is-on" : ""}`, type: "button", role: "tab",
            "aria-selected": i === 0 ? "true" : "false",
            "aria-label": p.caption || `Photo ${i + 1}`
          })))
      : null;

    const kids = [stage];
    if (compact) {
      if (dots) stage.appendChild(dots);
    } else {
      kids.push(el("figcaption", { class: "gallery__caption", text: (photos[0] && photos[0].caption) || "" }));
      if (dots) kids.push(dots);
    }

    const attrs = { class: `gallery${variant ? " " + variant : ""}`, tabindex: "0" };
    if (!compact) attrs["data-rise"] = "";   // the card it sits in already rises
    return el("figure", attrs, kids);
  }

  // Build the Live / Code button pair used by Nested and the smaller projects.
  function linkButtons(links, cls) {
    const box = el("div", { class: cls });
    if (links && links.live) box.appendChild(el("a", { class: "btn btn--solid", href: links.live, target: "_blank", rel: "noopener", text: "Try it live" }));
    if (links && links.repo) box.appendChild(el("a", { class: "btn btn--quiet", href: links.repo, target: "_blank", rel: "noopener", text: "View the code" }));
    return box;
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
    portrait.classList.add("is-initials");
    portrait.textContent = D.meta.initials;
  }

  $(".hero__greeting").textContent = D.hero.greeting;
  $(".hero__name").textContent = D.meta.name;
  $(".hero__role").textContent = D.meta.role;
  $(".hero__statement").innerHTML = tint(D.hero.statement);

  document.querySelectorAll(".divider").forEach(d => { d.innerHTML = B.divider; });

  /* ─── 2 · NESTED ───────────────────────────────────────────────────── */
  const N = D.nested;

  $("#nested .kicker").textContent = N.kicker;
  $(".feature__name").textContent = N.name;
  $(".feature__tagline").textContent = N.tagline;
  $(".feature__blurb").textContent = N.blurb;

  const ftags = $(".feature__tags");
  (N.tags || []).forEach(t => ftags.appendChild(el("span", { class: "tag", text: t })));
  if (N.hiatus && N.hiatus.chip) {
    ftags.prepend(el("span", { class: "tag tag--paused" }, [
      el("span", { class: "tag__pause", html: PAUSE_SVG, "aria-hidden": "true" }),
      el("span", { text: N.hiatus.chip })
    ]));
  } else if (N.status) {
    ftags.prepend(el("span", { class: "tag tag--live", text: N.status }));
  }

  const factions = $(".feature__actions");
  const fbtns = linkButtons(N.links, "feature__btns");
  if (fbtns.children.length) factions.appendChild(fbtns);
  else factions.appendChild(el("p", { class: "feature__soon", text: "Links coming once it's deployed." }));

  /* What fills the art slot, in order of preference:
     a rendered video, a gif, the live tour, still screenshots, the drawing. */
  const art = $(".feature__art");
  const shots = N.shots || [];
  const tourMount = $("#nestedTour");

  if (N.video || N.gif) {
    if (tourMount) tourMount.remove();
    art.classList.add("feature__art--media");
    if (N.video) {
      const v = el("video", {
        class: "feature__media",
        src: N.video,
        poster: N.gif || (shots[0] && shots[0].src) || null,
        "aria-label": `A short demo of ${N.name}`
      });
      // These must be set as properties, not passed to el() — it skips
      // empty-string values, which is exactly what a boolean attribute is.
      v.autoplay = true;
      v.loop = true;
      v.muted = true;               // required for autoplay to be allowed
      v.playsInline = true;
      v.controls = false;
      art.appendChild(v);
    } else {
      art.appendChild(el("img", {
        class: "feature__media",
        src: N.gif,
        alt: `A short demo of ${N.name}`,
        loading: "lazy"
      }));
    }
  } else if (N.tour) {
    art.classList.add("feature__art--tour");
  } else if (shots.length) {
    if (tourMount) tourMount.remove();
    art.classList.add("feature__art--shots");
    const frame = el("div", { class: "shots" });
    shots.forEach((sh, i) => {
      frame.appendChild(el("img", {
        class: `shots__img${i === 0 ? " is-on" : ""}`,
        src: sh.src,
        alt: `${N.name} — the ${sh.label} palette`,
        loading: i === 0 ? "eager" : "lazy"
      }));
    });
    art.appendChild(frame);
    if (shots.length > 1) art.appendChild(el("p", { class: "shots__label", text: shots[0].label }));
  } else {
    if (tourMount) tourMount.remove();
    art.classList.add("feature__art--drawn");
    art.innerHTML = B.room;
  }

  /* Both of these drop out entirely when their data is empty, so the
     section runs straight from the buttons into the walkthrough. */
  const ffeat = $(".feature__features");
  if (!(N.features || []).length) ffeat.remove();
  else N.features.forEach((f, i) => {
    ffeat.appendChild(el("li", { "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("span", { class: "feature__icon", html: B.get(f.icon) }),
      el("h3", { text: f.title }),
      el("p", { text: f.body })
    ]));
  });

  const flearned = $(".feature__learned");
  if (!N.learned) flearned.remove();
  else {
    $(".feature__learned-icon").innerHTML = B.icons.seed;
    $(".feature__learned p").innerHTML = `<b>What I learned:</b> ${esc(N.learned)}`;
  }

  /* The walkthrough. Each step is a rendered GIF with its own
     category and topic. Loading is lazy — they are heavy compared to the
     rest of the page and all sit below the fold. */
  const W = N.walkthrough;
  const walk = $(".walk");
  if (W && walk) {
    $(".walk .kicker").textContent = W.kicker;
    $(".walk__title").textContent = W.title;
    $(".walk__intro").textContent = W.intro;

    const steps = $(".walk__steps");
    W.steps.forEach((st, i) => {
      steps.appendChild(el("li", { class: "walk__step", "data-rise": "", style: `--d:${i * 80}ms` }, [
        el("figure", { class: "walk__media" }, [ walkMedia(st) ]),
        el("div", { class: "walk__body" }, [
          el("span", { class: "walk__n", text: st.n }),
          el("span", { class: "walk__cat", text: st.category }),
          el("h4", { class: "walk__step-title", text: st.title }),
          el("p", { text: st.body })
        ])
      ]));
    });

    /* The hiatus note lives here now, right under the last clip — the project
       reads as active all the way through the walkthrough, then closes with
       an honest "and here's why it's paused". Body + optional resume line. */
    if (N.hiatus) {
      const para = [N.hiatus.body];
      if (N.hiatus.resume) para.push(N.hiatus.resume);
      steps.after(el("div", { class: "feature__hiatus", role: "note" }, [
        el("span", { class: "feature__hiatus-mark", html: PAUSE_SVG, "aria-hidden": "true" }),
        el("div", {}, [
          N.hiatus.title ? el("strong", { class: "feature__hiatus-title", text: N.hiatus.title }) : null,
          ...para.map(t => el("p", { text: t }))
        ])
      ]));
    }
  } else if (walk) {
    walk.remove();
  }

  const work = $(".work");
  (D.otherProjects || []).forEach((p, i) => {
    const links = el("div", { class: "work__links" });
    if (p.links && p.links.live) links.appendChild(el("a", { href: p.links.live, target: "_blank", rel: "noopener", text: "Visit site →" }));
    if (p.links && p.links.repo) links.appendChild(el("a", { href: p.links.repo, target: "_blank", rel: "noopener", text: "View code →" }));

    work.appendChild(el("li", { class: "work__item", "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("span", { class: "work__num", text: String(i + 1).padStart(2, "0") }),
      el("div", {}, [
        el("p", { class: "work__year", text: p.year }),
        el("h4", { class: "work__title", text: p.title }),
        el("p", { class: "work__blurb", text: p.blurb }),
        el("div", { class: "work__foot" }, [
          el("div", { class: "tags" }, (p.tags || []).map(t => el("span", { class: "tag", text: t }))),
          links.children.length ? links : null
        ])
      ])
    ]));
  });

  /* ─── 3 · ABOUT ME ─────────────────────────────────────────────────── */
  head("#about", D.about);

  const prose = $(".about__prose");
  D.about.paragraphs.forEach(p => prose.appendChild(el("p", { text: p })));

  const facts = $(".facts");
  D.about.facts.forEach(f => {
    facts.appendChild(el("li", {}, [
      el("dl", {}, [el("dt", { text: f.label }), el("dd", { text: f.value })])
    ]));
  });

  /* The four value cards used to sit here. The block is gone from the page;
     the writing is still in data.js under about.values if it ever comes back. */

  /* ─── 4 · WORK EXPERIENCE ──────────────────────────────────────────── */
  head("#experience", D.experience);

  const dl = $("#resumeDownload");
  if (D.meta.links.resume) dl.href = D.meta.links.resume;
  else dl.remove();

  /* One card per school, each carrying only its own GPA and honors. Older
     data used a single education object; both shapes still work. */
  const schools = Array.isArray(D.experience.education)
    ? D.experience.education
    : [D.experience.education];

  const eduWrap = $(".edu");
  schools.forEach(E => {
    eduWrap.appendChild(el("div", { class: `edu__item${E.current ? " edu__item--now" : ""}` }, [
      el("div", { class: "edu__head" }, [
        el("div", {}, [
          el("h4", { class: "edu__school" }, [
            el("span", { text: E.school }),
            E.current ? el("span", { class: "edu__now", text: "Current" }) : null
          ]),
          E.degree ? el("p", { class: "edu__degree", text: E.degree }) : null
        ]),
        el("div", { class: "edu__meta" }, [
          el("p", { text: E.period }),
          el("p", { text: E.place })
        ])
      ]),
      E.gpa ? el("p", { class: "edu__gpa", text: E.gpa }) : null,
      (E.honors || []).length
        ? el("ul", { class: "honors" }, E.honors.map(h => el("li", {}, [
            el("span", { class: "honors__icon", html: B.icons.flower }),
            el("span", { text: h })
          ])))
        : null
    ]));
  });

  /* Certificates earned outside a degree. Each card leads with a picture of
     the certificate itself, because that is the thing a visitor recognizes
     before they've read a word — clicking it opens the readable version. The
     credential ID sits next to a verify link so the claim can be checked
     without leaving the page for long. */
  const CERT = D.experience.certifications;
  const certs = $(".certs");
  if (certs) {
    if (!CERT || !(CERT.items || []).length) {
      certs.remove();
      const ch = $(".certs__head");
      if (ch) ch.remove();
    } else {
      const ch = $(".certs__head");
      if (ch && CERT.title) ch.firstChild.textContent = CERT.title;

      CERT.items.forEach((c, i) => {
        const issuer = [c.issuer, c.co].filter(Boolean).join(" · ");
        const shot = c.thumb || c.full;

        // Meta rows — only the ones that have something to say.
        const meta = [];
        if (c.issued) meta.push(["Issued", c.issued]);
        if (c.expires) meta.push(["Expires", c.expires]);
        else if (c.issued) meta.push(["Expires", "No expiry"]);
        if (c.credentialId) meta.push(["Credential ID", c.credentialId]);

        certs.appendChild(el("li", { class: "cert", "data-rise": "", style: `--d:${i * 70}ms` }, [
          shot
            ? el("a", {
                class: "cert__shot", href: c.full || shot,
                target: "_blank", rel: "noopener",
                "aria-label": `${c.name} — open the full certificate`
              }, [
                el("img", {
                  class: "cert__img", src: shot, alt: `${c.name} certificate from ${c.issuer}`,
                  loading: "lazy", decoding: "async"
                }),
                el("span", { class: "cert__zoom", "aria-hidden": "true", html: B.icons.leaf })
              ])
            : null,

          el("div", { class: "cert__body" }, [
            el("h4", { class: "cert__name", text: c.name }),
            issuer ? el("p", { class: "cert__issuer", text: issuer }) : null,
            c.blurb ? el("p", { class: "cert__blurb", text: c.blurb }) : null,

            (c.tags || []).length
              ? el("div", { class: "tags cert__tags" }, c.tags.map(t => el("span", { class: "tag", text: t })))
              : null,

            meta.length
              ? el("dl", { class: "cert__meta" }, meta.map(([k, v]) => el("div", {}, [
                  el("dt", { text: k }),
                  el("dd", { class: k === "Credential ID" ? "cert__id" : null, text: v })
                ])))
              : null,

            c.verify
              ? el("div", { class: "cert__actions" }, [
                  el("a", {
                    class: "btn btn--quiet btn--sm", href: c.verify,
                    target: "_blank", rel: "noopener", text: "Verify credential"
                  })
                ])
              : null
          ])
        ]));
      });
    }
  }

  /* Awards that belong to neither university — high school and elsewhere. */
  const A = D.experience.awards;
  const awardsWrap = $(".awards");
  if (awardsWrap) {
    if (!A || !(A.groups || []).length) {
      awardsWrap.remove();
      const ah = $(".awards__head");
      if (ah) ah.remove();
    } else {
      const ah = $(".awards__head");
      if (ah && A.title) ah.firstChild.textContent = A.title;

      A.groups.forEach(g => {
        awardsWrap.appendChild(el("div", { class: "awards__group", "data-rise": "" }, [
          el("h4", { class: "awards__source", text: g.source }),
          el("ul", { class: "honors" }, g.items.map(item => el("li", {}, [
            el("span", { class: "honors__icon", html: B.icons.flower }),
            el("span", { text: item })
          ])))
        ]));
      });
    }
  }

  /* What I'm enrolled in this term. Each one leads with its own mark, and
     the detail hides behind a Read more so the list stays skimmable. */
  const classes = $(".classes");
  const C = D.experience.courses;
  if (classes) {
    if (!C || !(C.items || []).length) {
      classes.remove();
      const h = $(".classes__head");
      if (h) h.remove();
    } else {
      const h = $(".classes__head");
      if (h && C.term) h.append(el("span", { class: "classes__term", text: C.term }));

      C.items.forEach((c, i) => {
        classes.appendChild(el("li", { class: "class", "data-rise": "", style: `--d:${i * 60}ms` }, [
          el("span", { class: "class__icon", html: B.get(c.icon) }),
          el("div", { class: "class__body" }, [
            el("span", { class: "class__code", text: c.code }),
            el("h4", { class: "class__title", text: c.title }),
            c.hours ? el("span", { class: "class__hours", text: c.hours }) : null,
            c.short ? el("p", { class: "class__short", text: c.short }) : null,
            readMore(c.more)
          ])
        ]));
      });
    }
  }

  $(".kit").append(
    el("div", { class: "kit__group" }, [
      el("h4", { text: "Coursework" }),
      el("div", { class: "tags" }, D.experience.coursework.map(c => el("span", { class: "tag", text: c })))
    ]),
    el("div", { class: "kit__group" }, [
      el("h4", { text: "Skills" }),
      el("div", { class: "tags" }, D.experience.skills.map(s => el("span", { class: "tag", text: s })))
    ])
  );

  const path = $(".path");
  D.experience.jobs.forEach((x, i) => {
    path.appendChild(el("li", { "data-rise": "", style: `--d:${i * 60}ms` }, [
      el("span", { class: "path__icon", html: B.icons.leaf }),
      x.photo ? el("img", { class: "path__photo", src: x.photo, alt: `${x.role} at ${x.org}`, loading: "lazy" }) : null,
      el("p", { class: "path__period", text: `${x.period} · ${x.place}` }),
      el("h4", { class: "path__role", text: x.role }),
      el("p", { class: "path__org", text: x.org }),
      el("ul", { class: "path__points" }, (x.points || []).map(pt => el("li", { text: pt })))
    ]));
  });

  /* ─── 5 · MY GOALS ─────────────────────────────────────────────────── */
  head("#goals", D.goals);

  /* A checklist, not a list — a visitor can check these off as they read, and
     the checkmarks are remembered on their own machine. The key is the title,
     so reordering the goals doesn't shuffle anyone's boxes. */
  const goals = $(".goals");
  D.goals.items.forEach((g, i) => {
    const id = `goal-${i}`;
    goals.appendChild(el("li", { class: "goal", "data-rise": "", style: `--d:${i * 70}ms` }, [
      el("input", {
        class: "goal__input", type: "checkbox", id,
        "data-goal": g.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      }),
      el("div", { class: "goal__text" }, [
        el("span", { class: "goals__horizon", text: g.horizon }),
        el("h3", {}, el("label", { class: "goal__label", for: id, text: g.title })),
        el("p", { text: g.body })
      ])
    ]));
  });

  /* ─── 6 · BEYOND ───────────────────────────────────────────────────── */
  head("#beyond", D.beyond);

  const acts = $(".acts");
  D.beyond.activities.forEach(a => {
    acts.appendChild(el("li", {}, [
      el("div", { class: "acts__row" }, [
        a.photo
          ? el("img", { class: "acts__photo", src: a.photo, alt: `${a.role} — ${a.org}`, loading: "lazy" })
          : el("span", { class: "acts__icon", html: B.icons.fern }),
        el("div", {}, [
          el("h4", { text: a.role }),
          el("p", { class: "acts__org", text: a.org })
        ]),
        el("span", { class: "acts__period", text: a.period })
      ]),
      readMore(a.more)
    ]));
  });

  const shelf = $(".shelf");
  D.beyond.reading.forEach((b, i) => {
    const look = b.look;
    shelf.appendChild(el("li", {
      class: `book${look ? " book--featured" : ""}`, "data-rise": "", style: `--d:${i * 70}ms`
    }, [
      b.cover
        ? el("img", { class: "book__cover", src: b.cover, alt: `${b.title} — cover`, loading: "lazy" })
        : el("span", { class: "book__spine", "aria-hidden": "true" }),
      el("div", { class: "book__body" }, [
        el("span", { class: "book__status", text: b.status }),
        el("h4", { text: b.title }),
        el("p", { class: "book__author", text: b.author }),
        look && look.facts ? el("p", { class: "book__facts", text: look.facts }) : null,
        b.take ? el("p", { class: "book__take", text: b.take }) : null,
        look ? bookLook(look) : (b.buy ? el("div", { class: "book__buy" }, [
          el("span", { class: "book__buyLabel", text: "Where to buy" }),
          el("a", { class: "btn btn--quiet btn--sm", href: b.buy, target: "_blank", rel: "noopener", text: "Amazon" })
        ]) : null)
      ])
    ]));
  });

  /* Each card leads with whichever it has: a slideshow, a single photo, or
     the drawn icon. The photos sit above the heading so every card in the
     row still starts with its title at the same height. */
  const interests = $(".interests");
  D.beyond.interests.forEach((it, i) => {
    let lead;
    if (it.photos && it.photos.length) lead = gallery(it, "gallery--compact");
    else if (it.photo) lead = el("img", { class: "interests__photo", src: it.photo, alt: it.title, loading: "lazy" });
    else lead = el("span", { class: "interests__icon", html: B.get(it.icon) });

    interests.appendChild(el("li", { "data-rise": "", style: `--d:${i * 70}ms` }, [
      lead,
      el("h4", { text: it.title }),
      el("p", { text: it.body }),
      readMore(it.more)
    ]));
  });

  /* ─── 7 · CONTACT ──────────────────────────────────────────────────── */
  $("#contact .kicker").textContent = D.contact.kicker;
  $(".contact__headline").textContent = D.contact.headline;
  $(".contact__body").textContent = D.contact.body;
  $(".horizon").innerHTML = B.horizon;

  const mailBtn = $("#mailBtn");
  mailBtn.href = `mailto:${D.meta.email}`;
  mailBtn.textContent = D.contact.cta;

  const inBtn = $("#linkedinBtn");
  if (D.meta.links.linkedin) {
    inBtn.href = D.meta.links.linkedin;
    inBtn.textContent = D.contact.linkedinCta || "Connect on LinkedIn";
  } else {
    inBtn.remove();
  }

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
