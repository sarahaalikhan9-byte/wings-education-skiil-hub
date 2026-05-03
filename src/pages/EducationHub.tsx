import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, ArrowRight, ShieldCheck, 
  Trophy, Globe, BookOpen, Layers
} from "lucide-react";
import { motion } from "motion/react";
import TextToSpeech from "../components/TextToSpeech";

const EducationHub = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);

  // Consolidated boards data
  const boards = {
    "CBSE / NCERT": {
      country: "India",
      modes: ["Regular", "Distance", "Private"],
      classes: {
        "Foundational": ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
        "Middle": ["Class 6", "Class 7", "Class 8"],
        "Secondary": ["Class 9", "Class 10"],
        "Senior Secondary": ["Class 11", "Class 12"]
      }
    },
    "NIOS": {
      country: "India (Global)",
      modes: ["Distance", "Private"],
      classes: {
        "Secondary": ["Class 10"],
        "Senior Secondary": ["Class 12"]
      }
    },
    "UK Curriculum": {
      country: "International",
      modes: ["Regular", "Distance"],
      classes: {
        "IGCSE": ["Year 10", "Year 11"],
        "A-Levels": ["Year 12", "Year 13"]
      }
    }
  };

  const handleBoardClick = (boardName: string) => {
    navigate('/education-board-selector', { 
      state: { 
        boardName, 
        boardData: boards[boardName as keyof typeof boards] 
      } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-black flex items-center justify-center">
        <div className="text-gold text-2xl font-black italic animate-pulse tracking-tighter uppercase">
          Neural Uplink...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 glass-strong rounded-2xl px-6 py-3 mb-6 border border-gold/30"
          >
            <ShieldCheck size={16} className="text-gold" />
            <span className="text-gold font-black text-[10px] uppercase tracking-[5px]">Global Registry Active</span>
          </motion.div>
          
          <div className="flex justify-center mb-6">
             <TextToSpeech text="Choose Your Neural Educational Path" />
          </div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-8"
          >
            SELECT YOUR <span className="text-gold">PATH</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Initialize your learning vector. From foundational years to doctorate pathways, unlock the global neural curriculum.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {Object.keys(boards).map((boardName, index) => (
            <motion.div
              key={boardName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleBoardClick(boardName)}
              className="glass-strong rounded-[50px] p-10 border border-white/5 hover:border-gold/20 transition-all cursor-pointer group flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 mb-6 rounded-[32px] bg-gradient-royal flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <GraduationCap size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-black italic text-white mb-2 uppercase tracking-tighter group-hover:text-gold transition-colors">{boardName}</h3>
              <span className="text-[10px] font-black uppercase tracking-[5px] text-white/20 mb-8">{boards[boardName as keyof typeof boards].country}</span>
              
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {boards[boardName as keyof typeof boards].modes.map(mode => (
                  <span key={mode} className="glass px-4 py-2 rounded-xl text-white/40 text-[9px] font-black uppercase tracking-widest">{mode}</span>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 w-full flex items-center justify-between">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Authorized Vector</p>
                 <ArrowRight className="text-gold" size={20} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { label: "CORE BOARDS", val: "5", color: "text-royal" },
            { label: "LEARNING MODES", val: "3", color: "text-gold" },
            { label: "ACTIVE EXAMS", val: "13+", color: "text-royal" },
            { label: "AI RESOURCES", val: "∞", color: "text-gold" }
          ].map((s, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/5 text-center">
              <div className={`text-4xl font-black italic mb-2 ${s.color}`}>{s.val}</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{s.label}</p>
            </div>
          ))}
        </div>

        <motion.div 
          onClick={() => navigate('/competitive-exam-hub')}
          className="glass-strong rounded-[60px] p-12 border border-gold/10 hover:border-gold/30 transition-all cursor-pointer group"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-royal to-gold rounded-[30px] flex items-center justify-center shadow-2xl">
                <Trophy size={32} className="text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-black italic text-white mb-1 uppercase tracking-tighter">Competitive Mastery</h3>
                <p className="text-white/40 italic">Prepare for global benchmarks including JEE, NEET, and International Exams.</p>
              </div>
            </div>
            <button className="px-12 py-5 rounded-[25px] bg-white text-black font-black uppercase tracking-[10px] text-[10px]">Initialize</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationHub;
