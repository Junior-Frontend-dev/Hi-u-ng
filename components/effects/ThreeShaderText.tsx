import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeShaderText() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center">
        <h1 
            className="text-9xl font-black text-transparent bg-clip-text animate-gradient-x"
            style={{
                backgroundImage: 'linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                backgroundSize: '200% 100%'
            }}
        >
            SHADER
        </h1>
        <style>{`
            @keyframes gradient-x {
                0% { background-position: 0% 50%; }
                100% { background-position: 100% 50%; }
            }
            .animate-gradient-x {
                animation: gradient-x 3s linear infinite;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}