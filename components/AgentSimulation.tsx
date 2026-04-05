import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search } from 'lucide-react';

const PROMPTS = [
  "Find and buy a high quality black t shirt, max $60",
  "I'd like to buy a nice gold necklace for my wife, max $250",
  "Buy me nice running shoes for my 5K, size 11, max $150",
  "Purchase a historical antique gift for my friend, Max $300"
];

const MerchantMarketplace = () => (
  <div className="w-full h-full bg-white flex flex-col overflow-hidden relative">
    {/* Mini Header */}
    <div className="h-6 bg-slate-50 border-b border-slate-200 flex items-center px-2 justify-between shrink-0">
      <div className="flex gap-1">
        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
      </div>
      <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
      <Search size={8} className="text-slate-400" />
    </div>
    
    {/* Mini Hero/Banner */}
    <div className="h-10 bg-brand-50 flex items-center justify-center shrink-0">
      <div className="w-16 h-2 bg-brand-200/50 rounded-full"></div>
    </div>

    {/* Product Grid */}
    <div className="p-2 grid grid-cols-2 gap-2 overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-sm p-1 flex flex-col gap-1 shadow-sm">
          <div className="aspect-square bg-slate-100 rounded-sm overflow-hidden flex items-center justify-center">
            {i === 1 && <div className="w-4 h-6 bg-slate-200 rounded-sm"></div>}
            {i === 2 && <div className="w-5 h-5 bg-amber-400/20 rounded-full border border-amber-400/30"></div>}
            {i === 3 && <div className="w-6 h-3 bg-blue-500/20 rounded-full"></div>}
            {i === 4 && <div className="w-4 h-4 rotate-45 bg-slate-300/20"></div>}
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full"></div>
          <div className="w-1/2 h-1 bg-brand-200 rounded-full"></div>
        </div>
      ))}
    </div>

    {/* Live Agent Badge Overlay */}
    <div className="absolute inset-x-0 bottom-0 h-6 bg-brand-600 flex items-center justify-center border-t border-brand-400/30">
       <span className="text-[7px] font-black text-white uppercase tracking-widest flex items-center gap-1">
         <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
         Agent-Native Layer
       </span>
    </div>
  </div>
);

const AgentixLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 1000 1000" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-white-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#33d9ef" />
      </linearGradient>
      <linearGradient id="grad-cyan-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#33d9ef" />
        <stop offset="100%" stopColor="#01b4e4" />
      </linearGradient>
      <linearGradient id="grad-blue-deep" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#01b4e4" />
        <stop offset="100%" stopColor="#0348d4" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
        <feOffset dx="0" dy="10" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Light Slate Circular Background */}
    <circle cx="500" cy="500" r="480" fill="#f1f5f9" />
    
    <g transform="translate(500, 420) scale(0.95)" filter="url(#shadow)">
      {/* Stylized 'A' Logo */}
      <rect 
        x="20" y="-220" width="100" height="480" rx="50" 
        fill="url(#grad-blue-deep)" 
        transform="rotate(-28 70 20)" 
      />
      <rect 
        x="-120" y="-220" width="100" height="480" rx="50" 
        fill="url(#grad-white-cyan)" 
        transform="rotate(28 -70 20)" 
      />
      <rect 
        x="-140" y="20" width="280" height="100" rx="50" 
        fill="#0b3bb1" 
        transform="rotate(-15 0 70)" 
      />
    </g>

    <text 
      x="500" 
      y="840" 
      fontFamily="'Inter', sans-serif" 
      fontSize="170" 
      fontWeight="800" 
      fill="#0f172a" 
      textAnchor="middle"
      letterSpacing="-6"
    >
      Agentix
    </text>
  </svg>
);

const AgentSimulation: React.FC = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % PROMPTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const sources = [
    "ChatGPT (ACP)",
    "Gemini (UCP)",
    "Claude Agents",
    "Shopping Agents",
    "Agentic Browser"
  ];

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 mb-4 relative px-4 py-8 overflow-visible">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative h-[700px] md:h-[450px]">
        
        {/* Left Side: Human + User Intent (Rolling Prompt Box) + AI Agents */}
        <div className="flex flex-row items-center gap-12 w-full md:w-[55%] z-20 relative md:h-full">
          
          <div className="flex flex-col items-center shrink-0 relative z-30">
            {/* User Intent Chat Bubble with Rolling Prompts */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-5 relative overflow-hidden group flex flex-col min-h-[140px] w-[260px] z-10">
              <div className="flex items-center gap-3 mb-3 shrink-0">
                <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Prompt Engineering</span>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></div>
              </div>
              
              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currentPromptIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="text-slate-900 font-bold leading-tight text-sm md:text-base italic absolute inset-0"
                  >
                    "{PROMPTS[currentPromptIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-[-10px] right-[-10px] p-2 opacity-[0.05] pointer-events-none text-slate-900">
                <Send size={48} />
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-full mt-6 flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-xl border-2 border-slate-100 flex items-center justify-center text-3xl mb-1 hover:scale-110 transition-transform cursor-default">
                👤
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Merchant Buyer</span>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 min-w-[170px] relative z-30 py-4">
            {sources.map((source, i) => (
              <motion.div
                key={source}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-2.5 text-[11px] font-black text-slate-600 shadow-sm flex items-center justify-between group hover:border-brand-500 hover:shadow-md transition-all cursor-default relative"
              >
                {source}
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 opacity-20 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></div>
              </motion.div>
            ))}
          </div>

          {/* Fan-out Connectors (Prompt -> Agents) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {[0, 1, 2, 3, 4].map((i) => {
              const startX = 260;
              const startY = 225; 
              const endX = 310;
              const endY = 150 + (i * 38); 
              
              return (
                <motion.path
                  key={`fan-${i}`}
                  d={`M ${startX} ${startY} C ${startX + 30} ${startY}, ${endX - 30} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="#5476f2"
                  strokeWidth="1"
                  className="opacity-20"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 + i * 0.1 }}
                />
              );
            })}
          </svg>
        </div>

        {/* Center & Converging Wires: Agents -> Protocol Node */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
          <svg className="w-full h-full absolute inset-0 z-0 overflow-visible">
            <defs>
              <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5476f2" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#5476f2" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            {/* Multi-prong Converging Wires (Agents to Logo) */}
            {[0, 1, 2, 3, 4].map((i) => {
                const startX = 480; 
                const yPos = 150 + i * 38;
                const endX = 610; 
                const endY = 225; 
                
                return (
                  <g key={`converge-group-${i}`}>
                    <motion.path
                        d={`M ${startX} ${yPos} C ${startX + 80} ${yPos}, ${endX - 80} ${endY}, ${endX} ${endY}`}
                        fill="none"
                        stroke="url(#wireGradient)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: i * 0.1 + 1.2 }}
                    />
                    
                    {/* Flowing Particles */}
                    <motion.circle
                        r="2"
                        fill="#5476f2"
                        className="filter blur-[0.5px]"
                    >
                        <animateMotion
                            dur={`${2 + i * 0.3}s`}
                            repeatCount="indefinite"
                            path={`M ${startX} ${yPos} C ${startX + 80} ${yPos}, ${endX - 80} ${endY}, ${endX} ${endY}`}
                        />
                    </motion.circle>
                  </g>
                );
            })}

            {/* Outgoing Wire: Protocol to Storefront */}
            <motion.path
                d="M 720 225 L 920 225"
                stroke="#5476f2"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 2.8 }}
            />
            
            {/* Settlement Pulse Particle */}
            <motion.circle r="3" fill="#5476f2">
                <animateMotion
                    dur="0.8s"
                    repeatCount="indefinite"
                    path="M 720 225 L 920 225"
                />
            </motion.circle>
          </svg>

          {/* Central Protocol Node */}
          <div className="relative z-10 translate-x-[65px]">
            <motion.div 
              animate={{ 
                scale: [1, 1.08, 1, 1.15, 1],
                boxShadow: [
                  "0 0 20px rgba(84,118,242,0.2)",
                  "0 0 50px rgba(84,118,242,0.6)",
                  "0 0 20px rgba(84,118,242,0.2)",
                  "0 0 80px rgba(84,118,242,0.8)",
                  "0 0 20px rgba(84,118,242,0.2)"
                ]
              }}
              transition={{ 
                duration: 2.2, 
                repeat: Infinity,
                times: [0, 0.08, 0.15, 0.25, 1],
                ease: "easeInOut" 
              }}
              className="w-24 h-24 md:w-44 md:h-44 rounded-full flex items-center justify-center relative overflow-visible"
            >
              <AgentixLogo className="w-full h-full drop-shadow-2xl" />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[9px] font-black text-brand-400 uppercase tracking-[0.3em]">Agentix Protocol</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Merchant Marketplace View */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center z-20">
           <motion.div 
             whileHover={{ scale: 1.05 }}
             className="relative"
           >
              <div className="absolute inset-0 bg-brand-500/10 rounded-full scale-[1.8] animate-pulse"></div>
              
              <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-[2rem] shadow-2xl border-4 border-brand-500 relative z-10 overflow-hidden group">
                {/* Marketplace Mini UI */}
                <MerchantMarketplace />
                
                {/* Protocol Connected Overlay */}
                <div className="absolute inset-0 bg-brand-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                   <div className="bg-white px-3 py-1 rounded-full shadow-lg border border-brand-500/50">
                     <span className="text-[8px] font-black text-brand-600 uppercase tracking-widest">Protocol Active</span>
                   </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                 <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Your Storefront</h4>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agent-Native Marketplace</p>
              </div>
           </motion.div>
        </div>

      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[300px] bg-brand-500/5 rounded-[100%] blur-[120px] -z-10"></div>
    </div>
  );
};

export default AgentSimulation;