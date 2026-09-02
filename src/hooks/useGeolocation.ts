'use client';

import { useEffect, useState } from 'react';

export interface Location {
  lat: number;
  lng: number;
}

export interface GeolocationState {
  location: Location | null;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        loading: false,
        error: 'Geolocation not supported',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          loading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage = 'Failed to get location';
        if (error.code === 1) {
          errorMessage = 'Location permission denied';
        } else if (error.code === 2) {
          errorMessage = 'Location unavailable';
        } else if (error.code === 3) {
          errorMessage = 'Location request timeout';
        }
        setState({
          location: null,
          loading: false,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return state;
};
