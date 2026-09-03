'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSites } from '@/hooks/useSites';
import SiteCard from '@/components/SiteCard';

export default function SitesPage() {
  const { sites, religions, loading, searchSites, getSitesByReligion } = useSites();
  const [selectedReligion, setSelectedReligion] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSites = useMemo(() => {
    let result = sites;

    if (selectedReligion) {
      result = result.filter(site => site.religion === selectedReligion);
    }

    if (searchQuery.trim()) {
      result = searchSites(searchQuery);
      if (selectedReligion) {
        result = result.filter(site => site.religion === selectedReligion);
      }
    }

    return result;
  }, [sites, selectedReligion, searchQuery, searchSites]);

  const religionList = Object.entries(religions);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* App Header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-4 py-5">
        <h1 className="text-2xl font-bold">All Sacred Sites</h1>
        <p className="text-blue-100 text-sm mt-1">{filteredSites.length} results</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
          <input
            type="text"
            placeholder="Search sites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Religion Filter */}
        <section className="px-4 py-3 border-b border-gray-200 sticky top-11 bg-white z-10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedReligion('')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedReligion === ''
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              All
            </button>
            {religionList.map(([key, rel]) => (
              <button
                key={key}
                onClick={() => setSelectedReligion(key)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                style={
                  selectedReligion === key
                    ? { backgroundColor: rel.color, color: 'white' }
                    : { backgroundColor: '#f3f4f6', color: rel.color }
                }
              >
                {rel.emoji}
              </button>
            ))}
          </div>
        </section>

        {/* Sites List */}
        {filteredSites.length > 0 ? (
          <section className="px-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredSites.map(site => (
                <SiteCard
                  key={site.id}
                  site={site}
                  religion={religions[site.religion as keyof typeof religions]}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-4">No sites found</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedReligion('');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around">
        <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-gray-700">
          <span className="text-2xl mb-1">🏠</span>
          <span className="text-xs font-semibold">Home</span>
        </Link>
        <Link href="/sites" className="flex flex-col items-center text-blue-600 hover:text-blue-700">
          <span className="text-2xl mb-1">🗂️</span>
          <span className="text-xs font-semibold">All Sites</span>
        </Link>
        <div className="flex flex-col items-center text-gray-600">
          <span className="text-2xl mb-1">⚙️</span>
          <span className="text-xs font-semibold">Settings</span>
        </div>
      </nav>
    </div>
  );
}
