'use client';

import { Toilet } from '@/hooks/useSites';
import RatingStars from './RatingStars';

interface ToiletCardProps {
  toilet: Toilet;
}

export default function ToiletCard({ toilet }: ToiletCardProps) {
  const cleanlinessColor = {
    Excellent: '#10B981',
    Good: '#3B82F6',
    Fair: '#F59E0B',
    Poor: '#EF4444',
  }[toilet.cleanliness];

  const cleanlinessBg = {
    Excellent: '#ECFDF5',
    Good: '#EFF6FF',
    Fair: '#FFFBEB',
    Poor: '#FEF2F2',
  }[toilet.cleanliness];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{toilet.name}</h3>
          <p className="text-sm text-gray-600 mt-1">📍 {toilet.distance}</p>
        </div>
        <span className="text-3xl">🚽</span>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <RatingStars rating={toilet.rating} reviews={toilet.reviews} size="sm" />
      </div>

      {/* Cleanliness Badge */}
      <div
        className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-4"
        style={{ backgroundColor: cleanlinessBg, color: cleanlinessColor }}
      >
        ✓ {toilet.cleanliness}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-600 font-semibold">Cost</p>
          <p className="font-bold text-gray-900">{toilet.cost}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Hours</p>
          <p className="font-bold text-gray-900">{toilet.hours}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600 font-semibold mb-2">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {toilet.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility */}
      {toilet.accessible && (
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded border border-green-200 text-sm">
          <span>♿</span>
          <span className="font-semibold text-green-700">Wheelchair Accessible</span>
        </div>
      )}

      {/* Action Button */}
      <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
        Get Directions
      </button>
    </div>
  );
}
