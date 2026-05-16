import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Zap, Activity, Radio, Target } from 'lucide-react';

const LiveCoords: React.FC = () => {
  const [coords, setCoords] = useState({ lat: '37.7749', lng: '122.4194' });

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        lat: (37.7 + Math.random() * 0.1).toFixed(4),
        lng: (122.4 + Math.random() * 0.1).toFixed(4)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3">
      <div className="flex gap-1">
        <span className="text-white/40">LAT:</span> <span>{coords.lat}° N</span>
      </div>
      <div className="flex gap-1">
        <span className="text-white/40">LNG:</span> <span>{coords.lng}° W</span>
      </div>
    </div>
  );
};

const AwarenessMap: React.FC = () => {
  const [activePopup, setActivePopup] = useState(0);

  const popups = [
    {
      x: '22%',
      y: '38%',
      text: "Maintains system-wide contextual awareness",
      color: "bg-brand-500"
    },
    {
      x: '52%',
      y: '28%',
      text: "Connects signals across workflows and environments",
      color: "bg-purple-500"
    },
    {
      x: '82%',
      y: '42%',
      text: "Grounds execution in real-time system state",
      color: "bg-emerald-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePopup((prev) => (prev + 1) % popups.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] mb-8"
          >
            <Radio size={12} className="text-brand-600 animate-pulse" /> Live System State
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] mb-6">
            Real-time <br/> <span className="text-brand-700">Awareness Engine.</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto italic">
            Atlas synchronized system awareness across every node in the agentic network.
          </p>
        </div>

        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-[#05070a] rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl">
          {/* Enhanced Atmosphere Glow */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(56,83,230,0.15),transparent_70%)]" />

          {/* Detailed World Map Background */}
          <div className="absolute inset-0 opacity-[0.25] pointer-events-none">
            <svg viewBox="0 0 1000 500" className="w-full h-full text-slate-700 fill-current">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              
              {/* Detailed Continent Paths */}
              <g className="filter-transition">
                <path d="M165,110 L185,105 L215,100 L245,115 L265,150 L275,220 L255,270 L245,310 L215,340 L165,360 L125,330 L105,260 L115,180 Z" /> {/* NA */}
                <path d="M305,230 L345,225 L375,250 L385,300 L375,360 L365,420 L335,470 L305,480 L275,440 L265,400 L285,300 Z" /> {/* SA */}
                <path d="M485,100 L535,105 L565,120 L585,150 L575,180 L555,200 L525,210 L485,200 L465,170 L465,120 Z" /> {/* EU */}
                <path d="M465,220 L525,225 L565,240 L585,280 L575,330 L555,380 L515,420 L475,410 L455,380 L445,320 L445,260 Z" /> {/* AF */}
                <path d="M595,110 L685,115 L765,120 L845,150 L885,200 L905,280 L895,340 L865,380 L825,400 L765,410 L705,380 L625,320 L605,250 L595,180 Z" /> {/* ASIA */}
                <path d="M805,420 L865,425 L895,440 L915,470 L905,500 L875,510 L825,500 L795,470 Z" /> {/* AU */}
              </g>

              {/* Terrain Overlay Texture */}
              <rect width="100%" height="100%" filter="url(#noise)" opacity="0.05" />
            </svg>
          </div>
          
          {/* Subtle Grid / Lat-Lng Lines */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}></div>
          
          {/* Scan Line Effect */}
          <motion.div 
            initial={{ left: '0%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-500/30 to-transparent z-10 shadow-[0_0_15px_rgba(56,83,230,0.3)]"
          />

          {/* Dynamic HUD Elements */}
          <div className="absolute top-6 left-8 flex flex-col gap-1 z-20">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Global Sync: Active</span>
            </div>
            <div className="font-mono text-[8px] text-white/20 flex gap-3">
              <LiveCoords />
              <span>ALT: 42,901 FT</span>
            </div>
          </div>
          
          {/* Connections/Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#3853e6" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            
            {/* Connection Paths (Global Hubs) */}
            <PulseLine d="M 180 175 Q 340 100 500 110" delay={0} /> {/* SF to London */}
            <PulseLine d="M 500 110 Q 675 140 850 175" delay={2} /> {/* London to Tokyo */}
            <PulseLine d="M 850 175 Q 850 300 850 425" delay={1} /> {/* Tokyo to Sydney */}
            <PulseLine d="M 850 425 Q 500 500 180 175" delay={3} /> {/* Sydney to SF */}
            <PulseLine d="M 250 175 Q 375 140 500 110" delay={1.5} /> {/* NYC to London */}
          </svg>

          {/* Nodes (Global Hubs) */}
          <Node x="18%" y="35%" /> {/* San Francisco */}
          <Node x="25%" y="35%" /> {/* New York */}
          <Node x="50%" y="22%" /> {/* London */}
          <Node x="85%" y="35%" /> {/* Tokyo */}
          <Node x="85%" y="85%" /> {/* Sydney */}
          <Node x="72%" y="30%" /> {/* Shanghai/Beijing hub area */}

          {/* Animated Popups */}

          <AnimatePresence>
            {popups.map((popup, i) => i === activePopup && (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ left: popup.x, top: popup.y }}
                className="absolute z-20 -translate-x-1/2 -translate-y-full mb-6"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl min-w-[240px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2 h-2 rounded-full ${popup.color} animate-ping`}></div>
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Awareness Update</span>
                  </div>
                  <p className="text-sm font-bold text-white leading-tight">
                    "{popup.text}"
                  </p>
                </div>
                {/* Arrow */}
                <div className="w-4 h-4 bg-white/10 backdrop-blur-xl border-r border-b border-white/20 rotate-45 mx-auto -mt-2"></div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Bottom Status Bar */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between px-8 border-t border-white/5">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">4.2B Signals/Sec</span>
              </div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-white/20 italic font-mono">
              Atlas_Awareness_v4.0.2_LTS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Node = ({ x, y }: { x: string, y: string }) => (
  <div 
    className="absolute w-2 h-2 bg-brand-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(56,83,230,0.8)]"
    style={{ left: x, top: y }}
  >
    <div className="absolute inset-0 bg-brand-400 rounded-full animate-ping opacity-75"></div>
  </div>
);

const PulseLine = ({ d, delay }: { d: string, delay: number }) => (
  <g>
    <path 
      d={d} 
      stroke="rgba(255,255,255,0.05)" 
      strokeWidth="1" 
      fill="transparent" 
    />
    <motion.path
      d={d}
      stroke="url(#pulseGradient)"
      strokeWidth="2"
      fill="transparent"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: [0, 1, 0],
        opacity: [0, 1, 0],
        strokeWidth: [2, 4, 3] 
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut"
      }}
    />
  </g>
);

export default AwarenessMap;
