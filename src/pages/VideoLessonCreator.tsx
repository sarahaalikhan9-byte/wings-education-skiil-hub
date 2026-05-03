import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Video, 
  Plus, 
  Trash2, 
  Play, 
  Mic, 
  Eye, 
  Download, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Settings2
} from "lucide-react";
import { motion } from "motion/react";

const VideoLessonCreator = () => {
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState({
    title: "",
    subject: "Science",
    class: "Class 6",
    slides: [""]
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);
  const [voiceSettings, setVoiceSettings] = useState({
    voice: "female",
    speed: 1,
    pitch: 1
  });

  const subjects = ["Science", "Mathematics", "English", "Social Studies", "Hindi", "Computer Science"];
  const classes = ["Pre-Primary", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

  const handleInputChange = (field: string, value: string) => {
    setLessonData(prev => ({ ...prev, [field]: value }));
  };

  const handleSlideChange = (index: number, value: string) => {
    const newSlides = [...lessonData.slides];
    newSlides[index] = value;
    setLessonData(prev => ({ ...prev, slides: newSlides }));
  };

  const addSlide = () => {
    setLessonData(prev => ({ ...prev, slides: [...prev.slides, ""] }));
  };

  const removeSlide = (index: number) => {
    if (lessonData.slides.length > 1) {
      const newSlides = lessonData.slides.filter((_, i) => i !== index);
      setLessonData(prev => ({ ...prev, slides: newSlides }));
      if (currentSlide >= newSlides.length) setCurrentSlide(newSlides.length - 1);
    }
  };

  const [isPublishing, setIsPublishing] = useState(false);
  const [youtubeMetadata, setYoutubeMetadata] = useState({
    privacy: "private",
    tags: "",
    category: "Education"
  });

  const handlePublishToYouTube = () => {
    setIsPublishing(true);
    // Simulate real API integration
    setTimeout(() => {
      alert("Successfully queued for YouTube upload! Check your channel in a few minutes.");
      setIsPublishing(false);
    }, 4000);
  };

  const generateVideoPreview = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedVideo({
        url: "#",
        duration: lessonData.slides.length * 10,
        size: "2.5 MB"
      });
      setIsGenerating(false);
    }, 3000);
  };

  const speakSlide = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = voiceSettings.speed;
      utterance.pitch = voiceSettings.pitch;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-purple-500 selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-600 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              VIDEO <span className="text-purple-500">ENGINE</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[10px] text-white/30 mt-4">
              AI-Synthesis & Educational MP4 Generator
            </p>
          </motion.div>
          
          <div className="flex gap-4">
            <button onClick={() => navigate("/")} className="glass px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-all">
              <ArrowLeft size={16} /> Exit Studio
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12">
          {/* Creator Area */}
          <div className="space-y-12">
            {/* Metadata */}
            <div className="glass-strong rounded-[50px] p-10 border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Lesson Identity</label>
                    <input 
                      type="text" 
                      placeholder="E.g., Quantum Synthesis v1"
                      value={lessonData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 italic font-black uppercase tracking-widest text-sm focus:border-purple-500/50 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Subject Node</label>
                      <select 
                        value={lessonData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 italic font-black uppercase tracking-widest text-[10px] focus:border-purple-500/50 outline-none"
                      >
                         {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Vector Level</label>
                      <select 
                        value={lessonData.class}
                        onChange={(e) => handleInputChange("class", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 italic font-black uppercase tracking-widest text-[10px] focus:border-purple-500/50 outline-none"
                      >
                         {classes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
               </div>
            </div>

            {/* Slide Editor */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-4">
                  <h3 className="text-xl font-black italic uppercase italic flex items-center gap-3">
                    <Layers className="text-purple-500" size={20} /> Slide Architect
                  </h3>
                  <button onClick={addSlide} className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:scale-110 transition-all shadow-xl">
                    <Plus size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {lessonData.slides.map((slide, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`glass-strong rounded-[40px] p-8 border transition-all ${currentSlide === index ? 'border-purple-500 bg-purple-500/5' : 'border-white/5'}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Slide 0{index + 1}</span>
                        <div className="flex gap-2">
                           <button onClick={() => speakSlide(slide)} className="p-2 text-white/20 hover:text-white transition-colors"><Mic size={14} /></button>
                           {lessonData.slides.length > 1 && (
                             <button onClick={() => removeSlide(index)} className="p-2 text-white/20 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                           )}
                        </div>
                      </div>
                      <textarea 
                        value={slide}
                        onClick={() => setCurrentSlide(index)}
                        onChange={(e) => handleSlideChange(index, e.target.value)}
                        placeholder="Define learning vector parameters..."
                        className="w-full bg-transparent border-none resize-none italic font-bold text-lg focus:outline-none placeholder:text-white/5 min-h-[100px]"
                      />
                    </motion.div>
                  ))}
                </div>
            </div>
          </div>

          {/* Synthesis Panel */}
          <div className="space-y-8">
            <div className="glass-strong rounded-[50px] p-10 border border-white/5 sticky top-32">
                <h3 className="text-xl font-black italic uppercase italic mb-8 flex items-center gap-3">
                   <Eye className="text-purple-500" size={20} /> Engine Preview
                </h3>

                <div className="aspect-video bg-black/40 rounded-[30px] mb-8 border border-white/5 overflow-hidden flex flex-col items-center justify-center text-center p-8 relative">
                   <div className="absolute top-4 left-4 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Synth-Output</span>
                   </div>
                   
                   <div className="space-y-4">
                      <h4 className="text-xl font-black italic uppercase italic text-purple-500">{lessonData.title || "Untitled Sequence"}</h4>
                      <p className="text-xs font-medium italic opacity-60 max-w-[80%] mx-auto">{lessonData.slides[currentSlide] || "Parameter Input Required"}</p>
                   </div>

                   <div className="absolute bottom-6 flex items-center gap-6">
                      <button onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))} className="text-white/20 hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-500">0{currentSlide + 1} / 0{lessonData.slides.length}</span>
                      <button onClick={() => setCurrentSlide(prev => Math.min(lessonData.slides.length - 1, prev + 1))} className="text-white/20 hover:text-white transition-colors"><ChevronRight size={20} /></button>
                   </div>
                </div>

                <div className="space-y-8 mb-12">
                   <div className="flex items-center justify-between px-2">
                       <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40">Voice Synthesis Node</h5>
                       <Settings2 size={14} className="text-white/20" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      {["female", "male"].map(v => (
                        <button 
                          key={v}
                          onClick={() => setVoiceSettings(prev => ({ ...prev, voice: v }))}
                          className={`py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${voiceSettings.voice === v ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                        >
                          {v}
                        </button>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={generateVideoPreview}
                  disabled={isGenerating || !lessonData.title}
                  className="w-full py-6 rounded-3xl bg-purple-600 text-white font-black uppercase tracking-[5px] text-[10px] shadow-2xl hover:bg-purple-700 transition-all flex items-center justify-center gap-4 disabled:opacity-20"
                >
                  {isGenerating ? (
                    <span className="animate-pulse">Synthesizing...</span>
                  ) : (
                    <> <Sparkles size={16} /> Ignite AI Engine </>
                  )}
                </button>

                {generatedVideo && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 space-y-6"
                  >
                    <div className="p-8 rounded-[40px] bg-red-600/10 border border-red-500/20">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
                           <Video size={20} />
                        </div>
                        <h4 className="text-lg font-black italic uppercase italic text-red-500">YouTube Sync Hub</h4>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div>
                          <label className="text-[8px] font-black uppercase tracking-widest text-white/20 ml-2">Privacy Status</label>
                          <select 
                            value={youtubeMetadata.privacy}
                            onChange={(e) => setYoutubeMetadata({...youtubeMetadata, privacy: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3 italic font-black uppercase tracking-widest text-[10px] focus:border-red-500/50 outline-none mt-2"
                          >
                            <option value="private">Private</option>
                            <option value="unlisted">Unlisted</option>
                            <option value="public">Public</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[8px] font-black uppercase tracking-widest text-white/20 ml-2">Search Tags</label>
                          <input 
                            type="text"
                            placeholder="Education, AI, Math..."
                            value={youtubeMetadata.tags}
                            onChange={(e) => setYoutubeMetadata({...youtubeMetadata, tags: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3 italic font-black uppercase tracking-widest text-[10px] focus:border-red-500/50 outline-none mt-2"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={handlePublishToYouTube}
                        disabled={isPublishing}
                        className="w-full py-5 rounded-3xl bg-red-600 text-white font-black uppercase tracking-[5px] text-[10px] shadow-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-4 disabled:opacity-20"
                      >
                        {isPublishing ? (
                          <span className="animate-pulse">Broadcasting to YouTube...</span>
                        ) : (
                          <> <Play size={16} fill="white" /> Publish to Channel </>
                        )}
                      </button>
                    </div>

                    <div className="p-6 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-between"
                  >
                    <div>
                      <h6 className="text-[10px] font-black uppercase tracking-widest text-green-500 mb-1">Sequence Compiled</h6>
                      <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{generatedVideo.duration}s • {generatedVideo.size}</p>
                    </div>
                    <button className="p-4 bg-green-500 rounded-2xl text-white hover:scale-110 transition-transform shadow-xl">
                      <Download size={18} />
                    </button>
                    </div>
                  </motion.div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLessonCreator;
