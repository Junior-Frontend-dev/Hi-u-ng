import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function MotionDecay() {
  const [energy, setEnergy] = useState(0);

  const boost = () => setEnergy(100);

  // Simulation frame logic usually needed for true decay,
  // here simulating via keyframes is hard as they loop.
  // We use inline styles for a damped sine wave approximation.
  
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center gap-20">
        
        <div className="relative h-64 w-2 bg-white/10 rounded-full">
            <div 
                className="absolute bottom-0 w-8 h-8 bg-red-500 rounded-full -left-3 transition-transform duration-75 ease-linear"
                style={{ 
                    // Simple pendulum simulation: visual only for demo using keyframes on click isn't ideal.
                    // Let's use CSS animation that we re-trigger.
                    animation: energy > 0 ? 'decay-swing 3s ease-out forwards' : 'none'
                }}
                onAnimationEnd={() => setEnergy(0)}
            ></div>
        </div>

        <button onClick={boost} className="px-8 py-3 bg-white text-black font-bold rounded-full">
            Push
        </button>

        <style>{`
            @keyframes decay-swing {
                0% { transform: translateY(0) rotate(0deg); }
                10% { transform: rotate(45deg) translateY(-100px) rotate(-45deg); }
                30% { transform: rotate(-35deg) translateY(-80px) rotate(35deg); }
                50% { transform: rotate(25deg) translateY(-50px) rotate(-25deg); }
                70% { transform: rotate(-15deg) translateY(-30px) rotate(15deg); }
                90% { transform: rotate(5deg) translateY(-10px) rotate(-5deg); }
                100% { transform: translateY(0); }
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}