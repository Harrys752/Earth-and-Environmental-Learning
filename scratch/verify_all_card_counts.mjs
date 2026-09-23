import fs from 'fs';
import path from 'path';

const distDir = 'C:\\vscode\\earth-learning\\dist';

function checkListingCards(relPath, label) {
  const fullPath = path.join(distDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] ${relPath} not found`);
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Count learning card article elements or experience link cards
  const allExpSlugs = [
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

  console.log(`\n=== Card Count Check: ${label} (${relPath}) ===`);
  let dupCount = 0;
  let missingCount = 0;
  for (const slug of allExpSlugs) {
    const regex = new RegExp(`href="[^"]*\\/learn\\/${slug}"`, 'g');
    const matches = content.match(regex) || [];
    if (matches.length === 1) {
      // Exactly 1 card
    } else if (matches.length > 1) {
      console.warn(`  [WARN] ${slug} matched ${matches.length} times`);
      dupCount++;
    } else {
      console.error(`  [ERROR] ${slug} missing (0 matches)`);
      missingCount++;
    }
  }

  if (dupCount === 0 && missingCount === 0) {
    console.log(`  PASS: Exactly 17 canonical experience cards rendered with 0 duplicates and 0 missing.`);
  }
}

checkListingCards('explore/experiences/index.html', 'EN All Experiences');
checkListingCards('id/explore/experiences/index.html', 'ID All Experiences');
checkListingCards('explore/topics/index.html', 'EN All Topics');
checkListingCards('id/explore/topics/index.html', 'ID All Topics');
