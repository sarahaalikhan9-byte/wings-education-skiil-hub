import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Mic, 
  Lock, 
  Check, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Globe, 
  Settings, 
  Power,
  CircleStop,
  Fingerprint
} from 'lucide-react';

const HiddenCommandCenter = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [authLayer, setAuthLayer] = useState(1);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [listening, setListening] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [pressStart, setPressStart] = useState(0);

  // Stealth auto-logout
  useEffect(() => {
    if (isAuthenticated) {
      const checkInactivity = () => {
        const now = Date.now();
        if (now - lastActivity > 5 * 60 * 1000) handleLogout();
      };

      inactivityTimer.current = setInterval(checkInactivity, 10000);
      const resetTimer = () => setLastActivity(Date.now());
      
      const events = ['mousemove', 'keypress', 'click', 'touchstart'];
      events.forEach(e => window.addEventListener(e, resetTimer));

      return () => {
        if (inactivityTimer.current) clearInterval(inactivityTimer.current);
        events.forEach(e => window.removeEventListener(e, resetTimer));
      };
    }
  }, [isAuthenticated, lastActivity]);

  const handleLogoLongPress = () => {
    setShowAuth(true);
  };

  const handleMouseDown = () => {
    setPressStart(Date.now());
    longPressTimer.current = setTimeout(handleLogoLongPress, 3000);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice engine restricted');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    
    setListening(true);

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setVoiceCommand(command);
      setListening(false);

      if (command.includes('wings') && command.includes('master') && command.includes('access')) {
        setTimeout(() => setAuthLayer(2), 500);
      } else {
        setVoiceCommand('Verification Denied');
        setTimeout(() => setVoiceCommand(''), 2000);
      }
    };

    recognition.onerror = () => setListening(false);
    recognition.start();
  };

  const verifyPassword = () => {
    if (password === 'WINGS_GLOBAL_2025') {
      setAuthLayer(3);
    } else {
      setPassword('');
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) setPin(prev => prev + digit);
  };

  const verifyPin = () => {
    if (pin === '777888') {
      setIsAuthenticated(true);
      setShowAuth(false);
      setShowDashboard(true);
      setLastActivity(Date.now());
    } else {
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowDashboard(false);
    setShowAuth(false);
    setAuthLayer(1);
    setVoiceCommand('');
    setPassword('');
    setPin('');
  };

  if (showDashboard && isAuthenticated) {
    return <CommandCenterDashboard onLogout={handleLogout} />;
  }

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className="cursor-pointer select-none"
      >
        <h1 className="text-xl md:text-2xl font-black italic tracking-tighter">
          <span className="text-gradient">WINGS</span>
          <span className="text-text-main ml-1">GLOBAL</span>
        </h1>
      </div>

      <AnimatePresence>
        {showAuth && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/95 backdrop-blur-3xl"
          >
            <div className="w-full max-w-sm px-6">
              {authLayer === 1 && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-strong rounded-[40px] p-8 border-2 border-royal/30 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-8 bg-royal/10 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(106,13,173,0.3)]">
                    <Mic className="text-royal w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Voice ID</h2>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-8">Security Layer 01/03</p>

                  <button
                    onClick={startVoiceRecognition}
                    disabled={listening}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[4px] text-xs transition-all ${
                      listening
                        ? 'bg-red-500/50 text-white animate-pulse'
                        : 'bg-royal text-white hover:shadow-[0_0_20px_rgba(106,13,173,0.5)]'
                    }`}
                  >
                    {listening ? 'Intercepting Voice...' : 'Initiate Scan'}
                  </button>

                  <p className="mt-6 font-mono text-[10px] text-royal uppercase tracking-widest min-h-[1rem]">
                    {voiceCommand}
                  </p>

                  <button onClick={() => setShowAuth(false)} className="mt-8 text-white/20 hover:text-white uppercase text-[8px] font-black tracking-widest transition-colors">Terminiate Protocol</button>
                </motion.div>
              )}

              {authLayer === 2 && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-strong rounded-[40px] p-8 border-2 border-gold/30 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-8 bg-gold/10 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <Lock className="text-gold w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Master Key</h2>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-8">Security Layer 02/03</p>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
                    placeholder="ACCESS CODE"
                    className="w-full bg-white/5 border-2 border-gold/20 rounded-2xl px-4 py-5 text-gold text-center text-xl font-mono tracking-widest placeholder:text-white/10 focus:outline-none focus:border-gold transition-all mb-4"
                    autoFocus
                  />

                  <button
                    onClick={verifyPassword}
                    className="w-full bg-gold text-royal-dark py-5 rounded-2xl font-black uppercase tracking-[4px] text-xs shadow-xl active:scale-95 transition-all"
                  >
                    Authenticate
                  </button>

                  <button onClick={() => setShowAuth(false)} className="mt-8 text-white/20 hover:text-white uppercase text-[8px] font-black tracking-widest transition-colors">Terminiate Protocol</button>
                </motion.div>
              )}

              {authLayer === 3 && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-strong rounded-[40px] p-8 border-2 border-green-500/30 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-8 bg-green-500/10 rounded-full flex items-center justify-center animate-pulse">
                    <Fingerprint className="text-green-500 w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Neural PIN</h2>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-8">Final Verification 03/03</p>

                  <div className="flex justify-center gap-3 mb-8">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
                          i < pin.length ? 'bg-gold border-gold shadow-lg shadow-gold/20' : 'bg-white/5 border-white/10'
                        }`}
                      >
                        {i < pin.length && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                      <button
                        key={digit}
                        onClick={() => handlePinInput(digit.toString())}
                        className="w-full aspect-square border border-white/10 rounded-2xl text-white font-bold text-xl hover:bg-white/10 active:bg-white/5 transition-colors"
                      >
                        {digit}
                      </button>
                    ))}
                    <button onClick={() => setPin('')} className="aspect-square flex items-center justify-center text-red-400 hover:bg-red-500/10 rounded-2xl"><CircleStop /></button>
                    <button onClick={() => handlePinInput('0')} className="aspect-square flex items-center justify-center text-white font-bold text-xl hover:bg-white/10 rounded-2xl">0</button>
                    <button onClick={verifyPin} className="aspect-square flex items-center justify-center text-green-400 hover:bg-green-500/10 rounded-2xl"><Check /></button>
                  </div>

                  <button onClick={() => setShowAuth(false)} className="text-white/20 hover:text-white uppercase text-[8px] font-black tracking-widest transition-colors">Terminiate Protocol</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CommandCenterDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [finance] = useState({ income: 1250000, expenses: 450000 });
  const [activeBoards, setActiveBoards] = useState({
    CBSE: true, ICSE: true, State: true, IB: false, Cambridge: true, NIOS: true, IGNOU: false
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 overflow-y-auto selection:bg-gold selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-royal/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass-strong p-8 rounded-[40px] border border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-gold w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[5px] text-gold">Master Control</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight italic">COMMAND <span className="text-gradient">CENTER</span></h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all"
          >
            <Power className="w-4 h-4" />
            Secure Disconnect
          </button>
        </div>

        {/* Global Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Revenue (Monthly)', val: '₹12.5L', sub: '+14%', icon: TrendingUp, color: 'text-green-400', border: 'border-green-500/30' },
            { label: 'Burn Rate', val: '₹4.5L', sub: '-2%', icon: TrendingDown, color: 'text-red-400', border: 'border-red-500/30' },
            { label: 'Active Learners', val: '12,543', sub: '+850 today', icon: Users, color: 'text-royal-light', border: 'border-royal/30' },
            { label: 'Global Nodes', val: '15', sub: 'Countries', icon: Globe, color: 'text-gold-light', border: 'border-gold/30' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-strong p-6 rounded-[32px] border ${stat.border}`}
            >
              <div className="flex justify-between items-start mb-4">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className={`text-[10px] font-black ${stat.color}`}>{stat.sub}</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black italic">{stat.val}</h3>
            </motion.div>
          ))}
        </div>

        {/* Deep Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-strong p-8 rounded-[40px] border border-white/10">
            <h2 className="text-xl font-black mb-8 uppercase tracking-[3px] flex items-center gap-3">
              <Settings className="text-gold w-5 h-5" />
              Regional Toggles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(activeBoards).map(([board, isActive]) => (
                <button
                  key={board}
                  onClick={() => setActiveBoards(prev => ({ ...prev, [board]: !isActive }))}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                    isActive ? 'bg-royal/10 border-royal/40' : 'bg-white/5 border-white/5'
                  }`}
                >
                  <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-white/30'}`}>{board} Board</span>
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500/30'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="glass-strong p-8 rounded-[40px] border border-white/10 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
            <Globe className="w-24 h-24 text-gold mb-6 animate-[spin_20s_linear_infinite]" />
            <h2 className="text-2xl font-black italic mb-2 tracking-tight">GLOBAL OPERATIONS SCAN</h2>
            <p className="text-white/40 text-[10px] uppercase tracking-[4px] mb-8">Node Sync: 100% Operational</p>
            <div className="flex gap-4">
              <div className="w-16 h-1 bg-gold/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-gold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiddenCommandCenter;
