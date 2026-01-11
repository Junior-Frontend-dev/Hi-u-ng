import React, { useState, useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';
import { HelpCircle } from 'lucide-react';

export default function UxHesitation() {
  const [hesitationDetected, setHesitationDetected] = useState(false);
  const [lastMove, setLastMove] = useState(Date.now());
  const mousePos = useRef({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let checkInterval: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setLastMove(Date.now());
      setHesitationDetected(false); // Reset on active movement
    };

    const checkForHesitation = () => {
      const now = Date.now();
      const timeSinceMove = now - lastMove;
      
      // If idle for > 1s but < 5s (not abandoned)
      if (timeSinceMove > 1000 && timeSinceMove < 5000) {
        // Check proximity to button
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const dist = Math.sqrt(
            Math.pow(mousePos.current.x - btnX, 2) + 
            Math.pow(mousePos.current.y - btnY, 2)
          );

          // If close enough (within 300px) but not clicking
          if (dist < 300 && dist > 50) {
            setHesitationDetected(true);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    checkInterval = window.setInterval(checkForHesitation, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(checkInterval);
    };
  }, [lastMove]);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center p-8 relative">
        
        <h2 className="text-3xl text-white mb-8">Hover nearby but don't click...</h2>

        <div className="relative">
            <button 
                ref={buttonRef}
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-500 transition-colors shadow-xl"
                onClick={() => alert("Action confirmed!")}
            >
                Confirm Action
            </button>

            {/* Hesitation Helper */}
            <div 
                className={`
                    absolute top-full mt-6 left-1/2 -translate-x-1/2 w-64 p-4 bg-white text-black rounded-xl shadow-2xl
                    transition-all duration-500 ease-out flex items-start gap-3
                    ${hesitationDetected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
            >
                <HelpCircle className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                    <p className="font-bold text-sm mb-1">Unsure?</p>
                    <p className="text-xs text-gray-600">Clicking confirm will save your changes permanently. Need more info?</p>
                </div>
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
            </div>
        </div>

      </div>
    </DemoContainer>
  );
}