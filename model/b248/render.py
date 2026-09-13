"""Depth-buffered, orthographic rendering of the model's actual triangles.

Called by render.cjs. Requires numpy and Pillow. No browser or external renderer.
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

data = json.load(sys.stdin)
scale = 1.5
width, height = 1800, 1260
rgb = np.full((height, width, 3), [244, 243, 237], dtype=np.uint8)
depth = np.full((height, width), -np.inf)
for tri in data['triangles']:
    xy = np.array(tri['xy']) * scale
    z = np.array(tri['z'])
    lo = np.maximum(np.floor(xy.min(axis=0)).astype(int), [0, 0])
    hi = np.minimum(np.ceil(xy.max(axis=0)).astype(int), [width - 1, height - 1])
    if np.any(hi < lo):
        continue
    (x0, y0), (x1, y1), (x2, y2) = xy
    denominator = (y1 - y2) * (x0 - x2) + (x2 - x1) * (y0 - y2)
    if abs(denominator) < 1e-10:
        continue
    xx, yy = np.meshgrid(np.arange(lo[0], hi[0] + 1) + .5,
                         np.arange(lo[1], hi[1] + 1) + .5)
    u = ((y1 - y2) * (xx - x2) + (x2 - x1) * (yy - y2)) / denominator
    v = ((y2 - y0) * (xx - x2) + (x0 - x2) * (yy - y2)) / denominator
    w = 1 - u - v
    zz = u * z[0] + v * z[1] + w * z[2]
    section = np.s_[lo[1]:hi[1]+1, lo[0]:hi[0]+1]
    mask = (u >= -1e-7) & (v >= -1e-7) & (w >= -1e-7) & (zz > depth[section] + 1e-5)
    depth[section][mask] = zz[mask]
    color = tri['color'].lstrip('#')
    rgb[section][mask] = [int(color[i:i+2], 16) for i in (0, 2, 4)]
im = Image.fromarray(rgb)
draw = ImageDraw.Draw(im)
font_dir = Path('/usr/share/fonts/truetype/dejavu')
def font(size, bold=False):
    name = 'DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf'
    try:
        return ImageFont.truetype(str(font_dir / name), round(size*scale))
    except OSError:
        return ImageFont.load_default()
ink = '#263e3b'
draw.text((48*scale, 24*scale), 'ART CAR V2 / DONOR STUDY / 13 SEPTEMBER 2026', font=font(11), fill=ink)
draw.text((48*scale, 51*scale), data['title'], font=font(27, True), fill=ink)
draw.text((48*scale, 782*scale), 'Teal: retained running gear · amber: custom structure', font=font(12), fill=ink)
draw.text((48*scale, 805*scale), 'Catalog envelopes and proposed geometry; not fabrication CAD.', font=font(11), fill=ink)
im.resize((1500, 1050), Image.Resampling.LANCZOS).save(sys.argv[1])
