# 🙏 Sacred India — Multi-Faith Pilgrimage App

**India's first comprehensive multi-faith pilgrimage application**

85+ sacred sites • 7 religions • WhatsApp remote puja booking • Transport coordination • Verified pandit/guide services

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Start development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) 🎉

---

## ✨ Phase 1 Complete

- ✅ Home page with hero section
- ✅ 85+ sacred sites database
- ✅ Multi-faith support (Hindu, Islam, Christian, Buddhist, Jain, Sikh, Zoroastrian)
- ✅ Search & filtering by religion, state, or keyword
- ✅ Site detail pages with stories, rituals, bookings
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ SEO optimized
- ✅ Ready for Vercel deployment

---

## 📦 What's Inside

```
sacred-india/
├── src/app/              # Pages (home, sites list, site detail)
├── src/components/       # React components
├── src/hooks/           # useSites() hook for data
├── src/data/sites.json  # 85+ sites database
└── src/app/globals.css  # Styling & animations
```

---

## 🔧 Environment Setup

1. Copy `.env.local.example` → `.env.local`
2. Add your credentials for:
   - Firebase (auth & database)
   - Razorpay (payments)
   - Twilio (WhatsApp)
   - SendGrid (emails)
   - Cloudinary (media)

---

## 📱 Available Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero + featured sites |
| All Sites | `/sites` | Browse all 85 sites |
| Site Detail | `/sites/[id]` | Full info + bookings |

---

## 🌍 Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial: Sacred India MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sacred-india.git
git push -u origin main
```

### 2. Connect to Vercel

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repo
- Add `.env.local` variables
- Deploy! 🚀

---

## 🔄 Next Phases

| Phase | When | What |
|-------|------|------|
| **1** | ✅ Done | MVP with 85 sites |
| **2** | Next | Refine UI/components |
| **3** | Week 7-10 | Backend (Firebase) |
| **4** | Week 11-14 | Payments & WhatsApp |
| **5** | Week 15-18 | Booking system |
| **6** | Week 19-22 | QA & testing |
| **7** | Week 23-26 | Marketing launch |
| **8** | Ongoing | Mobile app & growth |

---

## 📞 Questions?

- Check GitHub Issues
- Read full setup guide in `/docs`
- Email: support@sacredindia.app (coming soon)

---

**Made with ❤️ for spiritual seekers. Deployed to Vercel. Built with Next.js 14 + TypeScript + Tailwind CSS.**
