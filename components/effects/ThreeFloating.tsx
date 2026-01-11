import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeFloating() {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) / 30;
    const y = (e.clientY - rect.top - rect.height/2) / 30;
    setRot({ x: -y, y: x });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-slate-900 flex items-center justify-center perspective-[1000px]"
        onMouseMove={handleMouseMove}
      >
        <div 
            className="w-80 h-96 bg-slate-800/80 backdrop-blur border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.2)] p-8 transition-transform duration-100 ease-out"
            style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
        >
            <h2 className="text-cyan-400 font-mono text-xl mb-4">SYSTEM STATUS</h2>
            <div className="space-y-4">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 w-[70%]"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 w-[40%]"></div>
                </div>
                <div className="h-32 bg-slate-700/50 rounded grid place-items-center border border-dashed border-slate-600">
                    <span className="text-slate-500 text-xs">DATA VISUALIZATION</span>
                </div>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}