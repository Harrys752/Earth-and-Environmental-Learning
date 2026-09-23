import { describe, it, expect } from 'vitest';
import { withBase } from '../../src/lib/url';
import {
  normalizePath,
  parseLocalePath,
  hasTranslation,
  getLocalizedUrl,
  getSwitchTargetUrl,
} from '../../src/lib/i18nUrl';

describe('i18nUrl helper functions', () => {
  it('normalizePath strips BASE_URL and trailing slashes', () => {
    expect(normalizePath('/Earth-and-Environmental-Learning/explore/')).toBe('/explore');
    expect(normalizePath('/Earth-and-Environmental-Learning/')).toBe('/');
    expect(normalizePath('/explore')).toBe('/explore');
  });

  it('parseLocalePath accurately identifies locale and canonical path', () => {
    expect(parseLocalePath('/Earth-and-Environmental-Learning/id/learn/why-volcanoes-form')).toEqual({
      locale: 'id',
      canonicalPath: '/learn/why-volcanoes-form',
    });

    expect(parseLocalePath('/Earth-and-Environmental-Learning/id/')).toEqual({
      locale: 'id',
      canonicalPath: '/',
    });

    expect(parseLocalePath('/Earth-and-Environmental-Learning/about')).toEqual({
      locale: 'en',
      canonicalPath: '/about',
    });
  });

  it('hasTranslation returns true for translated Phase 1 content and false for untranslated', () => {
    expect(hasTranslation('/learn/why-volcanoes-form', 'id')).toBe(true);
    expect(hasTranslation('/explore/topics/plate-tectonics', 'id')).toBe(true);
    expect(hasTranslation('/about', 'id')).toBe(true);
    expect(hasTranslation('/geomap', 'id')).toBe(true);

    // Untranslated Phase 2 items
    expect(hasTranslation('/learn/how-earthquakes-shake', 'id')).toBe(false);
    expect(hasTranslation('/learn/rock-cycle-journey', 'id')).toBe(false);
    expect(hasTranslation('/explore/topics/hydrology', 'id')).toBe(false);

    // English always has all translations
    expect(hasTranslation('/learn/how-earthquakes-shake', 'en')).toBe(true);
  });

  it('getLocalizedUrl prefixes with base and id/ appropriately', () => {
    const enUrl = getLocalizedUrl('/about', 'en');
    const idUrl = getLocalizedUrl('/about', 'id');

    expect(enUrl).toBe(withBase('about'));
    expect(idUrl).toBe(withBase('id/about'));
  });

  it('getSwitchTargetUrl falls back safely to /id for untranslated content in Indonesian', () => {
    // Translated item switches directly
    const directResult = getSwitchTargetUrl('/learn/why-volcanoes-form', 'id');
    expect(directResult.isDirectTranslation).toBe(true);
    expect(directResult.url).toBe(withBase('id/learn/why-volcanoes-form'));

    // Untranslated item falls back to /id landing page
    const fallbackResult = getSwitchTargetUrl('/learn/how-earthquakes-shake', 'id');
    expect(fallbackResult.isDirectTranslation).toBe(false);
    expect(fallbackResult.url).toBe(withBase('id'));

    // Switching back to English is always direct
    const enSwitch = getSwitchTargetUrl('/id/learn/why-volcanoes-form', 'en');
    expect(enSwitch.isDirectTranslation).toBe(true);
    expect(enSwitch.url).toBe(withBase('learn/why-volcanoes-form'));
  });
});
