import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

export default function TypeStroke() {
  const [key, setKey] = useState(0);

  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center bg-black">
        
        <svg viewBox="0 0 800 200" className="w-full max-w-4xl h-auto">
            <text 
                key={key}
                x="50%" 
                y="50%" 
                dy=".35em" 
                textAnchor="middle"
                className="text-8xl font-black animate-stroke-draw"
                style={{
                    fill: 'transparent',
                    stroke: 'white',
                    strokeWidth: '2px',
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                STROKE
            </text>
        </svg>

        <button 
            onClick={() => setKey(k => k + 1)}
            className="absolute bottom-12 flex items-center gap-2 text-white/40 hover:text-white transition-colors"
        >
            <RefreshCcw size={16} /> Replay
        </button>

        <style>{`
            @keyframes stroke-draw {
                0% { stroke-dasharray: 0 50%; stroke-dashoffset: 20%; fill: transparent; }
                50% { stroke-dasharray: 50% 0; stroke-dashoffset: -20%; fill: transparent; }
                100% { stroke-dasharray: 50% 0; stroke-dashoffset: -20%; fill: white; }
            }
            .animate-stroke-draw {
                stroke-dasharray: 600;
                stroke-dashoffset: 600;
                animation: stroke-draw 3s ease-in-out forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}