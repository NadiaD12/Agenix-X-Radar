import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Loader2, RefreshCw, Info, Cpu } from 'lucide-react';
import { generateMarketingVideo } from '../services/geminiService';

const LOADING_MESSAGES = [
  "Initializing Veo-3 model...",
  "Constructing merchant dashboard...",
  "Simulating Agentix protocol connector...",
  "Visualizing sales growth data...",
  "Rendering 3D motion graphics...",
  "Applying cinematic lighting...",
  "Finalizing video stream..."
];

// High-quality hardcoded placeholder that represents a "created once" professional demo
const HARDCODED_VIDEO_URL = "https://drive.google.com/uc?id=1RqUSmVyEFIp1DZS6U0-ws0q4tERx17iNdMyXTJVfY-U&export=download";

const ExplainerVideo: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(HARDCODED_VIDEO_URL);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Rotate loading messages
  useEffect(() => {
    let interval: number;
    if (isLoading) {
      interval = window.setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerateVideo = async () => {
    setError(null);
    
    // Check for API Key using the aistudio global
    try {
      // @ts-ignore
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          // @ts-ignore
          await window.aistudio.openSelectKey();
        }
      }
    } catch (e) {
      console.warn("API Key check failed, proceeding anyway", e);
    }

    setIsLoading(true);
    setVideoUrl(null);

    try {
      const url = await generateMarketingVideo();
      setVideoUrl(url);
    } catch (err: any) {
      console.error("Video generation failed", err);
      let msg = "Failed to generate video. Please try again.";
      if (err.message && (err.message.includes("key") || err.message.includes("403"))) {
        msg = "Access denied. Please ensure you have selected a valid paid API key.";
      }
      setError(msg);
      // Revert to hardcoded if generation fails
      setVideoUrl(HARDCODED_VIDEO_URL);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-8">
      {/* Video Container */}
      <div className="relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] bg-white aspect-video min-h-[300px] md:min-h-[550px] group border border-slate-200 flex flex-col items-center justify-center z-20">
          
          {videoUrl && !isLoading ? (
            <div className="relative w-full h-full bg-slate-50 flex items-center justify-center">
              {videoUrl.includes('drive.google.com') ? (
                <iframe 
                  src="https://drive.google.com/file/d/1RqUSmVyEFIp1DZS6U0-ws0q4tERx17iNdMyXTJVfY-U/preview?t=35" 
                  className="w-full h-full border-0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Agentix Explainer Video"
                />
              ) : (
                <video 
                  src={videoUrl} 
                  poster="https://picsum.photos/seed/agentix-tech/1280/720"
                  controls 
                  autoPlay 
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover relative z-10"
                >
                  Your browser does not support the video tag.
                </video>
              )}
              
              {/* Generation Control Overlay */}
              <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={handleGenerateVideo}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur border border-slate-200 rounded-full text-slate-900 text-xs font-bold shadow-xl hover:bg-slate-50 transition-all transform hover:scale-105 active:scale-95"
                >
                  <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                  <span>Regenerate Custom AI Demo</span>
                </button>
                
                {videoUrl === HARDCODED_VIDEO_URL && (
                  <div className="px-3 py-1 bg-brand-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
                    Official Protocol Demo
                  </div>
                )}
                {videoUrl !== HARDCODED_VIDEO_URL && (
                  <div className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                    <Cpu size={10} />
                    AI Generated Preview
                  </div>
                )}
              </div>

              {/* Info Card Overlay (Bottom Left) */}
              <div className="absolute bottom-6 left-6 z-20 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-2xl">
                  <p className="text-slate-900 font-bold text-sm mb-1">Agentix Pipeline v4.2</p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Visualizing the sub-second latency between Agent request and Protocol execution.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Background Visuals for Loading State */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-brand-50 to-slate-50 z-0">
                <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50 transition-all duration-1000 ${isLoading ? 'animate-pulse' : ''}`}></div>
                <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50 transition-all duration-1000 ${isLoading ? 'animate-pulse delay-700' : ''}`}></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
              </div>

              {isLoading && (
                <div className="relative z-20 flex flex-col items-center text-slate-900">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-brand-500 blur-2xl opacity-20 animate-pulse rounded-full"></div>
                    <Loader2 className="w-16 h-16 text-brand-600 animate-spin relative z-10" />
                  </div>
                  <p className="text-2xl font-bold animate-pulse text-center px-4 tracking-tight">
                    {LOADING_MESSAGES[loadingMsgIndex]}
                  </p>
                  <div className="mt-4 flex items-center space-x-2 text-slate-600 text-sm">
                    <Sparkles size={14} className="text-brand-600" />
                    <span>Veo 3.1 AI is dreaming up your demo...</span>
                  </div>
                </div>
              )}
              
              {error && !isLoading && (
                <div className="relative z-20 flex flex-col items-center max-w-md text-center px-6">
                  <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
                    <Info size={32} />
                  </div>
                  <h4 className="text-slate-900 font-bold text-xl mb-2">Generation Interrupted</h4>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                    {error}
                  </p>
                  <button 
                    onClick={handleGenerateVideo}
                    className="px-8 py-3 bg-brand-600 text-white font-bold rounded-full hover:bg-brand-500 transition-all flex items-center space-x-2"
                  >
                    <RefreshCw size={18} />
                    <span>Try Again</span>
                  </button>
                </div>
              )}
            </>
          )}

          {/* Browser-style bar */}
          {!isLoading && (
            <div className="absolute top-0 left-0 right-0 h-10 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 flex items-center px-4 space-x-1.5 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
              <div className="ml-4 h-5 px-3 rounded bg-slate-200/50 flex items-center">
                <span className="text-[10px] text-slate-500 font-mono">agentix-protocol.viz</span>
              </div>
            </div>
          )}
      </div>

      {/* Sales Impact Subtext */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
        <div className="p-4">
          <p className="text-3xl font-bold text-slate-900 mb-1">0.4s</p>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Protocol Latency</p>
        </div>
        <div className="p-4">
          <p className="text-3xl font-bold text-brand-600 mb-1">+42%</p>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Discovery Rate</p>
        </div>
        <div className="p-4">
          <p className="text-3xl font-bold text-slate-900 mb-1">200k+</p>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Agents Supported</p>
        </div>
      </div>
    </div>
  );
};

export default ExplainerVideo;