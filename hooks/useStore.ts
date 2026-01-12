import { useState, useEffect } from 'react';
import { EffectParams } from '../types';

const DEFAULT_PARAMS: EffectParams = {
  speed: 1,
  intensity: 1,
  color: '#EF4444', // Red-500
};

export function useStore() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('vn_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [params, setParams] = useState<EffectParams>(DEFAULT_PARAMS);

  useEffect(() => {
    localStorage.setItem('vn_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const updateParams = (newParams: Partial<EffectParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    favorites,
    toggleFavorite,
    params,
    updateParams
  };
}
