import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function TextNav() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-100 flex items-center justify-center p-12">
        <p className="text-4xl md:text-5xl font-serif leading-relaxed text-gray-400 max-w-4xl">
            We are a creative agency that specializes in 
            <span 
                className="text-black cursor-pointer mx-2 hover:underline decoration-2 underline-offset-4 transition-all"
                onMouseEnter={() => setHovered('Strategy')}
                onMouseLeave={() => setHovered(null)}
            > Strategy</span>, 
            <span 
                className="text-black cursor-pointer mx-2 hover:underline decoration-2 underline-offset-4 transition-all"
                onMouseEnter={() => setHovered('Design')}
                onMouseLeave={() => setHovered(null)}
            > Design</span>, and 
            <span 
                className="text-black cursor-pointer mx-2 hover:underline decoration-2 underline-offset-4 transition-all"
                onMouseEnter={() => setHovered('Engineering')}
                onMouseLeave={() => setHovered(null)}
            > Engineering</span>. 
            Want to start a project? 
            <span 
                className="text-black cursor-pointer mx-2 hover:underline decoration-2 underline-offset-4 transition-all"
                onMouseEnter={() => setHovered('Contact')}
                onMouseLeave={() => setHovered(null)}
            > Get in touch</span>.
        </p>

        {hovered && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full text-sm animate-fade-in-up">
                Go to {hovered}
            </div>
        )}
      </div>
    </DemoContainer>
  );
}