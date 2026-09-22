"""
Build the CardWise walkthrough GIFs for the portfolio.

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

Each GIF puts one screen at a time inside a fixed device frame on the app's own
navy, and animates the way the app actually behaves: content pushes in from the
right (a nav push), then scrolls. The floating tab bar is pinned so the phone
reads as a running app in every frame rather than a tall picture being panned.

Holds are static on purpose: Pillow only writes the changed rectangle per frame,
so a still hold costs almost nothing and the file size is paid for by motion.
"""

import os
import sys
from PIL import Image, ImageDraw, ImageFont

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
FPS_MS = 80                      # 12.5 fps

NAVY = (6, 20, 46)               # backdrop — CardWise hero navy, flattened
BEZEL = (9, 15, 26)
EDGE = (38, 54, 80)
CYAN = (66, 204, 255)            # CardWiseInterface.cyan
WHITE = (255, 255, 255)

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


def backdrop(caption):
    """The fixed part of every frame: navy, caption, device shell."""
    img = Image.new("RGB", (W, H), NAVY)
    d = ImageDraw.Draw(img)

    d.rounded_rectangle([56, 38, 62, 74], radius=3, fill=CYAN)
    d.text((76, 40), caption, font=font(25), fill=(233, 240, 255))

    d.rounded_rectangle([DEV_X - 1, DEV_Y - 1, DEV_X + DEV_W + 1, H + 60],
                        radius=54, fill=EDGE)
    d.rounded_rectangle([DEV_X, DEV_Y, DEV_X + DEV_W, H + 60],
                        radius=53, fill=BEZEL)
    return img


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
    """
    frames = []
    prev = None
    for beat in beats:
        fname, scroll_to = beat[0], beat[1]
        st = screen(beat[2]) if len(beat) > 2 else None
        sh = screen(fname)
        span = max(0, sh.height - STATUS_H - TABBAR_H - SCROLL_H)
        target = int(span * scroll_to)

        if prev is None:
            frames += [compose(caption, sh, 0, status=st)] * 12
        else:
            for f in range(6):                        # push in
                frames.append(compose(caption, prev, 0, incoming=sh,
                                      push=ease((f + 1) / 6), status=st))
            frames += [compose(caption, sh, 0, status=st)] * 8

        if target > 0:
            for f in range(9):                        # scroll down
                frames.append(compose(caption, sh,
                                      int(target * ease((f + 1) / 9)), status=st))
            frames += [compose(caption, sh, target, status=st)] * 7
        else:
            frames += [compose(caption, sh, 0, status=st)] * 6
        prev = sh

    frames += [frames[-1]] * 6                        # breathe before the loop

    # One palette for the whole GIF, built from evenly sampled frames.
    sample = frames[:: max(1, len(frames) // 14)]
    mont = Image.new("RGB", (W, H * len(sample)))
    for i, f in enumerate(sample):
        mont.paste(f, (0, H * i))
    pal = mont.quantize(colors=200, method=Image.Quantize.MAXCOVERAGE)

    q = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in frames]
    path = os.path.join(OUT, name)
    q[0].save(path, save_all=True, append_images=q[1:], duration=FPS_MS,
              loop=0, optimize=True, disposal=1)
    kb = os.path.getsize(path) // 1024
    print(f"{name:34s} {W}x{H}  {len(q)} frames  {kb}KB")
    return kb


if __name__ == "__main__":
    # The art slot at the top of the section: the product in one glance.
    build("cardwise-hero.gif", "The right card, before you pay.", [
        ("1-home.png", 0.6),
        ("2-map.png", 0.8),
        ("3-wallet.png", 0.6),
    ])

    build("cardwise-1-wallet.gif", "Pick the exact card. Nothing to type.", [
        ("14-addcard.png", 0.0),
        ("9-cardbenefits.png", 1.0),
        ("10-cardpreview.png", 0.55),
        ("3-wallet.png", 0.75),
    ])

    build("cardwise-2-map.gif", "Which card wins, at every shop near you.", [
        ("2-map.png", 0.85),
        ("18-mapfilters.png", 0.5),
        ("11-placecard.png", 0.0),
        ("12-placedetail.png", 0.7),
    ])

    build("cardwise-3-reminder.gif", "It decides when you are worth interrupting.", [
        ("7-watching.png", 0.6),
        ("15-notifications.png", 0.75),
        ("23-why.png", 0.8),
    ])

    build("cardwise-4-impact.gif", "Then it reports what that actually earned.", [
        ("19-today.png", 0.8, "1-home.png"),   # captured mid-scroll up top
        ("6-impact.png", 0.7),
        ("20-timeline.png", 0.4),
    ])
