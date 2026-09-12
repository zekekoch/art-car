# Art car v2

Custom electric chassis (max 54" x 120") with a demountable body. Working notes, the volumetric study of Selina's concepts, and a parametric 1:12 laser-cut model of design 2 (cantilevered pods).

- [`notebook/art-car-design-notebook.html`](notebook/art-car-design-notebook.html) — constraints, chassis and corner-module concept, battery decision, core shapes, volumetric study, transport plan. Self-contained; open in a browser. Sketch dimensions are editable in the `DESIGNS` array.
- [`model/podcar_model.py`](model/podcar_model.py) — generates the laser sheets from the `REAL` dict (real-world inches). `python3 podcar_model.py` writes `podcar_sheet_N.svg` (12 x 20 in) and `podcar_all.svg` (everything, stacked). No dependencies.
  - blue = score, red = inner cuts (holes/slots), magenta = part outlines; order the Glowforge steps score -> red -> magenta.
  - Material: 1/16" cardboard. Toothpicks for wheel axles and pod pins.
- [`model/loveseat-3d.html`](model/loveseat-3d.html) — interactive 3D model of one pod on its receivers with two seated riders; sliders for seat, rim, foam, pod radius. Open in a browser; "Copy OBJ" exports the mesh (inches, Y up) for Blender/Fusion.
- [`model/loveseat-build.html`](model/loveseat-build.html) — build model of one pod: every tube member and panel (1" square steel frame on the receiver arms, ply shell, lit diffuser wall with a fabric band, LED rows, mirror skirt, optional boarding step). Faceted or smooth wall; sliders for tube size, facets, band height, ply; readout of weight, cost, ply/diffuser sheets, LED count and receiver-arm stress. "Cut list" prints tube lengths, post coordinates and panel sizes; "Copy OBJ" as above.
- [`model/frame-3d.html`](model/frame-3d.html) — interactive 3D model of the whole car: ladder frame with receiver sleeves, single-shaft hub-motor corners on wide-pivot trailing arms (kingpin fronts, rack + tie rods, column to the driver pod with a disconnect at the pod joint), the six pods with riders, battery sled, and the roof on four posts and a mast with four panels. Sliders for the frame, wheels, arms, steering, roof and corner loads; the readout flags clashes, steering lock and turning radius, pivot bearing loads, and tube weight. Open in a browser.
- [`loveseat.md`](loveseat.md) — pod mounting (hitch receivers), load case, seat ergonomics and fit notes.
- [`sketches/`](sketches/) — Selina's renderings and layout sketches, plus photos of the current car.

## Key numbers
- Trailer: U-Haul 6x12 ramp, 143" x 72" deck, 57" ramp, 3,710 lb load / 1,810 lb ramp.
- Chassis: <= 54" x 120", four 12" hub-motor corners on air springs, 48 V, 30 kWh LFP sled that rolls under and bolts up.
- Design 2 pods: r = 24", six pods at (+-64, 0) and (+-24, +-27); front pod faces forward (driver).
