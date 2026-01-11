import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeShadow() {
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLightPos({ 
        x: (e.clientX - rect.left - rect.width/2), 
        y: (e.clientY - rect.top - rect.height/2) 
    });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-gray-100 flex items-center justify-center"
        onMouseMove={handleMouseMove}
      >
        <div 
            className="w-40 h-40 bg-white rounded-xl"
            style={{
                // Shadow moves opposite to light
                boxShadow: `${-lightPos.x * 0.1}px ${-lightPos.y * 0.1}px 30px rgba(0,0,0,0.2)`
            }}
        ></div>
      </div>
    </DemoContainer>
  );
}