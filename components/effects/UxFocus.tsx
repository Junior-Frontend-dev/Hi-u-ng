import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function UxFocus() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const paragraphs = [
    "In the age of distraction, focus is a superpower.",
    "Designing interfaces that minimize cognitive load is essential.",
    "By dimming irrelevant content, we guide the user's eye."
  ];

  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#111] flex flex-col items-center justify-center p-12 gap-12 transition-colors">
        {paragraphs.map((text, i) => (
            <p 
                key={i}
                onMouseEnter={() => setFocusedIndex(i)}
                onMouseLeave={() => setFocusedIndex(null)}
                className={`
                    text-3xl font-serif leading-tight max-w-2xl cursor-default transition-all duration-500 ease-out
                    ${focusedIndex !== null && focusedIndex !== i ? 'opacity-10 blur-sm scale-95' : 'opacity-100 scale-100'}
                    ${focusedIndex === i ? 'text-white' : 'text-gray-400'}
                `}
            >
                {text}
            </p>
        ))}
      </div>
    </DemoContainer>
  );
}