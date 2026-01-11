import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Film } from 'lucide-react';

export default function SignatureMovie() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 4 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeCode, setTimeCode] = useState("00:00:00");

  // Sync scroll to video time
  useEffect(() => {
    const el = scrollRef.current;
    if(!el) return;

    const handleScroll = () => {
        if(!videoRef.current || !videoRef.current.duration) return;
        // Map 1000vh scroll height to video duration
        const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
        const time = progress * videoRef.current.duration;
        
        if(isFinite(time)) {
            videoRef.current.currentTime = time;
            
            // Update Timecode
            const min = Math.floor(time / 60).toString().padStart(2, '0');
            const sec = Math.floor(time % 60).toString().padStart(2, '0');
            const ms = Math.floor((time % 1) * 100).toString().padStart(2, '0');
            setTimeCode(`${min}:${sec}:${ms}`);
        }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  // Hook into auto-scroll loop
  useEffect(() => {
      if(isAutoScrolling && scrollRef.current && videoRef.current && videoRef.current.duration) {
          const el = scrollRef.current;
          const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
          const time = progress * videoRef.current.duration;
          
          if(isFinite(time)) {
            videoRef.current.currentTime = time;
            
            const min = Math.floor(time / 60).toString().padStart(2, '0');
            const sec = Math.floor(time % 60).toString().padStart(2, '0');
            const ms = Math.floor((time % 1) * 100).toString().padStart(2, '0');
            setTimeCode(`${min}:${sec}:${ms}`);
          }
      }
  }, [isAutoScrolling]); 

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        {/* Extremely tall container for precision scrubbing */}
        <div className="h-[1000vh] relative"> 
            <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black overflow-hidden">
                
                {/* Video Layer - Tears of Steel (High Quality Sci-Fi) */}
                <video 
                    ref={videoRef}
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-80"
                />

                {/* Director UI Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start text-white/50 font-mono text-xs uppercase tracking-widest">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2"><Film size={14} /> CAM-A</span>
                            <span>RAW_FTG_004.MOV</span>
                        </div>
                        <div className="text-red-500 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> REC
                        </div>
                    </div>

                    {/* Center Crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-20">
                        <div className="w-[10%] h-[10%] border-2 border-white/50 border-t-0 border-b-0"></div>
                        <div className="absolute w-[20%] h-px bg-white/30"></div>
                        <div className="absolute h-[20%] w-px bg-white/30"></div>
                    </div>

                    {/* Footer Timecode */}
                    <div className="w-full">
                        <div className="flex justify-between items-end mb-4">
                            <h2 className="text-6xl font-mono font-bold text-white tabular-nums tracking-tighter">
                                {timeCode}
                            </h2>
                            <div className="text-white/50 text-right">
                                <p className="text-xs uppercase tracking-widest">Director's Cut</p>
                                <p className="font-bold">SCENE 04 / TAKE 01</p>
                            </div>
                        </div>
                        
                        {/* Scrubber Visual */}
                        <div className="w-full h-12 border-t border-white/20 relative overflow-hidden bg-black/50 backdrop-blur-sm">
                            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-red-500 z-10"></div>
                            {/* Fake film strip ticks that move */}
                            <div 
                                className="absolute top-0 h-full w-[200%] flex items-center gap-1 opacity-30 transition-transform duration-75"
                                style={{ 
                                    // Use raw timecode for movement simulation
                                    transform: `translateX(calc(-${(parseInt(timeCode.replace(/:/g,'')) * 0.5) % 50}%))` 
                                }}
                            >
                                {[...Array(100)].map((_, i) => (
                                    <div key={i} className="w-px h-4 bg-white flex-shrink-0 mx-2"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </DemoContainer>
  );
}