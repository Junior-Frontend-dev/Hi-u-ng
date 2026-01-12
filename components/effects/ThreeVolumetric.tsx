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
    if (!ctx) {
      console.warn('ThreeVolumetric: Canvas context not available');
      return;
    }

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    
    if (width === 0 || height === 0) {
      width = canvas.width = 800;
      height = canvas.height = 600;
    }

    const rayCount = 15;
    const particleCount = 150;
    
    const rays = Array.from({ length: rayCount }, () => ({
      angle: Math.random() * Math.PI * 0.5 + Math.PI * 0.25,
      width: Math.random() * 0.2 + 0.05,
      alpha: Math.random() * 0.1,
      speed: Math.random() * 0.001 + 0.0005,
      offset: Math.random() * Math.PI * 2
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
    let isMounted = true;

    const render = () => {
      if (!isMounted) return;
      
      const sourceX = width * mouseRef.current.x;
      const sourceY = height * mouseRef.current.y * 0.5 - 100;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(sourceX, sourceY, 0, sourceX, sourceY, width * 0.8);
      glow.addColorStop(0, 'rgba(60, 80, 100, 0.3)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';
      
      rays.forEach((ray) => {
        const currentAngle = ray.angle + Math.sin(time * ray.speed + ray.offset) * 0.1;
        const currentAlpha = 0.02 + Math.abs(Math.sin(time * ray.speed * 2 + ray.offset)) * 0.05;
        
        const rayLength = height * 1.5;
        const x1 = sourceX;
        const y1 = sourceY;
        
        const x2 = sourceX + Math.cos(currentAngle - ray.width) * rayLength;
        const y2 = sourceY + Math.sin(currentAngle - ray.width) * rayLength;
        
        const x3 = sourceX + Math.cos(currentAngle + ray.width) * rayLength;
        const y3 = sourceY + Math.sin(currentAngle + ray.width) * rayLength;

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

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.005;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = Math.abs(Math.sin(p.life * Math.PI)) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      time += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
        if (width === 0 || height === 0) {
            width = canvas.width = 800;
            height = canvas.height = 600;
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
        isMounted = false;
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
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