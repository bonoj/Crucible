# Crucible Extension Expedition

**Status:** active  
**Opened:** 2026-10-01  
**Local home:** Crucible research and runtime  
**Operating bias:** lean machinery, fast consequences, delightful evidence  
**Immediate seam:** material consequence at high load without paying unnecessary presentation cost

> **Extend Crucible by making consequences richer before making machinery heavier.**

## Why this expedition exists

Crucible has crossed from proving isolated physical vocabulary into a world where several earned systems can coexist at consequential scale.

The current crossing combines:

- high-count CPU-authoritative ball bearings;
- deformable terrain;
- a live shallow-water field coupled to terrain and matter;
- bounded, malleable diagnostics;
- immutable candidate builds and deliberate stable promotion;
- a human/model loop in which executable evidence collapses competing explanations.

The extension question is therefore no longer simply whether another physical system can be added.

It is:

**How much material consequence can Crucible express, delightfully and responsively, before additional architectural machinery is actually earned?**

The default answer is not “move to the GPU,” “increase fidelity,” or “generalize the engine.” The default is to find the cheapest machinery that makes a consequence legible and fun.

## Operating principle

**Lean machinery. Fast consequences. Delightful evidence.**

A system earns complexity only when executable evidence shows that simpler machinery cannot carry the desired consequence.

Performance work follows the same rule as physical investigation:

1. observe the loaded world;
2. instrument the smallest discriminating seam;
3. measure rather than infer;
4. optimize the demonstrated cost;
5. preserve accepted behavior;
6. remove or reshape temporary instrumentation when its question is answered.

GPU work is allowed to become a candidate reality when evidence earns it, but GPU architecture is not a destination. Ordinary CPU and WebGL machinery remain preferred while they can deliver the world cleanly.

## How we arrived here

### High-count bearings

Crucible previously explored specialized GPU-oriented bearing machinery and found that the complexity cost was not justified by the world being built. The useful crossing instead came from a lean CPU-side authoritative representation.

That path eventually produced a practical high-count regime:

- approximately **100,000 ball bearings** can participate in the world;
- the representation remains CPU-authoritative;
- the result is useful because the bearings can become material, payload, obstruction, flow, impact evidence, or some future consequence rather than because the count is itself a benchmark.

This is precedent for the extension expedition: do not purchase machinery merely because it is theoretically appropriate to the scale.

### Transport became water

The Transport expedition began from a deliberately modest conserved scalar field and allowed executable pressure to earn additional vocabulary.

Terrain coupling, directional flow, persistent elevation head, material response, and repeated field observation progressively forced the representation toward shallow-water behavior. The current water system is therefore not a decorative shader or a preselected CFD project. It is accumulated transport vocabulary that survived executable tests.

### The water thrash

Once water became visually and materially consequential, an apparent cyan/surface pathology triggered a prolonged bounded investigation.

The investigation used the 🐉 reality-aperture discipline:

- preserve multiple plausible explanations;
- add temporary instrumentation at whatever level could discriminate them;
- compare executable counterfactuals rather than trusting appearance;
- retain failed hypotheses as provenance;
- let the human provide device/perceptual evidence only where the executable could not close the loop.

During that work, the diagnostic surface changed rapidly. Counterfactual render modes, pixel/ray evidence, downloadable captures, and temporary controls were treated as disposable JIT instrumentation rather than permanent tooling.

Several plausible explanations died. Terrain modification did not change the surviving visual artifact. Ball-bearing hydrostatics remained coherent. A winding defect was real but did not explain the surviving pathology. A frozen-surface probe showed that presentation reconstruction was not the dominant explanation for the visual pathology being investigated.

The water look and behavior were ultimately accepted without turning the diagnostic machinery into a permanent observability architecture.

### Home pressure test

A cold traversal began from `bonoj/Home` rather than from Crucible chronology.

Home successfully routed the model into Crucible's local authority. The recent water work could be understood largely from current executable state and semantic surfaces. Chronology became necessary only when current implementation exposed a comment stating that the frozen-surface probe had already rejected reconstruction as the dominant explanation for the earlier visual pathology.

That crossing sharpened a useful distinction:

**Present semantic truth should carry normal work. Chronology should be recovered when a proposed move risks reopening a reality that evidence already rejected.**

Home then disappeared from the hot loop, as intended.

## Extension Turn 0 — Find the loaded water cost

**Human field condition:** approximately **100,000 ball bearings**, substantial water volume, target Android device.

**Observed performance:** approximately **12–15 FPS**.

The world was deliberately tested in a materially loaded state rather than against an empty-water microbenchmark.

### Instrumentation aperture

A candidate added timing around two already-existing water paths without changing water behavior:

- shallow-water solver work;
- presentation reconstruction.

The capture also exposed wet-cell and generated-geometry counts so the timings could be interpreted against actual material extent.

### Captured evidence

In the loaded field capture:

- wet cells: approximately **873**;
- water volume: approximately **58.9**;
- solver: approximately **0.5 ms** for **3 substeps**;
- presentation rebuild: approximately **50 ms**;
- generated presentation: approximately **22,508 vertices**, **7,802 surface triangles**, plus **512 side triangles**.

At 12–15 FPS, one complete frame is roughly 67–83 ms. A presentation rebuild near 50 ms is therefore large enough to consume most of the available frame budget by itself.

### Interpretation

The shallow-water solver is not presently the expensive part of this loaded regime.

The immediate demonstrated cost is CPU-side water presentation reconstruction.

This does **not** invalidate the earlier frozen-surface result. That probe answered a different question: whether reconstruction explained the visual pathology then under investigation. It did not establish that reconstruction was cheap under every substantially wetted loaded world.

The new timing aperture directly measures the current performance question.

### GPU boundary

This evidence is sufficient to make GPU presentation a legitimate candidate reality. It is not sufficient to make GPU architecture the chosen solution.

The current water solver is already cheap. If a future GPU experiment is earned, the natural boundary is presentation rather than simulation: CPU may continue to own authoritative water meaning while the GPU draws its visible consequence.

For now, that experiment is deferred.

**Decision:** stay lean and attack the measured presentation cost with ordinary machinery first.

## Current extension pressure

Preserve:

- accepted water behavior and appearance;
- terrain/water/material coupling;
- CPU-authoritative shallow-water state;
- 100k-bearing capability;
- target-device accessibility;
- candidate/stable separation;
- the ability to instrument a question quickly and throw the instrument away.

Reduce:

- unnecessary water geometry reconstruction;
- avoidable allocation or buffer churn;
- work whose visual consequence cannot be perceived;
- any presentation update whose cost scales more aggressively than its useful evidence.

Do not optimize the solver merely because it is physically sophisticated. Current evidence says it is cheap.

Do not broaden into a renderer rewrite.

Do not begin a GPU migration merely because the door is now scientifically open.

## Next crossing

The next implementation move should target the demonstrated ~50 ms presentation path while changing as little else as possible.

Success is not a particular technique. Success is:

**substantially wetted Crucible + 100k bearings + preserved material behavior and accepted water look + a meaningfully snappier target-device frame.**

If ordinary presentation optimization reaches that condition, the GPU candidate can remain unborn.

If the lean path reaches a clear limit, the evidence will tell us what machinery has actually been earned.

## Logging policy

This expedition is public working provenance, not mandatory ceremony.

Update it when a session earns a durable change in:

- what Crucible can do;
- what we believe about a system;
- which reality was rejected or selected;
- a meaningful performance/behavior boundary;
- the collaboration or instrumentation method itself.

Do not interrupt a hot executable loop merely to narrate it. Git carries exact implementation chronology. This record carries the consequential crossings.


## Extension Turn 1 — Delete invisible water work

The first extension candidate did not introduce a new renderer, GPU path, cache, buffer architecture, or solver approximation.

Inspection of the measured presentation path showed that visible water was being reconstructed at `SURFACE_SUBDIV=2`: each already-authoritative 64×64 solver cell was subdivided again for presentation before clipping, terrain sampling, and geometry generation.

The candidate changed only that presentation subdivision to `1`.

Hydrostatics, solver resolution, material coupling, accepted water material/look, and presentation cadence were left unchanged.

**Candidate:** `18fb5d29dc3330a5b4e53dde47b22e3cdf42240a`

### Human field result

On the target Android device:

- water remained visually fantastic;
- massive water volume held approximately **60 FPS**;
- hundreds and low thousands of ball bearings barely affected that result;
- approximately **25,000 bearings** reduced the observed frame rate to roughly **30 FPS**;
- the 100,000-bearing regime remained substantially heavier and was captured separately.

This moved the active performance frontier away from water and toward high-count bearing load.

### Captured water evidence

A massive-water diagnostic after the change reported:

- wet cells: **1,102**;
- water volume: **83.37**;
- solver: **~0.8 ms / 3 substeps**;
- presentation rebuild: **~22 ms**;
- presentation geometry: **7,616 vertices / 2,728 surface triangles / 328 side triangles**.

A lighter active-water capture reported:

- wet cells: **644**;
- water volume: **37.17**;
- solver: **~0.4 ms / 2 substeps**;
- presentation rebuild: **~16.1 ms**;
- presentation geometry: **4,451 vertices / 1,597 surface triangles / 170 side triangles**.

An Aeon capture between those states reported:

- wet cells: **694**;
- water volume: **41.29**;
- solver: **~0.2 ms / 1 substep** at capture;
- presentation rebuild: **~17 ms**;
- presentation geometry: **4,778 vertices / 1,710 surface triangles / 186 side triangles**.

The presentation timer still reports nontrivial synchronous rebuild work. It is not currently sufficient reason to continue optimizing water: target-device frame behavior is now excellent at substantially greater water volume than the earlier failing regime.

### Crossing

The previous loaded capture, before this change, had approximately 873 wet cells and ~58.9 water volume while the world ran around 12–15 FPS. Its presentation reconstruction generated ~22.5k vertices and measured near 50 ms.

The new candidate carries **more water and more wet cells at an observed 60 FPS**, while preserving the accepted appearance.

The extension expedition therefore accepts this rule:

> **Do not optimize a surviving diagnostic number after the experienced consequence has crossed the target.**

Water performance is crossed for now.

The next demonstrated scaling seam is high-count ball bearings. The useful field ladder is now roughly:

- hundreds to low thousands: little perceptible frame impact against the 60 FPS water world;
- ~25k bearings: ~30 FPS;
- 100k bearings: heavy regime, retained as a stress aperture.

Do not reopen water presentation unless future material interactions or broader device evidence make it consequential again.
