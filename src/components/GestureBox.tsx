import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GestureBoxProps {
  isActive: boolean;
  onClose: () => void;
}

const GestureBox: React.FC<GestureBoxProps> = ({ isActive, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraReady(true);
      }
    } catch (error) {
      console.error('Sign Language Camera Error:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50, x: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50, x: -50 }}
          className="fixed bottom-8 left-8 w-80 glass-strong rounded-[32px] overflow-hidden z-[100] border-2 border-gold shadow-[0_20px_50px_rgba(106,13,173,0.3)]"
        >
          {/* Header */}
          <div className="bg-gradient-royal px-4 py-3 border-b border-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fas fa-hands-asl-interpreting text-gold-light text-sm"></i>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Sign Language AI</span>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 transition-colors"
            >
              <i className="fas fa-times text-[10px] text-white"></i>
            </button>
          </div>

          {/* Camera View */}
          <div className="relative aspect-video bg-royal-dark/90 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover grayscale-[20%] contrast-110"
            />
            {!cameraReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-royal-dark/50 backdrop-blur-sm">
                <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mb-3"></div>
                <p className="text-[10px] text-gold-light uppercase tracking-widest font-black">Scanning Space</p>
              </div>
            )}
            
            {/* HUD Overlay */}
            <div className="absolute inset-4 border border-gold/20 rounded-xl pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold rounded-br-lg" />
            </div>
          </div>

          <div className="p-4 bg-white/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] font-black text-royal uppercase tracking-widest leading-none">Gestures Ready: Awaiting Sign</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GestureBox;
