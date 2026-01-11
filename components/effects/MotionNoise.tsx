import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionNoise() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 relative flex items-center justify-center overflow-hidden">
        
        <svg className="hidden">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch">
                    <animate attributeName="seed" from="0" to="100" dur="2s" repeatCount="indefinite"/>
                </feTurbulence>
                <feColorMatrix type="saturate" values="0"/>
            </filter>
        </svg>

        {/* Animated Noise Layer */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay">
             <div className="w-full h-full" style={{ filter: 'url(#noiseFilter)' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-20 p-12 bg-black/80 backdrop-blur-xl border border-white/10 max-w-md shadow-2xl">
            <div className="w-12 h-1 bg-white mb-6 animate-pulse"></div>
            <h2 className="text-4xl font-bold text-white mb-4">Live Static</h2>
            <p className="text-gray-400 leading-relaxed">
                Using <code>&lt;animate&gt;</code> on the seed attribute of an SVG <code>feTurbulence</code> filter creates true, generated static noise without large GIFs.
            </p>
        </div>
      </div>
    </DemoContainer>
  );
}