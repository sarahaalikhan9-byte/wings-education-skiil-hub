import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  randX: number;
  randY: number;
}

const AchievementFireworks = ({ show, onComplete, message = "Correct! 🎉" }: { show: boolean, onComplete?: () => void, message?: string }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (show) {
      // Generate particles
      const newParticles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: 50, // Start from center
        y: 50,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 1.5 + 1,
        delay: Math.random() * 0.2,
        color: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#6a0dad' : '#ffffff',
        randX: (Math.random() - 0.5) * 600,
        randY: (Math.random() - 0.5) * 600
      }));
      
      setParticles(newParticles);

      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[2000] pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Overlay Glow */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-royal/10 backdrop-blur-[2px]"
          />

          {/* Success Message */}
          <motion.div 
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1], 
              rotate: [-20, 10, 0], 
              opacity: 1 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative z-10"
          >
            <div className="glass-strong px-12 py-8 rounded-[40px] border-4 border-gold shadow-[0_0_50px_rgba(212,175,55,0.3)]">
              <h2 className="text-5xl font-black text-gradient text-center mb-2 drop-shadow-sm">
                {message}
              </h2>
              <p className="text-royal font-bold text-center text-xl animate-pulse tracking-wide italic">
                Outstanding! Keep it up! 🌟
              </p>
            </div>
          </motion.div>

          {/* Fireworks Particles */}
          <div className="absolute inset-0">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: '50vw', y: '50vh', opacity: 1, scale: 1 }}
                animate={{ 
                  x: `calc(50vw + ${p.randX}px)`, 
                  y: `calc(50vh + ${p.randY}px)`, 
                  opacity: 0,
                  scale: 0 
                }}
                transition={{ 
                  duration: p.duration, 
                  delay: p.delay, 
                  ease: "easeOut" 
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}`
                }}
              />
            ))}
          </div>

          {/* Sparkle Stars */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 2, 
                  delay: Math.random() * 1,
                  repeat: Infinity
                }}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                ⭐
              </motion.div>
            ))}
          </div>

          {/* Confetti Rain */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                initial={{ y: -20, opacity: 1, x: `${Math.random() * 100}vw`, rotate: 0 }}
                animate={{ 
                  y: '110vh', 
                  opacity: 0,
                  rotate: 720,
                  x: `${(Math.random() * 100) + (Math.random() - 0.5) * 20}vw`
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2, 
                  delay: Math.random() * 0.5,
                  ease: "linear"
                }}
                className="absolute w-2 h-4"
                style={{
                  backgroundColor: i % 2 === 0 ? '#d4af37' : '#6a0dad',
                  borderRadius: '2px'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AchievementFireworks;
