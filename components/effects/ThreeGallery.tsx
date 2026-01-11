import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ThreeGallery() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 4 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    // Gallery Config
    const fov = 400;
    const numFrames = 30;
    const tunnelRadius = 300;
    const tunnelLength = 4000;

    // Generate Frames
    const frames = Array.from({ length: numFrames }, (_, i) => {
        const angle = (i / numFrames) * Math.PI * 2 * 3; // Spiral
        return {
            x: Math.cos(angle) * tunnelRadius,
            y: Math.sin(angle) * tunnelRadius,
            z: i * (tunnelLength / numFrames),
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            rotation: angle
        };
    });

    let scrollZ = 0;
    let lastScrollTop = 0;

    const render = () => {
        if (!scrollRef.current) return;
        
        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        // Update Z based on scroll
        const scrollTop = scrollRef.current.scrollTop;
        const velocity = scrollTop - lastScrollTop;
        lastScrollTop = scrollTop;
        
        // Base movement + Scroll velocity
        scrollZ += 2 + velocity * 2;

        // Draw center glow
        const centerGrad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 300);
        centerGrad.addColorStop(0, '#1a1a2e');
        centerGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = centerGrad;
        ctx.fillRect(0, 0, width, height);

        // Sort frames by depth (furthest first) to handle overlap correctly
        const renderList = frames.map(f => {
            // Calculate relative Z
            let z = f.z - scrollZ;
            // Wrap around
            while (z < -fov) z += tunnelLength;
            while (z > tunnelLength - fov) z -= tunnelLength;
            return { ...f, renderZ: z };
        }).sort((a, b) => b.renderZ - a.renderZ);

        renderList.forEach(f => {
            if (f.renderZ <= -fov + 10) return; // Behind camera

            const scale = fov / (fov + f.renderZ);
            const x2d = f.x * scale + width / 2;
            const y2d = f.y * scale + height / 2;
            
            // Fade out in distance
            const alpha = Math.min(1, Math.max(0, (tunnelLength - f.renderZ) / 2000));
            const w = 150 * scale;
            const h = 200 * scale;

            ctx.save();
            ctx.translate(x2d, y2d);
            // ctx.rotate(f.rotation); // Optional: Rotate frames to face center
            ctx.globalAlpha = alpha;
            
            // Frame Border
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 2 * scale;
            ctx.strokeRect(-w/2, -h/2, w, h);

            // "Art" Content
            ctx.fillStyle = f.color;
            ctx.fillRect(-w/2 + 5*scale, -h/2 + 5*scale, w - 10*scale, h - 10*scale);
            
            // Glare
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.beginPath();
            ctx.moveTo(-w/2, -h/2);
            ctx.lineTo(w/2, -h/2);
            ctx.lineTo(-w/2, h/2);
            ctx.fill();

            ctx.restore();
        });

        requestAnimationFrame(render);
    };

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', handleResize);
    render();

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, [scrollRef]);

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      {/* The scrollable area acts as a "controller" for the canvas speed */}
      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[1000vh] relative">
            <canvas ref={canvasRef} className="sticky top-0 w-full h-screen block" />
            
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-20 z-10">
                <h1 className="text-6xl font-black text-white mix-blend-difference mb-2">INFINITE</h1>
                <p className="text-white/50 text-sm tracking-widest uppercase">Scroll to Fly</p>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}