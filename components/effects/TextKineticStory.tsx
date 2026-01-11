import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

const STORY = ["WAKE", "UP", "NEO", "THE", "MATRIX", "HAS", "YOU"];

export default function TextKineticStory() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % STORY.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-green-950 flex items-center justify-center">
        <h1 className="text-9xl font-mono font-bold text-green-400">
            {STORY[index]}
        </h1>
      </div>
    </DemoContainer>
  );
}