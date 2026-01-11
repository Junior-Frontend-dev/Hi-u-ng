import React, { useRef, useEffect } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Volume2 } from 'lucide-react';

export default function CursorSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const initAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            oscRef.current = audioCtxRef.current.createOscillator();
            gainRef.current = audioCtxRef.current.createGain();
            
            oscRef.current.connect(gainRef.current);
            gainRef.current.connect(audioCtxRef.current.destination);
            
            oscRef.current.start();
            gainRef.current.gain.value = 0; // Start silent
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!audioCtxRef.current || !oscRef.current || !gainRef.current) {
            initAudio(); // Try init if movement implies interaction
            return;
        }
        
        // Map X to Frequency, Y to Volume
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        const freq = 200 + (e.clientX / width) * 800;
        const vol = 0.1 - (e.clientY / height) * 0.1; // Louder at top

        oscRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.1);
        gainRef.current.gain.setTargetAtTime(Math.max(0, vol), audioCtxRef.current.currentTime, 0.1);
    };

    const handleMouseLeave = () => {
        if(gainRef.current && audioCtxRef.current) {
            gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseout', handleMouseLeave);
        if(audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center text-center">
        <Volume2 size={48} className="text-white mb-4" />
        <h2 className="text-2xl font-bold text-white">Sonic Feedback</h2>
        <p className="text-white/50 mt-2">Move cursor to generate sound</p>
        <p className="text-white/30 text-xs mt-4">X-Axis: Pitch | Y-Axis: Volume</p>
      </div>
    </DemoContainer>
  );
}