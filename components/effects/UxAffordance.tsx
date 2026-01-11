import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';
import { Copy, Share, Heart } from 'lucide-react';

export default function UxAffordance() {
  const [menuPos, setMenuPos] = useState<{x: number, y: number} | null>(null);

  const handleSelect = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        // Since we are inside an iframe/container, we need relative coords ideally
        // But for demo simplicity using fixed is okay if container is relative
        setMenuPos({ x: rect.left + rect.width/2, y: rect.top - 10 });
    } else {
        setMenuPos(null);
    }
  };

  return (
    <DemoContainer>
      <div 
        className="h-full w-full bg-white flex items-center justify-center p-12"
        onMouseUp={handleSelect}
      >
        <p className="text-2xl font-serif leading-relaxed text-gray-800 max-w-lg select-text selection:bg-blue-100 selection:text-blue-900">
            Select any part of this text to reveal the hidden menu. 
            Good interfaces don't clutter the screen with controls until they are needed.
        </p>

        {menuPos && (
            <div 
                className="fixed bg-black text-white rounded-full px-4 py-2 flex gap-4 shadow-xl animate-in fade-in zoom-in duration-200 z-50 transform -translate-x-1/2 -translate-y-full"
                style={{ left: menuPos.x, top: menuPos.y }}
            >
                <button className="hover:text-blue-300"><Copy size={16} /></button>
                <button className="hover:text-blue-300"><Share size={16} /></button>
                <button className="hover:text-red-300"><Heart size={16} /></button>
            </div>
        )}
      </div>
    </DemoContainer>
  );
}