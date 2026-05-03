import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FaceRecognitionMonitor from '../components/FaceRecognitionMonitor';
import VoiceMonitor from '../components/VoiceMonitor';
import { ShieldAlert, Clock, ChevronLeft, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'motion/react';

const SecureExam = () => {
  const navigate = useNavigate();
  const [examStarted, setExamStarted] = useState(false);
  const [securityVerified, setSecurityVerified] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour
  const [violations, setViolations] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = [
    {
      id: 1,
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cell Membrane'],
      correct: 1
    },
    {
      id: 2,
      question: 'What is the chemical formula for water?',
      options: ['H2O', 'CO2', 'O2', 'NaCl'],
      correct: 0
    },
    {
      id: 3,
      question: 'Who wrote Romeo and Juliet?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      correct: 1
    }
  ];

  useEffect(() => {
    if (examStarted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && examStarted) {
        handleSecurityAlert('tab_switch', 'Student switched tabs - possible cheating');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [examStarted]);

  const handleSecurityAlert = (type: string, message: string) => {
    const alert = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setViolations(prev => [...prev, alert]);
  };

  const startExam = () => {
    if (!securityVerified) {
      return;
    }
    setExamStarted(true);
    enterFullScreen();
  };

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }
  };

  const submitExam = () => {
    setExamStarted(false);
    alert(`Exam submitted! Score: ${calculateScore()}/${questions.length}`);
    navigate('/exam-hub');
  };

  const calculateScore = () => {
    return questions.filter((q, i) => answers[i] === q.correct).length;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-24 pb-20 selection:bg-gold selection:text-black font-sans">
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-red-600 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="glass-strong rounded-[40px] px-8 py-6 mb-8 border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-gold opacity-50" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center text-gold">
                <Lock size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter">SECURE <span className="text-gold">EXAM</span></h1>
                <p className="text-[8px] font-black uppercase tracking-[5px] text-white/30 italic">AI Proctoring Active • Protocol 04-B</p>
              </div>
            </div>
            
            {examStarted && (
              <div className="flex items-center gap-12">
                <div className="text-center">
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1 italic">Synchronization Remaining</p>
                  <p className={`text-3xl font-black italic ${timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-gold'}`}>
                    {formatTime(timeRemaining)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1 italic">Vector Node</p>
                  <p className="text-2xl font-black italic text-white">
                    0{currentQuestion + 1} / 0{questions.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
          {/* Dashboard Panel (Left) */}
          <div className="space-y-6">
            <FaceRecognitionMonitor 
              onSecurityAlert={handleSecurityAlert}
              isActive={true}
            />

            <VoiceMonitor 
              onSecurityAlert={handleSecurityAlert}
              isActive={true}
            />

            <div className="glass-strong rounded-[40px] p-8 border border-red-500/10 bg-red-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -mr-12 -mt-12" />
              <h3 className="text-sm font-black italic uppercase italic mb-6 flex items-center gap-3">
                <ShieldAlert size={16} className="text-red-500" />
                Dissonance Alerts ({violations.length})
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {violations.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 size={32} className="text-green-400 mx-auto mb-4 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-green-400/40 italic">Integrity Sync'd</p>
                  </div>
                ) : (
                  violations.slice().reverse().map(alert => (
                    <div key={alert.id} className="glass p-4 rounded-2xl border border-red-500/20 bg-red-500/5 group hover:bg-red-500/10 transition-all">
                      <p className="text-[10px] font-black italic text-red-400 uppercase leading-relaxed">{alert.message}</p>
                      <p className="text-[8px] font-black uppercase text-white/10 mt-2 tracking-widest">{alert.timestamp}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Core Content (Right) */}
          <div className="relative">
            {!examStarted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong rounded-[60px] p-12 border border-white/5 relative overflow-hidden h-full flex flex-col justify-center items-center text-center shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gold/30" />
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold mb-8 shadow-2xl animate-pulse">
                   <Lock size={40} />
                </div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Verification Sequence</h2>
                <p className="text-sm font-medium text-white/40 italic max-w-lg mb-12 uppercase tracking-wide leading-relaxed">
                  Decouple from all external inputs. Neural-Lock protocol requires multi-point biometric validation.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
                   <div className="glass p-8 rounded-[40px] border border-white/5 text-center group hover:border-green-400/30 transition-all">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white/20 group-hover:text-green-400 transition-colors">
                        <CheckCircle2 size={24} />
                      </div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Visual ID</h4>
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-[3px]">Real-Time Sync</p>
                   </div>
                   <div className="glass p-8 rounded-[40px] border border-white/5 text-center group hover:border-blue-400/30 transition-all">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white/20 group-hover:text-blue-400 transition-colors">
                        <Activity size={24} />
                      </div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Voice Index</h4>
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-[3px]">Neural Print</p>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                   <button 
                    onClick={() => setSecurityVerified(true)}
                    className="flex-1 glass border border-white/10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all"
                   >
                     {securityVerified ? "Verified ✓" : "Initiate Sync"}
                   </button>
                   <button
                    onClick={startExam}
                    disabled={!securityVerified}
                    className="flex-1 bg-white text-black py-5 rounded-3xl text-[10px] font-black uppercase tracking-[5px] hover:bg-gold transition-all shadow-2xl disabled:opacity-20 disabled:cursor-not-allowed"
                   >
                    DECOUPLE & START
                   </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong rounded-[60px] p-12 border border-white/5 relative shadow-2xl h-full flex flex-col"
              >
                <div className="flex-1 flex flex-col justify-center py-20 px-4 md:px-12">
                   <div className="mb-12">
                      <span className="text-[10px] font-black uppercase tracking-[10px] text-gold/60 mb-6 block">Vector Evaluation {currentQuestion + 1}</span>
                      <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight italic">
                        {questions[currentQuestion].question}
                      </h2>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setAnswers({...answers, [currentQuestion]: index})}
                          className={`w-full p-8 rounded-[30px] text-left transition-all border font-black uppercase italic tracking-tight text-sm ${
                            answers[currentQuestion] === index
                              ? 'bg-gold text-black border-gold shadow-2xl scale-105'
                              : 'glass-strong border-white/5 text-white/40 hover:border-gold/30 hover:bg-white/5'
                          }`}
                        >
                          <span className={`${answers[currentQuestion] === index ? 'text-black/40' : 'text-gold'} mr-4`}>0{index + 1}.</span>
                          {option}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
                   <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all disabled:opacity-0"
                   >
                    <ChevronLeft size={16} /> Previous Node
                   </button>
                   
                   <div className="flex gap-4">
                      {currentQuestion === questions.length - 1 ? (
                        <button
                          onClick={submitExam}
                          className="px-12 py-5 bg-gold text-black rounded-3xl font-black uppercase tracking-[5px] text-[10px] shadow-2xl hover:scale-105 transition-all"
                        >
                          TERMINATE & SYNC
                        </button>
                      ) : (
                        <button
                          onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                          className="px-12 py-5 bg-white text-black rounded-3xl font-black uppercase tracking-[5px] text-[10px] hover:bg-gold transition-all flex items-center gap-3"
                        >
                          Next Vector <ChevronRight size={16} />
                        </button>
                      )}
                   </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureExam;

// Mock Activity Icon missing from lucide-react in previous version
const Activity = ({ size, className }: any) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
