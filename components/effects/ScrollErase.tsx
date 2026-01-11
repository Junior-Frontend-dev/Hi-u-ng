import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollErase() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 2 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with "dust"
    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, width, height);

    // This effect requires manual manipulation logic in real-time usually,
    // but for scroll driven, we can clear a path based on scroll position?
    // Let's just simulate an opening circle or rect via canvas clearing based on scroll
    
    const render = () => {
        const container = scrollRef.current;
        if(!container) return;
        const progress = container.scrollTop / (container.scrollHeight - container.clientHeight);
        
        // Redraw dust
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, width, height);
        
        // Erase
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        // Erase a zigzag path based on scroll? Or just expanding hole
        ctx.arc(width/2, height * progress, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        
        requestAnimationFrame(render);
    };
    const raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [scrollRef]);

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-white">
        <div className="h-[200vh] relative">
            <div className="sticky top-0 h-screen w-full">
                {/* Underlying Content */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-500 to-yellow-500">
                    <h1 className="text-9xl font-black text-white">CLEAN</h1>
                </div>

                {/* Canvas Overlay */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}