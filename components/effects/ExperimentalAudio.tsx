import React, { useRef, useEffect, useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Mic, Music, Volume2 } from 'lucide-react';

export default function ExperimentalAudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'simulated' | 'mic'>('simulated');

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;

    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let source: MediaStreamAudioSourceNode | null = null;
    let rafId: number;

    const initAudio = async () => {
      // Setup Audio Context
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      if (mode === 'mic') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
        } catch (err) {
          console.error("Mic error", err);
          setMode('simulated'); // Fallback
          return;
        }
      }
    };

    const draw = () => {
      rafId = requestAnimationFrame(draw);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trail effect
      ctx.fillRect(0, 0, width, height);

      if (mode === 'mic' && analyser) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        // Simulate data
        dataArray = new Uint8Array(128).map(() => Math.random() * 255 * (Math.sin(Date.now() / 100) + 1) / 2);
      }

      const barWidth = (width / 128) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < 128; i++) {
        barHeight = dataArray[i] / 2;
        
        // Color based on height
        const r = barHeight + (25 * (i / 128));
        const g = 250 * (i / 128);
        const b = 50;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, height - barHeight * 2, barWidth, barHeight * 2);

        x += barWidth + 1;
      }
    };

    if (mode === 'mic') {
        initAudio().then(() => draw());
    } else {
        draw();
    }

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (source) source.disconnect();
      if (audioContext) audioContext.close();
    };
  }, [isPlaying, mode]);

  return (
    <DemoContainer>
      <div className="h-full w-full bg-black relative flex flex-col items-center justify-center">
        
        {!isPlaying ? (
            <div className="text-center space-y-6 z-10">
                <h2 className="text-4xl font-bold text-white">Audio Reactive</h2>
                <p className="text-gray-400">Visualize frequencies in real-time.</p>
                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={() => { setMode('simulated'); setIsPlaying(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors"
                    >
                        <Music size={18} /> Simulate
                    </button>
                    <button 
                        onClick={() => { setMode('mic'); setIsPlaying(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 border border-white/10 rounded-full text-white transition-colors"
                    >
                        <Mic size={18} /> Use Mic
                    </button>
                </div>
            </div>
        ) : (
            <>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <div className="absolute bottom-10 flex gap-4 z-20">
                    <button 
                        onClick={() => setIsPlaying(false)}
                        className="px-4 py-2 bg-white/10 backdrop-blur border border-white/10 rounded-full text-white text-sm hover:bg-white/20 transition-colors"
                    >
                        Stop Visualizer
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/50 text-xs">
                        {mode === 'mic' ? <Mic size={12} /> : <Volume2 size={12} />}
                        {mode === 'mic' ? 'Microphone Input' : 'Simulated Data'}
                    </div>
                </div>
            </>
        )}

      </div>
    </DemoContainer>
  );
}