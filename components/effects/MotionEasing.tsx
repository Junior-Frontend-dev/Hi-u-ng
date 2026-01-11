import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Play } from 'lucide-react';

export default function MotionEasing() {
  const [active, setActive] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white text-black p-8 flex flex-col justify-center gap-8">
        
        <div className="space-y-2">
            <p className="text-xs font-bold uppercase">Linear</p>
            <div className={`w-16 h-16 bg-black rounded-lg transition-transform duration-1000 ease-linear ${active ? 'translate-x-[300px]' : ''}`}></div>
        </div>

        <div className="space-y-2">
            <p className="text-xs font-bold uppercase">Ease Out (Cubic)</p>
            <div className={`w-16 h-16 bg-blue-600 rounded-lg transition-transform duration-1000 ease-out ${active ? 'translate-x-[300px]' : ''}`}></div>
        </div>

        <div className="space-y-2">
            <p className="text-xs font-bold uppercase">Elastic</p>
            <div 
                className={`w-16 h-16 bg-purple-600 rounded-lg transition-transform duration-1000 ${active ? 'translate-x-[300px]' : ''}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)' }}
            ></div>
        </div>

        <button 
            onClick={() => setActive(!active)}
            className="absolute bottom-8 right-8 p-4 bg-black text-white rounded-full"
        >
            <Play size={20} />
        </button>

      </div>
    </DemoContainer>
  );
}