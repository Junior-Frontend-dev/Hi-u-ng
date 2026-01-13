import React, { useEffect, useRef } from 'react';
import { DemoContainer } from '../DemoContainer';

export default function ImageRotate() {
  const imageRef = useRef<HTMLDivElement>(null);
  const rotation = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = image.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      rotation.current.targetX = ((e.clientY - centerY) / rect.height) * 30;
      rotation.current.targetY = ((e.clientX - centerX) / rect.width) * -30;
    };

    const onMouseLeave = () => {
      rotation.current.targetX = 0;
      rotation.current.targetY = 0;
    };

    const animate = () => {
      rotation.current.x += (rotation.current.targetX - rotation.current.x) * 0.1;
      rotation.current.y += (rotation.current.targetY - rotation.current.y) * 0.1;
      image.style.transform = `perspective(1000px) rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    image.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      image.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <DemoContainer className="bg-black">
      <div className="w-full h-full flex items-center justify-center">
        <div
          ref={imageRef}
          className="w-[300px] h-[400px] rounded-xl overflow-hidden shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
            alt="3D rotating"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="absolute bottom-8 text-white/50 text-sm">Move mouse to rotate image</p>
      </div>
    </DemoContainer>
  );
}
