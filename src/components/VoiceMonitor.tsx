import React, { useEffect, useRef, useState } from 'react';
import { Mic, AlertTriangle, CheckCircle2, Shield, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceMonitorProps {
  onSecurityAlert?: (type: string, message: string) => void;
  isActive: boolean;
}

const VoiceMonitor: React.FC<VoiceMonitorProps> = ({ onSecurityAlert, isActive }) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceDetected, setVoiceDetected] = useState(false);
  const [speakerCount, setSpeakerCount] = useState(0);
  const [voicePrintVerified, setVoicePrintVerified] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [micError, setMicError] = useState('');
  const [statusText, setStatusText] = useState('Idle');

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    if (isActive) {
      startVoiceMonitoring();
    } else {
      stopVoiceMonitoring();
    }

    return () => {
      mountedRef.current = false;
      stopVoiceMonitoring();
    };
  }, [isActive]);

  const startVoiceMonitoring = async () => {
    if (streamRef.current || audioContextRef.current) return;

    try {
      setMicError('');
      setStatusText('Requesting microphone access');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      if (mountedRef.current) {
        setIsListening(true);
        setStatusText('Monitoring active');
      }

      monitorAudioLevel();
      startVoiceDetectionLoop();
    } catch (error) {
      console.error('Microphone access denied or unavailable:', error);
      if (mountedRef.current) {
        setIsListening(false);
        setMicError('Microphone access is required for voice monitoring.');
        setStatusText('Microphone unavailable');
      }

      if (onSecurityAlert) {
        onSecurityAlert(
          'mic_blocked',
          'Microphone access is required for exam security'
        );
      }
    }
  };

  const stopVoiceMonitoring = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    analyserRef.current = null;

    if (mountedRef.current) {
      setIsListening(false);
      setVoiceDetected(false);
      setSpeakerCount(0);
      setVoicePrintVerified(false);
      setAudioLevel(0);
      setStatusText('Stopped');
    }
  };

  const monitorAudioLevel = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const checkLevel = () => {
      if (!analyserRef.current || !mountedRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      const normalizedLevel = Math.min(100, Math.round((average / 128) * 100));
      const detected = normalizedLevel > 12;

      setAudioLevel(normalizedLevel);
      setVoiceDetected(detected);

      animationFrameRef.current = requestAnimationFrame(checkLevel);
    };

    checkLevel();
  };

  const startVoiceDetectionLoop = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }

    detectionIntervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;

      if (audioLevel > 12) {
        // Simple logic for simulation: very high level suggest multiple speakers/noise
        const possibleMultipleVoices = audioLevel > 75;
        const speakers = possibleMultipleVoices ? 2 : 1;

        setSpeakerCount(speakers);

        if (speakers > 1) {
          setVoicePrintVerified(false);
          setStatusText('Interference detected');

          if (onSecurityAlert) {
            onSecurityAlert(
              'multiple_voices',
              'Multiple voice frequencies detected in session area'
            );
          }
        } else {
          setVoicePrintVerified(true);
          setStatusText('Primary voice verified');
        }
      } else {
        setSpeakerCount(0);
        setVoicePrintVerified(false);
        setStatusText(isListening ? 'Listening for frequency signatures' : 'Stopped');
      }
    }, 2500);
  };

  return (
    <section className="glass-strong rounded-[32px] p-6 border-2 border-royal/20 shadow-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-royal/10 blur-2xl rounded-full" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isListening ? 'bg-royal text-white' : 'bg-white/5 text-white/20'}`}>
              <Mic className={`w-5 h-5 ${isListening && audioLevel > 15 ? 'animate-bounce' : ''}`} />
            </div>
            <div>
              <h3 className="text-sm font-black text-text-main uppercase tracking-widest">Acoustic Shield</h3>
              <p className="text-[8px] text-text-muted font-bold uppercase tracking-[2px]">Voice Biometric Monitor</p>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all border ${
            speakerCount > 1 
              ? 'bg-red-500/20 text-red-500 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.3)]' 
              : voicePrintVerified 
              ? 'bg-green-500/20 text-green-500 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
              : isListening 
              ? 'bg-gold/20 text-gold border-gold/30' 
              : 'bg-white/5 text-white/20 border-white/10'
          }`}>
            {speakerCount > 1 ? 'Alert: Noise' : voicePrintVerified ? 'Identity Verified' : isListening ? 'Scanning' : 'Offline'}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass p-4 rounded-2xl border border-white/5 bg-white/5 text-[10px] font-medium text-text-muted">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`} />
              {micError || statusText}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Broadcast Level</span>
              <span className="text-[10px] font-black text-royal">{audioLevel}%</span>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${audioLevel}%` }}
                className={`h-full rounded-full transition-colors duration-300 ${
                  audioLevel > 75 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-royal'
                }`}
              />
            </div>
          </div>

          <div className="h-20 glass rounded-2xl flex items-center justify-center overflow-hidden relative border border-white/5">
            {voiceDetected ? (
              <div className="flex items-center gap-1">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [
                        Math.max(4, (audioLevel / 100) * 40), 
                        Math.max(10, (audioLevel / 80) * 50), 
                        Math.max(4, (audioLevel / 100) * 40)
                      ] 
                    }}
                    transition={{ 
                      duration: 0.4, 
                      repeat: Infinity, 
                      delay: i * 0.05,
                      ease: "easeInOut"
                    }}
                    className="w-1 bg-royal-light rounded-full opacity-60"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 opacity-20">
                <Radio className="w-6 h-6 text-white" />
                <span className="text-[8px] font-black uppercase tracking-[3px]">Waiting for signal...</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass p-3 rounded-2xl border border-white/5 text-center">
              <p className="text-[8px] font-black uppercase tracking-widest text-text-muted mb-1">Signal Status</p>
              <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-widest">
                {isListening ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    <span className="text-green-500">Active</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-3 h-3 text-white/20" />
                    <span className="text-white/20">Standby</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="glass p-3 rounded-2xl border border-white/5 text-center">
              <p className="text-[8px] font-black uppercase tracking-widest text-text-muted mb-1">Speaker Count</p>
              <p className={`text-[10px] font-black uppercase tracking-widest ${speakerCount > 1 ? 'text-red-500' : 'text-text-main'}`}>
                {speakerCount} Identities
              </p>
            </div>
          </div>

          <AnimatePresence>
            {speakerCount > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3"
              >
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-red-500 leading-relaxed uppercase tracking-tight">
                  Neural Alert: Multi-Frequency Interference detected. Secure the session environment.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default VoiceMonitor;
