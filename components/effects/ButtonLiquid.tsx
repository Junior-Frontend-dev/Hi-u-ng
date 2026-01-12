import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ButtonLiquid() {
  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <button className={`${baseClass} bg-transparent border border-blue-500 text-blue-500 rounded-full hover:text-white`}>
          <div className="absolute inset-0 w-full h-[200%] bg-blue-500 top-[100%] left-0 rounded-[50%] transition-all duration-500 ease-in-out group-hover:top-[-40%] group-hover:rounded-none" />
          <span className="relative z-10 font-bold tracking-widest">LIQUID FILL</span>
        </button>
      </div>
    </DemoContainer>
  );
}