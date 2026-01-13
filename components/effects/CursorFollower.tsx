import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  // State for animation loop
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const isVisible = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      isVisible.current = true;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorRef.current.style.opacity = '1';
      }
      if (followerRef.current) {
          followerRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
        isVisible.current = false;
        // Reset positions to prevent ghost effect on re-entry
        mouse.current = { x: -1000, y: -1000 };
        follower.current = { x: -1000, y: -1000, vx: 0, vy: 0 };
        if (cursorRef.current) cursorRef.current.style.opacity = '0';
        if (followerRef.current) followerRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
    };

    let rafId: number;
    const animate = () => {
      // Physics for follower (Ease)
      const dx = mouse.current.x - follower.current.x;
      const dy = mouse.current.y - follower.current.y;
      
      follower.current.x += dx * 0.1;
      follower.current.y += dy * 0.1;

      // Calculate Velocity for "Jelly" effect (Squeeze/Stretch)
      const vel = Math.sqrt(dx*dx + dy*dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      // Squeeze: Scale X stretches with speed, Scale Y shrinks
      const scaleX = 1 + Math.min(vel * 0.005, 0.5);
      const scaleY = 1 - Math.min(vel * 0.005, 0.2);

      if (followerRef.current) {
        followerRef.current.style.transform = `
            translate3d(${follower.current.x}px, ${follower.current.y}px, 0) 
            rotate(${angle}deg) 
            scale(${scaleX}, ${scaleY})
        `;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <DemoContainer className="cursor-none">
      {/* Dot (Instant) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 -ml-1 -mt-1 mix-blend-exclusion transition-opacity duration-300 opacity-0"
      />
      
      {/* Ring (Jelly Physics) */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full pointer-events-none z-40 -ml-5 -mt-5 mix-blend-exclusion will-change-transform transition-opacity duration-300 opacity-0"
      />

      <div className="h-full w-full flex items-center justify-center bg-black">
        <div className="text-center space-y-4 cursor-none">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mix-blend-difference">
                ELASTIC
            </h1>
            <p className="text-white/50">Move cursor fast to stretch</p>
        </div>
      </div>
    </DemoContainer>
  );
}