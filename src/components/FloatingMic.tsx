import React from "react";
import { Mic, Square, Radio } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingMicProps {
  isListening?: boolean;
  toggleListening: () => void;
}

const FloatingMic: React.FC<FloatingMicProps> = ({ isListening = false, toggleListening }) => {
  return (
    <div className="fixed bottom-28 left-8 z-[60]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-500 border-2 ${
          isListening
            ? "bg-red-500 border-white/50 shadow-[0_0_30px_rgba(239,68,68,0.5)]"
            : "bg-gradient-royal border-gold/30 shadow-[0_0_30px_rgba(106,13,173,0.3)] hover:border-gold/60"
        }`}
        title={isListening ? "Stop AI Listening" : "Initiate Voice Command"}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="stop"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Square className="w-6 h-6 fill-current" />
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Mic className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {isListening && (
          <>
            <div className="absolute inset-0 rounded-2xl border-4 border-red-400 animate-ping opacity-25" />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-20 left-0 bg-red-500 text-white text-[8px] font-black uppercase tracking-[3px] py-2 px-4 rounded-xl whitespace-nowrap shadow-xl flex items-center gap-2 border border-white/20"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              AI Listening
            </motion.div>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingMic;
