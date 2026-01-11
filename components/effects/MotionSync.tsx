import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionSync() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex items-center justify-center gap-2">
        {[...Array(5)].map((_, i) => (
            <div 
                key={i}
                className="w-12 bg-white rounded-full animate-bounce-music"
                style={{ 
                    height: '100px',
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.6s'
                }}
            />
        ))}

        <style>{`
            @keyframes bounce-music {
                0%, 100% { height: 40px; }
                50% { height: 150px; background-color: #3b82f6; }
            }
            .animate-bounce-music {
                animation: bounce-music 0.6s ease-in-out infinite;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}