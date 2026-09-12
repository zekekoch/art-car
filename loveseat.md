# Loveseat (pod) design notes

Working notes for the 48" two-seat pod (design 2). Six pods per car, each a bolt-on module; see README for the layout.

## Mounting: hitch receivers (decided 2026-09-11)

Each pod rides on two 2" square steel arms, ~14" apart (one under each rider), that slide into 2-1/2" receiver tubes
welded through the chassis side rail into a cross member behind it. Retained with hitch pins; anti-rattle wedge
clamps take up the slop. End pods use the same receivers running longitudinally through the end rail.

Why receivers and not a bolted flange (the original sketch, `sketches/pod-mount-sketch.heic`):
- The cantilever moment is carried by bearing over the receiver's length, not by bolt tension, so nothing
  fatigues loose on washboard playa. A bolted butt flange needs a 3/8" plate or gussets and still loosens.
- The moment goes into the cross member as bending instead of twisting the side rail.
- Playa assembly is slide in, drop two pins. No torque wrench, no bolt count.
- Class III/IV receivers are rated for 500-1,000 lb tongue weight at ~12", which is this load class.
- Spare receivers on the rail are free attachment points for anything else (steps, bike rack, bar).

### Load case per pod
- Two riders at 200 lb with their centre of mass ~14" outboard of the rail, plus ~120 lb of pod: ~7,000 in-lb static.
- Design for ~20,000 in-lb: 2-3x for ruts, plus one person standing on the outboard rim (200 lb at 24").
- Two 2x3x0.120" rectangular tube arms (3" vertical) run ~17 ksi at that moment, against ~46 ksi yield.
  Tip deflection well under 1/4".
- If a bolted flange is ever used instead: 6" bolt spacing puts ~1,650 lb on each top bolt; 1/2" Grade 8
  is good for ~14,000 lb, so bolts were never the weak point, the plate and the vibration were.

## Ergonomics

Reference: the home loveseat (IKEA), 40" wide at the seat, fits two "comfortably but intimately."
17" floor to uncompressed cushion, armrest at 25". Pod target: seat like the loveseat, back as low as the
loveseat's armrest, so riders look out over it at the playa.

Proposed numbers (pod floor = chassis deck, 24" above ground):
- Seat pan: 17" uncompressed / ~15" loaded, 20" deep, tilted back ~5 degrees. 3-4" HR foam (~35 ILD) over a
  solid pan, or 2" over a webbing/sling pan.
- Rim / backrest / armrest: 25" above the pod floor, one continuous padded rim around the outboard arc.
  About 10" above the loaded seat: lumbar-height support, arms drape over it, nothing above the shoulders.
  Back foam 2", reclined 15-20 degrees.
- Seated eye height ~31" above the seat, so eyes at ~70" above the playa; rim top at ~49". Seat is 41" off
  the ground: boarding needs a step (the renders show one).

### Fit: 48" pod vs the 40" loveseat
Two adults (15" hips, 18" shoulders, 23" buttock-to-knee) on the arc, back foam 1.5":
- At +/-30 degrees (both facing the car): shoulder gap ~0", same as the 40" loveseat.
- At +/-40 degrees: ~4" between shoulders, 5-6" between hips, roomier than the loveseat.
- Knees land ~2" past the pod centre, so shins cross unless riders splay. This is the sofa-corner posture and
  the reason the pod floor must be open on the car side (feet on the deck). Do not go below 48"; 54" would
  clear the knees.
- Foam thickness barely matters to fit: each extra inch of back foam costs ~0.6" of shoulder gap.
See `sketches/pod-vs-loveseat-plan.png`.

## Structure (decided 2026-09-12)

Riders face the car. Frame is 1" x 0.065" square steel, welded as one unit with the two receiver arms; shell is
Baltic birch ply; the outboard wall is a lit translucent diffuser with a fabric-covered band across the top.
`model/loveseat-build.html` draws every member and panel from the same ergonomic numbers as `loveseat-3d.html`
and prints the weight, cost, receiver stress and a cut list (post coordinates, tube lengths, panel sizes).

Why these materials (the general tradeoffs, condensed):
- Steel tube for everything that carries people: cheapest, MIG-weldable, tolerant of abuse; watch fatigue at
  ungusseted welds and cap open tube ends. Aluminium saves ~half the weight only when bolted, needs TIG, and
  fatigues worse at welds, so it stays on the roof.
- Plywood as a stressed skin, not cladding: 1/2" Baltic birch is 1.5 lb/sqft and CNC/laser-friendly; through-bolt
  or T-nut it (screws into end grain shake loose), seal every edge.
- Diffuser wall: 1/16" opal polycarbonate cold-bends around the posts as one 24x96 sheet (smooth option) or 1/8"
  opal acrylic as flat facets. Polycarbonate over acrylic wherever there is a bolt hole and vibration.
- Closed-cell (minicell) or HR foam over the pan, never open-cell upholstery foam (dust sponge). Solution-dyed
  acrylic or vinyl mesh fabric; anything else is a one-season material.
- A full steel seat plate was dropped: 1/4" plate is 10 lb/sqft, and the tube frame carries the load out to the
  seat just as well. The arms weld into the floor frame directly.

### Frame layout (per pod)
- Two 2x2x0.188" arms, 13" engaged in the receivers, 14" apart, running out to the floor ring under the floor frame.
- Floor frame at the deck level: chord tube along the rail (0.75" clear of the rail face), a half ring on the arm
  tips, radial joists at +/-45 and +/-72 degrees. 1/2" floor ply flush with the deck.
- Wall posts on the ring vertices (7 facets over 210 degrees, so 8 posts, ~12" chords). Posts past 90 degrees
  stand on the deck and tie back with a sill tube. Top ring at the rim height; seat back rail on the posts.
- Seat: front chord over the floor chord, five radial ribs; 1/2" pan; 4" HR foam. No legs: the underside is open
  for storage (~44" x 10" x 20", reached from the deck side; add a lip or strap at the front). To carry that, the
  front chord is 1x2x0.065" tube on edge and runs into the +/-75 degree posts on 5" links, so it is a simply
  supported 47" beam instead of a shelf edge: ~12 ksi and 0.07" sag with 200 lb standing on the edge at midspan
  (1" square would be ~33 ksi and 0.4"; 1.5" square is nearly as good as the 1x2). Weld the outer ribs to the post
  faces, not only the back rail, so the seat cannot hinge about the wall. Net weight change vs legs: nil.
- Wall: light modules, one per bay, set into the bays from outside like windows with the flange screwed to the
  post faces. Each is a 1/4" ply light box ~12.3 x 9.25 x 2" (matte white inside, LED rows on the back plate,
  laser-cut opal acrylic lid, one 3-pin + power connector), two stacked per bay so every plate fits the 19 x 11
  laser bed. Ten per pod, sixty across the car, all identical, bench-testable, swappable in minutes and replaceable
  wholesale next year. Every ply panel on the pod except the floor and seat pan is now a laser part (backrest and
  kick in per-facet pieces; the console back is cut in two). This is what settles faceted vs smooth: a flat module is
  trivial and interchangeable, a curved one is a one-off.
- End bays (the two beyond 70 degrees, past the riders' shoulders) are consoles instead: same idea, 4.5" deep, from
  the seat pan to the rim, flat padded top at rim height (it is the armrest) with two recessed cup sleeves each
  (3.5" dia x 3.5" deep, drain hole) so nothing sticks out to be knocked. Controller, power distribution and the
  harness terminals live inside; access from the front face. The fabric roll stops at the consoles.
- Backrest: 1/4" ply hung from the inner face of the top ring, tilted 15 degrees so its foot sits ~2" inboard at
  seat level, 2" foam, fabric continuous with the band. The wedge behind it is the wiring chase down to the seat
  back rail. The module depth lives in that wedge: at 15 degrees a 2" module clears the backrest by ~0.5"; the model
  flags a collision if depth or tilt make them meet.
- Fit cost of the modules: back face at the seat moves in to r ~18.7 (from 20.5). Hip gap at 40 degrees drops to
  ~2.7", shoulder gap stays ~3.5" because the shoulders bear on the top of the tilted back; 45 degrees gives 4.4"
  and 5.7". Pod weight ~145 lb with modules and consoles (+7 lb).
- Mirror-acrylic skirt under the floor edge with one LED strip washing it.
- Boarding: no step per pod; one hitch-stub step on a spare receiver at the walkway gap (in the model as a toggle).

### Weight (2026-09-12)
142 lb was too much to lift. Changes, all in the model as options with the new defaults first:
- Seat: 11 radial 1/2" x 2.5" birch slats (futon style) dropped into laser-cut combs on the front chord and back
  rail, instead of five steel ribs and a 1/2" pan. ~10 lb lighter, and a slat flexes ~0.15" under a 50 lb share of
  a rider, which is the suspension a solid pan never gives. Two end ribs remain to close the seat frame.
- Light modules and consoles in 1/8" (1/16" is an option): they carry nothing.
- Floor 3/8" (1/4" with four extra joists is an option): it holds bags and the occasional foot, not riders.
- Kick panel below the backrest 1/8": cosmetic, it just closes the wiring wedge.
- Frame tube 3/4" x 0.065" everywhere except the eight posts, which stay 1" so each light-module flange gets
  its own screw landing on the post face (a 3/4" face leaves under 0.3" per flange and no room for a rivnut).
  Structurally 3/4" is fine: 200 lb on the top ring between posts is ~16 ksi and 0.02" of deflection.
- Result ~118 lb. 0.120" arms take it to ~110; an aluminium frame to ~90.
- Aluminium frame option (1" x 0.125" 6061) is in the model but not chosen: the concern is the look of external
  gussets and rivets. The clean version is internal sleeves — 3" of 3/4" bar or tube inside both members at every
  joint, two rivets or bolts per side, nothing visible but fastener heads — with the arms and their node still steel
  and the frame bolted to that node.
- What matters more than the total is the lift, and the model now reports it: each arm (~13 lb, 9 with 0.120")
  slides into its receiver first; the bare frame with floor and slats (~60 lb, ~50 with 3/4" tube) goes onto the
  arms; modules, consoles, cushions and skirt (~37 lb) go on once the pod is on the car. A cradle at receiver height
  (dollies or a rack on the trailer) removes the lift entirely.

### Numbers from the model (defaults)
- Pod: ~135 lb and ~$800 in materials; six pods ~800 lb, ~$4,800. Steel is 80 lb of that (64 ft of 1" tube plus
  the arms); 3/4" tube drops it to ~120 lb. The 120 lb placeholder in the load case above was optimistic.
- Receiver arms at the x3 design moment: ~15 ksi, a third of yield.
- Diffuser developed length 87" x 18.5" — fits one 24x96 sheet. One 1/2" and one 1/4" 5x5 sheet of birch per pod.
- ~620 WS2812s per pod (10 m), 185 W at full white, ~50 W typical; 3,700 LEDs and ~300 W typical across six pods.

### Build order
1. Jig: bolt two receiver tubes to a straight bar at the real spacing; weld the arms with both inserted so they
   end up parallel.
2. Floor frame flat on the table from the post coordinates in the cut list, arms underneath. Slide it into the
   chassis before anything goes up.
3. Posts plumb off the floor ring, top ring, back rail, seat chord, ribs, legs. Tack, sit on it, weld out. Paint.
4. Ply (T-nuts into the tube), LED rows on the inner ply, wiring down one post to a connector at the arm.
5. Diffuser last, then foam, then fabric.

## Open
- Faceted vs smooth wall: modules argue for faceted (see Structure); smooth is still in the model for comparison.
- LED pitch in the 2" modules: 4 rows over 18" is a 4.5" pitch, borderline for an even glow at 2" depth; 5-6 rows
  or a heavier diffuser if the first module scallops.
- Build one pod first and weigh it before cutting the other five.
