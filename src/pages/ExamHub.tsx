import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, Trophy, Zap, Clock, Users, 
  ArrowLeft, Filter, Play, ShieldAlert,
  Target, BarChart3, Star
} from "lucide-react";
import { motion } from "motion/react";

const ExamHub = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeLeft, setTimeLeft] = useState<Record<number, string>>({});

  const examCategories = [
    { id: 'jee', name: 'JEE Advanced', icon: 'Atom', color: 'bg-blue-500', tests: 45 },
    { id: 'neet', name: 'NEET Medical', icon: 'Heart', color: 'bg-green-500', tests: 38 },
    { id: 'upsc', name: 'UPSC Civil Services', icon: 'Landmark', color: 'bg-purple-500', tests: 52 },
    { id: 'sat', name: 'SAT / GRE Hub', icon: 'Globe', color: 'bg-orange-500', tests: 24 },
    { id: 'phd', name: 'Neural Ph.D.', icon: 'Brain', color: 'bg-royal', tests: 12 },
  ];

  const liveExams = [
    { id: 1, title: 'JEE Main Mock - Physics', category: 'JEE', date: new Date(Date.now() + 2 * 60 * 60 * 1000), duration: '3h', participants: 1247 },
    { id: 2, title: 'Neural Bio-Science v2', category: 'PhD', date: new Date(Date.now() + 5 * 60 * 60 * 1000), duration: '2h', participants: 892 },
    { id: 3, title: 'UPSC General Studies', category: 'UPSC', date: new Date(Date.now() + 8 * 60 * 60 * 1000), duration: '4h', participants: 2134 }
  ];

  const practiceTests = [
    { id: 1, title: 'Calculus Mastery', difficulty: 'Hard', questions: 50, time: '90m', category: 'JEE' },
    { id: 2, title: 'Quantum Mechanics', difficulty: 'Extreme', questions: 40, time: '60m', category: 'PhD' },
    { id: 3, title: 'Thermodynamics', difficulty: 'Medium', questions: 45, time: '75m', category: 'JEE' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: Record<number, string> = {};
      liveExams.forEach(exam => {
        const diff = exam.date.getTime() - Date.now();
        if (diff > 0) {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          newTimeLeft[exam.id] = `${h}h ${m}m ${s}s`;
        } else {
          newTimeLeft[exam.id] = 'Live Now';
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20 px-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-8"
          >
            EXAM <span className="text-gold">HUB</span>
          </motion.h1>
          
          <div className="w-full max-w-2xl relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Search Global Benchmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-strong border border-white/5 rounded-[30px] py-6 px-16 text-lg italic font-bold focus:outline-none focus:border-gold/50 transition-all shadow-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-12">
          <div className="space-y-16">
            {/* Live Feed */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Zap className="text-yellow-400 animate-pulse" />
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter underline underline-offset-8 decoration-white/5">Neural Live Exams</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveExams.map((exam, i) => (
                  <motion.div 
                    key={exam.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-strong rounded-[40px] border border-white/5 overflow-hidden group hover:border-gold/20 transition-all p-1"
                  >
                    <div className="bg-gradient-royal p-8 text-white">
                      <div className="flex justify-between items-center mb-6">
                         <span className="px-3 py-1 glass rounded-full text-[8px] font-black uppercase tracking-widest">{exam.category}</span>
                         <span className="text-[10px] flex items-center gap-2 font-black opacity-60"><Users size={12} /> {exam.participants}</span>
                      </div>
                      <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4">{exam.title}</h3>
                      <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest opacity-60">
                        <span className="flex items-center gap-1"><Clock size={12} /> {exam.duration} SESSION</span>
                      </div>
                    </div>
                    <div className="p-8 text-center">
                       <p className="text-[10px] font-black uppercase tracking-[5px] text-white/20 mb-2">Synchronizing In</p>
                       <p className="text-3xl font-black italic text-gold mb-8">{timeLeft[exam.id] || "Calculating..."}</p>
                       <button onClick={() => navigate('/secure-exam')} className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[5px] text-[10px] hover:bg-gold transition-all">Secure Login</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-4">
                <Filter className="text-royal" /> Global Benchmarks
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {examCategories.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`glass-strong p-8 rounded-[40px] border transition-all text-center group ${selectedCategory === cat.id ? 'border-gold bg-gold/5' : 'border-white/5 hover:border-gold/20'}`}
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:text-gold transition-colors">
                      <Trophy size={20} />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest leading-tight">{cat.name}</h4>
                  </motion.button>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="glass-strong p-10 rounded-[50px] border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <BarChart3 className="text-gold" />
                <h3 className="text-xl font-black italic uppercase tracking-tighter">My Ranking</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Global Level", val: "Elite I", sub: "Top 0.5%" },
                  { label: "Solved Vectors", val: "156", sub: "Neural Mastery" },
                  { label: "Accuracy Rate", val: "94.2%", sub: "Precision Link" },
                ].map((stat, i) => (
                  <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{stat.label}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-black italic text-white">{stat.val}</p>
                      <span className="text-[8px] font-black text-gold/60 uppercase">{stat.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 py-5 rounded-2xl bg-royal text-white font-black uppercase tracking-[5px] text-[10px] shadow-2xl shadow-royal/20">Full Intelligence Report</button>
            </div>

            <div className="glass-strong p-10 rounded-[50px] border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent">
               <ShieldAlert className="text-gold mb-6" />
               <h4 className="text-sm font-black uppercase tracking-widest mb-4 italic">Neural Integrity</h4>
               <p className="text-[10px] text-white/40 italic leading-relaxed mb-6">All sessions are monitored by our proprietary Neural-Lock system. Any attempt to decouple from the testing environment results in immediate disqualification.</p>
               <div className="px-4 py-2 bg-gold/10 rounded-full border border-gold/20 inline-block">
                 <span className="text-[8px] font-black text-gold uppercase tracking-[3px]">Protocol Active</span>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ExamHub;
