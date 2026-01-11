import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionAfterimage() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center overflow-hidden">
        
        <div className="relative w-40 h-40">
            {/* Main Object */}
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-orbit z-10"></div>
            
            {/* Afterimages (Ghosts) */}
            <div className="absolute inset-0 bg-cyan-400/50 rounded-full animate-orbit" style={{ animationDelay: '-0.1s' }}></div>
            <div className="absolute inset-0 bg-cyan-400/30 rounded-full animate-orbit" style={{ animationDelay: '-0.2s' }}></div>
            <div className="absolute inset-0 bg-cyan-400/10 rounded-full animate-orbit" style={{ animationDelay: '-0.3s' }}></div>
        </div>

        <style>{`
            @keyframes orbit {
                0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
                100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
            }
            .animate-orbit {
                animation: orbit 2s linear infinite;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}