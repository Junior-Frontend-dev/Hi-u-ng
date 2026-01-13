import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const images = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
];

export default function GridExpansion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <DemoContainer className="bg-black">
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="grid grid-cols-3 gap-2 w-full max-w-[600px]">
          {images.map((src, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ease-out ${
                expandedIndex === index
                  ? 'col-span-2 row-span-2 z-10'
                  : expandedIndex !== null
                  ? 'opacity-50 scale-95'
                  : ''
              }`}
              style={{ aspectRatio: expandedIndex === index ? '1' : '1' }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <img
                src={src}
                alt={`Grid item ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              {expandedIndex === index && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white text-sm">Click to close</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DemoContainer>
  );
}
