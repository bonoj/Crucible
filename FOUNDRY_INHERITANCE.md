# Foundry inheritance

Crucible inherits Foundry additively. Nothing already present in Crucible is deleted to make room for this migration.

## Authority

`reference/FOUNDRY_DONOR.html` is the exact vendored Foundry executable and the implementation authority for this migration. Do not reconstruct Foundry behavior from memory when the donor contains working code.

## Migration rule

Port coupled behavior as coupled behavior. Preserve working constants, ownership, update order, support/collision rules, allocation strategies, and cleanup semantics until executable parity is established. Adapt coordinates/scale and Crucible integration seams only where required. Optimize or redesign after parity, not during the transplant.

## Required inheritance surface

### Physical substrate
- signed-density deformable terrain and final clipped terrain geometry
- retained terrain GPU buffers
- mesh-authored conservative bearing support field
- immutable octagonal apparatus support and side collision
- bearing typed-array storage, alive state, kinds, claims, spawning, killing, pile approximation, render sampling, gravity modes, attractor, and granular impact
- meteor/appartus contact and meteor/terrain/bearing causal behavior
- presentation FX and diagnostics/profiling where behavior depends on them
- bounded water volume

### Payloads and deployment
Preserve both the active cupboard and dormant earned archaeology:
- PYLON
- SPIDER JACK
- MOLE
- THUMPER
- CRANE SEED
- HOPPER
- CRAWLER EGG
- JUMPER EGG
- FLOATER EGG
- BRICK
- EXTRUDER
- LINK NODE
- TURRET
- DRONE FACTORY
- PIPE END
- METEOR
- orbital call-down / touchdown handoff
- shared live-entity gravity after delivery

### Matter and logistics
- extruder terrain bite and bearing yield
- ports and link-node binding
- link flow visualization / ammo transfer
- turret targeting, ballistic bearing rounds, hit/death rules
- bearing bursts and bearing kinds
- drone factory, claims, interception, carry, deposit, terrain-relative flight
- item pipes, pairing, claims, heterogeneous bearing transport, terrain-relative routing

### Embodied and mechanical probes
- IK WALKER
- WALKING SNAKE / millipede machinery
- dormant mechanical probe archaeology including FLIPPER, JAWS, TUMBLER, LEG, and TENDON
- their bearing contact and support behavior

### World probes retained as archaeology
- 25-wonder field and its materials/builders
- city-machine morphology field, reservoirs, launcher/drone/unzip/thumper/link/reservoir city machinery and motion
- water, civilization, wonders toggles/roots as capability even if Crucible does not expose the old Foundry UI

## Presentation policy

Inheritance does not require importing Foundry's old control panel. Capability may remain dormant/model-addressable until Crucible construction pressure asks for it. Do not delete dormant machinery merely because it is not exposed in the current Crucible UI.

## Acceptance

The bearing baseline is not accepted until the same class of evidence already demonstrated in Foundry is restored, including 200k active bearings at 60 FPS on the user's device while meteor impacts remain physically legible.

Payload migration is not accepted when only geometry appears. A payload is inherited when its causal dependencies and behavior work in the Crucible world.
