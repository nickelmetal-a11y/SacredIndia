'use client';

import { useState } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useSites } from '@/hooks/useSites';
import { calculateDistance } from '@/utils/distance';
import ToiletCard from './ToiletCard';

export default function ToiletFinder() {
  const { location, loading: geoLoading, error: geoError } = useGeolocation();
  const { sites, loading: sitesLoading } = useSites();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'excellent' | 'accessible'>('all');

  if (geoLoading || sitesLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding nearby toilets...</p>
        </div>
      </section>
    );
  }

  if (geoError) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 bg-green-50 rounded-lg border border-green-200">
        <p className="text-green-800 font-semibold">🚽 {geoError}</p>
        <p className="text-green-700 text-sm mt-2">
          Enable location permission to find clean toilets nearby.
        </p>
      </section>
    );
  }

  if (!location) {
    return null;
  }

  // Collect all toilets from all sites and add distance
  const allToilets = sites
    .flatMap((site) =>
      (site.toilets || []).map((toilet) => ({
        ...toilet,
        siteName: site.name,
        distance: calculateDistance(location, { lat: toilet.lat, lng: toilet.lng }),
      }))
    )
    .sort((a, b) => a.distance - b.distance);

  // Apply filters
  const filteredToilets =
    selectedFilter === 'excellent'
      ? allToilets.filter((t) => t.cleanliness === 'Excellent')
      : selectedFilter === 'accessible'
      ? allToilets.filter((t) => t.accessible)
      : allToilets;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="mb-12">
        <h2 className="font-serif text-4xl font-bold mb-2">🚽 Find Clean Toilets</h2>
        <p className="text-gray-600">
          {filteredToilets.length} clean, rated toilet facilities near you
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { id: 'all', label: 'All Toilets', icon: '🚽' },
          { id: 'excellent', label: 'Excellent Only', icon: '✨' },
          { id: 'accessible', label: 'Wheelchair Access', icon: '♿' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
              selectedFilter === filter.id
                ? 'bg-green-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-green-400'
            }`}
          >
            <span>{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>

      {/* Toilets Grid */}
      {filteredToilets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredToilets.slice(0, 12).map((toilet, idx) => (
            <ToiletCard key={`${toilet.id}-${idx}`} toilet={toilet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 font-semibold">No toilets found matching your criteria</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-900 font-semibold mb-2">💡 Rating System</p>
        <p className="text-blue-800 text-sm">
          Ratings are based on cleanliness, maintenance, and amenities. Help others by rating toilets
          you visit!
        </p>
      </div>
    </section>
  );
}
