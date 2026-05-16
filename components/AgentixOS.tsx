import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Users, Database, Globe, Shield, Zap, Layers, Command, Code, Search, Settings, Home, BarChart as BarChartIcon, Layout, Monitor, ArrowRight, Activity, Clock } from 'lucide-react';
import Nexus from './Nexus';
import Atlas from './Atlas';

// --- Shared Helper Components ---

const AnimatedCounter = ({ value, duration = 1, delay = 0 }: { value: string | number, duration?: number, delay?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const isCurrency = typeof value === 'string' && value.startsWith('$');
  const isPercent = typeof value === 'string' && value.endsWith('%');
  const decimals = typeof value === 'string' && value.includes('.') ? value.split('.')[1].length : 0;

  useEffect(() => {
    setDisplayValue(0);
    let startTimestamp: number | null = null;
    const end = numericValue;
    const startDelay = delay * 1000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp - startDelay) / (duration * 1000), 1);
      
      if (progress < 0) {
        requestAnimationFrame(step);
        return;
      }

      const easedProgress = 1 - Math.pow(1 - progress, 5); // easeOutQuint
      setDisplayValue(easedProgress * end);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [numericValue, duration, delay]);

  return (
    <span>
      {isCurrency && '$'}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {isPercent && '%'}
    </span>
  );
};

const AgentixOS: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<'nexus' | 'atlas'>('nexus');

  return (
    <div className="min-h-screen bg-white text-slate-900 relative">
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 text-center relative z-10 shadow-sm border-b border-slate-100">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-3 py-1 mb-8"
            >
              <Zap size={14} className="text-brand-600" />
              <span className="text-[10px] font-black tracking-widest uppercase text-brand-700">Agentix OS Infrastructure</span>
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-[900] text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase">
                  {activeProduct === 'nexus' ? (
                    <>From Prompt to <br/> <span className="text-brand-700">Payment</span></>
                  ) : (
                    <>Grounding intelligence for <br/> <span className="text-brand-700">autonomous execution</span></>
                  )}
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
                  {activeProduct === 'nexus' 
                    ? "Enables products and services to be discovered and purchased directly inside LLMs."
                    : "Provides real-time system context that ensures reliable execution across agent-driven workflows."}
                </p>

                {activeProduct === 'nexus' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-xl mx-auto mb-16"
                  >
                    <div className="bg-[#0a0c10] rounded-[2rem] p-5 md:p-6 border border-white/10 shadow-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,83,230,0.03),transparent)]"></div>
                      
                      {/* Top Section: Score and Bars */}
                      <div className="flex justify-between items-start relative z-10 mb-8">
                        {/* Compact Score */}
                        <div className="flex flex-col text-left">
                          <p className="text-[8px] font-black text-brand-400 uppercase tracking-widest mb-1">Agentic score</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-white"><AnimatedCounter value={74} /></span>
                            <span className="text-slate-500 text-[10px] font-bold">/100</span>
                          </div>
                        </div>

                        {/* Mini Bars */}
                        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 shrink-0">
                          {[
                            { label: "Discovery", value: "82%" },
                            { label: "Checkout", value: "61%" },
                            { label: "AEO", value: "55%" },
                            { label: "Protocol", value: "90%" }
                          ].map((bar, i) => (
                            <div key={i} className="w-16 md:w-20">
                              <div className="flex justify-between items-center text-[7px] font-black uppercase text-slate-500 mb-1">
                                <span>{bar.label}</span>
                                <span className="text-white">{bar.value}</span>
                              </div>
                              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: bar.value }}
                                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                                  className="h-full bg-brand-500 shadow-[0_0_5px_rgba(56,83,230,0.3)]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Search Input - Bottom Location */}
                      <div className="relative z-10 mb-2">
                        <div className="relative group/search">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500/10 to-blue-500/10 rounded-xl blur opacity-20 group-focus-within/search:opacity-100 transition-opacity"></div>
                          <div className="relative flex items-center">
                            <input 
                              type="text" 
                              placeholder="Store URL (e.g. merchant.com)"
                              className="w-full bg-[#1A1D21] border border-white/5 rounded-lg px-4 py-2.5 text-[11px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500/30 transition-all font-medium"
                            />
                            <button className="absolute right-1 px-3 py-1.5 bg-brand-600 text-white text-[9px] font-black rounded-md transition-all uppercase tracking-widest hover:bg-brand-500 shadow-lg">
                              Analyze
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                               <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                               <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Active Indexer</span>
                            </div>
                            <div className="flex items-center gap-1">
                               <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                               <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Sync: v4.2</span>
                            </div>
                         </div>
                         <span className="text-[7px] font-black text-brand-400 uppercase tracking-widest flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                            Full Radar <ArrowRight size={8} />
                         </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </section>



        {/* Product Switcher / Tab Navigation */}
        <div className="sticky top-[64px] z-40 bg-white/80 backdrop-blur-md border-y border-slate-100 mb-2">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center gap-16">
              <button 
                onClick={() => setActiveProduct('nexus')}
                className={`text-sm md:text-lg font-black tracking-[0.2em] uppercase transition-all relative py-6 px-4 ${activeProduct === 'nexus' ? 'text-brand-600 opacity-100' : 'text-slate-400 hover:text-slate-900 opacity-50'}`}
              >
                Nexus
                {activeProduct === 'nexus' && (
                  <motion.div layoutId="productUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-600 rounded-full" />
                )}
              </button>
              <button 
                onClick={() => setActiveProduct('atlas')}
                className={`text-sm md:text-lg font-black tracking-[0.2em] uppercase transition-all relative py-6 px-4 ${activeProduct === 'atlas' ? 'text-brand-600 opacity-100' : 'text-slate-400 hover:text-slate-900 opacity-50'}`}
              >
                Atlas
                {activeProduct === 'atlas' && (
                  <motion.div layoutId="productUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-600 rounded-full" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Product Content */}
        <AnimatePresence mode="wait">
          {activeProduct === 'nexus' ? (
            <motion.div
              key="nexus-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Nexus isEmbedded />
            </motion.div>
          ) : (
            <motion.div
              key="atlas-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Atlas onOpenWaitlist={() => {}} isEmbedded />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AgentixOS;
