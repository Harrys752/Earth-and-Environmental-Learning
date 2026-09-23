import { describe, it, expect } from 'vitest';
import { withBase } from '../../src/lib/url';
import {
  normalizePath,
  parseLocalePath,
  hasTranslation,
  getLocalizedUrl,
  getSwitchTargetUrl,
  isExperienceTranslated,
  isTopicTranslated,
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
    expect(hasTranslation('/learn/how-rain-forms', 'id')).toBe(false);
    expect(hasTranslation('/learn/the-rock-cycle', 'id')).toBe(false);
    expect(hasTranslation('/explore/topics/atmosphere', 'id')).toBe(false);

    // English always has all translations
    expect(hasTranslation('/learn/how-rain-forms', 'en')).toBe(true);
  });

  it('isExperienceTranslated and isTopicTranslated accurately identify translated content', () => {
    expect(isExperienceTranslated('why-volcanoes-form')).toBe(true);
    expect(isExperienceTranslated('how-rain-forms')).toBe(false);
    expect(isTopicTranslated('plate-tectonics')).toBe(true);
    expect(isTopicTranslated('atmosphere')).toBe(false);
  });

  it('getLocalizedUrl prefixes with base and id/ appropriately', () => {
    const enUrl = getLocalizedUrl('/about', 'en');
    const idUrl = getLocalizedUrl('/about', 'id');

    expect(enUrl).toBe(withBase('about'));
    expect(idUrl).toBe(withBase('id/about'));
  });

  it('getSwitchTargetUrl always targets the exact same slug/position in the target locale', () => {
    // Translated item switches directly
    const directResult = getSwitchTargetUrl('/learn/why-volcanoes-form', 'id');
    expect(directResult.isDirectTranslation).toBe(true);
    expect(directResult.url).toBe(withBase('id/learn/why-volcanoes-form'));

    // Untranslated item keeps exact same slug under /id/ with fallback flag
    const fallbackResult = getSwitchTargetUrl('/learn/how-rain-forms', 'id');
    expect(fallbackResult.isDirectTranslation).toBe(false);
    expect(fallbackResult.url).toBe(withBase('id/learn/how-rain-forms'));

    // Switching from Indonesian fallback page back to English
    const enSwitch = getSwitchTargetUrl('/id/learn/how-rain-forms', 'en');
    expect(enSwitch.isDirectTranslation).toBe(true);
    expect(enSwitch.url).toBe(withBase('learn/how-rain-forms'));
  });
});
