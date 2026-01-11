import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionBlurUI() {
  const [active, setActive] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        <button 
            onClick={() => setActive(!active)}
            className="absolute top-10 px-6 py-2 bg-white text-black font-bold rounded-full z-20 hover:scale-105 transition-transform"
        >
            Trigger Motion
        </button>

        <div className="relative w-full h-40 overflow-hidden">
            {/* Element 1 */}
            <div 
                className={`
                    w-40 h-40 bg-blue-600 absolute top-0
                    transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                    ${active ? 'left-[80%] blur-[2px]' : 'left-[10%] blur-0'}
                `}
            ></div>
            
            {/* Element 2 (Faster = More Blur Simulation) */}
            <div 
                className={`
                    w-40 h-40 bg-red-600 absolute top-0 mix-blend-screen
                    transition-all duration-300 ease-in
                    ${active ? 'left-[70%] blur-[10px]' : 'left-[15%] blur-0'}
                `}
            ></div>
        </div>
      </div>
    </DemoContainer>
  );
}