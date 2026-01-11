import { useEffect, useRef, useState, useCallback } from 'react';

export function useScrollAnimation(options: { speed?: number } = {}) {
  const [speed, setSpeed] = useState(options.speed || 1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;

    const update = () => {
      if (!el) return;

      if (isAutoScrolling) {
        // Auto scroll
        el.scrollTop += speed;
        // Loop back to top
        if (Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight) {
          el.scrollTop = 0;
        }
      }

      // Update CSS variables for high-performance animations
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      
      // Calculate Velocity
      const velocity = scrollTop - lastScrollTop.current;
      lastScrollTop.current = scrollTop;

      // Batch style updates
      el.style.setProperty('--scroll-y', `${scrollTop}px`);
      el.style.setProperty('--scroll-y-val', `${scrollTop}`);
      el.style.setProperty('--scroll-percent', `${progress}`);
      el.style.setProperty('--scroll-velocity', `${velocity}`);
      
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoScrolling, speed]);

  return { 
    scrollRef, 
    isAutoScrolling, 
    toggleAutoScroll: () => setIsAutoScrolling(prev => !prev),
    speed,
    setSpeed
  };
}