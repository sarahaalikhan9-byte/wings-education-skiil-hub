import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="mesh-gradient min-h-screen">
      {/* Floating Blobs */}
      <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] bg-gold/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] bg-gold/3 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
      <div className="absolute top-[40%] right-[30%] w-[15vw] h-[15vw] bg-gold/2 rounded-full blur-[80px] animate-pulse [animation-delay:4s]" />
    </div>
  );
};

export default AnimatedBackground;
