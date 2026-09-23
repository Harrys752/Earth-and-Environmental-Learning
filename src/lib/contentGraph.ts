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
  // Experiences
  'why-volcanoes-form': {
    relatedConcepts: ['subduction', 'volcanic-arcs', 'plate-tectonics-process'],
    relatedLocations: ['java-volcanic-arc', 'mount-merapi'],
    relatedExperiences: ['reading-rock-layers', 'how-rain-forms', 'why-do-earthquakes-happen', 'the-rock-cycle'],
    relatedTopics: ['plate-tectonics', 'geology'],
  },
  'how-rain-forms': {
    relatedConcepts: ['condensation', 'atmospheric-pressure'],
    relatedLocations: ['bogor-rain-belt'],
    relatedExperiences: ['why-volcanoes-form', 'reading-rock-layers', 'why-are-there-climate-zones', 'why-do-landslides-happen'],
    relatedTopics: ['atmosphere', 'climate'],
  },
  'reading-rock-layers': {
    relatedConcepts: ['stratigraphy'],
    relatedLocations: ['karangsambung-geopark', 'sangiran-valley', 'sangiran-early-man'],
    relatedExperiences: ['why-volcanoes-form', 'the-rock-cycle', 'what-fossils-tell-us'],
    relatedTopics: ['geology', 'paleontology'],
  },
  'why-do-earthquakes-happen': {
    relatedConcepts: ['plate-tectonics-process', 'subduction'],
    relatedLocations: ['palu-koro-fault', 'java-volcanic-arc'],
    relatedExperiences: ['why-do-landslides-happen', 'why-volcanoes-form', 'the-rock-cycle'],
    relatedTopics: ['natural-hazards', 'plate-tectonics'],
  },
  'the-rock-cycle': {
    relatedConcepts: ['stratigraphy', 'volcanic-arcs', 'subduction'],
    relatedLocations: ['java-volcanic-arc', 'karangsambung-geopark'],
    relatedExperiences: ['reading-rock-layers', 'why-volcanoes-form', 'what-fossils-tell-us', 'why-do-earthquakes-happen'],
    relatedTopics: ['geology', 'plate-tectonics'],
  },
  'why-are-there-climate-zones': {
    relatedConcepts: ['atmospheric-pressure', 'condensation'],
    relatedLocations: ['bogor-rain-belt'],
    relatedExperiences: ['how-rain-forms', 'why-do-landslides-happen'],
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

  // Concepts
  'subduction': {
    relatedExperiences: ['why-volcanoes-form', 'why-do-earthquakes-happen', 'the-rock-cycle'],
    relatedLocations: ['java-volcanic-arc'],
    relatedConcepts: ['volcanic-arcs', 'plate-tectonics-process'],
    relatedTopics: ['plate-tectonics'],
  },
  'volcanic-arcs': {
    relatedExperiences: ['why-volcanoes-form', 'the-rock-cycle'],
    relatedLocations: ['java-volcanic-arc', 'mount-merapi'],
    relatedConcepts: ['subduction'],
    relatedTopics: ['plate-tectonics', 'geology'],
  },
  'plate-tectonics-process': {
    relatedExperiences: ['why-volcanoes-form', 'why-do-earthquakes-happen', 'why-do-landslides-happen'],
    relatedLocations: ['java-volcanic-arc', 'palu-koro-fault'],
    relatedConcepts: ['subduction', 'volcanic-arcs'],
    relatedTopics: ['plate-tectonics', 'natural-hazards'],
  },
  'stratigraphy': {
    relatedExperiences: ['reading-rock-layers', 'the-rock-cycle', 'what-fossils-tell-us'],
    relatedLocations: ['karangsambung-geopark', 'sangiran-valley', 'sangiran-early-man'],
    relatedConcepts: [],
    relatedTopics: ['geology', 'paleontology'],
  },
  'condensation': {
    relatedExperiences: ['how-rain-forms', 'why-are-there-climate-zones'],
    relatedLocations: ['bogor-rain-belt'],
    relatedConcepts: ['atmospheric-pressure'],
    relatedTopics: ['atmosphere', 'climate'],
  },
  'atmospheric-pressure': {
    relatedExperiences: ['how-rain-forms', 'why-are-there-climate-zones'],
    relatedLocations: ['bogor-rain-belt'],
    relatedConcepts: ['condensation'],
    relatedTopics: ['atmosphere', 'climate'],
  },

  // Topics
  'plate-tectonics': {
    relatedExperiences: ['why-volcanoes-form', 'why-do-earthquakes-happen'],
    relatedConcepts: ['subduction', 'volcanic-arcs', 'plate-tectonics-process'],
    relatedLocations: ['java-volcanic-arc', 'palu-koro-fault'],
  },
  'atmosphere': {
    relatedExperiences: ['how-rain-forms', 'why-are-there-climate-zones'],
    relatedConcepts: ['condensation', 'atmospheric-pressure'],
    relatedLocations: ['bogor-rain-belt'],
  },
  'geology': {
    relatedExperiences: ['reading-rock-layers', 'the-rock-cycle'],
    relatedConcepts: ['stratigraphy', 'volcanic-arcs'],
    relatedLocations: ['karangsambung-geopark', 'java-volcanic-arc'],
  },
  'natural-hazards': {
    relatedExperiences: ['why-do-earthquakes-happen', 'why-do-landslides-happen'],
    relatedConcepts: ['plate-tectonics-process', 'subduction'],
    relatedLocations: ['palu-koro-fault', 'sumedang-landslides'],
  },
  'climate': {
    relatedExperiences: ['why-are-there-climate-zones', 'how-rain-forms'],
    relatedConcepts: ['atmospheric-pressure', 'condensation'],
    relatedLocations: ['bogor-rain-belt'],
  },
  'paleontology': {
    relatedExperiences: ['what-fossils-tell-us', 'reading-rock-layers'],
    relatedConcepts: ['stratigraphy'],
    relatedLocations: ['sangiran-early-man', 'sangiran-valley'],
  },

  // Locations
  'java-volcanic-arc': {
    relatedExperiences: ['why-volcanoes-form', 'the-rock-cycle'],
    relatedConcepts: ['subduction', 'volcanic-arcs'],
    relatedTopics: ['plate-tectonics'],
  },
  'mount-merapi': {
    relatedExperiences: ['why-volcanoes-form'],
    relatedConcepts: ['volcanic-arcs'],
    relatedTopics: ['geology', 'plate-tectonics'],
  },
  'karangsambung-geopark': {
    relatedExperiences: ['reading-rock-layers', 'why-volcanoes-form', 'the-rock-cycle'],
    relatedConcepts: ['stratigraphy', 'subduction'],
    relatedTopics: ['geology', 'plate-tectonics'],
  },
  'bogor-rain-belt': {
    relatedExperiences: ['how-rain-forms', 'why-are-there-climate-zones'],
    relatedConcepts: ['condensation', 'atmospheric-pressure'],
    relatedTopics: ['atmosphere', 'climate'],
  },
  'palu-koro-fault': {
    relatedExperiences: ['why-do-earthquakes-happen', 'why-do-landslides-happen'],
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
};

/**
 * Metadata dictionary for rich node presentation
 */
export const NODE_REGISTRY: Record<string, KnowledgeNode> = {
  // Experiences
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

  // Topics
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
