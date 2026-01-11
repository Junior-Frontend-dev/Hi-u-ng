import React, { useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

const SplitText = ({ text, delayOffset = 0 }: { text: string, delayOffset?: number }) => {
    return (
        <span className="inline-block overflow-hidden align-bottom">
            {text.split('').map((char, i) => (
                <span 
                    key={i}
                    className="inline-block animate-slide-up"
                    style={{ 
                        animationDelay: `${delayOffset + i * 0.05}s`,
                        animationFillMode: 'both' 
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};

export default function TypeSplit() {
  const [key, setKey] = useState(0);

  return (
    <DemoContainer>
      <div className="h-full w-full flex flex-col items-center justify-center bg-black gap-8">
        
        <div key={key} className="text-6xl md:text-8xl font-bold text-white leading-tight text-center tracking-tighter">
            <div className="block">
                <SplitText text="ELEGANT" delayOffset={0} />
            </div>
            <div className="block text-accent">
                <SplitText text="MOTION" delayOffset={0.4} />
            </div>
        </div>

        <button 
            onClick={() => setKey(k => k + 1)}
            className="mt-12 flex items-center gap-2 text-white/40 hover:text-white transition-colors"
        >
            <RefreshCcw size={16} /> Replay
        </button>

        <style>{`
            @keyframes slide-up {
                0% { transform: translateY(100%); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-up {
                animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}