import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Loader2 } from 'lucide-react';

export default function ButtonMorph() {
  const [loading, setLoading] = useState(false);
  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <button 
          onClick={() => setLoading(!loading)}
          className={`${baseClass} bg-emerald-600 rounded-full transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${loading ? 'w-14 h-14 p-0 bg-white text-emerald-600' : 'w-48'}`}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span className="whitespace-nowrap">SUBMIT ORDER</span>
          )}
        </button>
      </div>
    </DemoContainer>
  );
}