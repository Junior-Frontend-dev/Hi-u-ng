import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function VietnamDrum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('VietnamDrum: Canvas context not available');
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

    const drawPatternRing = (radius: number, count: number, type: 'triangle' | 'circle' | 'bird' | 'deer', rotation: number) => {
        ctx.save();
        ctx.rotate(rotation);
        const angleStep = (Math.PI * 2) / count;
        
        for (let i = 0; i < count; i++) {
            const angle = i * angleStep;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI/2);

            if (type === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(0, -5);
                ctx.lineTo(4, 5);
                ctx.lineTo(-4, 5);
                ctx.closePath();
                ctx.fill();
            } else if (type === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(0, 0, 1, 0, Math.PI * 2);
                ctx.fillStyle = '#78350f';
                ctx.fill();
                ctx.fillStyle = 'rgba(252, 211, 77, 0.4)';
            } else if (type === 'bird') {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-12, 6);
                ctx.lineTo(0, -18);
                ctx.lineTo(12, 6);
                ctx.lineTo(0, 22);
                ctx.closePath();
                ctx.stroke();
            } else if (type === 'deer') {
                ctx.beginPath();
                ctx.moveTo(-5, 0);
                ctx.lineTo(5, 0);
                ctx.lineTo(0, -10);
                ctx.closePath();
                ctx.stroke();
            }
            ctx.restore();
        }
        ctx.restore();
    };

    const render = () => {
      if (!isMounted) return;
      
      ctx.fillStyle = '#0f0c05';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      
      const baseRot = time * 0.001 + (mouseRef.current.x / width) * 0.2;

      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 320);
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(0.2, '#b45309');
      grad.addColorStop(0.5, '#78350f');
      grad.addColorStop(0.9, '#292524');
      grad.addColorStop(1, '#0c0a09');
      
      ctx.save();
      ctx.translate(cx, cy);
      
      ctx.beginPath();
      ctx.arc(0, 0, 300, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      
      ctx.strokeStyle = '#fcd34d'; 
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#fffbeb';
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#fbbf24';
      const sunSpikes = 14;
      ctx.beginPath();
      for(let i=0; i<sunSpikes * 2; i++) {
          const r = i % 2 === 0 ? 50 : 15;
          const a = (Math.PI * 2 * i) / (sunSpikes * 2) + time * 0.005;
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(252, 211, 77, 0.5)'; 
      ctx.strokeStyle = 'rgba(252, 211, 77, 0.7)';
      ctx.lineWidth = 1.5;
      
      drawPatternRing(70, 30, 'triangle', baseRot);
      ctx.beginPath(); ctx.arc(0,0, 85, 0, Math.PI*2); ctx.stroke();

      drawPatternRing(100, 40, 'circle', -baseRot * 1.5); 
      ctx.beginPath(); ctx.arc(0,0, 115, 0, Math.PI*2); ctx.stroke();

      ctx.lineWidth = 2;
      drawPatternRing(160, 16, 'bird', baseRot * 2 + time * 0.002);
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0,0, 200, 0, Math.PI*2); ctx.stroke();

      drawPatternRing(230, 24, 'triangle', -baseRot + 0.5);
      ctx.beginPath(); ctx.arc(0,0, 260, 0, Math.PI*2); ctx.stroke();

      drawPatternRing(280, 80, 'triangle', baseRot * 0.5);
      
      ctx.restore();

      const mx = mouseRef.current.active ? mouseRef.current.x : width/2 + Math.cos(time*0.02)*150;
      const my = mouseRef.current.active ? mouseRef.current.y : height/2 + Math.sin(time*0.02)*150;
      
      const shine = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
      shine.addColorStop(0, 'rgba(255,255,255,0.2)');
      shine.addColorStop(1, 'rgba(255,255,255,0)');
      
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = shine;
      ctx.fillRect(0,0,width,height);
      ctx.globalCompositeOperation = 'source-over';

      ctx.fillStyle = '#fbbf24';
      for(let i=0; i<30; i++) {
          const angle = (time * 0.01 + i) % (Math.PI*2);
          const radius = 300 + Math.sin(time * 0.03 + i) * 30;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          
          ctx.globalAlpha = 0.3 + Math.sin(time * 0.1 + i) * 0.3;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI*2);
          ctx.fill();
      }
      ctx.globalAlpha = 1;

      time += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true
        };
    };
    
    const handleMouseLeave = () => {
        mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

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
    animationFrameId = requestAnimationFrame(render);

    return () => {
        isMounted = false;
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full relative bg-[#0f0c05] flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        <div className="absolute top-10 left-10 z-20 select-none pointer-events-none">
            <h2 className="text-yellow-500 font-serif text-3xl tracking-widest drop-shadow-md">ĐÔNG SƠN</h2>
            <p className="text-yellow-700 text-xs mt-1 uppercase tracking-[0.5em]">Bronze Drum</p>
        </div>
      </div>
    </DemoContainer>
  );
}