/* ============================================================================
   nestedTour.js — a small, self-contained demo of Nested that plays inside
   the portfolio page.

   This is the same storyboard as the Remotion film in ../nested-video, but
   built as DOM + JS so it works on the live site: ~9KB instead of a multi-
   megabyte GIF, sharp at any size, and it follows the page's own colours.

   Every number, item name, store and price below was read out of the running
   app — nothing is invented.
   ========================================================================= */

(function () {
  "use strict";

  const D = window.PORTFOLIO && window.PORTFOLIO.nested;
  if (!D || !D.tour) return;

  const mount = document.querySelector("#nestedTour");
  if (!mount) return;

  const T = D.tour;
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  /* ── chrome ─────────────────────────────────────────────────────────── */

  const win = el("div", "tour");
  const bar = el("div", "tour__bar");
  const dots = el("div", "tour__dots");
  ["#FF5F57", "#FEBC2E", "#28C840"].forEach(c => {
    const d = el("span", "tour__dot");
    d.style.background = c;
    dots.appendChild(d);
  });
  bar.append(dots, el("span", "tour__brand", "Nested"));
  win.appendChild(bar);

  const tabs = el("div", "tour__tabs");
  const TABS = ["Design", "Shop", "Save"];
  const tabEls = TABS.map(name => {
    const t = el("button", "tour__tab", name);
    t.type = "button";
    tabs.appendChild(t);
    return t;
  });
  win.appendChild(tabs);

  const stage = el("div", "tour__stage");
  win.appendChild(stage);
  mount.appendChild(win);

  /* ── act 1 · design ─────────────────────────────────────────────────── */

  function actDesign() {
    const wrap = el("div", "tour__act tour__act--design");
    const list = el("div", "tour__palettes");

    T.palettes.forEach((p, i) => {
      const row = el("div", "tour__pal");
      row.style.setProperty("--d", `${i * 90}ms`);
      const sw = el("span", "tour__sw");
      p.swatch.forEach(c => {
        const s = el("span");
        s.style.background = c;
        sw.appendChild(s);
      });
      row.append(sw, el("span", "tour__pal-name", p.name));
      list.appendChild(row);
    });

    const view = el("div", "tour__view");
    T.shots.forEach((s, i) => {
      const img = document.createElement("img");
      img.src = s.src;
      img.alt = `Nested — the ${s.label} palette`;
      img.loading = i === 0 ? "eager" : "lazy";
      img.className = "tour__shot" + (i === 0 ? " is-on" : "");
      view.appendChild(img);
    });
    const label = el("span", "tour__label", T.shots[0].label);
    view.appendChild(label);

    wrap.append(list, view);

    // Walk the selection down the palette list, swapping the render to match.
    let i = 0;
    const rows = [...list.querySelectorAll(".tour__pal")];
    const imgs = [...view.querySelectorAll(".tour__shot")];
    const tick = () => {
      rows.forEach((r, n) => r.classList.toggle("is-on", n === i));
      imgs.forEach((m, n) => m.classList.toggle("is-on", n === i % imgs.length));
      label.textContent = T.shots[i % imgs.length].label;
      i = (i + 1) % Math.min(rows.length, 4);
    };
    tick();
    return { node: wrap, tick, every: 1300 };
  }

  /* ── act 2 · shop ───────────────────────────────────────────────────── */

  function actShop() {
    const wrap = el("div", "tour__act tour__act--shop");

    const left = el("div", "tour__list");
    T.items.forEach((it, i) => {
      const row = el("div", "tour__item");
      row.style.setProperty("--d", `${i * 110}ms`);

      const main = el("div", "tour__item-main");
      main.append(
        el("span", "tour__item-name", it.name),
        el("span", "tour__item-meta", `$${it.price} · ${it.store}`)
      );
      if (it.save) {
        main.appendChild(
          el("span", "tour__item-save",
            `Save $${it.save.amount} — ${it.save.store} has a similar one for $${it.save.price}`)
        );
      }
      const btn = el("span", "tour__add", "Add");
      row.append(main, btn);
      left.appendChild(row);
    });

    const right = el("div", "tour__cart");
    right.appendChild(el("span", "tour__cart-head", "In your room"));
    T.cart.forEach(c => {
      const line = el("div", "tour__cart-line");
      line.append(el("span", null, c.name), el("b", null, `$${c.price}`));
      right.appendChild(line);
    });
    const totalLabel = el("span", "tour__total-label", "Estimated total");
    const total = el("span", "tour__total", "$0");
    const note = el("span", "tour__note", T.savingsNote);
    right.append(totalLabel, total, note);

    wrap.append(left, right);

    // Count the total up to the figure the app actually shows.
    let raf = null;
    const run = () => {
      const start = performance.now();
      const dur = 1400;
      const step = now => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        total.textContent = "$" + Math.round(T.cartTotal * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      // The last row lights up as though it had just been added.
      const rows = [...left.querySelectorAll(".tour__item")];
      rows.forEach(r => r.classList.remove("is-added"));
      setTimeout(() => {
        const r = rows[rows.length - 1];
        if (r) {
          r.classList.add("is-added");
          const b = r.querySelector(".tour__add");
          if (b) b.textContent = "Added";
        }
      }, 900);
    };

    return {
      node: wrap,
      enter: run,
      leave: () => {
        cancelAnimationFrame(raf);
        total.textContent = "$0";
        left.querySelectorAll(".tour__add").forEach(b => (b.textContent = "Add"));
      },
    };
  }

  /* ── act 3 · save ───────────────────────────────────────────────────── */

  function actSave() {
    const wrap = el("div", "tour__act tour__act--save");
    const c = T.compare;

    const a = el("div", "tour__card");
    a.append(
      el("span", "tour__store", c.from.store),
      el("span", "tour__thing", c.from.name),
      (() => {
        const p = el("span", "tour__price tour__price--old", `$${c.from.price}`);
        p.appendChild(el("span", "tour__strike"));
        return p;
      })()
    );

    const arrow = el("span", "tour__arrow", "→");

    const b = el("div", "tour__card tour__card--win");
    b.append(
      el("span", "tour__store", c.to.store),
      el("span", "tour__thing", c.to.name),
      el("span", "tour__price tour__price--new", `$${c.to.price}`)
    );

    const badge = el("span", "tour__badge", `Save $${c.from.price - c.to.price} on one piece`);
    const stores = el("div", "tour__stores");
    T.stores.forEach(s => stores.appendChild(el("span", null, s)));

    wrap.append(stores, el("div", "tour__compare", null));
    wrap.querySelector(".tour__compare").append(a, arrow, b);
    wrap.appendChild(badge);
    return { node: wrap };
  }

  /* ── sequencing ─────────────────────────────────────────────────────── */

  const acts = [actDesign(), actShop(), actSave()];
  acts.forEach(a => stage.appendChild(a.node));

  let cur = -1;
  let actTimer = null;
  let innerTimer = null;

  function show(n) {
    if (n === cur) return;
    const prev = acts[cur];
    if (prev && prev.leave) prev.leave();
    clearInterval(innerTimer);

    cur = n;
    acts.forEach((a, i) => a.node.classList.toggle("is-on", i === n));
    tabEls.forEach((t, i) => t.classList.toggle("is-on", i === n));

    const a = acts[n];
    if (a.enter) a.enter();
    if (a.tick && a.every) innerTimer = setInterval(a.tick, a.every);
  }

  function play() {
    stop();
    actTimer = setInterval(() => show((cur + 1) % acts.length), T.actMs || 6000);
  }
  function stop() {
    clearInterval(actTimer);
    actTimer = null;
  }

  // Tapping a tab jumps to that act and pauses the auto-advance briefly.
  tabEls.forEach((t, i) =>
    t.addEventListener("click", () => {
      show(i);
      if (!REDUCED) play();
    })
  );

  show(0);

  if (REDUCED) return;                 // static first act, no cycling

  // Only run while the section is actually on screen.
  new IntersectionObserver(
    ([e]) => (e.isIntersecting ? play() : stop()),
    { threshold: 0.2 }
  ).observe(mount);
})();
