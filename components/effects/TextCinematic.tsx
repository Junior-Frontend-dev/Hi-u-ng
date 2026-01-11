import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCw } from 'lucide-react';

export default function TextCinematic() {
  const [key, setKey] = useState(0);

  return (
    <DemoContainer>
      <div key={key} className="h-full w-full bg-black flex items-center justify-center">
        <h1 className="text-6xl font-light text-white tracking-[0.5em] animate-cinematic-fade">
            CINEMATIC
        </h1>

        <button onClick={() => setKey(k => k + 1)} className="absolute bottom-10 right-10 text-white/50 hover:text-white">
            <RefreshCw />
        </button>

        <style>{`
            @keyframes cinematic-fade {
                0% { opacity: 0; filter: blur(20px); letter-spacing: 2em; transform: scale(1.2); }
                100% { opacity: 1; filter: blur(0); letter-spacing: 0.5em; transform: scale(1); }
            }
            .animate-cinematic-fade {
                animation: cinematic-fade 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}