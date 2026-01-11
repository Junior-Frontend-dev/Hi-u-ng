import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ThreeEnvStory() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 4 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = scrollRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = container.clientWidth;
    let height = canvas.height = container.clientHeight;

    // --- Configuration ---
    const fov = 300;
    const totalDepth = 10000; 
    const numTrees = 300;
    const roadWidth = 300;

    // --- Generate Scene Objects ---
    const objects: {x: number, y: number, z: number, type: 'tree'|'bush', scale: number, rotation: number, color: string}[] = [];
    
    // Seeded random-ish helper
    const random = () => Math.random();

    for(let i=0; i<numTrees; i++) {
        const z = random() * totalDepth;
        // Scatter x, avoid center road
        let x = (random() - 0.5) * width * 6; 
        if (Math.abs(x) < roadWidth) x = x > 0 ? x + roadWidth : x - roadWidth;
        
        const type = random() > 0.8 ? 'bush' : 'tree';
        const scale = 0.8 + random() * 1.5;
        
        // Dark moody colors
        const color = type === 'tree' 
            ? `hsl(215, 20%, ${10 + random() * 10}%)` // Dark Slate
            : `hsl(215, 25%, ${5 + random() * 5}%)`; // Darker Bush

        objects.push({
            x,
            y: 300, // Ground level offset
            z,
            type,
            scale,
            rotation: (random() - 0.5) * 0.2,
            color
        });
    }

    const sortObjects = (a: any, b: any) => b.renderZ - a.renderZ;

    const render = () => {
        if (!container || !canvas) return;
        
        // 1. Calculate Scroll/Camera
        const scrollTop = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
        
        const cameraZ = progress * (totalDepth - 2000); // Stop before running out of world

        // 2. Clear & Sky Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
        skyGrad.addColorStop(0, '#020617'); // Slate 950
        skyGrad.addColorStop(1, '#1e293b'); // Slate 800
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // 3. Ground Plane
        const groundGrad = ctx.createLinearGradient(0, height/2 + 50, 0, height);
        groundGrad.addColorStop(0, '#0f172a'); // Horizon
        groundGrad.addColorStop(1, '#020617'); // Near
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, height/2 + 50, width, height/2 - 50);

        // 4. Moon/Sun
        ctx.fillStyle = '#f8fafc';
        ctx.globalAlpha = 0.1;
        ctx.beginPath();
        ctx.arc(width/2, height/3, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // 5. Projection & Rendering
        const renderList = objects.map(obj => ({ ...obj, renderZ: obj.z - cameraZ }));
        
        // Filter visible (in front of camera and not too far)
        const visible = renderList
            .filter(o => o.renderZ > 10 && o.renderZ < 3000)
            .sort(sortObjects);

        visible.forEach(obj => {
            const scale = fov / (fov + obj.renderZ);
            const x2d = obj.x * scale + width / 2;
            const y2d = obj.y * scale + height / 2;
            
            // Depth Fog (Alpha)
            const alpha = Math.min(1, (3000 - obj.renderZ) / 1000);
            
            ctx.save();
            ctx.translate(x2d, y2d);
            ctx.scale(scale * obj.scale, scale * obj.scale);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = obj.color;
            ctx.strokeStyle = 'rgba(255,255,255,0.05)'; // Subtle edge

            if (obj.type === 'tree') {
                // Tree Shape
                ctx.beginPath();
                ctx.moveTo(0, -400); // Top
                ctx.lineTo(80, 0);   // Right base
                ctx.lineTo(-80, 0);  // Left base
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                
                // Trunk
                ctx.fillStyle = '#000';
                ctx.fillRect(-10, 0, 20, 40);
            } else {
                // Bush/Rock Shape
                ctx.beginPath();
                ctx.arc(0, 0, 50, 0, Math.PI, true); // Semi-circle
                ctx.fill();
            }

            ctx.restore();
        });

        // 6. Vignette Overlay
        const vignette = ctx.createRadialGradient(width/2, height/2, width/4, width/2, height/2, width);
        vignette.addColorStop(0, 'transparent');
        vignette.addColorStop(1, 'rgba(0,0,0,0.8)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0,0,width,height);

        requestAnimationFrame(render);
    };

    const handleResize = () => {
        width = canvas.width = container.clientWidth;
        height = canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', handleResize);
    const raf = requestAnimationFrame(render);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(raf);
    };
  }, [scrollRef]);

  // Story Text Component
  const StoryText = ({ text, peak, subtext }: { text: string, peak: number, subtext?: string }) => (
    <div 
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6"
        style={{ 
            opacity: `calc(1 - min(1, abs(var(--scroll-percent, 0) - ${peak}) * 8))`, // Fade in/out around peak
            transform: `scale(calc(0.8 + (1 - min(1, abs(var(--scroll-percent, 0) - ${peak}) * 8)) * 0.2))` // Subtle zoom in
        }}
    >
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl mb-4">{text}</h1>
        {subtext && <p className="text-xl md:text-2xl text-slate-300 font-serif italic max-w-xl">{subtext}</p>}
    </div>
  );

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-slate-950">
        <div className="h-[600vh] relative">
            <canvas ref={canvasRef} className="sticky top-0 w-full h-screen block" />
            
            <StoryText text="THE EDGE" peak={0.1} subtext="Where the known world ends and the silence begins." />
            <StoryText text="WILDERNESS" peak={0.4} subtext="Nature's geometry, untamed and infinite." />
            <StoryText text="THE UNKNOWN" peak={0.8} subtext="We are but visitors in this ancient code." />
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 animate-bounce pointer-events-none"
                 style={{ opacity: 'calc(1 - var(--scroll-percent, 0) * 5)' }}>
                SCROLL TO EXPLORE
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}