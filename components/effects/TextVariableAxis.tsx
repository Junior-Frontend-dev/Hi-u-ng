import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextVariableAxis() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-100 flex items-center justify-center">
        {/* Assuming system font or Google Font supports axes, standard Inter supports 'wght'. 
            For true variable axis demo, usually need custom font like Roboto Flex.
            We'll simulate with weight and transform skew.
        */}
        <h1 className="text-8xl text-black animate-variable-font origin-center">
            MORPH
        </h1>

        <style>{`
            @keyframes variable-font {
                0% { font-weight: 100; transform: skewX(0deg) scaleY(1); letter-spacing: 0px; }
                50% { font-weight: 900; transform: skewX(-10deg) scaleY(0.8); letter-spacing: 10px; }
                100% { font-weight: 100; transform: skewX(0deg) scaleY(1); letter-spacing: 0px; }
            }
            .animate-variable-font {
                animation: variable-font 4s infinite ease-in-out;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}