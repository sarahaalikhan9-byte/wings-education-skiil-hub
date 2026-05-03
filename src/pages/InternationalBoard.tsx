import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  GraduationCap, 
  Microscope, 
  BookOpen, 
  Globe, 
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { motion } from 'motion/react';

const InternationalBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-midnight-black pt-32 pb-20 px-4 md:px-8">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              GLOBAL <span className="text-gold">CURRICULUM</span> <span className="text-white">HUB</span>
            </h1>
            <p className="text-white/40 italic mt-4 font-bold uppercase tracking-widest text-sm">
              International Standards for Future Leaders (IB & Cambridge)
            </p>
          </motion.div>
          <button
            onClick={() => navigate('/board-university')}
            className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/5"
          >
             <ArrowLeft size={16} /> Back to Hub
          </button>
        </div>

        {/* International Board Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* IB Board Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            className="glass-strong rounded-[60px] p-10 border border-blue-500/20 bg-blue-500/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all" />
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-600 text-white rounded-3xl flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                <GraduationCap size={40} />
              </div>
              <h3 className="text-4xl font-black italic uppercase tracking-tight text-white mb-2">IB BOARD</h3>
              <p className="text-[10px] font-black uppercase tracking-[5px] text-blue-400 mb-4">(Geneva)</p>
              <p className="text-sm italic text-white/60">Focus: Critical Thinking & Global Research</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['PYP', 'MYP', 'DP'].map(tag => (
                <span key={tag} className="px-5 py-2 glass rounded-full text-[10px] font-black uppercase tracking-widest text-blue-300 border border-blue-500/30">
                  {tag}
                </span>
              ))}
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-12">
              {[
                "Theory of Knowledge (TOK)",
                "Extended Essay",
                "CAS Activities (Creativity, Activity, Service)"
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-4 text-white/80">
                  <CheckCircle2 className="text-blue-500 flex-shrink-0" size={18} />
                  <span className="text-sm font-bold italic">{feat}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-blue-600 text-white py-5 rounded-[25px] font-black uppercase tracking-[5px] text-[10px] shadow-2xl shadow-blue-900/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
              Explore Resources <BookOpen size={16} />
            </button>
          </motion.div>

          {/* Cambridge Board Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="glass-strong rounded-[60px] p-10 border border-red-500/20 bg-red-500/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-red-500/20 transition-all" />
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-600 text-white rounded-3xl flex items-center justify-center shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform">
                <Microscope size={40} />
              </div>
              <h3 className="text-4xl font-black italic uppercase tracking-tight text-white mb-2">CAMBRIDGE</h3>
              <p className="text-[10px] font-black uppercase tracking-[5px] text-red-400 mb-4">(UK)</p>
              <p className="text-sm italic text-white/60">Focus: Academic Depth & Global Flexibility</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['IGCSE', 'A-LEVELS'].map(tag => (
                <span key={tag} className="px-5 py-2 glass rounded-full text-[10px] font-black uppercase tracking-widest text-red-300 border border-red-500/30">
                  {tag}
                </span>
              ))}
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-12">
              {[
                "Subject Specialization",
                "Practical Assessments",
                "Global University Recognition"
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-4 text-white/80">
                  <CheckCircle2 className="text-red-500 flex-shrink-0" size={18} />
                  <span className="text-sm font-bold italic">{feat}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-red-600 text-white py-5 rounded-[25px] font-black uppercase tracking-[5px] text-[10px] shadow-2xl shadow-red-900/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
              Explore Resources <BookOpen size={16} />
            </button>
          </motion.div>
        </div>

        {/* Global recognition banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-20 glass-strong p-8 rounded-[40px] border border-white/5 text-center flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shadow-2xl">
                <Globe size={20} />
             </div>
             <p className="text-sm font-black italic uppercase tracking-tighter text-white/60 text-left">Trusted by Ivy League & <br/> Global Top 100 Universities</p>
          </div>
          <div className="h-px w-20 bg-white/5 hidden md:block" />
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-royal/10 flex items-center justify-center text-royal shadow-2xl">
                <Trophy size={20} />
             </div>
             <p className="text-sm font-black italic uppercase tracking-tighter text-white/60 text-left">AI-Powered Benchmarking <br/> Against Global Peer Standards</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InternationalBoard;
