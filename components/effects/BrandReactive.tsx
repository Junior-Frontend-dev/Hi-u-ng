import React, { useEffect, useRef, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandReactive() {
  const [mood, setMood] = useState<'idle' | 'active' | 'frenzy'>('idle');
  const [velocity, setVelocity] = useState(0);
  const lastMouse = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastMouse.current.time;
      if (dt === 0) return;

      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      const speed = Math.sqrt(dx*dx + dy*dy) / dt; // pixels per ms

      setVelocity(speed);

      if (speed > 3) setMood('frenzy');
      else if (speed > 0.5) setMood('active');
      else setMood('idle');

      lastMouse.current = { x: e.clientX, y: e.clientY, time: now };
    };

    let timeout: ReturnType<typeof setTimeout>;
    const decay = () => {
        setVelocity(v => Math.max(0, v * 0.9));
        setMood(m => {
            if (m === 'frenzy' && velocity < 2) return 'active';
            if (m === 'active' && velocity < 0.1) return 'idle';
            return m;
        });
        timeout = setTimeout(decay, 100);
    };
    decay();

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timeout);
    };
  }, [velocity]);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-100 flex flex-col items-center justify-center transition-colors duration-500"
           style={{ backgroundColor: mood === 'frenzy' ? '#fee2e2' : mood === 'active' ? '#e0f2fe' : '#f5f5f5' }}>
        
        {/* Reactive Shape */}
        <div 
            className="w-64 h-64 transition-all duration-300 ease-out flex items-center justify-center shadow-2xl relative overflow-hidden"
            style={{
                borderRadius: mood === 'idle' ? '50%' : mood === 'active' ? '20%' : '0%',
                backgroundColor: mood === 'idle' ? '#3b82f6' : mood === 'active' ? '#0ea5e9' : '#ef4444',
                transform: `rotate(${velocity * 20}deg) scale(${1 + velocity * 0.1})`
            }}
        >
            {/* Inner Face/Logo */}
            <div className="text-white text-6xl font-black transition-all duration-300">
                {mood === 'idle' && '( ^_^) '}
                {mood === 'active' && '( O_O )'}
                {mood === 'frenzy' && '( >_< )'}
            </div>
        </div>

        <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-neutral-800 uppercase tracking-widest mb-2">
                {mood} STATE
            </h2>
            <p className="text-neutral-500 font-mono text-sm">
                Velocity: {velocity.toFixed(2)} px/ms
            </p>
        </div>
      </div>
    </DemoContainer>
  );
}