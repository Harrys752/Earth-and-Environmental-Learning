# Non-V1 Ideas & Future Architecture Considerations

In accordance with Section 27 of the Earth & Environmental Sciences Learning Platform specification, the following concepts are intentionally deferred from the V1 static release:

## 1. Collaborative & Social Learning
- Synchronous multi-user investigations
- Community forums or discussion threads
- Peer review of field observations
- Classrooms and instructor dashboards

## 2. Server-Side Authentication & Sync
- Cloud account sync across devices
- Database-backed user profiles (e.g. Supabase, PostgreSQL)
- *Rationale:* V1 prioritizes guest-first accessibility with zero mandatory backend, preserving 100% free hosting on GitHub Pages.

## 3. Advanced Physics Engines & 3D Simulations
- Three.js / WebGL volumetric magma fluid dynamic solvers
- Real-time finite element stress accumulation models for fault rupture
- *Rationale:* V1 prioritizes pedagogical clarity and accessible kinematic schematics over computationally heavy visual simulations.

## 4. Full GeoMap Embedded Integration
- Direct embedding of GeoMap via iframe or shared WebGL context
- Bi-directional shared state between GeoMap and Learning Platform
- *Rationale:* Keeping the two platforms independently deployable and decoupled via URL parameters avoids brittle tight coupling.

## 5. Live Telemetry & Real-Time Disaster Alerting
- BMKG live seismic feed streaming
- Real-time volcanic tremor alerts or evacuation routing
- *Rationale:* Learning platform is an educational tool, not an emergency warning system.

## 6. Onboarding & Guided First-Time Visitor Roadmap
- Homepage: add a lightweight first-time-visitor 'Start here' roadmap/guided entry point, per user feedback.

