import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionAnticipation() {
  const [move, setMove] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-100 flex items-center justify-center">
        
        <div 
            className={`
                w-32 h-32 bg-blue-600 rounded-2xl shadow-xl cursor-pointer
                ${move ? 'animate-anticipate-move' : ''}
            `}
            onClick={() => {
                setMove(false);
                setTimeout(() => setMove(true), 10);
            }}
        ></div>

        <style>{`
            @keyframes anticipate-move {
                0% { transform: translateX(0); }
                20% { transform: translateX(-50px) scaleX(0.9); } /* Pull back */
                100% { transform: translateX(400px); } /* Shoot forward */
            }
            .animate-anticipate-move {
                animation: anticipate-move 0.8s cubic-bezier(0.5, 0, 0.5, 1) forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}