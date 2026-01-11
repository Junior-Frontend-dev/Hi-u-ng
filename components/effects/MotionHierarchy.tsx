import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionHierarchy() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-gray-100 flex items-center justify-center gap-4">
        {[1, 2, 3].map(i => (
            <div 
                key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`
                    w-40 h-60 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer
                    ${active === i ? 'scale-125 z-20 shadow-2xl' : active !== null ? 'scale-90 opacity-50 blur-sm' : 'scale-100'}
                `}
            >
                <div className="w-16 h-16 bg-blue-500 rounded-full mb-4"></div>
                <h3 className="font-bold text-gray-800">Card {i}</h3>
            </div>
        ))}
      </div>
    </DemoContainer>
  );
}