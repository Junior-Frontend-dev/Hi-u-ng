import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Home, Settings, User, Mail, Search } from 'lucide-react';

export default function CursorRevealUI() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white/10 pointer-events-none">
            Move to reveal
        </div>

        {/* The UI Layer */}
        <div 
            className="absolute inset-0 flex items-center justify-center gap-8 pointer-events-none"
            style={{
                // Mask reveals UI only near cursor
                maskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 100%, transparent 0%)`,
                WebkitMaskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 100%, transparent 0%)`
            }}
        >
            <div className="p-4 bg-white/10 rounded-full border border-white/20 text-white"><Home /></div>
            <div className="p-4 bg-white/10 rounded-full border border-white/20 text-white"><User /></div>
            <div className="p-4 bg-white/10 rounded-full border border-white/20 text-white"><Search /></div>
            <div className="p-4 bg-white/10 rounded-full border border-white/20 text-white"><Mail /></div>
            <div className="p-4 bg-white/10 rounded-full border border-white/20 text-white"><Settings /></div>
        </div>
      </div>
    </DemoContainer>
  );
}