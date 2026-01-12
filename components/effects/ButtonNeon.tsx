import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ButtonNeon() {
  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <button className={`${baseClass} bg-transparent border-2 border-[#ff00ff] text-[#ff00ff] rounded-lg shadow-[0_0_10px_#ff00ff,inset_0_0_10px_#ff00ff] hover:shadow-[0_0_20px_#ff00ff,inset_0_0_20px_#ff00ff] hover:bg-[#ff00ff] hover:text-white transition-all duration-300 font-mono`}>
          CYBER_NEON
        </button>
      </div>
    </DemoContainer>
  );
}