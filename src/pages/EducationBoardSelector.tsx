import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, School, Laptop, UserCheck, 
  Layers, Rocket, ChevronRight, GraduationCap,
  Globe, BookOpen, UserCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const EducationBoardSelector = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { boardName, boardData } = location.state || {
    boardName: "CBSE / NCERT",
    boardData: {
      modes: ["Regular", "Distance", "Private"],
      classes: {
        "Foundational": ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
        "Middle": ["Class 6", "Class 7", "Class 8"],
        "Secondary": ["Class 9", "Class 10"],
        "Senior Secondary": ["Class 11", "Class 12"]
      }
    }
  };
  
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const handleContinue = () => {
    if (!selectedMode || !selectedClass) return;
    
    navigate('/classes', {
      state: {
        boardName,
        educationMode: selectedMode,
        classLevel: selectedClass
      }
    });
  };

  const getModeIcon = (mode: string) => {
    switch(mode) {
      case 'Regular': return <School size={24} />;
      case 'Distance': return <Laptop size={24} />;
      default: return <UserCircle size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-royal rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate('/education-hub')}
            className="flex items-center gap-2 text-gold text-[10px] font-black uppercase tracking-[5px] mb-8 hover:tracking-[8px] transition-all"
          >
            <ArrowLeft size={16} /> Terminal Return
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 leading-none">
              VECTOR <br /> <span className="text-gold">{boardName}</span>
            </h1>
            <p className="text-white/40 font-medium italic text-lg max-w-xl mx-auto">
              Configure your specific neural learning path. Select your mode of interaction and class vector.
            </p>
          </motion.div>
        </div>

        {/* Mode Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {boardData.modes.map((mode: string, i: number) => (
            <motion.button
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedMode(mode)}
              className={`p-10 rounded-[40px] border transition-all text-left relative overflow-hidden group ${
                selectedMode === mode 
                  ? "bg-royal border-royal shadow-2xl shadow-royal/20" 
                  : "glass-strong border-white/5 hover:border-gold/20"
              }`}
            >
              <div className={`mb-6 transition-colors ${selectedMode === mode ? "text-white" : "text-white/20 group-hover:text-gold"}`}>
                {getModeIcon(mode)}
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">{mode} Mode</h3>
              <p className={`text-[9px] font-black uppercase tracking-widest ${selectedMode === mode ? "text-white/60" : "text-white/20"}`}>
                {mode === 'Regular' ? 'Daily Sync' : mode === 'Distance' ? 'Remote Link' : 'Isolated Study'}
              </p>
              {selectedMode === mode && <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            </motion.button>
          ))}
        </div>

        {/* Classes Section */}
        <AnimatePresence>
          {selectedMode && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-strong p-12 rounded-[60px] border border-white/5 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                  <Layers size={24} />
                </div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter underline decoration-gold/30 underline-offset-8">Select Class Level</h2>
              </div>

              <div className="space-y-12">
                {Object.keys(boardData.classes).map((level, lIdx) => (
                  <div key={level}>
                    <h3 className="text-[10px] font-black uppercase tracking-[5px] text-white/30 mb-6 flex items-center gap-4">
                      {level} Cluster <div className="h-px flex-1 bg-white/5" />
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {boardData.classes[level].map((className: string) => (
                        <button
                          key={className}
                          onClick={() => setSelectedClass(className)}
                          className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${
                            selectedClass === className
                              ? "bg-gold text-black border-gold shadow-lg shadow-gold/20"
                              : "glass border-white/5 text-white/50 hover:border-gold/30 hover:text-white"
                          }`}
                        >
                          {className}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Current Configuration</p>
                   <p className="font-bold italic text-white/60">
                     {boardName} <span className="text-gold mx-2">/</span> {selectedMode} Mode <span className="text-gold mx-2">/</span> {selectedClass || "..."}
                   </p>
                 </div>

                 <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContinue}
                    disabled={!selectedClass}
                    className="px-12 py-6 rounded-[30px] bg-royal text-white font-black uppercase tracking-[10px] text-xs shadow-2xl shadow-royal/30 disabled:opacity-20 disabled:cursor-not-allowed group flex items-center gap-4"
                 >
                   Initialize <Rocket size={18} />
                 </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mt-20">
           {[
             { icon: GraduationCap, text: "Official Certification" },
             { icon: Globe, text: "Global Standards" },
             { icon: BookOpen, text: "Premium Resources" }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 text-white/20">
               <item.icon size={20} />
               <span className="text-[9px] font-black uppercase tracking-widest leading-none">{item.text}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default EducationBoardSelector;
