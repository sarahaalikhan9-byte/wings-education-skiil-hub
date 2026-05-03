import React, { useState } from 'react';

interface AccessibilitySidebarProps {
  onOpenSignLanguage?: () => void;
}

const AccessibilitySidebar: React.FC<AccessibilitySidebarProps> = ({ onOpenSignLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 16,
    highContrast: false,
    voiceCommands: false,
    screenReader: false,
    textToSpeech: false,
    brailleDisplay: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    console.log(`${String(key)} ${!settings[key] ? 'enabled' : 'disabled'}`);
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(12, Math.min(24, settings.fontSize + delta));
    setSettings(prev => ({ ...prev, fontSize: newSize }));
    document.documentElement.style.fontSize = newSize + 'px';
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-royal text-white px-3 py-6 rounded-r-xl hover:glow-gold transition-all duration-300 flex flex-col items-center gap-2 shadow-2xl border-y border-r border-gold/30"
        title="Accessibility Settings"
        aria-label="Open Accessibility Menu"
      >
        <i className="fas fa-universal-access text-2xl text-gold"></i>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>ACCESS</span>
      </button>

      {/* Accessibility Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-slide-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar Panel */}
          <div className="fixed left-0 top-0 h-full w-80 max-w-[90vw] glass-strong border-r-2 border-gold z-50 overflow-y-auto animate-slide-in">
            {/* Header */}
            <div className="bg-gradient-royal p-6 sticky top-0 z-10 border-b border-gold/20">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">Accessibility</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close Accessibility Menu"
                >
                  <i className="fas fa-times text-xl text-white"></i>
                </button>
              </div>
              <p className="text-gold-light text-[10px] uppercase tracking-[2px] font-bold">Quick Access Settings</p>
            </div>

            {/* Settings */}
            <div className="p-6 space-y-6">
              {/* Font Size Control */}
              <div className="glass p-5 rounded-2xl border border-purple-border/30">
                <h3 className="text-text-main font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <i className="fas fa-text-height text-royal"></i>
                  Text Size
                </h3>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => adjustFontSize(-1)}
                    className="w-12 h-12 glass rounded-xl text-royal border border-purple-border hover:border-gold transition-all flex items-center justify-center"
                    aria-label="Decrease Font Size"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="text-text-main font-black text-xl">{settings.fontSize}px</span>
                  <button
                    onClick={() => adjustFontSize(1)}
                    className="w-12 h-12 glass rounded-xl text-royal border border-purple-border hover:border-gold transition-all flex items-center justify-center"
                    aria-label="Increase Font Size"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              {/* Toggle Settings */}
              <div className="space-y-3">
                {[
                  { id: 'highContrast', icon: 'fa-adjust', label: 'High Contrast', sub: 'Better visibility' },
                  { id: 'voiceCommands', icon: 'fa-microphone', label: 'Voice Control', sub: 'Hands-free control' },
                  { id: 'screenReader', icon: 'fa-eye', label: 'Screen Reader', sub: 'Audio descriptions' },
                  { id: 'textToSpeech', icon: 'fa-volume-up', label: 'Text to Speech', sub: 'Read content aloud' },
                  { id: 'brailleDisplay', icon: 'fa-braille', label: 'Braille Hub', sub: 'For visually impaired' }
                ].map((item) => (
                  <div key={item.id} className="glass p-4 rounded-xl border border-purple-border/30 flex items-center justify-between hover:border-royal/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-royal/5 flex items-center justify-center">
                        <i className={`fas ${item.icon} text-royal text-lg`}></i>
                      </div>
                      <div>
                        <p className="text-text-main font-bold text-sm tracking-tight">{item.label}</p>
                        <p className="text-text-muted text-[10px] uppercase tracking-tighter">{item.sub}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSetting(item.id as keyof typeof settings)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                        settings[item.id as keyof typeof settings] ? 'bg-royal shadow-inner' : 'bg-gray-200'
                      }`}
                      aria-label={`Toggle ${item.label}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-md ${
                        settings[item.id as keyof typeof settings] ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="glass p-5 rounded-2xl border border-purple-border/30">
                <h3 className="text-text-main font-bold mb-4 text-sm uppercase tracking-wider">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => onOpenSignLanguage && onOpenSignLanguage()}
                    className="w-full glass py-3 rounded-xl text-royal font-bold hover:bg-royal/5 transition-all text-left px-4 border border-purple-border/30 flex items-center gap-3 text-sm"
                  >
                    <i className="fas fa-hands-asl-interpreting text-gold"></i>
                    Sign Language Hub
                  </button>
                  <button className="w-full glass py-3 rounded-xl text-royal font-bold hover:bg-royal/5 transition-all text-left px-4 border border-purple-border/30 flex items-center gap-3 text-sm">
                    <i className="fas fa-keyboard text-gold"></i>
                    Keyboard Shortcuts
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-8 text-center border-t border-purple-border/30">
              <p className="text-[10px] uppercase tracking-[3px] text-text-muted font-bold">Wings Accessibility Suite</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AccessibilitySidebar;
