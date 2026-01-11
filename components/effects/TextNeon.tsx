import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextNeon() {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const loop = () => {
        // Random flickering pattern
        const delay = Math.random() * 2000 + 500;
        setTimeout(() => {
            setFlicker(true);
            setTimeout(() => {
                setFlicker(false);
                // Maybe a second quick flicker
                if(Math.random() > 0.5) {
                    setTimeout(() => {
                        setFlicker(true);
                        setTimeout(() => setFlicker(false), 50);
                    }, 100);
                }
                loop();
            }, 50 + Math.random() * 100);
        }, delay);
    };
    loop();
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#050505] flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/brick-wall-dark.png')]">
        <div className="relative group">
            <h1 className={`
                text-9xl font-black uppercase tracking-wider
                transition-all duration-75
                ${flicker ? 'text-gray-800 opacity-30 blur-[1px]' : 'text-white opacity-100'}
            `}
            style={{
                textShadow: flicker 
                    ? 'none' 
                    : `
                        0 0 5px #fff,
                        0 0 10px #fff,
                        0 0 20px #ff00de,
                        0 0 30px #ff00de,
                        0 0 40px #ff00de,
                        0 0 55px #ff00de,
                        0 0 75px #ff00de
                    `
            }}
            >
                OPEN
            </h1>
            
            {/* Reflection on floor */}
            <h1 className={`
                text-9xl font-black uppercase tracking-wider absolute top-full left-0
                transform scale-y-[-0.3] origin-top opacity-20 blur-sm
                ${flicker ? 'text-gray-800 opacity-5' : 'text-pink-500'}
            `}>
                OPEN
            </h1>
        </div>
      </div>
    </DemoContainer>
  );
}