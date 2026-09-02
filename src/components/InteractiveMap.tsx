'use client';

import { useEffect, useRef } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useSites } from '@/hooks/useSites';
import { calculateDistance } from '@/utils/distance';

interface Window {
  google?: any;
}

declare const window: Window;

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const { location, loading: geoLoading, error: geoError } = useGeolocation();
  const { sites, loading: sitesLoading } = useSites();

  useEffect(() => {
    if (!location || !mapRef.current || geoLoading || sitesLoading) return;
    if (!window.google) return;

    const google = window.google;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: location.lat, lng: location.lng },
        mapTypeControl: true,
        zoomControl: true,
        streetViewControl: false,
      });

      new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstanceRef.current,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });
    } else {
      mapInstanceRef.current.setCenter({ lat: location.lat, lng: location.lng });
    }

    const nearbySites = sites
      .map((site) => ({
        ...site,
        distance: calculateDistance(location, { lat: site.lat, lng: site.lng }),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);

    nearbySites.forEach((site) => {
      const infowindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 250px;">
            <p style="margin: 0; font-weight: bold;">${site.emoji} ${site.name}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #666;">${site.subtitle}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #666;">${site.state}</p>
            <a href="/sites/${site.id}" style="color: #d97706; font-size: 12px; text-decoration: none;">View Details →</a>
          </div>
        `,
      });

      const marker = new google.maps.Marker({
        position: { lat: site.lat, lng: site.lng },
        map: mapInstanceRef.current,
        title: site.name,
        icon: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
      });

      marker.addListener('click', () => {
        infowindow.open(mapInstanceRef.current, marker);
      });
    });
  }, [location, sites, geoLoading, sitesLoading]);

  if (geoError) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold">📍 {geoError}</p>
          <p className="text-gray-500 text-sm">Enable location to see the map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg border border-gray-300 overflow-hidden"
      />
      <p className="text-xs text-gray-500 text-center">
        🔵 Your location • 🔴 Sacred Sites
      </p>
    </div>
  );
}
