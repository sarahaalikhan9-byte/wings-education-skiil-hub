import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Code, Cpu, Terminal, Trophy,
  Play, FileText, Brain, ArrowLeft,
  CheckCircle2, Star, Zap, Clock, 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MasterSkillHub = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("videos");

  const getLocalizedSkills = () => {
    switch(currentLanguage) {
      case 'hi':
        return {
          cards: [
            { id: 'computer-mastery', title: 'कंप्यूटर मास्टरी', icon: Terminal, description: 'ऑपरेटिंग सिस्टम, उत्पादकता उपकरण और डिजिटल वर्कफ़्लो में महारत हासिल करें', color: 'text-blue-400', topics: ['विंडोज/मैक/लिनक्स', 'एमएस ऑफिस', 'फाइल प्रबंधन'] },
            { id: 'coding-lab', title: 'कोडिंग लैब', icon: Code, description: 'बुनियादी बातों से लेकर उन्नत एल्गोरिदम तक प्रोग्रामिंग सीखें', color: 'text-purple-400', topics: ['पायथन', 'जावास्क्रिप्ट', 'डेटा संरचनाएं'] },
            { id: 'ai-specialist', title: 'एआई-टूल विशेषज्ञ', icon: Cpu, description: 'एआई टूल्स और मशीन लर्निंग की शक्ति का उपयोग करें', color: 'text-gold', topics: ['चैटजीपीटी', 'मिडजर्नी', 'प्रॉम्पट इंजीनियरिंग'] }
          ],
          quiz: [
            { question: "एआई प्रॉम्प्ट इंजीनियरिंग के लिए इनमें से कौन सा सबसे महत्वपूर्ण है?", options: ["बड़ा फ़ॉन्ट आकार", "स्पष्ट संदर्भ और बाधाएं", "इमोजी का उपयोग", "असेंबली में कोडिंग"], correct: 1 },
            { question: "आधुनिक वेब देव में, 'फ्रेमवर्क' की प्राथमिक भूमिका क्या है?", options: ["साइट को धीमा करना", "संरचित वास्तुकला प्रदान करना", "सीएसएस की जगह लेना", "केवल मोबाइल ऐप के लिए"], correct: 1 }
          ]
        };
      case 'ar':
        return {
          cards: [
            { id: 'computer-mastery', title: 'إتقان الكمبيوتر', icon: Terminal, description: 'إتقان أنظمة التشغيل وأدوات الإنتاجية وعيرها من التدفقات الرقمية', color: 'text-blue-400', topics: ['ويندوز/ماك/لينوكس', 'أوفيس', 'إدارة الملفات'] },
            { id: 'coding-lab', title: 'مختبر البرمجة', icon: Code, description: 'تعلم البرمجة من الأساسيات إلى الخوارزميات المتقدمة', color: 'text-purple-400', topics: ['بايثون', 'جاوا سكريبت', 'هياكل البيانات'] },
            { id: 'ai-specialist', title: 'أخصائي أدوات الذكاء الاصطناعي', icon: Cpu, description: 'تسخير قوة أدوات الذكاء الاصطناعي وتعلم الآلة', color: 'text-gold', topics: ['تتشات جي بي تي', 'ميدجورني', 'هندسة الأوامر'] }
          ],
          quiz: [
            { question: "أي من هذه العناصر هو الأكثر أهمية لهندسة أوامر الذكاء الاصطناعي؟", options: ["حجم الخط الكبير", "السياق الواضح والقيود", "استخدام الرموز التعبيرية", "البرمجة بلغة التجميع"], correct: 1 },
            { question: "في تطوير الويب الحديث، ما هو الدور الأساسي لـ 'الإطار'؟", options: ["إبطاء الموقع", "توفير بنية منظمة", "استبدال CSS", "فقط لتطبيقات الهاتف"], correct: 1 }
          ]
        };
      default:
        return {
          cards: [
            { id: 'computer-mastery', title: 'Computer Mastery', icon: Terminal, description: 'Master operating systems, productivity tools, and digital workflows', color: 'text-blue-400', topics: ['Windows/Mac/Linux', 'MS Office Suite', 'File Management'] },
            { id: 'coding-lab', title: 'Coding Lab', icon: Code, description: 'Learn programming from basics to advanced algorithms', color: 'text-purple-400', topics: ['Python', 'JavaScript', 'Data Structures'] },
            { id: 'ai-specialist', title: 'AI-Tool Specialist', icon: Cpu, description: 'Harness the power of AI tools and machine learning', color: 'text-gold', topics: ['ChatGPT', 'Midjourney', 'Prompt Engineering'] }
          ],
          quiz: [
            { question: "Which of these is the most critical for AI Prompt Engineering?", options: ["Large Font Size", "Clear Context & Constraints", "Using many emojis", "Coding in Assembly"], correct: 1 },
            { question: "In Modern Web Dev, what is the primary role of a 'Framework'?", options: ["Slowing down the site", "Providing structured architecture", "Replacing CSS", "Only for mobile apps"], correct: 1 }
          ]
        };
    }
  };

  const localizedContent = getLocalizedSkills();
  const skillCards = localizedContent.cards;
  const quizQuestions = localizedContent.quiz;

  const handleStartQuiz = () => {
    setQuizActive(true);
    setCurrentQuestion(0);
    setQuizResult(null);
  };

  const handleAnswer = (idx: number) => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizResult({
        score: 100,
        badge: true
      });
      setQuizActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-royal rounded-full blur-[200px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              SKILL <span className="text-gold">LABS</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[10px] text-white/30 mt-4">
              AI-Synchronized Career Acceleration
            </p>
          </motion.div>
          
          <div className="flex gap-4">
            <button className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all text-gold font-bold">
              <Trophy size={16} /> My Badges
            </button>
          </div>
        </div>

        {!selectedSkill ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {skillCards.map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedSkill(skill)}
                  className="glass-strong p-10 rounded-[50px] border border-white/5 hover:border-gold/30 cursor-pointer group transition-all"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 ${skill.color} group-hover:bg-white/10 transition-colors shadow-2xl`}>
                    <skill.icon size={32} />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">{skill.title}</h3>
                  <p className="text-sm font-medium text-white/40 italic leading-relaxed mb-8">{skill.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {skill.topics.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] font-black uppercase text-white/60">{t}</span>
                    ))}
                  </div>

                  <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest group-hover:bg-gold group-hover:text-black transition-all">
                    Initiate Lab
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="glass-strong rounded-[60px] p-12 border border-orange-500/10 bg-gradient-to-br from-orange-500/5 to-transparent relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
               <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                  <div className="w-32 h-32 rounded-full bg-white/5 border-4 border-orange-500/20 flex items-center justify-center text-5xl">🇮🇳</div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">SKILL INDIA <span className="text-orange-500">PORTAL</span></h2>
                    <p className="text-sm font-medium text-white/40 italic max-w-2xl leading-relaxed mb-8 font-bold">
                      Synchronized with the National Skill Development Mission. Access thousands of government-certified courses and industry-aligned training programs.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <a href="https://www.skillindiadigital.gov.in" target="_blank" rel="noreferrer" className="px-8 py-4 bg-orange-500/20 border border-orange-500/30 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all font-bold">Visit Portal</a>
                      <a href="https://www.pmkvyofficial.org" target="_blank" rel="noreferrer" className="px-8 py-4 glass border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all font-bold">PMKVY Programs</a>
                    </div>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-6 mb-12">
               <button onClick={() => { setSelectedSkill(null); setQuizActive(false); setQuizResult(null); }} className="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all">
                 <ArrowLeft />
               </button>
               <div>
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter">{selectedSkill.title}</h2>
                  <p className="text-[10px] font-black uppercase tracking-[5px] text-white/30 italic">Module Lab 01</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
               <div className="glass-strong rounded-[60px] p-10 border border-white/5">
                  {!quizActive && !quizResult ? (
                    <>
                      <div className="flex gap-4 mb-10 overflow-x-auto pb-4">
                        {["videos", "docs", "lab"].map(tab => (
                          <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-gold text-black shadow-xl scale-105' : 'glass border border-white/5 text-white/40'}`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-6">
                        {activeTab === 'videos' && (
                          <div className="aspect-video bg-black/50 rounded-[40px] border-2 border-white/5 flex items-center justify-center group overflow-hidden relative">
                             <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50" />
                             <Play className="text-white group-hover:text-gold transition-colors" size={64} />
                             <div className="absolute bottom-10 left-10">
                                <h4 className="text-2xl font-black italic uppercase">Masterclass Introduction</h4>
                                <span className="text-[10px] font-black uppercase tracking-[3px] text-white/40">Nexus Neural Series • 15:00</span>
                             </div>
                          </div>
                        )}
                        {activeTab === 'docs' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="glass p-8 rounded-3xl border border-white/5 flex items-center gap-6 hover:border-gold/30 transition-all group">
                                <FileText size={32} className="text-white/20 group-hover:text-gold" />
                                <div>
                                  <h5 className="font-black italic uppercase tracking-tight">Phase 0{i} Guide</h5>
                                  <span className="text-[8px] font-black uppercase text-white/30">PDF Document</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : quizActive ? (
                    <div className="text-center py-12">
                       <Brain size={64} className="text-gold mx-auto mb-8 animate-pulse" />
                       <h3 className="text-3xl font-black italic uppercase tracking-tight mb-12">Question {currentQuestion + 1}</h3>
                       <p className="text-xl font-bold italic text-white/80 mb-12 leading-relaxed">
                         {quizQuestions[currentQuestion].question}
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {quizQuestions[currentQuestion].options.map((opt, i) => (
                           <button 
                             key={i}
                             onClick={() => handleAnswer(i)}
                             className="glass p-8 rounded-3xl border border-white/5 hover:border-gold hover:bg-gold/5 transition-all text-sm font-black uppercase italic"
                           >
                             {opt}
                           </button>
                         ))}
                       </div>
                    </div>
                  ) : (
                    <div className="text-center py-20">
                       <Trophy size={80} className="text-gold mx-auto mb-8" />
                       <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">NEURAL SYNC COMPLETE</h2>
                       <p className="text-xl font-black text-white/40 italic mb-12 uppercase tracking-widest">Score: {quizResult.score}% • New Badge Unlocked</p>
                       <div className="w-32 h-32 bg-gold/10 border-2 border-gold/30 rounded-3xl flex items-center justify-center text-gold mx-auto mb-12 shadow-2xl">
                          <CheckCircle2 size={64} />
                       </div>
                       <button onClick={() => setQuizResult(null)} className="px-12 py-5 bg-gold text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">Review Modules</button>
                    </div>
                  )}
               </div>

               <div className="space-y-8">
                  <div className="glass-strong p-10 rounded-[50px] border border-white/10 bg-gradient-to-br from-royal/5 to-transparent">
                     <h3 className="text-xl font-black italic uppercase tracking-tight mb-8">Lab Protocol</h3>
                     <div className="space-y-6">
                        {[
                          { label: "Completion", val: "75%", icon: Zap },
                          { label: "Est. Time", val: "45m", icon: Clock },
                          { label: "Badge Priority", val: "High", icon: Star },
                        ].map((s, i) => (
                          <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                            <div className="flex items-center gap-3">
                              <s.icon size={16} className="text-white/40" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{s.label}</span>
                            </div>
                            <span className="text-sm font-black italic uppercase">{s.val}</span>
                          </div>
                        ))}
                     </div>
                  </div>

                  {!quizActive && !quizResult && (
                    <div className="glass-strong p-10 rounded-[50px] border border-gold/20 bg-gold/5 text-center">
                       <Brain className="text-gold mx-auto mb-6" size={48} />
                       <h4 className="text-xl font-black italic uppercase mb-4 tracking-tight">AI Skills Test</h4>
                       <p className="text-[10px] text-white/40 italic leading-relaxed mb-8 font-bold">Validate your knowledge and earn the <span className="text-gold font-bold">WINGS Verified</span> golden badge.</p>
                       <button 
                        onClick={handleStartQuiz}
                        className="w-full py-5 rounded-2xl bg-gold text-black font-black uppercase tracking-[5px] text-[10px] shadow-2xl font-bold"
                       >
                         Start Evaluation
                       </button>
                    </div>
                  )}
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MasterSkillHub;
