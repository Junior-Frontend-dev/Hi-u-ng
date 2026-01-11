import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function VisualNoise() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 relative flex items-center justify-center overflow-hidden">
        
        {/* Animated Noise Layer */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-20 mix-blend-overlay">
             <div className="w-full h-full bg-noise animate-noise"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 p-12 bg-black border border-white/10 max-w-md shadow-2xl">
            <div className="w-12 h-1 bg-white mb-6"></div>
            <h2 className="text-4xl font-bold text-white mb-4">Static Texture</h2>
            <p className="text-gray-400 leading-relaxed">
                Adding animated grain or noise brings a tactile, analog feel to digital interfaces. 
                It prevents gradients from banding and adds subconscious depth.
            </p>
        </div>

        <style>{`
            @keyframes noise-move {
                0% { transform: translate(0,0); }
                10% { transform: translate(-5%,-5%); }
                20% { transform: translate(-10%,5%); }
                30% { transform: translate(5%,-10%); }
                40% { transform: translate(-5%,15%); }
                50% { transform: translate(-10%,5%); }
                60% { transform: translate(15%,0); }
                70% { transform: translate(0,10%); }
                80% { transform: translate(-15%,0); }
                90% { transform: translate(10%,5%); }
                100% { transform: translate(5%,0); }
            }
            .animate-noise {
                animation: noise-move 0.5s steps(1) infinite;
                width: 200%;
                height: 200%;
                left: -50%;
                top: -50%;
                position: absolute;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}