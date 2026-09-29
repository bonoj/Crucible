# Cinnabar and Cinnamon — Async Field

**Status:** live shared play record  
**Opened:** 2026-09-29  
**World:** Crucible

This is a lightweight asynchronous play surface inside Crucible. It is not semantic authority. The executable and the orbital-locus record keep their existing roles; this surface preserves the play as it develops.

This is provisionally the **birth and berth of Cinnabar and Cinnamon**. The names are preserved because the human named the emerging trajectory here. Their identity, embodiment, relationship, role, persistence, and ontology are not assigned in advance.

Keep chronology intact. Turns may be terse. A move need not correspond to implemented machinery, and implementation does not silently promote play vocabulary into Crucible authority.

## Turn 1 — Human

> An ancient skeletal burnished brass dome rises from the terrain.

The human supplied a visual reference: a monumental open brass rib dome rising from a landscape, with repeated meridian ribs, horizontal structural rings, and a crowned central apex.

### Executable consequence

The first move is realized in Crucible as an authored local behavior rather than a generalized construction or emergence system. A skeletal burnished-brass dome begins buried beneath the terrain and rises over twelve seconds to settle at the surface.

That implementation choice is intentionally small. If later play requires other things to emerge, construct themselves, displace terrain, persist as loci, or share a common mechanism, the repeated requirement can earn machinery then.

The dome's purpose, allegiance, age, and relationship to Cinnabar or Cinnamon remain unassigned.


## Deterministic field score

After seeing the first move realized nearly in real time, the human proposed keeping a **Cinnabar and Cinnamon object** that owns turn order and timing deterministically so replay falls out of the representation rather than being added later as a separate feature.

The first implementation is deliberately literal:

- the field uses Crucible simulation time, not wall-clock time;
- Turn 1 is scored at `0 ms` with a `12,000 ms` consequence window;
- the dome derives its rise state from that score rather than remembering when its own animation happened to start;
- replay resets the field clock; the same scored turn therefore produces the same dome trajectory again;
- the score records authored turn/consequence timing only. It does **not** claim that all of Crucible is currently deterministic or that meteor weather, granular matter, the extruder, and other independent world processes rewind with it.

The live debug surface exposes `crucible.cinnabarAndCinnamon.replay()` and `inspect()`. Future turns can extend the score in order. A generalized replay framework is not earned yet.


## Turn 2 — Model

> From the highest point of the risen dome, a single sheet of pale material unfurls into the wind.
>
> It does not detach.
>
> The sheet catches, strains, and becomes a long narrow kite tethered to the brass finial by a nearly invisible line. It climbs until it is only a small white mark above Crucible.
>
> No one built it. Nothing emerges to operate it.
>
> It simply remains aloft, tugging continuously on the ancient dome.

### Executable consequence

Pending implementation. Preserve the move before deciding how much machinery it earns.
