import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  ShieldCheck, 
  Eye, 
  AlertTriangle, 
  BarChart3, 
  LogOut, 
  Lock,
  Activity,
  FileText,
  UserCheck
} from "lucide-react";
import { motion } from "motion/react";

const OfficialAdminPortal = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Active Exams", value: "142", icon: Activity, color: "text-green-400" },
    { label: "Red Alerts", value: "08", icon: AlertTriangle, color: "text-red-500" },
    { label: "DEO Sync", value: "Perfect", icon: UserCheck, color: "text-blue-400" },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-midnight-black text-white flex items-center justify-center px-4 pt-20">
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600 rounded-full blur-[200px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-strong rounded-[50px] p-12 border border-red-500/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500/20 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">OFFICIAL <span className="text-red-500">PORTAL</span></h1>
            <p className="text-[10px] font-black uppercase tracking-[5px] text-white/30 italic">Government & Board Authority</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Authority ID</label>
              <input type="text" placeholder="DEO-SYNC-001" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-black italic uppercase tracking-widest focus:border-red-500/50 transition-all outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Access Key</label>
              <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm font-black italic uppercase tracking-widest focus:border-red-500/50 transition-all outline-none" />
            </div>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-red-600 py-6 rounded-2xl font-black uppercase tracking-[5px] text-[10px] shadow-2xl hover:bg-red-700 transition-all"
            >
              Secure Login
            </button>
          </div>
          
          <div className="mt-8 text-center">
             <p className="text-[8px] font-black uppercase tracking-widest text-white/10 italic">WINGS Global Security Protocol v2.5</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              CONTROL <span className="text-red-600">CENTER</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[10px] text-white/30 mt-4">
              Board Secretary & DEO Inspection Node
            </p>
          </motion.div>
          
          <div className="flex gap-4">
            <button onClick={() => navigate("/")} className="glass px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:text-red-500 transition-all">
              <Building2 size={16} /> Exit Node
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-600 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
              <LogOut size={16} /> Terminate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="glass-strong p-8 rounded-[40px] border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-red-500/10 transition-colors" />
               <s.icon className={`${s.color} mb-4`} size={24} />
               <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{s.label}</p>
               <h4 className="text-4xl font-black italic uppercase tracking-tighter">{s.value}</h4>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-4">
            {["overview", "red_alerts", "live_feeds", "reports"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full p-6 bg-white/5 border rounded-3xl flex items-center justify-between group transition-all ${activeTab === tab ? 'border-red-600 bg-red-600/10 scale-105' : 'border-white/5 hover:bg-white/10'}`}
              >
                <span className={`text-[10px] font-black uppercase tracking-widest ${activeTab === tab ? 'text-white' : 'text-white/40'}`}>{tab.replace("_", " ")}</span>
                <Lock size={14} className={activeTab === tab ? 'text-red-500' : 'text-white/10'} />
              </button>
            ))}
          </div>

          <div className="glass-strong rounded-[60px] p-12 border border-white/5 min-h-[500px]">
             {activeTab === "overview" && (
               <div className="space-y-12">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                      <BarChart3 size={32} />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black italic uppercase tracking-tight">Regional Performance Sync</h3>
                       <p className="text-[10px] font-black uppercase tracking-[5px] text-white/30">Data updated 2m ago</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="glass p-8 rounded-[40px] border border-white/5 hover:border-red-500/30 transition-all flex justify-between items-center group">
                        <div>
                          <h5 className="font-black italic uppercase text-lg mb-1 italic">District Zone {i}</h5>
                          <span className="text-[8px] font-black uppercase text-white/40 tracking-widest">Attendance Status: Nominal</span>
                        </div>
                        <Eye className="text-white/10 group-hover:text-red-500 transition-colors" size={20} />
                      </div>
                    ))}
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialAdminPortal;
