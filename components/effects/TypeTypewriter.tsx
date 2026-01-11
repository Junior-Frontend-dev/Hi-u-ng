import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

const PHRASES = [
    "Hello, world.",
    "This is a typewriter.",
    "Coding is art.",
    "Make it simple."
];

export default function TypeTypewriter() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    
    // Determine typing speed
    let typeSpeed = isDeleting ? 50 : 100;
    
    // Pause at end of phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause before deleting
        
        // Timeout to switch state
        const timeout = setTimeout(() => {
            setIsDeleting(true);
        }, typeSpeed);
        return () => clearTimeout(timeout);
    }
    
    // Pause at start before typing next
    if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        typeSpeed = 500;
    }

    const timer = setTimeout(() => {
        const nextCharIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        setCharIndex(nextCharIndex);
        setText(currentPhrase.substring(0, nextCharIndex));
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <DemoContainer>
      <div className="h-full w-full flex items-center justify-center bg-black font-mono">
        <h1 className="text-4xl md:text-6xl text-white">
            <span>{text}</span>
            <span className="animate-blink ml-1 border-r-4 border-accent h-[1em] inline-block align-middle"></span>
        </h1>

        <style>{`
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .animate-blink {
                animation: blink 0.8s step-end infinite;
            }
        `}</style>
      </div>
    </DemoContainer>
  );
}