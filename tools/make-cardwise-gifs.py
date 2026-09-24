"""
Build the CardWise walkthrough animations for the portfolio.

Output is animated WebP, not GIF (the filename is historical). WebP was chosen
on 2026-09-24 because the GIFs were 12.5fps and looked laggy: a GIF is limited
to 256 colours and pays for every frame, while WebP is full colour, supports
a per-frame duration (a two-second hold is one frame, not twenty-five), and
comes out smaller at 30fps than the GIFs were at 12.5. Every current browser
shows animated WebP in a plain <img>.

    python tools/make-cardwise-gifs.py [SCREENSHOT_DIR] [OUTPUT_DIR]

Needs Pillow and nothing else — no ffmpeg, no gifsicle, no Node. That is
deliberate: this laptop is Windows on ARM64, and ffmpeg, gifsicle and Remotion
all ship binaries that do not exist for that architecture.

Source material is the real CI screenshots (1206x2622, iPhone @3x) from the
CardWise `screenshots` job — nothing is mocked up or redrawn. To refresh them
after the app changes, grab the newest run's artifact:

    gh run list --repo ohorak2002/CardWise --workflow ci.yml
    gh run download <run-id> -n CardWise-screenshots -D <some-dir>

then point this script at that directory and re-run it. If a screen is renamed
or added in CI, update the storyboards at the bottom of this file to match.

Each GIF puts one screen at a time inside a fixed device frame on the
portfolio's own soft green (it used to be the app's navy, which fought the
page around it), and animates the way the app actually behaves: content pushes in from the
right (a nav push), then scrolls. The floating tab bar is pinned so the phone
reads as a running app in every frame rather than a tall picture being panned.

Holds are single frames with a long duration, so a still moment costs one
frame and the file size is paid for by motion alone.
"""

import os
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# The CI screenshot artifact these were built from, and where the GIFs land.
# Override either one on the command line.
SRC = r"C:\Users\orenh\OneDrive\Desktop\Claude Code\CardWise\ci-artifacts-35538982055"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "assets")
if len(sys.argv) > 1:
    SRC = sys.argv[1]
if len(sys.argv) > 2:
    OUT = sys.argv[2]

# ── Canvas ────────────────────────────────────────────────────────────────
# The walkthrough shows these at 495px wide in the wide column and 367px in
# the narrow one, so the phone is given most of the canvas — every pixel spent
# on margin is a pixel taken off the app's own text at display size.
W, H = 780, 640
FRAME_MS = 33                    # 30fps for anything that moves
PUSH_MS = 480                    # a nav push, about iOS's own speed
SCROLL_MS = 900                  # an unhurried scroll
WEBP_OPTS = dict(lossless=False, quality=72, method=4)   # 70 and 80 look identical on the text; 72 is ~15% smaller

# The frame around the app takes the portfolio's colours, not the app's: the
# GIFs sit in a green page, and a navy slab in the middle of it read as a hole.
# The app's own screens are untouched — those are its real colours.
BACKDROP = (232, 245, 233)       # --mist  #E8F5E9, the site's soft green fill
CAPTION = (27, 42, 22)           # --ink   #1B2A16, deep forest headings
ACCENT = (110, 154, 97)          # --leaf  #6E9A61, the site's accent bar green
BEZEL = (16, 18, 16)             # a real iPhone is black whatever the page is
EDGE = (92, 99, 90)              # the metal rim, so the phone has an outline
SHADOW = (55, 78, 44)            # the site's --shadow tint, not grey

DEV_W = 520                      # device outer width
INSET = 11                       # bezel thickness
CAP_H = 84                       # caption strip above the device
DEV_X = (W - DEV_W) // 2
DEV_Y = CAP_H

SCREEN_X = DEV_X + INSET
SCREEN_Y = DEV_Y + INSET
SCREEN_W = DEV_W - 2 * INSET     # 436
SCALE = SCREEN_W / 1206.0
TABBAR_SRC = 250                 # px of source screenshot that is floating tab bar
STATUS_SRC = 178                 # iOS status bar / Dynamic Island area, 59pt @3x
TABBAR_H = int(TABBAR_SRC * SCALE)
STATUS_H = int(STATUS_SRC * SCALE)
VIEW_BOTTOM = H                  # device runs off the bottom edge
# Only the region between the status bar and the tab bar moves — those two are
# fixed chrome on a real phone, and animating them gives you two Dynamic
# Islands and two tab bars mid-transition.
SCROLL_H = VIEW_BOTTOM - SCREEN_Y - STATUS_H - TABBAR_H


def font(size, bold=True):
    for name in (("seguisb.ttf", "segoeuib.ttf") if bold else ("segoeui.ttf",)):
        p = os.path.join(r"C:\Windows\Fonts", name)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


_cache = {}


def screen(name):
    """Load a screenshot scaled to the device screen width."""
    if name not in _cache:
        im = Image.open(os.path.join(SRC, name)).convert("RGB")
        h = int(im.height * SCALE)
        _cache[name] = im.resize((SCREEN_W, h), Image.LANCZOS)
    return _cache[name]


def _shadow():
    """A soft green-tinted shadow under the phone, drawn once.

    The GIF versions could not have one: a blurred fade needs dozens of
    near-identical greens, the 256-colour palette could not spare them, and it
    came out as a hard-edged teal slab. WebP has no palette, so it is back."""
    alpha = Image.new("L", (W, H), 0)
    ImageDraw.Draw(alpha).rounded_rectangle(
        [DEV_X + 10, DEV_Y + 22, DEV_X + DEV_W - 10, H + 80], radius=56, fill=60)
    alpha = alpha.filter(ImageFilter.GaussianBlur(20))
    base = Image.new("RGB", (W, H), BACKDROP)
    return Image.composite(Image.new("RGB", (W, H), SHADOW), base, alpha)


_backdrops = {}


def backdrop(caption):
    """The fixed part of every frame: soft green, caption, device shell."""
    if caption in _backdrops:
        return _backdrops[caption].copy()
    img = _shadow()
    d = ImageDraw.Draw(img)

    d.rounded_rectangle([56, 38, 62, 74], radius=3, fill=ACCENT)
    d.text((76, 40), caption, font=font(25), fill=CAPTION)

    d.rounded_rectangle([DEV_X - 1, DEV_Y - 1, DEV_X + DEV_W + 1, H + 60],
                        radius=54, fill=EDGE)
    d.rounded_rectangle([DEV_X, DEV_Y, DEV_X + DEV_W, H + 60],
                        radius=53, fill=BEZEL)
    _backdrops[caption] = img
    return img.copy()


def screen_mask():
    """Rounded-corner mask for the screen area, so corners stay device-like."""
    m = Image.new("L", (SCREEN_W, H - SCREEN_Y), 0)
    ImageDraw.Draw(m).rounded_rectangle(
        [0, 0, SCREEN_W - 1, (H - SCREEN_Y) + 60], radius=44, fill=255)
    return m


MASK = screen_mask()


def compose(caption, shot, scroll, incoming=None, push=0.0, status=None):
    """
    One frame. `scroll` is the y offset into the scrollable area.
    `incoming`/`push` (0..1) slide a new screen in from the right.
    `status` overrides where the pinned status bar is taken from, for
    screenshots that were captured mid-scroll and have content up there.
    """
    img = backdrop(caption)
    plate = Image.new("RGB", (SCREEN_W, H - SCREEN_Y), (247, 250, 255))
    front = incoming if incoming is not None else shot
    status = status if status is not None else front

    def draw_body(im, dx, y_off):
        top = STATUS_H + y_off
        body = im.crop((0, top, SCREEN_W, min(top + SCROLL_H, im.height)))
        plate.paste(body, (dx, STATUS_H))

    if incoming is None:
        draw_body(shot, 0, scroll)
    else:
        off = int(push * SCREEN_W)
        draw_body(shot, -off // 3, scroll)            # outgoing parallax
        draw_body(incoming, SCREEN_W - off, 0)

    # Fixed chrome, drawn once and last so nothing slides over it.
    plate.paste(status.crop((0, 0, SCREEN_W, STATUS_H)), (0, 0))
    plate.paste(front.crop((0, front.height - TABBAR_H, SCREEN_W, front.height)),
                (0, STATUS_H + SCROLL_H))

    img.paste(plate, (SCREEN_X, SCREEN_Y), MASK)
    return img


def ease(t):
    return 4 * t * t * t if t < 0.5 else 1 - pow(-2 * t + 2, 3) / 2


def build(name, caption, beats):
    """
    beats: list of (screenshot, scroll_to[, status_from]) — scroll_to is a
    fraction of the available scroll range, 0 = top.

    Frames are (image, milliseconds). Motion is drawn at 30fps; a hold is one
    frame with a long duration.
    """
    frames = []

    def hold(img, ms):
        frames.append((img, ms))

    def motion(total_ms, draw):
        n = max(2, round(total_ms / FRAME_MS))
        for f in range(n):
            frames.append((draw(ease((f + 1) / n)), FRAME_MS))

    prev = None
    for beat in beats:
        fname, scroll_to = beat[0], beat[1]
        st = screen(beat[2]) if len(beat) > 2 else None
        sh = screen(fname)
        span = max(0, sh.height - STATUS_H - TABBAR_H - SCROLL_H)
        target = int(span * scroll_to)

        if prev is None:
            hold(compose(caption, sh, 0, status=st), 960)
        else:
            motion(PUSH_MS, lambda t, p=prev, s_=sh, st_=st:
                   compose(caption, p, 0, incoming=s_, push=t, status=st_))
            hold(compose(caption, sh, 0, status=st), 640)

        if target > 0:
            motion(SCROLL_MS, lambda t, s_=sh, st_=st, tg=target:
                   compose(caption, s_, int(tg * t), status=st_))
            hold(compose(caption, sh, target, status=st), 700)
        else:
            hold(compose(caption, sh, 0, status=st), 480)
        prev = sh

    img, ms = frames[-1]
    frames[-1] = (img, ms + 480)                      # breathe before the loop

    path = os.path.join(OUT, name)
    frames[0][0].save(
        path, save_all=True, append_images=[f for f, _ in frames[1:]],
        duration=[ms for _, ms in frames], loop=0,
        **WEBP_OPTS)
    kb = os.path.getsize(path) // 1024
    secs = sum(ms for _, ms in frames) / 1000
    print(f"{name:34s} {W}x{H}  {len(frames)} frames  {secs:.1f}s  {kb}KB")
    return kb


if __name__ == "__main__":
    # The art slot at the top of the section: the product in one glance.
    build("cardwise-hero.webp", "The right card, before you pay.", [
        ("1-home.png", 0.6),
        ("2-map.png", 0.8),
        ("3-wallet.png", 0.6),
    ])

    build("cardwise-1-wallet.webp", "Pick the exact card. Nothing to type.", [
        ("14-addcard.png", 0.0),
        ("9-cardbenefits.png", 1.0),
        ("10-cardpreview.png", 0.55),
        ("3-wallet.png", 0.75),
    ])

    build("cardwise-2-map.webp", "Which card wins, at every shop near you.", [
        ("2-map.png", 0.85),
        ("18-mapfilters.png", 0.5),
        ("11-placecard.png", 0.0),
        ("12-placedetail.png", 0.7),
    ])

    build("cardwise-3-reminder.webp", "It decides when you are worth interrupting.", [
        ("7-watching.png", 0.6),
        ("15-notifications.png", 0.75),
        ("23-why.png", 0.8),
    ])

    build("cardwise-4-impact.webp", "Then it reports what that actually earned.", [
        ("19-today.png", 0.8, "1-home.png"),   # captured mid-scroll up top
        ("6-impact.png", 0.7),
        ("20-timeline.png", 0.4),
    ])
