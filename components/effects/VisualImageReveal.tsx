import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const LINKS = [
    { title: "Milan", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80" },
    { title: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
    { title: "New York", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80" },
    { title: "Tokyo", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
];

export default function VisualImageReveal() {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // We want the image to follow the cursor but be constrained to the container
    // For simplicity in this demo container, we just use relative coords
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-neutral-900 flex flex-col justify-center px-12 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Floating Reveal Image */}
        <div 
            className="absolute pointer-events-none transition-opacity duration-300 ease-out z-0"
            style={{
                top: 0,
                left: 0,
                transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%, -50%)`,
                opacity: activeImg ? 0.8 : 0,
                width: '300px',
                height: '400px',
            }}
        >
            {activeImg && (
                <img src={activeImg} className="w-full h-full object-cover rounded-lg shadow-2xl animate-scale-in" />
            )}
        </div>

        <ul className="relative z-10 space-y-4">
            {LINKS.map((link, i) => (
                <li key={i}>
                    <button 
                        className="text-6xl md:text-8xl font-bold text-white/20 hover:text-white transition-colors duration-300 hover:translate-x-4 block w-full text-left"
                        onMouseEnter={() => setActiveImg(link.img)}
                        onMouseLeave={() => setActiveImg(null)}
                    >
                        {link.title}
                    </button>
                    <div className="w-full h-px bg-white/10 mt-4"></div>
                </li>
            ))}
        </ul>

        <style>{`
            @keyframes scale-in {
                from { transform: scale(0.8); }
                to { transform: scale(1); }
            }
            .animate-scale-in {
                animation: scale-in 0.3s ease-out forwards;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}