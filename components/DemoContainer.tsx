import React from 'react';

export const DemoContainer = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`w-full h-full relative overflow-hidden bg-[#050505] lg:rounded-2xl border border-white/[0.08] shadow-[0_0_50px_-12px_rgba(0,0,0,0.9)] group ${className}`}>
    
    {/* Cinematic Vignette */}
    <div className="absolute inset-0 pointer-events-none z-[60] shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] rounded-2xl"></div>
    
    {/* Subtle Screen Glare (Top Gradient) */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-[70] opacity-30"></div>
    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-[50]"></div>

    {/* Film Grain / Noise - Optimized opacity */}
    <div className="absolute inset-0 pointer-events-none z-[40] opacity-[0.07] bg-noise mix-blend-overlay"></div>

    {/* Content Wrapper */}
    <div className="w-full h-full relative z-10">
        {children}
    </div>
  </div>
);