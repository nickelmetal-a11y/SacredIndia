# Sacred India — Phase 1+2 MERGED ROADMAP
## Smart, Organized, Fast Build

**Strategy:** Build shared infrastructure once → reuse across features  
**Timeline:** 2-3 weeks (aggressive but realistic)  
**Approach:** Core backend → Frontend tabs → Services → Deploy

---

## 🎯 MERGED EXECUTION PLAN

### **WEEK 1: Foundation & Core Infrastructure**

#### Day 1-2: Setup & Database
- [ ] Initialize Next.js project (full-stack advantage)
- [ ] Setup Supabase PostgreSQL database
- [ ] Create core tables:
  - `sites` (85+ sacred sites with all metadata)
  - `services` (remote puja, prasad, guides)
  - `users` (authentication)
  - `bookings` (transaction history)
  - `festivals` (calendar data)
  - `scriptures` (original language texts)
  - `guides` (verified pandits/khadims)
  - `badges` (user progression)
  - RLS policies for all

#### Day 3-4: Core Services (Build in Parallel)
**Service 1: Panchang Service** (Hindu/Buddhist calendar)
- Calculate tithi, nakshatra, auspicious times
- Hardcode or API integration (timeanddate.com)
- Return JSON: `{ tithi, nakshatra, isAuspicious, nextAuspiciousTime }`

**Service 2: Namaz Service** (Islamic 5 daily prayers)
- Calculate Fajr, Zuhr, Asr, Maghrib, Isha for 7 Indian cities
- Return JSON with prayer times for today/tomorrow

**Service 3: Crowd Intelligence Service**
- Algorithm: day-of-week patterns + festival dates + historical data
- Return: `{ crowdLevel: 'low'|'medium'|'high', bestDays: [...], warnings: [...] }`
- Start simple: hardcoded patterns, can add ML later

**Service 4: AI Guide Service** (Claude Integration)
- Setup Anthropic API (Claude)
- System prompt: "You are a sacred guide for all 7 faiths. Answer questions with citations from original texts."
- Return: `{ answer, citations: [], faith }`

#### Day 5: Frontend Structure
- [ ] Setup 12-tab navigation skeleton
- [ ] Create reusable components:
  - `SiteCard.jsx` (single site detail + booking button)
  - `ServiceCard.jsx` (remote puja, prasad, guides)
  - `FeatureCard.jsx` (generic card with icon + description)
  - `Tab.jsx` (navigation)
  - `Modal.jsx` (booking flow)
  - `NotificationBanner.jsx` (alerts, crowd warnings)

---

### **WEEK 2: Priority Tabs (High-Impact First)**

#### Day 6-7: HOME TAB ✅ (Highest retention)
**MVP Features:**
- [x] GPS detection → nearest sacred site across all 7 faiths
- [x] Live panchang widget (today's tithi, auspicious times)
- [x] Live namaz times (for 7 Indian cities)
- [x] Lamp dedication quick action
- [x] WhatsApp quick action buttons (4 pre-formatted messages)
- [x] Push notification placeholder

**Build order:**
1. Geolocation API → get user lat/long
2. Query sites table, calculate distance
3. Show nearest site with:
   - Name, founding story (first 200 chars)
   - Distance in km
   - "Book Now" button
   - "Share to WhatsApp" button
4. Display panchang + namaz in simple widgets
5. Lamp dedication: tap → type name → show dedication with date/GPS
6. WhatsApp buttons: four hardcoded messages, open WA with pre-filled text

**Quick Wins:**
- Panchang/namaz updates every hour (refresh timer)
- Lamp storage in localStorage (persists across sessions)
- High retention feature ✅

#### Day 8-9: EXPLORE TAB ✅ (Volume of content)
**MVP Features:**
- [x] Show all 85+ sites with cards (paginated or infinite scroll)
- [x] Each card shows: thumbnail, name, distance, faith icon, crowd indicator
- [x] Tap card → expand with full details:
  - Story (founding narrative)
  - Scripture reference (from Texts tab)
  - Crowd intelligence (best/worst days, live indicator)
  - Transport section (expand to show trains, buses, helicopter)
  - Accessibility info (if Senior mode ON)
  - "Book Now" button
  - "Share to WhatsApp" button
- [x] Filters:
  - By faith (7 toggles: Hindu, Islam, Christian, Buddhist, Jain, Sikh, Zoroastrian)
  - By crowd level (Green/Yellow/Red)
  - Senior mode toggle (shows accessibility info)

**Build order:**
1. Query all sites from DB, display in grid
2. Add quick filters (faith, crowd)
3. Tap card → modal with full details
4. Transport dropdown (trains, buses, helicopter)
5. Book button → 4-step booking flow (see Booking Service below)

**Data needed:**
- 85 site descriptions (can start with 20-30, stub rest)
- Transport details per site (train stations, bus routes, helicopter pricing)
- Crowd patterns (simple: "Weekends = crowded, Weekdays = quiet")
- Accessibility info (wheelchair access, steps, doli availability)

#### Day 10: BOOKING INTEGRATION ✅ (Revenue Path)
**Why here:** Every site card has "Book Now" button → needs end-to-end flow

**Booking Flow:**
1. Choose experience (darshan, puja, service)
2. Select date/time
3. Enter details (name, phone, prayer/intention)
4. UPI payment (Razorpay or PhonePe deeplink)
5. WhatsApp confirmation

**Build:**
1. Modal with date picker (React DatePicker)
2. UPI integration (Razorpay API or direct PhonePe/GPay deeplink)
3. On success:
   - Save to bookings table
   - Send WhatsApp with booking details
   - Show confirmation screen

**Code (Pseudo):**
```javascript
// pages/api/booking.js
export async function POST(req) {
  const { siteId, userId, selectedDate, experience } = req.body;
  
  // 1. Save booking
  const booking = await supabase
    .from('bookings')
    .insert([{ site_id: siteId, user_id: userId, date: selectedDate }]);
  
  // 2. Generate WhatsApp message
  const waMessage = `Booking confirmed at ${siteName} on ${selectedDate}`;
  
  // 3. Return Razorpay link
  return { razorpayId, waMessage };
}
```

---

### **WEEK 3: Intelligence & Engagement (Smart Features)**

#### Day 11-12: AI GUIDE TAB ✅ (Differentiation)
**MVP Features:**
- [x] Text input: "Ask anything about sacred sites, history, ritual"
- [x] Voice input: Tap mic → speak in Hindi/English/Tamil/Telugu/Bengali
- [x] Claude AI responds with citations
- [x] Share response to WhatsApp
- [x] Search history (last 10 questions)

**Build:**
1. Setup Anthropic API client (Claude)
2. System prompt:
   ```
   You are a sacred guide for all 7 faiths in India. 
   Answer questions about history, scripture, ritual, timing.
   Cite sources from original texts.
   Keep answers under 300 words.
   ```
3. Input: text or voice (Web Speech API for browser)
4. Output: formatted response with "Cite sources" section
5. Share button → pre-format for WhatsApp

**Code (Pseudo):**
```javascript
// pages/api/ai-guide.js
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req) {
  const { question } = req.body;
  
  const response = await anthropic.messages.create({
    model: "claude-opus-5",
    messages: [
      { role: "user", content: question }
    ],
    system: "You are a sacred guide for all 7 Indian faiths..."
  });
  
  return { answer: response.content[0].text };
}
```

**Voice Input:**
```javascript
// Use Web Speech API (no backend needed for transcription)
const recognition = new webkitSpeechRecognition();
recognition.lang = selectedLanguage; // 'hi-IN', 'en-US', etc.
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  // Send transcript to Claude
};
```

#### Day 13: SERVICES TAB (Monetisation) ✅
**Focus: Remote Puja First** (highest revenue)

**MVP:**
- [x] Show 5 temples with puja options:
  - Kashi Vishwanath (₹1.1K-5.1K)
  - Tirupati (₹3K-7.5K)
  - Ajmer Dargah (₹1.5K-3K)
  - Golden Temple (₹1.1K-2.1K)
  - (1 more)
- [x] Each shows sevas + prices
- [x] "Book Now" → 4-step flow (same as Explore)
- [x] Verified guide badges (show trust)
- [x] WhatsApp booking + video delivery tracking

**Future (Post-MVP):**
- Prasad delivery (complex logistics, skip for now)
- Verified guides marketplace (too much scope)

---

### **WEEK 3-4: Remaining Tabs (Quick Wins)**

#### Day 14: BADGES TAB ✅ (Retention Gamification)
**MVP:**
- [x] 5 tiers: Seeker → Pilgrim → Devotee → Sage → Legend
- [x] Points earn from: site visits, pujas booked, lamps lit
- [x] Show progress bar to next tier
- [x] Share badge to WhatsApp/Instagram

**Build:**
1. Add `user_progression` table:
   - user_id, total_points, tier, faith_track, next_milestone
2. On any action (book puja, light lamp, visit site), +points
3. Nightly job: check if user advanced tier → send notification

#### Day 15: TEXTS TAB ✅ (Content + Audio)
**MVP:**
- [x] Show 7 scriptures (one per faith):
  - Sanskrit Vedas (Rigveda snippet)
  - Quran (Surah Al-Fatiha)
  - Bible (John 3:16)
  - Dhammapada (verse)
  - Jain Mahavira Sutras (verse)
  - Guru Granth Sahib (Mool Mantar)
  - Avesta (Ahuna Vairya)
- [x] Show in original language + English translation
- [x] "Listen" button → text-to-speech (Google Cloud TTS)
- [x] Share verse to WhatsApp

**Data:** Hardcode 3-5 key verses per faith (can expand later)

#### Day 16: ME TAB + SETTINGS ✅
**MVP:**
- [x] User profile (name, faith preference, language)
- [x] Enable daily panchang WhatsApp digest
- [x] Language picker (8 languages)
- [x] Notification preferences
- [x] Sign out

#### Day 17: FESTIVALS TAB ✅
**MVP:**
- [x] Show 20 major festivals (Hindu, Islamic, Christian, Buddhist, Jain, Sikh, Zoroastrian)
- [x] Each festival shows:
  - Date this year + next year
  - Best sites to visit (top 3)
  - Why visit (tradition explanation)
- [x] Filter by faith
- [x] "Add to Calendar" button (Google Calendar API)

**Data:** Hardcode festival list (can auto-generate from DB later)

---

### **WEEK 4: Polish & Deploy**

#### Day 18-19: Admin Dashboard
- [ ] Manage 85 sites (CRUD)
- [ ] Manage services (pujas, prasad, guides)
- [ ] View bookings
- [ ] View payout reports
- [ ] Manage guides (approve, verify, disable)

#### Day 20: Performance & Optimization
- [ ] Image optimization (site thumbnails, guide avatars)
- [ ] API caching (panchang, festivals, sites)
- [ ] Database indexes
- [ ] Mobile responsiveness (Tailwind CSS)
- [ ] Dark mode support

#### Day 21: Deploy to Production
- [ ] Deploy Next.js to Vercel
- [ ] Setup Supabase project
- [ ] Setup Anthropic API key
- [ ] Setup Razorpay API keys
- [ ] Setup WhatsApp Business API (for confirmations)
- [ ] Monitor errors (Sentry)
- [ ] Test end-to-end: Home → Explore → Book → Payment → WhatsApp confirmation

---

## 📊 **SHARED INFRASTRUCTURE (Build Once, Reuse)**

### Database Tables (Single Schema)
```sql
-- Core data
sites (id, name, faith, story, latitude, longitude, distance)
services (id, site_id, type, title, price, description)
festivals (id, name, faith, date, best_sites)
scriptures (id, faith, title, original_text, english_translation, audio_url)
guides (id, name, type, phone, rating, verified_badge)

-- User data
users (id, email, name, faith_preference, language)
bookings (id, user_id, site_id, service_id, date, status)
user_progression (user_id, points, tier, faith_track)

-- Analytics
events (user_id, event_type, site_id, timestamp)
```

### Services (Microservices Pattern)
1. **PanchagService** → tithi, nakshatra calculations
2. **NamazService** → 5 daily prayer times per city
3. **CrowdService** → best/worst days, live indicator
4. **AIGuideService** → Claude integration
5. **WhatsAppService** → message formatting + deeplinks
6. **PaymentService** → Razorpay integration
7. **ProgressionService** → badge/tier calculations

### Frontend Components (Reusable)
1. `SiteCard` → Explore, Home, Festivals
2. `ServiceCard` → Services tab
3. `BookingModal` → Every "Book Now" button
4. `WhatsAppButton` → Every card (consistency)
5. `PanchagWidget` → Home tab
6. `CrowdIndicator` → Explore, Festivals
7. `NotificationBanner` → Alerts

---

## ✅ **PRIORITIZED FEATURES (MVP Focus)**

### Must-Have (Days 1-14)
- [x] Home tab (GPS, panchang, lamp, WA shortcuts)
- [x] Explore tab (85 sites, filters, crowds, transport)
- [x] Booking flow (UPI payment, WA confirmation)
- [x] AI Guide (Claude Q&A + voice)
- [x] Remote Puja Service (5 temples, 11 sevas)
- [x] Badges & progression
- [x] Authentication (email/phone)

### Should-Have (Days 15-19)
- [ ] Texts tab (7 scriptures + audio)
- [ ] Festivals tab (calendar + best sites)
- [ ] Me tab (profile + preferences)
- [ ] Family planner (group type selector, filters)
- [ ] Daily panchang digest (WhatsApp subscription)

### Nice-to-Have (Post-Launch)
- [ ] Prasad delivery (complex logistics)
- [ ] Community stories & testimonials
- [ ] Verified guides marketplace
- [ ] Advanced crowd prediction (ML)
- [ ] Multiple payment methods

---

## 📈 **LAUNCH STRATEGY**

### Week 4 Evening: Soft Launch
- Deploy to production (Vercel)
- Test all 12 tabs
- Fix critical bugs
- Share with 50-100 beta users (friends, family, communities)

### Week 5: Feedback & Iteration
- Collect user feedback
- Track analytics (most visited tabs, bookings)
- Fix UX issues
- Improve content (fix bad site descriptions, transport data)

### Week 6: Full Launch
- Marketing campaign
- Press release
- Social media launch
- Target: NRI diaspora + local pilgrims

---

## 💾 **TECH STACK (Optimized)**

**Frontend:** Next.js 14 + React 19 + Tailwind CSS
**Backend:** Next.js API routes (serverless)
**Database:** Supabase (PostgreSQL)
**AI:** Anthropic Claude API
**Payments:** Razorpay
**WhatsApp:** WhatsApp Business API (setup later)
**Hosting:** Vercel (auto-deploy from Git)
**Monitoring:** Sentry + Vercel Analytics

---

## 🎯 **SUCCESS METRICS**

- [ ] 12 tabs fully functional
- [ ] 85+ sites in database with transport/accessibility info
- [ ] 100+ users in first week
- [ ] 10+ remote puja bookings (revenue validation)
- [ ] 50+ "Thank you" messages on WhatsApp (retention signal)
- [ ] 4.8+ rating on App Store (future)

---

**Ready to build? Let's start with Day 1-2: Setup & Database** 🚀
