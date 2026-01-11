import React, { ReactNode } from 'react';

export interface EffectItem {
  id: string;
  title: string;
  description: string;
  component: ReactNode;
  prompt: string;
  icon?: ReactNode;
}

export type ScrollEvent = React.UIEvent<HTMLDivElement>;