import React, { useState } from "react";
import { 
  Users, University, Globe, ShieldCheck, Zap, 
  Search, Award, Printer, Download, ArrowLeft,
  ChevronRight, Activity, TrendingUp, Filter,
  Layers, UserCheck, Clock, MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [certData, setCertData] = useState({
    name: '',
    course: 'Global Language Proficiency'
  });

  const stats = [
    { label: 'Global Registrations', value: '10,247', icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: 'Board Affiliations', value: '14', icon: University, color: "text-green-400", bg: "bg-green-400/10" },
    { label: 'Neural Growth Area', value: 'Sudan/Africa', icon: Globe, color: "text-purple-400", bg: "bg-purple-400/10" }
  ];

  const students = [
    { name: 'Rahul Kumar', board: 'JEE Advanced', region: 'India - Delhi', status: 'Verified', time: '2 mins ago' },
    { name: 'Aisha Mohammed', board: 'NEET Medical', region: 'Sudan - Khartoum', status: 'Verified', time: '15 mins ago' },
    { name: 'Fatima Ali', board: 'Language Hub', region: 'Africa - Kenya', status: 'Pending', time: '1 hour ago' },
    { name: 'Arjun Singh', board: 'UPSC Prelims', region: 'India - Mumbai', status: 'Verified', time: '3 hours ago' },
  ];

  const courseOptions = [
    'Global Language Proficiency',
    'Advanced Senior Secondary',
    'Foundational Activity Level',
    'Professional AI & Skill Hub'
  ];

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 text-gold text-[10px] font-black uppercase tracking-[5px] mb-4">
              <ShieldCheck size={16} />
              Authority Clearance: Level 1
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">SUPER <span className="text-gold">ADMIN</span></h1>
          </motion.div>

          <div className="flex gap-4">
            <button className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-all border border-white/5">
              <Activity size={16} /> System Health
            </button>
            <button onClick={() => navigate("/")} className="bg-white text-black px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all">
              <ArrowLeft size={16} /> Terminal Home
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong p-8 rounded-[40px] border border-white/5 group hover:border-gold/20 transition-all"
            >
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <TrendingUp size={20} className="text-white/10 group-hover:text-gold/50" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
              <h3 className="text-4xl font-black italic tracking-tighter">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_450px] gap-8">
          <div className="space-y-8">
            {/* Live Feed */}
            <div className="glass-strong rounded-[50px] p-10 border border-white/5">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <Zap size={24} className="text-yellow-400" />
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">Neural Enrollment Feed</h2>
                </div>
                <Filter size={18} className="text-white/20" />
              </div>

              <div className="space-y-4">
                {students.map((student, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    key={idx}
                    className="glass p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl font-black italic text-white/20 group-hover:text-gold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold italic text-white">{student.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{student.board} • {student.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className={`flex items-center gap-2 justify-end mb-1 ${student.status === 'Verified' ? 'text-green-400' : 'text-gold'}`}>
                         <UserCheck size={12} />
                         <span className="text-[9px] font-black uppercase tracking-widest">{student.status}</span>
                       </div>
                       <p className="text-[9px] text-white/20 flex items-center gap-1">
                         <Clock size={10} /> {student.time}
                       </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Management Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-strong p-8 rounded-[40px] border border-white/5 hover:border-royal/30 transition-all group">
                <Layers className="text-royal mb-6" size={32} />
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">Curriculum Engine</h3>
                <p className="text-xs text-white/40 italic mb-6">Manage NCERT, NIOS, and International logic-streams across all vectors.</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full glass border border-white/10 text-[8px] font-black uppercase tracking-widest">Global</span>
                  <span className="px-3 py-1 rounded-full glass border border-white/10 text-[8px] font-black uppercase tracking-widest text-gold border-gold/20">Active</span>
                </div>
              </div>
              <div className="glass-strong p-8 rounded-[40px] border border-white/5 hover:border-gold/30 transition-all group">
                <Award className="text-gold mb-6" size={32} />
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">Auth Validation</h3>
                <p className="text-xs text-white/40 italic mb-6">Security clearance for cross-border students and university partners.</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full glass border border-white/10 text-[8px] font-black uppercase tracking-widest">Enforced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Engine */}
          <aside className="space-y-8">
            <div className="glass-strong p-10 rounded-[50px] border border-white/5 sticky top-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                  <Award size={24} />
                </div>
                <div>
                   <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none">CERTIFICATE</h2>
                   <p className="text-[10px] font-black uppercase tracking-[3px] text-white/30">Generation Engine</p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-3">Student Identity</label>
                  <input 
                    type="text" 
                    placeholder="Vector Name..."
                    value={certData.name}
                    onChange={(e) => setCertData({...certData, name: e.target.value})}
                    className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-3">Module Streams</label>
                  <select 
                     value={certData.course}
                     onChange={(e) => setCertData({...certData, course: e.target.value})}
                     className="w-full glass-strong border border-white/10 rounded-2xl px-6 py-4 text-sm italic font-bold focus:border-gold focus:outline-none transition-all appearance-none"
                  >
                    {courseOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div className="pt-6 border-t border-white/5">
                   {/* Preview Area */}
                   <div className="p-8 rounded-[40px] glass border-2 border-dashed border-gold/10 text-center relative overflow-hidden">
                     <p className="text-[8px] font-black uppercase tracking-[8px] text-white/10 mb-6">Neural Preview</p>
                     <h3 className="text-lg font-black italic text-gold uppercase tracking-tighter mb-2">Wings Global Hub</h3>
                     <div className="w-12 h-1 px-1 bg-gold/20 mx-auto mb-6" />
                     <p className="text-[10px] text-white/40 italic mb-2">Certifying that</p>
                     <p className="text-xl font-black italic mb-2">{certData.name || "UNNAMED STUDENT"}</p>
                     <p className="text-[9px] text-white/30 italic">has mastered the following vector:</p>
                     <p className="text-xs font-bold text-royal italic mb-8 uppercase tracking-widest">{certData.course}</p>
                     
                     <div className="flex justify-between items-end">
                       <div className="text-[6px] font-bold uppercase text-white/20">Official Stamp</div>
                       <Award className="text-gold/20" size={32} />
                     </div>
                   </div>
                </div>
              </div>

              <button className="w-full py-6 rounded-[30px] bg-royal text-white font-black uppercase tracking-[5px] text-[10px] shadow-2xl shadow-royal/30 hover:scale-105 transition-all flex items-center justify-center gap-3 group">
                <Printer size={16} className="group-hover:rotate-12 transition-transform" /> 
                Print System Auth
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
