import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeLiquid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
        x: (e.clientX - rect.left),
        y: (e.clientY - rect.top)
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('ThreeLiquid: Canvas context not available');
      return;
    }

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    
    if (width === 0 || height === 0) {
      width = canvas.width = 800;
      height = canvas.height = 600;
    }

    const cols = 40;
    const rows = 40;
    const spacing = 60;
    
    const fov = 400;
    const viewDistance = 300;
    
    let time = 0;
    let animationFrameId: number;
    let isMounted = true;

    const project = (x: number, y: number, z: number) => {
        const scale = fov / (fov + z + viewDistance);
        return {
            x: x * scale + width / 2,
            y: y * scale + height / 2
        };
    };

    const render = () => {
      if (!isMounted) return;
      
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, width, height);

      const startX = -(cols * spacing) / 2;
      const startZ = 0;

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;

      const points = [];
      for (let r = 0; r < rows; r++) {
          const rowPoints = [];
          for (let c = 0; c < cols; c++) {
              const x = startX + c * spacing;
              const z = startZ + r * spacing;
              
              const dist = Math.sqrt(x*x + z*z);
              let y = Math.sin(dist * 0.01 - time) * 30;
              
              y += Math.sin(x * 0.02 + time) * 20;
              y += Math.cos(z * 0.02 + time) * 20;

              const tilt = (mouseRef.current.y / height - 0.5) * 500;
              
              rowPoints.push({ x, y: y + 200, z: z + tilt });
          }
          points.push(rowPoints);
      }

      for (let r = 0; r < rows; r++) {
          ctx.beginPath();
          let first = true;
          for (let c = 0; c < cols; c++) {
              const p = points[r][c];
              const proj = project(p.x, p.y, p.z);
              
              const alpha = 1 - (r / rows);
              ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;

              if (first) {
                  ctx.moveTo(proj.x, proj.y);
                  first = false;
              } else {
                  ctx.lineTo(proj.x, proj.y);
              }
          }
          ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          let first = true;
          for (let r = 0; r < rows; r++) {
              const p = points[r][c];
              const proj = project(p.x, p.y, p.z);
              
              const alpha = 1 - (r / rows);
              ctx.strokeStyle = `rgba(147, 51, 234, ${alpha * 0.6})`;

              if (first) {
                  ctx.moveTo(proj.x, proj.y);
                  first = false;
              } else {
                  ctx.lineTo(proj.x, proj.y);
              }
          }
          ctx.stroke();
      }

      time += 0.05;
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
      <div 
        className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-8xl font-black text-white mix-blend-overlay opacity-80 blur-sm">FLUX</h1>
        </div>
      </div>
    </DemoContainer>
  );
}