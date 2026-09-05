'use client';

import { useState } from 'react';

const FAITH_DATA: Record<string, { emoji: string; name: string; color: string }> = {
  'hindu': { emoji: '🛕', name: 'Hindu', color: 'from-orange-500 to-red-600' },
  'islam': { emoji: '🕌', name: 'Islamic', color: 'from-green-600 to-emerald-700' },
  'christian': { emoji: '✝️', name: 'Christian', color: 'from-blue-600 to-blue-700' },
  'buddhist': { emoji: '☸️', name: 'Buddhist', color: 'from-yellow-600 to-amber-700' },
  'jain': { emoji: '⛩️', name: 'Jain', color: 'from-red-500 to-pink-600' },
  'sikh': { emoji: '🪯', name: 'Sikh', color: 'from-yellow-600 to-orange-700' },
  'zoroastrian': { emoji: '🔥', name: 'Zoroastrian', color: 'from-purple-600 to-pink-700' }
};

const MOCK_SITES = [
  { name: 'Kashi Vishwanath', faith: 'hindu', distance: 2.3, crowdLevel: 'high', desc: 'Ancient temple of Lord Shiva' },
  { name: 'Tirupati Temple', faith: 'hindu', distance: 15.2, crowdLevel: 'high', desc: 'Richest temple in the world' },
  { name: 'Ajmer Dargah', faith: 'islam', distance: 8.5, crowdLevel: 'medium', desc: 'Sufi saint\'s shrine' },
  { name: 'Golden Temple', faith: 'sikh', distance: 12.1, crowdLevel: 'high', desc: 'Holiest Sikh gurdwara' },
  { name: 'Bodhi Tree', faith: 'buddhist', distance: 25.3, crowdLevel: 'low', desc: 'Buddha\'s enlightenment site' },
  { name: 'Jain Temple', faith: 'jain', distance: 5.6, crowdLevel: 'medium', desc: 'Ancient Jain pilgrimage' },
  { name: 'Cathedral Church', faith: 'christian', distance: 3.2, crowdLevel: 'low', desc: 'Centuries-old church' },
  { name: 'Somanath Temple', faith: 'hindu', distance: 18.9, crowdLevel: 'medium', desc: 'Jyotirlinga shrine' },
  { name: 'Rumi Darbar', faith: 'islam', distance: 7.4, crowdLevel: 'high', desc: 'Historic Islamic saint site' },
  { name: 'Vaishno Devi', faith: 'hindu', distance: 22.0, crowdLevel: 'very_high', desc: 'Mountain goddess temple' }
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

  const getCrowdColor = (level: string) => {
    if (level === 'low') return 'bg-green-100 text-green-700';
    if (level === 'medium') return 'bg-yellow-100 text-yellow-700';
    if (level === 'high') return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white pt-8 pb-6 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2" style={{fontFamily: 'Georgia, serif'}}>
            Explore Sacred Sites
          </h1>
          <p className="text-indigo-100">
            Discover {filteredSites.length} spiritual destinations near you
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Filter by Faith */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-t-4 border-orange-500">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Your Faith</h3>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setSelectedFaith('')}
              className={`rounded-2xl p-3 font-semibold transition-all text-center ${
                selectedFaith === ''
                  ? 'bg-gray-900 text-white scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-2xl mb-1">✨</div>
              <div className="text-xs">All</div>
            </button>
            {Object.entries(FAITH_DATA).map(([faith, data]) => (
              <button
                key={faith}
                onClick={() => setSelectedFaith(faith)}
                className={`rounded-2xl p-3 font-semibold transition-all text-center ${
                  selectedFaith === faith
                    ? `bg-gradient-to-br ${data.color} text-white scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{data.emoji}</div>
                <div className="text-xs">{data.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Filter by Crowd */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-t-4 border-green-500">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Best Time to Visit</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: '', label: 'Any Time', icon: '📅' },
              { key: 'low', label: '✅ Quiet', icon: '🌅' },
              { key: 'medium', label: '⏳ Moderate', icon: '🌤️' },
              { key: 'high', label: '🔴 Busy', icon: '👥' }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setSelectedCrowd(key)}
                className={`rounded-2xl p-4 font-semibold transition-all ${
                  selectedCrowd === key
                    ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white scale-105 shadow-lg'
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 text-gray-800 border-2 border-green-200'
                }`}
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-sm">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Senior Mode */}
        <button
          onClick={() => setSeniorMode(!seniorMode)}
          className={`w-full rounded-3xl p-4 font-bold transition-all text-lg ${
            seniorMode
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-2 border-purple-300'
          }`}
        >
          ♿ {seniorMode ? 'Senior Mode Active' : 'Enable Senior Mode'}
        </button>

        {seniorMode && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-5 border-l-4 border-purple-600 text-sm text-gray-700">
            <p><strong>♿ Senior Mode:</strong> Showing wheelchair access, walking difficulty levels, and nearby facilities.</p>
          </div>
        )}

        {/* Sites List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Found {filteredSites.length} Sites</h3>
          </div>

          {filteredSites.length > 0 ? (
            <div className="space-y-4">
              {filteredSites.map((site) => {
                const faith = FAITH_DATA[site.faith];
                return (
                  <div
                    key={site.name}
                    className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 border-orange-500"
                  >
                    <div className="flex gap-4">
                      <div className={`text-4xl`}>{faith.emoji}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{site.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{site.desc}</p>
                        <div className="flex gap-2 items-center flex-wrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCrowdColor(site.crowdLevel)}`}>
                            {site.crowdLevel === 'low' ? '✅ Low Crowd' :
                             site.crowdLevel === 'medium' ? '⏳ Medium Crowd' :
                             site.crowdLevel === 'high' ? '⚠️ High Crowd' : '🔴 Very High'}
                          </span>
                          <span className="text-sm font-semibold text-gray-600">📍 {site.distance} km</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-2 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all">
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center border-2 border-dashed border-gray-300">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-gray-700 font-semibold">No sites found</p>
              <p className="text-sm text-gray-600">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
