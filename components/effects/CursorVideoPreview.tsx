import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

const LINKS = [
    { title: "Ocean", video: "https://cdn.coverr.co/videos/coverr-waves-crashing-on-sandy-beach-5556/1080p.mp4" },
    { title: "Forest", video: "https://cdn.coverr.co/videos/coverr-green-forest-and-sunlight-4613/1080p.mp4" },
];

export default function CursorVideoPreview() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black flex flex-col items-center justify-center gap-8">
        
        {/* Floating Preview */}
        <div 
            className={`
                fixed z-50 pointer-events-none w-64 aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl
                transition-opacity duration-300 bg-black
                ${activeVideo ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ 
                top: pos.y, 
                left: pos.x, 
                transform: 'translate(20px, -50%)' 
            }}
        >
            {activeVideo && (
                <video src={activeVideo} autoPlay muted loop className="w-full h-full object-cover" />
            )}
        </div>

        {LINKS.map((link, i) => (
            <h2 
                key={i}
                className="text-6xl font-bold text-white/50 hover:text-white transition-colors cursor-pointer"
                onMouseEnter={() => setActiveVideo(link.video)}
                onMouseLeave={() => setActiveVideo(null)}
            >
                {link.title}
            </h2>
        ))}
      </div>
    </DemoContainer>
  );
}