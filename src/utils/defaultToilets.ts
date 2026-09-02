import { Toilet } from '@/hooks/useSites';

const cleanlinessLevels: ('Excellent' | 'Good' | 'Fair' | 'Poor')[] = [
  'Excellent',
  'Good',
  'Fair',
  'Good',
];

const toiletNames = [
  'Main Temple Facilities',
  'Public Restroom (West)',
  'Pilgrim Center Toilets',
  'Community Block',
  'Near Parking',
];

const costs = ['Free', '₹5', '₹5', 'Free', '₹3'];
const amenities = [
  ['Soap', 'Mirrors', 'Water facility'],
  ['Soap', 'Hand dryer'],
  ['Water facility', 'Clean towels'],
  ['Soap', 'Mirrors', 'Water facility', 'Sanitary pads dispenser'],
  ['Soap'],
];

export const getDefaultToilets = (
  siteName: string,
  siteCoords: { lat: number; lng: number }
): Toilet[] => {
  return toiletNames.map((name, idx) => ({
    id: `toilet-${idx}`,
    name,
    distance: `${(0.1 + idx * 0.15).toFixed(1)} km`,
    rating: 3.5 + Math.random() * 1.4,
    reviews: Math.floor(Math.random() * 50) + 10,
    cleanliness: cleanlinessLevels[idx],
    cost: costs[idx],
    hours: '6:00 AM - 10:00 PM',
    amenities: amenities[idx] || ['Basic facilities'],
    accessible: idx % 2 === 0,
    lat: siteCoords.lat + (Math.random() - 0.5) * 0.01,
    lng: siteCoords.lng + (Math.random() - 0.5) * 0.01,
  }));
};
