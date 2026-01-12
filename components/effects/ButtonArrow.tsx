import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowRight } from 'lucide-react';

export default function ButtonArrow() {
  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <button className={`${baseClass} bg-white text-black rounded-full pl-8 pr-6 hover:pr-8 hover:pl-6 transition-all duration-300`}>
          <span className="font-bold">EXPLORE</span>
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:rotate-45">
            <ArrowRight size={14} />
          </div>
        </button>
      </div>
    </DemoContainer>
  );
}