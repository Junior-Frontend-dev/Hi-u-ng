import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Plus } from 'lucide-react';

export default function MotionMinimal() {
  const [clicked, setClicked] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex items-center justify-center">
        
        <button 
            onClick={() => setClicked(!clicked)}
            className={`
                relative w-16 h-16 border border-black rounded-full flex items-center justify-center
                transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                ${clicked ? 'rotate-45 scale-90 bg-black text-white' : 'rotate-0 scale-100 bg-transparent text-black'}
            `}
        >
            <Plus size={24} className="transition-transform duration-500" />
            
            {/* Ripple effect rings */}
            <span className={`absolute inset-0 rounded-full border border-black opacity-0 transition-all duration-700 ${clicked ? 'scale-150 opacity-0' : 'scale-100 opacity-0'}`}></span>
        </button>

      </div>
    </DemoContainer>
  );
}