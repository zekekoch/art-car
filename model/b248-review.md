# B-248 donor redesign and mechanical capacity review

13 September 2026. Companion: [interactive model](b248-3d.html), [dimensioned plan](b248/plan.svg), [assembly](b248/assembly.png), [roof removed](b248/uncovered.png), [running-gear transplant](b248/running-gear.png).

**The B-248 is a plausible running-gear donor, but six 300 lb occupied pods do not fit the listed cart's 2,450 lb payload with the current body design.** A larger controller can improve a power-limited vehicle; it cannot increase axle-bearing capacity. Since a custom frame is acceptable, the most promising alternative is to reuse complete factory axle/motor/brake assemblies on a frame suited to the pods. The exact rear axle version and gear ratio are the purchase-critical unknowns.

This is an additive concept study. The existing custom hub-motor models, notebook and laser-cut sheets remain their original design. The new model is not a cut list, brake design, suspension solution, certified capacity or permission to load the donor beyond its plate.

## The specific Craigslist cart

The [seller's listing](https://www.craigslist.org/view/d/scotts-valley-taylor-dunn-48v-cart-with/3B2CtmxLz4edBt7cXGDDnW), read on 13 September, asks **$6,000** for a **2008 B0-248-48AC**, with eight 6 V batteries, a Hi/Low switch, 14.5 mph claimed top speed, cab and ladder rack. It states **2,450 lb load capacity** and claims working brakes and good batteries. Those condition claims have not been independently tested. The first photograph shows the cab, rack and relatively narrow pneumatic tires; it does not establish axle part numbers or payload certification.

The model retains 2,450 lb as its conservative comparison. A different B-248 configuration is advertised at 3,000 lb in the [AC product specification](https://www.fitzgeraldequipment.com/new-equipment/industrial-carts/b-248-48v-ac/). The 550 lb discrepancy is unresolved. Accessories, configuration-specific limits, different definitions of cargo versus total payload, or a seller error are possibilities, not findings. Do not assume removing a 550 lb accessory package restores a rating; neither its weight nor that explanation is established. Obtain the complete plate and serial-specific build/option record.

## Mechanical capacity differences

### What the factory parts evidence actually establishes

The [Taylor-Dunn MB-248-15 service/parts manual, revision G](https://www.scribd.com/document/733256980/MB-248-15-0) covers B-248 AC / B-254 AC variants over specified serial ranges, beginning at 171000 for the listed 48 V coverage and ending at 206032, with exclusions. Check the donor's serial before applying it. The following are parts-table facts, not a proven conversion kit:

| Assembly | Factory evidence | Implication for this project |
|---|---|---|
| Front axle | p.98 lists beam **15-049-71** and complete assembly **15-050-77** in the shared model section | Some front hardware is shared; that alone does not establish equal axle ratings |
| Front springs | p.139 distinguishes **85-498-00** (B-248) from **85-486-00** (B-254) | Load variants can differ mechanically even where their axle catalog is shared |
| Rear wheel ends | p.99 lists single-bearing shaft **41-154-20**; optional B-254 double-bearing shaft **41-154-25**, inner bearing **80-505-30**, and different left/right housings | A higher-load configuration can change shafts, bearings and housings; a controller swap does not reproduce it |
| GT reduction | p.101 lists **18:1 / 24:1 / 30:1** input-shaft variants | Verify installed ratio and complete compatible gear configuration before pricing a change |
| Rear suspension | p.140 lists leaf **85-510-17** and optional overload rubber **98-002-00** | An overload spring is only one component of a load-capacity package |
| Brakes | pp.105–107 share master-cylinder and brake parts tables across covered models | Shared tables are evidence of common parts, not proof every serial has the same installed brakes |

The manual also makes controller programming configuration-specific and directs custom parameter requests through the dealer/factory. **I did not verify a complete B-248-to-HC upgrade BOM, a rear axle load rating, or a factory 2,450-to-3,000 lb conversion for this serial.** The [dealer manual index](https://www.cartmart.com/content/taylor-dunn-parts-manuals) separates AC, GT and older Ford-drive serial ranges: “B-248” alone is not enough identification.

The historical [2013 factory range brochure](https://hasmak.com.tr/yeni/TaylorDunn_GeneralBrochure.pdf), p.2, lists B-248-36 and B-248-48 at 3,000 lb, B-248 HC at 4,000 lb, and B-254 at 5,000 lb. The 48 V B-248 is the faster model, not the highest-capacity one. Thus voltage is not a useful proxy for how much weight the running gear carries. These historical ratings should not be transferred to this donor or mixed with a different model year's options.

### Which upgrades are straightforward?

These are engineering assessments of scope, not quoted kits or verified compatibility.

| Change | What it can improve | What remains limited | Expected scope |
|---|---|---|---|
| Repair weak batteries, cables, dragging brakes | Restores original force and range lost to voltage sag or drag | Factory mechanical capacity | First diagnostic step; usually simpler than a conversion |
| Speed/acceleration/current programming | Gentle 5 mph operation; possibly more usable launch torque if existing limits permit | Motor heat, transaxle torque, brakes and traction | Often the simplest change if tools and a suitable factory parameter set exist |
| Matched AC controller | More available motor current where the controller is the bottleneck | Motor continuous torque/heat; gear, shaft and bearing limits | Electrical integration: motor type, sensor, brake, interlocks and thermal protection must match; not a generic e-bike BLDC controller |
| Lithium battery and matched charger | Energy, reduced sag and possibly lower mass | Does not automatically uprate axles; removing low ballast changes stability | Mechanically removable, electrically consequential: BMS, regen acceptance, contactors, protection and full-charge voltage |
| Deeper GT gearing | More wheel torque per motor torque; higher motor speed at a crawl | Gear/shaft torque, traction and braking still matter | More invasive than programming; identify ratio, matching parts, availability and labor first |
| Higher-rated tires/wheels | May remove a tire-load bottleneck; flotation may improve with a suitable wider tire | Bearings, offsets, steering loads and tire clearance | Bolt-on only if rim width, bolt pattern, offset and load ratings all match |
| Higher-capacity springs | Restores ride height / travel under a higher load | Axles, frame, brake and stability limits persist | Factory-compatible spring package may be practical; stiffness alone is not a new capacity rating |
| Double-bearing axle / complete heavier axle | Can address a real mechanical wheel-end limitation | Front axle and all remaining components need their own checks | Housings and shafts change; obtain a complete compatible assembly or exact factory parts comparison |
| New welded frame using complete donor axles | Wheelbase, mounting locations and pod load paths can suit the art | All retained running gear still has its original component limits | Significant fabrication, but much less precision wheel-end work than four custom hub-motor corners |

A cart can stop moving for different reasons. If its driven tires spin, extra controller current will not cure insufficient traction. If neither tire spins while battery voltage collapses, investigate the battery/cables. If voltage is healthy and the controller limits current, then controller settings, gearing and motor temperature become relevant. The original caster-heavy art car also adds rolling and swiveling resistance on wheels that contribute no drive traction.

### Gearing is especially relevant at 5 mph

For the same motor torque and ignoring small efficiency differences, wheel torque scales with reduction ratio. **18:1 → 30:1 gives 1.67× wheel torque and 0.60× road speed at the same motor rpm.** A hypothetical 14.5 mph setup would become about 8.7 mph under those assumptions. This is not identification of the seller's installed ratio. The Hi/Low switch is not evidence of a mechanically two-speed axle.

At 5 mph, an illustrative 18 in tire turns 93 rpm; motor speeds at 18:1, 24:1 and 30:1 are about 1,681, 2,241 and 2,801 rpm. A deeper reduction lets the motor operate faster for a given ground speed. Whether that improves efficiency and sustained force depends on the actual motor/controller map and thermal limits. More current at near-stall creates heat; simply limiting top speed in software does not add mechanical reduction.

Going from an 18 in tire to a 22 in tire reduces ground force to 18/22, approximately **82%**, at unchanged axle torque. Wider tires may help flotation; taller tires also increase required axle/brake torque and clearance demands. Avoid wheel spacers or large offset changes as a casual solution: they increase bearing and steering moments.

## Two redesigns in the model

Select the architecture at the top of the sidebar in [b248-3d.html](b248-3d.html).

| | Retain donor body | Transplant running gear |
|---|---|---|
| Base | 121 × 45 in catalog donor with 52 in wide carrier | Proposed 120 × 52 in welded frame |
| Wheelbase | 55 in catalog | 72 in proposal |
| Retained | Unitized lower body, motor, rear transaxle, front axle, steering gear, springs, brakes and initial battery system | Complete matched running-gear assemblies and initial battery system; new structural chassis/mounts |
| Main benefit | Fewer suspension mounting changes | End loads closer to axles; fits the original 120 in length target; easier to hide the vehicle form |
| Main work | Establish structural attachment points and body-removal limits | Engineer spring hangers, crossmembers, alignment, brake routing and steering links |
| Capacity | Exact donor plate/configuration governs | Must establish a new vehicle rating from retained component limits and the new structure; no inherited OEM vehicle rating |

With fabrication already planned and drivetrain sourcing the main objective, **the transplant architecture deserves serious consideration**. The motor is modeled as part of the rear drive assembly, so relocating that assembly does not require designing a new automotive propshaft. Actual mount kinematics, cable travel and steering geometry still need the donor's parts drawings and measurements. A longer wheelbase helps longitudinal load distribution; it does not widen the lateral support track or increase bearing capacity.

### Pod, roof and driver packaging

- Four 48 in passenger pods at X = ±33, Z = ±34 in. U legs reach inward 8 in to the 52 in carrier. The two side boarding gaps remain 18 in wide.
- Rear passenger pod center X ≈ −66.88, Z = 0. Driver pod center X ≈ +69.66, Z = 0; 52 in driver width and 16 in forward legs. All other pods face inward; the driver faces forward.
- Pod outline is approximately **176.5 × 116 in** overall. Roof leaves extend beyond the pod outline, so this is not the full vehicle swept envelope. Roof plan bounds are about **216 × 111.6 in** before edge fittings.
- Proposed floor 30 in above ground: 25 in donor deck plus a 5 in carrier/floor assembly allowance. The latest upstream 28 in receiver spacing and 2 × 3 in arms / 2½ × 3½ in sleeves are retained as provisional interfaces; their final load rating is still open. This is a layout allowance, not a selected or checked beam section. Wheel travel and steering envelopes must clear it at full bump.
- Two stair modules occupy the 18 in slots, with a 16 in tread width and three treads at 7.5, 15 and 22.5 in, then the 30 in floor. Handrails and boarding loads still need design. No air-suspension kneel is claimed.
- The middle ottoman is 12 in wide, in two segments that leave the central crossing open. Width before knee, guard and post intrusions is 20 in on each side of it; that is not an accessibility or evacuation approval.
- Six cloverleaf roof pieces, each 64 in diameter. **Exactly eight posts**, at X = ±10 and ±48, Z = ±18 in, keep left/right and front/rear pairs symmetric. This is a support layout; wind uplift, diaphragm action, joints and torsional stiffness are unverified.
- The existing 41 × 21 in panel allowance is retained, two per leaf. End roof leaves move to X = ±76 in so those rectangles do not overlap panels on neighboring leaves. It is not a selected product. Check real panel dimensions, bending restrictions, shading and fixing methods.
- Keep the low padded wall as the visual element; a separate 36 in-high guard concept is drawn above it. Guard construction and event acceptance remain unresolved. It changes the low-rim appearance and should be reviewed with the full-size pod mockup.

The balanced arrangement **does not preserve the OEM driver station**. It retains the steering gear/brake components, with the wheel and pedals farther forward. The amber route is only a space reservation. Design a supported mechanical steering connection and an independent foot-operated friction-brake system with the correct pedal ratio and travel; retain an effective parking brake. No brake quick-disconnect, steering release or throttle interlock has been specified. Keeping the original driver seat instead pushes the passenger layout aft or changes the six-pod pattern; that alternative is not represented as a solved layout.

The donor has a unitized body. Cab, rack, seat box and lower panels cannot all be assumed cosmetic. Confirm which panels and nodes are structural before removal. If the body remains, connect pod sleeves into verified structural members through a carrier spanning multiple nodes, not into deck sheet, bumper or ladder rack. Two pins do not by themselves rate a cantilever: sleeve bearing, receiver bending, torsion, fatigue, welds and rail loads still govern. A transplant frame can put those load paths where they belong from the outset.

## Weight budget at 300 lb per pod

Treat **300 lb as people plus their belongings per pod**, with the driver included in the driver pod's allowance. The model does not assume a person's weight from gender or appearance. A per-pod limit and an overall occupant limit are separate operational constraints.

| Added item | Existing-design allowances | Lighter build targets |
|---|---:|---:|
| Five passenger pods | 640 | 450 |
| Driver pod and relocated controls | 200 | 110 |
| Roof, posts, shade and 12 panels | 250 | 160 |
| Carrier / proposed frame and receivers | 160 | 150 |
| Stairs and handholds | 70 | 45 |
| Ottoman | 30 | 25 |
| Lighting power and wiring | 40 | 35 |
| Unallocated hardware / mass reserve | 75 | 75 |
| **Added equipment total** | **1,465** | **1,050** |
| Six occupied pods | 1,800 | 1,800 |
| **Compared payload** | **3,265** | **2,850** |
| **Over the listing's 2,450 lb** | **815** | **400** |
| Headroom if a 3,000 lb configuration is confirmed | −265 | 150 |

The first column incorporates the upstream `fa89a2a` revision received during this study and uses the repo's approximately 128 lb passenger / 200 lb driver figures and additional allowances. The second is a **mass target, not an achieved or structurally validated lightweight design**. No member has been declared safe merely because occupant allowance fell from 400 to 300 lb. Guard, joint and control construction may exceed the reserve. Weigh modules and replace allowances as the BOM develops.

At a true 2,450 lb limit, the lighter target leaves **1,400 lb total for occupants and belongings**, before any additional margin, even though any one pod may be limited to 300. The existing-design column leaves 985 lb. Six pods can remain physically installed while fewer are occupied, but those are arithmetic ceilings, not occupancy approvals; partial-loading cases must also work.

Initial batteries are counted in base mass. Additional traction batteries, a separate lighting pack, changed controllers or new ballast must be added as **net mass changes**. The model gives no payload credit for removed cab/batteries. Its 1,550 lb starting value is an unverified catalog reference; the listing's curb mass and whether that catalog value includes the relevant batteries/options have not been confirmed. In transplant mode the same value is deliberately retained as a placeholder for retained components and batteries, not a measured donor-parts weight. Do not use either gross estimate for component selection until measured.

## Axle-load and stability screen

The sidebar reports front and rear axle totals from force and moment equilibrium. It also sweeps all 64 combinations of pods empty or occupied at the selected allowance. Coordinates are inches, X forward, Y up, Z left. Donor curb CG is inferred from the adjustable empty front-axle weight fraction; shell and occupant point-mass offsets are stated in `config.js`.

**Unknown inputs are deliberately exposed:** body-relative axle midpoint, 38 in tire-center track, 1,550 lb base mass and 50/50 empty axle split. The model does not know allowable front/rear axle loads. A result with positive axle reactions is not a passed capacity test. It reports no fabricated four-corner ratings.

The lateral number is distance from projected CG to a tire contact line on flat ground. It omits suspension roll and the effective support polygon, tire compliance, vertical acceleration, cross-slope, braking, turning, people standing/boarding, and roof wind. It is not a rollover margin or allowable slope. Check individual wheel loads, worst-side boarding with 300 lb at the outer edge, front/rear asymmetry, service/parking braking and roof gust cases in the structural/dynamics review.

## Battery, solar and maintainability

Start with a loaded diagnostic run on the donor's existing system before ordering upgrades. Log pack voltage under load, current, motor/controller temperature, distance and energy over a representative route. The seller's “good batteries” and a catalog range claim do not establish a 24 mile playa range.

Two 16S 280 Ah LFP strings contain 28.67 kWh nominal. Their installed mass, enclosure dimensions, voltage range, charge/regen limits and protection must be checked against this AC system. A 48 V label alone is insufficient compatibility evidence. Roof solar remains 1.2 kW nominal; it supplements camp charging. It does not establish daily energy production or eliminate the generator charging requirement.

Keep battery lids and rear drive service access unobstructed by permanent ottoman or pod-carrier members. Use removable access panels and service loops; keep OEM serial/part identifiers in the build record. Buying a complete matched front axle and rear drive assembly preserves bearing, hub, rotor and caliper interfaces that were difficult to source in the hub-motor design.

## Trailer and cost implications

The [U-Haul specification](https://www.uhaul.com/Trailers/6x12-Utility-Trailer-With-Ramp-Rental/HO/) gives approximately 143 × 72 in inside space, 57 in loading opening, 3,710 lb cargo and a separate 1,810 lb ramp limit. The proposed 52 in carrier leaves 2.5 in per side through that opening. The stock donor is 1 in longer than the initial 120 in target but within the trailer's length; the transplant proposal is 120 in.

Using the unverified base mass, rolling donor plus carrier is 1,710 lb (existing column) or 1,700 lb (lighter target), **excluding an operator**. An operator can consume the entire nominal ramp margin. The dry car plus a provisional 75 lb packing allowance is 3,090 / 2,675 lb. These figures do not prove ramp compatibility, axle distribution or tow-vehicle suitability. Confirm the actual loading arrangement with U-Haul after weighing; do not extrapolate a safe loading method from the width alone.

The trailer view intentionally shows only the rolling base. Five 48 × 32 passenger pods plus a roughly 52 × 42 driver shell require a real packing rack. Putting a 42 in driver depth beside a 32 in passenger depth is 74 in, which exceeds a 72 in trailer. A possible upper layer arranges those modules **lengthwise**, occupying about 100 × 42 in; it still needs checked support, tie-downs and total height above the trailer deck. Guard height and stacking protection change the old packing assumptions. No complete packout is claimed here.

The $6,000 donor price is verified as an asking price only. Planning allowances, not vendor quotes: initial mechanical/battery diagnosis and catch-up service $1,000–$3,000; carrier/control adaptation $2,000–$5,000 in parts and outside services; a full axle-transplant chassis $3,000–$7,000 instead of that adaptation allowance. Exclude personal labor, art/pods/roof, tax, delivery and batteries. Do not add a controller, lithium system or regear cost until exact parts are identified. If the axle must be replaced, compare that complete installed cost with buying a higher-capacity donor with suitable tires and running gear already fitted.

## Before buying this one

1. Photograph the complete model/serial/capacity plate, including load-center information and options. Ask what the 2,450 lb figure includes. Obtain the original build record and relevant manual through a [Taylor-Dunn dealer](https://www.taylor-dunn.com/manuals/).
2. Identify the rear axle manufacturer/model/ratio, shaft-bearing configuration, motor label, controller label and software/parameter support. Request allowable axle/wheel-end loads and continuous tractive effort for this configuration. Specifically compare its BOM with the HC/B-254 option under consideration.
3. Check four-wheel service brakes, parking brake, kingpin/bearing play, spring hangers, frame corrosion/cracking and differential noise. Record actual tire load ratings and inflated sizes.
4. Obtain empty front/rear (ideally four-corner) scale weights with batteries, then tire contact coordinates, steering sweep, bump travel, service-lid size and structural attachment locations. These turn the next revision from a generic envelope into a donor-specific design.

The practical decision is **buy the mechanical capacity and serviceable gear ratio first; spend on batteries and controls after that**. If this particular axle has the necessary ratings, it may be useful even if the original cab/frame arrangement is not. If achieving the load needs different axle shafts/housings, brakes and tires, a complete heavier donor may be the simpler purchase.

## Reproduce and review

Open `model/b248-3d.html` with its sibling folders. It uses the repo's local Three.js library; no CDN is needed. `node model/b248/verify.cjs` checks force/moment conservation, accounting, 256 occupancy/profile/architecture cases, adverse axle lift, finite mesh coordinates and eight posts. `node model/b248/render.cjs` generates four depth-buffered PNG projections and a plan SVG from the same geometry source (Node plus Python, NumPy and Pillow). Set `CODEX_PRIMARY_RUNTIME_PYTHON` to select Python; otherwise it uses `python3`. These are schematic projections, not a photoreal rendering.

Browser interaction/render verification was blocked by the environment's local-file policy. The math and geometry checks passed; the interactive UI has not been browser-verified in this environment. Static projections were inspected separately. Manufacturing dimensions, interference through full suspension/steering motion, structural member sizing and a complete loading/packout design remain open.
