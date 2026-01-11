import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

export default function BrandPatterns() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(0);

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = canvas.parentElement?.clientWidth || 300;
    const height = canvas.height = canvas.parentElement?.clientHeight || 300;
    const cellSize = 60;

    const drawPattern = () => {
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);

        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                const type = Math.floor(Math.random() * 4); // 0: Circle, 1: Tri, 2: Arc, 3: Rect
                const color = COLORS[Math.floor(Math.random() * COLORS.length)];
                ctx.fillStyle = color;

                ctx.save();
                ctx.translate(x + cellSize/2, y + cellSize/2);
                // Random rotation 0, 90, 180, 270
                ctx.rotate(Math.floor(Math.random() * 4) * (Math.PI / 2));
                ctx.translate(-cellSize/2, -cellSize/2);

                switch (type) {
                    case 0: // Quarter Circle
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.arc(0, 0, cellSize, 0, Math.PI / 2);
                        ctx.lineTo(0, 0);
                        ctx.fill();
                        break;
                    case 1: // Triangle
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(cellSize, 0);
                        ctx.lineTo(0, cellSize);
                        ctx.fill();
                        break;
                    case 2: // Semi Circle
                        ctx.beginPath();
                        ctx.arc(cellSize/2, 0, cellSize/2, 0, Math.PI);
                        ctx.fill();
                        break;
                    case 3: // Small Circle
                        ctx.beginPath();
                        ctx.arc(cellSize/2, cellSize/2, cellSize/3, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                }
                ctx.restore();
            }
        }
    };

    drawPattern();

    const handleResize = () => {
        canvas.width = canvas.parentElement?.clientWidth || 300;
        canvas.height = canvas.parentElement?.clientHeight || 300;
        drawPattern();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [seed]);

  return (
    <DemoContainer>
      <div className="h-full w-full relative">
        <canvas ref={canvasRef} className="block w-full h-full" />
        
        <button 
            onClick={() => setSeed(s => s + 1)}
            className="absolute bottom-8 right-8 bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
        >
            <RefreshCcw size={20} />
        </button>

        <div className="absolute top-8 left-8 bg-white/90 p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-black">Procedural Brand Identity</h3>
            <p className="text-xs text-gray-500">Bauhaus inspired generator</p>
        </div>
      </div>
    </DemoContainer>
  );
}