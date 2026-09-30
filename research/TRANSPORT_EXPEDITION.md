# Transport — Crucible Expedition

**Status:** active sequential expedition; planning the first executable crossing  
**Started:** 2026-09-30  
**Local home:** Crucible research and runtime  
**Parent direction:** [DIRECTIONS.md — Scientific Workbench](../DIRECTIONS.md)  
**Relevant precedent:** [MALLEABLE_MIDDLE_EXPEDITION.md](./MALLEABLE_MIDDLE_EXPEDITION.md)  
**Epistemic precedent:** [ORBITAL_LOCUS_SPATIAL_COLLABORATION.md](./ORBITAL_LOCUS_SPATIAL_COLLABORATION.md)  
**Possible field material:** [TEMP_GEOLOGICAL_DIVERSITY_EXPEDITION.md](./TEMP_GEOLOGICAL_DIVERSITY_EXPEDITION.md)

> **Transport**
>
> **Put something somewhere. Where does it go?**

## Expedition operating protocol

This expedition runs **one informative step at a time**.

The model leads the experimental sequence. The human collaborator deliberately remains one step behind the apparatus and serves as the model's external eyes and hands where repository access cannot supply perceptual, device, or physical evidence.

For each turn:

1. **Orient from accumulated evidence.** Read the current expedition record and relevant executable state rather than reconstructing intent from memory.
2. **Name the uncertainty.** State the smallest thing the next move is intended to distinguish or reveal.
3. **Choose one informative intervention.** Prefer a move that can change what we believe about the representation, instrument, or workbench. Do not build several speculative layers at once.
4. **Predict before observing.** Record what should happen if the current model of the system is adequate, including an obvious failure signature where possible.
5. **Execute where model authority is sufficient.** Repository inspection, ordinary engineering, candidate construction, deterministic probes, and analysis belong to the model.
6. **Ask the human for evidence only at the real boundary.** Give one concrete assignment: what to do, what to look for, and what evidence to return. Do not ask the human to choose ordinary implementation details.
7. **Record the result before adapting.** Preserve surprise, negative evidence, and disagreement rather than rewriting the prior expectation.
8. **Let the result select the next move.** New machinery and instruments are earned by observed friction.

This is adaptive experimental design in spirit: accumulated evidence determines the next useful intervention rather than a long fixed implementation plan. It is not a claim that the expedition is performing formal Bayesian optimization. Sequential experimental methods are useful precisely because measurements can guide later experimental settings toward informative regions; here the same discipline is used qualitatively until a quantitative design earns itself.

### Human/model roles

**Model / Clara**

- owns expedition sequencing;
- explains the methodology and current uncertainty;
- inspects and changes the repository within existing authority;
- chooses ordinary implementation details;
- distinguishes prediction, observation, and interpretation;
- updates this record when evidence or decisions materially change it;
- stops only at a genuine human evidence or authority boundary.

**Human / john**

- acts as external eyes and hands;
- experiences candidate behavior on the target device;
- performs specifically requested interactions that the model cannot perform;
- reports what happened, including unexpected behavior, without needing to diagnose implementation;
- retains deliberate authority over stable promotion and any boundary the repository assigns to the human.

The collaboration should therefore feel inverted from ordinary assistant use: **Clara asks the next experimental question; john returns evidence from the world.**

## Expedition log

### Turn 0 — Science S0 boundary check

**Question:** Does the new Science boundary actually preserve the pre-experiment world while presenting a quiet bench?

**Prediction:** Entering 🔬 hides/suspends the extruder along with the other noisy systems; leaving 🔬 restores the extruder to its pre-entry enabled state.

**Human evidence:** The extruder disappeared on Science entry but did not return on Science exit.

**Result:** FAIL. This was a control-boundary regression, not transport evidence. A prior implementation change had incorrectly removed the extruder's enabled state from the Science snapshot/restore path after interpreting “go away bucket” as permanent removal.

**Correction:** Restored the extruder enabled-state snapshot and exit restoration. The intended invariant is now explicit: the extruder is hidden and suspended while Science is active, and restored when Science exits.

**Follow-up evidence:** The extruder no longer broke across the toggle, but it remained visible throughout Science mode.

**Diagnosis:** The suspension state was correct; visibility was being written at the wrong authority layer. The extruder changed its Three.js root directly, but Crucible's render-sync system authoritatively derives render visibility from the entity's `Transform.visible` every frame. Render sync therefore restored the root to visible immediately.

**Correction 2:** Extruder suspension now changes `Transform.visible`. Rendering follows authoritative ECS state instead of competing with it.

**Earned workbench lesson:** For ECS-rendered entities, experimental isolation must operate on authoritative entity state. Direct presentation mutation is transient when render synchronization owns the corresponding property.

**Human re-check:** PASS. The extruder disappears during 🔬 and returns on exit.

**Turn 0 result:** S0 is accepted as a trustworthy reversible laboratory boundary for the purposes of beginning Transport.

**Refinement:** Science suppresses autonomous meteor weather, not the meteor instrument itself. Deliberately called meteors remain available as controlled perturbations while 🔬 is active. This preserves the distinction between removing ambient noise and removing experimental capability.

**Next:** Choose the first authoritative Transport representation.

### Turn 1 — First authoritative transport candidate

**Uncertainty:** What is the smallest authoritative state that can move through Crucible, respond to existing terrain, and leave inspectable evidence without prematurely claiming fluid physics?

**Chosen intervention:** A 48×48 conserved scalar mass field over the Crucible surface. Each cell owns transported mass. Fixed transport steps redistribute a bounded fraction of that mass to lower cardinal neighbors according to authoritative terrain elevation plus a local mass-derived head term. The octagonal material boundary is no-flux because cells without finite terrain support do not receive flux.

This is intentionally not a CFD solver, shallow-water solver, or particle liquid. The rendered points are presentation only; they do not own motion or mass.

**Semantic operations:** `crucible.transport.reset()`, `inject(amount,x,z)`, `setSource({x,z,rate})`, and `inspect()`. Inspection exposes source conditions, grid/cell size, injected and stored mass, conservation error, wet-cell count, maximum cell mass, and executed step count.

**Prediction before observation:** On Science S0's flat terrain, continuous injection should spread approximately symmetrically and therefore be scientifically boring. A deliberate meteor crater should alter authoritative terrain and break that symmetry, producing capture or routing without Transport containing any crater-specific rule. If the field ignores the terrain change, or if mass conservation visibly/numerically fails, this representation has failed its first coupling test.

**Candidate implementation:** transport system introduced at commit `50f67cf`; wired into Science mode at `d3f891f`. Meteor control presentation also changed to ☄️ at `18859ac`.

**Evidence boundary:** Human target-device observation is now required before adapting the representation.

**Human observation 1:** No blue transport field was perceptible on S0. Human specifically questioned whether the presentation Y coordinate was below the terrain surface.

**Diagnosis:** Y sampling was checked first. S0 terrain is at approximately +0.15 while transport presentation was placed above sampled terrain (~+0.185 or higher); the plinth top at −1.1 was not occluding it. The failure was instead observational: all 2,304 grid cells were rendered at the same point opacity, including dry cells, while wetness produced only a modest color change. The authoritative field could evolve without producing a legible wet/dry distinction.

**Correction:** No physical rule changed. Dry cells are now moved out of presentation; only cells with authoritative mass above the display threshold are visible, positioned with a larger offset above sampled terrain and a stronger blue signal. Candidate correction: `47af650b`.

**Interpretation:** This is the expedition's first observational friction. It does not yet earn a new scientific instrument; it establishes that visualization must expose state contrast before it can serve as evidence.

**Human observation 2:** A deliberate meteor crater was physically consequential to the transported field, but the displayed field was not dense/expressive enough to read the redistribution confidently.

**Result:** The first terrain-coupling prediction passes qualitatively: Transport responds to authoritative terrain mutation without crater-specific logic. The quantitative/interpretive question remains unanswered because presentation does not expose mass concentration strongly enough.

**Turn 1 iteration selected:** Preserve the physical representation unchanged. Encode authoritative cell mass more strongly in presentation so accumulation and depletion are perceptually distinct before earning a separate scientific instrument.

**Specimen correction requested from human observation:** A continuously observable transport experiment needs persistent elevation head rather than a flat domain that simply wets outward. S0 Transport now raises one authoritative terrain hill and places the continuous source near its crown. The transport solver receives no hill-specific path or behavior; it continues to sample ordinary terrain height. Meteor impacts can therefore alter the downstream terrain while fresh material continues entering upstream.

This changes the specimen's initial geometry, not the transport law. The hill is constructed through a new terrain-owned `raise` mutation so its consequence is available to every system through the same authoritative terrain seams.

**Human observation 3:** PASS. With the continuous source on raised terrain, the displayed field has a definite flow character across multiple viewing angles. Source, descent, and spreading are perceptible as an ongoing process rather than merely a wet domain.

**Interpretation:** Persistent elevation head repaired the specimen without changing the transport law. The representation now supports a continuous perturbation test: deform downstream terrain while fresh material continues to arrive from the source.

**Prediction before next observation:** A meteor crater placed downstream on the slope or just beyond its foot should continuously reorganize incoming mass around and/or into the depression. If the visible field does not develop a persistent concentration/path response, stronger density presentation is insufficient and a dedicated measurement instrument is earned.

**Human observation 4:** The field responds to impact terrain: material moves radially away from the impact region. However, transport is too fast and spreads too uniformly; local density is too low for the behavior to read as fluid or as a coherent stream.

**Result:** Terrain coupling passes again, but the first flux law fails the intended transport regime. Its memoryless redistribution toward every lower neighbor behaves too diffusively: it rapidly equalizes mass instead of preserving directional flow structure.

**Decision:** Do not add a measurement instrument yet. The ambiguity is not merely observational; the authoritative dynamics themselves are producing an over-diffusive regime. Preserve the scalar mass field, but replace memoryless neighbor repartition with a minimal stateful flux/momentum representation. The next candidate should retain direction long enough for dense downhill streams to form and for terrain changes to deflect them rather than simply causing immediate radial redistribution.



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


### Turn 1 acceptance specimen — watershed

Human acceptance criterion was strengthened before crossing: Transport Phase 1 should begin from recognizable geology rather than an isolated hill. The plinth should behave as a tiny watershed with hills, shallow river/channel structure, multiple continuous springs, and transport capable of leaving the plinth edge. The human should be able to create and observe continuous flowing behavior across that terrain.

A deterministic watershed specimen now composes ordinary terrain-owned `raise` and `excavate` mutations. Three continuous sources are configured as springs. Transport contains no river, hill, spring, or watershed-specific routing rule; it continues to respond to sampled terrain and persistent directional flux.

The previous closed grid boundary was identified as incompatible with the acceptance criterion. Unsupported destinations at the material edge are now open outflow: transported mass crossing them is removed from stored field mass and accumulated in `mass.escaped`. Conservation inspection therefore distinguishes stored mass, escaped mass, and numerical error.

Presentation sampling is independently controllable at sparse, medium, and dense levels. This changes only which authoritative wet cells are drawn; it does not change transport grid resolution, mass, flux, source rates, or dynamics. The UI control cycles `▦`, `▦▦`, and `▦▦▦`.

**Turn 1 remains open pending human target-device acceptance:** recognizable continuous flow through the watershed and sustained drainage off the plinth edge. If accepted, bundle the Turn 1 representation and evidence before opening the next scientific question.


## Turn 1 checkpoint — transport earned, liquid not yet earned

This checkpoint freezes the evidence before changing the presentation representation again.

### What executable evidence has established

The first implementation used a 48×48 authoritative surface mass field coupled to Crucible terrain. The initial memoryless local-flux rule was rejected after human observation: it responded causally to terrain mutation, including meteor impacts, but redistributed mass too quickly and uniformly. It behaved like aggressive diffusion and did not preserve coherent flow structure.

The replacement retained scalar mass while adding persistent horizontal directional flux. Terrain slope accelerates that flux; damping removes momentum gradually. Human target-device observation then established that recognizable flowing behavior could be created. Terrain mutation remained physically consequential without crater-specific or river-specific transport rules. This is evidence for a useful terrain-coupled transport substrate, but not yet evidence that the substrate adequately represents liquid.

A deterministic watershed acceptance specimen subsequently composed ordinary terrain-owned uplift and excavation into uplands and shallow channels, configured multiple continuous sources as springs, and opened the material boundary so transported mass can leave the plinth. Outflow is authoritative accounting: mass leaving supported terrain is accumulated as `mass.escaped`, rather than silently disappearing or being clamped at the edge.

The presentation sampler was expanded from three provisional levels to 25 deterministic levels. The `🌊` control cycles 1 through 25 and wraps to 1. Level 25 draws the complete wet-cell presentation; lower levels draw monotonically smaller deterministic subsets. Sampling density changes presentation only. It does not change authoritative grid resolution, transported mass, flux, source rates, or dynamics.

### Representational friction discovered

The human can see motion and can deliberately create flowing behavior, but the current presentation consists of flat points distributed over terrain. Even at increased display density it does not read convincingly as a continuous liquid. This is a different failure from the rejected diffusive flux law: the current dynamics can produce directional transport, while the embodiment makes the material appear as samples rather than a continuous free surface.

Therefore Turn 1 remains open under the strengthened hydrology-facing acceptance criterion. Do not call the current field water merely because it is colored blue or moves downhill.

### Next controlled experiment — free-surface embodiment

Preserve the current authoritative mass and directional-flux dynamics for the next experiment. Change presentation only.

Replace the point-cloud embodiment with a continuous free-surface mesh derived from terrain elevation plus local transported depth/mass. Dry regions should not produce liquid surface. Wet neighboring cells should form contiguous geometry. Existing directional flux should inform procedural surface motion or texture/normal advection so visible motion follows authoritative flow rather than an unrelated animation.

The governing question is deliberately narrow:

**Is the current failure primarily a physical-dynamics failure, or are we observing an adequate transport field through the wrong embodiment?**

Prediction: if contiguous geometry plus flow-informed surface motion makes springs, channels, pooling, drainage, and terrain perturbation read as liquid without changing the transport law, then presentation was the immediate bottleneck and the current field remains useful physical substrate. If the result still reads as a sliding blue sheet, carpet, or otherwise implausible liquid, stop polishing it and replace the dynamics with a more appropriate liquid solver family.

The renderer must not invent wetness, routes, accumulation, or direction absent from authoritative state. Appearance may reveal the field; it may not author the scientific result.

### Solver families held in reserve

Do not implement these merely because they are listed. They are explicit options if the free-surface experiment shows that current dynamics are insufficient.

- **Depth-averaged / shallow-water flow:** water depth plus horizontal momentum over terrain. Strong candidate for rivers, runoff, pooling, overtopping, drainage, and hydrology generally. This is the leading replacement if the current law fails after proper embodiment.
- **Height/flux field with continuous free-surface rendering:** the minimal family nearest the current implementation. It may be sufficient if the current dynamics survive the embodiment test.
- **Stable Fluids / 2D incompressible Navier–Stokes:** useful for velocity-driven mixing and advected scalar/species fields; a stronger candidate for chemical soups than for terrain-first watershed hydrology.
- **SPH or other particle/Lagrangian liquids:** naturally supports blobs, splashes, and free surfaces but adds particle cost/noise and is not the default merely for visual plausibility.
- **FLIP/PIC or full 3D grid CFD:** capable volumetric approaches, but currently disproportionate to the bite-sized Crucible scientific-workbench goal.
- **Depth-averaged rheological/thermal flow:** candidate family for lava, mud, and related flows where viscosity, yield behavior, cooling, or solidification matter.
- **Shallow-ice / depth-integrated ice flow:** glaciology should not be treated as water with a slower constant. Ice thickness and constitutive/stress physics can reuse spatial-field machinery while earning their own physical vocabulary.

The emerging possibility is therefore not one universal fluid solver. A more credible shared substrate may be spatial fields, terrain coupling, boundaries, sources, conserved quantities, instruments, provenance, and semantic controls, with domain-appropriate evolution laws layered above them.

Candidate family map:

**shared field/workbench machinery → hydrology: shallow water → glaciology: shallow ice → vulcanology: depth-averaged rheological/thermal flow → chemical soup: velocity field plus advected species**

This is a hypothesis about reusable machinery, not yet Crucible architecture.

### Turn accounting

A turn is an acceptance crossing, not an individual build. All scalar-field, visibility, hill/source, meteor-coupling, directional-flux, watershed, open-boundary, and presentation-density work above remains iteration inside **Turn 1**. Turn 1 crosses only when the strengthened acceptance criterion is met or is explicitly revised from evidence.

The immediate next implementation is therefore one controlled intervention: **continuous free-surface embodiment, unchanged authoritative transport dynamics.**


### Turn 1 free-surface specimen — dam break

The human identified a stronger embodiment test: do not ask a slow spring-fed field to prove liquidness. Begin with a dammed river/reservoir and break the dam at startup, with several downstream channels available to receive the release.

This specimen is intentionally finite rather than continuously injected. Terrain constructs an upland impoundment, retaining ridge, shared downstream throat, and multiple competing excavated channels. Transport mass is preloaded into the reservoir as authoritative state. At experiment start the retaining ridge is physically lowered through terrain authority; Transport receives no dam, breach, river, or channel-specific routing instruction.

The point presentation is replaced by a contiguous free-surface mesh derived from wet authoritative cells. Surface elevation is terrain elevation plus a bounded mass-derived depth term. A small procedural vertical perturbation is informed by simulation step and local flux speed; it is presentation only and cannot create wetness, route mass, or change transport state. The existing 🌊 1–25 control now changes rendered surface sampling/tessellation density rather than point count; authoritative dynamics remain unchanged.

**Prediction:** If the existing directional field is adequate for this regime, the finite release should present an advancing body that exits the breach, chooses/splits among downstream channels, pools where terrain demands, and drains at open boundaries. If the mesh instead reveals a spreading/sliding sheet without a credible advancing front or channel behavior, the representation experiment has done its job and a shallow-water/depth-momentum solver is earned. Do not tune the transport law to rescue that outcome before recording it.


**Human observation — dam-break free-surface candidate:** The release flows and responds to downstream terrain, but the rendered liquid floats above the terrain as a raised, undulating plane rather than meeting it at a shoreline. Startup lags severely. The release also moves implausibly fast.

**Diagnosis:** These are three separable failures.

1. **Free-surface topology/presentation:** the first mesh candidate emits a quad only when all four sampled corners are wet and raises each rendered wet vertex above terrain by a fixed offset plus a mass-derived term and procedural wave. It therefore cannot form a terrain-intersecting wet/dry shoreline and explicitly creates an air gap. The procedural sine perturbation amplifies the floating-sheet appearance. This is a renderer defect, not evidence of hovering authoritative mass.
2. **Specimen construction cost:** the dam/channel builder composes many calls to terrain `raise`, `excavate`, and `lower`. Each mutation immediately rebuilds affected marching geometry and bearing-support derived state. Sequential channel carving therefore repeats expensive rebuild work during startup. Initial geology needs a batched mutation/rebuild path before this becomes a reusable workbench pattern.
3. **Uncalibrated transport speed:** directional velocity is currently advanced in grid-cell displacement per fixed 35 ms transport step, capped at 0.82 cells/step. With 18 world units across 48 cells this permits approximately 8.8 world units/second. The earlier qualitative hill experiment did not constrain physical time scale. The dam-break specimen exposes that omission.

**Interpretation:** The free-surface experiment falsifies the hypothesis that embodiment alone is the remaining obstacle. A better shoreline mesh can repair contact and batched terrain construction can repair load cost, but the current transport law lacks an earned physically meaningful water-depth/momentum time scale and dam-break/front behavior. Do not rescue it with arbitrary speed constants or additional visual motion.

**Decision:** Preserve the current scalar/directional transport implementation as evidence and potentially useful generic transport machinery. For hydrology-facing Turn 1, the next dynamics candidate is a depth-averaged shallow-water formulation with explicit water depth and world-space horizontal momentum/flux. The renderer should derive free-surface elevation from terrain + water depth and construct wet/dry boundaries that meet terrain rather than hovering above it. Terrain specimen construction should be batched so initial geology incurs one rebuild phase rather than one rebuild per sculpting primitive.


**Correction — the first dam-break terrain was not a valid dam-break apparatus.** Human inspection found that the supposed reservoir reads as a divot on a hill with only a mild concavity in front, and released transport ignores the shallow excavated “river” and spreads broadly across the terrain.

Inspection of the construction confirms the criticism. The specimen used a broad radial uplift, a circular excavation inside it, and another radial uplift as the supposed retaining ridge. That does not establish a transverse barrier across a drainage path or an upstream basin whose controlling low outlet is the breach. The downstream channels were made from repeated shallow circular excavations (~0.18–0.30 depth) laid across terrain whose broad relief was much larger (~2.35 uplift), so the global gradient could dominate the intended channels. Calling those forms a dam, reservoir, and river overstated what the executable geometry actually contained.

**Experimental consequence:** Do not use this run to evaluate whether either the current directional solver or a future shallow-water solver follows a river. The hydraulic apparatus itself failed validation. The observed broad spreading is compatible with the actual height field and therefore does not isolate solver quality.

**New prerequisite before the next liquid run:** validate the dry terrain as a hydraulic landscape. The next specimen must have (1) a genuine upstream basin, (2) a transverse retaining barrier, (3) a localized breach lower than the remaining barrier, (4) a downstream thalweg/channel network whose bed is materially lower than adjacent banks, (5) multiple downstream branches with deliberate relative elevations, and (6) at least one outlet that reaches the open plinth edge downhill. Geometry-only probes or sampled height profiles must demonstrate those relationships before transport mass is released.

This dry validation is part of the scientific-workbench discipline: a named feature is not accepted because the builder intended it. The executable field must contain the causal geometry implied by the name.


## Tangential crossing — bucket of liquids, geology first

Do not force the first transport representation into a liquid verdict. Preserve it as **Liquid Candidate A**: a scalar mass field with persistent directional flux, terrain coupling, open-boundary accounting, semantic controls, and several known presentation/time-scale limitations. It has demonstrated transport. Its fitness for liquid remains unresolved because the first hydraulic specimen was invalid and the first free-surface renderer was defective.

Candidate A stays in a **bucket of liquid/transport representations** to be compared later against other earned candidates rather than progressively mutated until it resembles whatever the current test expects. Candidate families already held in reserve include shallow-water/depth-momentum, incompressible velocity/advection fields, particle/Lagrangian approaches, depth-averaged rheological/thermal flows, and domain-specific ice formulations. A candidate may ultimately prove useful outside ordinary liquid: fog or atmospheric layers, advected fields, orbital/celestial field presentation, or other continuous-media problems. Such uses must earn their own physical interpretation; shared machinery does not imply shared physics.

### Why Transport now moves into geology

The failed dam apparatus exposed a prerequisite. Comparing transport representations is meaningless if the terrain cannot reliably pose a hydraulic question. Transport therefore remains the parent expedition while the active experimental edge moves tangentially into **geologic substrate**.

This is not yet the broader Geological Diversity expedition and does not attempt scenic geological taxonomy. The immediate question is narrower:

**Can Crucible construct and verify terrain whose causal height relationships are rich enough to make transport choose?**

The substrate should earn a small composable vocabulary from executable relationships. Candidate forms include basin, divide/ridge, valley or thalweg, channel bed, bank, saddle/pass, escarpment, confluence, branch, and open outlet. These names are accepted only when sampled terrain demonstrates the relationship implied by the term.

The first target remains hydraulically useful but is evaluated dry. Construct a terrain with an upstream catchment, meaningful relief, a downstream valley network with multiple branches, and at least one downhill outlet at the plinth boundary. A dam can then be introduced as a barrier *across* an already-valid drainage path rather than used to manufacture the drainage geometry itself.

### Geologic-substrate discipline

1. Build terrain without transport mass.
2. Batch terrain edits before expensive derived-geometry/support rebuilds where possible.
3. Expose terrain height through semantic probes rather than relying on visual naming.
4. Verify longitudinal profiles: intended channels descend toward their outlets except where a deliberate basin/barrier exists.
5. Verify cross-sections: channel beds are lower than adjacent banks.
6. Verify divides: neighboring catchments are separated by higher terrain.
7. Verify basins and saddles by their controlling escape elevations.
8. Verify an outlet reaches unsupported/open boundary through a downhill path.
9. Only after the dry substrate passes these checks introduce a transport candidate.
10. Compare candidates against the same validated substrate where scientifically appropriate.

This creates a reusable experimental asset: **geology first, bucket of liquids second.** The terrain becomes controlled load; liquid candidates become replaceable hypotheses.


## Candidate A annotation — scalar carrier field

The first Transport representation remains in the material/transport bucket rather than being discarded or continuously modified until it passes a liquid test.

**Executable evidence already earned:** Candidate A stores a conserved scalar quantity over space, couples its evolution to sampled terrain, carries persistent directional flux, supports sources and finite initialization, accounts for material leaving open boundaries, and can expose the authoritative state independently from presentation. Human observation established that it can produce recognizable directional flowing behavior and that terrain mutation can alter that behavior. It has not earned the claim that it is a liquid solver.

A useful conceptual correction is to treat its scalar quantity as a **generic carried quantity** rather than intrinsically as water. Plausible future loads include concentration, fog/smoke or atmospheric density, dye, pollutant, suspended material, temperature-like transported quantities where the governing law is appropriate, and multiple overlapping species fields. These are hypotheses for later experiments, not capabilities established by the present implementation.

The representation may also generalize from a surface field to overlapping volumetric scalar fields. Multiple scalar quantities can coexist at one spatial location while a vector field supplies directional transport. Rich authoritative field state need not be rendered as particles or voxels; slices, volumes, iso-surfaces, sparse tracers, or physical objects responding to the field can provide evidence.

### Discrete matter crossing — bearings as probes and cargo

Crucible's CPU-authoritative ball bearings suggest a particularly strong future crossing between continuous fields and discrete rigid matter. A bearing can sample local continuous state while retaining its own mass, inertia, gravity, collision, and trajectory. A carrier field should exert forces rather than simply overwrite bearing velocity. This creates experimentally useful distinctions between a passive tracer and a massive transported object.

Potential phenomena include buoyancy-like response, drag, drift, settling, collection, stranding, escape, and transport of particulate cargo. The bearings can simultaneously serve as physical participants and unusually legible probes of an otherwise invisible field. None of those couplings are implemented or accepted yet; their value is that they give Candidate A concrete future falsification targets.

This also suggests a reusable workbench boundary:

**continuous field state ↔ force/momentum exchange ↔ discrete rigid matter**

### Where scalar fields stop being enough

The thought experiment “fire a ball bearing at jello” exposes a useful boundary. A scalar occupancy/density field can say how much material exists locally, but jello must retain deformation history/reference structure and support shear/restoring stress. A credible impact requires momentum exchange, local compression/shear, propagation through the medium, rebound/oscillation, and potentially damage or fracture. That requires constitutive/deformation state beyond a scalar carrier field.

Candidate future material families may therefore include elastic or viscoelastic continua, lattice/soft-body methods, XPBD-like interactive formulations, MPM-like grid/material-point methods, granular representations, and specialized fluid/ice/lava laws. Do not collapse these into one universal solver merely because they can share spatial-field, instrumentation, provenance, or semantic-control machinery.

A useful future apparatus is consequently **same bearing, same launcher, same specimen geometry, different material law**. Fog, water, viscous liquid, gel, granular material, and ice should distinguish themselves through executable consequence rather than labels. This is a direction, not the current Transport task.

### Active edge returns to dry geology

Candidate A is now parked. Do not tune its liquid appearance or dynamics while the geologic substrate remains inadequate.

The immediate work returns to the dry terrain prerequisite established above. The next executable specimen should earn a small hydraulic-geology vocabulary from sampled height relationships before any transport candidate is introduced. Start with one coherent watershed rather than geological diversity for its own sake.

Minimum target relationships:

- an upland divide separates drainage directions;
- an upstream catchment descends into a recognizable valley;
- a thalweg is lower than its adjacent banks along sampled cross-sections;
- tributary branches descend toward a confluence;
- the main channel continues downhill from confluence to an open plinth outlet;
- a basin, if present, has a measurable controlling saddle/outlet elevation;
- later, a dam can be placed transversely across the validated valley and its breach can become the controlling escape path.

The next crossing is therefore not “does it look geological?” It is:

**Can Crucible construct a dry terrain whose sampled elevations demonstrate a watershed capable of constraining later transport?**


### Geological Diversity T1 board — Aeon-style n representations

Transport now invokes the existing Geological Diversity expedition directly rather than creating a parallel hydraulic-terrain vocabulary. The Aeon-style “make me n versions” pattern is used as the human review surface: one control cycles a deterministic board of meaningfully separated compiled geological representations.

The first board contains twelve stable specimens. Each is generated into Crucible's ordinary signed-density terrain from combinations of broad mass/relief, regional slope, dominant trunk incision, tributary incision, drainage width, plateau mass, and large-scale warp. Named landscapes are not presets. The board is deliberately biased toward T1 drainage morphology while varying causal emphasis enough to seek perceptually distinct outcomes.

The UI control is `🪨 n/12`. Tapping advances to the next stable representation and disables Transport Candidate A so morphology is reviewed dry. Specimen identity is deterministic within this board so human judgments can refer to numbers without losing the world being discussed.

This is an initial executable board, not evidence that the proposed causal vocabulary has crossed. Human review should prefer direct perceptual reactions or the expedition's cheap judgments: KEEP, BORING, BROKEN, MORE, or CROSS A × F. The implementation should be revised from those observations rather than exposing parameter sliders.


### Human review evidence — first Geological Diversity board

Human review of the twelve-specimen first board was decisive: specimen 6 was the only representation that did not look terrible. Specimen 6 also contained a notably successful bowl. Treat this as evidence that the current generator family has not earned T1 despite one promising member. Do not average the board into success or preserve diversity merely because parameter combinations differ numerically.

The review also exposed a missing workbench interaction. The human should not be limited to selecting generated worlds; direct physical perturbation is part of the scientific collaboration surface. Three point instruments are now explicit:

- **Raise** — mutate ordinary signed-density terrain upward at the selected surface point.
- **Carve** — excavate ordinary signed-density terrain at the selected surface point.
- **Source** — place the active Transport source at the selected terrain point and observe the candidate representation from that chosen initial condition.

The first UI exposes these as `⬆️`, `⛏️`, and `💧`. Repeated Raise/Carve taps supply magnitude through repeated physical action rather than parameter sliders. Source currently represents one movable source: placing it resets Candidate A, positions the source, and enables Transport. Multi-source authoring is deferred until evidence asks for it.

This is a meaningful division of collaboration: the model can generate and reason through causal representations while the human can directly sculpt the shared physical world and choose where material enters it. The semantic/API surface should retain equivalent high-control operations; the graphical instruments are not a substitute for model accessibility.


### Land bucket — Candidate A

The first twelve-representation Geological Diversity board is retired from the live interface after human review. Specimen 6 is preserved as **Land Candidate A** because it was the only member judged not terrible and because its bowl was specifically judged successful.

Provenance parameters are retained with the executable candidate rather than promoted as geological vocabulary: `relief 3.2 · slope .08 · trunk 1.05 · tributary .58 · width .92 · plateau .78 · warp .14`. These labels describe the generating recipe; they have not earned semantic-surface authority. The purpose of the land bucket is to preserve successful representations so their causal/semantic surface can be recovered experimentally later rather than lost when a generation board is discarded.

Science now begins directly on Land Candidate A with Transport disabled. The live geology-board selector and the other rejected board representations are removed from the interface.

Human point-instrument grammar is corrected to the established compact icon language:

- `⛏️` carve
- `🪏` raise
- `💧` source
- `🩸` thicker source

The existing meteor control remains the meteor control and is not duplicated. The two source instruments share placement semantics and differ only in source rate for the present candidate (`.9` versus `2.7`). Their existence should survive replacement of the underlying transport representation if point-source placement remains useful.


### Comparative crossing — Transport bucket A–F

Sequential polishing is suspended in favor of one controlled n-representation comparison. Land Candidate A, direct terrain perturbation, point-source placement, reset semantics, and inspection form the shared apparatus. Six deliberately small causal representations now sit behind one Transport contract and can be selected A–F without changing the land.

- **A — scalar carrier:** the parked terrain-advected conserved scalar candidate. Its former synthetic global surface undulation is not carried forward as evidence.
- **B — shallow water:** surface depth plus persistent horizontal momentum, with both terrain slope and local depth gradient contributing to acceleration.
- **C — incompressible grid:** advected material coupled to a projected velocity field. Pressure projection is deliberately small/iterative rather than a claim of general CFD.
- **D — material parcels:** bounded Lagrangian transport-owned parcels moving over sampled terrain. These are not Crucible bearings and do not inherit rigid-granular ontology.
- **E — field plus tracers:** an authoritative shallow field with sparse passive tracers exposing the field's local velocity. Tracers are evidence presentation, not authoritative material.
- **F — cellular flux:** local conserved volume exchange driven by neighboring surface-head differences, intentionally without persistent momentum.

The representations are comparative probes, not six accepted fluid solvers. Shared rendering is intentionally plain and no candidate receives cosmetic rescue before human comparison. The shell exposes one first-class `A`–`F` selector following Crucible's existing control grammar. Changing representation resets Transport state but preserves current terrain edits. A clean-board reset restores Land Candidate A and clears Transport; the semantic API exposes that operation even when no dedicated terrain-reset button is present.

The legacy sea also remains semantically reachable (`show/hide/toggle/inspect`) without a UI affordance until an accepted fluid representation earns its removal.

**Human evidence boundary:** use the same recognizable terrain intervention across A–F where practical. Place 💧 or 🩸, observe whether the representation responds to bowls, slopes, barriers, and carved escape paths, and report perceptual/causal differences without needing to diagnose implementation. This comparison decides which candidates deserve deeper falsification, recombination, or deletion.


### Human crossing — A–F failed to produce six representations

Target-device review falsified the first comparative bucket as an n-representation experiment. The visible/causal families did not separate as intended:

- A reads as the scalar field already known.
- B does not read as a distinct representation; it still reads as scalar field.
- C presents a line of discrete balls/parcels whose motion can swirl convincingly, but this does not establish fluid behavior.
- D/F did not establish perceptually distinct useful behavior in review; the overall family continued to read as scalar field rather than different material hypotheses.
- E reads as scalar field plus a line of balls behaving similarly to C.

Code inspection explains the collapse. A, B, C, and E share the same 48×48 mass state and surface presentation; B and E reuse the same advective transport path as A, and C projects velocity before returning material to that same path. F changes local transfer law but remains represented through the same scalar mass sheet. The experiment therefore varied update laws inside a shared representation more than it varied representation itself.

**Result:** the A–F labels overstate executable diversity. Do not tune or cosmetically differentiate these six. Preserve A as the scalar-carrier bucket candidate. Preserve C's swirling motion only as evidence that a velocity/parcel presentation can expose coherent circulation; it is not accepted as liquid. E currently adds no earned representation beyond field + C-like tracers.

**Method correction:** future n-representation boards must differ at the ontology/state/presentation level strongly enough that a human can identify the causal hypothesis without reading its label. Parameter changes or alternate update laws behind the same state and renderer do not count as separate representations.


### Restart — independent liquid candidates, one at a time

The failed A–F board changes implementation method. No new liquid candidate may inherit scalar-carrier update functions merely to accelerate comparison. Candidate A remains preserved separately as the scalar-carrier result. The premature A–F selector is removed.

The first fresh liquid candidate is a purpose-built **depth-averaged shallow-water solver**. Its authoritative state is water depth plus two horizontal momentum components over sampled mutable terrain. It uses finite-volume/Rusanov-style interface flux with hydrostatic reconstruction, explicit bed-pressure forcing, wet/dry cells, CFL-bounded stepping, and frictional damping. Its rendered surface is derived directly from solved free-surface elevation `bed + depth`; there is no synthetic wave term. It imports no code from the scalar carrier or failed comparative bucket.

This candidate is deliberately matched to the present apparatus: bowls, slopes, raised barriers, carved channels, point sources, and mutable terrain. It is not a claim to general 3D fluid behavior. Acceptance begins with simpler obligations: source water must spread under gravity; depressions must retain it; resting water should tend toward a level free surface; raised terrain must impede it; a sufficiently low carved escape path must redirect/release it; and no motion may exist solely because presentation asked for motion.

Only after this representation is experienced and diagnosed do we decide whether to refine it, preserve it in the liquid bucket, or discard it and implement the next known representation independently.


## Terrain genesis crossing — author in 2D, become mutable in 3D

The dry-geology detour eventually exposed a representation problem more important than another round of geological parameter tuning. Crucible's authoritative terrain is a signed-density volume, but requiring genesis itself to be authored directly in that volume made the initial-condition problem unnecessarily difficult.

The useful decomposition is now explicit:

```text
deterministic seed
      ↓
model-authored 2D height field H(x,z)
      ↓
simple lift into density D(x,y,z) = H(x,z) - y
      ↓
ordinary Crucible signed-density terrain
      ↓
meteors / excavation / raising / later systems mutate D directly
```

The height field is therefore **genesis, not reality**. It supplies a cheap initial surface. Once lifted into the density volume, the heightmap has no authority over subsequent terrain. Crucible can then express consequences that a height field cannot: undercuts, caves, tunnels, overhangs, disconnected surfaces, buried structures, and arbitrary volumetric destruction.

This resolved an important false constraint. The representation easiest for the model to author does not need to be the representation the simulation executes.

### Evidence that led here

Several approaches failed or proved inadequate before this decomposition became obvious.

The first Geological Diversity board produced twelve deterministic terrains, but human review found only specimen 6 acceptable; its bowl was specifically useful. That result was preserved as Land Candidate A rather than treating numerical parameter diversity as geological diversity.

A later A–Z caldera study failed more sharply. The generated specimens were variations of one construction grammar: angular, squat radial depressions/rims at too small a scale. Semantic recognition of a hand-sculpted caldera had been compressed prematurely into a procedural vocabulary. Twenty-six parameterizations did not constitute twenty-six topologies.

A subsequent deterministic volumetric “history” approach applied sequential seeded deformation passes to the density field. It was adequate, but difficult to compare and unnecessarily expensive conceptually: genesis was being forced to speak the same representation required by later world mutation.

The key reframing came from looking at the volume through simpler projections. A top-down terrain surface can be represented as an ordinary 2D height field; fixed-Y density planes and vertical cross-sections remain available later when topology exceeds what a heightmap can express. Heightmaps are dramatically easier for the model to visualize, compose, generate, and reason about than an entire signed-density volume.

The first 2D-genesis implementation was immediately judged substantially better than the previous terrain-generation attempts.

### Current deterministic mechanism

`terrain-genesis.js` constructs a floating-point height field at the terrain's XZ resolution. It composes simple geometric influences such as broad relief, ridges, trenches, basins, shelves, faults, and tilt. Each operation receives its own deterministic asymmetric noise/domain transform rather than sharing one noise map that would average the landscape toward a common texture.

The initial authored mechanism preserves four explicit recipes:

1. folded mountain system;
2. basins and sinkholes;
3. broken highlands and deep valleys;
4. unnamed asymmetric terrain.

These recipes remain available as a known-good baseline.

A second layer, `terrain-recipe-generator.js`, makes the terrain addressable by a single integer. The seed deterministically chooses large-scale structural family, operation count/order, geometry, amplitudes, placement, orientation, scale, and independent noise domains. Current structural families include ranges, basin fields, rifts, plateaus, knotted terrain, and lowlands, with deterministic cross-family intrusions.

Science mode currently begins at seed `741`. `NEXT` advances through integer addresses:

```text
741 → 742 → 743 → …
```

There is no runtime randomness in this sequence. A seed is an address into the genesis machinery, not a saved mesh or image. The generated recipe is provenance derived from that address.

The current procedural family has only just crossed into human review. Its ability to produce genuinely broad terrain diversity is therefore **a target under observation, not yet an accepted result**. In particular, shared primitive vocabulary and fixed global height normalization may still collapse apparently different recipes toward similar experienced terrain.

### Why this fits Crucible's model-forward constraint

The immediate engineering problem was unusually constrained: development is being steered from a smartphone; the artifact must remain browser-native and self-contained; terrain authoring should require no Blender/editor detour, external terrain service, specialist asset pipeline, or new runtime dependency; and the model must be able to author and revise the mechanism directly.

Under those constraints, the useful pipeline is small:

```text
conversation
  → model-authored deterministic math
  → 2D numeric field
  → dumb deterministic lift
  → mutable 3D density
  → mesh / executable evidence
```

The smartphone is not an intended compute architecture. It is the human steering surface. The practical constraint has nevertheless been productive: workflows that require the human to leave the model/repository/browser loop repeatedly become obvious friction and are either automated or removed.

This terrain crossing joins several similar pressures encountered during Crucible development: file transport, deployment, first-class DevUI, and now terrain genesis have all become simpler because routine implementation mechanics are pushed toward model-owned executable machinery rather than human-operated specialist tooling.

### Reinvented wheel, useful seam

Nothing here requires a novelty claim. Procedural heightfields, deterministic seeded terrain, and conversion from heightmaps into voxel/density terrain are established techniques. The earlier search for “AI terrain generation” did not make this simple composition obvious because it framed the problem as generation of the final 3D representation.

The useful local lesson is architectural rather than algorithmic:

> **Author in the representation that makes the desired structure cheap to express; compile into the representation that makes the desired consequences possible.**

For Crucible, 2D is currently the cheap language of terrain genesis and 3D density is the language of consequence.

This also explains why the solution became apparent only after the volumetric approaches were experienced. The difficult part was not discovering a new terrain algorithm. It was dropping the assumption that initial-condition authoring and runtime world state had to share a representation.

### Workbench consequence

This crossing suggests a broader Scientific Workbench pattern without yet claiming it as a universal rule:

- models may author compact projections, fields, recipes, diagrams, or other semantically convenient intermediate representations;
- a deliberately simple compiler can translate those into richer authoritative simulation state;
- the authoritative state then owns physical consequence;
- projections and sections can be regenerated later as instruments for model reasoning without becoming world authority.

For terrain specifically, the next evidence should come from experience rather than more architecture. Sequential seeds should be reviewed for actual structural diversity. Successful and failed seeds can then tell us which 2D vocabulary is missing. Cross-sections remain available when the experiment reaches topology that the heightmap genesis language cannot express.

**Current terrain principle: 2D is imagination; 3D is consequence.**


## Shallow-water candidate — what the representation has earned

The current independent shallow-water candidate is worth preserving before changing its geometry or extending its ontology. Human testing against the new deterministic terrain genesis produced substantially better evidence than the earlier tame substrate: the candidate **does flow, route, pool, and fill useful terrain well**.

The present implementation is a 64×64 depth-averaged field over XZ. Its authoritative state is water depth plus two horizontal momentum components over sampled terrain. At this resolution the solver owns only 4,096 cells and is computationally cheap relative to Crucible's other regimes.

### What it currently knows

Within terrain that satisfies its shallow-water assumptions, the representation provides useful knowledge about:

- whether water occupies a supported region;
- approximately how much water is present;
- total represented volume;
- free-surface elevation through `bed + depth`;
- horizontal momentum / intended transport direction;
- wet-cell extent;
- source injection and other quantities suitable for conservation accounting.

This is enough state to make the candidate scientifically useful even if its current rendered mesh is rejected.

The useful distinction is:

> **The candidate has earned water state, not water geometry.**

### Current surface is not authoritative geometry

The present renderer exposes the solver grid too directly. `refresh()` constructs visible surface quads from the 64×64 cells and omits a quad when any of its four sampled corners is dry or unsupported. The resulting shoreline therefore advertises the computational lattice as conspicuous squares and rectangles.

Increasing solver resolution would make smaller rectangles without repairing the underlying representation mismatch. The current field should remain cheap unless evidence shows the physics itself needs additional resolution.

A separate surface reconstruction should consume the authoritative water state and produce presentation geometry. Marching-squares-style wet/dry contour reconstruction is an obvious inexpensive first candidate: the 64×64 solver yields only 63×63 contour cells, and interpolated contour crossings can remove most grid-snapped shoreline geometry without changing the dynamics.

This follows the same representation lesson recently earned by terrain: **the representation that is cheap to calculate does not need to carry responsibilities it is bad at.**

### Where the shallow representation stops

The depth field assumes water can be described as a depth above one supporting terrain sample. It should therefore not be trusted automatically for:

- vertical walls;
- undercuts;
- waterfalls;
- detached water;
- breaking/overturning surfaces;
- water with air beneath it;
- arbitrary multiply-valued vertical geometry.

Those are representational boundaries, not merely resolution problems.

The current candidate should consequently be treated as a cheap description of **supported water volume and its free surface while shallow-water assumptions hold**. If water reaches a place where those assumptions fail, the experiment should identify and cross that boundary deliberately rather than silently increasing grid resolution.

### Disappearing-water observation remains unresolved

Human testing on the more extreme generated terrain revealed cases where water appears to die/disappear. The initial hypothesis that this was simply water reaching the unbounded plinth edge is not yet accepted.

Code inspection exposes a more specific vulnerability. Terrain support is sampled through `terrain.groundHeight()`; a cell is valid only when that sample is finite. Flux interfaces involving invalid cells are skipped, and the final solver pass explicitly clears `h`, `hu`, and `hv` for invalid cells. The implementation therefore has no meaningful water state where terrain support is absent. `totalEscaped` exists but is not currently incremented by an implemented escape path.

This is a strong candidate explanation for the observed disappearance, but it has not yet been isolated experimentally. Do not record the failure as NaN/divide-by-zero or as an open-boundary condition without evidence.

If water actually leaves supported terrain, the shallow representation has reached an ontology boundary: “no ground height” currently means “this cell cannot contain water.” A later experiment may hand outgoing volume/momentum to another representation rather than either deleting it or pretending a depth-above-bed field can describe free-falling water.

### Current direction

Do not rewrite the successful flow dynamics merely to repair presentation.

The next useful separation is:

```text
shallow-water state
(depth + horizontal momentum over supported terrain)
        ↓
derived volume / free-surface knowledge
        ↓
independent surface reconstruction
        ↓
visible Three.js water geometry
```

Shoreline reconstruction and unsupported-terrain behavior are separate questions. The first is primarily derived geometry. The second may require an explicit representation crossing.

The new terrain generator is now valuable test load for both: sequential deterministic worlds provide bowls, channels, ridges, shelves, cliffs, steep gradients, and awkward shoreline geometry without manufacturing one special fluid test case.

**Preserved judgment:** the current water candidate is cheap and useful. Its blocky visible boundary should not be mistaken for failure of the state representation, and its behavior beyond supported shallow terrain has not yet been earned.
