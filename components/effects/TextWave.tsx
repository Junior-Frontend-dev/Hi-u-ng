import React from 'react';
import { DemoContainer } from '../DemoContainer';

const TEXT = "WAVELENGTH";

export default function TextWave() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-blue-900 flex items-center justify-center">
        <div className="flex">
            {TEXT.split('').map((char, i) => (
                <span 
                    key={i}
                    className="text-8xl font-black text-white animate-text-wave inline-block"
                    style={{ animationDelay: `${i * 0.1}s` }}
                >
                    {char}
                </span>
            ))}
        </div>

        <style>{`
            @keyframes text-wave {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-40px); }
            }
            .animate-text-wave {
                animation: text-wave 2s ease-in-out infinite;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}