import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, TrendingUp, DollarSign, Clock, Activity, 
  ArrowRight, Zap, Link2, CreditCard, Shield, Globe 
} from 'lucide-react';

// --- Helper Components from original Nexus.tsx ---

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

      const easedProgress = 1 - Math.pow(1 - progress, 5);
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

const AnimatedLiveStatus = () => {
  const [status, setStatus] = useState('CONNECTING...');
  useEffect(() => {
    const sequence = [
      { text: 'OFFLINE', delay: 100 },
      { text: 'HANDSHAKING...', delay: 400 },
      { text: 'LIVE NETWORK', delay: 800 }
    ];
    let timers: NodeJS.Timeout[] = [];
    sequence.forEach((s) => timers.push(setTimeout(() => setStatus(s.text), s.delay)));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
        status === 'LIVE NETWORK' ? 'bg-emerald-500 animate-pulse' : 
        status === 'HANDSHAKING...' ? 'bg-amber-400' : 'bg-slate-500'
      }`}></div>
      <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-500 ${status === 'LIVE NETWORK' ? 'text-white' : 'text-slate-400'}`}>
        {status}
      </span>
    </div>
  );
};

const BrowserChrome = ({ children, url }: any) => (
  <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden w-full max-w-4xl mx-auto">
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
    <div className="p-4 md:p-8 overflow-hidden bg-white">
      {children}
    </div>
  </div>
);

// --- Content Steps ---

const DashboardOverview = () => (
  <div className="w-full">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Nexus Analytics</h4>
        <p className="text-xs text-slate-400 font-medium tracking-wide">Real-time aggregate performance metrics</p>
      </div>
      <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-2">
        <AnimatedLiveStatus />
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Platform Revenue', value: '$161.68', trend: '+18.2%', icon: <DollarSign size={14} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Total GMV', value: '$5,574.57', trend: '+12.3%', icon: <TrendingUp size={14} />, color: 'text-brand-500', bg: 'bg-brand-50' },
        { label: 'Pending Settlement', value: '$553.86', trend: '5 txns', icon: <Clock size={14} />, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Success Rate', value: '98.7%', trend: '+0.2%', icon: <Activity size={14} />, color: 'text-purple-500', bg: 'bg-purple-50' }
      ].map((stat, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <span className={`text-[10px] font-black ${stat.color}`}>{stat.trend}</span>
          </div>
          <p className="text-xl font-black text-slate-900 mb-0.5">
            <AnimatedCounter value={stat.value} delay={0.5 + i * 0.1} />
          </p>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    <div className="h-40 w-full bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden relative flex items-center justify-center">
       <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
       <div className="flex items-center gap-16 z-10 shrink-0">
          <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-brand-600 shadow-sm relative">
                <Database size={24} />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-brand-500 rounded-2xl blur-md -z-10"></motion.div>
             </div>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol Node</span>
          </div>
          <div className="h-px w-48 bg-gradient-to-r from-brand-500 via-purple-500 to-emerald-500 relative">
             <motion.div animate={{ left: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute w-8 h-full bg-white/80 blur-sm"></motion.div>
          </div>
          <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                <Shield size={24} />
             </div>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Ledger</span>
          </div>
       </div>
    </div>
  </div>
);

const TransactionLedger = () => (
  <div className="w-full">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Real-time Ledger</h4>
        <p className="text-xs text-slate-400 font-medium tracking-wide">Last 100 agent transactions</p>
      </div>
    </div>

    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
       <table className="w-full text-left">
          <thead>
             <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Agent Identification</th>
                <th className="px-6 py-4">Dest.</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Protocol</th>
                <th className="px-12 py-4">Sync Status</th>
             </tr>
          </thead>
          <tbody className="text-[11px] font-bold text-slate-900">
             {[
                { time: '14:22:01', agent: 'Gemini-Auto-Buy', dest: 'Apple', amt: '$1,299.00', prot: 'MCP', status: 'SETTLED' },
                { time: '14:21:55', agent: 'Claude-Shop-92', dest: 'Nike', amt: '$125.40', prot: 'UCP', status: 'SETTLED' },
                { time: '14:21:48', agent: 'GPT-Agent-Primary', dest: 'Stripe', amt: '$840.12', prot: 'ACP', status: 'CLEARING' },
                { time: '14:21:40', agent: 'Perplexity-Reseller', dest: 'Bose', amt: '$329.99', prot: 'MCP', status: 'SETTLED' },
                { time: '14:21:32', agent: 'Claude-Shop-92', dest: 'Etsy', amt: '$42.15', prot: 'UCP', status: 'SETTLED' }
             ].map((row, i) => (
                <motion.tr 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-slate-50 last:border-0"
                >
                   <td className="px-6 py-4 font-mono text-slate-400">{row.time}</td>
                   <td className="px-6 py-4 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-[10px]">🤖</div>
                      {row.agent}
                   </td>
                   <td className="px-6 py-4 opacity-50">{row.dest}</td>
                   <td className="px-6 py-4 font-black">{row.amt}</td>
                   <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-600 text-[9px] font-black border border-brand-100">{row.prot}</span>
                   </td>
                   <td className="px-12 py-4">
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'SETTLED' ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`}></div>
                         <span className={row.status === 'SETTLED' ? 'text-emerald-600' : 'text-amber-600'}>{row.status}</span>
                      </div>
                   </td>
                </motion.tr>
             ))}
          </tbody>
       </table>
    </div>
  </div>
);

const SettlementFlow = () => (
  <div className="w-full">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Settlement Engine</h4>
        <p className="text-xs text-slate-400 font-medium tracking-wide">Automated merchant payouts & fee calculations</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm"
       >
          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Payout Architecture</h5>
          <div className="space-y-6">
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-3"><div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">💳</div> Incoming Transaction</span>
                <span className="text-lg font-black text-slate-900">$2,450.00</span>
             </div>
             
             <div className="px-6 space-y-4 relative py-2 pt-0">
                <div className="absolute left-10 top-0 bottom-0 w-px bg-slate-200 border-dashed border-l"></div>
                <div className="flex items-center justify-between pl-10">
                   <span className="text-xs font-bold text-emerald-600">Platform Fee (2.9%)</span>
                   <span className="text-xs font-black text-emerald-600">-$71.05</span>
                </div>
                <div className="flex items-center justify-between pl-10">
                   <span className="text-xs font-bold text-slate-400">Processing Fees</span>
                   <span className="text-xs font-black text-slate-400">-$63.70</span>
                </div>
             </div>

             <div className="p-6 bg-brand-50 border border-brand-100 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                      <Zap size={20} />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-brand-600 uppercase tracking-[0.2em] mb-1">Instant Payout</p>
                      <h6 className="text-xs font-black text-slate-900">Merchant Net Settlement</h6>
                   </div>
                </div>
                <span className="text-2xl font-black text-brand-600">$2,315.25</span>
             </div>
          </div>
       </motion.div>

       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
       >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,83,230,0.1),transparent)]"></div>
          <h5 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-8">Payout Schedule</h5>
          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Today, May 12</p>
                <div className="text-2xl font-black text-white mb-2">$8,540.12</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   PROCESSING
                </div>
             </div>
             <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Tomorrow, May 13</p>
                <div className="text-2xl font-black text-white/60 mb-2">$12,110.84</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                   SCHEDULED
                </div>
             </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
              <div>
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Vaulted</p>
                 <div className="text-4xl font-black text-white">
                    <AnimatedCounter value="$342,109.90" delay={0.5} />
                 </div>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                 <Link2 size={24} className="text-brand-400" />
              </div>
          </div>
       </motion.div>
    </div>
  </div>
);

// --- Main Animation Component ---

const NexusAnimation: React.FC = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = [
            { step: 0, delay: 0 },
            { step: 1, delay: 4000 },
            { step: 2, delay: 8000 },
        ];

        let timeouts: number[] = [];
        const run = () => {
            sequence.forEach(s => {
                timeouts.push(window.setTimeout(() => setStep(s.step), s.delay));
            });
        };

        run();
        const interval = setInterval(() => {
            timeouts.forEach(clearTimeout);
            timeouts = [];
            run();
        }, 12000);

        return () => {
            clearInterval(interval);
            timeouts.forEach(clearTimeout);
        };
    }, []);

    const stepLabel = [
      "Real-time Monitoring",
      "Deep Ledger Visibility",
      "Automated Settlement"
    ];

    return (
        <div className="w-full py-12">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                
                {/* Visual Progress Indictor */}
                <div className="flex gap-4 mb-12">
                    {stepLabel.map((label, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <motion.div 
                                animate={{ 
                                    scale: step === i ? 1 : 0.9,
                                    opacity: step === i ? 1 : 0.3
                                }}
                                className={`w-36 h-1 rounded-full ${step === i ? 'bg-brand-500' : 'bg-slate-200'} transition-colors duration-500`}
                            />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step === i ? 'text-slate-900' : 'text-slate-300'} transition-colors duration-500`}>
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                <BrowserChrome url="nexus.agentix.protocol/merchant/dashboard">
                    <div className="relative min-h-[550px] w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                {step === 0 && <DashboardOverview />}
                                {step === 1 && <TransactionLedger />}
                                {step === 2 && <SettlementFlow />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </BrowserChrome>

                {/* Sub-description that updates with step */}
                <motion.div 
                  key={step + "desc"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 text-center max-w-2xl px-6"
                >
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                        {step === 0 && "Global Merchant Visibility"}
                        {step === 1 && "Unbreakable Trust Layers"}
                        {step === 2 && "Liquidity at Internet Speed"}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        {step === 0 && "Nexus transforms legacy storefronts into agent-aware nodes that automatically sync inventory and status across all major LLM search grids."}
                        {step === 1 && "Every interaction is logged on a verifiable machine-readable ledger, providing merchants with absolute transparency into how agents discover and pay."}
                        {step === 2 && "Autonomous commerce moves faster than human banking. Nexus settles payouts instantly, routing funds across legacy and crypto rails in milliseconds."}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default NexusAnimation;
