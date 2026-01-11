import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

export default function TypeMask() {
  const [key, setKey] = useState(0);

  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center bg-black p-8">
        
        {/* Style 1: Clip Path Reveal */}
        <div key={`s1-${key}`} className="relative mb-20">
             <h1 className="text-8xl font-black text-white relative py-4"> {/* Added padding Y */}
                 UNMASKED
                 <div 
                    className="absolute inset-0 bg-accent origin-left animate-reveal-wipe"
                 />
             </h1>
        </div>

        {/* Style 2: Overflow Hidden Slide */}
        <div key={`s2-${key}`} className="space-y-4"> {/* Increased spacing */}
            <div className="overflow-hidden h-[1.3em] px-2"> {/* Increased height from 1.1 to 1.3em for descenders */}
                <h2 className="text-5xl font-bold text-white animate-reveal-up leading-tight" style={{ animationDelay: '0.8s' }}>
                    Reveal The
                </h2>
            </div>
            <div className="overflow-hidden h-[1.3em] px-2">
                 <h2 className="text-5xl font-bold text-white animate-reveal-up leading-tight" style={{ animationDelay: '1s' }}>
                    Impossible
                 </h2>
            </div>
        </div>

        <button 
            onClick={() => setKey(k => k + 1)}
            className="absolute bottom-12 flex items-center gap-2 text-white/40 hover:text-white transition-colors"
        >
            <RefreshCcw size={16} /> Replay
        </button>

        <style>{`
            @keyframes reveal-wipe {
                0% { transform: scaleX(1); transform-origin: left; }
                40% { transform: scaleX(1); transform-origin: left; }
                50% { transform: scaleX(0); transform-origin: right; }
                100% { transform: scaleX(0); transform-origin: right; }
            }
            .animate-reveal-wipe {
                animation: reveal-wipe 1.5s cubic-bezier(0.7, 0, 0.3, 1) forwards;
            }

            @keyframes reveal-up {
                0% { transform: translateY(110%); }
                100% { transform: translateY(0); }
            }
            .animate-reveal-up {
                transform: translateY(110%);
                animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}