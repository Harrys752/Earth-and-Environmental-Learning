import fs from 'fs';
import path from 'path';

const distDir = 'C:\\vscode\\earth-learning\\dist';

for (const p of ['explore/experiences/index.html', 'id/explore/experiences/index.html']) {
  const content = fs.readFileSync(path.join(distDir, p), 'utf8');
  const articles = content.match(/<article/g) || [];
  console.log(`${p}: ${articles.length} <article> elements`);
}
for (const p of ['explore/topics/index.html', 'id/explore/topics/index.html']) {
  const content = fs.readFileSync(path.join(distDir, p), 'utf8');
  const topicCards = content.match(/href="[^"]*\/explore\/topics\/[^"]*"/g) || [];
  console.log(`${p}: ${topicCards.length} topic links found`);
}
