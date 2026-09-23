/**
 * Client-Side Search Engine
 * Searches experiences, topics, concepts, locations, and projects.
 * Results ranking priority: 1) title, 2) topic, 3) concept relevance, 4) description/metadata.
 */

export interface SearchIndexItem {
  id: string;
  type: 'experience' | 'topic' | 'concept' | 'location' | 'project';
  title: string;
  summary: string;
  topic?: string;
  keywords: string[];
  href: string;
  badge?: string;
}

export interface SearchResult extends SearchIndexItem {
  score: number;
  matchReason: string;
}

// Built-in static search index
export const SEARCH_INDEX: SearchIndexItem[] = [
  // Experiences (8 total)
  {
    id: 'why-volcanoes-form',
    type: 'experience',
    title: 'Why Do Volcanoes Form?',
    summary: 'Explore plate tectonics, subduction zones, flux melting in the mantle, and the formation of explosive volcanic arcs like Java and Mount Merapi.',
    topic: 'Plate Tectonics',
    keywords: ['volcano', 'magma', 'lava', 'subduction', 'tectonics', 'merapi', 'java', 'mantle', 'crust', 'ring of fire', 'indonesia'],
    href: '/learn/why-volcanoes-form',
    badge: 'Flagship Experience',
  },
  {
    id: 'how-rain-forms',
    type: 'experience',
    title: 'How Does Rain Form?',
    summary: 'Atmospheric moisture, adiabatic cooling, condensation nuclei, droplet coalescence, and tropical monsoon precipitation.',
    topic: 'Atmosphere & Hydrology',
    keywords: ['rain', 'clouds', 'precipitation', 'water cycle', 'condensation', 'monsoon', 'humidity', 'atmosphere', 'bogor'],
    href: '/learn/how-rain-forms',
    badge: 'Experience',
  },
  {
    id: 'reading-rock-layers',
    type: 'experience',
    title: 'Reading Rock Layers',
    summary: 'Deciphering Earth history through sedimentary strata, the Law of Superposition, unconformities, and geological timescales.',
    topic: 'Geology & Rocks',
    keywords: ['strata', 'rock cycle', 'sedimentary', 'superposition', 'geology', 'fossils', 'karangsambung', 'sangiran'],
    href: '/learn/reading-rock-layers',
    badge: 'Experience',
  },
  {
    id: 'why-do-earthquakes-happen',
    type: 'experience',
    title: 'Why Do Earthquakes Happen?',
    summary: 'Elastic rebound theory, fault boundary kinematics, seismic waves, and the 2018 Palu Mw 7.5 strike-slip earthquake case study.',
    topic: 'Natural Hazards',
    keywords: ['earthquake', 'fault', 'elastic rebound', 'palu', 'koro', 'sulawesi', 'strike-slip', 'liquefaction', 'tsunami', 'seismic', 'hazard'],
    href: '/learn/why-do-earthquakes-happen',
    badge: 'Experience',
  },
  {
    id: 'the-rock-cycle',
    type: 'experience',
    title: 'What Is the Rock Cycle?',
    summary: 'Planetary crustal transformations across igneous, sedimentary, and metamorphic rock classes, from volcanic lava to river sediment.',
    topic: 'Geology & Rocks',
    keywords: ['rock cycle', 'igneous', 'sedimentary', 'metamorphic', 'weathering', 'erosion', 'lithification', 'magma', 'lava', 'granite', 'basalt'],
    href: '/learn/the-rock-cycle',
    badge: 'Experience',
  },
  {
    id: 'why-are-there-climate-zones',
    type: 'experience',
    title: 'Why Are There Climate Zones?',
    summary: 'Solar insolation geometry, spherical beam spreading, tropical equatorial climates, and the physical causes of Earth\'s thermal belts.',
    topic: 'Climate',
    keywords: ['climate', 'climate zones', 'tropical', 'temperate', 'polar', 'solar', 'insolation', 'sun angle', 'equator', 'latitude', 'pontianak'],
    href: '/learn/why-are-there-climate-zones',
    badge: 'Experience',
  },
  {
    id: 'what-fossils-tell-us',
    type: 'experience',
    title: 'What Fossils Tell Us',
    summary: 'Fossilization taphonomy, stratigraphic dating, and the 2.4-million-year Homo erectus paleoanthropological record of Sangiran in Central Java.',
    topic: 'Paleontology',
    keywords: ['fossil', 'fossils', 'paleontology', 'sangiran', 'homo erectus', 'superposition', 'taphonomy', 'java man', 'deep time', 'pleistocene'],
    href: '/learn/what-fossils-tell-us',
    badge: 'Experience',
  },
  {
    id: 'why-do-landslides-happen',
    type: 'experience',
    title: 'Why Do Landslides Happen?',
    summary: 'Slope stability physics, pore-water pressure, tropical monsoon saturation triggers, and West Java landslide disaster mitigation.',
    topic: 'Natural Hazards',
    keywords: ['landslide', 'landslides', 'slope stability', 'pore pressure', 'monsoon', 'rain', 'bnpb', 'sumedang', 'java', 'hazard', 'safety factor'],
    href: '/learn/why-do-landslides-happen',
    badge: 'Experience',
  },

  {
    id: 'whats-inside-the-earth',
    type: 'experience',
    title: "What's Inside the Earth?",
    summary: "Earth's internal layered structure from crust to solid inner core, and how seismic P-waves and S-wave shadow zones reveal planetary depths.",
    topic: 'Earth Structure',
    keywords: ['earth structure', 'crust', 'mantle', 'outer core', 'inner core', 'seismic waves', 'p-wave', 's-wave', 'shadow zone', 'geophysics', 'kola borehole'],
    href: '/learn/whats-inside-the-earth',
    badge: 'Experience',
  },
  {
    id: 'what-makes-a-mineral-a-mineral',
    type: 'experience',
    title: 'What Makes a Mineral a Mineral?',
    summary: "The five scientific criteria defining minerals, diagnostic properties from Mohs hardness to streak, and Indonesia's globally critical lateritic nickel deposits.",
    topic: 'Minerals',
    keywords: ['mineral', 'minerals', 'crystal', 'hardness', 'mohs', 'streak', 'luster', 'cleavage', 'nickel', 'laterite', 'sulawesi', 'halmahera'],
    href: '/learn/what-makes-a-mineral-a-mineral',
    badge: 'Experience',
  },
  {
    id: 'jakarta-sinking-city-groundwater',
    type: 'experience',
    title: "Where Does Groundwater Go? Jakarta's Sinking City",
    summary: 'Hydrogeological dynamics of pore-water pressure, irreversible clay aquitard compaction, and the anthropogenic land subsidence crisis across North Jakarta.',
    topic: 'Hydrology',
    keywords: ['groundwater', 'aquifer', 'subsidence', 'jakarta', 'sinking city', 'ancol', 'pore pressure', 'water table', 'compaction', 'hydrology'],
    href: '/learn/jakarta-sinking-city-groundwater',
    badge: 'Experience',
  },
  {
    id: 'indonesian-throughflow',
    type: 'experience',
    title: 'How Does the Indonesian Throughflow Shape Global Climate?',
    summary: 'The Pacific-to-Indian Ocean pressure gradient driving 15 Sverdrups of warm water transport through the Makassar Strait and regulating global heat conveyor circulation.',
    topic: 'Climate',
    keywords: ['indonesian throughflow', 'itf', 'ocean current', 'makassar strait', 'climate', 'heat transport', 'sverdrup', 'enso', 'el nino', 'la nina', 'monsoon'],
    href: '/learn/indonesian-throughflow',
    badge: 'Experience',
  },
  {
    id: 'how-tsunamis-form',
    type: 'experience',
    title: 'Tsunamis: How a Distant Earthquake Becomes a Wave',
    summary: 'Megathrust subduction seafloor displacement, deep-ocean wave dynamics at 800 km/h, coastal shoaling amplification, and the 2004 Sumatra-Andaman event.',
    topic: 'Natural Hazards',
    keywords: ['tsunami', 'megathrust', 'subduction', 'shoaling', 'sumatra', 'aceh', 'earthquake', 'ocean wave', 'wavelength', 'hazard', 'early warning'],
    href: '/learn/how-tsunamis-form',
    badge: 'Experience',
  },
  {
    id: 'ecosystem-recovery-after-eruption',
    type: 'experience',
    title: 'How Do Ecosystems Recover After a Volcanic Eruption?',
    summary: 'Primary ecological succession and the biological recolonization timeline of Krakatau and Anak Krakatau following the catastrophic 1883 eruption.',
    topic: 'Environmental Systems',
    keywords: ['succession', 'primary succession', 'krakatau', 'anak krakatau', 'pioneer species', 'ecosystem', 'recolonization', 'volcano', 'ecology', 'rainforest'],
    href: '/learn/ecosystem-recovery-after-eruption',
    badge: 'Experience',
  },
  {
    id: 'the-carbon-cycle',
    type: 'experience',
    title: 'How Does Carbon Move Through Earth’s Systems?',
    summary: 'Biogeochemical flux between atmosphere, biosphere, oceans, and lithosphere, highlighting blue carbon sequestration in Indonesia’s extensive mangrove ecosystems.',
    topic: 'Environmental Systems',
    keywords: ['carbon cycle', 'carbon', 'mangrove', 'blue carbon', 'sequestration', 'atmosphere', 'photosynthesis', 'respiration', 'soil carbon', 'indonesia'],
    href: '/learn/the-carbon-cycle',
    badge: 'Experience',
  },
  {
    id: 'peatlands-carbon-storage-or-release',
    type: 'experience',
    title: 'Can Indonesia’s Peatlands Store Carbon — or Release It?',
    summary: 'Dense organic soil carbon reservoirs, peat drainage vulnerabilities, smoldering subterranean combustion, and atmospheric emissions during the 2015 fire crisis.',
    topic: 'Sustainability',
    keywords: ['peatland', 'peat', 'carbon storage', 'peat fires', 'drainage', 'el nino', 'emissions', 'sustainability', 'kalimantan', 'riau', 'haze'],
    href: '/learn/peatlands-carbon-storage-or-release',
    badge: 'Experience',
  },
  {
    id: 'nutrient-cycling-tropical-soils',
    type: 'experience',
    title: 'Nutrient Cycling in Tropical Rainforest Soils',
    summary: 'Rapid biological nutrient uptake, mycorrhizal networks, the tropical soil fertility paradox, and the soil degradation consequences of deforestation.',
    topic: 'Environmental Systems',
    keywords: ['nutrient cycling', 'soil', 'tropical rainforest', 'leaching', 'mycorrhizae', 'deforestation', 'biomass', 'weathering', 'fertility', 'ecology'],
    href: '/learn/nutrient-cycling-tropical-soils',
    badge: 'Experience',
  },

  // Topics (11 total)
  {
    id: 'plate-tectonics',
    type: 'topic',
    title: 'Plate Tectonics & Lithosphere',
    summary: 'The dynamic planetary shell: convergent, divergent, and transform boundaries shaping continents and ocean basins.',
    keywords: ['plates', 'lithosphere', 'faults', 'earthquakes', 'subduction', 'rift'],
    href: '/explore/topics/plate-tectonics',
    badge: 'Topic',
  },
  {
    id: 'atmosphere',
    type: 'topic',
    summary: 'Global heat distribution, pressure cells, atmospheric circulation, monsoons, and climate patterns.',
    title: 'Atmosphere & Climate Systems',
    keywords: ['atmosphere', 'weather', 'climate', 'wind', 'monsoon', 'pressure', 'tropics'],
    href: '/explore/topics/atmosphere',
    badge: 'Topic',
  },
  {
    id: 'geology',
    type: 'topic',
    title: 'Geological Processes & Strata',
    summary: 'Earth materials, rock cycles, deep time, stratigraphy, and surface evolution.',
    keywords: ['geology', 'rocks', 'minerals', 'sediments', 'strata', 'erosion', 'deep time', 'rock cycle'],
    href: '/explore/topics/geology',
    badge: 'Topic',
  },
  {
    id: 'natural-hazards',
    type: 'topic',
    title: 'Natural Hazards & Risk Mitigation',
    summary: 'Geophysical and hydro-meteorological hazards: earthquakes, tsunamis, landslides, and disaster resilience.',
    keywords: ['hazard', 'natural hazards', 'earthquake', 'landslide', 'tsunami', 'disaster', 'risk', 'bnpb', 'liquefaction'],
    href: '/explore/topics/natural-hazards',
    badge: 'Topic',
  },
  {
    id: 'climate',
    type: 'topic',
    title: 'Climate Science & Zonation',
    summary: 'Planetary energy budgets, latitudinal insolation, monsoonal shifts, and long-term climate dynamics.',
    keywords: ['climate', 'climate zones', 'insolation', 'tropical', 'monsoon', 'equator', 'atmosphere'],
    href: '/explore/topics/climate',
    badge: 'Topic',
  },
  {
    id: 'paleontology',
    type: 'topic',
    title: 'Paleontology & Deep Time History',
    summary: 'The fossil record, evolutionary taphonomy, Pleistocene hominids, and ancient environmental reconstruction.',
    keywords: ['paleontology', 'fossils', 'evolution', 'sangiran', 'homo erectus', 'deep time', 'strata'],
    href: '/explore/topics/paleontology',
    badge: 'Topic',
  },
  {
    id: 'earth-structure',
    type: 'topic',
    title: 'Earth Structure & Internal Layers',
    summary: 'Crustal boundaries, the convective mantle, molten outer core, solid inner core, and seismic velocity discontinuities.',
    keywords: ['earth structure', 'crust', 'mantle', 'core', 'seismic waves', 'geophysics', 'layers'],
    href: '/explore/topics/earth-structure',
    badge: 'Topic',
  },
  {
    id: 'minerals',
    type: 'topic',
    title: 'Minerals & Crystallography',
    summary: 'Inorganic solid chemistry, crystal lattices, mineral diagnostic physical properties, and ore formation processes.',
    keywords: ['minerals', 'crystals', 'mohs', 'hardness', 'cleavage', 'ore', 'nickel', 'crystallography'],
    href: '/explore/topics/minerals',
    badge: 'Topic',
  },
  {
    id: 'hydrology',
    type: 'topic',
    title: 'Hydrology & Water Systems',
    summary: 'Hydrogeological cycles, aquifer storage and pore pressure, surface runoff, groundwater dynamics, and subsidence risks.',
    keywords: ['hydrology', 'groundwater', 'aquifer', 'water cycle', 'subsidence', 'precipitation', 'water table'],
    href: '/explore/topics/hydrology',
    badge: 'Topic',
  },
  {
    id: 'environmental-systems',
    type: 'topic',
    title: 'Environmental Systems & Biogeochemistry',
    summary: 'Ecological primary succession, biogeochemical nutrient and carbon flux, and ecosystem resilience following geological disturbances.',
    keywords: ['environmental systems', 'carbon cycle', 'succession', 'nutrients', 'ecosystem', 'krakatau', 'mangroves', 'rainforest'],
    href: '/explore/topics/environmental-systems',
    badge: 'Topic',
  },
  {
    id: 'sustainability',
    type: 'topic',
    title: 'Sustainability & Planetary Stewardship',
    summary: 'Sustainable land management, peatland conservation, carbon sequestration vs. emissions, and ecological risk mitigation.',
    keywords: ['sustainability', 'peatland', 'carbon emissions', 'conservation', 'land use', 'restoration'],
    href: '/explore/topics/sustainability',
    badge: 'Topic',
  },

  // Concepts
  {
    id: 'subduction',
    type: 'concept',
    title: 'Subduction Zones',
    summary: 'Where oceanic lithosphere plunges beneath a continental or younger oceanic plate, releasing water into the mantle wedge.',
    topic: 'Plate Tectonics',
    keywords: ['subduction', 'trench', 'slab', 'mantle wedge', 'flux melting', 'benioff zone'],
    href: '/learn/concepts/subduction',
    badge: 'Concept',
  },
  {
    id: 'volcanic-arcs',
    type: 'concept',
    title: 'Volcanic Arcs',
    summary: 'Curvilinear chains of composite volcanoes paralleling oceanic trenches, produced by subduction-induced melting.',
    topic: 'Plate Tectonics',
    keywords: ['volcanic arc', 'island arc', 'continental arc', 'andesite', 'stratovolcano'],
    href: '/learn/concepts/volcanic-arcs',
    badge: 'Concept',
  },
  {
    id: 'plate-tectonics-process',
    type: 'concept',
    title: 'Plate Tectonics Mechanism',
    summary: 'Mantle convection, slab pull, and ridge push driving planetary crust dynamics.',
    topic: 'Plate Tectonics',
    keywords: ['mantle convection', 'slab pull', 'ridge push', 'lithosphere', 'asthenosphere'],
    href: '/learn/concepts/plate-tectonics-process',
    badge: 'Concept',
  },
  {
    id: 'stratigraphy',
    type: 'concept',
    title: 'Stratigraphy & Superposition',
    summary: 'The geological study of rock strata. Nicolaus Steno’s principles of superposition, original horizontality, and lateral continuity.',
    topic: 'Geology',
    keywords: ['stratigraphy', 'strata', 'layers', 'superposition', 'relative dating', 'sediment'],
    href: '/learn/concepts/stratigraphy',
    badge: 'Concept',
  },
  {
    id: 'condensation',
    type: 'concept',
    title: 'Atmospheric Condensation',
    summary: 'Phase transition of water vapor to liquid droplets when humid air cools past its dew point temperature.',
    topic: 'Atmosphere',
    keywords: ['condensation', 'dew point', 'cooling', 'droplets', 'cloud formation', 'vapor'],
    href: '/learn/concepts/condensation',
    badge: 'Concept',
  },
  {
    id: 'atmospheric-pressure',
    type: 'concept',
    title: 'Atmospheric Pressure Gradients',
    summary: 'Pressure variations across air masses driving global and local wind circulation.',
    topic: 'Atmosphere',
    keywords: ['pressure gradient', 'barometer', 'air pressure', 'wind', 'isobars'],
    href: '/learn/concepts/atmospheric-pressure',
    badge: 'Concept',
  },

  // Applied Projects
  {
    id: 'volcanic-hazard-map',
    type: 'project',
    title: 'Volcanic Hazard Risk Mapping Brief',
    summary: 'Synthesize volcanology and subduction mechanics into a community hazard zonation map for Mount Merapi.',
    topic: 'Plate Tectonics',
    keywords: ['hazard map', 'merapi', 'risk', 'pyroclastic', 'lahar', 'project'],
    href: '/projects/volcanic-hazard-map',
    badge: 'Applied Project',
  },

  // Locations / Field Anchors
  {
    id: 'java-volcanic-arc',
    type: 'location',
    title: 'Java Volcanic Arc',
    summary: 'One of the most active subduction-driven volcanic arcs on Earth, spanning Java Island where the Indo-Australian Plate sinks under Sunda Plate.',
    keywords: ['java', 'volcano', 'subduction', 'sunda', 'indo-australian', 'indonesia', 'geomap'],
    href: '/geomap?location=java-volcanic-arc',
    badge: 'Indonesia Anchor',
  },
  {
    id: 'mount-merapi',
    type: 'location',
    title: 'Mount Merapi (Gunung Merapi)',
    summary: 'One of Indonesia’s most hazardous stratovolcanoes, renowned for viscous andesitic dome growth and deadly pyroclastic density currents.',
    keywords: ['merapi', 'yogyakarta', 'dome', 'pyroclastic', 'lahar', 'stratovolcano', 'indonesia'],
    href: '/geomap?location=mount-merapi',
    badge: 'Indonesia Anchor',
  },
  {
    id: 'palu-koro-fault',
    type: 'location',
    title: 'Palu-Koro Fault Zone',
    summary: 'Active strike-slip fault system cutting through Central Sulawesi and Palu Bay, site of the 2018 Mw 7.5 earthquake.',
    keywords: ['palu', 'koro', 'sulawesi', 'fault', 'earthquake', 'liquefaction', 'geomap'],
    href: '/geomap?location=palu-koro-fault',
    badge: 'Active Fault',
  },
  {
    id: 'sangiran-early-man',
    type: 'location',
    title: 'Sangiran Early Man Site',
    summary: 'UNESCO World Heritage Site in Central Java preserving 2.4 million years of hominid fossils and stone tool strata.',
    keywords: ['sangiran', 'fossils', 'homo erectus', 'java man', 'unesco', 'solo', 'geomap'],
    href: '/geomap?location=sangiran-early-man',
    badge: 'UNESCO Site',
  },
  {
    id: 'sumedang-landslides',
    type: 'location',
    title: 'Sumedang Highlands Landslide Region',
    summary: 'Steep volcanic terrain in West Java prone to heavy rainfall-triggered slope failures and mudflows.',
    keywords: ['sumedang', 'landslides', 'west java', 'bnpb', 'hazard', 'geomap'],
    href: '/geomap?location=sumedang-landslides',
    badge: 'Hazard Region',
  },
  {
    id: 'indonesian-nickel-belt',
    type: 'location',
    title: 'Indonesian Nickel Belt (Sulawesi & Halmahera)',
    summary: "Ultramafic ophiolite complexes subjected to deep tropical laterization, hosting over 60% of the world's mined nickel reserves.",
    keywords: ['nickel', 'sulawesi', 'halmahera', 'laterite', 'mining', 'minerals', 'geomap'],
    href: '/geomap?location=indonesian-nickel-belt',
    badge: 'Mineral Belt',
  },
  {
    id: 'jakarta-ancol-subsidence',
    type: 'location',
    title: 'North Jakarta & Ancol Subsidence Hotspot',
    summary: 'Coastal alluvial plain experiencing rapid land subsidence up to 10–12 cm/year due to deep groundwater extraction.',
    keywords: ['jakarta', 'ancol', 'subsidence', 'groundwater', 'sea level', 'coastal', 'geomap'],
    href: '/geomap?location=jakarta-ancol-subsidence',
    badge: 'Subsidence Zone',
  },
  {
    id: 'makassar-strait',
    type: 'location',
    title: 'Makassar Strait (ITF Core Gateway)',
    summary: 'Primary deep marine passage channeling ~11.6 Sverdrups of warm Pacific water into the Indian Ocean via the Indonesian Throughflow.',
    keywords: ['makassar strait', 'throughflow', 'itf', 'ocean current', 'sulawesi', 'kalimantan', 'geomap'],
    href: '/geomap?location=makassar-strait',
    badge: 'Ocean Gateway',
  },
  {
    id: 'aceh-tsunami-rupture',
    type: 'location',
    title: 'Aceh Coast & 2004 Megathrust Rupture',
    summary: 'Epicentral zone of the Mw 9.1–9.3 Sumatra-Andaman earthquake and devastating tsunami runup along the Sunda subduction megathrust.',
    keywords: ['aceh', 'sumatra', 'tsunami', 'megathrust', 'earthquake', 'sunda trench', 'geomap'],
    href: '/geomap?location=aceh-tsunami-rupture',
    badge: 'Megathrust Zone',
  },
  {
    id: 'krakatau-archipelago',
    type: 'location',
    title: 'Krakatau Archipelago & Anak Krakatau',
    summary: 'Historic volcanic island group in Sunda Strait serving as a global living laboratory for primary ecological succession.',
    keywords: ['krakatau', 'anak krakatau', 'sunda strait', 'volcano', 'succession', 'ecology', 'geomap'],
    href: '/geomap?location=krakatau-archipelago',
    badge: 'Volcano Laboratory',
  },
];

import type { Locale } from './i18nUrl';

/**
 * Executes a prioritized search query
 */
export function searchKnowledgeBase(query: string, locale: Locale = 'en'): SearchResult[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const terms = clean.split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];

  for (const item of SEARCH_INDEX) {
    let score = 0;
    let matchReason = '';

    const titleLower = item.title.toLowerCase();
    const topicLower = (item.topic || '').toLowerCase();
    const summaryLower = item.summary.toLowerCase();
    const keywordsLower = item.keywords.join(' ').toLowerCase();

    // 1. Title exact match or term match (Priority 1)
    if (titleLower === clean) {
      score += 100;
      matchReason = locale === 'id' ? 'Kecocokan judul persis' : 'Exact title match';
    } else if (titleLower.includes(clean)) {
      score += 60;
      matchReason = locale === 'id' ? 'Judul memuat frasa' : 'Title contains phrase';
    } else {
      const titleMatches = terms.filter((t) => titleLower.includes(t)).length;
      if (titleMatches > 0) {
        score += titleMatches * 25;
        matchReason = locale === 'id' ? 'Kata kunci judul cocok' : 'Title keyword match';
      }
    }

    // 2. Topic relevance (Priority 2)
    if (topicLower.includes(clean)) {
      score += 35;
      if (!matchReason) matchReason = locale === 'id' ? `Topik: ${item.topic}` : `Matches topic: ${item.topic}`;
    }

    // 3. Concept / keyword relevance (Priority 3)
    let keywordHits = 0;
    for (const t of terms) {
      if (keywordsLower.includes(t)) {
        keywordHits++;
      }
    }
    if (keywordHits > 0) {
      score += keywordHits * 15;
      if (!matchReason) matchReason = locale === 'id' ? 'Kata kunci ilmiah cocok' : 'Matches scientific keywords';
    }

    // 4. Summary / metadata match (Priority 4)
    if (summaryLower.includes(clean)) {
      score += 10;
      if (!matchReason) matchReason = locale === 'id' ? 'Ditemukan dalam deskripsi' : 'Matched in description';
    }

    if (score > 0) {
      const localizedHref = locale === 'id'
        ? (item.href.startsWith('/geomap') ? `/id${item.href}` : `/id${item.href}`)
        : item.href;

      results.push({
        ...item,
        href: localizedHref,
        score,
        matchReason,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
