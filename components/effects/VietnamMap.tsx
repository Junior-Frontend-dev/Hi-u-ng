import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const LOCATIONS = [
    { id: 'hanoi', name: 'Hà Nội', top: '15%', left: '45%', color: 'text-red-500' },
    { id: 'hue', name: 'Huế', top: '45%', left: '55%', color: 'text-purple-500' },
    { id: 'saigon', name: 'TP. Hồ Chí Minh', top: '80%', left: '40%', color: 'text-yellow-500' },
    { id: 'danang', name: 'Đà Nẵng', top: '48%', left: '60%', color: 'text-blue-500' },
    { id: 'halong', name: 'Hạ Long', top: '18%', left: '55%', color: 'text-emerald-500' },
];

export default function VietnamMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex items-center justify-center relative overflow-hidden">
        
        {/* Stylized S-Shape Map Representation */}
        <div className="relative h-[80%] w-full max-w-md">
            {/* SVG Approximation of Vietnam Shape */}
            <svg viewBox="0 0 100 200" className="w-full h-full opacity-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                <path 
                    d="M30,10 Q50,5 60,20 T50,50 T60,90 T40,130 T30,160 T40,190" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-pulse"
                />
            </svg>

            {/* Locations */}
            {LOCATIONS.map((loc) => (
                <div 
                    key={loc.id}
                    className="absolute group cursor-pointer"
                    style={{ top: loc.top, left: loc.left }}
                    onMouseEnter={() => setActive(loc.id)}
                    onMouseLeave={() => setActive(null)}
                >
                    <div className={`w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] transition-transform duration-300 group-hover:scale-150 ${active === loc.id ? 'bg-red-500 shadow-red-500' : ''}`}></div>
                    
                    {/* Tooltip */}
                    <div 
                        className={`
                            absolute left-6 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur border border-white/20 px-4 py-2 rounded-lg
                            transition-all duration-300 w-max z-10
                            ${active === loc.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
                        `}
                    >
                        <span className={`font-bold ${loc.color}`}>{loc.name}</span>
                    </div>
                </div>
            ))}
        </div>

        <div className="absolute top-10 left-10">
            <h1 className="text-6xl font-black text-white/10">VIETNAM</h1>
        </div>

      </div>
    </DemoContainer>
  );
}