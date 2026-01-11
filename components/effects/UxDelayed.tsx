import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxDelayed() {
  const [state, setState] = useState<'idle' | 'charging' | 'boom'>('idle');

  const handleClick = () => {
    if (state !== 'idle') return;
    setState('charging');
    setTimeout(() => setState('boom'), 2000);
    setTimeout(() => setState('idle'), 4000);
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        
        {state === 'idle' && (
            <button 
                onClick={handleClick}
                className="w-32 h-32 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-colors font-bold text-xl"
            >
                CHARGE
            </button>
        )}

        {state === 'charging' && (
            <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
                <svg className="w-full h-full rotate-[-90deg]">
                    <circle 
                        cx="64" cy="64" r="62" 
                        fill="none" stroke="white" strokeWidth="4"
                        strokeDasharray="390"
                        strokeDashoffset="390"
                        className="animate-fill-circle"
                    />
                </svg>
                <span className="animate-pulse text-white font-mono">Wait...</span>
            </div>
        )}

        {state === 'boom' && (
            <div className="relative">
                <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-in zoom-in duration-300">
                    BOOM!
                </h1>
                <div className="absolute inset-0 bg-white opacity-0 animate-flash"></div>
            </div>
        )}

        <style>{`
            .animate-fill-circle {
                animation: fill 2s linear forwards;
            }
            @keyframes fill { to { stroke-dashoffset: 0; } }
            @keyframes flash { 0% { opacity: 1; } 100% { opacity: 0; } }
            .animate-flash { animation: flash 0.5s ease-out; }
        `}</style>
      </div>
    </DemoContainer>
  );
}