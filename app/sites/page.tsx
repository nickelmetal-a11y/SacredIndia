'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSites } from '@/hooks/useSites';
import SiteCard from '@/components/SiteCard';

export default function SitesPage() {
  const { sites, religions, loading, searchSites, getSitesByReligion } = useSites();
  const [selectedReligion, setSelectedReligion] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');

  const filteredSites = useMemo(() => {
    let result = sites;

    if (selectedReligion) {
      result = result.filter(site => site.religion === selectedReligion);
    }

    if (selectedState) {
      result = result.filter(site => site.state === selectedState);
    }

    if (searchQuery.trim()) {
      result = searchSites(searchQuery);
      if (selectedReligion) {
        result = result.filter(site => site.religion === selectedReligion);
      }
    }

    return result;
  }, [sites, selectedReligion, searchQuery, selectedState, searchSites]);

  const states = [...new Set(sites.map(s => s.state))].sort();
  const religionList = Object.entries(religions);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition">
            ← Back to Home
          </Link>
          <h1 className="font-serif text-5xl font-bold mb-2">Explore All Sacred Sites</h1>
          <p className="text-xl text-gray-300">85+ pilgrimage destinations across India</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, location, or badge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="space-y-4">
            {/* Religion Filter */}
            <div>
              <label className="text-sm font-semibold text-gray-600 uppercase block mb-3">
                Religion
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedReligion('')}
                  className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                    selectedReligion === ''
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  All
                </button>
                {religionList.map(([key, rel]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedReligion(key)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                      selectedReligion === key
                        ? 'text-white'
                        : 'bg-white border text-gray-700'
                    }`}
                    style={
                      selectedReligion === key
                        ? { backgroundColor: rel.color }
                        : { borderColor: rel.border, color: rel.color }
                    }
                  >
                    {rel.emoji} {rel.label}
                  </button>
                ))}
              </div>
            </div>

            {/* State Filter */}
            <div>
              <label className="text-sm font-semibold text-gray-600 uppercase block mb-3">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-700"
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="font-serif text-3xl font-bold mb-2">
            {filteredSites.length} Results
          </h2>
          <p className="text-gray-600">
            {searchQuery && `Showing results for "${searchQuery}"`}
            {selectedReligion && ` in ${religions[selectedReligion as keyof typeof religions]?.label}`}
            {selectedState && ` located in ${selectedState}`}
          </p>
        </div>

        {filteredSites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map(site => (
              <SiteCard
                key={site.id}
                site={site}
                religion={religions[site.religion as keyof typeof religions]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">No sites found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedReligion('');
                setSelectedState('');
              }}
              className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
