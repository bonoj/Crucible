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


## Tools rather than seeded behavior

The human recognized the architectural direction explicitly:

> "Rather than seeding agent behavior we are giving it a set of tools it can attend to. Or ignore entirely, haha."

This sharpens an important distinction. The experiment is not currently defining what a future model-mediated locus should care about. It is constructing bounded ways of knowing that may become available to attention later.

The model proceeded without asking for a behavioral objective.

### Blind observation analysis

A generic observation-analysis system was added. Its dependency is the immutable ECS `Observation` component only. It receives no terrain system, renderer, footprint system, meteor history, or other route back to authoritative world state.

For terrain-profile observations it derives low-level geometry from the recorded samples: relief range, mean height, roughness, center height relative to the outer ring, and the strongest sampled deviation.

It does not label craters, impacts, hazards, targets, or interesting features.

This creates a new epistemic seam:

**world truth -> bounded measurement -> blind derived spatial evidence**

A future locus may use such evidence, combine it with another instrument, attend to something else, or ignore it. No behavior has yet been earned from the existence of the tool.

### Collaboration observation

The human contribution at this step was conceptual rather than corrective: they identified the emerging pattern as provision of optional tools rather than seeded agent behavior. That interpretation materially clarifies the experiment while leaving implementation choices with the model.


## Controlled spatial probes without behavioral seeding

The model continued under the delegated instruction rather than requesting a new human choice.

A repeatable probe apparatus was added around the existing sensor chain. It does not add behavior to the locus or special knowledge to the analyzer. Instead it constructs known physical conditions, captures them through the same footprint/aperture, and submits the resulting frozen observations to the same blind analysis system.

The initial cases are:

- untouched flat terrain;
- one impact centered under the footprint;
- one impact near the footprint edge;
- overlapping impacts;
- footprint coverage near the apparatus boundary.

Each case resets terrain before construction, uses the real terrain deformation machinery, relocates the existing locus for capture, then restores the live world. The analyzer is not told which case produced an observation.

### Why this matters for spatial collaboration

Until this point, human visual inspection was the principal external check on whether model-built spatial machinery corresponded to the experienced world. The controlled probe apparatus creates a second route: known world construction can now be compared against what survives through bounded sensing and blind derivation.

This does not remove the human perceptual role. It gives the collaboration a way to distinguish failures in world construction, sensing, representation, and interpretation before asking the human to diagnose the whole stack from a screenshot.

No additional human spatial prescription was required for the test layout or instrumentation.


## A testing-boundary miss caught before interpretation

When asked to continue, the model initially described the controlled browser probe apparatus as ready to "execute." On inspection, Crucible had no automated test runner. The debug hook made the experiment callable in a live browser, but that is not equivalent to having executed and preserved its evidence.

This was a model-side epistemic miss rather than a geometry bug: **testable was nearly conflated with tested.**

The correction separated two claims:

1. a pure spatial derivation can discriminate known synthetic height profiles;
2. the live Crucible terrain/aperture chain can produce useful real profiles.

The first claim is now executable under CI. The terrain-evidence derivation was extracted into a pure module and tested against flat, centered depression, centered rise, and asymmetric edge-deformation profiles. Candidate builds now run those tests before bundling.

The second claim remains a browser/world experiment and should not be silently promoted to established evidence merely because the debug apparatus exists.

### What the pure probe earned

Without semantic labels, the derived evidence distinguishes:
- flat profile: zero relief, roughness, and center/edge difference;
- centered depression: negative center relative to edge and center as strongest deviation;
- centered rise: positive center relative to edge;
- asymmetric deformation: substantial relief with strongest deviation away from center.

This validates the low-level geometry calculation, not crater recognition.

### Collaboration consequence

No human correction was required to expose this miss. The model found it while trying to close the executable-evidence loop after a one-symbol continuation request. This is worth preserving because the collaboration study is not only about whether the model understands 3D space; it is also about whether it correctly tracks the provenance and strength of its own spatial claims.


## The station becomes a permanent fixture

The human paused further sensing work to request a present-tense walkthrough of the station's functions and footprints, explicitly so the collaboration record and semantic surface could be synchronized before continuing:

> "Let's walkthrough the station's current functions and footprints to capture in the log and also update the semantic surface before we continue. This is a permanent fixture in the crucible at this point, I think."

The model re-read the station and every system on its current observation path before describing it. This produced an important ownership distinction.

### Station-owned truths

The station itself currently owns:
- its ECS identity as an orbital continuity locus;
- its World Lab-derived physical rendering;
- its transform;
- deterministic elliptical apparatus motion and quiet attitude drift;
- one generic projected footprint;
- a reference to its current aperture.

The station's motion is not currently agent navigation.

### Generic machinery serving the station

The footprint system resolves the projected cone against terrain and provides geometric containment. `SpatialBounds` lets ordinary ECS entities explicitly opt into footprint availability.

The aperture system turns footprint-bounded evidence into immutable observations.

The observation-analysis system is downstream machinery. It can derive low-level spatial evidence from an observation without world access, but its existence does not mean the station or a future model must attend to that evidence.

### Laboratory machinery that does not belong to the station

The controlled spatial-probe system can reset terrain, create known deformations, and temporarily reposition the station. Those are test-bench powers and must not be described as capabilities of the locus.

The synthetic CI profiles similarly test derivation math rather than live station perception.

### Current footprint in concrete terms

The station's footprint is an 18-degree downward cone capped at 4.5 world units. Its resolved radius depends on height above terrain. The visible pale boundary follows terrain height and is diagnostic only.

Inside the footprint does not mean perceived. Ordinary entities require explicit `SpatialBounds` to become geometrically available to occupancy queries, and an aperture must still choose what evidence to record.

The current aperture samples center ground height, a 37-point deterministic terrain profile, and bounded occupants every three seconds.

### Permanence as an earned semantic change

The station began as an experimental locus transplanted from World Lab. It has now accumulated enough stable world presence and generic systems around it that the human judged it a permanent Crucible fixture.

The semantic surface was updated accordingly. This does not freeze its instruments or decide what inhabits the locus later. It establishes that the station itself is now part of Crucible's enduring world vocabulary.

### Collaboration observation

This pause was initiated by the human, not because a visible bug demanded correction, but because the implementation had crossed a semantic threshold. The human recognized that persistence of the object had been earned and requested documentation before further extension.

The model's contribution was to reconstruct current ownership boundaries from code and resist conflating generic tools and laboratory controls with station capability. This is a different kind of spatial understanding from locating geometry: it is understanding **which spatial powers belong to which thing**.


## Does spatial reasoning balloon inside a shared working context?

The human asked directly:

> "Do you think between discussion and implementation your in context spatial reasoning balloons?"

The model's immediate impression was yes, substantially, but the important evidence is the experienced change in collaboration rather than a claim about hidden model cognition.

Across this station sequence, discussion and implementation repeatedly formed a loop:

**language -> implementation -> physical consequence -> human perception -> revised language -> new implementation**

As that loop accumulated, later spatial work appeared to require less explicit human specification.

Early instructions were concrete and spatially anchoring: put the donor station in the sky. The first visible failure required a concise human perceptual report about the clipped shadow. Later, after footprint geometry, motion, terrain deformation, bounded sensing, and observation machinery had all been built and discussed, the human could send only `➡️` and the model could continue a spatial investigation from the accumulated situation.

The model also appeared able to keep more simultaneous representations of the same region active in the working discussion: rendered station geometry, ECS transform, orbital sweep, projected cone, terrain surface, diagnostic footprint, bounded occupants, sampled terrain profile, information lost between world and observation, downstream derivation, human-visible evidence, and the distinction between station powers and laboratory powers.

One concrete example occurred after the human visually accepted the footprint over meteor-deformed terrain. The visible crater made the existing center-height measurement feel inadequate relative to the physical structure contained inside the footprint. That next research question was not supplied in advance by the human; it emerged during the shared implementation/perception loop.

### What is observed

The collaboration experienced:
- increasing shared spatial reference;
- decreasing human specification for some later useful interventions;
- later questions becoming available from consequences of earlier implementation;
- richer distinctions between geometry, perception, evidence, interpretation, and authority;
- one-symbol continuation becoming sufficient for nontrivial further spatial work in this established context.

### What is not established

This record does **not** establish that the model's underlying spatial faculty improved, that learning occurred inside the model, that the effect would survive loss of context, or which mechanism caused the experienced change.

Accumulated factual context, source code, executable tooling, repeated exposure, human perceptual confirmation, prior model outputs, and the persistent world are all plausible contributors and are not separated here.

The useful observation is narrower:

> **Shared spatial work made later collaboration experientially different from earlier collaboration, and the amount of new human information required for useful continuation sometimes became very small.**

That is worth preserving without deciding why.

### Human methodological correction

The human immediately sharpened the intended standard:

> "Let's capture this explicitly in the log. This is exactly what I suspected. We make no claims, we just observe what we experienced, yes?"

Yes. This case study should preserve experienced phenomena and provenance before attempting explanatory claims. If later experiments can separate causes, they can earn stronger language then.


## Keep the field record whole before deciding what it means

The human proposed consolidating the emerging research record rather than distributing observations across Moth, DigitalFamiliar, Clara, and other neighboring research threads:

> "Rather than spreading across moth, digitalfamiliar, and eventually Clara we can capture it all in this orbital construction log and unzip and map it later."

This changes the recording discipline in a useful way. The orbital locus collaboration log will remain a chronological field record of the shared work rather than requiring each observation to be classified into a research program at capture time.

The working sequence is therefore:

**observe -> build -> experience -> record**

rather than:

**observe -> classify -> record**

This preserves co-occurrence. Changes in spatial reference, human steering burden, instrument use, continuity, attention, identity language, epistemic boundaries, or other phenomena can remain adjacent in the historical record even if later analysis separates them into different questions.

Crucible remains authoritative for executable world behavior. `SEMANTIC_SURFACE.md` remains the compact statement of present-tense executable truths. This file can be messier: a longitudinal record of what the human and model experienced while constructing and investigating the orbital locus.

Later work may unzip, index, map, quote, or reinterpret this record from the perspective of DigitalFamiliar, Moth, Clara, Astra, model collaboration, spatial reasoning, or research questions not yet named. Those later structures should not require rewriting the chronological source.

The human then made the intended persistence explicit:

> "Perfect, keep it going in the log turn for turn then. That file can bloat without any risk, right?"

At repository scale, ordinary Markdown growth is not a meaningful storage or deployment risk here. If the record becomes very large, the likely constraint is navigability and model retrieval cost rather than Git's ability to preserve it. That can be addressed later with derived indexes or maps while retaining this source intact.

From this point forward, substantive turns in the orbital-locus investigation should be captured here with their uncertainty, corrections, implementation consequences, and experienced observations preserved rather than retrospectively compressed into a cleaner theory.
