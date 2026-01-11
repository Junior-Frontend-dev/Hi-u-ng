import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Box } from 'lucide-react';

export default function ThreeMouseRotate() {
  const [rotation, setRotation] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if(e.buttons === 1) {
        setRotation(prev => prev + e.movementX);
    }
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-gray-200 flex items-center justify-center cursor-move"
        onMouseMove={handleMouseMove}
      >
        <div 
            className="w-40 h-40 bg-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl transition-transform duration-75"
            style={{ transform: `perspective(1000px) rotateY(${rotation}deg)` }}
        >
            <Box size={64} />
        </div>
        <p className="absolute bottom-10 text-black/30">Drag to spin</p>
      </div>
    </DemoContainer>
  );
}