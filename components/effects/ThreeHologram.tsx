import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeHologram() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        <div className="relative group">
            <h1 className="text-8xl font-mono font-bold text-cyan-400 opacity-80 animate-flicker">HOLO</h1>
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            {/* Glow */}
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse"></div>
        </div>

        <style>{`
            @keyframes flicker {
                0% { opacity: 0.8; }
                5% { opacity: 0.4; }
                10% { opacity: 0.8; }
                15% { opacity: 0.1; }
                20% { opacity: 0.8; }
                100% { opacity: 0.8; }
            }
            .animate-flicker { animation: flicker 2s infinite; }
        `}</style>
      </div>
    </DemoContainer>
  );
}