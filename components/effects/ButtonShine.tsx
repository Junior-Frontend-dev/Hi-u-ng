import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { Sparkles } from 'lucide-react';

export default function ButtonShine() {
  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <button className={`${baseClass} rounded-xl bg-black border border-white/10 backdrop-blur-md overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out skew-x-[-20deg] w-[200%]" />
          <Sparkles size={16} className="text-yellow-400" />
          <span className="relative z-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">PREMIUM SHINE</span>
        </button>
      </div>
    </DemoContainer>
  );
}