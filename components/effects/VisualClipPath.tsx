import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { ArrowRight } from 'lucide-react';

export default function VisualClipPath() {
  const [expanded, setExpanded] = useState(false);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative">
        
        {/* Base Layer */}
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
             <div className="text-center">
                 <h2 className="text-white/50 text-xl mb-4">Click to expand</h2>
                 <button 
                    onClick={() => setExpanded(!expanded)}
                    className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                 >
                     <ArrowRight />
                 </button>
             </div>
        </div>

        {/* Top Layer with Clip Path */}
        <div 
            className="absolute inset-0 bg-blue-600 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)]"
            style={{
                clipPath: expanded ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)',
                pointerEvents: expanded ? 'auto' : 'none'
            }}
        >
            <div className="text-center text-white">
                <h1 className="text-6xl font-black mb-6">UNLEASHED</h1>
                <p className="max-w-md mx-auto text-lg opacity-80 mb-8">
                    The clip-path property allows you to hide specific regions of an element. 
                    Animating it creates dynamic, organic transitions.
                </p>
                <button 
                    onClick={() => setExpanded(false)}
                    className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-blue-600 transition-colors"
                >
                    Close View
                </button>
            </div>
        </div>

      </div>
    </DemoContainer>
  );
}