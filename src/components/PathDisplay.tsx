'use client';

import { Path } from '@/hooks/useSites';

interface PathDisplayProps {
  path: Path;
}

export default function PathDisplay({ path }: PathDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8 border border-amber-200">
      {/* Path Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{path.label}</h3>
            <p className="text-gray-600 mt-1">{path.description}</p>
          </div>
          <span className="text-4xl">
            {path.type === 'elderly' ? '👴' : '🧗'}
          </span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 font-semibold">Distance</p>
            <p className="text-lg font-bold text-amber-700">{path.distance}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">Duration</p>
            <p className="text-lg font-bold text-amber-700">{path.duration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">Difficulty</p>
            <div className="mt-1 inline-block px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor:
                  path.difficulty === 'Easy' ? '#DCFCE7' :
                  path.difficulty === 'Moderate' ? '#FEF3C7' :
                  '#FEE2E2',
                color:
                  path.difficulty === 'Easy' ? '#166534' :
                  path.difficulty === 'Moderate' ? '#92400E' :
                  '#991B1B'
              }}>
              {path.difficulty}
            </div>
          </div>
          {path.elevation && (
            <div>
              <p className="text-sm text-gray-600 font-semibold">Elevation</p>
              <p className="text-lg font-bold text-amber-700">{path.elevation}</p>
            </div>
          )}
        </div>
      </div>

      {/* Waypoints */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-gray-900 mb-4">🧭 Route Waypoints</h4>
        <div className="space-y-3">
          {path.waypoints.map((wp, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{wp.name}</p>
                <div className="flex gap-4 mt-1 text-sm text-gray-600">
                  <span>📍 {wp.dist}</span>
                  <span>⏱️ {wp.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      {path.amenities && path.amenities.length > 0 && (
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">🏛️ Amenities</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {path.amenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                <span className="text-lg">
                  {amenity.includes('Rest') ? '🛑' :
                   amenity.includes('Water') ? '💧' :
                   amenity.includes('Food') ? '🍲' :
                   amenity.includes('Toilet') ? '🚽' :
                   amenity.includes('Meditation') ? '🧘' :
                   '✓'}
                </span>
                <span className="text-sm font-medium text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
