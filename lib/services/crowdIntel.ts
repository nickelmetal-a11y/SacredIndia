// Crowd Intelligence Service
// Predicts best/worst days to visit based on patterns

export interface CrowdIntelligence {
  crowdLevel: 'low' | 'medium' | 'high' | 'very_high';
  recommendation: string;
  bestDays: string[]; // ['Monday', 'Tuesday', 'Wednesday']
  worstDays: string[]; // ['Friday', 'Saturday', 'Sunday']
  festivals: { name: string; date: string; crowdLevel: 'very_high' | 'high' }[];
  avgWaitTime: number; // in minutes
}

// Day-of-week patterns (simplified)
// Real implementation would use historical data
const DAY_PATTERNS: Record<string, 'low' | 'medium' | 'high'> = {
  'Monday': 'low',
  'Tuesday': 'low',
  'Wednesday': 'medium',
  'Thursday': 'medium',
  'Friday': 'high',
  'Saturday': 'very_high',
  'Sunday': 'very_high'
};

// Major Indian festivals (2024-2025)
const MAJOR_FESTIVALS = [
  { name: 'Holi', date: '2024-03-25', faith: 'hindu', crowdLevel: 'very_high' as const },
  { name: 'Maha Shivaratri', date: '2024-03-25', faith: 'hindu', crowdLevel: 'very_high' as const },
  { name: 'Navratri', date: '2024-10-03', faith: 'hindu', crowdLevel: 'very_high' as const },
  { name: 'Diwali', date: '2024-11-01', faith: 'hindu', crowdLevel: 'high' as const },
  { name: 'Eid ul-Adha', date: '2024-06-16', faith: 'islam', crowdLevel: 'very_high' as const },
  { name: 'Eid ul-Fitr', date: '2024-04-10', faith: 'islam', crowdLevel: 'very_high' as const },
  { name: 'Christmas', date: '2024-12-25', faith: 'christian', crowdLevel: 'high' as const },
  { name: 'Easter', date: '2024-03-31', faith: 'christian', crowdLevel: 'high' as const },
  { name: 'Vesak', date: '2024-05-23', faith: 'buddhist', crowdLevel: 'high' as const },
  { name: 'Guru Nanak Jayanti', date: '2024-11-15', faith: 'sikh', crowdLevel: 'high' as const },
  { name: 'Mahavir Jayanti', date: '2024-04-21', faith: 'jain', crowdLevel: 'high' as const }
];

/**
 * Get crowd intelligence for a site on a specific date
 */
export function getCrowdIntelligence(
  siteId: string,
  date: Date,
  siteFaith: string
): CrowdIntelligence {
  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = date.toISOString().split('T')[0];

  // Check if this date is a festival
  const festival = MAJOR_FESTIVALS.find(f => f.date === dateStr);
  const isFestival = festival && (festival.faith === siteFaith || siteFaith === 'multi');

  let crowdLevel: 'low' | 'medium' | 'high' | 'very_high' = 'medium';
  let avgWaitTime = 30;

  if (isFestival) {
    crowdLevel = festival.crowdLevel;
    avgWaitTime = 120;
  } else {
    const dayPattern = DAY_PATTERNS[dayName] as 'low' | 'medium' | 'high' | 'very_high' | undefined;
    crowdLevel = dayPattern || 'medium';

    if (crowdLevel === 'low') avgWaitTime = 10;
    else if (crowdLevel === 'medium') avgWaitTime = 30;
    else if (crowdLevel === 'high') avgWaitTime = 60;
    else avgWaitTime = 120;
  }

  // Best days are Monday-Thursday
  const bestDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  // Worst days are Friday-Sunday
  const worstDays = ['Friday', 'Saturday', 'Sunday'];

  // Get nearby festivals
  const upcomingFestivals = MAJOR_FESTIVALS.filter(f => {
    const fDate = new Date(f.date);
    const daysAway = Math.floor((fDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return daysAway >= 0 && daysAway <= 30 && (f.faith === siteFaith || siteFaith === 'multi');
  });

  let recommendation = '';
  if (crowdLevel === 'low') {
    recommendation = '✅ Best time to visit! Minimal crowds.';
  } else if (crowdLevel === 'medium') {
    recommendation = '👍 Good time to visit. Moderate crowds.';
  } else if (crowdLevel === 'high') {
    recommendation = '⚠️ Busy day. Expect long queues.';
  } else {
    recommendation = '❌ Festival day - Very crowded. Consider rescheduling.';
  }

  return {
    crowdLevel,
    recommendation,
    bestDays,
    worstDays,
    festivals: upcomingFestivals.map(f => ({
      name: f.name,
      date: f.date,
      crowdLevel: f.crowdLevel
    })),
    avgWaitTime
  };
}

/**
 * Get best visiting dates for next 30 days
 */
export function getBestVisitingDates(siteId: string, siteFaith: string, count = 5): Array<{ date: Date; crowdLevel: string }> {
  const results: Array<{ date: Date; crowdLevel: string }> = [];
  let date = new Date();

  for (let i = 0; i < 30 && results.length < count; i++) {
    const intel = getCrowdIntelligence(siteId, date, siteFaith);
    if (intel.crowdLevel === 'low' || intel.crowdLevel === 'medium') {
      results.push({ date: new Date(date), crowdLevel: intel.crowdLevel });
    }
    date.setDate(date.getDate() + 1);
  }

  return results;
}

/**
 * Format crowd intel for display
 */
export function formatCrowdIntel(intel: CrowdIntelligence): string {
  return `
${intel.recommendation}

📊 Crowd Level: ${intel.crowdLevel.toUpperCase()}
⏱️ Avg Wait: ${intel.avgWaitTime} minutes

📅 Best Days: ${intel.bestDays.join(', ')}
📅 Avoid: ${intel.worstDays.join(', ')}

${intel.festivals.length > 0 ? `🎉 Upcoming Festivals:\n${intel.festivals.map(f => `  • ${f.name} (${f.date})`).join('\n')}` : ''}
`;
}
