import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignLanguageDisplay from '../components/SignLanguageDisplay';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from "../contexts/LanguageContext";
import { Mic, MicOff, Volume2, VolumeX, Play, Send, Brain, Award, Sparkles, BookOpen, Rocket, Sword, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AITutor = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const [isLessonStarted, setIsLessonStarted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  
  // Voice & Sign Language States
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isSignLanguageMode, setIsSignLanguageMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [transcript, setTranscript] = useState('');
  
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"video" | "3d" | "quiz">("video");
  const [activeModel, setActiveModel] = useState("Animal Cell");

  const scienceModels = [
    { name: "Animal Cell", icon: "🧬", info: "Complex eukaryotic structure" },
    { name: "DNA Helix", icon: "🧬", info: "Genetic blueprint of life" },
    { name: "Cardiac System", icon: "❤️", info: "Human circulatory node" },
    { name: "Neural Network", icon: "🧠", info: "Synaptic firing patterns" }
  ];

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);

  // Initialize Gemini
  const aiRef = useRef(new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" }));

  // Language Aware Lesson & Quiz
  const getLocalizedContent = () => {
    switch(currentLanguage) {
      case 'hi':
        return {
          lesson: "सेल बायोलॉजी में आपका स्वागत है। आज हम कोशिकाओं के बारे में सीखेंगे।",
          quiz: {
            question: "कोशिका का पावरहाउस क्या है?",
            options: [
              { id: 1, text: "माइटोकॉन्ड्रिया", correct: true },
              { id: 2, text: "केंद्रक", correct: false },
              { id: 3, text: "राइबोसोम", correct: false },
              { id: 4, text: "क्लोरोप्लास्ट", correct: false }
            ]
          }
        };
      case 'ar':
        return {
          lesson: "مرحبًا بكم في علم الأحياء الخلوي. سنتعلم اليوم عن الخلايا.",
          quiz: {
            question: "ما هو بيت الطاقة في الخلية؟",
            options: [
              { id: 1, text: "الميتوكوندريا", correct: true },
              { id: 2, text: "النواة", correct: false },
              { id: 3, text: "الريبوسوم", correct: false },
              { id: 4, text: "البلاستيدات الخضراء", correct: false }
            ]
          }
        };
      default:
        return {
          lesson: "Welcome to Cell Biology. Today we will learn about cells, the basic unit of life.",
          quiz: {
            question: "What is the powerhouse of the cell?",
            options: [
              { id: 1, text: "Mitochondria", correct: true },
              { id: 2, text: "Nucleus", correct: false },
              { id: 3, text: "Ribosome", correct: false },
              { id: 4, text: "Chloroplast", correct: false }
            ]
          }
        };
    }
  };

  const currentContent = getLocalizedContent();
  const lessonText = currentContent.lesson;
  const quiz = currentContent.quiz;

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
        if (finalTranscript) {
          setVoiceInput(finalTranscript.trim());
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const handleAiChat = async (input: string) => {
    if (!input || isLoading) return;
    setIsLoading(true);
    setAiResponse("ZIARA is thinking...");

    try {
      const response = await aiRef.current.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: `You are ZIARA, an expert AI Teacher. You must respond in the ${currentLanguage} language. Keep your answers educational, encouraging, and clear. If the student asks a question, provide a detailed explanation. Use a style that fits the WINGS EDU-SKILL platform (cinematic, royal, and encouraging).`
        }
      });

      const text = response.text || "I'm sorry, I couldn't process that.";
      setAiResponse(text);
      if (isVoiceMode) speakText(text);
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("I had a neural glitch. Let me try that again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (voiceInput && isListening) {
      handleAiChat(voiceInput);
    }
  }, [voiceInput]);

  const startLesson = () => {
    setIsLessonStarted(true);
    if (isVoiceMode) {
      speakText(lessonText);
    }
    setTimeout(() => setShowQuiz(true), 5000);
  };

  const speakText = (text: string) => {
    if (synthRef.current && text) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleVoiceMode = () => {
    const newVoiceMode = !isVoiceMode;
    setIsVoiceMode(newVoiceMode);
    if (!newVoiceMode) {
      stopSpeaking();
    }
  };

  const toggleSignLanguageMode = () => {
    setIsSignLanguageMode(!isSignLanguageMode);
  };

  const startVoiceRecognition = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
      setVoiceInput('');
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleAnswer = (option: any) => {
    setSelectedAnswer(option.id);
    const feedbackText = option.correct 
      ? '✅ Correct! Excellent understanding!' 
      : '❌ Not quite. The powerhouse of the cell is Mitochondria!';
    
    setFeedback(feedbackText);
    
    if (isVoiceMode) {
      speakText(feedbackText);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-black relative">
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <div className="glass-strong rounded-[40px] p-8 mb-8 border border-gold/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
            
            <div className="flex items-center gap-8 flex-wrap">
              <div className="relative">
                <motion.div 
                  animate={{ scale: isSpeaking ? 1.05 : 1 }}
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-rose-600 flex items-center justify-center border-4 border-gold shadow-[0_0_50px_rgba(212,175,55,0.4)] overflow-hidden p-1 relative"
                >
                  <img 
                    src="https://customer-assets.emergentagent.com/job_ai-learning-hub-363/artifacts/0z197gja_AI%20Mentor%20ZIARA.jpeg"
                    alt="AI Mentor ZIARA"
                    className="w-full h-full object-cover rounded-full"
                  />
                  {isSpeaking && (
                    <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                          <motion.div
                            key={i}
                            animate={{ height: [10, 30, 10] }}
                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                            className="w-1 bg-white rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
                
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-royal-dark px-6 py-1 rounded-full font-black text-xs shadow-lg tracking-widest border border-white/50">
                  ZIARA AI
                </div>
              </div>

              <div className="flex-1 min-w-[300px]">
                <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">
                  MATHS & <span className="text-gold">SCIENCE ZONE</span>
                </h1>
                <p className="text-white/60 text-lg mb-6 leading-relaxed max-w-xl italic">
                  "Science ball ki swing ki tarah hai, aur Maths scorecard ki tarah. Dono mein master bano!"
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startLesson}
                    disabled={isLessonStarted}
                    className="bg-gold text-royal-dark px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 fill-current" />
                      {isLessonStarted ? 'Lesson Active' : 'Start Lesson'}
                    </div>
                  </motion.button>

                  <button
                    onClick={toggleVoiceMode}
                    className={`px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border ${
                      isVoiceMode ? 'bg-royal text-white border-white/20' : 'glass text-gold border-gold/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isVoiceMode ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      {isVoiceMode ? 'Voice ON' : 'Enable Voice'}
                    </div>
                  </button>

                  <button
                    onClick={toggleSignLanguageMode}
                    className={`px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border ${
                      isSignLanguageMode ? 'bg-purple-600 text-white border-white/20' : 'glass text-purple-400 border-purple-400/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Sign Language
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Main Content Area */}
              <div className="glass-strong rounded-[40px] p-8 border border-white/5 shadow-inner">
                {!isLessonStarted ? (
                  <div className="aspect-video bg-white/5 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-white/10 group cursor-pointer hover:border-gold/30 transition-all" onClick={startLesson}>
                    <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-10 h-10 text-gold" />
                    </div>
                    <p className="text-xl font-bold uppercase tracking-widest text-white/40">Initialize Lesson Vector</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="aspect-video bg-black rounded-[40px] overflow-hidden relative border border-gold/20 shadow-2xl">
                      
                      {/* Mode Selectors */}
                      <div className="absolute top-6 left-6 z-20 flex gap-2">
                        <button 
                          onClick={() => setViewMode("video")}
                          className={`px-6 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'video' ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'bg-black/40 text-white hover:bg-black/60 border border-white/10'}`}
                        >
                          Visual Feed
                        </button>
                        <button 
                          onClick={() => setViewMode("3d")}
                          className={`px-6 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === '3d' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-black/40 text-white hover:bg-black/60 border border-white/10'}`}
                        >
                          3D Hologram
                        </button>
                      </div>

                      {viewMode === "video" ? (
                        <div className="relative h-full">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-transparent to-royal/40" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <Brain className="w-16 h-16 text-gold mb-4 mx-auto animate-pulse" />
                              <p className="text-xl font-black uppercase tracking-widest text-gold text-white-glow">ZIARA Streaming Session</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-[#050505] flex items-center justify-center relative overflow-hidden">
                          {/* 3D Simulation Backdrop */}
                          <div className="absolute inset-0 opacity-20 pointer-events-none">
                              <div className="grid grid-cols-12 h-full">
                                  {[...Array(144)].map((_, i) => (
                                    <div key={i} className="border-[0.5px] border-gold/10" />
                                  ))}
                              </div>
                          </div>

                          {/* The 3D Model Placeholder */}
                          <motion.div 
                            animate={{ rotateY: 360, rotateX: [0, 10, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="relative z-10 text-[180px] drop-shadow-[0_0_100px_rgba(212,175,55,0.4)]"
                          >
                            {scienceModels.find(m => m.name === activeModel)?.icon}
                          </motion.div>

                          {/* Model Info */}
                          <div className="absolute bottom-10 left-10 text-left">
                              <span className="text-[10px] font-black uppercase tracking-[5px] text-gold/60">Molecular Scan</span>
                              <h4 className="text-3xl font-black italic uppercase italic text-white mb-2">{activeModel}</h4>
                              <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                                {scienceModels.find(m => m.name === activeModel)?.info} <br />
                                Data Sync: 100% | Accuracy: Optimal
                              </p>
                          </div>

                          {/* Model Switcher */}
                          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                              {scienceModels.map(model => (
                                <button 
                                  key={model.name}
                                  onClick={() => setActiveModel(model.name)}
                                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${activeModel === model.name ? 'bg-gold border-gold text-black shadow-xl scale-110' : 'bg-black/60 border-white/10 text-white/40 hover:text-white'}`}
                                >
                                  <span className="text-xl">{model.icon}</span>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="glass p-6 rounded-3xl border border-white/10">
                      <h4 className="text-gold font-black uppercase tracking-widest text-xs mb-4">Neural Transcript</h4>
                      <p className="text-white/80 leading-relaxed text-lg italic">"{aiResponse || lessonText}"</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quiz Area */}
              <AnimatePresence>
                {showQuiz && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-strong rounded-[40px] p-10 border-2 border-royal/30 shadow-[0_0_50px_rgba(106,13,173,0.2)]"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <Award className="w-8 h-8 text-gold" />
                      <h3 className="text-3xl font-black uppercase tracking-tighter italic">Knowledge <span className="text-gold">Probe</span></h3>
                    </div>
                    
                    <p className="text-xl text-white/90 mb-8 font-medium">"{quiz.question}"</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quiz.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswer(option)}
                          disabled={selectedAnswer !== null}
                          className={`glass p-6 rounded-2xl text-left transition-all border-2 ${
                            selectedAnswer === option.id
                              ? option.correct
                                ? 'bg-green-500/20 border-green-500 text-green-400'
                                : 'bg-red-500/20 border-red-500 text-red-400'
                              : 'border-white/5 hover:border-gold/30 hover:bg-white/5'
                          }`}
                        >
                          <span className="text-gold mr-3 font-black">{String.fromCharCode(64 + option.id)}.</span>
                          {option.text}
                        </button>
                      ))}
                    </div>

                    {feedback && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`mt-8 p-6 rounded-3xl border text-center font-black uppercase tracking-widest text-sm ${
                        feedback.includes('✅') ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-red-500/20 border-red-500/30 text-red-400'
                      }`}>
                        {feedback}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-8">
              {/* Interaction Panel */}
              <div className="glass-strong rounded-[40px] p-8 border border-white/5 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <Mic className="w-5 h-5 text-gold" />
                  <h3 className="text-sm font-black uppercase tracking-widest">Neural Link</h3>
                </div>

                <div className="space-y-6">
                  <button
                    onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                    className={`w-full aspect-square rounded-[40px] flex flex-col items-center justify-center gap-4 border-2 transition-all group ${
                      isListening ? 'bg-red-500 border-white/50 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'bg-royal border-royal/30 hover:border-gold/60'
                    }`}
                  >
                    {isListening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
                    <span className="font-black uppercase tracking-[4px] text-[10px]">
                      {isListening ? 'Synchronizing...' : 'Speak to ZIARA'}
                    </span>
                  </button>

                  <div className="glass p-6 rounded-3xl border border-white/5 max-h-[300px] overflow-y-auto">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">Input Stream</p>
                    <p className="text-white/60 italic text-sm">{transcript || "Waiting for audio signal..."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {isSignLanguageMode && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 glass-strong rounded-[40px] p-8 border-2 border-purple-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={20} />
                 </div>
                 <h3 className="text-xl font-black italic uppercase italic">Sign Language <span className="text-purple-400">Interpreter</span></h3>
              </div>
              <SignLanguageDisplay text={aiResponse || lessonText} isActive={isSignLanguageMode} />
            </motion.div>
          )}

          <div className="mt-16 glass-strong p-8 rounded-[40px] border border-gold/10">
            <h3 className="text-sm font-black uppercase tracking-[5px] text-center text-gray-500 mb-8 italic">Quick Access Neural Terminals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Master Skill Hub", path: "/master-skill-hub", icon: Rocket, color: "text-blue-400" },
                { title: "Competitive Arena", path: "/competitive-exam", icon: Sword, color: "text-gold" },
                { title: "Exam Hub", path: "/exam-hub", icon: Shield, color: "text-red-400" }
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(link.path)}
                  className="glass p-6 rounded-3xl border border-white/5 hover:border-gold/30 hover:bg-white/5 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${link.color} group-hover:bg-gold group-hover:text-black transition-all`}>
                      <link.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase italic">{link.title}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Initialize Connection</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate('/')}
              className="glass px-12 py-5 rounded-full text-gold font-black uppercase tracking-[5px] text-[10px] hover:glow-gold transition-all border border-gold/30 hover:border-gold group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center group-hover:-translate-x-2 transition-transform">←</div>
                Return to Core
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
