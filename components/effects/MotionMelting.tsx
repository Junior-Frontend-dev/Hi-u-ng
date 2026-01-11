import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionMelting() {
  const [melting, setMelting] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex items-center justify-center relative overflow-hidden">
        
        {/* SVG Filter */}
        <svg className="hidden">
            <filter id="meltFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
                    <animate attributeName="baseFrequency" dur="10s" values="0.02;0.05;0.02" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale={melting ? "100" : "0"} xChannelSelector="R" yChannelSelector="G">
                    <animate attributeName="scale" to={melting ? "100" : "0"} dur="0.5s" fill="freeze" />
                </feDisplacementMap>
            </filter>
        </svg>

        <div 
            className="bg-gradient-to-br from-pink-500 to-orange-500 p-12 rounded-3xl shadow-2xl text-center"
            style={{ filter: 'url(#meltFilter)' }}
        >
            <h1 className="text-6xl font-black text-white mb-4">MELT ME</h1>
            <button 
                onMouseEnter={() => setMelting(true)}
                onMouseLeave={() => setMelting(false)}
                className="bg-black/20 px-6 py-2 rounded-full text-white backdrop-blur-md border border-white/20 hover:bg-black/40 transition-colors"
            >
                Hover to Dissolve
            </button>
        </div>

      </div>
    </DemoContainer>
  );
}