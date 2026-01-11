import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionGlitchBurst() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    // Random bursts
    const loop = () => {
        const delay = Math.random() * 3000 + 500;
        setTimeout(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 150); // Burst duration
            loop();
        }, delay);
    };
    loop();
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center overflow-hidden">
        <div className="relative">
            <h1 className={`text-9xl font-black text-white relative z-10 ${glitch ? 'opacity-50' : 'opacity-100'}`}>
                GLITCH
            </h1>
            
            {glitch && (
                <>
                    <h1 className="text-9xl font-black text-red-500 absolute top-0 left-0 -translate-x-2 translate-y-1 opacity-70 mix-blend-screen animate-pulse">
                        GLITCH
                    </h1>
                    <h1 className="text-9xl font-black text-cyan-500 absolute top-0 left-0 translate-x-2 -translate-y-1 opacity-70 mix-blend-screen animate-pulse">
                        GLITCH
                    </h1>
                    <div className="absolute inset-0 bg-white/10 h-2 top-1/2"></div>
                </>
            )}
        </div>
      </div>
    </DemoContainer>
  );
}