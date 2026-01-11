import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function VisualCinematic() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#050505] relative overflow-hidden flex items-center justify-center">
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-noise z-20 mix-blend-overlay"></div>

        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-8 max-w-2xl px-6">
            <p className="text-blue-400/60 tracking-[0.4em] uppercase text-xs font-semibold animate-fade-in-up">
                Coming Soon
            </p>
            
            <h1 className="text-6xl md:text-8xl font-serif text-white leading-none tracking-tight animate-fade-in-up animation-delay-200 drop-shadow-2xl">
                The<br/>Horizon
            </h1>

            <p className="text-gray-400 text-lg font-light leading-relaxed animate-fade-in-up animation-delay-400">
                A visual journey through the darkness. Cinematic web design utilizes deep contrast, subtle noise, and dramatic lighting to evoke emotion.
            </p>

            <button className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-colors animate-fade-in-up animation-delay-600 backdrop-blur-sm">
                Watch Trailer
            </button>
        </div>

        <style>{`
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                opacity: 0;
            }
            .animation-delay-200 { animation-delay: 0.2s; }
            .animation-delay-400 { animation-delay: 0.4s; }
            .animation-delay-600 { animation-delay: 0.6s; }
        `}</style>

      </div>
    </DemoContainer>
  );
}