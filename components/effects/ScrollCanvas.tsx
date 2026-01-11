import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollCanvas() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 2 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = scrollRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = container.clientWidth;
    let height = canvas.height = container.clientHeight;

    const particles: {x: number, y: number, r: number, speed: number, angle: number}[] = [];
    for(let i=0; i<100; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.1,
            angle: Math.random() * Math.PI * 2
        });
    }

    const render = () => {
        if (!container || !canvas) return;
        
        // Calculate scroll progress directly from container
        const scrollTop = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        // Center point
        const cx = width / 2;
        const cy = height / 2;

        particles.forEach((p, i) => {
            // Expansion logic based on scroll
            const expansion = progress * 300; 
            const rotation = progress * Math.PI * 4;

            // Original position with rotation applied
            const radius = 100 + i * 2 + expansion;
            const theta = p.angle + rotation;

            const x = cx + Math.cos(theta) * radius;
            const y = cy + Math.sin(theta) * radius;

            ctx.beginPath();
            ctx.arc(x, y, p.r + progress * 2, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${200 + i * 2}, 70%, 60%)`;
            ctx.fill();
        });

        // Draw connection lines if close
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 0.1 - progress * 0.1)})`;
        ctx.lineWidth = 0.5;
        // Simple mesh (expensive, limit to few)
        for(let i=0; i<particles.length; i+=5) {
            // ... omitting complex mesh for performance in demo ...
        }

        requestAnimationFrame(render);
    };

    const handleResize = () => {
        width = canvas.width = container.clientWidth;
        height = canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    const rafId = requestAnimationFrame(render);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(rafId);
    };
  }, [scrollRef]);

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />
      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[300vh] relative">
            <canvas ref={canvasRef} className="sticky top-0 w-full h-screen block" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none mix-blend-exclusion text-center">
                <h2 className="text-4xl font-bold mb-2">Particle Expansion</h2>
                <p className="text-sm opacity-70">Canvas driven by scroll position</p>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}