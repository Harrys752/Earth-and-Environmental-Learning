import { searchKnowledgeBase } from '../src/lib/search.ts';
import { getRelatedContent } from '../src/lib/contentGraph.ts';
import { GEOMAP_BASE_URL, buildGeoMapUrl } from '../src/lib/geomap.ts';

const queries = [
  'earth structure',
  'mineral',
  'groundwater',
  'throughflow',
  'tsunami',
  'succession',
  'carbon cycle',
  'peatland',
  'nutrient',
];

console.log('=== SEARCH QUERY VERIFICATION ===');
let searchFail = false;
for (const q of queries) {
  const results = searchKnowledgeBase(q);
  if (results.length === 0) {
    console.error(`FAILED: No search results for query "${q}"`);
    searchFail = true;
  } else {
    console.log(`PASS: "${q}" -> found ${results.length} results (top: ${results[0].title} [${results[0].href}])`);
  }
}

console.log('\n=== GEOMAP URL VERIFICATION ===');
const sampleGeoMapUrl = buildGeoMapUrl({ locationSlug: 'makassar-strait' });
if (sampleGeoMapUrl.startsWith('https://harrys752.github.io/GeoMap-New/')) {
  console.log('PASS: GeoMap URLs correctly point to GeoMap-New:', sampleGeoMapUrl);
} else {
  console.error('FAILED: GeoMap URL did not point to GeoMap-New:', sampleGeoMapUrl);
}

console.log('\n=== KNOWLEDGE NETWORK DENSITY VERIFICATION ===');
const allExperiences = [
  'why-volcanoes-form',
  'how-rain-forms',
  'reading-rock-layers',
  'why-do-earthquakes-happen',
  'the-rock-cycle',
  'why-are-there-climate-zones',
  'what-fossils-tell-us',
  'why-do-landslides-happen',
  'whats-inside-the-earth',
  'what-makes-a-mineral-a-mineral',
  'jakarta-sinking-city-groundwater',
  'indonesian-throughflow',
  'how-tsunamis-form',
  'ecosystem-recovery-after-eruption',
  'the-carbon-cycle',
  'peatlands-carbon-storage-or-release',
  'nutrient-cycling-tropical-soils',
];

let graphFail = false;
for (const slug of allExperiences) {
  const rel = getRelatedContent(slug);
  const totalConnected = rel.relatedExperiences.length + rel.relatedConcepts.length + rel.relatedLocations.length;
  if (totalConnected === 0) {
    console.error(`FAILED: ${slug} has 0 graph connections!`);
    graphFail = true;
  } else {
    console.log(`PASS: ${slug} has ${rel.relatedExperiences.length} exps, ${rel.relatedConcepts.length} concepts, ${rel.relatedLocations.length} locations`);
  }
}
