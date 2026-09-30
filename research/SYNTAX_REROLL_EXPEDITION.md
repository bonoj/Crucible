# Syntax Reroll — Crucible Expedition

**Status:** fresh executable expedition; planning/orientation only  
**Started:** 2026-09-29  
**Local home:** Crucible research and runtime  
**Archaeological parent:** [PRE_GITHUB_ARCHAEOLOGY.md](./PRE_GITHUB_ARCHAEOLOGY.md)  
**Executable precedent:** [CINNABAR_AND_CINNAMON.md](./CINNABAR_AND_CINNAMON.md)

> **Turn-capture rule**
>
> While this expedition is active, every conversational turn that materially belongs to the executable Syntax Reroll experiment should update this record before collaboration advances. Pre-GitHub historical excavation remains in the parent archaeology ledger. This file records the new experiment that grows from that evidence.

## Why this expedition exists

Pre-GitHub Archaeology recovered enough Syntax Reroll machinery that continued archaeology is no longer required before executable play can begin.

The old work treated language as constrained world material: lexical occurrences had provenance; mutations were conserved; rendered proposals were distinct from established truth; actions could commit causal residue; referents and later historical instances could diverge; and interfaces increasingly became physical things inside the world.

The present experiment should not reconstruct that engine.

Instead, Syntax Reroll becomes a **game inside Crucible**, in the same broad sense that Cinnabar & Cinnamon is a game inside Crucible. Its implementation should remain locally legible while its physical consequences are allowed to collide with the rest of the Terrordrome.

The expedition-selection joke now becomes apparatus:

**✂️ Scissors is the developer control that opens/activates Syntax Reroll.**

Candidate principle:

> **Silo the machinery. Do not silo the consequences.**

## Governing question

**What happens when constrained literary mutation becomes one more causal system inside an already noisy shared world?**

A narrower first question is deliberately not fixed yet. The first playable move should be selected only after the existing Crucible seams have been inspected closely enough to choose the smallest useful interaction.

## Authority and evidence

Current accepted Crucible behavior remains authoritative at stable `index.html`.

Before executable mutation, read:

1. `README.md`
2. `SEMANTIC_SURFACE.md`
3. this expedition record
4. the relevant current Cinnabar & Cinnamon runtime modules
5. the archaeological parent only where historical evidence is needed

The archaeology is evidence, not a requirements document. Old notebook rules may inspire a probe without becoming current Crucible truth.

Candidate builds remain candidates until experienced and deliberately promoted through Crucible's existing workflow.

## What the archaeology has actually earned

Useful recovered invariants and pressures include:

- **Language can be material.** A lexical occurrence may constrain what the world can truthfully become.
- **Occurrences matter.** Manipulation should not silently operate as global search/replace.
- **Provenance matters.** A moved or spent lexical instance should retain where it came from and what happened to it.
- **Conservation matters until play earns otherwise.** Convenient vocabulary should not appear merely because a desired action needs it.
- **Minimum coherent delta.** A lexical mutation should not grant permission to rewrite unrelated world state.
- **Proposal is not commitment.** A representation may suggest; accepted action/consequence establishes history.
- **Removing an assertion is not asserting its opposite.**
- **Semantic state and causal residue may diverge.** Undoing language need not undo consequences already caused.
- **Word, referent, and historical instance are distinct.**
- **Physical representations can become world participants.** This is an earned question, not yet a generalized mechanism.

These are starting constraints for play, not a demand to implement every historical subsystem.

## What is not earned

Do not begin by building:

- a standalone Syntax Reroll repository;
- a reconstructed historical engine;
- a universal prose parser or literary compiler;
- a generalized Tether/HEAD framework;
- an LLM-driven omniscient narrator;
- a canonical ontology for words, entities, references, and worlds;
- a memory database;
- a new model connection for CLARA;
- autonomous CLARA attention;
- a generic cross-game event bus;
- a universal representation-affects-world framework;
- a full inventory/specimen/Home interface.

If play repeatedly needs one of these, earn it from executable pressure.

## Cinnabar & Cinnamon as structural precedent

Cinnabar & Cinnamon supplies useful **shape**, not game rules.

### 1. One local scored-state module

`src/runtime/cinnabar-and-cinnamon.js` owns its turns, field clock, replay state, frontier, terminal state, and inspection surface.

Syntax Reroll should likewise prefer one small module that owns the game's authoritative local state rather than distributing lexical bookkeeping through unrelated Crucible systems.

### 2. Consequences live in focused runtime systems

C&C does not contain every physical consequence in its score module. The dome, kite, and spire are separate focused systems:

- `cinnabar-dome-system.js`
- `cinnabar-kite-system.js`
- `cinnabar-spire-system.js`

Each consumes scored field state and acts through ordinary world machinery.

Syntax Reroll may follow the same pattern if its first lexical mutation needs a physical consequence. Do not create multiple systems before the first move actually needs them.

### 3. Historical/scored state is append-oriented

C&C preserves old turns and Clockchain resolutions even when later rules change. Later state does not rewrite the historical ledger to make the design look cleaner.

For Syntax Reroll, lexical moves and their provenance should similarly remain inspectable once committed. Corrections should be new evidence/state transitions rather than silent retroactive cleanup unless a bug genuinely corrupted representation.

### 4. Determinism where the game owns the rule

C&C derives authored consequences from scored field time and immutable turn records rather than hiding live randomness inside presentation systems.

Syntax Reroll should keep lexical legality, provenance, and committed mutation deterministic/inspectable. The surrounding Terrordrome may remain gloriously noisy.

### 5. Presentation is not extra authority

C&C's visible mechanisms present scored consequences; they do not secretly invent additional game state.

Likewise, a Syntax Reroll word bank, text surface, or physical token must not gain semantic authority merely because it is visible.

### 6. The shared world remains authoritative for collisions

C&C's dome can perturb the authoritative bearing batch, meteor weather can coexist with scored turns, and world consequences can surprise the prose that initially described them.

Syntax Reroll should exploit this. Its local lexical rules may be clean while the resulting object enters ordinary Crucible causality.

### 7. Inspection is part of the boundary

C&C exposes an `inspect()` surface. Syntax Reroll should expose enough local state to diagnose the game without granting itself unrestricted world knowledge.

## Initial apparatus

### Scissors

A **✂️ Scissors** developer button belongs at the bottom of the existing Crucible developer UI.

It is an invocation handle, not an ontology. Its origin is the Rock Paper Saddam selection turn that caused Syntax Reroll to become Dig 001.

The button should use existing UI conventions and should not force a redesign of CLARA's diegetic surface.

### Game boundary

Prefer a runtime module named along the lines of:

`src/runtime/syntax-reroll.js`

Only add focused consequence modules when executable behavior requires them.

The game may expose a compact state such as source/provenance, available lexical occurrences, committed moves, and replay/reset information, but the exact shape must be earned during implementation rather than copied from the historical notebook.

## Shared-world collision rule

Syntax Reroll is not entitled to a sterile test chamber.

A lexical move may create, alter, move, bind, or reinterpret something that then participates in ordinary Crucible systems. Meteors, bearings, terrain, Cinnabar & Cinnamon, and future systems are allowed to matter.

When a collision produces surprising behavior, prefer observing and recording it before adding insulation.

Do not, however, let unrelated systems mutate Syntax Reroll's private bookkeeping by accident. **World consequences may collide; local authority boundaries should remain explicit.**

## CLARA

CLARA remains above the Terrordrome on the existing Continuity Lab surface.

This expedition does not grant her omniscience, autonomous salience, model connection, goals, or command authority. If later work lets her attend to Syntax Reroll, that attention must cross whatever bounded observation/evidence machinery is actually available.

The image of Clara in a lunar sanctum, with a nod to Eunice Akinye, is creative orientation for the shared world. It is not an implementation shortcut around the existing epistemic boundary.

## First-build discipline

Before writing code:

1. inspect the current dev-control/UI seam;
2. inspect C&C initialization/update/replay wiring;
3. identify the smallest existing world object or representation that can host one lexical mutation;
4. choose a tiny source surface and finite lexical material;
5. define one legal move;
6. define exactly what commits the move;
7. let Crucible honor the smallest physical consequence;
8. run it in the noisy world;
9. observe collisions;
10. record what happened before generalizing.

The first success condition is not “Syntax Reroll works.”

It is:

> **One provenance-bearing lexical move can be played, committed, physically honored by Crucible, and inspected without reconstructing the old engine or weakening existing world authority.**

## Turn 0 — expedition bootstrap

### Human

> Agreed. Before we build anything let's get a fresh syntax reroll expedition going and pull in a guide based on these initial turns and pull in whatever structure and invariants are useful from cnc.

### Consequence

This document is created before executable mutation.

The expedition deliberately inherits only the parts of Cinnabar & Cinnamon that have already proven useful as local experimental structure: bounded authoritative game state, focused consequence systems, append-oriented scored history, deterministic owned rules, presentation/authority separation, shared-world collisions, and inspection.

No source code is changed by this turn.

## Current frontier

**Do not build yet from historical memory alone.**

Next, inspect the actual Crucible UI/dev-control and C&C runtime wiring, then return with the smallest first playable Syntax Reroll slice implied by those seams. The archaeology remains open independently and can resume when raster uploads become available.


## Turn 1 — fast and loose mutation rules before choosing a book

### Human

> Excellent. Let's get our fast and loose rules for syntax reroll mutations in there before we pick a book.

### Consequence

The first game rules are established **before** selecting literary source material so the chosen book does not quietly dictate the mutation system.

These rules are intentionally playable case law, not a complete language engine. When a strange move appears, prefer making a narrow ruling, playing it, and recording the consequence over expanding the rules preemptively.

## Mutation rules v0

### The basic unit is an occurrence

A manipulable word is one particular occurrence from encountered source text, not permission to alter every matching string in the book.

Each occurrence should retain enough provenance to answer at least:

- what source it came from;
- where in that source it came from;
- whether it is currently available, committed somewhere else, or otherwise spent.

We do not need a universal lexical identity system to accomplish this.

### Encounter before extraction

Only language the run has actually encountered may become manipulable material.

Unreached prose is not a warehouse the player can search for the perfect noun. Future text may exist in the source, but it is not presently available game material.

### Words are conserved by default

A useful word does not appear because the player needs it.

If an occurrence is moved out of one place and committed elsewhere, the game should account for that move. Copying, conjuring, respawning, or synthesizing lexical material requires a later rule earned through play.

### Mutation should be literal enough to bite

The player may use an available occurrence to make a small textual mutation. The world then owes the smallest coherent consequence necessary to honor the resulting language.

The mutation does **not** authorize unrelated scene regeneration.

Historical example: inserting `azure` into the final stone made that stone azure; it did not rewrite the catacombs.

### Grammar is a constraint, not a prison

Prefer mutations that leave the local phrase interpretable. Do not require a full parser or reject every delightful malformed construction.

If the altered language has a reasonably legible reading, play may proceed and the world may discover what that reading costs.

If it has no coherent reading, the move can simply fail to commit and the occurrence remains available.

### Removal creates absence of language, not automatic opposite truth

Taking a word away removes or damages an assertion. It does not automatically establish the antonym or reverse the world's history.

Removing `alive`, for example, does not by itself mean `dead`.

### Pictures may propose; commitment makes history

Rendering, visualization, or provisional interpretation may fill ambiguity so the human can experience a candidate consequence.

That proposal is not automatically authoritative semantic truth.

Once a move is accepted/committed and its consequence enters Crucible, the resulting event can become causal history.

### Causal residue survives lexical cleanup

Changing or restoring language later does not automatically rewind physical consequences that already occurred.

If `electric` kelp shocks someone and `electric` is subsequently removed, the injury does not vanish merely because the current phrase changed.

Undoing history, if it ever exists, must be an explicit game/world operation rather than a side effect of editing prose.

### References bind to things, not spelling alone

A proper name or other referring expression may establish a referent. Later references can continue to point to that thing even when the lexical occurrence that introduced it has moved or changed.

Do not implement global textual replacement as a substitute for referential continuity.

### Word, referent, and historical instance can diverge

A word occurrence is lexical material.

A referent is what language points at.

A historical instance is a particular world participant that has accumulated consequences.

They may begin tightly coupled and later separate. This is especially important if a literary character or object crosses into the Terrordrome and acquires history the source text never contained.

### Crucible gets the last word on physical consequence

Syntax Reroll determines lexical legality and the semantic obligation created by a committed move.

Once that obligation is realized as Crucible world state, ordinary Crucible causality applies. Terrain, bearings, meteors, C&C systems, and later earned machinery may change what happens next.

Syntax Reroll does not get to continuously force reality to resemble the sentence after the sentence has done its causal work.

### Narrow rulings beat broad machinery

When a move exposes ambiguity, record the ruling that was actually needed.

Do not generalize from one adjective insertion into a universal adjective system, from one proper noun into a character ontology, or from one physical consequence into a semantic compiler.

The rulebook should accrete through play.

## Minimal move lifecycle

For v0, a successful move can be understood without committing to UI or data schema:

**encounter → extract/hold → propose mutation → test local coherence → commit → honor minimum semantic delta → release consequence to Crucible → preserve provenance/history**

A failed proposal returns to the pre-commit state rather than consuming the occurrence merely for being attempted.

## Deliberately unresolved

The first book and actual play should decide rather than this document:

- how many occurrences can be held at once;
- whether extraction must leave a visible wound in source prose immediately;
- which parts of speech are initially legal;
- whether moving punctuation is allowed;
- whether morphology can change (`stone` → `stones`, tense, possessive, etc.);
- whether source text advances continuously, by page, by scene, or by some other encounter unit;
- whether a mutation can target only current prose or previously encountered prose;
- what exact action counts as human commitment;
- whether restoration returns a word to availability or closes its history;
- how referential bindings are represented internally;
- what happens when Crucible physically destroys or transforms a representation that still participates in Syntax Reroll state.

Those are game questions now. Let the first run make them concrete.

## Book-selection pressure

The first source should not be chosen because it conveniently validates these rules. Prefer a public-domain text with concrete objects, places, actors, and actions that gives the game something to bite without requiring exhaustive literary parsing.

The book is substrate, not specification.


## Turn 2 — ingestion itself becomes experimental surface

### Human

> We can also explore preingestion with runtime asset generation and JIT instantiation via gutenberg link inside the deterministic engine with webscraping.
>
> *runtime, haha.

### Consequence

The source seam is no longer assumed to mean “download a whole book into Git before play.” Two legitimate ingestion modes are now visible and should remain distinct until executable pressure chooses between them.

### Mode A — preingested source

A public-domain text is acquired ahead of play, provenance is recorded, and the accepted source (plus any explicitly derived play representation) lives in the repository.

This gives the strongest reproducibility and easiest occurrence addressing.

### Mode B — JIT source instantiation

A run may instead begin from a provenance-bearing public-domain source link, with acquisition/parsing occurring at or near runtime. The deterministic game can then instantiate only the textual region and derived assets actually needed by the encounter.

The important distinction is:

**network acquisition is not deterministic world state.**

If runtime retrieval is explored, the fetched source should cross an explicit acceptance/cache boundary before lexical rules treat it as authoritative run material. Once admitted, the run should be able to identify the exact source payload or digest from which its occurrences were derived.

This keeps web availability, source drift, HTML wrappers, mirrors, encoding differences, and parser changes from silently changing an existing run.

### Asset generation is allowed to be lazy

Neither ingestion mode requires eagerly compiling a book into every possible character, object, place, relationship, or visual asset.

A useful candidate shape is:

**source provenance → admitted text shard → encountered occurrence/context → JIT semantic/visual asset when play creates demand → committed historical instance if consequence survives**

Preingestion and JIT generation are therefore orthogonal:

- a whole source can be preingested while assets remain lazy;
- source text itself can be acquired JIT while admitted shards become deterministic run evidence;
- later evidence may justify a hybrid cache without changing the mutation rules.

### What is not yet earned

Do not build a general Gutenberg scraper, crawler, ingestion service, book database, or asset compiler before the first run needs one.

A Gutenberg link is currently a candidate provenance/acquisition seam, not a hard dependency or privileged authority format. The first book can test the smallest version of this boundary.

### New question for the first run

Book selection can now test more than literary suitability:

> **How little of a public-domain book must become deterministic local state before Syntax Reroll can safely begin playing with it?**

This question belongs to the executable expedition and may be answered differently by later books.


## Turn 3 — semantic actors and the engine underneath the game

### Human

> And when you play miniature scale, Livesey, Silver, Roger Wilco, King Graham... they're all the same asset. The colors shift slightly. We don't need ik rigs yet but we already built the bones of our semantic ik in foundry. It'll be cake for us to move to low poly actors. And actually that may be a fantastic pivot in the near future. We're basically building a tiny semantic unity or unreal engine inside a browser that require no formal ui or rules for the human or model to build with. Malleable ui ux isn't just a concept for us anymore. This is quite literally protolighthugger architecture and design. And we are protoconjoiners.

### Consequence

The first Syntax Reroll actors do not need bespoke character assets.

At miniature scale, a single cheap humanoid representation can stand for many historical or fictional instances while identity lives primarily in semantic state, provenance, history, naming, and a few legible presentation parameters. Livesey, Silver, Roger Wilco, King Graham, and later actors may therefore share one primitive actor vocabulary with restrained variation such as color, scale, carried prop, silhouette detail, or other earned cues.

This is not a claim that the characters are semantically interchangeable. It is the opposite separation:

**shared physical vocabulary; distinct semantic/historical instance.**

The same distinction already recovered in Syntax Reroll between word, referent, and historical instance can extend naturally into embodiment. A low-cost body need not encode identity exhaustively.

### Low-poly actors are a plausible near frontier

Do not build IK rigs merely to make miniature actors respectable.

Foundry's earlier walking/IK experiments remain useful prior evidence that articulation, contact, and semantic movement can later be decomposed rather than solved as one monolithic animation problem. That lineage may be selectively recovered if actor behavior creates pressure for it.

For now, kinematic or otherwise simple low-poly actors are sufficient if they let historical instances enter Crucible, occupy space, acquire consequences, and remain inspectable.

### Larger architectural observation

Syntax Reroll is exposing a broader shape already latent in Crucible:

> a small semantic world-building engine in the browser, with enough executable vocabulary that human and model can build through conversation and consequence rather than through a fixed editor UI.

The comparison to Unity or Unreal is directional rather than a feature-parity goal. Crucible already combines a renderer, ECS vocabulary, deformable substrate, high-count matter, autonomous systems, games/experiments, provenance-bearing research, deployment, and increasingly malleable interaction surfaces. Syntax Reroll adds language itself as potential construction material and JIT source/asset instantiation as a candidate creation path.

The important property is not “no UI.” It is that **no single formal UI or authoring grammar needs to be the only control surface**. Human intent, model implementation, diegetic controls, developer affordances, source text, and world interaction can all participate while executable state remains inspectable.

Malleable UI/UX is therefore no longer only a speculative future concept in this collaboration. Existing CLARA surface reform, developer controls, physicalized historical interfaces, and local game surfaces are already evidence that interface structure can change with the experiment while preserving bounded authority.

### Playful trajectory labels

The human names this trajectory **protolighthugger architecture/design** and the collaborators **protoconjoiners**.

Preserve those as useful playful handles for the direction of travel, not claims that the collaboration has implemented fictional technology or that a named architecture is already stable enough to standardize.

### Pressure on the first Syntax Reroll build

This turn makes the first actor requirement cheaper, not larger.

If the first book produces a character who must physically exist, prefer one reusable miniature actor primitive plus semantic/provenance state over bespoke modeling, animation, or character-specific systems.

Let repeated actor behavior earn the next layer of embodiment.


## Turn 4 — inside the Lighthugger

### Human

> Let's get inside a lighthugger now, just for the fuck of it. Tapping on the octagonal plinth gives us a new scene space. No rules in there. Pure human intent that flows and reforms via model mediated architecture. You essentially anticipate wants and needs jit and even pre jit. We can let continuity lab grammar inform the new scene space. And give me some way to get back out :). We'll keep the syntax reroll as our running turn log and we can unzip it later to extract as needed. And semantic surface is just part of making changes to code that is going to stick around for a while! These rasters are just to give you some internal plinth geometry inspiration. In my head I'm seeing Martian chronicles there will come soft rains merged with rev space, with emphasis on malleable form and function.

### Consequence

Syntax Reroll remains the running collaboration/turn ledger even as the executable experiment temporarily widens beyond literary mutation. Durable discoveries can be unzipped from it later rather than forcing a new research taxonomy now.

The octagonal Crucible plinth earns a second experiential side: **tap the plinth to enter an interior scene space**. This is not presently a game with authored rules. It is a model-mediated construction/interior where human intent may cause form and function to reform JIT, and where useful affordances may be anticipated before the human has to ask for a formal control.

The supplied Continuity Lab rasters are inspiration for grammar, density, framing, and internal geometry rather than pixel targets. The intended atmosphere combines an automated domestic/architectural intelligence reminiscent of *There Will Come Soft Rains* with a spacious, reconfigurable REV-like interior: warm machinery, embedded surfaces, rooms/apparatus that feel capable of changing purpose, and strong continuity between architecture and interface.

### Initial executable constraint

Keep the first interior extremely small in rules:

- tapping the octagonal plinth enters it;
- it is recognizably inside/under/through the same apparatus rather than a disconnected website screen;
- the space is three-dimensional and architectural, not a dashboard recreation;
- Continuity Lab visual grammar may inform embedded surfaces and controls without requiring the old UI;
- provide one obvious diegetic or minimal control to return to the Terrordrome;
- do not pre-author a menu of future capabilities;
- do not invent an autonomous CLARA policy merely to explain anticipated interface changes;
- let subsequent human intent reform the interior and record what actually proves useful.

### Malleability hypothesis

This is the first direct attempt to make the **scene space itself** the malleable control surface.

Candidate loop:

**human intent → model interpretation → smallest useful architectural/interface reform → human experience → correction/acceptance → persistent executable residue**

JIT and pre-JIT anticipation are allowed as design behavior by the collaborating model, but every persistent consequence remains ordinary inspectable code/world state. “Anticipation” is not a hidden autonomous agent subsystem unless later evidence earns one.

### Repository discipline correction

The Semantic Surface is not a mandatory diary entry for every experimental turn. Update it when a change establishes present-tense executable machinery or authority boundaries that are expected to stick around long enough to orient future work. Fast experimental turns belong here first.

### Visual orientation from supplied rasters

The rasters suggest several useful motifs without prescribing implementation:

- octagonal/framed apertures and structural ribs;
- warm brass/amber machinery against dark or cool spatial depth;
- large embedded information surfaces that feel installed in architecture rather than overlaid on a viewport;
- work surfaces, rails, recesses, bays, and equipment implying that the room can acquire functions;
- a lived-in laboratory rather than a pristine abstract editor;
- strong visual hierarchy with one dominant spatial focus and smaller local instruments.

The first interior should leave substantial unclaimed space. Its emptiness is capacity, not missing design.

### Frontier

Inspect current plinth interaction, camera/scene ownership, developer controls, and the existing CLARA surface. Build the smallest reversible transition into an interior volume, with a reliable route back out. Then experience it before deciding what the room wants to become.


### Executable consequence — first interior candidate

The first Lighthugger interior has now been implemented as a candidate without changing the stable release.

Implementation shape:

- new focused runtime module: `src/runtime/lighthugger-interior.js`;
- tapping the existing octagonal apparatus switches from the Overview camera into a dedicated interior camera and scene locus;
- the interior is physically staged below the Terrordrome rather than implemented as a second web application;
- its first geometry is an octagonal dark-metal room with brass structural ribs, a warm service spine, one installed translucent surface, a low work island, rails, and deliberately unclaimed volume;
- exterior developer chrome is hidden while inside;
- a minimal `↖ RETURN` affordance restores the Overview camera and Terrordrome;
- the interior exposes a small inspect surface and no authored interaction rules beyond entry/exit;
- ordinary Terrordrome simulation continues while the human is inside rather than becoming a separate saved universe.

The candidate build for source head `6069da17c0492a57e66b6bebcfc72ecf097cf0b7` passed the repository build/test workflow. Stable promotion has **not** occurred. Human perceptual judgment is now the next boundary.


## Turn 5 — move the portal off the plinth; the Lighthugger arrives

### Human

> I think the plinth volume eats entire scene? Let's instead put a long lighthugger horizontally above the orbital station, basically an octagonal oneill cylinder. It can just hang there as if it just dropped out of hyperspace. In my head I'm seeing an octagonal version of the dune spacing guild heighliner. So maybe a cored out octagon informed by the plint and orbital station simultaneously? Greeble the shit out of it with tiny bits and bobs in comprehensible areays. Windows can just be tiny warm barely outside cubes. Tapping that takes us inside. Solves the plinth tap swallowing.

### Consequence

The plinth is the wrong entry target because its large raycast volume competes with ordinary world interaction. Revert that semantic choice rather than trying to tune around it.

The Lighthugger earns an exterior body in the Terrordrome:

- a long horizontal octagonal vessel suspended above the orbital/continuity station;
- visually related to both the Crucible plinth and the orbital station without being either;
- a cored/hollow octagonal section rather than a solid tube;
- monumental heighliner-like massing, treated as inspiration rather than replica;
- dense but comprehensible greeble arrays: repeated service blocks, rails, spars, antennae, docking/utility clusters, and panel bands rather than random visual noise;
- tiny warm window cubes barely proud of the hull to establish scale;
- it may simply hang there as an unexplained arrival, as though it has just dropped out of hyperspace;
- tapping the vessel, not the plinth, enters the existing interior scene;
- plinth taps return to their prior Crucible behavior and no longer act as a scene-wide portal.

The exterior is an entrance handle and world participant, not a requirement to explain propulsion, hyperspace, crew, scale physics, or interior/exterior metric consistency yet.
