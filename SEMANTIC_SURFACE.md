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

Crucible has a simulation-time bucket with **1×, 4×, and 8×** rates. It defaults to 1×.

Simulation time governs autonomous world processes whose passage defines Terrordrome experience: orbital-station motion and attitude, meteor-weather scheduling, meteor trajectories and impact timing, aperture sampling cadence, and therefore locus-ledger accumulation.

Loose-matter physics participates in accelerated world time through bounded fixed substeps rather than by multiplying a single integration step. Excess physics debt is discarded if a render frame cannot safely service it.

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

The feed is intentionally a diegetic presentation surface that can expand as future station evidence earns additional channels, histories, or controls. Its existence does not itself add those channels or capabilities.

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
