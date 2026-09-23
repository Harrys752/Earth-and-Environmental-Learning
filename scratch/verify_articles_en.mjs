import fs from 'fs';

const html = fs.readFileSync('C:\\vscode\\earth-learning\\dist\\explore\\experiences\\index.html', 'utf8');

const cardRegex = /<article[\s\S]*?<\/article>/g;
const articles = html.match(cardRegex) || [];
console.log(`Total <article> elements in EN experiences list: ${articles.length}`);

for (const art of articles) {
  const titleMatch = art.match(/<h[2345][^>]*>(.*?)<\/h[2345]>/);
  if (titleMatch) {
    console.log(' - ' + titleMatch[1].replace(/<[^>]+>/g, '').trim());
  }
}
