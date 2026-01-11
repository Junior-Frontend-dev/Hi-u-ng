import React from 'react';
import { DemoContainer } from '../DemoContainer';
import { Power, Play, Pause, FastForward, Rewind } from 'lucide-react';

export default function VisualNeumorphism() {
  return (
    <DemoContainer>
      <div className="h-full w-full bg-[#e0e5ec] flex items-center justify-center text-[#4d4d4d]">
        <div className="w-80 p-8 rounded-[30px] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] bg-[#e0e5ec] flex flex-col items-center gap-10">
            
            <div className="w-full flex justify-between items-center">
                <button className="w-12 h-12 rounded-full shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] flex items-center justify-center hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-shadow text-gray-500">
                    <Power size={18} />
                </button>
                <span className="text-xs font-bold tracking-widest text-gray-400">PLAYING NOW</span>
            </div>

            <div className="w-48 h-48 rounded-full shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] flex items-center justify-center bg-[#e0e5ec] border-[5px] border-[#e0e5ec]">
                <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80" className="w-full h-full object-cover rounded-full opacity-80" />
            </div>

            <div className="text-center">
                <h3 className="text-xl font-bold text-gray-700">Soft Shadows</h3>
                <p className="text-sm text-gray-500 mt-1">Neumorphic Beats</p>
            </div>

            <div className="flex gap-6">
                <button className="w-12 h-12 rounded-full shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] flex items-center justify-center hover:scale-95 transition-transform active:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] text-gray-500">
                    <Rewind size={20} fill="currentColor" className="text-gray-400" />
                </button>
                <button className="w-16 h-16 rounded-full shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] flex items-center justify-center bg-blue-500 text-white hover:scale-95 transition-transform">
                    <Pause size={24} fill="currentColor" />
                </button>
                <button className="w-12 h-12 rounded-full shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] flex items-center justify-center hover:scale-95 transition-transform active:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] text-gray-500">
                    <FastForward size={20} fill="currentColor" className="text-gray-400" />
                </button>
            </div>

        </div>
      </div>
    </DemoContainer>
  );
}