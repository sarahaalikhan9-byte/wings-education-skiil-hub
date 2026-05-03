import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trophy, 
  Crown, 
  User, 
  Home, 
  ArrowLeft,
  Star,
  MapPin,
  Target
} from "lucide-react";
import { motion } from "motion/react";

const Leaderboard = () => {
  const navigate = useNavigate();

  const topThree = [
    { rank: 2, name: 'Aman Rai', xp: 950, badge: 'Silver Scholar', color: 'border-gray-400', initial: 'AR' },
    { rank: 1, name: 'Aryan Khan', xp: 1200, badge: 'Gold Scholar', color: 'border-gold', initial: 'AK' },
    { rank: 3, name: 'ZIARA Ali', xp: 890, badge: 'Bronze Star', color: 'border-orange-700', initial: 'ZA' }
  ];

  const otherRanks = [
    { rank: 4, name: 'Zaid Sheikh', location: 'Indore', xp: 850 },
    { rank: 5, name: 'Ishani Vyas', location: 'Vadodara', xp: 780 },
    { rank: 6, name: 'Rahul S.', location: 'Mumbai', xp: 720 },
    { rank: 7, name: 'Sanya Mirza', location: 'Delhi', xp: 690 },
    { rank: 8, name: 'Vikram Seth', location: 'Bangalore', xp: 650 },
  ];

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-royal rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-3xl bg-gold/10 flex items-center justify-center text-gold mb-8 border border-gold/20 shadow-2xl shadow-gold/10"
          >
            <Trophy size={40} />
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 leading-none">
            WINGS GLOBAL <span className="text-gold">HUB</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[10px] text-white/30">Top Neural Performers of the week</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-20 px-4">
          {/* Rank 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:order-1 flex flex-col items-center"
          >
            <div className={`w-32 h-32 rounded-full border-4 ${topThree[0].color} p-2 mb-6 relative group overflow-hidden shadow-2xl ring-4 ring-white/5`}>
               <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center italic font-black text-2xl text-white/20">
                 {topThree[0].initial}
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Star size={16} className="text-gray-400" />
               </div>
               <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gray-400 text-black flex items-center justify-center font-black italic shadow-lg">2</div>
            </div>
            <div className="text-center glass-strong p-6 rounded-[40px] border border-white/5 w-full">
              <h4 className="text-xl font-black italic uppercase tracking-tight mb-1">{topThree[0].name}</h4>
              <p className="text-3xl font-black italic text-gray-400 mb-2">{topThree[0].xp} <span className="text-[10px] uppercase tracking-widest opacity-40">XP</span></p>
              <span className="text-[8px] font-black uppercase tracking-[3px] text-white/30">{topThree[0].badge}</span>
            </div>
          </motion.div>

          {/* Rank 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:order-2 flex flex-col items-center scale-110"
          >
            <div className={`w-40 h-40 rounded-full border-4 ${topThree[1].color} p-2 mb-8 relative group overflow-hidden shadow-2xl ring-4 ring-gold/10`}>
               <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center italic font-black text-4xl text-gold/20">
                 {topThree[1].initial}
               </div>
               <div className="absolute inset-0 bg-gold/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                 <Crown size={40} className="text-gold animate-bounce" />
               </div>
               <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-gold text-black flex items-center justify-center shadow-2xl ring-8 ring-midnight-black">
                 <Crown size={24} />
               </div>
            </div>
            <div className="text-center glass-strong p-8 rounded-[50px] border border-gold/30 bg-gold/5 w-full shadow-2xl shadow-gold/10">
              <h4 className="text-2xl font-black italic uppercase tracking-tight mb-1 text-gold">{topThree[1].name}</h4>
              <p className="text-4xl font-black italic text-white mb-2">{topThree[1].xp} <span className="text-[10px] uppercase tracking-widest opacity-40">XP</span></p>
              <span className="text-[8px] font-black uppercase tracking-[3px] text-gold">{topThree[1].badge}</span>
            </div>
          </motion.div>

          {/* Rank 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:order-3 flex flex-col items-center"
          >
            <div className={`w-32 h-32 rounded-full border-4 ${topThree[2].color} p-2 mb-6 relative group overflow-hidden shadow-2xl ring-4 ring-white/5`}>
               <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center italic font-black text-2xl text-white/20">
                 {topThree[2].initial}
               </div>
               <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-orange-700 text-white flex items-center justify-center font-black italic shadow-lg">3</div>
            </div>
            <div className="text-center glass-strong p-6 rounded-[40px] border border-white/5 w-full">
              <h4 className="text-xl font-black italic uppercase tracking-tight mb-1">{topThree[2].name}</h4>
              <p className="text-3xl font-black italic text-orange-700 mb-2">{topThree[2].xp} <span className="text-[10px] uppercase tracking-widest opacity-40">XP</span></p>
              <span className="text-[8px] font-black uppercase tracking-[3px] text-white/30">{topThree[2].badge}</span>
            </div>
          </motion.div>
        </div>

        {/* Rank List Table */}
        <div className="glass-strong rounded-[50px] border border-white/5 overflow-hidden mb-12 shadow-2xl">
          <div className="grid grid-cols-[80px_1fr_120px] gap-4 items-center bg-white/5 p-8 border-b border-white/5">
             <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Index</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-white/20 text-left">Neural Vector Identity</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-white/20 text-right">Metrics</span>
          </div>

          <div className="divide-y divide-white/5">
            {otherRanks.map((user, i) => (
              <motion.div 
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[80px_1fr_120px] gap-4 items-center p-8 hover:bg-white/5 transition-colors group cursor-crosshair"
              >
                <span className="text-2xl font-black italic text-white/20 group-hover:text-gold transition-colors">#{user.rank}</span>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 italic font-black group-hover:text-gold group-hover:bg-gold/10 transition-all border border-white/10 group-hover:border-gold/30 uppercase text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-lg font-black italic uppercase tracking-tight">{user.name}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={10} className="text-white/20" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/20">{user.location} Vector Zone</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black italic text-gold">{user.xp}</p>
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-20">Quantized XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-20">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-12 py-6 rounded-[30px] glass-strong border border-white/5 flex items-center gap-4 text-[10px] font-black uppercase tracking-[5px] hover:bg-white hover:text-black transition-all group shadow-2xl"
          >
            <Target size={18} className="group-hover:rotate-45 transition-transform" /> Access Dashboard
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-12 py-6 rounded-[30px] bg-royal text-white flex items-center gap-4 text-[10px] font-black uppercase tracking-[5px] hover:scale-105 transition-all shadow-2xl shadow-royal/30 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Back to Nexus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;