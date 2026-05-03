import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Users, 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  Loader2,
  ShieldCheck,
  Zap,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0); // 0: Student, 1: Parent, 2: Admin
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    studentEmail: "",
    studentPass: "",
    parentEmail: "",
    parentPass: "",
    adminInstitution: "",
    adminEmail: "",
    adminPass: ""
  });

  const tabs = [
    { label: "Student", icon: User },
    { label: "Parents", icon: Users },
    { label: "Institution", icon: Building2 }
  ];

  const handleLogin = async (role: string) => {
    setError("");
    setLoading(true);

    try {
      let email = "";
      let password = "";

      if (role === "Student") {
        email = formData.studentEmail;
        password = formData.studentPass;
      } else if (role === "Parent") {
        email = formData.parentEmail;
        password = formData.parentPass;
      } else if (role === "Admin") {
        email = formData.adminEmail;
        password = formData.adminPass;
      }

      if (!email || !password) {
        setError("Please fill in all neural credentials.");
        setLoading(false);
        return;
      }

      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simple navigation logic for demo
      if (role === "Parent") navigate("/parent-dashboard");
      else if (role === "Student") navigate("/dashboard");
      else if (role === "Admin") navigate("/admin-portal");
      else navigate("/");
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-royal rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-3xl bg-gold/10 flex items-center justify-center text-gold mx-auto mb-6 border border-gold/20 shadow-2xl">
            <Lock size={32} />
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">ACCESS <span className="text-gold">VAULT</span></h1>
          <p className="text-[10px] font-black uppercase tracking-[8px] text-white/30 italic font-bold">Synchronize your identity</p>
        </motion.div>

        {/* Tab Selection */}
        <div className="glass-strong p-2 rounded-3xl flex gap-1 mb-8 border border-white/5">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-4 px-2 rounded-2xl flex flex-col items-center gap-2 transition-all ${
                  activeTab === i 
                    ? "bg-gold text-black shadow-2xl scale-[1.02]" 
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-4 glass-strong border border-red-500/30 rounded-2xl bg-red-500/5 text-center overflow-hidden"
            >
              <p className="text-xs font-black italic uppercase tracking-tight text-red-400">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        <div className="glass-strong rounded-[40px] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <div className="space-y-6">
            {activeTab === 0 && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Neural Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                    <input 
                      type="email"
                      placeholder="student@nexus.ai"
                      value={formData.studentEmail}
                      onChange={(e) => setFormData({...formData, studentEmail: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-5 text-sm font-black italic uppercase tracking-widest focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Cipher Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={formData.studentPass}
                      onChange={(e) => setFormData({...formData, studentPass: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-5 text-sm font-black italic uppercase tracking-widest focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => handleLogin("Student")}
                  disabled={loading}
                  className="w-full bg-gradient-royal text-white py-6 rounded-2xl font-black uppercase tracking-[5px] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Initiate Uplink"} <ArrowRight size={16} />
                </button>
              </>
            )}

            {activeTab === 1 && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Parental Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                    <input 
                      type="email"
                      placeholder="parent@nexus.ai"
                      value={formData.parentEmail}
                      onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-5 text-sm font-black italic uppercase tracking-widest focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Access Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={formData.parentPass}
                      onChange={(e) => setFormData({...formData, parentPass: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-5 text-sm font-black italic uppercase tracking-widest focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => handleLogin("Parent")}
                  disabled={loading}
                  className="w-full bg-gold text-black py-6 rounded-2xl font-black uppercase tracking-[5px] text-[10px] shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Guardian Unlock"} <ShieldCheck size={16} />
                </button>
              </>
            )}

            {activeTab === 2 && (
              <>
                 <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Institution Code</label>
                  <div className="relative group">
                    <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                    <input 
                      type="text"
                      placeholder="e.g. CBSE / MP Board"
                      value={formData.adminInstitution}
                      onChange={(e) => setFormData({...formData, adminInstitution: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-5 text-sm font-black italic uppercase tracking-widest focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Chancellor Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                    <input 
                      type="email"
                      placeholder="admin@institution.edu"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-5 text-sm font-black italic uppercase tracking-widest focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Security Masterpass</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={formData.adminPass}
                      onChange={(e) => setFormData({...formData, adminPass: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-16 py-5 text-sm font-black italic uppercase tracking-widest focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => handleLogin("Admin")}
                  disabled={loading}
                  className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[5px] text-[10px] shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Institution Login"} <Zap size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer Support */}
        <div className="mt-12 text-center flex flex-col gap-4">
           <button 
              onClick={() => navigate("/")}
              className="text-[8px] font-black uppercase tracking-[5px] text-white/30 hover:text-white transition-colors flex items-center justify-center gap-2"
           >
             <ArrowLeft size={10} /> RETURN TO NEXUS
           </button>
           <div className="flex justify-center gap-8">
              <span className="text-[8px] font-black uppercase tracking-widest text-white/20 cursor-pointer hover:text-gold transition-colors">Forgot Cipher?</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/20 cursor-pointer hover:text-gold transition-colors">New Unit Registration</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

