import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionGuide() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 relative">
        {/* Guide Dot */}
        <div className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.8)] z-50 animate-guide-path"></div>

        <div className="p-20 grid grid-cols-2 gap-20 h-full">
            <div className="bg-white/10 rounded-xl p-8 flex items-center justify-center border border-white/5">
                <span className="text-white/20">Step 1</span>
            </div>
            <div className="bg-white/10 rounded-xl p-8 flex items-center justify-center border border-white/5">
                <span className="text-white/20">Step 2</span>
            </div>
            <div className="bg-white/10 rounded-xl p-8 flex items-center justify-center border border-white/5">
                <span className="text-white/20">Step 3</span>
            </div>
            <div className="bg-white/10 rounded-xl p-8 flex items-center justify-center border border-white/5">
                <span className="text-white/20">Step 4</span>
            </div>
        </div>

        <style>{`
            @keyframes guide-path {
                0% { top: 20%; left: 20%; }
                25% { top: 20%; left: 70%; }
                50% { top: 70%; left: 20%; }
                75% { top: 70%; left: 70%; }
                100% { top: 20%; left: 20%; }
            }
            .animate-guide-path {
                animation: guide-path 4s ease-in-out infinite;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}