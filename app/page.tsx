'use client';

import { useEffect, useState } from 'react';
import PanchagWidget from './components/PanchagWidget';
import NamazWidget from './components/NamazWidget';
import SiteCard from './components/SiteCard';

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestSite, setNearestSite] = useState<any>(null);

  useEffect(() => {
    // Get GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        // Mock nearest site (in real app, query Supabase)
        setNearestSite({
          name: 'Kashi Vishwanath',
          faith: 'hindu',
          emoji: '🛕',
          distance: 2.3,
          crowdLevel: 'medium'
        });
      }, (error) => {
        console.log('GPS error:', error);
        // Fallback to default location
        setNearestSite({
          name: 'Kashi Vishwanath',
          faith: 'hindu',
          emoji: '🛕',
          distance: 2.3,
          crowdLevel: 'medium'
        });
      });
    }
  }, []);

  return (
    <div className="px-4 py-6 max-w-3xl">
      {/* Nearest Site Card */}
      {nearestSite && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">📍 Nearest Sacred Site</h2>
          <SiteCard {...nearestSite} />
        </div>
      )}

      {/* Panchang Widget */}
      <PanchagWidget />

      {/* Namaz Widget */}
      <NamazWidget />

      {/* Lamp Dedication */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-4 rounded-lg mb-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">🪔 Light a Lamp</h3>
        <p className="text-sm text-gray-600 mb-3">Dedicate a lamp to someone special</p>
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
          Light a Diya
        </button>
      </div>

      {/* WhatsApp Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h3 className="font-bold text-gray-800 mb-3">💬 Quick WhatsApp Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
            📅 Share Panchang
          </button>
          <button className="bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
            📋 Share Trip Plan
          </button>
          <button className="bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
            🙏 Book a Puja
          </button>
          <button className="bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
            ➕ Request Site
          </button>
        </div>
      </div>

      {/* Location Display */}
      {location && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-gray-600">
          📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}
