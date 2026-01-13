import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function VietnamMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('VietnamMap: Canvas context not available');
      return;
    }

    let width = canvas.width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.height = canvas.parentElement?.clientHeight || 600;
    
    if (width === 0 || height === 0) {
      width = canvas.width = 800;
      height = canvas.height = 600;
    }
    
    let time = 0;
    let animationFrameId: number;
    let isMounted = true;

    // Particles representing cities/locations
    const cities = [
      { name: 'Hanoi', y: -120, x: 5, size: 4 },
      { name: 'Hue', y: -20, x: 15, size: 3 },
      { name: 'Da Nang', y: 0, x: 20, size: 3 },
      { name: 'Ho Chi Minh', y: 110, x: 10, size: 4 },
      { name: 'Can Tho', y: 130, x: 0, size: 3 }
    ];

    const render = () => {
      if (!isMounted) return;
      
      // Clear with trail effect
      ctx.fillStyle = 'rgba(16, 20, 24, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      
      // Draw map S-shape
      ctx.save();
      ctx.translate(cx, cy);
      
      const scale = Math.min(width, height) * 0.0025;
      ctx.scale(scale, scale);

      // Glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(0, 255, 200, 0.5)';
      ctx.strokeStyle = 'rgba(0, 255, 200, 0.8)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      // Draw main S-curve (rough approximation)
      ctx.beginPath();
      // North
      ctx.moveTo(10, -160);
      ctx.bezierCurveTo(-40, -140, -50, -100, -20, -60);
      // Central
      ctx.bezierCurveTo(10, -20, 60, 20, 40, 60);
      // South
      ctx.bezierCurveTo(20, 100, -30, 120, -20, 160);
      
      // Add subtle movement
      const distort = Math.sin(time * 0.02) * 2;
      ctx.translate(distort, 0);
      
      ctx.stroke();

      // Draw cities
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#fff';
      
      cities.forEach(city => {
        const pulse = Math.sin(time * 0.05 + city.y * 0.01) * 0.5 + 1;
        ctx.beginPath();
        // Adjust city positions relative to curve approximation
        let cx = 0;
        if (city.y < -60) cx = -20 + city.x;
        else if (city.y < 60) cx = 30 + city.x; // Central bulge
        else cx = -10 + city.x; // South
        
        // Simple manual adjustment to follow the curve better
        if(city.name === 'Hanoi') cx = -10;
        if(city.name === 'Hue') cx = 25;
        if(city.name === 'Da Nang') cx = 35;
        if(city.name === 'Ho Chi Minh') cx = 5;
        if(city.name === 'Can Tho') cx = -10;

        ctx.arc(cx, city.y, city.size * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = '10px "Inter", sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(city.name, cx + 10, city.y + 3);
      });

      ctx.restore();

      // Connecting lines (abstract network)
      ctx.strokeStyle = 'rgba(0, 255, 200, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i=0; i<cities.length-1; i++) {
         // This visualizes connections, logic would need actual projected coords
         // For now, simpler ambient particles
      }
      ctx.stroke();


      time += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
        isMounted = false;
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full relative bg-[#101418] flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-8 left-8 text-white/80 z-10 pointer-events-none">
          <h2 className="text-2xl font-bold tracking-tight">Vietnam Map</h2>
          <p className="text-sm opacity-60">Stylized Visualization</p>
        </div>
      </div>
    </DemoContainer>
  );
}
