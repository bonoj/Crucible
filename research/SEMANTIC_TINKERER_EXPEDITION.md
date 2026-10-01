# Semantic Tinkerer Expedition 🛠️

## Status

**Open expedition.**

This document owns the current investigation. It is not a specification for a Blender replacement, a fixed editor, a universal asset format, or a promise that every idea below will survive executable contact.

Crucible's ordinary authority still applies:

- executable reality decides what actually happens;
- `SEMANTIC_SURFACE.md` owns present-tense truths once machinery is earned;
- `DIRECTIONS.md` preserves the compressed forward handle;
- this expedition owns the question, working vocabulary, evidence, failures, and finish line while the investigation is active.

## Why this exists

A recurring collaboration pattern has become concrete enough to test.

The human often does not need to specify a desired artifact precisely. A capable model can externalize uncertainty as several executable possibilities; the human can recognize an interesting reality much more cheaply than they could have described it; the survivor becomes the substrate for the next semantic operation.

A representative interaction emerged naturally:

> Give me N bodies for a floater.  
> H.  
> Give me N floaters with various appendages.  
> Q.  
> Rig N floaters and animate them delightfully.  
> None, try it like...  
> Perfect.  
> R. Moving on.

The letters and words are examples, not a command language. The important structure is:

**generate consequential alternatives → human discrimination → preserve survivor → branch at a new semantic dimension → reject/correct cheaply → accept → continue**

The proposed instrument is a **semantic tinkerer**: an ECS-based workbench in which geometry, entities, rigging, IK, animation, behavior, and eventually other fabrication vocabularies can accrete through use.

## Core bet

**Specification is expensive. Recognition is cheap.**

Instead of requiring the human to operate every underlying tool or translate an intuition into increasingly exact instructions, the model can manufacture enough inspectable realities for human judgment to steer by recognition.

This is not permission for the model to assert success. Alternatives must be executable enough for their relevant consequences to be experienced.

The persistent object should be the **semantic entity**, not any single representation of it.

## The entity is not the mesh

ECS gives the investigation a useful starting separation: identity can persist while representations and capabilities change.

A floater might eventually earn distinctions such as:

- body;
- geometry;
- material;
- appendages;
- joints;
- rig;
- constraints;
- pose;
- animation;
- behavior;
- internal machinery;
- controls;
- history.

None of these are required in advance. If a distinction never becomes useful, the system does not need to invent an architecture for it.

Likewise, selecting alternative H does not merely mean “keep mesh H.” It establishes lineage:

**generation → alternatives A…N → human collapse H → H becomes ancestry for subsequent work**

Rejected alternatives may remain recoverable as provenance when useful, but they should not burden the live entity merely because they once existed.

## Multiscale semantic coherence

The same entity may be useful across orders of magnitude without acquiring a different identity.

A drone could be:

- at one scale, a cube;
- at the next, roughly ten polygons with readable orientation;
- at the next, roughly one hundred polygons with articulated machinery;
- closer still, a machine with bays, joints, ports, cargo, and internal entities;
- closer again, a surface controller that becomes an executable automation game.

The numbers are illustrative. The claim is not “use these LODs.”

The stronger possibility is:

> **same semantic entity, different consequential resolutions**

Traditional level of detail changes graphical representation. Semantic tinkering may change the amount and kind of reality made executable while preserving identity and causal coherence.

**Resolution follows attention, not ontology.**

Distance is only one possible source of attention. A task, failure, question, interaction, or deliberate inspection may demand deeper resolution even when the camera does not move.

## Inpainting and outpainting

Use these as working handles, not implementation commitments.

### Inpainting

Increase consequential resolution **inside** an already earned semantic boundary.

Example:

**floater → appendage → joint → actuator → linkage → bearing → wear surface → fastener**

The descent should elaborate the existing entity rather than quietly replace it with an unrelated detailed asset.

### Outpainting

Extend consequential context **outside** an already earned semantic boundary.

Example:

**floater → group → maintenance ecology → habitat → logistics → settlement → terrain → region**

The surrounding world should be built around consequences the entity already has rather than treating the original entity as decorative scenery.

### Round-trip test

The strongest multiscale test is not zooming in.

It is:

**coarse entity → inpaint several orders of magnitude → change something deep → compact outward → observe the appropriate coarse consequence**

If a deep modification matters at the larger scale, that consequence should survive. If it does not matter there, the coarse representation should not be forced to carry irrelevant detail.

This implies that compaction is not merely polygon reduction. Detailed machinery may compact into effective state, parameters, capacities, faults, history, or other earned summaries.

## Geometry is only one resolution axis

More detail must not silently mean more triangles.

Potentially independent axes include:

- geometry;
- physical behavior;
- articulation;
- control;
- internal simulation;
- animation;
- history;
- interaction;
- software;
- agency.

A drone surface becoming a working automation game is therefore not a category error. It is a possible increase in **behavioral and control resolution** of the same entity.

The expedition should not assume all axes can or should share one mechanism.

## Why ECS

ECS is already a lightweight, model-legible way to keep identity, state, capability, and systems separable without requiring a giant object hierarchy.

That makes it a promising substrate for tinkering, but ECS is not sacred. The experiment should retain it only where it makes semantic mutation and consequence easier to inspect.

The desired direction is not “build an ECS editor.” It is:

**semantic intention → bounded model operation → executable consequence → human discrimination → retained lineage**

## What not to build yet

Do not begin by recreating conventional Blender UI.

Do not predeclare:

- a universal geometry language;
- a universal rig format;
- a bone editor;
- a timeline;
- a modifier stack;
- a node graph;
- a hierarchy inspector;
- a fixed prompt grammar;
- a complete procedural-modeling DSL;
- a general-purpose animation package;
- a universal multiscale simulation architecture.

Any of those may be earned later. Starting with them would answer the question before the experiment runs.

Direct manipulation, camera controls, inspectors, or conventional specialist tools are welcome when a concrete failure makes them the cheapest useful instrument.

## Relationship to existing Crucible directions

### 🐉 Reality aperture

🐉 externalizes uncertainty so executable observation can discriminate among plausible explanations.

🛠️ applies a sibling move to creation: externalize plausible constructions so human judgment can discriminate among consequential possibilities.

Both prefer cheap realities over long speculative argument.

### 🪨 Semantic shaping

If terms such as *floater*, *appendage*, *rig*, *delightful*, *inpaint*, or an earned name begin reliably invoking useful distinctions without restating their implementation, 🛠️ becomes a natural field test for 🪨.

The expedition should notice this without turning every useful noun into a formal primitive.

### 🧬 Semantic reflow

🧬 asks whether pressure from material can precipitate the representation needed to think with it.

🛠️ may be one such precipitation. It should not be assumed to subsume 🧬.

### 🐝 Situated software

A controller that becomes executable software when attention descends into it is adjacent to 🐝, but this expedition does not need to solve situated software in order to succeed.

## First executable pressure

Begin **miniature**.

Do not start with a cathedral, a humanoid rig, or a generalized editor.

Use a small entity whose identity is easy to preserve and whose form tolerates variation. A floater or similarly simple Crucible-native creature/machine is a good load unless executable evidence suggests a cheaper one.

The first useful loop should be capable of something approximately like:

1. request N body alternatives;
2. experience them together;
3. select one cheaply;
4. request N variations along a new semantic dimension such as appendages;
5. preserve ancestry from the selected body;
6. select again;
7. ask for rigging/animation alternatives;
8. reject the entire generation with a semantic correction if the explored dimension is wrong;
9. accept a survivor;
10. retain it as a coherent entity for further work.

Do not optimize for beautiful assets. Optimize for whether the loop makes **thought-to-consequence-to-judgment** cheap.

## First multiscale pressure

After one entity has survived enough tinkering to possess meaningful identity, test one inward expansion.

The cheapest strong test is likely:

1. preserve a coarse recognizable representation;
2. inpaint one part into materially richer geometry or behavior;
3. make a change that has an observable consequence;
4. return to the coarse representation;
5. verify that identity survived and the relevant consequence propagated.

Only then consider outward expansion or several nested scales.

A successful experiment does not require continuous zoom or seamless rendering. Discrete scale crossings are sufficient if identity, lineage, and consequence remain inspectable.

## Instrumentation and provenance

Preserve enough evidence to answer:

- What semantic request produced this generation?
- Which alternatives existed?
- Which alternative survived?
- What ancestry does the current entity have?
- Which human correction killed or redirected a generation?
- What representation/capability was added at a scale crossing?
- Which deeper state was compacted when returning outward?
- Which coarse consequences survived?
- What did the model invent that the human never explicitly specified?

Do not turn provenance into ceremony. The human should not have to maintain it manually.

Git remains appropriate for durable expedition history. Runtime lineage may require a smaller local representation if the executable loop earns one.

## Operational structure

Treat the work as a sequence of **crossings**, not implementation phases.

For each crossing:

1. state the smallest capability or uncertainty under pressure;
2. preserve competing implementation realities only as long as useful;
3. construct the cheapest executable loop that can discriminate;
4. let the human experience it;
5. record the selection, rejection, surprise, or failure;
6. keep only machinery and vocabulary that the crossing earned;
7. update `SEMANTIC_SURFACE.md` when a mechanism becomes present-tense truth;
8. append a concise evidence entry below.

Temporary UI, geometry, logging, or generation machinery may disappear. Evidence should not.

## Evidence ledger

Append new entries chronologically. Prefer concrete executable observations over retrospective explanation.

### Opening — semantic tinkering becomes a direction

The collaboration recognized an existing workflow: model-generated alternatives allow the human to steer by recognition rather than exhaustive specification. A proposed floater sequence made the loop concrete: body alternatives, appendage alternatives, rigging/animation alternatives, whole-generation rejection with semantic correction, acceptance, and continuation.

No executable semantic tinkerer exists yet.

### Opening — multiscale entity

The collaboration then recognized that a miniature entity could buy orders of magnitude of additional structure in both directions while remaining semantically coherent.

The strongest example was a drone that may be a cube at one scale, a low-poly body at another, a richer articulated machine at another, and eventually expose a working automation game on its own surface.

This reframed detail from graphical LOD into potentially independent consequential resolutions and produced the working handles **inpainting**, **outpainting**, and **resolution follows attention, not ontology**.

No executable multiscale round trip has yet been demonstrated.

## Finish line

This expedition reaches a natural first close when executable evidence demonstrates all of the following without requiring the human to operate low-level geometry/rigging tooling:

- one semantic entity survives at least three successive generate/discriminate/retain crossings;
- at least one crossing changes the semantic dimension rather than merely producing cosmetic variants;
- one entire generation can be rejected and redirected without rebuilding the accepted ancestry;
- a rigging, IK, animation, or comparable behavioral capability is earned through use rather than installed only as a demo;
- the entity survives at least one inward resolution crossing;
- a change made at deeper resolution can be compacted outward while preserving identity and any consequence relevant at the coarse level;
- lineage and current authority remain inspectable enough for a cold model to distinguish what exists from what was merely tried.

Do not require outward world-building, continuous scale traversal, a general-purpose editor, or production-quality asset export for the first close.

If the simplest executable evidence falsifies the proposed interaction model, close or rewrite the expedition rather than manufacturing features to save it.

## Opening question

**Can a human and model fabricate a coherent entity across form, articulation, behavior, and scale primarily by generating executable possibilities and collapsing them through human recognition, while preserving enough lineage and consequence that the entity remains the same thing as its resolution changes?**
