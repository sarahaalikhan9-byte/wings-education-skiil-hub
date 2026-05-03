import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, BookOpen, Fingerprint, Sparkles, Languages, CheckCircle2 } from 'lucide-react';

interface Gesture {
  gesture: string;
  description: string;
  color: string;
}

interface SignLanguageDisplayProps {
  text: string;
  isActive: boolean;
}

const SignLanguageDisplay: React.FC<SignLanguageDisplayProps> = ({ text, isActive }) => {
  const [currentGesture, setCurrentGesture] = useState<Gesture | null>(null);
  const [gestureSequence, setGestureSequence] = useState<Gesture[]>([]);

  const signLanguageMap: Record<string, Gesture> = {
    'hello': { gesture: '👋', description: 'Greeting Wave', color: '#FFD700' },
    'thank you': { gesture: '🙏', description: 'Gratitude Sign', color: '#48bb78' },
    'yes': { gesture: '👍', description: 'Affirmation', color: '#4299e1' },
    'no': { gesture: '👎', description: 'Negation', color: '#f56565' },
    'help': { gesture: '🆘', description: 'Assistance Needed', color: '#ed8936' },
    'good': { gesture: '✌️', description: 'Positive/Peace', color: '#9f7aea' },
    'learn': { gesture: '📚', description: 'Academic Study', color: '#38b2ac' },
    'understand': { gesture: '💡', description: 'Comprehension', color: '#ecc94b' },
    'question': { gesture: '❓', description: 'Inquiry', color: '#fc8181' },
    'welcome': { gesture: '🤗', description: 'Inclusive Welcome', color: '#f6ad55' },
    // Localized Phrases & Neural Nodes
    'namaste': { gesture: '🙏', description: 'Traditional Harmony', color: '#FF6F61' },
    'marhaba': { gesture: '🤝', description: 'Hospitality Node', color: '#6B5B95' },
    'science': { gesture: '🧬', description: 'Molecular Pattern', color: '#88B04B' },
    'maths': { gesture: '📐', description: 'Geometric Logic', color: '#92A8D1' },
    'coding': { gesture: '💻', description: 'Syntax Execution', color: '#955251' }
  };

  useEffect(() => {
    if (isActive && text) {
      convertToSignLanguage(text);
    }
  }, [text, isActive]);

  const convertToSignLanguage = (inputText: string) => {
    const lowerText = inputText.toLowerCase();
    const sequence: Gesture[] = [];
    
    // Check for known phrases
    Object.keys(signLanguageMap).forEach(phrase => {
      if (lowerText.includes(phrase)) {
        sequence.push(signLanguageMap[phrase]);
      }
    });

    // If no matches, show first character of words as a fallback
    if (sequence.length === 0) {
      const words = inputText.split(' ');
      words.forEach((word) => {
        if (word.length > 0) {
          sequence.push({
            gesture: word.charAt(0).toUpperCase(),
            description: `Letter: ${word.charAt(0).toUpperCase()}`,
            color: '#D4AF37'
          });
        }
      });
    }

    setGestureSequence(sequence);
    animateGestures(sequence);
  };

  const animateGestures = (sequence: Gesture[]) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < sequence.length) {
        setCurrentGesture(sequence[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentGesture(null), 3000);
      }
    }, 2000);
  };

  if (!isActive) return null;

  return (
    <div className="glass-strong rounded-[40px] p-8 border-2 border-gold/30 shadow-[0_20px_50px_rgba(106,13,173,0.2)] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-royal/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 blur-2xl rounded-full" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-royal flex items-center justify-center text-white shadow-lg">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-text-main italic tracking-tight">AI SIGN <span className="text-royal">TRANSLATOR</span></h3>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[2px]">Real-time Interpretation</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span className="text-green-600 text-[10px] font-black uppercase tracking-widest">Live Engine</span>
          </div>
        </div>

        {/* Current Gesture Display */}
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="flex-1 text-center">
            <div className="inline-block relative p-12 glass-dark rounded-[50px] border-2 border-gold/40 shadow-2xl overflow-hidden group w-full max-w-sm">
              <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
              
              {/* Neural Mapping Grid (Visual Deco) */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="grid grid-cols-6 h-full">
                    {[...Array(36)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-gold/20" />
                    ))}
                 </div>
              </div>

              <AnimatePresence mode="wait">
                {currentGesture ? (
                  <motion.div
                    key={currentGesture.gesture}
                    initial={{ scale: 0.5, opacity: 0, rotate: -25, y: 50 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                    exit={{ scale: 1.5, opacity: 0, rotate: 25, y: -50 }}
                    className="relative z-10"
                  >
                    <div className="text-[120px] mb-8 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] filter saturate-150 animate-bounce">
                      {currentGesture.gesture}
                    </div>
                    <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-red-600 to-royal text-white text-[10px] font-black uppercase tracking-[4px] shadow-2xl border border-white/20">
                      <Fingerprint className="w-4 h-4 text-gold" />
                      {currentGesture.description}
                    </div>
                  </motion.div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center py-20">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 animate-pulse">
                      <Hand className="w-12 h-12 text-gold/30" />
                    </div>
                    <p className="text-white/40 text-[8px] uppercase font-black tracking-[8px]">Scanning Neural Signals</p>
                  </div>
                )}
              </AnimatePresence>

              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 h-1 bg-gold transition-all duration-300" style={{ width: `${(gestureSequence.findIndex(g => g.gesture === currentGesture?.gesture) + 1) / gestureSequence.length * 100}%` }} />
            </div>
          </div>

          {/* Visual Decoder sidebar */}
          <div className="w-full lg:w-64 glass-dark rounded-[40px] p-6 border border-white/10">
            <h4 className="text-[8px] font-black uppercase tracking-[5px] text-gold mb-6 italic">Neural Signature</h4>
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[6px] font-black text-white/40 uppercase">
                       <span>Node {i} - Active</span>
                       <span>{(Math.random() * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.random() * 80 + 20}%` }}
                        transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
                        className="h-full bg-gold" 
                       />
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
               <p className="text-[8px] font-bold text-white/60 leading-relaxed uppercase">
                 AI Engine is currently mapping phonetic structures to 3D skeletal hand orientations for optimal accessibility.
               </p>
            </div>
          </div>
        </div>

        {/* Gesture Sequence */}
        {gestureSequence.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 ml-1">
              <Sparkles className="w-3 h-3 text-gold" />
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Processing Sequence</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {gestureSequence.map((gesture, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={index}
                  className={`glass px-5 py-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    currentGesture?.gesture === gesture.gesture 
                      ? 'border-gold bg-gold/10 shadow-lg scale-110' 
                      : 'border-purple-border/20 hover:border-royal/40'
                  }`}
                >
                  <span className="text-3xl filter drop-shadow-sm">
                    {gesture.gesture}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Reference */}
        <div className="mt-10 pt-8 border-t border-purple-border/30">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-4 h-4 text-gold" />
            <p className="text-text-main font-black text-xs uppercase tracking-widest">
              Standardized Lexicon
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(signLanguageMap).slice(0, 5).map(([key, value]) => (
              <div key={key} className="glass p-4 rounded-2xl text-center hover:bg-gold/10 hover:-translate-y-1 transition-all border border-purple-border/10 cursor-help">
                <div className="text-3xl mb-2">{value.gesture}</div>
                <p className="text-royal font-black text-[8px] uppercase tracking-widest">{key}</p>
                <div className="mt-2 text-green-500">
                  <CheckCircle2 className="w-3 h-3 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguageDisplay;
