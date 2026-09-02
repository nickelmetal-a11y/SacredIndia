'use client';

import { useState } from 'react';

interface RatingStarsProps {
  rating: number;
  reviews: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function RatingStars({
  rating,
  reviews,
  onRate,
  interactive = false,
  size = 'md',
}: RatingStarsProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const displayRating = hoveredRating !== null ? hoveredRating : rating;

  const sizeClass = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }[size];

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(null)}
            disabled={!interactive}
            className={`${sizeClass} transition-transform ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            }`}
          >
            {star <= displayRating ? (
              <span className="text-yellow-400">★</span>
            ) : star - displayRating < 1 ? (
              <span className="text-yellow-300">★</span>
            ) : (
              <span className="text-gray-300">★</span>
            )}
          </button>
        ))}
      </div>
      <div>
        <p className="font-bold text-gray-900">{rating.toFixed(1)}</p>
        <p className="text-xs text-gray-600">{reviews} reviews</p>
      </div>
    </div>
  );
}
