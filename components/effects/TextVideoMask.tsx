import React from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextVideoMask() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-white flex items-center justify-center">
        
        <h1 
            className="text-[15vw] font-black tracking-tighter text-transparent bg-clip-text"
            style={{
                backgroundImage: 'url(https://cdn.coverr.co/videos/coverr-waves-crashing-on-sandy-beach-5556/1080p.mp4)',
                // Note: CSS background-image doesn't support video directly in standard properties easily without mix-blend-mode hack or SVG.
                // Standard approach: Put video in background and use text as mix-blend-mode: screen over black overlay
            }}
        >
            <div className="relative overflow-hidden">
                <video 
                    src="https://cdn.coverr.co/videos/coverr-waves-crashing-on-sandy-beach-5556/1080p.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-white mix-blend-screen">
                    <div className="flex items-center justify-center h-full bg-black text-white mix-blend-multiply">
                        <span className="text-[20vw] font-black">OCEAN</span>
                    </div>
                </div>
            </div>
        </h1>

        {/* Simpler Alternative Implementation using background-clip: text with animated gif/image is easier, 
            but for video, we usually do: Container (White) -> Text (Black, Screen) -> Video (Bg)
        */}
        <div className="absolute inset-0 bg-white flex items-center justify-center mix-blend-screen">
             <h1 className="text-[20vw] font-black bg-black text-white w-full h-full flex items-center justify-center">OCEAN</h1>
        </div>
        <video 
            src="https://cdn.coverr.co/videos/coverr-waves-crashing-on-sandy-beach-5556/1080p.mp4" 
            autoPlay 
            muted 
            loop 
            className="absolute inset-0 w-full h-full object-cover -z-10"
        />

      </div>
    </DemoContainer>
  );
}