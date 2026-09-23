/**
 * GeoMap Indonesia Integration Configuration & Helper
 * Central single source of truth for external GeoMap URLs and deep-link generation.
 */

export const GEOMAP_BASE_URL = 'https://harrys752.github.io/GeoMap-New/';

export interface GeoMapLocationParams {
  locationSlug: string;
  coordinates?: { lat: number; lng: number };
  deepLinkParams?: Record<string, string>;
}

/**
 * Builds a valid external GeoMap deep link URL with standardized query parameters
 */
export function buildGeoMapUrl({
  locationSlug,
  coordinates,
  deepLinkParams = {},
}: GeoMapLocationParams): string {
  const queryParams = new URLSearchParams({
    location: locationSlug,
    ...deepLinkParams,
  });

  if (coordinates) {
    queryParams.set('lat', coordinates.lat.toString());
    queryParams.set('lng', coordinates.lng.toString());
  }

  return `${GEOMAP_BASE_URL}?${queryParams.toString()}`;
}
