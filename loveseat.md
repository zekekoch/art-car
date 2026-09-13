# Loveseat (pod) design notes

Working notes for the 48" two-seat pod (design 2). Six pods per car, each a bolt-on module; see README for the layout.

## Mounting: hitch receivers (decided 2026-09-11)

Each pod rides on two 2" x 3" steel arms on edge, 28" apart (they straddle the tire under the side pods), that slide
into 2-1/2" x 3-1/2" receiver tubes welded through the chassis side rail into a cross member behind it. Retained with
hitch pins; anti-rattle wedge clamps take up the slop. End pods use the same receivers running longitudinally through
the end rail. (Revised 2026-09-13 after the drivetrain review: 26" -> 28" so the tire chord clears the sleeves through
the kneel as the axle walks toward its pivot; 2x2 -> 2x3 after the load case below was corrected.)

Why receivers and not a bolted flange (the original sketch, `sketches/pod-mount-sketch.heic`):
- The cantilever moment is carried by bearing over the receiver's length, not by bolt tension, which takes the
  fastener-fatigue problem of a bolted butt flange off the table (a flange needs a 3/8" plate or gussets and still
  loosens). It does not make the joint fatigue-proof: the sleeve walls, the through-rail welds, the pin holes and the
  anti-rattle clamp all see the same reversing load on washboard and still need checking.
- The moment goes into the cross member as bending instead of twisting the side rail.
- Playa assembly is slide in, drop two pins. No torque wrench, no bolt count.
- Class III/IV hitches are rated for 500-1,000 lb tongue weight at ~12", which is the right load class for intuition,
  but a complete hitch's rating does not transfer to two raw receiver tubes welded into a rail; this load path has to
  be worked out on its own (free-body diagram with the sleeve reactions and the rail / cross-member supports).
- Spare receivers on the rail are free attachment points for anything else (steps, bike rack, bar).

### Load case per pod (corrected 2026-09-13)
The earlier version measured the lever arms from the pod centre; the support is the chassis rail face, 12" further in.
- Two riders at 200 lb with their centre of mass ~12.7" outboard of the pod centre line, so ~24.7" from the rail face,
  plus ~128 lb of pod at ~20": ~12,500 in-lb static (the old 7,000 was short by the 12" inset, as the review said).
- Design for ~37,500 in-lb: 3x for ruts. One person standing on the outboard rim (200 lb at 36" from the rail, 1.5x)
  is ~23,000 and does not govern.
- Two 2x3x0.188" arms on edge run ~14 ksi at the design moment (30% of 46 ksi yield). The 2x2x0.188" arms that were
  the default run ~25 ksi (53%), too close for a joint that sees washboard all week; 2x2x0.250" is ~21 ksi.
  loveseat-build has all three selectable and prints the numbers.
- Over the 13" of engagement the arm bears on the sleeve as a couple of ~1,400 lb per arm at each end (design case);
  the hitch pins retain, they do not carry the moment, and the anti-rattle wedges are what keep that couple from
  hammering.
- Driver pod: ~14,700 in-lb static about the end rail (the riders sit close to the rail but the floor and gate hang
  forward): ~28 ksi in 2x2x0.188", ~16 ksi in 2x3x0.188".
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
- Two 2x3x0.188" arms on edge, 13" engaged in the receivers, 28" apart, running out to the floor ring under the floor
  frame (top face under the floor ring).
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
- What matters more than the total is the lift, and the model now reports it: each arm (~15 lb as 2x3x0.188; 13 as
  2x2x0.188, 9 with 0.120")
  slides into its receiver first; the bare frame with floor and slats (~60 lb, ~50 with 3/4" tube) goes onto the
  arms; modules, consoles, cushions and skirt (~37 lb) go on once the pod is on the car. A cradle at receiver height
  (dollies or a rack on the trailer) removes the lift entirely.

### Wood shell option (in the model, not chosen)
Metal base (arms + floor frame + floor, ~27 lb + 17 lb) with a wooden loveseat on it. Framed like-for-like in wood
saves only ~6 lb because 3/4" steel tube is already light. The version that pays is a shell: the 1/4" module and
console shells are glued side to side and become the wall, no posts; a 1.5" laminated-ply top rail, a 3/4" x 2.5"
back rail, a 1.5 x 3.5 fir front chord on edge (stiffer than the steel 1x2 at the same weight), slats as before;
the shell bolts to the steel floor ring with T-nuts. The lights become 1/8" cartridges (back plate + strip + lid)
dropped into the shells on four screws, so they stay swappable while the wall stays put. ~111 lb; the lift is
17 lb of base then a 40 lb shell. Costs ~0.5" of seat room (hip gap 2.0" at 40 degrees, 45 degrees fixes it).
Wood joints get glue plus screws for vibration, and a finish for dew and dust.

### Numbers from the model (defaults)
- Pod: ~128 lb (2x3 arms) and ~$800 in materials; six pods ~800 lb, ~$4,800. Steel is 80 lb of that (64 ft of 1" tube plus
  the arms); 3/4" tube drops it to ~120 lb. The 120 lb placeholder in the load case above was optimistic.
- Receiver arms at the x3 design moment, measured from the rail face: ~14 ksi in 2x3x0.188", 30% of yield.
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

## Outline: U, not D (2026-09-12)

The pod is now a U in plan: a 180° half round outboard, then two straight legs 12" long back over the deck toward the
rail face (48" wide x 36" deep instead of a 48" disc; the rails moved 2" further in after the review, so the deck
fills the last 2" to the rail). Reasons, all about the car rather than the seat:
- Two adjacent pods present parallel flat faces 18" apart, so the walkway is a rectangular slot and a stair module
  fills it flush from the rail to the pod rims; no deck extension outboard of the 54" rail, so the deck stays on the
  car and the bare car drives onto the trailer (53" over the tire faces through the 57" ramp opening).
- The straight legs are the consoles: flat boxes are trivial to build, the armrest lands exactly beside the rider
  past the 90° post, and every arc bay becomes a light module. One cup per armrest (decided), which an 8" leg fits.
- Transport: a 48 x 36 box stacks two rows across the 72" trailer exactly, four per layer, six pods in two layers
  (76" high on the deck). Keep the legs at 12": 38" deep drops it to one row and three layers. Discs stack one row, two per layer, three layers (102"). With the receiver arms left on the pods the
  footprint grows 13" and it is back to one row, so the arms come off for the trailer.
- Seat, backrest, riders and the fit numbers do not move: the 200° seat sits inside the arc, and the wall past 90° was
  already standing on the deck with a sill. Six 30° facets on the arc give the same 12.3" module chord as before.
The front (driver) pod is the same module; its legs extend forward, so the car is ~16" shorter overall (rear rim -97",
front +81").

`model/loveseat-build.html` has the U/D select and the leg-length slider; `model/frame-3d.html` draws both, the stair
modules (one per side at mid-length on their own receiver stub, 17" wide, 3 x 8" risers with the deck as the top step)
and a "Trailer" view with everything stacked on the bare car inside the trailer outline, with the fit readout.

## Driver pod (2026-09-12)

The same U module turned round: the half round goes to the end rail (the driver's back is to the car), the legs point
forward and carry a floor, and the open end between the leg posts is the front. Decisions so far:
- Right foot: a spring-return throttle pedal (regen on lift so the car slows when the foot comes off) and the brake
  pedal beside it; a dead pedal for the left foot. Legs 16" (vs 12" on the passenger pods) put the pedal face ~32"
  ahead of the seat back.
- F / N / R is a three-position lever on the driver's console top wired to the controllers' direction + enable lines
  (nothing mechanical to shift); software refuses a direction change unless the car is stopped. Neutral = controllers
  disabled, motors freewheel, which is also how the car gets pushed around camp.
- Regen fades to nothing at walking pace and does nothing with a full pack, so there is a real service brake: the pedal,
  on a tandem master cylinder under the leg floor, hydraulic to four calipers, working with a tripped BMS or disabled
  controllers. The hand lever next to the shifter is the mechanically held parking brake, cable to two rear calipers.
  The DMV checks for both. (Revised 2026-09-13: the earlier note had only the hand lever, a service-brake gap.)
- Lighting panel and pack readout on the passenger-side console top. One cup per arm, as everywhere.
- Low gate (12") between the leg posts, hinged left, latched right: this is the way in, up the front of the car. The
  DMV's 36-48" guardrail rule applies to levels 84" or more above the playa, so at a 24" floor the gate height is a
  design choice, not a licensing item.
- Steering shaft runs under the floor beside the right arm at z = 9 with the quick-disconnect at the rail, u-joint at
  x = -3, column ~16° from vertical to a 13" wheel 12" ahead of the pod centre and 27" above the floor.
- Arms run 13" into the end-rail receivers and the full length under the floor to the gate (~64"). The riders sit close
  to the rail but the floor and gate hang forward, so the moment about the end rail is ~14.7k in-lb static: 2x3x0.188"
  like the others, not a lighter wall.
- 52" wide (two people, the driver facing forward, so less cuddly than the loveseats); the back is a superellipse
  (squareness slider, default 0.4) so the corners fill out without the width changing. Outline 52" x 42"; on the
  trailer it rides beside the fifth passenger pod on layer 2 (still two layers).
- Entry is from the front: the gate opens and a one-rung fold-down step hangs under the front chord at ~13" above
  the playa (hinged, folds flat under the floor); the gate post is the handhold. The arms/consoles do not pivot.
- Both drivers are left-handed and the driver sits on the left, so the shifter and hand brake on the left console
  are the right way round.
- Weight is ~200 lb as modelled; ~65 lb of that is the two 64" 2x3 arms and the rest is the bigger floor and shell.
  It is lifted onto the car by two people like the others.
- Kneel (2026-09-12): wheels moved to sit under the side pods (axles at +-33, wheelbase 66") and each side pod's two
  receiver stubs spread to 26" apart so they straddle the tire (1.8" each side); the receivers go back through the
  rail, so pod floors sit at deck height (24"). With the deck plate and pod floor cut out over the tires (wheel wells)
  the frame can drop until something stops it. Corrected 2026-09-13 with the arms articulated in frame-3d: ~5.6" of
  kneel, not 8. The D2500 bottoms at 6.0" (3.5" of bag stroke through the 0.625 motion ratio), the tire chord meets
  the receiver sleeves at 5.6" as the axle walks 1" toward its pivot, the sled is 3" off the ground at 6.5", the 6"
  fender box stops the tire at 7". Pod floors at ~18.4" kneeled. Without wells it is ~1" (deck plate). Costs: 66"
  wheelbase puts the end pods 42-58" past the axles (ride at the ends is lively); the wells need an inner fender or
  the tire throws dust into the storage under the seat. Turning radius ~15.5 ft to the outside tire at 22° of lock.
  The stair drops with the car; kneeled, its bottom tread is on the playa.
  Where the tire actually is under a side pod: centred 5.5" inboard of the pod centre line (the envelope edge),
  so only the outer 2-3" of tire is under the seat edge; the rest is under the riders' foot space between the seat
  front and the rail. The 22.5" tire tops out 1.5" under the deck, so any kneel needs a fender box in the foot space:
  6" tall covers the 5.6" available with 0.5" spare and doubles as a footrest. `model/loveseat-build.html` draws the
  tire, well, fender and receivers under the pod with a kneel slider (Chassis under the pod); the legs are 12" and
  stop at the rail face (rails 14" in from the envelope edge, the deck fills the last 2"), receivers 28" apart.
`model/loveseat-build.html` "Driver pod" toggle draws all of it (leg length, gate height and wheel height are sliders);
`model/frame-3d.html` draws the driver pod with its gate at the front and packs it in the transport stack.

## Open
- Guards (checked against burningman.org 2026-09-13): the MV Owner's Handbook applies the 36-48" perimeter guardrail
  rule to levels 84" or more above the playa; the pod floor is 24", so the 25" rim and the 12" driver gate are not
  licensing items (the criteria page's "sturdy side railings" is general guidance). What does apply: any stairs must
  have a secure railing, so the stair module gets a handrail, and the DMV reviews loading/unloading procedures.
- Receiver joint: the numbers above are beam stresses; the sleeve welds, wall bearing, pin holes and anti-rattle
  retention still need a proper free-body check, and one built pod should be load-tested on a jig at the x3 moment.
- Driver pod: pedal box, wheel and gate are placeholders from the model; sit in the cardboard mockup before cutting steel.
- Faceted vs smooth wall: modules argue for faceted (see Structure); smooth is still in the model for comparison.
- LED pitch in the 2" modules: 4 rows over 18" is a 4.5" pitch, borderline for an even glow at 2" depth; 5-6 rows
  or a heavier diffuser if the first module scallops.
- Build one pod first and weigh it before cutting the other five.
