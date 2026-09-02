'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSites } from '@/src/hooks/useSites';
import SiteCard from '@/src/components/SiteCard';

export default function Home() {
  const { sites, religions, loading, getSitesByReligion } = useSites();
  const [selectedReligion, setSelectedReligion] = useState<string>('hindu');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-white">Loading sacred sites...</p>
        </div>
      </div>
    );
  }

  const religionList = Object.entries(religions);
  const filteredSites = selectedReligion ? getSitesByReligion(selectedReligion) : sites;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -top-20 -left-20 animate-float"></div>
          <div className="absolute w-80 h-80 bg-green-500/5 rounded-full blur-3xl -bottom-10 -right-20 animate-float" style={{ animationDelay: '-3s' }}></div>
          <div className="absolute w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl top-1/2 left-1/4 animate-float" style={{ animationDelay: '-5s' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Religion badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {religionList.map(([key, rel]) => (
              <span
                key={key}
                className="inline-block px-4 py-2 rounded-full text-xs font-semibold bg-white/10 border border-white/20"
              >
                {rel.emoji} {rel.label}
              </span>
            ))}
          </div>

          {/* Eyebrow */}
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
            Multi-Faith Pilgrimage
          </p>

          {/* Hero Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
            Sacred <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-100 bg-clip-text text-transparent">India</span>
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-xl md:text-2xl text-gray-300 italic mb-8 max-w-2xl mx-auto">
            Every Faith. Every Site. Every Step.
          </p>

          {/* WhatsApp Tag */}
          <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/40 rounded-full px-4 py-2 mb-8">
            <span className="text-xl">💬</span>
            <span className="text-sm font-semibold text-green-400">Remote Puja Video on WhatsApp</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/sites"
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Explore 85+ Sites
            </Link>
            <Link
              href="/sites"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center text-center">
            <div>
              <p className="font-serif text-4xl font-bold text-yellow-300 mb-1">85+</p>
              <p className="text-sm text-gray-400">Sacred Sites</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-bold text-yellow-300 mb-1">7</p>
              <p className="text-sm text-gray-400">Major Faiths</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-bold text-yellow-300 mb-1">500M+</p>
              <p className="text-sm text-gray-400">Potential Pilgrims</p>
            </div>
          </div>
        </div>
      </section>

      {/* Religion Filter */}
      <section className="bg-gray-50 px-4 py-8 sticky top-0 z-40 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-semibold text-gray-600 mb-4 uppercase">Filter by Religion</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedReligion('')}
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                selectedReligion === ''
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              All Sites
            </button>
            {religionList.map(([key, rel]) => (
              <button
                key={key}
                onClick={() => setSelectedReligion(key)}
                className={`px-4 py-2 rounded-full font-semibold transition-all text-sm flex items-center gap-2 ${
                  selectedReligion === key
                    ? 'text-white'
                    : 'bg-white border text-gray-700 hover:border-gray-400'
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

      {/* Sites Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="font-serif text-4xl font-bold mb-2">
            {selectedReligion ? religions[selectedReligion as keyof typeof religions]?.label : 'All'} Sacred Sites
          </h2>
          <p className="text-gray-600">
            {filteredSites.length} {selectedReligion ? `${religions[selectedReligion as keyof typeof religions]?.label} ` : ''}pilgrimage {filteredSites.length === 1 ? 'destination' : 'destinations'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.slice(0, 9).map(site => (
            <SiteCard
              key={site.id}
              site={site}
              religion={religions[site.religion as keyof typeof religions]}
            />
          ))}
        </div>

        {filteredSites.length > 9 && (
          <div className="text-center mt-12">
            <Link
              href="/sites"
              className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
            >
              View All {filteredSites.length} Sites →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
