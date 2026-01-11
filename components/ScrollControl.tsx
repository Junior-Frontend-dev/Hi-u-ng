import React from 'react';
import { Play, Pause, FastForward } from 'lucide-react';

interface ScrollControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  speed?: number;
  onSpeedChange?: (speed: number) => void;
}

export const ScrollControl: React.FC<ScrollControlProps> = ({ isPlaying, onToggle, speed, onSpeedChange }) => (
  <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
    
    {/* Speed Control Slider (Reveals on hover) */}
    {speed !== undefined && onSpeedChange && (
        <div className="bg-black/80 backdrop-blur-md border border-white/20 p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-xl mb-2">
            <div className="flex items-center gap-2 mb-1">
                <FastForward size={12} className="text-white/60" />
                <span className="text-[10px] text-white/60 font-mono uppercase">Speed: {speed.toFixed(1)}x</span>
            </div>
            <input 
                type="range" 
                min="0.5" 
                max="10" 
                step="0.5" 
                value={speed} 
                onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                className="w-32 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
            />
        </div>
    )}

    <button
      onClick={onToggle}
      className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg relative"
      title={isPlaying ? "Pause Auto-Scroll" : "Start Auto-Scroll"}
    >
      {isPlaying ? (
        <Pause size={20} className="fill-current" />
      ) : (
        <Play size={20} className="fill-current ml-0.5" />
      )}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-xs rounded text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
        {isPlaying ? 'Pause Scroll' : 'Auto Scroll'}
      </span>
    </button>
  </div>
);