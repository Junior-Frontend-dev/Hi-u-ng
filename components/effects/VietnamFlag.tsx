import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function VietnamFlag() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('VietnamFlag: Canvas context not available');
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

    const particles: {x: number, y: number, vy: number, alpha: number, size: number}[] = [];
    for(let i=0; i<50; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vy: Math.random() * 1 + 0.5,
            alpha: Math.random(),
            size: Math.random() * 2
        });
    }

    const render = () => {
      if (!isMounted) return;
      
      ctx.clearRect(0, 0, width, height);

      const amplitude = 15;
      const wavelength = 0.015;
      const speed = 0.15;
      
      for (let x = 0; x < width; x++) {
          const wave1 = Math.sin(x * wavelength + time * speed);
          const wave2 = Math.sin(x * wavelength * 2.5 + time * speed * 1.5) * 0.3;
          const displacement = (wave1 + wave2) * amplitude;
          
          const slope = Math.cos(x * wavelength + time * speed);
          const lighting = 1 + slope * 0.25; 

          const r = Math.min(255, 218 * lighting);
          const g = Math.min(255, 37 * lighting);
          const b = Math.min(255, 29 * lighting);

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, 0 + displacement, 1, height);
      }

      const centerX = width / 2;
      const centerWave = Math.sin(centerX * wavelength + time * speed) * amplitude;
      const centerSlope = Math.cos(centerX * wavelength + time * speed);
      
      ctx.save();
      ctx.translate(centerX, height / 2 + centerWave);
      ctx.rotate(centerSlope * 0.08); 
      
      ctx.shadowBlur = 40 + Math.sin(time * 0.1) * 20;
      ctx.shadowColor = 'rgba(255, 255, 0, 0.6)';
      
      ctx.fillStyle = '#FFFF00';
      const drawStar = (cx: number, cy: number, outerRadius: number, innerRadius: number) => {
        const spikes = 5;
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
      };
      drawStar(0, 0, 120, 48);
      ctx.fill();
      ctx.restore();

      particles.forEach(p => {
          p.y -= p.vy;
          if (p.y < 0) {
              p.y = height;
              p.x = Math.random() * width;
          }
          
          const pX = p.x + Math.sin(time * 0.05 + p.y * 0.01) * 20;
          const pAlpha = p.alpha * (0.5 + Math.sin(time * 0.1 + p.y * 0.01) * 0.5);
          
          ctx.fillStyle = `rgba(255, 215, 0, ${pAlpha})`;
          ctx.beginPath();
          ctx.arc(pX, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
      });

      const grad = ctx.createRadialGradient(width/2, height/2, width/4, width/2, height/2, width);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,width,height);

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
    animationFrameId = requestAnimationFrame(render);

    return () => {
        isMounted = false;
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full relative bg-[#8b0000] flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        <div className="absolute bottom-12 w-full text-center z-20 pointer-events-none">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-2xl tracking-[0.2em] uppercase" style={{ fontFamily: 'serif' }}>
                Việt Nam
            </h1>
            <div className="h-px w-24 bg-yellow-500/50 mx-auto mt-4"></div>
            <p className="text-yellow-100/60 text-sm mt-4 font-mono tracking-widest uppercase">Hào Khí Ngàn Năm</p>
        </div>
      </div>
    </DemoContainer>
  );
}