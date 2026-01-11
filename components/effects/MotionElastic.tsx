import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionElastic() {
  const [open, setOpen] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#f0f0f0] flex items-center justify-center relative overflow-hidden">
        
        <button 
            onClick={() => setOpen(!open)}
            className="px-8 py-3 bg-black text-white rounded-full font-bold z-10 hover:scale-105 transition-transform"
        >
            {open ? "Close" : "Open"}
        </button>

        {/* Drawer */}
        <div 
            className={`
                absolute bottom-0 left-0 w-full bg-blue-600 rounded-t-3xl p-10 text-white
                transition-transform duration-700
                ${open ? 'translate-y-0' : 'translate-y-[90%]'}
            `}
            style={{
                // Custom elastic bezier
                transitionTimingFunction: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
            }}
        >
            <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-8"></div>
            <h2 className="text-4xl font-bold mb-4">Elastic Physics</h2>
            <p className="opacity-80">Using cubic-bezier(0.68, -0.6, 0.32, 1.6) creates an overshoot effect.</p>
        </div>

      </div>
    </DemoContainer>
  );
}