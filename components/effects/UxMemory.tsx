import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { RefreshCcw } from 'lucide-react';

export default function UxMemory() {
  // Simple "Chaos" persistence
  const [tiles, setTiles] = useState(Array(16).fill(false));

  const toggle = (i: number) => {
    const newTiles = [...tiles];
    newTiles[i] = !newTiles[i];
    setTiles(newTiles);
  };

  return (
    <DemoContainer>
      <div className="h-full w-full bg-neutral-100 flex flex-col items-center justify-center p-8">
        
        <div className="grid grid-cols-4 gap-2 mb-8">
            {tiles.map((active, i) => (
                <div 
                    key={i}
                    onClick={() => toggle(i)}
                    className={`
                        w-16 h-16 rounded-lg cursor-pointer transition-all duration-300
                        ${active ? 'bg-black rotate-12 scale-90' : 'bg-white shadow-sm hover:shadow-md'}
                    `}
                />
            ))}
        </div>

        <div className="flex gap-4">
            <p className="text-gray-500 text-sm">
                State is preserved until you reset.
            </p>
            <button onClick={() => setTiles(Array(16).fill(false))} className="text-black hover:bg-gray-200 p-1 rounded">
                <RefreshCcw size={16} />
            </button>
        </div>

      </div>
    </DemoContainer>
  );
}