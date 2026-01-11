import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextNoise() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        
        <svg className="hidden">
            <filter id="noise-text">
                <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="1" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
            </filter>
        </svg>

        <h1 
            className="text-9xl font-black text-white"
            style={{ filter: 'url(#noise-text)' }}
        >
            SIGNAL
        </h1>

      </div>
    </DemoContainer>
  );
}