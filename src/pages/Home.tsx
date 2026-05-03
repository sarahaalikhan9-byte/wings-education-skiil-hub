import React, { useState } from "react";
import { motion } from "framer-motion";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import HubsSection from "../components/HubsSection";
import LevelsSection from "../components/LevelsSection";
import StatsBar from "../components/StatsBar";
import TextToSpeech from "../components/TextToSpeech";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import AccessibilitySidebar from "../components/AccessibilitySidebar";
import AchievementFireworks from "../components/AchievementFireworks";
import FaceRecognitionMonitor from "../components/FaceRecognitionMonitor";
import GestureBox from "../components/GestureBox";
import ZIARAWidget from "../components/ZIARAWidget";
import SignLanguageDisplay from "../components/SignLanguageDisplay";
import VoiceCommandController from "../components/VoiceCommandController";
import VoiceMonitor from "../components/VoiceMonitor";

const Home = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [showGestureBox, setShowGestureBox] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleSecurityAlert = (type: string, message: string) => {
    console.warn(`Security [${type}]: ${message}`);
  };

  const triggerAchievement = () => {
    setShowFireworks(true);
  };

  return (
    <main className="relative min-h-screen">
      <HeroSlider />

      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-20">
          <StatsBar />
          <HubsSection />
          <LevelsSection />
          <div className="pt-10 space-y-10">
            <SignLanguageDisplay 
              isActive={true} 
              text="Wings Global helping students learn and understand robotics and AI" 
            />
            <TextToSpeech />
          </div>
        </div>
        
        <aside className="w-full lg:w-80 space-y-8">
          <FaceRecognitionMonitor 
            isActive={isCameraActive} 
            onSecurityAlert={handleSecurityAlert} 
          />
          
          <VoiceMonitor 
            isActive={isCameraActive} 
            onSecurityAlert={handleSecurityAlert} 
          />
          
          <div className="glass-dark p-8 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-red-600/10 transition-colors" />
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <i className="fas fa-brain text-gold"></i>
              </div>
              <div>
                <h3 className="font-black text-xs text-white uppercase italic tracking-widest">Neural Sync</h3>
                <p className="text-[8px] font-bold text-white/40 uppercase tracking-[3px]">Brain-Wave Protocol</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Attention Span', value: '92%', color: 'bg-gold' },
                { label: 'Logic Sync', value: '78%', color: 'bg-red-600' },
                { label: 'Creative Node', value: '64%', color: 'bg-purple-500' }
              ].map(stat => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex justify-between text-[7px] font-black uppercase text-white/60 tracking-widest">
                    <span>{stat.label}</span>
                    <span>{stat.value}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: stat.value }}
                      className={`h-full ${stat.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
               <button 
                onClick={() => setIsCameraActive(!isCameraActive)}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-[5px] text-[9px] transition-all flex items-center justify-center gap-3 border ${
                  isCameraActive 
                    ? "bg-red-600 text-white border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.3)]" 
                    : "bg-white/5 text-white/60 border-white/10 hover:border-gold/50"
                }`}
              >
                <i className={`fas ${isCameraActive ? "fa-circle-dot" : "fa-power-off"}`}></i>
                {isCameraActive ? "Sync Active" : "Initialize Link"}
              </button>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-purple-border/30 shadow-xl bg-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-royal/10 flex items-center justify-center">
                <i className="fas fa-trophy text-royal"></i>
              </div>
              <h3 className="font-bold text-lg text-text-main uppercase italic">Legacy Rewards</h3>
            </div>
            
            <button 
              onClick={triggerAchievement}
              className="w-full bg-gradient-royal py-4 rounded-2xl text-white font-black uppercase tracking-[5px] text-[10px] hover:scale-[1.02] transition-transform shadow-lg border border-gold/20"
            >
              Claim Global Badge
            </button>
          </div>
        </aside>
      </div>

      {/* Floating Tools - DO NOT REMOVE */}
      <AchievementFireworks 
        show={showFireworks} 
        onComplete={() => setShowFireworks(false)} 
        message="Course Complete! 🎉"
      />
      <GestureBox 
        isActive={showGestureBox} 
        onClose={() => setShowGestureBox(false)} 
      />
    </main>
  );
};

export default Home;
