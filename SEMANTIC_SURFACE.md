# Crucible — Semantic Surface

This file states present-tense truths about Crucible's executable systems. It is not an implementation plan, experiment diary, or instruction manual.

## The orbital station is a permanent Crucible fixture

Crucible contains one persistent orbital station descended visually from World Lab's `OrbitalConstruction T1`.

The station is an ECS entity with transform, rendering, continuity-locus identity, and a projected footprint. It occupies the same authoritative world as terrain, meteors, matter, light, and cameras. It is not a detached overlay or a god object.

Its current apparatus motion is a deterministic 90-second elliptical sweep centered above Crucible at altitude 8.5, with horizontal radii 4.2 and 3.2 world units. A separate quiet attitude drift changes its orientation. This motion is apparatus behavior, not evidence of agency or navigation.

The station casts ordinary world shadows.

## A footprint describes spatial availability, not perception

The station owns a generic projected `Footprint`.

Its current footprint is an 18-degree downward cone capped at 4.5 world units of radius. The resolved radius depends on the station's height above the terrain directly below it.

The footprint boundary is resolved against current terrain height. Its visible pale ring is diagnostic rendering of the footprint, not the footprint itself and not an in-world force field.

Generic footprint membership is horizontal geometric intersection. ECS entities participate only when they explicitly expose `SpatialBounds`. Being inside the footprint does not by itself mean an entity is perceived.

Terrain remains physical substrate rather than being converted into a bounded occupant.

## Apertures turn available world evidence into bounded observations

The station currently carries one aperture of kind `scene-summary`.

The aperture can sample only through the station's resolved footprint. A sample produces an immutable ECS `Observation` with provenance identifying the observer, aperture, sample time, and footprint state.

The current measurement contains:
- ground height at footprint center;
- a deterministic terrain profile sampled at the center and three twelve-point radial rings;
- explicitly bounded ECS occupants intersecting the footprint.

The aperture is not given terrain deformation history, meteor history, semantic feature labels, renderer contents, or unrestricted ECS state.

Observations are currently sampled every three seconds during normal runtime.

## Spatial analysis is downstream of observation

A generic observation-analysis system can consume a frozen terrain-profile observation.

Its terrain derivation uses only recorded observation data. It has no terrain-system, renderer, footprint-system, meteor-history, or other route back to authoritative world state.

Current derived evidence includes elevation minimum, maximum, mean, relief range, roughness, center elevation relative to the outer ring, and the strongest sampled height deviation.

These are low-level spatial derivations. The analyzer does not label craters, impacts, hazards, targets, or interesting features.

The existence of an analysis tool does not imply that a future model-mediated locus must use or attend to it.

## Observation is not behavior

The orbital station currently has no model connection, goals, attention policy, autonomous decision-making, memory summary, semantic event history, object recognition, or command authority over Crucible.

Its instruments make bounded evidence available. They do not prescribe what should matter or what should happen next.

## Research apparatus is separate from station capability

Crucible contains controlled spatial-probe machinery for testing the observation chain against known physical conditions. The probe apparatus can reset/deform terrain and temporarily position the station for repeatable captures.

Those powers belong to the laboratory test bench, not to the orbital station.

Pure CI tests also exercise the downstream spatial derivation against synthetic height profiles. Passing those tests establishes properties of the derivation math; it does not establish live-world recognition by the station.

## Current epistemic chain

The present observation path is:

**authoritative world state → projected footprint → aperture measurement → immutable observation → optional blind spatial derivation**

Each boundary is intentionally explicit. Later systems may earn additional apertures, tools, or ways to act without collapsing these layers into direct omniscience.
