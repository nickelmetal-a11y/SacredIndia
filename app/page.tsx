import { Playfair_Display, Inter } from 'next/font/google';

/**
 * Sacred India — Home tab
 *
 * This is your existing page.tsx (Nearest Sacred Site / Panchang / Prayer
 * Times / Stats) reskinned into the cream + gold + serif design system from
 * the reference screenshot. Content and structure are unchanged — same
 * Kashi Vishwanath data, same Pratipada tithi, same five prayer times, same
 * stats footer. Only the visual language changed.
 *
 * Dropped 'use client' — nothing here reads state or handles events, so this
 * can render as a server component. Add 'use client' back if you wire up
 * interactivity (tapping the site card, live-updating times, etc.).
 */

const serif = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-serif',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const NEAREST_SITE = {
  name: 'Kashi Vishwanath',
  city: 'Varanasi, Uttar Pradesh',
  distance: '2.3 km away',
  crowd: 'Medium crowd',
  description:
    'Ancient temple of Lord Shiva on the banks of the Ganges. Sacred for 800+ years of continuous worship.',
};

const PANCHANG = {
  tithi: 'Pratipada',
  auspiciousTime: '6:00 AM – 12:00 PM',
  note: 'Auspicious today',
};

const PRAYERS = [
  { name: 'Fajr', time: '4:30' },
  { name: 'Zuhr', time: '12:30' },
  { name: 'Asr', time: '4:30' },
  { name: 'Maghrib', time: '7:45' },
  { name: 'Isha', time: '9:15' },
];

const STATS = [
  { value: '85+', label: 'Sacred Sites' },
  { value: '7', label: 'Faiths' },
  { value: '4.9', label: 'Rating' },
];

export default function Home() {
  return (
    <div
      className={`${serif.variable} ${sans.variable} min-h-screen bg-[var(--si-cream)] text-[var(--si-ink)] [font-family:var(--font-sans)]`}
    >
      {/* header */}
      <header className="px-4 py-8">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Lotus />
          <div>
            <h1 className="[font-family:var(--font-serif)] text-4xl font-bold leading-none text-[var(--si-ink)]">
              Sacred India
            </h1>
            <p className="mt-1.5 text-sm text-[var(--si-muted)]">Discover pilgrimage sites across 7 faiths</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-8 px-4 pb-16">
        {/* nearest sacred site */}
        <section className="overflow-hidden rounded-2xl border border-[var(--si-line)] bg-white">
          <div
            className="relative flex h-28 items-end"
            style={{ backgroundImage: 'linear-gradient(150deg,#F3D9A0,#C9862F 60%,#8B5A2B)' }}
          >
            <span className="absolute -bottom-3 -right-2 text-[92px] leading-none opacity-25">🛕</span>
            <span className="relative z-10 m-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              Nearest Sacred Site
            </span>
          </div>
          <div className="p-6">
            <h2 className="[font-family:var(--font-serif)] text-2xl font-bold text-[var(--si-ink)]">
              {NEAREST_SITE.name}
            </h2>
            <p className="mt-0.5 text-sm text-[var(--si-muted)]">{NEAREST_SITE.city}</p>

            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 font-medium text-[var(--si-ink-soft)]">
                <PinIcon color="var(--si-muted)" className="h-3.5 w-3.5" />
                {NEAREST_SITE.distance}
              </span>
              <span className="flex items-center gap-1 font-medium text-[var(--si-amber)]">
                <PeopleIcon className="h-3.5 w-3.5" />
                {NEAREST_SITE.crowd}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[var(--si-ink-soft)]">{NEAREST_SITE.description}</p>
          </div>
        </section>

        {/* panchang */}
        <section className="rounded-2xl p-6" style={{ background: 'var(--si-tile-peach)' }}>
          <h2 className="mb-4 flex items-center gap-2 [font-family:var(--font-serif)] text-xl font-bold text-[var(--si-ink)]">
            <span className="text-lg">☀️</span> Panchang
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--si-muted)]">Tithi</p>
              <p className="mt-0.5 text-base font-medium text-[var(--si-ink)]">{PANCHANG.tithi}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--si-muted)]">Auspicious time</p>
              <p className="mt-0.5 text-base font-medium text-[var(--si-ink)]">{PANCHANG.auspiciousTime}</p>
            </div>
          </div>
          <p className="mt-4 text-xs font-semibold text-[var(--si-green)]">{PANCHANG.note}</p>
        </section>

        {/* prayer times */}
        <section className="rounded-2xl p-6" style={{ background: 'var(--si-tile-mint)' }}>
          <h2 className="mb-4 flex items-center gap-2 [font-family:var(--font-serif)] text-xl font-bold text-[var(--si-ink)]">
            <span className="text-lg">🌙</span> Prayer Times <span className="text-sm font-normal text-[var(--si-ink-soft)]">(Delhi)</span>
          </h2>
          <div className="grid grid-cols-5 gap-2 text-center">
            {PRAYERS.map((p) => (
              <div key={p.name}>
                <p className="text-xs text-[var(--si-ink-soft)]">{p.name}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--si-ink)]">{p.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* stats */}
        <section className="border-t pt-8" style={{ borderColor: 'var(--si-line)' }}>
          <div className="grid grid-cols-3 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="[font-family:var(--font-serif)] text-3xl font-bold text-[var(--si-gold-deep)]">{s.value}</p>
                <p className="mt-1 text-xs text-[var(--si-muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx global>{`
        :root {
          --si-cream: #f8f3ea;
          --si-cream-2: #fbf8f2;
          --si-ink: #2b2118;
          --si-ink-soft: #5b4e3f;
          --si-muted: #948573;
          --si-line: #e7dfd0;
          --si-gold: #b8860b;
          --si-gold-deep: #8b6a2e;
          --si-amber: #c9821b;
          --si-red: #d24b4b;
          --si-green: #4c9a5b;
          --si-tile-peach: #f7dfc4;
          --si-tile-mint: #d9ebdd;
          --si-tile-pink: #f6d9d6;
          --si-tile-lav: #e3dcf3;
        }
      `}</style>
    </div>
  );
}

function Lotus() {
  const petals = [-40, -19, 0, 19, 40].map((deg, i) => {
    const rx = i === 2 ? 3.7 : i === 1 || i === 3 ? 3.5 : 3.2;
    const ry = i === 2 ? 11 : i === 1 || i === 3 ? 10 : 9;
    return <ellipse key={deg} cx={0} cy={-ry} rx={rx} ry={ry} transform={`rotate(${deg})`} />;
  });
  return (
    <svg width="36" height="30" viewBox="0 0 32 24" fill="none" stroke="var(--si-gold)" strokeWidth={1.3}>
      <g transform="translate(16,20)">{petals}</g>
    </svg>
  );
}

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="8" cy="8" r="3.4" />
      <circle cx="17" cy="9" r="2.8" />
      <path d="M2 21c0-3.6 3-5.8 6-5.8s6 2.2 6 5.8M13 21c0-3-2.3-5-5-5" />
    </svg>
  );
}

function PinIcon({ color = '#fff', className }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Z" />
    </svg>
  );
}
