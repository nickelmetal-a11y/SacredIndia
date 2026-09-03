# 🚀 Sacred India - Strategic Implementation Roadmap

**Status:** Ready for Phase 1 implementation (Authentication)  
**Last Updated:** September 3, 2026  
**Live URL:** https://sacred-india.vercel.app

---

## ✅ COMPLETED (Current State)

### App Structure
- ✅ Next.js 16 with React 19 setup
- ✅ Mobile-first design (375px responsive)
- ✅ Bottom navigation bar (4 tabs)
- ✅ 85+ sacred sites database (sites.json)
- ✅ 7-religion support (Hindu, Islam, Christian, Buddhist, Jain, Sikh, Zoroastrian)
- ✅ Component system: SiteCard, NearbySites, InteractiveMap, ToiletFinder, etc.
- ✅ Hooks: useSites, useGeolocation
- ✅ Multi-language support framework (English + Hindi)
- ✅ Deployed to Vercel with auto-deployment

### Current UI (App-Like Design)
- Home: Featured sites + religion filters + bottom nav
- All Sites: Search, filter, browse with bottom nav
- Site Details: [id] route for each site
- Bottom Nav: Home 🏠, All Sites 🗂️, Settings ⚙️

---

## 🎯 PHASE 1: AUTHENTICATION (PRIORITY 1)

### What to Build
```
1. Auth System (Email + OTP)
   - Signup page (email → OTP → verification)
   - Login page (email → OTP → verification)
   - OTP verification logic
   - Session management

2. User Database
   - Users table (email, name, password hash, phone optional, verified)
   - User profiles (preferences, default_religion, created_at)
   - Authentication middleware

3. Protected Routes
   - /auth/signup
   - /auth/login
   - /auth/verify-otp
   - /dashboard (protected)
```

### Tech Stack to Use
- **Database:** Supabase (PostgreSQL) - FREE tier sufficient
- **Auth:** Supabase Auth (email OTP)
- **Session:** NextAuth.js v5 with Supabase provider
- **OTP:** Email-based (Supabase handles it)

### Database Schema
```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  phone VARCHAR,
  default_religion VARCHAR DEFAULT 'hindu',
  language VARCHAR DEFAULT 'en',
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- User Preferences
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  default_religion VARCHAR,
  language VARCHAR,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  offline_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);
```

---

## 🗺️ PHASE 2: TRAVEL-FOCUSED UI (4 TABS)

### Navigation Structure
```
1. 🏠 DISCOVER
   - Featured sacred sites
   - "Near Me" GPS map
   - Top-rated by religion
   - User's default religion pre-selected

2. 🗺️ EXPLORE
   - Interactive map (drag & drop)
   - Search & filter
   - Site details
   - User reviews

3. ✈️ MY JOURNEYS
   - Create pilgrimage itinerary
   - Drag sites to timeline
   - Route options (Elderly/Adventure)
   - Budget tracking
   - Share with friends
   - Bookings & checklist

4. ⚙️ MORE
   - ❤️ Saved Sites (favorites)
   - 🌐 Language Toggle
   - 📋 Ritual Checklist
   - 🗺️ Offline Maps
   - 💬 Settings
   - 👤 Account/Logout
   - ℹ️ Help & About
```

---

## 🎨 PHASE 3: CORE FEATURES

### Feature Priorities
```
HIGH (Do First)
- [ ] Journey Builder (map-based, drag & drop)
- [ ] User Reviews & Ratings
- [ ] Saved Sites/Favorites
- [ ] Expense Tracker

MEDIUM (Then)
- [ ] Group Trip Sharing
- [ ] Ritual Checklist
- [ ] Travel Guides
- [ ] Offline Maps

LOW (Nice to Have)
- [ ] Social features
- [ ] AI recommendations
- [ ] Real-time notifications
```

### Feature Specs

#### Journey Builder
```
- Create new journey (name, dates)
- Drag sites from explore onto timeline
- Set travel dates per site
- Choose path: Elderly/Adventure
- Calculate total distance & time
- Budget calculator
- Share via link
- Add companions
```

#### Reviews & Ratings
```
- 1-5 star rating per site
- Photo uploads
- Review text
- Helpful votes
- Sort by rating/recent
```

#### Saved Sites
```
- Toggle ❤️ to save site
- Save to custom collections
- Sync across devices (user logged in)
```

#### Expense Tracker
```
- Add expenses per journey
- Categories: Transport, Accommodation, Food, Rituals
- Per-person splitting
- Budget limit alerts
```

---

## 📊 DATABASE SCHEMA (Complete)

```sql
-- Users (from Supabase Auth + Profile)
users (id, email, name, default_religion, language, verified)

-- User Preferences
user_preferences (id, user_id, language, notifications, offline_mode)

-- Journeys (Pilgrimages)
journeys (
  id, user_id, name, description, start_date, end_date,
  status ('draft', 'planned', 'completed'),
  created_at, updated_at
)

-- Journey Sites (Itinerary items)
journey_sites (
  id, journey_id, site_id, order, date,
  path_type ('elderly', 'adventure', 'default'),
  notes, created_at
)

-- Journey Expenses
journey_expenses (
  id, journey_id, amount, category, description,
  paid_by_user_id, date, created_at
)

-- Saved Sites (Favorites)
saved_sites (id, user_id, site_id, created_at)

-- Reviews & Ratings
reviews (
  id, user_id, site_id, rating (1-5), 
  review_text, photos_url, helpful_count,
  created_at, updated_at
)

-- Journey Sharing
journey_shares (
  id, journey_id, shared_with_email, permission_level,
  created_at
)
```

---

## 🔧 IMPLEMENTATION PRIORITY

### Week 1: Authentication
1. Supabase project setup
2. NextAuth.js configuration
3. Signup/Login/OTP flow
4. Protected routes

### Week 2: User Preferences & Persistence
1. User profile schema
2. Default religion preference (sticky)
3. Settings page
4. Sync across sessions

### Week 3: Journey Builder
1. UI for journey creation
2. Drag & drop interface
3. Timeline view
4. Save/edit journeys

### Week 4: Features
1. Reviews & ratings
2. Saved sites
3. Expense tracker
4. Sharing functionality

---

## 📦 DEPENDENCIES TO ADD

```bash
npm install @supabase/supabase-js next-auth@latest
npm install react-beautiful-dnd  # For drag & drop
npm install recharts  # For expense charts
npm install zustand  # For state management
```

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Auth system working locally
- [ ] Supabase deployed
- [ ] Environment variables set (.env.local)
- [ ] Test auth flow end-to-end
- [ ] Deploy to Vercel
- [ ] Test live authentication
- [ ] Monitor for errors

---

## 📝 NOTES FOR NEXT SESSION

**To Pick Up Immediately:**
1. Start with Supabase setup (FREE tier)
2. Configure NextAuth.js
3. Create auth pages (signup/login/verify-otp)
4. Test email OTP flow
5. Deploy and verify

**Current Code Location:**
- App pages: `/app/page.tsx`, `/app/sites/page.tsx`, `/app/sites/[id]/page.tsx`
- Components: `/src/components/`
- Hooks: `/src/hooks/`
- Data: `/src/data/sites.json`

**Live App:** https://sacred-india.vercel.app  
**GitHub:** Check git history for all changes

---

## ✨ READY TO BUILD!

All strategic planning is complete. Just need to implement phase by phase.  
No need to repeat research or planning - jump straight to coding! 🎯
