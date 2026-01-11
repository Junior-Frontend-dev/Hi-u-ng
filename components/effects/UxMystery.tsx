import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxMystery() {
  const [clarity, setClarity] = useState(20); // Blur amount

  const handleClick = () => {
    setClarity(prev => Math.max(0, prev - 5));
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black relative flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <img 
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80" 
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{ filter: `blur(${clarity}px) grayscale(${clarity * 5}%)` }}
        />
        
        <div className="relative z-10 text-center pointer-events-none mix-blend-difference text-white">
            {clarity > 0 ? (
                <>
                    <h2 className="text-4xl font-bold mb-2">???</h2>
                    <p className="opacity-70">Click to investigate</p>
                </>
            ) : (
                <h2 className="text-6xl font-black text-white">REVEALED</h2>
            )}
        </div>
      </div>
    </DemoContainer>
  );
}