# Art car v2

Custom electric chassis (max 54" x 120") with a demountable body. Working notes, the volumetric study of Selina's concepts, and a parametric 1:12 laser-cut model of design 2 (cantilevered pods).

- `notebook/art-car-design-notebook.html` — constraints, chassis and corner-module concept, battery decision, core shapes, volumetric study, transport plan. Self-contained; open in a browser. Sketch dimensions are editable in the `DESIGNS` array.
- `model/podcar_model.py` — generates the laser sheets from the `REAL` dict (real-world inches). `python3 podcar_model.py` writes `podcar_sheet_N.svg` (12 x 20 in) and `podcar_all.svg` (everything, stacked). No dependencies.
  - blue = score, red = inner cuts (holes/slots), magenta = part outlines; order the Glowforge steps score -> red -> magenta.
  - Material: 1/16" cardboard. Toothpicks for wheel axles and pod pins.
- `sketches/` — Selina's renderings and layout sketches, plus photos of the current car.

## Key numbers
- Trailer: U-Haul 6x12 ramp, 143" x 72" deck, 57" ramp, 3,710 lb load / 1,810 lb ramp.
- Chassis: <= 54" x 120", four 12" hub-motor corners on air springs, 48 V, 30 kWh LFP sled that rolls under and bolts up.
- Design 2 pods: r = 24", six pods at (+-64, 0) and (+-24, +-27); front pod faces forward (driver).
