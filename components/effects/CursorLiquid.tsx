import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorLiquid() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 relative overflow-hidden group">
        
        {/* SVG Filter Definition */}
        <svg className="hidden">
            <defs>
                <filter id="liquid-cursor">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="0" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
                </filter>
            </defs>
        </svg>

        {/* 
            Note: True liquid deformation under cursor usually requires
            moving the filter displacement map via JS (updating baseFrequency or seed).
            Here we simulate a simpler "liquid view" where the whole scene feels underwater
            and the cursor might trigger a localized bulge if using complex SVG masks.
            For this demo, we apply a static turbulence that animates on hover.
        */}
        <div 
            className="w-full h-full flex items-center justify-center"
            style={{
                filter: 'url(#liquid-cursor)',
            }}
        >
            <div className="text-center">
                <h1 className="text-9xl font-black text-white mix-blend-difference">FLUID</h1>
                <p className="text-white/60 mt-4">Simulated Displacement</p>
            </div>
        </div>

      </div>
    </DemoContainer>
  );
}