import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

function getHtmlFiles(dir: string): string[] {
  let results: string[] = [];
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

describe('Dist Build Artifact Integrity', () => {
  const distDir = path.resolve(process.cwd(), 'dist');
  const htmlFiles = getHtmlFiles(distDir);

  it('builds expected 34 pages including all 8 experiences and 6 topics', () => {
    expect(htmlFiles.length).toBeGreaterThanOrEqual(34);

    const expectedPages = [
      'learn/why-volcanoes-form/index.html',
      'learn/how-rain-forms/index.html',
      'learn/reading-rock-layers/index.html',
      'learn/why-do-earthquakes-happen/index.html',
      'learn/the-rock-cycle/index.html',
      'learn/why-are-there-climate-zones/index.html',
      'learn/what-fossils-tell-us/index.html',
      'learn/why-do-landslides-happen/index.html',
      'explore/topics/plate-tectonics/index.html',
      'explore/topics/atmosphere/index.html',
      'explore/topics/geology/index.html',
      'explore/topics/natural-hazards/index.html',
      'explore/topics/climate/index.html',
      'explore/topics/paleontology/index.html',
    ];

    for (const ep of expectedPages) {
      const pagePath = path.join(distDir, ...ep.split('/'));
      expect(fs.existsSync(pagePath), `Missing ${ep}`).toBe(true);
    }
  });

  it('contains no unprefixed raw root-relative href links in built html files', () => {
    const rawHrefRegex = /href="\/((?!Earth-and-Environmental-Learning\/|#|\/\/)(learn|explore|projects|geomap|journey|search|about)[^"\s>]*)"/g;
    const violations: { file: string; match: string }[] = [];

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      let match: RegExpExecArray | null;
      while ((match = rawHrefRegex.exec(content)) !== null) {
        violations.push({ file: path.relative(distDir, file), match: match[0] });
      }
    }

    expect(violations).toEqual([]);
  });
});
