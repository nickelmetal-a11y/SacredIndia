'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSites } from '@/hooks/useSites';
import SiteCard from '@/components/SiteCard';

export default function Home() {
  const { sites, religions, loading, getSitesByReligion } = useSites();
  const [selectedReligion, setSelectedReligion] = useState<string>('');

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

  const religionList = Object.entries(religions);
  const filteredSites = selectedReligion ? getSitesByReligion(selectedReligion) : sites;

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* App Header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-4 py-6">
        <h1 className="text-2xl font-bold">Sacred India</h1>
        <p className="text-blue-100 text-sm mt-1">Discover sacred sites</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Religion Filter */}
        <section className="px-4 py-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedReligion('')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
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
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
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

        {/* Sites Grid */}
        <section className="px-4 py-6">
          {filteredSites.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredSites.map(site => (
                <SiteCard
                  key={site.id}
                  site={site}
                  religion={religions[site.religion as keyof typeof religions]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No sites found</p>
            </div>
          )}
        </section>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around">
        <Link href="/" className="flex flex-col items-center text-blue-600 hover:text-blue-700">
          <span className="text-2xl mb-1">🏠</span>
          <span className="text-xs font-semibold">Home</span>
        </Link>
        <Link href="/sites" className="flex flex-col items-center text-gray-600 hover:text-gray-700">
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
