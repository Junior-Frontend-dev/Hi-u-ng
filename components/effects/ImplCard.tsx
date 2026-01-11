import React, { useState } from 'react';
import { DemoContainer } from '../DemoContainer';

const cardImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
  'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&q=80',
];

export default function ImplCard({ variant }: { variant: string }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const renderCardFlip = () => (
    <div className="w-72 h-96 perspective-[1000px]">
      <div 
        className="w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex flex-col items-center justify-center backface-hidden">
          <div className="w-20 h-20 bg-white/20 rounded-full mb-4 flex items-center justify-center text-4xl">🎨</div>
          <h3 className="text-2xl font-bold text-white">Front Side</h3>
          <p className="text-white/70 mt-2">Click to flip</p>
        </div>
        <div className="absolute inset-0 bg-neutral-800 rounded-2xl flex flex-col items-center justify-center backface-hidden rotate-y-180">
          <h3 className="text-2xl font-bold text-white">Back Side</h3>
          <p className="text-white/70 mt-2">You revealed me!</p>
        </div>
      </div>
    </div>
  );

  const renderCardHoverLift = () => (
    <div className="w-72 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl cursor-pointer">
      <div className="h-40 bg-gradient-to-br from-pink-400 to-red-500" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">Hover Lift</h3>
        <p className="text-gray-500 mt-2">Card lifts up on hover with enhanced shadow</p>
      </div>
    </div>
  );

  const renderCardStack = () => (
    <div className="relative w-72 h-96 flex items-center justify-center cursor-pointer group">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="absolute w-72 h-96 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-500"
          style={{
            transform: `translateX(${(i - 1) * 20}px) translateY(${(i - 1) * -10}px) rotate(${(i - 1) * 5}deg)`,
            zIndex: i,
          }}
        >
          <div className="h-full p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-800">Card {i + 1}</h3>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCardSpread = () => (
    <div className="relative w-72 h-96 flex items-center justify-center cursor-pointer group">
      <div className="absolute w-72 h-96 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-500 group-hover:-translate-x-24 group-hover:-rotate-6">
        <div className="h-full p-6"><h3 className="text-2xl font-bold text-gray-800">Card 1</h3></div>
      </div>
      <div className="absolute w-72 h-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
        <div className="h-full p-6 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-gray-800">Main Card</h3>
          <p className="text-gray-500 mt-2">Hover to see spread</p>
        </div>
      </div>
      <div className="absolute w-72 h-96 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-500 group-hover:translate-x-24 group-hover:rotate-6">
        <div className="h-full p-6"><h3 className="text-2xl font-bold text-gray-800">Card 3</h3></div>
      </div>
    </div>
  );

  const renderCardCarousel = () => (
    <div className="perspective-[1000px]">
      <div className="w-72 h-96 relative transition-transform duration-500 transform-style-3d">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-500"
            style={{
              transform: `rotateY(${(i - 1) * 45}deg) translateZ(${-Math.abs(i - 1) * 50}px)`,
              opacity: 1 - Math.abs(i - 1) * 0.3,
              zIndex: 2 - Math.abs(i - 1),
            }}
          >
            <div className="h-full p-6 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold text-gray-800">Card {i + 1}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCardGlare = () => (
    <div className="relative w-72 bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 cursor-pointer group">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="h-40 bg-gradient-to-br from-cyan-500 to-blue-600" />
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-white">Holo Glare</h3>
        <p className="text-gray-400 mt-2">Shiny glare effect moves with cursor</p>
      </div>
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ transform: 'translateX(-100%)' }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.parentElement?.getBoundingClientRect();
          if (rect) {
            e.currentTarget.style.transform = `translateX(${(e.clientX - rect.left) / rect.width * 200 - 100}%)`;
          }
        }}
      />
    </div>
  );

  const renderCardBorderGradient = () => (
    <div className="relative w-72 p-1 rounded-2xl cursor-pointer group">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-spin-slow" style={{ animationDuration: '10s' }} />
      <div className="bg-neutral-900 rounded-xl p-6 relative z-10">
        <h3 className="text-xl font-bold text-white">Gradient Border</h3>
        <p className="text-gray-400 mt-2">Animated gradient border</p>
      </div>
    </div>
  );

  const renderCardExpand = () => (
    <div className="w-72 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer transition-all duration-500 hover:scale-105 active:scale-[3] active:rounded-none">
      <div className="h-40 bg-gradient-to-br from-green-400 to-emerald-600" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">Expand</h3>
        <p className="text-gray-500 mt-2">Click to expand fullscreen</p>
      </div>
    </div>
  );

  const renderCardFocus = () => (
    <div className="grid grid-cols-2 gap-4">
      {cardImages.map((img, i) => (
        <div 
          key={i}
          className="relative w-40 h-40 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setHoveredCard(i)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div 
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              hoveredCard !== null && hoveredCard !== i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      ))}
    </div>
  );

  const renderCardPattern = () => (
    <div className="relative w-72 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 to-transparent" />
      <div className="h-40 bg-gradient-to-br from-violet-400 to-purple-600" />
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-gray-800">Pattern Reveal</h3>
        <p className="text-gray-500 mt-2">Pattern appears on hover</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'card-flip': return renderCardFlip();
      case 'card-hover-lift': return renderCardHoverLift();
      case 'card-stack': return renderCardStack();
      case 'card-spread': return renderCardSpread();
      case 'card-carousel': return renderCardCarousel();
      case 'card-glare': return renderCardGlare();
      case 'card-border-gradient': return renderCardBorderGradient();
      case 'card-expand': return renderCardExpand();
      case 'card-focus': return renderCardFocus();
      case 'card-pattern': return renderCardPattern();
      default: return renderCardHoverLift();
    }
  };

  return (
    <DemoContainer>
      <div className="h-full w-full flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        {renderContent()}
      </div>
    </DemoContainer>
  );
}
