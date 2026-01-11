import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextGlitchHover() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex items-center justify-center">
        
        <h1 
            className="text-8xl md:text-9xl font-black text-white relative cursor-pointer select-none group transition-all duration-100"
            data-text="ANALOG"
        >
            ANALOG
            {/* The glitch layers are handled via CSS classes defined below */}
        </h1>

        <style>{`
            /* Base State */
            [data-text] {
                position: relative;
            }
            
            /* Glitch Layers using ::before and ::after */
            [data-text]::before,
            [data-text]::after {
                content: attr(data-text);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                transition: opacity 0.1s;
            }

            /* Red Channel (Left) */
            [data-text]::before {
                color: #ff00c1;
                z-index: -1;
            }

            /* Blue Channel (Right) */
            [data-text]::after {
                color: #00fff9;
                z-index: -2;
            }

            /* Hover Animation */
            .group:hover [data-text]::before {
                opacity: 1;
                animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
            }
            .group:hover [data-text]::after {
                opacity: 1;
                animation: glitch-anim-2 3s infinite linear alternate-reverse;
            }

            /* Main text jitter */
            .group:hover {
                animation: glitch-skew 1s infinite linear alternate-reverse;
            }

            @keyframes glitch-anim-1 {
                0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
                20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
                40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
                60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
                80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
                100% { clip-path: inset(30% 0 20% 0); transform: translate(1px, -1px); }
            }

            @keyframes glitch-anim-2 {
                0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
                20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 1px); }
                40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 2px); }
                60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, -2px); }
                80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, -1px); }
                100% { clip-path: inset(0% 0 80% 0); transform: translate(-1px, 1px); }
            }

            @keyframes glitch-skew {
                0% { transform: skew(0deg); }
                20% { transform: skew(-2deg); }
                40% { transform: skew(2deg); }
                60% { transform: skew(-1deg); }
                80% { transform: skew(1deg); }
                100% { transform: skew(0deg); }
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}