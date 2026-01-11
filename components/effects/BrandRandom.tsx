import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

const ANIMATIONS = [
    'animate-bounce',
    'animate-spin',
    'animate-pulse',
    'animate-ping'
];

export default function BrandRandom() {
  const [anim, setAnim] = useState('');

  const randomize = () => {
    const randomAnim = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
    setAnim(''); // Reset
    setTimeout(() => setAnim(randomAnim), 50);
  };

  useEffect(randomize, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center">
        <div className={`w-32 h-32 bg-indigo-500 rounded-xl flex items-center justify-center text-4xl font-bold text-white shadow-lg ${anim}`}>
            ?
        </div>
        
        <button 
            onClick={randomize}
            className="mt-12 flex items-center gap-2 text-white/50 hover:text-white"
        >
            <RefreshCcw size={16} /> Randomize Intro
        </button>
      </div>
    </DemoContainer>
  );
}