/* ============================================================================
   botanical.js — hand-drawn plant illustrations as inline SVG.
   No image files, no external requests. Every shape uses currentColor so it
   picks up whatever green the surrounding element is set to.
   ========================================================================= */

window.BOTANICAL = (function () {
  "use strict";

  /* Small icons — 24×24, drawn on a consistent 1.5 stroke like a line-icon set */
  const icons = {

    leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 20c0-8 5-14 16-15 1 11-5 16-12 16H4z"/>
      <path d="M4 20C8 15 12 12 18 9.5"/>
    </svg>`,

    fern: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 21V4"/>
      <path d="M12 8c-2.4 0-4-1.4-4-3.4 2.4 0 4 1.3 4 3.4z"/>
      <path d="M12 8c2.4 0 4-1.4 4-3.4-2.4 0-4 1.3-4 3.4z"/>
      <path d="M12 13c-2.6 0-4.4-1.5-4.4-3.7 2.6 0 4.4 1.5 4.4 3.7z"/>
      <path d="M12 13c2.6 0 4.4-1.5 4.4-3.7-2.6 0-4.4 1.5-4.4 3.7z"/>
      <path d="M12 18c-2.8 0-4.7-1.6-4.7-4 2.8 0 4.7 1.6 4.7 4z"/>
      <path d="M12 18c2.8 0 4.7-1.6 4.7-4-2.8 0-4.7 1.6-4.7 4z"/>
    </svg>`,

    tree: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 22v-6"/>
      <path d="M12 16l-4-3M12 13l4-3"/>
      <path d="M12 2.5 6 10h3l-4 5h14l-4-5h3z"/>
    </svg>`,

    flower: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="2.1"/>
      <path d="M12 6.9c0-2 .9-3.4 2.4-3.4S16.5 5 15 6.4"/>
      <path d="M12 6.9c0-2-.9-3.4-2.4-3.4S7.5 5 9 6.4"/>
      <path d="M14.1 9c2 0 3.4.9 3.4 2.4S15.4 13.5 14 12"/>
      <path d="M9.9 9c-2 0-3.4.9-3.4 2.4S8.6 13.5 10 12"/>
      <path d="M12 11.1V22"/>
      <path d="M12 17c-2 0-3.2-1.2-3.2-3 2 0 3.2 1.2 3.2 3z"/>
    </svg>`,

    book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z"/>
      <path d="M4 19.5A1.5 1.5 0 0 1 5.5 21H19"/>
      <path d="M9 7.5h6M9 11h4"/>
    </svg>`,

    seed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 21v-7"/>
      <path d="M12 14c0-3 2-5 5-5 0 3-2 5-5 5z"/>
      <path d="M12 16c0-2.4-1.6-4-4-4 0 2.4 1.6 4 4 4z"/>
      <path d="M8.5 21h7"/>
    </svg>`,

    sprout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 21v-9"/>
      <path d="M12 12c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6z"/>
      <path d="M12 15C12 12.8 10.2 11 8 11c0 2.2 1.8 4 4 4z"/>
    </svg>`,

    /* Course marks. Same 24x24 frame, same 1.5 stroke, so they sit beside
       the botanical set without looking borrowed from somewhere else. */

    sheet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <path d="M3 9h18M9 9v11"/>
      <path d="M12 16.5v-2M15 16.5v-4M18 16.5v-6"/>
    </svg>`,

    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>`,

    curve: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 3v17h17"/>
      <path d="M4 17c4 0 5-11 9-11 3 0 4 5 8 5"/>
    </svg>`,

    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18"/>
      <path d="M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/>
    </svg>`,

    wheat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 21V9"/>
      <path d="M12 9c0-2.2 1.3-4 3-4 0 2.2-1.3 4-3 4z"/>
      <path d="M12 9c0-2.2-1.3-4-3-4 0 2.2 1.3 4 3 4z"/>
      <path d="M12 14c0-2.2 1.3-4 3-4 0 2.2-1.3 4-3 4z"/>
      <path d="M12 14c0-2.2-1.3-4-3-4 0 2.2 1.3 4 3 4z"/>
    </svg>`
  };

  /* ── Section divider: a sprig of leaves on a thin rule ──────────────── */
  const divider = `<svg class="divider__art" viewBox="0 0 240 40" fill="none"
      stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
      stroke-linejoin="round" aria-hidden="true">
    <path d="M0 20h84" opacity=".45"/>
    <path d="M156 20h84" opacity=".45"/>
    <path d="M120 32V10"/>
    <path d="M120 16c-3.2 0-5.4-2-5.4-4.8 3.2 0 5.4 1.9 5.4 4.8z"/>
    <path d="M120 16c3.2 0 5.4-2 5.4-4.8-3.2 0-5.4 1.9-5.4 4.8z"/>
    <path d="M120 24c-3.6 0-6-2.2-6-5.3 3.6 0 6 2.1 6 5.3z"/>
    <path d="M120 24c3.6 0 6-2.2 6-5.3-3.6 0-6 2.1-6 5.3z"/>
    <circle cx="120" cy="8" r="1.8" fill="currentColor" stroke="none"/>
    <path d="M100 20c-2.4 0-4-1.4-4-3.5 2.4 0 4 1.4 4 3.5z" opacity=".6"/>
    <path d="M140 20c2.4 0 4-1.4 4-3.5-2.4 0-4 1.4-4 3.5z" opacity=".6"/>
  </svg>`;

  /* ── Large decorative fronds used as soft corner ornaments ──────────── */
  const frond = `<svg viewBox="0 0 200 320" fill="none" stroke="currentColor"
      stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M100 320C100 200 92 96 60 8"/>
    <path d="M92 250c-22 6-40-4-46-24 22-6 40 4 46 24z"/>
    <path d="M94 258c20-10 38-4 46 14-20 10-38 4-46-14z"/>
    <path d="M84 196c-21 4-37-6-42-25 21-4 37 6 42 25z"/>
    <path d="M86 204c19-11 36-6 44 12-19 11-36 6-44-12z"/>
    <path d="M76 144c-19 2-33-8-37-25 19-2 33 8 37 25z"/>
    <path d="M78 152c17-11 33-7 40 10-17 11-33 7-40-10z"/>
    <path d="M68 94c-16 0-28-9-31-24 16 0 28 9 31 24z"/>
    <path d="M70 102c15-10 29-7 35 8-15 10-29 7-35-8z"/>
    <path d="M60 48c-13-1-23-9-25-22 13 1 23 9 25 22z"/>
    <path d="M62 56c12-9 24-6 29 6-12 9-24 6-29-6z"/>
  </svg>`;

  /* ── Rolling hills + trees, used once at the very bottom ────────────── */
  const horizon = `<svg viewBox="0 0 1200 150" fill="none" preserveAspectRatio="none"
      aria-hidden="true" class="horizon__art">
    <path d="M0 150V96c120-26 210 14 330 6s180-42 300-40 190 40 300 34 150-26 270-32v86z"
          fill="currentColor" opacity=".16"/>
    <path d="M0 150v-28c140-18 230 16 360 12s210-30 340-26 210 30 330 26 130-16 170-18v34z"
          fill="currentColor" opacity=".3"/>
  </svg>`;

  /* ── Isometric room, used as the Nested artwork until a real screenshot
        replaces it. Line art so it inherits the page's green.             ── */
  const room = `<svg viewBox="0 0 400 300" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <!-- walls -->
    <path d="M50 180V95L200 20v85z" opacity=".75"/>
    <path d="M350 180V95L200 20v85z" opacity=".55"/>
    <!-- floor -->
    <path d="M50 180l150-75 150 75-150 75z"/>
    <!-- floor grid -->
    <g opacity=".35">
      <path d="M87.5 161.25l150 75M125 142.5l150 75M162.5 123.75l150 75"/>
      <path d="M87.5 198.75l150-75M125 217.5l150-75M162.5 236.25l150-75"/>
    </g>
    <!-- a couch -->
    <g>
      <path d="M120 196l40-20 40 20-40 20z"/>
      <path d="M120 196v22l40 20v-22M200 196v22l-40 20"/>
      <path d="M120 196l-14-7v22l14 7" opacity=".8"/>
    </g>
    <!-- a table -->
    <g>
      <path d="M245 156l30-15 30 15-30 15z"/>
      <path d="M248 160v16M302 160v16M275 173v16"/>
    </g>
    <!-- a potted plant, because of course -->
    <g>
      <path d="M300 205l16-8 16 8-4 20h-24z"/>
      <path d="M316 197v-24"/>
      <path d="M316 181c0-9 7-16 16-16 0 9-7 16-16 16z"/>
      <path d="M316 189c0-7-6-12-13-12 0 7 6 12 13 12z"/>
    </g>
  </svg>`;

  return { icons, divider, frond, horizon, room, get(name) { return icons[name] || icons.leaf; } };
})();
