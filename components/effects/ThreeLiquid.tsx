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
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    // Grid Config
    const cols = 40;
    const rows = 40;
    const spacing = 60;
    
    // 3D Projection Config
    const fov = 400;
    const viewDistance = 300;
    
    // Animation
    let time = 0;

    const project = (x: number, y: number, z: number) => {
        const scale = fov / (fov + z + viewDistance);
        return {
            x: x * scale + width / 2,
            y: y * scale + height / 2
        };
    };

    const render = () => {
        ctx.fillStyle = '#050510'; // Deep blue/black
        ctx.fillRect(0, 0, width, height);

        // Center mesh
        const startX = -(cols * spacing) / 2;
        const startZ = 0; // Starts at screen plane and goes back

        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1;

        // Calculate points
        const points = [];
        for (let r = 0; r < rows; r++) {
            const rowPoints = [];
            for (let c = 0; c < cols; c++) {
                const x = startX + c * spacing;
                const z = startZ + r * spacing;
                
                // Base Wave
                const dist = Math.sqrt(x*x + z*z);
                let y = Math.sin(dist * 0.01 - time) * 30; // Ripple from center
                
                // Add secondary complex wave
                y += Math.sin(x * 0.02 + time) * 20;
                y += Math.cos(z * 0.02 + time) * 20;

                // Mouse interaction (Local turbulence)
                // Project mouse to approximate 3D plane (simplified)
                // We just check 2D distance for effect visual
                // Actually easier to just check grid index vs mouse relative %
                
                // Tilt entire plane based on mouse y
                const tilt = (mouseRef.current.y / height - 0.5) * 500;
                
                rowPoints.push({ x, y: y + 200, z: z + tilt }); // +200 to push floor down
            }
            points.push(rowPoints);
        }

        // Draw Mesh Lines (Horizontal)
        for (let r = 0; r < rows; r++) {
            ctx.beginPath();
            let first = true;
            for (let c = 0; c < cols; c++) {
                const p = points[r][c];
                const proj = project(p.x, p.y, p.z);
                
                // Distance fade
                const alpha = 1 - (r / rows);
                ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`; // Cyan

                if (first) {
                    ctx.moveTo(proj.x, proj.y);
                    first = false;
                } else {
                    ctx.lineTo(proj.x, proj.y);
                }
            }
            ctx.stroke();
        }

        // Draw Mesh Lines (Vertical)
        for (let c = 0; c < cols; c++) {
            ctx.beginPath();
            let first = true;
            for (let r = 0; r < rows; r++) {
                const p = points[r][c];
                const proj = project(p.x, p.y, p.z);
                
                // Distance fade
                const alpha = 1 - (r / rows);
                ctx.strokeStyle = `rgba(147, 51, 234, ${alpha * 0.6})`; // Purple tint vertical

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
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-8xl font-black text-white mix-blend-overlay opacity-80 blur-sm">FLUX</h1>
        </div>
      </div>
    </DemoContainer>
  );
}