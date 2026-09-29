# Orbital Locus Spatial Collaboration Case Study

**Status:** live observational record  
**Started:** 2026-09-29  
**Scope:** the orbital continuity locus and the systems it earns inside Crucible

## Why this record exists

This is a case study of how spatial understanding develops during human-model construction of an executable world.

It is not a cleaned-up design history. Preserve useful hits, misses, corrections, implementation evidence, and the amount and kind of human input actually required. The object of study is not only the orbital station. It is the collaboration that makes the station and its spatial systems increasingly legible to both participants.

The record may stay close to turn-for-turn where that preserves evidence better than retrospective summary.

## Starting condition

The human proposed a Continuity Lab as a locus floating above Crucible's noisy Terrordrome, explicitly **not a god object**. The developing physical model was a literal satellite footprint with multimodal apertures. World truth would remain authoritative; the locus would receive bounded evidence.

The human then made a concrete move:

> "Fuck it. Let's grab the exact orbital construction object from the world-lab and bring it over to crucible. Ecs it and stick it in the sky."

### Model action

The model inspected World Lab and Crucible, found the distilled Orbital Construction station, transplanted its geometry/material vocabulary, and made it an ECS entity with `Transform`, `RenderObject`, and deliberately empty `ContinuityLocus` state.

It retained the station's quiet attitude drift but removed its old marble-relative orbit. The station itself became the locus.

### Human steering required

Very little. The human specified the donor object, destination, ECS treatment, and broad placement. Exact transform, scale, component boundary, and preservation/removal decisions were ordinary model-owned engineering.

## First spatial miss: partial station shadow

### Human observation

> "Shadow issue at edge of the map. Might be light object occlusion? Only half of station shadow shows."

This was a high-value perceptual correction. The screenshot was not required for the model to form the first diagnosis; the human described the visible symptom and offered a tentative hypothesis without prescribing the fix.

### Model spatial hypothesis

The model inspected the station and light system and inferred that the directional light's default orthographic shadow camera was clipping the elevated station. The station meshes already cast shadows. Crucible enabled directional shadows but did not configure shadow-camera bounds.

The model predicted that this would produce the reported hard partial-shadow cutoff.

### Executable intervention

The model expanded the Crucible key light's shadow volume and increased shadow-map resolution, adding small bias controls. It did **not** alter station geometry or placement.

### Human result

> "Got it in one."

The first spatial hypothesis survived executable and human perceptual verification.

### What this shows

The model did not need direct visual access to the running browser to diagnose this case. Repository geometry plus a concise human report was enough to construct a useful spatial explanation. The human remained the perceptual authority for the running artifact.

## Planning the footprint

The human asked for a plan before further construction.

The model proposed a sequence:

1. earn a geometric footprint;
2. let footprints discover explicitly bounded occupants;
3. move the footprint deterministically;
4. add one aperture;
5. produce provenance-rich observation artifacts;
6. add a second modality only if earned.

The human accepted the sequence and delegated ordinary implementation decisions:

> "Let's do as you propose. Work until you want my input again!"

A key architectural constraint was kept small: `Footprint`, aperture machinery, and observation provenance should be reusable below Continuity Lab rather than embedded as station-specific behavior.

## Footprint implementation

### Model action

The model added a generic `Footprint` component and footprint system. The station owns an 18-degree downward cone capped at radius 4.5. The system resolves it against terrain and renders a thin diagnostic boundary.

Terrain remained substrate rather than being forced into an ECS occupant abstraction.

A generic `SpatialBounds` opt-in contract was then added for ordinary entities. Loose matter was the first participant. Being geometrically inside a footprint was deliberately kept distinct from being perceived.

The station then received a deterministic 90-second elliptical sweep so availability changes as a consequence of spatial motion.

### First aperture

The first aperture was intentionally weaker than "vision." Every three seconds it samples only bounded evidence available through the footprint: terrain height at the footprint center and explicitly bounded occupants. Each sample becomes an ECS `Observation` carrying observer, aperture, sample time, footprint state, and measurement.

No model interpretation, memory rollup, or semantic terrain history was introduced.

### Implementation miss

The first integrated aperture commit contained a malformed closing brace in the inspection surface. CI caught the syntax error before publication. The model inspected the failing Actions log, repaired the splice, and rebuilt successfully.

This is not a spatial reasoning miss, but belongs in the collaboration record because executable infrastructure prevented an implementation error from becoming human debugging work.

## First full visual inspection

The human inspected build `e38da00` on mobile and supplied a screenshot showing the station above a meteor-deformed terrain region with the diagnostic footprint boundary crossing the crater.

Human assessment:

> "I think it looks great on all counts. And the meteors paid off."

The model's prior questions had been whether station movement felt right, footprint scale felt right, and the boundary read as instrument coverage rather than magical territory. The human's response accepted all three without requesting adjustment.

### Spatial consequence discovered from the screenshot

The meteor crater made the next limitation visible. The footprint can geometrically cover strongly deformed terrain, but the first aperture currently receives only a center terrain height plus bounded occupants. It therefore cannot recover the spatial structure evident to the human in the crater.

This sharpened the next question from generic "add a second modality" to:

> **What can a bounded instrument truthfully learn about deformed terrain without being handed the terrain's semantic history?**

That question was earned by executable spatial evidence rather than chosen in advance.

## Human request to study the collaboration itself

The human then explicitly requested:

> "We should document how your spatial understanding evolves as a case study in building this orbital station and its systems. Yours hits and misses, how much input you actually need from me, etc. It can live right here in this lab almost turn for turn if you like. Including this message!"

This document begins that record.

## Current observations about collaboration

So far, human input has been sparse but high-bandwidth.

The human has primarily supplied:
- semantic intent and boundaries;
- selection of meaningful donor/world objects;
- perceptual reports from the live browser;
- acceptance or rejection of model spatial hypotheses;
- judgment about when an emergent behavior is meaningful enough to study.

The model has primarily supplied:
- repository inspection and reconstruction of spatial machinery;
- ordinary geometry and ECS implementation decisions;
- causal hypotheses connecting code to visible behavior;
- incremental abstractions;
- CI diagnosis and repair;
- proposals for the next smallest executable probe.

The interesting asymmetry is that the model can often reason substantially about spatial systems from code and concise perceptual evidence, but the human currently closes the loop on the experienced world. That division should be observed rather than assumed permanent.

## Recording discipline

Continue this case study when a turn materially changes one or more of:

- the model's spatial understanding;
- the human's required steering burden;
- a spatial hypothesis and its verification or falsification;
- the boundary between world truth and locus evidence;
- what becomes recoverable from executable evidence without human explanation.

Prefer concrete turns and consequences over generalized claims. Preserve failures. Do not rewrite earlier uncertainty to make later understanding appear inevitable.


## Continuing without a new human spatial prescription

After accepting the first footprint visually, the human asked to continue and keep this collaboration record current:

> "Yeah. Let's keep going and update this collab as we go."

No new geometry, sensor type, sampling density, or desired answer was prescribed. The model therefore continued from the limitation exposed by the crater rather than asking the human to choose an implementation.

### Terrain shape probe

The existing scene-summary aperture was extended to sample raw terrain height at deterministic points distributed across its resolved footprint: a center sample plus three radial rings. The measurement records the sample coordinates and heights, along with minimum height, maximum height, and height range.

The aperture is still not told that a crater exists, whether a meteor occurred, which terrain is "normal," or what shape the samples represent. It receives geometry-derived measurements only.

This is a deliberate spatial-understanding probe: determine how much structure can become recoverable from bounded measurements before introducing semantic labels or a richer modality.

### Steering burden

For this change the human supplied direction only at the research-program level: continue the work and continue observing the collaboration. Sampling layout and representation were model-owned ordinary decisions. The next useful human intervention should be driven by executable/perceptual evidence rather than requested preemptively.
