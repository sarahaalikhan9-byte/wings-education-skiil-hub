import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, Mic, MicOff, Volume2, VolumeX, ArrowLeft, 
  ChevronDown, ChevronUp, FlaskConical, Globe, Calculator, 
  Languages, History, Palette, Cpu, Rocket, Briefcase, 
  Stethoscope, GraduationCap, Sparkles, Youtube, Book as BookIcon, ExternalLink,
  Wand2, Play, CheckCircle2, AlertCircle, Loader2
} from "lucide-react";
import { videoService } from "../services/videoService";

const Classes = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("Pre-Primary");
  const [openSubjectId, setOpenSubjectId] = useState<number | null>(null);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [assistantMessage, setAssistantMessage] = useState("Say: open science, open math, read, next, go home");
  const [dynamicResources, setDynamicResources] = useState<Record<number, any[]>>({});
  const [isGenerating, setIsGenerating] = useState<number | null>(null);
  const [genStatus, setGenStatus] = useState("");

  const YOUTUBE_CHANNEL = "https://www.youtube.com/channel/UCNKqREONoG_5xqG_qcOKqzQ";

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const filters = ["Pre-Primary", "Class 1-5", "Class 6-10", "Senior Secondary", "Skill Hub"];

  const subjectsData: Record<string, any[]> = {
    "Pre-Primary": [
      {
        id: 101,
        title: "Magic Alphabets",
        description: "Foundational phonics and letter recognition",
        icon: Languages,
        resources: [
          { type: 'video', label: 'ABC Phonics Song', url: 'https://www.youtube.com/watch?v=hq3yfQnllfQ' },
          { type: 'book', label: 'International Phonics Reader', url: 'https://www.oxfordowl.co.uk/for-home/find-a-book/library-page/' }
        ],
        lessons: [
          { name: "1. A for Apple", status: "play", color: "text-green-500" },
          { name: "2. B for Ball", status: "play", color: "text-green-500" },
          { name: "3. C for Cat", status: "locked", color: "text-gray-400" },
        ],
      },
      {
        id: 102,
        title: "Number Fun",
        description: "Counting and basic shapes for toddlers",
        icon: Calculator,
        resources: [
          { type: 'video', label: 'Number Counting 1-10', url: 'https://www.youtube.com/watch?v=DR-cfDsHCGA' },
          { type: 'book', label: 'Preschool Math Workbook', url: 'https://learnenglishkids.britishcouncil.org/' }
        ],
        lessons: [
          { name: "1. Counting 1-10", status: "play", color: "text-green-500" },
          { name: "2. Color Matching", status: "play", color: "text-green-500" },
        ],
      }
    ],
    "Class 1-5": [
      {
        id: 201,
        title: "Environmental Studies",
        description: "Our world and nature around us",
        icon: Globe,
        resources: [
          { type: 'video', label: 'Our Environment Series', url: 'https://www.youtube.com/watch?v=gEk6jlXSkYs' },
          { type: 'book', label: 'NCERT EVS Book', url: 'https://ncert.nic.in/textbook.php' }
        ],
        lessons: [
          { name: "1. My Body", status: "play", color: "text-green-500" },
          { name: "2. Different Plants", status: "play", color: "text-green-500" },
        ],
      },
      {
        id: 202,
        title: "English Grammar",
        description: "Sentence formation and vocabulary",
        icon: Languages,
        resources: [
          { type: 'video', label: 'Grammar Basics', url: 'https://www.youtube.com/watch?v=0WunA86H_XU' },
          { type: 'book', label: 'Language Skills Book', url: 'https://ncert.nic.in/textbook.php' }
        ],
        lessons: [
          { name: "1. Nouns & Verbs", status: "completed", color: "text-green-500" },
          { name: "2. Adjectives", status: "play", color: "text-green-500" },
        ],
      }
    ],
    "Class 6-10": [
      {
        id: 1,
        title: "Physics & Innovation",
        description: "Core physical concepts & laws",
        icon: FlaskConical,
        resources: [
          { type: 'video', label: 'Laws of Motion Explained', url: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds' },
          { type: 'book', label: 'NCERT Physics Class 9/10', url: 'https://ncert.nic.in/textbook.php' },
          { type: 'book', label: 'NIOS Science Material', url: 'https://nios.ac.in/online-course-material/secondary-courses.aspx' }
        ],
        lessons: [
          { name: "1. Laws of Motion", status: "play", color: "text-green-500" },
          { name: "2. Light & Optics", status: "play", color: "text-green-500" },
          { name: "3. Electricity", status: "locked", color: "text-gray-400" },
        ],
      },
      {
        id: 3,
        title: "Mathematics",
        description: "Numerical and analytical mastery",
        icon: Calculator,
        resources: [
          { type: 'video', label: 'Algebraic Identities', url: 'https://www.youtube.com/watch?v=8XEnT9S5f5M' },
          { type: 'book', label: 'NCERT Math Class 10', url: 'https://ncert.nic.in/textbook.php' }
        ],
        lessons: [
          { name: "1. Algebra Basics", status: "completed", color: "text-green-500" },
          { name: "2. Geometry", status: "play", color: "text-green-500" },
          { name: "3. Trigonometry", status: "locked", color: "text-gray-400" },
        ],
      },
    ],
    "Senior Secondary": [
      {
        id: 301,
        title: "Science Stream (PCM)",
        description: "Physics, Chem, Math focus for JEE/Engineering",
        icon: Rocket,
        resources: [
          { type: 'video', label: 'Calculus Concepts', url: 'https://www.youtube.com/watch?v=WUvTyaaNkzM' },
          { type: 'book', label: 'NCERT Class 11/12 PCM', url: 'https://ncert.nic.in/textbook.php' },
          { type: 'book', label: 'NIOS Senior Secondary', url: 'https://nios.ac.in/online-course-material/sr-secondary-courses.aspx' }
        ],
        lessons: [
          { name: "1. Calculus II", status: "play", color: "text-green-500" },
          { name: "2. Quantum Physics", status: "play", color: "text-green-500" },
        ],
      },
      {
        id: 302,
        title: "Medical Stream (PCB)",
        description: "Bio, Chem, Physics focus for NEET",
        icon: Stethoscope,
        resources: [
          { type: 'video', label: 'Human Anatomy Video', url: 'https://www.youtube.com/watch?v=f9v3-U7X76E' },
          { type: 'book', label: 'NCERT Biology Class 12', url: 'https://ncert.nic.in/textbook.php' }
        ],
        lessons: [
          { name: "1. Anatomy", status: "play", color: "text-green-500" },
          { name: "2. Genetics", status: "play", color: "text-green-500" },
        ],
      },
      {
        id: 303,
        title: "Commerce Stream",
        description: "Accountancy, Econ, Business Studies",
        icon: Briefcase,
        resources: [
          { type: 'video', label: 'Economics Basics', url: 'https://www.youtube.com/watch?v=3ez10ADq_xs' },
          { type: 'book', label: 'NCERT Commerce Books', url: 'https://ncert.nic.in/textbook.php' }
        ],
        lessons: [
          { name: "1. Accountancy", status: "play", color: "text-green-500" },
          { name: "2. Macroeconomics", status: "play", color: "text-green-500" },
        ],
      },
      {
        id: 304,
        title: "Humanities Stream",
        description: "History, Civics, Psych, Socio",
        icon: History,
        resources: [
          { type: 'video', label: 'Modern World History', url: 'https://www.youtube.com/watch?v=T_sGTspaF4Y' },
          { type: 'book', label: 'NCERT Humanities Books', url: 'https://ncert.nic.in/textbook.php' }
        ],
        lessons: [
          { name: "1. Modern History", status: "play", color: "text-green-500" },
          { name: "2. Psychology 101", status: "play", color: "text-green-500" },
        ],
      }
    ],
    "Skill Hub": [
      {
        id: 401,
        title: "AI & Neural Networks",
        description: "Learn the tech of tomorrow",
        icon: Cpu,
        resources: [
          { type: 'video', label: 'Intro to AI', url: 'https://www.youtube.com/watch?v=2ePf9rue1Ao' },
          { type: 'book', label: 'AI Principles Guide', url: 'https://ncert.nic.in/textbook.php' }
        ],
        lessons: [
          { name: "1. ML Models", status: "play", color: "text-green-500" },
          { name: "2. Data Ethics", status: "play", color: "text-green-500" },
        ],
      },
      {
        id: 402,
        title: "Digital Design",
        description: "UI/UX and visual storytelling",
        icon: Palette,
        resources: [
          { type: 'video', label: 'UI/UX Design Process', url: 'https://www.youtube.com/watch?v=zHAa-m16NGk' },
          { type: 'book', label: 'Design Fundamentals', url: 'https://ncert.nic.in/textbook.php' }
        ],
        lessons: [
          { name: "1. Layout Design", status: "play", color: "text-green-500" },
          { name: "2. Color Theory", status: "play", color: "text-green-500" },
        ],
      }
    ]
  };

  const currentSubjects = subjectsData[activeFilter] || [];

  const loadDynamicResources = async (id: number) => {
    try {
      const res = await videoService.getResources(id.toString());
      setDynamicResources(prev => ({ ...prev, [id]: res }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateVideo = async (subject: any) => {
    setIsGenerating(subject.id);
    setGenStatus("Analyzing topic...");
    try {
      speakText(`Initializing A.I. Video Brain for ${subject.title}. Generating lesson vector...`);
      setGenStatus("Synthesizing Video Frames...");
      const prompt = `Create an educational video explaining ${subject.title}: ${subject.description}. Key points: ${subject.lessons.map((l:any) => l.name).join(", ")}`;
      
      await videoService.generateVideo(prompt, subject.id.toString(), subject.title);
      
      setGenStatus("Uploading to YouTube Channel...");
      speakText(`Success. Video generated and queued for upload to your channel.`);
      
      await loadDynamicResources(subject.id);
      setGenStatus("Complete!");
      setTimeout(() => {
        setIsGenerating(null);
        setGenStatus("");
      }, 3000);
    } catch (e) {
      setGenStatus("Neural overload. Error!");
      setTimeout(() => setIsGenerating(null), 3000);
    }
  };

  useEffect(() => {
    if (openSubjectId) {
      loadDynamicResources(openSubjectId);
    }
  }, [openSubjectId]);

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    msg.rate = 0.95;
    msg.pitch = 1;
    msg.volume = 1;
    setAssistantMessage(text);
    window.speechSynthesis.speak(msg);
  };

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
    setAssistantMessage("Speech stopped");
  };

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) return;
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    speakText("Neural voice link established.");
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    speakText("Neural link disconnected.");
  };

  const openSubject = (index: number) => {
    const subject = currentSubjects[index];
    if (!subject) return;
    setActiveSubjectIndex(index);
    setOpenSubjectId(subject.id);
    speakText(`${subject.title} access granted. ${subject.description}`);
  };

  const nextSubject = () => {
    const nextIndex = (activeSubjectIndex + 1) % currentSubjects.length;
    openSubject(nextIndex);
  };

  const previousSubject = () => {
    const prevIndex = activeSubjectIndex === 0 ? currentSubjects.length - 1 : activeSubjectIndex - 1;
    openSubject(prevIndex);
  };

  const readActiveSubject = () => {
    const subject = currentSubjects[activeSubjectIndex];
    if (!subject) return;
    const lessonText = subject.lessons
      .map((lesson: any) => lesson.name)
      .join(", ");
    speakText(`Module: ${subject.title}. Info: ${subject.description}. Available targets: ${lessonText}`);
  };

  useEffect(() => {
    const text = transcript.toLowerCase();
    if (!text) return;

    if (text.includes("open science")) openSubject(0);
    else if (text.includes("open math")) openSubject(2);
    else if (text.includes("next")) nextSubject();
    else if (text.includes("previous")) previousSubject();
    else if (text.includes("read") || text.includes("speak")) readActiveSubject();
    else if (text.includes("stop speech")) stopSpeech();
    else if (text.includes("go home")) navigate("/");
  }, [transcript]);

  return (
    <div className="min-h-screen bg-midnight-black text-white selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-royal rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-4">
              ACADEMIC <span className="text-gold">STREAMS</span>
            </h1>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-4 text-white/50 text-xs font-black uppercase tracking-[5px]">
                <div className="w-12 h-[1px] bg-gold/50" />
                Neural Learning Interface
              </div>
              <a 
                href={YOUTUBE_CHANNEL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors text-[10px] font-black uppercase tracking-widest mt-2"
              >
                <Youtube size={14} />
                Official YouTube Channel
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-12">
            <div>
              {/* Voice Controls */}
              <div className="glass-strong rounded-[40px] p-8 mb-12 border border-white/5 shadow-2xl">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startListening}
                    className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-3 ${
                      listening ? "bg-red-500 text-white animate-pulse" : "bg-royal text-white"
                    }`}
                  >
                    {listening ? <MicOff size={16} /> : <Mic size={16} />}
                    {listening ? "LISTENING..." : "ACTIVATE MIC"}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => speakText("Neural Assistant Ready. Commands available.")}
                    className="px-8 py-4 glass border border-gold/30 text-gold rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  >
                    <Volume2 size={16} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopSpeech}
                    className="px-8 py-4 glass-strong border border-white/10 text-white/50 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  >
                    <VolumeX size={16} />
                  </motion.button>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30">System Log</p>
                  <p className="text-gold font-bold italic text-sm min-h-[24px]">
                    "{transcript || "No signal detected..."}"
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center gap-6 mb-12">
                {[
                  { label: "Prev", action: previousSubject },
                  { label: "Read", action: readActiveSubject },
                  { label: "Open", action: () => openSubject(activeSubjectIndex) },
                  { label: "Next", action: nextSubject },
                ].map((btn) => (
                  <motion.button
                    key={btn.label}
                    whileHover={{ y: -2 }}
                    onClick={btn.action}
                    className="px-6 py-3 rounded-full glass border border-white/5 text-[10px] font-black uppercase tracking-widest hover:border-gold/50 transition-all"
                  >
                    {btn.label}
                  </motion.button>
                ))}
              </div>

              {/* Filters */}
              <div className="flex justify-center gap-3 mb-16 flex-wrap">
                {filters.map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setActiveFilter(filter);
                      setOpenSubjectId(null);
                      speakText(`${filter} sector selected.`);
                    }}
                    className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${
                      activeFilter === filter
                        ? "bg-gold text-black border-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                        : "glass border-white/5 text-white/40 hover:text-white"
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>

              {/* Subjects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentSubjects.map((subject, index) => {
                  const isOpen = openSubjectId === subject.id;
                  const Icon = subject.icon;

                  return (
                    <motion.div
                      layout
                      key={subject.id}
                      className="glass-strong rounded-[40px] border border-white/5 overflow-hidden group hover:border-gold/20 transition-all duration-500"
                    >
                      <div className="h-48 bg-gradient-to-br from-royal/20 to-transparent flex items-center justify-center relative overflow-hidden">
                        <Icon size={80} className="text-white/10 group-hover:text-gold/20 transition-all duration-700" />
                        <div className="absolute bottom-4 right-6 bg-gold text-black p-3 rounded-2xl shadow-xl shadow-gold/20">
                          <Icon size={24} />
                        </div>
                      </div>

                      <div className="p-10">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-2">
                              {subject.title}
                            </h3>
                            <p className="text-white/40 text-sm font-medium italic">
                              {subject.description}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => speakText(`${subject.title}. ${subject.description}`)}
                            className="w-12 h-12 rounded-2xl glass border border-white/5 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
                          >
                            <Volume2 size={20} />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            setActiveSubjectIndex(index);
                            setOpenSubjectId(isOpen ? null : subject.id);
                            speakText(isOpen ? "Minimizing module." : `Initializing ${subject.title} lab.`);
                          }}
                          className={`w-full py-5 rounded-2xl font-black uppercase tracking-[5px] text-[10px] transition-all border ${
                            isOpen 
                              ? "bg-white/5 border-white/20 text-white" 
                              : "bg-gold text-black border-gold shadow-lg shadow-gold/10"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-3">
                            {isOpen ? "Close Lab" : "Enter Module"}
                            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-10 space-y-10"
                            >
                              {/* Learning Resources */}
                              {subject.resources && (
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[3px] text-gold">Neural Resources</h4>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      onClick={() => handleGenerateVideo(subject)}
                                      disabled={isGenerating !== null}
                                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                        isGenerating === subject.id 
                                          ? "bg-gold text-black border-gold" 
                                          : "glass border-gold/30 text-gold hover:bg-gold hover:text-black"
                                      }`}
                                    >
                                      {isGenerating === subject.id ? (
                                        <>
                                          <Loader2 size={12} className="animate-spin" />
                                          {genStatus}
                                        </>
                                      ) : (
                                        <>
                                          <Wand2 size={12} />
                                          A.I. Video Gen
                                        </>
                                      )}
                                    </motion.button>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 gap-3">
                                    {/* Static Resources */}
                                    {subject.resources?.map((res: any, rIdx: number) => (
                                      <a
                                        key={`static-${rIdx}`}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 rounded-2xl glass border border-white/5 hover:border-gold/50 hover:bg-white/5 transition-all group/res"
                                      >
                                        <div className="flex items-center gap-3">
                                          {res.type === 'video' ? (
                                            <Youtube className="w-5 h-5 text-red-500" />
                                          ) : (
                                            <BookIcon className="w-5 h-5 text-blue-400" />
                                          )}
                                          <span className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover/res:text-white transition-colors">
                                            {res.label}
                                          </span>
                                        </div>
                                        <ExternalLink size={14} className="text-white/20 group-hover/res:text-gold transition-colors" />
                                      </a>
                                    ))}

                                    {/* Dynamic Resources */}
                                    {dynamicResources[subject.id]?.map((res: any, drIdx: number) => (
                                      <motion.a
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={`dyn-${drIdx}`}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 rounded-2xl bg-gold/5 border border-gold/20 hover:border-gold/50 hover:bg-gold/10 transition-all group/res"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="relative">
                                            <Youtube className="w-5 h-5 text-red-500" />
                                            <Sparkles size={10} className="absolute -top-1 -right-1 text-gold" />
                                          </div>
                                          <span className="text-[10px] font-black uppercase tracking-widest text-gold group-hover/res:text-gold transition-colors">
                                            {res.title}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-[8px] font-black uppercase text-gold/50">NEW A.I.</span>
                                          <ExternalLink size={14} className="text-gold" />
                                        </div>
                                      </motion.a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Lesson Plan */}
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-4">Lesson Vector</h4>
                                <ul className="space-y-3">
                                  {subject.lessons.map((lesson: any, idx: number) => (
                                    <motion.li
                                      initial={{ x: -20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ delay: idx * 0.1 }}
                                      key={idx}
                                      className={`flex items-center justify-between p-5 rounded-3xl transition-all border ${
                                        lesson.status === "locked"
                                          ? "bg-white/2 border-white/5 opacity-50"
                                          : "glass border-white/10 hover:border-gold/30 hover:bg-white/5 group/lesson"
                                      }`}
                                    >
                                      <span className="font-black uppercase tracking-widest text-[10px]">
                                        {lesson.name}
                                      </span>

                                      <div className="flex items-center gap-4">
                                        <button
                                          onClick={() => speakText(lesson.name)}
                                          disabled={lesson.status === "locked"}
                                          className="text-white/30 hover:text-gold transition-colors"
                                        >
                                          <Volume2 size={16} />
                                        </button>
                                        <div className={`w-2 h-2 rounded-full ${lesson.status === "locked" ? "bg-red-500/50" : "bg-green-500 animate-pulse"}`} />
                                      </div>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center mt-20">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate("/")}
                  className="glass px-12 py-5 rounded-full text-gold font-black uppercase tracking-[5px] text-[10px] border border-gold/30 flex items-center gap-4 mx-auto group"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                  Terminal Exit
                </motion.button>
              </div>
            </div>

            {/* Sidebar Assistant */}
            <aside className="space-y-8">
              <div className="glass-strong rounded-[50px] p-10 border border-white/5 sticky top-32">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-[22px] bg-royal flex items-center justify-center text-3xl shadow-xl shadow-royal/30">
                    <Sparkles className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">ZIARA</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Neural Engine</p>
                  </div>
                </div>

                <div className="h-40 rounded-3xl bg-royal/10 border border-white/5 flex items-center justify-center mb-10 overflow-hidden relative">
                   {listening && (
                     <div className="flex items-end gap-1.5 h-12">
                       {[...Array(8)].map((_, i) => (
                         <motion.div
                           key={i}
                           animate={{ height: [10, 40, 15, 30, 20] }}
                           transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                           className="w-1.5 bg-gold rounded-full"
                         />
                       ))}
                     </div>
                   )}
                   {!listening && <p className="text-[10px] font-black uppercase tracking-[10px] text-white/20">Idle</p>}
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">Current Vector</p>
                    <div className="glass-strong p-6 rounded-3xl border border-gold/10 text-gold italic font-bold">
                      {transcript || "Waiting for user input stream..."}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">Response Protocol</p>
                    <div className="glass p-6 rounded-3xl border border-white/5 text-white/70 leading-relaxed text-sm italic">
                      {assistantMessage}
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6">Suggested Queries</p>
                   <div className="space-y-3">
                     {["Open Science", "Read module", "Next module", "Go home"].map((cmd) => (
                       <button
                         key={cmd}
                         onClick={() => speakText(`Vocalize: ${cmd}`)}
                         className="w-full text-left px-5 py-3 rounded-2xl glass border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-gold hover:border-gold/30 transition-all"
                       >
                         {cmd}
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
