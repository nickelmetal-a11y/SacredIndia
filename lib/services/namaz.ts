// Namaz/Salah Prayer Times for 7 Indian Cities
// Calculated for standard Islamic calendar

export interface PrayerTimes {
  fajr: string; // Dawn prayer (HH:MM)
  zuhr: string; // Noon prayer
  asr: string; // Afternoon prayer
  maghrib: string; // Sunset prayer
  isha: string; // Night prayer
  jummah?: string; // Friday prayer (noon time, typically)
}

// Prayer times for major Indian cities (summer approximation)
// In production, integrate with Aladhan API or similar
const PRAYER_TIMES_DB: Record<string, PrayerTimes> = {
  'Delhi': {
    fajr: '04:30',
    zuhr: '12:30',
    asr: '16:30',
    maghrib: '19:45',
    isha: '21:15',
    jummah: '12:30'
  },
  'Lucknow': {
    fajr: '04:35',
    zuhr: '12:35',
    asr: '16:35',
    maghrib: '19:50',
    isha: '21:20',
    jummah: '12:35'
  },
  'Agra': {
    fajr: '04:40',
    zuhr: '12:40',
    asr: '16:40',
    maghrib: '19:55',
    isha: '21:25',
    jummah: '12:40'
  },
  'Hyderabad': {
    fajr: '05:00',
    zuhr: '12:45',
    asr: '16:45',
    maghrib: '19:45',
    isha: '21:15',
    jummah: '12:45'
  },
  'Bangalore': {
    fajr: '05:15',
    zuhr: '12:45',
    asr: '16:45',
    maghrib: '19:15',
    isha: '20:45',
    jummah: '12:45'
  },
  'Mumbai': {
    fajr: '05:10',
    zuhr: '12:30',
    asr: '16:30',
    maghrib: '19:00',
    isha: '20:30',
    jummah: '12:30'
  },
  'Kolkata': {
    fajr: '04:15',
    zuhr: '12:15',
    asr: '16:30',
    maghrib: '19:45',
    isha: '21:15',
    jummah: '12:15'
  }
};

/**
 * Get prayer times for a city
 */
export function getPrayerTimes(city: string): PrayerTimes | null {
  return PRAYER_TIMES_DB[city] || null;
}

/**
 * Get prayer times for all 7 cities
 */
export function getAllPrayerTimes(): Record<string, PrayerTimes> {
  return PRAYER_TIMES_DB;
}

/**
 * Get next prayer name and time
 */
export function getNextPrayer(city: string): { name: string; time: string } | null {
  const times = getPrayerTimes(city);
  if (!times) return null;

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const prayers = [
    { name: 'Fajr', time: times.fajr },
    { name: 'Zuhr', time: times.zuhr },
    { name: 'Asr', time: times.asr },
    { name: 'Maghrib', time: times.maghrib },
    { name: 'Isha', time: times.isha }
  ];

  for (const prayer of prayers) {
    if (prayer.time > currentTime) {
      return prayer;
    }
  }

  // If no prayer found today, return Fajr tomorrow
  return { name: 'Fajr (Tomorrow)', time: prayers[0].time };
}

/**
 * Format prayer times for display
 */
export function formatPrayerTimes(city: string): string {
  const times = getPrayerTimes(city);
  if (!times) return '';

  return `📿 Prayer Times in ${city}
Fajr: ${times.fajr}
Zuhr: ${times.zuhr}
Asr: ${times.asr}
Maghrib: ${times.maghrib}
Isha: ${times.isha}`;
}
