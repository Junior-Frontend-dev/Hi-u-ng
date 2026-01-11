import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowRight } from 'lucide-react';

export default function MotionAcceleration() {
  const [launch, setLaunch] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative overflow-hidden flex items-center">
        
        {/* Track */}
        <div className="absolute w-full h-1 bg-white/20 top-1/2"></div>

        {/* Object */}
        <div 
            className={`absolute top-1/2 -translate-y-1/2 left-10 w-20 h-10 bg-white rounded-full flex items-center justify-center transition-all ${launch ? 'animate-accelerate' : ''}`}
        >
            <ArrowRight className="text-black" />
        </div>

        {!launch && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                <button 
                    onClick={() => { setLaunch(true); setTimeout(() => setLaunch(false), 2000); }}
                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-colors"
                >
                    Launch
                </button>
            </div>
        )}

        <style>{`
            @keyframes accelerate {
                0% { left: 40px; animation-timing-function: ease-in; }
                40% { left: 40px; transform: translateY(-50%) scale(0.9); }
                100% { left: 120%; transform: translateY(-50%) scale(1.1) skewX(-20deg); }
            }
            .animate-accelerate { animation: accelerate 1.5s forwards; }
        `}</style>
      </div>
    </DemoContainer>
  );
}