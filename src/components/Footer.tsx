import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="py-16 px-8 lg:px-20 border-t border-purple-border/30 glass-nav">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
           <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-royal rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg shadow-royal/20">W</div>
            <span className="font-bold text-lg text-text-main">WINGS <span className="text-royal">GLOBAL</span></span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            The pioneer in AI-assisted global education, helping students fly towards their professional dreams.
          </p>
        </div>
        
        <div>
          <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-royal">Hubs</h5>
          <ul className="space-y-3 text-sm text-text-muted">
            <li className="hover:text-royal cursor-pointer transition-colors">Learning Hub</li>
            <li className="hover:text-royal cursor-pointer transition-colors">Exam Hub</li>
            <li className="hover:text-royal cursor-pointer transition-colors">AI Tutor</li>
            <li className="hover:text-royal cursor-pointer transition-colors">Skill Hub</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-royal">Academy Gateways</h5>
          <ul className="space-y-3 text-sm text-text-muted">
            <li onClick={() => navigate("/parent-dashboard")} className="hover:text-royal cursor-pointer transition-colors">Parent Portal</li>
            <li onClick={() => navigate("/admin-portal")} className="hover:text-red-500 cursor-pointer transition-colors">D.E.O. Official Portal</li>
            <li onClick={() => navigate("/login")} className="hover:text-royal cursor-pointer transition-colors">Student Login</li>
            <li onClick={() => navigate("/dashboard")} className="hover:text-royal cursor-pointer transition-colors">Institutional Admin</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-royal">Newsletter</h5>
          <p className="text-xs text-text-muted mb-4 tracking-wider uppercase">Stay updated with AI releases</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="flex-1 bg-white border border-purple-border rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-royal/50" />
            <button className="bg-gradient-royal text-white px-4 py-2 rounded-lg text-xs font-bold uppercase">Join</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-purple-border/30 text-center text-text-muted/30 text-[10px] uppercase tracking-[4px]">
        &copy; 2026 WINGS GLOBAL AI EDUCATION. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
