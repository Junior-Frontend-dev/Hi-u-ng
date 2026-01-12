import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeGlass() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#050505] relative flex items-center justify-center overflow-hidden">
        
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

        {/* 3D Glass Sphere Simulation */}
        <div className="relative group cursor-pointer">
            {/* Outer Glow */}
            <div className="absolute -inset-10 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            {/* The Glass Container */}
            <div className="w-80 h-80 rounded-full relative z-10 
                            bg-white/[0.03] backdrop-blur-[40px] 
                            border border-white/20 
                            shadow-[inset_0_0_80px_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.5)]
                            overflow-hidden flex items-center justify-center
                            transition-transform duration-700 group-hover:scale-105">
                
                {/* Refraction Surface Highlights */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent rotate-12 pointer-events-none transition-transform duration-1000 group-hover:translate-x-10 group-hover:translate-y-10"></div>
                
                {/* Internal Moving Content */}
                <div className="text-center z-20">
                    <h2 className="text-white text-4xl font-black tracking-tighter opacity-80 mix-blend-overlay">FROSTED</h2>
                    <p className="text-white/40 text-xs font-mono mt-2 tracking-[0.3em]">DYNAMIC REFRACTION</p>
                </div>

                {/* Inner Rim Light */}
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/10"></div>
            </div>

            {/* Floating particles inside? Simulating with dots */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>
        </div>

        {/* Global Styles for Animations (If not in config) */}
        <style>{`
            @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
                50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
            }
            .animation-delay-2000 { animation-delay: 2s; }
            .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </div>
    </DemoContainer>
  );
}