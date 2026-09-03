'use client';

import { useState } from 'react';
import SiteCard from '@/app/components/SiteCard';

const FAITH_EMOJI: Record<string, string> = {
  'hindu': '🛕',
  'islam': '🕌',
  'christian': '✝️',
  'buddhist': '☸️',
  'jain': '⛩️',
  'sikh': '🪯',
  'zoroastrian': '🔥'
};

// Mock sites data (in real app, fetch from Supabase)
const MOCK_SITES = [
  { name: 'Kashi Vishwanath', faith: 'hindu', distance: 2.3, crowdLevel: 'high' },
  { name: 'Tirupati Temple', faith: 'hindu', distance: 15.2, crowdLevel: 'high' },
  { name: 'Ajmer Dargah', faith: 'islam', distance: 8.5, crowdLevel: 'medium' },
  { name: 'Golden Temple', faith: 'sikh', distance: 12.1, crowdLevel: 'high' },
  { name: 'Bodhi Tree', faith: 'buddhist', distance: 25.3, crowdLevel: 'low' },
  { name: 'Jain Temple', faith: 'jain', distance: 5.6, crowdLevel: 'medium' },
  { name: 'Cathedral Church', faith: 'christian', distance: 3.2, crowdLevel: 'low' },
  { name: 'Somanath Temple', faith: 'hindu', distance: 18.9, crowdLevel: 'medium' },
  { name: 'Rumi Darbar', faith: 'islam', distance: 7.4, crowdLevel: 'high' },
  { name: 'Vaishno Devi', faith: 'hindu', distance: 22.0, crowdLevel: 'very_high' }
];

export default function ExploreScreen() {
  const [selectedFaith, setSelectedFaith] = useState('');
  const [selectedCrowd, setSelectedCrowd] = useState('');
  const [seniorMode, setSeniorMode] = useState(false);

  const filteredSites = MOCK_SITES.filter(site => {
    if (selectedFaith && site.faith !== selectedFaith) return false;
    if (selectedCrowd && site.crowdLevel !== selectedCrowd) return false;
    return true;
  });

  return (
    <div className="px-4 py-6 max-w-3xl">
      {/* Filters Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h3 className="font-bold text-gray-800 mb-3">🔍 Filters</h3>

        {/* Faith Filter */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">By Faith</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFaith('')}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                selectedFaith === '' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              All
            </button>
            {Object.entries(FAITH_EMOJI).map(([faith, emoji]) => (
              <button
                key={faith}
                onClick={() => setSelectedFaith(faith)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  selectedFaith === faith ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Crowd Filter */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">By Crowd</p>
          <div className="flex flex-wrap gap-2">
            {['', 'low', 'medium', 'high', 'very_high'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedCrowd(level)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  selectedCrowd === level ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {level === '' ? 'All' : level === 'low' ? '✅ Low' : level === 'medium' ? '⏳ Medium' : level === 'high' ? '⚠️ High' : '🔴 Very High'}
              </button>
            ))}
          </div>
        </div>

        {/* Senior Mode Toggle */}
        <button
          onClick={() => setSeniorMode(!seniorMode)}
          className={`w-full py-2 rounded-lg font-semibold transition-all ${
            seniorMode ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-700'
          }`}
        >
          ♿ Senior Mode {seniorMode ? '✓' : ''}
        </button>
      </div>

      {/* Sites Grid */}
      <div>
        <p className="text-sm text-gray-600 mb-3">Showing {filteredSites.length} sites</p>
        <div className="space-y-4">
          {filteredSites.length > 0 ? (
            filteredSites.map((site) => (
              <SiteCard
                key={site.name}
                name={site.name}
                faith={site.faith}
                emoji={FAITH_EMOJI[site.faith]}
                distance={site.distance}
                crowdLevel={site.crowdLevel}
              />
            ))
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500 font-semibold">No sites found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Accessibility Info (Senior Mode) */}
      {seniorMode && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            ♿ <strong>Senior Mode Active:</strong> Showing wheelchair access, doli availability, and step counts.
          </p>
        </div>
      )}
    </div>
  );
}
