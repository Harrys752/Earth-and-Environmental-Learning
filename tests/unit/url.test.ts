import { describe, it, expect } from 'vitest';
import { withBase } from '../../src/lib/url';

describe('withBase URL helper', () => {
  it('should prefix internal absolute paths with BASE_URL', () => {
    const result = withBase('/explore');
    expect(result).toContain('explore');
  });

  it('should handle root path cleanly', () => {
    const result = withBase('/');
    expect(result).toBe(import.meta.env.BASE_URL);
  });

  it('should preserve external HTTP/HTTPS URLs', () => {
    const external = 'https://harrys752.github.io/GeoMap-New/';
    expect(withBase(external)).toBe(external);
  });
});
