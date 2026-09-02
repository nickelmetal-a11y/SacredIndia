# 🚀 PHASE 1 Implementation Guide — Discovery + Accessibility + Localization

**Duration**: 4 weeks  
**Focus**: GPS discovery, accessibility paths, toilet finder, multi-language  
**NOT Included**: Booking, payments, user accounts  

---

## 📋 Feature Breakdown

### Feature 1: Proximity-Based Discovery (Week 1)
**What**: Users see nearby sacred sites based on GPS location

**Components to Build**:
- `components/NearbySites.tsx` — List of nearby sites
- `components/InteractiveMap.tsx` — Google Maps with site markers
- `hooks/useGeolocation.ts` — Get user's GPS coordinates
- `utils/distance.ts` — Calculate distance between points

**API Integration**:
```bash
npm install react-google-maps @react-google-maps/api haversine
```

**Data Changes**:
```json
// Add to each site in sites.json
{
  "lat": 25.3176,
  "lng": 82.9739,
  "distance": 0.3,  // calculated dynamically
  "walkingTime": 4   // minutes
}
```

**UI Components**:
- Home page with map
- "5 Sites Near You" card list
- Distance badges (0.3 km, 4 min walk)
- Tap to view details

---

### Feature 2: Accessibility Paths (Week 2)
**What**: Two route options — elderly-friendly and adventure

**For Elderly** (👴 Accessibility):
- Shortest distance
- Flat terrain (minimal elevation)
- Rest points with shade
- Wheelchair accessible
- Clearest directions

**For Youth** (🧗 Adventure):
- Scenic views
- Challenging trails
- Photography spots
- Elevation/difficulty stats
- Hiking difficulty levels

**Components to Build**:
- `components/PathSelector.tsx` — Choose elderly/youth path
- `components/PathDetails.tsx` — Step-by-step directions
- `utils/pathFinder.ts` — Route calculation algorithm

**Data Changes**:
```json
{
  "id": "varanasi",
  "paths": {
    "elderly": {
      "name": "Elderly-Friendly Route",
      "distance": 0.5,
      "elevation": 0,
      "time": 12,
      "difficulty": "Easy",
      "wheelchairAccessible": true,
      "restPoints": 3,
      "description": "Flat, easy walking..."
    },
    "youth": {
      "name": "Adventure Route",
      "distance": 2.2,
      "elevation": 150,
      "time": 45,
      "difficulty": "Moderate",
      "scenicSpots": 5,
      "description": "Challenging trek..."
    }
  }
}
```

**Site Detail Page Changes**:
- Remove booking section (move to Phase 2)
- Add path selector at top
- Show path details
- Display amenities

---

### Feature 3: Toilet Finder (Week 2-3)
**What**: Find nearby clean toilets with ratings

**Toilet Data**:
- Location (lat/lng)
- Type (public/temple/hotel/private)
- Distance
- Cleanliness rating
- User reviews
- Water availability
- Accessibility
- Operating hours

**Components to Build**:
- `components/ToiletFinder.tsx` — List nearby toilets
- `components/ToiletCard.tsx` — Individual toilet card
- Google Places integration

**API Integration**:
```bash
npm install @googlemaps/js-client
```

**Data Structure**:
```json
{
  "toilets": [
    {
      "id": "toilet_001",
      "name": "Community Toilet",
      "type": "Public",
      "lat": 25.3180,
      "lng": 82.9740,
      "distance": 0.15,
      "rating": 4.8,
      "reviews": 47,
      "cost": "Free",
      "cleanliness": 4.5,
      "water": true,
      "accessible": true,
      "hours": "24/7"
    }
  ]
}
```

**UI Features**:
- Show 3 nearest toilets
- Rating & review count
- Cost indicator (Free/₹10)
- Accessibility badge
- "Get Directions" button

---

### Feature 4: Multi-Language Support (Week 3-4)
**What**: Full app in English & हिंदी

**Languages to Support**:
- 🇬🇧 English (default)
- 🇮🇳 हिंदी (Hindi)

**Setup i18n**:
```bash
npm install next-i18next i18next
```

**File Structure**:
```
src/
├── locales/
│   ├── en.json          # English translations
│   └── hi.json          # Hindi translations
├── i18n.config.ts       # i18n configuration
└── hooks/
    └── useTranslation.ts # Hook to access translations
```

**Translation Categories**:
1. **Site Information** (names, descriptions, stories, scriptures)
2. **Path Directions** (elderly/youth route instructions)
3. **UI Labels** (buttons, headers, placeholders)
4. **Amenities** (toilet types, facilities)
5. **All Taglines & Helper Text**

**Language Toggle**:
- Top-right corner of header
- EN / हिंदी buttons
- Persist selection in localStorage

**Translation Scope**:
```json
{
  "home": {
    "nearby": "Nearby Sites",
    "findNow": "Find Sites Near You"
  },
  "paths": {
    "elderly": "Elderly-Friendly",
    "youth": "Adventure Route"
  },
  "toilets": {
    "nearby": "Toilets Nearby",
    "free": "Free",
    "paid": "Paid",
    "rating": "Rating"
  }
}
```

---

## 🛠️ Week-by-Week Implementation Plan

### **Week 1: Proximity Discovery**
- [ ] Setup Google Maps API key
- [ ] Integrate `@react-google-maps/api`
- [ ] Create `useGeolocation` hook
- [ ] Build `distance.ts` utility (haversine formula)
- [ ] Create `NearbySites` component
- [ ] Create `InteractiveMap` component
- [ ] Update home page with map
- [ ] Add distance to site cards
- [ ] Test locally with mock GPS

**Deliverable**: Home page shows nearby sites, users can see map

---

### **Week 2: Accessibility Paths**
- [ ] Create `paths` object in sites.json
- [ ] Build `PathSelector` component (elderly/youth toggle)
- [ ] Build `PathDetails` component (show route info)
- [ ] Create path algorithm (distance, elevation, time)
- [ ] Update site detail page with paths
- [ ] Add path badges & icons
- [ ] Add difficulty indicators
- [ ] Add accessibility symbols

**Deliverable**: Site detail shows 2 path options, users can select

---

### **Week 2-3: Toilet Finder**
- [ ] Setup Google Places API
- [ ] Create toilet data structure in sites.json
- [ ] Build `ToiletFinder` component
- [ ] Build `ToiletCard` component
- [ ] Integrate Google Places for toilet search
- [ ] Add ratings & reviews display
- [ ] Add "Get Directions" button
- [ ] Test with real toilet data

**Deliverable**: Site detail shows 3 nearest clean toilets

---

### **Week 3-4: Multi-Language**
- [ ] Install i18n libraries
- [ ] Create translation files (en.json, hi.json)
- [ ] Extract all UI text to i18n keys
- [ ] Translate all site data to Hindi
- [ ] Create language toggle button
- [ ] Setup localStorage for language preference
- [ ] Test all pages in both languages
- [ ] Verify RTL support (if needed)

**Deliverable**: Full app works in English & हिंदी

---

## 💻 Code Changes by File

### New Files to Create:

```
src/
├── components/
│   ├── NearbySites.tsx
│   ├── InteractiveMap.tsx
│   ├── PathSelector.tsx
│   ├── PathDetails.tsx
│   ├── ToiletFinder.tsx
│   └── ToiletCard.tsx
├── hooks/
│   ├── useGeolocation.ts
│   └── useTranslation.ts
├── utils/
│   ├── distance.ts
│   └── pathFinder.ts
├── locales/
│   ├── en.json
│   └── hi.json
├── i18n.config.ts
└── types/
    ├── geolocation.ts
    └── paths.ts
```

### Modified Files:

```
src/
├── app/
│   ├── page.tsx          (add map, nearby sites)
│   ├── sites/[id]/page.tsx (add paths, toilets)
│   ├── layout.tsx        (add language toggle)
│   └── globals.css       (add new styles)
├── data/
│   └── sites.json        (add paths, toilets)
└── hooks/
    └── useSites.ts       (add path utilities)
```

---

## 📦 Dependencies to Install

```bash
npm install \
  @react-google-maps/api \
  react-google-maps \
  haversine \
  next-i18next \
  i18next \
  react-i18next
```

---

## 🗺️ Updated sites.json Structure

```json
{
  "sites": [
    {
      "id": "varanasi",
      "name": "Varanasi — Kashi",
      "nameHindi": "वाराणसी — काशी",
      
      // Existing data...
      
      "lat": 25.3176,
      "lng": 82.9739,
      
      // NEW: Path information
      "paths": {
        "elderly": {
          "name": "Elderly-Friendly Route",
          "nameHindi": "बुजुर्गों के लिए आसान रास्ता",
          "distance": 0.5,
          "time": 12,
          "elevation": 0,
          "difficulty": "Easy",
          "wheelchairAccessible": true,
          "restPoints": 3,
          "shade": true,
          "steps": false,
          "terrain": "Flat",
          "description": "Easy walking route with frequent rest areas",
          "descriptionHindi": "आसान चलने का रास्ता बार-बार आराम के साथ"
        },
        "youth": {
          "name": "Adventure Route",
          "nameHindi": "रोमांचक रास्ता",
          "distance": 2.2,
          "time": 45,
          "elevation": 150,
          "difficulty": "Moderate",
          "scenicSpots": 5,
          "photographyPoints": ["Temple viewpoint", "Mountain vista"],
          "terrain": "Mixed (trail + steps)",
          "description": "Challenging trek with scenic viewpoints",
          "descriptionHindi": "सुंदर दृश्यों के साथ चुनौतीपूर्ण ट्रेक"
        }
      },
      
      // NEW: Toilet information
      "nearbyToilets": [
        {
          "id": "toilet_v_001",
          "name": "Community Toilet",
          "nameHindi": "सामुदायिक शौचालय",
          "type": "Public",
          "distance": 0.15,
          "lat": 25.3180,
          "lng": 82.9740,
          "rating": 4.8,
          "reviews": 47,
          "cost": "Free",
          "costHindi": "मुफ्त",
          "cleanliness": 4.5,
          "water": true,
          "accessible": true,
          "hours": "24/7"
        }
      ]
    }
  ]
}
```

---

## 🎯 Testing Checklist

### Week 1: GPS & Discovery
- [ ] Geolocation permission works on mobile
- [ ] Distance calculation is accurate (≤50m error)
- [ ] Walking time estimates reasonable
- [ ] Map shows all sites correctly
- [ ] Nearby sites list sorted by distance
- [ ] Site cards show correct distance

### Week 2: Paths
- [ ] Both elderly & youth paths display
- [ ] Elderly path shows flat terrain
- [ ] Youth path shows elevation gain
- [ ] Path difficulty badges visible
- [ ] Accessibility icons show correctly
- [ ] Path stats are accurate

### Week 2-3: Toilets
- [ ] Toilets list shows 3 nearest
- [ ] Ratings display correctly (1-5 stars)
- [ ] Cost badges show (Free/₹)
- [ ] Accessibility icons visible
- [ ] "Get Directions" button works
- [ ] Review count shows

### Week 3-4: Language
- [ ] Toggle switches language globally
- [ ] All text translates to Hindi
- [ ] Site names in Hindi correct
- [ ] Path descriptions in Hindi
- [ ] Toilet info in Hindi
- [ ] Language preference persists on reload
- [ ] Both languages render correctly

---

## 🚀 Deployment Checklist (End of Phase 1)

- [ ] All 85 sites have path data
- [ ] All sites have nearby toilet data
- [ ] All text translated to Hindi
- [ ] GPS works on real devices
- [ ] Map loads without errors
- [ ] Toilet finder accurate
- [ ] No console errors
- [ ] Mobile UI responsive
- [ ] Tests pass locally
- [ ] Build succeeds (`npm run build`)
- [ ] Ready for Vercel deployment

---

## 📊 Success Metrics

By end of Phase 1:

| Metric | Target | Status |
|--------|--------|--------|
| Sites with path data | 85/85 | ⏳ |
| Toilet data coverage | 80%+ sites | ⏳ |
| Translation complete | 100% Hindi | ⏳ |
| GPS accuracy | ±50m | ⏳ |
| Loading time | <2s | ⏳ |
| Mobile responsiveness | 100% | ⏳ |
| Zero console errors | ✓ | ⏳ |

---

## 📝 Phase 1 → Phase 2 Transition

**End of Phase 1**: Users can discover nearby sites, choose paths, find toilets, use app in their language.

**Start of Phase 2**: Add booking system for services (pujas, guides, accommodations)

---

## 🔗 Related Documentation

- `QUICK_START.md` — Quick reference
- `SETUP_GUIDE.md` — Deployment steps
- `README.md` — Full project overview

---

**Ready to build Phase 1? 🚀**

Next step: Initialize Google Maps and start Week 1!
