import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionStory() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex items-center justify-center overflow-hidden">
        
        {/* Story: A circle meets a square, they dance, then merge */}
        
        <div className="relative w-64 h-64">
            <div className="absolute w-16 h-16 bg-blue-500 rounded-full animate-story-circle top-1/2 left-0 -translate-y-1/2"></div>
            <div className="absolute w-16 h-16 bg-red-500 rounded-lg animate-story-square top-1/2 right-0 -translate-y-1/2"></div>
        </div>

        <style>{`
            @keyframes story-circle {
                0% { left: 0; border-radius: 50%; background: #3b82f6; }
                30% { left: 40%; transform: scale(1.2); }
                50% { left: 45%; transform: rotate(180deg); }
                70% { left: 40%; background: #8b5cf6; }
                100% { left: 50%; transform: translateX(-50%) scale(2); border-radius: 20%; background: #6366f1; opacity: 0; }
            }
            @keyframes story-square {
                0% { right: 0; transform: rotate(0deg); background: #ef4444; }
                30% { right: 40%; transform: rotate(45deg); }
                50% { right: 45%; transform: rotate(90deg); }
                70% { right: 40%; background: #8b5cf6; }
                100% { right: 50%; transform: translateX(50%) scale(0); opacity: 0; }
            }
            .animate-story-circle { animation: story-circle 4s ease-in-out infinite; }
            .animate-story-square { animation: story-square 4s ease-in-out infinite; }
        `}</style>
      </div>
    </DemoContainer>
  );
}