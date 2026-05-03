import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sword, Shield, Target, Trophy, Timer, Brain, Rocket, 
  Crosshair, ChevronRight, BookOpen, GraduationCap, 
  Sparkles, Loader2, PlayCircle, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { competitiveService } from "../services/competitiveService";

const CompetitiveExamHub = () => {
  const navigate = useNavigate();
  const [examTopics, setExamTopics] = useState<any>({});
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionType, setQuestionType] = useState("objective");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await competitiveService.getExamTopics();
      setExamTopics(data);
    };
    fetchTopics();
  }, []);

  const handleStartExam = async () => {
    if (!selectedExam || !selectedTopic) return;
    setLoading(true);
    try {
      const questions = await competitiveService.generateQuestions({
        examType: selectedExam,
        topic: selectedTopic,
        subtopic: selectedSubtopic,
        difficulty,
        questionType,
        numQuestions: 10
      });

      navigate('/competitive-exam-test', {
        state: {
          questions,
          examType: selectedExam,
          topic: selectedTopic,
          subtopic: selectedSubtopic,
          difficulty
        }
      });
    } catch (error) {
      console.error(error);
      alert("Neural link unstable. Could not generate questions.");
    } finally {
      setLoading(false);
    }
  };

  const exams = [
    { id: "JEE Mains/Adv", title: "IIT-JEE", category: "Engineering", icon: Rocket, color: "text-blue-400" },
    { id: "NEET", title: "NEET", category: "Medical", icon: Crosshair, color: "text-red-400" },
    { id: "UPSC", title: "UPSC/SSC", category: "Govt Admin", icon: Sword, color: "text-gold" },
    { id: "SAT/GRE", title: "SAT/GRE", category: "Global", icon: GraduationCap, color: "text-purple-400" },
    { id: "PhD/Gate", title: "PhD/GATE", category: "Research", icon: Brain, color: "text-green-400" },
  ];

  return (
    <div className="min-h-screen pt-32 px-4 md:px-8 bg-midnight-black pb-20 selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-gold/30 mb-8"
          >
            <Trophy size={14} className="text-gold" />
            <span className="text-[10px] font-black uppercase tracking-[3px] text-gold">Premium Competitive Arena</span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-none">
            MASTER YOUR <br /> <span className="text-gold">FUTURE</span>
          </h1>
          <p className="text-white/40 font-medium italic text-lg max-w-2xl mx-auto">
            High-velocity A.I. training for global standard exams. Real-time question synthesis and neural feedback.
          </p>
        </div>

        {/* Exam Selection Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {exams.map((exam) => (
            <motion.button
              key={exam.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedExam(exam.id);
                setSelectedTopic("");
                setSelectedSubtopic("");
              }}
              className={`p-6 rounded-[30px] border transition-all text-left relative overflow-hidden group ${
                selectedExam === exam.id 
                  ? "bg-royal border-royal shadow-[0_0_40px_rgba(41,98,255,0.3)]" 
                  : "glass-strong border-white/5 hover:border-white/20"
              }`}
            >
              <exam.icon className={`mb-6 transition-colors ${selectedExam === exam.id ? "text-white" : "text-white/20 group-hover:text-gold"}`} size={32} />
              <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${selectedExam === exam.id ? "text-white/60" : "text-white/30"}`}>{exam.category}</p>
              <h3 className="text-xl font-black italic uppercase tracking-tighter">{exam.title}</h3>
              {selectedExam === exam.id && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white animate-ping" />}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedExam && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8"
            >
              {/* Configuration Panel */}
              <div className="glass-strong p-10 rounded-[50px] border border-white/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                    <Crosshair size={24} />
                  </div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">Strategic Deck</h2>
                </div>

                <div className="space-y-10">
                  {/* Topics Grid */}
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[3px] text-gold/60 block mb-6">Vector Topic Selection</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.keys(examTopics[selectedExam] || {}).map((topic) => (
                        <button
                          key={topic}
                          onClick={() => {
                            setSelectedTopic(topic);
                            setSelectedSubtopic("");
                          }}
                          className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${
                            selectedTopic === topic
                              ? "bg-gold text-black border-gold shadow-lg shadow-gold/20"
                              : "glass border-white/5 text-white/50 hover:border-gold/30 hover:text-white"
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subtopics Grid */}
                  {selectedTopic && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <label className="text-[10px] font-black uppercase tracking-[3px] text-white/30 block mb-6">Sub-Vector Precision (Optional)</label>
                      <div className="flex flex-wrap gap-2">
                        {(examTopics[selectedExam][selectedTopic] || []).map((sub: string) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubtopic(sub === selectedSubtopic ? "" : sub)}
                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                              selectedSubtopic === sub
                                ? "bg-white text-black border-white"
                                : "glass border-white/10 text-white/40 hover:text-white"
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[3px] text-white/30 block mb-6">Difficulty Variance</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["easy", "medium", "hard", "legendary"].map((level) => (
                          <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                              difficulty === level
                                ? "bg-royal border-royal text-white shadow-lg"
                                : "glass border-white/5 text-white/40 hover:border-white/20"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[3px] text-white/30 block mb-6">Module Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "Standard MCQ", val: "objective" },
                          { label: "Neural Scenario", val: "scenario_based" }
                        ].map((type) => (
                          <button
                            key={type.val}
                            onClick={() => setQuestionType(type.val)}
                            className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border text-center ${
                              questionType === type.val
                                ? "bg-royal border-royal text-white shadow-lg"
                                : "glass border-white/5 text-white/40 hover:border-white/20"
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleStartExam}
                    disabled={loading || !selectedTopic}
                    className="w-full py-6 rounded-[30px] bg-gold text-black font-black uppercase tracking-[10px] text-xs shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Synthesizing Questions...
                        </>
                      ) : (
                        <>
                          <PlayCircle size={18} />
                          Engage Neural Battle
                          <ChevronRight size={18} />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  </motion.button>
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                <div className="glass-strong p-8 rounded-[40px] border border-white/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-royal/10 flex items-center justify-center text-royal">
                      <Target size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Targeting</p>
                      <h4 className="text-xl font-black italic uppercase tracking-tighter">Performance Hub</h4>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: Brain, label: "AI Prediction", val: "94th percentile", color: "text-purple-400" },
                      { icon: Timer, label: "Avg. Reflex", val: "42s / question", color: "text-gold" },
                      { icon: Star, label: "Current Rank", val: "#142 Global", color: "text-green-400" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-3xl glass border border-white/5">
                        <div className="flex items-center gap-3">
                          <item.icon size={16} className={item.color} />
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{item.label}</span>
                        </div>
                        <span className="text-sm font-black italic">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-strong p-8 rounded-[40px] border border-gold/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles size={100} className="text-gold" />
                  </div>
                  <h5 className="text-gold font-black uppercase tracking-[3px] text-[10px] mb-4">Pro Tip</h5>
                  <p className="text-white/70 text-sm italic leading-relaxed">
                    "Scenario-based testing improves recall by 40% compared to pure factual recall. Try it for UPSC!"
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompetitiveExamHub;
