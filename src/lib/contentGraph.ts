/**
 * Static Knowledge Graph Resolver
 * Connects Concepts, Experiences, Locations, and Topics in a web of discovery.
 */

export interface KnowledgeNode {
  id: string;
  type: 'experience' | 'concept' | 'location' | 'topic';
  title: string;
  summary: string;
  href: string;
  badge?: string;
}

export interface RelatedContentResult {
  relatedExperiences: KnowledgeNode[];
  relatedConcepts: KnowledgeNode[];
  relatedLocations: KnowledgeNode[];
  learningPaths?: KnowledgeNode[];
}

export interface StaticGraphEntry {
  relatedExperiences?: string[];
  relatedConcepts?: string[];
  relatedLocations?: string[];
  relatedTopics?: string[];
}

/**
 * Static Relationship Registry (Compiled graph metadata)
 */
export const CONTENT_GRAPH: Record<string, StaticGraphEntry> = {
  // Experiences (17 total)
  'why-volcanoes-form': {
    relatedConcepts: ['subduction', 'volcanic-arcs', 'plate-tectonics-process'],
    relatedLocations: ['java-volcanic-arc', 'mount-merapi'],
    relatedExperiences: ['reading-rock-layers', 'how-rain-forms', 'why-do-earthquakes-happen', 'the-rock-cycle', 'ecosystem-recovery-after-eruption', 'whats-inside-the-earth'],
    relatedTopics: ['plate-tectonics', 'geology'],
  },
  'how-rain-forms': {
    relatedConcepts: ['condensation', 'atmospheric-pressure'],
    relatedLocations: ['bogor-rain-belt'],
    relatedExperiences: ['why-volcanoes-form', 'reading-rock-layers', 'why-are-there-climate-zones', 'why-do-landslides-happen', 'indonesian-throughflow', 'jakarta-sinking-city-groundwater'],
    relatedTopics: ['atmosphere', 'climate'],
  },
  'reading-rock-layers': {
    relatedConcepts: ['stratigraphy'],
    relatedLocations: ['karangsambung-geopark', 'sangiran-valley', 'sangiran-early-man'],
    relatedExperiences: ['why-volcanoes-form', 'the-rock-cycle', 'what-fossils-tell-us', 'what-makes-a-mineral-a-mineral'],
    relatedTopics: ['geology', 'paleontology'],
  },
  'why-do-earthquakes-happen': {
    relatedConcepts: ['plate-tectonics-process', 'subduction'],
    relatedLocations: ['palu-koro-fault', 'java-volcanic-arc', 'aceh-tsunami-rupture'],
    relatedExperiences: ['why-do-landslides-happen', 'why-volcanoes-form', 'the-rock-cycle', 'how-tsunamis-form', 'whats-inside-the-earth'],
    relatedTopics: ['natural-hazards', 'plate-tectonics'],
  },
  'the-rock-cycle': {
    relatedConcepts: ['stratigraphy', 'volcanic-arcs', 'subduction'],
    relatedLocations: ['java-volcanic-arc', 'karangsambung-geopark', 'indonesian-nickel-belt'],
    relatedExperiences: ['reading-rock-layers', 'why-volcanoes-form', 'what-fossils-tell-us', 'why-do-earthquakes-happen', 'what-makes-a-mineral-a-mineral', 'nutrient-cycling-tropical-soils'],
    relatedTopics: ['geology', 'plate-tectonics'],
  },
  'why-are-there-climate-zones': {
    relatedConcepts: ['atmospheric-pressure', 'condensation'],
    relatedLocations: ['bogor-rain-belt', 'makassar-strait'],
    relatedExperiences: ['how-rain-forms', 'why-do-landslides-happen', 'indonesian-throughflow'],
    relatedTopics: ['climate', 'atmosphere'],
  },
  'what-fossils-tell-us': {
    relatedConcepts: ['stratigraphy'],
    relatedLocations: ['sangiran-early-man', 'sangiran-valley', 'karangsambung-geopark'],
    relatedExperiences: ['reading-rock-layers', 'the-rock-cycle'],
    relatedTopics: ['paleontology', 'geology'],
  },
  'why-do-landslides-happen': {
    relatedConcepts: ['plate-tectonics-process'],
    relatedLocations: ['sumedang-landslides', 'palu-koro-fault'],
    relatedExperiences: ['why-do-earthquakes-happen', 'the-rock-cycle', 'how-rain-forms'],
    relatedTopics: ['natural-hazards', 'geology'],
  },
  'whats-inside-the-earth': {
    relatedConcepts: ['plate-tectonics-process', 'subduction'],
    relatedLocations: ['java-volcanic-arc'],
    relatedExperiences: ['why-do-earthquakes-happen', 'why-volcanoes-form', 'the-rock-cycle'],
    relatedTopics: ['earth-structure', 'plate-tectonics'],
  },
  'what-makes-a-mineral-a-mineral': {
    relatedConcepts: ['stratigraphy'],
    relatedLocations: ['indonesian-nickel-belt', 'karangsambung-geopark'],
    relatedExperiences: ['the-rock-cycle', 'reading-rock-layers'],
    relatedTopics: ['minerals', 'geology'],
  },
  'jakarta-sinking-city-groundwater': {
    relatedConcepts: ['atmospheric-pressure', 'condensation'],
    relatedLocations: ['jakarta-ancol-subsidence'],
    relatedExperiences: ['how-rain-forms', 'peatlands-carbon-storage-or-release', 'why-do-landslides-happen'],
    relatedTopics: ['hydrology', 'sustainability'],
  },
  'indonesian-throughflow': {
    relatedConcepts: ['atmospheric-pressure', 'condensation'],
    relatedLocations: ['makassar-strait', 'bogor-rain-belt'],
    relatedExperiences: ['why-are-there-climate-zones', 'how-rain-forms', 'the-carbon-cycle'],
    relatedTopics: ['climate', 'atmosphere'],
  },
  'how-tsunamis-form': {
    relatedConcepts: ['subduction', 'plate-tectonics-process'],
    relatedLocations: ['aceh-tsunami-rupture', 'palu-koro-fault'],
    relatedExperiences: ['why-do-earthquakes-happen', 'why-do-landslides-happen', 'why-volcanoes-form'],
    relatedTopics: ['natural-hazards', 'plate-tectonics'],
  },
  'ecosystem-recovery-after-eruption': {
    relatedConcepts: ['volcanic-arcs'],
    relatedLocations: ['krakatau-archipelago', 'mount-merapi'],
    relatedExperiences: ['why-volcanoes-form', 'the-carbon-cycle', 'nutrient-cycling-tropical-soils'],
    relatedTopics: ['environmental-systems', 'plate-tectonics'],
  },
  'the-carbon-cycle': {
    relatedConcepts: ['stratigraphy', 'atmospheric-pressure'],
    relatedLocations: ['krakatau-archipelago'],
    relatedExperiences: ['peatlands-carbon-storage-or-release', 'ecosystem-recovery-after-eruption', 'nutrient-cycling-tropical-soils', 'indonesian-throughflow'],
    relatedTopics: ['environmental-systems', 'sustainability'],
  },
  'peatlands-carbon-storage-or-release': {
    relatedConcepts: ['atmospheric-pressure'],
    relatedLocations: ['krakatau-archipelago'],
    relatedExperiences: ['the-carbon-cycle', 'jakarta-sinking-city-groundwater', 'nutrient-cycling-tropical-soils'],
    relatedTopics: ['sustainability', 'environmental-systems'],
  },
  'nutrient-cycling-tropical-soils': {
    relatedConcepts: ['stratigraphy'],
    relatedLocations: ['krakatau-archipelago'],
    relatedExperiences: ['the-carbon-cycle', 'the-rock-cycle', 'peatlands-carbon-storage-or-release', 'ecosystem-recovery-after-eruption'],
    relatedTopics: ['environmental-systems', 'geology'],
  },

  // Concepts
  'subduction': {
    relatedExperiences: ['why-volcanoes-form', 'why-do-earthquakes-happen', 'the-rock-cycle', 'how-tsunamis-form', 'whats-inside-the-earth'],
    relatedLocations: ['java-volcanic-arc', 'aceh-tsunami-rupture'],
    relatedConcepts: ['volcanic-arcs', 'plate-tectonics-process'],
    relatedTopics: ['plate-tectonics'],
  },
  'volcanic-arcs': {
    relatedExperiences: ['why-volcanoes-form', 'the-rock-cycle', 'ecosystem-recovery-after-eruption'],
    relatedLocations: ['java-volcanic-arc', 'mount-merapi', 'krakatau-archipelago'],
    relatedConcepts: ['subduction'],
    relatedTopics: ['plate-tectonics', 'geology'],
  },
  'plate-tectonics-process': {
    relatedExperiences: ['why-volcanoes-form', 'why-do-earthquakes-happen', 'why-do-landslides-happen', 'whats-inside-the-earth', 'how-tsunamis-form'],
    relatedLocations: ['java-volcanic-arc', 'palu-koro-fault', 'aceh-tsunami-rupture'],
    relatedConcepts: ['subduction', 'volcanic-arcs'],
    relatedTopics: ['plate-tectonics', 'natural-hazards'],
  },
  'stratigraphy': {
    relatedExperiences: ['reading-rock-layers', 'the-rock-cycle', 'what-fossils-tell-us', 'what-makes-a-mineral-a-mineral', 'the-carbon-cycle'],
    relatedLocations: ['karangsambung-geopark', 'sangiran-valley', 'sangiran-early-man'],
    relatedConcepts: [],
    relatedTopics: ['geology', 'paleontology'],
  },
  'condensation': {
    relatedExperiences: ['how-rain-forms', 'why-are-there-climate-zones', 'indonesian-throughflow'],
    relatedLocations: ['bogor-rain-belt'],
    relatedConcepts: ['atmospheric-pressure'],
    relatedTopics: ['atmosphere', 'climate'],
  },
  'atmospheric-pressure': {
    relatedExperiences: ['how-rain-forms', 'why-are-there-climate-zones', 'indonesian-throughflow', 'jakarta-sinking-city-groundwater'],
    relatedLocations: ['bogor-rain-belt', 'makassar-strait'],
    relatedConcepts: ['condensation'],
    relatedTopics: ['atmosphere', 'climate'],
  },

  // Topics
  'plate-tectonics': {
    relatedExperiences: ['why-volcanoes-form', 'why-do-earthquakes-happen', 'how-tsunamis-form'],
    relatedConcepts: ['subduction', 'volcanic-arcs', 'plate-tectonics-process'],
    relatedLocations: ['java-volcanic-arc', 'palu-koro-fault', 'aceh-tsunami-rupture'],
  },
  'atmosphere': {
    relatedExperiences: ['how-rain-forms', 'why-are-there-climate-zones', 'indonesian-throughflow'],
    relatedConcepts: ['condensation', 'atmospheric-pressure'],
    relatedLocations: ['bogor-rain-belt'],
  },
  'geology': {
    relatedExperiences: ['reading-rock-layers', 'the-rock-cycle', 'what-makes-a-mineral-a-mineral'],
    relatedConcepts: ['stratigraphy', 'volcanic-arcs'],
    relatedLocations: ['karangsambung-geopark', 'java-volcanic-arc', 'indonesian-nickel-belt'],
  },
  'natural-hazards': {
    relatedExperiences: ['why-do-earthquakes-happen', 'why-do-landslides-happen', 'how-tsunamis-form'],
    relatedConcepts: ['plate-tectonics-process', 'subduction'],
    relatedLocations: ['palu-koro-fault', 'sumedang-landslides', 'aceh-tsunami-rupture'],
  },
  'climate': {
    relatedExperiences: ['why-are-there-climate-zones', 'how-rain-forms', 'indonesian-throughflow'],
    relatedConcepts: ['atmospheric-pressure', 'condensation'],
    relatedLocations: ['bogor-rain-belt', 'makassar-strait'],
  },
  'paleontology': {
    relatedExperiences: ['what-fossils-tell-us', 'reading-rock-layers'],
    relatedConcepts: ['stratigraphy'],
    relatedLocations: ['sangiran-early-man', 'sangiran-valley'],
  },
  'earth-structure': {
    relatedExperiences: ['whats-inside-the-earth', 'why-do-earthquakes-happen'],
    relatedConcepts: ['plate-tectonics-process', 'subduction'],
    relatedLocations: ['java-volcanic-arc'],
  },
  'minerals': {
    relatedExperiences: ['what-makes-a-mineral-a-mineral', 'the-rock-cycle'],
    relatedConcepts: ['stratigraphy'],
    relatedLocations: ['indonesian-nickel-belt', 'karangsambung-geopark'],
  },
  'hydrology': {
    relatedExperiences: ['jakarta-sinking-city-groundwater', 'how-rain-forms'],
    relatedConcepts: ['atmospheric-pressure', 'condensation'],
    relatedLocations: ['jakarta-ancol-subsidence'],
  },
  'environmental-systems': {
    relatedExperiences: ['ecosystem-recovery-after-eruption', 'the-carbon-cycle', 'nutrient-cycling-tropical-soils'],
    relatedConcepts: ['volcanic-arcs', 'stratigraphy'],
    relatedLocations: ['krakatau-archipelago'],
  },
  'sustainability': {
    relatedExperiences: ['peatlands-carbon-storage-or-release', 'the-carbon-cycle', 'jakarta-sinking-city-groundwater'],
    relatedConcepts: ['atmospheric-pressure'],
    relatedLocations: ['krakatau-archipelago'],
  },

  // Locations
  'java-volcanic-arc': {
    relatedExperiences: ['why-volcanoes-form', 'the-rock-cycle', 'whats-inside-the-earth'],
    relatedConcepts: ['subduction', 'volcanic-arcs'],
    relatedTopics: ['plate-tectonics', 'earth-structure'],
  },
  'mount-merapi': {
    relatedExperiences: ['why-volcanoes-form', 'ecosystem-recovery-after-eruption'],
    relatedConcepts: ['volcanic-arcs'],
    relatedTopics: ['geology', 'plate-tectonics'],
  },
  'karangsambung-geopark': {
    relatedExperiences: ['reading-rock-layers', 'why-volcanoes-form', 'the-rock-cycle', 'what-makes-a-mineral-a-mineral'],
    relatedConcepts: ['stratigraphy', 'subduction'],
    relatedTopics: ['geology', 'plate-tectonics', 'minerals'],
  },
  'bogor-rain-belt': {
    relatedExperiences: ['how-rain-forms', 'why-are-there-climate-zones', 'indonesian-throughflow'],
    relatedConcepts: ['condensation', 'atmospheric-pressure'],
    relatedTopics: ['atmosphere', 'climate'],
  },
  'palu-koro-fault': {
    relatedExperiences: ['why-do-earthquakes-happen', 'why-do-landslides-happen', 'how-tsunamis-form'],
    relatedConcepts: ['plate-tectonics-process'],
    relatedTopics: ['natural-hazards', 'plate-tectonics'],
  },
  'sangiran-early-man': {
    relatedExperiences: ['what-fossils-tell-us', 'reading-rock-layers'],
    relatedConcepts: ['stratigraphy'],
    relatedTopics: ['paleontology', 'geology'],
  },
  'sangiran-valley': {
    relatedExperiences: ['what-fossils-tell-us', 'reading-rock-layers'],
    relatedConcepts: ['stratigraphy'],
    relatedTopics: ['paleontology', 'geology'],
  },
  'sumedang-landslides': {
    relatedExperiences: ['why-do-landslides-happen'],
    relatedConcepts: ['plate-tectonics-process'],
    relatedTopics: ['natural-hazards'],
  },
  'indonesian-nickel-belt': {
    relatedExperiences: ['what-makes-a-mineral-a-mineral', 'the-rock-cycle'],
    relatedConcepts: ['stratigraphy'],
    relatedTopics: ['minerals', 'geology'],
  },
  'jakarta-ancol-subsidence': {
    relatedExperiences: ['jakarta-sinking-city-groundwater'],
    relatedConcepts: ['atmospheric-pressure'],
    relatedTopics: ['hydrology', 'sustainability'],
  },
  'makassar-strait': {
    relatedExperiences: ['indonesian-throughflow', 'why-are-there-climate-zones'],
    relatedConcepts: ['atmospheric-pressure'],
    relatedTopics: ['climate', 'atmosphere'],
  },
  'aceh-tsunami-rupture': {
    relatedExperiences: ['how-tsunamis-form', 'why-do-earthquakes-happen'],
    relatedConcepts: ['subduction', 'plate-tectonics-process'],
    relatedTopics: ['natural-hazards', 'plate-tectonics'],
  },
  'krakatau-archipelago': {
    relatedExperiences: ['ecosystem-recovery-after-eruption', 'the-carbon-cycle', 'peatlands-carbon-storage-or-release'],
    relatedConcepts: ['volcanic-arcs'],
    relatedTopics: ['environmental-systems', 'sustainability'],
  },
};

/**
 * Metadata dictionary for rich node presentation
 */
export const NODE_REGISTRY: Record<string, KnowledgeNode> = {
  // Experiences (17 total)
  'why-volcanoes-form': {
    id: 'why-volcanoes-form',
    type: 'experience',
    title: 'Why Do Volcanoes Form?',
    summary: 'Subduction, mantle melting, and how oceanic plates fuel explosive volcanic arcs.',
    href: '/learn/why-volcanoes-form',
    badge: 'Flagship Experience',
  },
  'how-rain-forms': {
    id: 'how-rain-forms',
    type: 'experience',
    title: 'How Does Rain Form?',
    summary: 'Atmospheric moisture, adiabatic cooling, droplet growth, and tropical monsoon precipitation.',
    href: '/learn/how-rain-forms',
    badge: 'Atmosphere',
  },
  'reading-rock-layers': {
    id: 'reading-rock-layers',
    type: 'experience',
    title: 'Reading Rock Layers',
    summary: 'Deciphering millions of years of Earth history through strata, fossils, and the Law of Superposition.',
    href: '/learn/reading-rock-layers',
    badge: 'Geology',
  },
  'why-do-earthquakes-happen': {
    id: 'why-do-earthquakes-happen',
    type: 'experience',
    title: 'Why Do Earthquakes Happen?',
    summary: 'Elastic rebound, fault kinematics, and the secondary hazard dynamics of the 2018 Palu earthquake.',
    href: '/learn/why-do-earthquakes-happen',
    badge: 'Natural Hazards',
  },
  'the-rock-cycle': {
    id: 'the-rock-cycle',
    type: 'experience',
    title: 'What Is the Rock Cycle?',
    summary: 'Dynamic crustal transformations between igneous, sedimentary, and metamorphic rock states.',
    href: '/learn/the-rock-cycle',
    badge: 'Geology',
  },
  'why-are-there-climate-zones': {
    id: 'why-are-there-climate-zones',
    type: 'experience',
    title: 'Why Are There Climate Zones?',
    summary: 'Solar insolation geometry, latitude beam spreading, and tropical equatorial climate norms.',
    href: '/learn/why-are-there-climate-zones',
    badge: 'Climate',
  },
  'what-fossils-tell-us': {
    id: 'what-fossils-tell-us',
    type: 'experience',
    title: 'What Fossils Tell Us',
    summary: 'Taphonomy, stratigraphic dating, and the 2.4-million-year paleoanthropological record of Sangiran.',
    href: '/learn/what-fossils-tell-us',
    badge: 'Paleontology',
  },
  'why-do-landslides-happen': {
    id: 'why-do-landslides-happen',
    type: 'experience',
    title: 'Why Do Landslides Happen?',
    summary: 'Slope stability physics, pore-water pressure, rainfall saturation, and Indonesian hazard mitigation.',
    href: '/learn/why-do-landslides-happen',
    badge: 'Natural Hazards',
  },
  'whats-inside-the-earth': {
    id: 'whats-inside-the-earth',
    type: 'experience',
    title: "What's Inside the Earth?",
    summary: 'Planetary layering, seismic P and S wave propagation, and the liquid outer core shadow zone.',
    href: '/learn/whats-inside-the-earth',
    badge: 'Earth Structure',
  },
  'what-makes-a-mineral-a-mineral': {
    id: 'what-makes-a-mineral-a-mineral',
    type: 'experience',
    title: 'What Makes a Mineral a Mineral?',
    summary: 'The five mandatory scientific criteria, diagnostic properties, and lateritic nickel formation.',
    href: '/learn/what-makes-a-mineral-a-mineral',
    badge: 'Minerals',
  },
  'jakarta-sinking-city-groundwater': {
    id: 'jakarta-sinking-city-groundwater',
    type: 'experience',
    title: "Jakarta's Sinking City & Groundwater",
    summary: 'Aquifer mechanics, pore pressure loss, and irreversible clay compaction driving coastal subsidence.',
    href: '/learn/jakarta-sinking-city-groundwater',
    badge: 'Hydrology',
  },
  'indonesian-throughflow': {
    id: 'indonesian-throughflow',
    type: 'experience',
    title: 'Indonesian Throughflow (ITF)',
    summary: 'The ocean heat conveyor exporting 1 Petawatt of thermal energy from the Pacific to the Indian Ocean.',
    href: '/learn/indonesian-throughflow',
    badge: 'Climate',
  },
  'how-tsunamis-form': {
    id: 'how-tsunamis-form',
    type: 'experience',
    title: 'Tsunamis: How a Distant Earthquake Becomes a Wave',
    summary: 'Megathrust vertical seafloor displacement, deep ocean wave velocity, and coastal shoaling amplification.',
    href: '/learn/how-tsunamis-form',
    badge: 'Natural Hazards',
  },
  'ecosystem-recovery-after-eruption': {
    id: 'ecosystem-recovery-after-eruption',
    type: 'experience',
    title: 'Ecosystem Recovery After Volcanic Eruption',
    summary: 'Primary ecological succession and the documented 140-year recolonization timeline of Krakatau.',
    href: '/learn/ecosystem-recovery-after-eruption',
    badge: 'Environmental Systems',
  },
  'the-carbon-cycle': {
    id: 'the-carbon-cycle',
    type: 'experience',
    title: "How Does Carbon Move Through Earth's Systems?",
    summary: 'Global carbon reservoirs, fast vs slow cycles, and Indonesia’s 3.14 billion-tonne blue carbon mangroves.',
    href: '/learn/the-carbon-cycle',
    badge: 'Environmental Systems',
  },
  'peatlands-carbon-storage-or-release': {
    id: 'peatlands-carbon-storage-or-release',
    type: 'experience',
    title: "Can Indonesia's Peatlands Store Carbon — or Release It?",
    summary: 'Wetland hydrology, drainage flammability, underground smoldering fires, and the 2015 fire crisis.',
    href: '/learn/peatlands-carbon-storage-or-release',
    badge: 'Sustainability',
  },
  'nutrient-cycling-tropical-soils': {
    id: 'nutrient-cycling-tropical-soils',
    type: 'experience',
    title: 'Nutrient Cycling in Tropical Rainforest Soils',
    summary: 'The tropical soil fertility paradox, closed-loop mycorrhizal uptake, and post-clearing nutrient leaching.',
    href: '/learn/nutrient-cycling-tropical-soils',
    badge: 'Environmental Systems',
  },

  // Topics (11 total)
  'plate-tectonics': {
    id: 'plate-tectonics',
    type: 'topic',
    title: 'Plate Tectonics & Lithosphere',
    summary: 'The dynamic planetary shell: convergent, divergent, and transform boundaries.',
    href: '/explore/topics/plate-tectonics',
    badge: 'Topic',
  },
  'atmosphere': {
    id: 'atmosphere',
    type: 'topic',
    title: 'Atmosphere & Climate Systems',
    summary: 'Global heat distribution, pressure cells, atmospheric circulation, and precipitation.',
    href: '/explore/topics/atmosphere',
    badge: 'Topic',
  },
  'geology': {
    id: 'geology',
    type: 'topic',
    title: 'Geological Processes & Strata',
    summary: 'Earth materials, rock cycles, deep time, stratigraphy, and surface evolution.',
    href: '/explore/topics/geology',
    badge: 'Topic',
  },
  'natural-hazards': {
    id: 'natural-hazards',
    type: 'topic',
    title: 'Natural Hazards & Risk Mitigation',
    summary: 'Geophysical and hydro-meteorological hazards: earthquakes, tsunamis, landslides, and resilience.',
    href: '/explore/topics/natural-hazards',
    badge: 'Topic',
  },
  'climate': {
    id: 'climate',
    type: 'topic',
    title: 'Climate Science & Zonation',
    summary: 'Planetary energy budgets, latitudinal insolation, monsoonal shifts, and long-term climate dynamics.',
    href: '/explore/topics/climate',
    badge: 'Topic',
  },
  'paleontology': {
    id: 'paleontology',
    type: 'topic',
    title: 'Paleontology & Deep Time History',
    summary: 'The fossil record, evolutionary taphonomy, Pleistocene hominids, and ancient environments.',
    href: '/explore/topics/paleontology',
    badge: 'Topic',
  },
  'earth-structure': {
    id: 'earth-structure',
    type: 'topic',
    title: 'Earth Structure & Internal Dynamics',
    summary: 'Concentric planetary layering from the silicate crust to the molten core.',
    href: '/explore/topics/earth-structure',
    badge: 'Topic',
  },
  'minerals': {
    id: 'minerals',
    type: 'topic',
    title: 'Mineralogy & Earth Materials',
    summary: 'Crystal chemistry, physical diagnostic properties, and lateritic mineral resources.',
    href: '/explore/topics/minerals',
    badge: 'Topic',
  },
  'hydrology': {
    id: 'hydrology',
    type: 'topic',
    title: 'Hydrology & Groundwater Dynamics',
    summary: 'Aquifer mechanics, pore pressure, groundwater extraction, and land subsidence.',
    href: '/explore/topics/hydrology',
    badge: 'Topic',
  },
  'environmental-systems': {
    id: 'environmental-systems',
    type: 'topic',
    title: 'Environmental Systems & Biogeochemistry',
    summary: 'Biogeochemical cycles, ecological succession, blue carbon, and tropical nutrient dynamics.',
    href: '/explore/topics/environmental-systems',
    badge: 'Topic',
  },
  'sustainability': {
    id: 'sustainability',
    type: 'topic',
    title: 'Sustainability & Climate Resilience',
    summary: 'Peatland carbon management, greenhouse gas fluxes, and nature-based climate solutions.',
    href: '/explore/topics/sustainability',
    badge: 'Topic',
  },

  // Concepts
  'subduction': {
    id: 'subduction',
    type: 'concept',
    title: 'Subduction Zones',
    summary: 'Where heavy oceanic lithosphere plunges beneath another plate into the mantle.',
    href: '/learn/concepts/subduction',
    badge: 'Concept',
  },
  'volcanic-arcs': {
    id: 'volcanic-arcs',
    type: 'concept',
    title: 'Volcanic Arcs',
    summary: 'Curving chains of volcanoes formed above a subducting tectonic plate.',
    href: '/learn/concepts/volcanic-arcs',
    badge: 'Concept',
  },
  'plate-tectonics-process': {
    id: 'plate-tectonics-process',
    type: 'concept',
    title: 'Plate Tectonics Mechanism',
    summary: 'Mantle convection, slab pull, and ridge push driving planetary crust dynamics.',
    href: '/learn/concepts/plate-tectonics-process',
    badge: 'Concept',
  },
  'stratigraphy': {
    id: 'stratigraphy',
    type: 'concept',
    title: 'Stratigraphy & Superposition',
    summary: 'The geological study of rock strata and the chronological records they hold.',
    href: '/learn/concepts/stratigraphy',
    badge: 'Concept',
  },
  'condensation': {
    id: 'condensation',
    type: 'concept',
    title: 'Atmospheric Condensation',
    summary: 'Phase change of water vapor into liquid water droplets around condensation nuclei.',
    href: '/learn/concepts/condensation',
    badge: 'Concept',
  },
  'atmospheric-pressure': {
    id: 'atmospheric-pressure',
    type: 'concept',
    title: 'Atmospheric Pressure Gradients',
    summary: 'Pressure variations across air masses driving global and local wind circulation.',
    href: '/learn/concepts/atmospheric-pressure',
    badge: 'Concept',
  },

  // Locations
  'java-volcanic-arc': {
    id: 'java-volcanic-arc',
    type: 'location',
    title: 'Java Volcanic Arc',
    summary: 'One of the most active subduction-driven volcanic belts on Earth, created by the Indo-Australian plate.',
    href: '/geomap?location=java-volcanic-arc',
    badge: 'Indonesia Anchor',
  },
  'mount-merapi': {
    id: 'mount-merapi',
    type: 'location',
    title: 'Mount Merapi',
    summary: 'Active andesitic stratovolcano exhibiting pyroclastic flows, lava domes, and lahar risks.',
    href: '/geomap?location=mount-merapi',
    badge: 'Indonesia Anchor',
  },
  'karangsambung-geopark': {
    id: 'karangsambung-geopark',
    type: 'location',
    title: 'Karangsambung Geopark',
    summary: 'Ancient subduction mélange preserving fossilized seafloor and metamorphic high-pressure rocks.',
    href: '/geomap?location=karangsambung-geopark',
    badge: 'Geological Site',
  },
  'bogor-rain-belt': {
    id: 'bogor-rain-belt',
    type: 'location',
    title: 'Bogor Orographic Rain Belt',
    summary: 'Known as the "City of Rain" due to extreme orographic lifting against volcanic slopes.',
    href: '/geomap?location=bogor-rain-belt',
    badge: 'Climate Phenomenon',
  },
  'palu-koro-fault': {
    id: 'palu-koro-fault',
    type: 'location',
    title: 'Palu-Koro Fault Zone',
    summary: 'Active left-lateral strike-slip fault system in Central Sulawesi with ~7 cm/yr slip rate.',
    href: '/geomap?location=palu-koro-fault',
    badge: 'Active Fault',
  },
  'sangiran-early-man': {
    id: 'sangiran-early-man',
    type: 'location',
    title: 'Sangiran Early Man Site',
    summary: 'UNESCO World Heritage Site preserving over 2.4 million years of Pleistocene strata and Homo erectus fossils.',
    href: '/geomap?location=sangiran-early-man',
    badge: 'UNESCO Site',
  },
  'sangiran-valley': {
    id: 'sangiran-valley',
    type: 'location',
    title: 'Sangiran Early Man Valley',
    summary: 'Exemplary geological stratigraphy revealing over 2 million years of hominid and fauna fossils.',
    href: '/geomap?location=sangiran-valley',
    badge: 'Paleontology Site',
  },
  'sumedang-landslides': {
    id: 'sumedang-landslides',
    type: 'location',
    title: 'Sumedang Highlands Landslide Region',
    summary: 'Steep volcanic hilly terrain in West Java prone to rainfall-triggered monsoon slope failures.',
    href: '/geomap?location=sumedang-landslides',
    badge: 'Hazard Region',
  },
  'indonesian-nickel-belt': {
    id: 'indonesian-nickel-belt',
    type: 'location',
    title: 'Indonesian Nickel Belt (Sulawesi & Halmahera)',
    summary: 'World-class lateritic nickel deposits formed by intense tropical chemical weathering of ancient ophiolites.',
    href: '/geomap?location=indonesian-nickel-belt',
    badge: 'Mineral Province',
  },
  'jakarta-ancol-subsidence': {
    id: 'jakarta-ancol-subsidence',
    type: 'location',
    title: 'North Jakarta Subsidence Hotspot (Ancol)',
    summary: 'Low-lying delta zone sinking at 3–12 cm/year due to deep confined aquifer extraction and clay compaction.',
    href: '/geomap?location=jakarta-ancol-subsidence',
    badge: 'Hydrological Hotspot',
  },
  'makassar-strait': {
    id: 'makassar-strait',
    type: 'location',
    title: 'Makassar Strait Throughflow Passage',
    summary: 'Deep marine choke point carrying 11.6 Sverdrups of Pacific water into the Indonesian seas.',
    href: '/geomap?location=makassar-strait',
    badge: 'Oceanic Gateway',
  },
  'aceh-tsunami-rupture': {
    id: 'aceh-tsunami-rupture',
    type: 'location',
    title: 'Aceh 2004 Megathrust Rupture Zone',
    summary: 'Epicentral region of the 26 December 2004 Mw 9.1–9.3 earthquake and 51m tsunami runup.',
    href: '/geomap?location=aceh-tsunami-rupture',
    badge: 'Megathrust Zone',
  },
  'krakatau-archipelago': {
    id: 'krakatau-archipelago',
    type: 'location',
    title: 'Krakatau Archipelago & Anak Krakatau',
    summary: 'World-famous caldera and living laboratory of primary ecological succession and active volcanism.',
    href: '/geomap?location=krakatau-archipelago',
    badge: 'Ecological Laboratory',
  },
};

/**
 * Resolves all connected nodes for a given entity slug
 */
export function getRelatedContent(slug: string): RelatedContentResult {
  const entry = CONTENT_GRAPH[slug] || {};

  const relatedExperiences = (entry.relatedExperiences || [])
    .map((s) => NODE_REGISTRY[s])
    .filter(Boolean);

  const relatedConcepts = (entry.relatedConcepts || [])
    .map((s) => NODE_REGISTRY[s])
    .filter(Boolean);

  const relatedLocations = (entry.relatedLocations || [])
    .map((s) => NODE_REGISTRY[s])
    .filter(Boolean);

  return {
    relatedExperiences,
    relatedConcepts,
    relatedLocations,
  };
}
