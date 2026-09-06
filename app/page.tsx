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
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8 text-[#2B2118]">
      {/* nearest sacred site */}
      <section className="overflow-hidden rounded-2xl border border-[#E7DFD0] bg-white">
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
          <h2 className="[font-family:var(--font-serif)] text-2xl font-bold text-[#2B2118]">
            {NEAREST_SITE.name}
          </h2>
          <p className="mt-0.5 text-sm text-[#948573]">{NEAREST_SITE.city}</p>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 font-medium text-[#5B4E3F]">
              <PinIcon color="#948573" className="h-3.5 w-3.5" />
              {NEAREST_SITE.distance}
            </span>
            <span className="flex items-center gap-1 font-medium text-[#C9821B]">
              <PeopleIcon className="h-3.5 w-3.5" />
              {NEAREST_SITE.crowd}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#5B4E3F]">{NEAREST_SITE.description}</p>
        </div>
      </section>

      {/* panchang */}
      <section className="rounded-2xl bg-[#F7DFC4] p-6">
        <h2 className="mb-4 flex items-center gap-2 [font-family:var(--font-serif)] text-xl font-bold">
          <span className="text-lg">☀️</span> Panchang
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#948573]">Tithi</p>
            <p className="mt-0.5 text-base font-medium">{PANCHANG.tithi}</p>
          </div>
          <div>
            <p className="text-xs text-[#948573]">Auspicious time</p>
            <p className="mt-0.5 text-base font-medium">{PANCHANG.auspiciousTime}</p>
          </div>
        </div>
        <p className="mt-4 text-xs font-semibold text-[#4C9A5B]">{PANCHANG.note}</p>
      </section>

      {/* prayer times */}
      <section className="rounded-2xl bg-[#D9EBDD] p-6">
        <h2 className="mb-4 flex items-center gap-2 [font-family:var(--font-serif)] text-xl font-bold">
          <span className="text-lg">🌙</span> Prayer Times{' '}
          <span className="text-sm font-normal text-[#5B4E3F]">(Delhi)</span>
        </h2>
        <div className="grid grid-cols-5 gap-2 text-center">
          {PRAYERS.map((p) => (
            <div key={p.name}>
              <p className="text-xs text-[#5B4E3F]">{p.name}</p>
              <p className="mt-1 text-sm font-semibold">{p.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* stats */}
      <section className="border-t border-[#E7DFD0] pt-8">
        <div className="grid grid-cols-3 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="[font-family:var(--font-serif)] text-3xl font-bold text-[#8B6A2E]">{s.value}</p>
              <p className="mt-1 text-xs text-[#948573]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
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
