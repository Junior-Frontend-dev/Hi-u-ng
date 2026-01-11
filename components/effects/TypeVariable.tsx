import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TypeVariable() {
  // We need to verify if the font supports variations. 
  // Inter supports weight (100-900).
  // Some browsers support animating font-weight smoothly.
  
  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
        
        <div className="space-y-12 text-center z-10">
            {/* Continuous Animation */}
            <div>
                <h2 className="text-8xl text-white animate-font-breathe">BREATHE</h2>
                <p className="text-white/30 mt-2">Continuous weight animation</p>
            </div>

            {/* Hover Interaction */}
            <div className="group cursor-default">
                <h2 className="text-8xl text-white transition-all duration-700 ease-out font-thin group-hover:font-black group-hover:tracking-widest">
                    HOVER
                </h2>
                <p className="text-white/30 mt-2">Weight & Tracking on interaction</p>
            </div>
        </div>

        <style>{`
            @keyframes font-breathe {
                0%, 100% { font-weight: 100; font-stretch: 50%; letter-spacing: 0px; opacity: 0.5; }
                50% { font-weight: 900; font-stretch: 150%; letter-spacing: 10px; opacity: 1; }
            }
            .animate-font-breathe {
                animation: font-breathe 4s infinite ease-in-out;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}