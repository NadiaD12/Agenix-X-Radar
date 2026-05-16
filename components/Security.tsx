import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Eye, Server, Radio, Fingerprint, Cpu, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Security: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(0);
  
  const securityFeatures = [
    {
      id: 0,
      title: "End-to-End Encryption",
      desc: "All transactions are secured with AES-256-GCM encryption at rest and TLS 1.3 in transit.",
      icon: <Lock size={20} />,
      status: "Verified",
      technical: "FIPS 140-2 Compliant"
    },
    {
      id: 1,
      title: "SOC2 Type II Certified",
      desc: "Rigorous third-party audits ensure our infrastructure meets the highest global standards for trust.",
      icon: <ShieldCheck size={20} />,
      status: "Certified",
      technical: "Annual Audit Cycle"
    },
    {
      id: 2,
      title: "Isolated Tenancy",
      desc: "Compute and storage for each merchant are logically isolated within virtual private clusters.",
      icon: <Server size={20} />,
      status: "Encapsulated",
      technical: "Zero-Trust Architecture"
    },
    {
      id: 3,
      title: "Immutable Audits",
      desc: "Every agentic interaction is recorded in a cryptographically signed, immutable system log.",
      icon: <Database size={20} />,
      status: "Active",
      technical: "SHA-256 Verifiable"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % securityFeatures.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="security" className="py-24 md:py-32 bg-[#05070a] text-white relative overflow-hidden scroll-mt-20">
      {/* Background Grids & Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(56,83,230,0.15),transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Content & Pillars */}
          <div className="lg:w-1/2 space-y-12">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1 mb-6"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">Infrastructure Integrity: Optimal</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[0.9] uppercase"
              >
                Unbreakable <br/> <span className="text-brand-700">Infrastructure.</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-lg font-medium max-w-lg mb-8"
              >
                Agentix OS is built on a foundation of cryptographic proof and isolated compute, ensuring every agent interaction is secure, verifiable, and private.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {securityFeatures.map((feature, i) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveLayer(feature.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative group ${
                    activeLayer === feature.id 
                    ? 'bg-brand-600/10 border-brand-500/50 shadow-[0_0_20px_rgba(56,83,230,0.1)]' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    activeLayer === feature.id ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-400'
                  }`}>
                    {feature.icon}
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-sm mb-2">{feature.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">{feature.desc}</p>
                  
                  {activeLayer === feature.id && (
                    <motion.div 
                      layoutId="activeFeatureBar"
                      className="absolute bottom-0 left-6 right-6 h-0.5 bg-brand-500 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Side: The Visual Vault */}
          <div className="lg:w-1/2 flex items-center justify-center w-full min-h-[500px]">
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              
              {/* Outer Scanning Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-brand-500/20 rounded-full border-dashed"
              ></motion.div>
              
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-white/10 rounded-full"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_10px_#3853e6]"></div>
              </motion.div>

              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-20 border border-emerald-500/20 rounded-full border-dashed"
              ></motion.div>

              {/* The Core */}
              <div className="relative z-10 w-48 h-48 bg-[#0a0c10] border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-brand-500/5 group-hover:bg-brand-500/10 transition-colors"></div>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeLayer}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    className="flex flex-col items-center text-center p-6"
                  >
                    <div className="text-brand-700 mb-4 scale-150">
                      {securityFeatures[activeLayer].icon}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      {securityFeatures[activeLayer].status}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 py-1 px-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                      <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest whitespace-nowrap">
                        {securityFeatures[activeLayer].technical}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Vertical Scanning Ray */}
                <motion.div 
                  animate={{ top: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-brand-500/20 to-transparent pointer-events-none"
                ></motion.div>
              </div>

              {/* Orbital Nodes */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-full h-px"
                  style={{ transform: `rotate(${i * 45}deg)` }}
                >
                  <motion.div 
                    initial={{ x: 180, opacity: 0 }}
                    animate={{ x: 220, opacity: [0, 0.4, 0] }}
                    transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-brand-500 rounded-full"
                  ></motion.div>
                </div>
              ))}
              
              {/* Perspective Shadows */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,83,230,0.1),transparent_70%)] pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Security;