import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const distDir = 'C:\\vscode\\earth-learning\\dist';

function checkFile(relPath, label) {
  const fullPath = path.join(distDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`[FAIL] ${relPath} not found`);
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Check how many times Why Volcanoes Form / Mengapa Gunung Api appears as learning cards
  const volcanoMatches = content.match(/href="[^"]*\/learn\/why-volcanoes-form"/g) || [];
  const rainMatches = content.match(/href="[^"]*\/learn\/how-rain-forms"/g) || [];
  
  console.log(`[CHECK] ${label} (${relPath}):`);
  console.log(`  - volcano links: ${volcanoMatches.length} (${volcanoMatches.join(', ')})`);
  console.log(`  - rain links: ${rainMatches.length} (${rainMatches.join(', ')})`);
}

checkFile('explore/experiences/index.html', 'EN Experiences List');
checkFile('id/explore/experiences/index.html', 'ID Experiences List');
checkFile('explore/topics/geology/index.html', 'EN Geology Topic');
checkFile('id/explore/topics/geology/index.html', 'ID Geology Topic');
checkFile('index.html', 'EN Homepage');
checkFile('id/index.html', 'ID Homepage');
checkFile('learn/index.html', 'EN Learn Index');
checkFile('id/learn/index.html', 'ID Learn Index');
