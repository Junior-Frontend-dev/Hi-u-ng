import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { Zap } from 'lucide-react';

export default function ButtonPulse() {
  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <button className={`${baseClass} rounded-full bg-rose-600 shadow-[0_0_0_0_rgba(225,29,72,0.7)] animate-[pulse-ring_2s_infinite]`}>
          <Zap className="fill-white" size={18} />
          <span>LIVE ACTION</span>
          <style>{`
            @keyframes pulse-ring {
              0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.7); }
              70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(225, 29, 72, 0); }
              100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); }
            }
          `}</style>
        </button>
      </div>
    </DemoContainer>
  );
}