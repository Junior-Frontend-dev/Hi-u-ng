import React, { useState, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function SignatureFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [uiVisible, setUiVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseMove = () => {
    setUiVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setUiVisible(false), 2000);
  };

  const toggleMute = () => setMuted(!muted);
  const togglePlay = () => {
      if(videoRef.current) {
          if(playing) videoRef.current.pause();
          else videoRef.current.play();
          setPlaying(!playing);
      }
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-black flex items-center justify-center relative group overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setUiVisible(false)}
      >
        <video 
            ref={videoRef}
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" 
            autoPlay 
            muted={muted}
            loop 
            className="w-full h-full object-contain"
        />
        
        {/* Cinematic Bars */}
        <div className="absolute top-0 left-0 w-full h-[12%] bg-black z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[12%] bg-black z-10 pointer-events-none"></div>

        {/* UI Overlay */}
        <div 
            className={`absolute inset-0 transition-opacity duration-500 flex flex-col justify-between p-12 z-20 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent, rgba(0,0,0,0.5))' }}
        >
            <div className="flex justify-between items-start">
                <h1 className="text-4xl font-serif text-white tracking-widest uppercase drop-shadow-lg">SINTEL</h1>
                <div className="px-3 py-1 border border-white/30 rounded text-xs font-bold text-white uppercase tracking-widest">Trailer</div>
            </div>

            <div className="flex justify-between items-end">
                <div className="flex gap-4">
                    <button onClick={togglePlay} className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                        {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
                    </button>
                    <button onClick={toggleMute} className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                        {muted ? <VolumeX /> : <Volume2 />}
                    </button>
                </div>
                <div className="text-right">
                    <p className="text-white/60 text-xs font-mono">A Short Film by Blender Foundation</p>
                </div>
            </div>
        </div>
      </div>
    </DemoContainer>
  );
}