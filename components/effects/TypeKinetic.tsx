import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TypeKinetic() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#e0e0e0] flex items-center justify-center overflow-hidden relative">
        
        {/* Circle Container */}
        <div className="relative w-[500px] h-[500px] rounded-full border-2 border-black flex items-center justify-center animate-spin-slow">
            <div className="absolute inset-0 flex items-center justify-center">
                 <h1 className="text-8xl font-black text-black">CHAOS</h1>
            </div>
            
            {/* Orbiting Text */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 font-bold rotate-12">
                DESIGN
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black text-white px-4 py-2 font-bold -rotate-12">
                SYSTEMS
            </div>
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 font-bold -rotate-90">
                MOTION
            </div>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 font-bold rotate-90">
                WEB
            </div>
        </div>

        {/* Marquee Background */}
        <div className="absolute inset-x-0 top-20 -rotate-6 opacity-10 pointer-events-none whitespace-nowrap overflow-hidden">
            <h2 className="text-9xl font-black">KINETIC TYPOGRAPHY KINETIC TYPOGRAPHY</h2>
        </div>
        <div className="absolute inset-x-0 bottom-20 rotate-6 opacity-10 pointer-events-none whitespace-nowrap overflow-hidden">
            <h2 className="text-9xl font-black">MOVEMENT IS LIFE MOVEMENT IS LIFE</h2>
        </div>

        <style>{`
            .animate-spin-slow {
                animation: spin 20s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}