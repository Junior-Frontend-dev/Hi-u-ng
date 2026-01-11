import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

const WORDS = [
    { text: "FALL", animation: "animate-fall" },
    { text: "SHAKE", animation: "animate-shake" },
    { text: "FADE", animation: "animate-fade" },
    { text: "GROW", animation: "animate-grow" }
];

export default function MotionTypoStory() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const current = WORDS[index];

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        <h1 
            key={index}
            className={`text-8xl font-black text-white ${current.animation}`}
        >
            {current.text}
        </h1>

        <style>{`
            @keyframes fall {
                0% { transform: translateY(-50px); opacity: 0; }
                20% { transform: translateY(0); opacity: 1; }
                80% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(50px); opacity: 0; }
            }
            .animate-fall { animation: fall 2s forwards; }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            .animate-shake { animation: shake 2s; }

            @keyframes fade {
                0% { opacity: 0; blur: 10px; }
                50% { opacity: 1; blur: 0; }
                100% { opacity: 0; blur: 10px; }
            }
            .animate-fade { animation: fade 2s; }

            @keyframes grow {
                0% { transform: scale(0.5); }
                100% { transform: scale(1.5); opacity: 0; }
            }
            .animate-grow { animation: grow 2s; }
        `}</style>
      </div>
    </DemoContainer>
  );
}