# Transport — Crucible Expedition

**Status:** unopened executable expedition; ready for implementation  
**Started:** 2026-09-30  
**Local home:** Crucible research and runtime  
**Parent direction:** [DIRECTIONS.md — Scientific Workbench](../DIRECTIONS.md)  
**Relevant precedent:** [MALLEABLE_MIDDLE_EXPEDITION.md](./MALLEABLE_MIDDLE_EXPEDITION.md)  
**Epistemic precedent:** [ORBITAL_LOCUS_SPATIAL_COLLABORATION.md](./ORBITAL_LOCUS_SPATIAL_COLLABORATION.md)  
**Possible field material:** [TEMP_GEOLOGICAL_DIVERSITY_EXPEDITION.md](./TEMP_GEOLOGICAL_DIVERSITY_EXPEDITION.md)

> **Transport**
>
> **Put something somewhere. Where does it go?**

## Why this expedition exists

Crucible is beginning a Scientific Workbench direction: use bite-size applied physical science as real load for a configurable, model-forward laboratory.

The goal of this expedition is **not** to claim a domain-edge scientific contribution. The local scientific question must be real enough that the physics can disagree with intuition, but the longitudinal object of study is the workbench:

**Can a human and a model rapidly construct a small faithful physical sandbox, encounter a genuine representational bottleneck, and earn the instruments needed to reason about it?**

Transport is the first crossing because it appears across many physical sciences and because Crucible already wants a material regime that is not merely another population of ball bearings.

Crucible's existing high-count bearings are useful precisely because they are a different regime. They may become obstacles, sediment, carried solids, deposited solids, or something else if an experiment earns that interaction. The transported medium should not inherit bearing ontology merely because bearings are already performant.

## Governing question

**What is the cheapest physically meaningful representation of one thing moving through another, and what instruments are actually needed to understand where it went?**

The first implementation question is deliberately smaller:

**Can Crucible produce one inspectable transport event whose behavior is determined by an authoritative physical substrate rather than by its visualization?**

Do not begin by answering “fluid simulation.”

Candidate representations include, but are not limited to:

- scalar concentration fields;
- velocity or flux fields;
- parcels or tracers;
- shallow-water approximations;
- cellular flux;
- particles used as samples rather than molecules;
- hybrid representations.

None is preferred until implementation, execution, and inspection provide evidence.

## The scientific-workbench invariant

Whatever machinery exists underneath, its meaningful state and controls must be exposed through an **intuitive, high-control semantic surface for the model**.

This is sacrosanct for the expedition.

The intended interface is not “the model can edit JavaScript.” Source editing remains an implementation escape hatch. The scientific surface should let a model reason and act in the vocabulary of the experiment.

Examples of the eventual interaction quality, only where the physics has earned the concepts:

- inject material here;
- change the source strength;
- make this region less permeable;
- place a probe here;
- show what crossed this boundary;
- section through this region;
- freeze the physical evolution while preserving evidence;
- compare this run with the previous run;
- expose the history that produced this current state.

These examples are not an API specification and must not all be implemented in advance.

**High control is not high authority.**

- Physics owns consequence.
- The semantic surface owns accessibility.
- Instruments expose evidence.
- Interpretation remains distinguishable from measurement.
- Provenance preserves how evidence and interpretation were produced.
- A model may request or configure an experiment; it may not assert the result into existence.

## Inherited Crucible authority

Read current [README.md](../README.md) and [SEMANTIC_SURFACE.md](../SEMANTIC_SURFACE.md) before executable work.

Accepted stable `index.html` remains the ground truth for promoted Crucible behavior. Source under `src/` produces candidates through the repository's existing build/preview workflow. Candidate transport behavior is not stable behavior until it has been experienced and deliberately promoted.

Do not silently weaken existing authority boundaries to make Transport convenient.

In particular:

- the authoritative world remains distinct from presentation;
- deterministic state should remain inspectable where Transport owns the rule;
- presentation must not invent physical state;
- derived analysis must identify the evidence it consumed;
- new access to world truth must be explicit rather than smuggled through rendering or debug machinery;
- current terrain test depth must not be increased merely to rescue a transport representation;
- the existing high-count bearing regime should continue to coexist without multiplying its cost through a new per-bearing fluid solver unless evidence specifically earns such coupling.

## What Transport inherits from previous expeditions

### 1. Observe → build → experience → record

Do not replace executable investigation with speculative architecture.

Inspect the existing world, build the smallest candidate that can answer the current question, experience the running result, and record what actually happened. A surprising executable consequence outranks the prose that predicted it.

### 2. Silo the machinery; do not silo the consequences

Transport should initially own a small, legible physical state rather than spreading its implementation through unrelated systems.

When transport interacts with terrain, bearings, boundaries, or later field apparatus, let the consequence occur through ordinary authoritative seams. Avoid a generalized cross-system framework until repeated interactions earn one.

### 3. The Malleable Middle

The workbench should minimize translation between experienced scientific friction and executable correction.

A human or domain expert should be able to say what is physically or representationally wrong without first locating the responsible code. The model should inspect the machinery, make ordinary engineering decisions, construct the candidate, and return to executable evidence.

When a specialist tool is eventually better than Crucible, handoff is success rather than failure. The workbench is not required to replace mature solvers, meshing systems, visualization suites, or laboratory instruments.

### 4. Bounded evidence and provenance

Transport inherits the orbital-locus distinction between world truth, availability, observation, downstream analysis, and presentation.

It does **not** automatically inherit the orbital station as its observer.

The first scientific sandbox may use probes, sections, samples, tracers, integrated flux measurements, or another instrument arrangement if the physical question earns them. Whatever instrument exists should have an explicit route from authoritative state to immutable or otherwise inspectable evidence.

Do not give an analysis routine unrestricted world truth merely because a scientist “could have measured it.”

### 5. Capacity is not authority

An instrument being capable of exposing a quantity does not mean every model-facing surface automatically receives it.

A malleable scientific interface may have enormous expressive control while preserving narrow evidence boundaries. This distinction is part of the experiment, not UI decoration.

### 6. Determinism and replay where owned

If Transport owns a source schedule, boundary condition, initial state, material map, or parameter set, make those conditions recoverable enough that a meaningful run can be repeated.

Do not claim deterministic replay for unrelated Crucible weather or world processes unless they are explicitly captured or isolated.

A comparison between two runs is scientifically useful only if the changed and unchanged conditions are knowable.

## First specimen

Begin embarrassingly small.

A useful first specimen contains only enough structure to make this question nontrivial:

**source → medium/terrain → transported quantity → obstacle or heterogeneity → destination or escape**

Ask:

**Where did the injected material go?**

The answer should not be encoded in the visualization or prescribed path.

Prefer a geometry in which direct visual inspection of the source and destination is insufficient to understand the transport history. The specimen may be synthetic. It does not need to begin as groundwater, a river, or any named real-world field system.

The first successful specimen should establish:

1. an authoritative transport state;
2. an initial/boundary condition that can be recovered;
3. at least one meaningful interaction with geometry or material structure;
4. a presentation that does not secretly determine the physics;
5. enough evidence to answer at least one quantitative or falsifiable question about the run;
6. a semantic operation surface that lets a model configure or interrogate the experiment without implementation-level surgery.

## Separate the vocabularies

Keep four layers distinct even if the first implementation is tiny.

### Physical vocabulary

What exists and evolves in the authoritative sandbox?

Examples might eventually include concentration, velocity, permeability, porosity, pressure, saturation, temperature, source, sink, boundary, carrier, obstacle, or phase.

Do not install terms merely because they are common in transport literature.

### Observational vocabulary

What can an instrument actually measure or expose?

Examples might include a point sample, section, integrated flux, tracer crossing, residence time, or history.

A rendered color field is not automatically a measurement.

### Control vocabulary

What can the human/model deliberately change?

Examples might include source position, injection amount, boundary condition, material property, geometry, probe location, or run time.

Controls should map to authoritative experiment state, not presentation-only effects.

### Interpretive vocabulary

What may be inferred from evidence?

Examples might eventually include recirculation, preferential path, breakthrough, bottleneck, stagnation, mixing, or anomalous run.

Interpretations should remain downstream of evidence and should not silently become physical labels.

## Instruments must be earned

Do not begin by implementing the expected scientific dashboard.

Start with the smallest evidence surface that can expose the first run. When the human/model cannot answer a useful question, record the discrepancy before solving it.

Examples of potentially earnable instruments include:

- tracer history;
- section plane;
- point probe;
- flux surface;
- residence-time view;
- breakthrough curve;
- connectivity highlight;
- difference view;
- run comparison;
- temporal ghost;
- uncertainty or ensemble view.

The sequence matters:

**question → insufficient evidence → named friction → instrument → new evidence**

If an instrument is added before its need is encountered, treat it as provisional rather than earned substrate.

## Performance boundary

Transport must coexist with Crucible rather than replacing it with a laboratory demo.

The existing CPU-authoritative bearing batch has already demonstrated roughly 100k bearings at 60 FPS on the human collaborator's device, with roughly 150k tending toward 45 FPS. Preserve that regime as a useful coexistence constraint.

This does not require Transport itself to run at comparable element counts. It means the first representation should be chosen with awareness that Crucible already spends meaningful CPU and render budget elsewhere.

Prefer representations whose scientific state can be richer than their rendered presentation. Presentation sampling, adaptive visualization, sparse instruments, or field rendering are acceptable if they do not falsify the authoritative state.

Do not turn 100k bearings into fluid molecules.

## Relationship to geology

Geology is one field load, not the definition of Transport.

The existing Geological Diversity expedition asks whether a small causal geological vocabulary can generate a large perceptual vocabulary. If that work is crossed with Transport, its structures can become physically consequential: layers, basins, channels, resistant regions, fractures, and heterogeneous material can alter where something goes.

That crossing should happen when the simple transport substrate is ready to be stressed by structured media, not because the first specimen needs scenic complexity.

A later experimenter may inspect an ensemble of generated geological worlds while a bounded instrument sees only one instantiated world. This can recover the useful part of the earlier “external observer” intuition without inventing an N-dimensional observer or branch ontology.

## Relationship to existing scientific tooling

Transport is not attempting to replace mature domain software.

Existing porous-media and transport ecosystems already demonstrate several relevant truths:

- serious solvers separate numerical machinery from visualization and pre/post-processing;
- interactive tools are valuable precisely because subsurface and transport state can be difficult to inspect directly;
- reproducibility requires recoverable model conditions and metadata;
- ensemble comparison can itself require specialized visual analysis;
- domain tools expose spatial properties, boundary conditions, sources, sinks, wells, and other meaningful controls rather than asking users to manipulate solver internals.

Crucible's distinct question is whether a **malleable, model-mediated semantic surface** can make the construction and adaptation of a small scientific sandbox dramatically cheaper while retaining explicit authority and provenance.

This section is orientation, not a dependency mandate. Do not import a professional solver merely to imitate professional complexity.

## Initial implementation discipline

Before writing Transport code:

1. inspect the current terrain, ECS, bearing, time, build, preview, and semantic-surface seams that materially constrain the first specimen;
2. choose the smallest representation capable of a falsifiable transport event;
3. state what is authoritative, what is presentation, and what is measured;
4. state the initial and boundary conditions in recoverable form;
5. build one specimen;
6. execute it;
7. inspect its behavior and performance;
8. ask the governing question using only the evidence actually exposed;
9. let the first real observational failure determine the next instrument.

Routine engineering choices belong to the implementing model. Stop for the human when the next step genuinely requires perceptual judgment, device-specific runtime evidence, domain knowledge not present in the repository, or deliberate stable promotion.

## Success conditions for the first crossing

Transport 001 has crossed its first boundary when executable evidence supports all of the following:

- something is transported through or across something else;
- its path/outcome is generated by an authoritative physical representation rather than a scripted visual route;
- the run is recoverable enough to identify its material conditions, controls, and relevant provenance;
- at least one nontrivial transport question can be answered from exposed evidence;
- the model has a semantic, high-control way to configure or interrogate the experiment;
- that semantic control cannot directly author the desired scientific result;
- the experiment has encountered at least one genuine representational or observational friction point;
- the response to that friction is either an earned instrument or a documented reason not to build one;
- the implementation remains compatible with Crucible's existing world and authority boundaries;
- the expedition record distinguishes what the executable demonstrated from what remains hypothesis.

A beautiful liquid renderer is neither necessary nor sufficient.

## What is not earned

Do not begin by building:

- a general CFD engine;
- Navier–Stokes because “fluid” implies it;
- a universal finite-volume framework;
- WebGPU merely because large fields might eventually benefit from it;
- SPH or position-based fluids merely because they look liquid;
- one particle per molecule or bearing-as-water;
- erosion;
- sediment coupling;
- multiphase flow;
- reactive chemistry;
- groundwater-specific ontology;
- geological generation;
- a universal scientific dashboard;
- autonomous CLARA science behavior;
- an infinitely extensible observer;
- an ontology of all transport phenomena;
- a cross-domain solver abstraction.

Any of these may become reasonable later. None is required to answer the first question.

## Record format as the expedition develops

Append material crossings chronologically rather than rewriting the opening brief to make later results look inevitable.

For each meaningful run, preserve at least:

- build or commit identity;
- physical representation;
- initial and boundary conditions;
- semantic operations used;
- instruments available;
- observed result;
- performance evidence where relevant;
- discrepancy or surprise;
- what changed next and why.

If a later run falsifies an earlier interpretation, preserve both and append the correction.

## Immediate handoff

A new model arriving here should be able to begin without reconstructing this conversation.

Start with current Crucible authority, inspect the implementation seams named above, and build the **smallest authoritative transport specimen** that can make “where did it go?” an empirical question.

Do not stop at a representation survey or architecture plan.

Implement, execute, inspect, diagnose, and refine until the first crossing either satisfies the success conditions or reaches a boundary that genuinely requires human evidence.

The first tool should be whatever the first physical discrepancy earns.
