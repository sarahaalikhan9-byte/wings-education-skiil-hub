import React from "react";
import { motion } from "motion/react";
import { Landmark, GraduationCap, Globe2, Building2 } from "lucide-react";

const BoardUniversity = () => {
  return (
    <div className="min-h-screen pt-32 px-8 bg-midnight-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-black mb-6 uppercase tracking-tighter">
            BOARD & <span className="text-gold">UNIVERSITY</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto italic">
            Connecting students with national and international academic standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-strong p-8 rounded-[40px] border border-royal/30">
            <div className="flex items-center gap-4 mb-8">
              <Landmark className="w-10 h-10 text-royal" />
              <h2 className="text-3xl font-black uppercase">National Boards</h2>
            </div>
            <div className="space-y-4">
              {['CBSE', 'ICSE', 'State Boards', 'NIOS'].map((board) => (
                <div key={board} className="glass p-5 rounded-2xl border border-white/5 flex justify-between items-center group cursor-pointer hover:border-gold/50 transition-all">
                  <span className="font-bold">{board}</span>
                  <div className="w-8 h-8 rounded-full bg-royal/20 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-strong p-8 rounded-[40px] border border-gold/30">
            <div className="flex items-center gap-4 mb-8">
              <Globe2 className="w-10 h-10 text-gold" />
              <h2 className="text-3xl font-black uppercase text-gold">International</h2>
            </div>
            <div className="space-y-4">
              {['IB', 'IGCSE', 'A-Levels', 'SAT/ACT Preparation'].map((board) => (
                <div key={board} className="glass p-5 rounded-2xl border border-white/5 flex justify-between items-center group cursor-pointer hover:border-royal/50 transition-all">
                  <span className="font-bold">{board}</span>
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-royal group-hover:text-white transition-all">
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUniversity;
