import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Timer, ChevronLeft, ChevronRight, CheckCircle2, 
  AlertCircle, Brain, Target, Trophy, ArrowRight,
  TrendingUp, Star, Lightbulb, Clock, Home, BarChart2,
  Crosshair, Loader2
} from "lucide-react";
import { competitiveService } from "../services/competitiveService";
import { auth } from "../lib/firebase";

const CompetitiveExamTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { questions = [], examType = '', topic = '', subtopic = '', difficulty = '' } = location.state || {};
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [resultsData, setResultsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/competitive-exam-hub');
      return;
    }

    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [questions, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleSubmit = async () => {
    const unanswered = questions.length - Object.keys(selectedAnswers).length;
    if (unanswered > 0) {
      if (!window.confirm(`You still have ${unanswered} unanswered cells. Terminate session?`)) {
        return;
      }
    }

    setLoading(true);
    try {
      const correctCount = questions.reduce((acc: number, q: any, idx: number) => {
        return acc + (selectedAnswers[idx] === q.correct_answer ? 1 : 0);
      }, 0);

      const score = correctCount;
      const percentage = (score / questions.length) * 100;
      
      const attemptData = {
        userId: auth.currentUser?.uid || "anon",
        examType,
        topic,
        subtopic,
        difficulty,
        score,
        totalQuestions: questions.length,
        percentage,
        timeTaken: timeElapsed,
        answers: selectedAnswers
      };

      await competitiveService.saveAttempt(attemptData);
      
      setResultsData({
        score,
        total: questions.length,
        percentage,
        timeTaken: timeElapsed,
        readinessScore: Math.min(100, percentage + (difficulty === 'hard' ? 10 : 0))
      });
      setShowResults(true);
    } catch (error) {
      console.error(error);
      alert("Relay failed. Submission not recorded.");
    } finally {
      setLoading(false);
    }
  };

  if (questions.length === 0) return null;

  if (showResults && resultsData) {
    return (
      <div className="min-h-screen bg-midnight-black pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Results Header */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-[60px] p-12 mb-8 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-royal/10 blur-[100px]" />
            
            <div className="text-center relative z-10">
              <div className="w-24 h-24 rounded-[30px] bg-royal/20 flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-royal/40">
                <Trophy size={48} className="text-gold" strokeWidth={1.5} />
              </div>
              <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4">Engagement <span className="text-gold">Complete</span></h1>
              <p className="text-white/40 font-black uppercase tracking-[5px] text-[10px]">Vector Analysis Synchronized</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                { label: "Accuracy", val: `${resultsData.percentage.toFixed(1)}%`, icon: Target, color: "text-green-400" },
                { label: "Readiness", val: `${resultsData.readinessScore.toFixed(0)}`, icon: Brain, color: "text-gold" },
                { label: "Time taken", val: formatTime(timeElapsed), icon: Clock, color: "text-blue-400" },
              ].map((stat, i) => (
                <div key={i} className="glass p-8 rounded-[40px] border border-white/5 text-center">
                  <stat.icon className={`${stat.color} mx-auto mb-4`} size={24} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
                  <p className="text-4xl font-black italic tracking-tighter">{stat.val}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Review */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-4">
              <Lightbulb className="text-gold" />
              Neural Rationale
            </h2>

            {questions.map((q: any, idx: number) => {
              const isCorrect = selectedAnswers[idx] === q.correct_answer;
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  key={idx}
                  className={`glass-strong p-10 rounded-[50px] border ${isCorrect ? 'border-green-500/20' : 'border-red-500/20'}`}
                >
                  <div className="flex gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center font-black italic ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {idx + 1}
                    </div>
                    <div className="space-y-6 flex-1">
                      <p className="text-xl font-bold italic leading-relaxed">{q.question}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt: string, oIdx: number) => {
                          const isSelected = selectedAnswers[idx] === oIdx;
                          const isAnswer = q.correct_answer === oIdx;
                          return (
                            <div 
                              key={oIdx}
                              className={`p-5 rounded-2xl border text-sm font-bold flex items-center justify-between ${
                                isAnswer ? 'bg-green-500/10 border-green-500/40 text-green-400' : 
                                isSelected ? 'bg-red-500/10 border-red-500/40 text-red-400' : 
                                'glass border-white/5 text-white/40'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="opacity-40">{String.fromCharCode(65 + oIdx)}.</span>
                                {opt}
                              </div>
                              {isAnswer && <CheckCircle2 size={16} />}
                              {isSelected && !isAnswer && <AlertCircle size={16} />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-6 rounded-3xl bg-royal/10 border border-royal/20 flex gap-4">
                        <Brain size={20} className="text-royal flex-shrink-0 mt-1" />
                        <div className="space-y-2">
                           <p className="text-[10px] font-black uppercase tracking-widest text-royal">A.I. Rationale</p>
                           <p className="text-sm text-white/70 italic leading-relaxed">{q.rationale}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-16">
            <button onClick={() => navigate('/competitive-exam-hub')} className="glass-strong px-12 py-5 rounded-full text-gold font-black uppercase tracking-[5px] text-[10px] border border-white/10 flex items-center gap-4 hover:border-gold/30 transition-all">
              <Home size={16} /> Exit Arena
            </button>
            <button onClick={() => navigate('/dashboard')} className="bg-royal px-12 py-5 rounded-full text-white font-black uppercase tracking-[5px] text-[10px] flex items-center gap-4 shadow-xl shadow-royal/30 hover:scale-105 transition-all">
              <BarChart2 size={16} /> View Rankings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-midnight-black pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      <div className="max-w-4xl mx-auto">
        {/* Test Header */}
        <div className="glass-strong p-8 rounded-[40px] border border-white/5 mb-10 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <ChevronLeft size={20} />
            </button>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{examType} • {topic}</p>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase">{subtopic || "Neural Battery"}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3 border border-gold/20">
              <Timer className="w-4 h-4 text-gold" />
              <span className="font-black italic text-lg text-gold">{formatTime(timeElapsed)}</span>
            </div>
            <div className="glass px-6 py-3 rounded-2xl flex items-center gap-2 border border-white/10">
              <span className="text-white font-black italic text-lg">{currentQuestion + 1}</span>
              <span className="text-white/20 font-black italic text-sm">/ {questions.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Matrix */}
        <div className="flex gap-1.5 mb-10 px-2">
          {questions.map((_: any, i: number) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full overflow-hidden transition-all duration-500 bg-white/5 border border-white/5`}
            >
              <div 
                className={`h-full transition-all duration-500 ${
                  i === currentQuestion ? 'bg-royal w-full' : 
                  selectedAnswers[i] !== undefined ? 'bg-gold/40 w-full' : 'w-0'
                }`} 
              />
            </div>
          ))}
        </div>

        {/* Question Interface */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -20 }}
            className="glass-strong p-12 rounded-[60px] border border-white/5 min-h-[500px] flex flex-col"
          >
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-royal/30 text-royal mb-8">
                <Crosshair size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Target Vector {currentQuestion + 1}</span>
              </div>
              <h3 className="text-3xl font-bold italic text-white leading-tight mb-4">{currentQ.question}</h3>
            </div>

            <div className="space-y-4 flex-1">
              {currentQ.options.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswerSelect(i)}
                  className={`w-full p-6 rounded-3xl border text-left transition-all group relative overflow-hidden flex items-center gap-6 ${
                    selectedAnswers[currentQuestion] === i
                      ? "bg-royal border-royal text-white shadow-xl shadow-royal/20"
                      : "glass border-white/5 text-white/50 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black italic transition-colors ${
                    selectedAnswers[currentQuestion] === i ? "bg-white/20 text-white" : "bg-white/5 text-white/30"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-lg font-bold italic flex-1">{opt}</span>
                  {selectedAnswers[currentQuestion] === i && (
                    <motion.div layoutId="check" className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-royal" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-16 flex justify-between items-center">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-8 py-4 rounded-2xl glass border border-white/5 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-3 disabled:opacity-20"
              >
                <ChevronLeft size={16} /> Back
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-12 py-5 rounded-2xl bg-royal text-white font-black uppercase tracking-[5px] text-[10px] flex items-center gap-4 shadow-xl shadow-royal/30 hover:scale-105 transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <TrendingUp size={16} />}
                  Terminal Submit
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-12 py-5 rounded-2xl bg-gold text-black font-black uppercase tracking-[5px] text-[10px] flex items-center gap-4 shadow-xl shadow-gold/20 hover:scale-105 transition-all"
                >
                  Next Cell <ChevronRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompetitiveExamTest;
