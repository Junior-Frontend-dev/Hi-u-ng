import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ScrollImageSequence() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  // Total frames for the sequence
  const FRAME_COUNT = 120;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const p = Math.max(0, Math.min(1, scrollTop / maxScroll));
      setProgress(p);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    // Calculate current frame based on progress
    const currentFrame = Math.floor(progress * (FRAME_COUNT - 1));

    // Render "frame" - Simulation of a 3D rotating object
    // We'll draw a wireframe cube that rotates based on the frame index
    
    const angle = (currentFrame / FRAME_COUNT) * Math.PI * 4; // 2 full rotations
    
    ctx.save();
    ctx.translate(width / 2, height / 2);
    
    const scale = 100 + Math.sin(progress * Math.PI) * 50; // Pulse size
    ctx.scale(scale, scale);
    
    ctx.strokeStyle = `hsl(${progress * 360}, 70%, 60%)`;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';

    // 3D Point projection
    const points = [
        {x: -1, y: -1, z: -1}, {x: 1, y: -1, z: -1},
        {x: 1, y: 1, z: -1}, {x: -1, y: 1, z: -1},
        {x: -1, y: -1, z: 1}, {x: 1, y: -1, z: 1},
        {x: 1, y: 1, z: 1}, {x: -1, y: 1, z: 1},
    ];

    const rotateX = angle * 0.5;
    const rotateY = angle;

    const project = (p: {x: number, y: number, z: number}) => {
        // Rotate Y
        let x = p.x * Math.cos(rotateY) - p.z * Math.sin(rotateY);
        let z = p.x * Math.sin(rotateY) + p.z * Math.cos(rotateY);
        let y = p.y;

        // Rotate X
        let y2 = y * Math.cos(rotateX) - z * Math.sin(rotateX);
        let z2 = y * Math.sin(rotateX) + z * Math.cos(rotateX);
        
        // Perspective
        const fov = 2;
        const dist = 3;
        const scaleP = fov / (dist + z2);
        
        return {
            x: x * scaleP,
            y: y2 * scaleP
        };
    };

    const projectedPoints = points.map(project);

    // Draw edges
    const edges = [
        [0,1], [1,2], [2,3], [3,0], // Back face
        [4,5], [5,6], [6,7], [7,4], // Front face
        [0,4], [1,5], [2,6], [3,7]  // Connecting lines
    ];

    ctx.beginPath();
    edges.forEach(edge => {
        const p1 = projectedPoints[edge[0]];
        const p2 = projectedPoints[edge[1]];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
    });
    ctx.stroke();

    // Add some "data" text to look cool
    ctx.restore();
    
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.fillText(`FRAME: ${currentFrame.toString().padStart(3, '0')} / ${FRAME_COUNT}`, 20, 30);
    ctx.fillText(`PROGRESS: ${(progress * 100).toFixed(1)}%`, 20, 50);

  }, [progress]);

  return (
    <DemoContainer>
      <div 
        ref={scrollRef} 
        className="h-full w-full overflow-y-auto relative scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        <div className="sticky top-0 h-full w-full flex items-center justify-center overflow-hidden">
            <canvas 
                ref={canvasRef} 
                width={800} 
                height={600} 
                className="w-full h-full object-contain"
            />
             <div className="absolute bottom-10 text-white/50 text-sm font-mono animate-pulse">
                SCROLL TO SCRUB SEQUENCE
            </div>
        </div>
        
        {/* Scroll spacer */}
        <div className="h-[400vh]"></div>
      </div>
    </DemoContainer>
  );
}
