import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Search, CheckCircle2, ArrowRight, TrendingUp, BarChart3, Zap, Shield, Globe, Cpu, MousePointer2, HelpCircle, ChevronDown } from 'lucide-react';

// --- Helper Components ---

const BrowserChrome = ({ children, url }: any) => (
  <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden w-full max-w-2xl mx-auto">
    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-4">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
      </div>
      <div className="flex-1 bg-slate-200/50 rounded-lg px-3 py-1 flex items-center justify-between">
        <span className="text-[10px] text-slate-500 font-mono truncate">{url}</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full border border-brand-500"></div>
          <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Agentix</span>
        </div>
      </div>
    </div>
    <div className="p-6 md:p-10">
      {children}
    </div>
  </div>
);

const ScanContent = () => (
  <div className="w-full">
    <div className="relative h-48 mb-6 rounded-2xl overflow-hidden border border-slate-100">
      <img 
        src="https://picsum.photos/seed/agentix-scan/800/400" 
        alt="AI Scan" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-brand-900/20 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">AI Commerce Readiness Scan</p>
    <div className="flex gap-3 mb-8">
      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <Globe size={16} className="text-slate-400" />
        <span className="text-sm font-bold text-slate-900">sneakersco.myshopify.com</span>
      </div>
      <button className="bg-brand-600 text-white px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2">
        Analyze <ArrowRight size={16} />
      </button>
    </div>
    
    <div className="space-y-4">
      <div className="flex justify-between items-center text-[10px] font-bold">
        <span className="text-emerald-600 flex items-center gap-1">
          <CheckCircle2 size={12} /> Scan complete
        </span>
        <span className="text-slate-400">100%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full w-full bg-emerald-500"></div>
      </div>
      
      <div className="space-y-2 pt-4">
        {['Analyzing 284 product listings', 'Checking AI readability signals', 'Calculating keyword intelligence', 'Estimating revenue opportunity'].map((text, i) => (
          <div key={i} className="flex items-center gap-3 text-xs font-medium text-slate-600">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
            {text}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ScoreContent = () => (
  <div className="w-full">
    <div className="relative h-40 mb-8 rounded-2xl overflow-hidden border border-slate-100">
      <img 
        src="https://picsum.photos/seed/agentix-score/800/400" 
        alt="Radar Score" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex items-center gap-8 mb-10">
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r="45%" className="fill-none stroke-slate-100 stroke-[8]" />
          <circle cx="50%" cy="50%" r="45%" className="fill-none stroke-brand-500 stroke-[8]" strokeDasharray="283" strokeDashoffset="74" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl md:text-4xl font-black text-slate-900">74</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">/ 100</span>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-black text-slate-900 mb-1">Radar Score</h4>
        <p className="text-xs text-slate-500 font-medium mb-3">sneakersco.myshopify.com<br/>Scanned 284 products</p>
        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
          <TrendingUp size={12} /> +6 pts this month
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
      {[
        { label: 'Description Depth', score: 72, color: 'bg-emerald-500' },
        { label: 'Product Specificity', score: 58, color: 'bg-brand-500' },
        { label: 'Keyword Intelligence', score: 82, color: 'bg-emerald-500' },
        { label: 'AI Readability', score: 44, color: 'bg-brand-500' },
        { label: 'Content Signals', score: 67, color: 'bg-brand-500' }
      ].map((item, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className="text-slate-500">{item.label}</span>
            <span className="text-slate-900">{item.score}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FixContent = () => (
  <div className="w-full">
    <div className="relative h-32 mb-6 rounded-2xl overflow-hidden border border-slate-100">
      <img 
        src="https://picsum.photos/seed/agentix-fix/800/400" 
        alt="Product Breakdown" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex justify-between items-center mb-8">
      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Product Breakdown</h4>
      <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">3 of 284</span>
    </div>
    
    <div className="space-y-4">
      {[
        { name: 'Air Max Pro 2024', score: 88, status: 'Strong', color: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-500', desc: 'Well-structured descriptions. Good keyword density. AI agents read this clearly.' },
        { name: 'Classic Leather Runner', score: 62, status: 'Improve', color: 'text-amber-600', bg: 'bg-amber-50', bar: 'bg-amber-500', desc: 'Missing material specs & size context. Add structured data to boost AI visibility.' },
        { name: 'Urban Trail Hiker', score: 38, status: 'Critical', color: 'text-red-600', bg: 'bg-red-50', bar: 'bg-red-500', desc: 'Thin description. No use-case context. AI agents skip this product entirely.' }
      ].map((item, i) => (
        <div key={i} className="border border-slate-100 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center text-xs font-black ${item.color}`}>{item.score}</div>
              <span className="text-sm font-bold text-slate-900">{item.name}</span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</span>
          </div>
          <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
            <div className={`h-full ${item.bar}`} style={{ width: `${item.score}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            {item.status === 'Strong' ? '✓' : item.status === 'Improve' ? '!' : '×'} {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const GrowContent = () => (
  <div className="w-full">
    <div className="relative h-40 mb-6 rounded-2xl overflow-hidden border border-slate-100">
      <img 
        src="https://picsum.photos/seed/agentix-grow/800/400" 
        alt="Growth Opportunity" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="bg-gradient-to-br from-[#092C4C] to-brand-900 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/20 blur-3xl rounded-full"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">AI Growth Opportunity</p>
      <h4 className="text-4xl font-black mb-4">+$84K / year</h4>
      <p className="text-[10px] font-medium opacity-80 leading-relaxed mb-6">Estimated revenue uplift after implementing Agentix recommendations across your catalog.</p>
      <div className="flex gap-2">
        {['Fix descriptions', 'Add AI data', 'Enable checkout'].map((tag, i) => (
          <div key={i} className="px-2 py-1 bg-white/10 rounded-lg text-[8px] font-bold uppercase tracking-wider flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-emerald-400"></div> {tag}
          </div>
        ))}
      </div>
    </div>
    
    <div className="border border-slate-100 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">AEO Score — 6 months</h5>
        <span className="text-[10px] font-black text-emerald-600">+54% AI visibility</span>
      </div>
      <div className="h-32 w-full relative">
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M0 35 Q 20 32, 40 25 T 80 10 T 100 5" fill="none" stroke="#3853e6" strokeWidth="2" />
          <path d="M0 35 Q 20 32, 40 25 T 80 10 T 100 5 V 40 H 0 Z" fill="url(#chartGrad)" />
          <defs>
            <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3853e6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3853e6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest pt-2">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </div>
    </div>
  </div>
);

const STEPS = [
  {
    id: 'scan',
    number: "01",
    tag: "SCAN",
    title: "Enter your store URL.",
    description: "Paste any eCommerce URL and Agentix Radar crawls your entire product catalog — analyzing every listing for AI readability, description depth, keyword intelligence, and more.",
    content: <ScanContent />
  },
  {
    id: 'score',
    number: "02",
    tag: "SCORE",
    title: <>See your <span className="text-brand-600">AEO Score.</span></>,
    description: "Your AI Engine Optimization score breaks down across 5 critical signals. Know exactly how AI shopping agents perceive your store — and where you're losing visibility.",
    content: <ScoreContent />
  },
  {
    id: 'fix',
    number: "03",
    tag: "FIX",
    title: "Product-level recommendations.",
    description: "Every product scored individually. Red means critical. Amber means fixable. Green means strong. Radar tells you exactly what to change and why it matters to AI agents.",
    content: <FixContent />
  },
  {
    id: 'grow',
    number: "04",
    tag: "GROW",
    title: <>Unlock your <br/> <span className="text-brand-600">AI revenue.</span></>,
    description: "See the exact revenue you're leaving on the table. Track your score month over month and watch the compounding impact as AI agents discover — and buy from — your store.",
    content: <GrowContent />
  }
];

const RadarSearchBar = ({ dark = false }: { dark?: boolean }) => (
  <div className="w-full max-w-xl mx-auto mt-12">
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        window.open('https://agentixpay.substack.com/p/agentixpay-white-paper', '_blank');
      }}
      className="relative group/search"
    >
      <div className={`absolute -inset-1 bg-gradient-to-r ${dark ? 'from-brand-400/30 to-blue-400/30' : 'from-brand-500/20 to-blue-500/20'} rounded-2xl blur opacity-25 group-focus-within/search:opacity-100 transition-opacity`}></div>
      <div className="relative flex items-center">
        <input 
          type="text" 
          placeholder="Enter your store URL (e.g. store.com)"
          className={`w-full ${dark ? 'bg-white/10 text-white border-white/20 placeholder:text-white/40' : 'bg-white text-slate-900 border-slate-200 placeholder:text-slate-400'} backdrop-blur border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-brand-500/50 transition-all shadow-sm`}
        />
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: dark ? "#ffffff" : "#3853e6" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className={`absolute right-2 px-6 py-2 ${dark ? 'bg-white text-brand-900' : 'bg-slate-900 text-white'} text-xs font-black rounded-xl transition-all uppercase tracking-widest shadow-lg hover:shadow-brand-500/20`}
        >
          Check score
        </motion.button>
      </div>
      <p className={`mt-3 text-[9px] ${dark ? 'text-white/50' : 'text-slate-500'} font-bold uppercase tracking-wider`}>
        Free check: can AI agents find your products?
      </p>
    </form>
  </div>
);

const Radar: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-[#092C4C] flex flex-col items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-12">
            <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">Agentix Radar — AI Commerce Readiness</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            Know your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">AI score.</span>
          </h1>
          
          <p className="text-slate-400 font-bold text-xl md:text-2xl mb-12 tracking-tight">agentixpay.ai</p>
          
          <RadarSearchBar dark />
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="flex flex-col items-center gap-2 text-slate-500 mt-24"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll to see how it works</span>
            <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-32 bg-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-4">How Agentix Radar Works</p>
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
            From scan to revenue — <br/> in four steps.
          </h2>
        </motion.div>
      </section>

      {/* Sticky Scroll Section */}
      <section ref={containerRef} className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-0">
          
          {/* Left Side: Scrolling Text */}
          <div className="w-full lg:w-1/2">
            {STEPS.map((step, index) => (
              <StepContent 
                key={step.id} 
                step={step} 
                index={index} 
                onInView={() => setActiveStep(index)} 
              />
            ))}
          </div>

          {/* Right Side: Sticky Browser */}
          <div className="hidden lg:flex w-1/2 sticky top-32 h-[calc(100vh-8rem)] items-center justify-center z-40">
            <div className="w-full max-w-2xl p-4 md:p-8 bg-slate-50 rounded-[3rem] shadow-inner relative overflow-hidden flex items-center justify-center border border-slate-100">
              <div className="absolute top-4 right-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Step {activeStep + 1} / 4</div>
              <BrowserChrome url="agentixpay-dashboard.fly.dev/radar">
                <div className="relative h-[450px] w-full min-w-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      {STEPS[activeStep].content}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </BrowserChrome>
            </div>
          </div>
        </div>
      </section>

      {/* Big Picture Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-6">The Big Picture</p>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
              From Prompt <br/> to <span className="text-brand-600">Payment.</span>
            </h2>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
              Radar is just the start. Agentix makes your platform fully agentic commerce ready — from AI visibility through to autonomous checkout and AI-driven payment rails.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <BigPictureMockup />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-[#092C4C] text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-12 leading-none">
            Ready to be <br/> <span className="text-brand-400">Agent-Native?</span>
          </h2>
          <RadarSearchBar dark />
        </motion.div>
      </section>
    </div>
  );
};

const StepContent = ({ step, index, onInView }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col justify-center py-20 relative">
      <div className="relative pl-8 md:pl-12">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-600 via-emerald-400 to-transparent rounded-full opacity-50"></div>
        <p className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-6">{step.number} — {step.tag}</p>
        <h3 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">{step.title}</h3>
        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-md mb-12">{step.description}</p>
        
        {/* Mobile Mockup (Only visible on small screens) */}
        <div className="lg:hidden bg-slate-50 p-6 rounded-[2rem] shadow-inner mb-12">
          <BrowserChrome url="agentixpay-dashboard.fly.dev/radar">
            {step.content}
          </BrowserChrome>
        </div>
      </div>
    </div>
  );
};

const BigPictureMockup = () => (
  <BrowserChrome url="agentixpay-dashboard.fly.dev/radar">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Agentix Platform</p>
    <div className="space-y-4">
      {[
        { icon: '🤖', title: 'AI Agent Prompts', desc: 'User asks AI assistant to find & buy a product' },
        { icon: '📡', title: 'Radar Scores Your Store', desc: 'High AEO score = your products surface first' },
        { icon: '⚡', title: 'Autonomous Checkout', desc: 'Agentix Pay handles the transaction — no friction' },
        { icon: '🔒', title: 'AI Payment Rails', desc: 'Secure, compliant infrastructure built for agents' },
        { icon: '💰', title: 'Revenue Captured', desc: 'Sale complete. Zero lost conversions.' }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg">{item.icon}</div>
            <div>
              <h5 className="text-sm font-bold text-slate-900">{item.title}</h5>
              <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
            </div>
          </div>
          <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={14} />
          </div>
        </div>
      ))}
    </div>
  </BrowserChrome>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all hover:shadow-md hover:border-slate-300">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-8 py-6 flex items-center justify-between text-left">
        <span className="text-lg font-bold text-slate-900">{question}</span>
        <ChevronDown className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-8 pb-6 text-slate-600 leading-relaxed font-medium"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

export default Radar;
