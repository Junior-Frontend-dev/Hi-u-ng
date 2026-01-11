import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionHandDrawn() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#fffff0] flex items-center justify-center">
        
        <div className="border-4 border-black p-10 rounded-lg animate-jitter bg-white shadow-lg">
            <h1 className="text-6xl font-black text-black animate-jitter-text">SKETCHY</h1>
            <div className="w-full h-1 bg-black mt-4 animate-jitter"></div>
        </div>

        <style>{`
            @keyframes jitter {
                0% { transform: translate(0,0) rotate(0deg); }
                25% { transform: translate(1px,1px) rotate(0.5deg); }
                50% { transform: translate(-1px,-1px) rotate(-0.5deg); }
                75% { transform: translate(-1px,1px) rotate(0deg); }
                100% { transform: translate(1px,-1px) rotate(0.5deg); }
            }
            .animate-jitter {
                animation: jitter 0.2s steps(2) infinite;
            }
            .animate-jitter-text {
                animation: jitter 0.3s steps(2) infinite reverse;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}