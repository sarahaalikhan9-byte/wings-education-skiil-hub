import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShieldAlert } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import HiddenCommandCenter from "./HiddenCommandCenter";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Hidden admin access
  const showAdminButton = false; 

  return (
    <nav className="glass-nav sticky top-0 z-50 px-4 md:px-8 h-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        
        <div className="hidden lg:flex items-center justify-center flex-1 gap-1">
          <button onClick={() => navigate("/")} className={`nav-pill ${isActive("/") ? "active" : ""}`}>HOME</button>
          <button onClick={() => navigate("/education-hub")} className={`nav-pill ${isActive("/education-hub") ? "active" : ""}`}>EDU-HUB</button>
          <button onClick={() => navigate("/master-skill-hub")} className={`nav-pill ${isActive("/master-skill-hub") ? "active" : ""}`}>SKILL-HUB</button>
          <button onClick={() => navigate("/competitive-exam")} className={`nav-pill ${isActive("/competitive-exam") ? "active" : ""}`}>COMPETITIVE</button>
          <button onClick={() => navigate("/parent-dashboard")} className={`nav-pill ${isActive("/parent-dashboard") ? "active" : ""}`}>PARENT HUB</button>
          <button onClick={() => navigate("/financial-hub")} className={`nav-pill ${isActive("/financial-hub") ? "active" : ""}`}>FINANCE HUB</button>
          <button onClick={() => navigate("/video-creator")} className={`nav-pill ${isActive("/video-creator") ? "active" : ""}`}>STUDIO</button>
          <button onClick={() => navigate("/pre-primary")} className={`nav-pill ${isActive("/pre-primary") ? "active" : ""}`}>PRE-PRIMARY</button>
          <button onClick={() => navigate("/login")} className={`nav-pill-gold ${isActive("/login") ? "active" : ""}`}>LOGIN</button>
        </div>

        {/* 📱 Mobile Toggle & Language (Always Visible) */}
        <div className="lg:hidden flex items-center gap-3">
           <LanguageSelector />
           <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-gold hover:bg-white/5 rounded-lg transition-colors border border-gold/20"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl p-6 border-b border-gold/20 flex flex-col gap-2 z-[100]">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
             <div className="w-10 h-10 bg-gradient-royal rounded-xl flex items-center justify-center text-white border border-gold/30">W</div>
             <span className="text-sm font-black italic uppercase italic tracking-[3px] text-white">Wings Mobile Portal</span>
          </div>
          <button onClick={() => { navigate("/"); setIsMobileMenuOpen(false); }} className={`mobile-btn ${isActive("/") ? "text-gold" : ""}`}>HOME</button>
          <button onClick={() => { navigate("/education-hub"); setIsMobileMenuOpen(false); }} className={`mobile-btn ${isActive("/education-hub") ? "text-gold" : ""}`}>EDU-HUB</button>
          <button onClick={() => { navigate("/master-skill-hub"); setIsMobileMenuOpen(false); }} className={`mobile-btn ${isActive("/master-skill-hub") ? "text-gold" : ""}`}>SKILL HUB</button>
          <button onClick={() => { navigate("/competitive-exam"); setIsMobileMenuOpen(false); }} className={`mobile-btn ${isActive("/competitive-exam") ? "text-gold" : ""}`}>COMPETITIVE</button>
          <button onClick={() => { navigate("/parent-dashboard"); setIsMobileMenuOpen(false); }} className={`mobile-btn ${isActive("/parent-dashboard") ? "text-gold" : ""}`}>PARENT HUB</button>
          <button onClick={() => { navigate("/financial-hub"); setIsMobileMenuOpen(false); }} className={`mobile-btn ${isActive("/financial-hub") ? "text-gold" : ""}`}>FINANCE</button>
          <button onClick={() => { navigate("/video-creator"); setIsMobileMenuOpen(false); }} className={`mobile-btn ${isActive("/video-creator") ? "text-gold" : ""}`}>STUDIO</button>
          
          {/* Mobile Admin (Hidden) */}
          {showAdminButton && (
            <button
              onClick={() => { navigate("/dashboard"); setIsMobileMenuOpen(false); }}
              className="mobile-btn text-red-500 flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>ADMIN PANEL</span>
            </button>
          )}

          <div className="h-px bg-white/10 my-2" />
          
          <button
            onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
            className="mobile-btn text-gold text-center"
          >
            LOGIN
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
