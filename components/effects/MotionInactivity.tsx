import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionInactivity() {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      setInactive(false);
      clearTimeout(timer);
      timer = setTimeout(() => setInactive(true), 2000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('scroll', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center transition-colors duration-1000"
           style={{ backgroundColor: inactive ? '#1a1a2e' : '#000' }}>
        
        <div className={`text-center transition-all duration-1000 ${inactive ? 'scale-110' : 'scale-100'}`}>
            {inactive ? (
                <div className="relative">
                    <div className="w-40 h-40 bg-purple-500 rounded-full blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
                    <h1 className="text-6xl font-bold text-white relative z-10 animate-float">WAKE UP</h1>
                </div>
            ) : (
                <div className="text-white/30">
                    <h2 className="text-2xl font-mono">System Active</h2>
                    <p className="text-xs mt-2">Stop moving to trigger screensaver</p>
                </div>
            )}
        </div>

        <style>{`
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
            .animate-float { animation: float 4s ease-in-out infinite; }
            .animate-pulse-slow { animation: pulse 4s ease-in-out infinite; }
        `}</style>
      </div>
    </DemoContainer>
  );
}