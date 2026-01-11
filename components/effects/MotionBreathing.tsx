import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionBreathing() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center gap-12 p-8">
        
        <div className="text-center space-y-4">
            <div className="w-32 h-32 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full mx-auto animate-breathe blur-lg opacity-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-2xl mx-auto border border-white/20 animate-breathe relative z-10 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full animate-pulse-slow"></div>
            </div>
            
            <h2 className="text-3xl font-light text-white animate-fade-breathe">Inhale. Exhale.</h2>
            <button className="px-8 py-3 rounded-full border border-white/30 text-white animate-scale-breathe hover:bg-white/10 transition-colors">
                Interact
            </button>
        </div>

        <style>{`
            @keyframes breathe {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.05); opacity: 1; }
            }
            @keyframes pulse-slow {
                0%, 100% { transform: scale(0.8); opacity: 0.5; }
                50% { transform: scale(1); opacity: 1; }
            }
            .animate-breathe { animation: breathe 6s ease-in-out infinite; }
            .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
            .animate-fade-breathe { animation: breathe 8s ease-in-out infinite reverse; }
            .animate-scale-breathe { animation: breathe 5s ease-in-out infinite; }
        `}</style>
      </div>
    </DemoContainer>
  );
}