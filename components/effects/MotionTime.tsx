import React, { useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionTime() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 100); // Fast cycle
    return () => clearInterval(interval);
  }, []);

  // Map time to cycle (0-100)
  const cycle = time % 100;
  
  // Sky color based on cycle
  const isNight = cycle > 50;
  
  return (
    <DemoContainer>
      <div 
        className={`h-full w-full transition-colors duration-1000 flex flex-col items-center justify-center relative overflow-hidden ${isNight ? 'bg-slate-900 text-white' : 'bg-sky-300 text-black'}`}
      >
        <div 
            className="w-32 h-32 rounded-full transition-colors duration-1000 absolute top-20"
            style={{
                backgroundColor: isNight ? '#fcd34d' : '#fbbf24', // Moon vs Sun
                boxShadow: isNight ? '0 0 20px #fcd34d' : '0 0 50px #fbbf24',
                transform: `translateX(${(cycle - 50) * 10}px)`
            }}
        ></div>

        <div className="relative z-10 text-center bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
            <h1 className="text-4xl font-bold mb-2">Time Flows</h1>
            <p>Cycle: {cycle}%</p>
        </div>
      </div>
    </DemoContainer>
  );
}