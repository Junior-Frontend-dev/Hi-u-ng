import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Sun, Moon } from 'lucide-react';

export default function BrandTime() {
  const [isDay, setIsDay] = useState(true);

  // Auto toggle for demo
  useEffect(() => {
    const interval = setInterval(() => setIsDay(d => !d), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DemoContainer>
      <div 
        className={`h-full w-full flex items-center justify-center transition-all duration-[2000ms] ${isDay ? 'bg-white' : 'bg-[#0f172a]'}`}
      >
        <div className="relative">
            {/* Logo Shape */}
            <div 
                className={`
                    w-40 h-40 rounded-[2rem] transition-all duration-[2000ms] flex items-center justify-center shadow-2xl
                    ${isDay ? 'bg-blue-600 rotate-0 rounded-3xl' : 'bg-purple-600 rotate-45 rounded-full'}
                `}
            >
                {isDay ? <Sun className="text-white w-20 h-20 animate-spin-slow" /> : <Moon className="text-white w-20 h-20" />}
            </div>
            
            {/* Text */}
            <h1 className={`text-4xl font-black mt-12 text-center transition-colors duration-[2000ms] ${isDay ? 'text-black' : 'text-white'}`}>
                {isDay ? "SOLAR" : "LUNAR"}
            </h1>
        </div>
      </div>
    </DemoContainer>
  );
}