import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Moon, Sun } from 'lucide-react';

export default function VisualThemeSwitch() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  return (
    <DemoContainer>
      <div 
        className={`
            h-full w-full flex items-center justify-center transition-colors duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] relative overflow-hidden
            ${theme === 'dark' ? 'bg-[#111] text-white' : 'bg-[#f0f0f0] text-black'}
        `}
      >
        {/* Circular Transition Element (Simulated) */}
        <div 
            className={`absolute w-[200vw] h-[200vw] rounded-full transition-transform duration-700 ease-in-out z-0 pointer-events-none
                ${theme === 'light' ? 'bg-[#f0f0f0] scale-0' : 'bg-[#111] scale-100'}
            `}
            style={{ transformOrigin: 'center' }}
        />
        
        <div className="relative z-10 text-center">
            <h1 className="text-6xl font-bold mb-8 transition-colors duration-300">
                {theme === 'dark' ? 'Midnight' : 'Daybreak'}
            </h1>
            
            <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`
                    w-20 h-10 rounded-full p-1 flex items-center transition-colors duration-300 mx-auto
                    ${theme === 'dark' ? 'bg-white/20' : 'bg-black/10'}
                `}
            >
                <div 
                    className={`
                        w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-black transform transition-transform duration-300
                        ${theme === 'dark' ? 'translate-x-10' : 'translate-x-0'}
                    `}
                >
                    {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                </div>
            </button>
        </div>
      </div>
    </DemoContainer>
  );
}