import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Heart } from 'lucide-react';

export default function UxMicroLike() {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const toggle = () => {
    if(!liked) {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 1000);
    }
    setLiked(!liked);
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-50 flex items-center justify-center">
        
        <button 
            onClick={toggle}
            className="relative p-6 rounded-full bg-white shadow-xl hover:shadow-2xl transition-shadow active:scale-95"
        >
            <Heart 
                size={40} 
                className={`transition-all duration-300 ${liked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-300 scale-100'}`} 
            />
            
            {/* Particles */}
            {animating && (
                <>
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute w-2 h-2 bg-red-500 rounded-full top-1/2 left-1/2 animate-explode-particle"
                            style={{
                                transform: `rotate(${i * 45}deg) translateY(-30px)`,
                                opacity: 0
                            }}
                        />
                    ))}
                    <div className="absolute inset-0 border-2 border-red-500 rounded-full animate-ping-ring opacity-0"></div>
                </>
            )}
        </button>

        <style>{`
            @keyframes explode-particle {
                0% { transform: rotate(var(--rot)) translateY(0); opacity: 1; }
                100% { transform: rotate(var(--rot)) translateY(-60px); opacity: 0; }
            }
            .animate-explode-particle {
                animation: explode-particle 0.6s ease-out forwards;
            }
            @keyframes ping-ring {
                0% { transform: scale(0.8); opacity: 0.5; }
                100% { transform: scale(2); opacity: 0; }
            }
            .animate-ping-ring {
                animation: ping-ring 0.6s ease-out forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}