import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionVibration() {
  const [clicked, setClicked] = useState(false);

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(50); // Real haptic
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-800 flex items-center justify-center">
        
        <button 
            onClick={vibrate}
            className={`
                w-64 h-20 bg-yellow-400 rounded-xl text-black font-black text-2xl shadow-[0_10px_0_#b45309] active:shadow-none active:translate-y-[10px] transition-all
                ${clicked ? 'animate-buzz' : ''}
            `}
        >
            CLICK ME
        </button>

        <style>{`
            @keyframes buzz {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(2px, 2px) rotate(1deg); }
                50% { transform: translate(-2px, -2px) rotate(-1deg); }
                75% { transform: translate(2px, -2px) rotate(1deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
            .animate-buzz { animation: buzz 0.1s linear infinite; }
        `}</style>
      </div>
    </DemoContainer>
  );
}