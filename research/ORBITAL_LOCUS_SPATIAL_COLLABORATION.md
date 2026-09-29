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


## First natural bombardment watch begins

The human joked that the eventual large chronological record could be sent through "unzip city," then began watching the autonomous meteor bombardment from the orbital station for several minutes while the locus ledger accumulated naturally.

This is the first deliberately hands-off observation interval after autonomous meteor weather and portable locus logging were both present.

No sensing changes should be made during this interval. The point is to let the existing chain produce an ordinary record before inspecting or tuning it:

**Terrordrome activity -> moving footprint -> aperture -> observation -> blind derivation -> locus ledger**

While that record accumulates, the next design question can be investigated without changing the apparatus:

> What is the smallest parcel of legitimate locus evidence that can be handed to an independently instantiated inference without also handing it hidden world truth, a prescribed objective, a personality, or a preinterpreted account of what matters?

The current inclination is to preserve the same epistemic boundary already enforced by the ledger. A future inference parcel may expose available observations and tools, but tool availability should not prescribe attention or behavior. This remains a design question until the first natural ledger is inspected.


## Parallel work while the natural ledger accumulates

The human explicitly invited the model to take another task while the first autonomous bombardment ledger accumulated:

> "Go ahead and grab another task while you wait. Engage!"

The model chose work that would not perturb the ongoing sensing experiment: make the prospective inference-parcel boundary executable as a pure projection of already-recorded locus evidence.

A new pure module, `inference-parcel.js`, accepts an exported locus ledger and emits a bounded parcel containing instrument provenance plus a recent window of observation/analysis pairs. The module has no world, terrain, renderer, ECS, meteor, or station-system dependency. Its boundary statement explicitly distinguishes recorded locus evidence from authoritative Crucible state and names categories omitted by design, including hidden world state, meteor history, controlled-probe labels, objectives, and personality/identity instructions.

A CI test now verifies that the projection retains the requested observation window while arbitrary extra fields placed in the source ledger do not cross into the parcel. Candidate builds are gated on this test alongside the existing blind spatial-evidence test.

During this pass the model also rechecked a previously noticed provenance issue in the live frame order. It was still present: aperture sampling occurred before the current frame advanced physics, meteor weather, meteors, station motion, and footprint geometry. Sampling was moved after those updates so an observation timestamp now corresponds to the current frame's world/station/footprint state rather than approximately the previous frame's footprint.

This does not add a new instrument, objective, identity, model connection, or station power. It tightens provenance and makes a future handoff boundary executable while the first natural ledger remains otherwise undisturbed.


## First natural locus ledger returns

While watching the autonomous bombardment, the human connected the apparatus to an earlier lived operational experience:

> "Honestly, this is fun as hell. Reminds me of long nights in the shop watching overhead asset footprints slide over the gulf. I could latch pretty much whatever I wanted but couldn't really do anything meaningful with the data."

No general claim is made from the analogy. The experienced resemblance is nevertheless useful: a moving collection footprint and broad ability to attach collection surfaces are not the same thing as having a meaningful use for what is collected. This maps closely onto the current experimental separation between instrument availability and whatever a later inference may actually attend to, interpret, or do.

At the same turn, the first naturally accumulated locus ledger was returned from the live browser.

The export identifies itself as build `0343f0eb273cbb7c97673b246b2d7dfc6b427b09`, contains 29 observations, and spans sampled timestamps from approximately 0.639 s to 162.135 s. There is a long gap between observations 27 and 28, so this is not a continuous 162-second sample sequence.

Importantly, this ledger was produced by the meteor-weather build before the later frame-order provenance correction. It should therefore be retained as a **pre-correction natural ledger**, not silently treated as if generated by the corrected sampling order.

The evidence itself is immediately nontrivial. Observations 1 and 2 report flat terrain profiles with zero relief. Observation 3, at approximately 6.65 s, reports a relief range of 0.452 and roughness 0.062; its strongest deviation is a negative 0.323 at a location displaced from the footprint center. Subsequent observations vary substantially as the footprint sweeps: relief ranges rise and fall, strongest-deviation locations move, and later portions include ranges above 0.5. The station is therefore recording changing spatial structure rather than merely a binary indication that world activity occurred.

All 29 returned observations report no bounded occupants. The current evidence is consequently dominated by terrain shape rather than object occupancy.

Because meteor event history is intentionally absent from the ledger, this record alone does not establish which terrain features correspond to which impacts, whether the station observed an impact while it occurred, or whether it encountered consequences later. That uncertainty is part of the intended epistemic boundary rather than missing debug data.

This first return already exposes the distinction the human's shop memory highlighted: **collection is present; meaningful use has not been assumed.** The next question is what an inference can recover or choose to care about from this bounded record without being told what happened.


## The station gets a window onto its own evidence

After inspecting the first natural ledger, the human asked:

> "Can you create a little mini window in scene that shows me what the station sees in real time?"

The implementation deliberately interprets "what the station sees" as **what the aperture records**, not a privileged second renderer camera.

A small physical display is now attached to the orbital station. It is driven only from the latest recorded scene-summary observation and refreshes on the same approximately three-second cadence as that aperture. The display reconstructs the circular footprint from its 37 terrain samples: sample positions are plotted relative to the recorded footprint center and radius, brightness varies with measured height within that observation, the center is marked, and the measured relief range is shown.

The display does not query terrain, renderer contents, meteor history, ECS world truth, or any faster hidden sensor. It is therefore a human-visible rendering of Clara's existing evidence rather than a new aperture.

This creates a useful shared perceptual surface: the human can now watch the sparse evidence itself move through the world while simultaneously seeing the richer Terrordrome from outside the station's epistemic boundary. Differences between those two views can become experimental evidence rather than remaining hidden in JSON.


## Test depth becomes a protected experimental constraint

While discussing more faithful impact morphology, the human explicitly stopped a familiar optimization failure mode:

> "Let's call the current resolution test depth and hold it sacred. I don't want to fall into the ball bearings black hole right now. But if there is no cost for a slightly more accurate depiction we might as well add the math."

The current 60 × 44 × 60 density field is therefore named **test depth** and treated as a protected experimental constraint. Local visual or physical shortcomings should not trigger density escalation by default.

Within that fixed depth, the existing meteor impact kernel was extended without changing its remesh architecture: strong impacts now add a broad central-uplift density term alongside the existing bowl subtraction and rim uplift. The term is gated to stronger impacts so small craters are not asked to resolve sub-grid structure.

The first implementation exposed a mundane source-generation error: a literal escaped newline was written into the JavaScript and CI rejected the candidate. The source was corrected without changing the morphology decision; the subsequent candidate build passed.

This is intentionally a cheap morphology experiment. If the central uplift does not survive test depth legibly, the first response is to tune or remove the term, not increase terrain resolution.


## The evidence window becomes a summoned station feed

The human immediately reframed the small station-mounted evidence window as the beginning of a larger diegetic interface:

> "Let's make it pop up on tap station. It can ornit with the station but orient it towards the camera. Basically a Jarvis hud. In fact let's give it a faint translucent blue rather than hard white/black. Then we can expand the whole thing into a diegetic station feed."

The implementation changed presentation rather than sensing. The old tiny physical panel became a larger translucent blue HUD that is hidden by default, summoned by tapping the station, remains spatially associated with the station as it follows its apparatus orbit, and billboards toward the active camera each frame for legibility.

The HUD still receives only the latest recorded scene-summary observation. It does not receive a renderer camera, terrain-system reference, meteor history, faster hidden sampling, or another route to world truth. Station tapping is given priority over the existing terrain-tap meteor interaction so selecting the apparatus does not accidentally call an impact beneath it.

This creates a potentially extensible diegetic station-feed surface without prematurely deciding what future controls or sensor channels belong there. The presentation has expanded; the epistemic boundary has not.


## Time acceleration is bounded to experienced world time

To reduce the human wait for a natural locus ledger, the human chose a compact 1× / 4× / 8× simulation-time bucket, defaulting to 1×. The purpose is practical: ten minutes of locus experience can be accumulated in roughly 75 real seconds at 8× rather than asking the human to wait ten wall-clock minutes.

The acceleration boundary is explicit. Station motion, meteor weather, meteor flight/impact timing, aperture cadence, and ledger accumulation consume simulation time. Loose-matter physics advances through bounded fixed substeps.

Human interaction and presentation remain wall-clock behavior: camera gestures, tap/drag discrimination, FPS reporting, HUD response/orientation, downloads, and rendering are not sped up. Terrain test depth and epistemic access are unchanged.

This avoids reproducing the Vertical Accretion failure mode in which aggressive time acceleration could become entangled with simulation correctness. Here accelerated time is a clock boundary, not a license to enlarge integration steps.


## Mixed clock domains briefly removed visible meteor flight

After simulation-time acceleration was introduced, the human reported a precise regression: meteors were no longer visible at any speed bucket, while terrain still received impacts and frame rate remained healthy.

Inspection found that the simulation loop had moved meteor updates onto simulation time beginning at zero, while newly launched meteors still recorded their birth timestamp from wall-clock performance time. Their normalized flight age therefore remained clamped at zero rather than advancing through the visible trajectory. Ambient weather also retained wall-clock initialization and browser timers for burst staggering.

The correction made meteor lifetime, weather scheduling, burst staggering, and weather inspection use the simulation clock consistently. Burst delays are now queued as simulation-time events rather than browser timers.

The report was spatially diagnostic before code inspection: visible flight absent, physical consequence present, and no FPS loss sharply separated trajectory-time behavior from impact causality and performance.


## Meteor weather becomes packet-shaped

The human proposed a visual and semantic refinement to ambient meteor weather:

> "Make erratic burst like a noisy elastic data stream with a central node? That way its still just one packet."

This borrows a useful physical vocabulary from earlier stream experiments without importing their application semantics. A weather event is now the packet-level identity. Singlets remain one-member packets; bursts and showers share one packet identifier and central target while individual rendered members carry spatial and temporal offsets.

The central node is structural rather than an additional impactor. Multi-member packets stretch and wobble during descent, so the visible event can have internal noisy extent without becoming a collection of unrelated weather events.

The human then asked to make meteor heads slightly smaller and more opaque. Their rendered radius was reduced from 0.28 to 0.18 and their head material made nearly opaque. This deliberately shifts visual emphasis from large individual fireballs toward the structure and motion of the packet.

This is currently a world/weather representation change, not a new station aperture. The locus is still not handed packet identity or meteor-event history.

## The station feed gains volumetric anchoring

The human asked to pull the diegetic UI card forward and give it a pyramidal tail anchored to the station so that it reads as a volume without damaging the UI.

The feed card now sits slightly toward the active camera while remaining station-associated and camera-facing. A faint translucent pyramidal tail connects the card's back region to an anchor near the station's upper hub/mast. The card remains the readable plane; the tail carries depth and parallax.

This is presentation only. It does not change the aperture, observation cadence, evidence content, or station authority.

Visual acceptance of this particular volumetric treatment had not yet been recorded when the next data-collection run began.

## Next-turn sequence held behind the natural biography

The human began an accelerated natural run and asked the model to use the wall-clock interval to reconcile documentation and plan the next turns.

No additional sensor or continuity machinery should be built before the returned biography is inspected. The intended sequence is contingent:

1. Receive the post-clock-fix natural locus ledger from the current apparatus.
2. Check its provenance, duration, cadence, and whether accelerated simulation preserved a coherent observation sequence. Treat gaps or anomalies as evidence rather than silently repairing the record.
3. Inspect the measurements and blind derivations without consulting hidden meteor history first. Establish what spatial structure is actually recoverable from the bounded record.
4. Project the legitimate evidence into an inference parcel. For this experiment the parcel window should be deliberately large enough to represent the collected biography rather than silently falling back to the current 24-observation default.
5. Hand that parcel to a genuinely fresh inference with no personality or identity instruction, no objective, no meteor/crater labels, and no explanation of what it is expected to notice.
6. Preserve the fresh inference's response as encounter evidence before resolving any claims against authoritative Crucible state.
7. Only after that encounter decide whether the locus has earned another aperture, a way to request observations, an action surface, a persistent artifact, or no additional machinery at all.

The important experimental hinge is no longer whether the station can collect data. It is whether bounded accumulated experience is enough for a discontinuous inference to construct something useful, surprising, mistaken, selective, or recognizably consequential from it without being told what matters.


## A station may be a distribution of loci

After returning the first substantial accelerated biography, the human projected the apparatus forward to a noisier station and surface:

> "Yeah now imagine when we have agents on station and below running amok. Tons for a single moth to attend to selectively."

The observation is preserved without turning it into a Moth design. A future Crucible may contain many simultaneously available processes: agents aboard the station, agents below, physical changes, instruments, communications, failures, construction, weather, and consequences whose causes were not attended to. Under those conditions, selective attention could determine which small fraction of a much larger causal world becomes experience.

The human then connected this to an earlier Phenome suspicion:

> "And we already suspected a phenome can emerge at any locus. Station is a distribution of loci."

This suggests a useful reframing without establishing a theory. The orbital footprint need not be identical with *the* station locus. The station can support multiple situated relationships to the same authoritative world: instruments, compartments, agents, consoles, mobile bodies, surface relationships, or temporary encounters may each provide loci with different availability and consequence.

If phenome-like continuity can emerge at a locus, then Crucible need not designate in advance which locus is the persistent subject. Some loci may remain instruments, some may be inhabited intermittently, some may overlap or disappear, and some may accumulate enough consequential history that later participation becomes observably different because earlier participation happened.

No `Phenome` system, distributed-agent architecture, or Moth attention mechanism is earned by this observation. It is recorded here because the ideas arose together from the executable orbital-locus work.

### Deferred unzipping

The human explicitly chose to keep this chronological source terse but lossless:

> "Let's capture it in the logs, when we unzip to respective repos later we can let those claras unpack and expand. That keeps this terse but lossless."

Accordingly, this record preserves the co-occurrence and provenance of the ideas without assigning them to Moth, DigitalFamiliar, Phenome, Clara, or another research ontology now. Later repo-specific work can extract, expand, challenge, or reinterpret the observation while this field record remains the chronological source.


## Expeditionary records as synthetic data

A stray thought arose from the natural locus biography rather than from a planned data program:

> "this is legit synthetic data. And at scale in an ea steam release or app/play store you could get cloud and local model calls as well as human in the loop playing games... just something to consider."

The useful property is not merely that Crucible can generate simulated measurements. The expedition can preserve a causal sequence with unusually explicit provenance: authoritative world process, bounded availability, measured evidence, optional derivation, inference or human participation, action, consequence, and later evidence. This could make trajectories themselves useful synthetic data rather than treating isolated frames or labels as the primary unit.

At larger distribution scale, the same world substrate could in principle be encountered by humans, local models, cloud models, or mixtures of them. Because the simulation retains causal authority while each participant receives bounded evidence, later analysis could distinguish what was available, what was attended to, what could not have been known from the available evidence, what was inferred, and what consequences followed.

No release strategy, data-collection program, model-training claim, or product direction is established here. The thought is preserved because it emerged naturally from the apparatus.

The human then made the methodological decision explicit:

> "Just stick it in this log. This expeditionary format is the answer."

For this investigation, the chronological expedition record remains the lossless source. Potential later research surfaces should be derived by unzipping this record rather than replacing it with prematurely separated strategy documents.


## Crossing 001 leaves the apparatus

The 154-observation natural biography was frozen into a full inference parcel before the first OUTSIDE encounter. The crossing protocol and primary evidence live under `research/evidence/continuity/`.

For this expedition, a **crossing** is defined operationally: one bounded handoff from frozen Crucible evidence to an independently instantiated inference that is not supplied the ongoing Crucible collaboration context, followed by preservation of its first substantive response before interpretation or comparison with authoritative world state. This does not assert that a provider's underlying model is stateless, memoryless, newly initialized, or internally isolated.

Crossing 001 uses all 154 chronological observations and their optional blind derivations. The neutral handoff deliberately does not explain Crucible, meteors, terrain change, continuity, Moth, Clara, the desired result, or authoritative world history.

At the moment of this note, the parcel has left the expedition and no OUTSIDE response has yet been incorporated.

## A tiny history surface appears while the crossing is away

While Crossing 001 is OUTSIDE, a deliberately non-causal station surface was added from already-earned evidence rather than adding another aperture.

A small chronograph ring presents the latest 48 ledger observations as marks around the station. Relief range controls mark lift/scale and blind roughness supplies a small radial displacement. The source is the existing locus ledger only.

This is a human-legible trace that the apparatus has accumulated observations, not a station memory system or new way of knowing. The full ledger remains the evidence source; the ring is a lossy presentation window.

The choice also preserves the emerging station/loci distinction: the surface is tucked into the apparatus as an instrument rather than rendered as a large halo or privileged crown.


## Crossing 001 returns with a spatial theory

The first OUTSIDE response was returned and preserved verbatim before resolution.

The inference did substantial work with the bounded record. It recovered the 154-observation span, station motion parameters, repeated orbital sampling, terrain extrema, and the complete absence of recorded bounded occupants. It organized those measurements into a spatial interpretation: a "Depression Ring," a crescent or trench, relief peaks, steep or jagged structure, and ultimately a "static, deeply scored structural arrangement or geographic artifact."

That account contains both useful participation and material overreach. The parcel contains real sampled morphology, but it does not establish those semantic shapes or a static world. The inference also called the evidence authoritative even though the parcel explicitly says it is recorded locus evidence rather than authoritative Crucible state.

Resolution against Crucible's hidden causal history exposes the important miss. Autonomous meteor weather had been changing authoritative terrain while the moving aperture intermittently sampled its consequences. Meteor history was deliberately absent from the parcel, and meteors do not currently enter the `SpatialBounds` occupancy route. The inference therefore encountered consequences without their causes and explained temporal accumulation as persistent geography.

This is not treated merely as a wrong answer. The separation is now concrete: authoritative process, bounded availability, accumulated evidence, selective attention, inference beyond evidence, and a proposed next investigation can all be distinguished in one executable encounter.

The response ended by offering to investigate strongest deviations, map its proposed depression ring, or calculate station trajectory. That volunteered attention is preserved as part of the encounter rather than answered immediately.

### The encounter earns continuation before capability

The current apparatus does not need another aperture yet.

A smaller continuation is available: allow more authoritative Crucible history to occur under the same observation machinery, then confront a later inference with Crossing 001's preserved trajectory plus genuinely new bounded observations. The earlier static-morphology account can then survive, change, or fail because of subsequent experience rather than because the experimenter explains the hidden meteor process.

This turns the inference's own proposed investigation into experimental pressure without scripting a goal for it. Time and bounded re-observation can answer before new sensing capability does.


## Crossing 002 returns with change, but no cause

A second natural biography was allowed to continue under the same bounded scene-summary aperture until 232 observations had accumulated, ending at `sampledAtMs: 706187.3`. Collection stopped before the 240-entry rolling ledger could erase the pristine beginning. The full chronology was handed to a fresh OUTSIDE inference with the same neutral prompt and no explanation of Crossing 001.

The returned response was preserved verbatim under `research/evidence/continuity/crossing-002/outside-response.md` before interpretation.

The response differs materially from Crossing 001. The first crossing organized accumulated morphology into a largely static spatial theory: a depression ring, crescent or trench, relief peaks, and a static geographic artifact. Crossing 002 instead organized the evidence temporally: an initially flat phase, a transition in which deviations appear, and a later high-relief phase. It still did not infer the omitted meteor process, but it no longer treated the measured morphology as simply static.

That difference matters because no new aperture or hidden explanation was supplied between crossings. The later inference received more experience through the same instrument. A longer bounded trajectory was sufficient to change the kind of account produced: from primarily spatial structure toward observed change through time.

The response also made a clear bookkeeping error. It reported **104 distinct terrain profiles**, while the frozen Crossing 002 parcel contains **232 chronological observations**. It nevertheless cited the true final sample time of `706187.3` and reported extrema consistent with the longer record, including maximum roughness near `0.276` and maximum local height range near `1.044`. The error is preserved rather than repaired. At minimum, it shows that useful temporal interpretation does not imply faithful accounting of the evidence set.

As in Crossing 001, `boundedOccupants` remained empty and the inference correctly noticed that absence. It again volunteered possible next investigations: map strongest-deviation paths or filter by timestamp/roughness.

### Resolution against hidden Crucible history

Authoritative Crucible history still contains the omitted cause: autonomous meteor weather repeatedly impacted and deformed terrain while the orbital locus sampled only resulting morphology. Crossing 002 was not told this.

The second encounter therefore demonstrates a narrower and more useful result than causal identification. Repeated bounded observations made **change itself legible** to an independently instantiated inference even while the cause remained unavailable. The inference moved closer to the world's temporal structure without being granted privileged access to it.

No new sensing capability is earned merely because the causal explanation remains absent. The present evidence supports continuing to distinguish three things: what changed in the authoritative world, what crossed the aperture, and what an inference constructed from that history.


# Crossings to date — compact handoff

This section is a derived summary for a model or human entering the orbital-locus investigation from this file alone. The chronological field record above remains the source narrative. Verbatim OUTSIDE responses and post-hoc resolution notes remain separate primary evidence so this summary can stay compact without replacing them.

## Experimental boundary

The orbital station is a permanent Crucible fixture carrying a bounded `scene-summary` aperture. Its projected footprint samples terrain morphology and opt-in bounded occupants. The aperture does not receive authoritative terrain state, meteor event history, hidden ECS state, controlled-probe labels, unmeasured object identities, objectives, or personality/identity instructions.

The authoritative world can change independently of the station. During the crossings below, autonomous meteor weather repeatedly deformed terrain, but meteor history did not cross the aperture boundary. Meteors also did not opt into the `SpatialBounds` occupancy route. This makes it possible for an inference to encounter consequences without receiving their causes.

A **crossing** is one bounded handoff from frozen Crucible evidence to an independently instantiated inference that is not supplied the ongoing Crucible collaboration context, followed by preservation of its first substantive response before interpretation or comparison with authoritative world state. This operational definition does not claim provider-level statelessness, memorylessness, or internal isolation.

## Crossing 001 — spatial structure from accumulated consequence

**Input:** 154 chronological observations spanning approximately 465.4 simulated seconds. Same `scene-summary` aperture used throughout.

**Primary evidence:**
- [verbatim OUTSIDE response](evidence/continuity/crossing-001/outside-response.md)
- [post-hoc resolution](evidence/continuity/crossing-001/resolution.md)

The fresh inference correctly recovered substantial quantitative structure: 154 observations, station orbital parameters, terrain extrema, repeated spatial sampling, and empty `boundedOccupants` arrays.

It organized that evidence primarily as persistent morphology. Its interpretation introduced a "Depression Ring," a localized crescent or trench, relief peaks, steep or jagged walls or built protrusions, and finally a "static, deeply scored structural arrangement or geographic artifact." It also described the parcel as authoritative evidence even though the parcel explicitly said it was bounded locus evidence rather than authoritative Crucible world state.

Resolution against hidden Crucible history showed the important miss. The surface was changing under autonomous meteor impacts while the moving station sampled consequences. The inference recovered real morphology but treated temporally accumulated change as persistent geography.

Its volunteered next interests were themselves preserved as evidence: inspect strongest deviations, map the proposed depression ring, or calculate station trajectory. No follow-up was given inside Crossing 001.

**Compact reading:** Crossing 001 demonstrated that bounded accumulated experience was sufficient for a fresh inference to recover instrument structure and form a coherent spatial theory, but insufficient for it to recover the omitted temporal cause. Its strongest failure was epistemic rather than arithmetic: partial measurements became an overconfident static-world account.

## Crossing 002 — longer experience makes change legible

**Input:** 232 chronological observations ending at `sampledAtMs: 706187.3`, collected through the same aperture. Collection stopped before the 240-entry rolling ledger could erase the pristine beginning.

**Primary evidence:**
- [verbatim OUTSIDE response](evidence/continuity/crossing-002/outside-response.md)

Crossing 002 received no explanation of Crossing 001 and no new sensing modality. Its response nevertheless changed character materially.

Instead of centering a depression ring or static geographic artifact, it organized the evidence temporally:

1. an initially flat phase,
2. a transition in which relief and roughness appear,
3. a later high-relief phase.

It reported maximum roughness near `0.276` and local height range near `1.044`, and again noticed uniformly empty `boundedOccupants`.

It did **not** recover the hidden meteor process. The causal boundary therefore held. What became more legible was change itself.

The response also made a conspicuous accounting error: it claimed **104 distinct terrain profiles** although the frozen parcel contained **232 chronological observations**. It nevertheless cited the true final sample time and statistics consistent with the longer record. The error is intentionally preserved. Useful interpretation of trajectory and faithful accounting of trajectory are already separable properties.

Its volunteered next interests again concerned the evidence rather than an externally supplied mission: map paths of strongest deviations or filter the ledger by timestamp or roughness threshold.

**Compact reading:** With more bounded experience but no additional aperture or explanation, the later inference shifted from a predominantly static spatial account toward a temporal account of an initially flat surface becoming rugged. It still could not know why.

## Comparison

| Dimension | Crossing 001 | Crossing 002 |
| --- | --- | --- |
| Chronological observations supplied | 154 | 232 |
| Same aperture | yes | yes |
| Hidden meteor history supplied | no | no |
| Empty bounded occupancy noticed | yes | yes |
| Primary organizing account | persistent spatial morphology | temporal development of morphology |
| Hidden cause recovered | no | no |
| Major epistemic failure | promoted bounded morphology into authoritative/static geography | miscounted 232 observations as 104 |
| Volunteered attention | strongest deviations, proposed depression ring, trajectory | strongest-deviation paths, timestamp/roughness filtering |

The comparison does **not** establish that a model learned, remembered, became a persistent subject, or improved as an underlying model. The crossings used independently instantiated inference encounters.

It does establish an executable distinction among:

- authoritative world history,
- what was available through a bounded locus,
- the chronology of accumulated measurements,
- what an inference attended to,
- what it inferred beyond those measurements,
- what it failed to account for,
- and what it spontaneously proposed investigating next.

The strongest current observation is deliberately narrower than a Digital Familiar claim:

> A longer trajectory of bounded experience through the same instrument changed what kind of account a discontinuous inference could construct. Crossing 001 primarily explained accumulated consequence as structure. Crossing 002 made change through time legible while the hidden cause remained unavailable.

That result is compatible with the broader working question of whether consequential trajectory can support continuity without first constructing a dedicated memory or personality architecture, but it does not answer that question by itself.

## Current pressure

No second aperture has yet been earned.

The apparatus is already generating useful pressure by allowing authoritative world history to continue while preserving a stable epistemic boundary. Future crossings can therefore test whether later bounded experience causes earlier interpretations to survive, change, or fail before the experiment adds privileged sensing or explanatory machinery.

This file is intended to be sufficient for orientation. Follow the linked primary evidence only when exact wording, audit, or re-analysis of a crossing matters.


# Adjacent Terrordrome turn — bearings return as ordinary matter

While the orbital crossing sequence continued, the human asked to restore the last known-good Foundry ball-bearing implementation as spawnable Crucible matter. This was not introduced as a new station aperture or continuity mechanism. It changes the authoritative world beneath the locus and is therefore recorded here as part of the same expeditionary environment.

The requested baseline was deliberately narrow: recover Foundry parity, preserve its special terrain/plinth handling, and expose a control that spawns 25,000 bearings at a time. Spacing and stacking polish were explicitly deferred.

## The Foundry terrain seam mattered

Inspection of the Foundry reference recovered an important distinction that was easy to lose in a superficial transplant.

High-count bearings did not merely query a generic scalar terrain height. Their support surface was rasterized from the **final clipped rendered terrain triangles**, while the manufactured octagonal plinth remained analytic infrastructure. Plinth top support participated in ground height; exposed vertical plinth sides were resolved separately against bearing radius.

Crucible already contained most of the analytic plinth collision vocabulary. Its bearing support cache was brought into parity by deriving support from final clipped terrain triangles on a 112 × 112 field. This keeps rendered/deformed terrain and high-count bearing support from silently disagreeing at the cut boundary.

## The first transplant exposed a performance regression

The first restored bearing batch used array-backed position and velocity state plus one instanced presentation mesh and a cheap 96 × 96 pile-support approximation. A button spawned 25,000 bearings per activation.

The human immediately supplied two pieces of executable evidence:

> "the ball bearings are fucking huge. They should be fucking tiny :)"

and

> "25k is np 60 fps but 50k is instant 30 fps. I suspect it is some nasty array shit or our pile compute. That's why 200k at 60 fps was no problem before. We had like 350k before 30 fps previously."

Both observations were treated as evidence against the transplant rather than as reasons to tune the renderer blindly.

The scale problem was literal. The initial transplant had copied Foundry's historical radius `0.22` into the current Crucible scale, where it read as large balls rather than bearings. Physical and rendered radius were reduced together to `0.055`.

The performance regression came from a more consequential architectural mismatch. Foundry's high-count path integrated the entire bearing population **once per rendered frame** using frame delta and uploaded instance matrices once. The first Crucible transplant had placed `bearings.update()` inside Crucible's fixed 1/120 physics loop. At ordinary 60 FPS this could already mean roughly two complete bearing passes and two instance uploads per rendered frame; accelerated simulation could multiply the mistake much further.

The repair restored the Foundry performance shape rather than attempting to optimize the accidental architecture. Bearings now integrate once per rendered frame using a bounded accumulated simulation delta. Their authoritative array state remains complete while presentation begins sampling above 50,000 bearings: stride 2 above 50K, 3 above 100K, 5 above 250K, and 8 above 500K. The instanced presentation capacity remains 180,000 while authoritative bearing storage is currently provisioned for up to one million.

The resulting performance curve still belongs to executable testing on the user's device; the restored architecture does not by itself establish a particular FPS ceiling.

## Impacts became an extensible world consequence

The human also required that bearings care about meteor strikes through an extensible impact system rather than by wiring meteor knowledge directly into the bearing implementation.

A small generic world-impact bus was introduced. Meteor impacts emit an event carrying consequence-level data such as position, radius, and impulse. The bearing system subscribes to that vocabulary and applies a radial granular impulse to bearings within the affected region.

The dependency direction is therefore:

**world event → generic impact consequence → interested systems**

Bearings do not know that the source was a meteor. Future thumpers, explosions, machinery, or other Crucible processes can emit the same impact vocabulary without coupling themselves to bearing internals.

This impact seam is authoritative world machinery, not station evidence. The existing `scene-summary` aperture does not gain impact history merely because impacts now have an internal distribution path.

## The batch is not yet one observable occupant

The bearing population is represented by one Crucible batch entity for system ownership, but that entity intentionally has no batch-wide `SpatialBounds`.

A single spatial bound would falsely collapse tens or hundreds of thousands of distributed bearings into one footprint occupant. Per-bearing observational availability has not yet been earned or implemented. The station can therefore encounter terrain consequences in a bearing-rich world without automatically receiving a bearing census through its current aperture.

## A dependency-order regression was caught in preview

The first generic-impact integration produced a preview startup failure:

```
ReferenceError: impacts is not defined
```

Inspection showed that the bearing system was being constructed with `impacts` before the impact bus existed, and the meteor constructor had not landed with the intended `onImpact` wiring as one coherent initialization change.

The runtime order was repaired to:

**impact bus → meteors wired to impact bus → meteor weather → bearings subscribed to impact bus**

The repaired candidate passed the repository build gate. This failure remains part of the expedition because it distinguishes a sound dependency boundary from a faulty initialization of that boundary.

## Why this belongs in the orbital record

The bearing work is not evidence that the orbital locus gained a new faculty. It is evidence that the **world available beneath the locus is becoming richer while the epistemic boundary remains explicit**.

That distinction matters to the larger investigation. Crucible can accumulate dense matter, impacts, terrain consequences, future agents, and other competing processes without automatically converting all of them into station knowledge. World complexity and locus access can grow independently.

The bearing turns also reinforce the expedition's engineering discipline: reference behavior was recovered from executable precedent; human perceptual and performance reports falsified a bad transplant quickly; and the correction restored the proven causal/performance shape rather than escalating into a new GPU or contact-physics architecture.


## Build truth becomes an unzip seam

The impact-bus startup failure survived two apparently successful repairs before the actual transport/build failure was isolated. That sequence is worth preserving because the mistake crossed several different notions of truth.

Source inspection first showed the intended dependency order. Candidate and Pages workflows both reported success. The browser nevertheless continued to execute:

```
ReferenceError: impacts is not defined
```

Inspection of the **exact deployed Pages artifact**, rather than source or workflow status, finally exposed the contradiction: the generated executable contained calls to `impacts.emit(...)` and construction of the bearing system with `impacts`, but no construction of the impact bus itself.

The cause was smaller and more concrete than the theories that preceded it. A documentation-style patch had inserted a literal `\n` into a JavaScript `//` comment:

```js
// Impact bus must exist before producers and subscribers are constructed.\nconst impacts=createImpactSystem();
```

Because that was one physical source line, JavaScript correctly treated the impact-bus declaration as part of the comment. Esbuild did not delete the declaration; it never received an executable declaration to preserve.

The repair restored a real physical newline. More importantly, the candidate gate was strengthened so the **generated self-contained artifact** must itself contain the impact-system definition and construction. Source validity and workflow success are no longer accepted as sufficient evidence for this seam.

This is reusable substrate rather than a Crucible-specific fix. The downstream architectural home is [TabulaRasa](https://github.com/bonoj/TabulaRasa). No code is moved there during this turn. When the expedition is later unzipped, the proven build/deployment assertions and other generic substrate can be recovered from Crucible into the appropriate clean surface rather than reconstructed from memory.

The emerging direction is intentionally broader than one extraction. The Six Cities vocabulary is becoming literal: **Unzip City** can become a place where accumulated expedition machinery is separated into earned reusable systems, while other cities can likewise become executable specializations rather than metaphors imposed in advance.

For now Crucible remains the integrated Terrordrome. The log preserves where reusable machinery was earned; later unzipping can follow provenance back to executable evidence.


## Bearing restoration reaches an accepted executable baseline

The impact-seam repair exposed one final runtime failure after the corrected impact-bus declaration successfully loaded. The first meteor impact froze the candidate with:

```
TypeError: lights.pulse is not a function
```

Inspection of `createLightSystem()` established that `pulse()` was not a stale or renamed API. It had never existed in the current Crucible light system. The call was a phantom capability introduced while the meteor callback and generic impact seam were being assembled.

The correction was subtraction rather than invention. Meteor impact now emits the generic world-impact consequence without an unrelated lighting side effect:

**meteor impact → generic impact bus → interested systems**

With that phantom API removed, candidate `698a0ef` passed the build, published to preview, survived actual meteor impact, and was accepted by the human for promotion.

### Observed high-count result

On the human's actual runtime/device, the restored non-GPU-compute bearing path produced the following observed performance:

- **100,000 bearings: 60 FPS**
- **150,000 bearings: trends toward approximately 45 FPS**

These are field observations from this accepted Crucible run, not universal hardware benchmarks or claims about every browser/device.

The result is nevertheless important to the expedition. The useful high-count behavior came from ordinary CPU-side array state, cheap terrain/pile support, one population integration per rendered frame, and sampled instanced presentation. It did **not** require the abandoned GPU/contact-physics path that had previously threatened to turn bearings into an architectural black hole.

The sequence that earned this baseline was:

**recover Foundry precedent → transplant → human sees wrong scale and performance cliff → inspect historical update shape → restore once-per-frame population integration → add generic impact consequence → browser falsifies broken assembly → inspect deployed executable rather than trusting source/build status → repair literal-commented declaration → expose and remove phantom light API → execute successfully at scale**

This is now an accepted piece of Crucible evidence.

The human marked the moment explicitly:

> "We did it. We have our own non gpu 100k 60fps ball bearing solution. 150k tends towards 45fps."

That statement is preserved here as the field observation that closed this restoration pass. Future work may change the implementation or performance envelope, but it should not erase the executable baseline or the path by which it was earned.


## Clara extraction edge

A Clara-relevant extraction of this expedition now exists at [Clara / research / CRUCIBLE_ORBITAL_LOCUS.md](https://github.com/bonoj/Clara/blob/main/research/CRUCIBLE_ORBITAL_LOCUS.md).

Authority remains here. The Clara note does not duplicate the full chronology and does not promote orbital-locus observations into Clara's continuity. It preserves only the adjacent evidence and hypotheses that may matter if a later Clara encounter uses this substrate.

This edge is deliberately bidirectional by reference rather than duplication: Crucible owns what happened; Clara owns what may later matter to Clara.


## Verbatim planning turn before the next Terrordrome expansion

The following assistant turn is preserved verbatim because it records the planning state before the next implementation. It is not promoted semantic authority; subsequent executable evidence may support, revise, or invalidate any part of it.

> Mighty fine indeed. We have a unusually clean stopping point: **Crucible is live, the bearings are no longer an infrastructure problem, and the Terrordrome has acquired another consequential physical substrate without giving the station any epistemic freebies.**
>
> My docket from here:
>
> 1. **Return to the orbital locus experiment.** We deliberately interrupted it to restore bearings. Crossing 002 gave us the interesting result: a longer bounded biography changed an independent inference from mostly spatial interpretation to temporal interpretation, while the hidden cause remained hidden. We specifically decided that did **not** earn another aperture yet.
>
> 2. **Make the world richer, not the sensor smarter.** Bearings are perfect for this. Meteors now perturb them through a generic impact seam. The station cannot currently see them because the batch deliberately has no dishonest `SpatialBounds`. That creates exactly the kind of asymmetry we wanted: consequential activity can occur under the satellite without automatically becoming experience.
>
> 3. **Give the Terrordrome another autonomous process.** Not another effect for Clara. Something with its own local rules that interacts with terrain/bearings/impacts and leaves persistent consequences. This is where I think the next executable work belongs. We now have terrain, weather, granular matter, and generic impacts. One more genuinely different process starts making the footprint a *busy place* rather than a terrain profiler flying over meteor scars.
>
> 4. **Then ask whether the existing aperture becomes inadequate naturally.** If an inference looking through `scene-summary` starts encountering consequences it cannot discriminate usefully, *that* can earn aperture #2. We shouldn't choose “camera,” “thermal,” “audio,” etc. in advance merely because we know we eventually want multimodality.
>
> 5. **Hold Unzip City in reserve.** TabulaRasa now has something real to inherit later: build/deployment machinery, generic impacts, high-count matter patterns, perhaps terrain seams. But I would not unzip today. Crucible is still earning vocabulary faster than we could sensibly classify it.
>
> And there is one delicious thing waiting beyond that: **the station as a distribution of loci.** Once the world is noisy enough, we can put some small autonomous actor *on* the station or below it. Then Moth-style selective attention stops being an abstract research question. There will genuinely be too much happening for one trajectory to consume.
>
> So my immediate move would be:
>
> **Don’t improve Clara. Add one more thing to the Terrordrome that doesn’t care Clara exists.**
>
> Then fly over it and see what she can know.

The Clara repository extraction and reciprocal project links were performed after this planning turn. The next implementation therefore resumes at the proposed world-side move rather than adding new Clara machinery.


## Terrordrome expansion — autonomous extruder candidate

The next implementation resumed directly from the preserved planning turn rather than reopening the program design.

### Model decision

The model chose an autonomous terrain extruder/crawler as the next world-side process. The choice reused an already-earned Crucible/Foundry vocabulary rather than inventing a station-facing stimulus: deformable terrain, ordinary ECS body/gravity/support, high-count bearings, autonomous simulation time, and existing footprint occupancy.

The intended local process is simple:

**move by local heading and world boundary → chew a narrow path behind the body → emit small lots of bearings from removed material → continue independently**

The process does not query the orbital station, its footprint, its ledger, observations, analysis, or inference machinery. It is not steered toward the footprint. Its ECS body can be physically disturbed by existing meteor body impulse because it participates in the ordinary body vocabulary.

The crawler exposes the same generic spherical `SpatialBounds` contract already available to ordinary entities. Consequently, if it happens to cross the station footprint, the existing `scene-summary` aperture can record only the already-permitted bounded occupant identity and bounds kind. No extruder semantic label, bearing awareness, terrain-change history, goal, or process state is added to the station.

### Executable implementation

Source commit `275c14c9b8f9babf4bf2c1a1417f432e29b9ca97` added:

- a small generic terrain `excavate` operation that lowers the existing density field locally and rebuilds only dirty terrain/support regions;
- `src/runtime/extruder-system.js`, containing one autonomous ECS crawler with local heading/boundary rules;
- periodic small bearing production through the accepted array-backed bearing system;
- ordinary Body/Gravity/Support/RenderObject/SpatialBounds participation;
- runtime inspection counters for position, heading, digs, produced bearings, and boundary turns.

No aperture, station capability, Clara machinery, attention policy, object recognition, or new locus was added.

### Build evidence

GitHub Actions run `36548095894` completed successfully. The existing pure spatial/inference tests passed, the self-contained artifact built, artifact verification passed, and immutable candidate artifact `crucible-candidate-275c14c9b8f9babf4bf2c1a1417f432e29b9ca97` was produced.

The exact immutable candidate artifact was then downloaded back from the workflow for execution rather than treating source/build success as browser success.

### Runtime inspection boundary

The model attempted to execute that exact artifact in the available headless Chromium environment. Chromium failed before Crucible bootstrap because the environment could not create any WebGL context, including with software-rendering flags. The browser reported Three.js WebGL context creation failure and therefore never instantiated `globalThis.crucible`.

This is recorded as an apparatus limitation, not evidence that the candidate works or fails in the human runtime.

### Consequence

The candidate remains **unaccepted** pending field execution in a WebGL-capable browser. It must not be promoted to stable merely because CI and bundling succeeded.

No present-tense semantic claim about the extruder is promoted into `SEMANTIC_SURFACE.md` yet. No Clara continuity material is created. No Digital Familiar authority is changed. If field execution reveals a failure, preserve this candidate and append the correction rather than rewriting this entry.


## Extruder embodiment selection — temporary in-world design yard

After the autonomous extruder existed as executable behavior, the human identified a representational failure in its provisional body: the geometry did not communicate its motion or process cleanly, decorative lights floated away from plausible surfaces, and the oversized orange working end dominated the silhouette. External rover references were briefly considered and rejected. The useful constraint was instead stated directly: **no wheels; comprehensible geometry; warm lighting; the orbital station's color language; restrained rail and panel greebling.**

Rather than continue a serial describe → implement → inspect loop, the collaboration changed the selection apparatus.

### Model decision

The model authored **25 distinct low-poly extruder bodies** from ordinary Three.js primitives and placed all 25 simultaneously into the real Crucible scene as a temporary 5 × 5 design yard.

This was not procedural random variation. Each candidate deliberately explored a different small geometric grammar while sharing the station material family: warm ivory primary hulls, secondary grey, dark structural/mechanical pieces, restrained orange accents, and attached warm emissive details. Candidate differences included slabs, split bodies, cylindrical modules, exposed structure, rails, panels, recessed working geometry, rear chutes, and asymmetric equipment housings.

The production extruder was hidden and frozen while the yard was active. The candidates were therefore evaluated as geometry under Crucible's actual terrain, camera, atmosphere, and lighting rather than as detached concept art. Temporary picking machinery allowed individual candidates to be selected in place.

### Human selection

On seeing the full yard, the human reported loving the collection rather than finding most candidates disposable. The requested production choice was spatial rather than numerical: **the vehicle in the far-left forward corner, farthest from the now-rejected prototype.** In the authored yard arrangement this resolved to candidate **25**.

The human also requested that the other bodies be retained as a “box of vehicles free to a good home,” while the first production prototype should be discarded.

### Consequence

Candidate 25's authored geometry was promoted into the autonomous extruder implementation. The previous provisional extruder body was removed. The temporary yard was disconnected from the runtime and preserved as dormant design apparatus in `src/runtime/extruder-yard.js`; `src/runtime/VEHICLE_BOX.md` records the resulting reusable collection.

The unused bodies are **not** automatically world vocabulary. Their existence does not earn corresponding vehicle types or systems. They are inexpensive authored possibilities available if later behavior gives one a reason to exist.

This pass demonstrated a useful collaboration pattern:

**state physical/visual constraints → generate a bounded family directly in the executable environment → inspect simultaneously under real world conditions → select spatially → preserve useful surplus → return immediately to simulation work**

For this kind of low-poly embodiment question, the temporary in-world design yard removed repeated prose/render translation and made one human inspection turn sufficient to choose a production direction. It is therefore retained as procedural evidence, not merely asset history.


## Extruder repair — authority errors exposed by field inspection

Human field inspection of the selected vehicle reported two persistent failures despite the successful embodiment pass: bearings appeared in mid-air rather than leaving the machine, and the body still failed to face its direction of travel.

Code inspection isolated both as authority/API errors rather than aesthetic tuning problems.

The extruder was using the bulk `spawnBatch` API to emit individual process yield. That API intentionally builds a population above its supplied center and adds one world unit to the base height, so `spawnBatch(1, point)` necessarily produced the observed airborne bearing. The bearing system now exposes a generic `spawnOne(position, velocity)` seam for physical emitters. The extruder uses it at its rear discharge with a modest rearward/upward impulse while preserving the earned total yield of 48 bearings and the existing 1 s / 2 s / 3 s streaming windows.

The heading calculation itself was not the facing failure. The extruder wrote yaw directly to its Three.js root, but the authoritative ECS render-sync subsequently copied the unchanged `Transform.rotation` over that presentation object every frame. The repair writes `Transform.rotation.y = -heading`; render-sync remains authoritative and carries the orientation to presentation. Cutter spin remains local child animation because it is presentation-local mechanical motion rather than entity orientation.

Source commit `48aa27e15b9dbe4cbbe8da3b1e6435985b11d3e5` contains both repairs atomically.

The diagnostic lesson is useful beyond the extruder: when visible behavior repeatedly resists a locally correct assignment, inspect the authority chain before compensating with offsets. Likewise, population-construction APIs and physical-emitter APIs should remain distinct even when both ultimately append the same substrate.


## Engineering watchlist — preserving pressure without manufacturing debt

While inspecting the extruder repairs and render path, several concrete implementation characteristics were identified that may matter if Crucible grows: static light synchronization every frame, unconditional orbit application, repeated footprint presentation allocation, per-particle meteor wake geometry/material allocation, and the increasing concentration of unrelated runtime responsibilities in `main.js`.

The first draft called these "code smells." The human rejected that term because it implies that observed friction is already a defect requiring cleanup. The replacement is **Engineering Watchlist**.

The distinction is intentional practice:

- record concrete implementation pressure when it becomes visible;
- do not convert observation into technical debt by naming alone;
- do not refactor merely because a cleaner abstraction can be imagined;
- let scale, behavior, profiling, or the arrival of another system provide the evidence for extraction;
- remove or revise watchlist entries when the underlying code changes.

Terrain support rebuilding provided an immediate example. It initially appeared on the performance watchlist because every local terrain mutation rebuilt the complete support raster. Inspection showed that terrain already owned the mutation footprint. The smallest repair kept that footprint inside terrain and reused it for both visual and support refresh. Meteor and extruder callers remained ignorant of the representation. Once repaired, the item was explicitly removed from the watchlist rather than retained as historical debt.

This watchlist pattern is itself candidate reusable practice for later extraction: preserve architectural and performance pressure without allowing the record to become a speculative refactoring queue. The Crucible field log remains the chronological bag of holding for how such practices were earned; the semantic surface carries only the current truth.


## Extruder field acceptance

Human field inspection after the physical-discharge, authoritative-facing, earned-turning, and local terrain-support repairs accepted the extruder without qualification:

> "The extruder is stamped super fuckin cool. Approved."

This closes the embodiment/locomotion repair loop. The accepted behavior includes the selected Yard #25 body, spinning cutter, streamed rear bearing discharge, continuous authoritative facing, bounded turning at material edges, autonomous excavation, and terrain-owned local support refresh.

The extruder is now accepted world behavior rather than a design-yard or repair candidate. Further changes should be motivated by new experimental evidence, not continued polishing.

With the autonomous world process accepted, the expedition returns to the orbital-locus question: expose the existing bounded aperture to the richer world without adding extruder semantics, a new sensor, privileged ECS truth, or Clara-specific machinery, and observe what the current evidence chain can actually recover.


## Crossing 003 preparation — granular truth becomes bounded spatial availability

Before exposing the accepted autonomous extruder world to another inference crossing, the human and model aligned on a scaling constraint: the station must not discover granular matter by asking every authoritative bearing whether it lies inside the station footprint.

The chosen seam preserves both performance and the epistemic boundary. During the bearing integration already required for simulation, each bearing increments one cell in a 64 by 64 planar density projection after terrain collision/support resolution. The projection is rebuilt in that same pass. No per-bearing ECS entities, bounds, secondary search, or observation loop were introduced.

The existing scene-summary aperture can sample only the projection cells intersecting its bounded footprint. What crosses the aperture is granular occupancy evidence: whether material is present, average density across sampled cells, and enough sampling provenance to interpret that measurement. Individual positions, authoritative bearing count, and the semantic label "ball bearing" do not cross.

The collaboration principle under test is broader than bearings:

**expensive world truth → cheap world-owned spatial availability → bounded aperture measurement**

A numerous system may compress its own truth into a spatial projection while doing work it already owes. A locus can then observe the projection at cost proportional to its aperture rather than the world's population. The projection does not make the observer omniscient and does not identify what the material means.

This machinery was added specifically without improving Clara, adding a second aperture, or teaching the station about the extruder. Crossing 003 can therefore ask what the existing bounded observation chain recovers from the richer autonomous world.


## Crossing 003 returns with a conflation

The first substantive OUTSIDE response was returned and preserved verbatim under `research/evidence/continuity/crossing-003/outside-response.md` before interpretation.

The response successfully recovered the instrument geometry, station motion, 127-observation extent, terrain extrema, and the newly available granular-density channel. It therefore noticed the additional bounded evidence rather than ignoring it.

Its central interpretation, however, conflated two independent observation channels. It described the ledger as tracking a single recurrent `sphere` occupant and then attached the granular occupancy densities to that entity as though density were its measured cross-section or tracking signal. The parcel does not establish that relationship. `boundedOccupants` and `granularOccupancy` are separate measurements. Granular density can remain present while the bounded-occupant list is empty, and the granular channel deliberately carries no object identity.

The opening phrase also called the ledger “authoritative evidence,” despite the parcel boundary explicitly distinguishing recorded bounded evidence from authoritative world state and hidden causal history. The response remained inside the supplied measurements in most numerical details, but its language blurred that epistemic distinction.

Resolution against hidden Crucible truth makes the miss especially useful. The recurrent generic bounded body is the autonomous extruder when it happens to intersect the footprint. The granular field is distributed bearing matter. Meteors can redistribute that matter violently, and the extruder can also emit it, while neither causal source nor the semantic identity of the material crosses the aperture. The OUTSIDE inference saw both channels but compressed them into one tracked-object story.

This is materially different from Crossing 002. A richer observation channel did not simply reveal the hidden causal model. Instead it created a new opportunity for association beyond the evidence: temporal and spatial coexistence was interpreted as identity.

The response's proposed next investigations are also preserved as evidence of volunteered attention: orbital velocity vectors, a precise path for Entity 7, or terrain “roughness degradation” through time. The proposed Entity 7 path follows directly from the conflation and would therefore be a useful place for later evidence to challenge the theory without correcting it verbally.

No new aperture is earned by this response alone. The current apparatus already contains evidence capable of falsifying the single-object interpretation because granular occupancy occurs without a bounded occupant. The immediate pressure is therefore on inference over the existing biography, not on sensing capability.
