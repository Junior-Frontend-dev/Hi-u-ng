import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandLogoMorph() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // SVG Paths
  const circlePath = "M 100 20 A 80 80 0 1 1 100 180 A 80 80 0 1 1 100 20 Z";
  const squarePath = "M 20 20 L 180 20 L 180 180 L 20 180 Z";
  const trianglePath = "M 100 20 L 180 180 L 20 180 Z";

  const getPath = () => {
      if (step === 0) return circlePath;
      if (step === 1) return squarePath;
      return trianglePath;
  };

  const getColor = () => {
      if (step === 0) return '#3b82f6';
      if (step === 1) return '#ef4444';
      return '#eab308';
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex items-center justify-center">
        <div className="w-64 h-64 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                <path 
                    d={getPath()} 
                    fill={getColor()}
                    className="transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]"
                />
            </svg>
            <div className="text-center mt-8 font-bold text-gray-400">
                {step === 0 ? "Unity" : step === 1 ? "Stability" : "Growth"}
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}