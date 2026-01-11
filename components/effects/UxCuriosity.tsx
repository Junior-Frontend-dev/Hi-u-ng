import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Gift } from 'lucide-react';

export default function UxCuriosity() {
  const [opened, setOpened] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (opened) return;
    
    // Periodically shake to get attention
    const interval = setInterval(() => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [opened]);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-purple-900 flex items-center justify-center">
        
        {opened ? (
            <div className="text-center animate-in zoom-in duration-500">
                <h1 className="text-6xl font-black text-white mb-4">SURPRISE!</h1>
                <p className="text-purple-200">Curiosity rewarded.</p>
                <button onClick={() => setOpened(false)} className="mt-8 text-white/50 text-sm hover:text-white">Reset</button>
            </div>
        ) : (
            <div 
                onClick={() => setOpened(true)}
                className={`
                    w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-[0_20px_50px_rgba(234,179,8,0.3)]
                    flex items-center justify-center cursor-pointer hover:scale-105 transition-transform
                    ${shake ? 'animate-shake' : ''}
                `}
            >
                <Gift size={64} className="text-white drop-shadow-md" />
            </div>
        )}

        <style>{`
            @keyframes shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-5deg); }
                75% { transform: rotate(5deg); }
            }
            .animate-shake { animation: shake 0.5s ease-in-out; }
        `}</style>
      </div>
    </DemoContainer>
  );
}