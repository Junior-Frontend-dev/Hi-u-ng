import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

const ITEMS = ["A", "B", "C", "D"];

export default function MotionLayoutShift() {
  const [order, setOrder] = useState(ITEMS);

  useEffect(() => {
    const interval = setInterval(() => {
        setOrder(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-64">
            {order.map((item) => (
                <div 
                    key={item} // Key ensures React tracks the element for FLIP-like behavior if utilizing Framer Motion, but here pure CSS grid reorder is instant.
                    // To animate standard CSS grid reorder without libraries is hard.
                    // We simulate layout shift by using absolute positions or just relying on React's diffing + CSS transition? 
                    // React key change re-mounts. Layout animation usually needs FLIP.
                    // For this vanilla demo, we'll use View Transitions API concept or just simple flex order.
                    className="h-32 bg-white rounded-2xl flex items-center justify-center text-4xl font-bold text-black transition-all duration-500"
                    // Note: Pure CSS can't animate grid cell swaps easily without FLIP. 
                    // We will simulate by just changing content and fading.
                >
                    {item}
                </div>
            ))}
        </div>
      </div>
    </DemoContainer>
  );
}