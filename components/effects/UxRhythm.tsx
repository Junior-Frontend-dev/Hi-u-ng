import React, { useState, useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxRhythm() {
  const [clicks, setClicks] = useState<number[]>([]);
  const [bpm, setBpm] = useState(0);
  const [color, setColor] = useState('#3b82f6');

  const handleClick = () => {
    const now = Date.now();
    setClicks(prev => {
        const newClicks = [...prev, now].slice(-5); // Keep last 5
        if (newClicks.length > 1) {
            // Calculate avg interval
            let sum = 0;
            for(let i=1; i<newClicks.length; i++) {
                sum += newClicks[i] - newClicks[i-1];
            }
            const avg = sum / (newClicks.length - 1);
            const calculatedBpm = 60000 / avg;
            setBpm(Math.round(calculatedBpm));
            
            // Adapt UI based on speed
            if(calculatedBpm > 300) setColor('#ef4444'); // Fast = Red
            else if(calculatedBpm > 120) setColor('#f59e0b'); // Medium = Orange
            else setColor('#3b82f6'); // Slow = Blue
        }
        return newClicks;
    });
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex flex-col items-center justify-center p-8 transition-colors duration-500" style={{ backgroundColor: `${color}20` }}>
        <button 
            onClick={handleClick}
            className="w-48 h-48 rounded-full border-4 border-white/20 flex items-center justify-center text-white text-2xl font-bold active:scale-95 transition-transform"
            style={{ 
                backgroundColor: color,
                boxShadow: `0 0 ${bpm}px ${color}`
            }}
        >
            Tap Rhythm
        </button>
        <div className="mt-8 text-center text-white/50 font-mono">
            <p className="text-4xl text-white">{bpm > 0 ? bpm : '--'}</p>
            <p className="text-xs uppercase tracking-widest">Est. BPM</p>
            <p className="mt-4 text-xs">The UI adapts its energy to your pace.</p>
        </div>
      </div>
    </DemoContainer>
  );
}