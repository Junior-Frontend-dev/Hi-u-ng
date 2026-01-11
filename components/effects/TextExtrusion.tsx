import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextExtrusion() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-yellow-400 flex items-center justify-center">
        
        {/* 
            Long text shadow simulation for extrusion.
            Real implementation might use JS loops for generating shadows based on mouse pos.
            Here we use a static impressive hover effect.
        */}
        <h1 className="text-9xl font-black text-white cursor-pointer transition-all duration-300 hover:-translate-y-4 hover:translate-x-4 hover:shadow-[1px_1px_0px_#000,2px_2px_0px_#000,4px_4px_0px_#000,8px_8px_0px_#000,16px_16px_0px_#000]">
            EXTRUDE
        </h1>

      </div>
    </DemoContainer>
  );
}