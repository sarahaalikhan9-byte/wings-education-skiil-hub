import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trophy, 
  Target, 
  BarChart3, 
  ArrowLeft, 
  Printer, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  FileText
} from "lucide-react";
import { motion } from "motion/react";

const Marks = () => {
  const navigate = useNavigate();
  const [marks] = useState([
    { subject: "Advanced Physics", marks: 88, max: 100, trend: "up" },
    { subject: "Quantum Mathematics", marks: 92, max: 100, trend: "up" },
    { subject: "Digital Ethics", marks: 76, max: 100, trend: "stable" },
    { subject: "AI Systems", marks: 95, max: 100, trend: "up" },
    { subject: "Neural Biology", marks: 84, max: 100, trend: "down" }
  ]);

  const [stats, setStats] = useState({ total: 0, percentage: 0, result: "", gpa: 0 });

  useEffect(() => {
    const total = marks.reduce((sum, item) => sum + item.marks, 0);
    const maxTotal = marks.reduce((sum, item) => sum + item.max, 0);
    const percentage = Number(((total / maxTotal) * 100).toFixed(1));
    const result = percentage >= 40 ? "PASS" : "FAIL";
    const gpa = Number((percentage / 25).toFixed(2)); // Simplified GPA
    
    setStats({ total, percentage, result, gpa });
  }, [marks]);

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-royal rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              PERFORMANCE <span className="text-gold">INDEX</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[10px] text-white/30 mt-4">
              Academic Neural Synchrony Report
            </p>
          </motion.div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => window.print()}
              className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all"
            >
              <Printer size={16} /> Print Sync
            </button>
            <button 
              className="bg-gold text-black px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
            >
              <FileText size={16} /> Download
            </button>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Overall Score", value: `${stats.percentage}%`, icon: Target, color: "text-royal" },
            { label: "Neural GPA", value: stats.gpa, icon: Award, color: "text-gold" },
            { label: "Sync Status", value: stats.result, icon: CheckCircle2, color: "text-green-400" },
            { label: "Total Points", value: stats.total, icon: BarChart3, color: "text-white" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong p-8 rounded-[40px] border border-white/5 bg-white/[0.02]"
            >
              <item.icon className={`${item.color} mb-4`} size={24} />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{item.label}</p>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter">{item.value}</h4>
            </motion.div>
          ))}
        </div>

        {/* detailed Report Table */}
        <div className="glass-strong rounded-[60px] p-2 border border-white/5 overflow-hidden mb-12">
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-white/5">
                   <th className="p-10 text-[10px] font-black uppercase tracking-[5px] text-white/30">Subject / Module</th>
                   <th className="p-10 text-[10px] font-black uppercase tracking-[5px] text-white/30 text-center">Score</th>
                   <th className="p-10 text-[10px] font-black uppercase tracking-[5px] text-white/30 text-center">Trend</th>
                   <th className="p-10 text-[10px] font-black uppercase tracking-[5px] text-white/30 text-right">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {marks.map((item, i) => (
                   <motion.tr 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="group hover:bg-white/[0.02] transition-colors"
                   >
                     <td className="p-10">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                            <TrendingUp size={18} />
                         </div>
                         <h4 className="text-lg font-black italic uppercase tracking-tight group-hover:text-gold transition-colors">{item.subject}</h4>
                       </div>
                     </td>
                     <td className="p-10">
                       <div className="flex flex-col items-center gap-2">
                         <span className="text-2xl font-black italic tracking-tighter">{item.marks}<span className="text-white/20 text-sm">/{item.max}</span></span>
                         <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.marks / item.max) * 100}%` }}
                              className="h-full bg-gold"
                            />
                         </div>
                       </div>
                     </td>
                     <td className="p-10 text-center">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${item.trend === 'up' ? 'text-green-400' : item.trend === 'down' ? 'text-red-400' : 'text-white/30'}`}>
                         {item.trend}
                       </span>
                     </td>
                     <td className="p-10 text-right">
                       {item.marks >= 40 ? 
                        <span className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                          <CheckCircle2 size={12} /> Sync Perfect
                        </span> : 
                        <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20">
                          <AlertCircle size={12} /> Sync Failed
                        </span>
                       }
                     </td>
                   </motion.tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
           <button 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[5px] text-white/30 hover:text-white transition-colors"
           >
             <ArrowLeft size={16} /> RETURN TO DASHBOARD
           </button>
           
           <div className="flex items-center gap-4 p-6 glass rounded-3xl border border-white/5">
              <div className="flex items-center gap-3">
                <Trophy className="text-gold" size={20} />
                <p className="text-[8px] font-black uppercase tracking-widest text-white/40 leading-tight">
                  CURRENT RANK <br/> <span className="text-white text-xs">#12 IN GLOBAL SECTOR</span>
                </p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <button 
                onClick={() => navigate("/leaderboard")}
                className="text-[8px] font-black uppercase tracking-widest text-gold hover:underline"
              >
                VIEW RANKINGS
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Marks;

