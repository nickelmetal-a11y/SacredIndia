'use client';

import { useGeolocation } from '@/hooks/useGeolocation';
import { useSites } from '@/hooks/useSites';
import { calculateDistance, formatDistance, getWalkingTimeMinutes } from '@/utils/distance';
import Link from 'next/link';

export default function NearbySites() {
  const { location, loading: geoLoading, error: geoError } = useGeolocation();
  const { sites, religions, loading: sitesLoading } = useSites();

  if (geoLoading || sitesLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding nearby sacred sites...</p>
        </div>
      </section>
    );
  }

  if (geoError) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-amber-800 font-semibold">📍 {geoError}</p>
        <p className="text-amber-700 text-sm mt-2">
          Enable location permission to see nearby sites.
        </p>
      </section>
    );
  }

  if (!location) {
    return null;
  }

  const nearbySites = sites
    .map((site) => ({
      ...site,
      distance: calculateDistance(location, { lat: site.lat, lng: site.lng }),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="mb-12">
        <h2 className="font-serif text-4xl font-bold mb-2">🗺️ Nearby Sacred Sites</h2>
        <p className="text-gray-600">
          {nearbySites.length} pilgrimage sites closest to your location
        </p>
      </div>

      <div className="space-y-4">
        {nearbySites.map((site, idx) => (
          <Link
            key={site.id}
            href={`/sites/${site.id}`}
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{site.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{idx + 1}. {site.name}</p>
                    <p className="text-sm text-gray-500">{site.state}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-2">{site.subtitle}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-bold text-amber-600 text-lg">
                  {formatDistance(site.distance)}
                </p>
                <p className="text-xs text-gray-500">
                  {getWalkingTimeMinutes(site.distance)} min walk
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {religions[site.religion as keyof typeof religions]?.label}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/sites"
          className="inline-block px-8 py-4 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition-colors"
        >
          Explore All Sites →
        </Link>
      </div>
    </section>
  );
}
