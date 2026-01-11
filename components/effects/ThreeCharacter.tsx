import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ThreeCharacter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize mouse position -1 to 1
    mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1) // Invert Y
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    // 3D Math Helpers
    const project = (x: number, y: number, z: number) => {
        const scale = 400 / (400 + z); // Perspective projection
        return {
            x: x * scale + width / 2,
            y: -y * scale + height / 2, // Invert Y for screen coords
            scale
        };
    };

    const rotateY = (x: number, z: number, angle: number) => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            x: x * cos - z * sin,
            z: x * sin + z * cos
        };
    };

    const rotateX = (y: number, z: number, angle: number) => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            y: y * cos - z * sin,
            z: y * sin + z * cos
        };
    };

    // Particles Setup
    const numParticles = 100;
    const radius = 120;
    const particles: {x: number, y: number, z: number}[] = [];

    // Fibonacci Sphere Distribution
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < numParticles; i++) {
        const y = 1 - (i / (numParticles - 1)) * 2; // y goes from 1 to -1
        const r = Math.sqrt(1 - y * y); // radius at y
        const theta = phi * i; 
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        particles.push({ x: x * radius, y: y * radius, z: z * radius });
    }

    let currentRotation = { x: 0, y: 0 };
    let time = 0;

    const render = () => {
        // Clear
        ctx.fillStyle = '#171717'; // Neutral-900 match
        ctx.fillRect(0, 0, width, height);

        // Smoothly interpolate rotation towards mouse
        const targetX = mouseRef.current.y * 0.5; // Mouse Y controls Rotation X
        const targetY = mouseRef.current.x * 0.5; // Mouse X controls Rotation Y
        
        currentRotation.x += (targetX - currentRotation.x) * 0.1;
        currentRotation.y += (targetY - currentRotation.y) * 0.1;

        // Auto spin slightly
        time += 0.005;
        const autoSpin = time;

        const projectedPoints: {x: number, y: number, z: number, scale: number}[] = [];

        // 1. Transform Points
        particles.forEach(p => {
            // Apply rotations
            let { x, z } = rotateY(p.x, p.z, currentRotation.y + autoSpin);
            let { y: newY, z: newZ } = rotateX(p.y, z, currentRotation.x);
            
            // Project
            const proj = project(x, newY, newZ);
            projectedPoints.push({ ...proj, z: newZ }); // Keep z for sorting/depth
        });

        // 2. Draw Connections (Plexus)
        ctx.lineWidth = 0.5;
        for (let i = 0; i < numParticles; i++) {
            for (let j = i + 1; j < numParticles; j++) {
                const p1 = projectedPoints[i];
                const p2 = projectedPoints[j];
                
                // Simple distance check in 2D (screen space) for performance
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < 50) {
                    const alpha = 1 - (dist / 50);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.4})`; // Cyan-400
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        // 3. Draw Nodes
        projectedPoints.forEach(p => {
            const alpha = (p.z + radius) / (2 * radius); // Depth cue
            ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
            ctx.fill();
        });

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
        className="h-full w-full bg-neutral-900 flex items-center justify-center relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
            <h2 className="text-cyan-400 font-mono text-xs tracking-[0.5em] uppercase mb-2">AI Core</h2>
            <p className="text-white/30 text-xs">Tracking User Input</p>
        </div>
      </div>
    </DemoContainer>
  );
}