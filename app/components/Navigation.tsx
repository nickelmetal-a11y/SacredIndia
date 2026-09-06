'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/explore', label: 'Explore', icon: '🗺️' },
  { path: '/ai-guide', label: 'AI Guide', icon: '🤖' },
  { path: '/services', label: 'Services', icon: '🛍️' },
  { path: '/texts', label: 'Texts', icon: '📜' },
  { path: '/badges', label: 'Badges', icon: '🏅' },
  { path: '/family', label: 'Family', icon: '👨‍👩‍👧' },
  { path: '/me', label: 'Me', icon: '👤' },
  { path: '/festivals', label: 'Festivals', icon: '🗓️' },
  { path: '/community', label: 'Community', icon: '💬' },
  { path: '/stories', label: 'Stories', icon: '📖' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col bg-[#F8F3EA]">
      <header className="border-b border-[#E7DFD0] px-5 py-6">
        <div className="flex items-center gap-2.5">
          <Lotus />
          <div>
            <h1 className="[font-family:var(--font-serif)] text-2xl font-bold leading-none text-[#2B2118]">
              Sacred India
            </h1>
            <p className="mt-1 text-xs text-[#948573]">Every Faith. Every Site. Every Step.</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 mx-auto max-w-3xl overflow-x-auto border-t border-[#E7DFD0] bg-[#FBF8F2] shadow-[0_-4px_16px_rgba(43,33,24,0.06)]">
        <div className="flex min-w-max gap-2 px-3 py-2.5">
          {TABS.map((tab) => {
            const active = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex flex-col items-center gap-1 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                  active ? 'bg-[#8B6A2E] text-white' : 'bg-[#F1EADC] text-[#5B4E3F] hover:bg-[#E7DFD0]'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
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
    <svg width="28" height="24" viewBox="0 0 32 24" fill="none" stroke="#B8860B" strokeWidth={1.3}>
      <g transform="translate(16,20)">{petals}</g>
    </svg>
  );
}
