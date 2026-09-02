import { useEffect, useState } from 'react';
import sitesData from '@/data/sites.json';
import { getDefaultPaths } from '@/utils/defaultPaths';

export interface Religion {
  label: string;
  native: string;
  color: string;
  bg: string;
  border: string;
  emoji: string;
  light: string;
}

export interface Scripture {
  orig: string;
  eng: string;
  src: string;
}

export interface Spot {
  name: string;
  local: string;
  dist: string;
  hours: string;
  open: boolean;
  ritual: string;
}

export interface Booking {
  name: string;
  local: string;
  price: number;
  slot: string;
  duration: string;
  desc: string;
  advance: string;
  dress: string;
}

export interface Waypoint {
  name: string;
  lat: number;
  lng: number;
  dist: string;
  time: string;
}

export interface Path {
  type: 'elderly' | 'adventure';
  label: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  distance: string;
  duration: string;
  elevation?: string;
  description: string;
  waypoints: Waypoint[];
  amenities: string[];
}

export interface Site {
  id: string;
  religion: string;
  name: string;
  subtitle: string;
  local: string;
  lat: number;
  lng: number;
  state: string;
  badge: string;
  emoji: string;
  desc: string;
  story: string;
  scripture: Scripture;
  spots: Spot[];
  bookings: Booking[];
  paths?: Path[];
}

export interface SitesData {
  religions: Record<string, Religion>;
  sites: Site[];
  metadata: {
    totalSites: number;
    lastUpdated: string;
    version: string;
    religions: number;
  };
}

export const useSites = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [religions, setReligions] = useState<Record<string, Religion>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = sitesData as unknown as SitesData;
      const sitesWithPaths = data.sites.map((site) => ({
        ...site,
        paths: site.paths || getDefaultPaths(site.name, { lat: site.lat, lng: site.lng }),
      }));
      setSites(sitesWithPaths);
      setReligions(data.religions);
      setLoading(false);
    } catch (error) {
      console.error('Error loading sites:', error);
      setLoading(false);
    }
  }, []);

  const getSiteById = (id: string): Site | undefined => {
    return sites.find(site => site.id === id);
  };

  const getSitesByReligion = (religion: string): Site[] => {
    return sites.filter(site => site.religion === religion);
  };

  const searchSites = (query: string): Site[] => {
    const q = query.toLowerCase();
    return sites.filter(site =>
      site.name.toLowerCase().includes(q) ||
      site.subtitle.toLowerCase().includes(q) ||
      site.state.toLowerCase().includes(q) ||
      site.badge.toLowerCase().includes(q)
    );
  };

  const filterByState = (state: string): Site[] => {
    return sites.filter(site => site.state === state);
  };

  return {
    sites,
    religions,
    loading,
    getSiteById,
    getSitesByReligion,
    searchSites,
    filterByState,
  };
};
