import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, MessageSquare, Sparkles } from 'lucide-react';

const ZIARAWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ZIARA', text: 'Hello! I am ZIARA, your AI Teacher. What would you like to learn today? 🤖' }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: message }]);
    const currentMessage = message;
    setMessage('');
    
    setIsThinking(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          sender: 'ZIARA', 
          text: `I've analyzed your query about "${currentMessage}". As your AI tutor, I recommend exploring our Robotics Lab or the AI Counselor hub for deeper insights. Full adaptive learning paths are being generated! 🚀` 
        }
      ]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating ZIARA Button */}
      <div className="fixed bottom-28 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-royal flex items-center justify-center text-white text-2xl shadow-[0_0_30px_rgba(106,13,173,0.5)] border-2 border-gold/50 relative overflow-hidden group"
          title="Chat with AI Teacher ZIARA"
        >
          <div className="absolute inset-0 bg-gold/10 group-hover:bg-gold/20 transition-colors" />
          <Bot className="w-8 h-8 relative z-10" />
          
          <div className="absolute inset-0 rounded-full border-2 border-gold animate-ping opacity-20" />
        </motion.button>
      </div>

      {/* ZIARA Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="fixed bottom-48 right-8 w-96 max-w-[calc(100vw-4rem)] z-50"
          >
            <div className="glass-strong rounded-[32px] overflow-hidden border-2 border-gold shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              {/* Header */}
              <div className="bg-gradient-royal p-6 flex items-center justify-between border-b border-gold/20">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gold/20 backdrop-blur-md p-1 border border-gold/40">
                      <img 
                        src="https://customer-assets.emergentagent.com/job_ai-learning-hub-363/artifacts/0z197gja_AI%20Mentor%20ZIARA.jpeg"
                        alt="AI Teacher ZIARA"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-royal rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-lg tracking-tight">ZIARA AI</h3>
                    <p className="text-gold-light text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Smart Adaptive Assistant
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-royal-dark/95 scrollbar-hide">
                {messages.map((msg, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gold text-royal-dark rounded-tr-none shadow-lg shadow-gold/10'
                          : 'glass border border-white/10 text-white rounded-tl-none'
                      }`}
                    >
                      {msg.sender === 'ZIARA' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-3 h-3 text-gold" />
                          <span className="text-gold text-[8px] font-black uppercase tracking-widest">ZIARA CORE</span>
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="glass border border-white/10 p-4 rounded-2xl rounded-tl-none">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white/5 border-t border-white/10">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask ZIARA anything..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                  <button
                    onClick={sendMessage}
                    className="w-14 h-14 bg-gradient-royal rounded-2xl flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all border border-white/20"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-royal rounded-full animate-ping" />
                  <p className="text-[8px] font-black uppercase tracking-[3px] text-white/30">
                    Neural Engine Online
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZIARAWidget;
