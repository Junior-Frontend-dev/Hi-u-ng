import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';

export default function ScrollVideo() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll, speed, setSpeed } = useScrollAnimation({ speed: 1 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const video = videoRef.current;
    
    if (!scrollContainer || !video) return;

    let rafId: number;
    let targetTime = 0;

    const updateVideo = () => {
        if (!video.duration) {
            rafId = requestAnimationFrame(updateVideo);
            return;
        }

        // Linear interpolation for smoother scrubbing
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
            video.currentTime += (targetTime - video.currentTime) * 0.1;
        }
        
        rafId = requestAnimationFrame(updateVideo);
    };

    const handleScroll = () => {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight));
        
        if (video.duration) {
            targetTime = progress * video.duration;
        }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    rafId = requestAnimationFrame(updateVideo);

    return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(rafId);
    };
  }, [scrollRef]);

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} speed={speed} onSpeedChange={setSpeed} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <video 
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    src="https://cdn.coverr.co/videos/coverr-waves-crashing-on-sandy-beach-5556/1080p.mp4"
                    muted
                    playsInline
                    preload="auto"
                />
                
                <div className="relative z-10 text-center mix-blend-overlay">
                    <h1 className="text-[10vw] font-black text-white tracking-tighter">CONTROL</h1>
                    <div className="w-full h-2 bg-white/20 mt-4 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white will-change-transform"
                            style={{ transform: `scaleX(var(--scroll-percent, 0))`, transformOrigin: 'left' }}
                        />
                    </div>
                    <p className="text-white text-sm font-mono mt-2 tracking-widest">TIMELINE SCRUBBER</p>
                </div>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}