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
    <div className="flex flex-col min-h-screen max-w-3xl mx-auto bg-white">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2">🛕 Sacred India</h1>
        <p className="text-blue-100 text-sm mt-1">Every Faith. Every Site. Every Step.</p>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-3xl mx-auto bg-white border-t border-gray-200 overflow-x-auto shadow-lg">
        <div className="flex gap-2 px-2 py-2 min-w-max">
          {TABS.map((tab) => (
            <Link
              key={tab.path}
              href={tab.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all whitespace-nowrap text-xs font-semibold ${
                pathname === tab.path ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
