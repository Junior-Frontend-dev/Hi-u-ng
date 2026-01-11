import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandTypography() {
  const [settings, setSettings] = useState({ weight: 400, width: 100, slant: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setSettings({
        weight: 100 + x * 800, // 100-900
        width: 75 + y * 50,    // 75-125
        slant: -10 + x * 20    // -10 to 10
    });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] opacity-10 pointer-events-none">
            {[...Array(400)].map((_, i) => <div key={i} className="border border-white/20"></div>)}
        </div>

        <div className="relative z-10 text-center">
            <h1 
                className="text-white text-8xl md:text-[12vw] leading-none transition-all duration-75"
                style={{
                    fontFamily: '"Inter", sans-serif',
                    fontVariationSettings: `"wght" ${settings.weight}, "wdth" ${settings.width}, "slnt" ${settings.slant}`,
                    // Fallback using transform if variable font axis not fully supported in system fonts
                    fontWeight: settings.weight,
                    transform: `skewX(${settings.slant}deg) scaleX(${settings.width / 100})`
                }}
            >
                BRAND
            </h1>
            <h1 
                className="text-white text-8xl md:text-[12vw] leading-none transition-all duration-75 text-transparent stroke-white"
                style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 1000 - settings.weight, // Inverse weight
                    WebkitTextStroke: '2px white',
                    transform: `skewX(${-settings.slant}deg) scaleX(${settings.width / 100})`
                }}
            >
                MOTION
            </h1>
        </div>

        <div className="absolute bottom-8 left-8 text-white/50 font-mono text-xs space-y-1">
            <p>WEIGHT: {Math.round(settings.weight)}</p>
            <p>WIDTH: {Math.round(settings.width)}%</p>
            <p>SLANT: {Math.round(settings.slant)}deg</p>
        </div>
      </div>
    </DemoContainer>
  );
}