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
    relatedExperiences: ['reading-rock-layers', 'how-rain-forms'],
    relatedTopics: ['plate-tectonics', 'geology'],
  },
  'how-rain-forms': {
    relatedConcepts: ['condensation', 'atmospheric-pressure'],
    relatedLocations: ['bogor-rain-belt'],
    relatedExperiences: ['why-volcanoes-form', 'reading-rock-layers'],
    relatedTopics: ['atmosphere'],
  },
  'reading-rock-layers': {
    relatedConcepts: ['stratigraphy'],
    relatedLocations: ['karangsambung-geopark', 'sangiran-valley'],
    relatedExperiences: ['why-volcanoes-form'],
    relatedTopics: ['geology'],
  },

  // Concepts
  'subduction': {
    relatedExperiences: ['why-volcanoes-form'],
    relatedLocations: ['java-volcanic-arc'],
    relatedConcepts: ['volcanic-arcs', 'plate-tectonics-process'],
    relatedTopics: ['plate-tectonics'],
  },
  'volcanic-arcs': {
    relatedExperiences: ['why-volcanoes-form'],
    relatedLocations: ['java-volcanic-arc', 'mount-merapi'],
    relatedConcepts: ['subduction'],
    relatedTopics: ['plate-tectonics', 'geology'],
  },
  'plate-tectonics-process': {
    relatedExperiences: ['why-volcanoes-form'],
    relatedLocations: ['java-volcanic-arc'],
    relatedConcepts: ['subduction', 'volcanic-arcs'],
    relatedTopics: ['plate-tectonics'],
  },
  'stratigraphy': {
    relatedExperiences: ['reading-rock-layers'],
    relatedLocations: ['karangsambung-geopark', 'sangiran-valley'],
    relatedConcepts: [],
    relatedTopics: ['geology'],
  },
  'condensation': {
    relatedExperiences: ['how-rain-forms'],
    relatedLocations: ['bogor-rain-belt'],
    relatedConcepts: ['atmospheric-pressure'],
    relatedTopics: ['atmosphere'],
  },
  'atmospheric-pressure': {
    relatedExperiences: ['how-rain-forms'],
    relatedLocations: ['bogor-rain-belt'],
    relatedConcepts: ['condensation'],
    relatedTopics: ['atmosphere'],
  },

  // Locations
  'java-volcanic-arc': {
    relatedExperiences: ['why-volcanoes-form'],
    relatedConcepts: ['subduction', 'volcanic-arcs'],
    relatedTopics: ['plate-tectonics'],
  },
  'mount-merapi': {
    relatedExperiences: ['why-volcanoes-form'],
    relatedConcepts: ['volcanic-arcs'],
    relatedTopics: ['geology', 'plate-tectonics'],
  },
  'karangsambung-geopark': {
    relatedExperiences: ['reading-rock-layers', 'why-volcanoes-form'],
    relatedConcepts: ['stratigraphy', 'subduction'],
    relatedTopics: ['geology', 'plate-tectonics'],
  },
  'bogor-rain-belt': {
    relatedExperiences: ['how-rain-forms'],
    relatedConcepts: ['condensation'],
    relatedTopics: ['atmosphere'],
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
  'sangiran-valley': {
    id: 'sangiran-valley',
    type: 'location',
    title: 'Sangiran Early Man Valley',
    summary: 'Exemplary geological stratigraphy revealing over 2 million years of hominid and fauna fossils.',
    href: '/geomap?location=sangiran-valley',
    badge: 'Paleontology Site',
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
