import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { Construction, Cpu, Code2 } from 'lucide-react';

export default function ComingSoon() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-950 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
                 backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
                 transform: 'perspective(500px) rotateX(60deg) translateY(0)',
                 animation: 'grid-scroll 20s linear infinite'
             }} 
        />

        <div className="relative z-10 p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center max-w-lg">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
                <div className="w-24 h-24 bg-black rounded-2xl flex items-center justify-center border border-white/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 animate-spin-slow"></div>
                    <Code2 className="text-white relative z-10" size={40} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full border border-black">
                    WIP
                </div>
            </div>

            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">
                Under Construction
            </h2>
            <p className="text-white/50 mb-8 leading-relaxed">
                Our engineers are currently forging this effect in the digital foundry. 
                Check the <span className="text-blue-400 font-mono">Prompt</span> tab to generate it yourself with AI.
            </p>

            <div className="flex gap-2">
                <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
        </div>

        <style>{`
            @keyframes grid-scroll {
                0% { background-position: 0 0; }
                100% { background-position: 0 40px; }
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}