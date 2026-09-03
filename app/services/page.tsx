'use client';

const PUJA_SERVICES = [
  {
    temple: 'Kashi Vishwanath',
    emoji: '🛕',
    location: 'Varanasi, UP',
    sevas: [
      { name: 'Rudrabhishek', price: 2100, includes: 'Video + 80G receipt' },
      { name: 'Bhasma Aarti', price: 1100, includes: 'Video + Receipt' },
      { name: 'Satyanaryan Katha', price: 5100, includes: 'Video + 2 hours' }
    ]
  },
  {
    temple: 'Tirupati Temple',
    emoji: '⚡',
    location: 'Tirupati, AP',
    sevas: [
      { name: 'TTD Abhishekam', price: 3000, includes: 'Photos + Prasad' },
      { name: 'Kalyanostavam', price: 7500, includes: 'Photos + Receipt' }
    ]
  },
  {
    temple: 'Ajmer Dargah',
    emoji: '🌹',
    location: 'Ajmer, Rajasthan',
    sevas: [
      { name: 'Chadar Offering', price: 1500, includes: 'Photos + Dua' },
      { name: 'Chadar + Qawwali', price: 3000, includes: 'Photos + Video' }
    ]
  },
  {
    temple: 'Golden Temple',
    emoji: '🪯',
    location: 'Amritsar, Punjab',
    sevas: [
      { name: 'Ardas Ceremony', price: 1100, includes: 'Photo + Receipt' },
      { name: 'Langar Seva', price: 2100, includes: 'Feeds 50 people' }
    ]
  }
];

export default function ServicesScreen() {
  return (
    <div className="px-4 py-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">🛍️ Services</h1>
      <p className="text-gray-600 mb-6">Book remote puja, prasad, and verified guides</p>

      {/* Remote Puja Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">🙏 Remote Puja Services</h2>

        <div className="space-y-4">
          {PUJA_SERVICES.map((temple, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Temple Header */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl">{temple.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{temple.temple}</h3>
                    <p className="text-xs text-gray-600">{temple.location}</p>
                  </div>
                </div>
              </div>

              {/* Sevas List */}
              <div className="p-4 space-y-3">
                {temple.sevas.map((seva, sevaIdx) => (
                  <div key={sevaIdx} className="flex justify-between items-start pb-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-semibold text-gray-800">{seva.name}</p>
                      <p className="text-xs text-gray-600 mt-1">✓ {seva.includes}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-orange-600">₹{seva.price}</p>
                      <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700">
                        Book via WA
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Guides Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">🧑‍⚖️ Verified Guides & Pandits</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-700 text-sm">
            Browse pandits, khadims, and pilgrim guides with verified badges and fixed rates.
          </p>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
            View All Guides →
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-700">
          ✓ <strong>2-hour delivery guarantee:</strong> Video delivered on WhatsApp within 2 hours
          ✓ <strong>80G receipt:</strong> Tax-deductible donation certificate included
          ✓ <strong>Verified pandits:</strong> All priests verified and trusted
        </p>
      </div>
    </div>
  );
}
