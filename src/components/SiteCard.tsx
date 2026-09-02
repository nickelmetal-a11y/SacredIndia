import Link from 'next/link';
import { Site, Religion } from '@/hooks/useSites';

interface SiteCardProps {
  site: Site;
  religion: Religion;
}

export default function SiteCard({ site, religion }: SiteCardProps) {
  return (
    <Link href={`/sites/${site.id}`}>
      <div
        className="group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          backgroundColor: religion.light,
          borderColor: religion.border,
        }}
      >
        {/* Header with religion badge */}
        <div
          className="px-6 py-4"
          style={{ backgroundColor: religion.bg }}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:opacity-80">
                {site.emoji} {site.name}
              </h3>
              <p className="text-sm text-gray-600 italic">{site.subtitle}</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
              style={{ color: religion.color, backgroundColor: `${religion.color}15` }}
            >
              {site.badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {site.desc}
          </p>

          {/* Location & Info */}
          <div className="space-y-2 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span className="text-gray-700">{site.state}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🕉️</span>
              <span className="text-gray-700 font-medium">{site.local}</span>
            </div>
          </div>

          {/* Booking count */}
          <div className="flex items-center gap-2 pt-3 border-t"
            style={{ borderColor: religion.border }}>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold"
              style={{ color: religion.color, backgroundColor: `${religion.color}15` }}
            >
              {site.bookings.length} Services Available
            </span>
          </div>
        </div>

        {/* Footer with CTA */}
        <div
          className="px-6 py-3 border-t text-center font-semibold text-sm transition-colors"
          style={{
            backgroundColor: religion.bg,
            borderColor: religion.border,
            color: religion.color,
          }}
        >
          View Details →
        </div>
      </div>
    </Link>
  );
}
