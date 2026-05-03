import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  CircleDot, 
  HelpCircle, 
  ArrowLeft, 
  Rocket, 
  Volume2, 
  VolumeX, 
  HandMetal, 
  Sparkles, 
  Info,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const InteractiveLesson = () => {
  const navigate = useNavigate();
  const [lessonStarted, setLessonStarted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showSignLanguage, setShowSignLanguage] = useState(false);

  const quiz = {
    question: "What is the trajectory path of a projectile?",
    options: [
      { id: 1, text: "Straight line", correct: false },
      { id: 2, text: "Parabolic curve", correct: true },
      { id: 3, text: "Circular path", correct: false },
      { id: 4, text: "Zigzag pattern", correct: false }
    ]
  };

  const startLesson = () => {
    setLessonStarted(true);
    // Simulate lesson progression
    setTimeout(() => {
      setShowQuiz(true);
    }, 3000);
  };

  const handleAnswer = (option: { id: number; text: string; correct: boolean }) => {
    setSelectedAnswer(option.id);
    if (option.correct) {
      setFeedback("✅ Excellent! ZIARA says: 'Perfect answer, champion!'");
    } else {
      setFeedback("❌ Not quite! ZIARA says: 'Think about how gravity pulls an object down as it moves forward.'");
    }
  };

  return (
    <div className="min-h-screen bg-midnight-black pt-32 pb-20 px-4 md:px-8">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 text-gold text-[10px] font-black uppercase tracking-[5px] mb-4">
              <CircleDot size={16} /> Neural Physics Stream
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              PROJECTILE <span className="text-gold">MOTION</span>
            </h1>
            <p className="text-white/40 italic mt-4 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <Info size={16} className="text-royal" /> Interactive AI Tutor Lesson with Sign Language Support
            </p>
          </motion.div>
          <button
            onClick={() => navigate('/ai-tutor')}
            className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/5"
          >
             <ArrowLeft size={16} /> Return to AI Tutor
          </button>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 items-start">
          <div className="space-y-8">
            {/* Lesson Stage */}
            <div className={`glass-strong rounded-[60px] p-10 border border-white/5 relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center transition-all duration-1000 ${lessonStarted ? 'border-royal/30' : ''}`}>
              <AnimatePresence mode="wait">
                {!lessonStarted ? (
                  <motion.div 
                    key="intro"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 rounded-[32px] bg-gold/10 flex items-center justify-center mx-auto mb-8 border border-gold/20 shadow-2xl shadow-gold/10">
                       <Play className="text-gold fill-gold" size={40} />
                    </div>
                    <h2 className="text-3xl font-black italic text-white mb-4 uppercase tracking-tighter underline underline-offset-8 decoration-gold/20">Initialize Narrative</h2>
                    <p className="text-white/40 italic text-lg mb-10 max-w-sm mx-auto">Prepare for a visual exploration of how objects move through the atmosphere.</p>
                    <button
                      onClick={startLesson}
                      className="px-12 py-5 rounded-[25px] bg-royal text-white font-black uppercase tracking-[10px] text-[10px] hover:scale-110 transition-all shadow-2xl shadow-royal/30 flex items-center gap-4"
                    >
                      Initialize Link <Rocket size={18} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="lesson"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full flex flex-col items-center"
                  >
                    {/* Visualizer */}
                    <div className="w-full relative aspect-video bg-black/40 rounded-[40px] border border-white/5 mb-8 flex items-center justify-center overflow-hidden">
                       {/* SVG Vector Path */}
                       <svg viewBox="0 0 400 200" className="w-4/5 h-auto lg:scale-125">
                        <defs>
                          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c5a059" />
                            <stop offset="100%" stopColor="#4355ff" />
                          </linearGradient>
                        </defs>
                        {/* Static Ground */}
                        <line x1="0" y1="180" x2="400" y2="180" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.5" />
                        
                        {/* Dynamic Path */}
                        <motion.path 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                          d="M 50 180 Q 200 50 350 180" 
                          stroke="url(#curveGradient)" 
                          strokeWidth="3" 
                          fill="none"
                          strokeDasharray="10,5"
                        />
                        
                        {/* Projectile Particle */}
                        <motion.circle 
                          initial={{ offset: 0 }}
                          animate={{ 
                            cx: [50, 200, 350], 
                            cy: [180, 50, 180] 
                          }}
                          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                          r="6" 
                          fill="#FFD700" 
                          className="shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                        />

                        {/* Initial velocity vector */}
                        <line x1="50" y1="180" x2="100" y2="150" stroke="#00FF00" strokeWidth="2" />
                        <text x="105" y="145" fill="#00FF00" fontSize="12" className="italic font-bold">V₀</text>
                        {/* Angle */}
                        <path d="M 70 180 A 20 20 0 0 1 80 170" stroke="#FFD700" strokeWidth="1" fill="none"/>
                        <text x="85" y="185" fill="#FFD700" fontSize="12" className="font-bold">θ</text>
                      </svg>
                      
                      {/* Neural Overlay */}
                      <div className="absolute inset-0 pointer-events-none border-[20px] border-black/40 blur-md inset-[-10px]" />
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-[32px] bg-gradient-royal p-0.5 overflow-hidden shadow-2xl relative z-10">
                           <div className="w-full h-full rounded-[31px] overflow-hidden bg-black flex items-center justify-center">
                             <img 
                                src="https://customer-assets.emergentagent.com/job_ai-learning-hub-363/artifacts/0z197gja_AI%20Mentor%20ZIARA.jpeg"
                                alt="Captain ZIARA Mentor"
                                className="w-full h-full object-cover"
                             />
                           </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2.5 animate-pulse shadow-lg border-2 border-midnight-black z-20">
                          <Volume2 size={16} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-2xl font-black italic uppercase tracking-tighter text-white">CAPTAIN <span className="text-gold">ZIARA</span></h4>
                        <p className="text-[10px] font-black uppercase tracking-[5px] text-white/30 italic">Interactive AI Mentor</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sign Language Window Overlay */}
              <AnimatePresence>
                {showSignLanguage && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    className="absolute bottom-10 right-10 glass-strong border border-royal/30 p-4 rounded-3xl w-48 shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="w-full aspect-square rounded-2xl bg-white/5 flex items-center justify-center mb-4 relative overflow-hidden group">
                       <img 
                        src="https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=400"
                        alt="Sign Support"
                        className="w-full h-full object-cover grayscale opacity-50 contrast-125"
                       />
                       <div className="absolute inset-0 bg-royal/10 mix-blend-overlay" />
                    </div>
                    <div className="flex items-center gap-2">
                       <HandMetal size={14} className="text-royal" />
                       <span className="text-[8px] font-black uppercase tracking-[3px] text-white/40">HAYAT SIGN AI</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quiz Section */}
            <AnimatePresence>
              {showQuiz && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-strong p-10 rounded-[50px] border border-white/5"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold">
                       <HelpCircle size={20} />
                    </div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Knowledge Verification</h3>
                  </div>

                  <p className="text-lg italic text-white/80 mb-10 leading-relaxed font-black">{quiz.question}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quiz.options.map((opt) => (
                       <button
                          key={opt.id}
                          onClick={() => handleAnswer(opt)}
                          disabled={selectedAnswer !== null}
                          className={`p-6 rounded-[30px] text-left transition-all border group relative overflow-hidden ${
                            selectedAnswer === opt.id
                              ? opt.correct 
                                ? "bg-green-500/20 border-green-500/40 text-green-400"
                                : "bg-red-500/20 border-red-500/40 text-red-100"
                              : "glass hover:border-gold/30 text-white/60"
                          }`}
                       >
                          <div className="flex items-center justify-between pointer-events-none">
                            <span className="text-sm font-black italic">{opt.text}</span>
                            {selectedAnswer === opt.id && (
                               opt.correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />
                            )}
                          </div>
                          {selectedAnswer === null && (
                            <div className="absolute top-0 right-0 w-2 h-full bg-gold/0 group-hover:bg-gold/20 transition-all" />
                          )}
                       </button>
                    ))}
                  </div>

                  {feedback && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`mt-10 p-6 rounded-[30px] border flex items-center gap-4 ${feedback.includes('✅') ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}
                    >
                      <Sparkles size={20} />
                      <p className="text-sm font-black italic">{feedback}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="space-y-8 sticky top-32">
             <div className="glass-strong p-10 rounded-[50px] border border-white/5">
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8 underline decoration-gold underline-offset-8">Accessibility</h3>
                
                <div className="space-y-6">
                  <button 
                    onClick={() => setShowSignLanguage(!showSignLanguage)}
                    className={`w-full py-5 rounded-[25px] flex items-center justify-center gap-4 border transition-all ${
                      showSignLanguage 
                        ? 'bg-royal text-white border-royal shadow-2xl shadow-royal/30' 
                        : 'glass text-white/40 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <HandMetal size={18} /> 
                    <span className="text-[10px] font-black uppercase tracking-[5px]">{showSignLanguage ? 'ACTIVE' : 'SIGN LANGUAGE'}</span>
                  </button>

                  <button className="w-full py-5 rounded-[25px] glass text-white/40 border border-white/5 flex items-center justify-center gap-4 hover:bg-white/5">
                    <VolumeX size={18} /> 
                    <span className="text-[10px] font-black uppercase tracking-[5px]">MUTE STREAM</span>
                  </button>
                </div>
             </div>

             <div className="glass-strong p-10 rounded-[50px] border border-white/5">
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8">Lesson Progress</h3>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: lessonStarted ? (showQuiz ? '100%' : '60%') : '0%' }}
                    className="h-full bg-royal"
                   />
                </div>
                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-white/20">
                   <span>Curriculum Link</span>
                   <span className="text-royal">Active Stream</span>
                </div>
             </div>

             <div className="glass p-8 rounded-[40px] border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent">
                <Sparkles className="text-gold mb-6" size={24} />
                <h4 className="text-sm font-black uppercase tracking-widest mb-4 italic">Neural Tip</h4>
                <p className="text-[10px] text-white/40 italic leading-relaxed">ZIARA says: "The range of a projectile is maximized at a launch angle of 45 degrees. Gravity is always acting downwards!"</p>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLesson;
