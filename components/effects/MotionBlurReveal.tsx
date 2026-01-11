import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCw } from 'lucide-react';

export default function MotionBlurReveal() {
  const [key, setKey] = useState(0);

  return (
    <DemoContainer>
      <div key={key} className="h-full w-full bg-white flex items-center justify-center">
        <h1 className="text-9xl font-black text-black animate-motion-blur-in">
            VELOCITY
        </h1>

        <button onClick={() => setKey(k => k + 1)} className="absolute bottom-10 right-10 text-black">
            <RefreshCw />
        </button>

        <style>{`
            @keyframes motion-blur-in {
                0% { transform: translateX(-100%) skewX(20deg); filter: blur(20px); opacity: 0; }
                100% { transform: translateX(0) skewX(0deg); filter: blur(0); opacity: 1; }
            }
            .animate-motion-blur-in {
                animation: motion-blur-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}