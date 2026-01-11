import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function VisualBrutalist() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#ffde00] p-8 overflow-y-auto hide-scrollbar font-mono text-black">
        <div className="max-w-3xl mx-auto space-y-8">
            
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
                <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-4">
                    RAW<br/>POWER
                </h1>
                <div className="bg-black text-white inline-block px-4 py-2 font-bold text-xl rotate-2">
                    NEO-BRUTALISM
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="border-4 border-black bg-[#ff9900] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 aspect-square flex items-center justify-center hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                    <span className="text-4xl font-bold">BOLD</span>
                </div>
                <div className="border-4 border-black bg-[#00ccff] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 aspect-square flex items-center justify-center hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                    <span className="text-4xl font-bold">LOUD</span>
                </div>
            </div>

            <div className="border-4 border-black bg-[#ffccff] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
                <p className="text-xl font-bold leading-tight">
                    "Style over substance? No. Style IS substance."
                    <br/><br/>
                    High contrast. Hard shadows. Default fonts. Unapologetic design.
                </p>
                <button className="mt-8 border-2 border-black bg-white px-8 py-3 font-bold hover:bg-black hover:text-white transition-colors uppercase">
                    Click Me
                </button>
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}