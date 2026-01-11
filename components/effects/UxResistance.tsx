import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxResistance() {
  const [val, setVal] = useState(50);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    
    // Simulate resistance zones (e.g. around 20-30 and 70-80)
    // If attempting to enter zone, push back or slow down
    // Simple implementation: Skip values or snap
    
    if ((newValue > 20 && newValue < 30) || (newValue > 70 && newValue < 80)) {
        // Resistance: Don't update, or update slightly
        // We'll mimic "stuck" feeling by randomly ignoring updates
        if(Math.random() > 0.8) setVal(newValue); 
    } else {
        setVal(newValue);
    }
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-gray-100 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Tactile Resistance</h2>
        
        <div className="w-full max-w-md relative">
            {/* Visual Zones */}
            <div className="absolute top-0 h-full w-[10%] left-[20%] bg-red-500/20 rounded pointer-events-none border border-red-500/30" />
            <div className="absolute top-0 h-full w-[10%] left-[70%] bg-red-500/20 rounded pointer-events-none border border-red-500/30" />

            <input 
                type="range" 
                min="0" 
                max="100" 
                value={val} 
                onChange={handleChange}
                className="w-full h-12 appearance-none bg-white rounded-full shadow-inner border border-gray-200 cursor-grab active:cursor-grabbing"
                style={{
                    backgroundImage: `linear-gradient(to right, #3b82f6 ${val}%, transparent ${val}%)`
                }}
            />
            
            <div 
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none w-8 h-8 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center text-[10px] font-bold text-gray-600 transition-all duration-75"
                style={{ left: `calc(${val}% - 16px)` }}
            >
                {val}
            </div>
        </div>
        
        <p className="mt-8 text-gray-400 text-sm">Feel the friction at 25% and 75%</p>
      </div>
    </DemoContainer>
  );
}