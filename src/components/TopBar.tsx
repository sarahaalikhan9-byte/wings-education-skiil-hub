import React from "react";
import { Globe, ShieldCheck, Heart } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import HiddenCommandCenter from "./HiddenCommandCenter";

const TopBar = () => {
  return (
    <header className="glass-strong relative z-50 px-4 md:px-8 py-3 border-b border-gold/20 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* 🌟 LEFT: WINGS Branding (Moved from Navbar) */}
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href = "/"}>
          <div className="relative group">
            <div className="w-12 h-12 bg-gradient-royal rounded-2xl flex items-center justify-center text-white shadow-xl border-2 border-gold/30 group-hover:rotate-12 transition-all duration-500 overflow-hidden">
               <Globe className="w-7 h-7 text-gold animate-pulse" />
               <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* Hidden admin trigger area */}
            <div className="absolute -inset-1 z-10 opacity-0 h-full w-full">
               <HiddenCommandCenter />
            </div>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase italic leading-none drop-shadow-lg">
              WINGS <span className="text-gold">EDU-SKILL</span>
            </h1>
            <p className="text-[9px] font-black uppercase tracking-[4px] text-gold/80 mt-1.5 flex items-center gap-2">
              <span className="w-4 h-px bg-gold/50" />
              GLOBAL HUB
              <span className="w-4 h-px bg-gold/50" />
            </p>
          </div>
        </div>

        {/* 🚀 RIGHT: ACCESS & LANGUAGE */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>

          <button
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-gold via-yellow-500 to-gold text-royal-dark font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30 group"
          >
            <Heart className="w-3 h-3 group-hover:fill-current transition-colors" />
            <span className="hidden sm:inline">NGO Connect</span>
            <ShieldCheck className="w-3 h-3 sm:hidden" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
