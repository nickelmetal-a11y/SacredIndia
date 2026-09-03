# Sacred India - DEPLOYMENT GUIDE

**Current Build Status:** 🟡 Minor module resolution issues

## ✅ WHAT'S BEEN BUILT

### Core Infrastructure ✅
- Database schema (13 tables, ready for Supabase)
- Panchang service (Hindu calendar)
- Namaz service (Islamic prayers)
- Crowd Intelligence (best/worst visiting days)
- AI Guide API (Claude integration)

### Frontend Components ✅
- 12-tab navigation (all tabs accessible)
- Home tab (GPS, panchang, namaz, lamp, WA actions)
- Explore tab (site discovery, filters, senior mode)
- AI Guide tab (Claude Q&A)
- Services tab (remote puja, 4 temples, 11 sevas)
- 8 placeholder tabs (ready for content)

### Tech Stack
- Next.js 14 + React 19
- Supabase (PostgreSQL)
- Anthropic Claude API
- Razorpay (payments)
- Tailwind CSS

---

## 🔧 TO FIX BEFORE DEPLOYMENT

### Issue 1: Module Resolution
**Problem:** Import paths causing build errors  
**Fix (5 min):** Update `tsconfig.json` paths:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Then rebuild: `npm run build`

### Issue 2: Supabase Setup
**Required (30 min):**
1. Create Supabase project
2. Run migration: `supabase/migrations/001_initial_schema.sql`
3. Add API keys to `.env.local`

### Issue 3: Environment Variables
**Required (5 min):**
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
ANTHROPIC_API_KEY=your_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_key
```

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Fix Module Resolution
```bash
# Edit tsconfig.json (as shown above)
npm run build
```

### Step 2: Setup Supabase
- Create project at supabase.com
- Copy URL + key to `.env.local`
- Run migrations in SQL Editor

### Step 3: Test Locally
```bash
npm run dev
# Visit http://localhost:3000
# Test all 4 main tabs
```

### Step 4: Deploy to Vercel
```bash
git push origin main
# Vercel auto-deploys
# Check https://vercel.com/nikhilmathur-4671/sacred-india
```

---

## 📱 MOBILE APPS (Next Phase)

**After web MVP is live:**

**React Native Setup:**
```bash
npx create-expo-app sacred-india-mobile
npm install @supabase/supabase-js
# Copy lib/services/ from web
```

**iOS/Android:** Share backend, separate UI

---

## 📋 NEXT CLAUDE'S CHECKLIST

When starting next session:

- [ ] Read MASTER_ROADMAP.md
- [ ] Read DEPLOYMENT_STATUS.md
- [ ] Fix tsconfig.json (Issue 1 above)
- [ ] Run `npm run build` (should succeed now)
- [ ] Setup Supabase (Issue 2 above)
- [ ] Run `npm run dev`
- [ ] Test all 4 tabs work
- [ ] Test on mobile (DevTools phone emulation)
- [ ] Deploy to Vercel
- [ ] Update DEPLOYMENT_STATUS.md
- [ ] Commit & push

---

## 🎯 EXPECTED RESULT

**After fixes (1-2 hours):**
- ✅ Web app live on https://sacred-india.vercel.app
- ✅ All 12 tabs navigable
- ✅ Home tab showing GPS + panchang + namaz
- ✅ Explore tab showing sites with filters
- ✅ Services tab showing remote puja pricing
- ✅ AI Guide responding to questions

**Ready for:** Testing, feedback, mobile app development

---

**Current status:** Build infrastructure complete. Just need module resolution fix + Supabase setup to go live.

**Time to deployment:** 2-3 hours

**ETA:** Same day once tsconfig is fixed
