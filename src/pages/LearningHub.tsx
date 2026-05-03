import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Video, 
  ShieldCheck, 
  Mic, 
  Play, 
  Atom, 
  Trash2, 
  ChartLine, 
  ArrowLeft,
  Timer,
  Zap,
  Target
} from "lucide-react";
import { motion } from "motion/react";

const LearningHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-royal rounded-full blur-[180px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* AI Monitoring Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-full px-8 py-3 mb-12 border border-green-500/30 flex items-center justify-center gap-4 bg-green-500/5 shadow-2xl shadow-green-500/10 group"
        >
          <div className="relative">
             <Video className="text-green-400" size={18} />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[5px] text-green-400 group-hover:tracking-[7px] transition-all">AI MONITORING ACTIVE: INTEGRITY MODE ON</span>
        </motion.div>

        {/* AI Mentor Section */}
        <div className="relative mb-20">
          <div className="flex flex-col items-center">
            {/* AI Speech Bubble */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-[40px] border border-gold/20 mb-10 relative max-w-lg text-center"
            >
              <p className="text-xl font-black italic uppercase tracking-tight text-white/90">
                "Welcome back, Champion. Systems are synchronized. Ready for your Weekly Adaptive Assessment?"
              </p>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 glass rotate-45 border-r border-b border-gold/20" />
            </motion.div>

            {/* Avatar */}
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-full p-2 bg-gradient-to-br from-purple-600 via-pink-500 to-rose-600 border-4 border-gold shadow-2xl relative z-10 overflow-hidden"
              >
                <img 
                  src="https://customer-assets.emergentagent.com/job_ai-learning-hub-363/artifacts/0z197gja_AI%20Mentor%20ZIARA.jpeg"
                  alt="AI Mentor ZIARA"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-4 animate-pulse shadow-2xl border-4 border-midnight-black z-20">
                <Mic size={24} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping opacity-20" />
            </div>
          </div>
        </div>

        {/* Main Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Weekly Quiz Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-strong rounded-[50px] p-10 border border-blue-500/20 bg-blue-500/5 hover:border-gold/3 transition-all group flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white mb-6 rotate-3 group-hover:rotate-0 transition-transform">
              <Timer size={32} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight mb-2 group-hover:text-gold transition-colors">Weekly Quiz</h3>
            <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-8 leading-relaxed">Neural Self-Assessment after Lesson Clusters</p>
            <span className="text-[8px] font-black uppercase tracking-[2px] text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full">AUTO-GRADING ENABLED</span>
          </motion.div>

          {/* Science & Math Zone Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-strong rounded-[50px] p-10 border border-green-500/20 bg-green-500/5 hover:border-gold/30 transition-all group flex flex-col items-center text-center cursor-pointer"
            onClick={() => navigate('/interactive-lesson')}
          >
            <div className="w-16 h-16 rounded-3xl bg-green-600 flex items-center justify-center text-white mb-6 -rotate-3 group-hover:rotate-0 transition-transform">
              <Atom size={32} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight mb-2 group-hover:text-gold transition-colors">STEM Zone</h3>
            <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-8 leading-relaxed">Interactive Physics & Neural Computation</p>
            <span className="text-[8px] font-black uppercase tracking-[2px] text-gold bg-gold/10 px-4 py-2 rounded-full">ADAPTIVE CONTENT</span>
          </motion.div>

          {/* Final Examination Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-strong rounded-[50px] p-10 border border-red-500/20 bg-red-500/5 hover:border-gold/30 transition-all group flex flex-col items-center text-center cursor-pointer"
            onClick={() => navigate('/exam-hub')}
          >
            <div className="w-16 h-16 rounded-3xl bg-red-600 flex items-center justify-center text-white mb-6 rotate-12 group-hover:rotate-0 transition-transform">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight mb-2 group-hover:text-gold transition-colors">Proctored Final</h3>
            <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30 mb-8 leading-relaxed">End of Session Certification Protocols</p>
            <span className="text-[8px] font-black uppercase tracking-[2px] text-red-500 bg-red-500/10 px-4 py-2 rounded-full">AI PROCTORING ACTIVE</span>
          </motion.div>
        </div>

        {/* Learning Analytics Overlay */}
        <div className="glass-strong rounded-[60px] p-12 border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-3xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                  <ChartLine size={32} />
               </div>
               <div>
                  <h4 className="text-3xl font-black italic uppercase tracking-tight">Neural Progress</h4>
                  <p className="text-[10px] font-black uppercase tracking-[5px] text-white/30">Real-time vector benchmarking</p>
               </div>
            </div>
            <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/30 px-10 py-5 rounded-3xl">
               <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Current Rank:</span>
               <span className="text-4xl font-black italic text-green-400">A+</span>
            </div>
          </div>

          <div className="space-y-10">
            {/* Attendance */}
            <div className="space-y-4">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Nexus Attendance</span>
                  <span className="text-xl font-black italic text-green-400">95%</span>
               </div>
               <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                  />
               </div>
            </div>

            {/* Course Progress */}
            <div className="space-y-4">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Curriculum Saturation</span>
                  <span className="text-xl font-black italic text-gold">70%</span>
               </div>
               <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-royal to-gold rounded-full shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  />
               </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-20">
          <button
            onClick={() => navigate('/')}
            className="px-12 py-6 rounded-[30px] glass-strong border border-white/5 flex items-center gap-4 text-[10px] font-black uppercase tracking-[5px] hover:bg-white hover:text-black transition-all group shadow-2xl"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;