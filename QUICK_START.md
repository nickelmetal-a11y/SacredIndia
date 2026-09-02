# ⚡ Sacred India — Quick Start (5 minutes)

## For Testing Locally

```bash
# 1. Enter project directory
cd sacred-india

# 2. Start development server
npm run dev

# 3. Open browser
# → http://localhost:3000
```

Done! 🎉

---

## For Deployment to Vercel

```bash
# 1. Push to GitHub (one-time)
git remote add origin https://github.com/YOUR_USERNAME/sacred-india.git
git branch -M main
git push -u origin main

# 2. Go to Vercel
# → https://vercel.com/new
# → Click "Import from GitHub"
# → Select sacred-india repo
# → Click "Deploy"

# 3. Wait 1-2 minutes
# Your app is now live! 🚀
```

---

## File Structure (Important)

```
sacred-india/
├── src/app/              ← Pages
│   ├── page.tsx         ← Home (/)
│   ├── sites/page.tsx   ← All sites (/sites)
│   └── sites/[id]/page.tsx ← Site detail (/sites/varanasi)
├── src/components/       ← React components
│   └── SiteCard.tsx     ← Site card component
├── src/hooks/           ← Hooks
│   └── useSites.ts      ← Fetch sites data
├── src/data/            ← Database
│   └── sites.json       ← 85+ sites
└── public/              ← Static files
```

---

## Common Commands

```bash
npm run dev      # Start development (http://localhost:3000)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Check code quality
```

---

## Features Ready to Use

✅ **Home Page**
- Hero section with animation
- Religion filter (7 options)
- Featured sites preview

✅ **Sites Listing** (`/sites`)
- All 85 sites
- Search by name
- Filter by religion
- Filter by state

✅ **Site Details** (`/sites/:id`)
- Full description
- Sacred story
- Scripture (original + translation)
- Key spots to visit
- Available bookings with prices

---

## Next Actions (Pick One)

### Option 1: Deploy Immediately ⚡
- Push to GitHub
- Connect to Vercel
- Share live URL (takes 5 min)
- Read: `SETUP_GUIDE.md`

### Option 2: Customize First 🎨
- Add your branding
- Adjust colors/fonts
- Add more sites
- Then deploy

### Option 3: Build Phase 2 🔨
- Add site images
- Improve animations
- Add testimonials
- Build booking flow

---

## Environment Variables

Only needed for advanced features (Phase 3+):

```bash
# Copy template
cp .env.local.example .env.local

# Add credentials later for:
# - Firebase (authentication)
# - Razorpay (payments)
# - Twilio (WhatsApp)
# - Etc.
```

**For now:** Leave empty, everything works locally!

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm install` fails | Delete `node_modules` & `package-lock.json`, try again |
| Port 3000 in use | Change to port 3001: `npm run dev -- -p 3001` |
| Build fails | Check terminal errors, try `npm run build` locally |
| Sites not showing | Verify `src/data/sites.json` exists and is valid JSON |

---

## URLs You Need

- **Local Development**: http://localhost:3000
- **GitHub Repo**: https://github.com/YOUR_USERNAME/sacred-india
- **Vercel Deploy**: https://vercel.com/new
- **Live App** (after deploy): https://sacred-india-xyz.vercel.app

---

## What's Next?

### This Week
- [ ] Run locally: `npm run dev`
- [ ] Push to GitHub
- [ ] Deploy to Vercel

### Next Week (Phase 2)
- [ ] Add site photos
- [ ] Improve UI animations
- [ ] Add testimonials section
- [ ] Mobile optimization

### Following Week (Phase 3)
- [ ] Setup Firebase
- [ ] User authentication
- [ ] Booking database

---

## Questions?

1. **How do I add more sites?**
   - Edit `src/data/sites.json`
   - Follow the same structure
   - Restart dev server

2. **How do I change colors?**
   - Edit religion colors in `src/data/sites.json` 
   - Or modify Tailwind in `tailwind.config.ts`

3. **How do I add booking functionality?**
   - Coming in Phase 4+
   - Need Firebase + Razorpay setup

4. **How do I customize the homepage?**
   - Edit `src/app/page.tsx`
   - Changes appear live (hot reload)

---

**You're all set!** 🙏

Next: `npm run dev` and explore your app!
