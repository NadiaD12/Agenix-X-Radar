import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, ShieldCheck, Store, CreditCard, CheckCircle2, Globe, Cpu, Zap, ArrowRight, MousePointer2 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    {
      title: "AI Agents Discover Products",
      text: "Customers use AI to search for the best product. AI agents crawl the web to find the most relevant results.",
      icon: <Search className="text-brand-600 w-6 h-6" />,
      color: "bg-brand-100",
      animation: <SearchAnimation />
    },
    {
      title: "With Agentix your products are more visible",
      text: "Agentix optimizes your product data for AI readability, ensuring your store ranks at the top of AI search results.",
      icon: <ShieldCheck className="text-blue-600 w-6 h-6" />,
      color: "bg-blue-100",
      animation: <VisibilityAnimation />
    },
    {
      title: "Merchant Stores Become Accessible",
      text: "We bridge the gap between legacy eCommerce and the AI economy, making every product machine-transactable.",
      icon: <Store className="text-emerald-600 w-6 h-6" />,
      color: "bg-emerald-100",
      animation: <AccessibilityAnimation />
    },
    {
      title: "Autonomous Checkout Happens",
      text: "AI agents complete secure purchases through Agentix payment rails without human intervention.",
      icon: <CreditCard className="text-purple-600 w-6 h-6" />,
      color: "bg-purple-100",
      animation: <CheckoutAnimation />
    }
  ];

  return (
    <section id="protocol" className="py-20 md:py-24 bg-white relative overflow-hidden scroll-mt-20">
      <div className="max-w-5xl md:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-brand-50 px-3 py-1 rounded-full mb-4 border border-brand-100"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            <span className="text-brand-600 font-bold tracking-widest uppercase text-[10px]">The Protocol</span>
          </motion.div>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-none uppercase">
            How Agentix Powers AI Commerce
          </h3>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Agentix provides the infrastructure that allows AI agents to discover products and complete secure transactions.
          </p>
        </div>

        <div ref={containerRef} className="relative space-y-32">
          {/* Vertical Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2 hidden lg:block">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 right-0 bg-brand-500 origin-top h-full"
            />
          </div>

          {steps.map((step, index) => (
            <StepSection key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepSection: React.FC<{ step: any; index: number }> = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  return (
    <div 
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-16 relative ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Step Number Indicator (Center) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <motion.div 
          animate={{ 
            scale: isInView ? 1.2 : 1,
            backgroundColor: isInView ? "#3853e6" : "#f1f5f9",
            color: isInView ? "#ffffff" : "#94a3b8",
            borderColor: isInView ? "#3853e6" : "#e2e8f0"
          }}
          className="w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-sm font-black transition-colors duration-500"
        >
          {index + 1}
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="flex-1 space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100"
        >
          <div className={`p-2 rounded-xl ${step.color}`}>
            {step.icon}
          </div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Step {index + 1}</span>
        </motion.div>
        
        <motion.h4 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase"
        >
          {step.title}
        </motion.h4>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg text-slate-600 font-medium leading-relaxed"
        >
          {step.text}
        </motion.p>
      </div>

      {/* Animation Content */}
      <div className="flex-1 w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? 5 : -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-2xl relative overflow-hidden aspect-[4/3] flex items-center justify-center p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
          {step.animation}
        </motion.div>
      </div>
    </div>
  );
};

const StepItem = ({ index, step, isActive, onClick, onInView }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView]);

  return (
    <motion.div 
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      className={`relative pl-12 cursor-pointer transition-all duration-500 group py-4`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full transition-all duration-500 ${isActive ? 'bg-brand-600' : 'bg-slate-200'}`}></div>
      
      <div className={`absolute left-[-12px] top-6 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center text-[10px] font-black transition-all duration-500 ${isActive ? 'bg-brand-600 text-white scale-125' : 'bg-slate-200 text-slate-400'}`}>
        {index + 1}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className={`p-2 rounded-xl transition-all duration-500 ${isActive ? step.color : 'bg-slate-100'}`}>
          {step.icon}
        </div>
        <h4 className={`text-2xl font-black tracking-tight transition-all duration-500 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
          {step.title}
        </h4>
      </div>
      
      <p className={`text-base font-medium leading-relaxed transition-all duration-500 ${isActive ? 'text-slate-600' : 'text-slate-400'}`}>
        {step.text}
      </p>

      {/* Mobile Animation (Visible only on small screens) */}
      <div className="lg:hidden mt-8 bg-slate-50 rounded-3xl p-6 border border-slate-200 aspect-[4/3] flex items-center justify-center overflow-hidden">
        {step.animation}
      </div>
    </motion.div>
  );
};

// --- Animation Components ---

const SearchAnimation = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
        </div>
        <div className="flex-1 bg-white rounded-md h-5 flex items-center px-2">
          <div className="w-24 h-1 bg-slate-100 rounded-full"></div>
        </div>
      </div>
      <div className="p-8 space-y-6">
        <div className="relative">
          <div className="w-full h-12 bg-slate-50 rounded-full border border-slate-200 flex items-center px-6">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              onAnimationComplete={() => setShowOptions(true)}
              transition={{ duration: 2, repeat: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-sm font-medium text-slate-600 italic">"Find the best sustainable sneakers for running..."</span>
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-0.5 h-4 bg-brand-500 ml-1"
            ></motion.div>
          </div>
        </div>

        <div className="space-y-3">
          {showOptions && [1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="w-10 h-10 bg-white rounded-lg border border-slate-100 flex items-center justify-center">
                <Globe size={16} className="text-slate-400" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-2 w-2/3 bg-slate-200 rounded-full"></div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VisibilityAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [counts, setCounts] = useState([0, 0, 0]);
  const targets = [95, 100, 88];

  useEffect(() => {
    if (isInView) {
      setCounts([0, 0, 0]);
      const intervals = targets.map((target, i) => {
        return setInterval(() => {
          setCounts(prev => {
            const next = [...prev];
            if (next[i] < target) {
              next[i] += 1;
            }
            return next;
          });
        }, 30);
      });
      return () => intervals.forEach(clearInterval);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden p-8">
      <div className="flex items-center justify-between mb-8">
        <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">AI Readability Score</h5>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-emerald-600">Optimizing...</span>
        </div>
      </div>

      <div className="space-y-6">
        {[
          { label: "Semantic Mapping", color: "bg-brand-500" },
          { label: "Schema.org Injection", color: "bg-emerald-500" },
          { label: "Agentic Metadata", color: "bg-blue-500" }
        ].map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
              <span className="text-slate-500">{item.label}</span>
              <span className="text-slate-900">{counts[i]}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${counts[i]}%` : 0 }}
                transition={{ duration: 0.1 }}
                className={`h-full ${item.color}`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.5 }}
        className="mt-10 p-4 bg-brand-50 rounded-2xl border border-brand-100 flex items-center gap-4"
      >
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Zap className="text-brand-600" size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">Visibility Boost</p>
          <p className="text-lg font-black text-slate-900 tracking-tight">+420% AI Discovery</p>
        </div>
      </motion.div>
    </div>
  );
};

const AccessibilityAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div ref={ref} className="w-full max-w-md relative p-4">
      {/* Data Particles */}
      <AnimatePresence>
        {isInView && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "20%", y: "50%", opacity: 0, scale: 0 }}
            animate={{ 
              x: "80%", 
              y: ["40%", "60%", "40%"],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.4,
              ease: "linear"
            }}
            className="absolute w-2 h-2 bg-brand-400 rounded-full z-10 blur-[1px]"
          />
        ))}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          animate={isInView ? { x: [0, -5, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex flex-col items-center text-center relative z-20"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
            <Store size={24} className="text-slate-400" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Legacy Store</p>
          <div className="space-y-1.5 w-full">
            <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
            <div className="h-1.5 w-2/3 bg-slate-100 rounded-full mx-auto"></div>
          </div>
          <div className="mt-6 w-full py-2 bg-slate-100 rounded-lg text-[8px] font-black text-slate-400 uppercase">Inaccessible</div>
        </motion.div>

        <div className="flex items-center justify-center">
          <motion.div
            animate={{ x: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="text-brand-500" size={32} />
          </motion.div>
        </div>

        <motion.div 
          animate={isInView ? { x: [0, 5, 0], scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 4, repeat: Infinity }}
          className="col-start-2 row-start-1 bg-brand-600 rounded-3xl p-6 shadow-2xl shadow-brand-500/20 flex flex-col items-center text-center text-white relative z-20"
        >
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
            <Cpu size={24} className="text-white" />
          </div>
          <p className="text-[10px] font-bold text-white/60 uppercase mb-2">Agent-Native</p>
          <div className="space-y-1.5 w-full">
            <div className="h-1.5 w-full bg-white/20 rounded-full"></div>
            <div className="h-1.5 w-2/3 bg-white/20 rounded-full mx-auto"></div>
          </div>
          <div className="mt-6 w-full py-2 bg-emerald-500 rounded-lg text-[8px] font-black text-white uppercase flex items-center justify-center gap-1">
            <CheckCircle2 size={10} /> Accessible
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CheckoutAnimation = () => {
  const [status, setStatus] = useState<'processing' | 'complete' | 'verified'>('processing');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setStatus('processing');
      const timer1 = setTimeout(() => setStatus('complete'), 2500);
      const timer2 = setTimeout(() => setStatus('verified'), 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isInView]);

  return (
    <div ref={ref} className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="bg-[#092C4C] p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-brand-400" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Agentix Pay</span>
          </div>
          <span className="text-[10px] font-bold opacity-60">Session: #8921-AC</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Autonomous Transaction</p>
              <p className="text-3xl font-black tracking-tighter">$842.00</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Status</p>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={status}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`text-xs font-black uppercase ${status === 'processing' ? 'text-brand-400 animate-pulse' : 'text-emerald-400'}`}
                >
                  {status === 'processing' ? 'Processing' : 'Success'}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {[
          { label: "Agent Identity Verified", delay: 0.5 },
          { label: "Proof of Liquidity Confirmed", delay: 1.2 },
          { label: "Autonomous Mandate Signed", delay: 2.0 }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <span className="text-xs font-medium text-slate-600">{item.label}</span>
            <div className="relative w-4 h-4">
              <AnimatePresence mode="wait">
                {status === 'processing' && (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full"
                    />
                  </motion.div>
                )}
                {(status === 'complete' || status === 'verified') && (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0"
                  >
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
        
        <motion.button
          animate={{ 
            backgroundColor: status === 'verified' ? "#10b981" : "#3853e6",
            scale: status === 'verified' ? [1, 1.05, 1] : 1
          }}
          className="w-full py-4 text-white rounded-xl font-black uppercase tracking-widest text-[10px] mt-4 shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
        >
          <AnimatePresence mode="wait">
            {status !== 'verified' ? (
              <motion.span
                key="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {status === 'processing' ? 'Authorizing...' : 'Transaction Complete'}
              </motion.span>
            ) : (
              <motion.div
                key="verified"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 size={16} />
                <span>Verified & Settled</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default HowItWorks;
