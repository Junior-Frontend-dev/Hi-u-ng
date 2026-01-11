import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionLiquidMorph() {
  const [active, setActive] = useState(false);

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black relative overflow-hidden cursor-pointer"
        onClick={() => setActive(!active)}
      >
        {/* SVG Blob Layer */}
        <div 
            className="absolute inset-0 flex items-center justify-center transition-colors duration-500"
            style={{ backgroundColor: active ? '#4f46e5' : '#000' }}
        >
            {/* Animated SVG Blob */}
            <svg viewBox="0 0 200 200" className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <path 
                    fill={active ? '#000' : '#4f46e5'} 
                    d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-7.4C81.5,5.6,70.2,17.3,60.9,29.3C51.6,41.3,44.3,53.6,33.7,64.2C23.1,74.8,9.2,83.7,-4.4,91.3C-18,98.9,-31.3,105.2,-42.6,99.2C-53.9,93.2,-63.2,74.9,-71.4,57.7C-79.6,40.5,-86.7,24.4,-86.2,8.6C-85.7,-7.2,-77.6,-22.7,-67.2,-36.2C-56.8,-49.7,-44.1,-61.2,-30.5,-68.8C-16.9,-76.4,-2.4,-80.1,12.3,-80.8C27,-81.5,41.7,-79.2,44.7,-76.4Z" 
                    transform="translate(100 100) scale(0)"
                    className={`transition-all duration-1000 ease-in-out ${active ? 'scale-0' : 'scale-100'}`}
                    style={{ transform: active ? 'translate(100px, 100px) scale(0)' : 'translate(100px, 100px) scale(1)' }}
                />
            </svg>
            
            <h1 className="relative z-10 text-white text-6xl font-bold mix-blend-difference pointer-events-none">
                {active ? "STATE B" : "STATE A"}
            </h1>
        </div>
        <p className="absolute bottom-10 left-0 w-full text-center text-white/50 text-sm pointer-events-none">Click to Morph</p>
      </div>
    </DemoContainer>
  );
}