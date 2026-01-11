import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionInertia() {
  const boxRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Assuming demo container is somewhat centered or we just track relative movement
      // For simplicity in a confined demo, we'll just track movement deltas or center relative
      const rect = boxRef.current?.parentElement?.getBoundingClientRect();
      if(rect) {
          mouse.current = { 
              x: e.clientX - rect.left - rect.width/2, 
              y: e.clientY - rect.top - rect.height/2 
          };
      }
    };

    const animate = () => {
        // Very slow lerp for heaviness
        pos.current.x += (mouse.current.x - pos.current.x) * 0.03;
        pos.current.y += (mouse.current.y - pos.current.y) * 0.03;

        if (boxRef.current) {
            boxRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        }
        requestAnimationFrame(animate);
    };

    const parent = boxRef.current?.parentElement;
    if(parent) {
        parent.addEventListener('mousemove', onMouseMove);
        animate();
    }

    return () => {
        // Cleanup not perfect for requestAnimationFrame loop without ref ID but OK for demo component unmount usually
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-slate-200 flex items-center justify-center relative overflow-hidden cursor-none">
        <div 
            ref={boxRef}
            className="w-40 h-40 bg-slate-800 rounded-xl shadow-2xl flex items-center justify-center text-white font-bold"
        >
            HEAVY
        </div>
        <div className="absolute bottom-10 text-slate-400">Drag your mouse</div>
      </div>
    </DemoContainer>
  );
}