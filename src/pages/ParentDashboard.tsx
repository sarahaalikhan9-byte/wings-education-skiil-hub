import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  UserCircle, 
  Calendar, 
  TrendingUp, 
  Bell, 
  CreditCard,
  ChevronRight,
  GraduationCap,
  Activity,
  Award
} from "lucide-react";
import { motion } from "motion/react";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState("STUDENT_01");

  const students = [
    { id: "STUDENT_01", name: "Aryan Khan", class: "Grade 10-A", avatar: "A" },
    { id: "STUDENT_02", name: "Sanya Khan", class: "Grade 8-B", avatar: "S" }
  ];

  const quickStats = [
    { label: "Attendance", value: "94%", detail: "Elite Status", icon: Calendar, color: "text-green-400" },
    { label: "Academic Rank", value: "A+", detail: "Top 5%", icon: Award, color: "text-gold" },
    { label: "Skill Badges", value: "12", detail: "Active Learner", icon: GraduationCap, color: "text-royal" },
    { label: "Pending Fees", value: "₹0", icon: CreditCard, color: "text-white/20" }
  ];

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-royal rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              PARENT <span className="text-gold">HUB</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[10px] text-white/30 mt-4">
              Guardian Intelligence & Academic Sync
            </p>
          </motion.div>
          
          <div className="flex gap-4">
            <button className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all text-gold font-bold">
              <Bell size={16} /> Secure Alerts
            </button>
          </div>
        </div>

        {/* Student Selection */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {students.map((s) => (
            <button 
              key={s.id}
              onClick={() => setSelectedStudent(s.id)}
              className={`flex-shrink-0 flex items-center gap-4 px-8 py-4 rounded-3xl transition-all ${selectedStudent === s.id ? 'bg-gold text-black shadow-2xl scale-105' : 'glass border border-white/5 text-white/40'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${selectedStudent === s.id ? 'bg-black text-gold' : 'bg-white/10 text-white'}`}>
                {s.avatar}
              </div>
              <div className="text-left">
                <p className="text-xs font-black italic uppercase tracking-tight leading-none">{s.name}</p>
                <span className="text-[8px] font-bold uppercase opacity-60 tracking-widest">{s.class}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((s, i) => (
            <div key={i} className="glass-strong p-8 rounded-[40px] border border-white/5 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-gold/10 transition-colors" />
                <s.icon className={`${s.color} mb-4`} size={20} />
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{s.label}</p>
                <h4 className="text-3xl font-black italic uppercase tracking-tighter">{s.value}</h4>
                {s.detail && <p className="text-[8px] font-black uppercase tracking-widest text-gold mt-1">{s.detail}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
           {/* Activity Timeline */}
           <div className="glass-strong rounded-[60px] p-12 border border-white/5">
              <h3 className="text-3xl font-black italic uppercase tracking-tight mb-12">Recent Activity</h3>
              <div className="space-y-8">
                {[
                  { title: "Skill Badge Earned", desc: "Computer Mastery Golden Badge", time: "2h ago", icon: GraduationCap, color: "text-gold" },
                  { title: "Attendance Marked", desc: "Neural Class 104 - Present", time: "5h ago", icon: Calendar, color: "text-green-400" },
                  { title: "Evaluation Result", desc: "Calculus Unit Test: 98%", time: "1d ago", icon: TrendingUp, color: "text-blue-400" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                       <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:bg-white/10 transition-colors`}>
                          <item.icon size={20} />
                       </div>
                       {i !== 2 && <div className="w-px flex-1 bg-white/10 my-2" />}
                    </div>
                    <div className="pb-8">
                       <h5 className="text-lg font-black italic uppercase italic mb-1 italic">{item.title}</h5>
                       <p className="text-sm font-medium text-white/40 italic mb-2">{item.desc}</p>
                       <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Quick Actions */}
           <div className="space-y-6">
              <div className="glass-strong p-10 rounded-[50px] border border-white/5 bg-gradient-to-br from-royal/5 to-transparent">
                  <h4 className="text-xl font-black italic uppercase italic mb-8">Guardian Services</h4>
                  <div className="space-y-4">
                    {[
                      { icon: Activity, label: "Live Performance", link: "/marks" },
                      { icon: TrendingUp, label: "Growth Analytics", link: "#" },
                      { icon: CreditCard, label: "Fee Gateway", link: "#" },
                      { icon: Users, label: "Tutor Connect", link: "#" },
                    ].map((btn, i) => (
                      <button 
                        key={i} 
                        onClick={() => btn.link !== "#" && navigate(btn.link)}
                        className="w-full glass p-6 rounded-3xl border border-white/5 hover:border-gold/30 hover:bg-white/5 transition-all flex items-center justify-between group"
                      >
                         <div className="flex items-center gap-4">
                            <btn.icon size={18} className="text-white/20 group-hover:text-gold" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{btn.label}</span>
                         </div>
                         <ChevronRight size={14} className="text-white/10 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
              </div>

              <div className="glass-strong p-10 rounded-[50px] border border-royal/20 bg-gradient-to-br from-royal/10 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-royal/10 rounded-full blur-3xl -mr-16 -mt-16" />
                  <h4 className="text-lg font-black italic uppercase mb-4 tracking-tight text-royal">Security Note</h4>
                  <p className="text-[10px] text-white/40 italic leading-relaxed font-bold">Your session is encrypted with Neural Sync. All dashboard data is synchronized directly from the school board server.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
