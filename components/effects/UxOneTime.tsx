import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxOneTime() {
  const [popped, setPopped] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex flex-col items-center justify-center gap-8">
        
        {!popped ? (
            <button 
                onClick={() => setPopped(true)}
                className="w-32 h-32 bg-red-500 rounded-full shadow-lg active:scale-90 transition-transform flex items-center justify-center text-white font-bold animate-float"
            >
                POP ME
            </button>
        ) : (
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Particles */}
                {[...Array(8)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-4 h-4 bg-red-500 rounded-full animate-explode"
                        style={{
                            transform: `rotate(${i * 45}deg) translateY(-60px)`,
                            opacity: 0
                        }}
                    />
                ))}
                <span className="text-gray-400 text-sm italic">Gone forever.</span>
            </div>
        )}

        <style>{`
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .animate-float { animation: float 3s ease-in-out infinite; }
            
            @keyframes explode {
                0% { transform: rotate(var(--rot)) translateY(0); opacity: 1; }
                100% { transform: rotate(var(--rot)) translateY(100px); opacity: 0; }
            }
            .animate-explode {
                /* Since we can't easily pass vars in map without inline style for keyframes, 
                   we rely on the inline style transform end state being different or use standard CSS transition 
                   but here simplified for React demo */
                transition: all 0.5s ease-out;
                opacity: 0 !important;
                transform: scale(0);
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}