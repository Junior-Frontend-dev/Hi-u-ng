import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxSurprise() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const evade = () => {
    setAttempts(a => a + 1);
    setPos({
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300
    });
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex items-center justify-center overflow-hidden">
        <button 
            onMouseEnter={evade}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-xl transition-all duration-200 ease-out"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
            {attempts === 0 ? "Click Me" : 
             attempts < 5 ? "Nope!" : 
             "Catch me!"}
        </button>
      </div>
    </DemoContainer>
  );
}