import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ButtonGhost() {
  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <button className={`${baseClass} bg-transparent text-white border border-white/30 rounded-full hover:border-white hover:bg-white/10 backdrop-blur-sm`}>
          <span className="opacity-70 group-hover:opacity-100 transition-opacity">GHOST UI</span>
        </button>
      </div>
    </DemoContainer>
  );
}