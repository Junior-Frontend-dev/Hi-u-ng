import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextInk() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#f5f5f5] flex items-center justify-center">
        
        {/* SVG Filter for Ink Bleed */}
        <svg className="hidden">
            <defs>
                <filter id="ink-bleed">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </defs>
        </svg>

        <h1 className="text-9xl font-black text-black filter-[url(#ink-bleed)] animate-ink-reveal opacity-0">
            INK
        </h1>

        <style>{`
            @keyframes ink-reveal {
                0% { opacity: 0; filter: url(#ink-bleed) blur(20px); letter-spacing: 50px; }
                100% { opacity: 1; filter: url(#ink-bleed) blur(0px); letter-spacing: 0px; }
            }
            .animate-ink-reveal {
                animation: ink-reveal 3s forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}