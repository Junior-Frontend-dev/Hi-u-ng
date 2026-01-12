import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Fingerprint } from 'lucide-react';

export default function ButtonRippleOut() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }]);
    setTimeout(() => setRipples(prev => prev.slice(1)), 1000);
  };

  const baseClass = "relative px-8 py-4 font-bold text-white transition-all duration-300 group overflow-hidden cursor-pointer tracking-wider flex items-center justify-center gap-3";

  return (
    <DemoContainer className="bg-[#050505] flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,black_70%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <button 
          onClick={handleClick}
          className={`${baseClass} bg-indigo-600 rounded-lg shadow-lg hover:shadow-indigo-500/50 active:scale-95`}
        >
          {ripples.map(ripple => (
            <span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 pointer-events-none animate-[ripple_0.6s_linear]"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 0,
                height: 0,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          <Fingerprint size={18} />
          <span className="relative z-10">CLICK ME</span>
          <style>{`
            @keyframes ripple {
              to { width: 400px; height: 400px; opacity: 0; }
            }
          `}</style>
        </button>
      </div>
    </DemoContainer>
  );
}