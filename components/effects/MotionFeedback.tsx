import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionFeedback() {
  const [anim, setAnim] = useState('');

  const trigger = (type: string) => {
    setAnim('');
    setTimeout(() => setAnim(type), 10);
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex flex-col items-center justify-center gap-12">
        
        <div className={`w-32 h-32 bg-black rounded-2xl flex items-center justify-center shadow-xl ${anim}`}>
            <span className="text-white font-bold text-xl">UI</span>
        </div>

        <div className="flex gap-4">
            <button onClick={() => trigger('animate-nod')} className="px-6 py-2 border rounded hover:bg-gray-100">Yes (Nod)</button>
            <button onClick={() => trigger('animate-shake-head')} className="px-6 py-2 border rounded hover:bg-gray-100">No (Shake)</button>
            <button onClick={() => trigger('animate-pulse-heavy')} className="px-6 py-2 border rounded hover:bg-gray-100">Attention</button>
        </div>

        <style>{`
            @keyframes nod {
                0%, 100% { transform: translateY(0); }
                25% { transform: translateY(-10px); }
                50% { transform: translateY(0); }
                75% { transform: translateY(-5px); }
            }
            .animate-nod { animation: nod 0.4s ease-out; }

            @keyframes shake-head {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                50% { transform: translateX(10px); }
                75% { transform: translateX(-5px); }
            }
            .animate-shake-head { animation: shake-head 0.4s ease-out; }

            @keyframes pulse-heavy {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            .animate-pulse-heavy { animation: pulse-heavy 0.3s ease-out; }
        `}</style>
      </div>
    </DemoContainer>
  );
}