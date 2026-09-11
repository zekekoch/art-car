#!/usr/bin/env python3
"""
1:12 laser-cut cardboard model of the pod car (design 2).

Everything is derived from the PARAMS block; rerun to regenerate the sheets.
Output: podcar_sheet_N.svg (12 x 20 in, red = cut, blue = score), sized in inches.

Construction:
  - Chassis: deck plate on four rails; wheels on toothpick axles through rail holes.
  - Deck has a 1/2" grid of 1/16" pin holes; pods pin down anywhere with two toothpicks.
  - Pod: floor disc + curved wall strip (tabs into floor) + seat plate (tabs into wall).
  - Seated figures tab into slots on the seat plate.
  - Mast: two cross-lapped strips, deck to roof plate. Four posts.
  - Trailer deck plate with the 57" ramp width scored on it.
"""
import math

# ---------------- PARAMS (real-world inches unless noted) ----------------
SCALE   = 1 / 12          # model in : real in
T       = 1.6 / 25.4      # material thickness, in (1/16" cardboard)
SLOT    = T + 0.005       # slot width
PIN_D   = 0.0675          # toothpick hole
SHEET_W, SHEET_H = 20.0, 12.0
MARGIN, GAP = 0.3, 0.2

REAL = dict(
    deck_L=120, deck_W=54, deck_H=24,          # chassis
    wheel_D=22, wheel_x=0.32,                  # wheel dia, position as fraction of L from center
    pod_r=24, pod_wall_H=26, pod_wall_span=220,# pod radius, wall height, wall arc (deg)
    seat_H=18, seat_depth=18, seat_span=200,   # seat pan height above pod floor, depth, arc
    rider_spacing=20,                          # arc distance between two riders
    roof_z=84, roof_over=28, post_xy=(40, 20), # roof height, overhang past deck, post positions
    pods=[(-64, 0), (-24, -27), (-24, 27), (24, -27), (24, 27), (64, 0, 'out')],  # 'out' = seats face away from the car (driver pod, front = +x)
    trailer=(143, 72, 57),                     # deck L, W, ramp width
    battery=(46, 21, 9),                       # sled L, W, H
)
N_PODS   = len(REAL['pods'])
_pp = REAL['pods']
for i in range(N_PODS):
    for j in range(i + 1, N_PODS):
        d = math.hypot(_pp[i][0] - _pp[j][0], _pp[i][1] - _pp[j][1])
        if d < 2 * REAL['pod_r']:
            raise SystemExit(f"pods {i} and {j} overlap: {d:.1f}\" apart, need {2 * REAL['pod_r']}\"")
N_FIGS   = 2 * N_PODS
# ------------------------------------------------------------------------

def m(v):  # real inches -> model inches
    return v * SCALE

# Glowforge makes one step per colour and lets you order the steps, so inner cuts (holes, slots)
# get their own colour. Order the steps: score (blue) -> inner cut (red) -> outer cut (magenta).
CUT   = 'stroke:#ff0000;stroke-width:0.004;fill:none'   # inner cuts: holes, slots
OUTER = 'stroke:#ff00ff;stroke-width:0.004;fill:none'   # part outlines, cut last
SCORE = 'stroke:#0000ff;stroke-width:0.004;fill:none'

class Part:
    def __init__(self, name, w, h):
        self.name, self.w, self.h, self.items = name, w, h, []
    def path(self, d, style=CUT):
        self.items.append(f'<path d="{d}" style="{style}"/>')
    def poly(self, pts, style=CUT, close=True):
        d = 'M' + ' L'.join(f'{x:.4f},{y:.4f}' for x, y in pts) + (' Z' if close else '')
        self.path(d, style)
    def rect(self, x, y, w, h, style=CUT):
        self.poly([(x, y), (x + w, y), (x + w, y + h), (x, y + h)], style)
    def circle(self, cx, cy, r, style=CUT):
        self.items.append(f'<circle cx="{cx:.4f}" cy="{cy:.4f}" r="{r:.4f}" style="{style}"/>')
    def slot(self, cx, cy, length, angle_deg=0, width=SLOT):
        a = math.radians(angle_deg); c, s = math.cos(a), math.sin(a)
        hw, hl = width / 2, length / 2
        pts = [(-hl, -hw), (hl, -hw), (hl, hw), (-hl, hw)]
        self.poly([(cx + x * c - y * s, cy + x * s + y * c) for x, y in pts])
    def svg(self, ox, oy):
        rot = f' rotate(90) translate(0,{-self.h0:.4f})' if getattr(self, 'rotated', False) else ''
        inner = [i for i in self.items if '#ff00ff' not in i]
        outer = [i for i in self.items if '#ff00ff' in i]
        return f'<g transform="translate({ox:.4f},{oy:.4f}){rot}">' + ''.join(inner + outer) + '</g>'
    def rotate(self):
        self.h0 = self.h; self.w, self.h, self.rotated = self.h, self.w, True

def tabbed_edge(pts, x0, x1, y, tabs, tab_len, tab_h, direction):
    """Append a horizontal edge from x0 to x1 at y with `tabs` tabs sticking out by tab_h (direction +1 down/-1 up)."""
    step = (x1 - x0) / (tabs + 1)
    x = x0
    for i in range(1, tabs + 1):
        tx = x0 + step * i
        pts += [(tx - tab_len / 2, y), (tx - tab_len / 2, y + direction * tab_h),
                (tx + tab_len / 2, y + direction * tab_h), (tx + tab_len / 2, y)]
    pts.append((x1, y))

parts = []

# ---------------- chassis ----------------
L, W, H = m(REAL['deck_L']), m(REAL['deck_W']), m(REAL['deck_H'])
deck = Part('deck', L, W)
deck.rect(0, 0, L, W, OUTER)
# rail slots (rails tab up through the deck)
rail_tabs, tab_len = 3, 0.6
for i in range(1, rail_tabs + 1):
    x = L * i / (rail_tabs + 1)
    deck.slot(x, T / 2 + 0.05, tab_len)
    deck.slot(x, W - T / 2 - 0.05, tab_len)
EW = W - 2 * T - 0.1                     # end-rail body width (sits between the side rails)
for j in (1, 2):
    y = T + 0.05 + EW * j / 3                # exactly where tabbed_edge puts the end-rail tabs
    deck.slot(T / 2 + 0.05, y, tab_len, 90)
    deck.slot(L - T / 2 - 0.05, y, tab_len, 90)
# mast cross-slot and post slots
mast_w = 0.5
deck.slot(L / 2, W / 2, mast_w, 0); deck.slot(L / 2, W / 2, mast_w, 90)
px, py = m(REAL['post_xy'][0]), m(REAL['post_xy'][1])
POST_W, POST_TAB = 0.5, 0.4
for sx in (-1, 1):
    for sy in (-1, 1):
        deck.slot(L / 2 + sx * px, W / 2 + sy * py, POST_TAB, 0)
# pin grid, 1/2" pitch, 1/4" in from every edge
nx, ny = int((L - 0.5) / 0.5) + 1, int((W - 0.5) / 0.5) + 1
gx0, gy0 = (L - (nx - 1) * 0.5) / 2, (W - (ny - 1) * 0.5) / 2
for i in range(nx):
    for j in range(ny):
        deck.circle(gx0 + i * 0.5, gy0 + j * 0.5, PIN_D / 2)
# score pod positions and battery sled outline as a guide
def clipped_circle(part, cx, cy, r, w, h, style, n=120):
    """Score only the portion of a circle that lies inside the part's rectangle (Glowforge ignores clipPath)."""
    pts = [(cx + r * math.cos(2 * math.pi * i / n), cy + r * math.sin(2 * math.pi * i / n)) for i in range(n + 1)]
    inside = lambda q: 0 <= q[0] <= w and 0 <= q[1] <= h
    d, pen = '', False
    for q in pts:
        if inside(q):
            d += ('L' if pen else 'M') + f'{q[0]:.4f},{q[1]:.4f} '; pen = True
        else:
            pen = False
    if d: part.path(d.strip(), style)
for (x, y, *_) in REAL['pods']:
    clipped_circle(deck, L / 2 + m(x), W / 2 + m(y), m(REAL['pod_r']), L, W, SCORE)
bL, bW, bH = (m(v) for v in REAL['battery'])
deck.rect(L / 2 - bL / 2, W / 2 - bW / 2, bL, bW, SCORE)
parts.append(deck)

rail_h = H - T
wheel_r = m(REAL['wheel_D']) / 2
for k in range(2):
    r = Part(f'side_rail_{k}', L, rail_h + T)
    pts = [(0, T)]
    tabbed_edge(pts, 0, L, T, rail_tabs, tab_len, T, -1)   # tabs up (drawn as negative y)
    pts += [(L, T + rail_h), (0, T + rail_h)]
    r.poly(pts, OUTER)
    for sx in (-1, 1):
        r.circle(L / 2 + sx * L * REAL['wheel_x'], T + rail_h - wheel_r, PIN_D / 2)  # axle hole
        r.circle(L / 2 + sx * L * REAL['wheel_x'], T + rail_h - wheel_r, wheel_r, SCORE)
    # vertical slots near the ends for the end-rail side tabs
    r.slot(T / 2 + 0.05, T + rail_h / 2, 0.5, 90); r.slot(L - T / 2 - 0.05, T + rail_h / 2, 0.5, 90)
    parts.append(r)
for k in range(2):
    ew = EW
    r = Part(f'end_rail_{k}', ew + 2 * T, rail_h + T)
    pts = [(T, T)]
    tabbed_edge(pts, T, T + ew, T, 2, tab_len, T, -1)
    # right side tab
    pts += [(T + ew, T + rail_h / 2 - 0.25), (T + ew + T, T + rail_h / 2 - 0.25), (T + ew + T, T + rail_h / 2 + 0.25), (T + ew, T + rail_h / 2 + 0.25)]
    pts += [(T + ew, T + rail_h), (T, T + rail_h)]
    pts += [(T, T + rail_h / 2 + 0.25), (0, T + rail_h / 2 + 0.25), (0, T + rail_h / 2 - 0.25), (T, T + rail_h / 2 - 0.25)]
    r.poly(pts, OUTER)
    parts.append(r)
for k in range(4):
    w = Part(f'wheel_{k}', 2 * wheel_r, 2 * wheel_r)
    w.circle(wheel_r, wheel_r, wheel_r, OUTER); w.circle(wheel_r, wheel_r, PIN_D / 2)
    parts.append(w)

# ---------------- pods ----------------
R = m(REAL['pod_r'])
wall_h = m(REAL['pod_wall_H'])
span = REAL['pod_wall_span']
seat_h = m(REAL['seat_H']); seat_d = m(REAL['seat_depth']); seat_span = REAL['seat_span']
r_wall = R - T / 2 - 0.03                      # wall centreline radius
wall_len = math.radians(span) * r_wall
n_wall_tabs, n_seat_tabs = 4, 3
rider_half_angle = math.degrees(m(REAL['rider_spacing']) / 2 / (R - T - seat_d / 2))

def pod_faces_out(k): return len(REAL['pods'][k]) > 2 and REAL['pods'][k][2] == 'out'
POSTS = [(sx * px, sy * py) for sx in (-1, 1) for sy in (-1, 1)]   # deck-centred model coords
def pod_local(k, dx, dy):
    """deck-centred (dx,dy) -> pod part coords, where +x is the pod's outward direction."""
    cx, cy = m(REAL['pods'][k][0]), m(REAL['pods'][k][1])
    out = math.atan2(cy, cx) if abs(cy) < 1e-9 else (math.pi / 2 if cy > 0 else -math.pi / 2)
    if pod_faces_out(k): out += math.pi          # wall on the car side, opening away from the car
    u, v = dx - cx, dy - cy
    xr = u * math.cos(-out) - v * math.sin(-out)
    yr = u * math.sin(-out) + v * math.cos(-out)
    return R + xr, R + yr, math.degrees(math.atan2(yr, xr)), math.hypot(xr, yr)

for k in range(N_PODS):
    # floor: outward direction is +x in part coords; wall spans angles -span/2..span/2 about +x
    f = Part(f'pod_floor_{k}', 2 * R, 2 * R)
    f.circle(R, R, R, OUTER)
    for (qx, qy) in POSTS:
        lx, ly, ang, rad = pod_local(k, qx, qy)
        if rad < R - 0.3:
            f.slot(lx, ly, POST_TAB + 0.02, 0)
            if abs(ang) <= span / 2 and rad > r_wall - 0.3:
                print(f'warning: post at ({qx:.2f},{qy:.2f}) hits pod {k} wall')
    for i in range(n_wall_tabs):
        a = -span / 2 + span * (i + 0.5) / n_wall_tabs
        f.slot(R + r_wall * math.cos(math.radians(a)), R + r_wall * math.sin(math.radians(a)), tab_len, a + 90)
    for u in (0.75, 1.25):                          # pin holes on the half of the disc that sits over the deck
        for v in (-0.5, 0.5):
            f.circle(R + u if pod_faces_out(k) else R - u, R + v, PIN_D / 2)
    parts.append(f)

    wl = Part(f'pod_wall_{k}', wall_len, wall_h + T)
    pts = [(0, 0), (wall_len, 0), (wall_len, wall_h)]
    # bottom edge with tabs, right to left
    step = wall_len / n_wall_tabs
    for i in range(n_wall_tabs - 1, -1, -1):
        tx = step * (i + 0.5)
        pts += [(tx + tab_len / 2, wall_h), (tx + tab_len / 2, wall_h + T), (tx - tab_len / 2, wall_h + T), (tx - tab_len / 2, wall_h)]
    pts.append((0, wall_h))
    wl.poly(pts, OUTER)
    # seat slots at seat height, spread over the seat span
    for i in range(n_seat_tabs):
        a = -seat_span / 2 + seat_span * (i + 0.5) / n_seat_tabs
        tx = wall_len / 2 + math.radians(a) * r_wall
        wl.slot(tx, wall_h - seat_h, 0.5, 0)
    parts.append(wl)

    s = Part(f'seat_{k}', 2 * R, 2 * R)
    ro, ri = R - T - 0.04, R - T - seat_d
    a0, a1 = -seat_span / 2, seat_span / 2
    pts = []
    N = 40
    # outer arc with radial tabs
    tab_angles = [a0 + seat_span * (i + 0.5) / n_seat_tabs for i in range(n_seat_tabs)]
    tab_half = math.degrees(0.48 / 2 / ro)
    def P(rad, ang): return (R + rad * math.cos(math.radians(ang)), R + rad * math.sin(math.radians(ang)))
    def arc(rad, b0, b1, n=12):
        return [P(rad, b0 + (b1 - b0) * i / n) for i in range(n + 1)]
    cur = a0
    for ta in tab_angles:
        pts += arc(ro, cur, ta - tab_half)
        pts += [P(ro + T + 0.03, ta - tab_half), P(ro + T + 0.03, ta + tab_half)]
        cur = ta + tab_half
    pts += arc(ro, cur, a1)
    for i in range(N + 1):
        ang = a1 - (a1 - a0) * i / N
        pts.append(P(ri, ang))
    s.poly(pts, OUTER)
    for (qx, qy) in POSTS:                           # post pass-through
        lx, ly, ang, rad = pod_local(k, qx, qy)
        if ri + 0.25 < rad < ro - 0.25 and abs(ang) <= seat_span / 2:
            s.slot(lx, ly, POST_TAB + 0.02, 0)
    for sgn in (-1, 1):                              # figure slots, radial
        ang = sgn * rider_half_angle
        rm = R - T - seat_d / 2
        s.slot(R + rm * math.cos(math.radians(ang)), R + rm * math.sin(math.radians(ang)), 0.64, ang)
    parts.append(s)

# ---------------- figures ----------------
FIG = [(-0.30, 0.00), (-0.36, 1.30), (-0.30, 2.00), (-0.16, 2.24), (-0.32, 2.50), (-0.24, 2.84), (0.04, 2.96), (0.32, 2.86),
       (0.42, 2.56), (0.26, 2.26), (0.42, 1.96), (0.46, 1.00), (1.42, 0.46), (1.60, 0.28), (1.60, -0.02), (1.50, -1.36),
       (1.68, -1.50), (1.18, -1.50), (1.22, -0.22), (0.95, -0.05)]
tab_h = T + 0.05
FIG += [(0.70, -0.05), (0.70, -0.05 - tab_h), (0.10, -0.05 - tab_h), (0.10, -0.05), (-0.30, -0.05)]
for k in range(N_FIGS):
    xs = [p[0] for p in FIG]; ys = [-p[1] for p in FIG]
    fw, fh = max(xs) - min(xs), max(ys) - min(ys)
    g = Part(f'figure_{k}', fw, fh)
    g.poly([(x - min(xs), y - min(ys)) for x, y in zip(xs, ys)], OUTER)
    parts.append(g)

# ---------------- mast, posts, roof ----------------
roof_z = m(REAL['roof_z'])
mast_h = roof_z - T
for k in range(2):
    mp = Part(f'mast_{k}', mast_w, mast_h + 2 * T)
    pts = [(0, T), (mast_w / 2 - 0.25, T)]
    pts += [(mast_w / 2 - 0.25, 0), (mast_w / 2 + 0.25, 0), (mast_w / 2 + 0.25, T)]
    pts += [(mast_w, T), (mast_w, T + mast_h), (mast_w / 2 + 0.25, T + mast_h), (mast_w / 2 + 0.25, 2 * T + mast_h),
            (mast_w / 2 - 0.25, 2 * T + mast_h), (mast_w / 2 - 0.25, T + mast_h), (0, T + mast_h)]
    mp.poly(pts, OUTER)
    # cross-lap: slot from top on one, from bottom on the other
    y0 = T if k == 0 else T + mast_h / 2
    mp.rect(mast_w / 2 - SLOT / 2, y0, SLOT, mast_h / 2)
    parts.append(mp)
for k in range(4):
    pw, e = POST_W, (POST_W - POST_TAB) / 2
    p = Part(f'post_{k}', pw, mast_h + 2 * T)
    p.poly([(0, T), (e, T), (e, 0), (pw - e, 0), (pw - e, T), (pw, T), (pw, T + mast_h), (pw - e, T + mast_h),
            (pw - e, 2 * T + mast_h), (e, 2 * T + mast_h), (e, T + mast_h), (0, T + mast_h)], OUTER)
    parts.append(p)
ov = m(REAL['roof_over'])
RL, RW = L + 2 * ov, W + 2 * ov
roof = Part('roof', RL, RW)
rr = RW / 2 * 0.9
roof.path(f'M{rr},0 H{RL - rr} A{rr},{rr} 0 0 1 {RL},{rr} V{RW - rr} A{rr},{rr} 0 0 1 {RL - rr},{RW} H{rr} A{rr},{rr} 0 0 1 0,{RW - rr} V{rr} A{rr},{rr} 0 0 1 {rr},0 Z', OUTER)
roof.slot(RL / 2, RW / 2, mast_w, 0); roof.slot(RL / 2, RW / 2, mast_w, 90)
for sx in (-1, 1):
    for sy in (-1, 1):
        roof.slot(RL / 2 + sx * px, RW / 2 + sy * py, POST_TAB, 0)
parts.append(roof)

# ---------------- trailer deck + battery sled ----------------
tL, tW, tR = (m(v) for v in REAL['trailer'])
tr = Part('trailer', tL, tW)
tr.rect(0, 0, tL, tW, OUTER)
tr.path(f'M0,{tW / 2 - tR / 2} H{tL} M0,{tW / 2 + tR / 2} H{tL}', SCORE)
parts.append(tr)
bat = Part('battery_sled', bL + 2 * bH, bW + 2 * bH)
bat.poly([(bH, 0), (bH + bL, 0), (bH + bL, bH), (bH + bL + bH, bH), (bH + bL + bH, bH + bW), (bH + bL, bH + bW),
          (bH + bL, bH + bW + bH), (bH, bH + bW + bH), (bH, bH + bW), (0, bH + bW), (0, bH), (bH, bH)], OUTER)
bat.path(f'M{bH},{bH} H{bH + bL} V{bH + bW} H{bH} Z', SCORE)
parts.append(bat)

# ---------------- pack onto 12 x 20 sheets (shelf packing) ----------------
for p in parts:
    if p.h > p.w * 1.5 and p.h > 3: p.rotate()   # lay tall strips down
parts.sort(key=lambda p: -(p.w * p.h))

def overlaps(a, b):
    return not (a[0] + a[2] + GAP <= b[0] or b[0] + b[2] + GAP <= a[0] or a[1] + a[3] + GAP <= b[1] or b[1] + b[3] + GAP <= a[1])

def place(placed, w, h):
    """bottom-left placement: try candidate corners, pick lowest y then lowest x."""
    cands = [(MARGIN, MARGIN)] + [(r[0] + r[2] + GAP, r[1]) for r in placed] + [(r[0], r[1] + r[3] + GAP) for r in placed]
    best = None
    for (x, y) in cands:
        if x + w > SHEET_W - MARGIN or y + h > SHEET_H - MARGIN: continue
        rect = (x, y, w, h)
        if any(overlaps(rect, r) for r in placed): continue
        if best is None or (y, x) < (best[1], best[0]): best = rect
    return best

sheets = []   # each: list of (part, rect)
for p in parts:
    for sh in sheets:
        r = place([q[1] for q in sh], p.w, p.h)
        if r: sh.append((p, r)); break
    else:
        sheets.append([(p, (MARGIN, MARGIN, p.w, p.h))])
sheets = [[q[0].svg(q[1][0], q[1][1]) for q in sh] for sh in sheets]

for i, items in enumerate(sheets, 1):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{SHEET_W}in" height="{SHEET_H}in" '
           f'viewBox="0 0 {SHEET_W} {SHEET_H}">' + ''.join(items) + '</svg>')
    open(f'podcar_sheet_{i}.svg', 'w').write(svg)
    print(f'podcar_sheet_{i}.svg  ({len(items)} parts)')
# single combined file: the sheets stacked vertically with a gap, for loading once and positioning in the Glowforge UI
SHEET_GAP = 0.5
total_h = len(sheets) * SHEET_H + (len(sheets) - 1) * SHEET_GAP
groups = ''.join(f'<g transform="translate(0,{i * (SHEET_H + SHEET_GAP):.4f})">' + ''.join(items) + '</g>' for i, items in enumerate(sheets))
open('podcar_all.svg', 'w').write(
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{SHEET_W}in" height="{total_h}in" viewBox="0 0 {SHEET_W} {total_h}">' + groups + '</svg>')
print(f'podcar_all.svg  (all {len(parts)} parts, {SHEET_W} x {total_h:.1f} in)')
print(f'material {T*25.4:.2f} mm, scale 1:{round(1/SCALE)}, {len(parts)} parts on {len(sheets)} sheets')
