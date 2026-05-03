import React, { useState, useEffect, useRef } from 'react';

interface FaceRecognitionMonitorProps {
  onSecurityAlert: (type: string, message: string) => void;
  isActive: boolean;
}

const FaceRecognitionMonitor: React.FC<FaceRecognitionMonitorProps> = ({ onSecurityAlert, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceCount, setFaceCount] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
  const streamRef = useRef<MediaStream | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraReady(true);
        
        // Start face detection simulation
        detectFaces();
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      onSecurityAlert('camera_blocked', 'Camera access is required for exam security');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCameraReady(false);
  };

  const detectFaces = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // Simulated face detection (in production, use MediaPipe Face Mesh)
    intervalRef.current = setInterval(() => {
      // Random simulation
      const detectedFaces = Math.random() > 0.3 ? 1 : Math.random() > 0.7 ? 2 : 0;
      setFaceCount(detectedFaces);
      setFaceDetected(detectedFaces === 1);

      if (detectedFaces === 0) {
        onSecurityAlert('no_face', 'No face detected - student may have left');
        setVerificationStatus('failed');
      } else if (detectedFaces > 1) {
        onSecurityAlert('multiple_faces', 'Multiple faces detected - possible cheating');
        setVerificationStatus('failed');
      } else {
        setVerificationStatus('verified');
      }
    }, 3000);
  };

  return (
    <div className="glass-strong rounded-3xl p-6 border-2 border-gold/30 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-main flex items-center gap-2 uppercase tracking-wider">
          <i className="fas fa-user-shield text-royal"></i>
          AI Invigilator
        </h3>
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
          verificationStatus === 'verified' 
            ? 'bg-green-500 text-white' 
            : verificationStatus === 'failed'
            ? 'bg-red-500 text-white'
            : 'bg-gold text-white'
        }`}>
          {verificationStatus === 'verified' ? '✓ Verified' : 
           verificationStatus === 'failed' ? '⚠ Alert' : 
           '◷ Verifying'}
        </div>
      </div>

      {/* Camera Feed */}
      <div className="relative rounded-2xl overflow-hidden bg-royal-dark/20 mb-4 aspect-video ring-1 ring-purple-border/50">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover grayscale-[30%] contrast-125"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        
        {/* Scanning Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-1 bg-royal/40 absolute top-0 animate-scan" />
        </div>

        {/* Face Detection Overlay */}
        {cameraReady && faceDetected && (
          <div className="absolute inset-x-12 inset-y-8 border-2 border-royal/50 rounded-lg animate-pulse">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-royal text-white px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">
              Secured
            </div>
          </div>
        )}

        {/* Multiple Face Warning */}
        {faceCount > 1 && (
          <div className="absolute inset-0 bg-red-600/20 backdrop-blur-[2px] flex items-center justify-center p-4 border-4 border-red-500/50">
            <div className="text-center bg-red-600 px-4 py-2 rounded-xl text-white shadow-xl animate-bounce">
              <i className="fas fa-users text-2xl mb-1"></i>
              <p className="text-[10px] font-black uppercase tracking-widest">Multiple Faces Detected</p>
            </div>
          </div>
        )}

        {/* No Face Warning */}
        {faceCount === 0 && cameraReady && (
          <div className="absolute inset-0 bg-royal-dark/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3 border border-red-500/30">
                <i className="fas fa-eye-slash text-2xl text-red-500"></i>
              </div>
              <p className="text-white font-black text-sm uppercase tracking-widest">Awaiting Candidate</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass p-3 rounded-xl border border-purple-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${cameraReady ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">Sensor</span>
          </div>
          <span className={`text-[10px] font-black ${cameraReady ? 'text-royal' : 'text-red-500'}`}>
            {cameraReady ? 'READY' : 'OFF'}
          </span>
        </div>
        <div className="glass p-3 rounded-xl border border-purple-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fas fa-dna text-royal text-[10px]"></i>
            <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">ID Mask</span>
          </div>
          <span className={`text-[10px] font-black ${
            faceCount === 1 ? 'text-royal' : 'text-red-500'
          }`}>
             {faceCount === 0 ? 'NOT FOUND' : faceCount === 1 ? 'LOCKED' : 'ERROR'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognitionMonitor;
