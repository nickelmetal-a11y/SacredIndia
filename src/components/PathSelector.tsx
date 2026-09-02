'use client';

import { useState } from 'react';
import { Path } from '@/hooks/useSites';
import PathDisplay from './PathDisplay';

interface PathSelectorProps {
  paths?: Path[];
}

export default function PathSelector({ paths = [] }: PathSelectorProps) {
  const [selectedPath, setSelectedPath] = useState<Path | null>(paths[0] || null);

  if (!paths || paths.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
        <p className="text-amber-800 font-semibold">🧭 Routes not yet available for this site</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Path Selection Buttons */}
      <div className="flex gap-4">
        {paths.map((path) => (
          <button
            key={path.type}
            onClick={() => setSelectedPath(path)}
            className={`flex-1 p-6 rounded-lg border-2 transition-all ${
              selectedPath?.type === path.type
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-200 bg-white hover:border-amber-300'
            }`}
          >
            <p className="text-2xl mb-2">
              {path.type === 'elderly' ? '👴' : '🧗'}
            </p>
            <p className="font-bold text-gray-900">{path.label}</p>
            <p className="text-sm text-gray-600 mt-1">{path.distance}</p>
            <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold"
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
          </button>
        ))}
      </div>

      {/* Selected Path Display */}
      {selectedPath && <PathDisplay path={selectedPath} />}
    </div>
  );
}
