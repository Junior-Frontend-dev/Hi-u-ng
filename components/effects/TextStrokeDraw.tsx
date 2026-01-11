import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

export default function TextStrokeDraw() {
  const [key, setKey] = useState(0);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        
        <svg viewBox="0 0 600 200" className="w-full max-w-2xl">
            <text 
                key={key}
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dy=".35em" 
                className="text-8xl font-bold animate-stroke text-transparent stroke-white"
                style={{
                    strokeWidth: '2px',
                    fontFamily: 'sans-serif'
                }}
            >
                DRAWN
            </text>
        </svg>

        <button onClick={() => setKey(k => k + 1)} className="absolute bottom-10 text-white/50 hover:text-white">
            <RefreshCcw />
        </button>

        <style>{`
            @keyframes stroke {
                0% { stroke-dasharray: 0 50%; fill: transparent; }
                100% { stroke-dasharray: 100% 0; fill: white; }
            }
            .animate-stroke {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: stroke 3s linear forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}