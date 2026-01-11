import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowUp } from 'lucide-react';

export default function UxNoButtons() {
  const [startY, setStartY] = useState(0);
  const [offset, setOffset] = useState(0);
  const [triggered, setTriggered] = useState(false);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(y);
    setTriggered(false);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (startY === 0) return;
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = startY - y;
    
    // Only allow pull up
    if (diff > 0) {
        setOffset(diff);
        if (diff > 200 && !triggered) {
            setTriggered(true);
            // Haptic vibration would go here
        }
    }
  };

  const handleEnd = () => {
    if (triggered) {
        alert("Action Triggered!");
    }
    setStartY(0);
    setOffset(0);
    setTriggered(false);
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex flex-col items-center justify-end pb-20 relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div className="text-center mb-8 pointer-events-none">
            <h2 className="text-white font-bold text-2xl">Swipe Up to Confirm</h2>
            <p className="text-gray-500">No buttons allowed</p>
        </div>

        {/* Trigger Line */}
        <div className={`w-full h-1 bg-white/20 absolute bottom-[250px] transition-colors ${triggered ? 'bg-green-500' : ''}`} />

        {/* Draggable Element */}
        <div 
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            style={{ 
                transform: `translateY(${-offset}px)`,
                transition: startY === 0 ? 'transform 0.5s cubic-bezier(0.2,0.8,0.2,1)' : 'none',
                backgroundColor: triggered ? '#22c55e' : '#ffffff'
            }}
        >
            <ArrowUp className={triggered ? 'animate-bounce' : ''} />
        </div>
      </div>
    </DemoContainer>
  );
}