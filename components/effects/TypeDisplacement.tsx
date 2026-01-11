import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const MENU_ITEMS = [
    "HOME", "PROJECTS", "ABOUT", "CONTACT", "CAREERS"
];

export default function TypeDisplacement() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <DemoContainer>
      <div className="h-full w-full flex items-center justify-center bg-black">
        <ul className="flex flex-col items-center">
            {MENU_ITEMS.map((item, i) => {
                // Calculate distance from hovered item
                let offset = 0;
                let scale = 1;
                let opacity = 0.5;

                if (hoverIndex !== null) {
                    const dist = Math.abs(hoverIndex - i);
                    if (dist === 0) {
                        scale = 1.5;
                        opacity = 1;
                    } else if (dist === 1) {
                        scale = 1.2;
                        opacity = 0.8;
                        // Push away logic
                        offset = (i < hoverIndex) ? -20 : 20;
                    } else {
                         offset = (i < hoverIndex) ? -10 : 10;
                    }
                }

                return (
                    <li 
                        key={i}
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(null)}
                        className="text-6xl font-bold text-white transition-all duration-300 ease-out cursor-pointer"
                        style={{
                            transform: `translateY(${offset}px) scale(${scale})`,
                            opacity,
                        }}
                    >
                        {item}
                    </li>
                );
            })}
        </ul>
      </div>
    </DemoContainer>
  );
}