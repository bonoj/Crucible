# Crucible — Semantic Surface

This file states present-tense truths about Crucible's executable systems. It is not an implementation plan, experiment diary, or instruction manual.

## Meteor weather is independent world noise

Crucible autonomously produces deterministic-but-erratic meteor weather. Weather events alternate unpredictably among isolated singlets, short bursts, and occasional denser showers. Individual impacts vary in magnitude and are targeted across the material field.

Meteor weather events are packetized. A singlet is a one-member packet; bursts and showers share one packet identity and central target while their rendered members carry noisy spatial and temporal offsets. Multi-member packets can stretch and wobble during flight while remaining one weather event. The central packet node is structural rather than an additional impactor.

Meteor weather does not query the orbital station, its footprint, its observations, or its analysis. It is Terrordrome activity rather than stimulus scheduled for the locus.

Consequently, station observations may contain direct deformation, partial consequences, old consequences encountered later in the sweep, or no meteor-relevant evidence at all.

## Terrain density is fixed at test depth

Crucible's deformable terrain field is currently fixed at a test depth of **60 × 44 × 60** samples across its 20 × 12 × 20 world-unit volume.

This resolution is an experimental constraint, not a tuning target. Terrain behavior should earn useful physical vocabulary at this depth before any increase in density is considered. Impact morphology, sensing, and other experiments must not silently escalate terrain resolution to solve local visual problems.

Meteor impacts currently express a carved bowl and raised rim. Strong impacts can additionally form a broad central uplift using the same density field, dirty bounds, and remesh path. The uplift is deliberately conditioned on impact scale so smaller craters are not asked to represent structure below the useful granularity of the field.

The central uplift is impact morphology, not additional terrain resolution. It does not change test depth, chunk dimensions, or the remeshing architecture.

## Simulation time can accelerate without accelerating the interface

Crucible has a simulation-time bucket with **1× and 8×** rates. It defaults to 1×.

Simulation time governs autonomous world processes whose passage defines Terrordrome experience: orbital-station motion and attitude, meteor-weather scheduling, meteor trajectories and impact timing, aperture sampling cadence, and therefore locus-ledger accumulation.

Ordinary ECS loose-matter physics participates in accelerated world time through bounded fixed substeps rather than by multiplying a single integration step. Excess physics debt is discarded if a render frame cannot safely service it. The separate high-count bearing batch is an explicit exception: it integrates once per rendered frame using a bounded accumulated simulation delta so bearing cost does not multiply with the fixed-substep count.

Human and presentation time remain real-time. Camera/orbit input, pointer tap and drag thresholds, FPS measurement, HUD responsiveness and orientation, log download behavior, and browser/render cadence are not accelerated.

Time scaling does not alter terrain test depth, static geometry, aperture contents, impact morphology, or the station's epistemic access. At 8×, ten simulated minutes require approximately 75 seconds of real time when the browser can sustain the simulation workload.

## The orbital station is a permanent Crucible fixture

Crucible contains one persistent orbital station descended visually from World Lab's `OrbitalConstruction T1`.

The station is an ECS entity with transform, rendering, continuity-locus identity, and a projected footprint. It occupies the same authoritative world as terrain, meteors, matter, light, and cameras. It is not a detached overlay or a god object.

Its current apparatus motion is a deterministic 90-second elliptical sweep centered above Crucible at altitude 8.5, with horizontal radii 4.2 and 3.2 world units. A separate quiet attitude drift changes its orientation. This motion is apparatus behavior, not evidence of agency or navigation.

The station casts ordinary world shadows. Its current station-feed HUD is also spatially associated with this fixture, but the HUD is presentation rather than an additional station sensor.

## A footprint describes spatial availability, not perception

The station owns a generic projected `Footprint`.

Its current footprint is an 18-degree downward cone capped at 4.5 world units of radius. The resolved radius depends on the station's height above the terrain directly below it.

The footprint boundary is resolved against current terrain height. Its visible pale ring is diagnostic rendering of the footprint, not the footprint itself and not an in-world force field.

Generic footprint membership is horizontal geometric intersection. ECS entities participate only when they explicitly expose `SpatialBounds`. Being inside the footprint does not by itself mean an entity is perceived.

Terrain remains physical substrate rather than being converted into a bounded occupant.

## Apertures turn available world evidence into bounded observations

The station currently carries one aperture of kind `scene-summary`.

The aperture can sample only through the station's resolved footprint. A sample produces an immutable ECS `Observation` with provenance identifying the observer, aperture, sample time, and footprint state.

The current measurement contains:
- ground height at footprint center;
- a deterministic terrain profile sampled at the center and three twelve-point radial rings;
- explicitly bounded ECS occupants intersecting the footprint.

The aperture is not given terrain deformation history, meteor history, semantic feature labels, renderer contents, or unrestricted ECS state.

Observations are currently sampled every three seconds during normal runtime.

## The locus ledger preserves what crossed the boundary

Normal station observations and their downstream blind analyses are appended to a bounded rolling locus ledger. The current retention limit is 240 observations, approximately twelve minutes at the normal sampling cadence.

The ledger can be exported from the live browser as JSON. Its payload contains build and instrument metadata plus chronological observation/analysis pairs.

The export does not add authoritative terrain state, meteor history, hidden ECS state, controlled-probe labels, or other world knowledge that did not cross the station's observation boundary. It is therefore a portable record of station evidence rather than a general Crucible debug dump.

## Spatial analysis is downstream of observation

A generic observation-analysis system can consume a frozen terrain-profile observation.

Its terrain derivation uses only recorded observation data. It has no terrain-system, renderer, footprint-system, meteor-history, or other route back to authoritative world state.

Current derived evidence includes elevation minimum, maximum, mean, relief range, roughness, center elevation relative to the outer ring, and the strongest sampled height deviation.

These are low-level spatial derivations. The analyzer does not label craters, impacts, hazards, targets, or interesting features.

The existence of an analysis tool does not imply that a future model-mediated locus must use or attend to it.

## The station feed is a diegetic presentation surface

Tapping the orbital station can summon a translucent blue station-feed HUD. The HUD is hidden by default. While open, it remains spatially associated with the moving station and reorients toward the active camera each frame for legibility rather than inheriting the station's changing attitude. The readable card is pulled slightly toward the camera and connected back to the station's upper hub by a faint translucent pyramidal tail. The tail supplies volumetric anchoring and parallax without becoming another sensor or crossing the card's primary information surface.

Station selection takes precedence over the terrain-tap meteor interaction, so tapping the apparatus summons its feed rather than calling an impact through the terrain interaction beneath it.

The HUD renders the latest recorded scene-summary aperture evidence at the observation cadence. Its current terrain presentation reconstructs the sampled footprint from the same recorded terrain-profile points and reports measured relief and footprint radius.

The camera-facing presentation does not grant a camera aperture, renderer access, terrain-system access, meteor history, faster hidden sampling, or additional world knowledge. It is a human-visible presentation of evidence that already crossed the station's epistemic boundary.

The feed has become the station-anchored **CLARA Continuity Lab surface**. It is one persistent bounded display with a shared header, an evidence region, and a narrow control bay whose internal layout is derived from the surface bounds rather than assembled as unrelated floating panels.

The evidence region remains downstream of the recorded scene-summary aperture exactly as above. The current control bay contains a human-operated stow/deploy affordance for the Cinnabar and Cinnamon field. That affordance invokes an existing world control from the presentation surface; it does not make Cinnabar aperture evidence, grant CLARA command authority, or imply that CLARA selected the control autonomously.

The surface can reform as future evidence or human-use pressure earns changes, but its existence does not itself add epistemic channels, agency, attention, memory machinery, or unconstrained generated interface behavior.

## Observation is not behavior

The orbital station currently has no model connection, goals, attention policy, autonomous decision-making, memory summary, semantic event history, object recognition, or command authority over Crucible.

Its instruments make bounded evidence available. They do not prescribe what should matter or what should happen next.

## Research apparatus is separate from station capability

Crucible contains controlled spatial-probe machinery for testing the observation chain against known physical conditions. The probe apparatus can reset/deform terrain and temporarily position the station for repeatable captures.

Those powers belong to the laboratory test bench, not to the orbital station.

Pure CI tests also exercise the downstream spatial derivation against synthetic height profiles. Passing those tests establishes properties of the derivation math; it does not establish live-world recognition by the station.

## Current epistemic chain

The present observation path is:

**authoritative world state → projected footprint → aperture measurement → immutable observation → optional blind spatial derivation**

The locus ledger and diegetic station feed are downstream consumers of this evidence. Neither sits upstream of the aperture or bypasses it.

Each boundary is intentionally explicit. Later systems may earn additional apertures, tools, or ways to act without collapsing these layers into direct omniscience.


## A pure inference parcel can carry locus evidence across an inference boundary

Crucible contains a pure projection that can turn an exported locus ledger into a bounded inference parcel. The projection has no dependency on the world, terrain, renderer, ECS, meteor, or station systems.

A parcel carries ledger and instrument provenance plus a selected chronological window of recorded observations and their optional blind analyses. It explicitly identifies itself as recorded locus evidence rather than authoritative Crucible state.

The parcel omits authoritative terrain state, meteor event history, hidden ECS state, controlled-probe labels, unmeasured object identities, objectives, and personality or identity instructions.

The parcel is transport machinery only. Its existence does not connect a model to the station, prescribe what an inference should notice, or make an inference's interpretation authoritative world truth.


## The station chronograph is a ledger-derived presentation surface

A small chronograph ring on the station presents the most recent recorded locus history. It is downstream of the locus ledger and does not sample Crucible, terrain, the renderer, meteors, or ECS state.

The chronograph currently displays at most the latest 48 ledger entries. Each mark corresponds to one already-recorded observation. Mark lift and scale derive from the existing blind relief range; a small radial offset derives from the existing blind roughness value. These mappings are presentation only.

The chronograph is therefore not an aperture, memory mechanism, attention policy, event detector, or authoritative history. The rolling locus ledger remains the retained evidence source. The ring is a compact human-legible indication that the station has accumulated bounded observations.

## Meteor flight presentation is not impact matter

Meteor heads and their short particulate wakes are presentation geometry. Wake particles are emitted sequentially in simulation time, fade independently, and carry no collision, terrain, ECS, or causal meaning.

The current particulate wake replaces the earlier rigid line tail. Meteor impact consequences remain separate. No bearing splash or other physical impact matter is implied by the wake; that seam is intentionally available for later work.


## Bearings use the recovered Foundry baseline

Crucible contains a spawnable bearing batch derived from the last known-good Foundry bearing vocabulary rather than from the abandoned GPU/contact experiments.

A control spawns 25,000 ordinary bearings per activation. Bearings currently use radius 0.055 at Crucible scale, array-backed authoritative position/velocity state, and one instanced presentation mesh. They are not represented as 25,000 independent Three.js meshes.

Bearing support is authored from the final clipped rendered terrain triangles on a 112 by 112 support field, matching the important Foundry terrain seam. The immutable octagonal plinth remains separate from deformable terrain: its top participates in ground support and its exposed vertical sides are resolved analytically against bearing radius.

The current batch retains Foundry's cheap pile-support approximation and terrain-slope nudge. Bearing integration runs once per rendered frame using accumulated simulation delta rather than once per fixed 1/120 world-physics substep. This restores the high-count Foundry performance shape. Authoritative bearing storage is currently preallocated for up to 1,000,000 grains. Presentation remains a single instanced mesh capped at 180,000 rendered instances. Every authoritative grain is still integrated each bearing update; only presentation sampling changes with population. Rendering is full through 50,000 grains, then uses strides of 2 above 50,000, 3 above 100,000, 5 above 250,000, and 8 above 500,000. Sampled rendered grains are slightly enlarged so visual density does not collapse as stride increases.

The accepted mobile field evidence for this architecture reached approximately 100,000 authoritative bearings at 60 FPS and 150,000 tending toward 45 FPS on the tested device/build. Those numbers are observed performance evidence, not a cross-device guarantee or a simulation invariant. The architectural result is the separation of authoritative CPU-side grain state from adaptively sampled instanced presentation without introducing GPU compute or per-grain ECS entities.

World impacts are distributed through a generic impact seam. Meteors emit an impact consequence with position, radius, and impulse; the bearing system subscribes and applies radial granular impulse to bearings inside that region. Bearings do not know about meteor entities. Other future systems can emit the same impact vocabulary without coupling themselves to bearing implementation.

Spacing, stacking quality, and bearing-bearing contact remain outside this restoration pass.

The bearing batch is a Crucible entity, but it does not currently expose a single `SpatialBounds` component. A batch-wide bound would falsely represent many distributed bearings as one footprint occupant. Per-bearing observational availability remains a separate future seam.



## The autonomous extruder is world behavior, not station behavior

Crucible contains one autonomous extruder whose present form was selected from the earlier in-world Extruder Yard exploration.

The extruder moves continuously across the terrain, turns back toward the field when its forward probe would leave material, excavates bounded terrain volumes on its own cadence, and emits small timed yields of bearings behind itself. Its emitted grains enter the same authoritative bearing batch used by the rest of Crucible.

The extruder is an ordinary world process. It does not query the orbital station, its aperture, observations, ledger, CLARA surface, or inference machinery. It exposes a spatial bound, so it may become a bounded scene-summary occupant when ordinary footprint geometry intersects it.

Its excavation and yield behavior are specific authored machinery. They do not establish generalized resource extraction, production economics, planning, goals, or agency.

## Aeon is a disposable counterfactual observation aperture

Crucible retains a 🐉 Aeon forensic control outside the ordinary construction-tool grammar. Aeon is research instrumentation, not world capability and not an orbital-station aperture.

The current water aperture can render controlled counterfactual views of the same scene and inspect camera rays against the live water geometry. Its development established an important instrumentation rule: an isolated render must preserve dependencies relevant to the hypothesis being tested. An earlier “water only” intervention accidentally hid scene lights and therefore produced a coherent but false lighting diagnosis; framebuffer alpha likewise proved unsuitable as a proxy for water coverage. The corrected aperture preserves lights and admits sampled pixels through exact ray-confirmed water intersection.

The investigation also found and corrected a genuine free-surface winding defect: reconstructed water triangles had faced downward. Correcting the winding restored upward geometric normals but did **not** remove the visible color pathology, demonstrating that a real defect need not be the causal defect under investigation.

Controlled material counterfactuals subsequently showed the lit transparent water surface could become dark/brown while an unlit rendering of the same ray-confirmed geometry retained the expected water color. The production surface was therefore moved to an unlit material without changing hydrostatic state. Aeon remains available because its useful vocabulary is the ability to reshape a small observation around competing executable realities, not the permanence of any one diagnostic schema.

## Pages publication is serialized

Crucible's GitHub Pages workflow serializes publication through one shared concurrency group with cancellation disabled. This was introduced after overlapping publication activity was followed by a deployment that remained in a blank server-side state until timeout. Serialization is an operational guard against overlapping stable/preview publication; it is not evidence that every Pages-side deployment failure originates in repository code.

## Engineering Watchlist

This is a small watchlist, not a refactor docket. Entries belong here when a concrete implementation characteristic may become consequential with scale or new behavior but executable evidence has not yet justified broader machinery. Presence here does not declare technical debt or authorize speculative cleanup. Remove or revise an entry when the code changes.

- **Frame-wide static synchronization.** `lights.syncAll()` currently runs every frame although the present lights are static. `orbit.applyAll()` likewise runs every frame even when orbit state has not changed. Both are cheap at current scale but are unnecessary steady-state work.
- **Footprint presentation allocation.** The moving station footprint rebuilds a small 56-vertex position array/attribute and recomputes its bounding sphere every frame. The footprint genuinely moves; the repeated allocation is the characteristic under observation, not the update itself.
- **Meteor wake allocation.** Wake particles currently create and later dispose individual sphere geometries and materials. Current weather keeps this bounded, but substantially richer meteor activity would make pooling, shared geometry/material, or instancing preferable.
- **Main-loop concentration.** `main.js` currently owns composition, frame scheduling, fixed-step body physics, interaction routing, UI wiring, and debug exposure. This is still legible at present scale; another independent physical process may provide evidence for extracting scheduling or ordinary-body physics rather than refactoring preemptively.

Terrain support rebuilding is deliberately **not** on this watchlist: terrain mutations now carry their already-known dirty footprint into terrain-owned support rebuilding, so callers remain ignorant of the support representation and local mutations do not require a global support refresh.


## Granular matter exposes a cheap spatial projection, not per-grain occupants

The bearing system maintains a 64 by 64 planar density projection while performing the authoritative bearing integration it already owes. Each integrated bearing increments one projection cell after collision/support resolution. This adds constant work to the existing per-bearing pass and does not create ECS entities, per-bearing bounds, spatial searches, or additional rendering work.

The scene-summary aperture can sample that projection only inside its current footprint. The resulting observation reports bounded granular occupancy as presence and average cell density plus projection sampling provenance. It does not expose authoritative bearing count, individual bearing positions, bearing identity, or unrestricted access to the density field.

The bearing system knows how its granular population projects into space. The aperture knows only how to request a bounded spatial measurement. This is observational availability, not object recognition: downstream inference is not told that the measured granular occupancy consists of ball bearings.

This establishes a reusable seam: expensive or numerous world truth may maintain a cheap spatial availability projection as part of work already being performed, while a locus pays only for bounded sampling of that projection.


## Cinnabar and Cinnamon is a scored field with terminal Clockchain resolution

Cinnabar and Cinnamon is a deterministic scored field inside Crucible. Ordinary turns are chronological scored consequences driven by field time. The currently authored turn sequence contains nine immutable scored consequences: the brass dome rise, tethered kite, Clockchain descent/buried transit/re-emergence, meteorstorm abatement, two granular-field turns around the dome, kite-tether failure, a distant brass-spire rise, and a paper flag on that spire. These are authored consequences, not claims of generalized construction, cloth, tunneling, weather-control, granular-field, spire, flag, or event machinery.

Clockchain is terminal to the complete known turn sequence. Historical Clockchain resolutions remain ledger evidence, but only a resolution keyed to the current terminal turn can drive the visible mechanism. Appending another turn therefore moves the active Clockchain frontier after that turn; a previously resolved token cannot rise in the middle of later known history.

At the terminal frontier, Clockchain derives and records the owner of the next single turn from the accumulated scored history. Its current derivation is deterministic and publicly computable; it is not cryptographic secrecy, consensus, or an external randomness service. The world mechanism is terrain-grounded, and its chains and tokens are local children of the device. A resolved winner rises vertically and bobs lightly as presentation of the recorded result while the other token remains seated.

Turn rules may change prospectively without rewriting earlier scored history. The former two-turn couplet rule is no longer active; current initiative is one Clockchain resolution per next turn.

Cinnabar and Cinnamon does not add an aperture or otherwise change the orbital station's epistemic access.


## Render visibility has one authority per object

For an entity carrying both `Transform` and `RenderObject`, `Transform.visible` is the authoritative visibility state. The render-sync system copies that value to the registered Three.js render object every frame. Directly changing `RenderObject.object.visible` for such an entity is therefore transient and must not be used as persistent world or mode state.

Presentation objects that are not independently registered as ECS `RenderObject` entities may own local Three.js visibility. Examples include internal HUD elements, debug footprint lines, chronograph marks, meteor wakes, and other child/helper presentation whose visibility is not synchronized from an ECS transform.

The distinction is ownership, not whether the object happens to be rendered by Three.js: **ECS-owned render visibility changes through ECS state; presentation-owned visibility changes locally.**


## Control-surface grammar

Crucible's compact construction controls are declared in `src/shell.html`, styled as first-class controls in `src/styles.css`, and bound to behavior from runtime code. New ordinary controls should inherit this existing shell grammar rather than being created ad hoc from JavaScript.

Before adding a control, inspect the current shell for existing symbols, ordering, grouping, active-state behavior, and semantics. **Do not reuse an existing visible symbol for a different operation and do not duplicate an existing operation merely because a new experiment needs access to it.** Semantic novelty does not imply UI novelty.

Controls that select a persistent interaction mode use the existing `.active` state convention. Compact glyph controls carry their explanatory name through `aria-label`; visible prose is not required when the surrounding control surface already uses glyph grammar.

The present visible terrain/transport point instruments are mutually selected through the shared tool grammar: `⛏️` carve, `🪏` raise, and `💧` source. The former visible `🩸` thicker-source affordance has been stowed; source-rate variation remains runtime vocabulary rather than standing UI. The existing meteor apparatus remains separate rather than being duplicated as another point-tool button.



## Shallow water is independent solver state with a reconstructed presentation skin

Crucible's current liquid candidate is a **64 × 64 depth-averaged shallow-water solver** over an 18 × 18 world-unit field. It owns water depth and Cartesian momentum independently of the older scalar transport machinery. Bed elevation is resampled from mutable exact terrain, and interface fluxes use hydrostatic reconstruction against the higher neighboring bed so lake-at-rest balance is not represented as a separate centered bed-slope force.

The finite material octagon is a geometric slip boundary. Near its edge, outward momentum is projected away using the actual nearest boundary-plane normal. Water injection is volumetric solver input; the visible surface is not the authoritative water state.

The solver and presentation intentionally have different spatial vocabularies. Solver cells are measurements/state, not render polygons. The visible free surface is reconstructed at twice the solver sampling density, clipped independently against wet/dry support, the material boundary, and exact terrain height. This allows sub-cell terrain ridges to occlude reconstructed water without requiring the hydrodynamic grid itself to resolve every visible ridge.

The presentation skin applies a small weighted neighborhood reconstruction to water elevation. That smoothing is computed once per solver cell per presentation rebuild, then sampled by the finer surface reconstruction. Smoothing fades toward sparse wet boundaries so shoreline vertices remain closer to raw reconstructed elevation instead of forming isolated raised facets. Presentation geometry currently rebuilds at approximately **30 Hz** while the solver continues on its own stability-limited substeps.

The free surface and exposed material-boundary curtain use unlit transparent materials with depth writing disabled. The surface therefore does not depend on Crucible's scene lights or generated vertex normals. The accepted presentation baseline is the auditioned **L** look: surface color `#17636a` at **0.42 opacity**. The boundary curtain is independently `#245f73` at **0.50 opacity** and represents exposed water column only along the finite material boundary; it is not a second hydrodynamic surface.

The A-Z appearance ladder remains latent in the water system as cheap experimental vocabulary rather than visible UI. It spans deliberately broad hue choices and approximately 0.08 to 0.95 opacity. Appearance can therefore be reopened without rebuilding a material experiment.

Momentum damping is likewise an explicit cheap tuning seam. The accepted baseline is **viscosity level 1**, preserving the pre-audition damping coefficient of `0.22`. The explored 1-26 ladder increases damping exponentially; level 26 is intentionally far slower than ordinary water. These levels are phenomenological momentum-damping controls, not calibrated physical viscosity. Appearance and damping are independent of one another and of the hydrostatic reconstruction. Their audition buttons were temporary instruments and are not part of the standing Crucible UI.

The water system exposes diagnostic state including wet-cell count, volume accounting, maximum depth and speed, solver step count, stability timestep range, accumulated simulation debt, and measured solver time. A downloadable water diagnostic can additionally preserve wet solver cells and the reconstructed surface triangles against exact terrain. These are research apertures, not additional simulation state.

Current mobile field observation remains that frame rate tends toward roughly **15–20 FPS as the wetted world becomes large**. A briefly observed ~34 FPS state occurred with substantially less water coverage and is not a valid before/after benchmark for the later presentation changes. The dominant scaling cause has not yet been established; solver work, reconstruction work, and transparent screen coverage remain distinguishable hypotheses rather than a settled diagnosis.

### Legacy sea volume

The existing bounded sea volume remains provisional executable world vocabulary while fluid representation is unresolved. It does not require a dedicated control-bar affordance, but its state should remain semantically reachable for inspection and deliberate use.

**Future removal condition:** remove the legacy sea entity once Transport has earned an accepted fluid representation that subsumes the sea volume's useful role. Do not remove it merely as cleanup before that crossing.
