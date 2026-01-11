import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function BrandLivingLogo() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Eye tracking state
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [shy, setShy] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      
      // Local coordinates
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setMouse({ x, y });

      // Pupil tracking limit
      const limit = 10;
      const angle = Math.atan2(y, x);
      const dist = Math.min(limit, Math.sqrt(x*x + y*y) * 0.1);
      
      setPupilPos({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist
      });

      // Shy behavior if too close
      const proximity = Math.sqrt(x*x + y*y);
      setShy(proximity < 100);
    };

    // Random blinking
    const blinkInterval = setInterval(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 200);
    }, 3000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearInterval(blinkInterval);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#f0f0f0] flex items-center justify-center">
        <svg 
            ref={svgRef}
            width="300" 
            height="300" 
            viewBox="0 0 200 200"
            className="transition-transform duration-300 ease-out"
            style={{ 
                transform: shy ? 'scale(0.8)' : 'scale(1)',
                filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.2))'
            }}
        >
            {/* Body Shape */}
            <path 
                d="M50,150 Q100,200 150,150 Q180,100 150,50 Q100,0 50,50 Q20,100 50,150 Z" 
                fill="#3b82f6"
                className="transition-all duration-1000 ease-in-out"
                style={{
                    // Breathe effect
                    transform: `scale(${shy ? 0.95 : 1.02})`,
                    transformOrigin: 'center'
                }}
            />

            {/* Eyes Group */}
            <g transform={`translate(${pupilPos.x}, ${pupilPos.y})`}>
                {/* Left Eye */}
                <g transform="translate(70, 90)">
                    <circle r="15" fill="white" />
                    <circle r="6" fill="black" transform={`translate(${pupilPos.x * 0.5}, ${pupilPos.y * 0.5})`}>
                        {shy && <animate attributeName="r" to="3" dur="0.2s" fill="freeze" />}
                    </circle>
                    {/* Eyelid */}
                    <rect 
                        x="-20" y="-20" width="40" height={blink ? "40" : "0"} 
                        fill="#3b82f6" 
                        className="transition-all duration-100"
                    />
                </g>

                {/* Right Eye */}
                <g transform="translate(130, 90)">
                    <circle r="15" fill="white" />
                    <circle r="6" fill="black" transform={`translate(${pupilPos.x * 0.5}, ${pupilPos.y * 0.5})`}>
                        {shy && <animate attributeName="r" to="3" dur="0.2s" fill="freeze" />}
                    </circle>
                    {/* Eyelid */}
                    <rect 
                        x="-20" y="-20" width="40" height={blink ? "40" : "0"} 
                        fill="#3b82f6"
                        className="transition-all duration-100"
                    />
                </g>
            </g>

            {/* Mouth */}
            {shy ? (
                <circle cx="100" cy="140" r="5" fill="black" opacity="0.3" />
            ) : (
                <path 
                    d="M80,140 Q100,150 120,140" 
                    fill="none" 
                    stroke="black" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    opacity="0.3"
                />
            )}
        </svg>
      </div>
    </DemoContainer>
  );
}