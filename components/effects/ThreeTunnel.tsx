import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize -1 to 1
    mouseRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
        y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    // Tunnel Config
    const numRings = 30;
    const ringSpacing = 150;
    const tunnelRadius = 300;
    const speed = 10;
    
    // State
    let offsetZ = 0;
    let curveX = 0;
    let curveY = 0;

    // 3D Projection Helper
    const project = (x: number, y: number, z: number) => {
        const fov = 400;
        const scale = fov / (fov + z);
        return {
            x: x * scale + width / 2,
            y: y * scale + height / 2,
            scale: scale
        };
    };

    const render = () => {
        // Clear with fade effect for motion blur
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, width, height);

        // Update state
        offsetZ -= speed;
        if (offsetZ <= -ringSpacing) offsetZ = 0;

        // Smooth curve steering
        curveX += (mouseRef.current.x * 200 - curveX) * 0.05;
        curveY += (mouseRef.current.y * 200 - curveY) * 0.05;

        const rings = [];

        // Calculate Ring Positions
        for (let i = 0; i < numRings; i++) {
            const z = i * ringSpacing + offsetZ;
            
            // Apply curve based on depth
            // The further away (higher z), the more shifted x/y are
            const factor = z * 0.002; 
            const x = Math.sin(Date.now() * 0.001 + factor) * 50 + curveX * factor * 2;
            const y = Math.cos(Date.now() * 0.001 + factor) * 50 + curveY * factor * 2;

            rings.push({ x, y, z });
        }

        // Draw Tunnel Walls (Lines connecting rings)
        ctx.lineWidth = 2;
        
        // Corners of the square tunnel
        const corners = [
            { x: -1, y: -1 }, { x: 1, y: -1 }, 
            { x: 1, y: 1 }, { x: -1, y: 1 }
        ];

        for (let i = 0; i < rings.length; i++) {
            const r = rings[i];
            const nextR = rings[i + 1];
            
            // Calculate alpha based on depth (fog)
            const alpha = 1 - (r.z / (numRings * ringSpacing));
            if (alpha <= 0) continue;

            const projectedCorners = corners.map(c => 
                project(r.x + c.x * tunnelRadius, r.y + c.y * tunnelRadius, r.z)
            );

            // Draw Ring
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
            
            ctx.beginPath();
            projectedCorners.forEach((p, idx) => {
                if (idx === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.closePath();
            ctx.stroke();

            // Draw connections to next ring
            if (nextR) {
                const nextProjected = corners.map(c => 
                    project(nextR.x + c.x * tunnelRadius, nextR.y + c.y * tunnelRadius, nextR.z)
                );

                ctx.strokeStyle = `rgba(255, 0, 255, ${alpha * 0.5})`; // Purple connector lines
                ctx.shadowBlur = 0;
                
                for(let j=0; j<4; j++) {
                    ctx.beginPath();
                    ctx.moveTo(projectedCorners[j].x, projectedCorners[j].y);
                    ctx.lineTo(nextProjected[j].x, nextProjected[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(render);
    };

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', handleResize);
    const raf = requestAnimationFrame(render);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        <div className="absolute top-10 left-10 pointer-events-none mix-blend-difference">
            <h1 className="text-6xl font-black text-white tracking-tighter">HYPER<br/>DRIVE</h1>
        </div>
      </div>
    </DemoContainer>
  );
}