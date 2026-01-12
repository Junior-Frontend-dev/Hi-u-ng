export interface EffectItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export interface EffectParams {
  speed: number;
  intensity: number;
  color: string;
}

export interface StoreState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  params: EffectParams;
  updateParams: (newParams: Partial<EffectParams>) => void;
}
