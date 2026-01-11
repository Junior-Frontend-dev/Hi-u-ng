import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScrollControl } from '../ScrollControl';
import { Volume2, VolumeX } from 'lucide-react';

export default function ScrollAudio() {
  const { scrollRef, isAutoScrolling, toggleAutoScroll } = useScrollAnimation({ speed: 4 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    // We use a CSS variable for velocity, but here we need JS to control audio playbackRate
    const container = scrollRef.current;
    if(!container) return;

    let lastScrollTop = 0;
    
    const updateAudio = () => {
        if(!audioRef.current) return;
        const scrollTop = container.scrollTop;
        const velocity = Math.abs(scrollTop - lastScrollTop);
        lastScrollTop = scrollTop;

        // Map velocity to playback rate. Base rate 0.5, max 2.0
        const rate = 0.5 + Math.min(velocity * 0.1, 1.5);
        
        // Map scroll position to volume? Or just constant play?
        // Let's do: Play when scrolling, pause when stopped (or very slow)
        if (velocity > 0.1 && !muted) {
            if(audioRef.current.paused) audioRef.current.play();
            audioRef.current.playbackRate = rate;
        } else {
            // Smooth fade out logic would be better, but instant pause for demo
            if(!audioRef.current.paused) audioRef.current.pause();
        }
        
        requestAnimationFrame(updateAudio);
    };
    
    const raf = requestAnimationFrame(updateAudio);
    return () => cancelAnimationFrame(raf);
  }, [scrollRef, muted]);

  return (
    <DemoContainer>
      <ScrollControl isPlaying={isAutoScrolling} onToggle={toggleAutoScroll} />
      
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/download/audio/2022/02/07/audio_1822e427af.mp3?filename=lo-fi-hip-hop-11634.mp3" 
        loop 
      />

      <div ref={scrollRef} className="h-full overflow-y-auto relative hide-scrollbar bg-black">
        <div className="fixed top-6 left-6 z-50">
            <button 
                onClick={() => setMuted(!muted)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white border border-white/20 hover:bg-white/20"
            >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {muted ? "Unmute to Hear" : "Scroll to Play"}
            </button>
        </div>

        <div className="h-[500vh] w-full bg-[linear-gradient(to_bottom,#000,#222,#000)] flex flex-col items-center justify-around py-20">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-20" style={{ animationDuration: `${1 + i * 0.2}s` }}></div>
                    <span className="font-mono text-white/50">Beat {i+1}</span>
                </div>
            ))}
        </div>
      </div>
    </DemoContainer>
  );
}