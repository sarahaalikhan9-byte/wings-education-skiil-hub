import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, Eraser, Trash2, Mic, 
  Wind, Sparkles, ArrowLeft, Download,
  Volume2, MousePointer2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrePrimaryLab = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const airCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#FFD700");
  const [brushSize, setBrushSize] = useState(10);
  const [activeTab, setActiveTab] = useState<"draw" | "air">("draw");
  const [isListening, setIsListening] = useState(false);
  const [lastVoiceCommand, setLastVoiceCommand] = useState("");

  const colors = [
    { name: "Royal Red", value: "#C41E3A" },
    { name: "Gold", value: "#FFD700" },
    { name: "Sky Blue", value: "#00BFFF" },
    { name: "Emerald", value: "#50C878" },
    { name: "Magic Purple", value: "#9370DB" },
    { name: "Sunset Orange", value: "#FF4500" }
  ];

  // Voice Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        setLastVoiceCommand(command);
        handleVoiceCommand(command);
      };

      if (isListening) recognition.start();
      return () => recognition.stop();
    }
  }, [isListening]);

  const handleVoiceCommand = (command: string) => {
    if (command.includes("red")) setBrushColor("#C41E3A");
    if (command.includes("gold") || command.includes("yellow")) setBrushColor("#FFD700");
    if (command.includes("blue")) setBrushColor("#00BFFF");
    if (command.includes("green")) setBrushColor("#50C878");
    if (command.includes("clear") || command.includes("clean")) clearCanvas();
    if (command.includes("bigger") || command.includes("thick")) setBrushSize(prev => Math.min(prev + 5, 50));
    if (command.includes("smaller") || command.includes("thin")) setBrushSize(prev => Math.max(prev - 5, 2));
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = activeTab === "draw" ? canvasRef.current?.getContext("2d") : airCanvasRef.current?.getContext("2d");
    ctx?.beginPath();
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = activeTab === "draw" ? canvasRef.current : airCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0].clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0].clientY) - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    // Air writing effect
    if (activeTab === "air") {
      ctx.shadowBlur = 15;
      ctx.shadowColor = brushColor;
    } else {
      ctx.shadowBlur = 0;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = activeTab === "draw" ? canvasRef.current : airCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="min-h-screen midnight-black text-white p-6 lg:p-12 overflow-hidden">
      {/* 🏆 Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate("/")}
            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[8px] text-gold/60">Node: Pre-Primary</span>
            <h1 className="text-4xl font-black italic uppercase italic tracking-tighter">
              Creative <span className="text-red-600">Sync</span> Lab
            </h1>
          </div>
        </div>

        <div className="flex bg-white/5 border border-white/10 p-2 rounded-3xl backdrop-blur-3xl">
          <button 
            onClick={() => setActiveTab("draw")}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'draw' ? 'bg-gold text-black shadow-xl shadow-gold/20' : 'text-white/40 hover:text-white'}`}
          >
            <Palette className="inline-block mr-2 w-4 h-4" /> Neural Canvas
          </button>
          <button 
            onClick={() => setActiveTab("air")}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'air' ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'text-white/40 hover:text-white'}`}
          >
            <Wind className="inline-block mr-2 w-4 h-4" /> Air Writing
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-[70vh]">
        
        {/* 🎨 Sidebar Tools */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-dark p-8 rounded-[40px] border border-white/10 border-gold/20">
            <h3 className="text-[8px] font-black uppercase tracking-[5px] text-white/40 mb-6 italic">Color Spectrum</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {colors.map(color => (
                <button 
                  key={color.value}
                  onClick={() => setBrushColor(color.value)}
                  className={`w-full aspect-square rounded-2xl transition-all border-2 ${brushColor === color.value ? 'border-white scale-110 shadow-lg' : 'border-black/20 hover:scale-105'}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>

            <h3 className="text-[8px] font-black uppercase tracking-[5px] text-white/40 mb-4 italic">Stroke Intensity</h3>
            <input 
              type="range" 
              min="2" 
              max="50" 
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full accent-gold bg-white/5 rounded-full h-2 mb-8"
            />

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={clearCanvas}
                className="py-4 rounded-2xl bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest hover:bg-red-600 transition-all flex flex-col items-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
              <button 
                className="py-4 rounded-2xl bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all flex flex-col items-center gap-2"
              >
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          {/* 🎙️ Voice Control Module */}
          <div className="glass-dark p-8 rounded-[40px] border border-white/10 relative overflow-hidden group">
            <div className={`absolute inset-0 bg-red-600/5 transition-opacity ${isListening ? 'opacity-100' : 'opacity-0'}`} />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-[8px] font-black uppercase tracking-[5px] text-white/40 italic">Voice Link</h3>
              <button 
                onClick={() => setIsListening(!isListening)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-white/5 text-white/40 border border-white/10'}`}
              >
                <Mic size={16} />
              </button>
            </div>
            
            <div className="text-center relative z-10">
               {isListening ? (
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase text-red-500 animate-pulse tracking-widest">Listening for Colors...</p>
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ height: [4, 16, 4] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          className="w-1 bg-red-600 rounded-full"
                        />
                      ))}
                    </div>
                    {lastVoiceCommand && (
                      <p className="text-[8px] font-bold text-white/60 italic uppercase tracking-widest bg-white/5 p-2 rounded-lg">Last Sync: "{lastVoiceCommand}"</p>
                    )}
                 </div>
               ) : (
                 <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest leading-relaxed">
                   Say names like <span className="text-gold">"Gold"</span>, <span className="text-red-500">"Red"</span>, or <span className="text-blue-400">"Clear"</span> to control your brush.
                 </p>
               )}
            </div>
          </div>
        </div>

        {/* 🖌️ Canvas Area */}
        <div className="lg:col-span-9 relative">
          <div className="absolute inset-0 bg-white shadow-inner rounded-[50px] overflow-hidden">
             {activeTab === "draw" ? (
               <canvas 
                ref={canvasRef}
                width={2000}
                height={2000}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                className="w-full h-full cursor-crosshair"
               />
             ) : (
               <div className="w-full h-full bg-[#0a0a0a] relative flex items-center justify-center">
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                     <div className="grid grid-cols-20 h-full border-white/5">
                        {[...Array(400)].map((_, i) => (
                          <div key={i} className="border-[0.5px] border-white/5" />
                        ))}
                     </div>
                  </div>
                  <canvas 
                    ref={airCanvasRef}
                    width={2000}
                    height={2000}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseMove={draw}
                    className="w-full h-full cursor-none relative z-10"
                  />
                  
                  {/* Digital Brush Pointer for Air Writing */}
                  <motion.div 
                    className="absolute pointer-events-none z-50 rounded-full blur-xl"
                    style={{ 
                      width: brushSize * 4, 
                      height: brushSize * 4, 
                      backgroundColor: brushColor,
                      opacity: 0.3
                    }}
                  />
                  
                  <div className="absolute top-10 left-10 pointer-events-none">
                     <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                        <span className="text-[10px] font-black uppercase tracking-[5px] text-white/40">Air Capture Mode: Active</span>
                     </div>
                  </div>
               </div>
             )}
          </div>

          <div className="absolute bottom-8 right-8 flex gap-4">
            <div className="glass-dark p-4 rounded-3xl border border-white/10 flex items-center gap-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: brushColor }} />
                <span className="text-[8px] font-black uppercase italic text-white/60 tracking-widest">{activeTab.toUpperCase()} ACTIVE</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="text-[8px] font-black text-gold uppercase tracking-[3px]">Size: {brushSize}px</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 Educational Floating Tooltip */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 glass-strong px-12 py-6 rounded-full border border-gold/30 shadow-3xl text-center z-50 flex items-center gap-8"
      >
        <Sparkles className="text-gold w-6 h-6 animate-spin" />
        <div className="text-left">
           <h4 className="text-[10px] font-black uppercase italic text-white tracking-widest">Neuro-Creative Stimulation</h4>
           <p className="text-[8px] font-bold text-white/40 uppercase tracking-[3px]">Air Writing develops spatial intelligence & neural-motor pathways.</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold cursor-help transition-colors">
              <Volume2 size={16} />
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrePrimaryLab;
