# 🙏 Sacred India — Claude Sync File

**Last Updated**: September 2, 2026  
**Current Instance**: Windows (Claude Code)  
**Synced Instances**: Windows + MacBook  

---

## 📍 CURRENT STATUS

### ✅ What's Done
- Next.js 14 project initialized
- 85+ sacred sites database (sites.json)
- 7-religion multi-faith support
- Home page with hero section
- Sites listing page with search/filter
- Site detail pages structure
- Responsive design setup
- SEO optimization
- Git initialized with commits
- Vercel configuration ready
- Google API keys obtained (AIzaSyAFrTo5KMWTkvS5RgX1HHutM2_JtAlklL0)
- `.env.local` configured with API key
- Dev server running at localhost:3000

### 🔴 Current Issues
- **Build Error**: `Module not found: '@/components/SiteCard'`
  - SiteCard component exists but import path may be wrong
  - Need to verify component location and fix import in app/page.tsx
  - Error shows at line 6 of app/page.tsx

### ⏳ What's Next (Week 1)
- Fix SiteCard import error
- Build GPS proximity discovery
- Add geolocation hook
- Create distance calculation utility
- Build InteractiveMap component
- Build NearbySites component

---

## 📂 Project Structure

```
sacred-india/
├── app/                          # Default Next.js app folder
│   ├── page.tsx                 # Home page (JUST REPLACED - may have issues)
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── src/                          # Source folder (created earlier)
│   ├── app/
│   │   ├── page.tsx             # Original home page (working version)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── sites/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   ├── components/
│   │   ├── SiteCard.tsx         # ← Import error comes from here
│   │   ├── site/
│   ├── hooks/
│   │   └── useSites.ts
│   ├── data/
│   │   └── sites.json           # 85 sites data
│   └── types/
├── public/
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── .env.local                    # ✅ CONFIGURED with API key
├── vercel.json
├── README.md
├── QUICK_START.md
├── SETUP_GUIDE.md
├── PHASE_1_IMPLEMENTATION.md
├── PHASE_1_CHECKLIST.md
├── ROADMAP_SUMMARY.md
└── SACRED_CLAUDE.md             # ← THIS FILE (sync between instances)
```

---

## 🔧 How to Sync Between Windows & MacBook

### On Windows (After work):
1. Save all changes
2. Run: `git add . && git commit -m "WIP: description"`
3. Update this file with current status
4. Git push to GitHub
5. Note any open issues in this file

### On MacBook (When switching):
1. Git pull latest code
2. Read this SACRED_CLAUDE.md file
3. See "Current Issues" section
4. Install dependencies if needed: `npm install`
5. Run dev server: `npm run dev`
6. Start from where Windows left off

---

## 🐛 IMMEDIATE FIX NEEDED

### Issue: Module not found: '@/components/SiteCard'

**Problem**: 
- app/page.tsx imports SiteCard from '@/components/SiteCard'
- Component might be in src/components/SiteCard.tsx
- Path alias `@/` might be resolving to wrong directory

**Solution**:
1. Check tsconfig.json for path alias
2. Verify SiteCard.tsx exists and location
3. Fix import path in app/page.tsx
4. OR copy working page.tsx from src/app/page.tsx to app/page.tsx

**Status**: ⏳ NEEDS FIX

---

## 🔑 Environment Setup

### `.env.local` (Already Configured)
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAFrTo5KMWTkvS5RgX1HHutM2_JtAlklL0
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyAFrTo5KMWTkvS5RgX1HHutM2_JtAlklL0
NEXT_PUBLIC_APP_NAME=Sacred India
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Google Cloud Project
- Project ID: `magnetic-cairn-376317`
- APIs Enabled: Maps JavaScript API ✅, Places API ✅
- API Key: AIzaSyAFrTo5KMWTkvS5RgX1HHutM2_JtAlklL0

---

## 📋 Week 1 Tasks (GPS Discovery)

### Task Checklist
- [ ] Fix SiteCard import error
- [ ] Create `useGeolocation.ts` hook (get user GPS)
- [ ] Create `distance.ts` utility (calculate distance)
- [ ] Create `NearbySites.tsx` component (show nearby sites)
- [ ] Create `InteractiveMap.tsx` component (Google Maps)
- [ ] Update home page with map section
- [ ] Test with GPS at localhost:3000
- [ ] Fix any console errors
- [ ] Ready for Week 2

### Dependencies Already Added
```bash
npm install @react-google-maps/api haversine
```

### Still Need to Install
```bash
npm install next-i18next i18next  # For Phase 1 Week 4
```

---

## 🚀 Quick Commands (Both Instances)

```bash
# Navigate to project
cd sacred-india

# Start dev server
npm run dev

# View at localhost:3000

# Run tests (if needed)
npm run test

# Build for production
npm run build

# Git status
git status

# Git commit
git commit -m "description"

# Git push to GitHub
git push origin main
```

---

## 📱 UI Mockups Created

4 interactive mobile screen mockups showing:
1. Home with nearby sites + GPS map
2. Site detail with elderly/youth path selection
3. Language toggle (EN / हिंदी)
4. Toilet finder with ratings

Location: Shared in conversation (visible in mockups section above)

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `QUICK_START.md` | 5-min quick reference |
| `SETUP_GUIDE.md` | Deployment to Vercel |
| `PHASE_1_IMPLEMENTATION.md` | Week-by-week breakdown |
| `PHASE_1_CHECKLIST.md` | Developer checklist |
| `ROADMAP_SUMMARY.md` | Full 2-year roadmap |
| `SACRED_CLAUDE.md` | THIS FILE (sync between instances) |

---

## 🔄 Sync Workflow

### Before leaving Windows:
```bash
# 1. Check status
git status

# 2. Add changes
git add .

# 3. Commit with WIP if not done
git commit -m "WIP: GPS discovery work in progress"

# 4. Push to GitHub
git push origin main

# 5. Update this file's "Last Updated" timestamp
```

### When switching to MacBook:
```bash
# 1. Pull latest
git pull origin main

# 2. Check this file for current status
cat SACRED_CLAUDE.md

# 3. Install deps if first time
npm install

# 4. Start dev server
npm run dev

# 5. Fix any issues noted in "Current Issues" section
```

---

## 🎯 Phase 1 Goals

**Duration**: 4 weeks  
**Current**: Week 1 (GPS Discovery) - IN PROGRESS

### Week 1: GPS Discovery ⏳
- User location detection (GPS)
- Show 5 nearest sites
- Distance calculation
- Walking time estimates
- Interactive map

### Week 2: Accessibility Paths
- Elderly-friendly routes
- Adventure routes
- Path difficulty badges

### Week 2-3: Toilet Finder
- Find nearby clean toilets
- Ratings system
- Cost indicators

### Week 3-4: Multi-Language
- English support ✅
- हिंदी support
- Language toggle

---

## 🎁 Key Deliverables

**When Phase 1 Complete**:
- Users can find nearby sacred sites with GPS
- Choose elderly-friendly or adventure routes
- Find clean toilets with ratings
- Use app in English or हिंदी
- Ready to deploy to Vercel

**Phase 2** (After Phase 1):
- Booking system
- Payment integration
- WhatsApp video delivery

---

## 📞 Notes for Both Instances

- **Windows**: Primary dev machine
- **MacBook**: Secondary/portable work
- **GitHub**: Single source of truth (branch: main)
- **Vercel**: Auto-deploys from main branch when ready
- **Data**: All 85 sites in `src/data/sites.json` (synced via git)

---

## 🔐 Sensitive Files (Don't Commit)

Already in `.gitignore`:
- `.env.local` (but copy from template)
- `node_modules/`
- `.next/`

---

## ✨ Last Actions Before Switching

**On Windows (before MacBook work):**
1. Save all files
2. Run `npm run dev` test
3. Check console for errors
4. Note any issues in "Current Issues" section above
5. Git commit: `git commit -m "Status: Week 1 GPS work - [issue description]"`
6. Git push: `git push origin main`
7. Update "Last Updated" timestamp above

**On MacBook (after pulling):**
1. `git pull origin main`
2. `npm install` (if needed)
3. `npm run dev`
4. Read "Current Issues" section
5. Continue from where Windows left off

---

**Version**: 1.0  
**Created**: Sept 2, 2026  
**Status**: IN PROGRESS - Week 1 GPS Discovery  

🙏 Keep building!
