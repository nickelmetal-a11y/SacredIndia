'use client';

interface SiteCardProps {
  name: string;
  faith: string;
  emoji?: string;
  distance?: number;
  crowdLevel?: string;
}

export default function SiteCard({ name, faith, emoji = '🛕', distance, crowdLevel = 'medium' }: SiteCardProps) {
  const crowdColor = {
    'low': 'bg-green-100 text-green-700',
    'medium': 'bg-yellow-100 text-yellow-700',
    'high': 'bg-orange-100 text-orange-700',
    'very_high': 'bg-red-100 text-red-700'
  }[crowdLevel] || 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{emoji}</span>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
          </div>
          <p className="text-xs text-gray-600 uppercase">{faith}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {distance && <p className="text-sm text-gray-600">📍 {distance.toFixed(1)} km</p>}
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${crowdColor}`}>
          {crowdLevel === 'low' ? '✅ Low' : crowdLevel === 'medium' ? '⏳ Medium' : crowdLevel === 'high' ? '⚠️ High' : '🔴 Very High'}
        </span>
      </div>

      <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        Book Now
      </button>
    </div>
  );
}
