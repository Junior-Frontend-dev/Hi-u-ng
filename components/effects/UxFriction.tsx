import React, { useState, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Trash2 } from 'lucide-react';

export default function UxFriction() {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const reqRef = useRef<number>(0);

  const startHold = () => {
    setHolding(true);
    let p = 0;
    const loop = () => {
        p += 2; // Speed of fill
        setProgress(p);
        if (p < 100) {
            reqRef.current = requestAnimationFrame(loop);
        } else {
            setDeleted(true);
            setHolding(false);
        }
    };
    loop();
  };

  const endHold = () => {
    setHolding(false);
    setProgress(0);
    cancelAnimationFrame(reqRef.current);
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center p-8 select-none">
        
        {deleted ? (
            <div className="text-center animate-in fade-in zoom-in">
                <h2 className="text-3xl font-bold text-red-500 mb-2">Deleted</h2>
                <button 
                    onClick={() => { setDeleted(false); setProgress(0); }}
                    className="text-gray-400 hover:text-white underline"
                >
                    Undo
                </button>
            </div>
        ) : (
            <div className="relative group">
                {/* Friction Ring */}
                <svg className="absolute -top-4 -left-4 w-[100px] h-[100px] pointer-events-none rotate-[-90deg]">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#333" strokeWidth="8" />
                    <circle 
                        cx="50" cy="50" r="46" 
                        fill="none" 
                        stroke="#ef4444" 
                        strokeWidth="8" 
                        strokeDasharray="289"
                        strokeDashoffset={289 - (289 * progress) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-75 ease-linear"
                    />
                </svg>

                <button
                    onMouseDown={startHold}
                    onMouseUp={endHold}
                    onMouseLeave={endHold}
                    onTouchStart={startHold}
                    onTouchEnd={endHold}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-600 shadow-xl relative z-10 active:scale-90 transition-transform"
                >
                    <Trash2 />
                </button>
                
                <p className="mt-8 text-center text-gray-500 text-sm">Hold to delete</p>
            </div>
        )}

      </div>
    </DemoContainer>
  );
}