import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorDistortion() {
  return (
    <DemoContainer>
       <svg className="hidden">
        <defs>
          <filter id="distortionFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.005" numOctaves="3" seed="0">
                {/* Animate seed for boiling effect */}
                <animate attributeName="seed" from="0" to="100" dur="1s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>

      <div className="h-full w-full flex items-center justify-center bg-neutral-900 relative overflow-hidden group">
        <div className="relative overflow-hidden cursor-none">
            <img 
                src="https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800&q=80" 
                alt="Distorted"
                className="w-96 h-96 object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                style={{ filter: 'none' }} // applied on hover via class below
            />
            
            {/* The distortion layer - applied on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ filter: 'url(#distortionFilter)' }}>
                 <img 
                    src="https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800&q=80" 
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
        </div>

        <div className="absolute bottom-20 text-center pointer-events-none">
            <h2 className="text-4xl font-black text-white">LIQUID LENS</h2>
            <p className="text-white/40 mt-2">Hover to boil reality</p>
        </div>
      </div>
    </DemoContainer>
  );
}