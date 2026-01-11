import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function VisualGlitchImage() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        
        <div className="relative w-80 h-[500px] group cursor-pointer">
            {/* Base Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-20 transition-transform duration-100 group-hover:translate-x-1 group-hover:translate-y-[-1px]"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80)' }}
            />
            
            {/* Red Channel (Left Shift) */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-10 opacity-0 group-hover:opacity-70 mix-blend-screen transition-all duration-75"
                style={{ 
                    backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80)',
                    transform: 'translateX(-5px)',
                    filter: 'url(#red-channel)' // Simulated by mix-blend for demo simplicity
                }}
            >
               <div className="absolute inset-0 bg-red-500 mix-blend-multiply"></div> 
            </div>

            {/* Blue Channel (Right Shift) */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-10 opacity-0 group-hover:opacity-70 mix-blend-screen transition-all duration-75"
                style={{ 
                    backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80)',
                    transform: 'translateX(5px)'
                }}
            >
               <div className="absolute inset-0 bg-cyan-500 mix-blend-multiply"></div>
            </div>

            {/* Horizontal Slices (Simulated via clip-path stripes) */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 animate-scanline z-30 pointer-events-none"></div>
            
            <div className="absolute bottom-[-40px] left-0 text-white font-mono text-xs opacity-0 group-hover:opacity-100">
                CYBERPUNK_V2.0
            </div>
        </div>

        <style>{`
            @keyframes scanline {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
            }
            .animate-scanline {
                animation: scanline 2s linear infinite;
                background: linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.5) 50%, transparent 51%);
                background-size: 100% 4px;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}