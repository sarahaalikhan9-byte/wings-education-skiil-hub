import React from "react";
import { Layers, Rocket, Shield, Globe, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const LevelsSection = () => {
  const levels = [
    { title: "Foundation Node", desc: "Core basics & logic architecture", icon: Shield, color: "text-blue-500" },
    { title: "Intermediate Vector", desc: "Proficiency in dynamic applications", icon: Rocket, color: "text-purple-500" },
    { title: "Advanced Stratum", desc: "Specialization & architectural mastery", icon: Cpu, color: "text-gold" },
    { title: "MASTER NEXUS", desc: "Absolute expert synchronization", icon: Globe, color: "text-red-600" },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-midnight-black">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-8 lg:px-20 relative z-10">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[10px] text-white/20 mb-4"
          >
            Evolution Architecture
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white"
          >
            THE <span className="text-red-600">NEXT</span> LEVEL <br />
            <span className="text-gold">ROADMAP</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {levels.map((lvl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong p-10 rounded-[50px] border border-white/5 relative group hover:border-gold/30 transition-all cursor-default overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-red-600/10 transition-colors" />
              
              <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 ${lvl.color}`}>
                <lvl.icon size={28} />
              </div>

              <div className="space-y-2">
                <span className="text-[8px] font-black uppercase tracking-[5px] text-white/20">Phase 0{i + 1}</span>
                <h3 className="text-xl font-black italic uppercase italic text-white group-hover:text-gold transition-colors">{lvl.title}</h3>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                  {lvl.desc}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(dot => (
                    <div key={dot} className={`w-1 h-1 rounded-full ${dot <= i + 1 ? 'bg-gold' : 'bg-white/10'}`} />
                  ))}
                </div>
                <span className="text-[8px] font-black uppercase italic text-white/20">Sync'd</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 glass-strong p-16 rounded-[60px] border border-red-600/20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          <h3 className="text-3xl font-black italic uppercase tracking-tight text-white mb-6 italic">Are you ready for the final synchronization?</h3>
          <p className="text-sm font-medium text-white/40 italic max-w-2xl mx-auto mb-10 leading-relaxed uppercase tracking-wide">
            Our neural-link educational protocol isn't just about learning; it's about shifting your entire paradigm. From the first node to the Master Nexus, the evolution is absolute.
          </p>
          <button className="px-16 py-6 bg-gold text-black rounded-3xl font-black uppercase tracking-[5px] text-[10px] shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all">
            ACTIVATE SYSTEM SYNC
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LevelsSection;

