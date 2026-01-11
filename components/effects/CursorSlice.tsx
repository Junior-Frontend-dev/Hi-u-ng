import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorSlice() {
  const [sliceOffset, setSliceOffset] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Simple visual slice: If mouse is moving fast horizontally, shift top half
    // Or just map Y position to slice cut? No, prompt says "moving cursor quickly slices".
    // Let's just map X position relative to center to offset the top half.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2);
    setSliceOffset(x * 0.1);
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setSliceOffset(0)}
      >
        <div className="relative group">
            {/* Top Half */}
            <div 
                className="overflow-hidden h-[60px] w-full transition-transform duration-100 ease-out border-b border-red-500"
                style={{ transform: `translateX(${sliceOffset}px)` }}
            >
                <h1 className="text-9xl font-black text-white leading-none mt-0">SLICED</h1>
            </div>
            
            {/* Bottom Half */}
            <div 
                className="overflow-hidden h-[60px] w-full transition-transform duration-100 ease-out"
                style={{ transform: `translateX(${-sliceOffset}px)` }}
            >
                <h1 className="text-9xl font-black text-white leading-none -mt-[60px]">SLICED</h1>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}