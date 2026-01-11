import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeGlass() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative flex items-center justify-center overflow-hidden">
        
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

        {/* Glass Object */}
        <div className="w-64 h-64 bg-white/5 backdrop-blur-md border border-white/20 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] relative z-10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            {/* Refraction simulation - invert background or shift */}
            <div className="w-full h-full bg-inherit backdrop-invert opacity-20"></div>
        </div>

      </div>
    </DemoContainer>
  );
}