import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCw } from 'lucide-react';

export default function MotionOffset() {
  const [key, setKey] = useState(0);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center p-8">
        
        <div className="grid grid-cols-5 gap-4 mb-12">
            {[...Array(25)].map((_, i) => {
                // Calculate distance from center (index 12)
                const row = Math.floor(i / 5);
                const col = i % 5;
                const dist = Math.sqrt(Math.pow(row - 2, 2) + Math.pow(col - 2, 2));
                
                return (
                    <div 
                        key={`${key}-${i}`}
                        className="w-12 h-12 bg-white rounded-full animate-pop-in opacity-0"
                        style={{
                            animationDelay: `${dist * 0.1}s`
                        }}
                    />
                )
            })}
        </div>

        <button 
            onClick={() => setKey(k => k + 1)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
            <RefreshCw size={16} /> Replay
        </button>

        <style>{`
            @keyframes pop-in {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }
            .animate-pop-in {
                animation: pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}