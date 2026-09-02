'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useSites } from '@/hooks/useSites';
import PathSelector from '@/components/PathSelector';

interface SiteDetailProps {
  params: {
    id: string;
  };
}

export default function SiteDetail({ params }: SiteDetailProps) {
  const { sites, religions, loading, getSiteById } = useSites();
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  const site = useMemo(() => getSiteById(params.id), [params.id, sites, getSiteById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Site not found</h1>
          <p className="text-gray-600 mb-6">The site you're looking for doesn't exist.</p>
          <Link
            href="/sites"
            className="inline-block px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition"
          >
            Back to Sites
          </Link>
        </div>
      </div>
    );
  }

  const religion = religions[site.religion as keyof typeof religions];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with color */}
      <div
        className="px-4 py-12 text-white"
        style={{ backgroundColor: religion.color }}
      >
        <div className="max-w-6xl mx-auto">
          <Link href="/sites" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition">
            ← Back to Sites
          </Link>
          <div className="flex items-start gap-4 mb-4">
            <span className="text-6xl">{site.emoji}</span>
            <div>
              <h1 className="font-serif text-5xl font-bold mb-2">{site.name}</h1>
              <p className="text-xl opacity-90 italic">{site.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="px-4 py-2 rounded-full text-sm font-bold bg-white/20">{site.badge}</span>
            <span className="text-sm opacity-75">📍 {site.state}</span>
            <span className="text-sm opacity-75">🌐 {site.local}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Description & Story */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-gray-700 mb-4">{site.desc}</p>
            </section>

            {/* Story */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-4">The Sacred Story</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{site.story}</p>

              {/* Scripture */}
              <div
                className="p-6 rounded-lg border-l-4 bg-opacity-10"
                style={{
                  backgroundColor: religion.bg,
                  borderColor: religion.color,
                }}
              >
                <p
                  className="italic text-lg mb-3 font-serif"
                  style={{ color: religion.color }}
                >
                  "{site.scripture.orig}"
                </p>
                <p className="text-gray-700 mb-2">{site.scripture.eng}</p>
                <p className="text-sm text-gray-500">— {site.scripture.src}</p>
              </div>
            </section>

            {/* Routes & Paths */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6">🧭 Choose Your Route</h2>
              <PathSelector paths={site.paths} />
            </section>

            {/* Key Spots */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6">Key Spots to Visit</h2>
              <div className="space-y-4">
                {site.spots.map((spot, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg border border-gray-200 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{spot.name}</h3>
                        <p className="text-sm text-gray-600">{spot.local}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-700 whitespace-nowrap">
                        {spot.dist}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
                      <span>🕐 {spot.hours}</span>
                      <span>{spot.open ? '🟢 Open' : '🔴 Closed'}</span>
                    </div>
                    <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded italic border-l-2 border-blue-400">
                      <strong>Ritual:</strong> {spot.ritual}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Bookings */}
          <div>
            <div className="sticky top-24">
              <h2 className="font-serif text-2xl font-bold mb-6">Available Services</h2>

              {site.bookings.length > 0 ? (
                <div className="space-y-4">
                  {site.bookings.map((booking, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedBooking === idx
                          ? `border-2 bg-opacity-100`
                          : `border-gray-200 hover:border-gray-300`
                      }`}
                      style={
                        selectedBooking === idx
                          ? {
                              backgroundColor: religion.light,
                              borderColor: religion.color,
                            }
                          : {}
                      }
                      onClick={() =>
                        setSelectedBooking(selectedBooking === idx ? null : idx)
                      }
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3
                            className="font-bold"
                            style={
                              selectedBooking === idx
                                ? { color: religion.color }
                                : {}
                            }
                          >
                            {booking.name}
                          </h3>
                          <p className="text-xs text-gray-600">{booking.local}</p>
                        </div>
                        {booking.price > 0 && (
                          <span className="text-lg font-bold text-green-600 whitespace-nowrap">
                            ₹{booking.price}
                          </span>
                        )}
                        {booking.price === 0 && (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700 whitespace-nowrap">
                            FREE
                          </span>
                        )}
                      </div>

                      {selectedBooking === idx && (
                        <div className="pt-4 border-t space-y-3 text-sm">
                          <div>
                            <p className="font-semibold text-gray-700 mb-1">
                              Description
                            </p>
                            <p className="text-gray-600">{booking.desc}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">
                                🕐 Slots
                              </p>
                              <p className="text-gray-600">{booking.slot}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">
                                ⏱️ Duration
                              </p>
                              <p className="text-gray-600">{booking.duration}</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700 mb-1">
                              📅 Advance Booking
                            </p>
                            <p className="text-gray-600">{booking.advance}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700 mb-1">
                              👕 Dress Code
                            </p>
                            <p className="text-gray-600">{booking.dress}</p>
                          </div>
                          <button
                            className="w-full mt-4 px-4 py-2 rounded-lg font-bold text-white transition-colors"
                            style={{ backgroundColor: religion.color }}
                          >
                            Book Now
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">
                  No bookings available for this site yet.
                </p>
              )}

              {/* Info Box */}
              <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>💬 Quick Fact:</strong> Need a remote puja? Ask us to arrange a video
                  delivery on WhatsApp!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
