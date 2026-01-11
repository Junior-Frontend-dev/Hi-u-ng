import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeVolumetric() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.3 }); // Normalized position (0-1)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Update ref directly to avoid re-triggering effect
    mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    // Configuration
    const rayCount = 15;
    const particleCount = 150;
    
    // State
    const rays = Array.from({ length: rayCount }, () => ({
      angle: Math.random() * Math.PI * 0.5 + Math.PI * 0.25, // Cone downwards
      width: Math.random() * 0.2 + 0.05,
      alpha: Math.random() * 0.1,
      speed: Math.random() * 0.001 + 0.0005,
      offset: Math.random() * Math.PI * 2 // For oscillation
    }));

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 0.5,
      life: Math.random()
    }));

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      // Smoothly interpolate source position towards mouse
      // We assume source is at top, X moves with mouse
      const sourceX = width * mouseRef.current.x;
      const sourceY = height * mouseRef.current.y * 0.5 - 100; // Above screen, moves down slightly

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Background Glow
      const glow = ctx.createRadialGradient(sourceX, sourceY, 0, sourceX, sourceY, width * 0.8);
      glow.addColorStop(0, 'rgba(60, 80, 100, 0.3)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Rays
      ctx.globalCompositeOperation = 'screen'; // Additive blending for light
      
      rays.forEach((ray, i) => {
        // Oscillate ray properties
        const currentAngle = ray.angle + Math.sin(time * ray.speed + ray.offset) * 0.1;
        const currentAlpha = 0.02 + Math.abs(Math.sin(time * ray.speed * 2 + ray.offset)) * 0.05;
        
        // Calculate triangle points
        // Tip is at source
        // Base is calculated by projecting angle downwards
        const rayLength = height * 1.5;
        const x1 = sourceX;
        const y1 = sourceY;
        
        const x2 = sourceX + Math.cos(currentAngle - ray.width) * rayLength;
        const y2 = sourceY + Math.sin(currentAngle - ray.width) * rayLength;
        
        const x3 = sourceX + Math.cos(currentAngle + ray.width) * rayLength;
        const y3 = sourceY + Math.sin(currentAngle + ray.width) * rayLength;

        // Draw Ray
        const gradient = ctx.createLinearGradient(x1, y1, (x2+x3)/2, (y2+y3)/2);
        gradient.addColorStop(0, `rgba(200, 220, 255, ${currentAlpha * 2})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
      });

      // 3. Draw Particles (Dust)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.005;

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw
        ctx.globalAlpha = Math.abs(Math.sin(p.life * Math.PI)) * 0.5; // Blink
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      time += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', handleResize);
    render();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black relative flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        <div className="relative z-10 text-center mix-blend-overlay pointer-events-none select-none">
            <h1 className="text-8xl font-black text-white tracking-tighter opacity-80">ATMOS</h1>
            <p className="text-white/60 tracking-[1em] text-xs font-bold mt-4 uppercase">Volumetric Lighting</p>
        </div>
      </div>
    </DemoContainer>
  );
}