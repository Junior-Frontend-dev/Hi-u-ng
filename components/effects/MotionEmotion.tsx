import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionEmotion() {
  const [mood, setMood] = useState<'happy' | 'angry'>('happy');

  return (
    <DemoContainer>
      <div className={`h-full w-full flex flex-col items-center justify-center transition-colors duration-500 ${mood === 'happy' ? 'bg-yellow-100' : 'bg-red-900'}`}>
        
        <div 
            className={`
                w-40 h-40 rounded-full flex items-center justify-center text-6xl shadow-2xl transition-all duration-500
                ${mood === 'happy' ? 'bg-yellow-400 animate-bounce-gentle' : 'bg-red-600 animate-shake-angry'}
            `}
        >
            {mood === 'happy' ? '😊' : '🤬'}
        </div>

        <div className="mt-12 flex gap-4">
            <button onClick={() => setMood('happy')} className="px-6 py-2 bg-white rounded-full shadow hover:bg-gray-50">Happy</button>
            <button onClick={() => setMood('angry')} className="px-6 py-2 bg-white rounded-full shadow hover:bg-gray-50">Angry</button>
        </div>

        <style>{`
            @keyframes bounce-gentle {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
            .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }

            @keyframes shake-angry {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-1deg); }
                20% { transform: translate(-3px, 0px) rotate(1deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(1deg); }
                50% { transform: translate(-1px, 2px) rotate(-1deg); }
                60% { transform: translate(-3px, 1px) rotate(0deg); }
                70% { transform: translate(3px, 1px) rotate(-1deg); }
                80% { transform: translate(-1px, -1px) rotate(1deg); }
                90% { transform: translate(1px, 2px) rotate(0deg); }
                100% { transform: translate(1px, -2px) rotate(-1deg); }
            }
            .animate-shake-angry { animation: shake-angry 0.5s linear infinite; }
        `}</style>
      </div>
    </DemoContainer>
  );
}