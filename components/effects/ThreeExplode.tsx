import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeExplode() {
  const [exploded, setExploded] = useState(false);

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-neutral-900 flex items-center justify-center cursor-pointer"
        onClick={() => setExploded(!exploded)}
      >
        <div className="relative w-40 h-40">
            {/* Center Core */}
            <div className={`absolute inset-0 bg-orange-500 rounded-lg transition-all duration-500 ${exploded ? 'scale-0' : 'scale-100'}`}></div>
            
            {/* Shards */}
            {[...Array(8)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-10 h-10 bg-orange-400 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: exploded 
                            ? `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100px) rotate(45deg)` 
                            : `translate(-50%, -50%) rotate(0deg) translateY(0) scale(0)`,
                        opacity: exploded ? 1 : 0
                    }}
                />
            ))}
        </div>
        <p className="absolute bottom-10 text-white/50">Click to {exploded ? "Assemble" : "Explode"}</p>
      </div>
    </DemoContainer>
  );
}