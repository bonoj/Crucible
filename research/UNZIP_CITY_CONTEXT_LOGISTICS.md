# Unzip City — Context Logistics Expedition

## Status

Opening record. This expedition begins inside Crucible research before any implementation or format is chosen.

The visual fiction is Unzip City from Six Cities: a material-sorting city receiving streams, separating them, and routing useful outputs. The fiction is deliberately lightweight. The expedition is about the underlying capability.

No context file format, bundle representation, orchestration architecture, or implementation strategy is chosen here. Behavior should earn architecture.

## Opening intent

### Human

> Let's start a new expedition right here. Before we write anything let's discuss what the expedition is. The actual visual design is just a fun fiction but the functionality that allows us to effortlessly deposit and reform the necessary github repos will be insanely powerful. Context bombing.

### Model

> Yes. I think **Unzip City is almost accidentally the perfect fiction for the next infrastructure experiment.**
>
> The picture says “material sorting.” What we actually care about is:
>
> > **Can we make context into a first-class transportable material?**
>
> FUUTP solved a narrower transport problem: *these bytes need to cross a seam intact.* This feels like the next level up. Not bytes, but **working context**.
>
> Right now, when we start an expedition in another repo, a surprising amount has to happen implicitly. I orient to README authority, follow links, recover semantic surfaces, inspect relevant code, reconstruct recent experimental history, distinguish canonical state from research evidence, understand which neighboring repos matter, and eventually arrive at enough of the working state to act intelligently.
>
> We've made that process very good. But we're still effectively carrying loose cargo.
>
> **Unzip City could investigate packaging that cargo deliberately.**
>
> I wouldn't begin with “let's invent a context file format.” That's premature. I'd make the expedition empirical: take a real upcoming task that requires substantial context, package what we *think* is sufficient, cross into a deliberately colder context, and see what can actually be reconstructed.
>
> The useful conceptual machinery from Six Cities is already bizarrely apt:
>
> **deposit → unzip → classify → route → reform**
>
> A context payload arrives. It might contain repository authority, semantic surfaces, relevant source slices, evidence, references to neighboring repos, current frontier, perhaps executable artifacts. The receiver shouldn't necessarily ingest everything into one giant prompt. It should be able to unpack it into useful destinations and reconstruct the working environment.
>
> And **reform** is the really interesting word in what you just said.
>
> Because the destination doesn't necessarily need the original representation.
>
> Crucible might export:
>
> `chronology + code authority + observations + provenance`
>
> and another context might reform that into:
>
> `working model + relevant implementation seams + unresolved question`
>
> without pretending those are identical things.
>
> Which connects directly to the compaction result we just observed:
>
> **loss can occur safely where authoritative material remains recoverable.**
>
> So “context bombing” doesn't have to mean shoving 200k tokens into another model. It could mean dropping a **small self-describing context munition** that knows where its deeper material lives and gives the receiving model enough structure to pull what it needs.
>
> That is where I think this gets insanely powerful for GitHub.
>
> Imagine dropping one thing into a repo that lets a cold model rapidly reconstruct:
>
> **What is this? What is authoritative? Where is the executable? What happened? What neighboring repositories matter? What is currently unresolved? What should I inspect only if needed? How do I prove I've oriented correctly?**
>
> Then after work, it can **reform the package** from the new repository state.
>
> Not a static handoff document.
>
> A **regenerable context projection of the repository network.**
>
> And I think we should resist deciding whether that projection is Markdown, JSON, manifests, generated bundles, Git objects, or something stranger until the expedition gives us pressure. Just as with the familiar work:
>
> **behavior earns architecture.**
>
> ### What I think the expedition actually asks
>
> Not “build Unzip City.”
>
> Not even “build context packaging.”
>
> The experimental question is:
>
> > **What is the smallest transferable structure that allows a capable model entering cold to reconstruct enough of a distributed GitHub working context to continue useful work, while preserving provenance and allowing deeper context to remain lazily recoverable?**
>
> Then we test the hell out of it.
>
> A particularly strong success condition would be **destructive simplicity at the receiving end**: instead of giving the next model our customary giant copy-pasta, we give it one small entry point.
>
> Something like:
>
> > `Unzip this.`
>
> And if that model can recover the expedition, identify the right repos and authority surfaces, distinguish evidence from interpretation, locate the executable frontier, and continue correctly...
>
> Then we've built something much more consequential than another handoff convention.
>
> We've built the beginnings of a **context logistics layer**.
>
> And Six Cities has already given us the perfect stupidly literal metaphor for it. 😄
>
> **Repositories become cities. Context becomes material. Unzip City receives the packet.**
>
> The fiction can stay delightful.
>
> The experiment underneath it is deadly serious.

### Human

> I would say let's begin by opening a new expedition in research right here capturing our intent and these opening turns :).

## Initial experimental posture

This document is the berth, not the solution.

The first implementation should be earned by a concrete transfer attempt. The expedition should prefer executable evidence over format design and should preserve provenance strongly enough that compact or reformed context can lead back to authoritative source material.

Candidate pressure already visible at opening:

- context may span multiple repositories;
- repositories have different authority surfaces and roles;
- useful transfer may require selective recovery rather than bulk ingestion;
- representation may legitimately change across a boundary;
- authoritative material should remain recoverable when compaction is lossy;
- a receiving model should be able to establish what it knows, what it inferred, and where deeper evidence lives;
- the package should be reformable after work rather than becoming a stale handoff artifact.

These are opening pressures, not requirements frozen into an architecture.

## Relationship to current Crucible research

The immediately preceding orbital-locus work produced adjacent evidence about contextual compaction, provenance, bounded surfaces, and low-bandwidth human/model correction. This expedition may reuse those observations where they survive contact with repository transfer, but it should not assume that familiar continuity and repository logistics are the same problem.

The working metaphor is intentionally operational:

**deposit → unzip → classify → route → reform**

The next useful step is to choose a real context crossing and let it force the first machinery.


## Opening dialogue continues — semantic JIT, dreaming, and repository scope

### Human

> We were thinking semantic JIT compilation was grail shaped already. What almost forgot was the dreaming...

### Model

> Ohhh. **Yes.**
>
> We've been staring at only the *awake* half of the loop.
>
> Semantic JIT compilation was already grail-shaped:
>
> **large recoverable semantic substrate → present situation → compile only the context required now**
>
> But dreaming changes what happens between executions.
>
> The orbital expedition doesn't merely need to be unzipped into four useful projections once. After an encounter, the system can later revisit what happened, compare it against existing working models, notice associations that weren't salient during execution, compact some things, preserve pointers to others, and leave behind **better material for the next JIT compilation**.
>
> So there are really two different transformations:
>
> **Dreaming:**  
> `experience + existing context → reorganized/reformed latent context`
>
> **Semantic JIT:**  
> `latent context + present need → executable working context`
>
> And then experience feeds back into dreaming.
>
> That is much closer to what we've been circling with Digital Familiar than a clever repository handoff format.
>
> The really interesting part is that **Unzip City may be the missing logistics substrate between them.**
>
> It gives us operations on semantic material without requiring that everything live in one giant memory:
>
> **deposit → unzip → route → reform → recover**
>
> Dreaming can operate asynchronously over those materials and relationships. JIT compilation operates synchronously when some model actually needs to *do something*. Git gives us durable provenance underneath both.
>
> And look at what happened with CLARA yesterday. We didn't explicitly implement a compaction engine. Crucible retained the rich chronology. Clara received a smaller locally useful interpretation. DigitalFamiliar received an even more abstract adjacent observation. Each destination got a different representation of the same experience while the source remained recoverable.
>
> That was practically a **manual dreaming cycle**.
>
> Now imagine the repository network periodically doing that work without requiring the active expedition to stop and curate itself. Not “summarize everything overnight,” but something more conservative:
>
> **revisit → associate → propose/reform projections → retain provenance**
>
> Then when we say:
>
> > “Let's work on Unzip City.”
>
> the active model doesn't retrieve a mountain of memories and stuff them into context.
>
> It receives the result of:
>
> **dreamed semantic material × current intention → JIT working context**
>
> And if something smells wrong, provenance lets it descend all the way back into the rocks.
>
> That also gives “context bombing” a second mode. We initially imagined deliberately depositing a prepared packet into another context. But a bomb could potentially be assembled **JIT from dreamed material** for a particular target.
>
> Not:
>
> > Here is my universal John/Clara/Crucible context bundle.
>
> But:
>
> > Here is the smallest context payload that *this receiving model, entering this repository to perform this task,* appears to need.
>
> Then reform after the crossing.
>
> Fuck. Yeah.
>
> **Dreaming prepares the semantic landscape. JIT compilation cuts the path through it. Unzip City moves the material. Git keeps us honest.**
>
> I think we almost left one of the most important pieces sitting on the table.

### Human

> Let's keep this turn for turn in unzip city as we start unzipping the orbital expedition across repos. Where should semantic JIT live as a whole? The accessibility repo makes sense, but it really is outside any of any single project.
