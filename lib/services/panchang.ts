// Panchang & Tithi Calculations for Hindu/Buddhist Calendar
// Simplified version - can be enhanced with full Panchang calculations

export interface Panchang {
  tithi: string; // Lunar day name
  nakshatra: string; // Lunar mansion
  yoga: string; // Auspicious yoga
  karana: string; // Half lunar day
  dayOfWeek: string;
  isAuspicious: boolean;
  auspiciousTimeRange?: {
    start: string; // HH:MM
    end: string;
  };
  nextAuspiciousTime?: string;
}

// Simplified tithi list (15 tithis per lunar month)
const TITHIS = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'
];

// 27 Nakshatras (lunar mansions)
const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni',
  'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha',
  'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashada', 'Uttara Ashada',
  'Abhijit', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

/**
 * Get Panchang for today
 * Note: This is simplified. For production, use a real Panchang library
 * or integrate with an external Panchang API
 */
export function getTodaysPanchang(): Panchang {
  const today = new Date();

  // Simplified calculation - cycle through tithis and nakshatras
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);

  const tithi = TITHIS[dayOfYear % TITHIS.length];
  const nakshatra = NAKSHATRAS[dayOfYear % NAKSHATRAS.length];

  // Simplified auspicious times
  // In a real app, this would be calculated based on astronomical positions
  const isAuspicious = dayOfYear % 7 !== 5; // Avoid Saturdays for some activities

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[today.getDay()];

  let auspiciousTimeRange = undefined;
  let nextAuspiciousTime = undefined;

  if (isAuspicious) {
    auspiciousTimeRange = {
      start: '06:00',
      end: '12:00'
    };
  } else {
    nextAuspiciousTime = 'Tomorrow 06:00 AM';
  }

  return {
    tithi,
    nakshatra,
    yoga: 'Shubha Yoga', // Auspicious yoga
    karana: 'Bava',
    dayOfWeek,
    isAuspicious,
    auspiciousTimeRange,
    nextAuspiciousTime
  };
}

/**
 * Get Panchang for a specific date
 */
export function getPanchang(date: Date): Panchang {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);

  const tithi = TITHIS[dayOfYear % TITHIS.length];
  const nakshatra = NAKSHATRAS[dayOfYear % NAKSHATRAS.length];
  const isAuspicious = dayOfYear % 7 !== 5;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[date.getDay()];

  return {
    tithi,
    nakshatra,
    yoga: 'Shubha Yoga',
    karana: 'Bava',
    dayOfWeek,
    isAuspicious,
    auspiciousTimeRange: isAuspicious ? { start: '06:00', end: '12:00' } : undefined,
    nextAuspiciousTime: !isAuspicious ? 'Tomorrow 06:00 AM' : undefined
  };
}

/**
 * Check if date is auspicious for a specific activity
 */
export function isAuspiciousFor(activity: 'marriage' | 'housewarming' | 'business' | 'travel' | 'worship', date: Date): boolean {
  const panchang = getPanchang(date);

  // Simplified rules - in production, use proper Panchang algorithms
  const rules: Record<string, boolean> = {
    marriage: panchang.isAuspicious && panchang.dayOfWeek !== 'Saturday',
    housewarming: panchang.isAuspicious,
    business: panchang.isAuspicious && panchang.dayOfWeek !== 'Tuesday',
    travel: panchang.isAuspicious && panchang.dayOfWeek !== 'Friday',
    worship: panchang.isAuspicious
  };

  return rules[activity] || false;
}

export function getNextAuspiciousDate(activity: 'marriage' | 'housewarming' | 'business' | 'travel' | 'worship', startDate: Date = new Date()): Date {
  let date = new Date(startDate);

  for (let i = 0; i < 30; i++) {
    if (isAuspiciousFor(activity, date)) {
      return date;
    }
    date.setDate(date.getDate() + 1);
  }

  return date;
}
