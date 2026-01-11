import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxImplicit() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Simulated gaze detection via hover duration
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    itemsRef.current.forEach((el, index) => {
        if (!el) return;
        
        const enter = () => {
            // Implicit: If user hovers for > 500ms, they are interested. Expand.
            const t = setTimeout(() => setExpanded(index), 600);
            timeouts[index] = t;
        };
        const leave = () => {
            clearTimeout(timeouts[index]);
            // Optional: Don't collapse immediately to be less annoying?
            setExpanded(null); 
        };

        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#f3f4f6] flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-gray-400 mb-8 font-mono text-sm">Hover intentionally to expand details</p>
        
        {[0, 1, 2].map(i => (
            <div 
                key={i}
                ref={el => { if(el) itemsRef.current[i] = el }}
                className={`
                    w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden
                    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${expanded === i ? 'h-64' : 'h-20'}
                `}
            >
                <div className="p-6 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-800">Implicit Item {i + 1}</h3>
                    <div className={`w-3 h-3 rounded-full ${expanded === i ? 'bg-blue-500' : 'bg-gray-300'}`} />
                </div>
                <div className="px-6 pb-6 text-gray-500 opacity-0 transition-opacity duration-500 delay-100" style={{ opacity: expanded === i ? 1 : 0 }}>
                    <p>
                        This content revealed itself because you lingered here. 
                        No clicks required. The interface anticipates your interest based on attention time.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200">
                        Action
                    </button>
                </div>
            </div>
        ))}
      </div>
    </DemoContainer>
  );
}