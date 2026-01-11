import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionRevealSpeed() {
  const [width, setWidth] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Reveal based on mouse X position relative to container
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    setWidth(percent);
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black relative cursor-ew-resize"
        onMouseMove={handleMouseMove}
      >
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white/10 pointer-events-none">
            <h1 className="text-[20vw] font-black">FAST</h1>
        </div>

        {/* Reveal Layer */}
        <div 
            className="absolute top-0 left-0 h-full bg-white overflow-hidden"
            style={{ width: `${width}%` }}
        >
            <div className="absolute top-0 left-0 w-screen h-full flex items-center justify-center">
                <h1 className="text-[20vw] font-black text-black">FAST</h1>
            </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/20 text-white px-4 py-2 rounded-full backdrop-blur-md z-10 pointer-events-none border border-white/20">
            Control Time
        </div>
      </div>
    </DemoContainer>
  );
}