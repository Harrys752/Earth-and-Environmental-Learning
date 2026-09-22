import { withBase } from './base';

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
    relatedTopics: ['plate-tectonics', 'natural-hazards', 'rocks'],
  },
  'how-rain-forms': {
    relatedConcepts: ['condensation', 'atmospheric-pressure', 'water-cycle'],
    relatedLocations: ['bogor-rain-belt'],
    relatedExperiences: ['why-volcanoes-form', 'reading-rock-layers'],
    relatedTopics: ['atmosphere', 'hydrology', 'climate'],
  },
  'reading-rock-layers': {
    relatedConcepts: ['stratigraphy', 'sedimentation', 'relative-dating'],
    relatedLocations: ['karangsambung-geopark', 'sangiran-valley'],
    relatedExperiences: ['why-volcanoes-form'],
    relatedTopics: ['geology', 'rocks', 'paleontology'],
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
    relatedTopics: ['plate-tectonics', 'natural-hazards'],
  },
  'plate-tectonics-process': {
    relatedExperiences: ['why-volcanoes-form', 'reading-rock-layers'],
    relatedConcepts: ['subduction', 'stratigraphy'],
    relatedTopics: ['plate-tectonics'],
  },
  'condensation': {
    relatedExperiences: ['how-rain-forms'],
    relatedLocations: ['bogor-rain-belt'],
    relatedConcepts: ['atmospheric-pressure'],
    relatedTopics: ['atmosphere', 'hydrology'],
  },
  'atmospheric-pressure': {
    relatedExperiences: ['how-rain-forms'],
    relatedConcepts: ['condensation'],
    relatedTopics: ['atmosphere'],
  },
  'stratigraphy': {
    relatedExperiences: ['reading-rock-layers'],
    relatedLocations: ['karangsambung-geopark', 'sangiran-valley'],
    relatedTopics: ['geology', 'rocks'],
  },
  'sedimentation': {
    relatedExperiences: ['reading-rock-layers'],
    relatedLocations: ['sangiran-valley'],
    relatedConcepts: ['stratigraphy'],
    relatedTopics: ['geology', 'hydrology'],
  },

  // Locations
  'java-volcanic-arc': {
    relatedExperiences: ['why-volcanoes-form'],
    relatedConcepts: ['subduction', 'volcanic-arcs'],
    relatedTopics: ['plate-tectonics', 'natural-hazards'],
  },
  'mount-merapi': {
    relatedExperiences: ['why-volcanoes-form'],
    relatedConcepts: ['volcanic-arcs'],
    relatedTopics: ['natural-hazards', 'geology'],
  },
  'karangsambung-geopark': {
    relatedExperiences: ['reading-rock-layers', 'why-volcanoes-form'],
    relatedConcepts: ['stratigraphy', 'subduction'],
    relatedTopics: ['geology', 'plate-tectonics'],
  },
  'bogor-rain-belt': {
    relatedExperiences: ['how-rain-forms'],
    relatedConcepts: ['condensation'],
    relatedTopics: ['atmosphere', 'climate'],
  },
};

/**
 * Registry of all node definitions with human titles and hrefs
 */
export const NODE_REGISTRY: Record<string, KnowledgeNode> = {
  // Experiences
  'why-volcanoes-form': {
    id: 'why-volcanoes-form',
    type: 'experience',
    title: 'Why Do Volcanoes Form?',
    summary: 'Subduction dynamics, flux melting, and active volcanic arc formation across Java.',
    href: '/learn/why-volcanoes-form',
    badge: 'Flagship Inquiry',
  },
  'how-rain-forms': {
    id: 'how-rain-forms',
    type: 'experience',
    title: 'How Does Rain Form?',
    summary: 'Evaporation, atmospheric convection, adiabatic cooling, and tropical rainfall in Bogor.',
    href: '/learn/how-rain-forms',
    badge: 'Atmosphere Inquiry',
  },
  'reading-rock-layers': {
    id: 'reading-rock-layers',
    type: 'experience',
    title: 'Reading Rock Layers',
    summary: 'Stratigaphy, Steno laws, deep time, and the Karangsambung accretionary complex.',
    href: '/learn/reading-rock-layers',
    badge: 'Geology Inquiry',
  },

  // Concepts
  'subduction': {
    id: 'subduction',
    type: 'concept',
    title: 'Subduction Kinematics',
    summary: 'The oceanic plate descending beneath continental or oceanic lithosphere into the asthenosphere.',
    href: '/learn/concepts/subduction',
    badge: 'Core Concept',
  },
  'volcanic-arcs': {
    id: 'volcanic-arcs',
    type: 'concept',
    title: 'Volcanic Arc Offsets',
    summary: 'Curved chains of stratovolcanoes positioned ~100-300km inland from subduction trenches.',
    href: '/learn/concepts/volcanic-arcs',
    badge: 'Core Concept',
  },
  'plate-tectonics-process': {
    id: 'plate-tectonics-process',
    type: 'concept',
    title: 'Plate Tectonic Convection Engine',
    summary: 'Mantle convection and lithospheric plate movements shaping global geography.',
    href: '/learn/concepts/plate-tectonics-process',
    badge: 'Core Concept',
  },
  'condensation': {
    id: 'condensation',
    type: 'concept',
    title: 'Water Vapor Condensation',
    summary: 'Phase change of gas to liquid around cloud condensation nuclei when air cools to dew point.',
    href: '/learn/concepts/condensation',
    badge: 'Core Concept',
  },
  'atmospheric-pressure': {
    id: 'atmospheric-pressure',
    type: 'concept',
    title: 'Atmospheric Pressure Gradients',
    summary: 'Weight of air columns driving planetary wind patterns and adiabatic expansion.',
    href: '/learn/concepts/atmospheric-pressure',
    badge: 'Core Concept',
  },
  'stratigraphy': {
    id: 'stratigraphy',
    type: 'concept',
    title: 'Stratigraphic Principles',
    summary: 'Superposition, original horizontality, and lateral continuity in sedimentary rock sequences.',
    href: '/learn/concepts/stratigraphy',
    badge: 'Core Concept',
  },
  'sedimentation': {
    id: 'sedimentation',
    type: 'concept',
    title: 'Sediment Transport & Deposition',
    summary: 'Weathering, erosion, and deposition of mineral particles across oceanic and river basins.',
    href: '/learn/concepts/sedimentation',
    badge: 'Concept',
  },
  'relative-dating': {
    id: 'relative-dating',
    type: 'concept',
    title: 'Relative Geological Dating',
    summary: 'Determining the chronological sequence of events without absolute numerical ages.',
    href: '/learn/concepts/relative-dating',
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
    .filter(Boolean)
    .map((node) => ({ ...node, href: withBase(node.href) }));

  const relatedConcepts = (entry.relatedConcepts || [])
    .map((s) => NODE_REGISTRY[s])
    .filter(Boolean)
    .map((node) => ({ ...node, href: withBase(node.href) }));

  const relatedLocations = (entry.relatedLocations || [])
    .map((s) => NODE_REGISTRY[s])
    .filter(Boolean)
    .map((node) => ({ ...node, href: withBase(node.href) }));

  return {
    relatedExperiences,
    relatedConcepts,
    relatedLocations,
  };
}
