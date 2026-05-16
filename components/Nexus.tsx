import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Zap, Shield, Globe, Cpu, Database, Network, Link2, 
  TrendingUp, BarChart3, CheckCircle2, ArrowRight, 
  ChevronDown, DollarSign, Clock, Activity, CreditCard
} from 'lucide-react';
import ExplainerVideo from './ExplainerVideo';

import NexusAnimation from './NexusAnimation';

// --- Helper Components ---

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

      const easedProgress = 1 - Math.pow(1 - progress, 5); // easeOutQuint for faster feel
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
    sequence.forEach((s, i) => {
      const timer = setTimeout(() => setStatus(s.text), s.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
        status === 'LIVE NETWORK' ? 'bg-emerald-500 animate-pulse' : 
        status === 'HANDSHAKING...' ? 'bg-amber-400' : 
        'bg-slate-500'
      }`}></div>
      <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-500 ${status === 'LIVE NETWORK' ? 'text-white' : 'text-slate-400'}`}>
        {status}
      </span>
    </div>
  );
};

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
    <div className="p-4 md:p-6 overflow-y-auto max-h-[500px] scrollbar-hide">
      {children}
    </div>
  </div>
);

const DashboardOverview = () => (
  <div className="w-full">
    <div className="bg-[#0B131E] -mx-8 -mt-8 px-6 py-4 flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <Database size={18} />
        </div>
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-tight">Nexus Banking Dashboard</h4>
          <p className="text-[10px] text-slate-400 font-medium">Agent transaction monitoring & settlement</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0B131E] bg-slate-700 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-slate-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 mb-6">
      {[
        { label: 'Platform Revenue', value: '$161.68', trend: '+18.2%', icon: <DollarSign size={14} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Total GMV', value: '$5,574.57', trend: '+12.3%', icon: <TrendingUp size={14} />, color: 'text-brand-500', bg: 'bg-brand-50' },
        { label: 'Pending Settlement', value: '$553.86', trend: '5 txns', icon: <Clock size={14} />, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Success Rate', value: '98.7%', trend: '+0.2%', icon: <Activity size={14} />, color: 'text-purple-500', bg: 'bg-purple-50' }
      ].map((stat, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
             {stat.icon}
          </div>
          <div className="flex justify-between items-start mb-1.5">
            <div className={`p-1.5 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <span className={`text-[9px] font-bold ${stat.color.includes('amber') ? 'text-amber-600' : stat.color}`}>{stat.trend}</span>
          </div>
          <p className="text-lg font-black text-slate-900 leading-none mb-0.5">
            <AnimatedCounter value={stat.value} delay={i * 0.1} />
          </p>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
        </motion.div>
      ))}
    </div>
    
    {/* Animated connection grid */}
    <div className="relative h-20 w-full bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center">
       <div className="absolute inset-0 opacity-20">
         <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
       </div>
       <div className="flex items-center gap-12 z-10">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_10px_rgba(var(--brand-500),0.8)]"></motion.div>
          <div className="h-px w-24 bg-gradient-to-r from-brand-500 via-purple-500 to-emerald-500 relative">
             <motion.div 
               animate={{ left: ["0%", "100%"] }} 
               transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
               className="absolute w-4 h-full bg-white/50 blur-sm"
             />
          </div>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1.5 }} className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(var(--emerald-500),0.8)]"></motion.div>
       </div>
    </div>
  </div>
);

const ProtocolBreakdown = () => (
  <div className="w-full">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-900 rounded-2xl p-6 text-white mb-6 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full"></div>
      <h5 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-6">Revenue by Protocol</h5>
      
      <div className="flex gap-8 mb-8">
        {[
          { label: 'ACP', value: '26%', txns: '10 txns', color: 'bg-brand-500' },
          { label: 'UCP', value: '37%', txns: '14 txns', color: 'bg-purple-500' },
          { label: 'MCP', value: '37%', txns: '14 txns', color: 'bg-orange-500' }
        ].map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${p.color}`}></div>
                <span className="text-xs font-black">{p.label}</span>
              </div>
              <p className="text-2xl font-black">
                <AnimatedCounter value={p.value} delay={0.5 + i * 0.1} />
              </p>
              <p className="text-[10px] opacity-40 font-bold uppercase">{p.txns}</p>
            </motion.div>
        ))}
      </div>

      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '26%' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-brand-500"
        ></motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '37%' }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-purple-500"
        ></motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '37%' }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="h-full bg-orange-500"
        ></motion.div>
      </div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="border border-slate-100 rounded-2xl p-4"
    >
      <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Protocol Health</h5>
      <div className="space-y-3">
        {['UCP v1.2 Active', 'ACP Handshake Stable', 'MCP Node Syncing'].map((text, i) => {
          const [status, setStatus] = useState('OFFLINE');
          useEffect(() => {
            const sequence = [
              { text: 'BOOTING', delay: 100 + i * 100 },
              { text: 'HANDSHAKE', delay: 400 + i * 150 },
              { text: 'ONLINE', delay: 800 + i * 200 }
            ];
            
            let timers: NodeJS.Timeout[] = [];
            sequence.forEach(s => {
              const t = setTimeout(() => setStatus(s.text), s.delay);
              timers.push(t);
            });
            
            return () => timers.forEach(clearTimeout);
          }, [i]);

          return (
            <div key={i} className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-slate-600 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${status === 'ONLINE' ? 'bg-emerald-500' : status === 'HANDSHAKE' ? 'bg-amber-400' : 'bg-slate-300'}`}></div> {text}
              </span>
              <span className={`transition-colors duration-500 ${status === 'ONLINE' ? 'text-emerald-600' : status === 'HANDSHAKE' ? 'text-amber-500' : 'text-slate-400'}`}>
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  </div>
);

const TransactionLedger = () => {
  const transactions = [
    { time: '13:45:08', agent: 'Gemini-Buy', merchant: 'TechStore', amount: '$205.69', profit: '$5.97', protocol: 'MCP', status: 'SETTLED', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    { time: '13:45:03', agent: 'Claude-Shop-1', merchant: 'GadgetWorld', amount: '$150.41', profit: '$4.36', protocol: 'UCP', status: 'PENDING', color: 'text-amber-600', bg: 'bg-amber-50/50' },
    { time: '13:44:59', agent: 'Claude-Shop-1', merchant: 'AudioHub', amount: '$71.71', profit: '$2.08', protocol: 'UCP', status: 'PENDING', color: 'text-amber-600', bg: 'bg-amber-50/50' },
    { time: '13:44:54', agent: 'Claude-Shop-1', merchant: 'StyleHouse', amount: '$217.48', profit: '$6.31', protocol: 'MCP', status: 'SETTLED', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    { time: '13:44:48', agent: 'Gemini-Buy', merchant: 'TechStore', amount: '$176.78', profit: '$5.13', protocol: 'UCP', status: 'SETTLED', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    { time: '13:44:43', agent: 'GPT-Store', merchant: 'AudioHub', amount: '$136.60', profit: '$3.96', protocol: 'ACP', status: 'SETTLED', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    { time: '13:44:38', agent: 'Perplexity-Shop', merchant: 'GadgetWorld', amount: '$107.44', profit: '$3.12', protocol: 'ACP', status: 'SETTLED', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="bg-[#0B131E] -mx-8 -mt-8 px-6 py-4 flex items-center justify-between mb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
            <Database size={18} />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Nexus Banking Dashboard</h4>
            <p className="text-[10px] text-slate-400 font-medium">Agent transaction monitoring & settlement</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
            <AnimatedLiveStatus />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="px-4 py-3 font-mono opacity-60">Time</th>
              <th className="px-4 py-3">Agent</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Platform Fee</th>
              <th className="px-4 py-3">Protocol</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-[10px] font-bold text-slate-900">
            {transactions.map((row, i) => {
              const [status, setStatus] = useState(row.status);
              useEffect(() => {
                if (row.status === 'PENDING') {
                  const sequence = [
                    { text: 'STAGING', delay: 400 + i * 200 },
                    { text: 'CLEARING', delay: 900 + i * 300 },
                    { text: 'SETTLED', delay: 1400 + i * 400 }
                  ];
                  let timers: NodeJS.Timeout[] = [];
                  sequence.forEach(s => {
                    timers.push(setTimeout(() => setStatus(s.text), s.delay));
                  });
                  return () => timers.forEach(clearTimeout);
                }
              }, [row.status, i]);

              return (
                <motion.tr 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-4 py-3.5 font-mono text-slate-400 font-medium">{row.time}</td>
                  <td className="px-4 py-3.5">{row.agent}</td>
                  <td className="px-4 py-3.5 opacity-60">{row.merchant}</td>
                  <td className="px-4 py-3.5 font-black">{row.amount}</td>
                  <td className="px-4 py-3.5 text-emerald-600 font-black">{row.profit}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black bg-brand-50 text-brand-600 border border-brand-100`}>
                      {row.protocol}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 min-w-[70px]">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${status === 'SETTLED' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                      <span className={`text-[9px] font-black transition-colors duration-500 ${status === 'SETTLED' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {status}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between px-2 bg-slate-50/50 -mx-8 -mb-8 p-6">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest"><span className="text-slate-900">1,247</span> agent transactions today</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-brand-500"><TrendingUp size={14} /></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest"><span className="text-slate-900 text-sm">$142,380</span> GMV</span>
           </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
           <Zap size={12} className="text-brand-600" />
           <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">
             TechStore <span className="text-slate-400">sold</span> Bose QC45 <span className="text-slate-400">via</span> <span className="text-purple-600">GPT-4</span> <ArrowRight size={10} className="inline mx-1" /> <span className="text-emerald-600">$163.08</span> <span className="text-slate-300 ml-1">UCP</span>
           </span>
        </div>
      </div>
    </div>
  );
};

const SettlementFlow = () => (
  <div className="w-full h-full flex flex-col bg-white">
    <div className="bg-[#0B131E] -mx-8 -mt-8 px-6 py-4 flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
          <Database size={18} />
        </div>
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-tight">Nexus Banking Dashboard</h4>
          <p className="text-[10px] text-slate-400 font-medium">Agent transaction monitoring & settlement</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 flex-1">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
           <div className="w-1 h-5 bg-brand-500 rounded-full"></div>
           <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Flow (Last Transaction)</h5>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <CreditCard size={14} className="text-slate-400" />
              </div>
              Customer Payment
            </span>
            <span className="text-lg font-black text-slate-900">
              <AnimatedCounter value="$289.07" delay={0.1} />
            </span>
          </div>
          
          <div className="px-4 space-y-3 relative py-1">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 border-dashed border-l"></div>
            
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center pl-6"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full border border-emerald-500 bg-white z-10"></div>
                <span className="text-xs font-bold text-emerald-600">Agentix Platform Fee (2.9%)</span>
              </div>
              <span className="text-xs font-black text-emerald-600">
                <AnimatedCounter value="$8.38" delay={0.4} />
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-between items-center pl-6"
            >
               <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full border border-slate-300 bg-white z-10"></div>
                <span className="text-xs font-bold text-slate-400">Processing (2.6% + $0.30)</span>
              </div>
              <span className="text-xs font-black text-slate-400">
                <AnimatedCounter value="$7.82" delay={0.6} />
              </span>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-2 pt-4 border-t border-slate-100 flex justify-between items-center bg-brand-50/30 p-4 rounded-2xl border border-brand-50"
          >
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                 <Link2 size={14} />
               </div>
               <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Merchant Net</span>
            </div>
            <span className="text-xl font-black text-brand-600">
              <AnimatedCounter value="$272.87" delay={0.8} />
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-50 border border-slate-200 rounded-3xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
           <div className="w-1 h-5 bg-brand-500 rounded-full"></div>
           <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Settlement Schedule</h5>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { date: 'May 12 (Today)', amount: '$5,698.15', status: 'Processing', active: true },
            { date: 'May 13', amount: '$5,410.18', status: 'Scheduled', active: false }
          ].map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`flex flex-col justify-center p-3 rounded-xl border ${s.active ? 'bg-white border-emerald-100 shadow-sm' : 'border-slate-200'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full ${s.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                <span className={`text-[10px] font-black ${s.active ? 'text-slate-900' : 'text-slate-500'}`}>{s.date}</span>
              </div>
              <span className={`text-sm font-black ${s.active ? 'text-slate-900' : 'text-slate-600'}`}>
                <AnimatedCounter value={s.amount} delay={0.8 + i * 0.1} />
              </span>
            </motion.div>
          ))}
        </div>
        <div className="pt-4 mt-4 border-t border-slate-200 flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Pending</span>
          <span className="text-lg font-black text-slate-900">
            <AnimatedCounter value="$22,301.95" delay={1.5} />
          </span>
        </div>
      </motion.div>
    </div>
  </div>
);

const ComprehensiveNexusView = () => (
  <div className="w-full h-full flex flex-col bg-white">
    <div className="bg-[#0B131E] -mx-8 -mt-8 px-6 py-4 flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
          <Database size={18} />
        </div>
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-tight">Nexus Banking Dashboard</h4>
          <p className="text-[10px] text-slate-400 font-medium">Agent transaction monitoring & settlement</p>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead>
          <tr className="bg-white text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <th className="px-3 py-2 font-mono opacity-60">Time</th>
            <th className="px-3 py-2">Agent</th>
            <th className="px-3 py-2">Dest.</th>
            <th className="px-3 py-2">Amount</th>
            <th className="px-3 py-2">Profit</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-[10px] font-bold text-slate-900">
          {([
            { time: '13:45:08', agent: 'Gemini-B', merchant: 'Tech', amount: '$205.69', profit: '$5.97', protocol: 'MCP', status: 'SETTLED' },
            { time: '13:45:03', agent: 'Claude-S', merchant: 'Gadget', amount: '$150.41', profit: '$4.36', protocol: 'UCP', status: 'PENDING' },
            { time: '13:44:59', agent: 'Claude-S', merchant: 'Audio', amount: '$71.71', profit: '$2.08', protocol: 'UCP', status: 'PENDING' },
            { time: '13:44:54', agent: 'Claude-S', merchant: 'Style', amount: '$217.48', profit: '$6.31', protocol: 'MCP', status: 'SETTLED' },
            { time: '13:44:48', agent: 'Gemini-B', merchant: 'Tech', amount: '$176.78', profit: '$5.13', protocol: 'UCP', status: 'SETTLED' },
          ] as const).map((row, i) => {
            const [status, setStatus] = useState(row.status);
            useEffect(() => {
              if (row.status === 'PENDING') {
                const sequence = [
                  { text: 'VALIDATING', delay: 500 + i * 250 },
                  { text: 'CLEARING', delay: 1000 + i * 350 },
                  { text: 'SETTLED', delay: 1500 + i * 450 }
                ];
                let timers: NodeJS.Timeout[] = [];
                sequence.forEach(s => {
                  timers.push(setTimeout(() => setStatus(s.text), s.delay));
                });
                return () => timers.forEach(clearTimeout);
              }
            }, [row.status, i]);

            return (
              <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="px-3 py-2 font-mono text-slate-400 font-medium whitespace-nowrap">{row.time}</td>
                <td className="px-3 py-2 whitespace-nowrap">{row.agent}</td>
                <td className="px-3 py-2 opacity-60 whitespace-nowrap">{row.merchant}</td>
                <td className="px-3 py-2 font-black">{row.amount}</td>
                <td className="px-3 py-2 text-emerald-600 font-black">{row.profit}</td>
                <td className="px-3 py-2">
                  <span className="px-1 py-0.5 rounded-md text-[7px] font-black bg-brand-50 text-brand-600 border border-brand-100">{row.protocol}</span>
                </td>
                <td className="px-3 py-2 min-w-[70px]">
                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-black transition-colors duration-500 ${status === 'SETTLED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    ● {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <h5 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Payment Flow (Last Transaction)</h5>
        <div className="space-y-2">
           <div className="flex justify-between text-[10px] font-bold"><span className="text-slate-500">Customer Payment</span> <span className="font-black">$289.07</span></div>
           <div className="pl-4 space-y-1">
             <div className="flex justify-between text-[9px] font-bold text-emerald-600"><span>Agentix Platform Fee (2.9%)</span> <span>$8.38</span></div>
             <div className="flex justify-between text-[9px] font-bold text-slate-400"><span>Processing (2.6% + $0.30)</span> <span>$7.82</span></div>
           </div>
           <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] font-black text-brand-600"><span>Merchant Net</span> <span>$272.87</span></div>
        </div>
      </div>
      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <h5 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Settlement Schedule</h5>
        <div className="space-y-2">
           <div className="flex justify-between text-[9px] font-bold text-slate-900">
             <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-emerald-500"></div> May 12 (Today)</span>
             <span className="font-black">$5,698.15</span>
           </div>
           <div className="flex justify-between text-[9px] font-bold text-slate-400">
             <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-slate-300"></div> May 13</span>
             <span className="font-black">$5,410.18</span>
           </div>
           <div className="flex justify-between text-[9px] font-bold text-slate-400">
             <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-slate-300"></div> May 14</span>
             <span className="font-black">$15,548.04</span>
           </div>
           <div className="pt-2 flex justify-between text-[9px] font-black text-slate-900 leading-none">
             <span className="text-slate-400 uppercase">Total Pending</span>
             <span>$22,301.95</span>
           </div>
        </div>
      </div>
    </div>

    <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100 bg-[#0B131E] -mx-8 -mb-8 px-6 py-3">
       <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5"><AnimatedLiveStatus /></div>
          <span className="text-[8px] font-bold text-slate-500"><span className="text-white"><AnimatedCounter value={1247} delay={1} /></span> agent transactions today</span>
          <span className="text-[8px] font-bold text-slate-500"><span className="text-white"><AnimatedCounter value="$142,380" delay={1.2} /></span> GMV</span>
       </div>
       <div className="text-[8px] font-bold text-white flex items-center gap-2">
          <span className="text-brand-400">TechStore</span> sold Bose QC45 via <span className="text-purple-400">GPT-4</span> → <span className="text-emerald-400 font-black"><AnimatedCounter value="$163.08" delay={1.5} /></span> <span className="bg-purple-500/20 px-1 rounded text-[7px]">UCP</span>
       </div>
    </div>
  </div>
);


interface NexusProps {
  isEmbedded?: boolean;
}

const AnimatedChatPreview = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const sequence = [
      { step: 0, delay: 1000 },  // Initial state
      { step: 1, delay: 2000 },  // User message
      { step: 2, delay: 2500 },  // AI Thinking
      { step: 3, delay: 1500 },  // AI Reply
      { step: 4, delay: 2000 },  // Checkout Card
      { step: 5, delay: 1000 },  // Click Buy
      { step: 6, delay: 3000 },  // Confirmed
    ];

    let timer: NodeJS.Timeout;
    const runSequence = (index: number) => {
      if (index >= sequence.length) {
        timer = setTimeout(() => {
          setStep(0);
          runSequence(0);
        }, 4000);
        return;
      }

      setStep(sequence[index].step);
      timer = setTimeout(() => runSequence(index + 1), sequence[index].delay);
    };

    runSequence(0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#1A1D21] p-6 rounded-3xl w-full max-w-md border border-white/5 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,83,230,0.05),transparent)] pointer-events-none"></div>
      
      <div className="space-y-4 flex-1">
        {/* User Message */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex justify-end"
            >
              <div className="bg-[#2A2D32] p-4 rounded-2xl rounded-tr-none px-5 max-w-[85%] border border-white/5">
                <p className="text-slate-200 text-sm font-medium">Find me a black merino wool crewneck, under $120</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* AI Message */}
        <AnimatePresence>
          {step >= 2 && step < 3 && (
             <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex justify-start pl-2"
            >
              <div className="flex gap-1.5 p-3 rounded-2xl bg-white/5">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-brand-400"></motion.div>
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-brand-400"></motion.div>
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-brand-400"></motion.div>
              </div>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex justify-start"
            >
              <div className="bg-brand-600/20 border border-brand-600/30 p-4 rounded-2xl rounded-tl-none px-5 max-w-[85%]">
                <p className="text-brand-100 text-sm font-medium leading-relaxed">Found a perfect match: <span className="font-bold text-white">Theory Merino Crewneck</span>. $98. Verified authentic, ships in 2 days from NYC.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkout Card */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 20, rotateX: 30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              className="bg-[#121417] border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden group mt-2"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                 <Zap size={60} />
              </div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-[#1A1D21] border border-white/5 rounded-xl flex items-center justify-center text-slate-500">
                    <div className="w-8 h-8 rounded-md bg-slate-800 animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="text-slate-200 text-sm font-black uppercase tracking-tight">Merino Crewneck</h4>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Black / Medium</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-lg font-black tracking-tighter leading-none">$98.00</p>
                  <p className="text-emerald-500 text-[9px] font-black uppercase tracking-widest mt-1">In Stock</p>
                </div>
              </div>

              {step === 4 && (
                 <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-brand-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-brand-600/20 hover:bg-brand-500 transition-all flex items-center justify-center gap-2 group"
                >
                  Buy now — instant checkout
                  <ArrowRight size={14} className="opacity-60 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}

              {step === 5 && (
                <div className="w-full py-4 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 overflow-hidden relative">
                   <motion.div 
                     initial={{ left: "-100%" }}
                     animate={{ left: "100%" }}
                     transition={{ duration: 0.8, ease: "linear" }}
                     className="absolute inset-0 bg-white/20 skew-x-12"
                   />
                   Processing...
                </div>
              )}

              {step >= 6 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="w-full py-4 bg-emerald-600/20 border border-emerald-500/20 text-emerald-400 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                   <CheckCircle2 size={14} />
                   Verified Purchased
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Mini Notification */}
        <AnimatePresence>
          {step >= 6 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#05070a] border border-emerald-500/30 p-3 rounded-xl flex items-center gap-3 mt-4"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Shield size={16} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white uppercase tracking-tight">Order Confirmed</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Nexus ID: AX-4081-992</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between opacity-40">
        <div className="flex gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        </div>
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Protocol: ACP v1.4</span>
      </div>
    </div>
  );
};

const Nexus: React.FC<NexusProps> = ({ isEmbedded }) => {
  const [activeView, setActiveView] = useState<'customer' | 'merchant' | 'ecommerce'>('customer');

  const workflowData = {
    customer: [
      { step: "01", title: "Discovery", desc: "Products become visible inside AI environments.", icon: <Globe size={24} /> },
      { step: "02", title: "Context", desc: "Users receive relevant, real-time product understanding.", icon: <Database size={24} /> },
      { step: "03", title: "Execution", desc: "Transactions are completed directly within the LLM.", icon: <Zap size={24} /> },
      { step: "04", title: "Verification", desc: "Orders are confirmed and recorded in real time.", icon: <CheckCircle2 size={24} /> }
    ],
    merchant: [
      { step: "01", title: "Visibility", desc: "Products are surfaced within AI-driven discovery environments.", icon: <Globe size={24} /> },
      { step: "02", title: "Engagement", desc: "Intent-qualified users are directed toward product understanding.", icon: <Activity size={24} /> },
      { step: "03", title: "Conversion", desc: "Purchases are completed directly within AI interfaces.", icon: <DollarSign size={24} /> },
      { step: "04", title: "Fulfillment", desc: "Orders are verified and tracked in real time.", icon: <Clock size={24} /> }
    ],
    ecommerce: [
      { step: "01", title: "Integration", desc: "Connect merchant inventories to the AI economic grid.", icon: <Link2 size={24} /> },
      { step: "02", title: "Distribution", desc: "Sync data across specialized LLM search protocols.", icon: <Database size={24} /> },
      { step: "03", title: "Settlement", desc: "Automated fee routing and merchant payouts.", icon: <CreditCard size={24} /> },
      { step: "04", title: "Scale", desc: "Manage high-volume agentic commerce effortlessly.", icon: <TrendingUp size={24} /> }
    ]
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      {!isEmbedded && (
        <section className="min-h-screen bg-[#092C4C] flex flex-col items-center justify-center relative overflow-hidden px-4">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1]
              }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]"
            />
            <motion.div 
              animate={{ 
                x: [0, -80, 0],
                y: [0, 100, 0],
                scale: [1, 1.3, 1]
              }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"
            />
            <motion.div 
              animate={{ 
                x: [0, 50, 0],
                y: [0, -70, 0],
              }} 
              transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
              className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"
            />
          </div>

          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-none whitespace-nowrap">
              From Prompt to payment.
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-transform">
                View Dashboard
              </button>
              <button className="px-8 py-4 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-brand-500 transition-colors">
                Join the waitlist
              </button>
            </div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="flex flex-col items-center gap-2 text-slate-500 mt-16"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll to explore the dashboard</span>
              <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Intro Section */}
      <section className="py-20 md:py-24 bg-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-brand-600 font-black uppercase tracking-[0.2em] text-xs mb-4">The Nexus Infrastructure</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase">
            From Prompt to Payment
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Enables products and services to be discovered and purchased directly inside LLMs.
          </p>
          
          <div className="mt-12 md:mt-16">
            <ExplainerVideo />
          </div>
        </motion.div>
      </section>

      {/* Animated Nexus Video Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto px-4">
          <NexusAnimation />
        </div>
      </section>

      {/* Workflow Section with View Toggle */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Background System Connection Illustration */}
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block">
            <svg width="100%" height="200" viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 100H1100" stroke="url(#circuit_grad)" strokeWidth="2" strokeDasharray="10 10" />
              <defs>
                <linearGradient id="circuit_grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3853e6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3853e6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3853e6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="text-center mb-16">
            <p className="text-brand-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4">The Workflow</p>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-12">System Architecture</h3>
            
            {/* View Toggle */}
            <div className="inline-flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
              {[
                { id: 'customer', label: 'Customer View' },
                { id: 'merchant', label: 'Merchant View' },
                { id: 'ecommerce', label: 'E-commerce View' }
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id as any)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative ${
                    activeView === view.id ? 'text-white' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {activeView === view.id && (
                    <motion.div 
                      layoutId="activeView"
                      className="absolute inset-0 bg-brand-600 rounded-xl shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{view.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0"
            >
              {workflowData[activeView as keyof typeof workflowData].map((item, i) => (
                <React.Fragment key={i}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[10px] font-black text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg uppercase tracking-widest">{item.step}</span>
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-500 group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                        {item.icon}
                      </div>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed flex-1">{item.desc}</p>
                  </motion.div>
                  
                  {/* Arrow Connector */}
                  {i < 3 && (
                    <div className="hidden lg:flex items-center justify-center w-12 flex-shrink-0 z-10 -mx-3">
                      <div className="w-full h-px bg-slate-200 relative overflow-hidden">
                         <motion.div 
                           initial={{ left: "-100%" }}
                           animate={{ left: "100%" }}
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                           className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-brand-500 to-transparent"
                         />
                      </div>
                      <div className="absolute bg-white rounded-full p-2 border border-slate-100 shadow-md text-brand-700">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Feature Showcases (Integrated Pictures) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          
          {/* Instant Checkout Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#121417] rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 border border-white/5"
          >
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">AGENTIX NEXUS — PREVIEW</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                Instant checkout, <br/> inside the LLM.
              </h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10 max-w-lg">
                The recommendation and the purchase happen in the same moment, no redirect, no drop-off. The consumer never leaves the conversation.
              </p>
              <button className="flex items-center gap-2 text-brand-400 font-bold hover:gap-4 transition-all">
                Join early access <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="lg:w-1/2 flex items-center justify-center">
              <AnimatedChatPreview />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-[#092C4C] text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-12 leading-none">
            Scale your <br/> <span className="text-brand-700">Agentic Revenue.</span>
          </h2>
          <div className="flex justify-center gap-6">
            <button className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-brand-500 transition-colors">
              Get Started
            </button>
            <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Nexus;

