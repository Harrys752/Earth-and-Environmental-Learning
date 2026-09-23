const fs = require('fs');
const path = require('path');

const distIdDir = path.resolve(__dirname, '../../dist/id');

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (fullPath.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(distIdDir);
console.log(`Auditing ${htmlFiles.length} Indonesian HTML files in dist/id...`);

const targetForbiddenPhrases = [
  'Your Scientific Progress Dimensions',
  'Not Yet Started',
  'Click to Log',
  'Investigation Projects',
  'Field Observations',
  'Simulations &amp; Models',
  'Simulations & Models',
  'Inquiry Questions',
  'Reset Progress',
  'Revisit Prerequisite Experience',
  'Investigation Objectives',
  'Execution Protocol',
  'Related Scientific Domains',
  'Knowledge Network',
  'Konten Disajikan dalam Bahasa Asli', // Should have 0 fallback banners!
  'Belum Diterjemahkan',
];

let totalViolations = 0;

for (const phrase of targetForbiddenPhrases) {
  let matches = [];
  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(phrase)) {
      matches.push(path.relative(distIdDir, file));
    }
  }
  if (matches.length > 0) {
    console.error(`❌ Found "${phrase}" in:`, matches);
    totalViolations += matches.length;
  } else {
    console.log(`✓ Clean (0 matches): "${phrase}"`);
  }
}

if (totalViolations === 0) {
  console.log('\n🎉 ALL 14 AUDIT PHRASES PASSED WITH ZERO VIOLATIONS ACROSS ALL INDONESIAN PAGES!');
  process.exit(0);
} else {
  console.error(`\n❌ Failed with ${totalViolations} violations.`);
  process.exit(1);
}
