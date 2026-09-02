# ✅ PHASE 1 Developer Checklist

## 🎯 What You're Building

**Discovery App** — Users can:
- 📍 Find nearby sacred sites (GPS)
- 👴 Choose elderly-friendly paths
- 🧗 Choose adventure routes
- 🚻 Find clean toilets
- 🌐 Use in English or हिंदी

---

## 📦 Week 1: GPS Discovery

### Install Dependencies
```bash
npm install @react-google-maps/api haversine
```

### Create Files
- `src/hooks/useGeolocation.ts` — Get user GPS
- `src/utils/distance.ts` — Calculate distance
- `src/components/InteractiveMap.tsx` — Show map
- `src/components/NearbySites.tsx` — List nearby sites

### Update Home Page
- Add map section
- Add "Sites Near You" list
- Show distance + walking time
- Add "View Details" buttons

### Test
```bash
npm run dev
# Visit http://localhost:3000
# Allow GPS permission
# Should see nearby sites
```

**Status**: ⏳ Not started

---

## 📍 Week 2: Accessibility Paths

### Update sites.json
Add `paths` object to each site:
```json
{
  "paths": {
    "elderly": { "distance": 0.5, "elevation": 0, ... },
    "youth": { "distance": 2.2, "elevation": 150, ... }
  }
}
```

### Create Files
- `src/components/PathSelector.tsx` — Choose elderly/youth
- `src/components/PathDetails.tsx` — Show route info

### Update Site Detail Page
- Remove booking section (move to Phase 2)
- Add path selector at top
- Show 2 route options side-by-side
- Display path stats (distance, time, difficulty)

### Test
```bash
# Visit any site detail page
# Should see 2 path options
# Click to expand path details
```

**Status**: ⏳ Not started

---

## 🚻 Week 2-3: Toilet Finder

### Update sites.json
Add `nearbyToilets` array to each site:
```json
{
  "nearbyToilets": [
    { "name": "Community Toilet", "distance": 0.15, "rating": 4.8, ... }
  ]
}
```

### Create Files
- `src/components/ToiletFinder.tsx` — List nearby toilets
- `src/components/ToiletCard.tsx` — Individual toilet card

### Update Site Detail Page
- Add "Amenities" section
- Show 3 nearest toilets
- Display: name, distance, rating, cost, accessibility
- Add "Get Directions" button

### Test
```bash
# Visit site detail page
# Scroll to "Amenities Nearby"
# Should see 3 toilets with ratings
```

**Status**: ⏳ Not started

---

## 🌐 Week 3-4: Multi-Language

### Install i18n
```bash
npm install next-i18next i18next
```

### Create Files
- `src/locales/en.json` — English translations
- `src/locales/hi.json` — Hindi translations
- `src/i18n.config.ts` — i18n setup
- `src/hooks/useTranslation.ts` — Translation hook

### Translate Everything
- [ ] All site names & descriptions
- [ ] Path names & descriptions
- [ ] Toilet information
- [ ] All UI text (buttons, labels, headers)
- [ ] Amenities & features

### Update Layout
- Add language toggle in header
- EN / हिंदी buttons
- Save preference to localStorage

### Test
```bash
# Visit home page
# Click language toggle (top right)
# Should switch between English & Hindi
```

**Status**: ⏳ Not started

---

## 📊 Data Updates Needed

### For Each of 85 Sites

#### Add Paths
```json
"paths": {
  "elderly": {
    "distance": 0.5,        // km
    "time": 12,             // minutes
    "elevation": 0,         // meters
    "difficulty": "Easy",
    "wheelchairAccessible": true,
    "restPoints": 3,
    "terrain": "Flat"
  },
  "youth": {
    "distance": 2.2,
    "time": 45,
    "elevation": 150,
    "difficulty": "Moderate",
    "scenicSpots": 5,
    "terrain": "Trail"
  }
}
```

#### Add Toilets
```json
"nearbyToilets": [
  {
    "name": "Community Toilet",
    "distance": 0.15,
    "rating": 4.8,
    "type": "Public",
    "cost": "Free",
    "accessible": true
  }
]
```

---

## 🧪 Testing Each Feature

### GPS Discovery
- [ ] Permission prompt appears
- [ ] Correctly calculates distance
- [ ] Sorts by nearest first
- [ ] Walking time reasonable
- [ ] Map shows all markers
- [ ] Tap site opens detail page

### Paths
- [ ] Both options display
- [ ] Elderly path is shorter
- [ ] Youth path has elevation
- [ ] Difficulty badges visible
- [ ] Stats are correct
- [ ] Icons load properly

### Toilets
- [ ] Shows 3 nearest
- [ ] Ratings 1-5 stars
- [ ] Cost indicator clear
- [ ] Accessibility icon shows
- [ ] Distance accurate
- [ ] "Get Directions" works

### Languages
- [ ] Toggle switches language
- [ ] All text translates
- [ ] Preference persists
- [ ] Both render correctly
- [ ] No text overflow
- [ ] Numbers format correctly

---

## 🚀 Before Deploying

- [ ] `npm run build` succeeds
- [ ] No console errors
- [ ] All 85 sites have paths
- [ ] All 85 sites have toilets
- [ ] 100% of text translated
- [ ] GPS tested on real device
- [ ] Mobile layout looks good
- [ ] All buttons clickable
- [ ] Images load
- [ ] Links work

---

## 📝 File Checklist

### New Components (6 total)
- [ ] `NearbySites.tsx`
- [ ] `InteractiveMap.tsx`
- [ ] `PathSelector.tsx`
- [ ] `PathDetails.tsx`
- [ ] `ToiletFinder.tsx`
- [ ] `ToiletCard.tsx`

### New Hooks (3 total)
- [ ] `useGeolocation.ts`
- [ ] `useTranslation.ts`
- [ ] Update `useSites.ts`

### New Utils (2 total)
- [ ] `distance.ts`
- [ ] `pathFinder.ts`

### i18n Setup (3 total)
- [ ] `locales/en.json`
- [ ] `locales/hi.json`
- [ ] `i18n.config.ts`

### Updated Pages (2 total)
- [ ] `app/page.tsx` (home)
- [ ] `app/sites/[id]/page.tsx` (detail)

---

## 🎯 Success = Done When

✅ **Week 1 Success**
- Map shows on home page
- Nearby sites list works
- Distance calculated correctly

✅ **Week 2 Success**
- Both paths display on site detail
- Elderly path shows flat terrain
- Youth path shows elevation

✅ **Week 2-3 Success**
- Toilet finder shows 3 toilets
- Ratings display correctly
- Accessibility badges visible

✅ **Week 3-4 Success**
- App works in English
- App works in हिंदी
- Language toggle persists

✅ **Phase 1 Complete**
- All 4 features working
- No errors in console
- Mobile responsive
- Ready to deploy to Vercel

---

## 📞 Quick Reference

**Google Maps API**
- Get key: https://developers.google.com/maps
- Cost: ~$7 per 1000 map loads (free tier available)

**Translation Files Format**
```json
{
  "home": {
    "title": "Nearby Sites",
    "description": "Find sacred sites near you"
  }
}
```

**i18n Hook Usage**
```tsx
import { useTranslation } from 'next-i18next';

export default function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('home.title')}</h1>;
}
```

**Distance Calculation**
```ts
import haversine from 'haversine';

const distance = haversine(
  { lat: userLat, lng: userLng },
  { lat: siteLat, lng: siteLng },
  { unit: 'km' }
);
```

---

## 🎊 End of Phase 1

When all ✅ are checked:
- Push to GitHub
- Deploy to Vercel
- Share live URL
- Get user feedback
- Plan Phase 2 (Booking)

**Estimated timeline: 4 weeks**

---

Good luck! 🚀
