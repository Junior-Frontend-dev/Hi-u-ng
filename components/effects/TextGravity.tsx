import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const TEXT = "GRAVITY";

export default function TextGravity() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex flex-col items-center justify-center cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
        <div className="flex relative h-64 w-full justify-center">
            {TEXT.split('').map((char, i) => (
                <span 
                    key={i}
                    className={`text-8xl font-black text-black inline-block transition-transform duration-1000 ease-[cubic-bezier(0.5,0,0.5,1.5)]`}
                    style={{
                        transform: collapsed 
                            ? `translateY(300px) rotate(${Math.random() * 90 - 45}deg)` 
                            : 'translateY(0) rotate(0deg)',
                        transitionDelay: `${i * 0.05}s`
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
        <p className="text-gray-400 mt-10">Click to Drop</p>
      </div>
    </DemoContainer>
  );
}