'use client';

import { Panchang, getTodaysPanchang } from '@/lib/services/panchang';
import { useEffect, useState } from 'react';

export default function PanchagWidget() {
  const [panchang, setPanchang] = useState<Panchang | null>(null);

  useEffect(() => {
    setPanchang(getTodaysPanchang());
  }, []);

  if (!panchang) return <div className="animate-pulse h-24 bg-gray-200 rounded-lg" />;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">🌙 Panchang Today</h3>
          <p className="text-sm text-gray-600">{panchang.dayOfWeek}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${panchang.isAuspicious ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {panchang.isAuspicious ? '✅ Auspicious' : '⏸️ Not Auspicious'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-white p-2 rounded">
          <p className="text-gray-600 text-xs">Tithi</p>
          <p className="font-semibold">{panchang.tithi}</p>
        </div>
        <div className="bg-white p-2 rounded">
          <p className="text-gray-600 text-xs">Nakshatra</p>
          <p className="font-semibold">{panchang.nakshatra}</p>
        </div>
      </div>

      {panchang.auspiciousTimeRange && (
        <div className="mt-2 bg-green-50 p-2 rounded text-sm">
          <p className="text-green-700">🕉️ Auspicious: {panchang.auspiciousTimeRange.start} - {panchang.auspiciousTimeRange.end}</p>
        </div>
      )}
    </div>
  );
}
