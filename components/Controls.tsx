import React from 'react';
import { Sliders, Zap, Palette, Gauge } from 'lucide-react';
import { EffectParams } from '../types';

interface ControlsProps {
  params: EffectParams;
  onChange: (newParams: Partial<EffectParams>) => void;
}

export const Controls: React.FC<ControlsProps> = ({ params, onChange }) => {
  return (
    <div className="flex flex-col gap-4 p-4 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
        <Sliders size={12} />
        <span>Parameters</span>
      </div>

      {/* Speed */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1"><Gauge size={10} /> Speed</span>
          <span className="font-mono text-white">{params.speed.toFixed(1)}x</span>
        </div>
        <input 
          type="range" 
          min="0.1" 
          max="3" 
          step="0.1"
          value={params.speed}
          onChange={(e) => onChange({ speed: parseFloat(e.target.value) })}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400"
        />
      </div>

      {/* Intensity */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1"><Zap size={10} /> Intensity</span>
          <span className="font-mono text-white">{params.intensity.toFixed(1)}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="2" 
          step="0.1"
          value={params.intensity}
          onChange={(e) => onChange({ intensity: parseFloat(e.target.value) })}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
        />
      </div>

      {/* Color */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1"><Palette size={10} /> Base Color</span>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="color" 
            value={params.color}
            onChange={(e) => onChange({ color: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
          />
          <span className="text-xs font-mono text-gray-500">{params.color}</span>
        </div>
      </div>
    </div>
  );
};
