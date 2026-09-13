# Drivetrain packaging study

Open `../drivetrain-3d.html` in a browser; no network or server is required. Read `../drivetrain-review.md` for the findings, component sources and unverified interfaces, and `../drivetrain-review-response.md` for what changed on 2026-09-13 (rev 2: kingpin 8 in inboard and inclined 12°, front arm legs inboard of the tire sweep, rack at the ball-joint station with forward/outward steering arms, rails at ±12 in, receivers 2½ × 3½ in at 28 in spacing, sled shifted 5 in rearward, grade and acceleration in the torque scenario).

- `geometry.js`: component geometry, candidate dimensions, constant-length tie-rod solver about the inclined kingpin, and limited tire vs rail / sleeve / arm-leg / air-spring sampling.
- `viewer.js`: part selection, orbit, camera presets, kneel, rack and exploded controls.
- `drivetrain.obj` + `drivetrain.mtl`: default assembly export. In Blender choose File → Import → Wavefront (.obj). Coordinates are meters, Y up / +X forward; keep objects separated by name. This is polygonal packaging geometry, not solid manufacturing CAD. No .blend file was generated.
- `drivetrain-overview.png`, `drivetrain-front-corner.png`, `drivetrain-steering-plan.png`: saved annotated diagrams.
- `verify.cjs` / `verification.json`: reproducible checks and results. Run `node model/drivetrain/verify.cjs` from the project root; uses the local bundled Playwright by default, or set `PLAYWRIGHT_MODULE=playwright` (any installed Playwright; then its bundled Chromium is used). Checks: fixed rod lengths at three rack positions, left/right symmetry, toe under 2.5° at 3 in of kneel, no sampled clash at ±2.5 in of rack travel, bag below 2.8 in and a receiver clash at 8 in of kneel, finite named OBJ, no page errors, narrow-screen overflow. It rewrites the exports and screenshots in this folder.
- `three.min.js`: vendored Three.js r128, so the model works offline. MIT license, see `THREE-LICENSE.txt`.

Fabrication colors: teal purchased hardware, ochre weldments/brackets, purple custom precision interfaces; frame, tires, cables, cells and metal fasteners retain descriptive colors. Motor shafts are purchased as part of the motors; their torque clamps and steering carriers are custom.

The control cradle projects beyond the frame. It represents driver controls with their body module omitted and is removable for transport. The 120×54 in dimension is the frame envelope, not the entire assembled control envelope.
