'use client';

import { getPrayerTimes, getNextPrayer } from '@/lib/services/namaz';
import { useState, useEffect } from 'react';

export default function NamazWidget() {
  const [city] = useState('Delhi');
  const [times, setTimes] = useState<any>(null);
  const [nextPrayer, setNextPrayer] = useState<any>(null);

  useEffect(() => {
    setTimes(getPrayerTimes(city));
    setNextPrayer(getNextPrayer(city));
  }, []);

  if (!times) return null;

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">📿 Prayer Times ({city})</h3>
          {nextPrayer && <p className="text-sm text-green-700">Next: {nextPrayer.name} at {nextPrayer.time}</p>}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 text-xs">
        {[
          { name: 'Fajr', time: times.fajr },
          { name: 'Zuhr', time: times.zuhr },
          { name: 'Asr', time: times.asr },
          { name: 'Maghrib', time: times.maghrib },
          { name: 'Isha', time: times.isha }
        ].map((p) => (
          <div key={p.name} className="bg-white p-2 rounded text-center">
            <p className="font-semibold text-gray-600">{p.name}</p>
            <p className="font-bold">{p.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
