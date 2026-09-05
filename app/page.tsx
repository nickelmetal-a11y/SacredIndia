'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-light text-gray-900 mb-1" style={{fontFamily: 'Georgia, serif'}}>
            Sacred India
          </h1>
          <p className="text-sm text-gray-500">Discover pilgrimage sites across 7 faiths</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* Nearest Sacred Site */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Nearest Sacred Site</h2>
          <div className="mb-4">
            <h3 className="text-2xl font-light text-gray-900 mb-1">Kashi Vishwanath</h3>
            <p className="text-sm text-gray-600">Varanasi, Uttar Pradesh</p>
          </div>
          <div className="flex justify-between items-start mb-4 text-sm">
            <span className="text-gray-600">2.3 km away</span>
            <span className="text-gray-600">Medium crowd</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Ancient temple of Lord Shiva on the banks of the Ganges. Sacred for 800+ years of continuous worship.
          </p>
        </div>

        {/* Panchang */}
        <div className="border-l-4 border-orange-600 pl-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Panchang</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">Tithi</p>
              <p className="text-base text-gray-900">Pratipada</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Auspicious Time</p>
              <p className="text-base text-gray-900">6:00 AM - 12:00 PM</p>
            </div>
            <p className="text-xs text-green-600 font-medium">Auspicious today</p>
          </div>
        </div>

        {/* Prayer Times */}
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Prayer Times (Delhi)</h2>
          <div className="grid grid-cols-5 gap-4 text-center text-sm">
            {[
              { name: 'Fajr', time: '4:30' },
              { name: 'Zuhr', time: '12:30' },
              { name: 'Asr', time: '4:30' },
              { name: 'Maghrib', time: '7:45' },
              { name: 'Isha', time: '9:15' }
            ].map((p, i) => (
              <div key={i}>
                <p className="text-xs text-gray-500 mb-1">{p.name}</p>
                <p className="font-medium text-gray-900">{p.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-2xl font-light text-gray-900">85+</p>
              <p className="text-xs text-gray-500 mt-1">Sacred Sites</p>
            </div>
            <div>
              <p className="text-2xl font-light text-gray-900">7</p>
              <p className="text-xs text-gray-500 mt-1">Faiths</p>
            </div>
            <div>
              <p className="text-2xl font-light text-gray-900">4.9</p>
              <p className="text-xs text-gray-500 mt-1">Rating</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
