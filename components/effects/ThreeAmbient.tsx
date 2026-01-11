import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeAmbient() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center overflow-hidden">
        <div className="w-64 h-64 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-[80px] animate-pulse-slow"></div>
        <div className="absolute w-40 h-40 border border-white/20 animate-spin-slow"></div>
        <div className="absolute w-60 h-60 border border-white/10 animate-spin-reverse-slow"></div>
        
        <style>{`
            .animate-pulse-slow { animation: pulse 8s infinite; }
            .animate-spin-slow { animation: spin 20s linear infinite; }
            .animate-spin-reverse-slow { animation: spin 30s linear infinite reverse; }
            @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    </DemoContainer>
  );
}