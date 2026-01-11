import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

const SCENES = [
    { bg: "bg-red-600", text: "ACTION" },
    { bg: "bg-black", text: "SILENCE" },
    { bg: "bg-white", text: "FLASH" }
];

export default function MotionCut() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % SCENES.length);
    }, 800); // Fast cuts
    return () => clearInterval(interval);
  }, []);

  const scene = SCENES[index];

  return (
    <DemoContainer>
      <div className={`h-full w-full flex items-center justify-center ${scene.bg} transition-none`}>
        <h1 className={`text-9xl font-black ${scene.bg === 'bg-white' ? 'text-black' : 'text-white'}`}>
            {scene.text}
        </h1>
      </div>
    </DemoContainer>
  );
}