# Sacred India - Quick Start Build Guide

## ✅ WHAT'S BEEN SET UP

### Infrastructure Completed
1. **Database Schema** (`supabase/migrations/001_initial_schema.sql`)
   - 13 tables: users, sites, services, guides, bookings, festivals, scriptures, etc.
   - RLS policies for security
   - Indexes for performance

2. **Core Services**
   - Panchang service (`lib/services/panchang.ts`) - Hindu calendar calculations
   - Namaz service (`lib/services/namaz.ts`) - Islamic prayer times
   - Crowd Intelligence (`lib/services/crowdIntel.ts`) - Best/worst visiting days
   - AI Guide API (`app/api/ai-guide/route.ts`) - Claude integration

3. **App Layout**
   - 12-tab navigation (Home, Explore, AI Guide, Services, Texts, Badges, Family, Me, Festivals, Community, Stories, Settings)
   - Responsive mobile-first design
   - Navigation bar at bottom with all tabs

4. **Configuration**
   - `.env.local` template with all required API keys
   - Dependencies added to package.json

---

## 🚀 NEXT STEPS (Build Order)

### Step 1: Setup (30 min)
```bash
# 1. Install dependencies
npm install

# 2. Create Supabase project
#    - Go to supabase.com, create new project
#    - Copy NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
#    - Add to .env.local

# 3. Apply database migrations
#    - In Supabase dashboard, go to SQL Editor
#    - Paste content from supabase/migrations/001_initial_schema.sql
#    - Run the migration

# 4. Get API keys
#    - Anthropic: https://console.anthropic.com/account/keys
#    - Razorpay: https://dashboard.razorpay.com/
#    - Add to .env.local

# 5. Start dev server
npm run dev
# Opens http://localhost:3000
```

### Step 2: Populate Sample Data (1 hour)
Create file `scripts/seed-data.sql` to populate:
- 85 sacred sites (can start with 20, expand later)
- 11 remote puja services
- 5 verified guides
- 20 festivals
- 7 scripture samples

Run in Supabase SQL Editor:
```sql
-- Insert 5 sample Hindu sites
INSERT INTO sites (name, faith, emoji, story, latitude, longitude, city, state, typical_crowd) VALUES
  ('Kashi Vishwanath', 'hindu', '🛕', 'Ancient temple of Lord Shiva...', 25.3245, 82.9965, 'Varanasi', 'Uttar Pradesh', 'high'),
  ('Tirupati Temple', 'hindu', '⚡', 'Famous temple of Lord Venkateswara...', 13.1827, 79.8254, 'Tirupati', 'Andhra Pradesh', 'high'),
  -- ... add 18 more
;

-- Insert transport for Kashi
INSERT INTO transport (site_id, transport_type, nearest_station, station_distance_km) VALUES
  ((SELECT id FROM sites WHERE name = 'Kashi Vishwanath'), 'train', 'Varanasi Junction', 5),
  -- ...
;
```

### Step 3: Build Components (2-3 hours)
Create in `app/components/`:

**1. SiteCard.jsx** - Reusable site display
```typescript
// Shows site name, faith emoji, distance, crowd indicator
// Tap to expand with full details
// "Book Now" and "Share to WA" buttons
```

**2. ServiceCard.jsx** - For puja/prasad/guide services
```typescript
// Shows service name, price, includes, rating
```

**3. BookingModal.jsx** - 4-step booking flow
```typescript
// Step 1: Select date/time
// Step 2: Enter person details
// Step 3: Confirm
// Step 4: Payment (Razorpay)
```

**4. WhatsAppButton.jsx** - Reusable share button
```typescript
// Formats message and opens WA
// Can share sites, bookings, scriptures, etc.
```

**5. PanchagWidget.jsx** - Home tab widget
```typescript
// Shows today's tithi, nakshatra, auspicious times
// Display panchang/namaz data
```

### Step 4: Build Home Tab (2 hours)
File: `app/page.tsx`

**Features:**
- GPS detection → nearest sacred site
- Panchang widget (today's tithi + auspicious times)
- Namaz times (for 7 cities)
- Lamp dedication quick action
- WhatsApp quick actions (4 buttons)

**Code structure:**
```typescript
'use client';

import { useEffect, useState } from 'react';
import { getTodaysPanchang } from '@/lib/services/panchang';
import { getPrayerTimes, getNextPrayer } from '@/lib/services/namaz';
import PanchagWidget from '@/app/components/PanchagWidget';
import LampDedicationCard from '@/app/components/LampDedicationCard';

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestSite, setNearestSite] = useState(null);
  const [panchang, setPanchang] = useState(getTodaysPanchang());
  
  useEffect(() => {
    // Get GPS location
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      // Query Supabase for nearest site
    });
  }, []);

  return (
    <div className="px-4 py-6">
      {/* Nearest Site Card */}
      {nearestSite && <SiteCard site={nearestSite} />}
      
      {/* Panchag Widget */}
      <PanchagWidget panchang={panchang} />
      
      {/* Namaz Times Widget */}
      <NamazWidget />
      
      {/* Lamp Dedication */}
      <LampDedicationCard />
      
      {/* WhatsApp Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <WhatsAppButton action="share-panchang" />
        <WhatsAppButton action="share-trip-plan" />
        <WhatsAppButton action="book-puja" />
        <WhatsAppButton action="request-site" />
      </div>
    </div>
  );
}
```

### Step 5: Build Explore Tab (3 hours)
File: `app/explore/page.tsx`

**Features:**
- Show all 85 sites (paginated)
- Filter by faith (7 toggles)
- Filter by crowd level
- Senior mode toggle
- Expand card → show transport, accessibility, "Book Now"

**Code structure:**
```typescript
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import SiteCard from '@/app/components/SiteCard';

export default function Explore() {
  const [sites, setSites] = useState([]);
  const [selectedFaith, setSelectedFaith] = useState('');
  const [seniorMode, setSeniorMode] = useState(false);

  useEffect(() => {
    const query = selectedFaith 
      ? supabase.from('sites').select('*').eq('faith', selectedFaith)
      : supabase.from('sites').select('*');
    
    query.then(({ data }) => setSites(data || []));
  }, [selectedFaith]);

  return (
    <div className="px-4 py-6">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        <button className={`px-3 py-1 rounded-full text-sm ${!selectedFaith ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          All
        </button>
        {['hindu', 'islam', 'christian', 'buddhist', 'jain', 'sikh', 'zoroastrian'].map(faith => (
          <button key={faith} onClick={() => setSelectedFaith(faith)}>
            {FAITH_EMOJI[faith]}
          </button>
        ))}
      </div>

      {/* Senior Mode Toggle */}
      <button onClick={() => setSeniorMode(!seniorMode)} className="mb-4">
        ♿ Senior Mode {seniorMode ? '✓' : ''}
      </button>

      {/* Sites Grid */}
      <div className="space-y-4">
        {sites.map(site => (
          <SiteCard key={site.id} site={site} showAccessibility={seniorMode} />
        ))}
      </div>
    </div>
  );
}
```

### Step 6: Build Booking Flow (2 hours)
**Integration:** Every "Book Now" button should open BookingModal

```typescript
const handleBooking = async (serviceId) => {
  // 1. Show date picker
  // 2. Show person details form
  // 3. Show confirmation
  // 4. Open Razorpay payment
  // 5. On success:
  //    - Save booking to DB
  //    - Send WhatsApp confirmation
  //    - Show success screen
};
```

### Step 7: Build Other Tabs (4-5 hours)
Build in order of importance:

1. **Services Tab** (`app/services/page.tsx`)
   - Show 5 remote puja options (Kashi, Tirupati, Ajmer, Golden Temple, +1)
   - Each shows sevas + prices
   - "Book Now" opens booking modal
   - Show verified guides with ratings

2. **AI Guide Tab** (`app/ai-guide/page.tsx`)
   - Text input field
   - Voice input (5 languages)
   - Call `/api/ai-guide` endpoint
   - Display response with citations
   - Share to WhatsApp button

3. **Texts Tab** (`app/texts/page.tsx`)
   - Show 7 scriptures (one per faith)
   - Display original language text
   - English translation
   - "Listen" button (text-to-speech)
   - Share verse to WhatsApp

4. **Badges Tab** (`app/badges/page.tsx`)
   - Show user's current tier (Seeker → Legend)
   - Show progress to next tier
   - Show 7 faith tracks
   - Share badge button

5. **Festivals Tab** (`app/festivals/page.tsx`)
   - Show festival calendar
   - Filter by faith
   - Each festival shows: date, best sites, why visit
   - "Add to calendar" button

6. **Family Tab** (`app/family/page.tsx`)
   - Group size selector (2-15+)
   - Group type (mixed/seniors/kids)
   - Apply accessibility filters
   - Generate itinerary
   - Share to WhatsApp

7. **Me Tab** (`app/me/page.tsx`)
   - User profile
   - Language preference (8 languages)
   - Enable panchang digest
   - Notification settings
   - Sign out

8. **Other Tabs** (minimal MVP)
   - Community: placeholder
   - Stories: placeholder
   - Settings: sign out, language

---

## 📊 BUILD TIMELINE ESTIMATE

| Task | Est. Time | Status |
|------|-----------|--------|
| Setup + Dependencies | 30 min | Ready |
| Database + Migrations | 30 min | Ready |
| Components | 3 hours | Next |
| Home Tab | 2 hours | →After |
| Explore Tab | 3 hours | →After |
| Booking Integration | 2 hours | →After |
| Services Tab | 1 hour | →After |
| AI Guide Tab | 1.5 hours | →After |
| Remaining Tabs | 4-5 hours | →After |
| Polish & Deploy | 2 hours | →Final |
| **TOTAL** | **~18 hours** | |

**Timeline:** 2-3 days if working 6-8 hours/day

---

## 🔑 KEY FILES TO EDIT

- `app/page.tsx` → Home tab
- `app/explore/page.tsx` → Explore tab
- `app/ai-guide/page.tsx` → AI Guide tab
- `app/services/page.tsx` → Services tab
- `app/components/*.tsx` → Reusable components
- `.env.local` → Add API keys

---

## 🎯 TESTING CHECKLIST

Before deployment:
- [ ] Home tab shows GPS location + nearest site
- [ ] Panchang/Namaz data displays correctly
- [ ] Explore shows 85 sites (or subset)
- [ ] Filters work (by faith, crowd, senior mode)
- [ ] Booking flow: date → details → payment → confirmation
- [ ] AI Guide responds to questions
- [ ] WhatsApp buttons open with pre-filled messages
- [ ] Mobile responsive on all tabs
- [ ] No console errors

---

## 🚀 DEPLOYMENT

### To Vercel (Recommended)
```bash
# 1. Push to Git
git add .
git commit -m "🎉 Sacred India Phase 1+2 MVP"
git push origin main

# 2. Connect to Vercel
#    - Go to vercel.com
#    - Import this repo
#    - Add env vars (NEXT_PUBLIC_*, API keys)
#    - Deploy

# 3. Set Supabase webhook (optional)
#    - Real-time updates for new bookings
```

---

## 💡 PRO TIPS

1. **Start with 20 sites**, expand to 85 later
2. **Hardcode puja data** first, database later
3. **Use localStorage** for lamp dedications (no backend needed)
4. **Test on mobile** - use Chrome DevTools phone emulation
5. **Get user feedback** early - deploy MVP fast
6. **Optimize images** - sites need thumbnails (compress to <100KB)
7. **WhatsApp links** - use `https://wa.me/?text=ENCODED_MESSAGE`

---

## 📞 SUPPORT

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Anthropic API: https://docs.anthropic.com
- Razorpay: https://docs.razorpay.com

---

**Ready to build? Run `npm install` and let's go! 🚀**
