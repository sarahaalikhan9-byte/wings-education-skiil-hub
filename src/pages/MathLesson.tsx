import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Play, 
  FileText, 
  Download, 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  CheckCircle2,
  Share2,
  Bookmark,
  Maximize2,
  Zap
} from "lucide-react";
import { motion } from "motion/react";

const MathLesson = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      {/* Background Decor */}
       <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-royal rounded-full blur-[200px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-4 text-[8px] font-black uppercase tracking-[4px] text-white/30 mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigate("/")} className="hover:text-gold">Nexus</button>
          <span>/</span>
          <button onClick={() => navigate("/classes")} className="hover:text-gold">Classes</button>
          <span>/</span>
          <span className="text-gold">Math Chapter 01: Calculus Vectors</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Header */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4"
              >
                INTEGRAL <span className="text-gold">CALCULUS</span>
              </motion.h1>
              <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/40">
                <span className="flex items-center gap-2"><Clock size={12} className="text-gold" /> 45:12 Duration</span>
                <span className="flex items-center gap-2"><BookOpen size={12} className="text-royal" /> Chapter 01 / Unit 04</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-400" /> Completed by 4.2k Users</span>
              </div>
            </div>

            {/* Video Player Container */}
            <div className="glass-strong rounded-[50px] border border-white/5 overflow-hidden shadow-2xl group relative">
               <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljc3xlbnwwfHx8fDE3MTU4NTM5Njh8MA&ixlib=rb-4.1.0&q=85"
                    alt="Lesson Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="relative z-20 text-center">
                    <button className="w-24 h-24 rounded-full bg-gold flex items-center justify-center text-black shadow-[0_0_50px_rgba(255,215,0,0.4)] hover:scale-110 transition-all mb-6">
                      <Play size={40} fill="black" />
                    </button>
                    <p className="text-[10px] font-black uppercase tracking-[10px] opacity-60">Initiate Playback</p>
                  </div>
                  
                  {/* Overlay Controls */}
                  <div className="absolute bottom-10 left-10 right-10 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="flex items-center gap-6">
                        <button className="text-white hover:text-gold transition-colors"><Bookmark size={20} /></button>
                        <button className="text-white hover:text-gold transition-colors"><Share2 size={20} /></button>
                     </div>
                     <button className="text-white hover:text-gold transition-colors"><Maximize2 size={20} /></button>
                  </div>
               </div>
               
               <div className="p-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tight mb-2 italic">Neural Master: Dr. Zen</h3>
                    <p className="text-xs font-black text-white/40 italic uppercase tracking-[5px]">Global Math Syndicate • Expert Advisor</p>
                  </div>
                  <button className="px-12 py-5 bg-royal text-white rounded-2xl font-black uppercase tracking-[5px] text-[10px] shadow-2xl shadow-royal/20 hover:scale-105 transition-all">Submit Evaluation</button>
               </div>
            </div>

            {/* Description / Resources */}
            <div className="glass-strong rounded-[50px] p-12 border border-white/5 space-y-12">
               <div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tight mb-6 underline underline-offset-8 decoration-gold/20">Lesson Objective</h3>
                  <p className="text-lg font-black italic text-white/60 leading-relaxed uppercase tracking-tight">
                    Explore the fundamental theorems of calculus through a neural lens. In this module, we decouple traditional formulas from abstract concepts.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass p-8 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-gold/30 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-gold transition-colors">
                           <FileText size={24} />
                        </div>
                        <div>
                           <h5 className="font-black italic uppercase tracking-tight">Full Lab Notes</h5>
                           <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Calculus_01_Nexus.pdf</span>
                        </div>
                     </div>
                     <button className="text-white/20 hover:text-white"><Download size={20} /></button>
                  </div>

                  <div className="glass p-8 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-gold/30 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-gold transition-colors">
                           <Zap size={24} />
                        </div>
                        <div>
                           <h5 className="font-black italic uppercase tracking-tight">Practice Sync</h5>
                           <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">AI Quiz Module 04</span>
                        </div>
                     </div>
                     <button className="text-white/20 hover:text-white"><Play size={20} /></button>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
             <div className="glass-strong p-10 rounded-[50px] border border-white/5">
                <h3 className="text-xl font-black italic uppercase italic mb-8">Chapter Sequence</h3>
                <div className="space-y-4">
                  {[
                    { id: "01", title: "Limits & Flux", duration: "12:00", active: true },
                    { id: "02", title: "Derivative Logic", duration: "18:00", active: false },
                    { id: "03", title: "Tangent Vectors", duration: "22:00", active: false },
                    { id: "04", title: "Integral Mastery", duration: "25:00", active: false },
                  ].map((ch, i) => (
                    <div key={i} className={`p-6 rounded-[30px] border flex items-center justify-between group transition-all cursor-pointer ${ch.active ? 'bg-gold text-black border-gold shadow-2xl' : 'glass border-white/5 hover:bg-white/5'}`}>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-black ${ch.active ? 'text-black/40' : 'text-white/20'}`}>{ch.id}</span>
                        <h5 className="text-xs font-black italic uppercase">{ch.title}</h5>
                      </div>
                      <span className={`text-[8px] font-black uppercase ${ch.active ? 'text-black/40' : 'text-white/10'}`}>{ch.duration}</span>
                    </div>
                  ))}
                </div>
             </div>

             <div className="glass-strong p-10 rounded-[50px] border border-royal/20 bg-gradient-to-br from-royal/10 to-transparent">
                <h4 className="text-sm font-black uppercase tracking-[5px] mb-4">Neural Tutor</h4>
                <p className="text-[10px] text-white/40 italic leading-relaxed mb-6 font-bold">Need help with this specific vector? ZIARA AI is ready to synchronize with your learning curve.</p>
                <button onClick={() => navigate("/ai-tutor")} className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[5px] text-[10px] hover:bg-gold transition-all font-bold">Enable Advisor</button>
             </div>
          </aside>
        </div>

        {/* Navigation Actions */}
        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[5px] text-white/30 hover:text-white transition-colors"
           >
             <ArrowLeft size={16} /> RETURN TO MODULES
           </button>
           
           <div className="flex gap-4">
              <button className="glass px-8 py-4 rounded-full text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white font-bold">PREV LESSON</button>
              <button className="bg-white text-black px-8 py-4 rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-gold transition-all font-bold">NEXT LESSON</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MathLesson;
