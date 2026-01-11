import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionPhysicsCollapse() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center p-8">
        
        <div className="space-y-4 w-full max-w-md">
            {[1, 2, 3].map(i => (
                <div 
                    key={i}
                    className={`
                        bg-white p-6 rounded-xl transition-all duration-1000 ease-in
                        ${collapsed ? 'translate-y-[400px] rotate-[20deg] opacity-0' : 'translate-y-0 rotate-0 opacity-100'}
                    `}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                >
                    <h3 className="font-bold text-black">Card {i}</h3>
                </div>
            ))}
        </div>

        <button 
            onClick={() => setCollapsed(!collapsed)}
            className="mt-12 px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition-colors z-10"
        >
            {collapsed ? "Reset" : "Collapse UI"}
        </button>

      </div>
    </DemoContainer>
  );
}