# Directions

Things Crucible could follow next.

This is not a backlog, roadmap, task list, or statement of current behavior. A direction can remain here indefinitely without becoming work. It exists so a human or model arriving cold can recover the live possibilities without excavating the chronological research record.

When a direction becomes an actual investigation, follow Crucible's ordinary discipline: **observe → build → experience → record**. Let executable evidence and the destination's local authority determine what survives. `SEMANTIC_SURFACE.md` remains the authority for present-tense executable truths.

## Scientific workbench

Can Crucible become a configurable field laboratory for applied physical science: not primarily to push a domain frontier itself, but to let a scientist and a model rapidly construct the small faithful world and instruments they need to reason about a physical problem?

The science is the load. The longitudinal object of study is the workbench.

A useful crossing looks roughly like:

**real physical question → minimal faithful sandbox → inspect and manipulate → encounter representational friction → request or invent an instrument → build it → inspect new evidence → refine the question**

Each expedition may leave two kinds of value:

- a local sandbox useful for the physical question at hand;
- evidence about which representations, instruments, controls, and provenance mechanisms recur across otherwise unrelated sciences.

Do not predeclare universal scientific tooling. Section planes, tracers, parameter sweeps, ghost histories, difference views, coordinate transforms, derived fields, uncertainty views, probes, and annotations become substrate candidates only if repeated field work earns them.

### Sacrosanct model-facing constraint

Whatever machinery exists underneath, its meaningful state and controls must be exposed through an **intuitive, high-control semantic surface for the model**.

High control is not high authority. The model should be able to reason and act in useful domain vocabulary without being allowed to assert physical results into existence. Physics owns consequence; the semantic surface owns accessibility; visualization exposes evidence; provenance preserves the path by which evidence and interpretation were produced.

Editing source code remains an escape hatch, not the intended scientific interface. A successful field sandbox should let a model perform meaningful operations such as changing a boundary condition, placing a probe, requesting a section, comparing runs, or deriving a view without first translating the whole experiment into implementation details.

### Likely first crossing — transport

Transport is attractive because it appears across many physical sciences and because Crucible already wants a material regime that is not merely more ball bearings and can coexist with its roughly 100k-bearing CPU-authoritative regime.

The first question is deliberately smaller than “build fluids”:

**What is the cheapest physically meaningful representation of one thing moving through another, and what instruments are actually needed to understand where it went?**

Possible representations include scalar concentration fields, velocity fields, parcels or tracers, shallow-water approximations, cellular flux, particles used as samples rather than molecules, and hybrids. None is privileged before executable evidence.

A tiny first specimen could contain a source, terrain or medium, sink, transported material, and obstacles. Ask where injected material actually goes. Keep the physical vocabulary separate from the observational vocabulary so a convenient visualization does not silently become the physics.

Transport can later cross into groundwater, porous media, sediment, heat, contaminants, acoustics, charge, melt processes, and other fields. The point is not to insist that one transport abstraction fits all of them; the interesting evidence includes where shared vocabulary stops working.

### Field probes and edge-tooling pressure

These are not a curriculum or commitments. They are examples of applied physical sciences where current practice shows recurring friction between physical state and human-accessible evidence. They are candidate loads for the workbench.

#### Geology / porous media / hydrogeology

**Small questions:** Which pores or strata actually connect? Where does injected material travel? Which constrictions dominate transport? How does heterogeneity change a contaminant plume or breakthrough behavior?

**Tooling pressure:** three-dimensional structure, hidden connectivity, heterogeneous material properties, uncertainty, and the difference between an ensemble of possible subsurface states and one situated realization.

Digital-rock work uses pore-scale imaging and numerical or pore-network models specifically to recover transport behavior from complex 3D structure. Groundwater toolboxes combine simulation, uncertainty analysis, spatial visualization, breakthrough curves, and interactive parameter changes.

**Workbench opportunities:** sections, connectivity highlighting, virtual injection, tracers, flux probes, permeability manipulation, plume histories, ensemble comparison, uncertainty views.

Geological Diversity is one possible generator of structured media inside this field, not a separate top-level program. Its existing unopened expedition is [research/TEMP_GEOLOGICAL_DIVERSITY_EXPEDITION.md](./research/TEMP_GEOLOGICAL_DIVERSITY_EXPEDITION.md). Its causal vocabulary can become physically consequential when structure controls transport rather than serving only as scenery.

Evidence/examples:
- [Hybrid pore-network/continuum modeling for 3D porous media](https://www.sciencedirect.com/science/article/pii/S0309170824001404)
- [VisU-HydRA groundwater contaminant transport toolbox](https://www.frontiersin.org/journals/earth-science/articles/10.3389/feart.2022.916198/full)
- [Groundwater Project interactive transport tools](https://gw-project.org/interactive-education/preserved-tool-suite-transport-tracking-stream-interaction-generating-k-fields/)

#### Fluid dynamics

**Small questions:** Where does material injected here go? Where are recirculation regions? Which structures dominate mixing or residence time? What changes when geometry or forcing changes?

**Tooling pressure:** velocity fields, particles, trajectories, coherent structures, and derived quantities can each reveal different things; measurement and visualization choices strongly affect what becomes legible.

**Workbench opportunities:** tracers, path histories, residence-time views, sections, local velocity probes, flux surfaces, seeded comparisons, frozen-flow inspection, derived-field overlays.

The workbench should not assume that a visually fluid-looking simulation is scientifically useful. The first earned instrument may be much simpler than a sophisticated solver.

#### Fracture mechanics / solid mechanics

**Small questions:** Where is deformation concentrating? Where is the crack tip actually located? How does a defect or material boundary alter the developing field?

**Tooling pressure:** full-field displacement and strain measurements can expose behavior that point measurements miss, while crack-tip localization itself materially affects extracted fracture parameters.

**Workbench opportunities:** displacement/strain fields, crack-tip tracking, before/after difference views, local coordinate frames, load-history ghosts, derived stress-intensity views with explicit assumptions.

Evidence/example:
- [Digital image correlation and automated crack-tip/fracture parameter extraction](https://doi.org/10.1007/s11340-022-00925-8)

#### Additive manufacturing / melt processes

**Small questions:** Which thermal or melt-pool histories correlate with defects? How did scan history influence this region? What process change produces a qualitatively different melt regime?

**Tooling pressure:** important events are small, fast, spatially registered, history-dependent, and later buried. Current research joins high-rate sensing, spatial registration, feature extraction, process history, and defect interpretation. NIST explicitly identifies limited process measurement and control tools as a bottleneck.

**Workbench opportunities:** synchronized thermal/history views, scan-path overlays, melt-pool geometry, temporal ghosts, anomaly marking, parameter sweeps, region comparison, provenance from process setting to observed consequence.

Evidence/examples:
- [NIST real-time monitoring and control of additive manufacturing](https://www.nist.gov/programs-projects/real-time-monitoring-and-control-additive-manufacturing-processes)
- [NIST spatiotemporal melt-pool monitoring](https://www.nist.gov/publications/spatiotemporal-monitoring-melt-pool-variations-metal-based-additive-manufacturing)

#### Acoustics

**Small questions:** Where is a sound actually coming from? Where do standing waves or reflections concentrate energy? How does geometry change the field?

**Tooling pressure:** the phenomenon is invisible and spatial reconstruction depends on measurement geometry and method. Beamforming and acoustical holography can produce different source-resolution behavior, especially around noise, near-field geometry, and reverberation.

**Workbench opportunities:** movable virtual microphones, phase views, pressure histories, source reconstruction, standing-wave accumulation, measurement-surface manipulation, side-by-side reconstruction methods.

Evidence/example:
- [Comparison of near-field beamforming and acoustical holography](https://pure.psu.edu/en/publications/a-comparison-of-near-field-beamforming-and-acoustical-holography-/)

#### Electromagnetics

**Small questions:** What field topology follows from this arrangement of sources and materials? Where does energy flow? Which representation makes an invisible field understandable without misleading us?

**Tooling pressure:** fields are intrinsically spatial and invisible; representation choices materially affect intuitive comprehension.

**Workbench opportunities:** field lines as samples rather than ontology, vector/phase sections, movable probes, source manipulation, energy-flow views, comparison between alternative representations.

Evidence/example:
- [Study of intuitive visual representations of electromagnetic radiation](https://journals.aps.org/prper/abstract/10.1103/vlq7-fq7t)

#### Plasma / fusion diagnostics

**Small questions:** Do separate diagnostics describe the same event? What changes when measurements are mapped into a common physical coordinate system? Which apparent correlation is an artifact of time, geometry, or reconstruction?

**Tooling pressure:** experimental evidence arrives through multiple diagnostics with different interfaces, coordinates, time bases, channels, and derived representations. Recent KSTAR work explicitly built a unified visualization platform for cross-diagnostic comparison, coordinate mapping, quality control, and multi-shot/multi-timepoint analysis.

**Workbench opportunities:** synchronized timelines, explicit coordinate transforms, diagnostic overlays, quality/confidence markings, multi-run comparison, distinction between measured and reconstructed quantities.

Evidence/example:
- [PRISM integrated multi-diagnostic visualization for KSTAR](https://www.sciencedirect.com/science/article/pii/S0920379626001742)

#### Heat transfer / thermal transport

**Small questions:** Where did heat actually travel? Which geometry or material interface controls a hot spot? What history produced the current temperature field?

**Tooling pressure:** temperature is observable only through samples or imaging, while flux and causal history are often derived. The same current field can conceal different histories.

**Workbench opportunities:** temperature and flux views kept distinct, thermal histories, sections, source/sink manipulation, material-property editing, probes, difference runs, inverse questions with assumptions exposed.

This field may emerge naturally from transport or additive-manufacturing work rather than requiring a separate expedition.

### Experimental stance across fields

The workbench should prefer small questions with inspectable consequences over attempts to reproduce an entire professional simulation stack.

The model should initially receive only the physical state, semantic controls, and instruments the sandbox has actually earned. When those are insufficient, the failure should be made observable before adding a new instrument.

The human or domain expert supplies judgment, trusted constraints, discrepancy, and field knowledge. The model can propose representations, controls, experiments, and instruments. The executable world resolves what those interventions actually do.

Across repeated fields, watch especially for the boundary between:

- physical vocabulary: what the sandbox must faithfully represent;
- observational vocabulary: what must be measurable or visible;
- control vocabulary: what can be changed;
- interpretive vocabulary: what may be inferred from evidence;
- authority: which layer is permitted to determine each of those things.

## Cinnabar and Cinnamon

Continue the persistent asynchronous field from its current frontier and let rules, objects, and meaning continue to accumulate through scored turns and Clockchain.

The authoritative play record is [research/CINNABAR_AND_CINNAMON.md](./research/CINNABAR_AND_CINNAMON.md). This direction is deliberately not a predefined research program; play itself has repeatedly generated machinery and questions worth preserving.

## Orbital locus / attention

The station already has bounded spatial availability, immutable observations, blind derivation, a rolling locus ledger, inference parcels, crossings, and a malleable CLARA surface. It still has no autonomous attention policy.

A possible next investigation is whether selective attention can be made necessary and observable rather than installed because it sounds architecturally appropriate.

The Scientific Workbench may provide a more grounded route into this question. Instead of designing an abstract observer with an indefinitely extensible toolbox, place a bounded locus inside a physical problem whose current instruments are demonstrably insufficient. Let discrepancy earn the next instrument.

Likewise, an experimenter may inspect an ensemble of generated worlds while a locus receives evidence only from one situated world. That gives Crucible a useful difference in epistemic position without requiring an external N-dimensional observer or a branch ontology.

Resume from the chronological evidence in [research/ORBITAL_LOCUS_SPATIAL_COLLABORATION.md](./research/ORBITAL_LOCUS_SPATIAL_COLLABORATION.md).

## Phenome / locus and identity

Can an ordinary Crucible locus accumulate enough situated consequence that stronger persistence or identity vocabulary becomes useful without declaring a subject in advance?

Recent archaeology sharpened the restraint: **locus is not identity**. Perspective, history, or changing state do not by themselves establish a persistent subject. This direction would look for executable evidence that changes what distinctions are actually needed.

## True Speech

Has sustained human-model collaboration evolved a working dialect that measurably changes what a cold model can recover, preserve, recombine, or execute?

The interesting candidates are not only coined handles. Ordinary-looking constructions such as *model-mediated*, *bounded observation*, *authority boundary*, *executable evidence*, and *earned vocabulary* may carry unusually dense working distinctions after repeated use.

A useful expedition would compare semantically equivalent instructions across evolved working language, conventional paraphrase, renamed handles, definition-only exposure, archaeological exposure, and possibly different model families. The question is performance, not mystique: does the evolved language measurably change inference?

## Emergent interlingua

Has sustained collaboration caused human and model language to converge toward a mutually useful technical dialect without either participant deliberately designing one?

This is distinct from True Speech. True Speech asks whether the language changes model performance. Emergent interlingua asks how the language itself forms and crosses the human-model boundary.

A particularly useful trace would be vocabulary and constructions that originate in model output, survive human judgment, enter the human's spontaneous working language, and later return to models as natural instructions.

## Model-mediated language ecology

Does the same feedback occur beyond one collaboration?

Researchers increasingly work conversationally with language models. A possible investigation is whether model-favored distinctions and constructions enter researchers' own conceptual vocabulary, circulate through human technical communities, and later return through papers, discourse, training corpora, and subsequent models.

Existing observations of AI-associated lexical and stylistic change are adjacent evidence, not evidence for this stronger conceptual-language hypothesis.

## Provenance and authenticity

When creative and technical work emerges through repeated association, proposal, selection, discrepancy, recombination, execution, and revision across humans and models, is provenance a more useful observable than a binary human-generated / AI-generated label?

This direction should not begin by declaring human and model cognition equivalent. The narrower opportunity is to describe causal contribution precisely enough that questions of authorship and authenticity do not erase the transformation path.

## Crossed direction — Malleable Middle

The Malleable Middle expedition reached a natural analysis rather than remaining an open task. Its machinery and evidence remain available to other directions: conversational intent, executable geometry, multimodal inspection, constrained correction, Git provenance and recovery, and ordinary specialist handoff.

See [research/MALLEABLE_MIDDLE_EXPEDITION.md](./research/MALLEABLE_MIDDLE_EXPEDITION.md).

---

Directions are allowed to disappear, merge, split, or become expeditions. Their presence here grants no executable authority and creates no obligation to pursue them.
