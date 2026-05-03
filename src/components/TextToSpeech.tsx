import React, { useState } from "react";
import { Play, Square, Volume2, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface TextToSpeechProps {
  text?: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text: initialText = "" }) => {
  const [text, setText] = useState(initialText);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if (!text.trim()) {
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="glass-strong rounded-[40px] p-8 border-2 border-royal/30 shadow-2xl relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-royal/5 blur-2xl rounded-full" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-royal flex items-center justify-center text-white shadow-lg">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-text-main italic tracking-tight">VOICE <span className="text-royal">SYNTHESIZER</span></h3>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[2px]">AI Text-to-Speech Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-white/10'}`} />
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          </div>
        </div>

        <div className="relative mb-8 group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want ZIARA to speak..."
            className="w-full h-48 p-6 glass-strong border-2 border-purple-border/20 rounded-[32px] text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-royal/50 transition-all resize-none font-medium leading-relaxed"
          />
          <div className="absolute top-4 right-4 text-royal/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          
          {isSpeaking && (
            <div className="absolute bottom-6 left-6 flex items-end gap-1 h-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 16, 4] }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                  className="w-1 bg-royal rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={speakText}
            disabled={!text.trim() || isSpeaking}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase tracking-[3px] text-xs transition-all ${
              !text.trim() || isSpeaking
                ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                : 'bg-gradient-royal text-white shadow-xl shadow-royal/20 hover:scale-[1.02] active:scale-95 border border-white/20'
            }`}
          >
            <Play className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
            Synthesize Voice
          </button>

          <button
            onClick={stopSpeech}
            disabled={!isSpeaking}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase tracking-[3px] text-xs transition-all ${
              !isSpeaking
                ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                : 'bg-red-500/10 text-red-500 border-2 border-red-500/20 hover:bg-red-500/20 active:scale-95'
            }`}
          >
            <Square className="w-4 h-4" />
            Terminate Output
          </button>
        </div>

        <div className="mt-8 flex justify-center items-center gap-3">
          <div className="flex items-center gap-1">
             {[...Array(3)].map((_, i) => (
               <div key={i} className={`w-1 h-1 rounded-full ${isSpeaking ? 'bg-gold animate-bounce' : 'bg-white/10'}`} style={{ animationDelay: `${i * 0.2}s` }} />
             ))}
          </div>
          <p className="text-[8px] font-black uppercase tracking-[4px] text-text-muted">
            {isSpeaking ? 'NEURAL BROADCAST IN PROGRESS' : 'CORE BROADCAST READY'}
          </p>
          <div className="flex items-center gap-1">
             {[...Array(3)].map((_, i) => (
               <div key={i} className={`w-1 h-1 rounded-full ${isSpeaking ? 'bg-gold animate-bounce' : 'bg-white/10'}`} style={{ animationDelay: `${(2-i) * 0.2}s` }} />
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
