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

  it('builds expected static pages including all English and Indonesian routes', () => {
    const htmlFiles = getHtmlFiles(distDir);
    expect(htmlFiles.length).toBeGreaterThanOrEqual(80);

    const expectedPages = [
      // English Experiences (17 total)
      'learn/why-volcanoes-form/index.html',
      'learn/how-rain-forms/index.html',
      'learn/reading-rock-layers/index.html',
      'learn/why-do-earthquakes-happen/index.html',
      'learn/the-rock-cycle/index.html',
      'learn/why-are-there-climate-zones/index.html',
      'learn/what-fossils-tell-us/index.html',
      'learn/why-do-landslides-happen/index.html',
      'learn/whats-inside-the-earth/index.html',
      'learn/what-makes-a-mineral-a-mineral/index.html',
      'learn/jakarta-sinking-city-groundwater/index.html',
      'learn/indonesian-throughflow/index.html',
      'learn/how-tsunamis-form/index.html',
      'learn/ecosystem-recovery-after-eruption/index.html',
      'learn/the-carbon-cycle/index.html',
      'learn/peatlands-carbon-storage-or-release/index.html',
      'learn/nutrient-cycling-tropical-soils/index.html',
      // English Topics (11 total)
      'explore/topics/plate-tectonics/index.html',
      'explore/topics/atmosphere/index.html',
      'explore/topics/geology/index.html',
      'explore/topics/natural-hazards/index.html',
      'explore/topics/climate/index.html',
      'explore/topics/paleontology/index.html',
      'explore/topics/earth-structure/index.html',
      'explore/topics/minerals/index.html',
      'explore/topics/hydrology/index.html',
      'explore/topics/environmental-systems/index.html',
      'explore/topics/sustainability/index.html',
      // Indonesian Hubs & Base Pages
      'id/index.html',
      'id/about/index.html',
      'id/geomap/index.html',
      'id/search/index.html',
      'id/explore/index.html',
      'id/explore/topics/index.html',
      'id/explore/experiences/index.html',
      'id/explore/discoveries/index.html',
      'id/learn/index.html',
      'id/journey/index.html',
      'id/journey/timeline/index.html',
      'id/journey/reflections/index.html',
      'id/journey/projects/index.html',
      // Indonesian Translated & Fallback Experiences (ALL 17 exist)
      'id/learn/why-volcanoes-form/index.html',
      'id/learn/how-rain-forms/index.html',
      'id/learn/reading-rock-layers/index.html',
      'id/learn/why-do-earthquakes-happen/index.html',
      'id/learn/the-rock-cycle/index.html',
      'id/learn/why-are-there-climate-zones/index.html',
      'id/learn/what-fossils-tell-us/index.html',
      'id/learn/why-do-landslides-happen/index.html',
      'id/learn/whats-inside-the-earth/index.html',
      'id/learn/what-makes-a-mineral-a-mineral/index.html',
      'id/learn/jakarta-sinking-city-groundwater/index.html',
      'id/learn/indonesian-throughflow/index.html',
      'id/learn/how-tsunamis-form/index.html',
      'id/learn/ecosystem-recovery-after-eruption/index.html',
      'id/learn/the-carbon-cycle/index.html',
      'id/learn/peatlands-carbon-storage-or-release/index.html',
      'id/learn/nutrient-cycling-tropical-soils/index.html',
      // Indonesian Translated & Fallback Topics (ALL 11 exist)
      'id/explore/topics/plate-tectonics/index.html',
      'id/explore/topics/atmosphere/index.html',
      'id/explore/topics/geology/index.html',
      'id/explore/topics/natural-hazards/index.html',
      'id/explore/topics/climate/index.html',
      'id/explore/topics/paleontology/index.html',
      'id/explore/topics/earth-structure/index.html',
      'id/explore/topics/minerals/index.html',
      'id/explore/topics/hydrology/index.html',
      'id/explore/topics/environmental-systems/index.html',
      'id/explore/topics/sustainability/index.html',
    ];

    for (const ep of expectedPages) {
      const pagePath = path.join(distDir, ...ep.split('/'));
      expect(fs.existsSync(pagePath), `Missing ${ep}`).toBe(true);
    }
  });

  it('contains no unprefixed raw root-relative href links in built html files', () => {
    const htmlFiles = getHtmlFiles(distDir);
    const rawHrefRegex = /href="\/((?!Earth-and-Environmental-Learning\/|#|\/\/)(id|learn|explore|projects|geomap|journey|search|about)[^"\s>]*)"/g;
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
