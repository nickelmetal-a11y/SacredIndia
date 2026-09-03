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
          <p className="text-gray-600">Loading sacred sites...</p>
        </div>
      </div>
    );
  }

  const religionList = Object.entries(religions);
  const filteredSites = selectedReligion ? getSitesByReligion(selectedReligion) : sites;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white px-4 py-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">🙏 Sacred India</h1>
          <p className="text-blue-100">Discover 85+ sacred sites across 7 major faiths</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-50 border-b border-blue-200 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 flex-wrap">
            <Link href="/sites" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
              All Sites
            </Link>
            <Link href="/" className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Religion Filter */}
      <section className="bg-gray-50 px-4 py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Filter by Religion</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedReligion('')}
              className={`px-4 py-2 rounded font-semibold text-sm transition-all ${
                selectedReligion === ''
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {religionList.map(([key, rel]) => (
              <button
                key={key}
                onClick={() => setSelectedReligion(key)}
                className={`px-4 py-2 rounded font-semibold text-sm transition-all ${
                  selectedReligion === key
                    ? 'text-white'
                    : 'bg-white border text-gray-700 hover:bg-gray-50'
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
      </section>

      {/* Sites List */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {selectedReligion ? religions[selectedReligion as keyof typeof religions]?.label : 'All'} Sacred Sites
          </h2>
          <p className="text-gray-600">
            Showing {filteredSites.length} {selectedReligion ? `${religions[selectedReligion as keyof typeof religions]?.label} ` : ''}site{filteredSites.length !== 1 ? 's' : ''}
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
          <div className="text-center py-12">
            <p className="text-gray-600">No sites found</p>
          </div>
        )}
      </section>
    </div>
  );
}
