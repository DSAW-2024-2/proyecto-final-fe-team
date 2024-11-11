import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const circles = containerRef.current?.querySelectorAll('.circle');

      if (circles) {
        circles.forEach((circle, index) => {
          const factor = (index + 1) * 0.2;
          const x = (clientX * factor) / 10;
          const y = (clientY * factor) / 10;

          (circle as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-screen bg-[#1a2a4f] overflow-hidden">
      <div className="circle circle1 absolute w-[500px] h-[500px] bg-white/10 rounded-full top-[1%] left-[50%] animate-circle1"></div>
      <div className="circle circle2 absolute w-[200px] h-[200px] bg-white/10 rounded-full top-[30%] left-[10%] animate-circle2"></div>
      <div className="circle circle3 absolute w-[100px] h-[100px] bg-white/10 rounded-full top-[80%] left-[40%] animate-circle3"></div>
    </div>
  );
};

export default BackgroundAnimation;