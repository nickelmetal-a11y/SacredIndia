# Sacred India - Master Roadmap & Handoff Guide
**For seamless work across Claude instances (Windows, MacBook, etc.)**

**Last Updated:** 2026-09-03  
**Status:** Infrastructure ✅ | Building Phase 1-2 MVP  
**Production URL:** https://sacred-india.vercel.app (coming soon)

---

## 🎯 PROJECT VISION

**Sacred India** is a multi-faith pilgrimage app with:
- **Web:** Next.js (Vercel deployment)
- **iOS:** React Native or Flutter
- **Android:** React Native or Flutter
- **Backend:** Shared Supabase database
- **API:** Next.js API routes (can be extracted to Node.js later)

**Target:** 900M pilgrims + 5M NRIs | ₹10.8B market

---

## 📊 CURRENT STATUS (Sep 3, 2026)

### ✅ COMPLETED
- [x] Database schema (13 tables, RLS policies)
- [x] Supabase setup template
- [x] Core services (Panchang, Namaz, Crowd Intel)
- [x] AI Guide API (Claude)
- [x] App layout (12-tab navigation)
- [x] Dependencies added
- [x] .env.local template
- [x] QUICK_START_BUILD.md guide

### 🔄 IN PROGRESS
- [ ] Home tab (GPS + panchang + lamp)
- [ ] Explore tab (85 sites + filters)
- [ ] Booking flow (4-step + payment)

### ⏳ NEXT (Phase 1+2 MVP)
- [ ] Services tab (remote puja)
- [ ] AI Guide UI (Claude integration)
- [ ] Remaining 8 tabs
- [ ] Deploy to Vercel
- [ ] Start iOS/Android app

### 📅 FUTURE
- [ ] Admin dashboard
- [ ] Analytics
- [ ] Advanced features
- [ ] App store releases

---

## 🏗️ ARCHITECTURE FOR WEB + MOBILE

### Backend Structure (Shared)
```
sacred-india/
├── app/api/              ← API routes (can move to separate backend later)
│   ├── ai-guide/
│   ├── booking/
│   ├── sites/
│   ├── user/
│   └── ...
├── lib/services/         ← Business logic (reusable by web + mobile)
│   ├── panchang.ts
│   ├── namaz.ts
│   ├── crowdIntel.ts
│   └── ...
├── lib/supabase.ts       ← Database client (works for web + mobile)
└── package.json
```

### Frontend Structure

**Web (Next.js):**
```
app/
├── page.tsx                      (Home tab)
├── explore/
├── ai-guide/
├── services/
├── components/                   (Reusable React components)
│   ├── SiteCard.tsx
│   ├── BookingModal.tsx
│   └── ...
└── globals.css                   (Tailwind styles)
```

**Mobile Apps (React Native / Flutter):**
```
sacred-india-mobile/
├── src/
│   ├── screens/                  (Same as web tabs)
│   │   ├── HomeScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── BookingModal.tsx
│   │   └── ...
│   ├── components/               (Native components)
│   ├── services/                 (Reuse from web!)
│   │   ├── panchang.ts
│   │   ├── namaz.ts
│   │   └── crowdIntel.ts
│   └── api/
│       └── client.ts             (Talk to same Supabase + Next.js API)
└── package.json
```

### API Layer (Works for Web + Mobile)
```
Next.js API Routes → Supabase Database
Web (React) ─┐
            ├─→ API Routes ─→ Supabase ← Database
iOS (RN)   ─┤
            ├─→ Direct Supabase Client (via lib/supabase.ts)
Android (RN)─┘
```

---

## 📋 HANDOFF PROTOCOL (For Claude Instances)

### Before Ending a Session

**ALWAYS DO THESE 4 THINGS:**

1. **Update MASTER_ROADMAP.md** (THIS FILE)
   - Mark completed work with ✅
   - List what's next
   - Note any blockers
   - Last updated timestamp

2. **Commit to Git**
   ```bash
   git add -A
   git commit -m "🔄 [CLAUDE SESSION END] Phase 1.2 - Home tab complete"
   git push origin main
   ```

3. **Update DEPLOYMENT_STATUS.md**
   - What's deployed
   - What's staging
   - What's broken
   - Environment status

4. **Add Session Notes** in `CLAUDE_SESSION_NOTES.md`
   - What was accomplished
   - Key decisions made
   - Blockers encountered
   - Next Claude's todo list

### When Starting a New Session

**ALWAYS DO THESE 4 THINGS:**

1. **Read MASTER_ROADMAP.md** (THIS FILE)
2. **Read DEPLOYMENT_STATUS.md** (current state)
3. **Read CLAUDE_SESSION_NOTES.md** (prior work)
4. **Run:**
   ```bash
   git log --oneline -5  # See latest commits
   npm run dev          # Start dev server
   ```

---

## 🚀 DEPLOYMENT STRATEGY

### Continuous Deployment
- **Every completed feature** → Deploy to Vercel
- **Before deployment** → Run full test checklist
- **After deployment** → Update DEPLOYMENT_STATUS.md

### Deployment Process
```bash
# 1. Ensure code is complete
git status  # Should be clean

# 2. Test locally
npm run build
npm run dev

# 3. Commit
git commit -m "✨ [FEATURE] Home tab with GPS + panchang"

# 4. Push (auto-deploys to Vercel)
git push origin main

# 5. Monitor
# Check https://vercel.com/nikhilmathur-4671/sacred-india
# Check console logs for errors

# 6. Update documentation
# Edit DEPLOYMENT_STATUS.md with new version
```

---

## 📱 MOBILE APP SETUP (Next Steps)

### Option A: React Native (Recommended)
**Pros:** Code sharing with web, single team  
**Cons:** Native feel requires more platform-specific code

**Setup:**
```bash
# In sacred-india-mobile/ folder (create new)
npx create-expo-app sacred-india-mobile
npm install @supabase/supabase-js @react-navigation/native
# Share lib/services/ and lib/supabase.ts from web
```

### Option B: Flutter
**Pros:** Better native performance  
**Cons:** New language, less code sharing

**Setup:**
```bash
flutter create sacred_india_mobile
# Use generated APIs, call same Next.js backend
```

### Architecture Decision (TO DECIDE)
- [ ] React Native (Expo) - share code with web
- [ ] React Native (bare) - more control
- [ ] Flutter - better performance
- [ ] Native Swift/Kotlin - best but slowest

**Recommendation:** React Native (Expo) for MVP, migrate to bare/native later

---

## 🎯 BUILD PHASES

### Phase 1: MVP (Web Only) — IN PROGRESS
**Timeline:** This week (Sep 3-7)  
**Deliverable:** Web app on Vercel with 12 tabs

- [ ] Home tab (GPS, panchang, lamp, WA actions)
- [ ] Explore tab (85 sites, filters, transport)
- [ ] Services tab (remote puja, 5 temples)
- [ ] Booking flow (4-step, payment)
- [ ] AI Guide tab (Claude Q&A, voice)
- [ ] Remaining tabs (Texts, Badges, Festivals, Family, Me, etc.)
- [ ] Admin basics (manage sites, view bookings)
- [ ] Deploy to Vercel

### Phase 2: Mobile Apps (iOS + Android) — NEXT
**Timeline:** Sep 8-21  
**Deliverable:** iOS + Android apps in TestFlight + Play Store beta

- [ ] Setup React Native / Flutter
- [ ] Port web UI to mobile screens
- [ ] Test on iOS simulator + Android emulator
- [ ] Handle platform differences (WA share, GPS, camera)
- [ ] Build app signing certificates
- [ ] Deploy to TestFlight (iOS) + Play Store (Android)
- [ ] Collect beta feedback

### Phase 3: Polish & Launch
**Timeline:** Sep 22-30  
**Deliverable:** Production release on App Store + Play Store

- [ ] Fix beta feedback
- [ ] Optimize performance
- [ ] Add app store metadata
- [ ] Marketing campaign
- [ ] Official launch

---

## 📁 DIRECTORY STRUCTURE

```
sacred-india/                          # Web app (Next.js)
├── app/                               # Next.js app router
│   ├── page.tsx                       # Home tab
│   ├── explore/page.tsx               # Explore tab
│   ├── api/ai-guide/route.ts          # API endpoints
│   ├── components/                    # React components (reusable)
│   └── layout.tsx                     # 12-tab navigation
├── lib/
│   ├── supabase.ts                    # Database client
│   ├── services/                      # Business logic (share with mobile!)
│   │   ├── panchang.ts
│   │   ├── namaz.ts
│   │   ├── crowdIntel.ts
│   │   └── ...
│   └── types.ts                       # TypeScript types (share with mobile!)
├── supabase/migrations/               # Database migrations
│   └── 001_initial_schema.sql
├── .env.local                         # API keys
├── package.json
├── MASTER_ROADMAP.md                  # THIS FILE (handoff guide)
├── DEPLOYMENT_STATUS.md               # Current deployment state
├── CLAUDE_SESSION_NOTES.md            # Prior session work
└── QUICK_START_BUILD.md               # Step-by-step build guide

sacred-india-mobile/                   # Mobile apps (React Native / Flutter)
├── src/screens/                       # App screens (port from web tabs)
├── src/components/                    # Native components
├── src/services/                      # Shared from web lib/services/
├── src/api.ts                         # Supabase client
└── package.json

```

---

## 🔑 KEY FILES FOR HANDOFF

**MUST READ before starting work:**
1. `MASTER_ROADMAP.md` ← YOU ARE HERE (current status + architecture)
2. `DEPLOYMENT_STATUS.md` ← What's deployed, what's broken
3. `CLAUDE_SESSION_NOTES.md` ← What prior Claude did
4. `QUICK_START_BUILD.md` ← Step-by-step build guide

**MUST UPDATE after finishing work:**
1. `MASTER_ROADMAP.md` ← Update status & next steps
2. `DEPLOYMENT_STATUS.md` ← Update what's live
3. `CLAUDE_SESSION_NOTES.md` ← Document what you did
4. `git commit` + `git push` ← Save to version control

---

## 🎛️ ENVIRONMENT SETUP

### Required API Keys (in .env.local)
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key

# Anthropic (Claude)
ANTHROPIC_API_KEY=your_key

# Razorpay (Payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_key

# Vercel
VERCEL_PROJECT_ID=your_id
VERCEL_ORG_ID=your_id
```

### Getting Keys
- **Supabase:** https://supabase.com/dashboard
- **Anthropic:** https://console.anthropic.com/account/keys
- **Razorpay:** https://dashboard.razorpay.com/
- **Vercel:** https://vercel.com/account

---

## 📞 COMMON COMMANDS

```bash
# Development
npm run dev                 # Start dev server (http://localhost:3000)
npm run build              # Build for production
npm run lint               # Check code quality

# Git
git log --oneline -10      # See recent commits
git status                 # See changes
git diff                   # See what changed
git commit -m "msg"        # Commit
git push origin main       # Deploy to Vercel

# Supabase
# Go to https://supabase.com/dashboard
# Run migrations in SQL Editor
# View data in Table Editor

# Testing
# Use Chrome DevTools
# Test on mobile with: ngrok or Vercel preview
```

---

## ✅ SIGN-OFF CHECKLIST (Before Ending Session)

- [ ] Code committed to Git
- [ ] MASTER_ROADMAP.md updated with current status
- [ ] DEPLOYMENT_STATUS.md updated with what's live
- [ ] CLAUDE_SESSION_NOTES.md updated with session work
- [ ] No console errors in dev server
- [ ] .env.local has all required keys
- [ ] Vercel deployment shows green ✅
- [ ] Next Claude's todo list is clear

---

## 🎬 GETTING STARTED (Next Claude)

1. Clone and install:
   ```bash
   git clone ...
   cd sacred-india
   npm install
   ```

2. Setup environment:
   ```bash
   # Copy keys into .env.local
   cp .env.local.example .env.local
   # Edit .env.local with actual API keys
   ```

3. Read documentation:
   - [ ] MASTER_ROADMAP.md (this file)
   - [ ] DEPLOYMENT_STATUS.md
   - [ ] CLAUDE_SESSION_NOTES.md
   - [ ] QUICK_START_BUILD.md

4. Start coding:
   ```bash
   npm run dev
   # http://localhost:3000
   ```

5. Before ending session:
   - [ ] Update all .md files
   - [ ] Commit and push to Git
   - [ ] Write clear next-steps

---

**This file is the single source of truth for Sacred India development.**  
**Keep it updated. Keep it clear. Keep it current.**

**Next Claude: Start here. Everything you need is documented. 🚀**
